import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Modal, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type SettingsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;
interface Props {
  navigation: SettingsNavigationProp;
}

export default function SettingsScreen({ navigation }: Props) {
  const [isTelugu, setIsTelugu] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  // Modal state
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const settingItems = [
    { id: 'editProfile', icon: 'account-edit-outline', titleEN: 'Edit Profile', titleTE: 'ప్రొఫైల్‌ని సవరించండి', color: '#3B82F6', isToggle: false },
    { id: 'push', icon: 'bell-outline', titleEN: 'Push Notifications', titleTE: 'పుష్ నోటిఫికేషన్లు', color: '#10B981', isToggle: true, value: notificationsEnabled, onValueChange: setNotificationsEnabled },
    { id: 'dark', icon: 'moon-waning-crescent', titleEN: 'Dark Mode', titleTE: 'డార్క్ మోడ్', color: '#6366F1', isToggle: true, value: darkModeEnabled, onValueChange: setDarkModeEnabled },
    { id: 'privacy', icon: 'shield-lock-outline', titleEN: 'Privacy & Security', titleTE: 'గోప్యత & భద్రత', color: '#F59E0B', isToggle: false },
    { id: 'help', icon: 'help-circle-outline', titleEN: 'Help & Support', titleTE: 'సహాయం & మద్దతు', color: '#14B8A6', isToggle: false },
    { id: 'about', icon: 'information-outline', titleEN: 'About Oryol', titleTE: 'ఓర్యోల్ గురించి', color: '#8B5CF6', isToggle: false },
  ];

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'editProfile':
        return (
          <View style={styles.modalBody}>
            <TextInput style={styles.inputField} placeholder="Full Name" defaultValue="Rahul Kumar" placeholderTextColor="#9CA3AF" />
            <TextInput style={styles.inputField} placeholder="Email" defaultValue="rahul.kumar@email.com" keyboardType="email-address" placeholderTextColor="#9CA3AF" />
            <TextInput style={styles.inputField} placeholder="Phone Number" defaultValue="+91 98765 43210" keyboardType="phone-pad" placeholderTextColor="#9CA3AF" />
            <TouchableOpacity style={styles.saveButton} onPress={() => setActiveModal(null)}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        );
      case 'privacy':
        return (
          <View style={styles.modalBody}>
            <TouchableOpacity style={styles.detailRow}>
               <Text style={styles.detailLabel}>Change Login PIN</Text>
               <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailRow}>
               <Text style={styles.detailLabel}>Two-Factor Authentication</Text>
               <Text style={styles.detailBadge}>Off</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailRow}>
               <Text style={styles.detailLabel}>Manage Connected Devices</Text>
               <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        );
      case 'help':
        return (
          <View style={styles.modalBody}>
            <TouchableOpacity style={styles.detailRow}>
               <Text style={styles.detailLabel}>Contact Support</Text>
               <Text style={styles.detailValue}>support@oryol.com</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailRow}>
               <Text style={styles.detailLabel}>Frequently Asked Questions (FAQs)</Text>
               <MaterialCommunityIcons name="open-in-new" size={20} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailRow}>
               <Text style={styles.detailLabel}>Report a Problem</Text>
               <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        );
      case 'about':
        return (
          <View style={styles.modalBody}>
            <View style={styles.aboutHeader}>
               <MaterialCommunityIcons name="school-outline" size={48} color="#5B4BCA" />
               <Text style={styles.aboutBrand}>ORYOL</Text>
               <Text style={styles.aboutVersion}>Version 1.0.0 (Build 42)</Text>
            </View>
            <TouchableOpacity style={styles.detailRow}>
               <Text style={styles.detailLabel}>Terms of Service</Text>
               <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailRow}>
               <Text style={styles.detailLabel}>Privacy Policy</Text>
               <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <LinearGradient colors={['#E0F2FE', '#F3E8FF', '#F9FAFB']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
             <MaterialCommunityIcons name="menu" size={28} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.brandTitle}>ORYOL</Text>
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
              <MaterialCommunityIcons name="cog" size={24} color="#5B4BCA" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sub Header */}
        <View style={styles.subHeader}>
           <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight: 16}}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
           </TouchableOpacity>
           <Text style={styles.pageTitle}>{isTelugu ? 'సెట్టింగ్‌లు' : 'Settings'}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.settingsContainer}>
            {settingItems.map((item, index) => (
              <View key={item.id}>
                <TouchableOpacity 
                  style={styles.settingRow} 
                  activeOpacity={item.isToggle ? 1 : 0.7}
                  onPress={() => {
                    if (!item.isToggle) {
                      setActiveModal(item.id);
                    }
                  }}
                >
                  <View style={[styles.iconContainer, { backgroundColor: item.color + '1A' }]}>
                    <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
                  </View>
                  <Text style={styles.settingText}>{isTelugu ? item.titleTE : item.titleEN}</Text>
                  
                  {item.isToggle ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onValueChange}
                      trackColor={{ false: '#D1D5DB', true: '#C7D2FE' }}
                      thumbColor={item.value ? '#5B4BCA' : '#F9FAFB'}
                    />
                  ) : (
                    <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
                {index < settingItems.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
            <MaterialCommunityIcons name="logout" size={20} color="#EF4444" />
            <Text style={styles.logoutText}>{isTelugu ? 'లాగౌట్ చేయండి' : 'Log Out'}</Text>
          </TouchableOpacity>
          
          <View style={{ height: 100 }} />

        </ScrollView>

        {/* Dynamic Modal for Settings Sections */}
        <Modal visible={activeModal !== null} transparent animationType="slide">
          <View style={styles.modalOverlay}>
             <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setActiveModal(null)}>
                <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
             </TouchableOpacity>
             <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                   <Text style={styles.modalTitle}>
                     {activeModal ? settingItems.find(i => i.id === activeModal)?.titleEN : ''}
                   </Text>
                   <TouchableOpacity onPress={() => setActiveModal(null)}>
                      <MaterialCommunityIcons name="close-circle-outline" size={28} color="#9CA3AF" />
                   </TouchableOpacity>
                </View>
                {renderModalContent()}
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
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  brandTitle: { fontSize: 20, fontWeight: '800', color: '#5B4BCA', letterSpacing: 1 },
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: '#E0E7FF',
    borderRadius: 16,
    padding: 2,
    alignItems: 'center',
  },
  languagePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  languageActive: { backgroundColor: '#5B4BCA' },
  languageInactive: { backgroundColor: 'transparent' },
  languageText: { fontSize: 11, fontWeight: 'bold', color: '#6B7280' },
  languageTextActive: { color: '#FFFFFF' },

  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#111827' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  settingsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    overflow: 'hidden',
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginLeft: 76,
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  modalBody: {
    paddingBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  detailLabel: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '400',
  },
  detailBadge: {
    backgroundColor: '#F3F4F6',
    color: '#6B7280',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },
  inputField: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111827',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#5B4BCA',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  aboutHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  aboutBrand: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111827',
    letterSpacing: 2,
    marginTop: 12,
    marginBottom: 4,
  },
  aboutVersion: {
    fontSize: 14,
    color: '#6B7280',
  },
});
