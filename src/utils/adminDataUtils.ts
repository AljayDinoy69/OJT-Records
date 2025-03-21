
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
};
