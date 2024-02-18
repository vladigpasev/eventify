import React from 'react';
import Location from '@/components/Location';
import DashboardNavbar from '@/components/DashboardNavbar';
import CategoryDropDown from '@/components/CategoryDropDown';
import AISearchPopup from '@/components/AiSearchPopup';
import EventTimeSvg from '@/public/images/icons/EventTime';
import LocationSvg from '@/public/images/icons/Location';
import EurSign from '@/public/images/icons/EurSign';
import GoSvg from '@/public/images/icons/GoSvg';
import { eventCustomers, events } from '@/schema/schema';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { eq } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs';

export default async function MyEvents() {
    const db = drizzle(sql);
    const user = await currentUser();

    // Fetching the customer's events
    const customerEvents = await db.select({
        eventUuid: eventCustomers.eventUuid,
        ticketToken: eventCustomers.ticketToken,
        // Add other fields as needed
    })
    .from(eventCustomers)
    //@ts-ignore
    .where(eq(eventCustomers.clerkUserId, user.id))
    .execute();

    let allEvents = [];

    for (let i = 0; i < customerEvents.length; i++) {
        const { eventUuid, ticketToken } = customerEvents[i];
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
            // Add other fields as needed
        })
        .from(events)
        .where(eq(events.uuid, eventUuid))
        .execute();

        const eventWithToken = eventsData.map(event => ({ ...event, ticketToken }));
        allEvents.push(...eventWithToken);
    }

    return (
        <div>
            <DashboardNavbar />
            <div className='p-5 sm:px-20 px-5'>
                
                    <div>
                    <h1 className='text-xl font-medium'>My Tickets</h1>
                        <div className='w-full flex flex-grow items-center justify-center'>

                            <div className={`grid md:grid-cols-4 sm:grid-cols-3 supersmall:grid-cols-2 gap-5 w-fit`}>
                                {allEvents.map(event => (
                                    /* @ts-ignore */
                                    <div key={event.uuid} className='bg-white w-46 p-3 rounded overflow-hidden shadow-xl'>
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
                                                <a href={`https://tickets.eventify.bg/`+event.ticketToken} target='_blank'>
                                                    <div className='cursor-pointer text-blue-800 hover:opacity-80 btn'>See Ticket</div>
                                                </a>


                                            </div>
                                            
                                            <div className="card-actions justify-end mt-5">
                                                {/* @ts-ignore */}
                                                <div className="badge badge-outline text-blue-800">{event.category}</div>
                                            </div>

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