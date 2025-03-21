
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loadRecords, RecordEntry } from '@/utils/adminDataUtils';
import { Button } from '@/components/ui/button';

const Records = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userName, setUserName] = useState("Admin User");
  const [userRole, setUserRole] = useState("admin");
  const [userId, setUserId] = useState("");
  const [records, setRecords] = useState<RecordEntry[]>([]);
  const studentId = searchParams.get('student');
  const supervisorId = searchParams.get('supervisor');

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    // Load user info from localStorage
    const storedUserName = localStorage.getItem('userName');
    const storedUserRole = localStorage.getItem('userRole');
    const storedUserId = localStorage.getItem('userId');
    
    if (storedUserName) {
      setUserName(storedUserName);
    }
    
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
    
    if (storedUserId) {
      setUserId(storedUserId);
    }
    
    // If role is student, redirect to home since they can't access records
    if (storedUserRole === 'student') {
      navigate('/home');
      return;
    }
    
    // Load records
    const allRecords = loadRecords();
    
    // Filter records based on permissions and URL parameters
    if (storedUserRole === 'admin') {
      // Admin can see all records, but we still filter based on URL parameters
      if (studentId) {
        setRecords(allRecords.filter(record => record.studentId === studentId));
      } else if (supervisorId) {
        setRecords(allRecords.filter(record => record.supervisorId === supervisorId));
      } else {
        setRecords(allRecords);
      }
    } else if (storedUserRole === 'supervisor') {
      // Supervisors can only see their own records or student records
      if (studentId) {
        // When viewing a specific student's records
        setRecords(allRecords.filter(record => record.studentId === studentId));
      } else {
        // When viewing own records or all records (show only supervisor's records)
        setRecords(allRecords.filter(record => record.supervisorId === storedUserId));
      }
    }
  }, [navigate, studentId, supervisorId]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header userName={userName} />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-heading font-bold text-ojtrack-blue mb-6">Records</h1>
        
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="students">Student Records</TabsTrigger>
            {userRole === 'admin' && (
              <TabsTrigger value="supervisors">Supervisor Records</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="students" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Student Records</h2>
            
            {studentId ? (
              <div className="mb-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/students')}
                  className="mb-4"
                >
                  Back to All Students
                </Button>
                <p className="text-gray-600 mb-4">
                  Viewing records for student ID: {studentId}
                </p>
              </div>
            ) : (
              <p className="text-gray-600 mb-4">
                View detailed records and history for students.
              </p>
            )}
            
            {records.length > 0 && (studentId || userRole === 'supervisor' || !supervisorId) ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Date</th>
                      <th className="border p-2 text-left">Title</th>
                      <th className="border p-2 text-left">Description</th>
                      <th className="border p-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records
                      .filter(record => !supervisorId && (studentId ? record.studentId === studentId : (userRole === 'supervisor' ? record.supervisorId === userId : true)))
                      .map((record) => (
                        <tr key={record.id} className="hover:bg-gray-50">
                          <td className="border p-2">{record.date}</td>
                          <td className="border p-2">{record.title}</td>
                          <td className="border p-2">{record.description}</td>
                          <td className="border p-2">
                            <span className={`inline-block px-2 py-1 rounded text-xs font-medium
                              ${record.status === 'approved' ? 'bg-green-100 text-green-800' : 
                                record.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'}`}>
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </span>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="border rounded-lg p-4 bg-gray-50 text-center">
                {studentId ? "No records available for this student" : "No student records available"}
              </div>
            )}
          </TabsContent>
          
          {userRole === 'admin' && (
            <TabsContent value="supervisors" className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Supervisor Records</h2>
              
              {supervisorId ? (
                <div className="mb-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate('/supervisors')}
                    className="mb-4"
                  >
                    Back to All Supervisors
                  </Button>
                  <p className="text-gray-600 mb-4">
                    Viewing records for supervisor ID: {supervisorId}
                  </p>
                </div>
              ) : (
                <p className="text-gray-600 mb-4">
                  View detailed records and history for all supervisors.
                </p>
              )}
              
              {records.length > 0 && (supervisorId || !studentId) ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Date</th>
                        <th className="border p-2 text-left">Title</th>
                        <th className="border p-2 text-left">Description</th>
                        <th className="border p-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records
                        .filter(record => !studentId && (supervisorId ? record.supervisorId === supervisorId : true))
                        .map((record) => (
                          <tr key={record.id} className="hover:bg-gray-50">
                            <td className="border p-2">{record.date}</td>
                            <td className="border p-2">{record.title}</td>
                            <td className="border p-2">{record.description}</td>
                            <td className="border p-2">
                              <span className={`inline-block px-2 py-1 rounded text-xs font-medium
                                ${record.status === 'approved' ? 'bg-green-100 text-green-800' : 
                                  record.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                                  'bg-yellow-100 text-yellow-800'}`}>
                                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="border rounded-lg p-4 bg-gray-50 text-center">
                  {supervisorId ? "No records available for this supervisor" : "No supervisor records available"}
                </div>
              )}
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default Records;
