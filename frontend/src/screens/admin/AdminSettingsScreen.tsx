import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

type AdminSettingsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AdminSettings'>;
interface Props {
  navigation: AdminSettingsNavigationProp;
}

export default function AdminSettingsScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const renderSectionHeader = (title: string) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderMenuItem = (icon: string, title: string, value?: string, isLast = false) => (
    <TouchableOpacity style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]}>
       <View style={styles.menuIconContainer}>
         <MaterialCommunityIcons name={icon as any} size={22} color="#A78BFA" />
       </View>
       <Text style={styles.menuItemText}>{title}</Text>
       {value && <Text style={styles.menuItemValue}>{value}</Text>}
       <MaterialCommunityIcons name="chevron-right" size={24} color="#94A3B8" />
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
          
          <Text style={styles.pageTitle}>{isTelugu ? 'సెట్టింగ్‌లు' : 'Settings'}</Text>

          {renderSectionHeader(isTelugu ? 'సాధారణ' : 'GENERAL')}
          <BlurView intensity={20} tint="dark" style={styles.menuGroup}>
             {renderMenuItem('web', isTelugu ? 'భాష' : 'Language', isTelugu ? 'తెలుగు' : 'English')}
             {renderMenuItem('moon-waning-crescent', isTelugu ? 'డార్క్ మోడ్' : 'Dark Mode', isTelugu ? 'ఆఫ్' : 'Off')}
             {renderMenuItem('bell-outline', isTelugu ? 'పుష్ నోటిఫికేషన్లు' : 'Push Notifications', isTelugu ? 'ఆన్' : 'On')}
             {renderMenuItem('clock-outline', isTelugu ? 'సమయ ప్రాంతం' : 'Time Zone', 'IST (UTC+5:30)', true)}
          </BlurView>

          {renderSectionHeader(isTelugu ? 'పాఠశాల' : 'SCHOOL')}
          <BlurView intensity={20} tint="dark" style={styles.menuGroup}>
             {renderMenuItem('office-building-outline', isTelugu ? 'పాఠశాల పేరు' : 'School Name', 'ORYOL School')}
             {renderMenuItem('calendar-blank-outline', isTelugu ? 'విద్యా సంవత్సరం' : 'Academic Year', '2023-24')}
             {renderMenuItem('wallet-outline', isTelugu ? 'కరెన్సీ' : 'Currency', 'INR (₹)')}
             {renderMenuItem('account-group-outline', isTelugu ? 'డిఫాల్ట్ తరగతి' : 'Default Class', isTelugu ? 'తరగతి 1' : 'Class 1', true)}
          </BlurView>

          {renderSectionHeader(isTelugu ? 'భద్రత' : 'SECURITY')}
          <BlurView intensity={20} tint="dark" style={styles.menuGroup}>
             {renderMenuItem('lock-outline', isTelugu ? 'పాస్‌వర్డ్ మార్చండి' : 'Change Password')}
             {renderMenuItem('shield-outline', isTelugu ? 'టూ-ఫాక్టర్ ఆథ్' : 'Two-Factor Auth', isTelugu ? 'నిలిపివేయబడింది' : 'Disabled')}
             {renderMenuItem('cellphone', isTelugu ? 'విశ్వసనీయ పరికరాలు' : 'Trusted Devices', isTelugu ? '2 పరికరాలు' : '2 devices', true)}
          </BlurView>

          {renderSectionHeader(isTelugu ? 'డేటా & నిల్వ' : 'DATA & STORAGE')}
          <BlurView intensity={20} tint="dark" style={styles.menuGroup}>
             {renderMenuItem('database-outline', isTelugu ? 'బ్యాకప్ డేటా' : 'Backup Data', isTelugu ? 'చివరిగా: ఈరోజు' : 'Last: Today')}
             {renderMenuItem('download-outline', isTelugu ? 'నివేదికలను ఎగుమతి చేయండి' : 'Export Reports')}
             {renderMenuItem('delete-outline', isTelugu ? 'కాష్ క్లియర్ చేయండి' : 'Clear Cache', '12 MB', true)}
          </BlurView>

          {/* App Version */}
          <BlurView intensity={20} tint="dark" style={styles.versionCard}>
             <View>
                <Text style={styles.versionTitle}>{isTelugu ? 'యాప్ వెర్షన్' : 'App Version'}</Text>
                <Text style={styles.versionSubtitle}>v2.4.1 (Build 241)</Text>
             </View>
             <TouchableOpacity style={styles.updateButton}>
                <Text style={styles.updateButtonText}>{isTelugu ? 'అప్‌డేట్ తనిఖీ చేయండి' : 'Check Update'}</Text>
             </TouchableOpacity>
          </BlurView>

          <View style={{ height: 100 }} />
        </ScrollView>

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

  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 20 },

  sectionHeader: { fontSize: 12, fontWeight: 'bold', color: '#94A3B8', marginBottom: 8, marginLeft: 4, letterSpacing: 0.5 },
  menuGroup: {
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(91, 75, 202, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: { flex: 1, fontSize: 15, color: '#E2E8F0', fontWeight: '500' },
  menuItemValue: { fontSize: 13, color: '#94A3B8', marginRight: 8 },

  versionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  versionTitle: { fontSize: 15, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 4 },
  versionSubtitle: { fontSize: 12, color: '#64748B' },
  updateButton: { backgroundColor: 'rgba(91, 75, 202, 0.2)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16 },
  updateButtonText: { fontSize: 12, fontWeight: 'bold', color: '#A78BFA' },

  bottomTabBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)', position: 'absolute', bottom: 0, width: '100%' },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 10, color: '#94A3B8', marginTop: 4, fontWeight: '500', textAlign: 'center' },
});
