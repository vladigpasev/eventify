import Stripe from 'stripe';
import { headers } from 'next/headers';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { users } from '@/schema/schema';

const db = drizzle(sql);

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

    console.log(session);

    
    // Implement your logic for a successful payment here.
    // For example, updating the user's subscription status in your database.
    
  }

  return new Response('Received', {
    status: 201
  });
}
