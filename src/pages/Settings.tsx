
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon } from "lucide-react";
import Navbar from '@/components/Navbar';
import Logo from '@/components/Logo';

const Settings = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoLogout, setAutoLogout] = useState(30);
  const [dataRefresh, setDataRefresh] = useState("15");
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    // Load settings from localStorage if available
    const storedSettings = localStorage.getItem('appSettings');
    if (storedSettings) {
      const settings = JSON.parse(storedSettings);
      setDarkMode(settings.darkMode || false);
      setNotifications(settings.notifications !== undefined ? settings.notifications : true);
      setAutoLogout(settings.autoLogout || 30);
      setDataRefresh(settings.dataRefresh || "15");
    }
  }, [navigate]);
  
  const handleSaveSettings = () => {
    const settings = {
      darkMode,
      notifications,
      autoLogout,
      dataRefresh
    };
    
    localStorage.setItem('appSettings', JSON.stringify(settings));
    
    toast({
      title: "Settings saved",
      description: "Your application settings have been updated successfully.",
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
            <SettingsIcon className="h-6 w-6 text-ojtrack-blue" />
            <h1 className="text-3xl font-heading font-bold text-ojtrack-blue">Application Settings</h1>
          </div>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure application preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                  <p className="text-sm text-gray-500">Enable dark theme for the application</p>
                </div>
                <Switch 
                  id="dark-mode" 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode} 
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications" className="font-medium">Notifications</Label>
                  <p className="text-sm text-gray-500">Receive system notifications and alerts</p>
                </div>
                <Switch 
                  id="notifications" 
                  checked={notifications} 
                  onCheckedChange={setNotifications} 
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="auto-logout" className="font-medium">Auto Logout (minutes)</Label>
                <p className="text-sm text-gray-500">Automatically log out after inactivity</p>
                <div className="flex items-center gap-4 pt-2">
                  <Slider 
                    id="auto-logout"
                    min={5} 
                    max={60} 
                    step={5} 
                    value={[autoLogout]} 
                    onValueChange={(value) => setAutoLogout(value[0])} 
                    className="flex-1" 
                  />
                  <span className="font-semibold w-8">{autoLogout}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="data-refresh" className="font-medium">Data Refresh Interval</Label>
                <p className="text-sm text-gray-500">How often data should be refreshed</p>
                <Select value={dataRefresh} onValueChange={setDataRefresh}>
                  <SelectTrigger id="data-refresh" className="w-full">
                    <SelectValue placeholder="Select refresh interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Every 5 minutes</SelectItem>
                    <SelectItem value="15">Every 15 minutes</SelectItem>
                    <SelectItem value="30">Every 30 minutes</SelectItem>
                    <SelectItem value="60">Every hour</SelectItem>
                    <SelectItem value="manual">Manual refresh only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <div className="px-6 pb-6">
              <Button onClick={handleSaveSettings} className="w-full">
                Save Settings
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
