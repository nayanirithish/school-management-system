import React from 'react';
import { View, StyleSheet, Platform, useWindowDimensions } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function MobileAppWrapper({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme();
  const { width } = useWindowDimensions();
  const isWebLargeScreen = Platform.OS === 'web' && width > 480;

  if (isWebLargeScreen) {
    return (
      <View style={[styles.webOuterContainer, { backgroundColor: isDark ? '#000000' : '#E5E7EB' }]}>
        <View style={[styles.mobileFrame, { borderColor: isDark ? '#333' : '#D1D5DB' }]}>
          <View style={styles.appContainer}>
            {children}
          </View>
        </View>
      </View>
    );
  }

  // On mobile devices or narrow web windows, render normally
  return (
    <View style={styles.appContainer}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  webOuterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  mobileFrame: {
    width: 360, // Standard Android width
    height: '92%', // Leave some margin on top/bottom
    maxHeight: 850,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 12, // Simulate device bezel
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 20,
    backgroundColor: '#000', // Behind the app content
  },
  appContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  }
});
