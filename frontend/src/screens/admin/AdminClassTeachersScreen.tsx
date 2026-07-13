import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Modal,
  FlatList
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';
import { useAdmin } from '../../context/AdminContext';

type AdminClassTeachersNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminClassTeachers'>;
interface Props {
  navigation: AdminClassTeachersNavigationProp;
}

export default function AdminClassTeachersScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const { classTeachers, facultyList, assignClassTeacher } = useAdmin();

  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const activeFacultyList = facultyList.filter(f => f.status === 'Active');

  const handleAssign = (facultyId: number | null) => {
    if (selectedClass) {
      assignClassTeacher(selectedClass, facultyId);
      setSelectedClass(null);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
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
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Class Teachers</Text>
        <Text style={styles.subtitle}>Assign or update class teachers below.</Text>

        <View style={styles.listContainer}>
          {classTeachers.map((ct) => {
            const faculty = ct.facultyId ? facultyList.find(f => f.id === ct.facultyId) : null;
            
            return (
              <View key={ct.className} style={styles.listItem}>
                 <View style={styles.classInfo}>
                    <Text style={styles.className}>{ct.className}</Text>
                    <View style={styles.teacherRow}>
                      <Image 
                        source={{ uri: faculty ? faculty.avatar : 'https://i.pravatar.cc/150?img=1' }} 
                        style={[styles.avatar, !faculty && { opacity: 0.3 }]} 
                      />
                      <View>
                         <Text style={[styles.teacherName, !faculty && { color: '#9CA3AF' }]}>
                           {faculty ? faculty.name : 'Unassigned'}
                         </Text>
                         {faculty && <Text style={styles.teacherDept}>{faculty.dept}</Text>}
                      </View>
                    </View>
                 </View>
                 <TouchableOpacity style={styles.editButton} onPress={() => setSelectedClass(ct.className)}>
                    <Text style={styles.editButtonText}>{faculty ? 'Edit' : 'Assign'}</Text>
                 </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Interactive Modal for Faculty Selection */}
      <Modal visible={selectedClass !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
           <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setSelectedClass(null)} activeOpacity={1} />
           <View style={styles.centerModalContent}>
              <Text style={styles.modalTitle}>Assign Teacher to {selectedClass}</Text>
              
              <FlatList
                data={activeFacultyList}
                keyExtractor={(item) => item.id.toString()}
                style={{ maxHeight: 300 }}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.facultyOption} onPress={() => handleAssign(item.id)}>
                     <Image source={{ uri: item.avatar }} style={styles.facultyOptionAvatar} />
                     <View>
                        <Text style={styles.facultyOptionName}>{item.name}</Text>
                        <Text style={styles.facultyOptionDept}>{item.dept}</Text>
                     </View>
                  </TouchableOpacity>
                )}
              />

              <TouchableOpacity style={styles.removeOption} onPress={() => handleAssign(null)}>
                 <MaterialCommunityIcons name="cancel" size={24} color="#EF4444" />
                 <Text style={styles.removeOptionText}>Remove Assignment</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.submitButtonWrapper} onPress={() => setSelectedClass(null)}>
                <Text style={styles.submitButtonText}>Cancel</Text>
              </TouchableOpacity>
           </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
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

  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  subtitle: { fontSize: 14, color: '#6B7280', marginBottom: 24, marginTop: 4 },

  listContainer: { paddingBottom: 20 },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  classInfo: { flex: 1 },
  className: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  teacherRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12, backgroundColor: '#E5E7EB' },
  teacherName: { fontSize: 14, fontWeight: 'bold', color: '#111827' },
  teacherDept: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  
  editButton: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  editButtonText: { color: '#4F46E5', fontWeight: 'bold', fontSize: 13 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  centerModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 360,
    maxHeight: '80%',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 16, textAlign: 'center' },
  
  facultyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  facultyOptionAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  facultyOptionName: { fontSize: 15, fontWeight: 'bold', color: '#111827' },
  facultyOptionDept: { fontSize: 12, color: '#6B7280' },
  
  removeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    marginTop: 8,
  },
  removeOptionText: { fontSize: 15, fontWeight: 'bold', color: '#EF4444', marginLeft: 8 },

  submitButtonWrapper: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  submitButtonText: { color: '#4B5563', fontSize: 15, fontWeight: 'bold' },
});
