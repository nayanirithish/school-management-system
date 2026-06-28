import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type AdminSettingsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminSettings'>;
interface Props {
  navigation: AdminSettingsNavigationProp;
}

export default function AdminSettingsScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();

  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderMenuItem = (icon: string, title: string, value?: string, isLast = false) => (
    <TouchableOpacity style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]}>
       <View style={styles.menuIconContainer}>
         <MaterialCommunityIcons name={icon as any} size={22} color="#4F46E5" />
       </View>
       <Text style={styles.menuItemText}>{title}</Text>
       {value && <Text style={styles.menuItemValue}>{value}</Text>}
       <MaterialCommunityIcons name="chevron-right" size={24} color="#111827" />
    </TouchableOpacity>
  );

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
        
        <Text style={styles.pageTitle}>Settings</Text>

        {renderSectionHeader('GENERAL')}
        <View style={styles.menuGroup}>
           {renderMenuItem('web', 'Language', 'English')}
           {renderMenuItem('moon-waning-crescent', 'Dark Mode', 'Off')}
           {renderMenuItem('bell-outline', 'Push Notifications', 'On')}
           {renderMenuItem('clock-outline', 'Time Zone', 'IST (UTC+5:30)', true)}
        </View>

        {renderSectionHeader('SCHOOL')}
        <View style={styles.menuGroup}>
           {renderMenuItem('office-building-outline', 'School Name', 'ORYOL School')}
           {renderMenuItem('calendar-blank-outline', 'Academic Year', '2023-24')}
           {renderMenuItem('wallet-outline', 'Currency', 'INR (₹)')}
           {renderMenuItem('account-group-outline', 'Default Class', 'Class 1', true)}
        </View>

        {renderSectionHeader('SECURITY')}
        <View style={styles.menuGroup}>
           {renderMenuItem('lock-outline', 'Change Password')}
           {renderMenuItem('shield-outline', 'Two-Factor Auth', 'Disabled')}
           {renderMenuItem('cellphone', 'Trusted Devices', '2 devices', true)}
        </View>

        {renderSectionHeader('DATA & STORAGE')}
        <View style={styles.menuGroup}>
           {renderMenuItem('database-outline', 'Backup Data', 'Last: Today')}
           {renderMenuItem('download-outline', 'Export Reports')}
           {renderMenuItem('delete-outline', 'Clear Cache', '12 MB', true)}
        </View>

        {/* App Version */}
        <View style={styles.versionCard}>
           <View>
              <Text style={styles.versionTitle}>App Version</Text>
              <Text style={styles.versionSubtitle}>v2.4.1 (Build 241)</Text>
           </View>
           <TouchableOpacity style={styles.updateButton}>
              <Text style={styles.updateButtonText}>Check Update</Text>
           </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminHome')}>
          <MaterialCommunityIcons name="home-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Home</Text>
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
          <MaterialCommunityIcons name="account" size={28} color="#4F46E5" />
          <Text style={[styles.tabLabel, { color: '#4F46E5' }]}>Profile</Text>
        </TouchableOpacity>
      </View>

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

  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 20 },

  sectionHeader: { fontSize: 12, fontWeight: 'bold', color: '#6B7280', marginBottom: 8, marginLeft: 4, letterSpacing: 0.5 },
  menuGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: { flex: 1, fontSize: 15, color: '#111827', fontWeight: '500' },
  menuItemValue: { fontSize: 13, color: '#6B7280', marginRight: 8 },

  versionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  versionTitle: { fontSize: 15, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  versionSubtitle: { fontSize: 12, color: '#6B7280' },
  updateButton: { backgroundColor: '#EEF2FF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16 },
  updateButtonText: { fontSize: 12, fontWeight: 'bold', color: '#4F46E5' },

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
});
