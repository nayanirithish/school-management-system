import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Platform, UIManager, LayoutAnimation } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';
import { useFacultyPreferences } from '../../context/FacultyPreferencesContext';

type FacultyHomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FacultyHome'>;
interface Props {
  navigation: FacultyHomeNavigationProp;
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function FacultyHomeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { facultyTextSize } = useFacultyPreferences();
  
  const scaleFont = (base: number) => {
    if (facultyTextSize === 'Low') return base - 2;
    if (facultyTextSize === 'High') return base + 2;
    return base;
  };

  const { isTelugu, setIsTelugu } = useLanguage();
  const [showDrawer, setShowDrawer] = useState(false);

  const quickAccessItems = [
    { id: 1, titleEN: 'Attendance', titleTE: 'హాజరు', icon: 'calendar-check', color: '#3B82F6', route: 'FacultyAttendance' },
    { id: 2, titleEN: 'Period Swapping', titleTE: 'పీరియడ్ మార్పిడి', icon: 'swap-horizontal', color: '#A855F7', route: 'FacultyPeriodSwapping' },
    { id: 3, titleEN: 'Time Table', titleTE: 'టైమ్ టేబుల్', icon: 'clock-outline', color: '#10B981', route: 'FacultyTimeTable' },
    { id: 4, titleEN: 'Leave Apply', titleTE: 'సెలవు దరఖాస్తు', icon: 'file-document-outline', color: '#F97316', route: 'FacultyLeaveApply' },
    { id: 5, titleEN: 'Syllabus Covered', titleTE: 'సిలబస్ పూర్తి', icon: 'book-open-page-variant', color: '#14B8A6', route: 'FacultySyllabusCovered' },
    { id: 6, titleEN: 'Notices', titleTE: 'నోటీసులు', icon: 'bullhorn-outline', color: '#6366F1', route: 'FacultyNotices' },
    { id: 7, titleEN: 'Assignments', titleTE: 'అసైన్‌మెంట్‌లు', icon: 'clipboard-text-outline', color: '#EAB308', route: 'FacultyAssignments' },
    { id: 8, titleEN: 'Material Upload', titleTE: 'మెటీరియల్', icon: 'upload', color: '#EC4899', route: 'FacultyMaterialUpload' },
    { id: 9, titleEN: 'Complaints', titleTE: 'ఫిర్యాదులు', icon: 'alert-circle-outline', color: '#EF4444', route: 'FacultyComplaints' },
  ];

