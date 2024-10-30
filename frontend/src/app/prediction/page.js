"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PredictionForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        Item_Type: '',
        Item_MRP: '',
        Outlet_Identifier: '',
        Outlet_Location_Type: '',
        Outlet_Type: '',
        Item_Fat_Content: '',
        Outlet_Size: ''
    });

    const [predictedSales, setPredictedSales] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/predict/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            setPredictedSales(result.predicted_sales);
        } catch (error) {
            console.error("Error predicting sales:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1f1f2e] to-[#2a2a3d] text-white">
            <div className="w-full max-w-md p-8 bg-gradient-to-b from-[#1f1f2e] to-[#2a2a3d] rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-[#f7931e] mb-6">Sales Prediction Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Item Type:</label>
                        <input type="text" name="Item_Type" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#f7931e]" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Item MRP:</label>
                        <input type="number" name="Item_MRP" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#f7931e]" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Outlet Identifier:</label>
                        <input type="text" name="Outlet_Identifier" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#f7931e]" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Outlet Location Type:</label>
                        <input type="text" name="Outlet_Location_Type" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#f7931e]" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Outlet Type:</label>
                        <input type="text" name="Outlet_Type" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#f7931e]" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Item Fat Content:</label>
                        <input type="text" name="Item_Fat_Content" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#f7931e]" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Outlet Size:</label>
                        <input type="text" name="Outlet_Size" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#f7931e]" />
                    </div>
                    <button type="submit" className="w-full py-2 mt-4 text-lg font-semibold text-white bg-[#f7931e] rounded-lg hover:bg-orange-600 transition-colors">Predict Sales</button>
                </form>
                
                {predictedSales !== null && (
                    <div className="mt-6 p-4 bg-gray-900 rounded-lg text-center">
                        <h3 className="text-xl font-semibold text-[#f7931e]">Predicted Sales: ${predictedSales.toFixed(2)}</h3>
                    </div>
                )}
            </div>
        </div>
    );
} 