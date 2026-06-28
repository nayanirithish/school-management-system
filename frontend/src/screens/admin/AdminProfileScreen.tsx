import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type AdminProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminProfile'>;
interface Props {
  navigation: AdminProfileNavigationProp;
}

export default function AdminProfileScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialCommunityIcons name="menu" size={28} color="#111827" />
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
        
        {/* Profile Info Card */}
        <View style={styles.profileCard}>
           <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatar} />
           <View style={styles.profileInfo}>
              <Text style={styles.userName}>Admin User</Text>
              <Text style={styles.userRole}>School Administrator</Text>
              <Text style={styles.userDetail}>admin@oryol.com</Text>
              <Text style={styles.userDetail}>+91 98765 43210</Text>
           </View>
        </View>

        {/* Menu Options Group 1 */}
        <View style={styles.menuGroup}>
           <TouchableOpacity style={styles.menuItem}>
              <MaterialCommunityIcons name="account-outline" size={24} color="#4B5563" style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Personal Information</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#111827" />
           </TouchableOpacity>
           
           <TouchableOpacity style={styles.menuItem}>
              <MaterialCommunityIcons name="lock-outline" size={24} color="#4B5563" style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Change Password</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#111827" />
           </TouchableOpacity>

           <TouchableOpacity style={styles.menuItem}>
              <MaterialCommunityIcons name="bell-outline" size={24} color="#4B5563" style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Notification Settings</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#111827" />
           </TouchableOpacity>

           <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
              <MaterialCommunityIcons name="web" size={24} color="#4B5563" style={styles.menuIcon} />
              <Text style={styles.menuItemText}>Language</Text>
              <Text style={styles.languageText}>English</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#111827" />
           </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('Login')}>
           <MaterialCommunityIcons name="logout" size={24} color="#EF4444" style={styles.menuIcon} />
           <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

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
        <TouchableOpacity style={styles.tabItem}>
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
  menuButton: { marginRight: 16 },
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

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
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
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#E5E7EB', marginRight: 16 },
  profileInfo: { flex: 1 },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  userRole: { fontSize: 13, color: '#6B7280', marginBottom: 4 },
  userDetail: { fontSize: 13, color: '#6B7280' },

  menuGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
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
  menuIcon: { marginRight: 16 },
  menuItemText: { flex: 1, fontSize: 15, color: '#111827', fontWeight: '500' },
  languageText: { fontSize: 13, color: '#6B7280', marginRight: 8 },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutText: { flex: 1, fontSize: 15, color: '#EF4444', fontWeight: 'bold' },

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
