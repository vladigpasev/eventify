//Copyright (C) 2024  Vladimir Pasev
import React, { useEffect, useState } from 'react';
import { getLocationFromIP } from '@/server/fetchEvents';

//@ts-ignore
function Location({ onLocationUpdate }) {
    const [location, setLocation] = useState('');
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    //@ts-ignore
    const fetchAddress = async (latitude, longitude) => {
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsApiKey}`;
        try {
            const response = await fetch(geocodeUrl);
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const newLocation = data.results[0].formatted_address;
                setLocation(newLocation);
                onLocationUpdate(newLocation);
            } else {
                console.error('Geocoding error:', data.status);
                setLocation('Address not found');
            }
        } catch (error) {
            console.error('Error fetching address:', error);
            setLocation('Error fetching address');
        }
    };

    const fetchApproximateLocation = async () => {
        const locationData = await getLocationFromIP();
        //@ts-ignore
        if (locationData && locationData.loc) {
            //@ts-ignore
            setLocation(`${locationData.city}, ${locationData.region}`);
            //@ts-ignore
            onLocationUpdate(locationData.loc);
        } else {
            setLocation('Location unavailable');
            onLocationUpdate(''); // Update with empty string or null
        }
    };


    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    fetchAddress(position.coords.latitude, position.coords.longitude);
                },
                () => {
                    fetchApproximateLocation(); // Fetch location from IP
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
            fetchApproximateLocation(); // Fetch location from IP
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <div className='flex flex-row items-center gap-2'>
            <input
                type="text"
                className="sm:w-96 w-full border font-normal focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5"
                placeholder='Локация'
                value={location}
                readOnly
            />
            <div className='btn bg-white hover:bg-white border rounded-lg p-2.5' onClick={getLocation}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 14.6667C11.9725 14.6667 12.9051 14.2804 13.5927 13.5927C14.2804 12.9051 14.6667 11.9725 14.6667 11C14.6667 10.0275 14.2804 9.09491 13.5927 8.40728C12.9051 7.71964 11.9725 7.33333 11 7.33333C10.0275 7.33333 9.09491 7.71964 8.40728 8.40728C7.71964 9.09491 7.33333 10.0275 7.33333 11C7.33333 11.9725 7.71964 12.9051 8.40728 13.5927C9.09491 14.2804 10.0275 14.6667 11 14.6667ZM10.0833 3.72167V0.916667C10.0833 0.673552 10.1799 0.440394 10.3518 0.268485C10.5237 0.0965771 10.7569 0 11 0C11.2431 0 11.4763 0.0965771 11.6482 0.268485C11.8201 0.440394 11.9167 0.673552 11.9167 0.916667V3.72167C13.5325 3.92579 15.0344 4.66173 16.1859 5.81352C17.3373 6.96531 18.0728 8.46747 18.2765 10.0833H21.0833C21.3264 10.0833 21.5596 10.1799 21.7315 10.3518C21.9034 10.5237 22 10.7569 22 11C22 11.2431 21.9034 11.4763 21.7315 11.6482C21.5596 11.8201 21.3264 11.9167 21.0833 11.9167H18.2765C18.0728 13.5328 17.337 15.0352 16.1852 16.187C15.0333 17.3388 13.531 18.0746 11.9148 18.2783L11.9167 18.3333V21.0833C11.9167 21.3264 11.8201 21.5596 11.6482 21.7315C11.4763 21.9034 11.2431 22 11 22C10.7569 22 10.5237 21.9034 10.3518 21.7315C10.1799 21.5596 10.0833 21.3264 10.0833 21.0833V18.2783C8.4672 18.0746 6.96483 17.3388 5.813 16.187C4.66118 15.0352 3.92541 13.5328 3.72167 11.9167C3.70334 11.9172 3.685 11.9172 3.66667 11.9167H0.916667C0.673552 11.9167 0.440394 11.8201 0.268485 11.6482C0.0965771 11.4763 0 11.2431 0 11C0 10.7569 0.0965771 10.5237 0.268485 10.3518C0.440394 10.1799 0.673552 10.0833 0.916667 10.0833H3.66667C3.685 10.0828 3.70334 10.0828 3.72167 10.0833C3.92617 8.46786 4.66227 6.96633 5.81403 5.81524C6.96579 4.66414 8.46775 3.9289 10.0833 3.72533M5.5 11C5.5 12.4587 6.07946 13.8576 7.11091 14.8891C8.14236 15.9205 9.54131 16.5 11 16.5C12.4587 16.5 13.8576 15.9205 14.8891 14.8891C15.9205 13.8576 16.5 12.4587 16.5 11C16.5 9.54131 15.9205 8.14236 14.8891 7.11091C13.8576 6.07946 12.4587 5.5 11 5.5C9.54131 5.5 8.14236 6.07946 7.11091 7.11091C6.07946 8.14236 5.5 9.54131 5.5 11Z" fill="#3043BF" />
                </svg>
            </div>
        </div>
    );
}

export default Location;