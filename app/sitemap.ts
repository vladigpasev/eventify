import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { events } from '@/schema/schema';
import { eq } from 'drizzle-orm';

const db = drizzle(sql);


export default async function sitemap() {
    const baseUrl = 'https://www.eventify.bg';
    
    const query = db.select({
        uuid: events.uuid,
        eventName: events.eventName,
        dateTime: events.dateTime,
        location: events.location,
        isFree: events.isFree,
        price: events.price,
        thumbnailUrl: events.thumbnailUrl,
        category: events.category,
        description: events.description,
        updatedAt: events.updatedAt,
    })
        .from(events)
        .where(eq(events.visibility, "public"));

    const allEvents = await query.execute();
    
    const eventUrls = allEvents?.map((event) => {
        return {
            url: `${baseUrl}/events/${event.uuid}`,
            //@ts-ignore
            lastModified: new Date(event.updatedAt),
            changeFrequency: 'yearly',
            priority: 0.8,
        };
    }) ?? [];

    const lastUpdatedHomepage = new Date('2024-02-18T20:31:29'); // Задайте датата и часа на последното обновление

    return [
        {
            url: baseUrl,
            lastModified: lastUpdatedHomepage,
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: baseUrl + '/events',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        // {
        //     url: baseUrl + '/terms-of-use',
        //     lastModified: lastUpdatedTerms,
        //     changeFrequency: 'yearly',
        //     priority: 0.3,
        // },
        // {
        //     url: baseUrl + '/privacy-policy',
        //     lastModified: lastUpdatedPrivacy,
        //     changeFrequency: 'yearly',
        //     priority: 0.3,
        // },
        // {
        //     url: baseUrl + '/cookies-policy',
        //     lastModified: lastUpdatedCookies,
        //     changeFrequency: 'yearly',
        //     priority: 0.3,
        // },

        ...eventUrls,
    ]
}