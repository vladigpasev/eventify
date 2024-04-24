//Copyright (C) 2024  Vladimir Pasev
import React from 'react';
import DashboardNavbar from '@/components/DashboardNavbar';
import EventTimeSvg from '@/public/images/icons/EventTime';
import LocationSvg from '@/public/images/icons/Location';
import { eventCustomers, events, ratings } from '@/schema/schema';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { eq } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs';
import { Metadata } from 'next';
import { desc } from 'drizzle-orm';
import Link from 'next/link';

export const revalidate = 0

export const metadata: Metadata = {
    title: 'Моите билети | Eventify',
    description: 'В тази страница можете да видите и да получите достъп до всички закупени билети.',
    alternates: {
        canonical: `https://www.eventify.bg/my-tickets`,
    },
    openGraph: {
        images: `https://www.eventify.bg/images/opengraph.png`,
    }
}

export default async function MyEvents() {
    const db = drizzle(sql);
    const user = await currentUser();

    const customerEvents = await db.select({
        eventUuid: eventCustomers.eventUuid,
        ticketToken: eventCustomers.ticketToken,
    })
        .from(eventCustomers)
        //@ts-ignore
        .where(eq(eventCustomers.clerkUserId, user.id))
        .orderBy(desc(eventCustomers.id))
        .execute();

    let allEvents = [];
    let rated = false;
    let rating;

    for (let i = 0; i < customerEvents.length; i++) {
        const { eventUuid, ticketToken } = customerEvents[i];
        const ratingsList = await db.select({
            rating: ratings.rating,
            ticket_token: ratings.ticketToken,
        })
            .from(ratings)
            //@ts-ignore
            .where(eq(ratings.ticketToken, ticketToken))
            .execute();

        let rated = ratingsList.length > 0;
        let rating = rated ? ratingsList[0].rating : undefined;

        const eventsData = await db.select({
            uuid: events.uuid,
            eventName: events.eventName,
            dateTime: events.dateTime,
            location: events.location,
            isFree: events.isFree,
            price: events.price,
            thumbnailUrl: events.thumbnailUrl,
            category: events.category,
            description: events.description,
        })
            .from(events)
            .where(eq(events.uuid, eventUuid))
            .execute();

        const eventWithToken = eventsData.map(event => ({ ...event, ticketToken, i, rated, rating }));
        allEvents.push(...eventWithToken);
    }


    return (
        <div>
            <DashboardNavbar />
            <div className='p-5 sm:px-20 px-5'>

                <div>
                    <h1 className='text-xl font-medium'>Моите билети</h1>
                    <div className='w-full flex flex-grow items-center justify-center'>

                        <div className={`grid md:grid-cols-4 sm:grid-cols-3 supersmall:grid-cols-2 gap-5 w-fit`}>
                            {allEvents.map(event => (
                                /* @ts-ignore */
                                <div className='bg-white w-46 rounded overflow-hidden shadow-xl flex flex-col justify-between'>
                                    <div key={event.uuid} className='p-3'>
                                        <div className='pb-2 h-60'>
                                            {/* @ts-ignore */}
                                            <img src={event.thumbnailUrl} alt="Event Image" className='w-full h-full object-cover object-center rounded' />
                                        </div>
                                        <div className='flex flex-col flex-grow'>
                                            {/* @ts-ignore */}
                                            <div className="text-black text-base font-normal">{event.eventName}</div>
                                            {/* @ts-ignore */}
                                            <div className='flex items-center gap-1'><EventTimeSvg /><div className="text-stone-500 text-[10.36px] font-medium">{new Date(event.dateTime).toLocaleString()}</div></div>
                                            {/* @ts-ignore */}
                                            <div className='flex items-center gap-1'><LocationSvg /><div className="text-stone-500 text-[10.36px] font-medium">{event.location}</div></div>
                                            <div className='flex flex-row justify-between mt-2'>
                                                {/* @ts-ignore */}
                                                <a href={`https://tickets.eventify.bg/` + event.ticketToken} target='_blank'>
                                                    <div className='cursor-pointer text-blue-800 hover:opacity-80 btn'>Виж билет</div>
                                                </a>

                                            </div>

                                            <div className="card-actions justify-end mt-5">
                                                {/* @ts-ignore */}
                                                <div className="badge badge-outline text-blue-800">{event.category}</div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='bg-gray-100 p-5'>

                                        {event.rated ? (
                                            <div className="rating my-2">
                                                {Array.from({ length: 5 }, (_, index) => (
                                                    //@ts-ignore
                                                    <input type="radio" key={index} disabled className={`cursor-default mask mask-star-2 ${index < event.rating ? 'bg-orange-400' : 'bg-gray-300'}`}></input>
                                                ))}
                                            </div>
                                        ) : (
                                            <>
                                                <p>Моля да оцените това събитие:</p>
                                                <Link href={`/rate/${event.ticketToken}`}>
                                                    <div className="rating my-2">
                                                        {Array.from({ length: 5 }, (_, index) => (
                                                            <input type="radio" key={index} name={`rating-${event.ticketToken}`} className="mask mask-star-2 bg-gray-300" />
                                                        ))}
                                                    </div>
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}