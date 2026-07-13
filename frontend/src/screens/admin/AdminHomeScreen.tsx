import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Dimensions
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type AdminHomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminHome'>;
interface Props {
  navigation: AdminHomeNavigationProp;
}

export default function AdminHomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { isTelugu, setIsTelugu } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const quickAccessItems = [
    { id: 1, title: 'Student Management', icon: 'account-group-outline', color: '#3B82F6', route: 'AdminStudentManagement' },
    { id: 2, title: 'Faculty Management', icon: 'account-tie-outline', color: '#A855F7', route: 'AdminFacultyManagement' },
    { id: 9, title: 'Class Teachers', icon: 'human-male-board', color: '#10B981', route: 'AdminClassTeachers' },
    { id: 3, title: 'Fee Management', icon: 'wallet-outline', color: '#F97316', route: 'AdminFeeManagement' },
    { id: 4, title: 'Notices', icon: 'bell-outline', color: '#14B8A6', route: 'AdminNotices' },
    { id: 10, title: 'Upload Results', icon: 'chart-line', color: '#6366F1', route: 'AdminUploadResults' },
    { id: 5, title: 'Overall Results', icon: 'chart-bar', color: '#8B5CF6', route: 'AdminResults' },
    { id: 6, title: 'Classes', icon: 'calendar-blank-outline', color: '#EF4444', route: 'AdminClasses' },
    { id: 7, title: 'Complaints', icon: 'message-alert-outline', color: '#EAB308', route: 'AdminComplaintManagement' },
    { id: 8, title: 'Settings', icon: 'cog-outline', color: '#EC4899', route: 'AdminSettings' },
  ];

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
            <MaterialCommunityIcons name="menu" size={28} color="#E0E7FF" />
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
            <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => navigation.navigate('AdminSettings')}>
              <MaterialCommunityIcons name="cog-outline" size={24} color="#A78BFA" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Profile Card */}
          <LinearGradient colors={['#4F46E5', '#7C3AED']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <Text style={styles.greetingText}>{isTelugu ? 'శుభోదయం,' : 'Good Morning,'}</Text>
              <Text style={styles.adminName}>Admin User</Text>
              <Text style={styles.adminDetails}>Welcome back to ORYOL</Text>
            </View>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
                style={styles.avatarImage} 
              />
            </View>
          </LinearGradient>

          {/* Today's Overview Widget */}
          <BlurView intensity={20} tint="dark" style={[styles.overviewCard, { borderColor: '#4F46E5', shadowColor: '#4F46E5', shadowOpacity: 0.6, shadowRadius: 8 }]}>
             <View style={styles.overviewHeader}>
               <Text style={[styles.overviewTitle, { color: '#F8FAFC' }]}>{isTelugu ? 'నేటి స్థూలదృష్టి' : "Today's Overview"}</Text>
               <TouchableOpacity style={styles.reportButton} onPress={() => navigation.navigate('AdminReports')}>
                 <Text style={styles.reportButtonText}>{isTelugu ? 'రిపోర్ట్ చూడండి' : 'View Report'}</Text>
               </TouchableOpacity>
             </View>

             <View style={styles.statsRow}>
               <View style={styles.statBoxHalf}>
                  <Text style={styles.statLabel}>{isTelugu ? 'విద్యార్థులు' : 'Students'}</Text>
                  <Text style={styles.statValue}>1,248</Text>
               </View>
               <View style={styles.statBoxHalf}>
                  <Text style={styles.statLabel}>{isTelugu ? 'అధ్యాపకులు' : 'Faculty'}</Text>
                  <Text style={styles.statValue}>86</Text>
               </View>
             </View>
             
             <View style={styles.statBoxFull}>
                <Text style={styles.statLabel}>{isTelugu ? 'మొత్తం వసూలు చేసిన ఫీజు' : 'Total Fees Collected'}</Text>
                <Text style={[styles.statValue, { color: '#10B981' }]}>₹ 18,75,000</Text>
             </View>
             
             <View style={styles.statBoxFull}>
                <Text style={styles.statLabel}>{isTelugu ? 'పెండింగ్ ఫీజులు' : 'Pending Fees'}</Text>
                <Text style={[styles.statValue, { color: '#EF4444' }]}>₹ 3,45,000</Text>
             </View>
          </BlurView>

          {/* Quick Access Title */}
          <Text style={[styles.sectionTitle, { color: '#F1F5F9' }]}>{isTelugu ? 'శీఘ్ర ప్రాప్యత' : 'Quick Access'}</Text>

          {/* Quick Access Grid */}
          <View style={styles.gridContainer}>
            {quickAccessItems.map((item) => (
              <BlurView intensity={30} tint="dark" style={[styles.gridItemCard, { borderColor: item.color, shadowColor: item.color, shadowOpacity: 0.5, shadowRadius: 6, elevation: 4 }]} key={item.id}>
                <TouchableOpacity 
                  style={styles.gridItemTouch} 
                  activeOpacity={0.7}
                  onPress={() => {
                    if (item.route) {
                      navigation.navigate(item.route as any);
                    }
                  }}
                >
                  <View style={[styles.gridIconCircle, { backgroundColor: item.color + '30' }]}>
                    <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
                  </View>
                  <Text style={[styles.gridItemText, { color: '#F1F5F9' }]}>{isTelugu && item.id === 1 ? 'విద్యార్థుల నిర్వహణ' : item.title}</Text>
                </TouchableOpacity>
              </BlurView>
            ))}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar (Fixed) */}
        <BlurView intensity={40} tint="dark" style={[styles.bottomTabBar, { borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)', paddingBottom: Math.max(insets.bottom, 12) }]}>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons name="home" size={28} color="#A855F7" />
            <Text style={[styles.tabLabel, { color: '#A855F7' }]}>{isTelugu ? 'హోమ్' : 'Home'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminFeeManagement')}>
            <MaterialCommunityIcons name="receipt" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'ఫీజు నిర్వహణ' : 'Fee\nManagement'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'నోటిఫికేషన్' : 'Notification'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminProfile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Slide-out Menu Modal (In-layout) */}
        {isMenuOpen && (
          <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
            <View style={styles.menuOverlay}>
              <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setIsMenuOpen(false)}>
                <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
              </TouchableOpacity>
              
              <View style={styles.menuContainer}>
                <LinearGradient colors={['#0F172A', '#1E1B4B']} style={styles.menuGradient}>
                  <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.menuHeader}>
                      <Text style={styles.menuBrandTitle}>ORYOL</Text>
                      <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
                        <MaterialCommunityIcons name="close" size={28} color="#F3F4F6" />
                      </TouchableOpacity>
                    </View>
                    
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.menuScroll}>
                      <Text style={styles.menuSectionTitle}>{isTelugu ? 'శీఘ్ర ప్రాప్యత' : 'Quick Access'}</Text>
                      
                      {quickAccessItems.map((item) => (
                        <TouchableOpacity 
                          key={item.id} 
                          style={styles.menuItem} 
                          onPress={() => {
                            setIsMenuOpen(false);
                            if (item.route) navigation.navigate(item.route as any);
                          }}
                        >
                          <View style={[styles.menuIconContainer, { backgroundColor: item.color + '20' }]}>
                            <MaterialCommunityIcons name={item.icon as any} size={22} color={item.color} />
                          </View>
                          <Text style={styles.menuItemText}>{isTelugu && item.id === 1 ? 'విద్యార్థుల నిర్వహణ' : item.title}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </SafeAreaView>
                </LinearGradient>
              </View>
            </View>
          </View>
        )}

      </SafeAreaView>

        {/* Slide-out Menu Modal (In-layout) */}
        {isMenuOpen && (
          <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
            <View style={styles.menuOverlay}>
              <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setIsMenuOpen(false)}>
                <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
              </TouchableOpacity>
              
              <View style={styles.menuContainer}>
                <LinearGradient colors={['#0F172A', '#1E1B4B']} style={styles.menuGradient}>
                  <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.menuHeader}>
                      <Text style={styles.menuBrandTitle}>ORYOL</Text>
                      <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
                        <MaterialCommunityIcons name="close" size={28} color="#F3F4F6" />
                      </TouchableOpacity>
                    </View>
                    
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.menuScroll}>
                      <Text style={styles.menuSectionTitle}>Management</Text>
                      
                      {quickAccessItems.map((item) => (
                        <TouchableOpacity 
                          key={item.id} 
                          style={styles.menuItem} 
                          onPress={() => {
                            setIsMenuOpen(false);
                            if (item.route) navigation.navigate(item.route as any);
                          }}
                        >
                          <View style={[styles.menuIconContainer, { backgroundColor: item.color + '20' }]}>
                            <MaterialCommunityIcons name={item.icon as any} size={22} color={item.color} />
                          </View>
                          <Text style={styles.menuItemText}>{item.title}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </SafeAreaView>
                </LinearGradient>
              </View>
            </View>
          </View>
        )}

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1 },
  
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  brandTitle: { fontSize: 22, fontWeight: '900', color: '#E0E7FF', letterSpacing: 1 },
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  languagePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  languageActive: { backgroundColor: '#4F46E5' },
  languageInactive: { backgroundColor: 'transparent' },
  languageText: { fontSize: 12, fontWeight: 'bold', color: '#94A3B8' },
  languageTextActive: { color: '#FFFFFF' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 24,
    marginBottom: 24,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  profileInfo: { flex: 1 },
  greetingText: { fontSize: 14, color: '#C7D2FE', marginBottom: 4 },
  adminName: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  adminDetails: { fontSize: 13, color: '#A5B4FC' },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImage: { width: '100%', height: '100%' },

  overviewCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    overflow: 'hidden',
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reportButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  reportButtonText: {
    color: '#E0E7FF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statBoxHalf: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statBoxFull: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 8,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItemCard: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    overflow: 'hidden',
  },
  gridItemTouch: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 8 },
  gridIconCircle: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  gridItemText: { fontSize: 10, color: '#E5E7EB', textAlign: 'center', fontWeight: '500' },

  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 10, marginTop: 4, fontWeight: '500', textAlign: 'center' },

  menuOverlay: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  menuContainer: {
    width: '65%',
    maxWidth: 280,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  menuGradient: {
    flex: 1,
  },
  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  menuBrandTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#3B82F6',
    letterSpacing: 1,
  },
  menuScroll: {
    padding: 20,
  },
  menuSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9CA3AF',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E5E7EB',
  },
});
