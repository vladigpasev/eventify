"use client"
import { sendFeedback } from '@/server/ratings'
import React, { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import SubmitButton from './SubmitButton'
import { useRouter } from 'next/navigation'

const initialState = {
    message: '',
  }

  
function Form({ticket_token, user}:any) {
    //@ts-ignore
    const [state, formAction] = useFormState(sendFeedback, initialState)
    const [error, setError] = useState('');
    const router = useRouter()
    useEffect(() => {
        // Skip the effect on the initial mount by checking if isInitialMount is true
        if (state.success) {
            if(user){
                router.replace('/my-tickets');
            }else{
                router.replace('/rate/success');
            }
            
        }else{
            //@ts-ignore
            setError(state.error)
        }
    }, [state]);
  return (
    <div>
         <div className='flex justify-center items-center w-full min-h-screen'> {/* Full width and minimum full height */}
            <div className="max-w-xl w-full p-6 bg-white rounded-[20px] border border-gray-300 flex flex-col justify-center items-center gap-6"> {/* Ensure this is a flex column container */}
                <form action={formAction} className='w-full'>
                    
                    <div className="text-center text-gray-800 text-2xl font-semibold leading-[35px]">Обратна връзка от събитие</div>
                    <div className=" text-center text-gray-600 text-sm font-normal leading-[18px]">Моля оценете събитието по-долу</div>
                    <p className='text-red-500 pt-2 font-bold'>{error}</p>
                    <div className="rating my-2 py-5">
                        <input type="radio" name={`rating`} className="mask mask-star-2 bg-orange-400 hidden" value={0} required defaultChecked />
                        <input type="radio" name={`rating`} className="mask mask-star-2 bg-orange-400" value={1} required />
                        <input type="radio" name={`rating`} className="mask mask-star-2 bg-orange-400" value={2} required />
                        <input type="radio" name={`rating`} className="mask mask-star-2 bg-orange-400" value={3} required />
                        <input type="radio" name={`rating`} className="mask mask-star-2 bg-orange-400" value={4} required />
                        <input type="radio" name={`rating`} className="mask mask-star-2 bg-orange-400" value={5} required />
                    </div>
                    <div className=" text-gray-500 text-sm font-normal leading-[18px] py-1">Допълнителна обратна връзка</div>
                    <div className="w-full h-[100px] px-3.5 py-3 rounded-lg border border-gray-300 flex-col justify-start items-start gap-2.5 inline-flex">
                        <textarea name='feedback' className="self-stretch grow shrink basis-0 justify-start items-start inline-flex"></textarea>
                    </div>
                    <input type="hidden" name="ticket_token" value={ticket_token} />
                    <SubmitButton />
                </form>
            </div>
        </div>
    </div>
  )
}

export default Form