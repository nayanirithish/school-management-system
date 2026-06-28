import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Image
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type AdminAddUpdateStudentNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminAddUpdateStudent'>;
interface Props {
  navigation: AdminAddUpdateStudentNavigationProp;
}

export default function AdminAddUpdateStudentScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();

  // Form states to make fields interactive
  const [name, setName] = useState('Rahul Kumar');
  const [className, setClassName] = useState('10 - A');
  const [roll, setRoll] = useState('25');
  const [dob, setDob] = useState('12 May 2009');
  const [gender, setGender] = useState('Male');
  const [contact, setContact] = useState('9876543210');
  const [address, setAddress] = useState('Hyderabad, Telangana');

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
        
        <Text style={styles.pageTitle}>Add / Update Student</Text>

        {/* Avatar Upload */}
        <View style={styles.avatarSection}>
           <View style={styles.avatarWrapper}>
             <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatarImage} />
             <TouchableOpacity style={styles.cameraButton}>
                <MaterialCommunityIcons name="camera" size={16} color="#FFFFFF" />
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

        <View style={styles.row}>
           <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
             <Text style={styles.label}>Class</Text>
             <TouchableOpacity style={styles.dropdown}>
               <Text style={styles.inputText}>{className}</Text>
               <MaterialCommunityIcons name="chevron-down" size={20} color="#111827" />
             </TouchableOpacity>
           </View>
           <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
             <Text style={styles.label}>Roll No.</Text>
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
             <Text style={styles.label}>Date of Birth</Text>
             <View style={styles.inputWithIcon}>
               <TextInput 
                 style={[styles.input, { flex: 1, borderWidth: 0, marginBottom: 0 }]} 
                 value={dob} 
                 onChangeText={setDob} 
               />
               <MaterialCommunityIcons name="calendar-blank-outline" size={20} color="#111827" style={styles.inputIcon} />
             </View>
           </View>
           <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
             <Text style={styles.label}>Gender</Text>
             <TouchableOpacity style={styles.dropdown}>
               <Text style={styles.inputText}>{gender}</Text>
               <MaterialCommunityIcons name="chevron-down" size={20} color="#111827" />
             </TouchableOpacity>
           </View>
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
           <Text style={styles.label}>Address</Text>
           <TextInput 
             style={styles.input} 
             value={address} 
             onChangeText={setAddress} 
           />
        </View>

        {/* Fee Information Box */}
        <View style={styles.feeInfoCard}>
           <Text style={styles.feeInfoTitle}>Fee Information</Text>
           <View style={styles.feeInfoRow}>
              <View style={styles.feeBox}>
                 <Text style={styles.feeLabel}>Total Annual Fees</Text>
                 <Text style={[styles.feeValue, { color: '#111827' }]}>₹ 25,000</Text>
              </View>
              <View style={styles.feeBox}>
                 <Text style={styles.feeLabel}>Paid Amount</Text>
                 <Text style={[styles.feeValue, { color: '#10B981' }]}>₹ 15,000</Text>
              </View>
              <View style={styles.feeBox}>
                 <Text style={styles.feeLabel}>Due Amount</Text>
                 <Text style={[styles.feeValue, { color: '#EF4444' }]}>₹ 10,000</Text>
              </View>
           </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Save Button */}
      <View style={styles.fabContainer}>
         <TouchableOpacity 
           style={styles.fabButton}
           onPress={() => navigation.goBack()}
         >
            <Text style={styles.fabText}>Update Student</Text>
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

  feeInfoCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  feeInfoTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
  feeInfoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  feeBox: { flex: 1 },
  feeLabel: { fontSize: 11, color: '#6B7280', marginBottom: 4 },
  feeValue: { fontSize: 14, fontWeight: 'bold' },

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
});
