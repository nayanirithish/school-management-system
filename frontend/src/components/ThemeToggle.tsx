import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const [isEnglish, setIsEnglish] = useState(true);

  return (
    <View style={styles.container}>
      {/* Language Toggle */}
      <TouchableOpacity 
        style={[styles.toggleContainer, { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }]} 
        onPress={() => setIsEnglish(!isEnglish)}
        activeOpacity={0.8}
      >
        <View style={[styles.pill, isEnglish ? (isDark ? styles.pillActiveDark : styles.pillActiveLight) : styles.pillInactive]}>
           <Text style={[styles.text, isEnglish ? (isDark ? styles.textActiveDark : styles.textActiveLight) : (isDark ? styles.textInactiveDark : styles.textInactiveLight)]}>EN</Text>
        </View>
        <View style={[styles.pill, !isEnglish ? (isDark ? styles.pillActiveDark : styles.pillActiveLight) : styles.pillInactive]}>
           <Text style={[styles.text, !isEnglish ? (isDark ? styles.textActiveDark : styles.textActiveLight) : (isDark ? styles.textInactiveDark : styles.textInactiveLight)]}>TE</Text>
        </View>
      </TouchableOpacity>

      {/* Theme Toggle */}
      <TouchableOpacity 
        style={[styles.themeToggle, { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)', backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]} 
        onPress={toggleTheme}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons 
          name={isDark ? 'weather-night' : 'white-balance-sunny'} 
          size={18} 
          color={isDark ? '#FDE047' : '#F59E0B'} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 2,
    borderWidth: 1,
  },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  pillActiveDark: { backgroundColor: 'rgba(255,255,255,0.2)' },
  pillActiveLight: { backgroundColor: '#FFFFFF', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  pillInactive: { backgroundColor: 'transparent' },
  text: { fontSize: 10, fontWeight: '700' },
  textActiveDark: { color: '#FFFFFF' },
  textActiveLight: { color: '#111827' },
  textInactiveDark: { color: '#9CA3AF' },
  textInactiveLight: { color: '#6B7280' },

  themeToggle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  }
});
