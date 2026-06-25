import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type FeeSectionNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FeeSection'>;
interface Props {
  navigation: FeeSectionNavigationProp;
}

export default function FeeSectionScreen({ navigation }: Props) {
  const [isTelugu, setIsTelugu] = useState(false);

  const feeDetails = [
    { id: 1, title: isTelugu ? 'ట్యూషన్ ఫీజు' : 'Tuition Fee', amount: '₹ 3,000', status: isTelugu ? 'చెల్లించారు' : 'Paid', isPaid: true },
    { id: 2, title: isTelugu ? 'రవాణా రుసుము' : 'Transport Fee', amount: '₹ 1,500', status: isTelugu ? 'పెండింగ్‌లో ఉంది' : 'Pending', isPaid: false },
    { id: 3, title: isTelugu ? 'ల్యాబ్ ఫీజు' : 'Lab Fee', amount: '₹ 750', status: isTelugu ? 'చెల్లించారు' : 'Paid', isPaid: true },
    { id: 4, title: isTelugu ? 'పరీక్ష రుసుము' : 'Exam Fee', amount: '₹ 500', status: isTelugu ? 'పెండింగ్‌లో ఉంది' : 'Pending', isPaid: false },
    { id: 5, title: isTelugu ? 'ఇతరులు' : 'Others', amount: '₹ 500', status: isTelugu ? 'చెల్లించారు' : 'Paid', isPaid: true },
  ];

  return (
    <LinearGradient colors={['#E0F2FE', '#F3E8FF', '#F9FAFB']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
             <MaterialCommunityIcons name="menu" size={28} color="#1F2937" />
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
              <MaterialCommunityIcons name="cog-outline" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sub Header */}
        <View style={styles.subHeader}>
           <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight: 16}}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
           </TouchableOpacity>
           <Text style={styles.pageTitle}>{isTelugu ? 'ఫీజు విభాగం' : 'Fee Section'}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Total Due Card */}
          <BlurView intensity={70} tint="light" style={styles.totalDueCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.totalDueLabel}>{isTelugu ? 'మొత్తం బకాయి' : 'Total Due'}</Text>
              <Text style={styles.totalDueAmount}>₹ 5,250</Text>
            </View>
            <TouchableOpacity style={styles.payNowButton}>
              <Text style={styles.payNowText}>{isTelugu ? 'ఇప్పుడే చెల్లించండి' : 'Pay Now'}</Text>
            </TouchableOpacity>
          </BlurView>

          {/* Fee Details Header */}
          <Text style={styles.sectionTitle}>{isTelugu ? 'ఫీజు వివరాలు' : 'Fee Details'}</Text>

          {/* Fee List */}
          <BlurView intensity={70} tint="light" style={styles.feeListCard}>
            {feeDetails.map((fee, index) => (
              <View 
                key={fee.id} 
                style={[
                  styles.feeListItem, 
                  index !== feeDetails.length - 1 && styles.borderBottom
                ]}
              >
                <Text style={styles.feeItemTitle}>{fee.title}</Text>
                <View style={styles.feeItemRight}>
                  <Text style={styles.feeItemAmount}>{fee.amount}</Text>
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
              </View>
            ))}
          </BlurView>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar (Fixed) */}
        <BlurView intensity={90} tint="light" style={styles.bottomTabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#6B7280" />
            <Text style={styles.tabLabel}>{isTelugu ? 'హోమ్' : 'Home'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons name="credit-card" size={28} color="#5B4BCA" />
            <Text style={[styles.tabLabel, { color: '#5B4BCA' }]}>{isTelugu ? 'ఫీజు చెల్లింపు' : 'Fee Payment'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('ExamNotifications')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#6B7280" />
            <Text style={styles.tabLabel}>{isTelugu ? 'నోటిఫికేషన్' : 'Notification'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#6B7280" />
            <Text style={styles.tabLabel}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  brandTitle: { fontSize: 20, fontWeight: '800', color: '#5B4BCA', letterSpacing: 1 },
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: '#E0E7FF',
    borderRadius: 16,
    padding: 2,
    alignItems: 'center',
  },
  languagePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  languageActive: { backgroundColor: '#5B4BCA' },
  languageInactive: { backgroundColor: 'transparent' },
  languageText: { fontSize: 11, fontWeight: 'bold', color: '#6B7280' },
  languageTextActive: { color: '#FFFFFF' },

  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#111827' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },

  totalDueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderRadius: 20,
    marginBottom: 24,
    backgroundColor: 'rgba(237, 233, 254, 0.6)', // light purple glass
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  totalDueLabel: { fontSize: 14, color: '#6B7280', marginBottom: 4, fontWeight: '500' },
  totalDueAmount: { fontSize: 28, fontWeight: 'bold', color: '#5B4BCA' },
  payNowButton: {
    backgroundColor: '#5B4BCA',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: '#5B4BCA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  payNowText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 12 },

  feeListCard: {
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    overflow: 'hidden',
    paddingHorizontal: 20,
  },
  feeListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  feeItemTitle: { fontSize: 15, color: '#374151', fontWeight: '500' },
  feeItemRight: { flexDirection: 'row', alignItems: 'center' },
  feeItemAmount: { fontSize: 15, fontWeight: '600', color: '#111827', marginRight: 12 },
  
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPaid: { backgroundColor: '#D1FAE5' },
  statusPending: { backgroundColor: '#FEE2E2' },
  statusText: { fontSize: 11, fontWeight: 'bold' },
  statusTextPaid: { color: '#059669' },
  statusTextPending: { color: '#DC2626' },

  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255,255,255,0.7)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#6B7280', marginTop: 4, fontWeight: '500' },
});
