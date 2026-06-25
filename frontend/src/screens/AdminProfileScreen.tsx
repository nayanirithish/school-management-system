import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Modal,
  TextInput,
  Switch
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import GlassBackground from '../components/GlassBackground';
import GlassCard from '../components/GlassCard';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

type AdminProfileProp = NativeStackNavigationProp<RootStackParamList, 'AdminProfile'>;
interface Props {
  navigation: AdminProfileProp;
}

export default function AdminProfileScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // States for Notification Settings
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <GlassCard style={styles.appBar} intensity={isDark ? 40 : 80} styleOverride={{ borderRadius: 0, borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="menu" size={28} color={isDark ? "#FFFFFF" : "#111827"} />
          </TouchableOpacity>
          <Text style={[styles.brandTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>ORYOL</Text>
          <View style={styles.appBarRight}>
             <ThemeToggle />
          </View>
        </GlassCard>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Profile Header */}
          <View style={styles.profileHeader}>
             <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatar} />
             <View style={styles.profileInfo}>
                <Text style={[styles.profileName, { color: isDark ? '#FFFFFF' : '#111827' }]}>Admin User</Text>
                <Text style={[styles.profileRole, { color: isDark ? '#94a3b8' : '#64748b' }]}>School Administrator</Text>
                <Text style={[styles.profileContact, { color: isDark ? '#64748b' : '#94a3b8' }]}>admin@oryol.com</Text>
                <Text style={[styles.profileContact, { color: isDark ? '#64748b' : '#94a3b8' }]}>+91 98765 43210</Text>
             </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
             <TouchableOpacity style={styles.menuCardWrapper} onPress={() => setActiveModal('personal')}>
                <GlassCard style={styles.menuCard} intensity={isDark ? 20 : 70} styleOverride={{ borderRadius: 24 }}>
                   <View style={styles.menuIconCircle}>
                      <MaterialCommunityIcons name="account-outline" size={24} color={isDark ? "#38bdf8" : "#5B4BCA"} />
                   </View>
                   <Text style={[styles.menuText, { color: isDark ? '#FFFFFF' : '#111827' }]}>Personal Information</Text>
                   <MaterialCommunityIcons name="chevron-right" size={24} color="#94a3b8" />
                </GlassCard>
             </TouchableOpacity>

             <TouchableOpacity style={styles.menuCardWrapper} onPress={() => setActiveModal('password')}>
                <GlassCard style={styles.menuCard} intensity={isDark ? 20 : 70} styleOverride={{ borderRadius: 24 }}>
                   <View style={styles.menuIconCircle}>
                      <MaterialCommunityIcons name="lock-outline" size={24} color={isDark ? "#38bdf8" : "#5B4BCA"} />
                   </View>
                   <Text style={[styles.menuText, { color: isDark ? '#FFFFFF' : '#111827' }]}>Change Password</Text>
                   <MaterialCommunityIcons name="chevron-right" size={24} color="#94a3b8" />
                </GlassCard>
             </TouchableOpacity>

             <TouchableOpacity style={styles.menuCardWrapper} onPress={() => setActiveModal('notifications')}>
                <GlassCard style={styles.menuCard} intensity={isDark ? 20 : 70} styleOverride={{ borderRadius: 24 }}>
                   <View style={styles.menuIconCircle}>
                      <MaterialCommunityIcons name="bell-outline" size={24} color={isDark ? "#38bdf8" : "#5B4BCA"} />
                   </View>
                   <Text style={[styles.menuText, { color: isDark ? '#FFFFFF' : '#111827' }]}>Notification Settings</Text>
                   <MaterialCommunityIcons name="chevron-right" size={24} color="#94a3b8" />
                </GlassCard>
             </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity 
             style={styles.logoutButton}
             onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
          >
             <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* --- MODALS --- */}
        
        {/* Personal Info Modal */}
        <Modal visible={activeModal === 'personal'} transparent animationType="fade">
          <View style={{ flex: 1 }}>
            <View style={styles.modalBackdrop} />
            <View style={styles.modalOverlay}>
              <View style={styles.modalContentWrapper}>
                 <GlassCard intensity={isDark ? 50 : 90} style={styles.modalContent} styleOverride={{ borderRadius: 24 }}>
                 <View style={styles.modalHeader}>
                    <Text style={[styles.modalTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Personal Information</Text>
                    <TouchableOpacity onPress={() => setActiveModal(null)}>
                       <MaterialCommunityIcons name="close" size={24} color={isDark ? "#FFFFFF" : "#111827"} />
                    </TouchableOpacity>
                 </View>

                 <Text style={styles.inputLabel}>Full Name</Text>
                 <View style={styles.inputWrapper}>
                    <GlassCard intensity={isDark ? 20 : 60} style={styles.inputGlass} styleOverride={{ borderRadius: 12 }}>
                       <TextInput style={[styles.inputField, { color: isDark ? '#FFFFFF' : '#111827' }]} defaultValue="Admin User" placeholderTextColor="#9CA3AF" />
                    </GlassCard>
                 </View>

                 <Text style={styles.inputLabel}>Email Address</Text>
                 <View style={styles.inputWrapper}>
                    <GlassCard intensity={isDark ? 20 : 60} style={styles.inputGlass} styleOverride={{ borderRadius: 12 }}>
                       <TextInput style={[styles.inputField, { color: isDark ? '#FFFFFF' : '#111827' }]} defaultValue="admin@oryol.com" placeholderTextColor="#9CA3AF" keyboardType="email-address" />
                    </GlassCard>
                 </View>

                 <Text style={styles.inputLabel}>Phone Number</Text>
                 <View style={styles.inputWrapper}>
                    <GlassCard intensity={isDark ? 20 : 60} style={styles.inputGlass} styleOverride={{ borderRadius: 12 }}>
                       <TextInput style={[styles.inputField, { color: isDark ? '#FFFFFF' : '#111827' }]} defaultValue="+91 98765 43210" placeholderTextColor="#9CA3AF" keyboardType="phone-pad" />
                    </GlassCard>
                 </View>

                 <TouchableOpacity 
                    style={styles.submitButtonWrapper}
                    onPress={() => setActiveModal(null)}
                 >
                    <LinearGradient colors={isDark ? ['#38bdf8', '#0284c7'] : ['#4f46e5', '#3730a3']} style={styles.submitButtonGradient}>
                       <Text style={styles.submitButtonText}>Save Changes</Text>
                    </LinearGradient>
                 </TouchableOpacity>
               </GlassCard>
             </View>
            </View>
          </View>
        </Modal>

        {/* Change Password Modal */}
        <Modal visible={activeModal === 'password'} transparent animationType="fade">
          <View style={{ flex: 1 }}>
            <View style={styles.modalBackdrop} />
            <View style={styles.modalOverlay}>
              <View style={styles.modalContentWrapper}>
                 <GlassCard intensity={isDark ? 50 : 90} style={styles.modalContent} styleOverride={{ borderRadius: 24 }}>
                 <View style={styles.modalHeader}>
                    <Text style={[styles.modalTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Change Password</Text>
                    <TouchableOpacity onPress={() => setActiveModal(null)}>
                       <MaterialCommunityIcons name="close" size={24} color={isDark ? "#FFFFFF" : "#111827"} />
                    </TouchableOpacity>
                 </View>

                 <Text style={styles.inputLabel}>Current Password</Text>
                 <View style={styles.inputWrapper}>
                    <GlassCard intensity={isDark ? 20 : 60} style={styles.inputGlass} styleOverride={{ borderRadius: 12 }}>
                       <TextInput style={[styles.inputField, { color: isDark ? '#FFFFFF' : '#111827' }]} placeholder="Enter current password" secureTextEntry placeholderTextColor="#9CA3AF" />
                    </GlassCard>
                 </View>

                 <Text style={styles.inputLabel}>New Password</Text>
                 <View style={styles.inputWrapper}>
                    <GlassCard intensity={isDark ? 20 : 60} style={styles.inputGlass} styleOverride={{ borderRadius: 12 }}>
                       <TextInput style={[styles.inputField, { color: isDark ? '#FFFFFF' : '#111827' }]} placeholder="Enter new password" secureTextEntry placeholderTextColor="#9CA3AF" />
                    </GlassCard>
                 </View>

                 <Text style={styles.inputLabel}>Confirm New Password</Text>
                 <View style={styles.inputWrapper}>
                    <GlassCard intensity={isDark ? 20 : 60} style={styles.inputGlass} styleOverride={{ borderRadius: 12 }}>
                       <TextInput style={[styles.inputField, { color: isDark ? '#FFFFFF' : '#111827' }]} placeholder="Confirm new password" secureTextEntry placeholderTextColor="#9CA3AF" />
                    </GlassCard>
                 </View>

                 <TouchableOpacity 
                    style={styles.submitButtonWrapper}
                    onPress={() => setActiveModal(null)}
                 >
                    <LinearGradient colors={isDark ? ['#38bdf8', '#0284c7'] : ['#4f46e5', '#3730a3']} style={styles.submitButtonGradient}>
                       <Text style={styles.submitButtonText}>Update Password</Text>
                    </LinearGradient>
                 </TouchableOpacity>
               </GlassCard>
             </View>
            </View>
          </View>
        </Modal>

        {/* Notification Settings Modal */}
        <Modal visible={activeModal === 'notifications'} transparent animationType="fade">
          <View style={{ flex: 1 }}>
            <View style={styles.modalBackdrop} />
            <View style={styles.modalOverlay}>
              <View style={styles.modalContentWrapper}>
                 <GlassCard intensity={isDark ? 50 : 90} style={styles.modalContent} styleOverride={{ borderRadius: 24 }}>
                 <View style={styles.modalHeader}>
                    <Text style={[styles.modalTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Notification Settings</Text>
                    <TouchableOpacity onPress={() => setActiveModal(null)}>
                       <MaterialCommunityIcons name="close" size={24} color={isDark ? "#FFFFFF" : "#111827"} />
                    </TouchableOpacity>
                 </View>

                 <View style={styles.switchRow}>
                    <Text style={[styles.switchLabel, { color: isDark ? '#FFFFFF' : '#111827' }]}>Push Notifications</Text>
                    <Switch 
                       value={pushEnabled} 
                       onValueChange={setPushEnabled}
                       trackColor={{ false: '#d1d5db', true: isDark ? '#38bdf8' : '#5B4BCA' }}
                       thumbColor="#FFFFFF"
                    />
                 </View>

                 <View style={styles.switchRow}>
                    <Text style={[styles.switchLabel, { color: isDark ? '#FFFFFF' : '#111827' }]}>Email Notifications</Text>
                    <Switch 
                       value={emailEnabled} 
                       onValueChange={setEmailEnabled}
                       trackColor={{ false: '#d1d5db', true: isDark ? '#38bdf8' : '#5B4BCA' }}
                       thumbColor="#FFFFFF"
                    />
                 </View>

                 <View style={styles.switchRow}>
                    <Text style={[styles.switchLabel, { color: isDark ? '#FFFFFF' : '#111827' }]}>SMS Alerts</Text>
                    <Switch 
                       value={smsEnabled} 
                       onValueChange={setSmsEnabled}
                       trackColor={{ false: '#d1d5db', true: isDark ? '#38bdf8' : '#5B4BCA' }}
                       thumbColor="#FFFFFF"
                    />
                 </View>

                 <TouchableOpacity 
                    style={[styles.submitButtonWrapper, { marginTop: 24 }]}
                    onPress={() => setActiveModal(null)}
                 >
                    <LinearGradient colors={isDark ? ['#38bdf8', '#0284c7'] : ['#4f46e5', '#3730a3']} style={styles.submitButtonGradient}>
                       <Text style={styles.submitButtonText}>Save Preferences</Text>
                    </LinearGradient>
                 </TouchableOpacity>
               </GlassCard>
             </View>
            </View>
          </View>
        </Modal>

        {/* Bottom Tab Bar (Glassmorphic) */}
        <GlassCard intensity={isDark ? 60 : 90} style={styles.bottomTabBar} styleOverride={{ borderRadius: 0, borderTopWidth: 1, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminFeeManagement')}>
            <MaterialCommunityIcons name="receipt" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Fee</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Notices</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons name="account" size={28} color={isDark ? "#38bdf8" : "#5B4BCA"} />
            <Text style={[styles.tabLabel, { color: isDark ? '#38bdf8' : '#5B4BCA' }]}>Profile</Text>
          </TouchableOpacity>
        </GlassCard>

      </SafeAreaView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center' },
  
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  brandTitle: { fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  appBarRight: { flexDirection: 'row', alignItems: 'center' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 100 },

  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(156,163,175,0.2)',
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 14,
    marginBottom: 4,
  },
  profileContact: {
    fontSize: 13,
    marginBottom: 2,
  },

  menuContainer: {
    marginBottom: 16,
  },
  menuCardWrapper: {
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
  menuValueText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginRight: 8,
  },

  logoutButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ef4444',
  },

  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 5,
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 4, fontWeight: '500' },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContentWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  modalContent: {
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  
  inputLabel: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputGlass: {
    padding: 0,
  },
  inputField: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
  },

  submitButtonWrapper: {
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  submitButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
  }
});
