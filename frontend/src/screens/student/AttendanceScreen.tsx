import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import Svg, { Circle } from 'react-native-svg';
import { useLanguage } from '../../context/LanguageContext';

type AttendanceNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Attendance'>;
interface Props {
  navigation: AttendanceNavigationProp;
}

export default function AttendanceScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();

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
           <Text style={styles.pageTitle}>{isTelugu ? 'హాజరు' : 'Attendance'}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Text style={styles.sectionTitle}>{isTelugu ? 'మొత్తం హాజరు' : 'Overall Attendance'}</Text>

          <BlurView intensity={20} tint="dark" style={[styles.overallCard, { borderColor: '#5B4BCA', shadowColor: '#5B4BCA', shadowOpacity: 0.8, shadowRadius: 10, elevation: 5 }]}>
            <View style={styles.chartContainer}>
              <Svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth} viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius * 2 + strokeWidth}`}>
                {/* Background Circle */}
                <Circle
                  cx={(radius * 2 + strokeWidth) / 2}
                  cy={(radius * 2 + strokeWidth) / 2}
                  r={radius}
                  stroke="#1E293B"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                {/* Progress Circle */}
                <Circle
                  cx={(radius * 2 + strokeWidth) / 2}
                  cy={(radius * 2 + strokeWidth) / 2}
                  r={radius}
                  stroke="#8B5CF6"
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
                <View style={[styles.legendDot, { backgroundColor: '#F87171' }]} />
                <Text style={styles.legendLabel}>{isTelugu ? 'గైర్హాజరు' : 'Absent'}</Text>
                <Text style={[styles.legendValue, { color: '#FCA5A5' }]}>15 <Text style={[styles.legendUnit, { color: '#FCA5A5' }]}>{isTelugu ? 'రోజులు' : 'Days'}</Text></Text>
              </View>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: '#64748B' }]} />
                <Text style={styles.legendLabel}>{isTelugu ? 'మొత్తం' : 'Total'}</Text>
                <Text style={styles.legendValue}>100 <Text style={styles.legendUnit}>{isTelugu ? 'రోజులు' : 'Days'}</Text></Text>
              </View>
            </View>
          </BlurView>

          <Text style={styles.sectionTitle}>{isTelugu ? 'సబ్జెక్ట్ వారీగా' : 'Subject Wise'}</Text>

          <BlurView intensity={20} tint="dark" style={[styles.subjectsCard, { borderColor: '#6366F1', shadowColor: '#6366F1', shadowOpacity: 0.6, shadowRadius: 8, elevation: 5 }]}>
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
        <BlurView intensity={40} tint="dark" style={[styles.bottomTabBar, { borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)' }]}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'హోమ్' : 'Home'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FeeSection')}>
            <MaterialCommunityIcons name="credit-card-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'ఫీజు చెల్లింపు' : 'Fee Payment'}</Text>
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
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#F1F5F9', marginBottom: 16, marginTop: 8 },

  overallCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
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
    color: '#A78BFA',
  },
  legendContainer: { flex: 1 },
  legendRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  legendDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  legendLabel: { fontSize: 12, color: '#CBD5E1', flex: 1 },
  legendValue: { fontSize: 13, fontWeight: '700', color: '#F1F5F9' },
  legendUnit: { fontSize: 12, fontWeight: '500', color: '#CBD5E1' },

  subjectsCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  subjectName: {
    flex: 2,
    fontSize: 13,
    color: '#CBD5E1',
    fontWeight: '500',
  },
  progressBarContainer: {
    flex: 3,
    height: 6,
    backgroundColor: '#1E293B',
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
    color: '#94A3B8',
    textAlign: 'right',
  },

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
