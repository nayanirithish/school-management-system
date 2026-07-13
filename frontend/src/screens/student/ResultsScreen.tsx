import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type ResultsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Results'>;
interface Props {
  navigation: ResultsNavigationProp;
}

export default function ResultsScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const [selectedTermId, setSelectedTermId] = useState('term1');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const termsList = [
    { id: 'term1', name: isTelugu ? 'టర్మ్ 1 (2023-24)' : 'Term 1 (2023-24)' },
    { id: 'term2', name: isTelugu ? 'టర్మ్ 2 (2023-24)' : 'Term 2 (2023-24)' },
    { id: 'final', name: isTelugu ? 'ఫైనల్స్ (2023-24)' : 'Final Exams (2023-24)' },
  ];

  const resultsData: Record<string, any> = {
    'term1': {
      percentage: '87%',
      grade: 'A',
      subjects: [
        { id: 1, name: isTelugu ? 'ఇంగ్లీష్' : 'English', score: 89 },
        { id: 2, name: isTelugu ? 'గణితం' : 'Mathematics', score: 92 },
        { id: 3, name: isTelugu ? 'సైన్స్' : 'Science', score: 85 },
        { id: 4, name: isTelugu ? 'సాంఘిక శాస్త్రం' : 'Social Studies', score: 80 },
        { id: 5, name: isTelugu ? 'తెలుగు' : 'Telugu', score: 78 },
        { id: 6, name: isTelugu ? 'హిందీ' : 'Hindi', score: 90 },
      ]
    },
    'term2': {
      percentage: '91%',
      grade: 'A+',
      subjects: [
        { id: 1, name: isTelugu ? 'ఇంగ్లీష్' : 'English', score: 92 },
        { id: 2, name: isTelugu ? 'గణితం' : 'Mathematics', score: 95 },
        { id: 3, name: isTelugu ? 'సైన్స్' : 'Science', score: 88 },
        { id: 4, name: isTelugu ? 'సాంఘిక శాస్త్రం' : 'Social Studies', score: 85 },
        { id: 5, name: isTelugu ? 'తెలుగు' : 'Telugu', score: 82 },
        { id: 6, name: isTelugu ? 'హిందీ' : 'Hindi', score: 94 },
      ]
    },
    'final': {
      percentage: '94%',
      grade: 'A+',
      subjects: [
        { id: 1, name: isTelugu ? 'ఇంగ్లీష్' : 'English', score: 96 },
        { id: 2, name: isTelugu ? 'గణితం' : 'Mathematics', score: 98 },
        { id: 3, name: isTelugu ? 'సైన్స్' : 'Science', score: 92 },
        { id: 4, name: isTelugu ? 'సాంఘిక శాస్త్రం' : 'Social Studies', score: 90 },
        { id: 5, name: isTelugu ? 'తెలుగు' : 'Telugu', score: 88 },
        { id: 6, name: isTelugu ? 'హిందీ' : 'Hindi', score: 97 },
      ]
    }
  };

  const currentData = resultsData[selectedTermId];
  const selectedTermName = termsList.find(t => t.id === selectedTermId)?.name;

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectTerm = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedTermId(id);
    setIsDropdownOpen(false);
  };

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
           <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight: 16}}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#E0E7FF" />
           </TouchableOpacity>
           <Text style={styles.pageTitle}>{isTelugu ? 'ఫలితాలు' : 'Results'}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Term Selector Dropdown */}
          <BlurView intensity={20} tint="dark" style={styles.termSelector}>
            <TouchableOpacity style={styles.termSelectorTouch} activeOpacity={0.7} onPress={toggleDropdown}>
              <Text style={styles.termText}>{selectedTermName}</Text>
              <MaterialCommunityIcons name={isDropdownOpen ? "chevron-up" : "chevron-down"} size={24} color="#A78BFA" />
            </TouchableOpacity>
            {isDropdownOpen && (
              <View style={styles.dropdownMenu}>
                {termsList.map((term, index) => (
                  <TouchableOpacity 
                    key={term.id} 
                    style={[styles.dropdownItem, index !== termsList.length - 1 && styles.dropdownItemBorder]}
                    onPress={() => handleSelectTerm(term.id)}
                  >
                    <Text style={[styles.dropdownItemText, selectedTermId === term.id && styles.dropdownItemTextActive]}>
                      {term.name}
                    </Text>
                    {selectedTermId === term.id && (
                       <MaterialCommunityIcons name="check" size={20} color="#C4B5FD" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </BlurView>

          {/* Overall Performance Card */}
          <View style={styles.performanceCard}>
             <View style={styles.performanceSection}>
                <Text style={styles.performanceLabel}>{isTelugu ? 'మొత్తం శాతం' : 'Overall Percentage'}</Text>
                <Text style={styles.performanceValue}>{currentData.percentage}</Text>
             </View>
             <View style={styles.verticalDivider} />
             <View style={styles.performanceSection}>
                <Text style={styles.performanceLabel}>{isTelugu ? 'గ్రేడ్' : 'Grade'}</Text>
                <Text style={styles.performanceValue}>{currentData.grade}</Text>
             </View>
          </View>

          {/* Subject Wise Marks */}
          <Text style={styles.sectionTitle}>{isTelugu ? 'సబ్జెక్ట్ వారీగా మార్కులు' : 'Subject Wise Marks'}</Text>

          <BlurView intensity={20} tint="dark" style={styles.subjectsCard}>
            {currentData.subjects.map((subject: any, index: number) => (
              <View key={subject.id}>
                <View style={styles.subjectRow}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  <Text style={styles.subjectScore}>{subject.score} / 100</Text>
                </View>
                {index < currentData.subjects.length - 1 && <View style={styles.divider} />}
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#F1F5F9' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  termSelector: {
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    borderColor: '#8B5CF6',
    overflow: 'hidden',
  },
  termSelectorTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  termText: {
    fontSize: 15,
    color: '#F8FAFC',
    fontWeight: '500',
  },
  dropdownMenu: {
    borderTopWidth: 1,
    borderTopColor: '#334155',
    backgroundColor: 'transparent',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  dropdownItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#94A3B8',
  },
  dropdownItemTextActive: {
    fontWeight: 'bold',
    color: '#F1F5F9',
  },

  performanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: 20,
    paddingVertical: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  performanceSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  performanceLabel: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
    marginBottom: 8,
  },
  performanceValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6D28D9', 
  },
  verticalDivider: {
    width: 1,
    height: '60%',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F1F5F9',
    marginBottom: 16,
  },

  subjectsCard: {
    borderRadius: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    borderColor: '#8B5CF6',
    overflow: 'hidden',
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  subjectName: {
    fontSize: 15,
    color: '#F8FAFC',
    fontWeight: '500',
  },
  subjectScore: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F1F5F9',
  },
  divider: {
    height: 1,
    backgroundColor: '#1E293B',
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
