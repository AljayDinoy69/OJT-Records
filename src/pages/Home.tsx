
import React from 'react';
import { toast } from "@/components/ui/use-toast";
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you'd clear authentication tokens here
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen auth-background flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center z-10">
        <Logo />
        <Button 
          variant="outline" 
          className="text-white border-white hover:bg-white hover:text-ojtrack-blue"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="text-center">
          <h1 className="text-5xl font-heading font-bold text-white mb-6">Welcome to OJ.Track</h1>
          <p className="text-xl text-white text-opacity-80 mb-8 max-w-2xl mx-auto">
            You've successfully logged in to the platform. This is your dashboard where you can track and manage your activities.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
