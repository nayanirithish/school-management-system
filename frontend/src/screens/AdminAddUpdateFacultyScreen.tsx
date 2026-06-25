import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import GlassBackground from '../components/GlassBackground';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';

type AdminAddUpdateFacultyProp = NativeStackNavigationProp<RootStackParamList, 'AdminAddUpdateFaculty'>;
interface Props {
  navigation: AdminAddUpdateFacultyProp;
}

export default function AdminAddUpdateFacultyScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  // Form states
  const [fullName, setFullName] = useState('Mr. Rahul Sharma');
  const [department, setDepartment] = useState('Computer Science');
  const [email, setEmail] = useState('rahul.sharma@oryol.com');
  const [contactNumber, setContactNumber] = useState('9876543210');
  const [qualification, setQualification] = useState('M.Tech (CSE)');
  const [doj, setDoj] = useState('10 Jan 2020');
  const [status, setStatus] = useState('Active');

  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const deptList = ['Computer Science', 'Mathematics', 'Physics', 'English', 'Chemistry', 'Biology'];
  const statusList = ['Active', 'Inactive', 'On Leave'];

  const handleUpdateFaculty = () => {
    // Save logic goes here
    setShowSuccessPopup(true);
  };

  const handleSuccessOk = () => {
    setShowSuccessPopup(false);
    navigation.goBack();
  };

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <GlassCard style={styles.appBar} intensity={isDark ? 40 : 80} styleOverride={{ borderRadius: 0, borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color={isDark ? "#FFFFFF" : "#111827"} />
          </TouchableOpacity>
          <Text style={[styles.brandTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Add / Update Faculty</Text>
          <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons name="cog-outline" size={24} color={isDark ? "#D1D5DB" : "#6B7280"} />
          </TouchableOpacity>
        </GlassCard>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Profile Photo */}
          <View style={styles.photoContainer}>
             <View style={styles.avatarWrapper}>
                <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={[styles.avatar, { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }]} />
                <TouchableOpacity style={styles.cameraButtonWrapper} activeOpacity={0.8}>
                   <LinearGradient colors={isDark ? ['#38bdf8', '#0284c7'] : ['#4f46e5', '#3730a3']} style={styles.cameraButton}>
                      <MaterialCommunityIcons name="camera" size={16} color="#FFFFFF" />
                   </LinearGradient>
                </TouchableOpacity>
             </View>
          </View>

          {/* Form Fields */}
          <View style={styles.inputGroup}>
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Full Name</Text>
             <View style={styles.inputWrapper}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.inputGlass} styleOverride={{ borderRadius: 12 }}>
                   <TextInput 
                     style={[styles.textInput, { color: isDark ? '#FFFFFF' : '#111827' }]} 
                     placeholder="Enter full name" 
                     placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
                     value={fullName} 
                     onChangeText={setFullName} 
                   />
                </GlassCard>
             </View>
          </View>

          <View style={styles.inputGroup}>
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Department</Text>
             <TouchableOpacity style={styles.dropdownButtonWrapper} onPress={() => setShowDeptDropdown(true)} activeOpacity={0.8}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.dropdownButton} styleOverride={{ borderRadius: 12 }}>
                   <Text style={[styles.dropdownText, { color: isDark ? '#FFFFFF' : '#111827' }]}>{department}</Text>
                   <MaterialCommunityIcons name="chevron-down" size={20} color={isDark ? "#D1D5DB" : "#6B7280"} />
                </GlassCard>
             </TouchableOpacity>
          </View>
          
          <View style={styles.inputGroup}>
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Email</Text>
             <View style={styles.inputWrapper}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.inputGlass} styleOverride={{ borderRadius: 12 }}>
                   <TextInput 
                     style={[styles.textInput, { color: isDark ? '#FFFFFF' : '#111827' }]} 
                     placeholder="Enter email address"
                     placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"} 
                     keyboardType="email-address"
                     value={email} 
                     onChangeText={setEmail} 
                   />
                </GlassCard>
             </View>
          </View>

          <View style={styles.inputGroup}>
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Contact Number</Text>
             <View style={styles.inputWrapper}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.inputGlass} styleOverride={{ borderRadius: 12 }}>
                   <TextInput 
                     style={[styles.textInput, { color: isDark ? '#FFFFFF' : '#111827' }]} 
                     placeholder="Enter mobile number" 
                     placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
                     keyboardType="phone-pad" 
                     value={contactNumber} 
                     onChangeText={setContactNumber} 
                   />
                </GlassCard>
             </View>
          </View>

          <View style={styles.inputGroup}>
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Qualification</Text>
             <View style={styles.inputWrapper}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.inputGlass} styleOverride={{ borderRadius: 12 }}>
                   <TextInput 
                     style={[styles.textInput, { color: isDark ? '#FFFFFF' : '#111827' }]} 
                     placeholder="Enter qualifications"
                     placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"} 
                     value={qualification} 
                     onChangeText={setQualification} 
                   />
                </GlassCard>
             </View>
          </View>

          <View style={styles.inputGroup}>
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Date of Joining</Text>
             <View style={styles.inputWrapper}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.inputWithIcon} styleOverride={{ borderRadius: 12 }}>
                   <TextInput 
                     style={[styles.textInput, { flex: 1, paddingHorizontal: 0, paddingVertical: 0, color: isDark ? '#FFFFFF' : '#111827' }]} 
                     value={doj} 
                     onChangeText={setDoj}
                     placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
                   />
                   <MaterialCommunityIcons name="calendar" size={20} color={isDark ? "#D1D5DB" : "#6B7280"} />
                </GlassCard>
             </View>
          </View>
          
          <View style={styles.inputGroup}>
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Status</Text>
             <TouchableOpacity style={styles.dropdownButtonWrapper} onPress={() => setShowStatusDropdown(true)} activeOpacity={0.8}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.dropdownButton} styleOverride={{ borderRadius: 12 }}>
                   <Text style={[styles.dropdownText, { color: isDark ? '#FFFFFF' : '#111827' }]}>{status}</Text>
                   <MaterialCommunityIcons name="chevron-down" size={20} color={isDark ? "#D1D5DB" : "#6B7280"} />
                </GlassCard>
             </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitButtonWrapper} onPress={handleUpdateFaculty}>
             <LinearGradient colors={isDark ? ['#38bdf8', '#0284c7'] : ['#4f46e5', '#3730a3']} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Save Faculty</Text>
             </LinearGradient>
          </TouchableOpacity>

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Bottom Tab Bar */}
        <GlassCard intensity={isDark ? 60 : 90} style={styles.bottomTabBar} styleOverride={{ borderRadius: 0, borderTopWidth: 1, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminFeeManagement')}>
            <MaterialCommunityIcons name="receipt" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Fee Mgmt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Notices</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminProfile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Profile</Text>
          </TouchableOpacity>
        </GlassCard>

        {/* Dropdowns */}
        <Modal visible={showDeptDropdown} transparent animationType="fade">
           <View style={styles.centerModalOverlay}>
             <View style={styles.modalBackdrop} />
             <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowDeptDropdown(false)} activeOpacity={1} />
             <View style={styles.dropdownModalContentWrapper}>
                <GlassCard intensity={isDark ? 50 : 90} style={styles.dropdownModalContent} styleOverride={{ borderRadius: 20 }}>
                   <Text style={[styles.modalTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Select Department</Text>
                   {deptList.map((dept, index) => (
                     <TouchableOpacity 
                       key={index} 
                       style={styles.dropdownOption}
                       onPress={() => {
                         setDepartment(dept);
                         setShowDeptDropdown(false);
                       }}
                     >
                        <Text style={[styles.dropdownOptionText, { color: isDark ? '#E5E7EB' : '#374151' }]}>{dept}</Text>
                     </TouchableOpacity>
                   ))}
                </GlassCard>
             </View>
           </View>
        </Modal>

        <Modal visible={showStatusDropdown} transparent animationType="fade">
           <View style={styles.centerModalOverlay}>
             <View style={styles.modalBackdrop} />
             <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowStatusDropdown(false)} activeOpacity={1} />
             <View style={styles.dropdownModalContentWrapper}>
                <GlassCard intensity={isDark ? 50 : 90} style={styles.dropdownModalContent} styleOverride={{ borderRadius: 20 }}>
                   <Text style={[styles.modalTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Select Status</Text>
                   {statusList.map((st, index) => (
                     <TouchableOpacity 
                       key={index} 
                       style={styles.dropdownOption}
                       onPress={() => {
                         setStatus(st);
                         setShowStatusDropdown(false);
                       }}
                     >
                        <Text style={[styles.dropdownOptionText, { color: isDark ? '#E5E7EB' : '#374151' }]}>{st}</Text>
                     </TouchableOpacity>
                   ))}
                </GlassCard>
             </View>
           </View>
        </Modal>

        {/* Success Popup */}
        <Modal visible={showSuccessPopup} transparent animationType="fade">
           <View style={styles.centerModalOverlay}>
             <View style={styles.modalBackdrop} />
             <View style={styles.successModalContentWrapper}>
                <GlassCard intensity={isDark ? 50 : 90} style={styles.successModalContent} styleOverride={{ borderRadius: 24 }}>
                   <View style={styles.successIconCircle}>
                      <MaterialCommunityIcons name="check" size={40} color="#10B981" />
                   </View>
                   <Text style={[styles.successTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Faculty Updated!</Text>
                   <Text style={[styles.successSubtitle, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>The faculty details have been successfully saved.</Text>
                   <TouchableOpacity style={styles.successButtonWrapper} onPress={handleSuccessOk}>
                      <LinearGradient colors={['#10B981', '#059669']} style={styles.successButton}>
                         <Text style={styles.successButtonText}>OK</Text>
                      </LinearGradient>
                   </TouchableOpacity>
                </GlassCard>
             </View>
           </View>
        </Modal>

      </SafeAreaView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, width: '100%' },
  
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  brandTitle: { fontSize: 18, fontWeight: '700' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 24 },

  photoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
  },
  cameraButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cameraButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  inputWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  inputGlass: {
    // Handled by GlassCard
  },
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownButtonWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownText: {
    fontSize: 15,
  },

  submitButtonWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 8,
  },
  submitButton: {
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
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 5,
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 4, fontWeight: '500' },

  // Modals
  centerModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dropdownModalContentWrapper: {
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  dropdownModalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  dropdownOption: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(156,163,175,0.2)',
  },
  dropdownOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },

  successModalContentWrapper: {
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  successModalContent: {
    padding: 32,
    alignItems: 'center',
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  successButtonWrapper: {
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  successButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  successButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
