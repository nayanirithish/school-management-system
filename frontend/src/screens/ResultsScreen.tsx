import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

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
  const [isTelugu, setIsTelugu] = useState(false);
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

        {/* Sub Header with Back Button */}
        <View style={styles.subHeader}>
           <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight: 16}}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
           </TouchableOpacity>
           <Text style={styles.pageTitle}>{isTelugu ? 'ఫలితాలు' : 'Results'}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Term Selector Dropdown */}
          <BlurView intensity={70} tint="light" style={styles.termSelector}>
            <TouchableOpacity style={styles.termSelectorTouch} activeOpacity={0.7} onPress={toggleDropdown}>
              <Text style={styles.termText}>{selectedTermName}</Text>
              <MaterialCommunityIcons name={isDropdownOpen ? "chevron-up" : "chevron-down"} size={24} color="#6B7280" />
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
                       <MaterialCommunityIcons name="check" size={20} color="#5B4BCA" />
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

          <BlurView intensity={70} tint="light" style={styles.subjectsCard}>
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#111827' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  termSelector: {
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
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
    color: '#374151',
    fontWeight: '500',
  },
  dropdownMenu: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#4B5563',
  },
  dropdownItemTextActive: {
    fontWeight: 'bold',
    color: '#5B4BCA',
  },

  performanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3E8FF', // Light purple
    borderRadius: 20,
    paddingVertical: 24,
    marginBottom: 24,
  },
  performanceSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  performanceLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
    marginBottom: 8,
  },
  performanceValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#5B4BCA', // Dark purple
  },
  verticalDivider: {
    width: 1,
    height: '60%',
    backgroundColor: 'rgba(91, 75, 202, 0.1)',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },

  subjectsCard: {
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
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
    color: '#374151',
    fontWeight: '500',
  },
  subjectScore: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
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
