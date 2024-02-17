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
            <div className='container mx-auto px-4 flex justify-between items-center flex-grow'>
                <Link href="/"><img src="/logo.png" alt='Logo' className="w-36" /></Link>
                <SignedIn>
                     <UserButton />
                </SignedIn>
                <SignedOut>
                    <Link href="/signin" className='btn bg-[#3042bf] border-none text-white mt-0 ml-4'>Sign In</Link>
                </SignedOut>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
