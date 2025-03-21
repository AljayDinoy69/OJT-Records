
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, BookOpen, Award, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRole } from '@/utils/adminDataUtils';

const getNavItemsForRole = (role: UserRole) => {
  const commonItems = [
    {
      name: 'Home',
      path: '/home',
      icon: Home,
      description: 'Dashboard overview'
    }
  ];
  
  const studentItems = [
    ...commonItems,
    {
      name: 'Evaluation',
      path: '/evaluation',
      icon: Award,
      description: 'View your evaluations'
    },
    {
      name: 'Attendance',
      path: '/attendance',
      icon: Calendar,
      description: 'View your attendance'
    }
  ];
  
  const supervisorItems = [
    ...commonItems,
    {
      name: 'Students',
      path: '/students',
      icon: Users,
      description: 'List of students'
    },
    {
      name: 'Records',
      path: '/records',
      icon: BookOpen,
      description: 'Student records'
    },
    {
      name: 'Evaluation',
      path: '/evaluation',
      icon: Award,
      description: 'Evaluation metrics'
    },
    {
      name: 'Attendance',
      path: '/attendance',
      icon: Calendar,
      description: 'Attendance records'
    }
  ];
  
  const adminItems = [
    ...commonItems,
    {
      name: 'Students',
      path: '/students',
      icon: Users,
      description: 'List of students'
    },
    {
      name: 'Supervisors',
      path: '/supervisors',
      icon: Users,
      description: 'List of supervisors'
    },
    {
      name: 'Records',
      path: '/records',
      icon: BookOpen,
      description: 'Student and supervisor records'
    },
    {
      name: 'Evaluation',
      path: '/evaluation',
      icon: Award,
      description: 'Evaluation metrics'
    },
    {
      name: 'Attendance',
      path: '/attendance',
      icon: Calendar,
      description: 'Attendance records'
    }
  ];
  
  switch (role) {
    case 'admin':
      return adminItems;
    case 'supervisor':
      return supervisorItems;
    case 'student':
      return studentItems;
    default:
      return commonItems;
  }
};

const Navbar = () => {
  const location = useLocation();
  const [navItems, setNavItems] = useState([]);
  
  useEffect(() => {
    const userRole = localStorage.getItem('userRole') as UserRole || 'admin';
    setNavItems(getNavItemsForRole(userRole));
  }, []);

  return (
    <nav className="bg-ojtrack-blue text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-ojtrack-navy text-ojtrack-pink"
                    : "hover:bg-ojtrack-navy/50"
                )}
                title={item.description}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
