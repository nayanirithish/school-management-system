import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

type BusTrackerNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BusTracker'>;
interface Props {
  navigation: BusTrackerNavigationProp;
}

export default function BusTrackerScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();

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
            <TouchableOpacity style={{ marginLeft: 12 }}>
              <MaterialCommunityIcons name="cog-outline" size={24} color="#A78BFA" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sub Header */}
        <View style={styles.subHeader}>
           <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight: 16}}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#E0E7FF" />
           </TouchableOpacity>
           <Text style={styles.pageTitle}>{isTelugu ? 'బస్ ట్రాకర్' : 'Bus Tracker'}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Map Placeholder */}
          <View style={[styles.mapContainer, { borderColor: '#8B5CF6', shadowColor: '#8B5CF6', shadowOpacity: 0.8, shadowRadius: 10, elevation: 5 }]}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80' }} 
              style={[styles.mapImage, { opacity: 0.6 }]} 
            />
            {/* Fake Route Overlay for realism */}
            <View style={styles.mapOverlay}>
               <MaterialCommunityIcons name="map-marker" size={36} color="#EF4444" style={styles.markerEnd} />
               <View style={styles.busMarker}>
                 <MaterialCommunityIcons name="bus" size={16} color="#FFFFFF" />
               </View>
            </View>
          </View>

          {/* Bus Info Card */}
          <BlurView intensity={20} tint="dark" style={[styles.infoCard, { borderColor: '#3B82F6', shadowColor: '#3B82F6', shadowOpacity: 0.6, shadowRadius: 8, elevation: 5 }]}>
            <View style={styles.cardRow}>
              <MaterialCommunityIcons name="bus" size={24} color="#60A5FA" style={{ marginRight: 12 }} />
              <Text style={styles.cardTitle}>{isTelugu ? 'బస్సు నంబర్:' : 'Bus No:'} TS 09 AB 1234</Text>
            </View>
            <Text style={styles.arrivingText}>{isTelugu ? '5 నిమిషాల్లో చేరుకుంటుంది' : 'Arriving in 5 min'}</Text>
          </BlurView>

          {/* Stop Info Card */}
          <BlurView intensity={20} tint="dark" style={[styles.infoCard, { borderColor: '#10B981', shadowColor: '#10B981', shadowOpacity: 0.6, shadowRadius: 8, elevation: 5 }]}>
            <View style={styles.stopSection}>
               <Text style={styles.label}>{isTelugu ? 'మీ స్టాప్' : 'Your Stop'}</Text>
               <Text style={styles.value}>{isTelugu ? 'గ్రీన్ వ్యాలీ స్టాప్' : 'Green Valley Stop'}</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.stopSection}>
               <Text style={styles.label}>{isTelugu ? 'అంచనా వేసిన రాక సమయం' : 'Estimated Arrival'}</Text>
               <Text style={styles.value}>{isTelugu ? 'ఉదయం 8:20' : '8:20 AM'}</Text>
            </View>
          </BlurView>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Bottom Tab Bar (Fixed) */}
        <BlurView intensity={40} tint="dark" style={[styles.bottomTabBar, { borderTopColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.85)' }]}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentHome')}>
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
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentProfile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#94A3B8" />
            <Text style={[styles.tabLabel, { color: '#94A3B8' }]}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
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
    paddingVertical: 16,
  },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#F1F5F9' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 8 },

  mapContainer: {
    height: 250,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
    backgroundColor: '#1E293B',
    position: 'relative',
    borderWidth: 1,
  },
  mapImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  mapOverlay: {
    ...(StyleSheet.absoluteFill as any),
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerEnd: {
    position: 'absolute',
    top: 40,
    right: 80,
  },
  busMarker: {
    position: 'absolute',
    bottom: 80,
    left: 120,
    backgroundColor: '#3B82F6',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1E293B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  infoCard: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F1F5F9',
  },
  arrivingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34D399', // Green text for arriving status
  },

  stopSection: {
    marginVertical: 4,
  },
  label: {
    fontSize: 13,
    color: '#CBD5E1',
    marginBottom: 4,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F1F5F9',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginVertical: 12,
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
});
