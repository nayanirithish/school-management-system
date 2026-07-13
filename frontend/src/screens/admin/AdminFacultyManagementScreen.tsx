import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  Modal
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';
import { useAdmin, Faculty } from '../../context/AdminContext';

type AdminFacultyNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminFacultyManagement'>;
interface Props {
  navigation: AdminFacultyNavigationProp;
}

export default function AdminFacultyManagementScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const { facultyList, deleteFaculty, toggleFacultyStatus } = useAdmin();
  const [activeModal, setActiveModal] = useState<Faculty | null>(null);

  const totalFaculty = facultyList.length;
  const activeFaculty = facultyList.filter(f => f.status === 'Active').length;
  const inactiveFaculty = facultyList.filter(f => f.status === 'Inactive').length;

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
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
        
        <Text style={styles.pageTitle}>Faculty Management</Text>

        {/* Search & Filter */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <MaterialCommunityIcons name="magnify" size={24} color="#6B7280" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput} 
              placeholder="Search faculty by name or department..." 
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
             <MaterialCommunityIcons name="tune-vertical" size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
           <View style={[styles.statCard, { flex: 1.1 }]}>
              <Text style={styles.statLabel}>Total Faculty</Text>
              <Text style={[styles.statValue, { color: '#111827' }]}>{totalFaculty}</Text>
           </View>
           <View style={[styles.statCard, { flex: 1 }]}>
              <Text style={styles.statLabel}>Active Faculty</Text>
              <Text style={[styles.statValue, { color: '#4F46E5' }]}>{activeFaculty}</Text>
           </View>
           <View style={[styles.statCard, { flex: 1 }]}>
              <Text style={styles.statLabel}>Inactive Faculty</Text>
              <Text style={[styles.statValue, { color: '#111827' }]}>{inactiveFaculty}</Text>
           </View>
        </View>

        {/* Faculty List */}
        <View style={styles.listContainer}>
          {facultyList.map((faculty) => (
            <View key={faculty.id} style={styles.listItem}>
               <Image source={{ uri: faculty.avatar }} style={styles.avatar} />
               <View style={styles.listInfo}>
                  <Text style={styles.facultyName}>{faculty.name}</Text>
                  <Text style={styles.facultyDetails}>{faculty.dept}</Text>
               </View>
               <View style={[styles.statusPill, faculty.status === 'Active' ? styles.statusActive : styles.statusInactive]}>
                  <Text style={[styles.statusText, faculty.status === 'Active' ? styles.statusTextActive : styles.statusTextInactive]}>
                    {faculty.status}
                  </Text>
               </View>
               <TouchableOpacity style={styles.moreButton} onPress={() => setActiveModal(faculty)}>
                  <MaterialCommunityIcons name="dots-vertical" size={24} color="#4B5563" />
               </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Add Button */}
      <View style={styles.fabContainer}>
         <TouchableOpacity 
           style={styles.fabButton}
           onPress={() => navigation.navigate('AdminAddUpdateFaculty')}
         >
            <MaterialCommunityIcons name="plus" size={24} color="#FFF" />
            <Text style={styles.fabText}>Add New Faculty</Text>
         </TouchableOpacity>
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminHome')}>
          <MaterialCommunityIcons name="home-outline" size={28} color="#4F46E5" />
          <Text style={[styles.tabLabel, { color: '#4F46E5' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminFeeManagement')}>
          <MaterialCommunityIcons name="receipt" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Fee{'\n'}Management</Text>
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

      {/* Interactive Modal for Options */}
      <Modal visible={activeModal !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
           <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setActiveModal(null)} activeOpacity={1} />
           <View style={styles.centerModalContent}>
              <Text style={styles.modalTitle}>Manage {activeModal?.name}</Text>
              
              <TouchableOpacity style={styles.settingsOption} onPress={() => { 
                const facultyId = activeModal?.id;
                setActiveModal(null); 
                navigation.navigate('AdminAddUpdateFaculty', { facultyId }); 
              }}>
                 <MaterialCommunityIcons name="pencil-outline" size={24} color="#4F46E5" />
                 <Text style={styles.settingsOptionText}>Edit Faculty</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingsOption} onPress={() => {
                 if (activeModal) toggleFacultyStatus(activeModal.id);
                 setActiveModal(null);
              }}>
                 <MaterialCommunityIcons name="cancel" size={24} color="#F59E0B" />
                 <Text style={styles.settingsOptionText}>{activeModal?.status === 'Active' ? 'Deactivate' : 'Activate'} Faculty</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.settingsOption, { borderBottomWidth: 0, marginBottom: 12 }]} onPress={() => {
                 if (activeModal) deleteFaculty(activeModal.id);
                 setActiveModal(null);
              }}>
                 <MaterialCommunityIcons name="delete-outline" size={24} color="#EF4444" />
                 <Text style={[styles.settingsOptionText, { color: '#EF4444' }]}>Delete Faculty</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.submitButtonWrapper} onPress={() => setActiveModal(null)}>
                <Text style={styles.submitButtonText}>Close</Text>
              </TouchableOpacity>
           </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
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

  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 16 },

  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  searchBox: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
    borderWidth: 1, 
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#111827' },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { 
    backgroundColor: '#FFFFFF', 
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 12, 
    paddingVertical: 16, 
    paddingHorizontal: 8, 
    alignItems: 'center', 
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statLabel: { fontSize: 11, color: '#6B7280', marginBottom: 6, textAlign: 'center' },
  statValue: { fontSize: 18, fontWeight: 'bold' },

  listContainer: { paddingBottom: 20 },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E5E7EB', marginRight: 12 },
  listInfo: { flex: 1 },
  facultyName: { fontSize: 15, fontWeight: 'bold', color: '#111827', marginBottom: 2 },
  facultyDetails: { fontSize: 12, color: '#6B7280' },
  statusPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginRight: 8 },
  statusActive: { backgroundColor: '#D1FAE5' },
  statusInactive: { backgroundColor: '#FEE2E2' },
  statusText: { fontSize: 11, fontWeight: 'bold' },
  statusTextActive: { color: '#10B981' },
  statusTextInactive: { color: '#EF4444' },
  moreButton: { padding: 4 },

  fabContainer: { position: 'absolute', bottom: 80, left: 16, right: 16 },
  fabButton: { 
    flexDirection: 'row',
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
  fabText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold', marginLeft: 8 },

  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 10, color: '#9CA3AF', marginTop: 4, fontWeight: '500', textAlign: 'center' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 16, textAlign: 'center' },
  settingsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingsOptionText: {
    fontSize: 15,
    color: '#1F2937',
    marginLeft: 12,
    fontWeight: '500',
  },
  submitButtonWrapper: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
