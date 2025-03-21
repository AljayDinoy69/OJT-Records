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
import { deleteSupervisorData, loadUsers, saveUsers, User } from '@/utils/adminDataUtils';

// Define the schema for the supervisor form
const supervisorSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  supervisorId: z.string().min(1, { message: "Supervisor ID is required." }),
  department: z.string().min(1, { message: "Department is required." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }).optional(),
});

type SupervisorFormValues = z.infer<typeof supervisorSchema>;

type Supervisor = {
  id: string;
  name: string;
  email: string;
  supervisorId: string;
  department: string;
}

const Supervisors = () => {
  const navigate = useNavigate();
  const [isAddSupervisorOpen, setIsAddSupervisorOpen] = useState(false);
  const [isEditSupervisorOpen, setIsEditSupervisorOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [supervisorToDelete, setSupervisorToDelete] = useState<Supervisor | null>(null);
  const [supervisorToEdit, setSupervisorToEdit] = useState<Supervisor | null>(null);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [userName, setUserName] = useState("Admin User");
  const [userRole, setUserRole] = useState("admin");

  // Initialize the form for adding a new supervisor
  const form = useForm<SupervisorFormValues>({
    resolver: zodResolver(supervisorSchema),
    defaultValues: {
      name: "",
      email: "",
      supervisorId: "",
      department: "",
      password: ""
    },
  });

  // Initialize form for editing a supervisor
  const editForm = useForm<SupervisorFormValues>({
    resolver: zodResolver(supervisorSchema),
    defaultValues: {
      name: "",
      email: "",
      supervisorId: "",
      department: "",
    },
  });

  // Load supervisors from localStorage on component mount
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
    
    // Only admin can access this page, redirect others
    if (storedUserRole !== 'admin') {
      navigate('/home');
      toast({
        title: "Access Denied",
        description: "Only administrators can access the supervisors page.",
        variant: "destructive"
      });
      return;
    }
    
    const storedSupervisors = localStorage.getItem('supervisors');
    if (storedSupervisors) {
      setSupervisors(JSON.parse(storedSupervisors));
    }
  }, [navigate]);

  // Generate a default password
  const generateDefaultPassword = (supervisorId: string): string => {
    return `supervisor${supervisorId.toLowerCase()}`;
  };

  const onSubmit = (data: SupervisorFormValues) => {
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
    
    // Generate default password if not provided
    const password = data.password || generateDefaultPassword(data.supervisorId);
    
    // Create a new supervisor object with a unique ID
    const newSupervisor: Supervisor = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      supervisorId: data.supervisorId,
      department: data.department
    };

    // Add the new supervisor to the state
    const updatedSupervisors = [...supervisors, newSupervisor];
    setSupervisors(updatedSupervisors);
    
    // Save to localStorage
    localStorage.setItem('supervisors', JSON.stringify(updatedSupervisors));
    
    // Create a user account for the supervisor
    const newUser: User = {
      id: newSupervisor.id,
      name: data.name,
      email: data.email,
      password: password,
      role: 'supervisor'
    };
    
    // Add the new user to the users list
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);

    // Show success message with generated password
    toast({
      title: "Supervisor added successfully",
      description: `${data.name} has been added with default password: ${password}`
    });

    // Close the dialog
    setIsAddSupervisorOpen(false);
    
    // Reset the form
    form.reset();
  };

  const handleEditClick = (supervisor: Supervisor) => {
    setSupervisorToEdit(supervisor);
    
    // Load supervisor data into edit form
    editForm.reset({
      name: supervisor.name,
      email: supervisor.email,
      supervisorId: supervisor.supervisorId,
      department: supervisor.department
    });
    
    setIsEditSupervisorOpen(true);
  };

  const handleEditSubmit = (data: SupervisorFormValues) => {
    if (!supervisorToEdit) return;
    
    // Check if email has changed and if it already exists
    const users = loadUsers();
    if (data.email !== supervisorToEdit.email) {
      const emailExists = users.some(user => user.email === data.email);
      
      if (emailExists) {
        toast({
          title: "Email already exists",
          description: "This email is already registered in the system.",
          variant: "destructive"
        });
        return;
      }
    }
    
    // Update supervisor in supervisors array
    const updatedSupervisors = supervisors.map(s => {
      if (s.id === supervisorToEdit.id) {
        return {
          ...s,
          name: data.name,
          email: data.email,
          supervisorId: data.supervisorId,
          department: data.department
        };
      }
      return s;
    });
    
    setSupervisors(updatedSupervisors);
    
    // Save to localStorage
    localStorage.setItem('supervisors', JSON.stringify(updatedSupervisors));
    
    // Update user in users array
    const updatedUsers = users.map(user => {
      if (user.id === supervisorToEdit.id) {
        // Keep the existing password
        const existingUser = users.find(u => u.id === supervisorToEdit.id);
        return {
          ...user,
          name: data.name,
          email: data.email,
          password: existingUser ? existingUser.password : user.password
        };
      }
      return user;
    });
    
    saveUsers(updatedUsers);
    
    toast({
      title: "Supervisor updated",
      description: `${data.name}'s information has been updated.`
    });
    
    setIsEditSupervisorOpen(false);
    setSupervisorToEdit(null);
  };

  const handleDeleteClick = (supervisor: Supervisor) => {
    setSupervisorToDelete(supervisor);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!supervisorToDelete) return;
    
    // Delete the supervisor
    const updatedSupervisors = supervisors.filter(s => s.id !== supervisorToDelete.id);
    setSupervisors(updatedSupervisors);
    
    // Save to localStorage
    localStorage.setItem('supervisors', JSON.stringify(updatedSupervisors));
    
    // Delete all associated data
    deleteSupervisorData(supervisorToDelete.id);
    
    toast({
      title: "Supervisor deleted",
      description: `${supervisorToDelete.name} and all associated records have been deleted.`
    });
    
    setIsDeleteConfirmOpen(false);
    setSupervisorToDelete(null);
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
          <h1 className="text-3xl font-heading font-bold text-ojtrack-blue">Supervisors List</h1>
          <Button 
            onClick={() => setIsAddSupervisorOpen(true)}
            className="bg-ojtrack-blue hover:bg-ojtrack-blue/90"
          >
            <UserPlus className="mr-2 h-4 w-4" /> Add Supervisor
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 mb-4">
            Here you can view and manage the list of all supervisors in the system.
          </p>
          
          {supervisors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Name</th>
                    <th className="border p-2 text-left">Email</th>
                    <th className="border p-2 text-left">Supervisor ID</th>
                    <th className="border p-2 text-left">Department</th>
                    <th className="border p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {supervisors.map((supervisor) => (
                    <tr key={supervisor.id} className="hover:bg-gray-50">
                      <td className="border p-2">{supervisor.name}</td>
                      <td className="border p-2">{supervisor.email}</td>
                      <td className="border p-2">{supervisor.supervisorId}</td>
                      <td className="border p-2">{supervisor.department}</td>
                      <td className="border p-2">
                        <div className="flex flex-wrap gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "View Records",
                                description: `Viewing records for ${supervisor.name}`
                              });
                              navigate(`/records?supervisor=${supervisor.id}`);
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
                                description: `Viewing evaluation for ${supervisor.name}`
                              });
                              navigate(`/evaluation?supervisor=${supervisor.id}`);
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
                                description: `Viewing attendance for ${supervisor.name}`
                              });
                              navigate(`/attendance?supervisor=${supervisor.id}`);
                            }}
                          >
                            Attendance
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditClick(supervisor)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteClick(supervisor)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="border rounded-lg p-4 bg-gray-50 text-center">
              No supervisors added yet. Click "Add Supervisor" to add a new supervisor.
            </div>
          )}
        </div>
      </main>

      {/* Add Supervisor Dialog */}
      <Dialog open={isAddSupervisorOpen} onOpenChange={setIsAddSupervisorOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Supervisor</DialogTitle>
            <DialogDescription>
              Enter the supervisor details below. A default password will be generated for login.
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
                      <Input placeholder="Jane Smith" {...field} />
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
                      <Input placeholder="jane.smith@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="supervisorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supervisor ID</FormLabel>
                    <FormControl>
                      <Input placeholder="SV12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
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
                <Button type="submit">Save Supervisor</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Supervisor Dialog */}
      <Dialog open={isEditSupervisorOpen} onOpenChange={setIsEditSupervisorOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Supervisor</DialogTitle>
            <DialogDescription>
              Update the supervisor details below.
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
                      <Input placeholder="Jane Smith" {...field} />
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
                      <Input placeholder="jane.smith@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="supervisorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supervisor ID</FormLabel>
                    <FormControl>
                      <Input placeholder="SV12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
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
                <Button type="submit">Update Supervisor</Button>
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
              Are you sure you want to delete {supervisorToDelete?.name}? This will remove all their records, evaluations, and attendance data.
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

export default Supervisors;
