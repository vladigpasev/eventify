//Copyright (C) 2024  Vladimir Pasev
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setIsScrolled(position > 20);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className={`w-full py-5 navbar-transition z-50 fixed ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'} transition-all duration-300 ease-in-out`}>
            <div className='container mx-auto px-4 flex justify-between items-center'>
                <Link href="/"><img src="/logo.png" alt='Logo' className="w-36" /></Link>
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className={`${isScrolled ? 'text-black hover:text-gray-500' : 'text-gray-300 hover:text-gray-100'} focus:outline-none`}>
                        {isOpen ? (
                            // Close icon (X)
                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        ) : (
                            // Hamburger icon (Menu)
                            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        )}
                    </button>
                </div>
                <div className={`lg:flex lg:items-center ${isOpen ? 'block' : 'hidden'} absolute lg:static top-full left-0 right-0 bg-white lg:bg-transparent shadow-md lg:shadow-none py-4 lg:p-0`}>
                    <ul className={`flex flex-col lg:flex-row gap-6 ${isScrolled ? 'text-black' : 'text-black lg:text-gray-300'} items-center whitespace-nowrap`}>
                        <li><Link href="/#">Начало</Link></li>
                        <li><Link href="/#about">За нас</Link></li>
                        <li><Link href="/#services">Услуги</Link></li>
                        <li><Link href="/#reviews">Отзиви</Link></li>
                        <li><Link href="/#pricing">Цени</Link></li>
                        <li><Link href="/#contacts">Контакти</Link></li>
                    </ul>
                    <div className='w-full flex justify-center lg:justify-start'>
                        <Link href="/events" className='btn bg-[#3042bf] border-none text-white mt-4 lg:mt-0 lg:ml-4'>Виж събития</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;