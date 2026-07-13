import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  Modal,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';
import { useAdmin } from '../../context/AdminContext';

type AdminUpdateFeeDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminUpdateFeeDetails'>;
interface Props {
  navigation: AdminUpdateFeeDetailsNavigationProp;
}

export default function AdminUpdateFeeDetailsScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const { studentList, addTransaction } = useAdmin();

  // Selection states
  const [selectedClass, setSelectedClass] = useState<string>('Select Class');
  const [showClassModal, setShowClassModal] = useState(false);
  
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);

  // Form states
  const [paymentType, setPaymentType] = useState('Select Type');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('22 May 2024');
  const [transactionId, setTransactionId] = useState('');
  const [remarks, setRemarks] = useState('');

  // Dropdown states
  const paymentTypes = ['Cash', 'Credit/Debit Card', 'Bank Transfer', 'UPI', 'Cheque'];
  const [showTypeModal, setShowTypeModal] = useState(false);

  // Date Picker Custom UI
  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const getDaysInMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1).getDay();

  // Derived data
  const classes = Array.from(new Set(studentList.map(s => s.className)));
  const filteredStudents = studentList.filter(s => s.className === selectedClass);
  const selectedStudent = studentList.find(s => s.id === selectedStudentId);

  const handleSavePayment = () => {
    if (selectedStudent && amount) {
      addTransaction({
        name: selectedStudent.name,
        className: selectedStudent.className,
        amount: parseInt(amount, 10)
      });
      navigation.goBack();
    }
  };

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
        
        <Text style={styles.pageTitle}>Update Fee Details</Text>

        {/* Selection Flow */}
        <View style={styles.formGroup}>
           <Text style={styles.label}>Select Class</Text>
           <TouchableOpacity 
             style={styles.dropdown} 
             onPress={() => setShowClassModal(true)}
           >
             <Text style={[styles.inputText, selectedClass === 'Select Class' && { color: '#64748B' }]}>{selectedClass}</Text>
             <MaterialCommunityIcons name="chevron-down" size={20} color="#111827" />
           </TouchableOpacity>
        </View>

        {selectedClass !== 'Select Class' && (
          <View style={styles.formGroup}>
             <Text style={styles.label}>Select Student</Text>
             <TouchableOpacity 
               style={styles.dropdown} 
               onPress={() => setShowStudentModal(true)}
             >
               <Text style={[styles.inputText, !selectedStudentId && { color: '#64748B' }]}>
                 {selectedStudent ? selectedStudent.name : 'Select Student'}
               </Text>
               <MaterialCommunityIcons name="chevron-down" size={20} color="#111827" />
             </TouchableOpacity>
          </View>
        )}

        {/* Show Rest of UI ONLY if Student is Selected */}
        {selectedStudent && (
          <>
            {/* Student Profile Card */}
            <View style={styles.studentCard}>
               <Image source={{ uri: selectedStudent.avatar }} style={styles.avatar} />
               <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>{selectedStudent.name}</Text>
                  <Text style={styles.studentDetails}>{selectedStudent.className} | Roll No. {selectedStudent.roll}</Text>
               </View>
            </View>

        {/* Fee Summary */}
        <View style={styles.feeSummaryCard}>
           <View style={styles.feeBox}>
              <Text style={styles.feeLabel}>Total Annual Fees</Text>
              <Text style={[styles.feeValue, { color: '#F8FAFC' }]}>
                ₹ {parseInt(selectedStudent.tuitionFee || '15000') + parseInt(selectedStudent.transportFee || '5000') + parseInt(selectedStudent.libraryFee || '2000')}
              </Text>
           </View>
           <View style={styles.feeBox}>
              <Text style={styles.feeLabel}>Paid Amount</Text>
              <Text style={[styles.feeValue, { color: '#10B981' }]}>₹ 15,000</Text>
           </View>
           <View style={styles.feeBox}>
              <Text style={styles.feeLabel}>Due Amount</Text>
              <Text style={[styles.feeValue, { color: '#EF4444' }]}>₹ 10,000</Text>
           </View>
        </View>

        {/* Add Payment Form */}
        <View style={styles.formCard}>
           <Text style={styles.formTitle}>Add Payment</Text>
           
           <View style={[styles.formGroup, { zIndex: 10 }]}>
              <Text style={styles.label}>Payment Type</Text>
              <TouchableOpacity 
                style={[styles.dropdown, showTypeModal && styles.dropdownOpen]} 
                onPress={() => setShowTypeModal(!showTypeModal)}
              >
                <Text style={styles.inputText}>{paymentType}</Text>
                <MaterialCommunityIcons name={showTypeModal ? "chevron-up" : "chevron-down"} size={20} color="#111827" />
              </TouchableOpacity>
              {showTypeModal && (
                <View style={styles.inlineDropdownList}>
                  {paymentTypes.map((item, index) => (
                    <TouchableOpacity 
                      key={item}
                      style={[styles.inlineDropdownOption, index === paymentTypes.length - 1 && { borderBottomWidth: 0 }]}
                      onPress={() => { setPaymentType(item); setShowTypeModal(false); }}
                    >
                      <Text style={[styles.dropdownOptionText, paymentType === item && { color: '#4F46E5', fontWeight: 'bold' }]}>{item}</Text>
                      {paymentType === item && <MaterialCommunityIcons name="check" size={20} color="#4F46E5" />}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
           </View>

           <View style={styles.formGroup}>
              <Text style={styles.label}>Amount</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Enter amount"
                placeholderTextColor="#9CA3AF"
                value={amount} 
                onChangeText={setAmount} 
                keyboardType="number-pad"
              />
           </View>

           <View style={styles.formGroup}>
              <Text style={styles.label}>Payment Date</Text>
              <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowDatePicker(true)}>
                <Text style={[styles.input, { flex: 1, borderWidth: 0, marginBottom: 0, paddingTop: 14 }]}>
                  {paymentDate}
                </Text>
                <MaterialCommunityIcons name="calendar-blank-outline" size={20} color="#111827" style={styles.inputIcon} />
              </TouchableOpacity>
           </View>

           {showDatePicker && (
             <View style={styles.calendarContainer}>
               <View style={styles.calendarHeader}>
                 <TouchableOpacity onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}>
                   <MaterialCommunityIcons name="chevron-left" size={24} color="#111827" />
                 </TouchableOpacity>
                 <Text style={styles.calendarMonthText}>
                   {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                 </Text>
                 <TouchableOpacity onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}>
                   <MaterialCommunityIcons name="chevron-right" size={24} color="#111827" />
                 </TouchableOpacity>
               </View>
               <View style={styles.calendarGrid}>
                 {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(wd => (
                   <View key={wd} style={styles.calendarDay}>
                     <Text style={styles.calendarWeekDayText}>{wd}</Text>
                   </View>
                 ))}
                 {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, i) => (
                   <View key={`empty-${i}`} style={styles.calendarDay} />
                 ))}
                 {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, i) => {
                   const dayNum = i + 1;
                   const isSelected = date.getDate() === dayNum && date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear();
                   return (
                     <TouchableOpacity 
                       key={dayNum} 
                       style={[styles.calendarDay, isSelected && styles.calendarDaySelected]}
                       onPress={() => {
                         const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNum);
                         setDate(newDate);
                         setPaymentDate(newDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }));
                         setShowDatePicker(false);
                       }}
                     >
                       <Text style={[styles.calendarDayText, isSelected && styles.calendarDayTextSelected]}>{dayNum}</Text>
                     </TouchableOpacity>
                   );
                 })}
               </View>
             </View>
           )}

           <View style={styles.formGroup}>
              <Text style={styles.label}>Transaction ID (Optional)</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Enter transaction id"
                placeholderTextColor="#9CA3AF"
                value={transactionId} 
                onChangeText={setTransactionId} 
              />
           </View>

           <View style={styles.formGroup}>
              <Text style={styles.label}>Remarks (Optional)</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Enter remarks"
                placeholderTextColor="#9CA3AF"
                value={remarks} 
                onChangeText={setRemarks} 
              />
           </View>

         </View>
          </>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Save Button */}
      {selectedStudent && (
        <View style={styles.fabContainer}>
           <TouchableOpacity 
             style={styles.fabButton}
             onPress={handleSavePayment}
           >
              <Text style={styles.fabText}>Save Payment</Text>
           </TouchableOpacity>
        </View>
      )}

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminHome')}>
          <MaterialCommunityIcons name="home-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialCommunityIcons name="receipt" size={28} color="#4F46E5" />
          <Text style={[styles.tabLabel, { color: '#4F46E5' }]}>Fee{'\n'}Management</Text>
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

      {/* Class Modal */}
      <Modal visible={showClassModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
           <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowClassModal(false)} activeOpacity={1} />
           <View style={styles.centerModalContent}>
              <Text style={styles.modalTitle}>Select Class</Text>
              <FlatList
                data={classes}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.modalOption} onPress={() => { setSelectedClass(item); setSelectedStudentId(null); setShowClassModal(false); }}>
                     <Text style={styles.modalOptionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
           </View>
        </View>
      </Modal>

      {/* Student Modal */}
      <Modal visible={showStudentModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
           <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowStudentModal(false)} activeOpacity={1} />
           <View style={styles.centerModalContent}>
              <Text style={styles.modalTitle}>Select Student</Text>
              <FlatList
                data={filteredStudents}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.modalOption} onPress={() => { setSelectedStudentId(item.id); setShowStudentModal(false); }}>
                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                       <Image source={{ uri: item.avatar }} style={{ width: 32, height: 32, borderRadius: 16, marginRight: 12 }} />
                       <Text style={styles.modalOptionText}>{item.name}</Text>
                     </View>
                  </TouchableOpacity>
                )}
              />
           </View>
        </View>
      </Modal>

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

  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 20 },

  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#E5E7EB', marginRight: 16 },
  studentInfo: { flex: 1 },
  studentName: { fontSize: 16, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 4 },
  studentDetails: { fontSize: 13, color: '#64748B' },

  feeSummaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  feeBox: { flex: 1 },
  feeLabel: { fontSize: 12, color: '#64748B', marginBottom: 6 },
  feeValue: { fontSize: 16, fontWeight: 'bold' },

  formCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  formTitle: { fontSize: 16, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 20 },
  formGroup: { marginBottom: 16 },
  label: { fontSize: 13, color: '#64748B', marginBottom: 8 },
  input: {
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 15,
    color: '#F8FAFC',
  },
  inputText: { fontSize: 15, color: '#64748B' },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: { marginLeft: 8 },

  dropdownOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  inlineDropdownList: {
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
  },
  inlineDropdownOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#E2E8F0',
  },

  // Custom Calendar Styles
  calendarContainer: {
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarMonthText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%', // 100% / 7
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarDaySelected: {
    backgroundColor: '#4F46E5',
    borderRadius: 20,
  },
  calendarWeekDayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#64748B',
  },
  calendarDayText: {
    fontSize: 14,
    color: '#E2E8F0',
  },
  calendarDayTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  fabContainer: { position: 'absolute', bottom: 80, left: 16, right: 16 },
  fabButton: { 
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
  fabText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },

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

  // Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  centerModalContent: {
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    maxHeight: '80%',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 16, textAlign: 'center' },
  modalOption: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalOptionText: {
    fontSize: 15,
    color: '#F1F5F9',
    fontWeight: '500',
  },
});

