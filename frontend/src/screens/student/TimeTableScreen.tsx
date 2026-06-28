import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type TimeTableNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TimeTable'>;
interface Props {
  navigation: TimeTableNavigationProp;
}

export default function TimeTableScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const [selectedDay, setSelectedDay] = useState(2); // Default to Wed (id: 2)

  const days = [
    { id: 0, dayEN: 'Mon', dayTE: 'సోమ' },
    { id: 1, dayEN: 'Tue', dayTE: 'మంగళ' },
    { id: 2, dayEN: 'Wed', dayTE: 'బుధ' },
    { id: 3, dayEN: 'Thu', dayTE: 'గురు' },
    { id: 4, dayEN: 'Fri', dayTE: 'శుక్ర' },
    { id: 5, dayEN: 'Sat', dayTE: 'శని' },
  ];

  // Dummy dynamic data for the schedule based on the selected day
  const scheduleData: Record<number, any[]> = {
    0: [ // Mon
      { period: 1, subjectEN: 'Science', subjectTE: 'సైన్స్', timeEN: '9:00 AM - 9:45 AM', timeTE: 'ఉదయం 9:00 - ఉదయం 9:45' },
      { period: 2, subjectEN: 'Mathematics', subjectTE: 'గణితం', timeEN: '9:45 AM - 10:30 AM', timeTE: 'ఉదయం 9:45 - ఉదయం 10:30' },
      { period: 3, subjectEN: 'English', subjectTE: 'ఇంగ్లీష్', timeEN: '10:45 AM - 11:30 AM', timeTE: 'ఉదయం 10:45 - ఉదయం 11:30' },
      { period: 4, subjectEN: 'Telugu', subjectTE: 'తెలుగు', timeEN: '11:30 AM - 12:15 PM', timeTE: 'ఉదయం 11:30 - మధ్యాహ్నం 12:15' },
      { period: 5, subjectEN: 'Social Studies', subjectTE: 'సాంఘిక శాస్త్రం', timeEN: '12:15 PM - 1:00 PM', timeTE: 'మధ్యాహ్నం 12:15 - మధ్యాహ్నం 1:00' },
      { period: 6, subjectEN: 'Sports', subjectTE: 'క్రీడలు', timeEN: '1:00 PM - 1:45 PM', timeTE: 'మధ్యాహ్నం 1:00 - మధ్యాహ్నం 1:45' },
    ],
    1: [ // Tue
      { period: 1, subjectEN: 'Hindi', subjectTE: 'హిందీ', timeEN: '9:00 AM - 9:45 AM', timeTE: 'ఉదయం 9:00 - ఉదయం 9:45' },
      { period: 2, subjectEN: 'Science', subjectTE: 'సైన్స్', timeEN: '9:45 AM - 10:30 AM', timeTE: 'ఉదయం 9:45 - ఉదయం 10:30' },
      { period: 3, subjectEN: 'Mathematics', subjectTE: 'గణితం', timeEN: '10:45 AM - 11:30 AM', timeTE: 'ఉదయం 10:45 - ఉదయం 11:30' },
      { period: 4, subjectEN: 'Computer', subjectTE: 'కంప్యూటర్', timeEN: '11:30 AM - 12:15 PM', timeTE: 'ఉదయం 11:30 - మధ్యాహ్నం 12:15' },
      { period: 5, subjectEN: 'English', subjectTE: 'ఇంగ్లీష్', timeEN: '12:15 PM - 1:00 PM', timeTE: 'మధ్యాహ్నం 12:15 - మధ్యాహ్నం 1:00' },
      { period: 6, subjectEN: 'Library', subjectTE: 'లైబ్రరీ', timeEN: '1:00 PM - 1:45 PM', timeTE: 'మధ్యాహ్నం 1:00 - మధ్యాహ్నం 1:45' },
    ],
    2: [ // Wed (Matches screenshot)
      { period: 1, subjectEN: 'English', subjectTE: 'ఇంగ్లీష్', timeEN: '9:00 AM - 9:45 AM', timeTE: 'ఉదయం 9:00 - ఉదయం 9:45' },
      { period: 2, subjectEN: 'Mathematics', subjectTE: 'గణితం', timeEN: '9:45 AM - 10:30 AM', timeTE: 'ఉదయం 9:45 - ఉదయం 10:30' },
      { period: 3, subjectEN: 'Science', subjectTE: 'సైన్స్', timeEN: '10:45 AM - 11:30 AM', timeTE: 'ఉదయం 10:45 - ఉదయం 11:30' },
      { period: 4, subjectEN: 'Social Studies', subjectTE: 'సాంఘిక శాస్త్రం', timeEN: '11:30 AM - 12:15 PM', timeTE: 'ఉదయం 11:30 - మధ్యాహ్నం 12:15' },
      { period: 5, subjectEN: 'Social Studies', subjectTE: 'సాంఘిక శాస్త్రం', timeEN: '12:15 PM - 1:00 PM', timeTE: 'మధ్యాహ్నం 12:15 - మధ్యాహ్నం 1:00' },
      { period: 6, subjectEN: 'Telugu', subjectTE: 'తెలుగు', timeEN: '1:00 PM - 1:45 PM', timeTE: 'మధ్యాహ్నం 1:00 - మధ్యాహ్నం 1:45' },
    ],
    3: [ // Thu
      { period: 1, subjectEN: 'Mathematics', subjectTE: 'గణితం', timeEN: '9:00 AM - 9:45 AM', timeTE: 'ఉదయం 9:00 - ఉదయం 9:45' },
      { period: 2, subjectEN: 'Mathematics', subjectTE: 'గణితం', timeEN: '9:45 AM - 10:30 AM', timeTE: 'ఉదయం 9:45 - ఉదయం 10:30' },
      { period: 3, subjectEN: 'Telugu', subjectTE: 'తెలుగు', timeEN: '10:45 AM - 11:30 AM', timeTE: 'ఉదయం 10:45 - ఉదయం 11:30' },
      { period: 4, subjectEN: 'Science', subjectTE: 'సైన్స్', timeEN: '11:30 AM - 12:15 PM', timeTE: 'ఉదయం 11:30 - మధ్యాహ్నం 12:15' },
      { period: 5, subjectEN: 'Hindi', subjectTE: 'హిందీ', timeEN: '12:15 PM - 1:00 PM', timeTE: 'మధ్యాహ్నం 12:15 - మధ్యాహ్నం 1:00' },
      { period: 6, subjectEN: 'Drawing', subjectTE: 'డ్రాయింగ్', timeEN: '1:00 PM - 1:45 PM', timeTE: 'మధ్యాహ్నం 1:00 - మధ్యాహ్నం 1:45' },
    ],
    4: [ // Fri
      { period: 1, subjectEN: 'Social Studies', subjectTE: 'సాంఘిక శాస్త్రం', timeEN: '9:00 AM - 9:45 AM', timeTE: 'ఉదయం 9:00 - ఉదయం 9:45' },
      { period: 2, subjectEN: 'English', subjectTE: 'ఇంగ్లీష్', timeEN: '9:45 AM - 10:30 AM', timeTE: 'ఉదయం 9:45 - ఉదయం 10:30' },
      { period: 3, subjectEN: 'Computer', subjectTE: 'కంప్యూటర్', timeEN: '10:45 AM - 11:30 AM', timeTE: 'ఉదయం 10:45 - ఉదయం 11:30' },
      { period: 4, subjectEN: 'Computer', subjectTE: 'కంప్యూటర్', timeEN: '11:30 AM - 12:15 PM', timeTE: 'ఉదయం 11:30 - మధ్యాహ్నం 12:15' },
      { period: 5, subjectEN: 'Mathematics', subjectTE: 'గణితం', timeEN: '12:15 PM - 1:00 PM', timeTE: 'మధ్యాహ్నం 12:15 - మధ్యాహ్నం 1:00' },
      { period: 6, subjectEN: 'Science', subjectTE: 'సైన్స్', timeEN: '1:00 PM - 1:45 PM', timeTE: 'మధ్యాహ్నం 1:00 - మధ్యాహ్నం 1:45' },
    ],
    5: [ // Sat
      { period: 1, subjectEN: 'Telugu', subjectTE: 'తెలుగు', timeEN: '9:00 AM - 9:45 AM', timeTE: 'ఉదయం 9:00 - ఉదయం 9:45' },
      { period: 2, subjectEN: 'Hindi', subjectTE: 'హిందీ', timeEN: '9:45 AM - 10:30 AM', timeTE: 'ఉదయం 9:45 - ఉదయం 10:30' },
      { period: 3, subjectEN: 'Sports', subjectTE: 'క్రీడలు', timeEN: '10:45 AM - 11:30 AM', timeTE: 'ఉదయం 10:45 - ఉదయం 11:30' },
      { period: 4, subjectEN: 'Sports', subjectTE: 'క్రీడలు', timeEN: '11:30 AM - 12:15 PM', timeTE: 'ఉదయం 11:30 - మధ్యాహ్నం 12:15' },
      { period: 5, subjectEN: 'Half Day', subjectTE: 'సగం రోజు', timeEN: '', timeTE: '' },
    ],
  };

  const currentSchedule = scheduleData[selectedDay] || [];

  // Simulate dates dynamically based on selection (e.g. 20 May for Mon, 21 May for Tue)
  const dateBase = 20; 
  const currentDate = `${dateBase + selectedDay} May 2024`;
  const currentDateTE = `${dateBase + selectedDay} మే 2024`;

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
           <Text style={styles.pageTitle}>{isTelugu ? 'టైమ్ టేబుల్' : 'Time Table'}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Day Picker */}
          <View style={styles.dayPicker}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayPickerScroll}>
              {days.map((d) => {
                const isActive = d.id === selectedDay;
                return (
                  <TouchableOpacity 
                    key={d.id} 
                    style={[styles.dayItem, isActive && styles.dayItemActive]}
                    onPress={() => setSelectedDay(d.id)}
                  >
                    <Text style={[styles.dayText, isActive && styles.dayTextActive]}>
                      {isTelugu ? d.dayTE : d.dayEN}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Date Display */}
          <Text style={styles.dateDisplay}>{isTelugu ? currentDateTE : currentDate}</Text>

          {/* Schedule List */}
          <View style={styles.scheduleList}>
            {currentSchedule.map((item, index) => {
              // For mockup realism, highlight the 4th period of whatever day is selected
              const isActive = item.period === 4; 
              
              return (
                <BlurView 
                  key={item.period} 
                  intensity={20} 
                  tint="dark" 
                  style={[
                    styles.periodCard, 
                    isActive && styles.periodCardActive
                  ]}
                >
                  <View style={[styles.periodCircle, isActive && styles.periodCircleActive]}>
                    <Text style={[styles.periodNumber, isActive && styles.periodNumberActive]}>{item.period}</Text>
                  </View>
                  <View style={styles.periodDetails}>
                    <Text style={[styles.subjectText, isActive && styles.subjectTextActive]}>
                      {isTelugu ? item.subjectTE : item.subjectEN}
                    </Text>
                    {item.timeEN !== '' && (
                       <Text style={[styles.timeText, isActive && styles.timeTextActive]}>
                         {isTelugu ? item.timeTE : item.timeEN}
                       </Text>
                    )}
                  </View>
                </BlurView>
              );
            })}
          </View>

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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#F1F5F9' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  dayPicker: {
    marginBottom: 16,
  },
  dayPickerScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  dayItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    borderColor: '#334155',
    marginRight: 8,
  },
  dayItemActive: {
    backgroundColor: '#8B5CF6',
    borderColor: '#6D28D9',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
  },
  dayTextActive: {
    color: '#F1F5F9',
  },

  dateDisplay: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 20,
  },

  scheduleList: {
    width: '100%',
  },
  periodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    borderColor: '#334155',
  },
  periodCardActive: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderColor: '#8B5CF6',
  },
  periodCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  periodCircleActive: {
    backgroundColor: '#8B5CF6',
  },
  periodNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#94A3B8',
  },
  periodNumberActive: {
    color: '#F1F5F9',
  },
  periodDetails: {
    flex: 1,
  },
  subjectText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  subjectTextActive: {
    color: '#6D28D9',
  },
  timeText: {
    fontSize: 13,
    color: '#94A3B8',
  },
  timeTextActive: {
    color: '#A78BFA',
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
