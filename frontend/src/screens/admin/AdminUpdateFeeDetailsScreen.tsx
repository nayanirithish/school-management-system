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

type AdminUpdateFeeDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminUpdateFeeDetails'>;
interface Props {
  navigation: AdminUpdateFeeDetailsNavigationProp;
}

export default function AdminUpdateFeeDetailsScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();

  // Form states
  const [paymentType, setPaymentType] = useState('Select Type');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('22 May 2024');
  const [transactionId, setTransactionId] = useState('');
  const [remarks, setRemarks] = useState('');

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
        
        <Text style={styles.pageTitle}>Update Fee Details</Text>

        {/* Student Profile Card */}
        <View style={styles.studentCard}>
           <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatar} />
           <View style={styles.studentInfo}>
              <Text style={styles.studentName}>Rahul Kumar</Text>
              <Text style={styles.studentDetails}>Class 10 - A | Roll No. 25</Text>
           </View>
        </View>

        {/* Fee Summary */}
        <View style={styles.feeSummaryCard}>
           <View style={styles.feeBox}>
              <Text style={styles.feeLabel}>Total Annual Fees</Text>
              <Text style={[styles.feeValue, { color: '#111827' }]}>₹ 25,000</Text>
           </View>
           <View style={styles.feeBox}>
              <Text style={styles.feeLabel}>Paid Amount</Text>
              <Text style={[styles.feeValue, { color: '#10B981' }]}>₹ 15,000</Text>
           </View>
           <View style={styles.feeBox}>
              <Text style={styles.feeLabel}>Due Amount</Text>
              <Text style={[styles.feeValue, { color: '#EF4444' }]}>₹ 10,000</Text>
           </View>
        </View>

        {/* Add Payment Form */}
        <View style={styles.formCard}>
           <Text style={styles.formTitle}>Add Payment</Text>
           
           <View style={styles.formGroup}>
              <Text style={styles.label}>Payment Type</Text>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.inputText}>{paymentType}</Text>
                <MaterialCommunityIcons name="chevron-down" size={20} color="#111827" />
              </TouchableOpacity>
           </View>

           <View style={styles.formGroup}>
              <Text style={styles.label}>Amount</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Enter amount"
                placeholderTextColor="#9CA3AF"
                value={amount} 
                onChangeText={setAmount} 
                keyboardType="number-pad"
              />
           </View>

           <View style={styles.formGroup}>
              <Text style={styles.label}>Payment Date</Text>
              <View style={styles.inputWithIcon}>
                <TextInput 
                  style={[styles.input, { flex: 1, borderWidth: 0, marginBottom: 0 }]} 
                  value={paymentDate} 
                  onChangeText={setPaymentDate} 
                />
                <MaterialCommunityIcons name="calendar-blank-outline" size={20} color="#111827" style={styles.inputIcon} />
              </View>
           </View>

           <View style={styles.formGroup}>
              <Text style={styles.label}>Transaction ID (Optional)</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Enter transaction id"
                placeholderTextColor="#9CA3AF"
                value={transactionId} 
                onChangeText={setTransactionId} 
              />
           </View>

           <View style={styles.formGroup}>
              <Text style={styles.label}>Remarks (Optional)</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Enter remarks"
                placeholderTextColor="#9CA3AF"
                value={remarks} 
                onChangeText={setRemarks} 
              />
           </View>

        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Save Button */}
      <View style={styles.fabContainer}>
         <TouchableOpacity 
           style={styles.fabButton}
           onPress={() => navigation.goBack()}
         >
            <Text style={styles.fabText}>Save Payment</Text>
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

  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 20 },

  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#E5E7EB', marginRight: 16 },
  studentInfo: { flex: 1 },
  studentName: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  studentDetails: { fontSize: 13, color: '#6B7280' },

  feeSummaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  feeBox: { flex: 1 },
  feeLabel: { fontSize: 12, color: '#6B7280', marginBottom: 6 },
  feeValue: { fontSize: 16, fontWeight: 'bold' },

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  formTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 20 },
  formGroup: { marginBottom: 16 },
  label: { fontSize: 13, color: '#6B7280', marginBottom: 8 },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 15,
    color: '#111827',
  },
  inputText: { fontSize: 15, color: '#6B7280' },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: { marginLeft: 8 },

  fabContainer: { position: 'absolute', bottom: 80, left: 16, right: 16 },
  fabButton: { 
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
  fabText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },

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
