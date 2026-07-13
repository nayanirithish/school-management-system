import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform, TextInput } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
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

type FacultyComplaintsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FacultyComplaints'>;
interface Props {
  navigation: FacultyComplaintsNavigationProp;
}

export default function FacultyComplaintsScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { isTelugu, setIsTelugu } = useLanguage();
  const [activeTab, setActiveTab] = useState<'Raised by Me' | 'Assigned to Me' | 'Resolved'>('Raised by Me');
  
  const [showRaiseModal, setShowRaiseModal] = useState(false);
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintDesc, setComplaintDesc] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
      case 'Open': return { color: '#FCD34D', backgroundColor: 'rgba(245, 158, 11, 0.2)', borderColor: 'rgba(245, 158, 11, 0.4)' };
      case 'In Progress': return { color: '#60A5FA', backgroundColor: 'rgba(59, 130, 246, 0.2)', borderColor: 'rgba(59, 130, 246, 0.4)' };
      case 'Resolved': return { color: '#34D399', backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: 'rgba(16, 185, 129, 0.4)' };
      default: return { color: '#9CA3AF', backgroundColor: 'rgba(107, 114, 128, 0.2)', borderColor: 'rgba(107, 114, 128, 0.4)' };
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
      setShowSuccessModal(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setComplaintTitle('');
    setComplaintDesc('');
    setActiveTab('Raised by Me');
    navigation.navigate('FacultyHome');
  };

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <View style={styles.appBarLeft}>
             <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight: 12}}>
                <MaterialCommunityIcons name="menu" size={24} color="#E0E7FF" />
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
                 <Text style={[styles.languageText, !isTelugu && styles.languageTextActive]}>EN</Text>
              </View>
              <View style={[styles.languagePill, isTelugu ? styles.languageActive : styles.languageInactive]}>
                 <Text style={[styles.languageText, isTelugu && styles.languageTextActive]}>TE</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 12 }}>
              <MaterialCommunityIcons name="cog-outline" size={24} color="#A78BFA" />
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
              getFilteredComplaints().map(complaint => {
                const stylesForStatus = getStatusStyles(complaint.status);
                return (
                  <BlurView intensity={20} tint="dark" style={[styles.complaintCard, { borderColor: stylesForStatus.borderColor }]} key={complaint.id}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.complaintTitle}>{complaint.title}</Text>
                      <View style={[styles.statusBadge, { backgroundColor: stylesForStatus.backgroundColor, borderWidth: 1, borderColor: stylesForStatus.borderColor }]}>
                        <Text style={[styles.statusText, { color: stylesForStatus.color }]}>{getStatusText(complaint.status)}</Text>
                      </View>
                    </View>
                    <Text style={styles.complaintDate}>{isTelugu ? 'తేదీ:' : 'Raised on:'} {complaint.date}</Text>
                  </BlurView>
                );
              })
            ) : (
              <View style={styles.emptyState}>
                 <MaterialCommunityIcons name="alert-circle-check-outline" size={48} color="#64748B" />
                 <Text style={styles.emptyStateText}>{isTelugu ? 'ఫిర్యాదులు లేవు' : 'No complaints found'}</Text>
              </View>
            )}
          </View>

          {/* Raise New Complaint Button */}
          <TouchableOpacity 
            style={styles.raiseButton} 
            onPress={() => setShowRaiseModal(true)} 
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="plus" size={20} color="#A855F7" style={{marginRight: 8}} />
            <Text style={styles.raiseButtonText}>{isTelugu ? 'కొత్త ఫిర్యాదును నమోదు చేయండి' : 'Raise New Complaint'}</Text>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar */}
        <BlurView intensity={40} tint="dark" style={[styles.bottomTabBar, { borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)', paddingBottom: Math.max(insets.bottom, 12) }]}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'హోమ్' : 'Home'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyTimeTable')}>
            <MaterialCommunityIcons name="calendar-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'టైమ్ టేబుల్' : 'Time Table'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'నోటిఫికేషన్' : 'Notification'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyProfile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Raise Complaint Modal */}
        {showRaiseModal && (
           <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
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
                      placeholderTextColor="#64748B"
                      value={complaintTitle}
                      onChangeText={setComplaintTitle}
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>{isTelugu ? 'వివరణ' : 'Description'}</Text>
                    <TextInput
                      style={[styles.textInput, styles.textArea]}
                      placeholder={isTelugu ? 'వివరించండి...' : 'Describe the issue...'}
                      placeholderTextColor="#64748B"
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
                  <TouchableOpacity style={[styles.submitButton, { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#475569', marginTop: 12 }]} onPress={() => setShowRaiseModal(false)} activeOpacity={0.8}>
                     <Text style={[styles.submitButtonText, { color: '#94A3B8' }]}>{isTelugu ? 'రద్దు చేయి' : 'Cancel'}</Text>
                  </TouchableOpacity>
               </View>
             </View>
           </View>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
            <View style={styles.centerModalOverlay}>
               <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
               <View style={styles.centerModalContent}>
                  <View style={{alignItems: 'center', marginBottom: 16}}>
                     <MaterialCommunityIcons name="check-circle" size={60} color="#10B981" />
                  </View>
                  <Text style={styles.centerModalTitle}>{isTelugu ? 'సమర్పించబడింది!' : 'Submitted!'}</Text>
                  <Text style={{textAlign: 'center', color: '#94A3B8', marginBottom: 24}}>
                    {isTelugu ? 'మీ ఫిర్యాదు విజయవంతంగా సమర్పించబడింది.' : 'Your complaint has been successfully submitted.'}
                  </Text>
                  <TouchableOpacity style={styles.submitButton} onPress={handleSuccessClose}>
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
  safeArea: { flex: 1 },
  
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  appBarLeft: { flexDirection: 'row', alignItems: 'center' },
  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#E0E7FF' },
  
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  languagePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  languageActive: { backgroundColor: '#4F46E5' },
  languageInactive: { backgroundColor: 'transparent' },
  languageText: { fontSize: 12, fontWeight: 'bold', color: '#94A3B8' },
  languageTextActive: { color: '#FFFFFF' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  tabSelectorRow: {
    flexDirection: 'row',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  tabPill: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  tabPillActive: {
    backgroundColor: '#A855F7',
    borderRadius: 20,
  },
  tabPillText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#94A3B8',
  },
  tabPillTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  complaintsContainer: {
    marginBottom: 20,
  },
  complaintCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
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
    color: '#F1F5F9',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  complaintDate: {
    fontSize: 13,
    color: '#94A3B8',
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 12,
  },

  raiseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#A855F7',
    borderRadius: 12,
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
  },
  raiseButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#A855F7',
  },

  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 10, marginTop: 4, fontWeight: '500', textAlign: 'center' },

  // Modal styles
  bottomModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomModalContent: {
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  modalDragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#475569',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#F8FAFC',
  },
  textArea: {
    height: 100,
  },
  submitButton: {
    backgroundColor: '#A855F7',
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
  centerModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  centerModalContent: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  centerModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 12,
    textAlign: 'center',
  },
});
