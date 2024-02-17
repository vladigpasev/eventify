"use server";
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { events } from '@/schema/schema';
import { eq } from 'drizzle-orm';
import { headers } from "next/headers";
import fetch from 'node-fetch'; // Ensure you have 'node-fetch' installed

const db = drizzle(sql);

export async function fetchEvents() {
    try {
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
            .where(eq(events.visibility, "public"));

        const result = await query.execute();

        // Adding the length property directly to the result array
        result.length = result.length;

        return result;
    } catch (error) {
        console.error('Грешка при зареждане на събития:', error);
        throw error;
    }
}

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//@ts-ignore
export async function geocodeLocation(address) {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsApiKey}`;

    try {
        const response = await fetch(geocodeUrl);
        const data = await response.json();
        //@ts-ignore
        if (data.results && data.results.length > 0) {
            //@ts-ignore
            const { lat, lng } = data.results[0].geometry.location;
            console.log("Geocoding result for", address, ":", { lat, lng });
            return { lat, lng };
        } else {
            console.error('No results found for location:', address);
            return null;
        }
    } catch (error) {
        console.error('Error in geocoding:', error);
        return null;
    }
}

export async function getLocationFromIP() {
    const xForwardedFor = headers().get("x-forwarded-for");
    const clientIP = xForwardedFor ? xForwardedFor.split(',')[0].trim() : null;

    if (clientIP) {
        const apiUrl = `https://ipinfo.io/${clientIP}/json?token=a9c6adf8891aa3`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching location from IP:', error);
            return null;
        }
    } else {
        console.error('Client IP address not found');
        return null;
    }
}