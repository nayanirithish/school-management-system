import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
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
    setSuccessModal(isTelugu ? 'పాస్‌వర్డ్ విజయవంతంగా మార్చబడింది!' : 'Password changed successfully!');
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
            <View style={styles.infoRow}><Text style={styles.infoLabel}>{isTelugu ? 'పేరు:' : 'First Name:'}</Text><Text style={styles.infoVal}>Rahul</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>{isTelugu ? 'ఇంటి పేరు:' : 'Last Name:'}</Text><Text style={styles.infoVal}>Sharma</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>{isTelugu ? 'పుట్టినతేదీ:' : 'DOB:'}</Text><Text style={styles.infoVal}>15-Aug-1985</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>{isTelugu ? 'చిరునామా:' : 'Address:'}</Text><Text style={styles.infoVal}>123 Education Lane, Delhi</Text></View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setActiveModal(null)}>
              <Text style={styles.closeButtonText}>{isTelugu ? 'మూసివేయు' : 'Close'}</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Change Password':
        return (
          <View>
            <Text style={styles.inputLabel}>{isTelugu ? 'పాత పాస్‌వర్డ్' : 'Old Password'}</Text>
            <TextInput style={styles.inputField} secureTextEntry placeholder={isTelugu ? 'పాత పాస్‌వర్డ్ నమోదు చేయండి' : 'Enter old password'} placeholderTextColor="#9CA3AF" />
            <Text style={styles.inputLabel}>{isTelugu ? 'కొత్త పాస్‌వర్డ్' : 'New Password'}</Text>
            <TextInput style={styles.inputField} secureTextEntry placeholder={isTelugu ? 'కొత్త పాస్‌వర్డ్ నమోదు చేయండి' : 'Enter new password'} placeholderTextColor="#9CA3AF" />
            <Text style={styles.inputLabel}>{isTelugu ? 'పాస్‌వర్డ్ నిర్ధారించండి' : 'Confirm Password'}</Text>
            <TextInput style={styles.inputField} secureTextEntry placeholder={isTelugu ? 'కొత్త పాస్‌వర్డ్ నిర్ధారించండి' : 'Confirm new password'} placeholderTextColor="#9CA3AF" />
            <TouchableOpacity style={styles.saveButton} onPress={handlePasswordSave}>
              <Text style={styles.saveButtonText}>{isTelugu ? 'మార్పులను సేవ్ చేయండి' : 'Save Changes'}</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Email Address':
        return (
          <View>
             <Text style={styles.inputLabel}>{isTelugu ? 'ఈమెయిల్ చిరునామా' : 'Email Address'}</Text>
             <TextInput style={styles.inputField} value={tempEmail} onChangeText={setTempEmail} keyboardType="email-address" placeholderTextColor="#9CA3AF" />
             <TouchableOpacity style={styles.saveButton} onPress={handleEmailSave}>
               <Text style={styles.saveButtonText}>{isTelugu ? 'మార్పులను సేవ్ చేయండి' : 'Save Changes'}</Text>
             </TouchableOpacity>
          </View>
        );
      case 'Phone Number':
        return (
          <View>
             <Text style={styles.inputLabel}>{isTelugu ? 'ఫోన్ నంబర్' : 'Phone Number'}</Text>
             <TextInput style={styles.inputField} value={tempPhone} onChangeText={setTempPhone} keyboardType="phone-pad" placeholderTextColor="#9CA3AF" />
             <TouchableOpacity style={styles.saveButton} onPress={handlePhoneSave}>
               <Text style={styles.saveButtonText}>{isTelugu ? 'మార్పులను సేవ్ చేయండి' : 'Save Changes'}</Text>
             </TouchableOpacity>
          </View>
        );
      case 'Help & FAQ':
        return (
          <View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>{isTelugu ? 'హాజరు ఎలా నమోదు చేయాలి?' : 'How to mark attendance?'}</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>{isTelugu ? 'సిలబస్ ఎలా అప్‌లోడ్ చేయాలి?' : 'How to upload syllabus?'}</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>{isTelugu ? 'పాస్‌వర్డ్ ఎలా రీసెట్ చేయాలి?' : 'How to reset password?'}</Text></View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setActiveModal(null)}>
              <Text style={styles.closeButtonText}>{isTelugu ? 'మూసివేయు' : 'Close'}</Text>
            </TouchableOpacity>
          </View>
        );
      case 'Contact Support':
        return (
          <View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>{isTelugu ? 'ఈమెయిల్:' : 'Email:'}</Text><Text style={styles.infoVal}>support@oryol.com</Text></View>
            <View style={styles.infoRow}><Text style={styles.infoLabel}>{isTelugu ? 'ఫోన్:' : 'Phone:'}</Text><Text style={styles.infoVal}>1800-123-4567</Text></View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setActiveModal(null)}>
              <Text style={styles.closeButtonText}>{isTelugu ? 'మూసివేయు' : 'Close'}</Text>
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
      <MaterialCommunityIcons name={icon as any} size={24} color="#A78BFA" style={styles.settingIcon} />
      <Text style={styles.settingTitle}>{title}</Text>
      <View style={styles.settingRight}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        {onPress && <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />}
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
          <Text style={styles.brandTitle}>{isTelugu ? 'సెట్టింగ్‌లు' : 'Settings'}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {renderSectionHeader(isTelugu ? 'ఖాతా' : 'ACCOUNT')}
          <BlurView intensity={20} tint="dark" style={styles.cardGroup}>
            {renderSettingRow('account-outline', isTelugu ? 'వ్యక్తిగత సమాచారం' : 'Personal Information', undefined, () => setActiveModal('Personal Information'))}
            {renderSettingRow('lock-outline', isTelugu ? 'పాస్‌వర్డ్ మార్చండి' : 'Change Password', undefined, () => setActiveModal('Change Password'))}
            {renderSettingRow('email-outline', isTelugu ? 'ఈమెయిల్ చిరునామా' : 'Email Address', facultyEmail, () => { setTempEmail(facultyEmail); setActiveModal('Email Address'); })}
            {renderSettingRow('phone-outline', isTelugu ? 'ఫోన్ నంబర్' : 'Phone Number', facultyPhone, () => { setTempPhone(facultyPhone); setActiveModal('Phone Number'); }, true)}
          </BlurView>

          {renderSectionHeader(isTelugu ? 'ప్రాధాన్యతలు' : 'PREFERENCES')}
          <BlurView intensity={20} tint="dark" style={styles.cardGroup}>
            {renderSettingRow(
              isFacultyDark ? 'weather-night' : 'weather-sunny', 
              isTelugu ? 'డార్క్ మోడ్' : 'Dark Mode', 
              isFacultyDark ? (isTelugu ? 'ఆన్' : 'On') : (isTelugu ? 'ఆఫ్' : 'Off'), 
              () => setIsFacultyDark(!isFacultyDark)
            )}
            {renderSettingRow(
              'format-size', 
              isTelugu ? 'టెక్స్ట్ పరిమాణం' : 'Text Size', 
              facultyTextSize, 
              () => setFacultyTextSize(facultyTextSize === 'Low' ? 'Medium' : facultyTextSize === 'Medium' ? 'High' : 'Low')
            )}
            {renderSettingRow(
              'bell-outline', 
              isTelugu ? 'నోటిఫికేషన్లు' : 'Notifications', 
              facultyNotifications ? (isTelugu ? 'ఆన్' : 'On') : (isTelugu ? 'ఆఫ్' : 'Off'), 
              () => setFacultyNotifications(!facultyNotifications), 
              true
            )}
          </BlurView>

          {renderSectionHeader(isTelugu ? 'పాఠశాల' : 'SCHOOL')}
          <BlurView intensity={20} tint="dark" style={styles.cardGroup}>
            {renderSettingRow('domain', isTelugu ? 'పాఠశాల పేరు' : 'School Name', 'Delhi Public School', undefined)}
            {renderSettingRow('calendar-blank-outline', isTelugu ? 'విద్యా సంవత్సరం' : 'Academic Year', '2024 - 25', undefined)}
            {renderSettingRow('shield-outline', isTelugu ? 'పాత్ర' : 'Role', isTelugu ? 'ఫ్యాకల్టీ' : 'Faculty', undefined, true)}
          </BlurView>

          {renderSectionHeader(isTelugu ? 'మద్దతు' : 'SUPPORT')}
          <BlurView intensity={20} tint="dark" style={styles.cardGroup}>
            {renderSettingRow('help-circle-outline', isTelugu ? 'సహాయం & FAQ' : 'Help & FAQ', undefined, () => setActiveModal('Help & FAQ'))}
            {renderSettingRow('message-text-outline', isTelugu ? 'మద్దతును సంప్రదించండి' : 'Contact Support', undefined, () => setActiveModal('Contact Support'))}
            {renderSettingRow('information-outline', isTelugu ? 'యాప్ వెర్షన్' : 'App Version', 'v2.1.0', undefined, true)}
          </BlurView>

          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('Login' as any)}>
             <Text style={styles.logoutText}>{isTelugu ? 'లాగ్ అవుట్' : 'Logout'}</Text>
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
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyProfile' as any)}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Profile</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Dynamic Modal for interactions */}
        {activeModal !== null && (
          <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
            <View style={styles.modalOverlay}>
              <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setActiveModal(null)}>
                <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
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
                <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
              </TouchableOpacity>
              <View style={[styles.modalContent, { alignItems: 'center' }]}>
                <MaterialCommunityIcons name="check-circle" size={48} color="#10B981" style={{marginBottom: 16}} />
                <Text style={styles.modalTitle}>{isTelugu ? 'విజయం' : 'Success'}</Text>
                <Text style={styles.modalText}>{successModal}</Text>
                <TouchableOpacity style={styles.saveButton} onPress={() => setSuccessModal(null)}>
                  <Text style={styles.saveButtonText}>{isTelugu ? 'సరే' : 'OK'}</Text>
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
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  backButton: { marginRight: 16 },
  brandTitle: { fontSize: 20, fontWeight: 'bold', color: '#F8FAFC', flex: 1 },
  
  scrollContent: { paddingHorizontal: 16, paddingTop: 20 },

  sectionHeader: { fontSize: 13, fontWeight: 'bold', color: '#A78BFA', marginTop: 16, marginBottom: 8, letterSpacing: 1 },
  cardGroup: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  settingIcon: { marginRight: 12 },
  settingTitle: { fontSize: 15, color: '#E2E8F0', flex: 1, fontWeight: '500' },
  settingRight: { flexDirection: 'row', alignItems: 'center' },
  settingValue: { fontSize: 14, color: '#9CA3AF', marginRight: 8 },

  logoutButton: {
    marginTop: 30,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 40,
  },
  logoutText: { color: '#F87171', fontSize: 16, fontWeight: 'bold' },

  bottomTabBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)', position: 'absolute', bottom: 0, width: '100%' },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#94A3B8', marginTop: 4, fontWeight: '500' },

  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: 'rgba(0,0,0,0.7)' },
  modalContent: { backgroundColor: 'rgba(15, 23, 42, 0.95)', borderRadius: 24, padding: 24, width: '100%', maxWidth: 360, borderWidth: 1, borderColor: '#5B4BCA' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 16, textAlign: 'center' },
  modalText: { fontSize: 14, color: '#9CA3AF', marginBottom: 20, textAlign: 'center', lineHeight: 22 },
  closeButton: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12, alignItems: 'center', marginTop: 16 },
  closeButtonText: { color: '#F8FAFC', fontWeight: 'bold' },

  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  infoLabel: { fontSize: 15, color: '#9CA3AF', fontWeight: '500' },
  infoVal: { fontSize: 15, color: '#F8FAFC', fontWeight: '600' },

  inputLabel: { fontSize: 13, color: '#9CA3AF', marginBottom: 8, fontWeight: '600' },
  inputField: { backgroundColor: 'rgba(0,0,0,0.2)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 14, marginBottom: 16, fontSize: 15, color: '#F8FAFC' },
  saveButton: { backgroundColor: '#5B4BCA', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 32, alignItems: 'center', width: '100%' },
  saveButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
});
