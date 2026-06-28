import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type AdminNoticesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminNotices'>;
interface Props {
  navigation: AdminNoticesNavigationProp;
}

export default function AdminNoticesScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'General', 'Academic', 'Event'];

  const notices = [
    { id: 1, title: 'Summer Vacation Notice', desc: 'Summer vacation will be from 25 May 2024 to 10 June 2024.', date: '22 May 2024', type: 'General', icon: 'white-balance-sunny' },
    { id: 2, title: 'Annual Exam Schedule', desc: 'Annual examinations will start from 15 June 2024.', date: '20 May 2024', type: 'Academic', icon: 'book-open-variant' },
    { id: 3, title: 'Sports Day Celebration', desc: 'Annual Sports Day will be held on 5 June 2024.', date: '18 May 2024', type: 'Event', icon: 'trophy-outline' },
    { id: 4, title: 'Fee Payment Reminder', desc: 'Please clear all pending fees before 31 May 2024.', date: '17 May 2024', type: 'General', icon: 'wallet-outline' },
  ];

  const getTypeStyle = (type: string) => {
    switch(type) {
      case 'General': return { bg: '#E0F2FE', text: '#3B82F6' };
      case 'Academic': return { bg: '#D1FAE5', text: '#10B981' };
      case 'Event': return { bg: '#FFEDD5', text: '#F97316' };
      default: return { bg: '#F3F4F6', text: '#6B7280' };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>ORYOL</Text>
        <View style={styles.appBarRight}>
          <View style={styles.languageToggle}>
            <TouchableOpacity onPress={() => setIsTelugu(false)} style={!isTelugu ? styles.languageActive : styles.languageInactive}>
              <Text style={!isTelugu ? styles.langTextActive : styles.langTextInactive}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsTelugu(true)} style={isTelugu ? styles.languageActive : styles.languageInactive}>
              <Text style={isTelugu ? styles.langTextActive : styles.langTextInactive}>Telugu</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ marginLeft: 12 }}>
            <MaterialCommunityIcons name="cog-outline" size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.pageTitle}>Notices</Text>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
           {filters.map((filter) => (
             <TouchableOpacity 
               key={filter} 
               style={[styles.filterPill, activeFilter === filter && styles.filterPillActive]}
               onPress={() => setActiveFilter(filter)}
             >
                <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
             </TouchableOpacity>
           ))}
        </ScrollView>

        {/* Notices List */}
        <View style={styles.listContainer}>
          {notices.map((notice) => {
            const typeStyle = getTypeStyle(notice.type);
            return (
              <View key={notice.id} style={styles.noticeCard}>
                 <View style={styles.cardHeader}>
                    <View style={styles.noticeIconBg}>
                       <MaterialCommunityIcons name={notice.icon as any} size={24} color="#111827" />
                    </View>
                    <View style={styles.titleContainer}>
                       <Text style={styles.noticeTitle}>{notice.title}</Text>
                    </View>
                    <View style={[styles.typePill, { backgroundColor: typeStyle.bg }]}>
                       <Text style={[styles.typeText, { color: typeStyle.text }]}>{notice.type}</Text>
                    </View>
                 </View>
                 <Text style={styles.noticeDesc}>{notice.desc}</Text>
                 <Text style={styles.noticeDate}>{notice.date}</Text>
              </View>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Add Button */}
      <View style={styles.fabContainer}>
         <TouchableOpacity 
           style={styles.fabButton}
           onPress={() => navigation.navigate('AdminAddNotice')}
         >
            <MaterialCommunityIcons name="plus" size={24} color="#FFF" />
            <Text style={styles.fabText}>Add Notice</Text>
         </TouchableOpacity>
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminHome')}>
          <MaterialCommunityIcons name="home-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminFeeManagement')}>
          <MaterialCommunityIcons name="receipt" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Fee{'\n'}Management</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialCommunityIcons name="bell" size={28} color="#4F46E5" />
          <Text style={[styles.tabLabel, { color: '#4F46E5' }]}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminProfile')}>
          <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: { marginRight: 16 },
  brandTitle: { fontSize: 22, fontWeight: '900', color: '#4F46E5', flex: 1, letterSpacing: 0.5 },
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    height: 32,
    alignItems: 'center',
    padding: 2,
  },
  languageActive: {
    backgroundColor: '#4F46E5',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageInactive: { paddingHorizontal: 12, justifyContent: 'center' },
  langTextActive: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  langTextInactive: { color: '#4F46E5', fontSize: 12, fontWeight: '500' },

  scrollContent: { paddingHorizontal: 16, paddingTop: 16 },

  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 16 },

  filterRow: { flexDirection: 'row', marginBottom: 20, paddingRight: 16 },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterPillActive: { backgroundColor: '#4F46E5', borderColor: '#4F46E5' },
  filterText: { fontSize: 14, color: '#4B5563', fontWeight: '500' },
  filterTextActive: { color: '#FFFFFF' },

  listContainer: { paddingBottom: 20 },
  noticeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  noticeIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleContainer: { flex: 1, justifyContent: 'center', paddingTop: 2 },
  noticeTitle: { fontSize: 15, fontWeight: 'bold', color: '#111827' },
  typePill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginLeft: 8 },
  typeText: { fontSize: 11, fontWeight: 'bold' },
  
  noticeDesc: { fontSize: 14, color: '#6B7280', marginBottom: 12, lineHeight: 20, paddingLeft: 56 },
  noticeDate: { fontSize: 12, color: '#9CA3AF', paddingLeft: 56 },

  fabContainer: { position: 'absolute', bottom: 80, left: 16, right: 16 },
  fabButton: { 
    flexDirection: 'row',
    backgroundColor: '#4F46E5', 
    borderRadius: 30, 
    paddingVertical: 14, 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#4F46E5', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    elevation: 4 
  },
  fabText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },

  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 10, color: '#9CA3AF', marginTop: 4, fontWeight: '500', textAlign: 'center' },
});
