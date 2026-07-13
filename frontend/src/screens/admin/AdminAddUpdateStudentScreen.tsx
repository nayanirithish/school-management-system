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
import { useAdmin, Student } from '../../context/AdminContext';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

type AdminAddUpdateStudentRouteProp = RouteProp<RootStackParamList, 'AdminAddUpdateStudent'>;
type AdminAddUpdateStudentNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminAddUpdateStudent'>;
interface Props {
  navigation: AdminAddUpdateStudentNavigationProp;
  route: AdminAddUpdateStudentRouteProp;
}

export default function AdminAddUpdateStudentScreen({ navigation, route }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const { studentList, addStudent, updateStudent } = useAdmin();
  
  const studentId = route.params?.studentId;
  const existingStudent = studentId ? studentList.find(s => s.id === studentId) : null;

  // Form states to make fields interactive
  const [name, setName] = useState(existingStudent?.name || '');
  const [className, setClassName] = useState(existingStudent?.className || '');
  const [roll, setRoll] = useState(existingStudent?.roll || '');
  const [dob, setDob] = useState(existingStudent?.dob || '');
  const [gender, setGender] = useState(existingStudent?.gender || 'Male');
  const [contact, setContact] = useState(existingStudent?.contact || '');
  const [address, setAddress] = useState(existingStudent?.address || '');
  const [avatar, setAvatar] = useState(existingStudent?.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`);
  
  const [tuitionFee, setTuitionFee] = useState(existingStudent?.tuitionFee || '15000');
  const [transportFee, setTransportFee] = useState(existingStudent?.transportFee || '5000');
  const [libraryFee, setLibraryFee] = useState(existingStudent?.libraryFee || '2000');
  
  const [aadhar, setAadhar] = useState(existingStudent?.aadharUrl || '');
  const [tc, setTc] = useState(existingStudent?.tcUrl || '');
  const [studyCert, setStudyCert] = useState(existingStudent?.studyCertUrl || '');
  
  const [showClassModal, setShowClassModal] = useState(false);
  const classes = ['Class 6 - A', 'Class 7 - B', 'Class 8 - A', 'Class 9 - B', 'Class 10 - A', 'Class 11 - C'];

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
      navigation.navigate('AdminStudentManagement');
    }
  };

  const handleSave = () => {
    const studentData: Student = {
      id: existingStudent ? existingStudent.id : Date.now(),
      name,
      className,
      roll,
      dob,
      gender,
      contact,
      address,
      status: existingStudent?.status || 'Active',
      avatar,
      tuitionFee,
      transportFee,
      libraryFee,
      aadharUrl: aadhar,
      tcUrl: tc,
      studyCertUrl: studyCert
    };

    if (existingStudent) {
      updateStudent(studentData);
    } else {
      addStudent(studentData);
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
          
          <Text style={styles.pageTitle}>{isTelugu ? 'విద్యార్థిని జోడించండి / నవీకరించండి' : 'Add / Update Student'}</Text>

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

          <View style={styles.row}>
             <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
               <Text style={styles.label}>{isTelugu ? 'తరగతి' : 'Class'}</Text>
               <TouchableOpacity style={styles.dropdown} onPress={() => setShowClassModal(true)}>
                 <Text style={styles.inputText}>{className || (isTelugu ? 'తరగతిని ఎంచుకోండి' : 'Select Class')}</Text>
                 <MaterialCommunityIcons name="chevron-down" size={20} color="#94A3B8" />
               </TouchableOpacity>
             </View>
             <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
               <Text style={styles.label}>{isTelugu ? 'రోల్ నం.' : 'Roll No.'}</Text>
               <TextInput 
                 style={styles.input} 
                 value={roll} 
                 onChangeText={setRoll} 
                 keyboardType="number-pad"
               />
             </View>
          </View>

          <View style={styles.row}>
             <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
               <Text style={styles.label}>{isTelugu ? 'పుట్టిన తేది' : 'Date of Birth'}</Text>
               <View style={styles.inputWithIcon}>
                 <TextInput 
                   style={[styles.input, { flex: 1, borderWidth: 0, marginBottom: 0, backgroundColor: 'transparent' }]} 
                   value={dob} 
                   onChangeText={setDob} 
                 />
                 <MaterialCommunityIcons name="calendar-blank-outline" size={20} color="#94A3B8" style={styles.inputIcon} />
               </View>
             </View>
             <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
               <Text style={styles.label}>{isTelugu ? 'లింగం' : 'Gender'}</Text>
               <TouchableOpacity 
                 style={styles.dropdown} 
                 onPress={() => setGender(prev => prev === 'Male' ? 'Female' : 'Male')}
               >
                 <Text style={styles.inputText}>{gender}</Text>
                 <MaterialCommunityIcons name="chevron-down" size={20} color="#94A3B8" />
               </TouchableOpacity>
             </View>
          </View>

          <View style={styles.formGroup}>
             <Text style={styles.label}>{isTelugu ? 'సంప్రదింపు నంబర్' : 'Contact Number'}</Text>
             <TextInput 
               style={styles.input} 
               value={contact} 
               onChangeText={setContact} 
               keyboardType="phone-pad"
             />
          </View>

          <View style={styles.formGroup}>
             <Text style={styles.label}>{isTelugu ? 'చిరునామా' : 'Address'}</Text>
             <TextInput 
               style={styles.input} 
               value={address} 
               onChangeText={setAddress} 
             />
          </View>

          {/* Fee Information Box */}
          <BlurView intensity={20} tint="dark" style={styles.feeInfoCard}>
             <Text style={styles.feeInfoTitle}>{isTelugu ? 'ఫీజు సమాచారం' : 'Fee Information'}</Text>
             
             <View style={styles.formGroup}>
               <Text style={styles.label}>{isTelugu ? 'ట్యూషన్ ఫీజు (₹)' : 'Tuition Fee (₹)'}</Text>
               <TextInput 
                 style={styles.input} 
                 value={tuitionFee} 
                 onChangeText={setTuitionFee} 
                 keyboardType="number-pad"
               />
             </View>

             <View style={styles.row}>
               <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                 <Text style={styles.label}>{isTelugu ? 'రవాణా ఫీజు (₹)' : 'Transport Fee (₹)'}</Text>
                 <TextInput 
                   style={styles.input} 
                   value={transportFee} 
                   onChangeText={setTransportFee} 
                   keyboardType="number-pad"
                 />
               </View>
               <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                 <Text style={styles.label}>{isTelugu ? 'లైబ్రరీ ఫీజు (₹)' : 'Library Fee (₹)'}</Text>
                 <TextInput 
                   style={styles.input} 
                   value={libraryFee} 
                   onChangeText={setLibraryFee} 
                   keyboardType="number-pad"
                 />
               </View>
             </View>
          </BlurView>

          <View style={styles.sectionDivider} />
          <Text style={styles.sectionTitle}>{isTelugu ? 'పత్రాల అప్‌లోడ్‌లు' : 'Document Uploads'}</Text>

          <View style={styles.formGroup}>
             <Text style={styles.label}>{isTelugu ? 'ఆధార్ కార్డ్' : 'Aadhar Card'}</Text>
             <TouchableOpacity style={styles.uploadBox} onPress={() => pickDocument(setAadhar)}>
               <MaterialCommunityIcons name={aadhar ? "check-circle" : "cloud-upload-outline"} size={24} color={aadhar ? "#10B981" : "#94A3B8"} />
               <Text style={styles.uploadText}>{aadhar ? (isTelugu ? 'ఆధార్ అప్‌లోడ్ చేయబడింది' : 'Aadhar Card Uploaded') : (isTelugu ? 'ఆధార్‌ను అప్‌లోడ్ చేయడానికి నొక్కండి' : 'Tap to upload Aadhar')}</Text>
             </TouchableOpacity>
             {aadhar ? <Image source={{uri: aadhar}} style={styles.previewImage} /> : null}
          </View>

          <View style={styles.formGroup}>
             <Text style={styles.label}>{isTelugu ? 'బదిలీ సర్టిఫికేట్ (TC)' : 'Transfer Certificate (TC)'}</Text>
             <TouchableOpacity style={styles.uploadBox} onPress={() => pickDocument(setTc)}>
               <MaterialCommunityIcons name={tc ? "check-circle" : "cloud-upload-outline"} size={24} color={tc ? "#10B981" : "#94A3B8"} />
               <Text style={styles.uploadText}>{tc ? (isTelugu ? 'TC అప్‌లోడ్ చేయబడింది' : 'TC Uploaded') : (isTelugu ? 'TCని అప్‌లోడ్ చేయడానికి నొక్కండి' : 'Tap to upload TC')}</Text>
             </TouchableOpacity>
             {tc ? <Image source={{uri: tc}} style={styles.previewImage} /> : null}
          </View>

          <View style={styles.formGroup}>
             <Text style={styles.label}>{isTelugu ? 'స్టడీ సర్టిఫికేట్' : 'Study Certificate'}</Text>
             <TouchableOpacity style={styles.uploadBox} onPress={() => pickDocument(setStudyCert)}>
               <MaterialCommunityIcons name={studyCert ? "check-circle" : "cloud-upload-outline"} size={24} color={studyCert ? "#10B981" : "#94A3B8"} />
               <Text style={styles.uploadText}>{studyCert ? (isTelugu ? 'స్టడీ సర్టిఫికేట్ అప్‌లోడ్ చేయబడింది' : 'Study Certificate Uploaded') : (isTelugu ? 'స్టడీ సర్టిఫికేట్‌ని అప్‌లోడ్ చేయడానికి నొక్కండి' : 'Tap to upload Study Certificate')}</Text>
             </TouchableOpacity>
             {studyCert ? <Image source={{uri: studyCert}} style={styles.previewImage} /> : null}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Floating Save Button */}
        <View style={styles.fabContainer}>
           <TouchableOpacity 
             style={styles.fabButton}
             onPress={handleSave}
           >
              <Text style={styles.fabText}>{isTelugu ? 'విద్యార్థిని సేవ్ చేయండి' : 'Save Student'}</Text>
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

        <Modal visible={showClassModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
             <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowClassModal(false)} activeOpacity={1} />
             <View style={styles.centerModalContent}>
                <Text style={styles.modalTitle}>{isTelugu ? 'తరగతిని ఎంచుకోండి' : 'Select Class'}</Text>
                <FlatList 
                  data={classes}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.settingsOption} onPress={() => { setClassName(item); setShowClassModal(false); }}>
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

  feeInfoCard: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },
  feeInfoTitle: { fontSize: 16, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 12 },
  feeInfoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  feeBox: { flex: 1 },
  feeLabel: { fontSize: 11, color: '#94A3B8', marginBottom: 4 },
  feeValue: { fontSize: 14, fontWeight: 'bold', color: '#F8FAFC' },

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
