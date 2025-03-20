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
import { UserPlus } from 'lucide-react';

// Define the schema for the supervisor form
const supervisorSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  employeeId: z.string().min(1, { message: "Employee ID is required." }),
  department: z.string().min(1, { message: "Department is required." }),
});

type SupervisorFormValues = z.infer<typeof supervisorSchema>;

type Supervisor = {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
}

const Supervisors = () => {
  const navigate = useNavigate();
  const [isAddSupervisorOpen, setIsAddSupervisorOpen] = useState(false);
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);
  const [userName, setUserName] = useState("Admin User");

  // Initialize the form
  const form = useForm<SupervisorFormValues>({
    resolver: zodResolver(supervisorSchema),
    defaultValues: {
      name: "",
      email: "",
      employeeId: "",
      department: ""
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
    
    // Load username from localStorage if available
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
    
    const storedSupervisors = localStorage.getItem('supervisors');
    if (storedSupervisors) {
      setSupervisors(JSON.parse(storedSupervisors));
    }
  }, [navigate]);

  const onSubmit = (data: SupervisorFormValues) => {
    // Create a new supervisor object with a unique ID
    const newSupervisor: Supervisor = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      employeeId: data.employeeId,
      department: data.department
    };

    // Add the new supervisor to the state
    const updatedSupervisors = [...supervisors, newSupervisor];
    setSupervisors(updatedSupervisors);
    
    // Save to localStorage
    localStorage.setItem('supervisors', JSON.stringify(updatedSupervisors));

    // Show success message
    toast({
      title: "Supervisor added successfully",
      description: `${data.name} has been added to the supervisor list.`
    });

    // Close the dialog
    setIsAddSupervisorOpen(false);
    
    // Reset the form
    form.reset();
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
                    <th className="border p-2 text-left">Employee ID</th>
                    <th className="border p-2 text-left">Department</th>
                    <th className="border p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {supervisors.map((supervisor) => (
                    <tr key={supervisor.id} className="hover:bg-gray-50">
                      <td className="border p-2">{supervisor.name}</td>
                      <td className="border p-2">{supervisor.email}</td>
                      <td className="border p-2">{supervisor.employeeId}</td>
                      <td className="border p-2">{supervisor.department}</td>
                      <td className="border p-2">
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
                              description: `Viewing evaluation for ${supervisor.name}`
                            });
                            navigate(`/evaluation?supervisor=${supervisor.id}`);
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
                              description: `Viewing attendance for ${supervisor.name}`
                            });
                            navigate(`/attendance?supervisor=${supervisor.id}`);
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
              Enter the supervisor details below. Click save when you're done.
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
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee ID</FormLabel>
                    <FormControl>
                      <Input placeholder="EMP12345" {...field} />
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
                      <Input placeholder="Engineering" {...field} />
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
    </div>
  );
};

export default Supervisors;
