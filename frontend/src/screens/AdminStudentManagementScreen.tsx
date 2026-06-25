import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import GlassBackground from '../components/GlassBackground';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';

type AdminStudentManagementProp = NativeStackNavigationProp<RootStackParamList, 'AdminStudentManagement'>;
interface Props {
  navigation: AdminStudentManagementProp;
}

export default function AdminStudentManagementScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const students = [
    { id: '1', name: 'Rahul Kumar', class: 'Class 10 - A', roll: '25', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: '2', name: 'Ananya Rao', class: 'Class 9 - B', roll: '12', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: '3', name: 'Vikram Singh', class: 'Class 8 - A', roll: '08', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: '4', name: 'Pooja Verma', class: 'Class 11 - C', roll: '31', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: '5', name: 'Arjun Mehta', class: 'Class 7 - B', roll: '15', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?img=14' },
    { id: '6', name: 'Diya Sharma', class: 'Class 6 - A', roll: '05', status: 'Active', avatar: 'https://i.pravatar.cc/150?img=1' },
  ];

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <GlassCard style={styles.appBar} intensity={isDark ? 40 : 80} styleOverride={{ borderRadius: 0, borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color={isDark ? "#FFFFFF" : "#111827"} />
          </TouchableOpacity>
          <Text style={[styles.brandTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Student Management</Text>
          <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons name="cog-outline" size={24} color={isDark ? "#D1D5DB" : "#6B7280"} />
          </TouchableOpacity>
        </GlassCard>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Search Bar */}
          <View style={styles.searchRow}>
             <View style={styles.searchContainerWrapper}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.searchContainer} styleOverride={{ borderRadius: 16 }}>
                   <MaterialCommunityIcons name="magnify" size={20} color={isDark ? "#9CA3AF" : "#6B7280"} style={styles.searchIcon} />
                   <TextInput 
                     style={[styles.searchInput, { color: isDark ? '#FFFFFF' : '#111827' }]}
                     placeholder="Search student by name, roll no. or class..."
                     placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
                     value={searchQuery}
                     onChangeText={setSearchQuery}
                   />
                </GlassCard>
             </View>
             <TouchableOpacity style={styles.filterButtonWrapper} activeOpacity={0.8}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.filterButton} styleOverride={{ borderRadius: 16 }}>
                   <MaterialCommunityIcons name="tune-variant" size={24} color={isDark ? "#D1D5DB" : "#4B5563"} />
                </GlassCard>
             </TouchableOpacity>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
             <View style={[styles.statCardWrapper, { flex: 1.2 }]}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.statCard} styleOverride={{ borderRadius: 16 }}>
                   <Text style={[styles.statLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Total Students</Text>
                   <Text style={[styles.statValue, { color: isDark ? '#FFFFFF' : '#111827' }]}>1,248</Text>
                </GlassCard>
             </View>
             <View style={[styles.statCardWrapper, { flex: 1, marginHorizontal: 8 }]}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.statCard} styleOverride={{ borderRadius: 16 }}>
                   <Text style={[styles.statLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Active Students</Text>
                   <Text style={[styles.statValue, { color: '#60a5fa' }]}>1,186</Text>
                </GlassCard>
             </View>
             <View style={[styles.statCardWrapper, { flex: 1 }]}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.statCard} styleOverride={{ borderRadius: 16 }}>
                   <Text style={[styles.statLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Inactive Students</Text>
                   <Text style={[styles.statValue, { color: '#f87171' }]}>62</Text>
                </GlassCard>
             </View>
          </View>

          {/* Students List */}
          {students.map(student => (
            <View key={student.id} style={styles.studentCardWrapper}>
               <GlassCard intensity={isDark ? 20 : 60} style={styles.studentCard} styleOverride={{ borderRadius: 16 }}>
                 <Image source={{ uri: student.avatar }} style={[styles.avatar, { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }]} />
                 <View style={styles.studentInfo}>
                    <Text style={[styles.studentName, { color: isDark ? '#FFFFFF' : '#111827' }]}>{student.name}</Text>
                    <Text style={[styles.studentDetails, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>{student.class} | Roll No. {student.roll}</Text>
                 </View>
                 <View style={[styles.statusBadge, student.status === 'Active' ? styles.statusBadgeActive : styles.statusBadgeInactive]}>
                    <Text style={[styles.statusText, student.status === 'Active' ? styles.statusTextActive : styles.statusTextInactive]}>
                      {student.status}
                    </Text>
                 </View>
                 <TouchableOpacity style={styles.moreButton}>
                    <MaterialCommunityIcons name="dots-vertical" size={24} color={isDark ? "#9CA3AF" : "#6B7280"} />
                 </TouchableOpacity>
               </GlassCard>
            </View>
          ))}

          {/* Add Student Button */}
          <TouchableOpacity 
             style={styles.addButtonWrapper} 
             onPress={() => navigation.navigate('AdminAddUpdateStudent')}
          >
             <LinearGradient colors={isDark ? ['#38bdf8', '#0284c7'] : ['#4f46e5', '#3730a3']} style={styles.addButton}>
                <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
                <Text style={styles.addButtonText}>Add New Student</Text>
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
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Notices</Text>
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

  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchContainerWrapper: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 52,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  filterButtonWrapper: {
    width: 52,
    height: 52,
    marginLeft: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  filterButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCardWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statCard: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    marginBottom: 8,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  studentCardWrapper: {
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
  },
  studentInfo: {
    flex: 1,
    marginLeft: 16,
  },
  studentName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  studentDetails: {
    fontSize: 13,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  statusBadgeActive: {
    backgroundColor: 'rgba(52, 211, 153, 0.15)',
  },
  statusBadgeInactive: {
    backgroundColor: 'rgba(248, 113, 113, 0.15)',
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  statusTextActive: {
    color: '#34d399',
  },
  statusTextInactive: {
    color: '#f87171',
  },
  moreButton: {
    padding: 4,
  },

  addButtonWrapper: {
    marginTop: 12,
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
