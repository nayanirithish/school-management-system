import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
  const [publishDate, setPublishDate] = useState('22 May 2024');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const selectedType = type !== 'Select Type' ? type : 'General';

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

        <View style={styles.formGroup}>
           <Text style={styles.label}>Notice Type</Text>
           <TouchableOpacity style={styles.dropdown}>
             <Text style={styles.inputText}>{type}</Text>
             <MaterialCommunityIcons name="chevron-down" size={20} color="#111827" />
           </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
           <Text style={styles.label}>Audience</Text>
           <TouchableOpacity style={styles.dropdown}>
             <Text style={styles.inputText}>{audience}</Text>
             <MaterialCommunityIcons name="chevron-down" size={20} color="#111827" />
           </TouchableOpacity>
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
           <TouchableOpacity style={styles.fileInput}>
             <MaterialCommunityIcons name="paperclip" size={20} color="#111827" style={styles.fileIcon} />
             <Text style={styles.fileInputText}>Choose File</Text>
           </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
           <Text style={styles.label}>Publish Date</Text>
           <View style={styles.inputWithIcon}>
             <TextInput 
               style={[styles.input, { flex: 1, borderWidth: 0, marginBottom: 0 }]} 
               value={publishDate} 
               onChangeText={setPublishDate} 
             />
             <MaterialCommunityIcons name="calendar-blank-outline" size={20} color="#111827" style={styles.inputIcon} />
           </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Publish Button */}
      <View style={styles.fabContainer}>
         <TouchableOpacity 
           style={styles.fabButton}
           onPress={() => setShowSuccessModal(true)}
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
