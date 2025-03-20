
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import { Info, Users, Check } from 'lucide-react';

const About = () => {
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
      <main className="flex-1 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Info className="h-6 w-6 text-ojtrack-blue" />
            <h1 className="text-3xl font-heading font-bold text-ojtrack-blue">About OJTrack</h1>
          </div>
          
          <Card className="shadow-md mb-6">
            <CardHeader>
              <CardTitle>OJTrack: On-the-Job Training Management System</CardTitle>
              <CardDescription>Streamline the OJT experience for students and supervisors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                OJTrack is a comprehensive web application designed to manage and monitor on-the-job training programs
                for educational institutions. Our platform connects students, supervisors, and administrators
                in a seamless digital environment.
              </p>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Users className="mr-2 h-5 w-5 text-ojtrack-blue" />
                  Who We Serve
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <span className="font-medium">Students:</span> Track attendance, submit reports, and receive evaluations
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <span className="font-medium">Supervisors:</span> Monitor student progress, provide feedback, and evaluate performance
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check className="mr-2 h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <span className="font-medium">Administrators:</span> Oversee the entire OJT program, generate reports, and ensure compliance
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Our Mission</h3>
                <p>
                  To provide an intuitive, reliable platform that enhances the OJT experience by simplifying 
                  administrative tasks, improving communication, and ensuring accurate tracking and evaluation.
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Version Information</h3>
                <p className="text-sm text-gray-500">
                  OJTrack v1.0.0 | Developed with ❤️ for educational institutions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default About;
