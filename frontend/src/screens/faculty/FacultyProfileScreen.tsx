import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../../context/LanguageContext';
import { useFacultyPreferences } from '../../context/FacultyPreferencesContext';

type FacultyProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FacultyProfile'>;
interface Props {
  navigation: FacultyProfileNavigationProp;
}

export default function FacultyProfileScreen({ navigation }: Props) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [successModal, setSuccessModal] = useState<string | null>(null);

  const { isTelugu, setIsTelugu } = useLanguage();
  const {
    facultyNotifications, setFacultyNotifications,
    facultyEmail, setFacultyEmail,
    facultyPhone, setFacultyPhone,
  } = useFacultyPreferences();

  const handlePasswordSave = () => {
    setActiveModal(null);
    setSuccessModal('Password changed successfully!');
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'Personal Information':
        return (
          <View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>First Name:</Text><Text style={styles.infoVal}>Rahul</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Last Name:</Text><Text style={styles.infoVal}>Sharma</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>DOB:</Text><Text style={styles.infoVal}>15-Aug-1985</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Address:</Text><Text style={styles.infoVal}>123 Education Lane, Delhi</Text></View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setActiveModal(null)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Change Password':
        return (
          <View>
            <Text style={styles.inputLabel}>Old Password</Text>
            <TextInput style={styles.inputField} placeholderTextColor="#9CA3AF" secureTextEntry placeholder="Enter old password" />
            <Text style={styles.inputLabel}>New Password</Text>
            <TextInput style={styles.inputField} placeholderTextColor="#9CA3AF" secureTextEntry placeholder="Enter new password" />
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput style={styles.inputField} placeholderTextColor="#9CA3AF" secureTextEntry placeholder="Confirm new password" />
            <TouchableOpacity style={styles.saveButton} onPress={handlePasswordSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Notification Settings':
        return (
          <View>
             <Text style={styles.inputLabel}>Notifications</Text>
             <View style={styles.optionsRow}>
                <TouchableOpacity style={[styles.optionBtn, facultyNotifications && styles.optionBtnActive]} onPress={() => { setFacultyNotifications(true); setActiveModal(null); }}>
                  <Text style={facultyNotifications ? styles.optionTextActive : styles.optionTextInactive}>On</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.optionBtn, !facultyNotifications && styles.optionBtnActive]} onPress={() => { setFacultyNotifications(false); setActiveModal(null); }}>
                  <Text style={!facultyNotifications ? styles.optionTextActive : styles.optionTextInactive}>Off</Text>
                </TouchableOpacity>
             </View>
          </View>
        );
      default:
        return null;
    }
  };

  const renderSettingRow = (icon: string, title: string, value?: string, onPress?: () => void) => (
    <TouchableOpacity style={styles.settingRow} activeOpacity={0.7} onPress={onPress}>
      <MaterialCommunityIcons name={icon as any} size={24} color="#A78BFA" style={styles.settingIcon} />
      <Text style={styles.settingTitle}>{title}</Text>
      <View style={styles.settingRight}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        <MaterialCommunityIcons name="chevron-right" size={24} color="#64748B" />
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="menu" size={24} color="#E0E7FF" />
          </TouchableOpacity>
          <Text style={styles.brandTitle}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
          <View style={styles.headerRight}>
            <View style={styles.languageToggle}>
              <TouchableOpacity onPress={() => setIsTelugu(false)} style={!isTelugu ? styles.languageActive : styles.languageInactive}>
                <Text style={!isTelugu ? styles.langTextActive : styles.langTextInactive}>EN</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsTelugu(true)} style={isTelugu ? styles.languageActive : styles.languageInactive}>
                <Text style={isTelugu ? styles.langTextActive : styles.langTextInactive}>TE</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate('FacultySettings' as any)}>
               <MaterialCommunityIcons name="cog-outline" size={24} color="#A78BFA" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Profile Info Block */}
          <BlurView intensity={20} tint="dark" style={styles.profileHeaderBlock}>
             <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatarImage} />
             <View style={styles.profileDetails}>
                <Text style={styles.profileName}>Mr. Rahul Sharma</Text>
                <Text style={styles.profileRole}>Computer Science Faculty</Text>
                <Text style={styles.profileContact}>{facultyEmail}</Text>
                <Text style={styles.profileContact}>{facultyPhone}</Text>
             </View>
          </BlurView>

          <BlurView intensity={20} tint="dark" style={styles.listContainer}>
            {renderSettingRow('account-outline', 'Personal Information', undefined, () => setActiveModal('Personal Information'))}
            {renderSettingRow('lock-outline', 'Change Password', undefined, () => setActiveModal('Change Password'))}
            {renderSettingRow('bell-outline', 'Notification Settings', undefined, () => setActiveModal('Notification Settings'))}
            
            <TouchableOpacity style={styles.settingRow} activeOpacity={0.7} onPress={() => setIsTelugu(!isTelugu)}>
              <MaterialCommunityIcons name="web" size={24} color="#A78BFA" style={styles.settingIcon} />
              <Text style={styles.settingTitle}>Language</Text>
              <View style={styles.settingRight}>
                <Text style={styles.settingValue}>{isTelugu ? 'Telugu' : 'English'}</Text>
              </View>
            </TouchableOpacity>
          </BlurView>

          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('Login' as any)}>
             <BlurView intensity={20} tint="dark" style={styles.logoutContent}>
               <MaterialCommunityIcons name="logout" size={20} color="#EF4444" style={{marginRight: 8}} />
               <Text style={styles.logoutText}>Logout</Text>
             </BlurView>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar */}
        <BlurView intensity={40} tint="dark" style={styles.bottomTabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyHome' as any)}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyTimeTable' as any)}>
            <MaterialCommunityIcons name="calendar-outline" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Time Table</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyNotices' as any)}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#A855F7" />
            <Text style={[styles.tabLabel, {color: '#A855F7'}]}>Profile</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Dynamic Modal for interactions */}
        {activeModal !== null && (
          <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
            <View style={styles.modalOverlay}>
              <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setActiveModal(null)}>
                <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
              </TouchableOpacity>
              <BlurView intensity={40} tint="dark" style={styles.modalContent}>
                <Text style={styles.modalTitle}>{activeModal}</Text>
                {renderModalContent()}
              </BlurView>
            </View>
          </View>
        )}
        
        {/* Success Modal */}
        {successModal !== null && (
          <View style={[StyleSheet.absoluteFill, { zIndex: 10000, elevation: 10000 }]}>
            <View style={styles.modalOverlay}>
              <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setSuccessModal(null)}>
                <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
              </TouchableOpacity>
              <BlurView intensity={40} tint="dark" style={[styles.modalContent, { alignItems: 'center' }]}>
                <MaterialCommunityIcons name="check-circle" size={48} color="#10B981" style={{marginBottom: 16}} />
                <Text style={styles.modalTitle}>Success</Text>
                <Text style={styles.modalText}>{successModal}</Text>
                <TouchableOpacity style={styles.saveButton} onPress={() => setSuccessModal(null)}>
                  <Text style={styles.saveButtonText}>OK</Text>
                </TouchableOpacity>
              </BlurView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  backButton: { marginRight: 16 },
  brandTitle: { fontSize: 20, fontWeight: 'bold', color: '#F8FAFC', flex: 1 },
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
  settingsIcon: { marginLeft: 12 },
  
  scrollContent: { paddingHorizontal: 16, paddingTop: 20 },

  profileHeaderBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  profileDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  profileContact: {
    fontSize: 14,
    color: '#64748B',
  },

  listContainer: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  settingIcon: {
    marginRight: 16,
  },
  settingTitle: { fontSize: 16, color: '#E2E8F0', flex: 1, fontWeight: '500' },
  settingRight: { flexDirection: 'row', alignItems: 'center' },
  settingValue: { fontSize: 14, color: '#9CA3AF', marginRight: 8 },

  logoutButton: {
    marginTop: 24,
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    overflow: 'hidden',
  },
  logoutText: { color: '#EF4444', fontSize: 16, fontWeight: 'bold' },

  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 4, fontWeight: '500' },

  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: 'rgba(0,0,0,0.7)' },
  modalContent: { borderRadius: 20, padding: 24, width: '100%', borderWidth: 1, borderColor: '#8B5CF6', overflow: 'hidden' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 16, textAlign: 'center' },
  modalText: { fontSize: 14, color: '#CBD5E1', marginBottom: 20, textAlign: 'left', lineHeight: 22 },
  closeButton: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  closeButtonText: { color: '#E2E8F0', fontWeight: 'bold' },

  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  infoLabel: { fontSize: 15, color: '#9CA3AF', fontWeight: '500' },
  infoVal: { fontSize: 15, color: '#F8FAFC', fontWeight: '600' },

  inputLabel: { fontSize: 13, color: '#9CA3AF', marginBottom: 8, fontWeight: '600' },
  inputField: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.2)', color: '#F8FAFC', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 15 },
  saveButton: { backgroundColor: '#5B4BCA', borderRadius: 8, paddingVertical: 14, paddingHorizontal: 32, alignItems: 'center', width: '100%' },
  saveButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  
  optionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  optionBtn: { flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', padding: 12, alignItems: 'center', borderRadius: 8, marginHorizontal: 4 },
  optionBtnActive: { backgroundColor: 'rgba(139, 92, 246, 0.2)', borderWidth: 1, borderColor: '#5B4BCA' },
  optionTextInactive: { color: '#9CA3AF', fontWeight: '500' },
  optionTextActive: { color: '#D8B4FE', fontWeight: 'bold' },
});
