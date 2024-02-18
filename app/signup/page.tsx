import React from 'react';
import { SignUp } from "@clerk/nextjs";

const SignUpComponent = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <SignUp />
        </div>
    );
};

export default SignUpComponent;
