import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, LayoutAnimation, UIManager, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import * as DocumentPicker from 'expo-document-picker';
import { useLanguage } from '../../context/LanguageContext';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type FacultyMaterialUploadNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FacultyMaterialUpload'>;
interface Props {
  navigation: FacultyMaterialUploadNavigationProp;
}

export default function FacultyMaterialUploadScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // File State
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Dropdown States
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState(false);

  const [selectedClass, setSelectedClass] = useState('Class 10 - A');
  const [selectedSubject, setSelectedSubject] = useState('Computer Science');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAllMaterials, setShowAllMaterials] = useState(false);

  const uploadedMaterials = [
    { id: '1', title: 'Chapter 1 Notes', cls: 'Class 10 - A', subject: 'Computer Science', date: '12 May 2024' },
    { id: '2', title: 'Algorithms Presentation', cls: 'Class 10 - A', subject: 'Computer Science', date: '10 May 2024' },
    { id: '3', title: 'Practice Set 1', cls: 'Class 9 - B', subject: 'Mathematics', date: '08 May 2024' },
    { id: '4', title: 'Syllabus Copy', cls: 'Class 10 - A', subject: 'Science', date: '01 May 2024' },
  ];
  const displayedMaterials = showAllMaterials ? uploadedMaterials : uploadedMaterials.slice(0, 2);

  const classes = [
    'Nursery', 'LKG', 'UKG', 
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10 - A', 'Class 10 - B'
  ];

  const subjects = [
    'Computer Science', 'Mathematics', 'Science', 'English', 'Social Studies', 'Telugu', 'Hindi', 'Physics', 'Chemistry'
  ];

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0].name);
      }
    } catch (err) {
      console.log('Error picking document', err);
    }
  };

  const handleClassSelect = (cls: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedClass(cls);
    setIsClassDropdownOpen(false);
  };

  const handleSubjectSelect = (sub: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedSubject(sub);
    setIsSubjectDropdownOpen(false);
  };

  const handleUpload = () => {
    if (!title || !selectedFile) {
      alert(isTelugu ? 'దయచేసి శీర్షిక మరియు ఫైల్‌ను అందించండి' : 'Please provide a title and select a file');
      return;
    }
    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigation.goBack();
  };

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="menu" size={24} color="#E0E7FF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{isTelugu ? 'మెటీరియల్ అప్‌లోడ్' : 'Material Upload'}</Text>
          <View style={styles.headerRight}>
            <View style={styles.languageToggle}>
              <TouchableOpacity onPress={() => setIsTelugu(false)} style={!isTelugu ? styles.languageActive : styles.languageInactive}>
                <Text style={!isTelugu ? styles.langTextActive : styles.langTextInactive}>EN</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsTelugu(true)} style={isTelugu ? styles.languageActive : styles.languageInactive}>
                <Text style={isTelugu ? styles.langTextActive : styles.langTextInactive}>TE</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => navigation.navigate('FacultySettings')}>
               <MaterialCommunityIcons name="cog-outline" size={24} color="#A78BFA" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Class Selector Dropdown */}
          <TouchableOpacity 
            style={styles.dropdownToggle} 
            activeOpacity={0.8}
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setIsClassDropdownOpen(!isClassDropdownOpen);
              setIsSubjectDropdownOpen(false);
            }}
          >
            <Text style={styles.dropdownToggleText}>{selectedClass}</Text>
            <MaterialCommunityIcons name={isClassDropdownOpen ? "chevron-up" : "chevron-down"} size={24} color="#A78BFA" />
          </TouchableOpacity>
          
          {isClassDropdownOpen && (
            <BlurView intensity={20} tint="dark" style={styles.dropdownMenu}>
              <ScrollView style={{maxHeight: 200}} nestedScrollEnabled>
                {classes.map((cls, index) => (
                  <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => handleClassSelect(cls)}>
                    <Text style={styles.dropdownItemText}>{cls}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </BlurView>
          )}

          {/* Material Title Input */}
          <Text style={styles.inputLabel}>{isTelugu ? 'మెటీరియల్ శీర్షిక' : 'Material Title'}</Text>
          <TextInput
            style={styles.textInput}
            placeholder={isTelugu ? 'మెటీరియల్ శీర్షికను నమోదు చేయండి' : 'Enter material title'}
            placeholderTextColor="#9CA3AF"
            value={title}
            onChangeText={setTitle}
          />

          {/* Subject Dropdown */}
          <Text style={styles.inputLabel}>{isTelugu ? 'సబ్జెక్టు' : 'Subject'}</Text>
          <TouchableOpacity 
            style={styles.dropdownToggle} 
            activeOpacity={0.8}
            onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setIsSubjectDropdownOpen(!isSubjectDropdownOpen);
              setIsClassDropdownOpen(false);
            }}
          >
            <Text style={styles.dropdownToggleText}>{selectedSubject}</Text>
            <MaterialCommunityIcons name={isSubjectDropdownOpen ? "chevron-up" : "chevron-down"} size={24} color="#A78BFA" />
          </TouchableOpacity>
          
          {isSubjectDropdownOpen && (
            <BlurView intensity={20} tint="dark" style={styles.dropdownMenu}>
              <ScrollView style={{maxHeight: 200}} nestedScrollEnabled>
                {subjects.map((sub, index) => (
                  <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => handleSubjectSelect(sub)}>
                    <Text style={styles.dropdownItemText}>{sub}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </BlurView>
          )}

          {/* Upload File Box */}
          <Text style={styles.inputLabel}>{isTelugu ? 'ఫైల్ అప్‌లోడ్' : 'Upload File'}</Text>
          <TouchableOpacity style={styles.uploadArea} activeOpacity={0.7} onPress={handlePickDocument}>
             {selectedFile ? (
               <>
                 <MaterialCommunityIcons name="file-check-outline" size={48} color="#10B981" style={{marginBottom: 12}} />
                 <Text style={styles.selectedFileText}>{selectedFile}</Text>
                 <Text style={styles.reselectText}>{isTelugu ? 'మార్చడానికి నొక్కండి' : 'Tap to change file'}</Text>
               </>
             ) : (
               <>
                 <MaterialCommunityIcons name="cloud-upload-outline" size={48} color="#5B4BCA" style={{marginBottom: 12}} />
                 <Text style={styles.uploadPromptMain}>
                   <Text style={{color: '#8B5CF6', fontWeight: 'bold'}}>{isTelugu ? 'అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి' : 'Click to upload'}</Text> {isTelugu ? 'లేదా లాగి వదలండి' : 'or drag and drop'}
                 </Text>
                 <Text style={styles.uploadPromptSub}>PDF, PPT, DOCX (Max. 20MB)</Text>
               </>
             )}
          </TouchableOpacity>

          {/* Description Input */}
          <Text style={styles.inputLabel}>{isTelugu ? 'వివరణ (ఐచ్ఛికం)' : 'Description (Optional)'}</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            placeholder={isTelugu ? 'వివరణ నమోదు చేయండి...' : 'Enter description...'}
            placeholderTextColor="#9CA3AF"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleUpload} activeOpacity={0.8}>
            <Text style={styles.submitButtonText}>{isTelugu ? 'మెటీరియల్ అప్‌లోడ్ చేయండి' : 'Upload Material'}</Text>
          </TouchableOpacity>

          {/* Recent Uploads Section */}
          <View style={styles.sectionHeader}>
             <Text style={styles.sectionTitle}>{isTelugu ? 'ఇటీవలి అప్‌లోడ్‌లు' : 'Recent Uploads'}</Text>
             {!showAllMaterials && uploadedMaterials.length > 2 && (
               <TouchableOpacity onPress={() => setShowAllMaterials(true)}>
                 <Text style={styles.viewAllText}>{isTelugu ? 'అన్నీ చూడండి' : 'View All'}</Text>
               </TouchableOpacity>
             )}
          </View>
          
          {displayedMaterials.map((mat) => (
             <BlurView intensity={20} tint="dark" key={mat.id} style={styles.materialCard}>
                <View style={styles.materialIconBg}>
                   <MaterialCommunityIcons name="file-document-outline" size={24} color="#8B5CF6" />
                </View>
                <View style={styles.materialInfo}>
                   <Text style={styles.materialTitleText}>{mat.title}</Text>
                   <Text style={styles.materialSubText}>{mat.subject} • {mat.cls}</Text>
                   <Text style={styles.materialDateText}>{mat.date}</Text>
                </View>
                <TouchableOpacity style={styles.viewButton} activeOpacity={0.7}>
                   <MaterialCommunityIcons name="eye-outline" size={22} color="#D8B4FE" />
                </TouchableOpacity>
             </BlurView>
          ))}

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar */}
        <BlurView intensity={40} tint="dark" style={styles.bottomTabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyTimeTable')}>
            <MaterialCommunityIcons name="calendar-outline" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Time Table</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultySettings')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Profile</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Success Modal */}
        {showSuccessModal && (
          <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
            <View style={styles.modalOverlay}>
              <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
              <View style={styles.modalContent}>
                <View style={styles.successIconBg}>
                  <MaterialCommunityIcons name="check" size={40} color="#10B981" />
                </View>
                <Text style={styles.successTitle}>{isTelugu ? 'మెటీరియల్ అప్‌లోడ్ చేయబడింది!' : 'Material Uploaded!'}</Text>
                <Text style={styles.successText}>
                  {isTelugu 
                    ? `${selectedClass} విద్యార్థులందరూ ఇప్పుడు ఈ మెటీరియల్‌ని యాక్సెస్ చేయగలరు.`
                    : `All students of ${selectedClass} can now access this material.`}
                </Text>
                <TouchableOpacity style={styles.doneButton} onPress={handleModalClose}>
                  <Text style={styles.doneButtonText}>{isTelugu ? 'పూర్తి' : 'Done'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1 },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  backButton: { marginRight: 16 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#F8FAFC', flex: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 16,
    height: 32,
    alignItems: 'center',
    padding: 2,
  },
  languageActive: {
    backgroundColor: '#8B5CF6',
    borderRadius: 14,
    paddingHorizontal: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageInactive: { paddingHorizontal: 10, justifyContent: 'center' },
  langTextActive: { color: '#F8FAFC', fontSize: 11, fontWeight: 'bold' },
  langTextInactive: { color: '#9CA3AF', fontSize: 11, fontWeight: '500' },

  scrollContent: { paddingHorizontal: 16, paddingTop: 16 },

  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
    marginBottom: 8,
    marginTop: 16,
  },

  dropdownToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownToggleText: {
    fontSize: 15,
    color: '#F8FAFC',
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    marginTop: 4,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#E2E8F0',
  },

  textInput: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#F8FAFC',
  },
  textArea: {
    height: 100,
  },

  uploadArea: {
    borderWidth: 2,
    borderColor: '#4F46E5',
    borderStyle: 'dashed',
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadPromptMain: {
    fontSize: 15,
    color: '#E2E8F0',
    textAlign: 'center',
    marginBottom: 8,
  },
  uploadPromptSub: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  selectedFileText: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  reselectText: {
    fontSize: 13,
    color: '#8B5CF6',
  },

  submitButton: {
    backgroundColor: '#5B4BCA',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
    shadowColor: '#5B4BCA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  bottomTabBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)', position: 'absolute', bottom: 0, width: '100%' },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#94A3B8', marginTop: 4, fontWeight: '500' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#F8FAFC' },
  viewAllText: { fontSize: 14, color: '#A78BFA', fontWeight: '600' },
  
  materialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  materialIconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  materialInfo: {
    flex: 1,
  },
  materialTitleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  materialSubText: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  materialDateText: {
    fontSize: 12,
    color: '#64748B',
  },
  viewButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderColor: '#5B4BCA',
    overflow: 'hidden',
  },
  successIconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 12,
    textAlign: 'center',
  },
  successText: {
    fontSize: 15,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  doneButton: {
    backgroundColor: '#5B4BCA',
    borderRadius: 12,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
