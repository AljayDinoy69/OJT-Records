
// Admin data management utilities

// Types for records data
export type RecordEntry = {
  id: string;
  studentId?: string;
  supervisorId?: string;
  date: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
};

// Types for evaluation data
export type EvaluationEntry = {
  id: string;
  studentId?: string;
  supervisorId?: string;
  date: string;
  score: number;
  feedback: string;
  category: string;
};

// Types for attendance data
export type AttendanceEntry = {
  id: string;
  studentId?: string;
  supervisorId?: string;
  date: string;
  timeIn: string;
  timeOut: string;
  status: 'present' | 'absent' | 'late';
};

// User type with role
export type UserRole = 'admin' | 'student' | 'supervisor';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this should be hashed
  role: UserRole;
  profilePic?: string;
};

// Load all records from localStorage
export const loadRecords = (): RecordEntry[] => {
  const storedRecords = localStorage.getItem('adminRecords');
  return storedRecords ? JSON.parse(storedRecords) : [];
};

// Load all evaluations from localStorage
export const loadEvaluations = (): EvaluationEntry[] => {
  const storedEvaluations = localStorage.getItem('adminEvaluations');
  return storedEvaluations ? JSON.parse(storedEvaluations) : [];
};

// Load all attendance records from localStorage
export const loadAttendance = (): AttendanceEntry[] => {
  const storedAttendance = localStorage.getItem('adminAttendance');
  return storedAttendance ? JSON.parse(storedAttendance) : [];
};

// Save records to localStorage
export const saveRecords = (records: RecordEntry[]): void => {
  localStorage.setItem('adminRecords', JSON.stringify(records));
};

// Save evaluations to localStorage
export const saveEvaluations = (evaluations: EvaluationEntry[]): void => {
  localStorage.setItem('adminEvaluations', JSON.stringify(evaluations));
};

// Save attendance records to localStorage
export const saveAttendance = (attendance: AttendanceEntry[]): void => {
  localStorage.setItem('adminAttendance', JSON.stringify(attendance));
};

// Load all users from localStorage
export const loadUsers = (): User[] => {
  const storedUsers = localStorage.getItem('users');
  const users = storedUsers ? JSON.parse(storedUsers) : [];
  
  // If no users, add default admin
  if (users.length === 0) {
    const adminUser: User = {
      id: 'admin-1',
      name: 'Admin User',
      email: 'aljayenocdinoy@gmail.com',
      password: 'aljay123', // In a real app, this should be hashed
      role: 'admin',
    };
    users.push(adminUser);
    saveUsers(users);
  }
  
  return users;
};

// Save users to localStorage
export const saveUsers = (users: User[]): void => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Delete all records, evaluations and attendance for a student
export const deleteStudentData = (studentId: string): void => {
  // Remove from records
  const records = loadRecords();
  const updatedRecords = records.filter(record => record.studentId !== studentId);
  saveRecords(updatedRecords);
  
  // Remove from evaluations
  const evaluations = loadEvaluations();
  const updatedEvaluations = evaluations.filter(evaluation => evaluation.studentId !== studentId);
  saveEvaluations(updatedEvaluations);
  
  // Remove from attendance
  const attendance = loadAttendance();
  const updatedAttendance = attendance.filter(att => att.studentId !== studentId);
  saveAttendance(updatedAttendance);
  
  // Remove from users
  const users = loadUsers();
  const updatedUsers = users.filter(user => user.id !== studentId);
  saveUsers(updatedUsers);
};

// Delete all records, evaluations and attendance for a supervisor
export const deleteSupervisorData = (supervisorId: string): void => {
  // Remove from records
  const records = loadRecords();
  const updatedRecords = records.filter(record => record.supervisorId !== supervisorId);
  saveRecords(updatedRecords);
  
  // Remove from evaluations
  const evaluations = loadEvaluations();
  const updatedEvaluations = evaluations.filter(evaluation => evaluation.supervisorId !== supervisorId);
  saveEvaluations(updatedEvaluations);
  
  // Remove from attendance
  const attendance = loadAttendance();
  const updatedAttendance = attendance.filter(att => att.supervisorId !== supervisorId);
  saveAttendance(updatedAttendance);
  
  // Remove from users
  const users = loadUsers();
  const updatedUsers = users.filter(user => user.id !== supervisorId);
  saveUsers(updatedUsers);
};

// Create a function to check if a user can access a specific route
export const canAccessRoute = (userRole: UserRole, route: string): boolean => {
  const studentRoutes = ['/home', '/evaluation', '/attendance', '/profile-settings'];
  const supervisorRoutes = ['/home', '/students', '/records', '/evaluation', '/attendance', '/profile-settings'];
  const adminRoutes = ['/home', '/students', '/supervisors', '/records', '/evaluation', '/attendance', '/profile-settings', '/settings'];
  
  if (userRole === 'admin') {
    return adminRoutes.includes(route) || route === '/';
  } else if (userRole === 'supervisor') {
    return supervisorRoutes.includes(route) || route === '/';
  } else if (userRole === 'student') {
    return studentRoutes.includes(route) || route === '/';
  }
  
  return false;
};

// Authentication helper
export const authenticateUser = (email: string, password: string): User | null => {
  const users = loadUsers();
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};
