import React from 'react';
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

type AdminReportsProp = NativeStackNavigationProp<RootStackParamList, 'AdminReports'>;
interface Props {
  navigation: AdminReportsProp;
}

export default function AdminReportsScreen({ navigation }: Props) {
  
  const reports = [
    { id: 1, title: 'Fee Collection', value: '₹4,50,000', subtitle: 'This Month', icon: 'currency-inr', color: '#10B981' },
    { id: 2, title: 'Student Attendance', value: '94%', subtitle: 'Average', icon: 'account-check', color: '#3B82F6' },
    { id: 3, title: 'Faculty Attendance', value: '98%', subtitle: 'Average', icon: 'account-tie', color: '#8B5CF6' },
    { id: 4, title: 'Pending Dues', value: '₹1,20,000', subtitle: 'Total', icon: 'alert-circle-outline', color: '#EF4444' },
  ];

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
      
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="menu" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>Reports</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="filter-variant" size={24} color="#111827" />
        </TouchableOpacity>
      </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Text style={styles.sectionTitle}>Overview Reports</Text>

          {/* Reports Grid */}
          <View style={styles.reportsGrid}>
            {reports.map((report) => (
              <View key={report.id} style={styles.glassCardWrapper}>
                 <View style={styles.glassCard}>
                    <View style={[styles.iconContainer, { backgroundColor: `${report.color}20` }]}>
                       <MaterialCommunityIcons name={report.icon as any} size={28} color={report.color} />
                    </View>
                    <Text style={styles.reportValue}>{report.value}</Text>
                    <Text style={styles.reportTitle}>{report.title}</Text>
                    <Text style={styles.reportSubtitle}>{report.subtitle}</Text>
                 </View>
              </View>
            ))}
          </View>

          {/* Detailed Reports Section */}
          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Detailed Analytics</Text>
          
          <TouchableOpacity 
            style={styles.detailedReportWrapper} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('AdminResults')}
          >
             <View style={styles.detailedReportCard}>
                <View style={styles.detailedReportIcon}>
                   <MaterialCommunityIcons name="chart-bar" size={24} color="#38bdf8" />
                </View>
                <View style={{ flex: 1 }}>
                   <Text style={styles.detailedReportTitle}>Academic Performance</Text>
                   <Text style={styles.detailedReportSubtitle}>View term-wise results and analytics</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#9ca3af" />
             </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.detailedReportWrapper} 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('AdminFeeManagement')}
          >
             <View style={styles.detailedReportCard}>
                <View style={[styles.detailedReportIcon, { backgroundColor: '#f43f5e15' }]}>
                   <MaterialCommunityIcons name="chart-pie" size={24} color="#f43f5e" />
                </View>
                <View style={{ flex: 1 }}>
                   <Text style={styles.detailedReportTitle}>Financial Overview</Text>
                   <Text style={styles.detailedReportSubtitle}>Revenue, expenses, and fee collection</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#9ca3af" />
             </View>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar */}
        <View style={styles.bottomTabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminFeeManagement')}>
            <MaterialCommunityIcons name="receipt" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Fee</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Notices</Text>
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

  scrollContent: { paddingHorizontal: 16, paddingTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 16 },

  reportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  glassCardWrapper: {
    width: '48%',
    borderRadius: 20,
    marginBottom: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  glassCard: {
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  reportValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  reportTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#CBD5E1',
  },
  reportSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 4,
  },

  detailedReportWrapper: {
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  detailedReportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  detailedReportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  detailedReportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  detailedReportSubtitle: {
    fontSize: 13,
    color: '#64748B',
  },

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
