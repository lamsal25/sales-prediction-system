
import React from 'react';
import Image from 'next/image';

export default function MemberCard({ name, role, image, description }) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="relative w-32 h-32 mx-auto">
                <Image 
                    src={image} 
                    alt={name} 
                    layout="fill" 
                    objectFit="cover" 
                    className="rounded-full" 
                />
            </div>
            <h3 className="mt-4 text-xl font-semibold">{name}</h3>
            <p className="text-gray-500">{role}</p>
            <p className="mt-2 text-gray-600">{description}</p>
        </div>
    );
}
