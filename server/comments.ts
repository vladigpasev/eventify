"use server";
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { comments } from '@/schema/schema';
import { desc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';

const db = drizzle(sql);

// Function to fetch comments for a specific event
export async function fetchComments(eventId) {
    try {
        const query = db.select({
                id: comments.id,
                eventId: comments.eventId,
                commentText: comments.commentText,
                // Add other fields as needed
            })
            .from(comments)
            .where(eq(comments.eventId, eventId))
            .orderBy(desc(comments.createdAt)); // Assuming there's a createdAt field

        const result = await query.execute();
        return result.map(row => ({ ...row })); // Convert to plain objects
    } catch (error) {
        console.error("Error fetching comments:", error.message);
        throw new Error("Failed to fetch comments");
    }
}

export async function addComments(eventId, commentText) {
    try {
        const newComment = {
            eventId: eventId,
            commentText: commentText,
            // Set other fields as needed, e.g., createdAt
        };

        const result = await db.insert(comments).values(newComment).execute();
        return { ...result }; // Convert to plain object
    } catch (error) {
        console.error("Error adding comment:", error.message);
        throw new Error("Failed to add comment");
    }
}
