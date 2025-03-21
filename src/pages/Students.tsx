import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { UserPlus, Trash2, Pencil } from 'lucide-react';
import { deleteStudentData, loadUsers, saveUsers, User, createOrUpdateUser } from '@/utils/adminDataUtils';

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
  const [isEditStudentOpen, setIsEditStudentOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [userName, setUserName] = useState("Admin User");
  const [userRole, setUserRole] = useState("admin");

  // Initialize the form for adding a new student
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      email: "",
      studentId: "",
      program: "",
    },
  });

  // Initialize form for editing a student
  const editForm = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      email: "",
      studentId: "",
      program: "",
    },
  });

  // Load students from localStorage on component mount
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    // Load username and role from localStorage
    const storedUserName = localStorage.getItem('userName');
    const storedUserRole = localStorage.getItem('userRole');
    
    if (storedUserName) {
      setUserName(storedUserName);
    }
    
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
    
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }
  }, [navigate]);

  const onSubmit = (data: StudentFormValues) => {
    // Check if email already exists in users
    const users = loadUsers();
    const emailExists = users.some(user => user.email === data.email);
    
    if (emailExists) {
      toast({
        title: "Email already exists",
        description: "This email is already registered in the system.",
        variant: "destructive"
      });
      return;
    }
    
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
    
    // Create a user account for the student with auto-generated password
    const { user, password } = createOrUpdateUser({
      id: newStudent.id,
      name: data.name,
      email: data.email,
      role: 'student',
      identifier: data.studentId
    });

    // Show success message with generated password
    toast({
      title: "Student added successfully",
      description: `${data.name} has been added with default password: ${password}`
    });

    // Close the dialog
    setIsAddStudentOpen(false);
    
    // Reset the form
    form.reset();
  };

  const handleEditClick = (student: Student) => {
    setStudentToEdit(student);
    
    // Load student data into edit form
    editForm.reset({
      name: student.name,
      email: student.email,
      studentId: student.studentId,
      program: student.program
    });
    
    setIsEditStudentOpen(true);
  };

  const handleEditSubmit = (data: StudentFormValues) => {
    if (!studentToEdit) return;
    
    // Check if email has changed and if it already exists
    const users = loadUsers();
    if (data.email !== studentToEdit.email) {
      const emailExists = users.some(user => user.email === data.email && user.id !== studentToEdit.id);
      
      if (emailExists) {
        toast({
          title: "Email already exists",
          description: "This email is already registered in the system.",
          variant: "destructive"
        });
        return;
      }
    }
    
    // Update student in students array
    const updatedStudents = students.map(s => {
      if (s.id === studentToEdit.id) {
        return {
          ...s,
          name: data.name,
          email: data.email,
          studentId: data.studentId,
          program: data.program
        };
      }
      return s;
    });
    
    setStudents(updatedStudents);
    
    // Save to localStorage
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    
    // Update user account
    const { user, password } = createOrUpdateUser({
      id: studentToEdit.id,
      name: data.name,
      email: data.email,
      role: 'student',
      identifier: data.studentId
    });
    
    toast({
      title: "Student updated",
      description: `${data.name}'s information has been updated.`
    });
    
    setIsEditStudentOpen(false);
    setStudentToEdit(null);
  };

  const handleDeleteClick = (student: Student) => {
    setStudentToDelete(student);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!studentToDelete) return;
    
    // Delete the student
    const updatedStudents = students.filter(s => s.id !== studentToDelete.id);
    setStudents(updatedStudents);
    
    // Save to localStorage
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    
    // Delete all associated data
    deleteStudentData(studentToDelete.id);
    
    toast({
      title: "Student deleted",
      description: `${studentToDelete.name} and all associated records have been deleted.`
    });
    
    setIsDeleteConfirmOpen(false);
    setStudentToDelete(null);
  };

  // Function to determine if action buttons should be shown based on user role
  const showActionButtons = () => {
    return userRole === 'admin' || userRole === 'supervisor';
  };

  // Function to determine if delete button should be shown
  const showDeleteButton = () => {
    return userRole === 'admin';
  };

  // Function to determine if edit button should be shown
  const showEditButton = () => {
    return userRole === 'admin';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header userName={userName} />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-heading font-bold text-ojtrack-blue">Students List</h1>
          {showActionButtons() && (
            <Button 
              onClick={() => setIsAddStudentOpen(true)}
              className="bg-ojtrack-blue hover:bg-ojtrack-blue/90"
            >
              <UserPlus className="mr-2 h-4 w-4" /> Add Student
            </Button>
          )}
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
                    {showActionButtons() && (
                      <th className="border p-2 text-left">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="border p-2">{student.name}</td>
                      <td className="border p-2">{student.email}</td>
                      <td className="border p-2">{student.studentId}</td>
                      <td className="border p-2">{student.program}</td>
                      {showActionButtons() && (
                        <td className="border p-2">
                          <div className="flex flex-wrap gap-2">
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
                            {showEditButton() && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditClick(student)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            )}
                            {showDeleteButton() && (
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleDeleteClick(student)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border rounded-lg p-4 bg-gray-50 text-center">
              No students added yet. {showActionButtons() ? "Click \"Add Student\" to add a new student." : ""}
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
              Enter the student details below. A default password will be generated for login.
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

      {/* Edit Student Dialog */}
      <Dialog open={isEditStudentOpen} onOpenChange={setIsEditStudentOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>
              Update the student details below.
            </DialogDescription>
          </DialogHeader>

          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
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
                control={editForm.control}
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
                control={editForm.control}
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
                control={editForm.control}
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
                <Button type="submit">Update Student</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {studentToDelete?.name}? This will remove all their records, evaluations, and attendance data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Students;
