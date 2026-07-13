import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type AdminComplaintManagementNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminComplaintManagement'>;
interface Props {
  navigation: AdminComplaintManagementNavigationProp;
}

export default function AdminComplaintManagementScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortType, setSortType] = useState('date_desc');

  const filters = ['All', 'Open', 'In Progress', 'Resolved'];

  const [complaints] = useState([
    { id: 1, name: 'Rahul Kumar', class: 'Class 10 - A', status: 'Open', title: 'Classroom Noise Issue', category: 'Infrastructure', timestamp: new Date('2024-05-22T10:30:00Z').getTime(), date: '22 May 2024', time: '10:30 AM', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: 2, name: 'Ananya Rao', class: 'Class 9 - B', status: 'In Progress', title: 'Teacher Absence', category: 'Academic', timestamp: new Date('2024-05-20T08:15:00Z').getTime(), date: '20 May 2024', time: '08:15 AM', avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: 3, name: 'Vikram Singh', class: 'Class 8 - A', status: 'Resolved', title: 'Canteen Food Quality', category: 'General', timestamp: new Date('2024-05-18T14:45:00Z').getTime(), date: '18 May 2024', time: '02:45 PM', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 4, name: 'Pooja Verma', class: 'Class 11 - C', status: 'Open', title: 'Homework Overload', category: 'Academic', timestamp: new Date('2024-05-17T09:00:00Z').getTime(), date: '17 May 2024', time: '09:00 AM', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 5, name: 'Arjun Mehta', class: 'Class 7 - B', status: 'In Progress', title: 'Bullying Complaint', category: 'Discipline', timestamp: new Date('2024-05-15T11:20:00Z').getTime(), date: '15 May 2024', time: '11:20 AM', avatar: 'https://i.pravatar.cc/150?img=15' },
  ]);

  const totalCount = complaints.length;
  const openCount = complaints.filter(c => c.status === 'Open').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;

  let displayedComplaints = complaints.filter(c => activeFilter === 'All' ? true : c.status === activeFilter);
  
  displayedComplaints.sort((a, b) => {
      if (sortType.startsWith('date')) {
          return sortType.endsWith('desc') ? b.timestamp - a.timestamp : a.timestamp - b.timestamp;
      } else {
          const timeA = new Date(a.timestamp).getHours() * 60 + new Date(a.timestamp).getMinutes();
          const timeB = new Date(b.timestamp).getHours() * 60 + new Date(b.timestamp).getMinutes();
          return sortType.endsWith('desc') ? timeB - timeA : timeA - timeB;
      }
  });

  const handleSortPress = () => {
      if (sortType === 'date_desc') setSortType('time_desc');
      else if (sortType === 'time_desc') setSortType('date_asc');
      else if (sortType === 'date_asc') setSortType('time_asc');
      else setSortType('date_desc');
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Open': return { bg: '#FEE2E2', text: '#EF4444' };
      case 'In Progress': return { bg: '#FEF3C7', text: '#F59E0B' };
      case 'Resolved': return { bg: '#D1FAE5', text: '#10B981' };
      default: return { bg: '#F3F4F6', text: '#6B7280' };
    }
  };

  const getCategoryStyle = (category: string) => {
    switch(category) {
      case 'Infrastructure': return { bg: '#EEF2FF', text: '#4F46E5' };
      case 'Academic': return { bg: '#E0F2FE', text: '#3B82F6' };
      case 'Discipline': return { bg: '#FFEDD5', text: '#F97316' };
      case 'General': return { bg: '#F3F4F6', text: '#6B7280' };
      default: return { bg: '#F3F4F6', text: '#6B7280' };
    }
  };

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
      
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="menu" size={24} color="#111827" />
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
        
        <Text style={styles.pageTitle}>Complaint Management</Text>

        {/* Search Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons name="magnify" size={24} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search complaints..."
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity style={styles.filterButton} onPress={handleSortPress}>
            <MaterialCommunityIcons name="tune-vertical" size={24} color={sortType.includes('time') ? '#4F46E5' : '#111827'} />
          </TouchableOpacity>
        </View>

        {/* Overview Stats */}
        <View style={styles.statsRow}>
           <View style={styles.statBox}>
              <Text style={styles.statLabel}>Total</Text>
              <Text style={[styles.statValue, { color: '#F8FAFC' }]}>{totalCount}</Text>
           </View>
           <View style={styles.statBox}>
              <Text style={styles.statLabel}>Open</Text>
              <Text style={[styles.statValue, { color: '#EF4444' }]}>{openCount}</Text>
           </View>
           <View style={styles.statBox}>
              <Text style={styles.statLabel}>Resolved</Text>
              <Text style={[styles.statValue, { color: '#10B981' }]}>{resolvedCount}</Text>
           </View>
        </View>

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

        {/* Complaints List */}
        <View style={styles.listContainer}>
          {displayedComplaints.map((item) => {
            const statusStyle = getStatusStyle(item.status);
            const categoryStyle = getCategoryStyle(item.category);
            return (
              <View key={item.id} style={styles.complaintCard}>
                 <View style={styles.cardHeader}>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    <View style={styles.userInfo}>
                       <Text style={styles.userName}>{item.name}</Text>
                       <Text style={styles.userClass}>{item.class}</Text>
                    </View>
                    <View style={[styles.statusPill, { backgroundColor: statusStyle.bg }]}>
                       <Text style={[styles.statusText, { color: statusStyle.text }]}>{item.status}</Text>
                    </View>
                 </View>
                 <Text style={styles.complaintTitle}>{item.title}</Text>
                 <View style={styles.cardFooter}>
                    <View style={[styles.categoryPill, { backgroundColor: categoryStyle.bg }]}>
                       <Text style={[styles.categoryText, { color: categoryStyle.text }]}>{item.category}</Text>
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                       <Text style={styles.complaintDate}>{item.date}</Text>
                       <Text style={[styles.complaintDate, {fontSize: 10, marginTop: 2}]}>{item.time}</Text>
                    </View>
                 </View>
              </View>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Add Button Removed */}

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminHome')}>
          <MaterialCommunityIcons name="home-outline" size={28} color="#4F46E5" />
          <Text style={[styles.tabLabel, { color: '#4F46E5' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminFeeManagement')}>
          <MaterialCommunityIcons name="receipt" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Fee{'\n'}Management</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminNotices')}>
          <MaterialCommunityIcons name="bell-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminProfile')}>
          <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>

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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
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

  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 16 },

  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginRight: 12,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#F8FAFC' },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statBox: { 
    flex: 1, 
    backgroundColor: 'rgba(15, 23, 42, 0.5)', 
    borderRadius: 16, 
    padding: 16, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statLabel: { fontSize: 12, color: '#64748B', marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: 'bold' },

  filterRow: { flexDirection: 'row', marginBottom: 20, paddingRight: 16 },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterPillActive: { backgroundColor: '#4F46E5', borderColor: '#4F46E5' },
  filterText: { fontSize: 14, color: '#CBD5E1', fontWeight: '500' },
  filterTextActive: { color: '#FFFFFF' },

  listContainer: { paddingBottom: 20 },
  complaintCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
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
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E5E7EB', marginRight: 12 },
  userInfo: { flex: 1, justifyContent: 'center' },
  userName: { fontSize: 15, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 2 },
  userClass: { fontSize: 12, color: '#64748B' },
  statusPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 11, fontWeight: 'bold' },
  
  complaintTitle: { fontSize: 16, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 12 },
  
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  categoryPill: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  categoryText: { fontSize: 11, fontWeight: '600' },
  complaintDate: { fontSize: 12, color: '#64748B' },

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
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 10, color: '#64748B', marginTop: 4, fontWeight: '500', textAlign: 'center' },
});
