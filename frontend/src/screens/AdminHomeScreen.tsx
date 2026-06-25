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
  Platform, 
  UIManager, 
  TextInput 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useAdmin } from '../context/AdminContext';
import GlassBackground from '../components/GlassBackground';
import GlassCard from '../components/GlassCard';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

type AdminHomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminHome'>;
interface Props {
  navigation: AdminHomeNavigationProp;
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function AdminHomeScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  const isTelugu = false; 

  const { 
    todaysRevenue, 
    monthlyRevenue, 
    facultyActive, 
    studentsActive, 
    busDriversActive 
  } = useAdmin();
  
  // Modals state
  const [showDrawer, setShowDrawer] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const quickAccessItems = [
    { id: 1, titleEN: 'Student Management', titleTE: 'విద్యార్థి నిర్వహణ', icon: 'account-group-outline', color: '#60a5fa', action: () => navigation.navigate('AdminStudentManagement') },
    { id: 2, titleEN: 'Faculty Management', titleTE: 'ఫ్యాకల్టీ నిర్వహణ', icon: 'account-tie-outline', color: '#38bdf8', action: () => navigation.navigate('AdminFacultyManagement') },
    { id: 3, titleEN: 'Fee Management', titleTE: 'ఫీజు నిర్వహణ', icon: 'receipt', color: '#34d399', action: () => navigation.navigate('AdminFeeManagement') },
    { id: 4, titleEN: 'Notices', titleTE: 'నోటీసులు', icon: 'bell-outline', color: '#fbbf24', action: () => navigation.navigate('AdminNotices') },
    { id: 5, titleEN: 'Reports', titleTE: 'నివేదికలు', icon: 'chart-bar', color: '#a78bfa', action: () => navigation.navigate('AdminReports') },
    { id: 6, titleEN: 'Classes', titleTE: 'తరగతులు', icon: 'book-open-variant', color: '#f472b6', action: () => navigation.navigate('AdminClasses') },
    { id: 7, titleEN: 'Subjects', titleTE: 'సబ్జెక్టులు', icon: 'book-outline', color: '#2dd4bf', action: () => navigation.navigate('AdminSubjects') },
    { id: 8, titleEN: 'Settings', titleTE: 'సెట్టింగ్‌లు', icon: 'cog-outline', color: '#94a3b8', action: () => setShowSettings(true) },
  ];

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <GlassCard style={styles.appBar} intensity={isDark ? 40 : 80} styleOverride={{ borderRadius: 0, borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}>
          <TouchableOpacity onPress={() => setShowDrawer(true)}>
            <MaterialCommunityIcons name="menu" size={28} color={isDark ? "#FFFFFF" : "#111827"} />
          </TouchableOpacity>
          <Text style={[styles.brandTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>ORYOL</Text>
          <View style={styles.appBarRight}>
            <ThemeToggle />
            <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => setShowSettings(true)}>
              <MaterialCommunityIcons name="cog-outline" size={24} color={isDark ? "#D1D5DB" : "#6B7280"} />
            </TouchableOpacity>
          </View>
        </GlassCard>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.headerInfo}>
              <Text style={[styles.greetingText, { color: isDark ? '#94a3b8' : '#64748b' }]}>{isTelugu ? 'శుభోదయం,' : 'Good Morning,'}</Text>
              <Text style={[styles.userName, { color: isDark ? '#FFFFFF' : '#111827' }]}>{isTelugu ? 'అడ్మిన్ యూజర్' : 'Admin User'}</Text>
              <Text style={[styles.welcomeText, { color: isDark ? '#64748b' : '#94a3b8' }]}>{isTelugu ? 'ORYOLకి స్వాగతం' : 'Welcome back to ORYOL'}</Text>
            </View>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
                style={styles.avatarImage} 
              />
            </View>
          </View>

          {/* Today's Overview Widget */}
          <View style={styles.overviewWrapper}>
             <GlassCard style={styles.overviewContainer} intensity={isDark ? 20 : 60}>
               <View style={styles.overviewHeader}>
                 <Text style={[styles.overviewTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>{isTelugu ? 'నేటి అవలోకనం' : "Today's Overview"}</Text>
                 <TouchableOpacity style={styles.reportButton} onPress={() => navigation.navigate('AdminReports')}>
                   <Text style={styles.reportButtonText}>{isTelugu ? 'రిపోర్ట్ చూడండి' : 'View Report'}</Text>
                 </TouchableOpacity>
               </View>

               <View style={styles.statsGrid}>
                 <View style={styles.statCardHalf}>
                   <GlassCard intensity={isDark ? 20 : 80} style={styles.statCardInner} styleOverride={{ borderRadius: 16 }}>
                      <Text style={[styles.statLabel, { color: isDark ? '#94a3b8' : '#475569' }]}>{isTelugu ? 'నేటి ఆదాయం' : "Today's Revenue"}</Text>
                      <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#111827' }]}>₹{todaysRevenue.toLocaleString('en-IN')}</Text>
                   </GlassCard>
                 </View>
                 <View style={styles.statCardHalf}>
                   <GlassCard intensity={isDark ? 20 : 80} style={styles.statCardInner} styleOverride={{ borderRadius: 16 }}>
                      <Text style={[styles.statLabel, { color: isDark ? '#94a3b8' : '#475569' }]}>{isTelugu ? 'నెల ఆదాయం' : 'Monthly Revenue'}</Text>
                      <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#111827' }]}>₹{(monthlyRevenue / 100000).toFixed(1)}L</Text>
                   </GlassCard>
                 </View>
                 
                 <View style={styles.statCardHalf}>
                   <GlassCard intensity={isDark ? 20 : 80} style={styles.statCardInner} styleOverride={{ borderRadius: 16 }}>
                      <Text style={[styles.statLabel, { color: isDark ? '#94a3b8' : '#475569' }]}>{isTelugu ? 'ఫ్యాకల్టీ యాక్టివ్' : 'Faculty Active'}</Text>
                      <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#111827' }]}>{facultyActive}/45</Text>
                   </GlassCard>
                 </View>
                 <View style={styles.statCardHalf}>
                   <GlassCard intensity={isDark ? 20 : 80} style={styles.statCardInner} styleOverride={{ borderRadius: 16 }}>
                      <Text style={[styles.statLabel, { color: isDark ? '#94a3b8' : '#475569' }]}>{isTelugu ? 'విద్యార్థులు యాక్టివ్' : 'Students Active'}</Text>
                      <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#111827' }]}>{studentsActive}/950</Text>
                   </GlassCard>
                 </View>
                 
                 <View style={styles.statCardFull}>
                   <GlassCard intensity={isDark ? 20 : 80} style={styles.statCardInner} styleOverride={{ borderRadius: 16 }}>
                      <Text style={[styles.statLabel, { color: isDark ? '#94a3b8' : '#475569' }]}>{isTelugu ? 'బస్సు డ్రైవర్లు యాక్టివ్' : 'Bus Drivers Active'}</Text>
                      <View style={styles.rowCentered}>
                         <MaterialCommunityIcons name="bus" size={24} color="#60a5fa" style={{marginRight: 8}} />
                         <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#111827' }]}>{busDriversActive}/12</Text>
                      </View>
                   </GlassCard>
                 </View>
               </View>
             </GlassCard>
          </View>

          {/* Quick Access */}
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>{isTelugu ? 'శీఘ్ర ప్రాప్యత' : 'Quick Access'}</Text>
          <View style={styles.quickAccessGrid}>
            {quickAccessItems.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.quickAccessItem} 
                activeOpacity={0.7}
                onPress={() => item.action && item.action()}
              >
                <GlassCard intensity={isDark ? 30 : 60} style={[styles.quickAccessIconBg, { borderColor: item.color + (isDark ? '40' : '80') }]} styleOverride={{ borderRadius: 30 }}>
                  <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
                </GlassCard>
                <Text style={[styles.quickAccessText, { color: isDark ? '#D1D5DB' : '#4B5563' }]} numberOfLines={2}>
                  {isTelugu ? item.titleTE : item.titleEN}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar */}
        <GlassCard intensity={isDark ? 60 : 90} style={styles.bottomTabBar} styleOverride={{ borderRadius: 0, borderTopWidth: 1, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons name="home" size={28} color={isDark ? "#38bdf8" : "#5B4BCA"} />
            <Text style={[styles.tabLabel, { color: isDark ? '#38bdf8' : '#5B4BCA' }]}>{isTelugu ? 'హోమ్' : 'Home'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminFeeManagement')}>
            <MaterialCommunityIcons name="receipt" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'ఫీజు నిర్వహణ' : 'Fee Mgmt'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'నోటిఫికేషన్' : 'Notices'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminProfile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
          </TouchableOpacity>
        </GlassCard>

        <Modal visible={showDrawer} transparent animationType="fade">
          <View style={{ flex: 1 }}>
             <View style={styles.modalBackdrop} />
             
             <View style={styles.drawerOverlay}>
               <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowDrawer(false)} activeOpacity={1} />
               
               <View style={styles.drawerContainerWrapper}>
               <GlassCard intensity={isDark ? 50 : 90} style={styles.drawerContent} styleOverride={{ borderRadius: 0, borderRightWidth: 1, borderRightColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                  <View style={styles.drawerHeader}>
                     <Text style={[styles.brandTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>ORYOL</Text>
                     <TouchableOpacity onPress={() => setShowDrawer(false)}>
                        <MaterialCommunityIcons name="close" size={24} color={isDark ? "#FFFFFF" : "#111827"} />
                     </TouchableOpacity>
                  </View>

                  <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                     {quickAccessItems.map(item => (
                       <TouchableOpacity 
                         key={item.id} 
                         style={[styles.drawerItem, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)' }]}
                         onPress={() => {
                           setShowDrawer(false);
                           if (item.action) item.action();
                         }}
                       >
                         <View style={[styles.drawerIconBgCard, { backgroundColor: item.color + '20' }]}>
                            <MaterialCommunityIcons name={item.icon as any} size={22} color={item.color} />
                         </View>
                         <Text style={[styles.drawerItemText, { color: isDark ? '#FFFFFF' : '#111827' }]}>{isTelugu ? item.titleTE : item.titleEN}</Text>
                       </TouchableOpacity>
                     ))}
                  </ScrollView>
               </GlassCard>
             </View>
          </View>
        </View>
        </Modal>

        {/* Settings Center Modal */}
        <Modal visible={showSettings} transparent animationType="fade">
          <View style={{ flex: 1 }}>
             <View style={styles.modalBackdrop} />
             
             <View style={styles.centerModalOverlay}>
               <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowSettings(false)} activeOpacity={1} />
               
               <View style={styles.centerModalContentWrapper}>
               <GlassCard intensity={isDark ? 50 : 90} style={styles.centerModalContent} styleOverride={{ borderRadius: 24 }}>
                  <Text style={[styles.centerModalTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>{isTelugu ? 'సెట్టింగ్‌లు' : 'Settings'}</Text>
                  
                  <TouchableOpacity style={styles.settingsOption} onPress={() => { setShowSettings(false); navigation.navigate('AdminProfile'); }}>
                     <MaterialCommunityIcons name="account-edit-outline" size={24} color={isDark ? "#60a5fa" : "#3b82f6"} />
                     <Text style={[styles.settingsOptionText, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>{isTelugu ? 'ప్రొఫైల్‌ను సవరించండి' : 'Edit Profile'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.settingsOption} onPress={() => { setShowSettings(false); navigation.navigate('AdminProfile'); }}>
                     <MaterialCommunityIcons name="bell-ring-outline" size={24} color={isDark ? "#60a5fa" : "#3b82f6"} />
                     <Text style={[styles.settingsOptionText, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>{isTelugu ? 'నోటిఫికేషన్లు' : 'Notifications'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.settingsOption} onPress={() => { setShowSettings(false); navigation.navigate('AdminProfile'); }}>
                     <MaterialCommunityIcons name="shield-lock-outline" size={24} color={isDark ? "#60a5fa" : "#3b82f6"} />
                     <Text style={[styles.settingsOptionText, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>{isTelugu ? 'గోప్యత & భద్రత' : 'Privacy & Security'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.settingsOption, { borderBottomWidth: 0, marginBottom: 12 }]} onPress={() => { setShowSettings(false); navigation.replace('Login'); }}>
                     <MaterialCommunityIcons name="logout" size={24} color="#ef4444" />
                     <Text style={[styles.settingsOptionText, { color: '#ef4444' }]}>{isTelugu ? 'లాగ్ అవుట్' : 'Logout'}</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.submitButtonWrapper} onPress={() => setShowSettings(false)}>
                     <LinearGradient colors={isDark ? ['#38bdf8', '#0284c7'] : ['#4f46e5', '#3730a3']} style={styles.submitButtonGradient}>
                        <Text style={styles.submitButtonText}>{isTelugu ? 'మూసివేయు' : 'Close'}</Text>
                     </LinearGradient>
                  </TouchableOpacity>
               </GlassCard>
             </View>
          </View>
        </View>
        </Modal>

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
  brandTitle: { fontSize: 20, fontWeight: '800', letterSpacing: 1 },
  appBarRight: { flexDirection: 'row', alignItems: 'center' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerInfo: { flex: 1 },
  greetingText: { fontSize: 14, marginBottom: 2 },
  userName: { fontSize: 22, fontWeight: 'bold', marginBottom: 2 },
  welcomeText: { fontSize: 13 },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'rgba(156,163,175,0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  avatarImage: { width: '100%', height: '100%' },

  overviewWrapper: {
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overviewContainer: {
    padding: 20,
    borderRadius: 24,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reportButton: {
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  reportButtonText: {
    color: '#38bdf8',
    fontWeight: 'bold',
    fontSize: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCardHalf: {
    width: '48%',
    marginBottom: 12,
  },
  statCardFull: {
    width: '100%',
    marginBottom: 4,
  },
  statCardInner: {
    padding: 16,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rowCentered: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 16 },

  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quickAccessItem: {
    width: '24%',
    alignItems: 'center',
    marginBottom: 24,
  },
  quickAccessIconBg: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
  },
  quickAccessText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },

  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 4, fontWeight: '500' },

  // Drawer Modals
  drawerOverlay: {
    flex: 1,
    alignItems: 'flex-start',
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawerContainerWrapper: {
    width: '75%',
    maxWidth: 320,
    height: '100%',
    overflow: 'hidden',
  },
  drawerContent: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(156,163,175,0.2)',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(156,163,175,0.2)',
  },
  drawerIconBgCard: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  drawerItemText: {
    fontSize: 15,
    fontWeight: '600',
  },

  // Settings Modals
  centerModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  centerModalContentWrapper: {
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  centerModalContent: {
    padding: 24,
  },
  centerModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  settingsOptionText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
    fontWeight: '500',
  },
  submitButtonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  submitButtonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
