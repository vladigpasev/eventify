import EurSign from '@/public/images/icons/EurSign';
import EventTimeSvg from '@/public/images/icons/EventTime';
import LocationSvg from '@/public/images/icons/Location';
import Link from 'next/link';
import React from 'react';

//@ts-ignore
const EventDetailsPopup = ({ event, onClose }) => {
    if (!event) return null;

    const backgroundImageStyle = {
        backgroundImage: `url(${event.thumbnailUrl})`,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backgroundBlendMode: 'overlay',
        backgroundSize: 'cover'
    };

    return (
        <div className="fixed inset-0 bg-opacity-80 z-50 flex justify-center items-center min-h-screen boxbg">
            <div className="rounded-lg shadow-xl max-w-xl w-full bg-white p-6 max-h-screen" style={backgroundImageStyle}>
                <div className="font-sans text-md text-gray-700">
                    <h2 className="text-xl font-semibold mb-2">{event.eventName}</h2>
                    <div className='flex items-center gap-2 mb-3'>
                        <EventTimeSvg />
                        <span>{new Date(event.dateTime).toLocaleString()}</span>
                    </div>
                    <div className='flex items-center gap-2 mb-3'>
                        <LocationSvg />
                        <span>{event.location}</span>
                    </div>
                    <p className='mb-4'>{event.description}</p>
                    <div className='flex justify-between items-center mb-4'>
                        <div className='flex items-center gap-2'>
                            <EurSign />
                            <span className='font-semibold'>{event.isFree ? 'Безплатно' : `От ${event.price} USD`}</span>
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <Link className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200 btn" href={`/events/${event.uuid}`}>Виж повече</Link>
                        <button className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400 transition duration-200 btn" onClick={onClose}>Затваряне</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsPopup;
