import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type DiaryNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Diary'>;
interface Props {
  navigation: DiaryNavigationProp;
}

export default function DiaryScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(21);

  const dates = [
    { day: isTelugu ? 'ఆది' : 'Sun', date: 19 },
    { day: isTelugu ? 'సోమ' : 'Mon', date: 20 },
    { day: isTelugu ? 'మంగళ' : 'Tue', date: 21 },
    { day: isTelugu ? 'బుధ' : 'Wed', date: 22 },
    { day: isTelugu ? 'గురు' : 'Thu', date: 23 },
    { day: isTelugu ? 'శుక్ర' : 'Fri', date: 24 },
  ];

  const diaryDataByDate: Record<number, any[]> = {
    19: [], // Sunday has no schedule
    20: [
      {
        id: '20-1',
        title: isTelugu ? 'హోంవర్క్' : 'Homework',
        content: isTelugu 
          ? 'ఇంగ్లీష్: వ్యాసం రాయండి\nసోషల్: పటంలో స్థలాలను గుర్తించండి'
          : 'English: Write an essay\nSocial: Mark locations on map',
        type: 'homework',
        icon: 'book-open-outline',
        color: '#3B82F6',
      }
    ],
    21: [
      {
        id: '21-1',
        title: isTelugu ? 'హోంవర్క్' : 'Homework',
        content: isTelugu 
          ? 'గణితం: అభ్యాసం 5.1 (Q1 నుండి Q10)\nసైన్స్: అధ్యాయం 3 చదవండి'
          : 'Maths: Exercise 5.1 (Q1 to Q10)\nScience: Read Chapter 3',
        type: 'homework',
        icon: 'book-open-outline',
        color: '#3B82F6',
      },
      {
        id: '21-2',
        title: isTelugu ? 'పాఠశాల గమనిక' : 'School Note',
        content: isTelugu
          ? '25 మే 2024న PTM. సమయాలు త్వరలో భాగస్వామ్యం చేయబడతాయి'
          : 'PTM on 25 May 2024. Timings will be shared soon',
        type: 'school',
        icon: 'clipboard-text-outline',
        color: '#F97316',
      },
      {
        id: '21-3',
        title: isTelugu ? 'ఉపాధ్యాయుని గమనిక' : "Teacher's Note",
        content: isTelugu
          ? 'అద్భుతమైన తరగతి భాగస్వామ్యం\nఇలాగే కొనసాగించు!'
          : 'Excellent class participation\nKeep it up!',
        type: 'teacher',
        icon: 'message-processing-outline',
        color: '#10B981',
      },
    ],
    22: [
      {
        id: '22-1',
        title: isTelugu ? 'హోంవర్క్' : 'Homework',
        content: isTelugu 
          ? 'తెలుగు: పద్యాలు కంఠస్థం చేయండి'
          : 'Telugu: Memorize poems',
        type: 'homework',
        icon: 'book-open-outline',
        color: '#3B82F6',
      }
    ],
    23: [
      {
        id: '23-1',
        title: isTelugu ? 'హోంవర్క్' : 'Homework',
        content: isTelugu 
          ? 'గణితం: రేఖాగణితం ప్రాక్టీస్ చేయండి'
          : 'Maths: Practice Geometry',
        type: 'homework',
        icon: 'book-open-outline',
        color: '#3B82F6',
      },
      {
        id: '23-2',
        title: isTelugu ? 'స్పోర్ట్స్ గమనిక' : "Sports Note",
        content: isTelugu
          ? 'రేపు క్రీడా దినోత్సవం కోసం స్పోర్ట్స్ డ్రెస్ ధరించండి'
          : 'Wear sports dress tomorrow for sports day',
        type: 'school',
        icon: 'basketball',
        color: '#EF4444',
      },
    ],
    24: [
      {
        id: '24-1',
        title: isTelugu ? 'పరీక్ష గమనిక' : 'Exam Note',
        content: isTelugu 
          ? 'సోమవారం సైన్స్ టెస్ట్. అధ్యాయం 1 నుండి 3 వరకు చదవండి.'
          : 'Science test on Monday. Read Chapters 1 to 3.',
        type: 'teacher',
        icon: 'alert-circle-outline',
        color: '#EAB308',
      }
    ],
  };

  const currentNotes = diaryDataByDate[selectedDate] || [];

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

        {/* Sub Header with Back Button */}
        <View style={styles.subHeader}>
           <View style={{flexDirection: 'row', alignItems: 'center'}}>
             <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight: 16}}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#E0E7FF" />
             </TouchableOpacity>
             <Text style={styles.pageTitle}>{isTelugu ? 'డైరీ' : 'Diary'}</Text>
           </View>
           <Text style={styles.monthText}>{isTelugu ? 'మే 2024' : 'May 2024'}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Date Picker Strip */}
          <View style={styles.dateStripContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateStrip}>
              {dates.map((d, index) => {
                const isActive = d.date === selectedDate;
                return (
                  <TouchableOpacity 
                    key={index} 
                    style={[styles.dateItem, isActive && styles.dateItemActive]}
                    onPress={() => setSelectedDate(d.date)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.dayText, isActive && styles.dateTextActive]}>{d.day}</Text>
                    <Text style={[styles.dateNumberText, isActive && styles.dateTextActive]}>{d.date}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Diary Notes Cards */}
          <View style={styles.notesContainer}>
            {currentNotes.length > 0 ? (
              currentNotes.map((note) => (
                <BlurView 
                  key={note.id} 
                  intensity={20} 
                  tint="dark" 
                  style={[styles.noteCard, { borderColor: note.color, shadowColor: note.color, shadowOpacity: 0.6, shadowRadius: 8, elevation: 5 }]} 
                >
                  <View style={styles.noteContent}>
                    <View style={[styles.iconContainer, { backgroundColor: note.color + '20' }]}>
                      <MaterialCommunityIcons name={note.icon as any} size={24} color={note.color} />
                    </View>
                    <View style={styles.noteTextContainer}>
                      <Text style={styles.noteTitle}>{note.title}</Text>
                      <Text style={styles.noteBody}>{note.content}</Text>
                    </View>
                  </View>
                </BlurView>
              ))
            ) : (
              <View style={styles.emptyStateContainer}>
                <MaterialCommunityIcons name="calendar-blank-outline" size={64} color="#475569" />
                <Text style={styles.emptyStateText}>
                  {isTelugu ? 'ఈ రోజుకి ఎలాంటి షెడ్యూల్ లేదా హోంవర్క్ లేదు' : 'No schedule or homework for today'}
                </Text>
              </View>
            )}
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#F1F5F9' },
  monthText: { fontSize: 16, color: '#94A3B8', fontWeight: '500' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  dateStripContainer: {
    marginBottom: 24,
  },
  dateStrip: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateItem: {
    width: 56,
    height: 72,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dateItemActive: {
    backgroundColor: '#8B5CF6',
  },
  dayText: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 4,
    fontWeight: '500',
  },
  dateNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CBD5E1',
  },
  dateTextActive: {
    color: '#F8FAFC',
  },

  notesContainer: {
    marginTop: 8,
  },
  noteCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
  },
  noteContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  noteTextContainer: {
    flex: 1,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F1F5F9',
    marginBottom: 6,
  },
  noteBody: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 22,
  },

  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#94A3B8',
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '500',
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
