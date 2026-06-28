import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type FacultyAttendanceNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FacultyAttendance'>;
interface Props {
  navigation: FacultyAttendanceNavigationProp;
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type AttendanceStatus = 'Present' | 'Absent' | 'Late' | null;

interface Student {
  id: string;
  rollNo: string;
  name: string;
  status: AttendanceStatus;
}

export default function FacultyAttendanceScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [selectedClass, setSelectedClass] = useState('Class 10 - A');
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  
  const [showSaveOptions, setShowSaveOptions] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const classes = ['Class 10 - A', 'Class 10 - B', 'Class 9 - A'];

  const initialStudents: Record<string, Student[]> = {
    'Class 10 - A': [
      { id: '1', rollNo: '01', name: 'Aditya Kumar', status: 'Present' },
      { id: '2', rollNo: '02', name: 'Ananya Rao', status: 'Present' },
      { id: '3', rollNo: '03', name: 'Bhavya Singh', status: 'Present' },
      { id: '4', rollNo: '04', name: 'Charan Teja', status: 'Absent' },
    ],
    'Class 10 - B': [
      { id: '5', rollNo: '01', name: 'Diya Sharma', status: 'Present' },
      { id: '6', rollNo: '02', name: 'Esha Verma', status: 'Late' },
    ],
    'Class 9 - A': [
      { id: '7', rollNo: '01', name: 'Farhan Khan', status: 'Present' },
      { id: '8', rollNo: '02', name: 'Geeta Nair', status: 'Absent' },
    ]
  };

  const [students, setStudents] = useState<Student[]>(initialStudents['Class 10 - A']);

  const isPast = currentDate < today;
  const isFuture = currentDate > today;
  const isToday = currentDate.getTime() === today.getTime();

  useEffect(() => {
    // Generate mock data based on date and class
    let baseStudents = initialStudents[selectedClass] || [];
    if (isPast) {
      setStudents(baseStudents.map(s => ({ ...s, status: Math.random() > 0.3 ? 'Present' : 'Absent' })));
    } else if (isFuture) {
      setStudents(baseStudents.map(s => ({ ...s, status: null })));
    } else {
      setStudents(baseStudents);
    }
  }, [currentDate, selectedClass]);

