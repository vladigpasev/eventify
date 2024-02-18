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

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Extract needed data
    const customerName = session.customer_details.name;
    const email = session.customer_details.email;
    const eventUuid = session.metadata.eventUUID;
    const userId = session.metadata.userId;

    // Prepare data for createTicket
    const ticketData = {
        customerName,
        email,
        eventUuid,
        userId
    };

    // Call createTicket with the prepared data
    const ticket = await createTicket(ticketData);
    console.log(ticket);
  }

  return new Response('Received', {
    status: 201
  });
}
