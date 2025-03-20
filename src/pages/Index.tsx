
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (in a real app, you would check authentication status)
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-ojtrack-blue">
      <div className="text-center">
        <h1 className="text-4xl font-heading font-bold text-white mb-4">Loading OJ.Track</h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
