import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type AdminClassesProp = NativeStackNavigationProp<RootStackParamList, 'AdminClasses'>;
interface Props {
  navigation: AdminClassesProp;
}

export default function AdminClassesScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();

  const classes = [
    { id: '1', name: 'Class 10 - A', teacher: 'Mr. Rahul Sharma', students: 42, room: 'Room 101', time: '8:00 AM - 2:00 PM' },
    { id: '2', name: 'Class 10 - B', teacher: 'Ms. Neha Joshi', students: 38, room: 'Room 102', time: '8:00 AM - 2:00 PM' },
    { id: '3', name: 'Class 9 - A', teacher: 'Mr. Arvind Kumar', students: 45, room: 'Room 201', time: '8:00 AM - 2:00 PM' },
    { id: '4', name: 'Class 9 - B', teacher: 'Ms. Priya Nair', students: 40, room: 'Room 202', time: '8:00 AM - 2:00 PM' },
    { id: '5', name: 'Class 8 - A', teacher: 'Mr. Suresh Babu', students: 44, room: 'Room 301', time: '8:00 AM - 2:00 PM' },
    { id: '6', name: 'Class 7 - A', teacher: 'Ms. Kavya Reddy', students: 39, room: 'Room 401', time: '8:00 AM - 2:00 PM' },
    { id: '7', name: 'Class 6 - A', teacher: 'Mr. Ramesh Rao', students: 36, room: 'Room 501', time: '8:00 AM - 2:00 PM' },
  ];

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
        
        <Text style={styles.pageTitle}>Classes</Text>

        {/* Search Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons name="magnify" size={24} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search classes..."
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
              <Text style={styles.statLabel}>Total Classes</Text>
              <Text style={[styles.statValue, { color: '#111827' }]}>18</Text>
           </View>
           <View style={styles.statBox}>
              <Text style={styles.statLabel}>Active</Text>
              <Text style={[styles.statValue, { color: '#4F46E5' }]}>18</Text>
           </View>
           <View style={styles.statBox}>
              <Text style={styles.statLabel}>Students</Text>
              <Text style={[styles.statValue, { color: '#111827' }]}>1,248</Text>
           </View>
        </View>

        {/* Classes List */}
        <View style={styles.listContainer}>
          {classes.map((cls) => (
            <View key={cls.id} style={styles.classCard}>
               <View style={styles.classHeader}>
                  <View style={styles.classIconBg}>
                     <MaterialCommunityIcons name="view-grid-outline" size={24} color="#111827" />
                  </View>
                  <View style={styles.classTitleInfo}>
                     <Text style={styles.className}>{cls.name}</Text>
                     <Text style={styles.classTeacher}>Class Teacher: {cls.teacher}</Text>
                  </View>
                  <View style={styles.roomPill}>
                     <Text style={styles.roomText}>{cls.room}</Text>
                  </View>
               </View>
               <View style={styles.classFooter}>
                  <View style={styles.footerItem}>
                     <MaterialCommunityIcons name="account-group" size={16} color="#6B7280" />
                     <Text style={styles.footerText}>{cls.students} students</Text>
                  </View>
                  <View style={styles.footerItem}>
                     <MaterialCommunityIcons name="clock-outline" size={16} color="#6B7280" />
                     <Text style={styles.footerText}>{cls.time}</Text>
                  </View>
               </View>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Add Button */}
      <View style={styles.fabContainer}>
         <TouchableOpacity style={styles.fabButton}>
            <MaterialCommunityIcons name="plus" size={20} color="#FFF" />
            <Text style={styles.fabText}>Add New Class</Text>
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

  listContainer: { paddingBottom: 20 },
  classCard: {
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
  classHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  classIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  classTitleInfo: { flex: 1, justifyContent: 'center' },
  className: { fontSize: 15, fontWeight: 'bold', color: '#111827', marginBottom: 2 },
  classTeacher: { fontSize: 12, color: '#6B7280' },
  roomPill: { backgroundColor: '#EEF2FF', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  roomText: { fontSize: 11, fontWeight: 'bold', color: '#4F46E5' },
  
  classFooter: { flexDirection: 'row', alignItems: 'center', marginLeft: 56 },
  footerItem: { flexDirection: 'row', alignItems: 'center', marginRight: 16 },
  footerText: { fontSize: 12, color: '#6B7280', marginLeft: 6 },

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
