"use client"

import { useState } from 'react';

export default function PredictionForm() {
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
        <div>
            <h2>Sales Prediction Form</h2>
            <form onSubmit={handleSubmit}>
                <label>Item Type:</label>
                <input type="text" name="Item_Type" onChange={handleChange} required />

                <label>Item MRP:</label>
                <input type="number" name="Item_MRP" onChange={handleChange} required />

                <label>Outlet Identifier:</label>
                <input type="text" name="Outlet_Identifier" onChange={handleChange} required />

                <label>Outlet Location Type:</label>
                <input type="text" name="Outlet_Location_Type" onChange={handleChange} required />

                <label>Outlet Type:</label>
                <input type="text" name="Outlet_Type" onChange={handleChange} required />

                <label>Item Fat Content:</label>
                <input type="text" name="Item_Fat_Content" onChange={handleChange} required />

                <label>Outlet Size:</label>
                <input type="text" name="Outlet_Size" onChange={handleChange} required />

                <button type="submit">Predict Sales</button>
            </form>

            {predictedSales !== null && (
                <div>
                    <h3>Predicted Sales: ${predictedSales.toFixed(2)}</h3>
                </div>
            )}
        </div>
    );
}
