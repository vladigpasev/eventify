import React from 'react';
import { SignIn } from "@clerk/nextjs";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Вход | Eventify',
    description: 'Влезте в профила си в Eventify',
    alternates: {
        canonical: `https://www.eventify.bg/signin`,
    },
    openGraph: {
      images: `https://www.eventify.bg/images/opengraph.png`,
  }
}

const SignInComponent = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <SignIn />
        </div>
    );
};

export default SignInComponent;
