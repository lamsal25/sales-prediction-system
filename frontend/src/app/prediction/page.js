"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

export default function SalesForm() {
    const [types, setTypes] = useState([]);
    const [stores, setStores] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [selectedType, setSelectedType] = useState("");
    const [selectedStore, setSelectedStore] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [size, setSize] = useState("");
    const [cpi, setCpi] = useState("");
    const [week, setWeek] = useState("");
    const [selectedDate, setSelectedDate] = useState("");


    const [prediction, setPrediction] = useState([]);

    // Fetch types on component mount
    useEffect(() => {
        const getTypes = async () => {
            const response = await axios.get("http://localhost:8000/api/types/");
            setTypes(response.data.types);
        };
        getTypes();
    }, []);

    // Fetch stores when type changes
    useEffect(() => {
        const getStores = async () => {
            if (selectedType) {
                const response = await axios.get(`http://localhost:8000/api/stores/${selectedType}`);
                setStores(response.data.stores);
            } else {
                setStores([]);
            }
        };
        getStores();
    }, [selectedType]);

    // Fetch departments when store changes
    useEffect(() => {
        const getDepartments = async () => {
            if (selectedStore) {
                const response = await axios.get(`http://localhost:8000/api/departments/${selectedStore}`);
                setDepartments(response.data.departments);
            } else {
                setDepartments([]);
            }
        };
        getDepartments();
    }, [selectedStore]);

    // Fetch size when type, store, or department changes
    useEffect(() => {
        const getSize = async () => {
            if (selectedType && selectedStore && selectedDepartment) {
                try {
                    const response = await axios.get(
                        `http://localhost:8000/api/size/${selectedType}/${selectedStore}/${selectedDepartment}`
                    );
                    setSize(response.data.size); // Automatically set size
                } catch (error) {
                    console.error("Error fetching size:", error);
                    setSize(""); // Reset size if not found
                }
            } else {
                setSize(""); // Reset size when prerequisites are not selected
            }
        };
        getSize();
    }, [selectedType, selectedStore, selectedDepartment]);

    // Fetch the current week number from the backend
    const handleDateChange = (dateStr) => {
        setSelectedDate(dateStr);

        if (!dateStr) {
            setWeek("");
            return;
        }

        const date = new Date(dateStr);
        const firstJan = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstJan) / 86400000;
        const weekNumber = Math.ceil((pastDaysOfYear + firstJan.getDay() + 1) / 7);

        setWeek(weekNumber);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            type: selectedType,
            store: selectedStore,
            department: selectedDepartment,
            size,
            cpi,
            week
        };


        try {
            const response = await axios.post("http://localhost:8000/api/predict/", formData);

            // Go into predicted_sales directly
            const predictions = response.data.predicted_sales;

            // Now turn the object into an array of [week, value]
            const predictionsArray = Object.entries(predictions);

            console.log("Predictions array:", predictionsArray); // should log [['Week_12', 2546.48], ...]

            setPrediction(predictionsArray);  // Now you have the right array
        } catch (error) {
            console.error("Error predicting sales:", error);
        }



        console.log("Predictions:", prediction);
    };

    return (
        <>
            <Navbar />
            <div
                className="flex items-center justify-center min-h-screen  bg-gradient-to-b from-[#1C2C4C] to-[#f2b383] p-6"
            >
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center text-indigo-600 mb-10 mt-6">
                        Sales Prediction Form
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                Type of store
                            </label>
                            <select
                                id="type"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Select Type</option>
                                {types.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="store" className="block text-sm font-medium text-gray-700">
                                Store Location
                            </label>
                            <select
                                id="store"
                                value={selectedStore}
                                onChange={(e) => setSelectedStore(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                disabled={!selectedType}
                            >
                                <option value="">Select Store</option>
                                {stores.map((store) => (
                                    <option key={store.id} value={store.id}>
                                        {store.name}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <div className="mb-4">
                            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                                Department Name
                            </label>
                            <select
                                id="department"
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                disabled={!selectedStore}
                            >
                                <option value="">Select Department</option>
                                {departments.map((department) => (
                                    <option key={department.id} value={department.id}>
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                                Size of store( in m<sup>2</sup>)
                            </label>
                            <input
                                type="text"
                                id="size"
                                value={size}
                                readOnly
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                            />
                        </div>

                        {/* <div className="mb-4">
                            <label htmlFor="cpi" className="block text-sm font-medium text-gray-700">
                                CPI
                            </label>
                            <input
                                type="number"
                                id="cpi"
                                value={100} // Set CPI to a constant 100
                                disabled // Prevent user from changing the value
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            />
                        </div> */}

                        <div className="mb-4">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                Select a Date
                            </label>
                            <input
                                type="date"
                                id="date"
                                value={selectedDate}
                                onChange={(e) => handleDateChange(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100"
                            />
                        </div>


                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                        >
                            Predict Sales
                        </button>
                    </form>



                    {prediction && prediction.length > 0 ? (
                        <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg">
                            <h2 className="text-lg font-semibold mb-4 text-center">Predicted Sales for Upcoming months:</h2>
                            <ul className="space-y-2">
                                {prediction.map(([week, value], index) => (
                                    <li key={index} className="flex justify-between border-b pb-2">
                                        <span className="font-medium">{week}:</span>
                                        <span>${parseFloat(value).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No predictions yet.</p>
                    )}


                </div>
            </div>
            <Footer />
        </>
    );
}
