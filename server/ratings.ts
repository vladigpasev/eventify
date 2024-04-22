'use server'
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { ratings } from '@/schema/schema';
import { desc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { redirect } from 'next/navigation';

export async function sendFeedback(prevState: any, formData: FormData) {
    
    const db = drizzle(sql);
    const rateSchema = z.object({
        rating: z.string().nonempty(),
        ticket_token: z.string().nonempty(),
        feedback: z.any(),
    });
    let rateData;
    const rawFormData = {
        rating: formData.get('rating'),
        feedback: formData.get('feedback'),
        ticket_token: formData.get('ticket_token'),
    }
    try {
        rateData = rateSchema.parse(rawFormData);
    } catch (error) {
        console.error("Validation error: ", error);
        return { success: false, error: "Data validation failed" };
    }

    if(rateData.rating==='0'){
        console.log('err')
        return { success: false, error: "Data validation failed" };
    }

    try {
        const newRating = {
            ticketToken: rateData.ticket_token,
            rating: rateData.rating,
            feedback: rateData.feedback,
        };
        //@ts-ignore
        const result = await db.insert(ratings).values(newRating).execute();
        //redirect('/my-tickets')
        return { success: true, message: "success" };
    } catch (error) {
        //@ts-ignore
        console.error("Error adding comment:", error.message);
        return {success: false, error: "Failed to add rating"};
    }

    
}