"use server";
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { comments } from '@/schema/schema';
import { desc } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const db = drizzle(sql);

//@ts-ignore
export async function fetchComments(data) {
    const commentSchema = z.object({
        eventId: z.string().nonempty().nonempty(),
    });
    let commentData;
    try {
        commentData = commentSchema.parse(data);
    } catch (error) {
        console.error("Validation error: ", error);
        return { success: false, error: "Data validation failed" };
    }
    const eventId = commentData.eventId;
    try {
        const query = db.select({
            id: comments.id,
            comment: comments.commentText,
            userName: comments.userName,
        })
            .from(comments)
            .where(eq(comments.eventId, eventId))
            .orderBy(desc(comments.createdAt));

        const result = await query.execute();
        //console.log(result)
        //console.log(eventId)
        return { comments: result };

    } catch (error) {
        //@ts-ignore
        console.error("Error fetching comments:", error.message);
        throw new Error("Failed to fetch comments");
    }
}
//@ts-ignore
export async function addComments(data) {
    const commentSchema = z.object({
        eventId: z.string().nonempty().nonempty(),
        comment: z.string().nonempty().nonempty(),
        userName: z.string().nonempty().nonempty(),
    });
    let commentData;
    try {
        commentData = commentSchema.parse(data);
    } catch (error) {
        console.error("Validation error: ", error);
        return;
    }

    try {
        const newComment = {
            eventId: commentData.eventId,
            commentText: commentData.comment,
            userName: commentData.userName,
        };

        const result = await db.insert(comments).values(newComment).execute();
        return;
    } catch (error) {
        //@ts-ignore
        console.error("Error adding comment:", error.message);
        throw new Error("Failed to add comment");
    }
}
