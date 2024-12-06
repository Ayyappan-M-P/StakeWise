"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    country: "",
    city: "",
    bankName: "",
    accountNo: "",
    ifscCode: "",
    password: "",
  });

  const router = useRouter(); // Initialize the router for navigation

  useEffect(() => {
    // Call the test API
    fetch("/api/test")
      .then((response) => response.json())
      .then((data) => console.log(data.message)) // Should log: "Backend is connected!"
      .catch((error) => console.error("Error connecting to backend:", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Display success message
        router.push("/Login"); // Navigate to the login page
      } else {
        alert(data.message); // Display error message
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label>{key}</label>
          <input
            type={key === "password" ? "password" : "text"}
            name={key}
            value={formData[key as keyof typeof formData]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
