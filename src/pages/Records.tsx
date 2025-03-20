
import React from 'react';
import Navbar from '@/components/Navbar';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Records = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center z-10 bg-ojtrack-blue text-white">
        <Logo />
        <Button 
          variant="outline" 
          className="text-white border-white hover:bg-white hover:text-ojtrack-blue"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </header>

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
