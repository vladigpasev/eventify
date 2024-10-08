import React from 'react'
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { and, eq } from 'drizzle-orm';
import { ratings, eventCustomers } from '@/schema/schema';
import { notFound, redirect } from 'next/navigation';
import Form from './Form';

type Props = {
    params: { ticket_token: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
const db = drizzle(sql);


async function page({ params }: { params: { ticket_token: string } }) {
    const ticket_token = params.ticket_token;
    console.log(ticket_token);
    const tickets = await db.select({
        ticket_token: eventCustomers.ticketToken,
    })
        .from(eventCustomers)
        //@ts-ignore
        .where(and(eq(eventCustomers.ticketToken, ticket_token)))
        .execute();
    if (tickets.length > 0) {
        // There are results
    } else {
        notFound();
    }

    const ratingsList = await db.select({
        ticket_token: ratings.ticketToken,
    })
        .from(ratings)
        .where(eq(ratings.ticketToken, ticket_token))
        .execute();
    if (ratingsList.length > 0) {
        redirect('/rate/success')
    }

    return (
        <Form ticket_token={ticket_token} />
    )
}

export default page