import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { LinearGradient } from 'expo-linear-gradient';
import GlassBackground from '../components/GlassBackground';
import GlassCard from '../components/GlassCard';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

type Role = 'Student' | 'Faculty' | 'Admin';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;
interface Props {
  navigation: RegisterScreenNavigationProp;
}

export default function RegisterScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  // Form State
  const [selectedRole, setSelectedRole] = useState<Role>('Student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Visibility State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Focus States for UI
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // Validation
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid =
    fullName.trim() !== '' &&
    isValidEmail &&
    mobileNumber.trim() !== '' &&
    password !== '' &&
    confirmPassword !== '' &&
    password === confirmPassword;

  const handleRegister = () => {
    if (isFormValid) {
      if (selectedRole === 'Student') {
        navigation.replace('StudentHome');
      } else if (selectedRole === 'Faculty') {
        navigation.replace('FacultyHome');
      } else if (selectedRole === 'Admin') {
        navigation.replace('AdminHome');
      }
    }
  };

  const roles: { id: Role; title: string; subtitle: string; icon: any; color: string; colorDark: string }[] = [
    { id: 'Student', title: 'Student', subtitle: 'Learn & Grow', icon: 'school-outline', color: '#E0E7FF', colorDark: 'rgba(56,189,248,0.2)' },
    { id: 'Faculty', title: 'Faculty', subtitle: 'Teach & Inspire', icon: 'account-tie-outline', color: '#DCFCE7', colorDark: 'rgba(74,222,128,0.2)' },
    { id: 'Admin', title: 'Admin', subtitle: 'Manage & Monitor', icon: 'shield-account-outline', color: '#FFEDD5', colorDark: 'rgba(251,146,60,0.2)' },
  ];

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top Bar for Theme/Language Toggle */}
        <View style={styles.topBar}>
           <ThemeToggle />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <GlassCard style={styles.glassCardWrapper} intensity={isDark ? 40 : 80}>
              {/* Header */}
              <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#111827' }]}>Register</Text>
              <Text style={[styles.subtitle, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>Select Your Role</Text>

              {/* Role Selection */}
              <View style={styles.rolesContainer}>
                {roles.map((role) => {
                  const isSelected = selectedRole === role.id;
                  return (
                    <TouchableOpacity
                      key={role.id}
                      style={[
                        styles.roleCard, 
                        { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255, 255, 255, 0.7)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255, 255, 255, 0.8)' },
                        isSelected && (isDark ? styles.roleCardSelectedDark : styles.roleCardSelectedLight)
                      ]}
                      onPress={() => setSelectedRole(role.id)}
                      activeOpacity={0.7}
                    >
                      <View style={[styles.roleIconContainer, { backgroundColor: isDark ? role.colorDark : role.color }]}>
                        <MaterialCommunityIcons name={role.icon} size={24} color={isSelected ? (isDark ? '#38bdf8' : '#5B4BCA') : '#6B7280'} />
                      </View>
                      <View style={styles.roleTextContainer}>
                        <Text style={[styles.roleTitle, { color: isDark ? '#FFFFFF' : '#1F2937' }]}>{role.title}</Text>
                        <Text style={[styles.roleSubtitle, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>{role.subtitle}</Text>
                      </View>
                      <View style={[styles.radioCircle, isSelected && (isDark ? styles.radioCircleSelectedDark : styles.radioCircleSelectedLight)]}>
                        {isSelected && <View style={[styles.radioDot, isDark && styles.radioDotDark]} />}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Form Fields */}
              <View style={styles.formContainer}>
                {/* Full Name */}
                <View style={[styles.inputContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)' }, focusedInput === 'name' && (isDark ? styles.inputContainerFocusedDark : styles.inputContainerFocusedLight)]}>
                  <MaterialCommunityIcons name="account-outline" size={22} color={focusedInput === 'name' ? (isDark ? '#38bdf8' : '#5B4BCA') : '#9CA3AF'} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: isDark ? '#FFFFFF' : '#1F2937' }]}
                    placeholder="Full Name"
                    placeholderTextColor="#9CA3AF"
                    value={fullName}
                    onChangeText={setFullName}
                    onFocus={() => setFocusedInput('name')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>

                {/* Email */}
                <View style={[styles.inputContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)' }, focusedInput === 'email' && (isDark ? styles.inputContainerFocusedDark : styles.inputContainerFocusedLight), (!isValidEmail && email.length > 0) && styles.inputContainerError]}>
                  <MaterialCommunityIcons name="email-outline" size={22} color={focusedInput === 'email' ? (isDark ? '#38bdf8' : '#5B4BCA') : '#9CA3AF'} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: isDark ? '#FFFFFF' : '#1F2937' }]}
                    placeholder="Email Address"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>

                {/* Mobile Number */}
                <View style={[styles.inputContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)' }, focusedInput === 'mobile' && (isDark ? styles.inputContainerFocusedDark : styles.inputContainerFocusedLight)]}>
                  <MaterialCommunityIcons name="phone-outline" size={22} color={focusedInput === 'mobile' ? (isDark ? '#38bdf8' : '#5B4BCA') : '#9CA3AF'} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: isDark ? '#FFFFFF' : '#1F2937' }]}
                    placeholder="Mobile Number"
                    placeholderTextColor="#9CA3AF"
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                    keyboardType="phone-pad"
                    onFocus={() => setFocusedInput('mobile')}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>

                {/* Password */}
                <View style={[styles.inputContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)' }, focusedInput === 'password' && (isDark ? styles.inputContainerFocusedDark : styles.inputContainerFocusedLight)]}>
                  <MaterialCommunityIcons name="lock-outline" size={22} color={focusedInput === 'password' ? (isDark ? '#38bdf8' : '#5B4BCA') : '#9CA3AF'} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: isDark ? '#FFFFFF' : '#1F2937' }]}
                    placeholder="Password"
                    placeholderTextColor="#9CA3AF"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <MaterialCommunityIcons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={22} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>

                {/* Confirm Password */}
                <View style={[styles.inputContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)' }, focusedInput === 'confirm' && (isDark ? styles.inputContainerFocusedDark : styles.inputContainerFocusedLight), (password !== confirmPassword && confirmPassword.length > 0) && styles.inputContainerError]}>
                  <MaterialCommunityIcons name="lock-check-outline" size={22} color={focusedInput === 'confirm' ? (isDark ? '#38bdf8' : '#5B4BCA') : '#9CA3AF'} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: isDark ? '#FFFFFF' : '#1F2937' }]}
                    placeholder="Confirm Password"
                    placeholderTextColor="#9CA3AF"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    onFocus={() => setFocusedInput('confirm')}
                    onBlur={() => setFocusedInput(null)}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                    <MaterialCommunityIcons name={showConfirmPassword ? 'eye-outline' : 'eye-off-outline'} size={22} color="#9CA3AF" />
                  </TouchableOpacity>
                </View>

                {/* Register Button */}
                <TouchableOpacity
                  style={styles.registerButtonWrapper}
                  activeOpacity={0.8}
                  onPress={handleRegister}
                  disabled={!isFormValid}
                >
                  <LinearGradient
                     colors={
                       !isFormValid 
                         ? (isDark ? ['#4b5563', '#374151'] : ['#A78BFA', '#8B5CF6']) 
                         : (isDark ? ['#38bdf8', '#0284c7'] : ['#4f46e5', '#3730a3'])
                     }
                     style={styles.registerButton}
                  >
                     <Text style={styles.registerButtonText}>Register</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={[styles.footerText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={[styles.loginText, { color: isDark ? '#38bdf8' : '#5B4BCA' }]}>Login</Text>
                </TouchableOpacity>
              </View>
            </GlassCard>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  topBar: {
    paddingHorizontal: 24,
    paddingTop: 16,
    alignItems: 'flex-end',
    width: '100%',
    zIndex: 10,
  },
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingVertical: 20, flexGrow: 1 },
  glassCardWrapper: {
    padding: 24,
  },
  title: { fontSize: 32, fontWeight: '800', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 24 },
  
  rolesContainer: { marginBottom: 24 },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
  },
  roleCardSelectedLight: { borderColor: '#5B4BCA', backgroundColor: '#FFFFFF' },
  roleCardSelectedDark: { borderColor: '#38bdf8', backgroundColor: 'rgba(255,255,255,0.1)' },
  roleIconContainer: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  roleTextContainer: { flex: 1 },
  roleTitle: { fontSize: 14, fontWeight: '700' },
  roleSubtitle: { fontSize: 12, marginTop: 2 },
  radioCircle: { height: 24, width: 24, borderRadius: 12, borderWidth: 2, borderColor: '#D1D5DB', alignItems: 'center', justifyContent: 'center' },
  radioCircleSelectedLight: { borderColor: '#5B4BCA' },
  radioCircleSelectedDark: { borderColor: '#38bdf8' },
  radioDot: { height: 12, width: 12, borderRadius: 6, backgroundColor: '#5B4BCA' },
  radioDotDark: { backgroundColor: '#38bdf8' },

  formContainer: { width: '100%' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 12,
  },
  inputContainerFocusedLight: { borderColor: '#5B4BCA', backgroundColor: '#FFFFFF' },
  inputContainerFocusedDark: { borderColor: '#38bdf8', backgroundColor: 'rgba(255,255,255,0.1)' },
  inputContainerError: { borderColor: '#EF4444' },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 14, height: '100%' },
  eyeIcon: { padding: 8, marginRight: -8 },

  registerButtonWrapper: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  registerButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', letterSpacing: 0.5 },

  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 32 },
  footerText: { fontSize: 14 },
  loginText: { fontSize: 14, fontWeight: 'bold' },
});
