import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

type SettingsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'StudentSettings'>;
interface Props {
  navigation: SettingsNavigationProp;
}

export default function SettingsScreen({ navigation }: Props) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderSettingRow = (icon: string, title: string, value?: string, onPress?: () => void, isLast = false) => (
    <TouchableOpacity 
      style={[styles.settingRow, !isLast && styles.settingRowBorder]} 
      activeOpacity={0.7}
      onPress={onPress || (() => setActiveModal(title))}
    >
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons name={icon as any} size={20} color="#5B4BCA" />
      </View>
      <Text style={styles.settingTitle}>{title}</Text>
      <View style={styles.settingRight}>
        {value && <Text style={styles.settingValue}>{value}</Text>}
        <MaterialCommunityIcons name="chevron-right" size={20} color="#000000" />
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={{ flex: 1 }}>
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#E0E7FF" />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>ORYOL</Text>
        <View style={styles.headerRight}>
          <View style={styles.languageToggle}>
            <View style={styles.languageActive}><Text style={styles.langTextActive}>English</Text></View>
            <View style={styles.languageInactive}></View>
          </View>
          <MaterialCommunityIcons name="cog-outline" size={24} color="#A78BFA" style={{marginLeft: 12}} />
        </View>
      </View>

      <Text style={styles.pageTitle}>Settings</Text>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {renderSectionHeader('GENERAL')}
        <BlurView intensity={20} tint="dark" style={styles.cardGroup}>
          {renderSettingRow('web', 'Language', 'English')}
          {renderSettingRow('moon-waning-crescent', 'Dark Mode', 'Off')}
          {renderSettingRow('bell-outline', 'Push Notifications', 'On')}
          {renderSettingRow('clock-outline', 'Time Zone', 'IST (UTC+5:30)', undefined, true)}
        </BlurView>

        {renderSectionHeader('SCHOOL')}
        <BlurView intensity={20} tint="dark" style={styles.cardGroup}>
          {renderSettingRow('office-building-outline', 'School Name', 'ORYOL School')}
          {renderSettingRow('calendar-blank-outline', 'Academic Year', '2023-24')}
          {renderSettingRow('wallet-outline', 'Currency', 'INR (₹)')}
          {renderSettingRow('account-group-outline', 'Default Class', 'Class 1', undefined, true)}
        </BlurView>

        {renderSectionHeader('SECURITY')}
        <BlurView intensity={20} tint="dark" style={styles.cardGroup}>
          {renderSettingRow('lock-outline', 'Change Password')}
          {renderSettingRow('shield-outline', 'Two-Factor Auth', 'Disabled')}
          {renderSettingRow('cellphone', 'Trusted Devices', '2 devices', undefined, true)}
        </BlurView>

        {renderSectionHeader('DATA & STORAGE')}
        <BlurView intensity={20} tint="dark" style={styles.cardGroup}>
          {renderSettingRow('database-outline', 'Backup Data', 'Last: Today')}
          {renderSettingRow('download-outline', 'Export Reports')}
          {renderSettingRow('trash-can-outline', 'Clear Cache', '12 MB', undefined, true)}
        </BlurView>

        <BlurView intensity={20} tint="dark" style={styles.versionCard}>
          <View>
            <Text style={styles.versionTitle}>App Version</Text>
            <Text style={styles.versionSub}>v2.4.1 (Build 241)</Text>
          </View>
          <TouchableOpacity style={styles.updateButton} onPress={() => setActiveModal('Check Update')}>
            <Text style={styles.updateButtonText}>Check Update</Text>
          </TouchableOpacity>
        </BlurView>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <BlurView intensity={40} tint="dark" style={[styles.bottomTabBar, { borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)' }]}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentHome')}>
          <MaterialCommunityIcons name="home-outline" size={28} color="#94A3B8" />
          <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FeeSection')}>
          <MaterialCommunityIcons name="currency-inr" size={28} color="#94A3B8" />
          <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>Fee Management</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentNotices')}>
          <MaterialCommunityIcons name="bell-outline" size={28} color="#94A3B8" />
          <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentProfile')}>
          <MaterialCommunityIcons name="account-outline" size={28} color="#C4B5FD" style={{ textShadowColor: '#6D28D9', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 }} />
          <Text style={[styles.tabLabel, { color: '#6D28D9', textShadowColor: '#6D28D9', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 }]}>Profile</Text>
        </TouchableOpacity>
      </BlurView>

      {/* Basic Modal for interactions */}
      <Modal visible={activeModal !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setActiveModal(null)}>
            <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{activeModal}</Text>
            <Text style={styles.modalText}>Action for {activeModal} triggered.</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setActiveModal(null)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'transparent' },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  backButton: { marginRight: 16 },
  brandTitle: { fontSize: 20, fontWeight: '800', color: '#6D28D9', letterSpacing: 1, flex: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 16,
    height: 28,
    width: 90,
    alignItems: 'center',
    padding: 2,
  },
  languageActive: {
    backgroundColor: '#8B5CF6',
    borderRadius: 14,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageInactive: { flex: 1 },
  langTextActive: { color: '#F1F5F9', fontSize: 11, fontWeight: 'bold' },

  pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#F1F5F9', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  
  scrollContent: { paddingHorizontal: 20 },

  sectionHeader: { fontSize: 12, fontWeight: '700', color: '#94A3B8', marginTop: 16, marginBottom: 8, letterSpacing: 0.5 },

  cardGroup: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTitle: { fontSize: 15, color: '#F8FAFC', flex: 1, fontWeight: '500' },
  settingRight: { flexDirection: 'row', alignItems: 'center' },
  settingValue: { fontSize: 13, color: '#94A3B8', marginRight: 8 },

  versionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  versionTitle: { fontSize: 15, fontWeight: 'bold', color: '#F8FAFC' },
  versionSub: { fontSize: 13, color: '#94A3B8', marginTop: 2 },
  updateButton: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  updateButtonText: { color: '#6D28D9', fontSize: 12, fontWeight: 'bold' },

  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.5)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 4, fontWeight: '500' },

  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#1E293B', borderRadius: 16, padding: 24, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: '#8B5CF6' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#F1F5F9', marginBottom: 8 },
  modalText: { fontSize: 14, color: '#94A3B8', marginBottom: 20 },
  closeButton: { backgroundColor: 'rgba(139, 92, 246, 0.2)', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: '#8B5CF6' },
  closeButtonText: { color: '#F1F5F9', fontWeight: 'bold' },
});
