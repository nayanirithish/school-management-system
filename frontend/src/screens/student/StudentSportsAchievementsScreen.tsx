import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type StudentSportsAchievementsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'StudentSportsAchievements'>;
interface Props {
  navigation: StudentSportsAchievementsScreenNavigationProp;
}

interface Achievement {
  id: string;
  title: string;
  event: string;
  date: string;
  medal: 'Gold' | 'Silver' | 'Bronze' | 'Participant';
  description: string;
  certificateUri?: string;
}

export default function StudentSportsAchievementsScreen({ navigation }: Props) {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: '100m Sprint Champion',
      event: 'Annual Inter-School Sports Meet 2024',
      date: '15 Apr 2024',
      medal: 'Gold',
      description: 'Secured first place in the 100m sprint with a record time of 11.2 seconds.',
      certificateUri: 'https://example.com/cert1.jpg',
    },
    {
      id: '2',
      title: 'Basketball Runner-up',
      event: 'State Level Basketball Championship',
      date: '02 Mar 2024',
      medal: 'Silver',
      description: 'Played as the point guard. Team reached the finals but lost by 2 points.',
    }
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formEvent, setFormEvent] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formMedal, setFormMedal] = useState<Achievement['medal']>('Participant');
  const [formDescription, setFormDescription] = useState('');
  const [formCertificate, setFormCertificate] = useState<string | undefined>(undefined);

  const getMedalColor = (medal: string) => {
    switch (medal) {
      case 'Gold': return '#FBBF24';
      case 'Silver': return '#E2E8F0';
      case 'Bronze': return '#D97706';
      default: return '#60A5FA';
    }
  };

  const getMedalIcon = (medal: string) => {
    if (medal === 'Participant') return 'run';
    return 'medal';
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormTitle('');
    setFormEvent('');
    setFormDate('');
    setFormMedal('Participant');
    setFormDescription('');
    setFormCertificate(undefined);
    setModalVisible(true);
  };

  const handleOpenEdit = (ach: Achievement) => {
    setEditingId(ach.id);
    setFormTitle(ach.title);
    setFormEvent(ach.event);
    setFormDate(ach.date);
    setFormMedal(ach.medal);
    setFormDescription(ach.description);
    setFormCertificate(ach.certificateUri);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    // In a real app we might use Alert.prompt, but we'll just delete for simplicity
    setAchievements((prev) => prev.filter((a) => a.id !== id));
  };

  const handleUploadCertificate = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        copyToCacheDirectory: true,
      });
      if (result.assets && result.assets.length > 0) {
        setFormCertificate(result.assets[0].uri);
      }
    } catch (err) {
      console.log('Error picking document', err);
    }
  };

  const handleSave = () => {
    if (!formTitle || !formEvent) {
      // Basic validation bypass for UI mockup
      return;
    }

    if (editingId) {
      setAchievements((prev) =>
        prev.map((a) =>
          a.id === editingId
            ? { ...a, title: formTitle, event: formEvent, date: formDate, medal: formMedal, description: formDescription, certificateUri: formCertificate }
            : a
        )
      );
    } else {
      const newAch: Achievement = {
        id: Math.random().toString(),
        title: formTitle,
        event: formEvent,
        date: formDate || new Date().toLocaleDateString(),
        medal: formMedal,
        description: formDescription,
        certificateUri: formCertificate,
      };
      setAchievements([newAch, ...achievements]);
    }
    setModalVisible(false);
  };

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#E0E7FF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sports Achievements</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Summary Card */}
          <LinearGradient colors={['#4F46E5', '#8B5CF6']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.summaryCard}>
            <View style={styles.summaryInfo}>
              <Text style={styles.summaryTitle}>Your Sports Profile</Text>
              <Text style={styles.summaryText}>Total Events: {achievements.length}</Text>
              <View style={styles.medalsRow}>
                <MaterialCommunityIcons name="medal" size={20} color="#FEF3C7" />
                <Text style={styles.medalCountText}>
                  {achievements.filter(a => a.medal !== 'Participant').length} Medals Won
                </Text>
              </View>
            </View>
            <View style={styles.summaryIconContainer}>
              <MaterialCommunityIcons name="basketball" size={56} color="#E0E7FF" />
            </View>
          </LinearGradient>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Achievements</Text>
          </View>

          {achievements.length === 0 && (
            <Text style={styles.emptyText}>No achievements added yet.</Text>
          )}

          {achievements.map((ach) => (
            <BlurView intensity={20} tint="dark" style={styles.achCard} key={ach.id}>
              <View style={styles.cardHeader}>
                <View style={styles.medalBadge}>
                  <MaterialCommunityIcons name={getMedalIcon(ach.medal)} size={16} color={getMedalColor(ach.medal)} />
                  <Text style={[styles.medalText, { color: getMedalColor(ach.medal) }]}>{ach.medal}</Text>
                </View>
              </View>
              
              <Text style={styles.achTitle}>{ach.title}</Text>
              <Text style={styles.achEvent}>{ach.event}</Text>
              
              <Text style={styles.achDesc}>{ach.description}</Text>
              
              {ach.certificateUri && (
                <View style={styles.certBadge}>
                  <MaterialCommunityIcons name="certificate" size={14} color="#C4B5FD" />
                  <Text style={styles.certText}>Certificate Available</Text>
                </View>
              )}
              
              <View style={styles.cardFooter}>
                <View style={styles.dateRow}>
                  <MaterialCommunityIcons name="calendar" size={14} color="#94A3B8" />
                  <Text style={styles.dateText}>{ach.date}</Text>
                </View>
              </View>
            </BlurView>
          ))}
          
          <View style={{ height: 100 }} />
        </ScrollView>

      </SafeAreaView>

      {/* Edit/Add Modal (In-layout) */}
      {modalVisible && (
        <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
          <View style={styles.modalOverlay}>
          <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setModalVisible(false)}>
            <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
          </TouchableOpacity>
          
          <View style={styles.modalContainer}>
            <BlurView intensity={40} tint="dark" style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{editingId ? 'Edit Achievement' : 'Add Achievement'}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <MaterialCommunityIcons name="close-circle-outline" size={28} color="#A78BFA" />
                </TouchableOpacity>
              </View>
              
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.inputLabel}>Title</Text>
                <TextInput
                  style={styles.inputField}
                  placeholderTextColor="#94A3B8"
                  placeholder="e.g. 100m Sprint Champion"
                  value={formTitle}
                  onChangeText={setFormTitle}
                />

                <Text style={styles.inputLabel}>Event Name</Text>
                <TextInput
                  style={styles.inputField}
                  placeholderTextColor="#94A3B8"
                  placeholder="e.g. Inter-School Sports Meet"
                  value={formEvent}
                  onChangeText={setFormEvent}
                />

                <View style={styles.rowInputs}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={styles.inputLabel}>Date</Text>
                    <TextInput
                      style={styles.inputField}
                      placeholderTextColor="#94A3B8"
                      placeholder="e.g. 15 Apr 2024"
                      value={formDate}
                      onChangeText={setFormDate}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.inputLabel}>Medal/Result</Text>
                    {/* Simple toggle for mockup purposes */}
                    <TouchableOpacity 
                      style={styles.medalSelectButton}
                      onPress={() => {
                        const options: Achievement['medal'][] = ['Gold', 'Silver', 'Bronze', 'Participant'];
                        const nextIdx = (options.indexOf(formMedal) + 1) % options.length;
                        setFormMedal(options[nextIdx]);
                      }}
                    >
                      <Text style={[styles.medalSelectText, { color: getMedalColor(formMedal) }]}>{formMedal}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={[styles.inputField, { height: 80, textAlignVertical: 'top' }]}
                  placeholderTextColor="#94A3B8"
                  placeholder="Describe your achievement..."
                  value={formDescription}
                  onChangeText={setFormDescription}
                  multiline
                />

                <Text style={styles.inputLabel}>Certificate (Optional)</Text>
                <View style={styles.uploadRow}>
                  <TouchableOpacity style={styles.uploadButton} onPress={handleUploadCertificate}>
                    <MaterialCommunityIcons name="upload" size={20} color="#C4B5FD" />
                    <Text style={styles.uploadText}>Upload File</Text>
                  </TouchableOpacity>
                  {formCertificate && (
                    <View style={styles.fileAttached}>
                      <MaterialCommunityIcons name="check-circle" size={16} color="#34D399" />
                      <Text style={styles.fileAttachedText}>File Attached</Text>
                      <TouchableOpacity onPress={() => setFormCertificate(undefined)} style={{marginLeft: 8}}>
                         <MaterialCommunityIcons name="close" size={16} color="#F87171" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                  <LinearGradient colors={['#4F46E5', '#8B5CF6']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.saveGradient}>
                    <Text style={styles.saveButtonText}>Save Achievement</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </ScrollView>
            </BlurView>
          </View>
        </View>
        </View>
      )}

      {/* Bottom Tab Bar */}
      <BlurView intensity={40} tint="dark" style={[styles.bottomTabBar, { borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)' }]}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentHome')}>
          <MaterialCommunityIcons name="home-outline" size={28} color="#94A3B8" />
          <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FeeSection')}>
          <MaterialCommunityIcons name="credit-card-outline" size={28} color="#94A3B8" />
          <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>Fee Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentNotices')}>
          <MaterialCommunityIcons name="bell-outline" size={28} color="#94A3B8" />
          <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentProfile')}>
          <MaterialCommunityIcons name="account-outline" size={28} color="#94A3B8" />
          <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>Profile</Text>
        </TouchableOpacity>
      </BlurView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center' },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  backButton: { marginRight: 16 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#F1F5F9' },
  
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  summaryInfo: { flex: 1 },
  summaryTitle: { color: '#F8FAFC', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  summaryText: { color: '#FFEDD5', fontSize: 13, marginBottom: 8 },
  medalsRow: { flexDirection: 'row', alignItems: 'center' },
  medalCountText: { color: '#FEF3C7', fontSize: 14, marginLeft: 6, fontWeight: '600' },
  summaryIconContainer: { marginLeft: 16, width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#F1F5F9' },
  addButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(139, 92, 246, 0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: '#8B5CF6' },
  addButtonText: { color: '#6D28D9', fontSize: 12, fontWeight: 'bold', marginLeft: 4 },

  emptyText: { textAlign: 'center', color: '#94A3B8', marginTop: 32 },

  achCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    borderColor: '#8B5CF6',
    overflow: 'hidden',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  medalBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.05)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, borderWidth: 1, borderColor: '#334155' },
  medalText: { fontSize: 12, fontWeight: 'bold', marginLeft: 4 },
  actionButtons: { flexDirection: 'row' },
  iconButton: { padding: 6, marginLeft: 4, backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: 8 },
  
  achTitle: { fontSize: 17, fontWeight: '700', color: '#F8FAFC', marginBottom: 4 },
  achEvent: { fontSize: 13, color: '#6D28D9', fontWeight: '600', marginBottom: 8 },
  achDesc: { fontSize: 13, color: '#94A3B8', lineHeight: 18, marginBottom: 12 },
  
  certBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(139, 92, 246, 0.2)', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginBottom: 12 },
  certText: { fontSize: 11, color: '#6D28D9', fontWeight: '600', marginLeft: 4 },

  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#334155' },
  dateRow: { flexDirection: 'row', alignItems: 'center' },
  dateText: { fontSize: 12, color: '#94A3B8', marginLeft: 6 },

  modalOverlay: { flex: 1, justifyContent: 'flex-end', width: '100%', maxWidth: 480, alignSelf: 'center' },
  modalContainer: { width: '100%', borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: 'hidden', maxHeight: '80%' },
  modalContent: { padding: 24, paddingBottom: 40, backgroundColor: 'rgba(255, 255, 255, 0.95)', flex: 1, borderWidth: 1, borderColor: '#8B5CF6' },
  
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#F1F5F9' },
  
  inputLabel: { fontSize: 13, fontWeight: '600', color: '#F8FAFC', marginBottom: 6 },
  inputField: { 
    backgroundColor: 'rgba(15, 23, 42, 0.7)', 
    borderWidth: 1, 
    borderColor: '#8B5CF6', 
    borderRadius: 12, 
    padding: 14, 
    fontSize: 15,
    color: '#F1F5F9',
    marginBottom: 16,
  },
  rowInputs: { flexDirection: 'row' },
  medalSelectButton: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)', 
    borderWidth: 1, 
    borderColor: '#8B5CF6', 
    borderRadius: 12, 
    padding: 14, 
    alignItems: 'center',
    marginBottom: 16,
  },
  medalSelectText: { fontSize: 15, fontWeight: 'bold' },

  uploadRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  uploadButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(139, 92, 246, 0.2)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: '#8B5CF6' },
  uploadText: { color: '#6D28D9', fontSize: 14, fontWeight: 'bold', marginLeft: 8 },
  fileAttached: { flexDirection: 'row', alignItems: 'center', marginLeft: 16, backgroundColor: 'rgba(52, 211, 153, 0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: '#34D399' },
  fileAttachedText: { color: '#34D399', fontSize: 12, fontWeight: '600', marginLeft: 4 },

  saveButton: { borderRadius: 12, overflow: 'hidden', marginTop: 12 },
  saveGradient: { paddingVertical: 16, alignItems: 'center' },
  saveButtonText: { color: '#F8FAFC', fontSize: 16, fontWeight: 'bold' },

  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.5)',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 4, fontWeight: '500' },
});
