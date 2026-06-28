import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform, TextInput } from 'react-native';
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

type FacultyAssignmentsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FacultyAssignments'>;
interface Props {
  navigation: FacultyAssignmentsNavigationProp;
}

export default function FacultyAssignmentsScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const [activeTab, setActiveTab] = useState<'Assigned' | 'Submitted' | 'Graded'>('Assigned');
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('Class 10 - A');

  // Modal States
  const [activeModal, setActiveModal] = useState<'create' | 'view' | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  const classes = [
    'Nursery', 'LKG', 'UKG', 
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10 - A', 'Class 10 - B'
  ];

  const tabs = [
    { id: 'Assigned', en: 'Assigned', te: 'కేటాయించబడింది' },
    { id: 'Submitted', en: 'Submitted', te: 'సమర్పించబడింది' },
    { id: 'Graded', en: 'Graded', te: 'గ్రేడ్ చేయబడింది' },
  ] as const;

  const assignmentsData = [
    { id: 1, titleEN: 'Python Practice Questions', titleTE: 'పైథాన్ ప్రాక్టీస్ ప్రశ్నలు', due: '25 May 2024', submitted: '20/32', status: 'Assigned' },
    { id: 2, titleEN: 'HTML Basics Assignment', titleTE: 'HTML బేసిక్స్ అసైన్‌మెంట్', due: '28 May 2024', submitted: '25/32', status: 'Assigned' },
    { id: 3, titleEN: 'DBMS Worksheet', titleTE: 'DBMS వర్క్‌షీట్', due: '05 Jun 2024', submitted: '18/32', status: 'Assigned' },
    
    { id: 4, titleEN: 'Midterm Essay', titleTE: 'మిడ్ టర్మ్ వ్యాసం', due: '10 May 2024', submitted: '32/32', status: 'Submitted' },
    { id: 5, titleEN: 'Java Project Phase 1', titleTE: 'జావా ప్రాజెక్ట్ ఫేజ్ 1', due: '15 May 2024', submitted: '30/32', status: 'Submitted' },
    
    { id: 6, titleEN: 'Weekly Quiz 4', titleTE: 'వీక్లీ క్విజ్ 4', due: '01 May 2024', submitted: '32/32', status: 'Graded' },
  ];

  const mockStudents = [
    { id: 1, name: 'Rahul Sharma', roll: 'Roll 21', status: 'Submitted' },
    { id: 2, name: 'Priya Patel', roll: 'Roll 22', status: 'Graded (9/10)' },
    { id: 3, name: 'Amit Kumar', roll: 'Roll 23', status: 'Pending' },
    { id: 4, name: 'Neha Singh', roll: 'Roll 24', status: 'Submitted' },
  ];

  const filteredAssignments = assignmentsData.filter(item => item.status === activeTab);

  const handleClassSelect = (cls: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedClass(cls);
    setIsClassDropdownOpen(false);
  };

  const handleViewAssignment = (assignment: any) => {
    setSelectedAssignment(assignment);
    setActiveModal('view');
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
             <Text style={styles.pageTitle}>{isTelugu ? 'అసైన్‌మెంట్‌లు' : 'Assignments'}</Text>
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
          
          {/* Class Selector Dropdown */}
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

          {/* Status Tabs */}
          <View style={styles.tabSelectorRow}>
            {tabs.map((tab) => (
              <TouchableOpacity 
                key={tab.id}
                style={[styles.tabPill, activeTab === tab.id && styles.tabPillActive]} 
                onPress={() => setActiveTab(tab.id as any)}
              >
                 <Text style={[styles.tabPillText, activeTab === tab.id && styles.tabPillTextActive]}>
                   {isTelugu ? tab.te : tab.en}
                 </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Assignments List */}
          <View style={styles.assignmentsContainer}>
            {filteredAssignments.map((assignment) => (
              <BlurView intensity={80} tint="light" style={styles.assignmentCard} key={assignment.id}>
                <View style={styles.cardHeader}>
                  <Text style={styles.assignmentTitle}>{isTelugu ? assignment.titleTE : assignment.titleEN}</Text>
                  <TouchableOpacity onPress={() => handleViewAssignment(assignment)} style={{ padding: 4 }}>
                    <MaterialCommunityIcons name="eye-outline" size={24} color="#5B4BCA" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.assignmentMeta}>
                  <Text style={styles.metaLabel}>{isTelugu ? 'గడువు: ' : 'Due: '}</Text>
                  {assignment.due}
                </Text>
                <Text style={styles.assignmentMeta}>
                  <Text style={styles.metaLabel}>{isTelugu ? 'సమర్పించబడింది: ' : 'Submitted: '}</Text>
                  {assignment.submitted}
                </Text>
              </BlurView>
            ))}

            {filteredAssignments.length === 0 && (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons name="clipboard-check-outline" size={48} color="#D1D5DB" />
                <Text style={styles.emptyStateText}>{isTelugu ? 'అసైన్‌మెంట్‌లు లేవు' : 'No assignments found'}</Text>
              </View>
            )}
          </View>

          {/* Create Assignment Button */}
          <TouchableOpacity style={styles.createButton} activeOpacity={0.8} onPress={() => setActiveModal('create')}>
            <MaterialCommunityIcons name="plus" size={20} color="#5B4BCA" style={{marginRight: 8}} />
            <Text style={styles.createButtonText}>{isTelugu ? 'అసైన్‌మెంట్‌ను సృష్టించండి' : 'Create Assignment'}</Text>
          </TouchableOpacity>

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

        {/* Dynamic Interactive Modals */}
        {activeModal !== null && (
          <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
            <View style={styles.modalOverlay}>
               <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setActiveModal(null)}>
                  <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
               </TouchableOpacity>
               
               {/* Modal Content */}
               <View style={styles.modalContent}>
                  
                  {/* CREATE ASSIGNMENT MODAL */}
                  {activeModal === 'create' && (
                    <>
                      <View style={styles.modalHeader}>
                         <Text style={styles.modalTitle}>{isTelugu ? 'కొత్త అసైన్‌మెంట్‌' : 'Create New Assignment'}</Text>
                         <TouchableOpacity onPress={() => setActiveModal(null)}>
                            <MaterialCommunityIcons name="close-circle-outline" size={28} color="#9CA3AF" />
                         </TouchableOpacity>
                      </View>
                      <View style={styles.modalBody}>
                        <TextInput style={styles.inputField} placeholder={isTelugu ? "అసైన్‌మెంట్ శీర్షిక" : "Assignment Title"} placeholderTextColor="#9CA3AF" />
                        <TextInput style={styles.inputField} placeholder={isTelugu ? "గడువు తేదీ (ఉదా. 30 మే 2024)" : "Due Date (e.g. 30 May 2024)"} placeholderTextColor="#9CA3AF" />
                        <TextInput style={[styles.inputField, { height: 80 }]} placeholder={isTelugu ? "వివరణ" : "Description"} placeholderTextColor="#9CA3AF" multiline textAlignVertical="top" />
                        
                        <TouchableOpacity style={styles.uploadBox} activeOpacity={0.7}>
                          <MaterialCommunityIcons name="cloud-upload-outline" size={24} color="#5B4BCA" style={{marginRight: 8}} />
                          <Text style={styles.uploadBoxText}>{isTelugu ? 'ఫైల్‌ని అటాచ్ చేయండి (ఐచ్ఛికం)' : 'Attach File (Optional)'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.saveButton} onPress={() => setActiveModal(null)}>
                          <Text style={styles.saveButtonText}>{isTelugu ? `${selectedClass}కి కేటాయించండి` : `Assign to ${selectedClass}`}</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}

                  {/* VIEW ASSIGNMENT MODAL */}
                  {activeModal === 'view' && selectedAssignment && (
                    <>
                      <View style={styles.modalHeader}>
                         <Text style={styles.modalTitle} numberOfLines={1}>{isTelugu ? selectedAssignment.titleTE : selectedAssignment.titleEN}</Text>
                         <TouchableOpacity onPress={() => setActiveModal(null)}>
                            <MaterialCommunityIcons name="close-circle-outline" size={28} color="#9CA3AF" />
                         </TouchableOpacity>
                      </View>
                      <View style={styles.modalBody}>
                        <View style={styles.statsRow}>
                          <View style={styles.statBox}>
                            <Text style={styles.statValue}>{selectedAssignment.due}</Text>
                            <Text style={styles.statLabel}>{isTelugu ? 'గడువు తేదీ' : 'Due Date'}</Text>
                          </View>
                          <View style={styles.statBox}>
                            <Text style={[styles.statValue, { color: '#10B981' }]}>{selectedAssignment.submitted}</Text>
                            <Text style={styles.statLabel}>{isTelugu ? 'సమర్పణలు' : 'Submissions'}</Text>
                          </View>
                        </View>

                        <Text style={styles.studentListTitle}>{isTelugu ? 'విద్యార్థుల సమర్పణలు' : 'Student Submissions'}</Text>
                        <ScrollView style={{maxHeight: 250}} showsVerticalScrollIndicator={false}>
                          {mockStudents.map(student => (
                            <View key={student.id} style={styles.studentRow}>
                              <View>
                                <Text style={styles.studentName}>{student.name}</Text>
                                <Text style={styles.studentRoll}>{student.roll} • {student.status}</Text>
                              </View>
                              {selectedAssignment?.status !== 'Graded' ? (
                                <TouchableOpacity style={styles.actionButton} onPress={() => setActiveModal(null)}>
                                   <Text style={styles.actionButtonText}>
                                     {student.status === 'Pending' ? (isTelugu ? 'రిమైండర్' : 'Remind') : (isTelugu ? 'గ్రేడ్' : 'Grade')}
                                   </Text>
                                </TouchableOpacity>
                              ) : (
                                <View style={[styles.actionButton, { backgroundColor: '#D1FAE5' }]}>
                                   <Text style={[styles.actionButtonText, { color: '#10B981' }]}>
                                     {student.status.includes('Graded') ? student.status.split(' ')[1] : '10/10'}
                                   </Text>
                                </View>
                              )}
                            </View>
                          ))}
                        </ScrollView>
                      </View>
                    </>
                  )}

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

  tabSelectorRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  tabPill: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    marginRight: 12,
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

  assignmentsContainer: {
    paddingBottom: 20,
  },
  assignmentCard: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  viewLinkText: {
    fontSize: 14,
    color: '#5B4BCA',
    fontWeight: '600',
  },
  assignmentMeta: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  metaLabel: {
    color: '#9CA3AF',
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 15,
    color: '#9CA3AF',
    marginTop: 8,
  },

  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#5B4BCA',
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 8,
  },
  createButtonText: {
    color: '#5B4BCA',
    fontSize: 15,
    fontWeight: 'bold',
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

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    marginRight: 16,
  },
  modalBody: {
    paddingBottom: 20,
  },
  inputField: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111827',
    marginBottom: 16,
  },
  uploadBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#5B4BCA',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 24,
    backgroundColor: '#EEF2FF',
  },
  uploadBoxText: {
    color: '#5B4BCA',
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#5B4BCA',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  studentListTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  studentName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  studentRoll: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  actionButton: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#5B4BCA',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
