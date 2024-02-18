import React from 'react';
import { SignIn } from "@clerk/nextjs";

const SignInComponent = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <SignIn />
        </div>
    );
};

export default SignInComponent;
