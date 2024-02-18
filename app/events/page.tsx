"use client";

import React, { useState, useEffect } from 'react';
import Location from '@/components/Location';
import { fetchEvents, geocodeLocation } from '@/server/fetchEvents';
import DashboardNavbar from '@/components/DashboardNavbar';
import CategoryDropDown from '@/components/CategoryDropDown';
import { searchWithAi } from '@/server/fetchEvents';
import AISearchPopup from '@/components/AiSearchPopup';

//@ts-ignore
function toRad(x) {
    return x * Math.PI / 180;
}
//@ts-ignore
function calculateDistance(coord1, coord2) {
    const R = 6371; // Earth radius in km
    const dLat = toRad(coord2.lat - coord1.lat);
    const dLon = toRad(coord2.lng - coord1.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}


const MyEvents = () => {
    const [allEvents, setAllEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [userLocation, setUserLocation] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAiPopupOpen, setIsAiPopupOpen] = useState(false);
    const [isShowingAllEvents, setIsShowingAllEvents] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleAISearchClick = () => {
        setIsAiPopupOpen(true);
    };

    const closeAIPopup = () => {
        setIsAiPopupOpen(false);
    };
    //@ts-ignore
    const handleAISubmit = async (userPrompt) => {
        setIsLoading(true);
        try {
            const eventUuid = await searchWithAi(userPrompt);
            //@ts-ignore
            const selectedEvent = allEvents.find(event => event.uuid === eventUuid);
            setEvents(selectedEvent ? [selectedEvent] : []);
            setIsShowingAllEvents(false);
        } catch (error) {
            console.error('Error in AI search:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const showAllEvents = () => {
        setEvents(allEvents);
        setIsShowingAllEvents(true);
    };


    //@ts-ignore
    const handleLocationUpdate = async (location) => {
        setUserLocation(location);
        await loadAndSortEvents(location);
    };
    //@ts-ignore
    const loadAndSortEvents = async (location) => {
        try {
            const fetchedEvents = await fetchEvents();

            if (location) {
                const userCoords = await geocodeLocation(location);

                const eventsWithCoordinates = await Promise.all(fetchedEvents.map(async event => {
                    const eventCoords = await geocodeLocation(event.location);
                    return { ...event, coords: eventCoords };
                }));

                const eventsWithDistances = await Promise.all(eventsWithCoordinates.map(async event => {
                    try {
                        const distance = calculateDistance(userCoords, event.coords);
                        return { ...event, distance };
                    } catch (error) {
                        console.log(`Error calculating distance for event ${event.eventName}:`, error);
                        return { ...event, distance: Infinity };
                    }
                }));

                const sortedEvents = eventsWithDistances.sort((a, b) => a.distance - b.distance);
                //@ts-ignore
                setAllEvents(fetchedEvents);
                //@ts-ignore
                setEvents(sortedEvents);
            } else {
                // Location is not available, set events unsorted
                //@ts-ignore
                setAllEvents(fetchedEvents);
                //@ts-ignore
                setEvents(fetchedEvents);
            }
        } catch (error) {
            console.error('Error fetching and sorting events:', error);
        }
    };
    //@ts-ignore
    const handleSearch = (query) => {
        setSearchQuery(query);

        const filteredEvents = allEvents.filter(event =>
            //@ts-ignore
            event.eventName.toLowerCase().includes(query.toLowerCase())
        );

        setEvents(filteredEvents);
    };

    useEffect(() => {
        loadAndSortEvents(userLocation);
    }, [userLocation]);




    return (
        <div>
            <DashboardNavbar />
            <div className='p-5 sm:px-20 px-5'>
                <div className='pb-5 flex sm:flex-row flex-col items-center w-full sm:gap-5 gap-5'>
                    <form className="sm:w-3/4 w-full">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full px-4 pe-10 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search Events..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                required
                            />
                            <div className="absolute inset-y-0 end-3 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                        </div>
                    </form>
                    <button
                        onClick={handleAISearchClick}
                        className="btn sm:w-96 w-full px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex justify-between items-center">
                        <span>Search with AI</span>
                        <span className='font-poppins font-bold text-base leading-6 tracking-wide text-blue-500'>AI</span>
                    </button>
                </div>

                <div className='flex sm:flex-row flex-col gap-5 pb-10'>
                    <CategoryDropDown />
                    <Location onLocationUpdate={handleLocationUpdate} />
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div>Loading...</div>
                    </div>
                ) : (
                    <div>
                        {!isShowingAllEvents &&
                            <button
                                onClick={showAllEvents}
                                className="btn mb-5 px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                Show All Events
                            </button>
                        }
                        <div className='w-full flex flex-grow items-center justify-center'>

                            <div className={`grid ${events.length >= 3 ? 'md:grid-cols-4 sm:grid-cols-3' : 'grid-cols-1 justify-items-center'} supersmall:grid-cols-2 gap-5 w-fit`}>
                                {events.map(event => (
                                    //@ts-ignore
                                    <div key={event.uuid} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">                                <a href="#" >
                                        <div className='h-64 p-5'>
                                            {/*@ts-ignore*/}
                                            <img className="w-full h-full object-cover object-center rounded" src={event.thumbnailUrl} alt="product image" />
                                        </div>
                                    </a>
                                        <div className="px-5 pb-5">
                                            <a href="#">
                                                {/*@ts-ignore*/}
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
                                                {/*@ts-ignore*/}
                                                <span className="text-3xl font-bold text-gray-900 dark:text-white">{event.isFree ? 'Free' : `${event.price} BGN`}</span>
                                                <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <AISearchPopup isOpen={isAiPopupOpen} onClose={closeAIPopup} onSubmit={handleAISubmit} />
        </div>
    )
}

export default MyEvents;