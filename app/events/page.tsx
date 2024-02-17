import EurSign from '@/public/images/icons/EurSign'
import EventTimeSvg from '@/public/images/icons/EventTime'
import GoSvg from '@/public/images/icons/GoSvg'
import LocationSvg from '@/public/images/icons/Location'
import Link from 'next/link'
import React from 'react'
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { eq } from 'drizzle-orm';
import { events } from '@/schema/schema'
//@ts-ignore
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'
import Stripe from 'stripe';
import CategoryDropDown from '@/components/CategoryDropDown'
import Location from '@/components/Location'
import DashboardNavbar from '@/components/DashboardNavbar'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16'
});
const db = drizzle(sql);

async function MyEvents() {

    const userQueryResult = await db.select({
        uuid: events.uuid,
        eventName: events.eventName,
        dateTime: events.dateTime,
        location: events.location,
        isFree: events.isFree,
        price: events.price,
        thumbnailUrl: events.thumbnailUrl,
    })
        .from(events)
        .where(eq(events.visibility, "public"))
        .execute();



    return (
        <div>
            <DashboardNavbar />
            <div className='p-5 sm:px-20 px-5'>
                <div className='pb-5 flex sm:flex-row flex-col items-center w-full sm:gap-5 gap-5'>
                    <form className="sm:w-3/4 w-full">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">

                            <input type="search" id="default-search" className="block w-full px-4 pe-10 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Events..." required />
                            <div className="absolute inset-y-0 end-3 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                        </div>
                    </form>

                    <div className="sm:w-96 w-full">
                        <button id="default-search" className="btn w-full px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex justify-between items-center" ><span>Search with</span><span className='font-poppins font-bold text-base leading-6 tracking-wide text-blue-500'>AI</span></button>
                    </div>
                </div>

                <div className='flex sm:flex-row flex-col gap-5 pb-10'>
                    <CategoryDropDown />
                    <Location />
                </div>

                <div className='w-full flex flex-grow items-center justify-center'>
                    <div className={`grid ${userQueryResult.length >= 3 ? 'md:grid-cols-4 sm:grid-cols-3' : 'grid-cols-1 justify-items-center'} supersmall:grid-cols-2 gap-5 w-fit`}>
                        {userQueryResult.length > 0 ? userQueryResult.map(event => (


                            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <a href="#" >
                                    <div className='h-64 p-5'>
                                        <img className="w-full h-full object-cover object-center rounded" src={event.thumbnailUrl} alt="product image" />
                                    </div>
                                </a>
                                <div className="px-5 pb-5">
                                    <a href="#">
                                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{event.eventName}</h5>
                                    </a>
                                    <div className="flex items-center mt-2.5 mb-5">
                                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                            <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                            <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                            </svg>
                                        </div>
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{event.isFree ? 'Free' : `${event.price} BGN`}</span>
                                        <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                                    </div>
                                </div>
                            </div>

                            // <div key={event.uuid} className='bg-white w-46 p-3 rounded overflow-hidden shadow-xl'>
                            //     <div className='pb-2 h-60'>
                            //         {/* Replace with dynamic image source */}
                            //         <img src={event.thumbnailUrl} alt="Event Image" className='w-full h-full object-cover object-center rounded' />
                            //     </div>
                            //     <div className='flex flex-col flex-grow'>
                            //         <div className="text-black text-base font-normal">{event.eventName}</div>
                            //         <div className='flex items-center gap-1'><EventTimeSvg /><div className="text-stone-500 text-[10.36px] font-medium">{new Date(event.dateTime).toLocaleString()}</div></div>
                            //         <div className='flex items-center gap-1'><LocationSvg /><div className="text-stone-500 text-[10.36px] font-medium">{event.location}</div></div>
                            //         <div className='flex flex-row justify-between'>
                            //             <div className='flex items-center gap-1'> 
                            //                 <EurSign />
                            //                 <div className="text-black text-xs font-medium leading-tight">{event.isFree ? 'Free' : `From ${event.price} BGN`}</div>
                            //             </div>
                            //             <a href={`/dashboard/events/${event.uuid}`}><div className='cursor-pointer text-blue-800 hover:opacity-80'><GoSvg /></div></a>
                            //         </div>
                            //     </div>
                            // </div>
                        )) : <div>No events to display</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyEvents;