  const todaysClasses = [
    { id: 1, period: 'Period 1', time: '9:00 AM – 9:45 AM', className: 'Class 10 – A', subject: 'Computer Science', status: 'Upcoming' },
    { id: 2, period: 'Period 2', time: '9:45 AM – 10:30 AM', className: 'Class 9 – B', subject: 'Computer Science', status: 'Upcoming' },
  ];

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => setShowDrawer(true)}>
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
            <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => navigation.navigate('FacultySettings')}>
              <MaterialCommunityIcons name="cog-outline" size={24} color="#A78BFA" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Profile Card */}
          <LinearGradient colors={['#4F46E5', '#7C3AED']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <Text style={[styles.greetingText, { fontSize: scaleFont(14) }]}>{isTelugu ? 'శుభోదయం,' : 'Good Morning,'}</Text>
              <Text style={[styles.facultyName, { fontSize: scaleFont(22) }]}>{isTelugu ? 'మిస్టర్ రాహుల్ శర్మ' : 'Mr. Rahul Sharma'}</Text>
              <Text style={[styles.facultyRole, { fontSize: scaleFont(13) }]}>{isTelugu ? 'కంప్యూటర్ సైన్స్ ఫ్యాకల్టీ' : 'Computer Science Faculty'}</Text>
            </View>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
                style={styles.avatarImage} 
              />
            </View>
          </LinearGradient>

          {/* Motivation Banner - Glassmorphic */}
          <BlurView intensity={20} tint="dark" style={[styles.motivationBanner, { borderColor: '#8B5CF6', shadowColor: '#8B5CF6', shadowOpacity: 0.6, shadowRadius: 8, elevation: 5 }]}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.motivationTitle, { color: '#F1F5F9' }]}>{isTelugu ? 'ఈ రోజును ప్రభావవంతంగా చేద్దాం!' : "Let's make today impactful!"}</Text>
              <Text style={[styles.motivationText, { color: '#A78BFA' }]}>{isTelugu ? 'ఈరోజు మీకు 4 తరగతులు ఉన్నాయి' : 'You have 4 classes today'}</Text>
            </View>
          </BlurView>

          {/* Quick Access Title */}
          <Text style={[styles.sectionTitle, { color: '#F1F5F9', fontSize: scaleFont(16) }]}>{isTelugu ? 'శీఘ్ర ప్రాప్యత' : 'Quick Access'}</Text>

          {/* Quick Access Grid */}
          <View style={styles.gridContainer}>
            {quickAccessItems.map((item) => (
              <BlurView intensity={30} tint="dark" style={[styles.gridItemCard, { borderColor: item.color, shadowColor: item.color, shadowOpacity: 0.5, shadowRadius: 6, elevation: 4 }]} key={item.id}>
                <TouchableOpacity 
                  style={styles.gridItemTouch} 
                  activeOpacity={0.7}
                  onPress={() => item.route && navigation.navigate(item.route as any)}
                >
                  <View style={[styles.gridIconCircle, { backgroundColor: item.color + '30' }]}>
                    <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
                  </View>
                  <Text style={[styles.gridItemText, { color: '#F1F5F9' }]} numberOfLines={2}>
                    {isTelugu ? item.titleTE : item.titleEN}
                  </Text>
                </TouchableOpacity>
              </BlurView>
            ))}
          </View>

          {/* Today's Classes */}
          <Text style={[styles.sectionTitle, { color: '#F1F5F9', fontSize: scaleFont(16), marginTop: 12 }]}>{isTelugu ? 'నేటి తరగతులు' : "Today's Classes"}</Text>
          <View style={styles.classesContainer}>
            {todaysClasses.map((cls) => (
              <BlurView intensity={20} tint="dark" style={[styles.classCard, { borderColor: '#10B981', shadowColor: '#10B981', shadowOpacity: 0.5, shadowRadius: 6, elevation: 4 }]} key={cls.id}>
                <View style={styles.classInfo}>
                  <Text style={[styles.classPeriod, { color: '#F8FAFC' }]}>{cls.period}</Text>
                  <Text style={[styles.classTime, { color: '#9CA3AF' }]}>{cls.time}</Text>
                  <Text style={[styles.className, { color: '#A78BFA' }]}>{cls.className}</Text>
                  <Text style={[styles.classSubject, { color: '#6EE7B7' }]}>{cls.subject}</Text>
                </View>
                <TouchableOpacity style={styles.upcomingButton} activeOpacity={0.8}>
                  <Text style={styles.upcomingButtonText}>{isTelugu ? 'రాబోయే' : cls.status}</Text>
                </TouchableOpacity>
              </BlurView>
            ))}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar */}
        <BlurView intensity={40} tint="dark" style={[styles.bottomTabBar, { borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)', paddingBottom: Math.max(insets.bottom, 12) }]}>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons name="home" size={28} color="#A855F7" />
            <Text style={[styles.tabLabel, { color: '#A855F7' }]}>{isTelugu ? 'హోమ్' : 'Home'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyTimeTable')}>
            <MaterialCommunityIcons name="calendar-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'టైమ్ టేబుల్' : 'Time Table'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'నోటిఫికేషన్' : 'Notification'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyProfile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
          </TouchableOpacity>
        </BlurView>

      </SafeAreaView>

        {/* Slide-out Menu Modal (In-layout) */}
        {showDrawer && (
          <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
            <View style={styles.menuOverlay}>
              <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setShowDrawer(false)}>
                <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
              </TouchableOpacity>
              
              <View style={styles.menuContainer}>
                <LinearGradient colors={['#0F172A', '#1E1B4B']} style={styles.menuGradient}>
                  <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.menuHeader}>
                      <Text style={styles.menuBrandTitle}>ORYOL</Text>
                      <TouchableOpacity onPress={() => setShowDrawer(false)}>
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
                            setShowDrawer(false);
                            if (item.route) navigation.navigate(item.route as any);
                          }}
                        >
                          <View style={[styles.menuIconContainer, { backgroundColor: item.color + '20' }]}>
                            <MaterialCommunityIcons name={item.icon as any} size={22} color={item.color} />
                          </View>
                          <Text style={styles.menuItemText}>{isTelugu ? item.titleTE : item.titleEN}</Text>
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
  greetingText: { color: '#C7D2FE', marginBottom: 4 },
  facultyName: { fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  facultyRole: { color: '#A5B4FC' },
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

  motivationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
  },
  motivationTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  motivationText: { fontSize: 13 },

  sectionTitle: { fontWeight: '700', marginBottom: 16 },

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
  gridItemText: { fontSize: 10, textAlign: 'center', fontWeight: '500' },

  classesContainer: {
    marginBottom: 16,
  },
  classCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
  },
  classInfo: { flex: 1 },
  classPeriod: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  classTime: { fontSize: 13, marginBottom: 4 },
  className: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  classSubject: { fontSize: 13 },
  upcomingButton: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  upcomingButtonText: {
    color: '#34D399',
    fontSize: 12,
    fontWeight: 'bold',
  },

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
    color: '#A855F7',
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
