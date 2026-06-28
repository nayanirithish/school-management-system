import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type ProfileNavigationProp = NativeStackNavigationProp<RootStackParamList, 'StudentProfile'>;
interface Props {
  navigation: ProfileNavigationProp;
}

export default function ProfileScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const menuItems = [
    { id: 1, title: isTelugu ? 'వ్యక్తిగత సమాచారం' : 'Personal Information', icon: 'account-outline' },
    { id: 2, title: isTelugu ? 'సంప్రదింపు సమాచారం' : 'Contact Information', icon: 'phone-outline' },
    { id: 3, title: isTelugu ? 'తల్లిదండ్రుల / సంరక్షకుల వివరాలు' : 'Parent / Guardian Details', icon: 'account-group-outline' },
    { id: 4, title: isTelugu ? 'పాస్‌వర్డ్ మార్చండి' : 'Change Password', icon: 'lock-outline' },
  ];

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 1:
        return (
          <View style={styles.modalBody}>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Date of Birth:</Text><Text style={styles.detailValue}>14 Aug 2010</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Gender:</Text><Text style={styles.detailValue}>Male</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Blood Group:</Text><Text style={styles.detailValue}>O+</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Admission No:</Text><Text style={styles.detailValue}>RYL-2023-445</Text></View>
          </View>
        );
      case 2:
        return (
          <View style={styles.modalBody}>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Mobile No:</Text><Text style={styles.detailValue}>+91 98765 43210</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Email:</Text><Text style={styles.detailValue}>rahul.kumar@email.com</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Address:</Text><Text style={styles.detailValue}>123, Jubilee Hills, Hyderabad, TS, 500033</Text></View>
          </View>
        );
      case 3:
        return (
          <View style={styles.modalBody}>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Father's Name:</Text><Text style={styles.detailValue}>Rajesh Kumar</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Mother's Name:</Text><Text style={styles.detailValue}>Sneha Kumar</Text></View>
            <View style={styles.detailRow}><Text style={styles.detailLabel}>Emergency Contact:</Text><Text style={styles.detailValue}>+91 99887 76655</Text></View>
          </View>
        );
      case 4:
        return (
          <View style={styles.modalBody}>
            <TextInput style={styles.inputField} placeholder="Current Password" secureTextEntry placeholderTextColor="#9CA3AF" />
            <TextInput style={styles.inputField} placeholder="New Password" secureTextEntry placeholderTextColor="#9CA3AF" />
            <TextInput style={styles.inputField} placeholder="Confirm New Password" secureTextEntry placeholderTextColor="#9CA3AF" />
            <TouchableOpacity style={styles.saveButton} onPress={() => setActiveModal(null)}>
              <Text style={styles.saveButtonText}>Update Password</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
             <MaterialCommunityIcons name="menu" size={28} color="#E0E7FF" />
          </TouchableOpacity>
          <Text style={styles.brandTitle}>ORYOL</Text>
          <View style={styles.appBarRight}>
            <TouchableOpacity 
              style={styles.languageToggle} 
              onPress={() => setIsTelugu(!isTelugu)}
              activeOpacity={0.8}
            >
              <View style={[styles.languagePill, !isTelugu ? styles.languageActive : styles.languageInactive]}>
                 <Text style={[styles.languageText, !isTelugu && styles.languageTextActive]}>EN</Text>
              </View>
              <View style={[styles.languagePill, isTelugu ? styles.languageActive : styles.languageInactive]}>
                 <Text style={[styles.languageText, isTelugu && styles.languageTextActive]}>TE</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => navigation.navigate('StudentSettings')}>
              <MaterialCommunityIcons name="cog-outline" size={24} color="#A78BFA" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sub Header */}
        <View style={styles.subHeader}>
           <Text style={styles.pageTitle}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Profile Picture & Info */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
               <Image 
                 source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
                 style={styles.avatarImage} 
               />
            </View>
            <Text style={styles.studentName}>Rahul Kumar</Text>
            <Text style={styles.studentDetails}>Class 10 - A | Roll No: 25</Text>
          </View>

          {/* Menu Items List */}
          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <BlurView intensity={20} tint="dark" style={styles.menuItemCard} key={item.id}>
                <TouchableOpacity style={styles.menuItemTouch} activeOpacity={0.7} onPress={() => setActiveModal(item.id)}>
                  <MaterialCommunityIcons name={item.icon as any} size={24} color="#C4B5FD" style={styles.menuIcon} />
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <MaterialCommunityIcons name="chevron-right" size={24} color="#64748B" />
                </TouchableOpacity>
              </BlurView>
            ))}

            {/* Logout Button */}
            <BlurView intensity={20} tint="dark" style={styles.menuItemCard}>
              <TouchableOpacity style={styles.menuItemTouch} activeOpacity={0.7} onPress={handleLogout}>
                <MaterialCommunityIcons name="logout" size={24} color="#F87171" style={styles.menuIcon} />
                <Text style={[styles.menuTitle, { color: '#F87171' }]}>{isTelugu ? 'లాగౌట్ చేయండి' : 'Logout'}</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#64748B" />
              </TouchableOpacity>
            </BlurView>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar (Fixed) */}
        <BlurView intensity={40} tint="dark" style={[styles.bottomTabBar, { borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)' }]}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'హోమ్' : 'Home'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FeeSection')}>
            <MaterialCommunityIcons name="credit-card-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'ఫీజు చెల్లింపు' : 'Fee Payment'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'నోటిఫికేషన్' : 'Notification'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <MaterialCommunityIcons name="account" size={28} color="#C4B5FD" style={{ textShadowColor: '#6D28D9', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 }} />
            <Text style={[styles.tabLabel, { color: '#6D28D9', textShadowColor: '#6D28D9', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 }]}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
          </TouchableOpacity>
        </BlurView>

        {/* Dynamic Modal for Profile Sections (In-layout) */}
        {activeModal !== null && (
          <View style={[StyleSheet.absoluteFill, { zIndex: 9999, elevation: 9999 }]}>
             <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setActiveModal(null)} activeOpacity={1}>
                <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
             </TouchableOpacity>
             
             <View style={styles.modalOverlay} pointerEvents="box-none">
                <View style={styles.modalContent}>
                   <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>
                        {activeModal ? menuItems.find(i => i.id === activeModal)?.title : ''}
                      </Text>
                      <TouchableOpacity onPress={() => setActiveModal(null)}>
                         <MaterialCommunityIcons name="close-circle-outline" size={28} color="#64748B" />
                      </TouchableOpacity>
                   </View>
                   {renderModalContent()}
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  brandTitle: { fontSize: 20, fontWeight: '800', color: '#6D28D9', letterSpacing: 1 },
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 16,
    padding: 2,
    alignItems: 'center',
  },
  languagePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  languageActive: { backgroundColor: '#8B5CF6' },
  languageInactive: { backgroundColor: 'transparent' },
  languageText: { fontSize: 11, fontWeight: 'bold', color: '#94A3B8' },
  languageTextActive: { color: '#F8FAFC' },

  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    marginBottom: 24,
  },
  pageTitle: { fontSize: 18, fontWeight: 'bold', color: '#F1F5F9' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },

  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderWidth: 2,
    borderColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  studentName: { fontSize: 20, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 4 },
  studentDetails: { fontSize: 14, color: '#94A3B8' },

  menuContainer: {
    marginBottom: 24,
  },
  menuItemCard: {
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    borderColor: '#8B5CF6',
    overflow: 'hidden',
  },
  menuItemTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#F1F5F9',
  },

  bottomTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.5)',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 4, fontWeight: '500' },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  modalContent: {
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 300,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 20,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#8B5CF6',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F1F5F9',
  },
  modalBody: {
    paddingBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  detailLabel: {
    fontSize: 15,
    color: '#94A3B8',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 15,
    color: '#F1F5F9',
    fontWeight: '600',
    maxWidth: '60%',
    textAlign: 'right',
  },
  inputField: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#F1F5F9',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderWidth: 1,
    borderColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#F1F5F9',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
