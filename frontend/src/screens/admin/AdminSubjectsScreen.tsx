import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type AdminSubjectsProp = NativeStackNavigationProp<RootStackParamList, 'AdminSubjects'>;
interface Props {
  navigation: AdminSubjectsProp;
}

export default function AdminSubjectsScreen({ navigation }: Props) {
  const [showAddSubject, setShowAddSubject] = useState(false);

  const subjects = [
    { id: '1', name: 'Mathematics', code: 'MAT101', classes: 'Class 8, 9, 10', icon: 'calculator' },
    { id: '2', name: 'Physics', code: 'PHY102', classes: 'Class 9, 10', icon: 'atom' },
    { id: '3', name: 'English', code: 'ENG101', classes: 'Class 8, 9, 10', icon: 'book-alphabet' },
    { id: '4', name: 'Computer Science', code: 'CS101', classes: 'Class 9, 10', icon: 'laptop' },
  ];

  return (
    <LinearGradient colors={['#0f172a', '#1e293b', '#0f172a']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <BlurView intensity={40} tint="dark" style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="menu" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.brandTitle}>Subjects</Text>
          <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons name="magnify" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </BlurView>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Text style={styles.sectionTitle}>Manage Subjects</Text>

          {/* Subjects List */}
          {subjects.map((sub) => (
            <View key={sub.id} style={styles.glassCardWrapper}>
               <BlurView intensity={20} tint="dark" style={styles.glassCard}>
                  <View style={styles.subjectHeader}>
                     <View style={styles.subjectIconContainer}>
                        <MaterialCommunityIcons name={sub.icon as any} size={24} color="#a78bfa" />
                     </View>
                     <View style={{ flex: 1 }}>
                        <Text style={styles.subjectName}>{sub.name}</Text>
                        <Text style={styles.subjectDetails}>Code: {sub.code} • {sub.classes}</Text>
                     </View>
                     <TouchableOpacity style={styles.editButton}>
                        <MaterialCommunityIcons name="pencil" size={20} color="#a78bfa" />
                     </TouchableOpacity>
                  </View>
               </BlurView>
            </View>
          ))}

          {/* Add Subject Button */}
          <TouchableOpacity 
             style={styles.addButtonWrapper}
             onPress={() => setShowAddSubject(true)}
             activeOpacity={0.8}
          >
             <BlurView intensity={40} tint="dark" style={styles.addButtonGlass}>
                <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
                <Text style={styles.addButtonText}>Add New Subject</Text>
             </BlurView>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Add Subject Modal */}
        <Modal visible={showAddSubject} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
            <View style={styles.modalContentWrapper}>
               <BlurView intensity={50} tint="dark" style={styles.modalContent}>
                 <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Add New Subject</Text>
                    <TouchableOpacity onPress={() => setShowAddSubject(false)}>
                       <MaterialCommunityIcons name="close" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                 </View>

                 <Text style={styles.inputLabel}>Subject Name</Text>
                 <View style={styles.inputWrapper}>
                    <BlurView intensity={20} tint="dark" style={styles.inputGlass}>
                       <TextInput style={styles.inputField} placeholder="e.g. Biology" placeholderTextColor="#9CA3AF" />
                    </BlurView>
                 </View>

                 <Text style={styles.inputLabel}>Subject Code</Text>
                 <View style={styles.inputWrapper}>
                    <BlurView intensity={20} tint="dark" style={styles.inputGlass}>
                       <TextInput style={styles.inputField} placeholder="e.g. BIO101" placeholderTextColor="#9CA3AF" />
                    </BlurView>
                 </View>

                 <TouchableOpacity 
                    style={styles.submitButtonWrapper}
                    onPress={() => setShowAddSubject(false)}
                 >
                    <LinearGradient colors={['#8b5cf6', '#6d28d9']} style={styles.submitButtonGradient}>
                       <Text style={styles.submitButtonText}>Save Subject</Text>
                    </LinearGradient>
                 </TouchableOpacity>

               </BlurView>
            </View>
          </View>
        </Modal>

        {/* Bottom Tab Bar (Glassmorphic) */}
        <BlurView intensity={60} tint="dark" style={styles.bottomTabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminFeeManagement')}>
            <MaterialCommunityIcons name="receipt" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Fee</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Notices</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminProfile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Profile</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  brandTitle: { fontSize: 18, fontWeight: '700', color: '#FFFFFF' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 24 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 20 },

  glassCardWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  glassCard: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(167, 139, 250, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subjectDetails: {
    fontSize: 13,
    color: '#94a3b8',
  },
  editButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  addButtonWrapper: {
    marginTop: 8,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.3)',
  },
  addButtonGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: 'rgba(167, 139, 250, 0.1)',
  },
  addButtonText: {
    color: '#a78bfa',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalContentWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  modalContent: {
    padding: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' },
  
  inputLabel: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  inputGlass: {
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  inputField: {
    color: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
  },

  submitButtonWrapper: {
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  submitButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    zIndex: 5,
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#64748B', marginTop: 4, fontWeight: '500' },
});
