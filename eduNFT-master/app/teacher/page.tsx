"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TeacherDashboard = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("/api/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, action: "register" }),
      });
      const data = await response.json();
      console.log("Registration response:", data);
      if (data.id) {
        localStorage.setItem("teacherId", data.id);
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, action: "login" }),
      });
      const data = await response.json();
      console.log("Login response:", data);
      if (data[0].id) {
        let id = data[0].id;
        localStorage.setItem("teacherId", data[0].id);
        router.push(`/teacher/${data[0].id}`);
      } else {
        console.error("Login failed: ID not returned");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Create Account / Login
        </h1>
        <input
          className="w-full mb-4 p-2 border rounded"
          type="email"
          placeholder="example@123.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex space-x-4 justify-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleRegister}
          >
            Register
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
