
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { canAccessRoute, UserRole } from '@/utils/adminDataUtils';
import { toast } from '@/components/ui/use-toast';

interface RoleBasedRouteProps {
  children: React.ReactNode;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ children }) => {
  const location = useLocation();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!isLoggedIn) {
      setIsAllowed(false);
      return;
    }
    
    const userRole = localStorage.getItem('userRole') as UserRole;
    const pathName = location.pathname;
    
    if (!userRole || !canAccessRoute(userRole, pathName)) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      setIsAllowed(false);
      return;
    }
    
    setIsAllowed(true);
  }, [location.pathname]);
  
  if (isAllowed === null) {
    // Still checking permissions
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ojtrack-blue"></div>
      </div>
    );
  }
  
  return isAllowed ? <>{children}</> : <Navigate to="/login" replace />;
};

export default RoleBasedRoute;
