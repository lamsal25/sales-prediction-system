import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

export default function Reports() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Main Content Area - Takes Remaining Space */}
      <div className="flex-grow flex justify-center items-center bg-gray-100 p-4">
        <iframe
          src="http://localhost:8000/api/report/"
          className="w-full border rounded-lg shadow-lg"
          height="800px"
        />
      </div>

      <Footer />
    </div>
  );
}
