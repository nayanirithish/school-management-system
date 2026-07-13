import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  Modal,
  FlatList
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';
import { useAdmin, Faculty } from '../../context/AdminContext';

type AdminAddUpdateFacultyRouteProp = RouteProp<RootStackParamList, 'AdminAddUpdateFaculty'>;
type AdminAddUpdateFacultyNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminAddUpdateFaculty'>;
interface Props {
  navigation: AdminAddUpdateFacultyNavigationProp;
  route: AdminAddUpdateFacultyRouteProp;
}

export default function AdminAddUpdateFacultyScreen({ navigation, route }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const { facultyList, addFaculty, updateFaculty } = useAdmin();
  
  const facultyId = route.params?.facultyId;
  const existingFaculty = facultyId ? facultyList.find(f => f.id === facultyId) : null;

  // Form states to make fields interactive
  const [name, setName] = useState(existingFaculty?.name || '');
  const [department, setDepartment] = useState(existingFaculty?.dept || '');
  const [email, setEmail] = useState(existingFaculty?.email || '');
  const [contact, setContact] = useState(existingFaculty?.contact || '');
  const [qualification, setQualification] = useState(existingFaculty?.qualification || '');
  const [doj, setDoj] = useState(existingFaculty?.doj || '');
  const [status, setStatus] = useState<'Active' | 'Inactive'>(existingFaculty?.status || 'Active');
  const [avatar, setAvatar] = useState(existingFaculty?.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`);
  
  const [degreePhoto, setDegreePhoto] = useState(existingFaculty?.degreePhotoUrl || '');
  const [interDiplomaPhoto, setInterDiplomaPhoto] = useState(existingFaculty?.interDiplomaPhotoUrl || '');
  const [tenthPhoto, setTenthPhoto] = useState(existingFaculty?.tenthPhotoUrl || '');

  const [showDeptModal, setShowDeptModal] = useState(false);
  const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'];

  const pickDocument = async (setter: React.Dispatch<React.SetStateAction<string>>) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*'],
        copyToCacheDirectory: true,
      });
      if (result.canceled === false && result.assets && result.assets.length > 0) {
        setter(result.assets[0].uri);
      }
    } catch (err) {
      console.log('Error picking document', err);
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('AdminFacultyManagement');
    }
  };

  const handleSave = () => {
    const facultyData: Faculty = {
      id: existingFaculty ? existingFaculty.id : Date.now(),
      name,
      dept: department,
      email,
      contact,
      qualification,
      doj,
      status,
      avatar,
      degreePhotoUrl: degreePhoto,
      interDiplomaPhotoUrl: interDiplomaPhoto,
      tenthPhotoUrl: tenthPhoto
    };

    if (existingFaculty) {
      updateFaculty(facultyData);
    } else {
      addFaculty(facultyData);
    }
    handleBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
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
        
        <Text style={styles.pageTitle}>Add / Update Faculty</Text>

        {/* Avatar Upload */}
        <View style={styles.avatarSection}>
           <View style={styles.avatarWrapper}>
             <Image source={{ uri: avatar }} style={styles.avatarImage} />
             <TouchableOpacity style={styles.cameraButton} onPress={() => pickDocument(setAvatar)}>
                <MaterialCommunityIcons name="camera" size={16} color="#FFFFFF" />
             </TouchableOpacity>
             <TouchableOpacity 
               style={styles.deleteAvatarButton} 
               onPress={() => setAvatar(`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`)}
             >
                <MaterialCommunityIcons name="delete" size={16} color="#FFFFFF" />
             </TouchableOpacity>
           </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formGroup}>
           <Text style={styles.label}>Full Name</Text>
           <TextInput 
             style={styles.input} 
             value={name} 
             onChangeText={setName} 
           />
        </View>

        <View style={styles.formGroup}>
           <Text style={styles.label}>Department</Text>
           <TouchableOpacity style={styles.dropdown} onPress={() => setShowDeptModal(true)}>
             <Text style={styles.inputText}>{department || 'Select Department'}</Text>
             <MaterialCommunityIcons name="chevron-down" size={20} color="#111827" />
           </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
           <Text style={styles.label}>Email</Text>
           <TextInput 
             style={styles.input} 
             value={email} 
             onChangeText={setEmail} 
             keyboardType="email-address"
             autoCapitalize="none"
           />
        </View>

        <View style={styles.formGroup}>
           <Text style={styles.label}>Contact Number</Text>
           <TextInput 
             style={styles.input} 
             value={contact} 
             onChangeText={setContact} 
             keyboardType="phone-pad"
           />
        </View>

        <View style={styles.formGroup}>
           <Text style={styles.label}>Qualification</Text>
           <TextInput 
             style={styles.input} 
             value={qualification} 
             onChangeText={setQualification} 
           />
        </View>

        <View style={styles.row}>
           <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
             <Text style={styles.label}>Date of Joining</Text>
             <View style={styles.inputWithIcon}>
               <TextInput 
                 style={[styles.input, { flex: 1, borderWidth: 0, marginBottom: 0 }]} 
                 value={doj} 
                 onChangeText={setDoj} 
               />
               <MaterialCommunityIcons name="calendar-blank-outline" size={20} color="#111827" style={styles.inputIcon} />
             </View>
           </View>
           <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
             <Text style={styles.label}>Status</Text>
             <TouchableOpacity 
               style={styles.dropdown}
               onPress={() => setStatus(prev => prev === 'Active' ? 'Inactive' : 'Active')}
             >
               <Text style={styles.inputText}>{status}</Text>
               <MaterialCommunityIcons name="chevron-down" size={20} color="#111827" />
             </TouchableOpacity>
           </View>
        </View>

        <View style={styles.sectionDivider} />
        <Text style={styles.sectionTitle}>Educational Qualification Documents</Text>

        <View style={styles.formGroup}>
           <Text style={styles.label}>Degree Certificate</Text>
           <TouchableOpacity style={styles.uploadBox} onPress={() => pickDocument(setDegreePhoto)}>
             <MaterialCommunityIcons name={degreePhoto ? "check-circle" : "cloud-upload-outline"} size={24} color={degreePhoto ? "#10B981" : "#6B7280"} />
             <Text style={styles.uploadText}>{degreePhoto ? 'Degree Document Uploaded' : 'Tap to upload Photo'}</Text>
           </TouchableOpacity>
           {degreePhoto ? <Image source={{uri: degreePhoto}} style={styles.previewImage} /> : null}
        </View>

        <View style={styles.formGroup}>
           <Text style={styles.label}>Inter / Diploma Certificate</Text>
           <TouchableOpacity style={styles.uploadBox} onPress={() => pickDocument(setInterDiplomaPhoto)}>
             <MaterialCommunityIcons name={interDiplomaPhoto ? "check-circle" : "cloud-upload-outline"} size={24} color={interDiplomaPhoto ? "#10B981" : "#6B7280"} />
             <Text style={styles.uploadText}>{interDiplomaPhoto ? 'Inter/Diploma Document Uploaded' : 'Tap to upload Photo'}</Text>
           </TouchableOpacity>
           {interDiplomaPhoto ? <Image source={{uri: interDiplomaPhoto}} style={styles.previewImage} /> : null}
        </View>

        <View style={styles.formGroup}>
           <Text style={styles.label}>10th Certificate</Text>
           <TouchableOpacity style={styles.uploadBox} onPress={() => pickDocument(setTenthPhoto)}>
             <MaterialCommunityIcons name={tenthPhoto ? "check-circle" : "cloud-upload-outline"} size={24} color={tenthPhoto ? "#10B981" : "#6B7280"} />
             <Text style={styles.uploadText}>{tenthPhoto ? '10th Document Uploaded' : 'Tap to upload Photo'}</Text>
           </TouchableOpacity>
           {tenthPhoto ? <Image source={{uri: tenthPhoto}} style={styles.previewImage} /> : null}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Save Button */}
      <View style={styles.fabContainer}>
         <TouchableOpacity 
           style={styles.fabButton}
           onPress={handleSave}
         >
            <Text style={styles.fabText}>Save Faculty</Text>
         </TouchableOpacity>
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminHome')}>
          <MaterialCommunityIcons name="home-outline" size={28} color="#4F46E5" />
          <Text style={[styles.tabLabel, { color: '#4F46E5' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminFeeManagement')}>
          <MaterialCommunityIcons name="receipt" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Fee{'\n'}Management</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminNotices')}>
          <MaterialCommunityIcons name="bell-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminProfile')}>
          <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showDeptModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
           <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowDeptModal(false)} activeOpacity={1} />
           <View style={styles.centerModalContent}>
              <Text style={styles.modalTitle}>Select Department</Text>
              <FlatList 
                data={departments}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.settingsOption} onPress={() => { setDepartment(item); setShowDeptModal(false); }}>
                     <Text style={styles.settingsOptionText}>{item}</Text>
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

  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 24 },

  avatarSection: { alignItems: 'center', marginBottom: 24 },
  avatarWrapper: { position: 'relative' },
  avatarImage: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E5E7EB' },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4F46E5',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  deleteAvatarButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#EF4444',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  row: { flexDirection: 'row' },
  formGroup: { marginBottom: 16 },
  label: { fontSize: 13, color: '#6B7280', marginBottom: 6 },
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
  inputText: { fontSize: 15, color: '#111827' },
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
  sectionDivider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: { marginLeft: 8, fontSize: 14, color: '#4B5563' },
  previewImage: { width: '100%', height: 120, borderRadius: 8, marginTop: 8, resizeMode: 'cover' },
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
  settingsOption: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingsOptionText: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '500',
    textAlign: 'center'
  },
});
