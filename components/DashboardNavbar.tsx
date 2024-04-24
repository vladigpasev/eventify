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
    const DotIcon = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
    <path d="M73.44 205.63l212.31 212.31 389.86-389.86-212.31-212.31-389.86 389.86zm847.96-290.63L830.9 91.58c-119.46 119.46-164.2-164.2-164.2-164.2l-90.1-90.1c-60.73 0-60.73 60.73 0 60.73l90.1 90.1c0 0 283.66-44.74 164.2 164.2l90.1 90.1c60.73 0 60.73-60.73 0-60.73zm-212.31 997.93l-309.56-309.54L464.4 512l309.55 309.55-212.31 212.31z" fill="currentColor"/>
</svg>

        )
    }

    return (
        <nav className={`w-full navbar-transition z-50 bg-white shadow-md transition-all duration-300 ease-in-out py-3`}>
            <div className='container mx-auto px-4 flex sm:flex-row flex-col sm:gap-0 gap-3 justify-between items-center flex-grow'>
                <a href="/events"><img src="/logo.png" alt='Logo' className="w-36" /></a>
                <SignedIn>
                    <div className='flex flex-row-reverse items-center gap-5'>
                        <UserButton afterSignOutUrl='/'>
                            <UserButton.UserProfileLink
                                label="Моите билети"
                                url="/my-tickets"
                                labelIcon={<DotIcon />}
                            />
                        </UserButton>
                    </div>
                </SignedIn>
                <SignedOut>
                    <div className='flex flex-row-reverse items-center gap-5'>
                        <Link href="/signin" className='btn bg-[#3042bf] border-none text-white mt-0 ml-4'>Вход</Link>
                    </div>
                </SignedOut>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
