import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  styleOverride?: ViewStyle | ViewStyle[];
  intensity?: number;
}

export default function GlassCard({ children, style, styleOverride, intensity }: Props) {
  const { isDark } = useTheme();

  return (
    <BlurView 
      intensity={intensity ?? (isDark ? 30 : 60)} 
      tint={isDark ? 'dark' : 'light'} 
      style={[
        styles.card, 
        { borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.8)' }, 
        style,
        styleOverride
      ]}
    >
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    // Shadows
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  }
});
