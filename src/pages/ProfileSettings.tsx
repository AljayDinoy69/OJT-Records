
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle } from "lucide-react";
import Navbar from '@/components/Navbar';
import Logo from '@/components/Logo';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Admin User');
  const [email, setEmail] = useState('admin@example.com');
  const [role, setRole] = useState('Administrator');
  const [isEditing, setIsEditing] = useState(false);
  
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
    
    // Load email from localStorage if available
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, [navigate]);
  
  const handleSaveChanges = () => {
    localStorage.setItem('userName', userName);
    localStorage.setItem('userEmail', email);
    
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
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
      <main className="flex-1 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <UserCircle className="h-6 w-6 text-ojtrack-blue" />
            <h1 className="text-3xl font-heading font-bold text-ojtrack-blue">Profile Settings</h1>
          </div>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>User Profile</CardTitle>
              <CardDescription>Manage your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <Avatar className="h-24 w-24 border-2 border-ojtrack-blue">
                  <AvatarImage src="/placeholder.svg" alt={userName} />
                  <AvatarFallback className="bg-ojtrack-navy text-white text-xl">
                    {userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{userName}</h3>
                  <p className="text-gray-500">{role}</p>
                  <p className="text-gray-500">{email}</p>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>
              
              {isEditing && (
                <>
                  <Separator />
                  
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)} 
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="Your email address"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="role">Role</Label>
                      <Input 
                        id="role" 
                        value={role} 
                        disabled
                        className="bg-gray-100"
                      />
                      <p className="text-xs text-gray-500">Your role cannot be changed</p>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
            {isEditing && (
              <CardFooter className="flex justify-end gap-2">
                <Button 
                  variant="secondary" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;
