import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform, Modal, TextInput } from 'react-native';
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

type FacultyComplaintsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FacultyComplaints'>;
interface Props {
  navigation: FacultyComplaintsNavigationProp;
}

export default function FacultyComplaintsScreen({ navigation }: Props) {
  const [isTelugu, setIsTelugu] = useState(false);
  const [activeTab, setActiveTab] = useState<'Raised by Me' | 'Assigned to Me' | 'Resolved'>('Raised by Me');
  
  const [showRaiseModal, setShowRaiseModal] = useState(false);
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintDesc, setComplaintDesc] = useState('');

  const [complaints, setComplaints] = useState([
    { id: 1, title: 'Projector not working in Lab 2', date: '20 May 2024', status: 'Open' },
    { id: 2, title: 'Wi-Fi connectivity issue', date: '18 May 2024', status: 'In Progress' },
    { id: 3, title: 'AC not working in Staff Room', date: '18 May 2024', status: 'Resolved' },
  ]);

  const getFilteredComplaints = () => {
    if (activeTab === 'Resolved') return complaints.filter(c => c.status === 'Resolved');
    if (activeTab === 'Assigned to Me') return []; // Empty for demo
    return complaints.filter(c => c.status !== 'Resolved');
  };

  const getStatusStyles = (status: string) => {
    switch(status) {
      case 'Open': return { color: '#F59E0B', backgroundColor: '#FEF3C7' };
      case 'In Progress': return { color: '#3B82F6', backgroundColor: '#DBEAFE' };
      case 'Resolved': return { color: '#10B981', backgroundColor: '#D1FAE5' };
      default: return { color: '#6B7280', backgroundColor: '#F3F4F6' };
    }
  };

  const getStatusText = (status: string) => {
    if (!isTelugu) return status;
    switch(status) {
      case 'Open': return 'ఓపెన్';
      case 'In Progress': return 'పురోగతిలో ఉంది';
      case 'Resolved': return 'పరిష్కరించబడింది';
      default: return status;
    }
  };

  const handleRaiseComplaint = () => {
    if (complaintTitle) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setComplaints([{
        id: Math.random(),
        title: complaintTitle,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'Open'
      }, ...complaints]);
      setShowRaiseModal(false);
      setComplaintTitle('');
      setComplaintDesc('');
      setActiveTab('Raised by Me');
    }
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
             <Text style={styles.pageTitle}>{isTelugu ? 'ఫిర్యాదులు' : 'Complaints'}</Text>
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
              style={[styles.tabPill, activeTab === 'Raised by Me' && styles.tabPillActive, { borderTopRightRadius: 0, borderBottomRightRadius: 0, flex: 1.2 }]} 
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setActiveTab('Raised by Me');
              }}
            >
                <Text style={[styles.tabPillText, activeTab === 'Raised by Me' && styles.tabPillTextActive]}>
                  {isTelugu ? 'నా ద్వారా' : 'Raised by Me'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabPill, activeTab === 'Assigned to Me' && styles.tabPillActive, { borderRadius: 0, flex: 1.3 }]} 
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setActiveTab('Assigned to Me');
              }}
            >
                <Text style={[styles.tabPillText, activeTab === 'Assigned to Me' && styles.tabPillTextActive]}>
                  {isTelugu ? 'నాకు కేటాయించబడింది' : 'Assigned to Me'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabPill, activeTab === 'Resolved' && styles.tabPillActive, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0, flex: 1 }]} 
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setActiveTab('Resolved');
              }}
            >
                <Text style={[styles.tabPillText, activeTab === 'Resolved' && styles.tabPillTextActive]}>
                  {isTelugu ? 'పరిష్కరించబడింది' : 'Resolved'}
                </Text>
            </TouchableOpacity>
          </View>

          {/* Complaints List */}
          <View style={styles.complaintsContainer}>
            {getFilteredComplaints().length > 0 ? (
              getFilteredComplaints().map(complaint => (
                <View key={complaint.id} style={styles.complaintCard}>
                  <LinearGradient colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.6)']} style={[StyleSheet.absoluteFill as any, { borderRadius: 16 }]} />
                  <View style={styles.cardHeader}>
                    <Text style={styles.complaintTitle}>{complaint.title}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusStyles(complaint.status).backgroundColor }]}>
                       <Text style={[styles.statusText, { color: getStatusStyles(complaint.status).color }]}>{getStatusText(complaint.status)}</Text>
                    </View>
                  </View>
                  <Text style={styles.complaintDate}>{isTelugu ? 'తేదీ:' : 'Raised on:'} {complaint.date}</Text>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                 <MaterialCommunityIcons name="alert-circle-check-outline" size={48} color="#D1D5DB" />
                 <Text style={styles.emptyStateText}>{isTelugu ? 'ఫిర్యాదులు లేవు' : 'No complaints found'}</Text>
              </View>
            )}
          </View>

          {/* Raise New Complaint Button */}
          <TouchableOpacity style={styles.raiseButton} onPress={() => setShowRaiseModal(true)} activeOpacity={0.8}>
            <MaterialCommunityIcons name="plus" size={20} color="#5B4BCA" style={{marginRight: 8}} />
            <Text style={styles.raiseButtonText}>{isTelugu ? 'కొత్త ఫిర్యాదును నమోదు చేయండి' : 'Raise New Complaint'}</Text>
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
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Raise Complaint Modal */}
        <Modal visible={showRaiseModal} transparent animationType="slide">
           <View style={styles.bottomModalOverlay}>
             <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
             <View style={styles.bottomModalContent}>
                <View style={styles.modalDragHandle} />
                <Text style={styles.modalTitle}>
                  {isTelugu ? 'కొత్త ఫిర్యాదు' : 'New Complaint'}
                </Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>{isTelugu ? 'శీర్షిక' : 'Title'}</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder={isTelugu ? 'ఫిర్యాదు శీర్షిక' : 'E.g., Projector not working'}
                    placeholderTextColor="#9CA3AF"
                    value={complaintTitle}
                    onChangeText={setComplaintTitle}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>{isTelugu ? 'వివరణ' : 'Description'}</Text>
                  <TextInput
                    style={[styles.textInput, styles.textArea]}
                    placeholder={isTelugu ? 'వివరించండి...' : 'Describe the issue...'}
                    placeholderTextColor="#9CA3AF"
                    value={complaintDesc}
                    onChangeText={setComplaintDesc}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleRaiseComplaint} activeOpacity={0.8}>
                   <Text style={styles.submitButtonText}>{isTelugu ? 'సమర్పించండి' : 'Submit'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.submitButton, { backgroundColor: '#F3F4F6', marginTop: 12 }]} onPress={() => setShowRaiseModal(false)} activeOpacity={0.8}>
                   <Text style={[styles.submitButtonText, { color: '#4B5563' }]}>{isTelugu ? 'రద్దు చేయి' : 'Cancel'}</Text>
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
    borderColor: '#F3F4F6',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#F9FAFB',
  },
  tabPill: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  tabPillActive: {
    backgroundColor: '#5B4BCA',
    borderRadius: 20,
  },
  tabPillText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  tabPillTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  complaintsContainer: {
    marginBottom: 20,
  },
  complaintCard: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  complaintTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  complaintDate: {
    fontSize: 13,
    color: '#9CA3AF',
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

  raiseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: '#5B4BCA',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  raiseButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#5B4BCA',
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
  bottomModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
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
    alignSelf: 'center',
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
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    marginTop: 12,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
