import React, { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, UserCircle, Clock, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';

type Student = {
  id: string;
  name: string;
  email: string;
  studentId: string;
  program: string;
}

type Supervisor = {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
}

// Mock attendance data - in a real app, this would come from an API or database
const mockAttendanceData = [
  { name: 'Monday', students: 12, supervisors: 5 },
  { name: 'Tuesday', students: 15, supervisors: 6 },
  { name: 'Wednesday', students: 13, supervisors: 4 },
  { name: 'Thursday', students: 14, supervisors: 5 },
  { name: 'Friday', students: 10, supervisors: 3 },
];

// Mock sign-in time distribution data
const mockTimeData = [
  { time: '08:00 - 09:00', students: 8, supervisors: 2 },
  { time: '09:00 - 10:00', students: 5, supervisors: 3 },
  { time: '10:00 - 11:00', students: 2, supervisors: 1 },
  { time: '11:00 - 12:00', students: 1, supervisors: 0 },
];

const Home = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [recentAttendees, setRecentAttendees] = useState<{name: string, type: string, time: string}[]>([]);
  const [userName, setUserName] = useState("Admin User");

  useEffect(() => {
    // Load username from localStorage if available
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
    
    // Load students and supervisors from localStorage
    const storedStudents = localStorage.getItem('students');
    const storedSupervisors = localStorage.getItem('supervisors');

    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }

    if (storedSupervisors) {
      setSupervisors(JSON.parse(storedSupervisors));
    }

    // Generate some mock recent attendees
    const mockAttendees = [];
    
    if (storedStudents) {
      const parsedStudents = JSON.parse(storedStudents);
      for (let i = 0; i < Math.min(3, parsedStudents.length); i++) {
        const hours = 8 + Math.floor(Math.random() * 2);
        const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
        mockAttendees.push({
          name: parsedStudents[i].name,
          type: 'Student',
          time: `${hours}:${minutes} AM`
        });
      }
    }
    
    if (storedSupervisors) {
      const parsedSupervisors = JSON.parse(storedSupervisors);
      for (let i = 0; i < Math.min(2, parsedSupervisors.length); i++) {
        const hours = 8 + Math.floor(Math.random() * 2);
        const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
        mockAttendees.push({
          name: parsedSupervisors[i].name,
          type: 'Supervisor',
          time: `${hours}:${minutes} AM`
        });
      }
    }

    // Sort by time
    mockAttendees.sort(() => Math.random() - 0.5);
    setRecentAttendees(mockAttendees);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header userName={userName} />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-heading font-bold text-ojtrack-blue mb-6">Dashboard Overview</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover-scale">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <UserCircle className="mr-2 h-5 w-5 text-ojtrack-blue" />
                  Students
                </CardTitle>
                <CardDescription>Total registered students</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{students.length}</p>
              </CardContent>
            </Card>
            
            <Card className="hover-scale">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Users className="mr-2 h-5 w-5 text-ojtrack-blue" />
                  Supervisors
                </CardTitle>
                <CardDescription>Total registered supervisors</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{supervisors.length}</p>
              </CardContent>
            </Card>
            
            <Card className="hover-scale">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-ojtrack-blue" />
                  Attendance Today
                </CardTitle>
                <CardDescription>Students and supervisors present</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{Math.min(students.length, 8)} / {Math.min(supervisors.length, 3)}</p>
                <p className="text-xs text-gray-500">Students / Supervisors</p>
              </CardContent>
            </Card>
            
            <Card className="hover-scale">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-ojtrack-blue" />
                  Average Rating
                </CardTitle>
                <CardDescription>Overall system performance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">4.7/5</p>
                <div className="flex text-yellow-400 mt-1">
                  {'★'.repeat(5)}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Attendance */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Recent Attendance</CardTitle>
                <CardDescription>Latest sign-ins today</CardDescription>
              </CardHeader>
              <CardContent>
                {recentAttendees.length > 0 ? (
                  <div className="space-y-4">
                    {recentAttendees.map((attendee, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{attendee.name}</p>
                          <p className="text-sm text-gray-500">{attendee.type}</p>
                        </div>
                        <div className="text-sm font-medium">{attendee.time}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No recent attendance records</p>
                )}
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Attendance</CardTitle>
                <CardDescription>Attendance data over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer 
                  className="h-64" 
                  config={{
                    students: { color: "#2563eb" },
                    supervisors: { color: "#16a34a" }
                  }}
                >
                  <BarChart data={mockAttendanceData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="students" name="Students" fill="var(--color-students)" />
                    <Bar dataKey="supervisors" name="Supervisors" fill="var(--color-supervisors)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          
          {/* Sign-in Time Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Sign-in Time Distribution</CardTitle>
              <CardDescription>When students and supervisors typically arrive</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer 
                className="h-64" 
                config={{
                  students: { color: "#2563eb" },
                  supervisors: { color: "#16a34a" }
                }}
              >
                <BarChart data={mockTimeData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="students" name="Students" fill="var(--color-students)" />
                  <Bar dataKey="supervisors" name="Supervisors" fill="var(--color-supervisors)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;
