import React from 'react';
import { toast } from "@/components/ui/use-toast";
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Users, BookOpen } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you'd clear authentication tokens here
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
      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-ojtrack-blue mb-6">Welcome to OJ.Track Dashboard</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            From here you can monitor students and supervisors, view records, evaluations, and attendance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Dashboard cards for quick access */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
              <Users className="text-ojtrack-blue mb-4 h-12 w-12" />
              <h3 className="text-lg font-semibold mb-2">Students</h3>
              <p className="text-gray-500 text-sm text-center">View and manage student information</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
              <Users className="text-ojtrack-blue mb-4 h-12 w-12" />
              <h3 className="text-lg font-semibold mb-2">Supervisors</h3>
              <p className="text-gray-500 text-sm text-center">View and manage supervisor information</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow">
              <BookOpen className="text-ojtrack-blue mb-4 h-12 w-12" />
              <h3 className="text-lg font-semibold mb-2">Records</h3>
              <p className="text-gray-500 text-sm text-center">Access student and supervisor records</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
