import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { BlurView } from 'expo-blur';
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
            <TextInput style={styles.inputField} secureTextEntry placeholder="Enter old password" />
            <Text style={styles.inputLabel}>New Password</Text>
            <TextInput style={styles.inputField} secureTextEntry placeholder="Enter new password" />
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput style={styles.inputField} secureTextEntry placeholder="Confirm new password" />
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
      <MaterialCommunityIcons name={icon as any} size={24} color="#6B7280" style={styles.settingIcon} />
      <Text style={styles.settingTitle}>{title}</Text>
      <View style={styles.settingRight}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
        <View style={styles.headerRight}>
          <View style={styles.languageToggle}>
            <TouchableOpacity onPress={() => setIsTelugu(false)} style={!isTelugu ? styles.languageActive : styles.languageInactive}>
              <Text style={!isTelugu ? styles.langTextActive : styles.langTextInactive}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsTelugu(true)} style={isTelugu ? styles.languageActive : styles.languageInactive}>
              <Text style={isTelugu ? styles.langTextActive : styles.langTextInactive}>Telugu</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.settingsIcon} onPress={() => navigation.navigate('FacultySettings' as any)}>
             <MaterialCommunityIcons name="cog-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Info Block */}
        <View style={styles.profileHeaderBlock}>
           <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatarImage} />
           <View style={styles.profileDetails}>
              <Text style={styles.profileName}>Mr. Rahul Sharma</Text>
              <Text style={styles.profileRole}>Computer Science Faculty</Text>
              <Text style={styles.profileContact}>{facultyEmail}</Text>
              <Text style={styles.profileContact}>{facultyPhone}</Text>
           </View>
        </View>

        <View style={styles.listContainer}>
          {renderSettingRow('account-outline', 'Personal Information', undefined, () => setActiveModal('Personal Information'))}
          {renderSettingRow('lock-outline', 'Change Password', undefined, () => setActiveModal('Change Password'))}
          {renderSettingRow('bell-outline', 'Notification Settings', undefined, () => setActiveModal('Notification Settings'))}
          
          <TouchableOpacity style={styles.settingRow} activeOpacity={0.7} onPress={() => setIsTelugu(!isTelugu)}>
            <MaterialCommunityIcons name="web" size={24} color="#6B7280" style={styles.settingIcon} />
            <Text style={styles.settingTitle}>Language</Text>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>{isTelugu ? 'Telugu' : 'English'}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('Login' as any)}>
           <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyHome' as any)}>
          <MaterialCommunityIcons name="home-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyTimeTable' as any)}>
          <MaterialCommunityIcons name="calendar-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Time Table</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyNotices' as any)}>
          <MaterialCommunityIcons name="bell-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialCommunityIcons name="account-outline" size={28} color="#5B4BCA" />
          <Text style={[styles.tabLabel, {color: '#5B4BCA'}]}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Dynamic Modal for interactions */}
      {activeModal !== null && (
        <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
          <View style={styles.modalOverlay}>
            <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setActiveModal(null)}>
              <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
            </TouchableOpacity>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{activeModal}</Text>
              {renderModalContent()}
            </View>
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
            <View style={[styles.modalContent, { alignItems: 'center' }]}>
              <MaterialCommunityIcons name="check-circle" size={48} color="#10B981" style={{marginBottom: 16}} />
              <Text style={styles.modalTitle}>Success</Text>
              <Text style={styles.modalText}>{successModal}</Text>
              <TouchableOpacity style={styles.saveButton} onPress={() => setSuccessModal(null)}>
                <Text style={styles.saveButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: { marginRight: 16 },
  brandTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', flex: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    height: 32,
    alignItems: 'center',
    padding: 2,
  },
  languageActive: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  languageInactive: { paddingHorizontal: 12, justifyContent: 'center' },
  langTextActive: { color: '#5B4BCA', fontSize: 12, fontWeight: 'bold' },
  langTextInactive: { color: '#6B7280', fontSize: 12, fontWeight: '500' },
  settingsIcon: { marginLeft: 12 },
  
  scrollContent: { paddingHorizontal: 0, paddingTop: 20 },

  profileHeaderBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  profileDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  profileContact: {
    fontSize: 14,
    color: '#9CA3AF',
  },

  listContainer: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingIcon: {
    marginRight: 16,
  },
  settingTitle: { fontSize: 16, color: '#374151', flex: 1, fontWeight: '500' },
  settingRight: { flexDirection: 'row', alignItems: 'center' },
  settingValue: { fontSize: 14, color: '#9CA3AF', marginRight: 8 },

  logoutButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  logoutText: { color: '#EF4444', fontSize: 16, fontWeight: '500' },

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
  tabLabel: { fontSize: 11, color: '#6B7280', marginTop: 4, fontWeight: '500' },

  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#FFF', borderRadius: 16, padding: 24, width: '100%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 16, textAlign: 'center' },
  modalText: { fontSize: 14, color: '#6B7280', marginBottom: 20, textAlign: 'left', lineHeight: 22 },
  closeButton: { backgroundColor: '#E5E7EB', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  closeButtonText: { color: '#374151', fontWeight: 'bold' },

  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  infoLabel: { fontSize: 15, color: '#4B5563', fontWeight: '500' },
  infoVal: { fontSize: 15, color: '#111827', fontWeight: '600' },

  inputLabel: { fontSize: 13, color: '#4B5563', marginBottom: 8, fontWeight: '600' },
  inputField: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 15 },
  saveButton: { backgroundColor: '#5B4BCA', borderRadius: 8, paddingVertical: 14, paddingHorizontal: 32, alignItems: 'center', width: '100%' },
  saveButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  
  optionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  optionBtn: { flex: 1, backgroundColor: '#F3F4F6', padding: 12, alignItems: 'center', borderRadius: 8, marginHorizontal: 4 },
  optionBtnActive: { backgroundColor: '#EEF2FF', borderWidth: 1, borderColor: '#5B4BCA' },
  optionTextInactive: { color: '#4B5563', fontWeight: '500' },
  optionTextActive: { color: '#5B4BCA', fontWeight: 'bold' },
});
