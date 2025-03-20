
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';

const Records = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Admin User");

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    // Load username from localStorage if available
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header userName={userName} />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-heading font-bold text-ojtrack-blue mb-6">Records</h1>
        
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="students">Student Records</TabsTrigger>
            <TabsTrigger value="supervisors">Supervisor Records</TabsTrigger>
          </TabsList>
          
          <TabsContent value="students" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Student Records</h2>
            <p className="text-gray-600 mb-4">
              View detailed records and history for all students.
            </p>
            {/* Placeholder for student records */}
            <div className="border rounded-lg p-4 bg-gray-50 text-center">
              Student records will be displayed here
            </div>
          </TabsContent>
          
          <TabsContent value="supervisors" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Supervisor Records</h2>
            <p className="text-gray-600 mb-4">
              View detailed records and history for all supervisors.
            </p>
            {/* Placeholder for supervisor records */}
            <div className="border rounded-lg p-4 bg-gray-50 text-center">
              Supervisor records will be displayed here
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Records;
