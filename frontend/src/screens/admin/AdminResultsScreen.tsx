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

type AdminResultsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminReports'>; // Reusing Reports route or we'll register new
interface Props {
  navigation: AdminResultsNavigationProp;
}

export default function AdminResultsScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();

  const classResults = [
    { id: 1, name: 'Class 10 - A', passPercentage: 95, total: 42, passed: 40, failed: 2 },
    { id: 2, name: 'Class 10 - B', passPercentage: 92, total: 38, passed: 35, failed: 3 },
    { id: 3, name: 'Class 9 - A', passPercentage: 91, total: 45, passed: 41, failed: 4 },
    { id: 4, name: 'Class 9 - B', passPercentage: 87, total: 40, passed: 35, failed: 5 },
    { id: 5, name: 'Class 8 - A', passPercentage: 84, total: 44, passed: 37, failed: 7 },
    { id: 6, name: 'Class 7 - A', passPercentage: 79, total: 39, passed: 31, failed: 8 },
  ];

  const getColorForPercentage = (percentage: number) => {
    if (percentage >= 90) return '#10B981'; // Green
    if (percentage >= 80) return '#F59E0B'; // Orange
    return '#EF4444'; // Red
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
        
        <Text style={styles.pageTitle}>Overall Results</Text>

        {/* Overall Pass Percentage Card */}
        <View style={styles.overallCard}>
           <Text style={styles.overallCardTitle}>School Pass Percentage</Text>
           <View style={styles.overallRow}>
              <View style={styles.progressCircle}>
                 <Text style={styles.progressCircleText}>90%</Text>
                 <Text style={styles.progressCircleLabel}>Pass</Text>
              </View>
              <View style={styles.overallStats}>
                 <View style={styles.overallStatRow}>
                    <Text style={styles.overallStatLabel}>Total Students</Text>
                    <Text style={styles.overallStatValue}>1,248</Text>
                 </View>
                 <View style={styles.overallStatRow}>
                    <Text style={styles.overallStatLabel}>Passed</Text>
                    <Text style={styles.overallStatValue}>1,123</Text>
                 </View>
                 <View style={styles.overallStatRow}>
                    <Text style={styles.overallStatLabel}>Failed</Text>
                    <Text style={styles.overallStatValue}>125</Text>
                 </View>
                 <View style={styles.overallStatRow}>
                    <Text style={styles.overallStatLabel}>Academic Year</Text>
                    <Text style={styles.overallStatValue}>2023-24</Text>
                 </View>
              </View>
           </View>
           
           <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFill, { width: '90%' }]} />
           </View>
           <View style={styles.progressLabels}>
              <Text style={styles.progressLabelText}>0%</Text>
              <Text style={styles.progressLabelText}>100%</Text>
           </View>
        </View>

        {/* Grade Distribution */}
        <Text style={styles.sectionTitle}>Grade Distribution</Text>
        <View style={styles.gradeGrid}>
           <View style={styles.gradeBox}>
              <Text style={[styles.gradeLabel, { color: '#10B981' }]}>A+</Text>
              <Text style={styles.gradeCount}>210</Text>
           </View>
           <View style={styles.gradeBox}>
              <Text style={[styles.gradeLabel, { color: '#3B82F6' }]}>A</Text>
              <Text style={styles.gradeCount}>345</Text>
           </View>
           <View style={styles.gradeBox}>
              <Text style={[styles.gradeLabel, { color: '#F59E0B' }]}>B</Text>
              <Text style={styles.gradeCount}>412</Text>
           </View>
           <View style={styles.gradeBox}>
              <Text style={[styles.gradeLabel, { color: '#64748B' }]}>C</Text>
              <Text style={styles.gradeCount}>156</Text>
           </View>
        </View>

        {/* Class-wise Results */}
        <Text style={styles.sectionTitle}>Class-wise Results</Text>
        <View style={styles.listContainer}>
           {classResults.map((cls) => {
             const color = getColorForPercentage(cls.passPercentage);
             return (
               <View key={cls.id} style={styles.classResultCard}>
                  <View style={styles.classResultHeader}>
                     <Text style={styles.className}>{cls.name}</Text>
                     <Text style={[styles.classPercentage, { color }]}>{cls.passPercentage}%</Text>
                  </View>
                  <View style={styles.classProgressBarBg}>
                     <View style={[styles.classProgressBarFill, { width: `${cls.passPercentage}%`, backgroundColor: color }]} />
                  </View>
                  <View style={styles.classResultStats}>
                     <Text style={styles.classResultStatText}>Total: <Text style={{fontWeight: 'bold', color: '#F8FAFC'}}>{cls.total}</Text></Text>
                     <Text style={styles.classResultStatText}>Passed: <Text style={{fontWeight: 'bold', color: '#10B981'}}>{cls.passed}</Text></Text>
                     <Text style={styles.classResultStatText}>Failed: <Text style={{fontWeight: 'bold', color: '#EF4444'}}>{cls.failed}</Text></Text>
                  </View>
               </View>
             );
           })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

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

  overallCard: {
    backgroundColor: '#4F46E5',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  overallCardTitle: { fontSize: 15, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 16 },
  overallRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  progressCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
  },
  progressCircleText: { fontSize: 24, fontWeight: '900', color: '#4F46E5' },
  progressCircleLabel: { fontSize: 12, color: '#64748B', fontWeight: '500' },
  overallStats: { flex: 1 },
  overallStatRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  overallStatLabel: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  overallStatValue: { fontSize: 13, fontWeight: 'bold', color: '#FFFFFF' },

  progressBarContainer: { height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3, marginBottom: 8 },
  progressBarFill: { height: 6, backgroundColor: 'rgba(15, 23, 42, 0.5)', borderRadius: 3 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabelText: { fontSize: 11, color: 'rgba(255,255,255,0.8)' },

  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 16 },
  
  gradeGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  gradeBox: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  gradeLabel: { fontSize: 18, fontWeight: '900', marginBottom: 4 },
  gradeCount: { fontSize: 13, color: '#64748B', fontWeight: '500' },

  listContainer: { paddingBottom: 20 },
  classResultCard: {
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
  classResultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  className: { fontSize: 15, fontWeight: 'bold', color: '#F8FAFC' },
  classPercentage: { fontSize: 15, fontWeight: 'bold' },
  
  classProgressBarBg: { height: 6, backgroundColor: 'transparent', borderRadius: 3, marginBottom: 12 },
  classProgressBarFill: { height: 6, borderRadius: 3 },
  
  classResultStats: { flexDirection: 'row' },
  classResultStatText: { fontSize: 12, color: '#64748B', marginRight: 16 },

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
