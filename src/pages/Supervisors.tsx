
import React from 'react';
import Navbar from '@/components/Navbar';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const Supervisors = () => {
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
        <h1 className="text-3xl font-heading font-bold text-ojtrack-blue mb-6">Supervisors List</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-4">
            Here you can view and manage the list of all supervisors in the system.
          </p>
          {/* Placeholder for supervisor list table */}
          <div className="border rounded-lg p-4 bg-gray-50 text-center">
            Supervisor data table will be displayed here
          </div>
        </div>
      </main>
    </div>
  );
};

export default Supervisors;
