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

type AdminClassesProp = NativeStackNavigationProp<RootStackParamList, 'AdminClasses'>;
interface Props {
  navigation: AdminClassesProp;
}

export default function AdminClassesScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  const [showAddClass, setShowAddClass] = useState(false);

  const classes = [
    { id: '1', name: 'Class 10', section: 'A', students: 45, classTeacher: 'Mr. Sharma' },
    { id: '2', name: 'Class 10', section: 'B', students: 42, classTeacher: 'Mrs. Gupta' },
    { id: '3', name: 'Class 9', section: 'A', students: 38, classTeacher: 'Mr. Verma' },
    { id: '4', name: 'Class 8', section: 'C', students: 40, classTeacher: 'Ms. Reddy' },
  ];

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <GlassCard style={styles.appBar} intensity={isDark ? 40 : 80} styleOverride={{ borderRadius: 0, borderBottomWidth: 1, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={28} color={isDark ? "#FFFFFF" : "#111827"} />
          </TouchableOpacity>
          <Text style={[styles.brandTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Classes</Text>
          <TouchableOpacity onPress={() => {}}>
            <MaterialCommunityIcons name="magnify" size={24} color={isDark ? "#FFFFFF" : "#111827"} />
          </TouchableOpacity>
        </GlassCard>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Manage Classes</Text>

          {/* Classes List */}
          {classes.map((cls) => (
            <GlassCard key={cls.id} intensity={isDark ? 20 : 80} style={styles.glassCard} styleOverride={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)', borderColor: isDark ? 'rgba(255,255,255,0.15)' : '#FFFFFF' }}>
              <View style={styles.classHeader}>
                 <View style={[styles.classIconContainer, { backgroundColor: isDark ? 'rgba(56, 189, 248, 0.15)' : '#E0F2FE' }]}>
                    <MaterialCommunityIcons name="google-classroom" size={24} color={isDark ? "#38bdf8" : "#0284C7"} />
                 </View>
                 <View style={{ flex: 1 }}>
                    <Text style={[styles.className, { color: isDark ? '#FFFFFF' : '#111827' }]}>{cls.name} - Sec {cls.section}</Text>
                    <Text style={[styles.classTeacher, { color: isDark ? '#94a3b8' : '#6B7280' }]}>Teacher: {cls.classTeacher}</Text>
                 </View>
                 <View style={[styles.studentBadge, { backgroundColor: isDark ? 'rgba(251, 191, 36, 0.15)' : '#FEF3C7' }]}>
                    <MaterialCommunityIcons name="account-group" size={16} color={isDark ? "#fbbf24" : "#D97706"} style={{marginRight: 4}} />
                    <Text style={[styles.studentCount, { color: isDark ? '#fbbf24' : '#D97706' }]}>{cls.students}</Text>
                 </View>
              </View>
            </GlassCard>
          ))}

          {/* Add Class Button */}
          <TouchableOpacity 
             activeOpacity={0.8}
             onPress={() => setShowAddClass(true)}
          >
             <GlassCard intensity={isDark ? 40 : 80} style={styles.addButtonGlass} styleOverride={{ backgroundColor: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(2, 132, 199, 0.1)', borderColor: isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(2, 132, 199, 0.3)' }}>
                <MaterialCommunityIcons name="plus" size={20} color={isDark ? "#38bdf8" : "#0284C7"} />
                <Text style={[styles.addButtonText, { color: isDark ? '#38bdf8' : '#0284C7' }]}>Add New Class</Text>
             </GlassCard>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Add Class Modal */}
        <Modal visible={showAddClass} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalBackdrop} />
            <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setShowAddClass(false)} activeOpacity={1} />
            <View style={styles.modalContentWrapper}>
               <GlassCard intensity={isDark ? 50 : 100} style={styles.modalContent} styleOverride={{ backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255,255,255,0.95)', borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)' }}>
                 <View style={styles.modalHeader}>
                    <Text style={[styles.modalTitle, { color: isDark ? '#FFFFFF' : '#111827' }]}>Add New Class</Text>
                    <TouchableOpacity onPress={() => setShowAddClass(false)}>
                       <MaterialCommunityIcons name="close" size={24} color={isDark ? "#FFFFFF" : "#111827"} />
                    </TouchableOpacity>
                 </View>

                 <Text style={[styles.inputLabel, { color: isDark ? '#94a3b8' : '#4B5563' }]}>Class Name</Text>
                 <View style={styles.inputWrapper}>
                    <GlassCard intensity={isDark ? 20 : 80} style={styles.inputGlass} styleOverride={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }}>
                       <TextInput style={[styles.inputField, { color: isDark ? '#FFFFFF' : '#111827' }]} placeholder="e.g. Class 11" placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"} />
                    </GlassCard>
                 </View>

                 <Text style={[styles.inputLabel, { color: isDark ? '#94a3b8' : '#4B5563' }]}>Section</Text>
                 <View style={styles.inputWrapper}>
                    <GlassCard intensity={isDark ? 20 : 80} style={styles.inputGlass} styleOverride={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }}>
                       <TextInput style={[styles.inputField, { color: isDark ? '#FFFFFF' : '#111827' }]} placeholder="e.g. A" placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"} />
                    </GlassCard>
                 </View>

                 <Text style={[styles.inputLabel, { color: isDark ? '#94a3b8' : '#4B5563' }]}>Class Teacher</Text>
                 <View style={styles.inputWrapper}>
                    <GlassCard intensity={isDark ? 20 : 80} style={styles.inputGlass} styleOverride={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#E5E7EB' }}>
                       <TextInput style={[styles.inputField, { color: isDark ? '#FFFFFF' : '#111827' }]} placeholder="Select Teacher" placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"} />
                    </GlassCard>
                 </View>

                 <TouchableOpacity 
                    style={styles.submitButtonWrapper}
                    onPress={() => setShowAddClass(false)}
                 >
                    <LinearGradient colors={isDark ? ['#38bdf8', '#0284c7'] : ['#0EA5E9', '#0369A1']} style={styles.submitButtonGradient}>
                       <Text style={styles.submitButtonText}>Save Class</Text>
                    </LinearGradient>
                 </TouchableOpacity>

               </GlassCard>
            </View>
          </View>
        </Modal>

        {/* Bottom Tab Bar */}
        <GlassCard intensity={isDark ? 60 : 90} style={styles.bottomTabBar} styleOverride={{ borderRadius: 0, borderTopWidth: 1, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)', backgroundColor: isDark ? 'transparent' : 'rgba(255,255,255,0.7)' }}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminFeeManagement')}>
            <MaterialCommunityIcons name="receipt" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Fee</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminNotices')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Notices</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('AdminProfile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#9CA3AF" />
            <Text style={styles.tabLabel}>Profile</Text>
          </TouchableOpacity>
        </GlassCard>

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
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },

  glassCard: {
    padding: 16,
    marginBottom: 16,
  },
  classHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  classIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  className: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  classTeacher: {
    fontSize: 13,
  },
  studentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  studentCount: {
    fontSize: 13,
    fontWeight: 'bold',
  },

  addButtonGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContentWrapper: {
    width: '100%',
    maxWidth: 380,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  modalContent: {
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  
  inputLabel: {
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputGlass: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  inputField: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
  },

  submitButtonWrapper: {
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  submitButtonGradient: {
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
});
