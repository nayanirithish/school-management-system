import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert,
  Modal,
  Platform,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type AdminClassesProp = NativeStackNavigationProp<RootStackParamList, 'AdminClasses'>;
interface Props {
  navigation: AdminClassesProp;
}

const generateDummyStudents = (count: number, className: string) => {
  const firstNames = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Riaan', 'Krishna', 'Ishaan', 'Shaurya', 'Ananya', 'Diya', 'Sana', 'Ira', 'Myra', 'Aria', 'Kavya', 'Sia', 'Kyra', 'Neha', 'Rohan', 'Karan', 'Priya', 'Riya', 'Aisha'];
  const lastNames = ['Sharma', 'Patel', 'Singh', 'Kumar', 'Rao', 'Reddy', 'Nair', 'Das', 'Joshi', 'Chauhan', 'Verma', 'Gupta', 'Mehta', 'Bose', 'Kapoor'];
  
  // Seed random-ish based on className so it's consistent for each class
  let seed = className.length + count;
  
  return Array.from({ length: count }).map((_, i) => {
    seed = (seed * 9301 + 49297) % 233280;
    const randomFirst = firstNames[Math.floor((seed / 233280) * firstNames.length)];
    seed = (seed * 9301 + 49297) % 233280;
    const randomLast = lastNames[Math.floor((seed / 233280) * lastNames.length)];
    return {
      id: `std_${i}`,
      rollNo: `${100 + i + 1}`,
      name: `${randomFirst} ${randomLast}`,
    };
  });
};

