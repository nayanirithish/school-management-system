import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Faculty {
  id: number;
  name: string;
  dept: string;
  status: 'Active' | 'Inactive';
  avatar: string;
  email?: string;
  contact?: string;
  qualification?: string;
  doj?: string;
  degreePhotoUrl?: string;
  interDiplomaPhotoUrl?: string;
  tenthPhotoUrl?: string;
}

export interface Student {
  id: number;
  name: string;
  className: string;
  roll: string;
  status: 'Active' | 'Inactive';
  avatar: string;
  dob?: string;
  gender?: string;
  contact?: string;
  address?: string;
  tuitionFee?: string;
  transportFee?: string;
  libraryFee?: string;
  aadharUrl?: string;
  tcUrl?: string;
  studyCertUrl?: string;
}

export interface Transaction {
  id: string;
  name: string;
  className: string;
  amount: number;
  status: 'Paid' | 'Pending';
  date: string;
  avatarUrl?: string;
}

export interface ClassTeacherAssignment {
  className: string;
  facultyId: number | null;
}

interface AdminContextProps {
  totalFeeCollected: number;
  pendingAmount: number;
  monthlyRevenue: number;
  todaysRevenue: number;
  totalStudents: number;
  facultyActive: number;
  studentsActive: number;
  busDriversActive: number;
  recentTransactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'status'>, applyToClass?: boolean) => void;
  facultyList: Faculty[];
  addFaculty: (faculty: Faculty) => void;
  updateFaculty: (faculty: Faculty) => void;
  deleteFaculty: (id: number) => void;
  toggleFacultyStatus: (id: number) => void;
  studentList: Student[];
  addStudent: (student: Student) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: number) => void;
  toggleStudentStatus: (id: number) => void;
  classTeachers: ClassTeacherAssignment[];
  assignClassTeacher: (className: string, facultyId: number | null) => void;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [totalFeeCollected, setTotalFeeCollected] = useState(1875000);
  const [pendingAmount, setPendingAmount] = useState(345000);
  const [monthlyRevenue, setMonthlyRevenue] = useState(1250000);
  const [todaysRevenue, setTodaysRevenue] = useState(45000);
  
  const [totalStudents] = useState(1248);
  const [facultyActive] = useState(42);
  const [studentsActive] = useState(890);
  const [busDriversActive] = useState(12);

  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([
    { id: '1', name: 'Rahul Kumar', className: 'Class 10 - A', amount: 15000, status: 'Paid', date: '22 May 2024', avatarUrl: 'https://i.pravatar.cc/150?img=11' },
    { id: '2', name: 'Ananya Rao', className: 'Class 9 - B', amount: 10000, status: 'Paid', date: '22 May 2024', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
    { id: '3', name: 'Vikram Singh', className: 'Class 8 - A', amount: 12500, status: 'Pending', date: '22 May 2024', avatarUrl: 'https://i.pravatar.cc/150?img=12' },
    { id: '4', name: 'Pooja Verma', className: 'Class 11 - C', amount: 15000, status: 'Paid', date: '21 May 2024', avatarUrl: 'https://i.pravatar.cc/150?img=9' },
  ]);

  const [facultyList, setFacultyList] = useState<Faculty[]>([
    { id: 1, name: 'Mr. Rahul Sharma', dept: 'Computer Science', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=11', email: 'rahul.s@oryol.edu', contact: '9876543210', qualification: 'M.Tech, B.Ed', doj: '10 Aug 2018' },
    { id: 2, name: 'Ms. Neha Joshi', dept: 'Mathematics', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=5', email: 'neha.j@oryol.edu', contact: '9876543211', qualification: 'M.Sc, B.Ed', doj: '15 Sep 2019' },
    { id: 3, name: 'Mr. Arvind Kumar', dept: 'Physics', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=68', email: 'arvind.k@oryol.edu', contact: '9876543212', qualification: 'M.Sc, Ph.D', doj: '01 Jun 2020' },
    { id: 4, name: 'Ms. Priya Nair', dept: 'English', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=47', email: 'priya.n@oryol.edu', contact: '9876543213', qualification: 'MA, B.Ed', doj: '12 Jul 2021' },
    { id: 5, name: 'Mr. Suresh Babu', dept: 'Chemistry', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?img=12', email: 'suresh.b@oryol.edu', contact: '9876543214', qualification: 'M.Sc, B.Ed', doj: '20 Aug 2022' },
    { id: 6, name: 'Ms. Kavya Reddy', dept: 'Biology', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=20', email: 'kavya.r@oryol.edu', contact: '9876543215', qualification: 'M.Sc, B.Ed', doj: '05 Jan 2023' },
  ]);

  const [studentList, setStudentList] = useState<Student[]>([
    { id: 1, name: 'Rahul Kumar', className: 'Class 10 - A', roll: '25', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=11', dob: '12 May 2009', gender: 'Male', contact: '9876543210', address: 'Hyderabad, Telangana' },
    { id: 2, name: 'Ananya Rao', className: 'Class 9 - B', roll: '12', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=5', dob: '15 Aug 2010', gender: 'Female', contact: '9876543211', address: 'Secunderabad, Telangana' },
    { id: 3, name: 'Vikram Singh', className: 'Class 8 - A', roll: '08', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=68', dob: '03 Mar 2011', gender: 'Male', contact: '9876543212', address: 'Kondapur, Hyderabad' },
    { id: 4, name: 'Pooja Verma', className: 'Class 11 - C', roll: '31', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=47', dob: '22 Jan 2008', gender: 'Female', contact: '9876543213', address: 'Gachibowli, Hyderabad' },
    { id: 5, name: 'Arjun Mehta', className: 'Class 7 - B', roll: '15', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?img=12', dob: '11 Nov 2012', gender: 'Male', contact: '9876543214', address: 'Madhapur, Hyderabad' },
    { id: 6, name: 'Diya Sharma', className: 'Class 6 - A', roll: '05', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=20', dob: '09 Sep 2013', gender: 'Female', contact: '9876543215', address: 'Jubilee Hills, Hyderabad' },
  ]);

  const [classTeachers, setClassTeachers] = useState<ClassTeacherAssignment[]>([
    { className: 'Class 6 - A', facultyId: 1 },
    { className: 'Class 7 - B', facultyId: null },
    { className: 'Class 8 - A', facultyId: 2 },
    { className: 'Class 9 - B', facultyId: 3 },
    { className: 'Class 10 - A', facultyId: null },
    { className: 'Class 11 - C', facultyId: 4 },
  ]);

  const addFaculty = (faculty: Faculty) => {
    setFacultyList(prev => [...prev, { ...faculty, id: Date.now() }]);
  };

  const updateFaculty = (updatedFaculty: Faculty) => {
    setFacultyList(prev => prev.map(f => f.id === updatedFaculty.id ? updatedFaculty : f));
  };

  const deleteFaculty = (id: number) => {
    setFacultyList(prev => prev.filter(f => f.id !== id));
  };

  const toggleFacultyStatus = (id: number) => {
    setFacultyList(prev => prev.map(f => {
      if (f.id === id) {
        return { ...f, status: f.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return f;
    }));
  };

  const addStudent = (student: Student) => {
    setStudentList(prev => [...prev, { ...student, id: Date.now() }]);
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudentList(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };

  const deleteStudent = (id: number) => {
    setStudentList(prev => prev.filter(s => s.id !== id));
  };

  const toggleStudentStatus = (id: number) => {
    setStudentList(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return s;
    }));
  };

  const assignClassTeacher = (className: string, facultyId: number | null) => {
    setClassTeachers(prev => prev.map(c => 
      c.className === className ? { ...c, facultyId } : c
    ));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date' | 'status'>, applyToClass: boolean = false) => {
    // If applying to class, we multiply the impact (e.g. 40 students)
    const multiplier = applyToClass ? 40 : 1;
    const totalAmount = transaction.amount * multiplier;

    setTotalFeeCollected(prev => prev + totalAmount);
    setMonthlyRevenue(prev => prev + totalAmount);
    setTodaysRevenue(prev => prev + totalAmount);

    const newTransaction: Transaction = {
      ...transaction,
      id: Math.random().toString(),
      date: 'Today',
      status: 'Paid',
      avatarUrl: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };

    setRecentTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <AdminContext.Provider 
      value={{
        totalFeeCollected,
        pendingAmount,
        monthlyRevenue,
        todaysRevenue,
        totalStudents,
        facultyActive,
        studentsActive,
        busDriversActive,
        recentTransactions,
        addTransaction,
        facultyList,
        addFaculty,
        updateFaculty,
        deleteFaculty,
        toggleFacultyStatus,
        studentList,
        addStudent,
        updateStudent,
        deleteStudent,
        toggleStudentStatus,
        classTeachers,
        assignClassTeacher
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
