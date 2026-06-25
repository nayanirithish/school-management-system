import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import Svg, { Circle } from 'react-native-svg';

type AttendanceNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Attendance'>;
interface Props {
  navigation: AttendanceNavigationProp;
}

export default function AttendanceScreen({ navigation }: Props) {
  const [isTelugu, setIsTelugu] = useState(false);

  const overallAttendance = 85;
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallAttendance / 100) * circumference;

  const subjects = [
    { id: 1, name: isTelugu ? 'గణితం' : 'Mathematics', progress: 90, color: '#5B4BCA' },
    { id: 2, name: isTelugu ? 'సైన్స్' : 'Science', progress: 80, color: '#10B981' },
    { id: 3, name: isTelugu ? 'ఇంగ్లీష్' : 'English', progress: 88, color: '#3B82F6' },
    { id: 4, name: isTelugu ? 'సాంఘిక శాస్త్రం' : 'Social Studies', progress: 82, color: '#F59E0B' },
    { id: 5, name: isTelugu ? 'తెలుగు' : 'Telugu', progress: 76, color: '#EF4444' },
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
           <Text style={styles.pageTitle}>{isTelugu ? 'హాజరు' : 'Attendance'}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Text style={styles.sectionTitle}>{isTelugu ? 'మొత్తం హాజరు' : 'Overall Attendance'}</Text>

          <BlurView intensity={70} tint="light" style={styles.overallCard}>
            <View style={styles.chartContainer}>
              <Svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth} viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius * 2 + strokeWidth}`}>
                {/* Background Circle */}
                <Circle
                  cx={(radius * 2 + strokeWidth) / 2}
                  cy={(radius * 2 + strokeWidth) / 2}
                  r={radius}
                  stroke="#E0E7FF"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                {/* Progress Circle */}
                <Circle
                  cx={(radius * 2 + strokeWidth) / 2}
                  cy={(radius * 2 + strokeWidth) / 2}
                  r={radius}
                  stroke="#5B4BCA"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  rotation="-90"
                  origin={`${(radius * 2 + strokeWidth) / 2}, ${(radius * 2 + strokeWidth) / 2}`}
                />
              </Svg>
              <View style={styles.chartCenterTextContainer}>
                <Text style={styles.chartCenterText}>{overallAttendance}%</Text>
              </View>
            </View>

            <View style={styles.legendContainer}>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.legendLabel}>{isTelugu ? 'హాజరు' : 'Present'}</Text>
                <Text style={styles.legendValue}>85 <Text style={styles.legendUnit}>{isTelugu ? 'రోజులు' : 'Days'}</Text></Text>
              </View>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
                <Text style={styles.legendLabel}>{isTelugu ? 'గైర్హాజరు' : 'Absent'}</Text>
                <Text style={[styles.legendValue, { color: '#EF4444' }]}>15 <Text style={[styles.legendUnit, { color: '#EF4444' }]}>{isTelugu ? 'రోజులు' : 'Days'}</Text></Text>
              </View>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: '#9CA3AF' }]} />
                <Text style={styles.legendLabel}>{isTelugu ? 'మొత్తం' : 'Total'}</Text>
                <Text style={styles.legendValue}>100 <Text style={styles.legendUnit}>{isTelugu ? 'రోజులు' : 'Days'}</Text></Text>
              </View>
            </View>
          </BlurView>

          <Text style={styles.sectionTitle}>{isTelugu ? 'సబ్జెక్ట్ వారీగా' : 'Subject Wise'}</Text>

          <BlurView intensity={70} tint="light" style={styles.subjectsCard}>
            {subjects.map((subject, index) => (
              <View key={subject.id} style={[styles.subjectRow, index === subjects.length - 1 && { marginBottom: 0 }]}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBarFill, { width: `${subject.progress}%`, backgroundColor: subject.color }]} />
                </View>
                <Text style={styles.subjectPercentage}>{subject.progress}%</Text>
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
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FeeSection')}>
            <MaterialCommunityIcons name="credit-card-outline" size={28} color="#6B7280" />
            <Text style={styles.tabLabel}>{isTelugu ? 'ఫీజు చెల్లింపు' : 'Fee Payment'}</Text>
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
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#111827', marginBottom: 16, marginTop: 8 },

  overallCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  chartContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
  },
  chartCenterTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartCenterText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5B4BCA',
  },
  legendContainer: { flex: 1 },
  legendRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  legendDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  legendLabel: { fontSize: 12, color: '#4B5563', flex: 1 },
  legendValue: { fontSize: 13, fontWeight: '700', color: '#111827' },
  legendUnit: { fontSize: 12, fontWeight: '500', color: '#111827' },

  subjectsCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  subjectName: {
    flex: 2,
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  progressBarContainer: {
    flex: 3,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  subjectPercentage: {
    width: 36,
    fontSize: 13,
    color: '#9CA3AF',
    textAlign: 'right',
  },

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
