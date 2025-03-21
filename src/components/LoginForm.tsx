
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import { Mail, Lock, EyeOff, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '@/utils/adminDataUtils';

interface LoginFormProps {
  onToggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Authenticate the user
      const user = authenticateUser(email, password);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // Set login status and user info in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userProfilePic", user.profilePic || '');
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
      
      // Redirect to home page
      navigate('/home');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-card animate-scale-in w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <Input
            type="email"
            placeholder="Email"
            className="auth-input pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="auth-input pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="button"
            className="absolute right-3 top-3.5"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 
              <EyeOff className="h-5 w-5 text-gray-400" /> : 
              <Eye className="h-5 w-5 text-gray-400" />
            }
          </button>
        </div>
        
        <div className="flex justify-end">
          <a href="#" className="text-sm text-ojtrack-button hover:underline">
            Forgot password?
          </a>
        </div>
        
        <Button 
          type="submit" 
          className="primary-btn"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">Don't have an account? 
          <button 
            onClick={onToggleForm} 
            className="ml-1 text-ojtrack-button hover:underline"
          >
            Sign up
          </button>
        </p>
        
        {/* Default test accounts */}
        <div className="mt-4 text-sm text-gray-500">
          <p>Test accounts:</p>
          <p>Admin: admin@example.com / admin123</p>
          <p>Example accounts will be created when you add students/supervisors</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
