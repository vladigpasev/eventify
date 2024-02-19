//Copyright (C) 2024  Vladimir Pasev
import React from 'react';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { and, eq } from 'drizzle-orm';
import { events } from '@/schema/schema';
import { notFound } from 'next/navigation';
import DashboardNavbar from '@/components/DashboardNavbar';
import EventTimeSvg from '@/public/images/icons/EventTime';
import LocationSvg from '@/public/images/icons/Location';
import EurSign from '@/public/images/icons/EurSign';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs';
import PurchaseBtn from '@/components/PurchaseBtn';
import EventComments from '@/components/EventComments';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
    params: { uuid: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

async function getEventById(uuid: any) {
    if (!isValidUUID(uuid)) {
        notFound();
    }

    const currentEventDb = await db.select({
        eventName: events.eventName,
        userUuid: events.userUuid,
        description: events.description,
        thumbnailUrl: events.thumbnailUrl,
        dateTime: events.dateTime,
        location: events.location,
        price: events.price,
        isFree: events.isFree,
        visibility: events.visibility,
    })
        .from(events)
        .where(and(
            eq(events.uuid, uuid),
            eq(events.visibility, 'public')
        ))
        .execute();

    if (currentEventDb.length > 0) {
        // There are results
    } else {
        notFound();
    }

    const currentEvent = currentEventDb[0];
    return currentEvent;
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // Read route params to get the post ID
    const uuid = params.uuid;
    const currentEvent = await getEventById(uuid);

    if (!currentEvent) {
        //@ts-ignore
        return (await parent); // Fallback to parent metadata
    }
    // Construct and return the metadata
    if (currentEvent.thumbnailUrl !== '/images/pngs/event.png') {
        return {
            title: `${currentEvent.eventName} | Eventify`,
            description: currentEvent.description,
            alternates: {
                canonical: `https://www.eventify.bg/events/${uuid}`,
            },
            openGraph: {
                images: `${currentEvent.thumbnailUrl}`
            }
        }
    } else {
        return {
            title: `${currentEvent.eventName} | Eventify`,
            description: currentEvent.description,
            alternates: {
                canonical: `https://www.eventify.bg/events/${uuid}`,
            },
            openGraph: {
                images: `https://www.eventify.bg/images/pngs/event.png`,
            }
        }
    }
}

const db = drizzle(sql);

const isValidUUID = (uuid: any) => {
    const regexExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regexExp.test(uuid);
}

async function SeeEventPage({ params }: { params: { uuid: string } }) {
    const user = await currentUser();

    const currentEvent = await getEventById(params.uuid);

    return (
        <div>
            <DashboardNavbar />
            <div className="container mx-auto p-4">
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <div className="flex flex-col md:flex-row">
                        <img className="rounded-lg md:mr-6 mb-4 md:mb-0 w-full md:w-1/3 object-cover" src={currentEvent.thumbnailUrl} alt="Event thumbnail" />
                        <div>
                            <h2 className="text-xl font-semibold mb-2">{currentEvent.eventName}</h2>
                            <div className='flex items-center gap-2 mb-3'>
                                <EventTimeSvg />
                                <span>{new Date(currentEvent.dateTime).toLocaleString()}</span>
                            </div>
                            <div className='flex items-center gap-2 mb-3'>
                                <LocationSvg />
                                <span>{currentEvent.location}</span>
                            </div>
                            <p className='mb-4'>{currentEvent.description}</p>
                            <div className='flex justify-between items-center mb-4'>
                                <div className='flex items-center gap-2'>
                                    <EurSign />
                                    <span className='font-semibold'>{currentEvent.isFree ? 'Безплатно' : `${currentEvent.price} BGN`}</span>
                                </div>
                            </div>
                            <SignedIn><PurchaseBtn price={currentEvent.price} eventId={params.uuid} /></SignedIn>
                            <SignedOut><p className='text-gray-400 mt-10'>За да си купите билет, трябва да се регистрирате, моля, регистрирайте се!</p></SignedOut>

                        </div>
                    </div>
                </div>

                <EventComments eventId={params.uuid} userName={user?.firstName + ' ' + user?.lastName} userId={user?.id} />

            </div>
        </div>
    );
};
export default SeeEventPage;