import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Modal, LayoutAnimation, UIManager, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import * as DocumentPicker from 'expo-document-picker';

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
  const [isTelugu, setIsTelugu] = useState(false);
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
    <LinearGradient colors={['#FAFAFA', '#F3E8FF', '#E0F2FE']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <View style={styles.appBarLeft}>
             <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight: 12}}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
             </TouchableOpacity>
             <Text style={styles.pageTitle}>{isTelugu ? 'మెటీరియల్ అప్‌లోడ్' : 'Material Upload'}</Text>
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
            <MaterialCommunityIcons name={isClassDropdownOpen ? "chevron-up" : "chevron-down"} size={24} color="#9CA3AF" />
          </TouchableOpacity>
          
          {isClassDropdownOpen && (
            <View style={styles.dropdownMenu}>
              <ScrollView style={{maxHeight: 200}} nestedScrollEnabled>
                {classes.map((cls, index) => (
                  <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => handleClassSelect(cls)}>
                    <Text style={styles.dropdownItemText}>{cls}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
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
            <MaterialCommunityIcons name={isSubjectDropdownOpen ? "chevron-up" : "chevron-down"} size={24} color="#9CA3AF" />
          </TouchableOpacity>
          
          {isSubjectDropdownOpen && (
            <View style={styles.dropdownMenu}>
              <ScrollView style={{maxHeight: 200}} nestedScrollEnabled>
                {subjects.map((sub, index) => (
                  <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => handleSubjectSelect(sub)}>
                    <Text style={styles.dropdownItemText}>{sub}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
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
                   <Text style={{color: '#5B4BCA', fontWeight: 'bold'}}>{isTelugu ? 'అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి' : 'Click to upload'}</Text> {isTelugu ? 'లేదా లాగి వదలండి' : 'or drag and drop'}
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

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar */}
        <BlurView intensity={90} tint="light" style={styles.bottomTabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'హోమ్' : 'Home'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyTimeTable')}>
            <MaterialCommunityIcons name="calendar-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'టైమ్ టేబుల్' : 'Time Table'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'నోటిఫికేషన్' : 'Notification'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Success Modal */}
        <Modal visible={showSuccessModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
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
        </Modal>

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
  pageTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  
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

  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },

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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownToggleText: {
    fontSize: 15,
    color: '#111827',
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginTop: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#374151',
  },

  textInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111827',
  },
  textArea: {
    height: 100,
  },

  uploadArea: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadPromptMain: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  uploadPromptSub: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  selectedFileText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  reselectText: {
    fontSize: 13,
    color: '#5B4BCA',
  },

  submitButton: {
    backgroundColor: '#5B4BCA',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
    shadowColor: '#5B4BCA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  successIconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  successText: {
    fontSize: 15,
    color: '#6B7280',
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
