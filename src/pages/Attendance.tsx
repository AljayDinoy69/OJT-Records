
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

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

const Attendance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [personType, setPersonType] = useState<'student' | 'supervisor' | null>(null);
  const [personId, setPersonId] = useState<string | null>(null);
  const [personName, setPersonName] = useState<string | null>(null);

  useEffect(() => {
    // Parse the URL parameters
    const params = new URLSearchParams(location.search);
    const studentId = params.get('student');
    const supervisorId = params.get('supervisor');

    if (studentId) {
      setPersonType('student');
      setPersonId(studentId);
      
      // Get student name from localStorage
      const storedStudents = localStorage.getItem('students');
      if (storedStudents) {
        const students: Student[] = JSON.parse(storedStudents);
        const student = students.find(s => s.id === studentId);
        if (student) {
          setPersonName(student.name);
        }
      }
    } else if (supervisorId) {
      setPersonType('supervisor');
      setPersonId(supervisorId);
      
      // Get supervisor name from localStorage
      const storedSupervisors = localStorage.getItem('supervisors');
      if (storedSupervisors) {
        const supervisors: Supervisor[] = JSON.parse(storedSupervisors);
        const supervisor = supervisors.find(s => s.id === supervisorId);
        if (supervisor) {
          setPersonName(supervisor.name);
        }
      }
    } else {
      setPersonType(null);
      setPersonId(null);
      setPersonName(null);
    }
  }, [location.search]);

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
        <h1 className="text-3xl font-heading font-bold text-ojtrack-blue mb-6">
          {personType === 'student' 
            ? 'Student Attendance' 
            : personType === 'supervisor' 
              ? 'Supervisor Attendance' 
              : 'Attendance'}
        </h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          {personType ? (
            <>
              <p className="text-gray-600 mb-4">
                {personType === 'student' 
                  ? `Track and manage attendance records for student: ${personName || 'Unknown'} (ID: ${personId})`
                  : `Track and manage attendance records for supervisor: ${personName || 'Unknown'} (ID: ${personId})`}
              </p>
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold text-lg mb-4">Attendance Log</h3>
                {/* This would typically be populated with real data from a database */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[...Array(5)].map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    
                    return (
                      <div key={i} className="p-3 border rounded bg-white">
                        <div className="text-sm text-gray-500">{date.toLocaleDateString()}</div>
                        <div className="font-medium">
                          {Math.random() > 0.2 ? 'Present' : 'Absent'}
                        </div>
                        <div className="text-sm">
                          Check in: {`${8 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} AM`}
                        </div>
                        <div className="text-sm">
                          Check out: {`${4 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} PM`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600 mb-4">
                Please select a student or supervisor to view their attendance records.
              </p>
              <div className="flex flex-col space-y-4">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/students')}
                  className="w-full md:w-auto"
                >
                  Go to Students List
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/supervisors')}
                  className="w-full md:w-auto"
                >
                  Go to Supervisors List
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Attendance;
