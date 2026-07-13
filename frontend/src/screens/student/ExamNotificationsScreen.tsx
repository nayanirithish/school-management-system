import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type ExamNotificationsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ExamNotifications'>;
interface Props {
  navigation: ExamNotificationsNavigationProp;
}

export default function ExamNotificationsScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const [showAll, setShowAll] = useState(false);

  const notifications = [
    { 
      id: 1, 
      title: isTelugu ? 'యూనిట్ టెస్ట్ - 1' : 'Unit Test - 1', 
      subtitle: isTelugu ? 'గణితం' : 'Mathematics', 
      date: '24 May 2024', 
      color: '#3B82F6', 
      icon: 'file-document-outline' 
    },
    { 
      id: 2, 
      title: isTelugu ? 'యూనిట్ టెస్ట్ - 1' : 'Unit Test - 1', 
      subtitle: isTelugu ? 'సైన్స్' : 'Science', 
      date: '27 May 2024', 
      color: '#10B981', 
      icon: 'file-document-outline' 
    },
    { 
      id: 3, 
      title: isTelugu ? 'అర్ధ వార్షిక పరీక్షలు' : 'Half Yearly Exams', 
      date: '10 Jun - 20 Jun 2024', 
      color: '#F97316', 
      icon: 'calendar-outline',
      hasDownload: true,
    },
    { 
      id: 4, 
      title: isTelugu ? 'ప్రీ-ఫైనల్ పరీక్షలు' : 'Pre-Final Exams', 
      date: '5 Aug - 15 Aug 2024', 
      color: '#EF4444', 
      icon: 'alert-circle-outline',
      hasDownload: true,
    },
    { 
      id: 5, 
      title: isTelugu ? 'ఫైనల్ పరీక్షలు' : 'Final Exams', 
      date: '10 Sep - 25 Sep 2024', 
      color: '#8B5CF6', 
      icon: 'school-outline',
      hasDownload: true,
    },
    { 
      id: 6, 
      title: isTelugu ? 'ప్రాక్టికల్ పరీక్షలు' : 'Practical Exams', 
      date: '1 Oct - 5 Oct 2024', 
      color: '#EC4899', 
      icon: 'flask-outline',
      hasDownload: false,
    },
    { 
      id: 7, 
      title: isTelugu ? 'యూనిట్ టెస్ట్ - 2' : 'Unit Test - 2', 
      subtitle: isTelugu ? 'ఇంగ్లీష్' : 'English', 
      date: '15 Oct 2024', 
      color: '#06B6D4', 
      icon: 'file-document-outline',
      hasDownload: false,
    },
  ];

  const visibleNotifications = showAll ? notifications : notifications.slice(0, 3);

  const handleDownload = (examTitle: string) => {
    alert(`Downloading timetable for ${examTitle}...`);
  };

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
            <TouchableOpacity style={{ marginLeft: 12 }}>
              <MaterialCommunityIcons name="cog-outline" size={24} color="#A78BFA" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sub Header */}
        <View style={styles.subHeader}>
           <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight: 16}}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#E0E7FF" />
           </TouchableOpacity>
           <Text style={styles.pageTitle}>{isTelugu ? 'పరీక్ష నోటిఫికేషన్లు' : 'Exam Notifications'}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Notifications List */}
          {visibleNotifications.map((item) => (
            <BlurView intensity={20} tint="dark" style={[styles.notificationCard, { borderColor: item.color, shadowColor: item.color, shadowOpacity: 0.6, shadowRadius: 8, elevation: 5 }]} key={item.id}>
              <View style={[styles.iconCircle, { backgroundColor: item.color + '15' }]}>
                <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                {item.subtitle && <Text style={styles.cardSubtitle}>{item.subtitle}</Text>}
                <Text style={styles.cardDate}>{item.date}</Text>
              </View>
              {item.hasDownload && (
                <TouchableOpacity 
                  style={styles.downloadButton}
                  onPress={() => handleDownload(item.title)}
                >
                  <MaterialCommunityIcons name="download-outline" size={24} color="#A78BFA" />
                </TouchableOpacity>
              )}
            </BlurView>
          ))}

          {/* View All Button */}
          {notifications.length > 3 && (
            <TouchableOpacity 
              style={styles.viewAllButton}
              onPress={() => setShowAll(!showAll)}
            >
              <Text style={styles.viewAllText}>
                {showAll 
                  ? (isTelugu ? 'తక్కువ చూపించు' : 'Show Less') 
                  : (isTelugu ? 'అన్నింటినీ వీక్షించండి' : 'View All')}
              </Text>
            </TouchableOpacity>
          )}

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar (Fixed) */}
        <BlurView intensity={40} tint="dark" style={[styles.bottomTabBar, { borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)' }]}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'హోమ్' : 'Home'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FeeSection')}>
            <MaterialCommunityIcons name="credit-card-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'ఫీజు చెల్లింపు' : 'Fee Payment'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons name="bell" size={28} color="#C4B5FD" style={{ textShadowColor: '#6D28D9', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 }} />
            <Text style={[styles.tabLabel, { color: '#6D28D9', textShadowColor: '#6D28D9', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 }]}>{isTelugu ? 'నోటిఫికేషన్' : 'Notification'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentProfile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
          </TouchableOpacity>
        </BlurView>

      </SafeAreaView>
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
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  brandTitle: { fontSize: 20, fontWeight: '800', color: '#6D28D9', letterSpacing: 1 },
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 16,
    padding: 2,
    alignItems: 'center',
  },
  languagePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  languageActive: { backgroundColor: '#8B5CF6' },
  languageInactive: { backgroundColor: 'transparent' },
  languageText: { fontSize: 11, fontWeight: 'bold', color: '#94A3B8' },
  languageTextActive: { color: '#F8FAFC' },

  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#F1F5F9' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },

  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  iconCircle: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#F1F5F9', marginBottom: 4 },
  cardSubtitle: { fontSize: 14, color: '#CBD5E1', marginBottom: 4 },
  cardDate: { fontSize: 14, color: '#94A3B8', fontWeight: '600' },
  downloadButton: {
    padding: 8,
    backgroundColor: 'rgba(91, 75, 202, 0.3)',
    borderRadius: 12,
    marginLeft: 12,
  },

  viewAllButton: {
    backgroundColor: 'rgba(91, 75, 202, 0.2)',
    borderColor: '#8B5CF6',
    borderWidth: 1,
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  viewAllText: { color: '#F1F5F9', fontSize: 16, fontWeight: 'bold' },

  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.5)',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 4, fontWeight: '500' },
});
