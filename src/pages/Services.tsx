
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ListChecks, FileText, BarChart3, MessageSquare, Award, Calendar, FileBarChart, Settings, ArrowRight } from "lucide-react";
import Navbar from '@/components/Navbar';
import Logo from '@/components/Logo';

const Services = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/login');
  };

  const handleServiceClick = (service: string) => {
    toast({
      title: "Service Selected",
      description: `You've selected the ${service} service. This feature will be available soon.`,
    });
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
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <ListChecks className="h-6 w-6 text-ojtrack-blue" />
            <h1 className="text-3xl font-heading font-bold text-ojtrack-blue">Services</h1>
          </div>
          
          <p className="text-gray-600 mb-8 max-w-2xl">
            OJTrack provides a comprehensive suite of services designed to simplify and enhance the on-the-job training experience. Explore our offerings below.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Attendance Monitoring */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-ojtrack-blue" />
                  <span>Attendance Monitoring</span>
                </CardTitle>
                <CardDescription>Track daily attendance with precision</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Our attendance monitoring service provides real-time tracking of student and supervisor attendance, with sign-in and sign-out capabilities, absence reporting, and automated notifications.
                </p>
                <div className="mt-3 text-sm font-medium flex items-center gap-1 text-ojtrack-blue">
                  <span>Available Now</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => navigate('/attendance')}
                >
                  Access Service
                </Button>
              </CardFooter>
            </Card>
            
            {/* Performance Evaluation */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-ojtrack-blue" />
                  <span>Performance Evaluation</span>
                </CardTitle>
                <CardDescription>Structured assessment tools</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Comprehensive evaluation tools for assessing student performance during training, including customizable criteria, rating scales, and feedback mechanisms.
                </p>
                <div className="mt-3 text-sm font-medium flex items-center gap-1 text-ojtrack-blue">
                  <span>Available Now</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => navigate('/evaluation')}
                >
                  Access Service
                </Button>
              </CardFooter>
            </Card>
            
            {/* Documentation Management */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-ojtrack-blue" />
                  <span>Documentation Management</span>
                </CardTitle>
                <CardDescription>Organize training documents</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Centralized storage for all training-related documents, including forms, guidelines, certificates, and reports, with version control and access permissions.
                </p>
                <div className="mt-3 text-sm font-medium flex items-center gap-1 text-ojtrack-blue">
                  <span>Available Now</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  onClick={() => navigate('/records')}
                >
                  Access Service
                </Button>
              </CardFooter>
            </Card>
            
            {/* Data Analytics */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-ojtrack-blue" />
                  <span>Data Analytics</span>
                </CardTitle>
                <CardDescription>Insights from training data</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Advanced analytics tools to transform training data into actionable insights, with interactive dashboards, trend analysis, and performance metrics.
                </p>
                <div className="mt-3 text-sm font-medium flex items-center gap-1 text-gray-500">
                  <span>Coming Soon</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => handleServiceClick('Data Analytics')}
                >
                  Learn More
                </Button>
              </CardFooter>
            </Card>
            
            {/* Communication Platform */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-ojtrack-blue" />
                  <span>Communication Platform</span>
                </CardTitle>
                <CardDescription>Connect stakeholders seamlessly</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Integrated messaging system for communication between students, supervisors, and administrators, with notifications, announcements, and discussion forums.
                </p>
                <div className="mt-3 text-sm font-medium flex items-center gap-1 text-gray-500">
                  <span>Coming Soon</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => handleServiceClick('Communication Platform')}
                >
                  Learn More
                </Button>
              </CardFooter>
            </Card>
            
            {/* Reporting System */}
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <FileBarChart className="h-5 w-5 text-ojtrack-blue" />
                  <span>Reporting System</span>
                </CardTitle>
                <CardDescription>Comprehensive training reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Generate detailed reports on attendance, performance, and progress, with customizable templates, export options, and scheduled report generation.
                </p>
                <div className="mt-3 text-sm font-medium flex items-center gap-1 text-gray-500">
                  <span>Coming Soon</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => handleServiceClick('Reporting System')}
                >
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Services;
