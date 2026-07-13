import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type FacultyNoticesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FacultyNotices'>;
interface Props {
  navigation: FacultyNoticesNavigationProp;
}

export default function FacultyNoticesScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { isTelugu, setIsTelugu } = useLanguage();
  const [activeTab, setActiveTab] = useState<'All' | 'Department' | 'School'>('All');

  const tabs = [
    { id: 'All', en: 'All', te: 'అన్నీ' },
    { id: 'Department', en: 'Department', te: 'విభాగం' },
    { id: 'School', en: 'School', te: 'పాఠశాల' },
  ] as const;

  const noticesData = [
    { 
      id: 1, 
      titleEN: 'Staff Meeting', titleTE: 'స్టాఫ్ మీటింగ్', 
      date: '21 May 2024', 
      previewEN: 'All faculty members are requested to attend the staff meeting.', 
      previewTE: 'అధ్యాపకులందరూ స్టాఫ్ మీటింగ్‌కు హాజరుకావాల్సిందిగా కోరుతున్నాము.',
      type: 'Department', 
      isNew: true, 
      icon: 'account-group-outline', 
      color: '#A855F7' 
    },
    { 
      id: 2, 
      titleEN: 'Exam Duty Schedule', titleTE: 'పరీక్షా విధి షెడ్యూల్', 
      date: '20 May 2024', 
      previewEN: 'Exam duty schedule for the upcoming term exams is now...', 
      previewTE: 'రాబోయే టర్మ్ పరీక్షల కోసం పరీక్ష విధి షెడ్యూల్...',
      type: 'School', 
      isNew: false, 
      icon: 'file-document-outline', 
      color: '#3B82F6' 
    },
    { 
      id: 3, 
      titleEN: 'Holiday Notice', titleTE: 'సెలవు నోటీసు', 
      date: '18 May 2024', 
      previewEN: 'School will remain closed on 25th May 2024 on account of...', 
      previewTE: 'మే 25, 2024న పాఠశాల మూసివేయబడుతుంది...',
      type: 'School', 
      isNew: false, 
      icon: 'calendar-blank-outline', 
      color: '#A855F7' 
    },
    { 
      id: 4, 
      titleEN: 'Workshop on AI Tools', titleTE: 'AI టూల్స్‌పై వర్క్‌షాప్', 
      date: '17 May 2024', 
      previewEN: 'Join us for a workshop to explore AI tools in education...', 
      previewTE: 'విద్యలో AI సాధనాలను అన్వేషించడానికి మాతో చేరండి...',
      type: 'Department', 
      isNew: false, 
      icon: 'monitor', 
      color: '#10B981' 
    },
  ];

  const filteredNotices = noticesData.filter(notice => activeTab === 'All' || notice.type === activeTab);

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <View style={styles.appBarLeft}>
             <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight: 12}}>
                <MaterialCommunityIcons name="menu" size={24} color="#E0E7FF" />
             </TouchableOpacity>
             <Text style={styles.pageTitle}>{isTelugu ? 'నోటీసులు' : 'Notices'}</Text>
          </View>
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
            <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => navigation.navigate('FacultySettings' as any)}>
              <MaterialCommunityIcons name="cog-outline" size={24} color="#A78BFA" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Main Tab Selector (Nav Buttons) */}
          <View style={styles.tabSelectorRow}>
            {tabs.map((tab) => (
              <TouchableOpacity 
                key={tab.id}
                style={[styles.tabPill, activeTab === tab.id && styles.tabPillActive]} 
                onPress={() => setActiveTab(tab.id as any)}
              >
                 <Text style={[styles.tabPillText, activeTab === tab.id && styles.tabPillTextActive]}>
                   {isTelugu ? tab.te : tab.en}
                 </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Notices List */}
          <View style={styles.noticesContainer}>
            {filteredNotices.map((notice) => (
              <BlurView intensity={20} tint="dark" style={[styles.noticeCard, { borderColor: notice.color, shadowColor: notice.color, shadowOpacity: 0.5, shadowRadius: 6, elevation: 4 }]} key={notice.id}>
                <View style={styles.cardHeader}>
                  <View style={[styles.iconContainer, { backgroundColor: notice.color + '30' }]}>
                    <MaterialCommunityIcons name={notice.icon as any} size={24} color={notice.color} />
                  </View>
                  <View style={styles.headerTextInfo}>
                    <Text style={styles.noticeTitle}>{isTelugu ? notice.titleTE : notice.titleEN}</Text>
                    <Text style={styles.noticeDate}>{notice.date}</Text>
                  </View>
                  {notice.isNew && (
                    <View style={styles.newBadge}>
                      <Text style={styles.newBadgeText}>{isTelugu ? 'కొత్తది' : 'New'}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.noticePreview}>
                  {isTelugu ? notice.previewTE : notice.previewEN}
                </Text>
              </BlurView>
            ))}

            {filteredNotices.length === 0 && (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons name="bell-off-outline" size={48} color="#64748B" />
                <Text style={styles.emptyStateText}>{isTelugu ? 'నోటీసులు లేవు' : 'No notices found'}</Text>
              </View>
            )}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Floating Add Button */}
        <View style={[styles.fabContainer, { bottom: Math.max(insets.bottom, 12) + 70 }]}>
           <TouchableOpacity 
             style={styles.fabButton}
             onPress={() => navigation.navigate('FacultyAddNotice')}
           >
              <MaterialCommunityIcons name="plus" size={24} color="#FFF" />
              <Text style={styles.fabText}>{isTelugu ? 'నోటీస్ జోడించండి' : 'Add Notice'}</Text>
           </TouchableOpacity>
        </View>

        {/* Bottom Tab Bar */}
        <BlurView intensity={40} tint="dark" style={[styles.bottomTabBar, { borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)', paddingBottom: Math.max(insets.bottom, 12) }]}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'హోమ్' : 'Home'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyTimeTable')}>
            <MaterialCommunityIcons name="calendar-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'టైమ్ టేబుల్' : 'Time Table'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons name="bell" size={28} color="#A855F7" />
            <Text style={[styles.tabLabel, { color: '#A855F7' }]}>{isTelugu ? 'నోటిఫికేషన్' : 'Notification'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyProfile')}>
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
  safeArea: { flex: 1 },
  
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  appBarLeft: { flexDirection: 'row', alignItems: 'center' },
  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#E0E7FF' },
  
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

  tabSelectorRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  tabPill: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  tabPillActive: {
    backgroundColor: '#A855F7',
    borderColor: '#C084FC',
  },
  tabPillText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94A3B8',
  },
  tabPillTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  noticesContainer: {
    paddingBottom: 20,
  },
  noticeCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTextInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F1F5F9',
    marginBottom: 2,
  },
  noticeDate: {
    fontSize: 13,
    color: '#94A3B8',
  },
  newBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  newBadgeText: {
    color: '#34D399',
    fontSize: 11,
    fontWeight: 'bold',
  },
  noticePreview: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 20,
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 8,
  },

  fabContainer: { position: 'absolute', left: 16, right: 16 },
  fabButton: { 
    flexDirection: 'row',
    backgroundColor: '#A855F7', 
    borderRadius: 30, 
    paddingVertical: 14, 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#A855F7', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.5, 
    shadowRadius: 8, 
    elevation: 4 
  },
  fabText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },

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
});
