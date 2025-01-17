import React from 'react';

export default function Home() {
    return (
        <div className="mx-auto w-full max-w-7xl flex items-center">
            {/* Text card section */}
            <div className="w-min-screen sm:w-3/5 px-4 py-10 sm:py-20  mx-auto sm:px-6 lg:px-8 mb-44 mt-32">
                <div className="bg-white text-gray-900 p-8 rounded-lg shadow-xl bg-opacity-70 h-full">
                   <img
                   src="/logo.png"
                   alt="Logo"
                   className="w-40 h-40 rl mx-auto mb-4"
                   
                   />
                    <p className="leading-relaxed">
                        <span className="block xl:text-xl  2xl:text-xl sm:text-sm md:text-sm font-semibold underline mb-4">Write Up</span>

                        {/* This content will be hidden on small and medium screens */}
                        <span className="lg:inline sm:inline md:inline">
                        Blog Writing Web App is a powerful platform designed to transform the way you create, manage, and maintain your blogs. With its sleek, user-friendly interface, the app makes it incredibly easy to create, edit, update, and delete posts—all with just a few clicks. Whether you’re a seasoned blogger or just getting started, this app gives you full control over your content, ensuring that each blog post is perfectly tailored, well-organized, and easily accessible. The app also securely stores your content, so you can rest assured that your work is safe. </span>
                    
                        
                        </p>
                </div>
            </div>
        </div>
    );
}
