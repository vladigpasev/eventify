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
                <path d="M73.44 205.63l212.31 212.31 389.86-389.86-212.31-212.31-389.86 389.86zm847.96-290.63L830.9 91.58c-119.46 119.46-164.2-164.2-164.2-164.2l-90.1-90.1c-60.73 0-60.73 60.73 0 60.73l90.1 90.1c0 0 283.66-44.74 164.2 164.2l90.1 90.1c60.73 0 60.73-60.73 0-60.73zm-212.31 997.93l-309.56-309.54L464.4 512l309.55 309.55-212.31 212.31z" fill="currentColor" />
            </svg>

        )
    }

    const OrganizeIcon = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20,2H4C2.9,2,2,2.9,2,4v16c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M12,20H4v-4h8V20z M12,14H4v-4h8V14z M20,20h-6v-4h6V20z M20,14h-6v-4h6V14z"/>
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
                            <UserButton.UserProfileLink
                                label="Организирай"
                                url="https://organize.eventify.bg/"
                                labelIcon={<OrganizeIcon />}
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
