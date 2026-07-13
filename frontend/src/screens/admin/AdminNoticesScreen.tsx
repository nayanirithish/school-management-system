import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

type AdminNoticesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminNotices'>;
interface Props {
  navigation: AdminNoticesNavigationProp;
}

export default function AdminNoticesScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filters = ['All', 'General', 'Academic', 'Event'];

  const notices = [
    { id: 1, title: 'Summer Vacation Notice', desc: 'Summer vacation will be from 25 May 2024 to 10 June 2024.', date: '22 May 2024', type: 'General', icon: 'white-balance-sunny' },
    { id: 2, title: 'Annual Exam Schedule', desc: 'Annual examinations will start from 15 June 2024.', date: '20 May 2024', type: 'Academic', icon: 'book-open-variant' },
    { id: 3, title: 'Sports Day Celebration', desc: 'Annual Sports Day will be held on 5 June 2024.', date: '18 May 2024', type: 'Event', icon: 'trophy-outline' },
    { id: 4, title: 'Fee Payment Reminder', desc: 'Please clear all pending fees before 31 May 2024.', date: '17 May 2024', type: 'General', icon: 'wallet-outline' },
  ];

  const getTypeStyle = (type: string) => {
    switch(type) {
      case 'General': return { bg: 'rgba(59, 130, 246, 0.2)', text: '#60A5FA' };
      case 'Academic': return { bg: 'rgba(16, 185, 129, 0.2)', text: '#34D399' };
      case 'Event': return { bg: 'rgba(249, 115, 22, 0.2)', text: '#FB923C' };
      default: return { bg: 'rgba(255, 255, 255, 0.1)', text: '#94A3B8' };
    }
  };

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <TouchableOpacity style={styles.menuButton} onPress={() => setIsDrawerOpen(true)}>
            <MaterialCommunityIcons name="menu" size={28} color="#E0E7FF" />
          </TouchableOpacity>
          <Text style={styles.brandTitle}>ORYOL</Text>
          <View style={styles.appBarRight}>
            <View style={styles.languageToggle}>
              <TouchableOpacity onPress={() => setIsTelugu(false)} style={!isTelugu ? styles.languageActive : styles.languageInactive}>
                <Text style={!isTelugu ? styles.langTextActive : styles.langTextInactive}>EN</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsTelugu(true)} style={isTelugu ? styles.languageActive : styles.languageInactive}>
                <Text style={isTelugu ? styles.langTextActive : styles.langTextInactive}>TE</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => navigation.navigate('AdminSettings' as any)}>
              <MaterialCommunityIcons name="cog-outline" size={24} color="#A78BFA" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Text style={styles.pageTitle}>{isTelugu ? 'నోటీసులు' : 'Notices'}</Text>

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
            {activeFilter === 'All' ? notices.map((notice) => {
              const typeStyle = getTypeStyle(notice.type);
              return (
                <BlurView intensity={20} tint="dark" key={notice.id} style={styles.noticeCard}>
                   <View style={styles.cardHeader}>
                      <View style={styles.noticeIconBg}>
                         <MaterialCommunityIcons name={notice.icon as any} size={24} color="#A78BFA" />
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
                </BlurView>
              );
            }) : notices.filter(n => n.type === activeFilter).map((notice) => {
              const typeStyle = getTypeStyle(notice.type);
              return (
                <BlurView intensity={20} tint="dark" key={notice.id} style={styles.noticeCard}>
                   <View style={styles.cardHeader}>
                      <View style={styles.noticeIconBg}>
                         <MaterialCommunityIcons name={notice.icon as any} size={24} color="#A78BFA" />
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
                </BlurView>
              );
            })}
            
            {(activeFilter !== 'All' && notices.filter(n => n.type === activeFilter).length === 0) && (
              <View style={{ alignItems: 'center', paddingVertical: 40 }}>
                <MaterialCommunityIcons name="bell-off-outline" size={48} color="#475569" />
                <Text style={{ fontSize: 15, color: '#94A3B8', marginTop: 8 }}>{isTelugu ? 'నోటీసులు కనుగొనబడలేదు' : 'No notices found'}</Text>
              </View>
            )}
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
              <Text style={styles.fabText}>{isTelugu ? 'నోటీసును జోడించండి' : 'Add Notice'}</Text>
           </TouchableOpacity>
        </View>

        {/* Drawer Modal */}
        {isDrawerOpen && (
          <View style={[StyleSheet.absoluteFill, { zIndex: 100 }]}>
            <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setIsDrawerOpen(false)}>
              <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
            </TouchableOpacity>
            <View style={styles.drawerContainer}>
              <LinearGradient colors={['#1E293B', '#0F172A']} style={styles.drawerGradient}>
                <View style={styles.drawerHeader}>
                  <Text style={styles.drawerTitle}>Admin Menu</Text>
                  <TouchableOpacity onPress={() => setIsDrawerOpen(false)}>
                    <MaterialCommunityIcons name="close" size={28} color="#E0E7FF" />
                  </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={styles.drawerScroll}>
                  <TouchableOpacity style={styles.drawerItem} onPress={() => { setIsDrawerOpen(false); navigation.navigate('AdminStudentManagement' as any); }}>
                    <MaterialCommunityIcons name="account-group-outline" size={24} color="#A78BFA" style={styles.drawerItemIcon} />
                    <Text style={styles.drawerItemText}>Student Management</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerItem} onPress={() => { setIsDrawerOpen(false); navigation.navigate('AdminFacultyManagement' as any); }}>
                    <MaterialCommunityIcons name="human-male-board" size={24} color="#A78BFA" style={styles.drawerItemIcon} />
                    <Text style={styles.drawerItemText}>Faculty Management</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.drawerItem} onPress={() => { setIsDrawerOpen(false); navigation.navigate('AdminComplaintManagement' as any); }}>
                    <MaterialCommunityIcons name="alert-circle-outline" size={24} color="#A78BFA" style={styles.drawerItemIcon} />
                    <Text style={styles.drawerItemText}>Complaint Management</Text>
                  </TouchableOpacity>
                </ScrollView>
              </LinearGradient>
            </View>
          </View>
        )}

        {/* Bottom Tab Bar */}
        <BlurView intensity={40} tint="dark" style={styles.bottomTabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminFeeManagement')}>
            <MaterialCommunityIcons name="receipt" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Fee{'\n'}Mgmt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons name="bell" size={28} color="#A78BFA" />
            <Text style={[styles.tabLabel, { color: '#A78BFA' }]}>Notice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminProfile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Profile</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  menuButton: { marginRight: 16 },
  brandTitle: { fontSize: 22, fontWeight: '900', color: '#F8FAFC', flex: 1, letterSpacing: 0.5 },
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 16,
    height: 32,
    alignItems: 'center',
    padding: 2,
  },
  languageActive: {
    backgroundColor: '#8B5CF6',
    borderRadius: 14,
    paddingHorizontal: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageInactive: { paddingHorizontal: 10, justifyContent: 'center' },
  langTextActive: { color: '#F8FAFC', fontSize: 11, fontWeight: 'bold' },
  langTextInactive: { color: '#9CA3AF', fontSize: 11, fontWeight: '500' },

  scrollContent: { paddingHorizontal: 16, paddingTop: 16 },

  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 16 },

  filterRow: { flexDirection: 'row', marginBottom: 20, paddingRight: 16 },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginRight: 12,
  },
  filterPillActive: { backgroundColor: '#5B4BCA', borderColor: '#5B4BCA' },
  filterText: { fontSize: 14, color: '#94A3B8', fontWeight: '500' },
  filterTextActive: { color: '#F8FAFC' },

  listContainer: { paddingBottom: 20 },
  noticeCard: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  cardHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  noticeIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(91, 75, 202, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleContainer: { flex: 1, justifyContent: 'center', paddingTop: 2 },
  noticeTitle: { fontSize: 15, fontWeight: 'bold', color: '#F8FAFC' },
  typePill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginLeft: 8 },
  typeText: { fontSize: 11, fontWeight: 'bold' },
  
  noticeDesc: { fontSize: 14, color: '#94A3B8', marginBottom: 12, lineHeight: 20, paddingLeft: 56 },
  noticeDate: { fontSize: 12, color: '#64748B', paddingLeft: 56 },

  fabContainer: { position: 'absolute', bottom: 80, left: 16, right: 16 },
  fabButton: { 
    flexDirection: 'row',
    backgroundColor: '#5B4BCA', 
    borderRadius: 30, 
    paddingVertical: 14, 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#5B4BCA', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.5, 
    shadowRadius: 8, 
    elevation: 4 
  },
  fabText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },

  bottomTabBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)', position: 'absolute', bottom: 0, width: '100%' },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 10, color: '#94A3B8', marginTop: 4, fontWeight: '500', textAlign: 'center' },

  drawerContainer: { width: '75%', height: '100%', borderRightWidth: 1, borderColor: 'rgba(255,255,255,0.1)', shadowColor: '#000', shadowOffset: { width: 5, height: 0 }, shadowOpacity: 0.3, shadowRadius: 15, elevation: 20 },
  drawerGradient: { flex: 1 },
  drawerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  drawerTitle: { fontSize: 20, fontWeight: 'bold', color: '#F8FAFC' },
  drawerScroll: { paddingVertical: 10 },
  drawerItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  drawerItemIcon: { marginRight: 16 },
  drawerItemText: { fontSize: 16, color: '#E2E8F0', fontWeight: '500' },
});
