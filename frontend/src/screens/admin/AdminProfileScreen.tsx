import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

type AdminProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminProfile'>;
interface Props {
  navigation: AdminProfileNavigationProp;
}

export default function AdminProfileScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <TouchableOpacity style={styles.menuButton} onPress={() => setIsDrawerOpen(true)}>
            <MaterialCommunityIcons name="menu" size={28} color="#E0E7FF" />
          </TouchableOpacity>
          <Text style={styles.brandTitle}>ORYOL</Text>
          <View style={styles.appBarRight}>
            <View style={styles.languageToggle}>
              <TouchableOpacity onPress={() => setIsTelugu(false)} style={!isTelugu ? styles.languageActive : styles.languageInactive}>
                <Text style={!isTelugu ? styles.langTextActive : styles.langTextInactive}>EN</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsTelugu(true)} style={isTelugu ? styles.languageActive : styles.languageInactive}>
                <Text style={isTelugu ? styles.langTextActive : styles.langTextInactive}>TE</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => navigation.navigate('AdminSettings' as any)}>
              <MaterialCommunityIcons name="cog-outline" size={24} color="#A78BFA" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Profile Info Card */}
          <BlurView intensity={20} tint="dark" style={styles.profileCard}>
             <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatar} />
             <View style={styles.profileInfo}>
                <Text style={styles.userName}>Admin User</Text>
                <Text style={styles.userRole}>School Administrator</Text>
                <Text style={styles.userDetail}>admin@oryol.com</Text>
                <Text style={styles.userDetail}>+91 98765 43210</Text>
             </View>
          </BlurView>

          {/* Menu Options Group 1 */}
          <BlurView intensity={20} tint="dark" style={styles.menuGroup}>
             <TouchableOpacity style={styles.menuItem}>
                <MaterialCommunityIcons name="account-outline" size={24} color="#A78BFA" style={styles.menuIcon} />
                <Text style={styles.menuItemText}>{isTelugu ? 'వ్యక్తిగత సమాచారం' : 'Personal Information'}</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#94A3B8" />
             </TouchableOpacity>
             
             <TouchableOpacity style={styles.menuItem}>
                <MaterialCommunityIcons name="lock-outline" size={24} color="#A78BFA" style={styles.menuIcon} />
                <Text style={styles.menuItemText}>{isTelugu ? 'పాస్‌వర్డ్ మార్చండి' : 'Change Password'}</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#94A3B8" />
             </TouchableOpacity>

             <TouchableOpacity style={styles.menuItem}>
                <MaterialCommunityIcons name="bell-outline" size={24} color="#A78BFA" style={styles.menuIcon} />
                <Text style={styles.menuItemText}>{isTelugu ? 'నోటిఫికేషన్ సెట్టింగ్‌లు' : 'Notification Settings'}</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#94A3B8" />
             </TouchableOpacity>

             <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
                <MaterialCommunityIcons name="web" size={24} color="#A78BFA" style={styles.menuIcon} />
                <Text style={styles.menuItemText}>{isTelugu ? 'భాష' : 'Language'}</Text>
                <Text style={styles.languageText}>{isTelugu ? 'తెలుగు' : 'English'}</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#94A3B8" />
             </TouchableOpacity>
          </BlurView>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.replace('Login')}>
             <MaterialCommunityIcons name="logout" size={24} color="#F87171" style={styles.menuIcon} />
             <Text style={styles.logoutText}>{isTelugu ? 'లాగ్ అవుట్' : 'Logout'}</Text>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar */}
        <BlurView intensity={40} tint="dark" style={styles.bottomTabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminFeeManagement')}>
            <MaterialCommunityIcons name="receipt" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Fee{'\n'}Mgmt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Notice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons name="account" size={28} color="#A78BFA" />
            <Text style={[styles.tabLabel, { color: '#A78BFA' }]}>Profile</Text>
          </TouchableOpacity>
        </BlurView>

      </SafeAreaView>

        {/* Drawer Modal */}
        {isDrawerOpen && (
          <View style={[StyleSheet.absoluteFill, { zIndex: 100 }]}>
            <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setIsDrawerOpen(false)}>
              <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
            </TouchableOpacity>
            <View style={styles.drawerContainer}>
              <LinearGradient colors={['#1E293B', '#0F172A']} style={styles.drawerGradient}>
                <View style={styles.drawerHeader}>
                  <Text style={styles.drawerTitle}>Admin Menu</Text>
                  <TouchableOpacity onPress={() => setIsDrawerOpen(false)}>
                    <MaterialCommunityIcons name="close" size={28} color="#E0E7FF" />
                  </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.drawerScroll}>
                  <TouchableOpacity style={styles.drawerItem} onPress={() => { setIsDrawerOpen(false); navigation.navigate('AdminStudentManagement' as any); }}>
                    <MaterialCommunityIcons name="account-group-outline" size={24} color="#A78BFA" style={styles.drawerItemIcon} />
                    <Text style={styles.drawerItemText}>Student Management</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerItem} onPress={() => { setIsDrawerOpen(false); navigation.navigate('AdminFacultyManagement' as any); }}>
                    <MaterialCommunityIcons name="human-male-board" size={24} color="#A78BFA" style={styles.drawerItemIcon} />
                    <Text style={styles.drawerItemText}>Faculty Management</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerItem} onPress={() => { setIsDrawerOpen(false); navigation.navigate('AdminComplaintManagement' as any); }}>
                    <MaterialCommunityIcons name="alert-circle-outline" size={24} color="#A78BFA" style={styles.drawerItemIcon} />
                    <Text style={styles.drawerItemText}>Complaint Management</Text>
                  </TouchableOpacity>
                </ScrollView>
              </LinearGradient>
            </View>
          </View>
        )}

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center' },
  
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  menuButton: { marginRight: 16 },
  brandTitle: { fontSize: 22, fontWeight: '900', color: '#F8FAFC', flex: 1, letterSpacing: 0.5 },
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
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

  scrollContent: { paddingHorizontal: 16, paddingTop: 16 },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#334155', marginRight: 16 },
  profileInfo: { flex: 1 },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 4 },
  userRole: { fontSize: 13, color: '#94A3B8', marginBottom: 4 },
  userDetail: { fontSize: 13, color: '#64748B' },

  menuGroup: {
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  menuIcon: { marginRight: 16 },
  menuItemText: { flex: 1, fontSize: 15, color: '#E2E8F0', fontWeight: '500' },
  languageText: { fontSize: 13, color: '#94A3B8', marginRight: 8 },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  logoutText: { flex: 1, fontSize: 15, color: '#F87171', fontWeight: 'bold' },

  bottomTabBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)', position: 'absolute', bottom: 0, width: '100%' },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 10, color: '#94A3B8', marginTop: 4, fontWeight: '500', textAlign: 'center' },

  drawerContainer: { width: '75%', height: '100%', borderRightWidth: 1, borderColor: 'rgba(255,255,255,0.1)', shadowColor: '#000', shadowOffset: { width: 5, height: 0 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 20 },
  drawerGradient: { flex: 1 },
  drawerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  drawerTitle: { fontSize: 20, fontWeight: 'bold', color: '#F8FAFC' },
  drawerScroll: { paddingVertical: 10 },
  drawerItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  drawerItemIcon: { marginRight: 16 },
  drawerItemText: { fontSize: 16, color: '#E2E8F0', fontWeight: '500' },
});
