import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Modal, 
  Platform,
  UIManager
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useAdmin } from '../context/AdminContext';
import GlassBackground from '../components/GlassBackground';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';

type AdminFeeManagementProp = NativeStackNavigationProp<RootStackParamList, 'AdminFeeManagement'>;
interface Props {
  navigation: AdminFeeManagementProp;
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function AdminFeeManagementScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  const { 
    totalFeeCollected, 
    pendingAmount, 
    monthlyRevenue, 
    totalStudents,
    recentTransactions
  } = useAdmin();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <GlassCard style={styles.appBar} intensity={isDark ? 40 : 80} styleOverride={{ borderRadius: 0, borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color={isDark ? "#FFFFFF" : "#111827"} />
          </TouchableOpacity>
          <Text style={[styles.brandTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Fee Management</Text>
          <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons name="cog-outline" size={24} color={isDark ? "#D1D5DB" : "#6B7280"} />
          </TouchableOpacity>
        </GlassCard>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Overview</Text>
          
          {/* Overview Grid */}
          <View style={styles.overviewGrid}>
            <View style={styles.overviewCardWrapper}>
               <GlassCard intensity={isDark ? 20 : 60} style={styles.overviewCard} styleOverride={{ borderRadius: 20 }}>
                  <Text style={[styles.overviewLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Total Fee Collected</Text>
                  <Text style={styles.overviewValuePrimary}>₹ {totalFeeCollected.toLocaleString('en-IN')}</Text>
               </GlassCard>
            </View>
            <View style={styles.overviewCardWrapper}>
               <GlassCard intensity={isDark ? 20 : 60} style={styles.overviewCard} styleOverride={{ borderRadius: 20 }}>
                  <Text style={[styles.overviewLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Pending Amount</Text>
                  <Text style={styles.overviewValueDanger}>₹ {pendingAmount.toLocaleString('en-IN')}</Text>
               </GlassCard>
            </View>
            <View style={styles.overviewCardWrapper}>
               <GlassCard intensity={isDark ? 20 : 60} style={styles.overviewCard} styleOverride={{ borderRadius: 20 }}>
                  <Text style={[styles.overviewLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>This Month Collection</Text>
                  <Text style={styles.overviewValueSuccess}>₹ {monthlyRevenue.toLocaleString('en-IN')}</Text>
               </GlassCard>
            </View>
            <View style={styles.overviewCardWrapper}>
               <GlassCard intensity={isDark ? 20 : 60} style={styles.overviewCard} styleOverride={{ borderRadius: 20 }}>
                  <Text style={[styles.overviewLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Total Students</Text>
                  <Text style={[styles.overviewValueNeutral, { color: isDark ? '#FFFFFF' : '#111827' }]}>{totalStudents.toLocaleString('en-IN')}</Text>
               </GlassCard>
            </View>
          </View>

          {/* Recent Transactions Header */}
          <View style={styles.transactionsHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Recent Transactions</Text>
            <TouchableOpacity>
               <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          {/* Transactions List */}
          {recentTransactions.map((tx) => (
            <View style={styles.transactionCardWrapper} key={tx.id}>
               <GlassCard intensity={isDark ? 20 : 60} style={styles.transactionCard} styleOverride={{ borderRadius: 16 }}>
                  <Image source={{ uri: tx.avatarUrl }} style={[styles.txAvatar, { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }]} />
                  <View style={styles.txDetails}>
                     <Text style={[styles.txName, { color: isDark ? '#FFFFFF' : '#111827' }]}>{tx.name}</Text>
                     <Text style={[styles.txClass, { color: isDark ? '#94a3b8' : '#475569' }]}>{tx.className}</Text>
                  </View>
                  <View style={styles.txAmountContainer}>
                     <Text style={[styles.txAmount, { color: isDark ? '#FFFFFF' : '#111827' }]}>₹ {tx.amount.toLocaleString('en-IN')}</Text>
                     <Text style={[styles.txStatus, tx.status === 'Paid' ? styles.statusPaid : styles.statusPending]}>
                       {tx.status}
                     </Text>
                     <Text style={[styles.txDate, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>{tx.date}</Text>
                  </View>
               </GlassCard>
            </View>
          ))}

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Floating Action Buttons */}
        <View style={styles.fabContainer}>
           <TouchableOpacity style={[styles.fabSecondaryWrapper, { borderColor: isDark ? 'rgba(96, 165, 250, 0.4)' : 'rgba(59, 130, 246, 0.3)' }]} onPress={() => navigation.navigate('AdminUpdateFeeDetails')} activeOpacity={0.8}>
              <GlassCard intensity={isDark ? 40 : 80} style={styles.fabSecondary} styleOverride={{ borderRadius: 30 }}>
                 <MaterialCommunityIcons name="pencil-outline" size={20} color={isDark ? "#60a5fa" : "#3b82f6"} />
                 <Text style={[styles.fabSecondaryText, { color: isDark ? '#60a5fa' : '#3b82f6' }]}>Update Fee</Text>
              </GlassCard>
           </TouchableOpacity>
           
           <TouchableOpacity style={styles.fabPrimaryWrapper} onPress={() => navigation.navigate('AdminCollectFee')} activeOpacity={0.8}>
              <LinearGradient colors={isDark ? ['#38bdf8', '#0284c7'] : ['#4f46e5', '#3730a3']} style={styles.fabPrimary}>
                 <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
                 <Text style={styles.fabPrimaryText}>Collect Fee</Text>
              </LinearGradient>
           </TouchableOpacity>
        </View>

        {/* Bottom Tab Bar */}
        <GlassCard intensity={isDark ? 60 : 90} style={styles.bottomTabBar} styleOverride={{ borderRadius: 0, borderTopWidth: 1, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons name="receipt" size={28} color={isDark ? "#38bdf8" : "#5B4BCA"} />
            <Text style={[styles.tabLabel, { color: isDark ? '#38bdf8' : '#5B4BCA' }]}>Fee Mgmt</Text>
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

        {/* Success Popup */}
        <Modal visible={showSuccessPopup} transparent animationType="fade">
           <View style={styles.centerModalOverlay}>
             <View style={styles.modalBackdrop} />
             <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowSuccessPopup(false)} activeOpacity={1} />
             <View style={styles.successModalContentWrapper}>
                <GlassCard intensity={isDark ? 50 : 90} style={styles.successModalContent} styleOverride={{ borderRadius: 24 }}>
                   <View style={styles.successIconCircle}>
                      <MaterialCommunityIcons name="check" size={40} color="#10B981" />
                   </View>
                   <Text style={[styles.successTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Fee Received!</Text>
                   <Text style={[styles.successSubtitle, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>The transaction has been successfully recorded and added to the ledger.</Text>
                   <TouchableOpacity style={styles.successButtonWrapper} onPress={() => setShowSuccessPopup(false)}>
                      <LinearGradient colors={['#10B981', '#059669']} style={styles.successButton}>
                         <Text style={styles.successButtonText}>OK</Text>
                      </LinearGradient>
                   </TouchableOpacity>
                </GlassCard>
             </View>
           </View>
        </Modal>

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

  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 16 },

  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  overviewCardWrapper: {
    width: '48%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overviewCard: {
    padding: 16,
  },
  overviewLabel: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: '500',
  },
  overviewValuePrimary: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#60a5fa',
  },
  overviewValueDanger: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f87171',
  },
  overviewValueSuccess: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34d399',
  },
  overviewValueNeutral: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    color: '#60a5fa',
    fontSize: 14,
    fontWeight: '600',
  },

  transactionCardWrapper: {
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  txAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(156,163,175,0.2)',
    marginRight: 16,
    borderWidth: 1,
  },
  txDetails: {
    flex: 1,
  },
  txName: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  txClass: {
    fontSize: 13,
  },
  txAmountContainer: {
    alignItems: 'flex-end',
  },
  txAmount: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  txStatus: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  statusPaid: {
    color: '#34d399',
  },
  statusPending: {
    color: '#fbbf24',
  },
  txDate: {
    fontSize: 11,
  },

  fabContainer: {
    position: 'absolute',
    bottom: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  fabSecondaryWrapper: {
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 12,
    borderWidth: 1,
  },
  fabSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  fabSecondaryText: {
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 15,
  },
  fabPrimaryWrapper: {
    borderRadius: 30,
    overflow: 'hidden',
  },
  fabPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  fabPrimaryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 15,
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

  centerModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  successModalContentWrapper: {
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  successModalContent: {
    padding: 32,
    alignItems: 'center',
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  successButtonWrapper: {
    borderRadius: 30,
    overflow: 'hidden',
    width: '100%',
  },
  successButton: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  successButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
