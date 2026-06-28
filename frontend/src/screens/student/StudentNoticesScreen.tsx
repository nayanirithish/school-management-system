import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type StudentNoticesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'StudentNotices'>;
interface Props {
  navigation: StudentNoticesNavigationProp;
}

export default function StudentNoticesScreen({ navigation }: Props) {
  const { isTelugu } = useLanguage();

  const notices = [
    { id: 1, title: 'PTM scheduled on 25 May 2024', date: '20 May 2024', type: 'General' },
    { id: 2, title: 'Annual Sports Meet 2024', date: '18 May 2024', type: 'Event' },
    { id: 3, title: 'Science Exhibition Registrations Open', date: '15 May 2024', type: 'Academic' },
  ];

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
    <SafeAreaView style={styles.safeArea}>
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
           <MaterialCommunityIcons name="menu" size={28} color="#F1F5F9" />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>ORYOL</Text>
        <View style={styles.appBarRight}>
          <TouchableOpacity 
            style={styles.languageToggle} 
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
            <MaterialCommunityIcons name="arrow-left" size={24} color="#F1F5F9" />
         </TouchableOpacity>
         <Text style={styles.pageTitle}>{isTelugu ? 'నోటిఫికేషన్లు' : 'Notifications'}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {notices.map((notice) => (
          <BlurView intensity={20} tint="dark" key={notice.id} style={styles.noticeCard}>
            <View style={styles.noticeHeader}>
              <Text style={styles.noticeType}>{notice.type}</Text>
              <Text style={styles.noticeDate}>{notice.date}</Text>
            </View>
            <Text style={styles.noticeTitle}>{notice.title}</Text>
          </BlurView>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <BlurView intensity={40} tint="dark" style={[styles.bottomTabBar, { borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)' }]}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentHome')}>
          <MaterialCommunityIcons name="home-outline" size={28} color="#94A3B8" />
          <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FeeSection')}>
          <MaterialCommunityIcons name="credit-card-outline" size={28} color="#94A3B8" />
          <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>Fee Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentNotices')}>
          <MaterialCommunityIcons name="bell-outline" size={28} color="#94A3B8" />
          <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentProfile')}>
          <MaterialCommunityIcons name="account-outline" size={28} color="#94A3B8" />
          <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>Profile</Text>
        </TouchableOpacity>
      </BlurView>

    </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: 'transparent' },
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
    backgroundColor: 'rgba(0,0,0,0.05)',
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
  languageTextActive: { color: '#FFFFFF' },

  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#F1F5F9' },
  content: { padding: 16 },
  noticeCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#8B5CF6',
    overflow: 'hidden',
  },
  noticeHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  noticeType: { fontSize: 12, fontWeight: 'bold', color: '#6D28D9' },
  noticeDate: { fontSize: 12, color: '#94A3B8' },
  noticeTitle: { fontSize: 16, color: '#F8FAFC', fontWeight: '500' },
  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, marginTop: 4, fontWeight: '500' },
});
