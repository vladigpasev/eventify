"use client"
import { useEffect, useState } from 'react';
import { fetchComments, addComments } from '@/server/comments';
import { SignedIn, SignedOut } from '@clerk/nextjs';

//@ts-ignore
function EventComments({ eventId, userName, userId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const loadComments = async () => {
        try {
            const fetchedComments = await fetchComments({ eventId });
            //@ts-ignore
            setComments(fetchedComments.comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        const loadComments = async () => {
            try {
                const fetchedComments = await fetchComments({ eventId });
                //@ts-ignore
                setComments(fetchedComments.comments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        loadComments();
    }, [eventId]);

    //@ts-ignore
    const handleAddComment = async (event) => {
        event.preventDefault();
        try {
            const commentData = {
                eventId,
                userName,
                comment: newComment
            };

            const addedComment = await addComments(commentData);
            loadComments();
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="font-semibold text-xl mb-4">Коментари</h2>
                <div className='flex items-center justify-center'>
                    <SignedOut>
                        <p>Трябва да сте влезли, за да видите коментарите.</p>
                    </SignedOut>
                </div>
                <SignedIn>

                    <form onSubmit={handleAddComment} className="mb-6">
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Напиши коментар..."
                        />
                        <button
                            type="submit"
                            className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
                        >
                            Добави коментар
                        </button>
                    </form>
                    <div className="space-y-4">
                        {comments?.map(comment => (
                            //@ts-ignore
                            <div key={comment.id} className="flex items-start space-x-4">
                                <div className="p-2 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center h-10 w-10">
                                    {//@ts-ignore
                                        comment.userName ? comment.userName[0] : '?'}
                                </div>
                                <div className="flex-1 bg-gray-100 p-4 rounded-lg">
                                    {/*@ts-ignore*/}
                                    <p className="font-semibold">{comment.userName || 'Анонимен'}</p>
                                    {/*@ts-ignore*/}
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </SignedIn>
            </div>
        </div >
    );
}

export default EventComments;
