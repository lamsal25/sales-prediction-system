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

        // Convert formData to encoded values
        const dataToSend = {
            Item_Type: itemTypeMapping[formData.Item_Type],
            Item_MRP: parseFloat(formData.Item_MRP),
            Outlet_Identifier: outletIdentifierMapping[formData.Outlet_Identifier],
            Outlet_Location_Type: outletLocationTypeMapping[formData.Outlet_Location_Type],
            Outlet_Type: outletTypeMapping[formData.Outlet_Type],
            Item_Fat_Content: itemFatContentMapping[formData.Item_Fat_Content],
            Outlet_Size: outletSizeMapping[formData.Outlet_Size]
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/predict/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
            const result = await response.json();
            setPredictedSales(result.predicted_sales);
        } catch (error) {
            console.error("Error predicting sales:", error);
        }
    };

    // Define mappings for each field
    const itemTypeMapping = {
        "Dairy": 0, "Soft Drinks": 1, "Meat": 2, "Fruits and Vegetables": 3,
        "Household": 4, "Baking Goods": 5, "Snack Foods": 6, "Frozen Foods": 7,
        "Breakfast": 8, "Health and Hygiene": 9, "Hard Drinks": 10, "Canned": 11,
        "Breads": 12, "Starchy Foods": 13, "Others": 14, "Seafood": 15
    };

    const outletIdentifierMapping = {
        "OUT010": 0, "OUT013": 1, "OUT017": 2, "OUT018": 3, "OUT019": 4,
        "OUT027": 5, "OUT035": 6, "OUT045": 7, "OUT046": 8, "OUT049": 9
    };

    const outletLocationTypeMapping = {
        "Tier 1": 0, "Tier 2": 1, "Tier 3": 2
    };

    const outletTypeMapping = {
        "Grocery Store": 0, "Supermarket Type1": 1, "Supermarket Type2": 2, "Supermarket Type3": 3
    };

    const itemFatContentMapping = {
        "Low Fat": 0, "Regular": 1
    };

    const outletSizeMapping = {
        "High": 0, "Medium": 1, "Small": 2
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#1f1f2e] to-[#2a2a3d] text-white">
            <div className="w-full max-w-md p-8 bg-gradient-to-b from-[#1f1f2e] to-[#2a2a3d] rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center text-[#f7931e] mb-6">Sales Prediction Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Item Type:</label>
                        <select name="Item_Type" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none hover:border-[#f7931e]">
                            <option value="">Select Item Type</option>
                            {Object.keys(itemTypeMapping).map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Item MRP:</label>
                        <input type="number" name="Item_MRP" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#f7931e]" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Outlet Identifier:</label>
                        <select name="Outlet_Identifier" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#f7931e]">
                            <option value="">Select Outlet Identifier</option>
                            {Object.keys(outletIdentifierMapping).map((outlet) => (
                                <option key={outlet} value={outlet}>{outlet}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Outlet Location Type:</label>
                        <select name="Outlet_Location_Type" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#f7931e]">
                            <option value="">Select Location Type</option>
                            {Object.keys(outletLocationTypeMapping).map((location) => (
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Outlet Type:</label>
                        <select name="Outlet_Type" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#f7931e]">
                            <option value="">Select Outlet Type</option>
                            {Object.keys(outletTypeMapping).map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Item Fat Content:</label>
                        <select name="Item_Fat_Content" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#f7931e]">
                            <option value="">Select Fat Content</option>
                            {Object.keys(itemFatContentMapping).map((fat) => (
                                <option key={fat} value={fat}>{fat}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Outlet Size:</label>
                        <select name="Outlet_Size" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#f7931e]">
                            <option value="">Select Outlet Size</option>
                            {Object.keys(outletSizeMapping).map((size) => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="w-full py-2 mt-4 text-lg font-semibold text-white bg-[#f7931e] rounded-lg hover:bg-orange-600 transition-colors">Predict Sales</button>
                </form>

                {predictedSales ? (
                    <div className="mt-6 p-4 bg-gray-900 rounded-lg text-center">
                        <h3 className="text-xl font-semibold text-[#f7931e]">Predicted Sales: ${predictedSales.toFixed(2)}</h3>
                    </div>
                ) : null}

            </div>
        </div>
    );
}
