//Copyright (C) 2024  Vladimir Pasev
"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import {
    UserButton,
    SignedIn,
    SignedOut
} from "@clerk/nextjs";


const DashboardNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className={`w-full navbar-transition z-50 bg-white shadow-md transition-all duration-300 ease-in-out py-3`}>
            <div className='container mx-auto px-4 flex sm:flex-row flex-col sm:gap-0 gap-3 justify-between items-center flex-grow'>
                <Link href="/events"><img src="/logo.png" alt='Logo' className="w-36" /></Link>
                <SignedIn>
                    <div className='flex flex-row-reverse items-center gap-5'>
                        <UserButton />
                        <Link href='/my-tickets' className='bg-gray-200 rounded p-2 btn'>Билети</Link>
                        <Link href='/events' className='bg-gray-200 rounded p-2 btn'>Събития</Link>
                    </div>
                </SignedIn>
                <SignedOut>
                    <div className='flex flex-row-reverse items-center gap-5'>
                        <Link href="/signin" className='btn bg-[#3042bf] border-none text-white mt-0 ml-4'>Вход</Link>
                        <Link href='/events' className='bg-gray-200 rounded p-2 btn'>Събития</Link>
                    </div>
                </SignedOut>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
