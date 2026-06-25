import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, LayoutAnimation, UIManager, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type FacultyAttendanceNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FacultyAttendance'>;
interface Props {
  navigation: FacultyAttendanceNavigationProp;
}

export default function FacultyAttendanceScreen({ navigation }: Props) {
  const [isTelugu, setIsTelugu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Date State
  const [currentDate, setCurrentDate] = useState(new Date(2024, 4, 22)); // 22 May 2024

  // Dropdown State
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('Class 10 - A');

  const classes = [
    'Class 8 - A', 'Class 8 - B', 'Class 9 - A', 'Class 9 - B', 'Class 10 - A', 'Class 10 - B'
  ];

  // Student State
  const [students, setStudents] = useState([
    { id: 1, name: 'Aditya Kumar', status: 'Present' },
    { id: 2, name: 'Ananya Rao', status: 'Present' },
    { id: 3, name: 'Bhavya Singh', status: 'Present' },
    { id: 4, name: 'Charan Teja', status: 'Absent' },
    { id: 5, name: 'Diya Sharma', status: 'Present' },
    { id: 6, name: 'Esha Verma', status: 'Present' },
    { id: 7, name: 'Farhan Ali', status: 'Absent' },
    { id: 8, name: 'Gita Reddy', status: 'Present' },
  ]);

  const toggleStatus = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStudents(prev => prev.map(student => {
      if (student.id === id) {
        return { ...student, status: student.status === 'Present' ? 'Absent' : 'Present' };
      }
      return student;
    }));
  };

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const handleClassSelect = (cls: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedClass(cls);
    setIsClassDropdownOpen(false);
  };

  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Stats calculation
  const totalStudents = students.length;
  const presentCount = students.filter(s => s.status === 'Present').length;
  const absentCount = students.filter(s => s.status === 'Absent').length;
  const lateCount = 0;

  const presentPercentage = totalStudents > 0 ? ((presentCount / totalStudents) * 100).toFixed(1) : '0';
  const absentPercentage = totalStudents > 0 ? ((absentCount / totalStudents) * 100).toFixed(1) : '0';
  const latePercentage = '0';

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <LinearGradient colors={['#FAFAFA', '#F3E8FF', '#E0F2FE']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <View style={styles.appBarLeft}>
             <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight: 12}}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
             </TouchableOpacity>
             <Text style={styles.pageTitle}>{isTelugu ? 'హాజరు' : 'Attendance'}</Text>
          </View>
          <View style={styles.appBarRight}>
            <TouchableOpacity 
              style={styles.languageToggle} 
              onPress={() => setIsTelugu(!isTelugu)}
              activeOpacity={0.8}
            >
              <View style={[styles.languagePill, !isTelugu ? styles.languageActive : styles.languageInactive]}>
                 <Text style={[styles.languageText, !isTelugu && styles.languageTextActive]}>English</Text>
              </View>
              <View style={[styles.languagePill, isTelugu ? styles.languageActive : styles.languageInactive]}>
                 <Text style={[styles.languageText, isTelugu && styles.languageTextActive]}>Telugu</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 12 }}>
              <MaterialCommunityIcons name="cog-outline" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Date Selector */}
          <View style={styles.dateSelectorRow}>
            <TouchableOpacity onPress={() => changeDate(-1)} style={styles.dateArrow}>
              <MaterialCommunityIcons name="chevron-left" size={28} color="#9CA3AF" />
            </TouchableOpacity>
            <Text style={styles.dateText}>{formatDate(currentDate)}</Text>
            <TouchableOpacity onPress={() => changeDate(1)} style={styles.dateArrow}>
              <MaterialCommunityIcons name="chevron-right" size={28} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Class Dropdown */}
          <View style={{ zIndex: 10 }}>
            <TouchableOpacity 
              style={styles.dropdownToggle} 
              activeOpacity={0.8}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setIsClassDropdownOpen(!isClassDropdownOpen);
              }}
            >
              <Text style={styles.dropdownToggleText}>{selectedClass}</Text>
              <MaterialCommunityIcons name={isClassDropdownOpen ? "chevron-up" : "chevron-down"} size={24} color="#9CA3AF" />
            </TouchableOpacity>
            
            {isClassDropdownOpen && (
              <View style={styles.dropdownMenu}>
                <ScrollView style={{maxHeight: 200}} nestedScrollEnabled>
                  {classes.map((cls, index) => (
                    <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => handleClassSelect(cls)}>
                      <Text style={styles.dropdownItemText}>{cls}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Stats Boxes */}
          <View style={styles.statsRow}>
            <View style={[styles.statBox, { borderColor: '#E5E7EB' }]}>
              <Text style={styles.statLabel}>{isTelugu ? 'మొత్తం' : 'Total'}</Text>
              <Text style={styles.statValueMain}>{totalStudents}</Text>
            </View>
            <View style={[styles.statBox, { borderColor: '#10B98122' }]}>
              <Text style={styles.statLabel}>{isTelugu ? 'హాజరు' : 'Present'}</Text>
              <Text style={[styles.statValueMain, { color: '#10B981' }]}>{presentCount}</Text>
              <Text style={styles.statSubText}>{presentPercentage}%</Text>
            </View>
            <View style={[styles.statBox, { borderColor: '#EF444422' }]}>
              <Text style={styles.statLabel}>{isTelugu ? 'గైర్హాజరు' : 'Absent'}</Text>
              <Text style={[styles.statValueMain, { color: '#EF4444' }]}>{absentCount}</Text>
              <Text style={styles.statSubText}>{absentPercentage}%</Text>
            </View>
            <View style={[styles.statBox, { borderColor: '#E5E7EB' }]}>
              <Text style={styles.statLabel}>{isTelugu ? 'ఆలస్యం' : 'Late'}</Text>
              <Text style={[styles.statValueMain, { color: '#9CA3AF' }]}>{lateCount}</Text>
              <Text style={styles.statSubText}>{latePercentage}%</Text>
            </View>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons name="magnify" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder={isTelugu ? 'విద్యార్థిని శోధించండి...' : 'Search student...'}
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Students List */}
          <View style={styles.studentsList}>
            {filteredStudents.map((student) => (
              <View key={student.id} style={styles.studentRow}>
                <View style={styles.studentInfoLeft}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{student.name.charAt(0)}</Text>
                  </View>
                  <Text style={styles.studentName}>{student.name}</Text>
                </View>
                <TouchableOpacity 
                  onPress={() => toggleStatus(student.id)}
                  style={styles.statusToggle}
                  activeOpacity={0.6}
                >
                  <Text style={[
                    styles.statusText, 
                    student.status === 'Present' ? styles.textPresent : styles.textAbsent
                  ]}>
                    {student.status === 'Present' 
                      ? (isTelugu ? 'హాజరు' : 'Present') 
                      : (isTelugu ? 'గైర్హాజరు' : 'Absent')}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
            
            {filteredStudents.length === 0 && (
              <View style={{padding: 20, alignItems: 'center'}}>
                 <Text style={{color: '#9CA3AF'}}>{isTelugu ? 'విద్యార్థులు కనుగొనబడలేదు' : 'No students found'}</Text>
              </View>
            )}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar */}
        <BlurView intensity={90} tint="light" style={styles.bottomTabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyHome')}>
            <MaterialCommunityIcons name="home" size={28} color="#5B4BCA" />
            <Text style={[styles.tabLabel, { color: '#5B4BCA' }]}>{isTelugu ? 'హోమ్' : 'Home'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyTimeTable')}>
            <MaterialCommunityIcons name="calendar-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'టైమ్ టేబుల్' : 'Time Table'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'నోటిఫికేషన్' : 'Notification'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
          </TouchableOpacity>
        </BlurView>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center' },
  
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  appBarLeft: { flexDirection: 'row', alignItems: 'center' },
  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    padding: 2,
    alignItems: 'center',
  },
  languagePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  languageActive: { backgroundColor: '#E0E7FF' },
  languageInactive: { backgroundColor: 'transparent' },
  languageText: { fontSize: 11, fontWeight: 'bold', color: '#6B7280' },
  languageTextActive: { color: '#5B4BCA' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  dateSelectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  dateArrow: {
    padding: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },

  dropdownToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  dropdownToggleText: {
    fontSize: 15,
    color: '#111827',
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginTop: -16,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#374151',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  statValueMain: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  statSubText: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
  },

  studentsList: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 16,
    paddingBottom: 8,
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  studentInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
  },
  studentName: {
    fontSize: 15,
    color: '#111827',
  },
  statusToggle: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  statusText: {
    fontSize: 15,
    fontWeight: '600',
  },
  textPresent: { color: '#10B981' },
  textAbsent: { color: '#EF4444' },

  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255,255,255,0.7)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 4, fontWeight: '500' },
});
