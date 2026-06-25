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
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import GlassBackground from '../components/GlassBackground';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';

type AdminNoticesProp = NativeStackNavigationProp<RootStackParamList, 'AdminNotices'>;
interface Props {
  navigation: AdminNoticesProp;
}

export default function AdminNoticesScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'General', 'Academic', 'Event'];

  const notices = [
    { 
      id: '1', 
      title: 'Summer Vacation Notice', 
      description: 'Summer vacation will be from 25 May 2024 to 10 June 2024.', 
      date: '22 May 2024', 
      category: 'General',
      icon: 'bullhorn-outline',
      iconBg: 'rgba(167, 139, 250, 0.15)', // Light purple
      iconColor: '#c4b5fd'
    },
    { 
      id: '2', 
      title: 'Annual Exam Schedule', 
      description: 'Annual examinations will start from 15 June 2024.', 
      date: '20 May 2024', 
      category: 'Academic',
      icon: 'calendar-outline',
      iconBg: 'rgba(52, 211, 153, 0.15)',
      iconColor: '#6ee7b7'
    },
    { 
      id: '3', 
      title: 'Sports Day Celebration', 
      description: 'Annual Sports Day will be held on 5 June 2024.', 
      date: '18 May 2024', 
      category: 'Event',
      icon: 'trophy-outline',
      iconBg: 'rgba(251, 191, 36, 0.15)',
      iconColor: '#fcd34d'
    },
    { 
      id: '4', 
      title: 'Fee Payment Reminder', 
      description: 'Please clear all pending fees before 31 May 2024.', 
      date: '17 May 2024', 
      category: 'General',
      icon: 'receipt',
      iconBg: 'rgba(56, 189, 248, 0.15)',
      iconColor: '#7dd3fc'
    },
  ];

  const filteredNotices = selectedFilter === 'All' 
    ? notices 
    : notices.filter(n => n.category === selectedFilter);

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <GlassCard style={styles.appBar} intensity={isDark ? 40 : 80} styleOverride={{ borderRadius: 0, borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color={isDark ? "#FFFFFF" : "#111827"} />
          </TouchableOpacity>
          <Text style={[styles.brandTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Notices</Text>
          <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons name="cog-outline" size={24} color={isDark ? "#D1D5DB" : "#6B7280"} />
          </TouchableOpacity>
        </GlassCard>

        {/* Filter Chips */}
        <View style={styles.filterContainer}>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
             {filters.map(filter => {
               const isActive = selectedFilter === filter;
               return (
                 <TouchableOpacity 
                   key={filter}
                   style={[
                     styles.filterChipWrapper,
                     isActive 
                       ? [styles.filterChipActiveWrapper, { backgroundColor: isDark ? '#38bdf8' : '#4f46e5' }] 
                       : [styles.filterChipInactiveWrapper, { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }]
                   ]}
                   onPress={() => setSelectedFilter(filter)}
                   activeOpacity={0.8}
                 >
                    <GlassCard 
                      intensity={isActive ? 0 : (isDark ? 20 : 60)} 
                      style={[styles.filterChip, isActive ? styles.filterChipActive : styles.filterChipInactive]}
                      styleOverride={{ borderRadius: 20 }}
                    >
                       <Text style={[
                         styles.filterText,
                         isActive 
                           ? styles.filterTextActive 
                           : [styles.filterTextInactive, { color: isDark ? '#D1D5DB' : '#4B5563' }]
                       ]}>
                         {filter}
                       </Text>
                    </GlassCard>
                 </TouchableOpacity>
               );
             })}
           </ScrollView>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Notices List */}
          {filteredNotices.map(notice => (
            <View key={notice.id} style={styles.noticeCardWrapper}>
               <GlassCard intensity={isDark ? 20 : 60} style={styles.noticeCard} styleOverride={{ borderRadius: 20 }}>
                  <View style={[styles.iconCircle, { backgroundColor: notice.iconBg }]}>
                     <MaterialCommunityIcons name={notice.icon as any} size={24} color={isDark ? notice.iconColor : '#111827'} />
                  </View>
                  <View style={styles.noticeInfo}>
                     <View style={styles.noticeHeader}>
                        <Text style={[styles.noticeTitle, { color: isDark ? '#FFFFFF' : '#111827' }]} numberOfLines={1}>{notice.title}</Text>
                        <View style={[
                           styles.categoryBadge, 
                           notice.category === 'General' && { backgroundColor: isDark ? 'rgba(56, 189, 248, 0.15)' : 'rgba(56, 189, 248, 0.2)' },
                           notice.category === 'Academic' && { backgroundColor: isDark ? 'rgba(52, 211, 153, 0.15)' : 'rgba(52, 211, 153, 0.2)' },
                           notice.category === 'Event' && { backgroundColor: isDark ? 'rgba(251, 191, 36, 0.15)' : 'rgba(251, 191, 36, 0.2)' },
                        ]}>
                           <Text style={[
                              styles.categoryText,
                              notice.category === 'General' && { color: isDark ? '#38bdf8' : '#0284c7' },
                              notice.category === 'Academic' && { color: isDark ? '#34d399' : '#059669' },
                              notice.category === 'Event' && { color: isDark ? '#fbbf24' : '#d97706' },
                           ]}>
                              {notice.category}
                           </Text>
                        </View>
                     </View>
                     <Text style={[styles.noticeDescription, { color: isDark ? '#9CA3AF' : '#4B5563' }]} numberOfLines={2}>{notice.description}</Text>
                     <Text style={[styles.noticeDate, { color: isDark ? '#6B7280' : '#9CA3AF' }]}>{notice.date}</Text>
                  </View>
               </GlassCard>
            </View>
          ))}

          {/* Add Notice Button */}
          <TouchableOpacity 
             style={styles.addButtonWrapper} 
             onPress={() => navigation.navigate('AdminAddNotice')}
          >
             <LinearGradient colors={isDark ? ['#38bdf8', '#0284c7'] : ['#4f46e5', '#3730a3']} style={styles.addButton}>
                <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
                <Text style={styles.addButtonText}>Add Notice</Text>
             </LinearGradient>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar */}
        <GlassCard intensity={isDark ? 60 : 90} style={styles.bottomTabBar} styleOverride={{ borderRadius: 0, borderTopWidth: 1, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminFeeManagement')}>
            <MaterialCommunityIcons name="receipt" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Fee Mgmt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons name="bell-outline" size={28} color={isDark ? "#38bdf8" : "#4f46e5"} />
            <Text style={[styles.tabLabel, { color: isDark ? '#38bdf8' : '#4f46e5' }]}>Notices</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminProfile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Profile</Text>
          </TouchableOpacity>
        </GlassCard>

      </SafeAreaView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, width: '100%' },
  
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  brandTitle: { fontSize: 18, fontWeight: '700' },

  filterContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(156,163,175,0.1)',
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterChipWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  filterChipActiveWrapper: {
    // Dynamic background set inline
  },
  filterChipInactiveWrapper: {
    borderWidth: 1,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  filterChipActive: {
    backgroundColor: 'transparent',
  },
  filterChipInactive: {
    // Background handled by GlassCard
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  filterTextInactive: {
    // Handled inline for dynamic light/dark support
  },

  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },

  noticeCardWrapper: {
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  noticeCard: {
    flexDirection: 'row',
    padding: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  noticeInfo: {
    flex: 1,
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  noticeDescription: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 8,
  },
  noticeDate: {
    fontSize: 12,
  },

  addButtonWrapper: {
    marginTop: 8,
    borderRadius: 24,
    overflow: 'hidden',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 5,
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 4, fontWeight: '500' },
});
