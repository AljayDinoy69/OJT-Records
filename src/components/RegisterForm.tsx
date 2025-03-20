
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import { Mail, Lock, EyeOff, Eye, Facebook } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RegisterFormProps {
  onToggleForm: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure both passwords match",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set login status in localStorage (in a real app, you would store tokens)
      localStorage.setItem("isLoggedIn", "true");
      
      // For demo, just show success message
      toast({
        title: "Registration Successful",
        description: "Welcome to OJ.Track!",
      });
      
      // Redirect to home page
      navigate('/home');
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Simulate social login
    setIsLoading(true);
    
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      
      toast({
        title: `${provider} Registration Successful`,
        description: "Welcome to OJ.Track!",
      });
      
      navigate('/home');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-card animate-scale-in w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
      
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
            placeholder="Create password"
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
        
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            className="auth-input pl-10"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button 
            type="button"
            className="absolute right-3 top-3.5"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? 
              <EyeOff className="h-5 w-5 text-gray-400" /> : 
              <Eye className="h-5 w-5 text-gray-400" />
            }
          </button>
        </div>
        
        <Button 
          type="submit" 
          className="primary-btn"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Signup"}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">Already have an account? 
          <button 
            onClick={onToggleForm} 
            className="ml-1 text-ojtrack-button hover:underline"
          >
            Login
          </button>
        </p>
        
        <div className="mt-4 flex items-center gap-2 justify-center">
          <div className="h-px bg-gray-300 flex-1"></div>
          <span className="text-xs text-gray-500">OR</span>
          <div className="h-px bg-gray-300 flex-1"></div>
        </div>
        
        <button 
          className="social-login-btn bg-[#1877F2] text-white hover:bg-[#0C63D4]"
          onClick={() => handleSocialLogin('Facebook')}
          disabled={isLoading}
        >
          <Facebook className="h-5 w-5" />
          <span>Login with Facebook</span>
        </button>
        
        <button 
          className="social-login-btn bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          onClick={() => handleSocialLogin('Google')}
          disabled={isLoading}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
