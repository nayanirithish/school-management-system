import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type StudentHomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'StudentHome'>;
interface Props {
  navigation: StudentHomeScreenNavigationProp;
}

export default function StudentHomeScreen({ navigation }: Props) {
  const [isTelugu, setIsTelugu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const quickAccessItems = [
    { id: 1, title: isTelugu ? 'హాజరు' : 'Attendance', icon: 'clock-outline', color: '#3B82F6', route: 'Attendance' },
    { id: 2, title: isTelugu ? 'టైమ్ టేబుల్' : 'Time Table', icon: 'calendar-outline', color: '#A855F7', route: 'TimeTable' },
    { id: 3, title: isTelugu ? 'ఫలితాలు' : 'Results', icon: 'chart-bar', color: '#10B981', route: 'Results' },
    { id: 4, title: isTelugu ? 'ఫీజు విభాగం' : 'Fee Section', icon: 'credit-card-outline', color: '#F97316', route: 'FeeSection' },
    { id: 5, title: isTelugu ? 'డైరీ' : 'Diary', icon: 'book-open-outline', color: '#14B8A6', route: 'Diary' },
    { id: 6, title: isTelugu ? 'బస్ ట్రాకర్' : 'Bus Tracker', icon: 'bus', color: '#6366F1', route: 'BusTracker' },
    { id: 7, title: isTelugu ? 'పరీక్ష నోటిఫికేషన్లు' : 'Exam Notifications', icon: 'bell-outline', color: '#EF4444', route: 'ExamNotifications' },
    { id: 8, title: isTelugu ? 'స్టడీ మెటీరియల్స్' : 'Study Materials', icon: 'folder-outline', color: '#EAB308', route: 'StudyMaterials' },
    { id: 9, title: isTelugu ? 'సెలవు దరఖాస్తు' : 'Leave Application', icon: 'file-document-outline', color: '#EC4899', route: 'LeaveApplication' },
    { id: 10, title: isTelugu ? 'అభిప్రాయం' : 'Feedback', icon: 'message-outline', color: '#06B6D4', route: 'Feedback' },
  ];

  return (
    <LinearGradient colors={['#E0F2FE', '#F3E8FF', '#F9FAFB']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
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
            <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => navigation.navigate('Settings')}>
              <MaterialCommunityIcons name="cog-outline" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Profile Card */}
          <LinearGradient colors={['#4F46E5', '#7C3AED']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <Text style={styles.greetingText}>{isTelugu ? 'శుభోదయం,' : 'Good Morning,'}</Text>
              <Text style={styles.studentName}>Rahul Kumar</Text>
              <Text style={styles.studentDetails}>Class 10 - A | Roll No: 25</Text>
            </View>
            <View style={styles.avatarContainer}>
              <MaterialCommunityIcons name="account-circle" size={64} color="#E0E7FF" />
            </View>
          </LinearGradient>

          {/* Highlights Row */}
          <View style={styles.highlightsRow}>
            {/* Attendance */}
            <BlurView intensity={70} tint="light" style={styles.highlightCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#EFF6FF' }]}>
                <MaterialCommunityIcons name="clock-outline" size={20} color="#3B82F6" />
              </View>
              <Text style={[styles.highlightValue, { color: '#3B82F6' }]}>85%</Text>
              <Text style={styles.highlightLabel}>{isTelugu ? 'హాజరు' : 'Attendance'}</Text>
            </BlurView>

            {/* Due Fees */}
            <BlurView intensity={70} tint="light" style={styles.highlightCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#FEF2F2' }]}>
                <MaterialCommunityIcons name="credit-card-outline" size={20} color="#EF4444" />
              </View>
              <Text style={[styles.highlightValue, { color: '#EF4444' }]}>₹5,250</Text>
              <Text style={styles.highlightLabel}>{isTelugu ? 'బకాయి ఫీజు' : 'Due Fees'}</Text>
            </BlurView>

            {/* Next Exam */}
            <BlurView intensity={70} tint="light" style={styles.highlightCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#FEFCE8' }]}>
                <MaterialCommunityIcons name="calendar-outline" size={20} color="#EAB308" />
              </View>
              <Text style={[styles.highlightValue, { color: '#EAB308' }]}>24 May</Text>
              <Text style={styles.highlightLabel}>{isTelugu ? 'తదుపరి పరీక్ష' : 'Next Exam'}</Text>
            </BlurView>
          </View>

          {/* School Notice */}
          <BlurView intensity={70} tint="light" style={styles.noticeCard}>
            <View style={[styles.iconCircle, { backgroundColor: '#FFF7ED', marginRight: 16 }]}>
              <MaterialCommunityIcons name="bullhorn-outline" size={24} color="#F97316" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.noticeTitle}>{isTelugu ? 'పాఠశాల నోటీసు' : 'School Notice'}</Text>
              <Text style={styles.noticeText}>PTM scheduled on 25 May 2024. All parents are requested to attend.</Text>
            </View>
          </BlurView>

          {/* Quick Access Title */}
          <Text style={styles.sectionTitle}>{isTelugu ? 'శీఘ్ర ప్రాప్యత' : 'Quick Access'}</Text>

          {/* Quick Access Grid */}
          <View style={styles.gridContainer}>
            {quickAccessItems.map((item) => (
              <BlurView intensity={70} tint="light" style={styles.gridItemCard} key={item.id}>
                <TouchableOpacity 
                  style={styles.gridItemTouch} 
                  activeOpacity={0.7}
                  onPress={() => {
                    if (item.route) {
                      navigation.navigate(item.route as any);
                    }
                  }}
                >
                  <View style={[styles.gridIconCircle, { backgroundColor: item.color + '15' }]}>
                    <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
                  </View>
                  <Text style={styles.gridItemText}>{item.title}</Text>
                </TouchableOpacity>
              </BlurView>
            ))}
          </View>

          {/* Feedback Banner */}
          <BlurView intensity={70} tint="light" style={styles.feedbackBanner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.feedbackTitle}>{isTelugu ? 'మీ అభిప్రాయం పంచుకోండి' : 'Share Your Feedback'}</Text>
              <Text style={styles.feedbackText}>{isTelugu ? 'మీ అనుభవాన్ని మెరుగుపరచడానికి మాకు సహాయం చేయండి' : 'Help us improve your experience'}</Text>
            </View>
            <TouchableOpacity style={styles.feedbackButton} onPress={() => navigation.navigate('Feedback')}>
              <Text style={styles.feedbackButtonText}>{isTelugu ? 'అభిప్రాయం ఇవ్వండి' : 'Give Feedback'}</Text>
            </TouchableOpacity>
          </BlurView>

          {/* Extra padding at bottom to prevent Tab Bar overlap */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar (Fixed) */}
        <BlurView intensity={90} tint="light" style={styles.bottomTabBar}>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons name="home" size={28} color="#5B4BCA" />
            <Text style={[styles.tabLabel, { color: '#5B4BCA' }]}>{isTelugu ? 'హోమ్' : 'Home'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FeeSection')}>
            <MaterialCommunityIcons name="credit-card-outline" size={28} color="#6B7280" />
            <Text style={styles.tabLabel}>{isTelugu ? 'ఫీజు చెల్లింపు' : 'Fee Payment'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('ExamNotifications')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#6B7280" />
            <Text style={styles.tabLabel}>{isTelugu ? 'నోటిఫికేషన్' : 'Notification'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#6B7280" />
            <Text style={styles.tabLabel}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
          </TouchableOpacity>
        </BlurView>

      </SafeAreaView>

      {/* Slide-out Menu Modal */}
      <Modal visible={isMenuOpen} transparent animationType="fade">
        <View style={styles.menuOverlay}>
          <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setIsMenuOpen(false)}>
            <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
          </TouchableOpacity>
          
          <View style={styles.menuContainer}>
            <LinearGradient colors={['#F9FAFB', '#F3E8FF']} style={styles.menuGradient}>
              <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.menuHeader}>
                  <Text style={styles.menuBrandTitle}>ORYOL</Text>
                  <TouchableOpacity onPress={() => setIsMenuOpen(false)}>
                    <MaterialCommunityIcons name="close" size={28} color="#1F2937" />
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
                      <Text style={styles.menuItemText}>{item.title}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </SafeAreaView>
            </LinearGradient>
          </View>
        </View>
      </Modal>

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
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // subtle glass header
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

  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  profileInfo: { flex: 1 },
  greetingText: { color: '#E0E7FF', fontSize: 14, marginBottom: 4 },
  studentName: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  studentDetails: { color: '#C7D2FE', fontSize: 13 },
  avatarContainer: { marginLeft: 16, width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },

  highlightsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  highlightCard: {
    width: '31%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    overflow: 'hidden',
  },
  highlightValue: { fontSize: 16, fontWeight: 'bold', marginVertical: 6 },
  highlightLabel: { fontSize: 10, color: '#6B7280' },

  noticeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    overflow: 'hidden',
  },
  iconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  noticeTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 4 },
  noticeText: { fontSize: 13, color: '#6B7280', lineHeight: 18 },

  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 16 },

  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridItemCard: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.8)',
    overflow: 'hidden',
  },
  gridItemTouch: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 8 },
  gridIconCircle: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  gridItemText: { fontSize: 10, color: '#374151', textAlign: 'center', fontWeight: '500' },

  feedbackBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginTop: 12,
    backgroundColor: 'rgba(237, 233, 254, 0.6)', // light purple glass
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
    overflow: 'hidden',
  },
  feedbackTitle: { fontSize: 14, fontWeight: '700', color: '#5B4BCA', marginBottom: 4 },
  feedbackText: { fontSize: 11, color: '#6B7280' },
  feedbackButton: { backgroundColor: '#5B4BCA', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
  feedbackButtonText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },

  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255,255,255,0.7)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#6B7280', marginTop: 4, fontWeight: '500' },

  menuOverlay: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  menuContainer: {
    width: '75%',
    maxWidth: 320,
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
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  menuBrandTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#5B4BCA',
    letterSpacing: 1,
  },
  menuScroll: {
    padding: 20,
  },
  menuSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B7280',
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
    color: '#374151',
  },
});
