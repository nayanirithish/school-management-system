import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { LinearGradient } from 'expo-linear-gradient';
import GlassBackground from '../components/GlassBackground';
import GlassCard from '../components/GlassCard';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '../context/ThemeContext';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Validation Logic
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = isValidEmail && password.length > 0;

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top Bar for Theme/Language Toggle */}
        <View style={styles.topBar}>
           <ThemeToggle />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}
        >
          <View style={styles.content}>
            <GlassCard style={styles.glassCardWrapper} intensity={isDark ? 40 : 80}>
              {/* Header */}
              <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#111827' }]}>Login</Text>

              {/* Form */}
              <View style={styles.formContainer}>
                {/* Email Input */}
                <View
                  style={[
                    styles.inputContainer,
                    { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255, 255, 255, 0.7)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255, 255, 255, 0.8)' },
                    isEmailFocused && (isDark ? styles.inputContainerFocusedDark : styles.inputContainerFocusedLight),
                    (!isValidEmail && email.length > 0) && styles.inputContainerError,
                  ]}
                >
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={22}
                    color={isEmailFocused ? (isDark ? '#38bdf8' : '#5B4BCA') : '#9CA3AF'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: isDark ? '#FFFFFF' : '#1F2937' }]}
                    placeholder="Email Address"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                  />
                </View>

                {/* Password Input */}
                <View
                  style={[
                    styles.inputContainer,
                    { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255, 255, 255, 0.7)', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255, 255, 255, 0.8)' },
                    isPasswordFocused && (isDark ? styles.inputContainerFocusedDark : styles.inputContainerFocusedLight),
                  ]}
                >
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={22}
                    color={isPasswordFocused ? (isDark ? '#38bdf8' : '#5B4BCA') : '#9CA3AF'}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: isDark ? '#FFFFFF' : '#1F2937' }]}
                    placeholder="Password"
                    placeholderTextColor="#9CA3AF"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeIcon}
                  >
                    <MaterialCommunityIcons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={22}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>

                {/* Forgot Password */}
                <TouchableOpacity style={styles.forgotPasswordContainer}>
                  <Text style={[styles.forgotPasswordText, { color: isDark ? '#38bdf8' : '#5B4BCA' }]}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity 
                  style={styles.loginButtonWrapper} 
                  activeOpacity={0.8}
                  disabled={!isFormValid}
                  onPress={() => {
                    if (email === 'admin@temp.com' && password === 'password123') {
                      navigation.navigate('AdminHome');
                    } else if (email === 'student@temp.com' && password === 'password123') {
                      navigation.navigate('StudentHome');
                    } else if (email === 'faculty@temp.com' && password === 'password123') {
                      navigation.navigate('FacultyHome');
                    } else {
                      alert('Invalid credentials! Please use admin@temp.com, student@temp.com, or faculty@temp.com with password: password123');
                    }
                  }}
                >
                  <LinearGradient
                     colors={
                       !isFormValid 
                         ? (isDark ? ['#4b5563', '#374151'] : ['#A78BFA', '#8B5CF6']) 
                         : (isDark ? ['#38bdf8', '#0284c7'] : ['#4f46e5', '#3730a3'])
                     }
                     style={styles.loginButton}
                  >
                    <Text style={styles.loginButtonText}>Login</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={[styles.footerText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>New here? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={[styles.registerText, { color: isDark ? '#38bdf8' : '#5B4BCA' }]}>Register</Text>
                </TouchableOpacity>
              </View>
            </GlassCard>
          </View>
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
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  glassCardWrapper: {
    padding: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 40,
    letterSpacing: 0.5,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 12,
  },
  inputContainerFocusedLight: {
    borderColor: '#5B4BCA',
    backgroundColor: '#FFFFFF',
  },
  inputContainerFocusedDark: {
    borderColor: '#38bdf8',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  inputContainerError: {
    borderColor: '#EF4444',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    height: '100%',
  },
  eyeIcon: {
    padding: 8,
    marginRight: -8,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '600',
  },
  loginButtonWrapper: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  loginButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 14,
  },
  registerText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
