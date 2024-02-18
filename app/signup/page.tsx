import React from 'react';
import { SignUp } from "@clerk/nextjs";

const SignUpComponent = () => {
    return (
        // Using flex, justify-center, and items-center to center the content
        // The min-h-screen ensures the div takes at least the height of the screen
        <div className="flex justify-center items-center min-h-screen">
            <SignUp />
        </div>
    );
};

export default SignUpComponent;
