import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type FeeSectionNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FeeSection'>;
interface Props {
  navigation: FeeSectionNavigationProp;
}

export default function FeeSectionScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const [selectedFees, setSelectedFees] = useState<number[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const feeDetails = [
    { id: 1, title: isTelugu ? 'ట్యూషన్ ఫీజు' : 'Tuition Fee', amount: 3000, status: isTelugu ? 'చెల్లించారు' : 'Paid', isPaid: true },
    { id: 2, title: isTelugu ? 'రవాణా రుసుము' : 'Transport Fee', amount: 1500, status: isTelugu ? 'పెండింగ్‌లో ఉంది' : 'Pending', isPaid: false },
    { id: 3, title: isTelugu ? 'ల్యాబ్ ఫీజు' : 'Lab Fee', amount: 750, status: isTelugu ? 'చెల్లించారు' : 'Paid', isPaid: true },
    { id: 4, title: isTelugu ? 'పరీక్ష రుసుము' : 'Exam Fee', amount: 500, status: isTelugu ? 'పెండింగ్‌లో ఉంది' : 'Pending', isPaid: false },
    { id: 5, title: isTelugu ? 'ఇతరులు' : 'Others', amount: 500, status: isTelugu ? 'చెల్లించారు' : 'Paid', isPaid: true },
  ];

  const transactions = [
    { id: 'T1', type: 'Tuition Fee', amount: '₹ 3,000', date: '12 Apr 2024', method: 'UPI' },
    { id: 'T2', type: 'Lab Fee', amount: '₹ 750', date: '05 Mar 2024', method: 'Credit Card' },
  ];

  const toggleFeeSelection = (id: number) => {
    if (selectedFees.includes(id)) {
      setSelectedFees(selectedFees.filter(feeId => feeId !== id));
    } else {
      setSelectedFees([...selectedFees, id]);
    }
  };

  const totalFeeAmount = feeDetails.reduce((sum, fee) => sum + fee.amount, 0);
  const paidFeeAmount = feeDetails.filter(f => f.isPaid).reduce((sum, fee) => sum + fee.amount, 0);
  
  const selectedAmount = feeDetails
    .filter(f => selectedFees.includes(f.id))
    .reduce((sum, fee) => sum + fee.amount, 0);

  const formatCurrency = (amount: number) => {
    return `₹ ${amount.toLocaleString('en-IN')}`;
  };

  const handlePayNow = () => {
    if (selectedFees.length > 0) {
      setShowPaymentModal(true);
    }
  };

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
             <MaterialCommunityIcons name="menu" size={28} color="#E0E7FF" />
          </TouchableOpacity>
          <Text style={styles.brandTitle}>ORYOL</Text>
          <View style={styles.appBarRight}>
            <TouchableOpacity 
              style={styles.languageToggle} 
              onPress={() => setIsTelugu(!isTelugu)}
              activeOpacity={0.8}
            >
              <View style={[styles.languagePill, !isTelugu ? styles.languageActive : styles.languageInactive]}>
                 <Text style={[styles.languageText, !isTelugu && styles.languageTextActive]}>EN</Text>
              </View>
              <View style={[styles.languagePill, isTelugu ? styles.languageActive : styles.languageInactive]}>
                 <Text style={[styles.languageText, isTelugu && styles.languageTextActive]}>TE</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 12 }}>
              <MaterialCommunityIcons name="cog-outline" size={24} color="#A78BFA" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sub Header */}
        <View style={styles.subHeader}>
           <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight: 16}}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#E0E7FF" />
           </TouchableOpacity>
           <Text style={styles.pageTitle}>{isTelugu ? 'ఫీజు విభాగం' : 'Fee Section'}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Top Summary Card (Redesigned) */}
          <BlurView intensity={20} tint="dark" style={styles.totalDueCard}>
            <View style={styles.summaryBox}>
               <Text style={styles.totalDueLabel}>{isTelugu ? 'మొత్తం ఫీజు' : 'Total Fee'}</Text>
               <Text style={styles.totalDueAmount}>{formatCurrency(totalFeeAmount)}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryBox}>
               <Text style={styles.totalDueLabel}>{isTelugu ? 'చెల్లించినది' : 'Fee Paid'}</Text>
               <Text style={[styles.totalDueAmount, { color: '#34D399' }]}>{formatCurrency(paidFeeAmount)}</Text>
            </View>
          </BlurView>

          {/* Fee Details Header */}
          <Text style={styles.sectionTitle}>{isTelugu ? 'ఫీజు వివరాలు' : 'Fee Details'}</Text>

          {/* Interactive Fee List */}
          <BlurView intensity={20} tint="dark" style={styles.feeListCard}>
            {feeDetails.map((fee, index) => {
              const isSelected = selectedFees.includes(fee.id);
              return (
                <TouchableOpacity 
                  key={fee.id} 
                  activeOpacity={fee.isPaid ? 1 : 0.7}
                  onPress={() => !fee.isPaid && toggleFeeSelection(fee.id)}
                  style={[
                    styles.feeListItem, 
                    index !== feeDetails.length - 1 && styles.borderBottom
                  ]}
                >
                  <View style={styles.feeItemLeft}>
                    {!fee.isPaid && (
                      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                         {isSelected && <MaterialCommunityIcons name="check" size={14} color="#FFF" />}
                      </View>
                    )}
                    <Text style={[styles.feeItemTitle, fee.isPaid && styles.feeItemTitlePaid]}>{fee.title}</Text>
                  </View>

                  <View style={styles.feeItemRight}>
                    <Text style={[styles.feeItemAmount, fee.isPaid && styles.feeItemAmountPaid]}>{formatCurrency(fee.amount)}</Text>
                    <View style={[
                      styles.statusBadge, 
                      fee.isPaid ? styles.statusPaid : styles.statusPending
                    ]}>
                      <Text style={[
                        styles.statusText, 
                        fee.isPaid ? styles.statusTextPaid : styles.statusTextPending
                      ]}>
                        {fee.status}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })}
          </BlurView>

          {/* Floating Pay Now Button */}
          <TouchableOpacity 
             style={[styles.mainPayButton, selectedFees.length === 0 && styles.mainPayButtonDisabled]}
             activeOpacity={0.8}
             onPress={handlePayNow}
             disabled={selectedFees.length === 0}
          >
             <Text style={styles.mainPayButtonText}>
                {isTelugu ? 'ఇప్పుడే చెల్లించండి' : 'Pay Now'} {selectedFees.length > 0 ? `(${formatCurrency(selectedAmount)})` : ''}
             </Text>
          </TouchableOpacity>

          {/* Transactions Section */}
          <View style={styles.transactionHeaderRow}>
             <Text style={styles.sectionTitle}>{isTelugu ? 'ఇటీవలి లావాదేవీలు' : 'Recent Transactions'}</Text>
             <TouchableOpacity>
                <Text style={styles.viewAllText}>{isTelugu ? 'అన్నీ చూడండి' : 'View All'}</Text>
             </TouchableOpacity>
          </View>
          
          <View style={styles.transactionsContainer}>
             {transactions.map((txn, index) => (
                <View key={txn.id} style={[styles.transactionCard, index !== transactions.length - 1 && { marginBottom: 12 }]}>
                   <View style={styles.transactionIconBg}>
                      <MaterialCommunityIcons name="check-circle" size={20} color="#10B981" />
                   </View>
                   <View style={styles.transactionDetails}>
                      <Text style={styles.transactionTitle}>{txn.type}</Text>
                      <Text style={styles.transactionSubtitle}>{txn.date} • {txn.method}</Text>
                   </View>
                   <Text style={styles.transactionAmount}>{txn.amount}</Text>
                </View>
             ))}
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Bottom Tab Bar (Fixed) */}
        <BlurView intensity={40} tint="dark" style={[styles.bottomTabBar, { borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)' }]}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'హోమ్' : 'Home'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons name="credit-card" size={28} color="#C4B5FD" style={{ textShadowColor: '#6D28D9', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 }} />
            <Text style={[styles.tabLabel, { color: '#6D28D9', textShadowColor: '#6D28D9', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 }]}>{isTelugu ? 'ఫీజు చెల్లింపు' : 'Fee Payment'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'నోటిఫికేషన్' : 'Notification'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentProfile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Payment Options Bottom Sheet (In-layout) */}
        {showPaymentModal && (
           <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
              <View style={styles.modalOverlay}>
              <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setShowPaymentModal(false)} />
              
              <View style={styles.bottomSheet}>
                 <View style={styles.bottomSheetHandle} />
                 
                 <View style={styles.bottomSheetHeader}>
                    <Text style={styles.bottomSheetTitle}>Select Payment Method</Text>
                    <Text style={styles.bottomSheetAmount}>Amount to pay: {formatCurrency(selectedAmount)}</Text>
                 </View>

                 <ScrollView style={styles.paymentOptionsList} showsVerticalScrollIndicator={false}>
                    
                    <Text style={styles.paymentCategoryLabel}>UPI Apps</Text>
                    <TouchableOpacity style={styles.paymentOptionCard}>
                       <MaterialCommunityIcons name="google-circles-extended" size={24} color="#4285F4" style={styles.paymentIcon} />
                       <Text style={styles.paymentOptionText}>Google Pay</Text>
                       <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.paymentOptionCard}>
                       <View style={[styles.paymentIcon, { backgroundColor: '#5B4BCA', width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }]}>
                          <Text style={{color: '#F8FAFC', fontSize: 14, fontWeight: 'bold'}}>पे</Text>
                       </View>
                       <Text style={styles.paymentOptionText}>PhonePe</Text>
                       <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.paymentOptionCard}>
                       <MaterialCommunityIcons name="wallet-outline" size={24} color="#00BAF2" style={styles.paymentIcon} />
                       <Text style={styles.paymentOptionText}>Paytm</Text>
                       <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
                    </TouchableOpacity>

                    <Text style={[styles.paymentCategoryLabel, { marginTop: 12 }]}>Cards & Net Banking</Text>
                    <TouchableOpacity style={styles.paymentOptionCard}>
                       <MaterialCommunityIcons name="credit-card-outline" size={24} color="#4B5563" style={styles.paymentIcon} />
                       <Text style={styles.paymentOptionText}>Credit / Debit Card</Text>
                       <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.paymentOptionCard}>
                       <MaterialCommunityIcons name="bank-outline" size={24} color="#4B5563" style={styles.paymentIcon} />
                       <Text style={styles.paymentOptionText}>Net Banking</Text>
                       <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
                    </TouchableOpacity>

                    <View style={{ height: 40 }} />
                 </ScrollView>
              </View>
           </View>
           </View>
        )}

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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  brandTitle: { fontSize: 20, fontWeight: '800', color: '#6D28D9', letterSpacing: 1 },
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 16,
    padding: 2,
    alignItems: 'center',
  },
  languagePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  languageActive: { backgroundColor: '#8B5CF6' },
  languageInactive: { backgroundColor: 'transparent' },
  languageText: { fontSize: 11, fontWeight: 'bold', color: '#94A3B8' },
  languageTextActive: { color: '#F8FAFC' },

  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#F1F5F9' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },

  totalDueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderRadius: 20,
    marginBottom: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.7)', 
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  summaryBox: { flex: 1, alignItems: 'center' },
  summaryDivider: { width: 1, height: '100%', backgroundColor: 'rgba(139, 92, 246, 0.2)', marginHorizontal: 16 },
  totalDueLabel: { fontSize: 13, color: '#94A3B8', marginBottom: 6, fontWeight: '600' },
  totalDueAmount: { fontSize: 22, fontWeight: '900', color: '#6D28D9' },
  
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#F1F5F9', marginBottom: 12 },

  feeListCard: {
    borderRadius: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    borderColor: '#8B5CF6',
    overflow: 'hidden',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  feeListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  feeItemLeft: { flexDirection: 'row', alignItems: 'center' },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxSelected: { backgroundColor: '#8B5CF6', borderColor: '#8B5CF6' },
  feeItemTitle: { fontSize: 15, color: '#F8FAFC', fontWeight: '600' },
  feeItemTitlePaid: { color: '#94A3B8' },
  
  feeItemRight: { flexDirection: 'row', alignItems: 'center' },
  feeItemAmount: { fontSize: 15, fontWeight: 'bold', color: '#F1F5F9', marginRight: 12 },
  feeItemAmountPaid: { color: '#94A3B8' },
  
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPaid: { backgroundColor: 'rgba(52, 211, 153, 0.2)' },
  statusPending: { backgroundColor: 'rgba(248, 113, 113, 0.2)' },
  statusText: { fontSize: 11, fontWeight: 'bold' },
  statusTextPaid: { color: '#34D399' },
  statusTextPending: { color: '#F87171' },

  mainPayButton: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderWidth: 1,
    borderColor: '#8B5CF6',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  mainPayButtonDisabled: {
    backgroundColor: 'transparent',
    borderColor: '#475569',
    shadowOpacity: 0,
    elevation: 0,
  },
  mainPayButtonText: {
    color: '#F1F5F9',
    fontSize: 16,
    fontWeight: 'bold',
  },

  transactionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAllText: { fontSize: 13, color: '#A78BFA', fontWeight: '600' },
  
  transactionsContainer: { marginBottom: 20 },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  transactionIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  transactionDetails: { flex: 1 },
  transactionTitle: { fontSize: 15, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 2 },
  transactionSubtitle: { fontSize: 12, color: '#94A3B8' },
  transactionAmount: { fontSize: 16, fontWeight: 'bold', color: '#F1F5F9' },

  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.5)',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 4, fontWeight: '500' },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 12,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#475569',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  bottomSheetHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  bottomSheetTitle: { fontSize: 20, fontWeight: 'bold', color: '#F1F5F9', marginBottom: 8 },
  bottomSheetAmount: { fontSize: 16, color: '#A78BFA', fontWeight: 'bold' },
  
  paymentOptionsList: {
  },
  paymentCategoryLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#94A3B8',
    marginBottom: 12,
    marginLeft: 4,
  },
  paymentOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  paymentIcon: { marginRight: 16 },
  paymentOptionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
  },
});
