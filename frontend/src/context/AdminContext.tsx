import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Transaction {
  id: string;
  name: string;
  className: string;
  amount: number;
  status: 'Paid' | 'Pending';
  date: string;
  avatarUrl?: string;
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
        addTransaction
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
