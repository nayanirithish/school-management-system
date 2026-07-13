import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type AdminHomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminHome'>;
interface Props {
  navigation: AdminHomeNavigationProp;
}

export default function AdminHomeScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();

  const quickAccessItems = [
    { id: 1, title: 'Student Management', icon: 'account-group-outline', route: 'AdminStudentManagement' },
    { id: 2, title: 'Faculty Management', icon: 'account-tie-outline', route: 'AdminFacultyManagement' },
    { id: 9, title: 'Class Teachers', icon: 'human-male-board', route: 'AdminClassTeachers' },
    { id: 3, title: 'Fee\nManagement', icon: 'wallet-outline', route: 'AdminFeeManagement' },
    { id: 4, title: 'Notices', icon: 'bell-outline', route: 'AdminNotices' },
    { id: 10, title: 'Upload Results', icon: 'chart-line', route: 'AdminUploadResults' },
    { id: 5, title: 'Overall Results', icon: 'chart-bar', route: 'AdminResults' },
    { id: 6, title: 'Classes', icon: 'calendar-blank-outline', route: 'AdminClasses' },
    { id: 7, title: 'Complaints', icon: 'message-alert-outline', route: 'AdminComplaintManagement' },
    { id: 8, title: 'Settings', icon: 'cog-outline', route: 'AdminSettings' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.menuButton}>
          <MaterialCommunityIcons name="menu" size={28} color="#111827" />
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
          <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => navigation.navigate('AdminSettings')}>
            <MaterialCommunityIcons name="cog-outline" size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerInfo}>
            <Text style={styles.greetingText}>Good Morning,</Text>
            <Text style={styles.userName}>Admin User</Text>
            <Text style={styles.welcomeText}>Welcome back to ORYOL</Text>
          </View>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
              style={styles.avatarImage} 
            />
          </View>
        </View>

        {/* Today's Overview Widget */}
        <View style={styles.overviewContainer}>
           <View style={styles.overviewHeader}>
             <Text style={styles.overviewTitle}>Today's Overview</Text>
             <TouchableOpacity style={styles.reportButton} onPress={() => navigation.navigate('AdminReports')}>
               <Text style={styles.reportButtonText}>View Report</Text>
             </TouchableOpacity>
           </View>

           <View style={styles.statsRow}>
             <View style={styles.statBoxHalf}>
                <Text style={styles.statLabel}>Students</Text>
                <Text style={styles.statValue}>1,248</Text>
             </View>
             <View style={styles.statBoxHalf}>
                <Text style={styles.statLabel}>Faculty</Text>
                <Text style={styles.statValue}>86</Text>
             </View>
           </View>
           
           <View style={styles.statBoxFull}>
              <Text style={styles.statLabel}>Total Fees Collected</Text>
              <Text style={styles.statValue}>₹ 18,75,000</Text>
           </View>
           
           <View style={styles.statBoxFull}>
              <Text style={styles.statLabel}>Pending Fees</Text>
              <Text style={styles.statValue}>₹ 3,45,000</Text>
           </View>
        </View>

        {/* Quick Access */}
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.quickAccessGrid}>
          {quickAccessItems.map((item) => (
            <View key={item.id} style={styles.quickAccessItemWrapper}>
              <TouchableOpacity 
                style={styles.quickAccessItem} 
                activeOpacity={0.7}
                onPress={() => navigation.navigate(item.route as any)}
              >
                <View style={styles.quickAccessIconBg}>
                  <MaterialCommunityIcons name={item.icon as any} size={28} color="#111827" />
                </View>
                <Text style={styles.quickAccessText} numberOfLines={2}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem}>
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

      {/* Settings Modal Removed */}

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
  menuButton: { marginRight: 16 },
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

  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },

  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerInfo: { flex: 1 },
  greetingText: { fontSize: 14, color: '#6B7280', marginBottom: 4 },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  welcomeText: { fontSize: 13, color: '#6B7280' },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#E5E7EB',
  },
  avatarImage: { width: '100%', height: '100%' },

  overviewContainer: {
    backgroundColor: '#4F46E5',
    borderRadius: 24,
    padding: 20,
    marginBottom: 32,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  reportButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  reportButtonText: {
    color: '#4F46E5',
    fontWeight: 'bold',
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statBoxHalf: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 16,
    width: '48%',
  },
  statBoxFull: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  statLabel: {
    color: '#E0E7FF',
    fontSize: 12,
    marginBottom: 8,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 16 },

  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  quickAccessItemWrapper: {
    width: '25%',
    marginBottom: 20,
  },
  quickAccessItem: {
    alignItems: 'center',
  },
  quickAccessIconBg: {
    width: 64,
    height: 64,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickAccessText: {
    fontSize: 11,
    color: '#374151',
    textAlign: 'center',
    fontWeight: '500',
  },

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
