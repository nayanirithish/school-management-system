import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Modal,
  FlatList,
  Alert
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as DocumentPicker from 'expo-document-picker';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type AdminUploadResultsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminUploadResults'>;
interface Props {
  navigation: AdminUploadResultsNavigationProp;
}

export default function AdminUploadResultsScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();

  const classes = ['Class 6 - A', 'Class 7 - B', 'Class 8 - A', 'Class 9 - B', 'Class 10 - A', 'Class 11 - C'];
  const examTypes = ['Unit Test 1', 'Mid-Term Exams', 'Unit Test 2', 'Pre-Board Exams', 'Final Annual Exams'];

  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedExamType, setSelectedExamType] = useState<string | null>(null);
  const [documentUri, setDocumentUri] = useState<string | null>(null);
  const [documentName, setDocumentName] = useState<string | null>(null);

  const [showClassModal, setShowClassModal] = useState(false);
  const [showExamModal, setShowExamModal] = useState(false);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        copyToCacheDirectory: true,
      });
      if (result.canceled === false && result.assets && result.assets.length > 0) {
        setDocumentUri(result.assets[0].uri);
        setDocumentName(result.assets[0].name);
      }
    } catch (err) {
      console.log('Error picking document', err);
    }
  };

  const handleSubmit = () => {
    if (!selectedClass || !selectedExamType || !documentUri) {
      // Typically we'd use a toast, fallback to alert on native
      alert("Please fill all fields and upload a file before submitting.");
      return;
    }
    
    // In a real app, this would be an API call uploading FormData
    alert("Results uploaded successfully!");
    navigation.goBack();
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
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Upload Class Results</Text>

        <View style={styles.formCard}>
           
           <View style={styles.formGroup}>
             <Text style={styles.label}>Select Class</Text>
             <TouchableOpacity style={styles.dropdown} onPress={() => setShowClassModal(true)}>
               <Text style={[styles.inputText, !selectedClass && { color: '#9CA3AF' }]}>
                 {selectedClass || 'Select a class'}
               </Text>
               <MaterialCommunityIcons name="chevron-down" size={20} color="#111827" />
             </TouchableOpacity>
           </View>

           <View style={styles.formGroup}>
             <Text style={styles.label}>Exam Type</Text>
             <TouchableOpacity style={styles.dropdown} onPress={() => setShowExamModal(true)}>
               <Text style={[styles.inputText, !selectedExamType && { color: '#9CA3AF' }]}>
                 {selectedExamType || 'Select exam type'}
               </Text>
               <MaterialCommunityIcons name="chevron-down" size={20} color="#111827" />
             </TouchableOpacity>
           </View>

           <View style={styles.sectionDivider} />
           <Text style={styles.sectionTitle}>Results Document (CSV or PDF)</Text>

           <View style={styles.formGroup}>
             <TouchableOpacity style={styles.uploadBox} onPress={pickDocument}>
               <MaterialCommunityIcons 
                 name={documentUri ? "file-document-outline" : "cloud-upload-outline"} 
                 size={32} 
                 color={documentUri ? "#4F46E5" : "#6B7280"} 
                 style={{ marginBottom: 8 }}
               />
               <Text style={[styles.uploadText, documentUri && { color: '#4F46E5', fontWeight: 'bold' }]}>
                 {documentUri ? 'File Selected' : 'Tap to select results file'}
               </Text>
               {documentName && <Text style={styles.fileName}>{documentName}</Text>}
             </TouchableOpacity>
           </View>

        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Save Button */}
      <View style={styles.fabContainer}>
         <TouchableOpacity 
           style={styles.fabButton}
           onPress={handleSubmit}
         >
            <Text style={styles.fabText}>Submit Results</Text>
         </TouchableOpacity>
      </View>

      {/* Class Modal */}
      <Modal visible={showClassModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
           <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowClassModal(false)} activeOpacity={1} />
           <View style={styles.centerModalContent}>
              <Text style={styles.modalTitle}>Select Class</Text>
              <FlatList
                data={classes}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.modalOption} onPress={() => { setSelectedClass(item); setShowClassModal(false); }}>
                     <Text style={styles.modalOptionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
           </View>
        </View>
      </Modal>

      {/* Exam Type Modal */}
      <Modal visible={showExamModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
           <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowExamModal(false)} activeOpacity={1} />
           <View style={styles.centerModalContent}>
              <Text style={styles.modalTitle}>Select Exam Type</Text>
              <FlatList
                data={examTypes}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.modalOption} onPress={() => { setSelectedExamType(item); setShowExamModal(false); }}>
                     <Text style={styles.modalOptionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
           </View>
        </View>
      </Modal>

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

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  formGroup: { marginBottom: 20 },
  label: { fontSize: 13, color: '#6B7280', marginBottom: 8 },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
  },
  inputText: { fontSize: 15, color: '#111827' },
  
  sectionDivider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 20 },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#111827', marginBottom: 12 },

  uploadBox: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  uploadText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  fileName: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center'
  },

  fabContainer: { position: 'absolute', bottom: 30, left: 16, right: 16 },
  fabButton: { 
    backgroundColor: '#4F46E5', 
    borderRadius: 16, 
    paddingVertical: 16, 
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#4F46E5', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    elevation: 4 
  },
  fabText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },

  // Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  centerModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    maxHeight: '80%',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 16, textAlign: 'center' },
  modalOption: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalOptionText: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
    textAlign: 'center'
  },
});
