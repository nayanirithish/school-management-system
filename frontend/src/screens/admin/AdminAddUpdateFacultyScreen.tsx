import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image,
  Modal,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';
import { useAdmin, Faculty } from '../../context/AdminContext';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

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
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <MaterialCommunityIcons name="menu" size={24} color="#E0E7FF" />
          </TouchableOpacity>
          <Text style={styles.brandTitle}>ORYOL</Text>
          <View style={styles.appBarRight}>
            <View style={styles.languageToggle}>
              <TouchableOpacity onPress={() => setIsTelugu(false)} style={!isTelugu ? styles.languageActive : styles.languageInactive}>
                <Text style={!isTelugu ? styles.langTextActive : styles.langTextInactive}>EN</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsTelugu(true)} style={isTelugu ? styles.languageActive : styles.languageInactive}>
                <Text style={isTelugu ? styles.langTextActive : styles.langTextInactive}>TE</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ marginLeft: 12 }}>
              <MaterialCommunityIcons name="cog-outline" size={24} color="#A78BFA" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Text style={styles.pageTitle}>{isTelugu ? 'ఫ్యాకల్టీని జోడించండి / నవీకరించండి' : 'Add / Update Faculty'}</Text>

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
             <Text style={styles.label}>{isTelugu ? 'పూర్తి పేరు' : 'Full Name'}</Text>
             <TextInput 
               style={styles.input} 
               value={name} 
               onChangeText={setName} 
             />
          </View>

          <View style={styles.formGroup}>
             <Text style={styles.label}>{isTelugu ? 'విభాగం' : 'Department'}</Text>
             <TouchableOpacity style={styles.dropdown} onPress={() => setShowDeptModal(true)}>
               <Text style={styles.inputText}>{department || (isTelugu ? 'విభాగాన్ని ఎంచుకోండి' : 'Select Department')}</Text>
               <MaterialCommunityIcons name="chevron-down" size={20} color="#94A3B8" />
             </TouchableOpacity>
          </View>

          <View style={styles.formGroup}>
             <Text style={styles.label}>{isTelugu ? 'ఇమెయిల్' : 'Email'}</Text>
             <TextInput 
               style={styles.input} 
               value={email} 
               onChangeText={setEmail} 
               keyboardType="email-address"
               autoCapitalize="none"
             />
          </View>

          <View style={styles.formGroup}>
             <Text style={styles.label}>{isTelugu ? 'సంప్రదింపు సంఖ్య' : 'Contact Number'}</Text>
             <TextInput 
               style={styles.input} 
               value={contact} 
               onChangeText={setContact} 
               keyboardType="phone-pad"
             />
          </View>

          <View style={styles.formGroup}>
             <Text style={styles.label}>{isTelugu ? 'అర్హత' : 'Qualification'}</Text>
             <TextInput 
               style={styles.input} 
               value={qualification} 
               onChangeText={setQualification} 
             />
          </View>

          <View style={styles.row}>
             <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
               <Text style={styles.label}>{isTelugu ? 'చేరిన తేదీ' : 'Date of Joining'}</Text>
               <View style={styles.inputWithIcon}>
                 <TextInput 
                   style={[styles.input, { flex: 1, borderWidth: 0, marginBottom: 0, backgroundColor: 'transparent' }]} 
                   value={doj} 
                   onChangeText={setDoj} 
                 />
                 <MaterialCommunityIcons name="calendar-blank-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
               </View>
             </View>
             <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
               <Text style={styles.label}>{isTelugu ? 'స్థితి' : 'Status'}</Text>
               <TouchableOpacity 
                 style={styles.dropdown}
                 onPress={() => setStatus(prev => prev === 'Active' ? 'Inactive' : 'Active')}
               >
                 <Text style={styles.inputText}>{status}</Text>
                 <MaterialCommunityIcons name="chevron-down" size={20} color="#94A3B8" />
               </TouchableOpacity>
             </View>
          </View>

          <View style={styles.sectionDivider} />
          <Text style={styles.sectionTitle}>{isTelugu ? 'విద్యా అర్హత పత్రాలు' : 'Educational Qualification Documents'}</Text>

          <View style={styles.formGroup}>
             <Text style={styles.label}>{isTelugu ? 'డిగ్రీ సర్టిఫికేట్' : 'Degree Certificate'}</Text>
             <TouchableOpacity style={styles.uploadBox} onPress={() => pickDocument(setDegreePhoto)}>
               <MaterialCommunityIcons name={degreePhoto ? "check-circle" : "cloud-upload-outline"} size={24} color={degreePhoto ? "#10B981" : "#94A3B8"} />
               <Text style={styles.uploadText}>{degreePhoto ? (isTelugu ? 'పత్రం అప్‌లోడ్ చేయబడింది' : 'Degree Document Uploaded') : (isTelugu ? 'అప్‌లోడ్ చేయడానికి నొక్కండి' : 'Tap to upload Photo')}</Text>
             </TouchableOpacity>
             {degreePhoto ? <Image source={{uri: degreePhoto}} style={styles.previewImage} /> : null}
          </View>

          <View style={styles.formGroup}>
             <Text style={styles.label}>{isTelugu ? 'ఇంటర్ / డిప్లొమా సర్టిఫికేట్' : 'Inter / Diploma Certificate'}</Text>
             <TouchableOpacity style={styles.uploadBox} onPress={() => pickDocument(setInterDiplomaPhoto)}>
               <MaterialCommunityIcons name={interDiplomaPhoto ? "check-circle" : "cloud-upload-outline"} size={24} color={interDiplomaPhoto ? "#10B981" : "#94A3B8"} />
               <Text style={styles.uploadText}>{interDiplomaPhoto ? (isTelugu ? 'పత్రం అప్‌లోడ్ చేయబడింది' : 'Inter/Diploma Document Uploaded') : (isTelugu ? 'అప్‌లోడ్ చేయడానికి నొక్కండి' : 'Tap to upload Photo')}</Text>
             </TouchableOpacity>
             {interDiplomaPhoto ? <Image source={{uri: interDiplomaPhoto}} style={styles.previewImage} /> : null}
          </View>

          <View style={styles.formGroup}>
             <Text style={styles.label}>{isTelugu ? '10వ సర్టిఫికేట్' : '10th Certificate'}</Text>
             <TouchableOpacity style={styles.uploadBox} onPress={() => pickDocument(setTenthPhoto)}>
               <MaterialCommunityIcons name={tenthPhoto ? "check-circle" : "cloud-upload-outline"} size={24} color={tenthPhoto ? "#10B981" : "#94A3B8"} />
               <Text style={styles.uploadText}>{tenthPhoto ? (isTelugu ? 'పత్రం అప్‌లోడ్ చేయబడింది' : '10th Document Uploaded') : (isTelugu ? 'అప్‌లోడ్ చేయడానికి నొక్కండి' : 'Tap to upload Photo')}</Text>
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
              <Text style={styles.fabText}>{isTelugu ? 'ఫ్యాకల్టీని సేవ్ చేయండి' : 'Save Faculty'}</Text>
           </TouchableOpacity>
        </View>

        {/* Bottom Tab Bar */}
        <BlurView intensity={40} tint="dark" style={styles.bottomTabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminFeeManagement')}>
            <MaterialCommunityIcons name="receipt" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Fee{'\n'}Mgmt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Notice</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminProfile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#94A3B8" />
            <Text style={styles.tabLabel}>Profile</Text>
          </TouchableOpacity>
        </BlurView>

        <Modal visible={showDeptModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
             <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowDeptModal(false)} activeOpacity={1} />
             <View style={styles.centerModalContent}>
                <Text style={styles.modalTitle}>{isTelugu ? 'విభాగాన్ని ఎంచుకోండి' : 'Select Department'}</Text>
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center' },
  
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  backButton: { marginRight: 16 },
  brandTitle: { fontSize: 22, fontWeight: '900', color: '#F8FAFC', flex: 1, letterSpacing: 0.5 },
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

  scrollContent: { paddingHorizontal: 16, paddingTop: 16 },

  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 24 },

  avatarSection: { alignItems: 'center', marginBottom: 24 },
  avatarWrapper: { position: 'relative' },
  avatarImage: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#334155' },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#5B4BCA',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1E293B',
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
    borderColor: '#1E293B',
  },

  row: { flexDirection: 'row' },
  formGroup: { marginBottom: 16 },
  label: { fontSize: 13, color: '#94A3B8', marginBottom: 6 },
  input: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 15,
    color: '#F8FAFC',
  },
  inputText: { fontSize: 15, color: '#E2E8F0' },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: { marginLeft: 8 },

  fabContainer: { position: 'absolute', bottom: 80, left: 16, right: 16 },
  fabButton: { 
    backgroundColor: '#5B4BCA', 
    borderRadius: 30, 
    paddingVertical: 14, 
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
  tabLabel: { fontSize: 10, color: '#94A3B8', marginTop: 4, fontWeight: '500', textAlign: 'center' },
  sectionDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 16 },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: { marginLeft: 8, fontSize: 14, color: '#94A3B8' },
  previewImage: { width: '100%', height: 120, borderRadius: 8, marginTop: 8, resizeMode: 'cover' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  centerModalContent: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#5B4BCA',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 16, textAlign: 'center' },
  settingsOption: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  settingsOptionText: {
    fontSize: 15,
    color: '#E2E8F0',
    fontWeight: '500',
    textAlign: 'center'
  },
});
