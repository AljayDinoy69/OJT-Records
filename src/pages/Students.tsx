
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { UserPlus } from 'lucide-react';

// Define the schema for the student form
const studentSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  studentId: z.string().min(1, { message: "Student ID is required." }),
  program: z.string().min(1, { message: "Program is required." }),
});

type StudentFormValues = z.infer<typeof studentSchema>;

type Student = {
  id: string;
  name: string;
  email: string;
  studentId: string;
  program: string;
}

const Students = () => {
  const navigate = useNavigate();
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);

  // Initialize the form
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      email: "",
      studentId: "",
      program: ""
    },
  });

  // Load students from localStorage on component mount
  useEffect(() => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate('/login');
  };

  const onSubmit = (data: StudentFormValues) => {
    // Create a new student object with a unique ID
    const newStudent: Student = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      studentId: data.studentId,
      program: data.program
    };

    // Add the new student to the state
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    
    // Save to localStorage
    localStorage.setItem('students', JSON.stringify(updatedStudents));

    // Show success message
    toast({
      title: "Student added successfully",
      description: `${data.name} has been added to the student list.`
    });

    // Close the dialog
    setIsAddStudentOpen(false);
    
    // Reset the form
    form.reset();
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-heading font-bold text-ojtrack-blue">Students List</h1>
          <Button 
            onClick={() => setIsAddStudentOpen(true)}
            className="bg-ojtrack-blue hover:bg-ojtrack-blue/90"
          >
            <UserPlus className="mr-2 h-4 w-4" /> Add Student
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-4">
            Here you can view and manage the list of all students in the system.
          </p>
          
          {students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Name</th>
                    <th className="border p-2 text-left">Email</th>
                    <th className="border p-2 text-left">Student ID</th>
                    <th className="border p-2 text-left">Program</th>
                    <th className="border p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="border p-2">{student.name}</td>
                      <td className="border p-2">{student.email}</td>
                      <td className="border p-2">{student.studentId}</td>
                      <td className="border p-2">{student.program}</td>
                      <td className="border p-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "View Records",
                              description: `Viewing records for ${student.name}`
                            });
                            navigate(`/records?student=${student.id}`);
                          }}
                          className="mr-2"
                        >
                          Records
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "View Evaluation",
                              description: `Viewing evaluation for ${student.name}`
                            });
                            navigate(`/evaluation?student=${student.id}`);
                          }}
                          className="mr-2"
                        >
                          Evaluation
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "View Attendance",
                              description: `Viewing attendance for ${student.name}`
                            });
                            navigate(`/attendance?student=${student.id}`);
                          }}
                        >
                          Attendance
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border rounded-lg p-4 bg-gray-50 text-center">
              No students added yet. Click "Add Student" to add a new student.
            </div>
          )}
        </div>
      </main>

      {/* Add Student Dialog */}
      <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Enter the student details below. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID</FormLabel>
                    <FormControl>
                      <Input placeholder="ST12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="program"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program</FormLabel>
                    <FormControl>
                      <Input placeholder="Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save Student</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Students;
