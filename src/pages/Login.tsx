
import { useState } from 'react';
import Logo from '@/components/Logo';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import { motion } from 'framer-motion';

const Login = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div className="min-h-screen auth-background flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center z-10">
        <Logo />
        <div className="flex items-center gap-4">
          <a href="#" className="log-in-text">
            {showLoginForm ? "Need help?" : "Log in"}
          </a>
          <a href="#" className="sign-up-button">
            {showLoginForm ? "Sign up" : "Help"}
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-6 relative py-10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/4 top-20 w-32 h-32 bg-blue-500 rounded-full blur-[120px] opacity-20"></div>
          <div className="absolute right-1/4 bottom-20 w-40 h-40 bg-pink-500 rounded-full blur-[120px] opacity-20"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl items-center">
          {/* Left column - welcome text */}
          <div className="hidden lg:flex flex-col">
            <motion.h1 
              className="text-6xl font-heading font-bold text-white mb-6 text-shadow"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Welcome to
              <div className="text-ojtrack-pink neon-glow">OJ.Track</div>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white text-opacity-80 mb-8 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Looking for the latest releases? Or are retro classics more your thing? 
              We stock a wide selection of titles for every kind of gamer.
            </motion.p>
            
            <motion.a 
              href="#"
              className="bg-ojtrack-pink text-white px-8 py-3 rounded-full inline-flex items-center gap-2 w-fit hover:bg-opacity-90 transition-all hover:translate-y-[-2px] shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              SIGN-UP HERE 
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.a>
          </div>

          {/* Right column - form */}
          <div className="w-full flex justify-center lg:justify-end">
            {showLoginForm ? (
              <LoginForm onToggleForm={toggleForm} />
            ) : (
              <RegisterForm onToggleForm={toggleForm} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
