"use client";
import React, { useState } from "react";
import AdminComponent from "./AdminComponent.js";
import StaffComponent from "./StaffComponent.js";
import ReceptionComponent from "./ReceptionComponent.js";
import { Button } from "@/components/button";

export default function UserSelection() {
  const [selectedUser, setSelectedUser] = useState(null); // No type annotation needed in JS

  const renderComponent = () => {
    switch (selectedUser) {
      case "admin":
        return <AdminComponent />;
      case "staff":
        return <StaffComponent />;
      case "reception":
        return <ReceptionComponent />;
      default:
        // return <p>Please select a user type.</p>;
    }
  };

  return (
    <div className="relative bg-gray-200 p-6 rounded-lg shadow-md">
      <button
        onClick={() => setSelectedUser("admin")}
        className="bg-black text-white p-4 rounded-md border border-gray-300 hover:bg-white hover:text-black transition duration-300 w-full mb-4"
      >
        Admin
      </button>
      <button
        onClick={() => setSelectedUser("staff")}
        className="bg-black text-white p-4 rounded-md border border-gray-300 hover:bg-white hover:text-black transition duration-300 w-full mb-4"
      >
        Staff
      </button>
      <button
        onClick={() => setSelectedUser("reception")}
        className="bg-black text-white p-4 rounded-md border border-gray-300 hover:bg-white hover:text-black transition duration-300 w-full"
      >
        Reception
      </button>

      <div className="mt-6 w-full p-4 border rounded-lg shadow-md">
        {renderComponent()}
      </div>
    </div>
  );
}
