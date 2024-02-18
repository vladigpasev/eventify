"use server";
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { events } from '@/schema/schema';
import { eq } from 'drizzle-orm';
import { headers } from "next/headers";
import fetch from 'node-fetch'; // Ensure you have 'node-fetch' installed
import OpenAI from 'openai';

const db = drizzle(sql);

const openai = new OpenAI({
    organization: "org-aNz8Hs6PinAJZz5FQPF9HbjN",
    apiKey: process.env.OPENAI_API_KEY,
});

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
            category: events.category,
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
//@ts-ignore
export async function searchWithAi(userPrompt) {
    const query = db.select({
        uuid: events.uuid,
        eventName: events.eventName,
        dateTime: events.dateTime,
        location: events.location,
        price: events.price,
        description: events.description,
        category: events.category,
        // Add all other necessary fields such as category, description, etc.
    })
    .from(events)
    .where(eq(events.visibility, "public"));

    const result = await query.execute();

    let prompt = "";

    // Iterate over each event and append its details to the prompt string
    result.forEach(event => {
        prompt += `Event Name: ${event.eventName}\n`;
        prompt += `Event UUID: ${event.uuid}\n`;
        prompt += `Event description: ${event.description}\n`;
        prompt += `Event category: ${event.category}\n`;
        // Include other details like category, description, etc., if available
        prompt += `Location: ${event.location}\n`;
        prompt += `Price: ${event.price}\n`;
        prompt += `Date: ${formatDate(event.dateTime)}\n`; // Assuming you have a function to format the date
        prompt += `Time: ${formatTime(event.dateTime)}\n\n`; // Assuming you have a function to format the time
    });

    // Append user prompt at the end
    prompt += `User Prompt\n"${userPrompt}"`;

    console.log(prompt);

    const thread = await openai.beta.threads.create();
    const message = await openai.beta.threads.messages.create(
        thread.id,
        {
            role: "user",
            content: prompt
        }
    );
    const run = await openai.beta.threads.runs.create(
        thread.id,
        {
            assistant_id: 'asst_oGN9vAD20XsSgb1Dn9wgNqMv'
        }
    );

    const checkRunStatus = async () => {
        try {
            const status = await openai.beta.threads.runs.retrieve(thread.id, run.id);
            return status.status === 'completed';
        } catch (error) {
            console.error("Error checking run status:", error);
            return false;
        }
    };

    let isCompleted = await checkRunStatus();

    while (!isCompleted) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // wait for 2 seconds
        isCompleted = await checkRunStatus();
    }


    const messages = await openai.beta.threads.messages.list(thread.id);

    const assistantMessage = messages.data.find(message => message.role === 'assistant');

    if (assistantMessage && assistantMessage.content) {
        //@ts-ignore
        const responseText = assistantMessage.content.map(content => content.text.value).join(' ');

    console.log("Assistant's Response: ", responseText);

    // Extract UUIDs from the response using regex
    const uuidRegex = /[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}/g;
    const extractedUuids = responseText.match(uuidRegex);

    if (extractedUuids && extractedUuids.length > 0) {
        // Join the UUIDs with a semicolon for easy separation on the client-side
        const formattedResponse = extractedUuids.join(';');
        console.log("Formatted UUIDs: ", formattedResponse);
        return formattedResponse;
    } else {
        console.error("No UUIDs found in the assistant's response");
        return "No UUIDs found";
    }
} else {
    console.error("No response from the assistant found");
    return "No response from the assistant found";
}

    // Process the prompt as needed to determine the best event
    // Return the event UUID or further process as needed
}

// Example formatDate and formatTime functions (modify according to your date format)
//@ts-ignore
function formatDate(dateTime) {
    // Convert dateTime to a readable date format
    // E.g., 2024-11-20
    return new Date(dateTime).toLocaleDateString();
}
//@ts-ignore
function formatTime(dateTime) {
    // Convert dateTime to a readable time format
    // E.g., 2:00 PM
    return new Date(dateTime).toLocaleTimeString();
}
