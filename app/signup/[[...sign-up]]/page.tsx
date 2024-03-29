//Copyright (C) 2024  Vladimir Pasev
import React from 'react';
import { SignUp } from "@clerk/nextjs";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Регистрация | Eventify',
    description: 'Регистрирайте акаунт в Eventify',
    alternates: {
        canonical: `https://www.eventify.bg/signup`,
    },
    openGraph: {
      images: `https://www.eventify.bg/images/opengraph.png`,
  }
}

const SignUpComponent = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <SignUp />
        </div>
    );
};

export default SignUpComponent;
