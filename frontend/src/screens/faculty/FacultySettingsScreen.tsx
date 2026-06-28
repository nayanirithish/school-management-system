import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { BlurView } from 'expo-blur';
import { useLanguage } from '../../context/LanguageContext';
import { useFacultyPreferences } from '../../context/FacultyPreferencesContext';

type FacultySettingsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FacultySettings'>;
interface Props {
  navigation: FacultySettingsNavigationProp;
}

export default function FacultySettingsScreen({ navigation }: Props) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [successModal, setSuccessModal] = useState<string | null>(null);

  const { isTelugu, setIsTelugu } = useLanguage();
  const {
    facultyEmail, setFacultyEmail,
    facultyPhone, setFacultyPhone,
    isFacultyDark, setIsFacultyDark,
    facultyTextSize, setFacultyTextSize,
    facultyNotifications, setFacultyNotifications,
  } = useFacultyPreferences();

  // Temporary states for edit modals
  const [tempEmail, setTempEmail] = useState(facultyEmail);
  const [tempPhone, setTempPhone] = useState(facultyPhone);

  const handlePasswordSave = () => {
    setActiveModal(null);
    setSuccessModal('Password changed successfully!');
  };

  const handleEmailSave = () => {
    setFacultyEmail(tempEmail);
    setActiveModal(null);
  };

  const handlePhoneSave = () => {
    setFacultyPhone(tempPhone);
    setActiveModal(null);
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
      case 'Email Address':
        return (
          <View>
             <Text style={styles.inputLabel}>Email Address</Text>
             <TextInput style={styles.inputField} value={tempEmail} onChangeText={setTempEmail} keyboardType="email-address" />
             <TouchableOpacity style={styles.saveButton} onPress={handleEmailSave}>
               <Text style={styles.saveButtonText}>Save Changes</Text>
             </TouchableOpacity>
          </View>
        );
      case 'Phone Number':
        return (
          <View>
             <Text style={styles.inputLabel}>Phone Number</Text>
             <TextInput style={styles.inputField} value={tempPhone} onChangeText={setTempPhone} keyboardType="phone-pad" />
             <TouchableOpacity style={styles.saveButton} onPress={handlePhoneSave}>
               <Text style={styles.saveButtonText}>Save Changes</Text>
             </TouchableOpacity>
          </View>
        );
      case 'Help & FAQ':
        return (
          <View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>How to mark attendance?</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>How to upload syllabus?</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>How to reset password?</Text></View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setActiveModal(null)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Contact Support':
        return (
          <View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Email:</Text><Text style={styles.infoVal}>support@oryol.com</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>Phone:</Text><Text style={styles.infoVal}>1800-123-4567</Text></View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setActiveModal(null)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderSettingRow = (icon: string, title: string, value?: string, onPress?: () => void, isLast: boolean = false) => (
    <TouchableOpacity style={[styles.settingRow, isLast && { borderBottomWidth: 0 }]} activeOpacity={onPress ? 0.7 : 1} onPress={onPress}>
      <MaterialCommunityIcons name={icon as any} size={24} color="#5B4BCA" style={styles.settingIcon} />
      <Text style={styles.settingTitle}>{title}</Text>
      <View style={styles.settingRight}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        {onPress && <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {renderSectionHeader('ACCOUNT')}
        <View style={styles.cardGroup}>
          {renderSettingRow('account-outline', 'Personal Information', undefined, () => setActiveModal('Personal Information'))}
          {renderSettingRow('lock-outline', 'Change Password', undefined, () => setActiveModal('Change Password'))}
          {renderSettingRow('email-outline', 'Email Address', facultyEmail, () => { setTempEmail(facultyEmail); setActiveModal('Email Address'); })}
          {renderSettingRow('phone-outline', 'Phone Number', facultyPhone, () => { setTempPhone(facultyPhone); setActiveModal('Phone Number'); }, true)}
        </View>

        {renderSectionHeader('PREFERENCES')}
        <View style={styles.cardGroup}>
          {renderSettingRow(
            isFacultyDark ? 'weather-night' : 'weather-sunny', 
            'Dark Mode', 
            isFacultyDark ? 'On' : 'Off', 
            () => setIsFacultyDark(!isFacultyDark)
          )}
          {renderSettingRow(
            'format-size', 
            'Text Size', 
            facultyTextSize, 
            () => setFacultyTextSize(facultyTextSize === 'Low' ? 'Medium' : facultyTextSize === 'Medium' ? 'High' : 'Low')
          )}
          {renderSettingRow(
            'bell-outline', 
            'Notifications', 
            facultyNotifications ? 'On' : 'Off', 
            () => setFacultyNotifications(!facultyNotifications), 
            true
          )}
        </View>

        {renderSectionHeader('SCHOOL')}
        <View style={styles.cardGroup}>
          {renderSettingRow('domain', 'School Name', 'Delhi Public School', undefined)}
          {renderSettingRow('calendar-blank-outline', 'Academic Year', '2024 - 25', undefined)}
          {renderSettingRow('shield-outline', 'Role', 'Faculty', undefined, true)}
        </View>

        {renderSectionHeader('SUPPORT')}
        <View style={styles.cardGroup}>
          {renderSettingRow('help-circle-outline', 'Help & FAQ', undefined, () => setActiveModal('Help & FAQ'))}
          {renderSettingRow('message-text-outline', 'Contact Support', undefined, () => setActiveModal('Contact Support'))}
          {renderSettingRow('information-outline', 'App Version', 'v2.1.0', undefined, true)}
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
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyProfile' as any)}>
          <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Profile</Text>
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
  
  scrollContent: { paddingHorizontal: 16, paddingTop: 20 },

  sectionHeader: { fontSize: 12, fontWeight: 'bold', color: '#9CA3AF', marginTop: 16, marginBottom: 8, letterSpacing: 1 },
  cardGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingIcon: { marginRight: 12 },
  settingTitle: { fontSize: 15, color: '#374151', flex: 1, fontWeight: '500' },
  settingRight: { flexDirection: 'row', alignItems: 'center' },
  settingValue: { fontSize: 14, color: '#9CA3AF', marginRight: 8 },

  logoutButton: {
    marginTop: 30,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 40,
  },
  logoutText: { color: '#EF4444', fontSize: 16, fontWeight: 'bold' },

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
});
