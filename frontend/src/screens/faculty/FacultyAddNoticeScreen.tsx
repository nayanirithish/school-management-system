import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Modal,
  FlatList,
  Platform,
  Alert,
  LayoutAnimation,
  UIManager
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as DocumentPicker from 'expo-document-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type FacultyAddNoticeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FacultyAddNotice'>;
interface Props {
  navigation: FacultyAddNoticeNavigationProp;
}

export default function FacultyAddNoticeScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();

  // Form states
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Select Type');
  const [audience, setAudience] = useState('Select Audience');
  const [description, setDescription] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const selectedType = type !== 'Select Type' ? type : 'General';
  
  // Date Picker Custom UI
  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [publishDate, setPublishDate] = useState(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }));

  const getDaysInMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1).getDay();

  // Document Picker
  const [attachmentName, setAttachmentName] = useState('Choose File');
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.assets && result.assets.length > 0) {
        setAttachmentName(result.assets[0].name);
      }
    } catch (error) {
      console.log('Error picking document:', error);
    }
  };

  // Dropdowns
  const [showTypeModal, setShowTypeModal] = useState(false);
  const noticeTypes = ['General', 'Academic', 'Event', 'Holiday', 'Exam'];

  const [showAudienceModal, setShowAudienceModal] = useState(false);
  const audiences = ['All Students', 'All Faculty', 'Class X', 'Class XII', 'Parents', 'Everyone'];

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigation.navigate('FacultyNotices');
  };

  const toggleDropdown = (setter: any, state: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setter(!state);
  };

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="menu" size={24} color="#E0E7FF" />
          </TouchableOpacity>
          <Text style={styles.brandTitle}>{isTelugu ? 'నోటీస్ జోడించండి' : 'Add Notice'}</Text>
          <View style={styles.appBarRight}>
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
          
          {/* Form Fields */}
          <View style={styles.formGroup}>
             <Text style={styles.label}>{isTelugu ? 'నోటీస్ శీర్షిక' : 'Notice Title'}</Text>
             <TextInput 
               style={styles.input} 
               placeholder={isTelugu ? "నోటీస్ శీర్షిక నమోదు చేయండి" : "Enter notice title"}
               placeholderTextColor="#9CA3AF"
               value={title} 
               onChangeText={setTitle} 
             />
          </View>

          <View style={[styles.formGroup, { zIndex: 10 }]}>
             <Text style={styles.label}>{isTelugu ? 'నోటీస్ రకం' : 'Notice Type'}</Text>
             <TouchableOpacity 
               style={[styles.dropdown, showTypeModal && styles.dropdownOpen]} 
               onPress={() => toggleDropdown(setShowTypeModal, showTypeModal)}
               activeOpacity={0.8}
             >
               <Text style={[styles.inputText, type !== 'Select Type' && { color: '#F8FAFC' }]}>{type}</Text>
               <MaterialCommunityIcons name={showTypeModal ? "chevron-up" : "chevron-down"} size={20} color="#9CA3AF" />
             </TouchableOpacity>
             {showTypeModal && (
               <BlurView intensity={20} tint="dark" style={styles.inlineDropdownList}>
                 {noticeTypes.map((item, index) => (
                   <TouchableOpacity 
                     key={item}
                     style={[styles.inlineDropdownOption, index === noticeTypes.length - 1 && { borderBottomWidth: 0 }]}
                     onPress={() => { setType(item); toggleDropdown(setShowTypeModal, showTypeModal); }}
                   >
                     <Text style={[styles.dropdownOptionText, type === item && { color: '#A78BFA', fontWeight: 'bold' }]}>{item}</Text>
                     {type === item && <MaterialCommunityIcons name="check" size={20} color="#A78BFA" />}
                   </TouchableOpacity>
                 ))}
               </BlurView>
             )}
          </View>

          <View style={[styles.formGroup, { zIndex: 9 }]}>
             <Text style={styles.label}>{isTelugu ? 'ప్రేక్షకులు' : 'Audience'}</Text>
             <TouchableOpacity 
               style={[styles.dropdown, showAudienceModal && styles.dropdownOpen]} 
               onPress={() => toggleDropdown(setShowAudienceModal, showAudienceModal)}
               activeOpacity={0.8}
             >
               <Text style={[styles.inputText, audience !== 'Select Audience' && { color: '#F8FAFC' }]}>{audience}</Text>
               <MaterialCommunityIcons name={showAudienceModal ? "chevron-up" : "chevron-down"} size={20} color="#9CA3AF" />
             </TouchableOpacity>
             {showAudienceModal && (
               <BlurView intensity={20} tint="dark" style={styles.inlineDropdownList}>
                 {audiences.map((item, index) => (
                   <TouchableOpacity 
                     key={item}
                     style={[styles.inlineDropdownOption, index === audiences.length - 1 && { borderBottomWidth: 0 }]}
                     onPress={() => { setAudience(item); toggleDropdown(setShowAudienceModal, showAudienceModal); }}
                   >
                     <Text style={[styles.dropdownOptionText, audience === item && { color: '#A78BFA', fontWeight: 'bold' }]}>{item}</Text>
                     {audience === item && <MaterialCommunityIcons name="check" size={20} color="#A78BFA" />}
                   </TouchableOpacity>
                 ))}
               </BlurView>
             )}
          </View>

          <View style={styles.formGroup}>
             <Text style={styles.label}>{isTelugu ? 'నోటీస్ వివరణ' : 'Notice Description'}</Text>
             <TextInput 
               style={styles.textArea} 
               placeholder={isTelugu ? "నోటీస్ వివరణ రాయండి..." : "Write notice description..."}
               placeholderTextColor="#9CA3AF"
               value={description} 
               onChangeText={setDescription} 
               multiline
               textAlignVertical="top"
             />
          </View>

          <View style={styles.formGroup}>
             <Text style={styles.label}>{isTelugu ? 'జోడింపు (ఐచ్ఛికం)' : 'Attachment (Optional)'}</Text>
             <TouchableOpacity style={styles.fileInput} onPress={pickDocument} activeOpacity={0.8}>
               <MaterialCommunityIcons name="paperclip" size={20} color="#A78BFA" style={styles.fileIcon} />
               <Text style={[styles.fileInputText, attachmentName !== 'Choose File' && { color: '#F8FAFC' }]} numberOfLines={1}>{attachmentName}</Text>
             </TouchableOpacity>
          </View>

          <View style={styles.formGroup}>
             <Text style={styles.label}>{isTelugu ? 'ప్రచురణ తేదీ' : 'Publish Date'}</Text>
             <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowDatePicker(true)} activeOpacity={0.8}>
               <Text style={[styles.input, { flex: 1, borderWidth: 0, marginBottom: 0, paddingTop: 14, color: '#F8FAFC' }]}>
                 {publishDate}
               </Text>
               <MaterialCommunityIcons name="calendar-blank-outline" size={20} color="#A78BFA" style={styles.inputIcon} />
             </TouchableOpacity>
          </View>

          {showDatePicker && (
            <BlurView intensity={20} tint="dark" style={styles.calendarContainer}>
              <View style={styles.calendarHeader}>
                <TouchableOpacity onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}>
                  <MaterialCommunityIcons name="chevron-left" size={24} color="#F8FAFC" />
                </TouchableOpacity>
                <Text style={styles.calendarMonthText}>
                  {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </Text>
                <TouchableOpacity onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}>
                  <MaterialCommunityIcons name="chevron-right" size={24} color="#F8FAFC" />
                </TouchableOpacity>
              </View>
              <View style={styles.calendarGrid}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(wd => (
                  <View key={wd} style={styles.calendarDay}>
                    <Text style={styles.calendarWeekDayText}>{wd}</Text>
                  </View>
                ))}
                {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, i) => (
                  <View key={`empty-${i}`} style={styles.calendarDay} />
                ))}
                {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, i) => {
                  const dayNum = i + 1;
                  const isSelected = date.getDate() === dayNum && date.getMonth() === currentMonth.getMonth() && date.getFullYear() === currentMonth.getFullYear();
                  return (
                    <TouchableOpacity 
                      key={dayNum} 
                      style={[styles.calendarDay, isSelected && styles.calendarDaySelected]}
                      onPress={() => {
                        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNum);
                        setDate(newDate);
                        setPublishDate(newDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }));
                        setShowDatePicker(false);
                      }}
                    >
                      <Text style={[styles.calendarDayText, isSelected && styles.calendarDayTextSelected]}>{dayNum}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </BlurView>
          )}

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Floating Publish Button */}
        <View style={styles.fabContainer}>
           <TouchableOpacity 
             style={styles.fabButton}
             onPress={() => {
               if (!title.trim() || type === 'Select Type' || audience === 'Select Audience' || !description.trim()) {
                 if (Platform.OS === 'web') {
                   window.alert(isTelugu ? "దయచేసి అన్ని వివరాలను నింపండి." : "Please fill all required fields before publishing.");
                 } else {
                   Alert.alert("Required Fields", isTelugu ? "దయచేసి అన్ని వివరాలను నింపండి." : "Please fill all required fields before publishing.");
                 }
                 return;
               }
               setShowSuccessModal(true);
             }}
           >
              <Text style={styles.fabText}>{isTelugu ? 'నోటీస్ ప్రచురించండి' : 'Publish Notice'}</Text>
           </TouchableOpacity>
        </View>

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
                <Text style={styles.successTitle}>{isTelugu ? 'నోటీస్ జోడించబడింది!' : 'Notice Added!'}</Text>
                <Text style={styles.successText}>
                  {isTelugu 
                    ? `${selectedType} రకం నోటీసు విజయవంతంగా ప్రచురించబడింది.`
                    : `The ${selectedType} notice has been published successfully.`}
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
  safeArea: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center' },
  
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  backButton: { marginRight: 16 },
  brandTitle: { fontSize: 22, fontWeight: 'bold', color: '#F8FAFC', flex: 1 },
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
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

  scrollContent: { paddingHorizontal: 16, paddingTop: 20 },

  formGroup: { marginBottom: 20 },
  label: { fontSize: 14, color: '#9CA3AF', marginBottom: 8, fontWeight: '600' },
  input: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    fontSize: 15,
    color: '#F8FAFC',
  },
  inputText: { fontSize: 15, color: '#9CA3AF' },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
  },
  dropdownOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  inlineDropdownList: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
  },
  inlineDropdownOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  dropdownOptionText: {
    fontSize: 15,
    color: '#E2E8F0',
  },
  textArea: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    height: 120,
    fontSize: 15,
    color: '#F8FAFC',
  },
  fileInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
  },
  fileIcon: { marginRight: 12 },
  fileInputText: { fontSize: 15, color: '#9CA3AF' },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
  },
  inputIcon: { marginLeft: 12 },

  fabContainer: { position: 'absolute', bottom: 80, left: 16, right: 16 },
  fabButton: { 
    backgroundColor: '#5B4BCA', 
    borderRadius: 16, 
    paddingVertical: 16, 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#5B4BCA', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.5, 
    shadowRadius: 8, 
    elevation: 4 
  },
  fabText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },

  bottomTabBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)', position: 'absolute', bottom: 0, width: '100%' },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#94A3B8', marginTop: 4, fontWeight: '500' },

  // Custom Calendar Styles
  calendarContainer: {
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarMonthText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%', // 100% / 7
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarDaySelected: {
    backgroundColor: '#5B4BCA',
    borderRadius: 20,
  },
  calendarWeekDayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  calendarDayText: {
    fontSize: 14,
    color: '#E2E8F0',
  },
  calendarDayTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderColor: '#5B4BCA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
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
