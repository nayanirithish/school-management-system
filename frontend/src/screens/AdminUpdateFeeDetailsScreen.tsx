import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  TextInput,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useAdmin } from '../context/AdminContext';
import GlassBackground from '../components/GlassBackground';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';

type AdminUpdateFeeDetailsProp = NativeStackNavigationProp<RootStackParamList, 'AdminUpdateFeeDetails'>;
interface Props {
  navigation: AdminUpdateFeeDetailsProp;
}

export default function AdminUpdateFeeDetailsScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  const { addTransaction } = useAdmin();

  // Form states
  const [paymentType, setPaymentType] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('22 May 2024');
  const [txId, setTxId] = useState('');
  const [remarks, setRemarks] = useState('');
  
  // Modals
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const feeTypes = ['Tuition Fee', 'Exam Fee', 'Transport Fee', 'Library Fee', 'Hostel Fee'];

  const handleSavePayment = () => {
    if (!paymentType || !amount) return;
    
    // Add transaction to context
    addTransaction({
      name: 'Rahul Kumar',
      className: 'Class 10 - A',
      amount: parseInt(amount, 10),
    }, false);

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
            <MaterialCommunityIcons name="arrow-left" size={28} color={isDark ? "#FFFFFF" : "#111827"} />
          </TouchableOpacity>
          <Text style={[styles.brandTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Update Fee Details</Text>
          <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons name="cog-outline" size={24} color={isDark ? "#D1D5DB" : "#6B7280"} />
          </TouchableOpacity>
        </GlassCard>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Student Profile Card */}
          <View style={styles.studentCardWrapper}>
             <GlassCard intensity={isDark ? 20 : 60} style={styles.studentCard} styleOverride={{ borderRadius: 24, backgroundColor: isDark ? 'rgba(167, 139, 250, 0.15)' : 'rgba(139, 92, 246, 0.1)' }}>
               <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={[styles.studentAvatar, { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }]} />
               <View>
                  <Text style={[styles.studentName, { color: isDark ? '#FFFFFF' : '#111827' }]}>Rahul Kumar</Text>
                  <Text style={[styles.studentDetails, { color: isDark ? '#D1D5DB' : '#4B5563' }]}>Class 10 - A | Roll No. 25</Text>
               </View>
             </GlassCard>
          </View>

          {/* Fee Overview Card */}
          <View style={styles.feeOverviewCardWrapper}>
             <GlassCard intensity={isDark ? 20 : 60} style={styles.feeOverviewCard} styleOverride={{ borderRadius: 24 }}>
                <View style={styles.feeColumn}>
                   <Text style={[styles.feeLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Total Annual Fees</Text>
                   <Text style={styles.feeValuePrimary}>₹ 25,000</Text>
                </View>
                <View style={styles.feeColumn}>
                   <Text style={[styles.feeLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Paid Amount</Text>
                   <Text style={styles.feeValueSuccess}>₹ 15,000</Text>
                </View>
                <View style={styles.feeColumn}>
                   <Text style={[styles.feeLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Due Amount</Text>
                   <Text style={styles.feeValueDanger}>₹ 10,000</Text>
                </View>
             </GlassCard>
          </View>

          {/* Add Payment Form */}
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Add Payment</Text>
          
          <View style={styles.inputGroup}>
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Payment Type</Text>
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
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Amount</Text>
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
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Payment Date</Text>
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
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Transaction ID (Optional)</Text>
             <View style={styles.inputWrapper}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.inputGlass} styleOverride={{ borderRadius: 12 }}>
                   <TextInput 
                     style={[styles.textInput, { color: isDark ? '#FFFFFF' : '#111827' }]} 
                     placeholder="Enter transaction id"
                     placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
                     value={txId} 
                     onChangeText={setTxId} 
                   />
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
                <Text style={styles.submitButtonText}>Save Payment</Text>
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

        {/* Type Dropdown Modal */}
        <Modal visible={showTypeDropdown} transparent animationType="fade">
           <View style={styles.centerModalOverlay}>
             <View style={styles.modalBackdrop} />
             <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowTypeDropdown(false)} activeOpacity={1} />
             <View style={styles.dropdownModalContentWrapper}>
                <GlassCard intensity={isDark ? 50 : 90} style={styles.dropdownModalContent} styleOverride={{ borderRadius: 20 }}>
                   <Text style={[styles.modalTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Select Payment Type</Text>
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
                   <Text style={[styles.successTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Fee Received!</Text>
                   <Text style={[styles.successSubtitle, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>The transaction has been successfully recorded and added to the ledger.</Text>
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

  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },

  studentCardWrapper: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  studentAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
    borderWidth: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  studentDetails: {
    fontSize: 13,
  },

  feeOverviewCardWrapper: {
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  feeOverviewCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  feeColumn: {
    alignItems: 'flex-start',
  },
  feeLabel: {
    fontSize: 11,
    marginBottom: 8,
    fontWeight: '600',
  },
  feeValuePrimary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#60a5fa',
  },
  feeValueSuccess: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34d399',
  },
  feeValueDanger: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f87171',
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
    // Styling handled by GlassCard
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
