"use client"
import { create_checkout_session } from '@/server/purchase';
import React from 'react'
import { useFormState } from 'react-dom';
//@ts-ignore
function PurchaseBtn({ price, eventId }) {
    const initialState = {
        message: null,
        success: false,
        error: false
    }
    //@ts-ignore
    const [state, formAction] = useFormState(create_checkout_session, initialState);

    return (
        <div>
            <form action={formAction}>
                <input type="hidden" name="price" value={price} />
                <input type="hidden" name="eventId" value={eventId} />
                <input type="hidden" name="successUrl" value="/my-tickets" />
                <input type="hidden" name="errorUrl" value="/events" />
                <button className="btn bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded" id="checkout-and-portal-button" type="submit">Купи билет</button>
            </form>
        </div>
    )
}

export default PurchaseBtn