import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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

  const filters = ['All', 'Open', 'In Progress', 'Resolved'];

  const complaints = [
    { id: 1, name: 'Rahul Kumar', class: 'Class 10 - A', status: 'Open', title: 'Classroom Noise Issue', category: 'Infrastructure', date: '22 May 2024', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: 2, name: 'Ananya Rao', class: 'Class 9 - B', status: 'In Progress', title: 'Teacher Absence', category: 'Academic', date: '20 May 2024', avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: 3, name: 'Vikram Singh', class: 'Class 8 - A', status: 'Resolved', title: 'Canteen Food Quality', category: 'General', date: '18 May 2024', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 4, name: 'Pooja Verma', class: 'Class 11 - C', status: 'Open', title: 'Homework Overload', category: 'Academic', date: '17 May 2024', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 5, name: 'Arjun Mehta', class: 'Class 7 - B', status: 'In Progress', title: 'Bullying Complaint', category: 'Discipline', date: '15 May 2024', avatar: 'https://i.pravatar.cc/150?img=15' },
  ];

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
          <TouchableOpacity style={styles.filterButton}>
            <MaterialCommunityIcons name="tune-vertical" size={24} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Overview Stats */}
        <View style={styles.statsRow}>
           <View style={styles.statBox}>
              <Text style={styles.statLabel}>Total</Text>
              <Text style={[styles.statValue, { color: '#111827' }]}>24</Text>
           </View>
           <View style={styles.statBox}>
              <Text style={styles.statLabel}>Open</Text>
              <Text style={[styles.statValue, { color: '#EF4444' }]}>9</Text>
           </View>
           <View style={styles.statBox}>
              <Text style={styles.statLabel}>Resolved</Text>
              <Text style={[styles.statValue, { color: '#10B981' }]}>15</Text>
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
          {complaints.map((item) => {
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
                    <Text style={styles.complaintDate}>{item.date}</Text>
                 </View>
              </View>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Add Button */}
      <View style={styles.fabContainer}>
         <TouchableOpacity style={styles.fabButton}>
            <MaterialCommunityIcons name="plus" size={20} color="#FFF" />
            <Text style={styles.fabText}>Add New Complaint</Text>
         </TouchableOpacity>
      </View>

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

  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 12,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#111827' },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statBox: { 
    flex: 1, 
    backgroundColor: '#FFFFFF', 
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
  statLabel: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: 'bold' },

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
  complaintCard: {
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
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E5E7EB', marginRight: 12 },
  userInfo: { flex: 1, justifyContent: 'center' },
  userName: { fontSize: 15, fontWeight: 'bold', color: '#111827', marginBottom: 2 },
  userClass: { fontSize: 12, color: '#6B7280' },
  statusPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 11, fontWeight: 'bold' },
  
  complaintTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  categoryPill: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  categoryText: { fontSize: 11, fontWeight: '600' },
  complaintDate: { fontSize: 12, color: '#9CA3AF' },

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
