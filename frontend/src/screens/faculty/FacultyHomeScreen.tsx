import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Modal, Platform, UIManager, LayoutAnimation } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import GlassBackground from '../../components/GlassBackground';
import GlassCard from '../../components/GlassCard';
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
  const { isFacultyDark, facultyTextSize } = useFacultyPreferences();
  const isDark = isFacultyDark; 
  
  const scaleFont = (base: number) => {
    if (facultyTextSize === 'Low') return base - 2;
    if (facultyTextSize === 'High') return base + 2;
    return base;
  };

  const { isTelugu, setIsTelugu } = useLanguage();
  const [showSettings, setShowSettings] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  
  // Settings sub-modals
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const quickAccessItems = [
    { id: 1, titleEN: 'Attendance', titleTE: 'హాజరు', icon: 'calendar-check', color: '#5B4BCA', route: 'FacultyAttendance' },
    { id: 2, titleEN: 'Period Swapping', titleTE: 'పీరియడ్ మార్పిడి', icon: 'swap-horizontal', color: '#3B82F6', route: 'FacultyPeriodSwapping' },
    { id: 3, titleEN: 'Time Table', titleTE: 'టైమ్ టేబుల్', icon: 'clock-outline', color: '#6366F1', route: 'FacultyTimeTable' },
    { id: 4, titleEN: 'Leave Apply', titleTE: 'సెలవు దరఖాస్తు', icon: 'file-document-outline', color: '#8B5CF6', route: 'FacultyLeaveApply' },
    { id: 5, titleEN: 'Syllabus Covered', titleTE: 'సిలబస్ పూర్తి', icon: 'book-open-page-variant', color: '#6366F1', route: 'FacultySyllabusCovered' },
    { id: 6, titleEN: 'Notices', titleTE: 'నోటీసులు', icon: 'bullhorn-outline', color: '#5B4BCA', route: 'FacultyNotices' },
    { id: 7, titleEN: 'Assignments', titleTE: 'అసైన్‌మెంట్‌లు', icon: 'clipboard-text-outline', color: '#3B82F6', route: 'FacultyAssignments' },
    { id: 8, titleEN: 'Material Upload', titleTE: 'మెటీరియల్', icon: 'upload', color: '#8B5CF6', route: 'FacultyMaterialUpload' },
    { id: 9, titleEN: 'Complaints', titleTE: 'ఫిర్యాదులు', icon: 'alert-circle-outline', color: '#EF4444', route: 'FacultyComplaints' },
  ];

  const todaysClasses = [
    { id: 1, period: 'Period 1', time: '9:00 AM – 9:45 AM', className: 'Class 10 – A', subject: 'Computer Science', status: 'Upcoming' },
    { id: 2, period: 'Period 2', time: '9:45 AM – 10:30 AM', className: 'Class 9 – B', subject: 'Computer Science', status: 'Upcoming' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? '#0f172a' : '#FFFFFF' }}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <GlassCard style={styles.appBar} intensity={100} styleOverride={{ backgroundColor: isDark ? '#1e293b' : '#FFFFFF', borderRadius: 0, borderBottomWidth: 1, borderBottomColor: isDark ? '#334155' : '#E5E7EB', borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}>
          <TouchableOpacity onPress={() => setShowDrawer(true)}>
            <MaterialCommunityIcons name="menu" size={28} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.brandTitle}>ORYOL</Text>
          <View style={styles.appBarRight}>
            <TouchableOpacity 
              style={[styles.languageToggle, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : '#EEF2FF' }]} 
              onPress={() => setIsTelugu(!isTelugu)}
              activeOpacity={0.8}
            >
              <View style={[styles.languagePill, !isTelugu ? [styles.languageActive, { backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : '#E0E7FF' }] : styles.languageInactive]}>
                 <Text style={[styles.languageText, !isTelugu && styles.languageTextActive, { color: !isTelugu ? '#5B4BCA' : (isDark ? '#9CA3AF' : '#6B7280') }]}>English</Text>
              </View>
              <View style={[styles.languagePill, isTelugu ? [styles.languageActive, { backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : '#E0E7FF' }] : styles.languageInactive]}>
                 <Text style={[styles.languageText, isTelugu && styles.languageTextActive, { color: isTelugu ? '#5B4BCA' : (isDark ? '#9CA3AF' : '#6B7280') }]}>Telugu</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => navigation.navigate('FacultySettings')}>
              <MaterialCommunityIcons name="cog-outline" size={24} color={isDark ? "#D1D5DB" : "#6B7280"} />
            </TouchableOpacity>
          </View>
        </GlassCard>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileInfo}>
              <Text style={[styles.greetingText, { color: isDark ? '#D1D5DB' : '#6B7280', fontSize: scaleFont(14) }]}>{isTelugu ? 'శుభోదయం,' : 'Good Morning,'}</Text>
              <Text style={[styles.facultyName, { color: isDark ? '#FFFFFF' : '#111827', fontSize: scaleFont(22) }]}>{isTelugu ? 'మిస్టర్ రాహుల్ శర్మ' : 'Mr. Rahul Sharma'}</Text>
              <Text style={[styles.facultyRole, { color: isDark ? '#9CA3AF' : '#6B7280', fontSize: scaleFont(13) }]}>{isTelugu ? 'కంప్యూటర్ సైన్స్ ఫ్యాకల్టీ' : 'Computer Science Faculty'}</Text>
            </View>
            <View style={[styles.avatarContainer, { backgroundColor: isDark ? '#374151' : '#E5E7EB' }]}>
              <Image 
                source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
                style={styles.avatarImage} 
              />
            </View>
          </View>

          {/* Motivation Banner - Solid Card */}
          <View style={[styles.motivationBanner, { backgroundColor: '#EEF2FF', borderColor: '#E0E7FF' }]}>
            <Text style={[styles.motivationTitle, { color: '#5B4BCA' }]}>{isTelugu ? 'ఈ రోజును ప్రభావవంతంగా చేద్దాం!' : "Let's make today impactful!"}</Text>
            <Text style={[styles.motivationText, { color: '#7C3AED' }]}>{isTelugu ? 'ఈరోజు మీకు 4 తరగతులు ఉన్నాయి' : 'You have 4 classes today'}</Text>
          </View>

          {/* Quick Access */}
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#111827', fontSize: scaleFont(16) }]}>{isTelugu ? 'శీఘ్ర ప్రాప్యత' : 'Quick Access'}</Text>
          <View style={styles.quickAccessGrid}>
            {quickAccessItems.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.quickAccessItem} 
                activeOpacity={0.7}
                onPress={() => item.route && navigation.navigate(item.route as any)}
              >
                <View style={[styles.quickAccessIconBg, { backgroundColor: '#F9FAFB', borderColor: '#F3F4F6' }]}>
                  <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
                </View>
                <Text style={[styles.quickAccessText, { color: isDark ? '#D1D5DB' : '#6B7280' }]} numberOfLines={2}>
                  {isTelugu ? item.titleTE : item.titleEN}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Today's Classes */}
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#111827', fontSize: scaleFont(16) }]}>{isTelugu ? 'నేటి తరగతులు' : "Today's Classes"}</Text>
          <View style={styles.classesContainer}>
            {todaysClasses.map((cls) => (
              <View style={[styles.classCard, { backgroundColor: '#F9FAFB', borderColor: '#F3F4F6' }]} key={cls.id}>
                <View style={styles.classInfo}>
                  <Text style={[styles.classPeriod, { color: '#111827' }]}>{cls.period}</Text>
                  <Text style={[styles.classTime, { color: '#6B7280' }]}>{cls.time}</Text>
                  <Text style={[styles.className, { color: '#9CA3AF' }]}>{cls.className}</Text>
                  <Text style={[styles.classSubject, { color: '#9CA3AF' }]}>{cls.subject}</Text>
                </View>
                <TouchableOpacity style={styles.upcomingButton} activeOpacity={0.8}>
                  <Text style={styles.upcomingButtonText}>{isTelugu ? 'రాబోయే' : cls.status}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar */}
        <View style={[styles.bottomTabBar, { backgroundColor: '#FFFFFF', borderTopColor: '#E5E7EB' }]}>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons name="home" size={28} color={isDark ? "#A78BFA" : "#5B4BCA"} />
            <Text style={[styles.tabLabel, { color: isDark ? '#A78BFA' : '#5B4BCA' }]}>{isTelugu ? 'హోమ్' : 'Home'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyTimeTable')}>
            <MaterialCommunityIcons name="calendar-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'టైమ్ టేబుల్' : 'Time Table'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'నోటిఫికేషన్' : 'Notification'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyProfile' as any)}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Modal */}
        {showSettings && (
          <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
             <View style={styles.modalBackdrop} />
             
             <View style={styles.centerModalOverlay}>
               <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowSettings(false)} activeOpacity={1} />
               <View style={styles.centerModalContentWrapper}>
                <GlassCard intensity={isDark ? 50 : 100} style={styles.centerModalContent} styleOverride={{ backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255,255,255,0.95)', borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)' }}>
                   <Text style={[styles.centerModalTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>{isTelugu ? 'సెట్టింగ్‌లు' : 'Settings'}</Text>
                   
                   <TouchableOpacity style={[styles.settingsOption, { borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]} onPress={() => { setShowSettings(false); setShowEditProfile(true); }}>
                      <MaterialCommunityIcons name="account-edit-outline" size={24} color={isDark ? "#A78BFA" : "#5B4BCA"} />
                      <Text style={[styles.settingsOptionText, { color: isDark ? '#E5E7EB' : '#374151' }]}>{isTelugu ? 'ప్రొఫైల్‌ను సవరించండి' : 'Edit Profile'}</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={[styles.settingsOption, { borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]} onPress={() => { setShowSettings(false); setShowNotifications(true); }}>
                      <MaterialCommunityIcons name="bell-ring-outline" size={24} color={isDark ? "#A78BFA" : "#5B4BCA"} />
                      <Text style={[styles.settingsOptionText, { color: isDark ? '#E5E7EB' : '#374151' }]}>{isTelugu ? 'నోటిఫికేషన్లు' : 'Notifications'}</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={[styles.settingsOption, { borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]} onPress={() => { setShowSettings(false); setShowPrivacy(true); }}>
                      <MaterialCommunityIcons name="shield-lock-outline" size={24} color={isDark ? "#A78BFA" : "#5B4BCA"} />
                      <Text style={[styles.settingsOptionText, { color: isDark ? '#E5E7EB' : '#374151' }]}>{isTelugu ? 'గోప్యత & భద్రత' : 'Privacy & Security'}</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={[styles.settingsOption, { borderBottomWidth: 0, marginBottom: 12 }]} onPress={() => { setShowSettings(false); navigation.replace('Login'); }}>
                      <MaterialCommunityIcons name="logout" size={24} color="#EF4444" />
                      <Text style={[styles.settingsOptionText, { color: '#EF4444' }]}>{isTelugu ? 'లాగ్ అవుట్' : 'Logout'}</Text>
                   </TouchableOpacity>
                   
                   <TouchableOpacity style={styles.submitButton} onPress={() => setShowSettings(false)}>
                      <Text style={styles.submitButtonText}>{isTelugu ? 'మూసివేయు' : 'Close'}</Text>
                   </TouchableOpacity>
                </GlassCard>
               </View>
             </View>
          </View>
        )}

        {/* Drawer Modal */}
        {showDrawer && (
          <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
             <View style={styles.modalBackdrop} />
             
             <View style={styles.drawerOverlay}>
               <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowDrawer(false)} activeOpacity={1} />
               
               <View style={styles.drawerContainerWrapper}>
               <View style={[styles.drawerContent, { backgroundColor: isDark ? '#1e293b' : 'transparent' }]}>
                  {!isDark && <LinearGradient colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']} style={StyleSheet.absoluteFill} />}
                  
                  <View style={[styles.drawerHeader, { borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]}>
                     <Text style={styles.brandTitle}>ORYOL</Text>
                     <TouchableOpacity onPress={() => setShowDrawer(false)}>
                        <MaterialCommunityIcons name="close" size={24} color={isDark ? "#FFFFFF" : "#111827"} />
                     </TouchableOpacity>
                  </View>

                  <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                     {quickAccessItems.map(item => (
                       <TouchableOpacity 
                         key={item.id} 
                         style={[styles.drawerItem, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)' }]}
                         onPress={() => {
                           setShowDrawer(false);
                           if (item.route) navigation.navigate(item.route as any);
                         }}
                       >
                         <View style={[styles.drawerIconBg, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : item.color + '20' }]}>
                            <MaterialCommunityIcons name={item.icon as any} size={22} color={isDark ? '#E5E7EB' : item.color} />
                         </View>
                         <Text style={[styles.drawerItemText, { color: isDark ? '#E5E7EB' : '#374151' }]}>{isTelugu ? item.titleTE : item.titleEN}</Text>
                       </TouchableOpacity>
                     ))}
                  </ScrollView>
               </View>
             </View>
             </View>
          </View>
        )}

        {/* Edit Profile Modal */}
        {showEditProfile && (
           <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
             <View style={styles.modalBackdrop} />
             
             <View style={styles.bottomModalOverlay}>
               <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowEditProfile(false)} activeOpacity={1} />
               <View style={styles.bottomModalContentWrapper}>
                <GlassCard intensity={isDark ? 50 : 100} style={styles.bottomModalContent} styleOverride={{ backgroundColor: isDark ? '#1e293b' : '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, borderRadius: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'transparent' }}>
                   <View style={[styles.modalDragHandle, { backgroundColor: isDark ? '#4B5563' : '#E5E7EB' }]} />
                   <Text style={[styles.modalTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>{isTelugu ? 'ప్రొఫైల్‌ను సవరించండి' : 'Edit Profile'}</Text>
                   
                   <View style={styles.inputGroup}>
                      <Text style={[styles.inputLabel, { color: isDark ? '#D1D5DB' : '#374151' }]}>{isTelugu ? 'పేరు' : 'Name'}</Text>
                      <View style={[styles.textInput, { backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : '#F9FAFB', borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }]}>
                         <Text style={{color: isDark ? '#FFFFFF' : '#111827', fontSize: 15}}>Mr. Rahul Sharma</Text>
                      </View>
                   </View>
                   
                   <View style={styles.inputGroup}>
                      <Text style={[styles.inputLabel, { color: isDark ? '#D1D5DB' : '#374151' }]}>{isTelugu ? 'ఫోన్ నంబర్' : 'Phone Number'}</Text>
                      <View style={[styles.textInput, { backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : '#F9FAFB', borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }]}>
                         <Text style={{color: isDark ? '#FFFFFF' : '#111827', fontSize: 15}}>+91 98765 43210</Text>
                      </View>
                   </View>

                   <TouchableOpacity style={styles.submitButton} onPress={() => setShowEditProfile(false)}>
                      <Text style={styles.submitButtonText}>{isTelugu ? 'సేవ్ చేయండి' : 'Save Changes'}</Text>
                   </TouchableOpacity>
                </GlassCard>
              </View>
             </View>
           </View>
        )}

        {/* Notifications Modal */}
        {showNotifications && (
           <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
             <View style={styles.modalBackdrop} />
             
             <View style={styles.bottomModalOverlay}>
               <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowNotifications(false)} activeOpacity={1} />
               <View style={styles.bottomModalContentWrapper}>
                <GlassCard intensity={isDark ? 50 : 100} style={styles.bottomModalContent} styleOverride={{ backgroundColor: isDark ? '#1e293b' : '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, borderRadius: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'transparent' }}>
                   <View style={[styles.modalDragHandle, { backgroundColor: isDark ? '#4B5563' : '#E5E7EB' }]} />
                   <Text style={[styles.modalTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>{isTelugu ? 'నోటిఫికేషన్లు' : 'Notifications'}</Text>
                   
                   <View style={[styles.switchRow, { borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : '#F3F4F6' }]}>
                      <Text style={[styles.switchLabel, { color: isDark ? '#D1D5DB' : '#374151' }]}>{isTelugu ? 'పుష్ నోటిఫికేషన్లు' : 'Push Notifications'}</Text>
                      <MaterialCommunityIcons name="toggle-switch" size={40} color="#10B981" />
                   </View>
                   
                   <View style={[styles.switchRow, { borderBottomColor: isDark ? 'rgba(255,255,255,0.1)' : '#F3F4F6' }]}>
                      <Text style={[styles.switchLabel, { color: isDark ? '#D1D5DB' : '#374151' }]}>{isTelugu ? 'ఇమెయిల్ నవీకరణలు' : 'Email Updates'}</Text>
                      <MaterialCommunityIcons name="toggle-switch-off" size={40} color={isDark ? "#4B5563" : "#D1D5DB"} />
                   </View>

                   <TouchableOpacity style={[styles.submitButton, {marginTop: 20}]} onPress={() => setShowNotifications(false)}>
                      <Text style={styles.submitButtonText}>{isTelugu ? 'పూర్తయింది' : 'Done'}</Text>
                   </TouchableOpacity>
                </GlassCard>
              </View>
             </View>
           </View>
        )}

        {/* Privacy & Security Modal */}
        {showPrivacy && (
           <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
             <View style={styles.modalBackdrop} />
             
             <View style={styles.bottomModalOverlay}>
               <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowPrivacy(false)} activeOpacity={1} />
               <View style={styles.bottomModalContentWrapper}>
                <GlassCard intensity={isDark ? 50 : 100} style={styles.bottomModalContent} styleOverride={{ backgroundColor: isDark ? '#1e293b' : '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, borderRadius: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'transparent' }}>
                   <View style={[styles.modalDragHandle, { backgroundColor: isDark ? '#4B5563' : '#E5E7EB' }]} />
                   <Text style={[styles.modalTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>{isTelugu ? 'గోప్యత & భద్రత' : 'Privacy & Security'}</Text>
                   
                   <View style={styles.inputGroup}>
                      <Text style={[styles.inputLabel, { color: isDark ? '#D1D5DB' : '#374151' }]}>{isTelugu ? 'పాత పాస్‌వర్డ్' : 'Old Password'}</Text>
                      <View style={[styles.textInput, { backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : '#F9FAFB', borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }]}>
                         <Text style={{color: '#9CA3AF', fontSize: 15}}>••••••••</Text>
                      </View>
                   </View>
                   
                   <View style={styles.inputGroup}>
                      <Text style={[styles.inputLabel, { color: isDark ? '#D1D5DB' : '#374151' }]}>{isTelugu ? 'కొత్త పాస్‌వర్డ్' : 'New Password'}</Text>
                      <View style={[styles.textInput, { backgroundColor: isDark ? 'rgba(0,0,0,0.2)' : '#F9FAFB', borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }]}>
                         <Text style={{color: '#9CA3AF', fontSize: 15}}>••••••••</Text>
                      </View>
                   </View>

                   <TouchableOpacity style={styles.submitButton} onPress={() => setShowPrivacy(false)}>
                      <Text style={styles.submitButtonText}>{isTelugu ? 'పాస్‌వర్డ్‌ను నవీకరించండి' : 'Update Password'}</Text>
                   </TouchableOpacity>
                </GlassCard>
              </View>
             </View>
           </View>
        )}

      </SafeAreaView>
    </View>
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
  brandTitle: { fontSize: 20, fontWeight: '800', color: '#5B4BCA', letterSpacing: 1 },
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 2,
    alignItems: 'center',
  },
  languagePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  languageActive: { },
  languageInactive: { backgroundColor: 'transparent' },
  languageText: { fontSize: 11, fontWeight: 'bold' },
  languageTextActive: { },

  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  profileInfo: { flex: 1 },
  greetingText: { fontSize: 14, marginBottom: 2 },
  facultyName: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  facultyRole: { fontSize: 13 },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  avatarImage: { width: '100%', height: '100%' },

  motivationBanner: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    shadowColor: '#5B4BCA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  motivationTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  motivationText: { fontSize: 13 },

  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 16 },

  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quickAccessItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 20,
  },
  quickAccessIconBg: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickAccessText: {
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '500',
  },

  classesContainer: { marginBottom: 20 },
  classCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  classInfo: { flex: 1 },
  classPeriod: { fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  classTime: { fontSize: 13, marginBottom: 2 },
  className: { fontSize: 13, marginBottom: 2 },
  classSubject: { fontSize: 13 },
  
  upcomingButton: {
    backgroundColor: '#5B4BCA',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  upcomingButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '600' },

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
  tabLabel: { fontSize: 11, marginTop: 4, fontWeight: '500' },

  centerModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  centerModalContentWrapper: {
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  centerModalContent: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
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
  },
  settingsOptionText: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#5B4BCA',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  drawerOverlay: {
    flex: 1,
    alignItems: 'flex-start',
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  drawerContainerWrapper: {
    width: '50%',
    maxWidth: 320,
    height: '100%',
    overflow: 'hidden',
  },
  drawerContent: {
    width: '100%',
    maxWidth: 320,
    height: '100%',
    padding: 20,
    paddingTop: 50,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
  },
  drawerIconBg: {
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

  bottomModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  bottomModalContentWrapper: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
  },
  bottomModalContent: {
    padding: 24,
    paddingBottom: 40,
  },
  modalDragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});
