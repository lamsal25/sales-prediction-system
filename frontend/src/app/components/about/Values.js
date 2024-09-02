
import React from 'react';
import Image from 'next/image';

export default function Values() {
    const values = [
        {
            title: 'Integrity',
            description: 'We uphold the highest standards of integrity in all our actions, ensuring that our clients can trust us to act in their best interests at all times.',
            logo: '/images/2.png', 
        },
        {
            title: 'Innovation',
            description: 'Innovation is at the heart of what we do. We continuously seek new ways to improve our technology and processes, pushing the boundaries of what is possible.',
            logo: '/images/1.png',
        },
        {
            title: 'Customer Focus',
            description: 'Our clients are at the center of everything we do. We listen to their needs, understand their challenges, and tailor our solutions to help them achieve their goals.',
            logo: '/images/3.png',
        },
    ];

    return (
        <div>
            <section className="py-12 bg-white px-9">
                <div className="container mx-auto flex flex-col items-center text-center">
                    <h2 className="text-2xl font-bold text-indigo-800 mb-8">Our Core Values</h2>
                    <div className="flex flex-col md:flex-row justify-around items-center w-full max-w-screen-xl">
                        {values.map((value) => (
                            <div key={value.title} className="bg-gray-100 p-6 rounded-lg shadow-md text-center max-w-xs">
                                <Image src={value.logo} alt={value.title} height={250} width={250} className="mb-4 object-contain mx-auto" />
                                <h3 className="text-xl font-semibold text-indigo-600">{value.title}</h3>
                                <p className="mt-4 text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
