
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import { ListChecks, ClipboardList, Clock, BarChart3, FileText, PenLine } from 'lucide-react';

const Services = () => {
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

  const services = [
    {
      title: "Attendance Tracking",
      description: "Automated system for recording student and supervisor attendance with sign-in/sign-out functionality.",
      icon: Clock
    },
    {
      title: "Performance Evaluation",
      description: "Comprehensive tools for supervisors to evaluate student performance across multiple criteria.",
      icon: BarChart3
    },
    {
      title: "Record Management",
      description: "Secure storage and easy access to student profiles, attendance records, and evaluation reports.",
      icon: ClipboardList
    },
    {
      title: "Report Generation",
      description: "Create detailed reports on attendance, performance, and program metrics for administrative purposes.",
      icon: FileText
    },
    {
      title: "Feedback System",
      description: "Platform for supervisors to provide constructive feedback to students throughout their OJT period.",
      icon: PenLine
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header userName={userName} />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <ListChecks className="h-6 w-6 text-ojtrack-blue" />
            <h1 className="text-3xl font-heading font-bold text-ojtrack-blue">Our Services</h1>
          </div>
          
          <p className="text-lg text-gray-600 mb-8">
            OJTrack offers a comprehensive suite of services designed to streamline the on-the-job training experience
            for students, supervisors, and administrators alike.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-ojtrack-blue/10 text-ojtrack-blue">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="mt-8 shadow-md bg-ojtrack-blue/5">
            <CardHeader>
              <CardTitle className="text-ojtrack-blue">Custom Solutions</CardTitle>
              <CardDescription>Need something specific for your institution?</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                We understand that every educational institution has unique requirements. 
                Our team can work with you to develop custom features and integrations
                that meet your specific needs. Contact the administration for more information
                on tailored solutions.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Services;