export default function AdminClassesScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();

  const [classes, setClasses] = useState([
    { id: '1', name: 'Class 10 - A', teacher: 'Mr. Rahul Sharma', students: 42, room: 'Room 101', time: '8:00 AM - 2:00 PM' },
    { id: '2', name: 'Class 10 - B', teacher: 'Ms. Neha Joshi', students: 38, room: 'Room 102', time: '8:00 AM - 2:00 PM' },
    { id: '3', name: 'Class 9 - A', teacher: 'Mr. Arvind Kumar', students: 45, room: 'Room 201', time: '8:00 AM - 2:00 PM' },
    { id: '4', name: 'Class 9 - B', teacher: 'Ms. Priya Nair', students: 40, room: 'Room 202', time: '8:00 AM - 2:00 PM' },
    { id: '5', name: 'Class 8 - A', teacher: 'Mr. Suresh Babu', students: 44, room: 'Room 301', time: '8:00 AM - 2:00 PM' },
    { id: '6', name: 'Class 7 - A', teacher: 'Ms. Kavya Reddy', students: 39, room: 'Room 401', time: '8:00 AM - 2:00 PM' },
    { id: '7', name: 'Class 6 - A', teacher: 'Mr. Ramesh Rao', students: 36, room: 'Room 501', time: '8:00 AM - 2:00 PM' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedClassId, setExpandedClassId] = useState<string | null>(null);
  const [showAllForClass, setShowAllForClass] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newSection, setNewSection] = useState('');
  const [newStudents, setNewStudents] = useState('');
  const [newRoom, setNewRoom] = useState('');

  const filteredClasses = classes.filter(cls => 
    cls.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cls.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
      
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="menu" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>ORYOL</Text>
        <View style={styles.appBarRight}>
          <View style={styles.languageToggle}>
            <TouchableOpacity onPress={() => setIsTelugu(false)} style={!isTelugu ? styles.languageActive : styles.languageInactive}>
              <Text style={!isTelugu ? styles.langTextActive : styles.langTextInactive}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsTelugu(true)} style={isTelugu ? styles.languageActive : styles.languageInactive}>
              <Text style={isTelugu ? styles.langTextActive : styles.langTextInactive}>Telugu</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ marginLeft: 12 }}>
            <MaterialCommunityIcons name="cog-outline" size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.pageTitle}>Classes</Text>

        {/* Search Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons name="magnify" size={24} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search classes..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Overview Stats */}
        <View style={styles.statsRow}>
           <View style={styles.statBox}>
              <Text style={styles.statLabel}>Total Classes</Text>
              <Text style={[styles.statValue, { color: '#F8FAFC' }]}>18</Text>
           </View>
           <View style={styles.statBox}>
              <Text style={styles.statLabel}>Active</Text>
              <Text style={[styles.statValue, { color: '#4F46E5' }]}>18</Text>
           </View>
           <View style={styles.statBox}>
              <Text style={styles.statLabel}>Students</Text>
              <Text style={[styles.statValue, { color: '#F8FAFC' }]}>1,248</Text>
           </View>
        </View>

        {/* Classes List */}
        <View style={styles.listContainer}>
          {filteredClasses.map((cls) => (
            <TouchableOpacity 
              key={cls.id} 
              style={styles.classCard}
              onPress={() => {
                setExpandedClassId(expandedClassId === cls.id ? null : cls.id);
                setShowAllForClass(null);
              }}
              activeOpacity={0.8}
            >
               <View style={styles.classHeader}>
                  <View style={styles.classIconBg}>
                     <MaterialCommunityIcons name="view-grid-outline" size={24} color="#111827" />
                  </View>
                  <View style={styles.classTitleInfo}>
                     <Text style={styles.className}>{cls.name}</Text>
                     <Text style={styles.classTeacher}>Class Teacher: {cls.teacher}</Text>
                  </View>
                  <View style={styles.roomPill}>
                     <Text style={styles.roomText}>{cls.room}</Text>
                  </View>
               </View>
               <View style={styles.classFooter}>
                  <View style={styles.footerItem}>
                     <MaterialCommunityIcons name="account-group" size={16} color="#6B7280" />
                     <Text style={styles.footerText}>{cls.students} students</Text>
                  </View>
                  <View style={styles.footerItem}>
                     <MaterialCommunityIcons name="clock-outline" size={16} color="#6B7280" />
                     <Text style={styles.footerText}>{cls.time}</Text>
                  </View>
               </View>
               
               {expandedClassId === cls.id && (
                 <View style={styles.studentListContainer}>
                   <Text style={styles.studentListTitle}>Students List</Text>
                   {(() => {
                     const studentsData = generateDummyStudents(cls.students, cls.name);
                     const isShowingAll = showAllForClass === cls.id;
                     const studentsToShow = isShowingAll ? studentsData : studentsData.slice(0, 5);
                     
                     return (
                       <>
                         {studentsToShow.map((student) => (
                           <View key={student.id} style={styles.studentItem}>
                             <Image 
                               source={{ uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random` }} 
                               style={styles.studentAvatarImg} 
                             />
                             <View style={styles.studentInfo}>
                                <Text style={styles.studentName}>{student.name}</Text>
                                <Text style={styles.studentRollNo}>Roll No: {student.rollNo}</Text>
                             </View>
                           </View>
                         ))}
                         {!isShowingAll && cls.students > 5 && (
                           <TouchableOpacity 
                             style={styles.moreStudentsButton}
                             onPress={() => setShowAllForClass(cls.id)}
                           >
                              <Text style={styles.moreStudentsText}>+ {cls.students - 5} more students</Text>
                           </TouchableOpacity>
                         )}
                       </>
                     );
                   })()}
                 </View>
               )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Add Button */}
      <View style={styles.fabContainer}>
         <TouchableOpacity style={styles.fabButton} onPress={() => setShowAddModal(true)}>
            <MaterialCommunityIcons name="plus" size={20} color="#FFF" />
            <Text style={styles.fabText}>Add New Class</Text>
         </TouchableOpacity>
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminHome')}>
          <MaterialCommunityIcons name="home-outline" size={28} color="#4F46E5" />
          <Text style={[styles.tabLabel, { color: '#4F46E5' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminFeeManagement')}>
          <MaterialCommunityIcons name="receipt" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Fee{'\n'}Management</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminNotices')}>
          <MaterialCommunityIcons name="bell-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminProfile')}>
          <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Add New Class Modal Overlay */}
      {showAddModal && (
        <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Class</Text>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Class Name</Text>
                <TextInput style={styles.input} placeholder="e.g. Class 11" value={newClassName} onChangeText={setNewClassName} />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Section</Text>
                <TextInput style={styles.input} placeholder="e.g. A" value={newSection} onChangeText={setNewSection} />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>No. of Students</Text>
                <TextInput style={styles.input} placeholder="e.g. 40" keyboardType="numeric" value={newStudents} onChangeText={setNewStudents} />
              </View>
              
              <View style={styles.formGroup}>
                <Text style={styles.label}>Room No.</Text>
                <TextInput style={styles.input} placeholder="e.g. Room 105" value={newRoom} onChangeText={setNewRoom} />
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setShowAddModal(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={() => {
                  if (!newClassName || !newSection || !newStudents || !newRoom) {
                     if (Platform.OS === 'web') {
                        window.alert("Please fill all fields");
                     } else {
                        Alert.alert("Error", "Please fill all fields");
                     }
                     return;
                  }
                  const newClass = {
                     id: Math.random().toString(),
                     name: `${newClassName} - ${newSection}`,
                     teacher: 'TBD',
                     students: parseInt(newStudents) || 0,
                     room: newRoom,
                     time: '8:00 AM - 2:00 PM'
                  };
                  setClasses([...classes, newClass]);
                  setShowAddModal(false);
                  setNewClassName(''); setNewSection(''); setNewStudents(''); setNewRoom('');
                }}>
                  <Text style={styles.saveButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}

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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: { marginRight: 16 },
  brandTitle: { fontSize: 22, fontWeight: '900', color: '#4F46E5', flex: 1, letterSpacing: 0.5 },
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    height: 32,
    alignItems: 'center',
    padding: 2,
  },
  languageActive: {
    backgroundColor: '#4F46E5',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageInactive: { paddingHorizontal: 12, justifyContent: 'center' },
  langTextActive: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  langTextInactive: { color: '#4F46E5', fontSize: 12, fontWeight: '500' },

  scrollContent: { paddingHorizontal: 16, paddingTop: 16 },

  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 16 },

  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginRight: 0,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#F8FAFC', outlineStyle: 'none' as any },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statBox: { 
    flex: 1, 
    backgroundColor: 'rgba(15, 23, 42, 0.5)', 
    borderRadius: 16, 
    padding: 16, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statLabel: { fontSize: 12, color: '#64748B', marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: 'bold' },

  listContainer: { paddingBottom: 20 },
  classCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  classHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  classIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  classTitleInfo: { flex: 1, justifyContent: 'center' },
  className: { fontSize: 15, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 2 },
  classTeacher: { fontSize: 12, color: '#64748B' },
  roomPill: { backgroundColor: '#EEF2FF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  roomText: { fontSize: 11, fontWeight: 'bold', color: '#4F46E5' },
  
  classFooter: { flexDirection: 'row', alignItems: 'center', marginLeft: 56 },
  footerItem: { flexDirection: 'row', alignItems: 'center', marginRight: 16 },
  footerText: { fontSize: 12, color: '#64748B', marginLeft: 6 },

  fabContainer: { position: 'absolute', bottom: 80, left: 16, right: 16 },
  fabButton: { 
    flexDirection: 'row',
    backgroundColor: '#4F46E5', 
    borderRadius: 30, 
    paddingVertical: 14, 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#4F46E5', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    elevation: 4 
  },
  fabText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },

  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 10, color: '#64748B', marginTop: 4, fontWeight: '500', textAlign: 'center' },

  studentListContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  studentListTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#E2E8F0',
    marginBottom: 12,
  },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentAvatarImg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E2E8F0',
  },
  studentRollNo: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  moreStudentsButton: {
    marginTop: 4,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
  },
  moreStudentsText: {
    fontSize: 13,
    color: '#4F46E5',
    fontWeight: 'bold',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 16 },
  formGroup: { marginBottom: 16 },
  label: { fontSize: 13, color: '#64748B', marginBottom: 8 },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 15,
  },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 },
  cancelButton: { paddingVertical: 10, paddingHorizontal: 16, marginRight: 8 },
  cancelButtonText: { color: '#64748B', fontSize: 16, fontWeight: '500' },
  saveButton: { backgroundColor: '#4F46E5', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12 },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
