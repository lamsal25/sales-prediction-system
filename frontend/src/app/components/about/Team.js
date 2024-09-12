// src/app/components/about/Team.js
import React from 'react';
import Image from 'next/image';

export default function Team() {
    const teamMembers = [
        {
            name: 'Roshan Lamsal',
            role: 'Frontend Developer',
            image: '/images/Roshan.jpg',
            description: 'Roshan is a seasoned data scientist with over 10 years of experience in machine learning and predictive analytics. He has a deep understanding of statistical modeling and has been instrumental in developing our core prediction algorithms.',
        },
        {
            name: 'Suman Gautam',
            role: 'Backend Developer',
            image: '/images/Suman.jpg',
            description: 'Suman specializes in creating intuitive and responsive user interfaces. With a strong background in web development, he ensures that our platforms are both user-friendly and aesthetically pleasing, providing a seamless experience for our clients.',
        },
        {
            name: 'Kushal Poudel',
            role: 'Data Scientist',
            image: '/images/Kushal.jpg',
            description: 'Kushal is an expert in backend development and system architecture. He is responsible for ensuring the scalability and security of our systems, enabling us to handle large volumes of data efficiently and securely.',
        },
    ];

    return (
        <div>
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto flex flex-col items-center text-center">
                    <h2 className="text-2xl font-bold text-indigo-800 mb-8">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-screen-xl">
                        {teamMembers.map((member) => (
                            <div key={member.name} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
                                <Image src={member.image} alt={member.name} height={150} width={150} className="rounded-full mb-4" />
                                <h3 className="text-xl font-semibold">{member.name}</h3>
                                <p className="text-sm text-gray-600">{member.role}</p>
                                <p className="mt-4 text-gray-700">{member.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
