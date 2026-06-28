import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type FacultyTimeTableNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FacultyTimeTable'>;
interface Props {
  navigation: FacultyTimeTableNavigationProp;
}

export default function FacultyTimeTableScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const [activeTab, setActiveTab] = useState<'My' | 'Full'>('My');
  const [activeDay, setActiveDay] = useState('Mon');

  const days = [
    { id: 'Mon', en: 'Mon', te: 'సోమ', date: '20 May 2024', fullEN: 'Monday', fullTE: 'సోమవారం' },
    { id: 'Tue', en: 'Tue', te: 'మంగళ', date: '21 May 2024', fullEN: 'Tuesday', fullTE: 'మంగళవారం' },
    { id: 'Wed', en: 'Wed', te: 'బుధ', date: '22 May 2024', fullEN: 'Wednesday', fullTE: 'బుధవారం' },
    { id: 'Thu', en: 'Thu', te: 'గురు', date: '23 May 2024', fullEN: 'Thursday', fullTE: 'గురువారం' },
    { id: 'Fri', en: 'Fri', te: 'శుక్ర', date: '24 May 2024', fullEN: 'Friday', fullTE: 'శుక్రవారం' },
    { id: 'Sat', en: 'Sat', te: 'శని', date: '25 May 2024', fullEN: 'Saturday', fullTE: 'శనివారం' },
  ];

  const scheduleData: any = {
    Mon: [
      { type: 'class', period: 1, time: '9:00 AM – 9:45 AM', className: 'Class 10 – A', classTE: '10వ తరగతి – A', subject: 'Computer Science', subjectTE: 'కంప్యూటర్ సైన్స్' },
      { type: 'class', period: 2, time: '9:45 AM – 10:30 AM', className: 'Class 9 – B', classTE: '9వ తరగతి – B', subject: 'Computer Science', subjectTE: 'కంప్యూటర్ సైన్స్' },
      { type: 'break', time: '10:30 AM – 11:00 AM', labelEN: 'Break', labelTE: 'విరామం' },
      { type: 'class', period: 3, time: '11:00 AM – 11:45 AM', className: 'Class 10 – A', classTE: '10వ తరగతి – A', subject: 'Computer Science', subjectTE: 'కంప్యూటర్ సైన్స్' },
      { type: 'class', period: 4, time: '11:45 AM – 12:30 PM', className: 'Class 10 – B', classTE: '10వ తరగతి – B', subject: 'Computer Science', subjectTE: 'కంప్యూటర్ సైన్స్' },
      { type: 'break', time: '12:30 PM – 1:15 PM', labelEN: 'Lunch Break', labelTE: 'భోజన విరామం' },
      { type: 'class', period: 5, time: '1:10 PM – 2:00 PM', className: 'Class 9 – A', classTE: '9వ తరగతి – A', subject: 'Computer Science', subjectTE: 'కంప్యూటర్ సైన్స్' },
    ],
    Tue: [
      { type: 'class', period: 1, time: '9:00 AM – 9:45 AM', className: 'Class 8 – A', classTE: '8వ తరగతి – A', subject: 'Robotics', subjectTE: 'రోబోటిక్స్' },
      { type: 'class', period: 2, time: '9:45 AM – 10:30 AM', className: 'Class 8 – B', classTE: '8వ తరగతి – B', subject: 'Robotics', subjectTE: 'రోబోటిక్స్' },
      { type: 'break', time: '10:30 AM – 11:00 AM', labelEN: 'Break', labelTE: 'విరామం' },
      { type: 'class', period: 3, time: '11:00 AM – 11:45 AM', className: 'Class 10 – A', classTE: '10వ తరగతి – A', subject: 'Computer Science', subjectTE: 'కంప్యూటర్ సైన్స్' },
      { type: 'break', time: '12:30 PM – 1:15 PM', labelEN: 'Lunch Break', labelTE: 'భోజన విరామం' },
      { type: 'class', period: 6, time: '2:00 PM – 2:45 PM', className: 'Class 9 – B', classTE: '9వ తరగతి – B', subject: 'Computer Science', subjectTE: 'కంప్యూటర్ సైన్స్' },
    ],
    Wed: [
      { type: 'class', period: 2, time: '9:45 AM – 10:30 AM', className: 'Class 10 – B', classTE: '10వ తరగతి – B', subject: 'Computer Science', subjectTE: 'కంప్యూటర్ సైన్స్' },
      { type: 'break', time: '10:30 AM – 11:00 AM', labelEN: 'Break', labelTE: 'విరామం' },
      { type: 'class', period: 4, time: '11:45 AM – 12:30 PM', className: 'Class 9 – A', classTE: '9వ తరగతి – A', subject: 'Computer Science', subjectTE: 'కంప్యూటర్ సైన్స్' },
      { type: 'break', time: '12:30 PM – 1:15 PM', labelEN: 'Lunch Break', labelTE: 'భోజన విరామం' },
      { type: 'class', period: 5, time: '1:10 PM – 2:00 PM', className: 'Class 8 – A', classTE: '8వ తరగతి – A', subject: 'Robotics', subjectTE: 'రోబోటిక్స్' },
      { type: 'class', period: 6, time: '2:00 PM – 2:45 PM', className: 'Class 8 – B', classTE: '8వ తరగతి – B', subject: 'Robotics', subjectTE: 'రోబోటిక్స్' },
    ],
    Thu: [
      { type: 'class', period: 1, time: '9:00 AM – 9:45 AM', className: 'Class 10 – A', classTE: '10వ తరగతి – A', subject: 'Computer Science (Lab)', subjectTE: 'కంప్యూటర్ సైన్స్ (ల్యాబ్)' },
      { type: 'class', period: 2, time: '9:45 AM – 10:30 AM', className: 'Class 10 – A', classTE: '10వ తరగతి – A', subject: 'Computer Science (Lab)', subjectTE: 'కంప్యూటర్ సైన్స్ (ల్యాబ్)' },
      { type: 'break', time: '10:30 AM – 11:00 AM', labelEN: 'Break', labelTE: 'విరామం' },
      { type: 'class', period: 4, time: '11:45 AM – 12:30 PM', className: 'Class 9 – B', classTE: '9వ తరగతి – B', subject: 'Computer Science', subjectTE: 'కంప్యూటర్ సైన్స్' },
      { type: 'break', time: '12:30 PM – 1:15 PM', labelEN: 'Lunch Break', labelTE: 'భోజన విరామం' },
    ],
    Fri: [
      { type: 'class', period: 3, time: '11:00 AM – 11:45 AM', className: 'Class 9 – A', classTE: '9వ తరగతి – A', subject: 'Computer Science (Lab)', subjectTE: 'కంప్యూటర్ సైన్స్ (ల్యాబ్)' },
      { type: 'class', period: 4, time: '11:45 AM – 12:30 PM', className: 'Class 9 – A', classTE: '9వ తరగతి – A', subject: 'Computer Science (Lab)', subjectTE: 'కంప్యూటర్ సైన్స్ (ల్యాబ్)' },
      { type: 'break', time: '12:30 PM – 1:15 PM', labelEN: 'Lunch Break', labelTE: 'భోజన విరామం' },
      { type: 'class', period: 5, time: '1:10 PM – 2:00 PM', className: 'Class 10 – B', classTE: '10వ తరగతి – B', subject: 'Computer Science', subjectTE: 'కంప్యూటర్ సైన్స్' },
    ],
    Sat: [
      { type: 'class', period: 1, time: '9:00 AM – 9:45 AM', className: 'Class 8 – A', classTE: '8వ తరగతి – A', subject: 'Robotics', subjectTE: 'రోబోటిక్స్' },
      { type: 'class', period: 2, time: '9:45 AM – 10:30 AM', className: 'Class 8 – B', classTE: '8వ తరగతి – B', subject: 'Robotics', subjectTE: 'రోబోటిక్స్' },
      { type: 'break', time: '10:30 AM – 11:00 AM', labelEN: 'Break', labelTE: 'విరామం' },
    ]
  };

  const renderScheduleList = (data: any[]) => {
    return data.map((item, index) => {
      if (item.type === 'break') {
        return (
          <View key={`break-${index}`} style={styles.breakRow}>
            <View style={styles.breakPill}>
              <Text style={styles.breakText}>
                {isTelugu ? item.labelTE : item.labelEN} {item.time}
              </Text>
            </View>
          </View>
        );
      }

      return (
        <View key={`class-${item.period}-${index}`} style={styles.classRow}>
           <View style={styles.periodBadge}>
              <Text style={styles.periodBadgeText}>{item.period}</Text>
           </View>
           <BlurView intensity={70} tint="light" style={styles.classCard}>
              <Text style={styles.classTime}>{item.time}</Text>
              <Text style={styles.className}>{isTelugu ? item.classTE : item.className}</Text>
              <Text style={styles.classSubject}>{isTelugu ? item.subjectTE : item.subject}</Text>
           </BlurView>
        </View>
      );
    });
  };

  const activeDayObj = days.find(d => d.id === activeDay);

  return (
    <LinearGradient colors={['#FAFAFA', '#F3E8FF', '#E0F2FE']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <View style={styles.appBarLeft}>
             <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight: 12}}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
             </TouchableOpacity>
             <Text style={styles.pageTitle}>{isTelugu ? 'టైమ్ టేబుల్' : 'Time Table'}</Text>
          </View>
          <View style={styles.appBarRight}>
            <TouchableOpacity 
              style={styles.languageToggle} 
              onPress={() => setIsTelugu(!isTelugu)}
              activeOpacity={0.8}
            >
              <View style={[styles.languagePill, !isTelugu ? styles.languageActive : styles.languageInactive]}>
                 <Text style={[styles.languageText, !isTelugu && styles.languageTextActive]}>English</Text>
              </View>
              <View style={[styles.languagePill, isTelugu ? styles.languageActive : styles.languageInactive]}>
                 <Text style={[styles.languageText, isTelugu && styles.languageTextActive]}>Telugu</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 12 }}>
              <MaterialCommunityIcons name="cog-outline" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Main Tab Selector */}
          <View style={styles.tabSelector}>
             <TouchableOpacity 
               style={[styles.tabButton, activeTab === 'My' && styles.tabButtonActive]} 
               onPress={() => setActiveTab('My')}
             >
                <Text style={[styles.tabButtonText, activeTab === 'My' && styles.tabButtonTextActive]}>
                  {isTelugu ? 'నా టైమ్ టేబుల్' : 'My Time Table'}
                </Text>
             </TouchableOpacity>
             <TouchableOpacity 
               style={[styles.tabButton, activeTab === 'Full' && styles.tabButtonActive]} 
               onPress={() => setActiveTab('Full')}
             >
                <Text style={[styles.tabButtonText, activeTab === 'Full' && styles.tabButtonTextActive]}>
                  {isTelugu ? 'పూర్తి టైమ్ టేబుల్' : 'Full Time Table'}
                </Text>
             </TouchableOpacity>
          </View>

          {/* Render "My Time Table" View */}
          {activeTab === 'My' && (
            <>
              {/* Days Pill Selector */}
              <View style={styles.daysRow}>
                {days.map((day) => (
                  <TouchableOpacity 
                    key={day.id} 
                    style={[styles.dayPill, activeDay === day.id && styles.dayPillActive]}
                    onPress={() => setActiveDay(day.id)}
                  >
                    <Text style={[styles.dayText, activeDay === day.id && styles.dayTextActive]}>
                      {isTelugu ? day.te : day.en}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.dateHeader}>{activeDayObj?.date}</Text>

              {/* Schedule List for Specific Day */}
              <View style={styles.scheduleContainer}>
                {renderScheduleList(scheduleData[activeDay] || [])}
                {(!scheduleData[activeDay] || scheduleData[activeDay].length === 0) && (
                  <View style={styles.emptyState}>
                    <MaterialCommunityIcons name="calendar-blank-outline" size={48} color="#D1D5DB" />
                    <Text style={styles.emptyStateText}>{isTelugu ? 'ఈ రోజు తరగతులు లేవు' : 'No classes scheduled for today'}</Text>
                  </View>
                )}
              </View>
            </>
          )}

          {/* Render "Full Time Table" View */}
          {activeTab === 'Full' && (
            <View style={styles.fullTimeTableContainer}>
              {days.map(day => (
                <View key={`full-${day.id}`} style={styles.fullDaySection}>
                  <View style={styles.fullDayHeaderRow}>
                    <MaterialCommunityIcons name="calendar-today" size={20} color="#5B4BCA" />
                    <Text style={styles.fullDayHeaderTitle}>{isTelugu ? day.fullTE : day.fullEN}</Text>
                  </View>
                  <View style={styles.scheduleContainer}>
                    {renderScheduleList(scheduleData[day.id] || [])}
                    {(!scheduleData[day.id] || scheduleData[day.id].length === 0) && (
                      <Text style={styles.emptyStateText}>{isTelugu ? 'తరగతులు లేవు' : 'No classes'}</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar */}
        <BlurView intensity={90} tint="light" style={styles.bottomTabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'హోమ్' : 'Home'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons name="calendar" size={28} color="#5B4BCA" />
            <Text style={[styles.tabLabel, { color: '#5B4BCA' }]}>{isTelugu ? 'టైమ్ టేబుల్' : 'Time Table'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'నోటిఫికేషన్' : 'Notification'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyProfile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  appBarLeft: { flexDirection: 'row', alignItems: 'center' },
  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    padding: 2,
    alignItems: 'center',
  },
  languagePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  languageActive: { backgroundColor: '#E0E7FF' },
  languageInactive: { backgroundColor: 'transparent' },
  languageText: { fontSize: 11, fontWeight: 'bold', color: '#6B7280' },
  languageTextActive: { color: '#5B4BCA' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  tabSelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabButtonActive: {
    backgroundColor: '#5B4BCA',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
  },

  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  dayPill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  dayPillActive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#5B4BCA',
    shadowColor: '#5B4BCA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dayText: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  dayTextActive: {
    color: '#5B4BCA',
    fontWeight: 'bold',
  },

  dateHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },

  scheduleContainer: {
    paddingBottom: 20,
  },
  classRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  periodBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#5B4BCA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#5B4BCA',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  periodBadgeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  classCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  classTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  className: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  classSubject: {
    fontSize: 14,
    color: '#6B7280',
  },
  breakRow: {
    alignItems: 'center',
    marginVertical: 12,
  },
  breakPill: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  breakText: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 15,
    color: '#9CA3AF',
    marginTop: 8,
  },

  fullTimeTableContainer: {
    marginTop: 8,
  },
  fullDaySection: {
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  fullDayHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    paddingBottom: 12,
  },
  fullDayHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5B4BCA',
    marginLeft: 8,
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
  tabLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 4, fontWeight: '500' },
});
