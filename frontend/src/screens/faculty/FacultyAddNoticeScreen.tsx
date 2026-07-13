import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Modal,
  FlatList,
  Platform,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as DocumentPicker from 'expo-document-picker';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

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

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.brandTitle}>ORYOL</Text>
        <View style={styles.appBarRight}>
          <View style={styles.languageToggle}>
            <TouchableOpacity onPress={() => setIsTelugu(false)} style={!isTelugu ? styles.languageActive : styles.languageInactive}>
              <Text style={!isTelugu ? styles.langTextActive : styles.langTextInactive}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsTelugu(true)} style={isTelugu ? styles.languageActive : styles.languageInactive}>
              <Text style={isTelugu ? styles.langTextActive : styles.langTextInactive}>Telugu</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ marginLeft: 12 }}>
            <MaterialCommunityIcons name="cog-outline" size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.pageTitle}>Add Notice</Text>

        {/* Form Fields */}
        <View style={styles.formGroup}>
           <Text style={styles.label}>Notice Title</Text>
           <TextInput 
             style={styles.input} 
             placeholder="Enter notice title"
             placeholderTextColor="#9CA3AF"
             value={title} 
             onChangeText={setTitle} 
           />
        </View>

        <View style={[styles.formGroup, { zIndex: 10 }]}>
           <Text style={styles.label}>Notice Type</Text>
           <TouchableOpacity 
             style={[styles.dropdown, showTypeModal && styles.dropdownOpen]} 
             onPress={() => setShowTypeModal(!showTypeModal)}
           >
             <Text style={styles.inputText}>{type}</Text>
             <MaterialCommunityIcons name={showTypeModal ? "chevron-up" : "chevron-down"} size={20} color="#111827" />
           </TouchableOpacity>
           {showTypeModal && (
             <View style={styles.inlineDropdownList}>
               {noticeTypes.map((item, index) => (
                 <TouchableOpacity 
                   key={item}
                   style={[styles.inlineDropdownOption, index === noticeTypes.length - 1 && { borderBottomWidth: 0 }]}
                   onPress={() => { setType(item); setShowTypeModal(false); }}
                 >
                   <Text style={[styles.dropdownOptionText, type === item && { color: '#4F46E5', fontWeight: 'bold' }]}>{item}</Text>
                   {type === item && <MaterialCommunityIcons name="check" size={20} color="#4F46E5" />}
                 </TouchableOpacity>
               ))}
             </View>
           )}
        </View>

        <View style={[styles.formGroup, { zIndex: 9 }]}>
           <Text style={styles.label}>Audience</Text>
           <TouchableOpacity 
             style={[styles.dropdown, showAudienceModal && styles.dropdownOpen]} 
             onPress={() => setShowAudienceModal(!showAudienceModal)}
           >
             <Text style={styles.inputText}>{audience}</Text>
             <MaterialCommunityIcons name={showAudienceModal ? "chevron-up" : "chevron-down"} size={20} color="#111827" />
           </TouchableOpacity>
           {showAudienceModal && (
             <View style={styles.inlineDropdownList}>
               {audiences.map((item, index) => (
                 <TouchableOpacity 
                   key={item}
                   style={[styles.inlineDropdownOption, index === audiences.length - 1 && { borderBottomWidth: 0 }]}
                   onPress={() => { setAudience(item); setShowAudienceModal(false); }}
                 >
                   <Text style={[styles.dropdownOptionText, audience === item && { color: '#4F46E5', fontWeight: 'bold' }]}>{item}</Text>
                   {audience === item && <MaterialCommunityIcons name="check" size={20} color="#4F46E5" />}
                 </TouchableOpacity>
               ))}
             </View>
           )}
        </View>

        <View style={styles.formGroup}>
           <Text style={styles.label}>Notice Description</Text>
           <TextInput 
             style={styles.textArea} 
             placeholder="Write notice description..."
             placeholderTextColor="#9CA3AF"
             value={description} 
             onChangeText={setDescription} 
             multiline
             textAlignVertical="top"
           />
        </View>

        <View style={styles.formGroup}>
           <Text style={styles.label}>Attachment (Optional)</Text>
           <TouchableOpacity style={styles.fileInput} onPress={pickDocument}>
             <MaterialCommunityIcons name="paperclip" size={20} color="#111827" style={styles.fileIcon} />
             <Text style={styles.fileInputText} numberOfLines={1}>{attachmentName}</Text>
           </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
           <Text style={styles.label}>Publish Date</Text>
           <TouchableOpacity style={styles.inputWithIcon} onPress={() => setShowDatePicker(true)}>
             <Text style={[styles.input, { flex: 1, borderWidth: 0, marginBottom: 0, paddingTop: 14 }]}>
               {publishDate}
             </Text>
             <MaterialCommunityIcons name="calendar-blank-outline" size={20} color="#111827" style={styles.inputIcon} />
           </TouchableOpacity>
        </View>

        {showDatePicker && (
          <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}>
                <MaterialCommunityIcons name="chevron-left" size={24} color="#111827" />
              </TouchableOpacity>
              <Text style={styles.calendarMonthText}>
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </Text>
              <TouchableOpacity onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#111827" />
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
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Publish Button */}
      <View style={styles.fabContainer}>
         <TouchableOpacity 
           style={styles.fabButton}
           onPress={() => {
             if (!title.trim() || type === 'Select Type' || audience === 'Select Audience' || !description.trim()) {
               if (Platform.OS === 'web') {
                 window.alert("Please fill all required fields before publishing.");
               } else {
                 Alert.alert("Required Fields", "Please fill all required fields before publishing.");
               }
               return;
             }
             setShowSuccessModal(true);
           }}
         >
            <Text style={styles.fabText}>Publish Notice</Text>
         </TouchableOpacity>
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultyHome')}>
          <MaterialCommunityIcons name="home-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <MaterialCommunityIcons name="bell" size={28} color="#4F46E5" />
          <Text style={[styles.tabLabel, { color: '#4F46E5' }]}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FacultySettings')}>
          <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Modals removed to use inline accordion dropdowns */}

      {/* Success Modal */}
      {showSuccessModal && (
        <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
          <View style={styles.modalOverlay}>
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
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F9FAFB' },
  
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backButton: { marginRight: 16 },
  brandTitle: { fontSize: 22, fontWeight: '900', color: '#4F46E5', flex: 1, letterSpacing: 0.5 },
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    height: 32,
    alignItems: 'center',
    padding: 2,
  },
  languageActive: {
    backgroundColor: '#4F46E5',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageInactive: { paddingHorizontal: 12, justifyContent: 'center' },
  langTextActive: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  langTextInactive: { color: '#4F46E5', fontSize: 12, fontWeight: '500' },

  scrollContent: { paddingHorizontal: 16, paddingTop: 16 },

  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 20 },

  formGroup: { marginBottom: 16 },
  label: { fontSize: 13, color: '#6B7280', marginBottom: 8 },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 15,
    color: '#111827',
  },
  inputText: { fontSize: 15, color: '#6B7280' },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  dropdownOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  inlineDropdownList: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
  },
  inlineDropdownOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#374151',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingTop: 12,
    height: 120,
    fontSize: 15,
    color: '#111827',
  },
  fileInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  fileIcon: { marginRight: 8 },
  fileInputText: { fontSize: 15, color: '#111827' },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: { marginLeft: 8 },

  fabContainer: { position: 'absolute', bottom: 80, left: 16, right: 16 },
  fabButton: { 
    backgroundColor: '#4F46E5', 
    borderRadius: 30, 
    paddingVertical: 14, 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#4F46E5', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    elevation: 4 
  },
  fabText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },

  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 10, color: '#9CA3AF', marginTop: 4, fontWeight: '500', textAlign: 'center' },

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

  // Custom Calendar Styles
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
    color: '#111827',
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
    backgroundColor: '#4F46E5',
    borderRadius: 20,
  },
  calendarWeekDayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  calendarDayText: {
    fontSize: 14,
    color: '#374151',
  },
  calendarDayTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
