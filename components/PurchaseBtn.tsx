"use client"
import { create_checkout_session } from '@/server/purchase';
import React, { useState } from 'react'
import { useFormState } from 'react-dom';

function PurchaseBtn({ price, eventId }) {
    const initialState = {
        message: null,
        success: false,
        error: false
    }
    const [state, formAction] = useFormState(create_checkout_session, initialState);

    return (
        <div>
            <form action={formAction}>
                <input type="hidden" name="price" value={price} />
                <input type="hidden" name="eventId" value={eventId} />
                <input type="hidden" name="successUrl" value="/dashboard" />
                <input type="hidden" name="errorUrl" value="/auth/paymentsetup/error" />
                <button className="btn bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded" id="checkout-and-portal-button" type="submit">Purchase Ticket</button>
            </form>
        </div>
    )
}

export default PurchaseBtn