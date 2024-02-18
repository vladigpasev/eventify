"use server";
import Stripe from 'stripe';
import { z } from "zod";
import { redirect } from 'next/navigation';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { eq } from 'drizzle-orm';
import { events, users } from '@/schema/schema';
import { currentUser } from '@clerk/nextjs';


const db = drizzle(sql);


async function getOrganizerPlan(organizerCustomerId: any) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const customerId = organizerCustomerId;
    try {
        const subscriptions = await stripe.subscriptions.list({
            customer: customerId,
            status: 'all',
            expand: ['data.default_payment_method'],
        });

        if (subscriptions.data.length > 0) {
            const subscription = subscriptions.data[0];
            return {
                status: subscription.status,
                plan: subscription.items.data[0].price.lookup_key,
            };
        } else {
            //console.log('No subscriptions found for this customer.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching subscription from Stripe:', error);
        return null;
    }
}

export async function create_checkout_session(prevState: any, formData: FormData) {
    const user = await currentUser();

    async function getSessionUrl() {

        const planSchema = z.object({
            price: z.string().nonempty().nonempty(),
            eventId: z.string().nonempty().nonempty(),
            successUrl: z.string().nonempty().nonempty(),
            errorUrl: z.string().nonempty().nonempty(),
        });
        let planData;
        try {
            planData = planSchema.parse({
                price: formData.get("price"),
                eventId: formData.get("eventId"),
                successUrl: formData.get("successUrl"),
                errorUrl: formData.get("errorUrl"),
            });
        } catch (error) {
            console.error("Validation error: ", error);
            return { success: false, error: "Data validation failed" };
        }

        try {
            const getOrganizerUuid = await db.select({
                userUuid: events.userUuid,
                eventName: events.eventName,
                thumbnailUrl: events.thumbnailUrl,
                price: events.price,
            })
                .from(events)
                .where(eq(events.uuid, planData.eventId))
                .execute();

            const organizerUuid = getOrganizerUuid[0].userUuid;
            const eventName = getOrganizerUuid[0].eventName;
            //@ts-ignore
            const priceInCents = getOrganizerUuid[0].price * 100;
            let thumbnailUrl;
            if (thumbnailUrl == "/images/pngs/event.png") {
                thumbnailUrl = process.env.BASE_URL + getOrganizerUuid[0].thumbnailUrl;
            } else {
                thumbnailUrl = getOrganizerUuid[0].thumbnailUrl;
            }

            const getOrganizerPayoutId = await db.select({
                payoutId: users.payoutId,
                customerId: users.customerId,
            })
                .from(users)
                .where(eq(users.uuid, organizerUuid))
                .execute();

            const payoutId = getOrganizerPayoutId[0].payoutId;
            const organizerCustomerId = getOrganizerPayoutId[0].customerId;
            const organizerPlan = await getOrganizerPlan(organizerCustomerId);

            let organizerSubscriptionName;
            if (organizerPlan && organizerPlan.status === 'active') {
                organizerSubscriptionName = organizerPlan.plan;
                //console.log(organizerSubscriptionName);
            } else {
                organizerSubscriptionName = 'hobby';
            }

            let applicationFeePercentage;
            switch (organizerSubscriptionName) {
                case 'hobby':
                    applicationFeePercentage = 0.30;
                    break;
                case 'basic_plan':
                    applicationFeePercentage = 0.15;
                    break;
                case 'premium_plan':
                    applicationFeePercentage = 0.05;
                    break;
                default:
                    applicationFeePercentage = 0.30;
                    break;
            }
            const applicationFeeAmount = Math.round(priceInCents * applicationFeePercentage);



            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
                //@ts-ignore
                stripeAccount: payoutId
            });

            const customerName = user?.firstName + ' ' + user?.lastName
            const customerEmail = user?.emailAddresses[0].emailAddress;
            let customerId;
            const customerAccount = await stripe.customers.create({
                name: customerName,
                email: customerEmail,
            });
            customerId = customerAccount.id;

            const session = await stripe.checkout.sessions.create(
                {//@ts-ignore
                    metadata: { eventUUID: planData.eventId, userId: user.id },
                    payment_intent_data: {
                        application_fee_amount: applicationFeeAmount,
                    },
                    mode: 'payment',
                    customer: customerId,
                    line_items: [
                        {
                            price_data: {
                                currency: 'usd',
                                unit_amount: priceInCents, // Set the correct price in cents
                                product_data: {
                                    name: eventName,
                                },
                            },
                            quantity: 1,
                        },
                    ],
                    success_url: process.env.BASE_URL + planData.successUrl,
                },
                {
                    //@ts-ignore
                    stripeAccount: payoutId,
                }
            );



            const sessionUrl = session.url;

            //console.log(sessionUrl)
            return { success: true, sessionUrl };
        } catch (error) {
            console.error(error);
            //@ts-ignore
            return { success: false, error };
        }
    }
    const sessionUrl = await getSessionUrl();
    if (sessionUrl.success) {
        //console.log(sessionUrl)
        //@ts-ignore
        redirect(sessionUrl.sessionUrl);
    } else {
        //console.log(sessionUrl)
        return sessionUrl;

    }

}
