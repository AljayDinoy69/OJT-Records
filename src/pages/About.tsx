
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Info, BookOpen, Code, Users, Shield } from "lucide-react";
import Navbar from '@/components/Navbar';
import Logo from '@/components/Logo';

const About = () => {
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
      <main className="flex-1 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Info className="h-6 w-6 text-ojtrack-blue" />
            <h1 className="text-3xl font-heading font-bold text-ojtrack-blue">About this Web App</h1>
          </div>
          
          <Card className="shadow-md mb-6">
            <CardHeader>
              <CardTitle>OJTrack: On-the-Job Training Management System</CardTitle>
              <CardDescription>Version 1.0.0</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                OJTrack is a comprehensive on-the-job training management system designed to streamline the process of tracking student internships and supervisory oversight. Our platform provides tools for attendance monitoring, evaluation, and reporting.
              </p>
              
              <div className="flex items-start gap-2 mt-4">
                <BookOpen className="h-5 w-5 text-ojtrack-blue mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold">Mission</h3>
                  <p className="text-gray-600">
                    To simplify and enhance the on-the-job training experience for students, supervisors, and administrators through intuitive digital tools and real-time tracking capabilities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                <span>Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2">Student Management</h3>
                  <p className="text-sm text-gray-600">Register and manage student profiles, track their training progress.</p>
                </div>
                
                <div className="border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2">Supervisor Oversight</h3>
                  <p className="text-sm text-gray-600">Assign supervisors, monitor their engagement, and facilitate communication.</p>
                </div>
                
                <div className="border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2">Attendance Tracking</h3>
                  <p className="text-sm text-gray-600">Record and monitor daily attendance with sign-in and sign-out capabilities.</p>
                </div>
                
                <div className="border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2">Performance Evaluation</h3>
                  <p className="text-sm text-gray-600">Structured assessment tools for evaluating student performance during training.</p>
                </div>
                
                <div className="border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2">Reporting & Analytics</h3>
                  <p className="text-sm text-gray-600">Generate comprehensive reports and visualize training data with interactive charts.</p>
                </div>
                
                <div className="border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2">User-Friendly Dashboard</h3>
                  <p className="text-sm text-gray-600">Intuitive interface with key metrics and information at a glance.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>Development Team</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">OJTrack was developed by a dedicated team of professionals committed to improving the on-the-job training experience.</p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="h-20 w-20 bg-ojtrack-blue rounded-full mx-auto flex items-center justify-center text-white text-xl font-bold">
                    JD
                  </div>
                  <h3 className="font-semibold mt-2">John Doe</h3>
                  <p className="text-sm text-gray-500">Lead Developer</p>
                </div>
                
                <div className="text-center">
                  <div className="h-20 w-20 bg-ojtrack-blue rounded-full mx-auto flex items-center justify-center text-white text-xl font-bold">
                    JS
                  </div>
                  <h3 className="font-semibold mt-2">Jane Smith</h3>
                  <p className="text-sm text-gray-500">UX Designer</p>
                </div>
                
                <div className="text-center">
                  <div className="h-20 w-20 bg-ojtrack-blue rounded-full mx-auto flex items-center justify-center text-white text-xl font-bold">
                    RJ
                  </div>
                  <h3 className="font-semibold mt-2">Robert Johnson</h3>
                  <p className="text-sm text-gray-500">Project Manager</p>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="flex items-center gap-2 text-center justify-center">
                <Shield className="h-5 w-5 text-ojtrack-blue" />
                <p className="text-sm">© 2023 OJTrack. All rights reserved.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
