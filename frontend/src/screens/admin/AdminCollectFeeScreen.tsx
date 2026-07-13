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
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useAdmin } from '../../context/AdminContext';
import GlassBackground from '../../components/GlassBackground';
import GlassCard from '../../components/GlassCard';
import { useTheme } from '../../context/ThemeContext';

type AdminCollectFeeProp = NativeStackNavigationProp<RootStackParamList, 'AdminCollectFee'>;
interface Props {
  navigation: AdminCollectFeeProp;
}

export default function AdminCollectFeeScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  const { addTransaction } = useAdmin();

  // Form states
  const [selectedClass, setSelectedClass] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('22 May 2024');
  const [remarks, setRemarks] = useState('');
  
  // Modals
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const classesList = ['Class 10 - A', 'Class 10 - B', 'Class 9 - A', 'Class 9 - B', 'Class 8 - A', 'Class 8 - B'];
  const feeTypes = ['Tuition Fee', 'Exam Fee', 'Transport Fee', 'Library Fee', 'Hostel Fee'];

  const handleSavePayment = () => {
    if (!selectedClass || !paymentType || !amount) return;
    
    // Add transaction to context
    addTransaction({
      name: `Bulk - ${paymentType}`,
      className: selectedClass,
      amount: parseInt(amount, 10),
    }, true);

    // Show success popup
    setShowSuccessPopup(true);
  };

  const handleSuccessOk = () => {
    setShowSuccessPopup(false);
    navigation.goBack(); // Return to Fee Management
  };

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <GlassCard style={styles.appBar} intensity={isDark ? 40 : 80} styleOverride={{ borderRadius: 0, borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="menu" size={28} color={isDark ? "#FFFFFF" : "#111827"} />
          </TouchableOpacity>
          <Text style={[styles.brandTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Collect Class Fee</Text>
          <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons name="cog-outline" size={24} color={isDark ? "#D1D5DB" : "#6B7280"} />
          </TouchableOpacity>
        </GlassCard>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Text style={[styles.sectionDescription, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>
            Assign a bulk fee payment (e.g. Exam Fee) to all students in a specific class.
          </Text>

          {/* Collect Fee Form */}
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Fee Details</Text>
          
          <View style={styles.inputGroup}>
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Select Class</Text>
             <TouchableOpacity style={styles.dropdownButtonWrapper} onPress={() => setShowClassDropdown(true)} activeOpacity={0.8}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.dropdownButton} styleOverride={{ borderRadius: 12 }}>
                   <Text style={[styles.dropdownText, !selectedClass ? { color: isDark ? '#9CA3AF' : '#9CA3AF' } : { color: isDark ? '#FFFFFF' : '#111827' }]}>
                     {selectedClass || 'Choose Class'}
                   </Text>
                   <MaterialCommunityIcons name="chevron-down" size={24} color={isDark ? "#D1D5DB" : "#6B7280"} />
                </GlassCard>
             </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Fee Type</Text>
             <TouchableOpacity style={styles.dropdownButtonWrapper} onPress={() => setShowTypeDropdown(true)} activeOpacity={0.8}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.dropdownButton} styleOverride={{ borderRadius: 12 }}>
                   <Text style={[styles.dropdownText, !paymentType ? { color: isDark ? '#9CA3AF' : '#9CA3AF' } : { color: isDark ? '#FFFFFF' : '#111827' }]}>
                     {paymentType || 'Select Type'}
                   </Text>
                   <MaterialCommunityIcons name="chevron-down" size={24} color={isDark ? "#D1D5DB" : "#6B7280"} />
                </GlassCard>
             </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Amount per Student (₹)</Text>
             <View style={styles.inputWrapper}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.inputGlass} styleOverride={{ borderRadius: 12 }}>
                   <TextInput 
                     style={[styles.textInput, { color: isDark ? '#FFFFFF' : '#111827' }]} 
                     placeholder="Enter amount" 
                     placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
                     keyboardType="numeric" 
                     value={amount} 
                     onChangeText={setAmount} 
                   />
                </GlassCard>
             </View>
          </View>

          <View style={styles.inputGroup}>
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Due Date</Text>
             <View style={styles.inputWrapper}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.inputWithIcon} styleOverride={{ borderRadius: 12 }}>
                   <TextInput 
                     style={[styles.textInput, { flex: 1, paddingHorizontal: 0, paddingVertical: 0, color: isDark ? '#FFFFFF' : '#111827' }]} 
                     value={date} 
                     onChangeText={setDate}
                     placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
                   />
                   <MaterialCommunityIcons name="calendar" size={24} color={isDark ? "#D1D5DB" : "#6B7280"} />
                </GlassCard>
             </View>
          </View>

          <View style={styles.inputGroup}>
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Remarks (Optional)</Text>
             <View style={styles.inputWrapper}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.inputGlass} styleOverride={{ borderRadius: 12 }}>
                   <TextInput 
                     style={[styles.textInput, { color: isDark ? '#FFFFFF' : '#111827' }]} 
                     placeholder="Enter remarks" 
                     placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
                     value={remarks} 
                     onChangeText={setRemarks} 
                   />
                </GlassCard>
             </View>
          </View>

          <TouchableOpacity style={styles.submitButtonWrapper} onPress={handleSavePayment}>
             <LinearGradient colors={isDark ? ['#38bdf8', '#0284c7'] : ['#4f46e5', '#3730a3']} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Apply Fee to Class</Text>
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
            <MaterialCommunityIcons name="receipt" size={28} color={isDark ? "#38bdf8" : "#5B4BCA"} />
            <Text style={[styles.tabLabel, { color: isDark ? '#38bdf8' : '#5B4BCA' }]}>Fee Mgmt</Text>
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

        {/* Class Dropdown Modal */}
        <Modal visible={showClassDropdown} transparent animationType="fade">
           <View style={styles.centerModalOverlay}>
             <View style={styles.modalBackdrop} />
             <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowClassDropdown(false)} activeOpacity={1} />
             <View style={styles.dropdownModalContentWrapper}>
                <GlassCard intensity={isDark ? 50 : 90} style={styles.dropdownModalContent} styleOverride={{ borderRadius: 20 }}>
                   <Text style={[styles.modalTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Select Class</Text>
                   {classesList.map((type, index) => (
                     <TouchableOpacity 
                       key={index} 
                       style={styles.dropdownOption}
                       onPress={() => {
                         setSelectedClass(type);
                         setShowClassDropdown(false);
                       }}
                     >
                        <Text style={[styles.dropdownOptionText, { color: isDark ? '#E5E7EB' : '#374151' }]}>{type}</Text>
                     </TouchableOpacity>
                   ))}
                </GlassCard>
             </View>
           </View>
        </Modal>

        {/* Type Dropdown Modal */}
        <Modal visible={showTypeDropdown} transparent animationType="fade">
           <View style={styles.centerModalOverlay}>
             <View style={styles.modalBackdrop} />
             <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowTypeDropdown(false)} activeOpacity={1} />
             <View style={styles.dropdownModalContentWrapper}>
                <GlassCard intensity={isDark ? 50 : 90} style={styles.dropdownModalContent} styleOverride={{ borderRadius: 20 }}>
                   <Text style={[styles.modalTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Select Fee Type</Text>
                   {feeTypes.map((type, index) => (
                     <TouchableOpacity 
                       key={index} 
                       style={styles.dropdownOption}
                       onPress={() => {
                         setPaymentType(type);
                         setShowTypeDropdown(false);
                       }}
                     >
                        <Text style={[styles.dropdownOptionText, { color: isDark ? '#E5E7EB' : '#374151' }]}>{type}</Text>
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
                   <Text style={[styles.successTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Class Fee Applied!</Text>
                   <Text style={[styles.successSubtitle, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>The bulk fee has been successfully added to all students in {selectedClass}.</Text>
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
  safeArea: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center' },
  
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  brandTitle: { fontSize: 18, fontWeight: '700' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },

  sectionDescription: {
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 20,
  },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 16 },

  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
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
  tabLabel: { fontSize: 11, color: '#64748B', marginTop: 4, fontWeight: '500' },

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
    borderBottomColor: 'rgba(156, 163, 175, 0.2)',
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
