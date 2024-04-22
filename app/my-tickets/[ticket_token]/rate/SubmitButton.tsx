"use client"
import React, { useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'


function SubmitButton() {
    const { pending } = useFormStatus()
    const router = useRouter();
    const isInitialMount = useRef(true);

     // Dependencies array includes pending and navigate to ensure the effect re-runs only when they change



    return (
        <button type='submit' disabled={pending} className=" w-full h-11 px-4 py-2.5 mt-4 bg-violet-500 rounded-lg shadow border border-violet-500 justify-center items-center gap-1.5 inline-flex">
            <div className="px-0.5 justify-center items-center flex my-2">
                <div className="text-white text-base font-semibold leading-normal">{pending ? 'Зареждане...' : 'Подай обратка връзка'}</div>
            </div>
        </button>
    )
}

export default SubmitButton