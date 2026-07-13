import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import * as DocumentPicker from 'expo-document-picker';
import { useLanguage } from '../../context/LanguageContext';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type FacultyLeaveApplyNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FacultyLeaveApply'>;
interface Props {
  navigation: FacultyLeaveApplyNavigationProp;
}

export default function FacultyLeaveApplyScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const [reason, setReason] = useState('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'Apply' | 'Approved' | 'Rejected'>('Apply');
  
  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState<string | null>(null);

  // Date states
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  // Success Modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Mock Leave History
  const leaveHistory = [
    {
      id: 'L1',
      type: 'Sick Leave',
      fromDate: '15 May 2024',
      toDate: '16 May 2024',
      status: 'Approved',
      condition: 'Please submit medical certificate upon return.',
    },
    {
      id: 'L2',
      type: 'Casual Leave',
      fromDate: '02 Apr 2024',
      toDate: '03 Apr 2024',
      status: 'Rejected',
      condition: 'Clashes with scheduled Unit Test.',
    },
  ];

  // Mock dates for cross-platform custom picker
  const mockDates = [
    new Date(2024, 4, 24), // 24 May 2024
    new Date(2024, 4, 25),
    new Date(2024, 4, 26),
    new Date(2024, 4, 27),
    new Date(2024, 4, 28),
  ];

  const leaveTypes = [
    { id: 'sick', nameEN: 'Sick Leave', nameTE: 'అనారోగ్య సెలవు' },
    { id: 'casual', nameEN: 'Casual Leave', nameTE: 'సాధారణ సెలవు' },
    { id: 'family', nameEN: 'Family Event', nameTE: 'కుటుంబ కార్యక్రమం' },
  ];

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectLeave = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedLeaveType(id);
    setIsDropdownOpen(false);
  };

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0].name);
      }
    } catch (err) {
      console.log('Error picking document', err);
    }
  };

  const onSubmit = () => {
    if (selectedLeaveType && fromDate && toDate && reason) {
      setShowSuccessModal(true);
    } else {
      setShowSuccessModal(true); // Assuming success anyway for demo
    }
  };

  const onSuccessOk = () => {
    setShowSuccessModal(false);
    navigation.navigate('FacultyHome');
  };

  const getLeaveName = () => {
    if (!selectedLeaveType) return isTelugu ? 'సెలవు రకాన్ని ఎంచుకోండి' : 'Select Leave Type';
    const type = leaveTypes.find(t => t.id === selectedLeaveType);
    return isTelugu ? type?.nameTE : type?.nameEN;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return isTelugu ? 'తేదీని ఎంచుకోండి' : 'Select Date';
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="menu" size={24} color="#E0E7FF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{isTelugu ? 'సెలవు దరఖాస్తు' : 'Leave Application'}</Text>
          <View style={styles.headerRight}>
            <View style={styles.languageToggle}>
              <TouchableOpacity onPress={() => setIsTelugu(false)} style={!isTelugu ? styles.languageActive : styles.languageInactive}>
                <Text style={!isTelugu ? styles.langTextActive : styles.langTextInactive}>EN</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsTelugu(true)} style={isTelugu ? styles.languageActive : styles.languageInactive}>
                <Text style={isTelugu ? styles.langTextActive : styles.langTextInactive}>TE</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => navigation.navigate('FacultySettings')}>
               <MaterialCommunityIcons name="cog-outline" size={24} color="#A78BFA" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Bar */}
        <BlurView intensity={20} tint="dark" style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'Apply' && styles.tabButtonActive]}
            onPress={() => setActiveTab('Apply')}
          >
            <Text style={[styles.tabText, activeTab === 'Apply' && styles.tabTextActive]}>
              {isTelugu ? 'దరఖాస్తు' : 'Apply'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'Approved' && styles.tabButtonActive]}
            onPress={() => setActiveTab('Approved')}
          >
            <Text style={[styles.tabText, activeTab === 'Approved' && styles.tabTextActive]}>
              {isTelugu ? 'ఆమోదించబడినవి' : 'Approved'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'Rejected' && styles.tabButtonActive]}
            onPress={() => setActiveTab('Rejected')}
          >
            <Text style={[styles.tabText, activeTab === 'Rejected' && styles.tabTextActive]}>
              {isTelugu ? 'తిరస్కరించబడినవి' : 'Rejected'}
            </Text>
          </TouchableOpacity>
        </BlurView>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Conditionally Render Form vs Lists */}
          {activeTab === 'Apply' && (
            <View>
              {/* Leave Type Dropdown */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{isTelugu ? 'సెలవు రకం' : 'Leave Type'}</Text>
                <View style={styles.dropdownContainer}>
                  <TouchableOpacity style={styles.inputBox} activeOpacity={0.7} onPress={toggleDropdown}>
                    <Text style={[styles.placeholderText, selectedLeaveType && styles.selectedText]}>
                      {getLeaveName()}
                    </Text>
                    <MaterialCommunityIcons name={isDropdownOpen ? "chevron-up" : "chevron-down"} size={24} color="#9CA3AF" />
                  </TouchableOpacity>
                  {isDropdownOpen && (
                    <View style={styles.dropdownMenu}>
                      {leaveTypes.map((type, index) => (
                        <TouchableOpacity 
                          key={type.id} 
                          style={[styles.dropdownItem, index !== leaveTypes.length - 1 && styles.dropdownItemBorder]}
                          onPress={() => handleSelectLeave(type.id)}
                        >
                          <Text style={styles.dropdownItemText}>{isTelugu ? type.nameTE : type.nameEN}</Text>
                          {selectedLeaveType === type.id && (
                             <MaterialCommunityIcons name="check" size={20} color="#5B4BCA" />
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              </View>

              {/* From Date */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{isTelugu ? 'ప్రారంభ తేదీ' : 'From Date'}</Text>
                <TouchableOpacity style={styles.inputBox} activeOpacity={0.7} onPress={() => setShowFromPicker(true)}>
                  <Text style={[styles.placeholderText, fromDate && styles.selectedText]}>
                    {formatDate(fromDate)}
                  </Text>
                  <MaterialCommunityIcons name="calendar-month-outline" size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
              
              {showFromPicker && (
                <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
                  <View style={styles.modalOverlay}>
                    <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
                    <View style={styles.dateModalContent}>
                      <Text style={styles.dateModalTitle}>{isTelugu ? 'ప్రారంభ తేదీని ఎంచుకోండి' : 'Select From Date'}</Text>
                      {mockDates.map((date, index) => (
                        <TouchableOpacity 
                          key={index} 
                          style={styles.dateOption}
                          onPress={() => { setFromDate(date); setShowFromPicker(false); }}
                        >
                          <Text style={styles.dateOptionText}>{formatDate(date)}</Text>
                        </TouchableOpacity>
                      ))}
                      <TouchableOpacity style={styles.dateModalClose} onPress={() => setShowFromPicker(false)}>
                        <Text style={styles.dateModalCloseText}>{isTelugu ? 'రద్దు చేయి' : 'Cancel'}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              {/* To Date */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{isTelugu ? 'ముగింపు తేదీ' : 'To Date'}</Text>
                <TouchableOpacity style={styles.inputBox} activeOpacity={0.7} onPress={() => setShowToPicker(true)}>
                  <Text style={[styles.placeholderText, toDate && styles.selectedText]}>
                    {formatDate(toDate)}
                  </Text>
                  <MaterialCommunityIcons name="calendar-month-outline" size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>

              {showToPicker && (
                <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
                  <View style={styles.modalOverlay}>
                    <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
                    <View style={styles.dateModalContent}>
                      <Text style={styles.dateModalTitle}>{isTelugu ? 'ముగింపు తేదీని ఎంచుకోండి' : 'Select To Date'}</Text>
                      {mockDates.map((date, index) => (
                        <TouchableOpacity 
                          key={index} 
                          style={styles.dateOption}
                          onPress={() => { setToDate(date); setShowToPicker(false); }}
                        >
                          <Text style={styles.dateOptionText}>{formatDate(date)}</Text>
                        </TouchableOpacity>
                      ))}
                      <TouchableOpacity style={styles.dateModalClose} onPress={() => setShowToPicker(false)}>
                        <Text style={styles.dateModalCloseText}>{isTelugu ? 'రద్దు చేయి' : 'Cancel'}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              {/* Reason */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{isTelugu ? 'కారణం' : 'Reason'}</Text>
                <View style={[styles.inputBox, styles.textAreaBox]}>
                  <TextInput
                    style={styles.textArea}
                    placeholder={isTelugu ? 'కారణం రాయండి...' : 'Write reason...'}
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={4}
                    value={reason}
                    onChangeText={setReason}
                    textAlignVertical="top"
                  />
                </View>
              </View>

              {/* Upload Document */}
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>{isTelugu ? 'పత్రం అప్‌లోడ్ (ఐచ్ఛికం)' : 'Upload Document (Optional)'}</Text>
                <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7} onPress={handlePickDocument}>
                  <MaterialCommunityIcons name="paperclip" size={20} color="#9CA3AF" style={{marginRight: 8}} />
                  <Text style={[styles.placeholderText, selectedFile && styles.selectedText]}>
                    {selectedFile ? selectedFile : (isTelugu ? 'ఫైల్‌ను ఎంచుకోండి' : 'Choose File')}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Submit Button */}
              <TouchableOpacity style={styles.submitButton} activeOpacity={0.8} onPress={onSubmit}>
                <Text style={styles.submitButtonText}>{isTelugu ? 'దరఖాస్తును సమర్పించండి' : 'Submit Application'}</Text>
              </TouchableOpacity>
            </View>
          )}

          {activeTab !== 'Apply' && (
            <View style={styles.historySection}>
              {leaveHistory
                .filter(leave => leave.status === activeTab)
                .map((leave) => (
                <BlurView intensity={20} tint="dark" key={leave.id} style={styles.historyCard}>
                  <View style={styles.historyHeader}>
                    <View style={styles.historyTypeWrapper}>
                      <MaterialCommunityIcons 
                        name={leave.status === 'Approved' ? 'check-circle' : 'close-circle'} 
                        size={20} 
                        color={leave.status === 'Approved' ? '#10B981' : '#EF4444'} 
                      />
                      <Text style={styles.historyType}>{leave.type}</Text>
                    </View>
                    <View style={[
                      styles.statusBadge, 
                      leave.status === 'Approved' ? styles.statusApproved : styles.statusRejected
                    ]}>
                      <Text style={[
                        styles.statusText, 
                        leave.status === 'Approved' ? styles.statusTextApproved : styles.statusTextRejected
                      ]}>
                        {leave.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.historyDates}>{leave.fromDate} - {leave.toDate}</Text>
                  <View style={styles.historyConditionBox}>
                    <Text style={styles.historyConditionLabel}>
                      {leave.status === 'Approved' ? (isTelugu ? 'షరతు:' : 'Condition:') : (isTelugu ? 'కారణం:' : 'Reason:')}
                    </Text>
                    <Text style={styles.historyConditionText}>{leave.condition}</Text>
                  </View>
                </BlurView>
              ))}
              {leaveHistory.filter(leave => leave.status === activeTab).length === 0 && (
                <Text style={{ textAlign: 'center', color: '#6B7280', marginTop: 20 }}>
                  {isTelugu ? 'రికార్డులు లేవు' : `No ${activeTab.toLowerCase()} leaves found.`}
                </Text>
              )}
            </View>
          )}

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Bottom Tab Bar */}
        <BlurView intensity={40} tint="dark" style={styles.bottomTabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyTimeTable')}>
            <MaterialCommunityIcons name="calendar-outline" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Time Table</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultySettings')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Profile</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Success Modal */}
        {showSuccessModal && (
          <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
            <View style={styles.modalOverlay}>
              <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
              <View style={styles.modalContent}>
                <View style={styles.successIconContainer}>
                   <MaterialCommunityIcons name="check-circle" size={64} color="#10B981" />
                </View>
                <Text style={styles.modalTitle}>{isTelugu ? 'విజయం!' : 'Success!'}</Text>
                <Text style={styles.modalMessage}>
                  {isTelugu ? 'సెలవు దరఖాస్తు విజయవంతంగా సమర్పించబడింది.' : 'Leave application submitted successfully.'}
                </Text>
                <TouchableOpacity style={styles.modalButton} onPress={onSuccessOk}>
                  <Text style={styles.modalButtonText}>{isTelugu ? 'సరే' : 'OK'}</Text>
                </TouchableOpacity>
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
  safeArea: { flex: 1 },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  backButton: { marginRight: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#F8FAFC', flex: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 16,
    height: 32,
    alignItems: 'center',
    padding: 2,
  },
  languageActive: {
    backgroundColor: '#8B5CF6',
    borderRadius: 14,
    paddingHorizontal: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageInactive: { paddingHorizontal: 10, justifyContent: 'center' },
  langTextActive: { color: '#F8FAFC', fontSize: 11, fontWeight: 'bold' },
  langTextInactive: { color: '#9CA3AF', fontSize: 11, fontWeight: '500' },

  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: '#5B4BCA',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },

  scrollContent: { paddingHorizontal: 16, paddingTop: 16 },

  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 8,
  },
  dropdownContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  placeholderText: {
    fontSize: 15,
    color: '#9CA3AF',
  },
  selectedText: {
    color: '#F8FAFC',
  },
  dropdownMenu: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  dropdownItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#E2E8F0',
  },
  textAreaBox: {
    alignItems: 'flex-start',
    paddingVertical: 12,
    height: 120,
  },
  textArea: {
    flex: 1,
    width: '100%',
    fontSize: 15,
    color: '#F8FAFC',
  },
  uploadBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  submitButton: {
    backgroundColor: '#5B4BCA',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#5B4BCA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  historySection: {
    marginTop: 16,
  },
  historyCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyTypeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyType: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
    marginLeft: 8,
  },
  historyDates: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  historyConditionBox: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#5B4BCA',
  },
  historyConditionLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9CA3AF',
    marginBottom: 4,
  },
  historyConditionText: {
    fontSize: 13,
    color: '#E2E8F0',
    lineHeight: 18,
  },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statusApproved: { backgroundColor: 'rgba(16, 185, 129, 0.2)' },
  statusRejected: { backgroundColor: 'rgba(239, 68, 68, 0.2)' },
  statusTextApproved: { color: '#34D399', fontSize: 12, fontWeight: 'bold' },
  statusTextRejected: { color: '#F87171', fontSize: 12, fontWeight: 'bold' },

  bottomTabBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)', position: 'absolute', bottom: 0, width: '100%' },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#94A3B8', marginTop: 4, fontWeight: '500' },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderColor: '#5B4BCA',
    overflow: 'hidden',
  },
  successIconContainer: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 15,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: '#5B4BCA',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateModalContent: {
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderColor: '#5B4BCA',
    overflow: 'hidden',
  },
  dateModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 16,
    textAlign: 'center',
  },
  dateOption: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  dateOptionText: {
    fontSize: 16,
    color: '#E2E8F0',
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
