"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const TeacherDashboard = () => {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [courseName, setCourseName] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [collections, setCollections] = useState<
    {
      id: number;
      name: string;
      is_approved: boolean;
      contractAddress: string;
    }[]
  >([]);
  useEffect(() => {
    if (id) {
      fetchCollections(id);
      const intervalId = setInterval(() => fetchCollections(id), 5000);
      return () => clearInterval(intervalId);
    } else {
      router.push("/teacher");
    }
  }, [id, router]);

  const fetchCollections = async (teacherId: string) => {
    try {
      const response = await fetch(`/api/collections?teacherId=${teacherId}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        console.log(data);
        setCollections(data);
      } else {
        console.error("Data is not an array:", data);
        setCollections([]);
      }
    } catch (error) {
      console.error("Error fetching collections:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: courseName,
          is_approved: false,
          contractAddress: contractAddress,
          teacher_id: id,
        }),
      });
      const data = await response.json();
      console.log("Collection submission response:", data);
      setCourseName("");
      setContractAddress("");
      alert("Application submitted!");
      fetchCollections(id);
    } catch (error) {
      console.error("Error submitting collection:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Apply Course</h1>
        <input
          className="w-full mb-4 p-2 border rounded"
          type="text"
          placeholder="Collection Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <button
          className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Collection Name</th>
            <th className="py-2 px-4 border-b text-left">Contract Address</th>
            <th className="py-2 px-4 border-b text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((collection, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b text-left">
                {collection.name}
              </td>
              <td className="py-2 px-4 border-b text-left">
                {collection.contractAddress}
              </td>
              <td className="py-2 px-4 border-b text-left">
                <button
                  className={`px-4 py-2 rounded ${
                    collection.is_approved
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                  disabled={!collection.is_approved}
                >
                  {collection.is_approved ? "Approved" : "Not Approved"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherDashboard;
