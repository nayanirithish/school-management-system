import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type FacultyNoticesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FacultyNotices'>;
interface Props {
  navigation: FacultyNoticesNavigationProp;
}

export default function FacultyNoticesScreen({ navigation }: Props) {
  const [isTelugu, setIsTelugu] = useState(false);
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
      color: '#5B4BCA' 
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
      color: '#5B4BCA' 
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
      color: '#6366F1' 
    },
  ];

  const filteredNotices = noticesData.filter(notice => activeTab === 'All' || notice.type === activeTab);

  return (
    <LinearGradient colors={['#FAFAFA', '#F3E8FF', '#E0F2FE']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <View style={styles.appBarLeft}>
             <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight: 12}}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
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
                 <Text style={[styles.languageText, !isTelugu && styles.languageTextActive]}>English</Text>
              </View>
              <View style={[styles.languagePill, isTelugu ? styles.languageActive : styles.languageInactive]}>
                 <Text style={[styles.languageText, isTelugu && styles.languageTextActive]}>Telugu</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 12 }}>
              <MaterialCommunityIcons name="cog-outline" size={24} color="#6B7280" />
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
              <BlurView intensity={80} tint="light" style={styles.noticeCard} key={notice.id}>
                <View style={styles.cardHeader}>
                  <View style={[styles.iconContainer, { backgroundColor: notice.color + '1A' }]}>
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
                <MaterialCommunityIcons name="bell-off-outline" size={48} color="#D1D5DB" />
                <Text style={styles.emptyStateText}>{isTelugu ? 'నోటీసులు లేవు' : 'No notices found'}</Text>
              </View>
            )}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar */}
        <BlurView intensity={90} tint="light" style={styles.bottomTabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'హోమ్' : 'Home'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyTimeTable')}>
            <MaterialCommunityIcons name="calendar-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'టైమ్ టేబుల్' : 'Time Table'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons name="bell" size={28} color="#5B4BCA" />
            <Text style={[styles.tabLabel, { color: '#5B4BCA' }]}>{isTelugu ? 'నోటిఫికేషన్' : 'Notification'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  appBarLeft: { flexDirection: 'row', alignItems: 'center' },
  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    padding: 2,
    alignItems: 'center',
  },
  languagePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  languageActive: { backgroundColor: '#E0E7FF' },
  languageInactive: { backgroundColor: 'transparent' },
  languageText: { fontSize: 11, fontWeight: 'bold', color: '#6B7280' },
  languageTextActive: { color: '#5B4BCA' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  tabSelectorRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  tabPill: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    marginRight: 12,
  },
  tabPillActive: {
    backgroundColor: '#5B4BCA',
  },
  tabPillText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  tabPillTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  noticesContainer: {
    paddingBottom: 20,
  },
  noticeCard: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
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
    color: '#111827',
    marginBottom: 2,
  },
  noticeDate: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  newBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  noticePreview: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 15,
    color: '#9CA3AF',
    marginTop: 8,
  },

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
  tabLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 4, fontWeight: '500' },
});