  const handlePrevDate = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    setCurrentDate(d);
  };

  const handleNextDate = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    setCurrentDate(d);
  };

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const handleMarkAll = (status: AttendanceStatus) => {
    setStudents(students.map(s => ({ ...s, status })));
  };

  const handleToggleStudent = (id: string, status: AttendanceStatus) => {
    setStudents(students.map(s => s.id === id ? { ...s, status } : s));
  };

  const total = students.length;
  const present = students.filter(s => s.status === 'Present').length;
  const absent = students.filter(s => s.status === 'Absent').length;
  const late = students.filter(s => s.status === 'Late').length;

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance</Text>
        <View style={styles.headerRight}>
          <View style={styles.languageToggle}>
            <TouchableOpacity onPress={() => setIsTelugu(false)} style={!isTelugu ? styles.languageActive : styles.languageInactive}>
              <Text style={!isTelugu ? styles.langTextActive : styles.langTextInactive}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsTelugu(true)} style={isTelugu ? styles.languageActive : styles.languageInactive}>
              <Text style={isTelugu ? styles.langTextActive : styles.langTextInactive}>Telugu</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => navigation.navigate('FacultySettings')}>
             <MaterialCommunityIcons name="cog-outline" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Date Selector */}
        <View style={styles.dateSelector}>
          <TouchableOpacity onPress={handlePrevDate}>
            <MaterialCommunityIcons name="chevron-left" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.dateText}>{formatDate(currentDate)}</Text>
          <TouchableOpacity onPress={handleNextDate}>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Class Dropdown */}
        <TouchableOpacity 
          style={styles.classDropdown} 
          activeOpacity={0.8}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setShowClassDropdown(!showClassDropdown);
          }}
        >
          <Text style={styles.classDropdownText}>{selectedClass}</Text>
          <MaterialCommunityIcons name={showClassDropdown ? "chevron-up" : "chevron-down"} size={20} color="#6B7280" />
        </TouchableOpacity>

        {showClassDropdown && (
          <View style={styles.dropdownMenu}>
            {classes.map((cls) => (
              <TouchableOpacity 
                key={cls} 
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedClass(cls);
                  setShowClassDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{cls}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
             <Text style={styles.summaryLabel}>Total</Text>
             <Text style={[styles.summaryValue, { color: '#111827' }]}>{total}</Text>
          </View>
          <View style={styles.summaryCard}>
             <Text style={styles.summaryLabel}>Present</Text>
             <Text style={[styles.summaryValue, { color: '#10B981' }]}>{present}</Text>
          </View>
          <View style={styles.summaryCard}>
             <Text style={styles.summaryLabel}>Absent</Text>
             <Text style={[styles.summaryValue, { color: '#EF4444' }]}>{absent}</Text>
          </View>
          <View style={styles.summaryCard}>
             <Text style={styles.summaryLabel}>Late</Text>
             <Text style={[styles.summaryValue, { color: '#F59E0B' }]}>{late}</Text>
          </View>
        </View>

        {/* Mark All As */}
        <View style={styles.markAllContainer}>
          <Text style={styles.markAllText}>Mark All As:</Text>
          <View style={styles.markAllButtons}>
            <TouchableOpacity style={[styles.markAllBtn, { backgroundColor: '#22C55E' }]} onPress={() => handleMarkAll('Present')}>
              <Text style={styles.markAllBtnText}>Present</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.markAllBtn, { backgroundColor: '#EF4444' }]} onPress={() => handleMarkAll('Absent')}>
              <Text style={styles.markAllBtnText}>Absent</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.markAllBtn, { backgroundColor: '#F59E0B' }]} onPress={() => handleMarkAll('Late')}>
              <Text style={styles.markAllBtnText}>Late</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#22C55E' }]} />
            <Text style={styles.legendText}>Present</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.legendText}>Absent</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
            <Text style={styles.legendText}>Late</Text>
          </View>
        </View>

        {/* Student List */}
        <View style={styles.studentList}>
          {students.map((student) => (
            <View key={student.id} style={styles.studentRow}>
              <Text style={styles.rollNo}>{student.rollNo}</Text>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{student.name.charAt(0)}</Text>
              </View>
              <Text style={styles.studentName}>{student.name}</Text>
              
              <View style={styles.statusToggles}>
                <TouchableOpacity 
                  style={[styles.toggleBtn, student.status === 'Present' ? { backgroundColor: '#22C55E' } : null]} 
                  onPress={() => handleToggleStudent(student.id, 'Present')}
                >
                  <Text style={[styles.toggleText, student.status === 'Present' ? { color: '#FFF' } : null]}>P</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.toggleBtn, student.status === 'Absent' ? { backgroundColor: '#EF4444' } : null]} 
                  onPress={() => handleToggleStudent(student.id, 'Absent')}
                >
                  <Text style={[styles.toggleText, student.status === 'Absent' ? { color: '#FFF' } : null]}>A</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.toggleBtn, student.status === 'Late' ? { backgroundColor: '#F59E0B' } : null]} 
                  onPress={() => handleToggleStudent(student.id, 'Late')}
                >
                  <Text style={[styles.toggleText, student.status === 'Late' ? { color: '#FFF' } : null]}>L</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Save Button */}
      <View style={styles.saveContainer}>
        <TouchableOpacity 
          style={[styles.saveButton, (isPast || isFuture) && styles.saveButtonDisabled]}
          disabled={isPast || isFuture}
          onPress={() => setShowSaveOptions(true)}
        >
          <Text style={styles.saveButtonText}>{isTelugu ? 'సేవ్ చేయండి' : 'Save Attendance'}</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyHome')}>
          <MaterialCommunityIcons name="home-outline" size={28} color="#5B4BCA" />
          <Text style={[styles.tabLabel, {color: '#5B4BCA'}]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyTimeTable')}>
          <MaterialCommunityIcons name="calendar-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Time Table</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyNotices')}>
          <MaterialCommunityIcons name="bell-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultySettings')}>
          <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Save Options Popup */}
      {showSaveOptions && (
        <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{isTelugu ? 'ఆప్షన్ ఎంచుకోండి' : 'Select Option'}</Text>
              <TouchableOpacity 
                style={styles.modalButtonPrimary}
                onPress={() => {
                  setShowSaveOptions(false);
                  setShowSuccessModal(true);
                }}
              >
                <Text style={styles.modalButtonTextPrimary}>{isTelugu ? 'హాజరును గుర్తించండి' : 'Mark Attendance'}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalButtonSecondary}
                onPress={() => setShowSaveOptions(false)}
              >
                <Text style={styles.modalButtonTextSecondary}>{isTelugu ? 'హాజరును సవరించండి' : 'Edit Attendance'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Success Popup */}
      {showSuccessModal && (
        <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <MaterialCommunityIcons name="check-circle" size={60} color="#10B981" style={{marginBottom: 16}} />
              <Text style={styles.modalTitle}>{isTelugu ? 'విజయం!' : 'Success!'}</Text>
              <Text style={styles.modalMessage}>
                {isTelugu ? 'హాజరు విజయవంతంగా అప్‌లోడ్ చేయబడింది.' : 'Attendance uploaded successfully.'}
              </Text>
              <TouchableOpacity 
                style={styles.modalButtonPrimary}
                onPress={() => {
                  setShowSuccessModal(false);
                  navigation.navigate('FacultyHome');
                }}
              >
                <Text style={styles.modalButtonTextPrimary}>{isTelugu ? 'సరే' : 'OK'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: { marginRight: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', flex: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    height: 32,
    alignItems: 'center',
    padding: 2,
  },
  languageActive: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  languageInactive: { paddingHorizontal: 10, justifyContent: 'center' },
  langTextActive: { color: '#5B4BCA', fontSize: 11, fontWeight: 'bold' },
  langTextInactive: { color: '#6B7280', fontSize: 11, fontWeight: '500' },

  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 60 },

  dateSelector: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingHorizontal: 16 },
  dateText: { fontSize: 16, fontWeight: 'bold', color: '#111827' },

  classDropdown: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 16 },
  classDropdownText: { fontSize: 15, color: '#374151', fontWeight: '500' },
  dropdownMenu: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 12, paddingVertical: 8, marginBottom: 16, marginTop: -8 },
  dropdownItem: { paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  dropdownItemText: { fontSize: 15, color: '#374151' },

  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  summaryCard: { flex: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#F3F4F6', borderRadius: 12, paddingVertical: 12, alignItems: 'center', marginHorizontal: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  summaryLabel: { fontSize: 12, color: '#9CA3AF', marginBottom: 4, fontWeight: '500' },
  summaryValue: { fontSize: 20, fontWeight: 'bold' },

  markAllContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F9FAFB', padding: 12, borderRadius: 12, marginBottom: 16 },
  markAllText: { fontSize: 14, fontWeight: '600', color: '#111827' },
  markAllButtons: { flexDirection: 'row' },
  markAllBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginLeft: 8 },
  markAllBtnText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },

  legendRow: { flexDirection: 'row', marginBottom: 16, paddingHorizontal: 4 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginRight: 16 },
  legendDot: { width: 10, height: 10, borderRadius: 5, marginRight: 6 },
  legendText: { fontSize: 13, color: '#6B7280' },

  studentList: { borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 8 },
  studentRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  rollNo: { width: 24, fontSize: 13, color: '#9CA3AF' },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  studentName: { flex: 1, fontSize: 15, color: '#111827', fontWeight: '500' },
  
  statusToggles: { flexDirection: 'row' },
  toggleBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  toggleText: { fontSize: 13, fontWeight: 'bold', color: '#9CA3AF' },

  saveContainer: { position: 'absolute', bottom: 70, left: 16, right: 16 },
  saveButton: { backgroundColor: '#4F46E5', borderRadius: 12, paddingVertical: 16, alignItems: 'center', shadowColor: '#4F46E5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  saveButtonDisabled: { backgroundColor: '#9CA3AF', shadowOpacity: 0, elevation: 0 },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },

  bottomTabBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 10, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#F3F4F6', position: 'absolute', bottom: 0, width: '100%' },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#6B7280', marginTop: 4, fontWeight: '500' },

  // Modals
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalContent: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 32, alignItems: 'center', width: '100%', maxWidth: 340, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 16, textAlign: 'center' },
  modalMessage: { fontSize: 15, color: '#6B7280', textAlign: 'center', marginBottom: 24, lineHeight: 22 },
  modalButtonPrimary: { backgroundColor: '#4F46E5', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12, width: '100%', alignItems: 'center', marginBottom: 12 },
  modalButtonTextPrimary: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  modalButtonSecondary: { backgroundColor: '#F3F4F6', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 12, width: '100%', alignItems: 'center' },
  modalButtonTextSecondary: { color: '#4F46E5', fontSize: 16, fontWeight: 'bold' },
});
