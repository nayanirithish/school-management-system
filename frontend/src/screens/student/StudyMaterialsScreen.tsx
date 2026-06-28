import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
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

type StudyMaterialsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'StudyMaterials'>;
interface Props {
  navigation: StudyMaterialsNavigationProp;
}

interface Subject {
  id: string;
  nameEN: string;
  nameTE: string;
  iconColor: string;
  iconBg: string;
  subEN: string;
  subTE: string;
  unitCount: number;
}

export default function StudyMaterialsScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  
  // State for Navigation
  const [selectedClassId, setSelectedClassId] = useState<string>('class10');
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  // --- DATA ---
  const classOptions = [
    { id: 'nursery', nameEN: 'Nursery', nameTE: 'నర్సరీ' },
    { id: 'lkg', nameEN: 'LKG', nameTE: 'ఎల్.కె.జి' },
    { id: 'ukg', nameEN: 'UKG', nameTE: 'యు.కె.జి' },
    { id: 'class1', nameEN: 'Class 1', nameTE: '1వ తరగతి' },
    { id: 'class2', nameEN: 'Class 2', nameTE: '2వ తరగతి' },
    { id: 'class3', nameEN: 'Class 3', nameTE: '3వ తరగతి' },
    { id: 'class4', nameEN: 'Class 4', nameTE: '4వ తరగతి' },
    { id: 'class5', nameEN: 'Class 5', nameTE: '5వ తరగతి' },
    { id: 'class6', nameEN: 'Class 6', nameTE: '6వ తరగతి' },
    { id: 'class7', nameEN: 'Class 7', nameTE: '7వ తరగతి' },
    { id: 'class8', nameEN: 'Class 8', nameTE: '8వ తరగతి' },
    { id: 'class9', nameEN: 'Class 9', nameTE: '9వ తరగతి' },
    { id: 'class10', nameEN: 'Class 10', nameTE: '10వ తరగతి' },
  ];

  const prePrimarySubjects: Subject[] = [
    { id: 'alphabets', nameEN: 'Alphabets', nameTE: 'అక్షరాలు', iconColor: '#F43F5E', iconBg: '#FFF1F2', subEN: 'Tracing, Phonics', subTE: 'ట్రేసింగ్, ఫోనిక్స్', unitCount: 5 },
    { id: 'numbers', nameEN: 'Numbers', nameTE: 'సంఖ్యలు', iconColor: '#3B82F6', iconBg: '#EFF6FF', subEN: 'Counting, Tracing', subTE: 'లెక్కింపు, ట్రేసింగ్', unitCount: 5 },
    { id: 'rhymes', nameEN: 'Rhymes', nameTE: 'పద్యాలు', iconColor: '#8B5CF6', iconBg: '#F5F3FF', subEN: 'Videos, Lyrics', subTE: 'వీడియోలు, సాహిత్యం', unitCount: 8 },
    { id: 'drawing', nameEN: 'Drawing', nameTE: 'డ్రాయింగ్', iconColor: '#10B981', iconBg: '#ECFDF5', subEN: 'Coloring Pages', subTE: 'కలరింగ్ పేజీలు', unitCount: 4 },
  ];

  const primarySubjects: Subject[] = [
    { id: 'maths', nameEN: 'Mathematics', nameTE: 'గణితం', iconColor: '#3B82F6', iconBg: '#EFF6FF', subEN: 'Notes, Worksheets', subTE: 'నోట్స్, వర్క్‌షీట్‌లు', unitCount: 8 },
    { id: 'evs', nameEN: 'EVS', nameTE: 'పరిసరాల విజ్ఞానం', iconColor: '#10B981', iconBg: '#ECFDF5', subEN: 'Notes, Videos', subTE: 'నోట్స్, వీడియోలు', unitCount: 8 },
    { id: 'english', nameEN: 'English', nameTE: 'ఇంగ్లీష్', iconColor: '#A855F7', iconBg: '#FAF5FF', subEN: 'Notes, Grammar', subTE: 'నోట్స్, వ్యాకరణం', unitCount: 10 },
    { id: 'telugu', nameEN: 'Telugu', nameTE: 'తెలుగు', iconColor: '#14B8A6', iconBg: '#F0FDFA', subEN: 'Notes, Stories', subTE: 'నోట్స్, కథలు', unitCount: 10 },
  ];

  const highSchoolSubjects: Subject[] = [
    { id: 'maths', nameEN: 'Mathematics', nameTE: 'గణితం', iconColor: '#3B82F6', iconBg: '#EFF6FF', subEN: 'Notes, PDFs, Formulae', subTE: 'నోట్స్, PDFలు, సూత్రాలు', unitCount: 14 },
    { id: 'science', nameEN: 'Science', nameTE: 'సైన్స్', iconColor: '#10B981', iconBg: '#ECFDF5', subEN: 'Notes, PDFs, Videos', subTE: 'నోట్స్, PDFలు, వీడియోలు', unitCount: 12 },
    { id: 'social', nameEN: 'Social Studies', nameTE: 'సాంఘిక శాస్త్రం', iconColor: '#F97316', iconBg: '#FFF7ED', subEN: 'Notes, PDFs, Maps', subTE: 'నోట్స్, PDFలు, మ్యాప్స్', unitCount: 10 },
    { id: 'english', nameEN: 'English', nameTE: 'ఇంగ్లీష్', iconColor: '#A855F7', iconBg: '#FAF5FF', subEN: 'Notes, PDFs', subTE: 'నోట్స్, PDFలు', unitCount: 12 },
    { id: 'telugu', nameEN: 'Telugu', nameTE: 'తెలుగు', iconColor: '#14B8A6', iconBg: '#F0FDFA', subEN: 'Notes, PDFs', subTE: 'నోట్స్, PDFలు', unitCount: 10 },
    { id: 'hindi', nameEN: 'Hindi', nameTE: 'హిందీ', iconColor: '#EC4899', iconBg: '#FDF2F8', subEN: 'Notes, PDFs', subTE: 'నోట్స్, PDFలు', unitCount: 8 },
  ];

  const getSubjectsForClass = (classId: string): Subject[] => {
    if (['nursery', 'lkg', 'ukg'].includes(classId)) return prePrimarySubjects;
    if (['class1', 'class2', 'class3', 'class4', 'class5'].includes(classId)) return primarySubjects;
    return highSchoolSubjects;
  };

  const currentSubjects = getSubjectsForClass(selectedClassId);
  const selectedClassName = classOptions.find(c => c.id === selectedClassId);

  // --- HANDLERS ---
  const toggleClassDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsClassDropdownOpen(!isClassDropdownOpen);
  };

  const handleSelectClass = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedClassId(id);
    setIsClassDropdownOpen(false);
    setSelectedSubject(null); // Reset subject if class changes
  };

  const handleSubjectClick = (subject: Subject) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedSubject(subject);
  };

  const handleBack = () => {
    if (selectedSubject) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setSelectedSubject(null);
    } else {
      navigation.goBack();
    }
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

        {/* Sub Header */}
        <View style={styles.subHeader}>
           <TouchableOpacity onPress={handleBack} style={{marginRight: 16}}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#E0E7FF" />
           </TouchableOpacity>
           <Text style={styles.pageTitle}>
             {selectedSubject 
               ? (isTelugu ? selectedSubject.nameTE : selectedSubject.nameEN) 
               : (isTelugu ? 'స్టడీ మెటీరియల్స్' : 'Study Materials')}
           </Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {!selectedSubject ? (
            <>
              {/* Class Selector Dropdown */}
              <BlurView intensity={20} tint="dark" style={styles.classSelector}>
                <TouchableOpacity style={styles.classSelectorTouch} activeOpacity={0.7} onPress={toggleClassDropdown}>
                  <Text style={styles.classText}>
                    {isTelugu ? selectedClassName?.nameTE : selectedClassName?.nameEN}
                  </Text>
                  <MaterialCommunityIcons name={isClassDropdownOpen ? "chevron-up" : "chevron-down"} size={24} color="#A78BFA" />
                </TouchableOpacity>
                
                {isClassDropdownOpen && (
                  <View style={styles.dropdownMenu}>
                    {classOptions.map((c, index) => (
                      <TouchableOpacity 
                        key={c.id} 
                        style={[styles.dropdownItem, index !== classOptions.length - 1 && styles.dropdownItemBorder]}
                        onPress={() => handleSelectClass(c.id)}
                      >
                        <Text style={[styles.dropdownItemText, selectedClassId === c.id && styles.dropdownItemTextActive]}>
                          {isTelugu ? c.nameTE : c.nameEN}
                        </Text>
                        {selectedClassId === c.id && (
                           <MaterialCommunityIcons name="check" size={20} color="#C4B5FD" />
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </BlurView>

              {/* Subjects List */}
              <BlurView intensity={20} tint="dark" style={styles.subjectsCard}>
                {currentSubjects.map((subject, index) => (
                  <View key={subject.id}>
                    <TouchableOpacity style={styles.subjectRow} activeOpacity={0.6} onPress={() => handleSubjectClick(subject)}>
                      <View style={[styles.iconContainer, { backgroundColor: subject.iconBg }]}>
                        <MaterialCommunityIcons name="folder-outline" size={24} color={subject.iconColor} />
                      </View>
                      <View style={styles.subjectDetails}>
                        <Text style={styles.subjectName}>{isTelugu ? subject.nameTE : subject.nameEN}</Text>
                        <Text style={styles.subjectSub}>{isTelugu ? subject.subTE : subject.subEN}</Text>
                      </View>
                      <View style={styles.badgeContainer}>
                        <Text style={styles.badgeText}>{subject.unitCount} {isTelugu ? 'యూనిట్లు' : 'Units'}</Text>
                      </View>
                      <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
                    </TouchableOpacity>
                    {index < currentSubjects.length - 1 && <View style={styles.divider} />}
                  </View>
                ))}
              </BlurView>
            </>
          ) : (
            <>
              {/* Units List */}
              <View style={styles.unitsContainer}>
                {Array.from({ length: selectedSubject.unitCount }).map((_, i) => (
                  <BlurView key={i} intensity={20} tint="dark" style={styles.unitCard}>
                    <View style={styles.unitDetails}>
                      <Text style={styles.unitName}>
                        {isTelugu ? `యూనిట్ ${i + 1}` : `Unit ${i + 1}`}
                      </Text>
                      <Text style={styles.unitDesc}>
                        {isTelugu ? `అధ్యాయం ${i + 1} కోసం పూర్తి స్టడీ మెటీరియల్` : `Complete study material for Chapter ${i + 1}`}
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.downloadButton} activeOpacity={0.7}>
                      <MaterialCommunityIcons name="download" size={20} color="#C4B5FD" />
                      <Text style={styles.downloadText}>{isTelugu ? 'డౌన్‌లోడ్' : 'Download'}</Text>
                    </TouchableOpacity>
                  </BlurView>
                ))}
              </View>
            </>
          )}

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

  classSelector: {
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    borderColor: '#8B5CF6',
    overflow: 'hidden',
  },
  classSelectorTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  classText: {
    fontSize: 15,
    color: '#F8FAFC',
    fontWeight: '500',
  },
  dropdownMenu: {
    borderTopWidth: 1,
    borderTopColor: '#334155',
    backgroundColor: 'transparent',
    maxHeight: 250, // To prevent it taking up the whole screen
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
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  subjectDetails: {
    flex: 1,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F1F5F9',
    marginBottom: 4,
  },
  subjectSub: {
    fontSize: 13,
    color: '#94A3B8',
  },
  badgeContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)', // Light purple neon
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#6D28D9',
  },
  divider: {
    height: 1,
    backgroundColor: '#1E293B',
    marginLeft: 80, // Aligns divider with text
  },

  unitsContainer: {
    width: '100%',
  },
  unitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  unitDetails: {
    flex: 1,
    paddingRight: 16,
  },
  unitName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F1F5F9',
    marginBottom: 6,
  },
  unitDesc: {
    fontSize: 13,
    color: '#94A3B8',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.2)', // light purple neon
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  downloadText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#6D28D9',
    marginLeft: 6,
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
