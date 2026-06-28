import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type AchievementWalletScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AchievementWallet'>;
interface Props {
  navigation: AchievementWalletScreenNavigationProp;
}

export default function AchievementWalletScreen({ navigation }: Props) {
  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#E0E7FF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Achievement Wallet</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Profile Card */}
          <LinearGradient colors={['#4F46E5', '#7C3AED']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <MaterialCommunityIcons name="account-circle" size={64} color="#E0E7FF" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.studentName}>Rahul Kumar</Text>
              <Text style={styles.studentDetails}>Class 10 - A | Roll No: 25</Text>
              <View style={styles.pointsRow}>
                <MaterialCommunityIcons name="trophy" size={20} color="#FBBF24" />
                <Text style={styles.totalPointsText}>
                  <Text style={styles.totalPointsValue}>595</Text> Total Points
                </Text>
              </View>
            </View>
          </LinearGradient>

          {/* Points Grid */}
          <View style={styles.pointsGrid}>
            <BlurView intensity={20} tint="dark" style={[styles.pointCard, { borderColor: '#6366F1', shadowColor: '#6366F1', shadowOpacity: 0.8, shadowRadius: 10, elevation: 5 }]}>
              <MaterialCommunityIcons name="book-open-variant" size={24} color="#818CF8" style={styles.pointIcon} />
              <Text style={[styles.pointValue, { color: '#818CF8' }]}>320</Text>
              <Text style={[styles.pointLabel, { color: '#F8FAFC' }]}>Academic Points</Text>
            </BlurView>
            
            <BlurView intensity={20} tint="dark" style={[styles.pointCard, { borderColor: '#10B981', shadowColor: '#10B981', shadowOpacity: 0.8, shadowRadius: 10, elevation: 5 }]}>
              <MaterialCommunityIcons name="heart-outline" size={24} color="#34D399" style={styles.pointIcon} />
              <Text style={[styles.pointValue, { color: '#34D399' }]}>180</Text>
              <Text style={[styles.pointLabel, { color: '#D1FAE5' }]}>Behavior Points</Text>
            </BlurView>

            <BlurView intensity={20} tint="dark" style={[styles.pointCard, { borderColor: '#F59E0B', shadowColor: '#F59E0B', shadowOpacity: 0.8, shadowRadius: 10, elevation: 5 }]}>
              <MaterialCommunityIcons name="lightning-bolt" size={24} color="#FBBF24" style={styles.pointIcon} />
              <Text style={[styles.pointValue, { color: '#FBBF24' }]}>95</Text>
              <Text style={[styles.pointLabel, { color: '#FEF3C7' }]}>Activity Points</Text>
            </BlurView>
          </View>

          {/* Badges Earned */}
          <Text style={styles.sectionTitle}>Badges Earned</Text>
          <View style={styles.badgesContainer}>
            <BlurView intensity={20} tint="dark" style={[styles.badgeCard, { borderColor: '#F59E0B', shadowColor: '#F59E0B', shadowOpacity: 0.6, shadowRadius: 8, elevation: 5 }]}>
              <View style={[styles.badgeIconCircle, { backgroundColor: 'rgba(245,158,11,0.2)', borderColor: '#FBBF24' }]}>
                <MaterialCommunityIcons name="star-outline" size={28} color="#FCD34D" />
              </View>
              <Text style={[styles.badgeTitle, { color: '#F1F5F9' }]}>Top Scorer</Text>
              <Text style={[styles.badgeDesc, { color: '#CBD5E1' }]}>Scored 90%+ in Term 1</Text>
            </BlurView>

            <BlurView intensity={20} tint="dark" style={[styles.badgeCard, { borderColor: '#10B981', shadowColor: '#10B981', shadowOpacity: 0.6, shadowRadius: 8, elevation: 5 }]}>
              <View style={[styles.badgeIconCircle, { backgroundColor: 'rgba(16,185,129,0.2)', borderColor: '#34D399' }]}>
                <MaterialCommunityIcons name="ribbon" size={28} color="#6EE7B7" />
              </View>
              <Text style={[styles.badgeTitle, { color: '#F1F5F9' }]}>Perfect Attendance</Text>
              <Text style={[styles.badgeDesc, { color: '#CBD5E1' }]}>100% attendance in April</Text>
            </BlurView>

            <BlurView intensity={20} tint="dark" style={[styles.badgeCard, { borderColor: '#3B82F6', shadowColor: '#3B82F6', shadowOpacity: 0.6, shadowRadius: 8, elevation: 5 }]}>
              <View style={[styles.badgeIconCircle, { backgroundColor: 'rgba(59,130,246,0.2)', borderColor: '#60A5FA' }]}>
                <MaterialCommunityIcons name="lightning-bolt" size={28} color="#93C5FD" />
              </View>
              <Text style={[styles.badgeTitle, { color: '#F1F5F9' }]}>Quick Learner</Text>
              <Text style={[styles.badgeDesc, { color: '#CBD5E1' }]}>Completed all assignments on time</Text>
            </BlurView>
          </View>

          {/* Badges to Unlock */}
          <Text style={styles.sectionTitle}>Badges to Unlock</Text>
          <View style={styles.badgesContainer}>
            <BlurView intensity={10} tint="dark" style={[styles.badgeCard, styles.lockedBadgeCard]}>
              <MaterialCommunityIcons name="lock-outline" size={24} color="#64748B" style={styles.lockedIcon} />
              <Text style={styles.lockedBadgeTitle}>Class Helper</Text>
              <Text style={styles.lockedBadgeDesc}>Helped peers 5+ times</Text>
            </BlurView>

            <BlurView intensity={10} tint="dark" style={[styles.badgeCard, styles.lockedBadgeCard]}>
              <MaterialCommunityIcons name="lock-outline" size={24} color="#64748B" style={styles.lockedIcon} />
              <Text style={styles.lockedBadgeTitle}>Reading Champion</Text>
              <Text style={styles.lockedBadgeDesc}>Read 10 books this term</Text>
            </BlurView>

            <BlurView intensity={10} tint="dark" style={[styles.badgeCard, styles.lockedBadgeCard]}>
              <MaterialCommunityIcons name="lock-outline" size={24} color="#64748B" style={styles.lockedIcon} />
              <Text style={styles.lockedBadgeTitle}>Sports Star</Text>
              <Text style={styles.lockedBadgeDesc}>Participated in 3 sports events</Text>
            </BlurView>
          </View>

          {/* Extra padding to prevent Tab Bar overlap */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar (Fixed) */}
        <BlurView intensity={40} tint="dark" style={[styles.bottomTabBar, { borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)' }]}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FeeSection')}>
            <MaterialCommunityIcons name="credit-card-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>Fee Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentProfile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>Profile</Text>
          </TouchableOpacity>
        </BlurView>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center' },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  backButton: { marginRight: 16 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#F1F5F9' },
  
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  avatarContainer: { 
    marginRight: 16, 
    width: 64, 
    height: 64, 
    borderRadius: 8, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    justifyContent: 'center', 
    alignItems: 'center',
    overflow: 'hidden'
  },
  profileInfo: { flex: 1 },
  studentName: { color: '#F8FAFC', fontSize: 18, fontWeight: 'bold', marginBottom: 2 },
  studentDetails: { color: '#4338CA', fontSize: 13, marginBottom: 8 },
  pointsRow: { flexDirection: 'row', alignItems: 'center' },
  totalPointsText: { color: '#4338CA', fontSize: 13, marginLeft: 6 },
  totalPointsValue: { color: '#F8FAFC', fontSize: 16, fontWeight: 'bold' },

  pointsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  pointCard: {
    width: '31%',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    overflow: 'hidden',
  },
  pointIcon: { marginBottom: 8 },
  pointValue: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  pointLabel: { fontSize: 10, color: '#9CA3AF', textAlign: 'center' },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#F1F5F9', marginBottom: 12 },
  
  badgesContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  badgeCard: {
    width: '31%',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    overflow: 'hidden',
  },
  badgeIconCircle: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 12,
    borderWidth: 1,
  },
  badgeTitle: { fontSize: 12, fontWeight: '700', color: '#F3F4F6', textAlign: 'center', marginBottom: 6 },
  badgeDesc: { fontSize: 10, color: '#9CA3AF', textAlign: 'center', lineHeight: 14 },

  lockedBadgeCard: {
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    borderColor: 'rgba(51,65,85,0.5)',
  },
  lockedIcon: { marginBottom: 12, marginTop: 8 },
  lockedBadgeTitle: { fontSize: 12, fontWeight: '600', color: '#94A3B8', textAlign: 'center', marginBottom: 6 },
  lockedBadgeDesc: { fontSize: 10, color: '#94A3B8', textAlign: 'center', lineHeight: 14 },

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
});
