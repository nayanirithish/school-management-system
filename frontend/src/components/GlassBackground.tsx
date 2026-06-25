import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function GlassBackground({ children, style }: Props) {
  const { isDark } = useTheme();

  const colors = isDark 
    ? ['#0f172a', '#1e293b', '#0f172a']
    : ['#F5F3FF', '#E0E7FF', '#FAFAFA'];

  return (
    <LinearGradient colors={colors} style={[styles.background, style]}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
