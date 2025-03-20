
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import { Settings as SettingsIcon, Bell, Eye, Lock, Download, Trash2 } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Admin User");
  
  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemNotifications, setSystemNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  
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
    
    // Load settings from localStorage if available
    const storedSettings = localStorage.getItem('userSettings');
    if (storedSettings) {
      const settings = JSON.parse(storedSettings);
      setEmailNotifications(settings.emailNotifications ?? true);
      setSystemNotifications(settings.systemNotifications ?? true);
      setDarkMode(settings.darkMode ?? false);
      setAutoSave(settings.autoSave ?? true);
      setTwoFactorAuth(settings.twoFactorAuth ?? false);
    }
  }, [navigate]);
  
  const handleSaveSettings = () => {
    const settings = {
      emailNotifications,
      systemNotifications,
      darkMode,
      autoSave,
      twoFactorAuth
    };
    
    localStorage.setItem('userSettings', JSON.stringify(settings));
    
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };
  
  const handleResetSettings = () => {
    setEmailNotifications(true);
    setSystemNotifications(true);
    setDarkMode(false);
    setAutoSave(true);
    setTwoFactorAuth(false);
    
    localStorage.removeItem('userSettings');
    
    toast({
      title: "Settings reset",
      description: "Your preferences have been reset to defaults.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header userName={userName} />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <SettingsIcon className="h-6 w-6 text-ojtrack-blue" />
            <h1 className="text-3xl font-heading font-bold text-ojtrack-blue">Settings</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card className="shadow-md sticky top-6">
                <CardHeader>
                  <CardTitle>Settings Menu</CardTitle>
                  <CardDescription>Configure your preferences</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex flex-col">
                    <button className="px-4 py-3 text-left hover:bg-gray-100 flex items-center text-ojtrack-blue border-l-2 border-ojtrack-blue">
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                    </button>
                    <button className="px-4 py-3 text-left hover:bg-gray-100 flex items-center">
                      <Eye className="mr-2 h-4 w-4" />
                      <span>Appearance</span>
                    </button>
                    <button className="px-4 py-3 text-left hover:bg-gray-100 flex items-center">
                      <Lock className="mr-2 h-4 w-4" />
                      <span>Security</span>
                    </button>
                    <button className="px-4 py-3 text-left hover:bg-gray-100 flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      <span>Data & Storage</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2 space-y-6">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="mr-2 h-5 w-5 text-ojtrack-blue" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>Control how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system-notifications">System Notifications</Label>
                      <p className="text-sm text-gray-500">Show notifications in the application</p>
                    </div>
                    <Switch
                      id="system-notifications"
                      checked={systemNotifications}
                      onCheckedChange={setSystemNotifications}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="mr-2 h-5 w-5 text-ojtrack-blue" />
                    Appearance
                  </CardTitle>
                  <CardDescription>Customize how the application looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-gray-500">Use dark theme throughout the application</p>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="mr-2 h-5 w-5 text-ojtrack-blue" />
                    Security
                  </CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      id="two-factor"
                      checked={twoFactorAuth}
                      onCheckedChange={setTwoFactorAuth}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Download className="mr-2 h-5 w-5 text-ojtrack-blue" />
                    Data & Storage
                  </CardTitle>
                  <CardDescription>Manage data saving preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-save">Auto-Save Changes</Label>
                      <p className="text-sm text-gray-500">Automatically save changes as you make them</p>
                    </div>
                    <Switch
                      id="auto-save"
                      checked={autoSave}
                      onCheckedChange={setAutoSave}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={handleResetSettings}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Reset to Defaults
                </Button>
                
                <Button onClick={handleSaveSettings}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
