
import React from 'react';

export default function Contact() {
    return (
        <div>
            <section className="py-12 bg-white text-center">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold text-indigo-800">Get in Touch</h2>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Ready to take your sales strategy to the next level? Contact us today to learn more about our services and how we can help your business grow.
                    </p>
                    <div className="mt-8">
                        <a href="mailto:contact@yourcompany.com" className="text-indigo-600 underline">
                            contact@salesprediction.com
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
