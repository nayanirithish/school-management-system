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
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import GlassBackground from '../components/GlassBackground';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';

type AdminAddNoticeProp = NativeStackNavigationProp<RootStackParamList, 'AdminAddNotice'>;
interface Props {
  navigation: AdminAddNoticeProp;
}

export default function AdminAddNoticeScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  // Form states
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeType, setNoticeType] = useState('Select Type');
  const [audience, setAudience] = useState('Select Audience');
  const [noticeDescription, setNoticeDescription] = useState('');
  const [attachment, setAttachment] = useState('');
  const [publishDate, setPublishDate] = useState('22 May 2024');

  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showAudienceDropdown, setShowAudienceDropdown] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const typeList = ['General', 'Exam', 'Holiday', 'Event', 'Emergency'];
  const audienceList = ['All', 'Students', 'Faculty', 'Parents', 'Bus Drivers'];

  const handlePublishNotice = () => {
    // Save logic goes here
    setShowSuccessPopup(true);
  };

  const handleSuccessOk = () => {
    setShowSuccessPopup(false);
    navigation.goBack();
  };

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <GlassCard style={styles.appBar} intensity={isDark ? 40 : 80} styleOverride={{ borderRadius: 0, borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color={isDark ? "#FFFFFF" : "#111827"} />
          </TouchableOpacity>
          <Text style={[styles.brandTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Add Notice</Text>
          <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons name="cog-outline" size={24} color={isDark ? "#D1D5DB" : "#6B7280"} />
          </TouchableOpacity>
        </GlassCard>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Form Fields */}
          <View style={styles.inputGroup}>
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Notice Title</Text>
             <View style={styles.inputWrapper}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.inputGlass} styleOverride={{ borderRadius: 12 }}>
                   <TextInput 
                     style={[styles.textInput, { color: isDark ? '#FFFFFF' : '#111827' }]} 
                     placeholder="Enter notice title" 
                     placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
                     value={noticeTitle} 
                     onChangeText={setNoticeTitle} 
                   />
                </GlassCard>
             </View>
          </View>

          <View style={styles.inputGroup}>
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Notice Type</Text>
             <TouchableOpacity style={styles.dropdownButtonWrapper} onPress={() => setShowTypeDropdown(true)} activeOpacity={0.8}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.dropdownButton} styleOverride={{ borderRadius: 12 }}>
                   <Text style={[styles.dropdownText, { color: noticeType === 'Select Type' ? (isDark ? '#9CA3AF' : '#6B7280') : (isDark ? '#FFFFFF' : '#111827') }]}>{noticeType}</Text>
                   <MaterialCommunityIcons name="chevron-down" size={20} color={isDark ? "#D1D5DB" : "#6B7280"} />
                </GlassCard>
             </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Audience</Text>
             <TouchableOpacity style={styles.dropdownButtonWrapper} onPress={() => setShowAudienceDropdown(true)} activeOpacity={0.8}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.dropdownButton} styleOverride={{ borderRadius: 12 }}>
                   <Text style={[styles.dropdownText, { color: audience === 'Select Audience' ? (isDark ? '#9CA3AF' : '#6B7280') : (isDark ? '#FFFFFF' : '#111827') }]}>{audience}</Text>
                   <MaterialCommunityIcons name="chevron-down" size={20} color={isDark ? "#D1D5DB" : "#6B7280"} />
                </GlassCard>
             </TouchableOpacity>
          </View>
          
          <View style={styles.inputGroup}>
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Notice Description</Text>
             <View style={styles.inputWrapper}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.inputGlass} styleOverride={{ borderRadius: 12 }}>
                   <TextInput 
                     style={[styles.textArea, { color: isDark ? '#FFFFFF' : '#111827' }]} 
                     placeholder="Write notice description..." 
                     placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
                     multiline
                     textAlignVertical="top"
                     value={noticeDescription} 
                     onChangeText={setNoticeDescription} 
                   />
                </GlassCard>
             </View>
          </View>

          <View style={styles.inputGroup}>
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Attachment (Optional)</Text>
             <TouchableOpacity style={styles.inputWrapper} onPress={() => {}} activeOpacity={0.8}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.inputWithIcon} styleOverride={{ borderRadius: 12 }}>
                   <MaterialCommunityIcons name="paperclip" size={20} color={isDark ? "#D1D5DB" : "#6B7280"} style={{ marginRight: 8 }} />
                   <Text style={{ color: attachment ? (isDark ? '#FFFFFF' : '#111827') : (isDark ? '#9CA3AF' : '#6B7280'), fontSize: 15, flex: 1 }}>
                      {attachment || 'Choose File'}
                   </Text>
                </GlassCard>
             </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
             <Text style={[styles.inputLabel, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>Publish Date</Text>
             <View style={styles.inputWrapper}>
                <GlassCard intensity={isDark ? 20 : 60} style={styles.inputWithIcon} styleOverride={{ borderRadius: 12 }}>
                   <TextInput 
                     style={[styles.textInput, { flex: 1, paddingHorizontal: 0, paddingVertical: 0, color: isDark ? '#FFFFFF' : '#111827' }]} 
                     value={publishDate} 
                     onChangeText={setPublishDate}
                     placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
                   />
                   <MaterialCommunityIcons name="calendar" size={20} color={isDark ? "#D1D5DB" : "#6B7280"} />
                </GlassCard>
             </View>
          </View>
          
          <TouchableOpacity style={styles.submitButtonWrapper} onPress={handlePublishNotice}>
             <LinearGradient colors={isDark ? ['#38bdf8', '#0284c7'] : ['#4f46e5', '#3730a3']} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Publish Notice</Text>
             </LinearGradient>
          </TouchableOpacity>

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Bottom Tab Bar */}
        <GlassCard intensity={isDark ? 60 : 90} style={styles.bottomTabBar} styleOverride={{ borderRadius: 0, borderTopWidth: 1, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0 }}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminFeeManagement')}>
            <MaterialCommunityIcons name="receipt" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Fee Mgmt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color={isDark ? "#38bdf8" : "#4f46e5"} />
            <Text style={[styles.tabLabel, { color: isDark ? '#38bdf8' : '#4f46e5' }]}>Notices</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminProfile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Profile</Text>
          </TouchableOpacity>
        </GlassCard>

        {/* Dropdowns */}
        <Modal visible={showTypeDropdown} transparent animationType="fade">
           <View style={styles.centerModalOverlay}>
             <View style={styles.modalBackdrop} />
             <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowTypeDropdown(false)} activeOpacity={1} />
             <View style={styles.dropdownModalContentWrapper}>
                <GlassCard intensity={isDark ? 50 : 90} style={styles.dropdownModalContent} styleOverride={{ borderRadius: 20 }}>
                   <Text style={[styles.modalTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Select Notice Type</Text>
                   {typeList.map((type, index) => (
                     <TouchableOpacity 
                       key={index} 
                       style={styles.dropdownOption}
                       onPress={() => {
                         setNoticeType(type);
                         setShowTypeDropdown(false);
                       }}
                     >
                        <Text style={[styles.dropdownOptionText, { color: isDark ? '#E5E7EB' : '#374151' }]}>{type}</Text>
                     </TouchableOpacity>
                   ))}
                </GlassCard>
             </View>
           </View>
        </Modal>

        <Modal visible={showAudienceDropdown} transparent animationType="fade">
           <View style={styles.centerModalOverlay}>
             <View style={styles.modalBackdrop} />
             <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowAudienceDropdown(false)} activeOpacity={1} />
             <View style={styles.dropdownModalContentWrapper}>
                <GlassCard intensity={isDark ? 50 : 90} style={styles.dropdownModalContent} styleOverride={{ borderRadius: 20 }}>
                   <Text style={[styles.modalTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Select Audience</Text>
                   {audienceList.map((aud, index) => (
                     <TouchableOpacity 
                       key={index} 
                       style={styles.dropdownOption}
                       onPress={() => {
                         setAudience(aud);
                         setShowAudienceDropdown(false);
                       }}
                     >
                        <Text style={[styles.dropdownOptionText, { color: isDark ? '#E5E7EB' : '#374151' }]}>{aud}</Text>
                     </TouchableOpacity>
                   ))}
                </GlassCard>
             </View>
           </View>
        </Modal>

        {/* Success Popup */}
        <Modal visible={showSuccessPopup} transparent animationType="fade">
           <View style={styles.centerModalOverlay}>
             <View style={styles.modalBackdrop} />
             <View style={styles.successModalContentWrapper}>
                <GlassCard intensity={isDark ? 50 : 90} style={styles.successModalContent} styleOverride={{ borderRadius: 24 }}>
                   <View style={styles.successIconCircle}>
                      <MaterialCommunityIcons name="check" size={40} color="#10B981" />
                   </View>
                   <Text style={[styles.successTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Notice Published!</Text>
                   <Text style={[styles.successSubtitle, { color: isDark ? '#9CA3AF' : '#4B5563' }]}>The notice has been successfully sent to the selected audience.</Text>
                   <TouchableOpacity style={styles.successButtonWrapper} onPress={handleSuccessOk}>
                      <LinearGradient colors={['#10B981', '#059669']} style={styles.successButton}>
                         <Text style={styles.successButtonText}>OK</Text>
                      </LinearGradient>
                   </TouchableOpacity>
                </GlassCard>
             </View>
           </View>
        </Modal>

      </SafeAreaView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, width: '100%' },
  
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  brandTitle: { fontSize: 18, fontWeight: '700' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 24 },

  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    marginBottom: 8,
  },
  inputWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  inputGlass: {
    // Background handled by GlassCard
  },
  textInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
  },
  textArea: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    minHeight: 120,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownButtonWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownText: {
    fontSize: 15,
  },

  submitButtonWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 8,
  },
  submitButton: {
    paddingVertical: 16,
    alignItems: 'center',
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
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 5,
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 4, fontWeight: '500' },

  // Modals
  centerModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dropdownModalContentWrapper: {
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  dropdownModalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  dropdownOption: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(156,163,175,0.2)',
  },
  dropdownOptionText: {
    fontSize: 16,
    textAlign: 'center',
  },

  successModalContentWrapper: {
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  successModalContent: {
    padding: 32,
    alignItems: 'center',
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  successButtonWrapper: {
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden',
  },
  successButton: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  successButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
