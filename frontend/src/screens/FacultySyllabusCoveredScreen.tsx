import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

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
  const [isTelugu, setIsTelugu] = useState(false);
  
  // Dropdown state
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('Class 10 - Computer Science');
  
  const classes = [
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
    <LinearGradient colors={['#E0F2FE', '#F3E8FF', '#FAFAFA']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <View style={styles.appBarLeft}>
             <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight: 12}}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
             </TouchableOpacity>
             <Text style={styles.pageTitle}>{isTelugu ? 'సిలబస్ పూర్తి' : 'Syllabus Covered'}</Text>
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
          
          {/* Class Dropdown */}
          <View style={{ zIndex: 10, marginBottom: 20 }}>
            <TouchableOpacity style={styles.dropdownToggle} activeOpacity={0.8} onPress={toggleDropdown}>
              <Text style={styles.dropdownToggleText}>{selectedClass}</Text>
              <MaterialCommunityIcons name={isClassDropdownOpen ? "chevron-up" : "chevron-down"} size={24} color="#9CA3AF" />
            </TouchableOpacity>
            {isClassDropdownOpen && (
              <View style={styles.dropdownMenu}>
                <ScrollView style={{maxHeight: 150}} nestedScrollEnabled>
                  {classes.map((cls, index) => (
                    <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => handleSelectClass(cls)}>
                      <Text style={styles.dropdownItemText}>{cls}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Glassmorphic Progress Card */}
          <View style={styles.progressCard}>
            <LinearGradient colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.6)']} style={[StyleSheet.absoluteFill as any, { borderRadius: 16 }]} />
            <View style={styles.progressCardContent}>
              <View style={styles.circleContainer}>
                {/* Simulated circular progress */}
                <View style={[styles.outerCircle, { borderColor: coveragePercentage > 50 ? '#5B4BCA' : '#D1D5DB' }]}>
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
          </View>

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
                <LinearGradient colors={['rgba(255,255,255,0.7)', 'rgba(255,255,255,0.4)']} style={[StyleSheet.absoluteFill as any, { borderRadius: index === 0 ? 12 : (index === units.length -1 ? 12 : 0) }]} />
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
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Status Update Modal */}
        <Modal visible={showStatusModal} transparent animationType="slide">
           <View style={styles.bottomModalOverlay}>
             <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
             <View style={styles.bottomModalContent}>
                <View style={styles.modalDragHandle} />
                <Text style={styles.modalTitle}>
                  {isTelugu ? 'స్థితిని నవీకరించండి' : 'Update Status'}
                </Text>
                <Text style={styles.modalSubtitle}>{selectedUnit ? (isTelugu ? selectedUnit.titleTE : selectedUnit.titleEN) : ''}</Text>
                
                <View style={styles.statusOptionsContainer}>
                  <TouchableOpacity style={[styles.statusOptionBtn, { borderColor: '#10B981' }]} onPress={() => updateUnitStatus('Completed')}>
                     <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" />
                     <Text style={[styles.statusOptionText, { color: '#10B981' }]}>{isTelugu ? 'పూర్తయింది' : 'Completed'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.statusOptionBtn, { borderColor: '#F59E0B' }]} onPress={() => updateUnitStatus('In Progress')}>
                     <MaterialCommunityIcons name="progress-clock" size={20} color="#F59E0B" />
                     <Text style={[styles.statusOptionText, { color: '#F59E0B' }]}>{isTelugu ? 'పురోగతిలో ఉంది' : 'In Progress'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.statusOptionBtn, { borderColor: '#9CA3AF' }]} onPress={() => updateUnitStatus('Not Started')}>
                     <MaterialCommunityIcons name="minus-circle" size={20} color="#9CA3AF" />
                     <Text style={[styles.statusOptionText, { color: '#9CA3AF' }]}>{isTelugu ? 'ప్రారంభించలేదు' : 'Not Started'}</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={[styles.submitButton, { marginTop: 10 }]} onPress={() => setShowStatusModal(false)}>
                   <Text style={styles.submitButtonText}>{isTelugu ? 'రద్దు చేయి' : 'Cancel'}</Text>
                </TouchableOpacity>
             </View>
           </View>
        </Modal>

        {/* Success Modal */}
        <Modal visible={showSuccessModal} transparent animationType="fade">
          <View style={styles.centerModalOverlay}>
             <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
             <View style={styles.centerModalContent}>
                <View style={{alignItems: 'center', marginBottom: 16}}>
                   <MaterialCommunityIcons name="check-circle" size={60} color="#10B981" />
                </View>
                <Text style={styles.centerModalTitle}>{isTelugu ? 'నవీకరించబడింది!' : 'Updated!'}</Text>
                <Text style={{textAlign: 'center', color: '#6B7280', marginBottom: 24}}>
                  {isTelugu ? 'సిలబస్ పురోగతి విజయవంతంగా నవీకరించబడింది.' : 'Syllabus progress has been successfully updated.'}
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
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
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
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

  progressCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    shadowColor: '#5B4BCA',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
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
    backgroundColor: '#FFFFFF',
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5B4BCA',
  },
  progressTextContainer: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '600',
    marginBottom: 4,
  },
  progressMainText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  progressSubText: {
    fontSize: 13,
    color: '#9CA3AF',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  unitsContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  unitCard: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  unitCardBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  unitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unitTitle: {
    fontSize: 15,
    color: '#374151',
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
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    alignSelf: 'center',
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

  bottomModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bottomModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
    width: '100%',
    maxWidth: 480,
  },
  modalDragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6B7280',
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
    backgroundColor: '#FAFAFA',
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
  },
  centerModalContent: {
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
  centerModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
});
