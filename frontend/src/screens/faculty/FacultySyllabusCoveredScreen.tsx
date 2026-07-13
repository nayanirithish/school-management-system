import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

type FacultySyllabusNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FacultySyllabusCovered'>;
interface Props {
  navigation: FacultySyllabusNavigationProp;
}

export default function FacultySyllabusCoveredScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  
  // Dropdown state
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('All Classes & Subjects');
  
  const classes = [
    'All Classes & Subjects',
    'Class 8 - English',
    'Class 8 - Mathematics',
    'Class 9 - Science',
    'Class 9 - Computer Science',
    'Class 10 - Computer Science',
    'Class 10 - Mathematics',
    'Class 10 - Science',
    'Class 10 - Social Studies',
  ];

  // Syllabus State
  const [units, setUnits] = useState([
    { id: 1, titleEN: 'Unit 1: Computer Systems', titleTE: 'యూనిట్ 1: కంప్యూటర్ సిస్టమ్స్', status: 'Completed' },
    { id: 2, titleEN: 'Unit 2: Programming Basics', titleTE: 'యూనిట్ 2: ప్రోగ్రామింగ్ బేసిక్స్', status: 'Completed' },
    { id: 3, titleEN: 'Unit 3: Data Handling', titleTE: 'యూనిట్ 3: డేటా హ్యాండ్లింగ్', status: 'In Progress' },
    { id: 4, titleEN: 'Unit 4: Flow of Control', titleTE: 'యూనిట్ 4: ఫ్లో ఆఫ్ కంట్రోల్', status: 'In Progress' },
    { id: 5, titleEN: 'Unit 5: Functions', titleTE: 'యూనిట్ 5: ఫంక్షన్స్', status: 'Not Started' },
  ]);

  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Calculations
  const totalUnits = units.length;
  const completedUnits = units.filter(u => u.status === 'Completed').length;
  const coveragePercentage = Math.round((completedUnits / totalUnits) * 100);

  // Target Data based on selected class
  const getTargetsForClass = (className: string) => {
    // Generate mock target data
    const base = className === 'All Classes & Subjects' ? 20 : className.length;
    return [
      { id: 't1', titleEN: 'This Week', titleTE: 'ఈ వారం', target: Math.min(25, base), current: Math.round(coveragePercentage * 0.2) },
      { id: 't2', titleEN: 'This Month', titleTE: 'ఈ నెల', target: Math.min(50, base * 2), current: Math.round(coveragePercentage * 0.5) },
      { id: 't3', titleEN: 'Half Yearly', titleTE: 'అర్ధ సంవత్సరం', target: 75, current: Math.round(coveragePercentage * 0.8) },
      { id: 't4', titleEN: 'Finals', titleTE: 'ఫైనల్స్', target: 100, current: coveragePercentage },
    ];
  };

  const targets = getTargetsForClass(selectedClass);

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsClassDropdownOpen(!isClassDropdownOpen);
  };

  const handleSelectClass = (cls: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedClass(cls);
    setIsClassDropdownOpen(false);
  };

  const openStatusModal = (unit: any) => {
    setSelectedUnit(unit);
    setShowStatusModal(true);
  };

  const updateUnitStatus = (newStatus: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setUnits(prev => prev.map(u => u.id === selectedUnit.id ? { ...u, status: newStatus } : u));
    setShowStatusModal(false);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return '#10B981'; // Green
      case 'In Progress': return '#F59E0B'; // Orange
      default: return '#9CA3AF'; // Gray
    }
  };

  const getStatusText = (status: string) => {
    if (!isTelugu) return status;
    switch(status) {
      case 'Completed': return 'పూర్తయింది';
      case 'In Progress': return 'పురోగతిలో ఉంది';
      default: return 'ప్రారంభించలేదు';
    }
  };

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="menu" size={24} color="#E0E7FF" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>{isTelugu ? 'సిలబస్ పూర్తి' : 'Syllabus Covered'}</Text>
          <View style={styles.appBarRight}>
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

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Class Dropdown */}
          <View style={{ zIndex: 10, marginBottom: 20 }}>
            <TouchableOpacity style={styles.dropdownToggle} activeOpacity={0.8} onPress={toggleDropdown}>
              <Text style={styles.dropdownToggleText}>{selectedClass}</Text>
              <MaterialCommunityIcons name={isClassDropdownOpen ? "chevron-up" : "chevron-down"} size={24} color="#A78BFA" />
            </TouchableOpacity>
            {isClassDropdownOpen && (
              <BlurView intensity={20} tint="dark" style={styles.dropdownMenu}>
                <ScrollView style={{maxHeight: 200}} nestedScrollEnabled>
                  {classes.map((cls, index) => (
                    <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => handleSelectClass(cls)}>
                      <Text style={styles.dropdownItemText}>{cls}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </BlurView>
            )}
          </View>

          {/* Glassmorphic Progress Card */}
          <BlurView intensity={20} tint="dark" style={styles.progressCard}>
            <View style={styles.progressCardContent}>
              <View style={styles.circleContainer}>
                {/* Simulated circular progress */}
                <View style={[styles.outerCircle, { borderColor: coveragePercentage > 50 ? '#5B4BCA' : 'rgba(255,255,255,0.1)' }]}>
                  <View style={styles.innerCircle}>
                    <Text style={styles.percentageText}>{coveragePercentage}%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.progressTextContainer}>
                <Text style={styles.progressTitle}>{isTelugu ? 'సిలబస్ కవరేజ్' : 'Syllabus Coverage'}</Text>
                <Text style={styles.progressMainText}>{coveragePercentage}% {isTelugu ? 'పూర్తయింది' : 'Completed'}</Text>
                <Text style={styles.progressSubText}>({completedUnits} / {totalUnits} {isTelugu ? 'యూనిట్లు' : 'Units'})</Text>
              </View>
            </View>
          </BlurView>

          {/* Syllabus Targets Module */}
          <Text style={styles.sectionTitle}>{isTelugu ? 'సిలబస్ లక్ష్యాలు' : 'Syllabus Targets'}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.targetsScroll} contentContainerStyle={styles.targetsContainer}>
            {targets.map((t, index) => (
              <BlurView intensity={20} tint="dark" key={t.id} style={styles.targetCard}>
                <Text style={styles.targetPeriod}>{isTelugu ? t.titleTE : t.titleEN}</Text>
                
                <View style={styles.targetProgressRow}>
                   <Text style={styles.targetValueText}>{t.current}%</Text>
                   <Text style={styles.targetSlash}>/</Text>
                   <Text style={styles.targetGoalText}>{t.target}%</Text>
                </View>
                
                <View style={styles.targetProgressBarBg}>
                   <View style={[styles.targetProgressBarFill, { width: `${Math.min(100, (t.current / (t.target || 1)) * 100)}%`, backgroundColor: (t.current >= t.target) ? '#10B981' : '#3B82F6' }]} />
                </View>
                <Text style={[styles.targetStatusText, { color: t.current >= t.target ? '#10B981' : '#F59E0B' }]}>
                  {t.current >= t.target 
                    ? (isTelugu ? 'ట్రాక్‌లో ఉంది' : 'On Track') 
                    : (isTelugu ? 'వెనుకబడి ఉంది' : 'Behind Schedule')}
                </Text>
              </BlurView>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>{isTelugu ? 'యూనిట్ పురోగతి' : 'Unit Progress'}</Text>

          {/* Glassmorphic Unit List */}
          <View style={styles.unitsContainer}>
            {units.map((unit, index) => (
              <TouchableOpacity 
                key={unit.id} 
                style={[styles.unitCard, index !== units.length - 1 && styles.unitCardBorder]}
                onPress={() => openStatusModal(unit)}
                activeOpacity={0.7}
              >
                <View style={styles.unitRow}>
                   <Text style={styles.unitTitle}>{isTelugu ? unit.titleTE : unit.titleEN}</Text>
                   <Text style={[styles.unitStatus, { color: getStatusColor(unit.status) }]}>{getStatusText(unit.status)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Update Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={() => setShowSuccessModal(true)} activeOpacity={0.8}>
              <Text style={styles.submitButtonText}>{isTelugu ? 'సిలబస్ అప్‌డేట్ చేయండి' : 'Update Syllabus'}</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 100 }} />
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

        {/* Status Update Modal */}
        {showStatusModal && (
           <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
             <View style={styles.bottomModalOverlay}>
               <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowStatusModal(false)}>
                 <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
               </TouchableOpacity>
               <View style={styles.bottomModalContent}>
                  <View style={styles.modalDragHandle} />
                  <Text style={styles.modalTitle}>
                    {isTelugu ? 'స్థితిని నవీకరించండి' : 'Update Status'}
                  </Text>
                  <Text style={styles.modalSubtitle}>{selectedUnit ? (isTelugu ? selectedUnit.titleTE : selectedUnit.titleEN) : ''}</Text>
                  
                  <View style={styles.statusOptionsContainer}>
                    <TouchableOpacity style={[styles.statusOptionBtn, { borderColor: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.1)' }]} onPress={() => updateUnitStatus('Completed')}>
                       <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" />
                       <Text style={[styles.statusOptionText, { color: '#10B981' }]}>{isTelugu ? 'పూర్తయింది' : 'Completed'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.statusOptionBtn, { borderColor: '#F59E0B', backgroundColor: 'rgba(245, 158, 11, 0.1)' }]} onPress={() => updateUnitStatus('In Progress')}>
                       <MaterialCommunityIcons name="progress-clock" size={20} color="#F59E0B" />
                       <Text style={[styles.statusOptionText, { color: '#F59E0B' }]}>{isTelugu ? 'పురోగతిలో ఉంది' : 'In Progress'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.statusOptionBtn, { borderColor: '#9CA3AF', backgroundColor: 'rgba(156, 163, 175, 0.1)' }]} onPress={() => updateUnitStatus('Not Started')}>
                       <MaterialCommunityIcons name="minus-circle" size={20} color="#9CA3AF" />
                       <Text style={[styles.statusOptionText, { color: '#9CA3AF' }]}>{isTelugu ? 'ప్రారంభించలేదు' : 'Not Started'}</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity style={[styles.submitButton, { marginTop: 10, backgroundColor: 'rgba(255,255,255,0.1)' }]} onPress={() => setShowStatusModal(false)}>
                     <Text style={[styles.submitButtonText, { color: '#F8FAFC' }]}>{isTelugu ? 'రద్దు చేయి' : 'Cancel'}</Text>
                  </TouchableOpacity>
               </View>
             </View>
           </View>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
            <View style={styles.centerModalOverlay}>
               <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowSuccessModal(false)}>
                 <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
               </TouchableOpacity>
               <View style={styles.centerModalContent}>
                  <View style={{alignItems: 'center', marginBottom: 16}}>
                     <MaterialCommunityIcons name="check-circle" size={60} color="#10B981" />
                  </View>
                  <Text style={styles.centerModalTitle}>{isTelugu ? 'నవీకరించబడింది!' : 'Updated!'}</Text>
                  <Text style={{textAlign: 'center', color: '#9CA3AF', marginBottom: 24}}>
                    {isTelugu ? 'సిలబస్ పురోగతి విజయవంతంగా నవీకరించబడింది.' : 'Syllabus progress has been successfully updated.'}
                  </Text>
                  <TouchableOpacity style={styles.submitButton} onPress={() => setShowSuccessModal(false)}>
                     <Text style={styles.submitButtonText}>{isTelugu ? 'సరే' : 'Done'}</Text>
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
  safeArea: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center' },
  
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  backButton: { marginRight: 16 },
  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#F8FAFC', flex: 1 },
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
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

  scrollContent: { paddingHorizontal: 16, paddingTop: 20 },

  dropdownToggle: {
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
  dropdownToggleText: {
    fontSize: 15,
    color: '#F8FAFC',
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    marginTop: 4,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#E2E8F0',
  },

  progressCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  progressCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleContainer: {
    marginRight: 20,
  },
  outerCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(91, 75, 202, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A78BFA',
  },
  progressTextContainer: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '600',
    marginBottom: 4,
  },
  progressMainText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  progressSubText: {
    fontSize: 13,
    color: '#64748B',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 16,
  },
  targetsScroll: {
    marginHorizontal: -16,
    marginBottom: 24,
  },
  targetsContainer: {
    paddingHorizontal: 16,
  },
  targetCard: {
    width: 140,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginRight: 12,
  },
  targetPeriod: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E2E8F0',
    marginBottom: 12,
  },
  targetProgressRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  targetValueText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  targetSlash: {
    fontSize: 14,
    color: '#64748B',
    marginHorizontal: 4,
  },
  targetGoalText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  targetProgressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  targetProgressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  targetStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },

  unitsContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  unitCard: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  unitCardBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  unitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unitTitle: {
    fontSize: 15,
    color: '#E2E8F0',
    flex: 1,
  },
  unitStatus: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 10,
  },

  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: '#5B4BCA',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
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

  bottomTabBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)', position: 'absolute', bottom: 0, width: '100%' },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#94A3B8', marginTop: 4, fontWeight: '500' },

  bottomModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  bottomModalContent: {
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    width: '100%',
    maxWidth: 480,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  modalDragHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 24,
  },
  statusOptionsContainer: {
    marginBottom: 16,
  },
  statusOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
  },
  statusOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  centerModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  centerModalContent: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderColor: '#5B4BCA',
  },
  centerModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 12,
    textAlign: 'center',
  },
});
