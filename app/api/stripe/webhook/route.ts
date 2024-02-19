//Copyright (C) 2024  Vladimir Pasev
import Stripe from 'stripe';
import { headers } from 'next/headers';
import { createTicket } from '@/server/tickets/generate';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const payload = await req.text();
  const headersList = headers();
  const sig = headersList.get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload as string, sig, endpointSecret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, {
      status: 400
    });
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Extract needed data
    //@ts-ignore
    const customerName = session.customer_details.name;
    //@ts-ignore
    const email = session.customer_details.email;
    //@ts-ignore
    const eventUuid = session.metadata.eventUUID;
    //@ts-ignore
    const userId = session.metadata.userId;

    if(!customerName || !email || !eventUuid || !userId){
      return new Response('Received', {
        status: 201
      });
    }

    // Prepare data for createTicket
    const ticketData = {
        customerName,
        email,
        eventUuid,
        userId
    };

    // Call createTicket with the prepared data
    const ticket = await createTicket(ticketData);
    //console.log(ticket);
  }

  return new Response('Received', {
    status: 201
  });
}
