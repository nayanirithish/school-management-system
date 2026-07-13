import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import GlassBackground from '../components/GlassBackground';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;
interface Props {
  navigation: SplashScreenNavigationProp;
}

export default function SplashScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  
  // Animation Values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const buttonFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, damping: 10, mass: 1, stiffness: 90, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 1000, useNativeDriver: true }),
      Animated.timing(buttonFadeAnim, { toValue: 1, duration: 800, delay: 1000, useNativeDriver: true })
    ]).start();
  }, [navigation]);

  return (
    <GlassBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Animated.Image 
            source={require('../../assets/school.png')} 
            style={[styles.logo, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
            resizeMode="contain"
          />
        </View>

        <View style={styles.bottomContainer}>
          <Animated.View style={[styles.footer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <Text style={[styles.poweredByText, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>powered by</Text>
            <Image 
              source={require('../../assets/logo.png')} 
              style={[styles.oryolLogo, isDark && { tintColor: '#FFFFFF' }]} 
              resizeMode="contain" 
            />
          </Animated.View>

          <Animated.View style={{ opacity: buttonFadeAnim, width: '100%', alignItems: 'center', marginTop: 32 }}>
            <TouchableOpacity 
              style={styles.getStartedButtonWrapper}
              onPress={() => navigation.replace('Login')}
              activeOpacity={0.8}
            >
              <LinearGradient 
                colors={isDark ? ['#38bdf8', '#0284c7'] : ['#4f46e5', '#3730a3']} 
                style={styles.getStartedButton}
              >
                <Text style={styles.getStartedText}>Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '80%',
    height: 200,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
    width: '100%',
  },
  getStartedButtonWrapper: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8,
  },
  getStartedButton: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  footer: {
    alignItems: 'center',
  },
  poweredByText: {
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  oryolLogo: {
    width: 100,
    height: 30,
  },
});
