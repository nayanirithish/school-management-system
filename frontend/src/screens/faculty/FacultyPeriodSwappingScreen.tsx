import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, LayoutAnimation, UIManager, Platform, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type FacultyPeriodSwappingNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FacultyPeriodSwapping'>;
interface Props {
  navigation: FacultyPeriodSwappingNavigationProp;
}

export default function FacultyPeriodSwappingScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const [activeTab, setActiveTab] = useState<'Request Swap' | 'Swap History'>('Request Swap');
  
  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState<'from' | 'to' | 'faculty' | null>(null);
  const [selectedFromPeriod, setSelectedFromPeriod] = useState('3rd Period (11:00 AM - 11:45 AM)');
  const [selectedToPeriod, setSelectedToPeriod] = useState('4th Period (11:45 AM - 12:30 PM)');
  const [selectedFaculty, setSelectedFaculty] = useState('Ms. Neha Joshi');
  
  // Date state
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 4, 24));
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Reason
  const [reason, setReason] = useState('');
  
  // Success Modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const periods = [
    '1st Period (09:00 AM - 09:45 AM)',
    '2nd Period (09:45 AM - 10:30 AM)',
    '3rd Period (11:00 AM - 11:45 AM)',
    '4th Period (11:45 AM - 12:30 PM)',
    '5th Period (01:30 PM - 02:15 PM)',
  ];

  const faculties = [
    'Ms. Neha Joshi',
    'Mr. Ravi Kumar',
    'Ms. Priya Singh',
    'Dr. Amit Sharma'
  ];

  const mockDates = [
    new Date(2024, 4, 24),
    new Date(2024, 4, 25),
    new Date(2024, 4, 26),
    new Date(2024, 4, 27),
  ];

  const swapHistory = [
    { id: 1, date: '12 May 2024', from: '2nd Period', to: '4th Period', faculty: 'Mr. Ravi Kumar', status: 'Approved' },
    { id: 2, date: '05 May 2024', from: '1st Period', to: '3rd Period', faculty: 'Ms. Priya Singh', status: 'Declined' },
    { id: 3, date: '28 Apr 2024', from: '4th Period', to: '5th Period', faculty: 'Dr. Amit Sharma', status: 'Approved' },
  ];

  const toggleDropdown = (dropdown: 'from' | 'to' | 'faculty') => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleSelectDropdown = (dropdown: 'from' | 'to' | 'faculty', value: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (dropdown === 'from') setSelectedFromPeriod(value);
    if (dropdown === 'to') setSelectedToPeriod(value);
    if (dropdown === 'faculty') setSelectedFaculty(value);
    setOpenDropdown(null);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const handleSubmit = () => {
    setShowSuccessModal(true);
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
             <Text style={styles.pageTitle}>{isTelugu ? 'పీరియడ్ మార్పిడి' : 'Period Swapping'}</Text>
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
          
          {/* Main Tab Selector (Nav Buttons) */}
          <View style={styles.tabSelectorRow}>
            <TouchableOpacity 
              style={[styles.tabPill, activeTab === 'Request Swap' && styles.tabPillActive, { borderTopRightRadius: 0, borderBottomRightRadius: 0, flex: 1, alignItems: 'center' }]} 
              onPress={() => setActiveTab('Request Swap')}
            >
                <Text style={[styles.tabPillText, activeTab === 'Request Swap' && styles.tabPillTextActive]}>
                  {isTelugu ? 'అభ్యర్థన పంపండి' : 'Request Swap'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabPill, activeTab === 'Swap History' && styles.tabPillActive, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, flex: 1, alignItems: 'center' }]} 
              onPress={() => setActiveTab('Swap History')}
            >
                <Text style={[styles.tabPillText, activeTab === 'Swap History' && styles.tabPillTextActive]}>
                  {isTelugu ? 'చరిత్ర' : 'Swap History'}
                </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'Request Swap' ? (
            <View style={styles.formContainer}>
              <Text style={styles.formSectionTitle}>{isTelugu ? 'మార్పిడి అభ్యర్థన' : 'Request Swap'}</Text>

              {/* From Period Dropdown */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{isTelugu ? 'నుండి (మీ పీరియడ్)' : 'From (Your Period)'}</Text>
                <TouchableOpacity style={styles.dropdownToggle} activeOpacity={0.8} onPress={() => toggleDropdown('from')}>
                  <Text style={styles.dropdownToggleText}>{selectedFromPeriod}</Text>
                  <MaterialCommunityIcons name={openDropdown === 'from' ? "chevron-up" : "chevron-down"} size={24} color="#9CA3AF" />
                </TouchableOpacity>
                {openDropdown === 'from' && (
                  <View style={styles.dropdownMenu}>
                    <ScrollView style={{maxHeight: 150}} nestedScrollEnabled>
                      {periods.map((p, index) => (
                        <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => handleSelectDropdown('from', p)}>
                          <Text style={styles.dropdownItemText}>{p}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
                <Text style={styles.helperText}>Class 10 - A</Text>
              </View>

              {/* To Period Dropdown */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{isTelugu ? 'ఇటు (మార్చుకోవడానికి)' : 'To (Swap With)'}</Text>
                <TouchableOpacity style={styles.dropdownToggle} activeOpacity={0.8} onPress={() => toggleDropdown('to')}>
                  <Text style={styles.dropdownToggleText}>{selectedToPeriod}</Text>
                  <MaterialCommunityIcons name={openDropdown === 'to' ? "chevron-up" : "chevron-down"} size={24} color="#9CA3AF" />
                </TouchableOpacity>
                {openDropdown === 'to' && (
                  <View style={styles.dropdownMenu}>
                    <ScrollView style={{maxHeight: 150}} nestedScrollEnabled>
                      {periods.map((p, index) => (
                        <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => handleSelectDropdown('to', p)}>
                          <Text style={styles.dropdownItemText}>{p}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
                <Text style={styles.helperText}>Class 10 - B</Text>
              </View>

              {/* Faculty Dropdown */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{isTelugu ? 'ఫ్యాకల్టీతో మార్చుకోండి' : 'Swap With (Faculty)'}</Text>
                <TouchableOpacity style={styles.dropdownToggle} activeOpacity={0.8} onPress={() => toggleDropdown('faculty')}>
                  <Text style={styles.dropdownToggleText}>{selectedFaculty}</Text>
                  <MaterialCommunityIcons name={openDropdown === 'faculty' ? "chevron-up" : "chevron-down"} size={24} color="#9CA3AF" />
                </TouchableOpacity>
                {openDropdown === 'faculty' && (
                  <View style={styles.dropdownMenu}>
                    <ScrollView style={{maxHeight: 150}} nestedScrollEnabled>
                      {faculties.map((f, index) => (
                        <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => handleSelectDropdown('faculty', f)}>
                          <Text style={styles.dropdownItemText}>{f}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              {/* Date Picker */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{isTelugu ? 'తేదీ' : 'Date'}</Text>
                <TouchableOpacity style={styles.dropdownToggle} activeOpacity={0.8} onPress={() => setShowDatePicker(true)}>
                  <Text style={styles.dropdownToggleText}>{formatDate(selectedDate)}</Text>
                  <MaterialCommunityIcons name="calendar-month-outline" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              {/* Reason Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{isTelugu ? 'కారణం (ఐచ్ఛికం)' : 'Reason (Optional)'}</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder={isTelugu ? 'కారణం నమోదు చేయండి...' : 'Enter reason for swapping...'}
                  placeholderTextColor="#9CA3AF"
                  value={reason}
                  onChangeText={setReason}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              {/* Submit Button */}
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.8}>
                <Text style={styles.submitButtonText}>{isTelugu ? 'అభ్యర్థన పంపండి' : 'Send Request'}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.historyContainer}>
              {swapHistory.map((item) => (
                <View key={item.id} style={styles.historyCard}>
                  <View style={styles.historyHeader}>
                    <Text style={styles.historyDate}>{item.date}</Text>
                    <Text style={[styles.historyStatus, item.status === 'Approved' ? styles.statusApproved : styles.statusDeclined]}>
                      {isTelugu 
                         ? (item.status === 'Approved' ? 'ఆమోదించబడింది' : 'తిరస్కరించబడింది')
                         : item.status}
                    </Text>
                  </View>
                  <View style={styles.historyDetails}>
                    <View style={styles.historyRow}>
                      <Text style={styles.historyLabel}>{isTelugu ? 'నుండి:' : 'From:'}</Text>
                      <Text style={styles.historyValue}>{item.from}</Text>
                    </View>
                    <View style={styles.historyRow}>
                      <Text style={styles.historyLabel}>{isTelugu ? 'ఇటు:' : 'To:'}</Text>
                      <Text style={styles.historyValue}>{item.to}</Text>
                    </View>
                    <View style={styles.historyRow}>
                      <Text style={styles.historyLabel}>{isTelugu ? 'ఫ్యాకల్టీ:' : 'Faculty:'}</Text>
                      <Text style={styles.historyValue}>{item.faculty}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

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
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyProfile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Date Picker Modal */}
        <Modal visible={showDatePicker} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
            <View style={styles.dateModalContent}>
              <Text style={styles.dateModalTitle}>{isTelugu ? 'తేదీని ఎంచుకోండి' : 'Select Date'}</Text>
              {mockDates.map((date, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.dateOption}
                  onPress={() => { setSelectedDate(date); setShowDatePicker(false); }}
                >
                  <Text style={styles.dateOptionText}>{formatDate(date)}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.dateModalClose} onPress={() => setShowDatePicker(false)}>
                <Text style={styles.dateModalCloseText}>{isTelugu ? 'రద్దు చేయి' : 'Cancel'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Success Modal */}
        <Modal visible={showSuccessModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
             <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
             <View style={styles.dateModalContent}>
                <View style={{alignItems: 'center', marginBottom: 16}}>
                   <MaterialCommunityIcons name="check-circle" size={60} color="#10B981" />
                </View>
                <Text style={styles.dateModalTitle}>{isTelugu ? 'అభ్యర్థన పంపబడింది!' : 'Request Sent!'}</Text>
                <Text style={{textAlign: 'center', color: '#6B7280', marginBottom: 24}}>
                  {isTelugu ? 'మీ పీరియడ్ మార్పిడి అభ్యర్థన ఫ్యాకల్టీకి పంపబడింది.' : 'Your period swap request has been sent to the faculty.'}
                </Text>
                <TouchableOpacity style={styles.submitButton} onPress={() => setShowSuccessModal(false)}>
                   <Text style={styles.submitButtonText}>{isTelugu ? 'సరే' : 'Done'}</Text>
                </TouchableOpacity>
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

  tabSelectorRow: {
    flexDirection: 'row',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  tabPill: {
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
  },
  tabPillActive: {
    backgroundColor: '#5B4BCA',
  },
  tabPillText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  tabPillTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  formContainer: {
    paddingBottom: 20,
  },
  formSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
  },

  inputGroup: {
    marginBottom: 20,
    zIndex: 1,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 8,
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
    paddingVertical: 14,
  },
  dropdownToggleText: {
    fontSize: 15,
    color: '#111827',
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginTop: -8,
    paddingTop: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    zIndex: 100,
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
  helperText: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 8,
    marginLeft: 4,
  },

  textInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111827',
  },
  textArea: {
    height: 100,
  },

  submitButton: {
    backgroundColor: '#5B4BCA',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#5B4BCA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 15,
    color: '#9CA3AF',
    marginTop: 12,
  },

  historyContainer: {
    marginTop: 10,
  },
  historyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    paddingBottom: 8,
  },
  historyDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  historyStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  statusApproved: {
    backgroundColor: '#DEF7EC',
    color: '#03543F',
  },
  statusDeclined: {
    backgroundColor: '#FDE8E8',
    color: '#9B1C1C',
  },
  historyDetails: {},
  historyRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  historyLabel: {
    width: 70,
    fontSize: 14,
    color: '#6B7280',
  },
  historyValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },

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

  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dateModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  dateModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  dateOption: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dateOptionText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
  },
  dateModalClose: {
    marginTop: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  dateModalCloseText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF4444',
  },
});
