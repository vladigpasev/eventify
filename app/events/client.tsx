//Copyright (C) 2024  Vladimir Pasev

"use client";

import React, { useState, useEffect } from 'react';
import Location from '@/components/Location';
import { fetchEvents, geocodeLocation } from '@/server/fetchEvents';
import DashboardNavbar from '@/components/DashboardNavbar';
import { searchWithAi } from '@/server/fetchEvents';
import AISearchPopup from '@/components/AiSearchPopup';
import EventTimeSvg from '@/public/images/icons/EventTime';
import LocationSvg from '@/public/images/icons/Location';
import EurSign from '@/public/images/icons/EurSign';
import GoSvg from '@/public/images/icons/GoSvg';
import EventDetailsPopup from '@/components/EventDetailsPopup';
import Link from 'next/link';

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

const AllEvents = () => {
    const [allEvents, setAllEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [userLocation, setUserLocation] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAiPopupOpen, setIsAiPopupOpen] = useState(false);
    const [isShowingAllEvents, setIsShowingAllEvents] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const openEventDetails = (event: any) => {
        setSelectedEvent(event);
    };

    const closeEventDetails = () => {
        setSelectedEvent(null);
    };


    const handleAISearchClick = () => {
        setIsAiPopupOpen(true);
    };

    const closeAIPopup = () => {
        setIsAiPopupOpen(false);
    };

    const handleAISubmit = async (userPrompt: any) => {
        setIsLoading(true);
        try {
            const response = await searchWithAi(userPrompt);
            const eventUuids = response.split(';');
            {/* @ts-ignore */ }
            const selectedEvents = allEvents.filter(event => eventUuids.includes(event.uuid));
            setEvents(selectedEvents.length > 0 ? selectedEvents : []);
            setIsShowingAllEvents(selectedEvents.length === allEvents.length);
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

    //@ts-ignore
    function submitSearch(e) {
        e.preventDefault();
    }

    return (
        <div>
            <DashboardNavbar />
            <div className='p-5 sm:px-20 px-5'>
                <Link href="https://organize.eventify.bg" className='btn btn-primary text-white mb-5'>Организирай събитие</Link>
                <div className='pb-5 flex sm:flex-row flex-col items-center w-full sm:gap-5 gap-5'>
                    <form className="sm:w-3/4 w-full" onSubmit={submitSearch}>
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Търсене</label>
                        <div className="relative">
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full px-4 pe-10 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Търси събития..."
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
                        <span>Търси с</span>
                        <span className='font-poppins font-bold text-base leading-6 tracking-wide text-blue-500'>AI</span>
                    </button>
                </div>

                <div className='flex sm:flex-row flex-col gap-5 pb-10'>
                    <Location onLocationUpdate={handleLocationUpdate} />
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div>Зареждане...</div>
                    </div>
                ) : (
                    <div>
                        {!isShowingAllEvents &&
                            <button
                                onClick={showAllEvents}
                                className="btn mb-5 px-4 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                Покажи всички събития
                            </button>
                        }
                        <div className='w-full flex flex-grow items-center justify-center'>

                            <div className={`grid ${events.length >= 3 ? 'md:grid-cols-4 sm:grid-cols-3' : 'md:grid-cols-4 sm:grid-cols-3'} supersmall:grid-cols-2 gap-5 w-fit`}>
                                {events.map(event => (
                                    /* @ts-ignore */
                                    <div key={event.uuid} className='bg-white w-46 p-3 rounded overflow-hidden shadow-xl'>
                                        <div className='pb-2 h-60'>
                                            {/* @ts-ignore */}
                                            <img src={event.thumbnailUrl} alt="Event Image" className='w-full h-full object-cover object-center rounded' />
                                        </div>
                                        <div className='flex flex-col flex-grow'>
                                            {/* @ts-ignore */}
                                            <div className="text-black text-base font-normal">{event.eventName}</div>
                                            {/* @ts-ignore */}
                                            <div className='flex items-center gap-1'><EventTimeSvg /><div className="text-stone-500 text-[10.36px] font-medium">{new Date(event.dateTime).toLocaleString()}</div></div>
                                            {/* @ts-ignore */}
                                            <div className='flex items-center gap-1'><LocationSvg /><div className="text-stone-500 text-[10.36px] font-medium">{event.location}</div></div>
                                            <div className='flex flex-row justify-between mt-2'>
                                                <div className='flex items-center gap-1'>
                                                    <EurSign />
                                                    {/* @ts-ignore */}
                                                    <div className="text-black text-xs font-medium leading-tight">{event.isFree ? 'Безплатно' : `От ${event.price} USD`}</div>
                                                </div>
                                                {/* @ts-ignore */}
                                                <button onClick={() => openEventDetails(event)} className="...">
                                                    <div className='cursor-pointer text-blue-800 hover:opacity-80'><GoSvg /></div>
                                                </button>


                                            </div>
                                            {selectedEvent && <EventDetailsPopup event={selectedEvent} onClose={closeEventDetails} />}
                                            <div className="card-actions justify-end mt-5">
                                                {/* @ts-ignore */}
                                                <div className="badge badge-outline text-blue-800">{event.category}</div>
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

export default AllEvents;