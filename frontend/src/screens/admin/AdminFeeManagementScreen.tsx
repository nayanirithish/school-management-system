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
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type AdminFeeManagementNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminFeeManagement'>;
interface Props {
  navigation: AdminFeeManagementNavigationProp;
}

export default function AdminFeeManagementScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();

  const recentTransactions = [
    { id: 1, name: 'Rahul Kumar', class: 'Class 10 - A', amount: '₹ 15,000', status: 'Paid', date: '22 May 2024' },
    { id: 2, name: 'Ananya Rao', class: 'Class 9 - B', amount: '₹ 10,000', status: 'Paid', date: '22 May 2024' },
    { id: 3, name: 'Vikram Singh', class: 'Class 8 - A', amount: '₹ 12,500', status: 'Pending', date: '22 May 2024' },
    { id: 4, name: 'Pooja Verma', class: 'Class 11 - C', amount: '₹ 15,000', status: 'Paid', date: '21 May 2024' },
  ];

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
        
        <Text style={styles.pageTitle}>Fee Management</Text>

        {/* Overview Card */}
        <View style={styles.overviewCard}>
           <Text style={styles.overviewTitle}>Overview</Text>
           
           <View style={styles.statsRow}>
              <View style={styles.statBox}>
                 <Text style={styles.statLabel}>Total Fee Collected</Text>
                 <Text style={[styles.statValue, { color: '#4F46E5' }]}>₹ 18,75,000</Text>
              </View>
              <View style={styles.statBox}>
                 <Text style={styles.statLabel}>Pending Amount</Text>
                 <Text style={[styles.statValue, { color: '#EF4444' }]}>₹ 3,45,000</Text>
              </View>
           </View>

           <View style={styles.statsRow}>
              <View style={styles.statBox}>
                 <Text style={styles.statLabel}>This Month Collection</Text>
                 <Text style={[styles.statValue, { color: '#10B981' }]}>₹ 2,25,000</Text>
              </View>
              <View style={styles.statBox}>
                 <Text style={styles.statLabel}>Total Students</Text>
                 <Text style={[styles.statValue, { color: '#F8FAFC' }]}>1,248</Text>
              </View>
           </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Recent Transactions</Text>
           <TouchableOpacity>
             <Text style={styles.viewAllText}>View All</Text>
           </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {recentTransactions.map((item) => (
            <View key={item.id} style={styles.transactionCard}>
               <View style={styles.transactionLeft}>
                  <Text style={styles.studentName}>{item.name}</Text>
                  <Text style={styles.studentClass}>{item.class}</Text>
               </View>
               <View style={styles.transactionRight}>
                  <Text style={styles.transactionAmount}>{item.amount}</Text>
                  <Text style={[styles.transactionStatus, item.status === 'Paid' ? { color: '#10B981' } : { color: '#F59E0B' }]}>
                    {item.status}
                  </Text>
                  <Text style={styles.transactionDate}>{item.date}</Text>
               </View>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Action Button */}
      <View style={styles.fabContainer}>
         <TouchableOpacity 
           style={styles.fabButton}
           onPress={() => navigation.navigate('AdminUpdateFeeDetails' as any)} // Assuming the 'Collect Fee' button navigates there
         >
            <MaterialCommunityIcons name="plus" size={24} color="#FFF" />
            <Text style={styles.fabText}>Collect Fee</Text>
         </TouchableOpacity>
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminHome')}>
          <MaterialCommunityIcons name="home-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialCommunityIcons name="receipt" size={28} color="#4F46E5" />
          <Text style={[styles.tabLabel, { color: '#4F46E5' }]}>Fee{'\n'}Management</Text>
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

  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 20 },

  overviewCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  overviewTitle: { fontSize: 16, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 16 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statBox: { flex: 1 },
  statLabel: { fontSize: 13, color: '#64748B', marginBottom: 4 },
  statValue: { fontSize: 18, fontWeight: 'bold' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#F8FAFC' },
  viewAllText: { fontSize: 14, fontWeight: 'bold', color: '#4F46E5' },

  listContainer: { paddingBottom: 20 },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionLeft: { justifyContent: 'center' },
  studentName: { fontSize: 15, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 4 },
  studentClass: { fontSize: 13, color: '#64748B' },
  transactionRight: { alignItems: 'flex-end' },
  transactionAmount: { fontSize: 15, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 2 },
  transactionStatus: { fontSize: 12, fontWeight: 'bold', marginBottom: 2 },
  transactionDate: { fontSize: 11, color: '#64748B' },

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
