
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { loadEvaluations, EvaluationEntry } from '@/utils/adminDataUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Evaluation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userName, setUserName] = useState("Admin User");
  const [evaluations, setEvaluations] = useState<EvaluationEntry[]>([]);
  const studentId = searchParams.get('student');
  const supervisorId = searchParams.get('supervisor');

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
    
    // Load evaluations
    const allEvaluations = loadEvaluations();
    
    // Filter evaluations based on URL parameters if they exist
    if (studentId) {
      setEvaluations(allEvaluations.filter(eval => eval.studentId === studentId));
    } else if (supervisorId) {
      setEvaluations(allEvaluations.filter(eval => eval.supervisorId === supervisorId));
    } else {
      setEvaluations(allEvaluations);
    }
  }, [navigate, studentId, supervisorId]);

  // Generate some mock evaluations if none exist (for demo purposes)
  useEffect(() => {
    // Only generate mock data if we're viewing a specific student or supervisor and no records exist
    if ((studentId || supervisorId) && evaluations.length === 0) {
      const mockCategories = ['Communication', 'Technical Skills', 'Problem Solving', 'Teamwork', 'Punctuality'];
      const mockData: EvaluationEntry[] = [];
      
      for (let i = 0; i < 3; i++) {
        mockData.push({
          id: `mock-${Date.now()}-${i}`,
          studentId: studentId || undefined,
          supervisorId: supervisorId || undefined,
          date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          score: Math.floor(Math.random() * 3) + 3, // Random score between 3-5
          feedback: `Good performance in ${mockCategories[i % mockCategories.length].toLowerCase()}. Keep up the good work!`,
          category: mockCategories[i % mockCategories.length]
        });
      }
      
      setEvaluations(mockData);
    }
  }, [studentId, supervisorId, evaluations.length]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header userName={userName} />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-heading font-bold text-ojtrack-blue mb-6">Evaluation</h1>
        
        <Tabs defaultValue="students" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="students">Student Evaluations</TabsTrigger>
            <TabsTrigger value="supervisors">Supervisor Evaluations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="students" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Student Evaluations</h2>
            
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
                  Viewing evaluations for student ID: {studentId}
                </p>
              </div>
            ) : (
              <p className="text-gray-600 mb-4">
                View performance evaluations for all students.
              </p>
            )}
            
            {evaluations.length > 0 && (studentId || !supervisorId) ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Date</th>
                      <th className="border p-2 text-left">Category</th>
                      <th className="border p-2 text-left">Score</th>
                      <th className="border p-2 text-left">Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evaluations
                      .filter(eval => !supervisorId && (studentId ? eval.studentId === studentId : true))
                      .map((evaluation) => (
                        <tr key={evaluation.id} className="hover:bg-gray-50">
                          <td className="border p-2">{evaluation.date}</td>
                          <td className="border p-2">{evaluation.category}</td>
                          <td className="border p-2">
                            <div className="flex items-center">
                              <span className="mr-2">{evaluation.score}/5</span>
                              <div className="text-yellow-400">
                                {'★'.repeat(evaluation.score)}
                                {'☆'.repeat(5 - evaluation.score)}
                              </div>
                            </div>
                          </td>
                          <td className="border p-2">{evaluation.feedback}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="border rounded-lg p-4 bg-gray-50 text-center">
                {studentId ? "No evaluations available for this student" : "No student evaluations available"}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="supervisors" className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Supervisor Evaluations</h2>
            
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
                  Viewing evaluations for supervisor ID: {supervisorId}
                </p>
              </div>
            ) : (
              <p className="text-gray-600 mb-4">
                View performance evaluations for all supervisors.
              </p>
            )}
            
            {evaluations.length > 0 && (supervisorId || !studentId) ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Date</th>
                      <th className="border p-2 text-left">Category</th>
                      <th className="border p-2 text-left">Score</th>
                      <th className="border p-2 text-left">Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evaluations
                      .filter(eval => !studentId && (supervisorId ? eval.supervisorId === supervisorId : true))
                      .map((evaluation) => (
                        <tr key={evaluation.id} className="hover:bg-gray-50">
                          <td className="border p-2">{evaluation.date}</td>
                          <td className="border p-2">{evaluation.category}</td>
                          <td className="border p-2">
                            <div className="flex items-center">
                              <span className="mr-2">{evaluation.score}/5</span>
                              <div className="text-yellow-400">
                                {'★'.repeat(evaluation.score)}
                                {'☆'.repeat(5 - evaluation.score)}
                              </div>
                            </div>
                          </td>
                          <td className="border p-2">{evaluation.feedback}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="border rounded-lg p-4 bg-gray-50 text-center">
                {supervisorId ? "No evaluations available for this supervisor" : "No supervisor evaluations available"}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Evaluation;
