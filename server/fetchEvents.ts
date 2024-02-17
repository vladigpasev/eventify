// В server/fetchEvents.js

"use server";
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { events } from '@/schema/schema';

const db = drizzle(sql);

export async function fetchEvents(page = 1, limit = 20, searchTerm = '') {
    try {
        const offset = (page - 1) * limit;

        const query = db.select({
            uuid: events.uuid,
            eventName: events.eventName,
            dateTime: events.dateTime,
            location: events.location,
            isFree: events.isFree,
            price: events.price,
            thumbnailUrl: events.thumbnailUrl,
            // Добавете всички други полета, които са ви необходими
        })
        .from(events)
        .where(eq(events.visibility, "public"))
        .limit(limit)
        .offset(offset);

        if (searchTerm) {
            query.where(like(events.eventName, `%${searchTerm}%`));
        }

        const result = await query.execute();

        return result;
    } catch (error) {
        console.error('Грешка при зареждане на събития:', error);
        throw error;
    }
}
