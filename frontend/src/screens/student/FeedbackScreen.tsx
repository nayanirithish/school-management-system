import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useLanguage } from '../../context/LanguageContext';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type FeedbackNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Feedback'>;
interface Props {
  navigation: FeedbackNavigationProp;
}

export default function FeedbackScreen({ navigation }: Props) {
  const { isTelugu, setIsTelugu } = useLanguage();
  const [comments, setComments] = useState('');
  
  // Dropdown state
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Rating state (1 to 5)
  const [rating, setRating] = useState<number>(0);

  // Success Modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const categories = [
    { id: 'general', nameEN: 'General', nameTE: 'సాధారణ' },
    { id: 'teacher', nameEN: 'Teacher / Academics', nameTE: 'ఉపాధ్యాయుడు / విద్యావిషయక' },
    { id: 'facilities', nameEN: 'School Facilities', nameTE: 'పాఠశాల సౌకర్యాలు' },
    { id: 'transport', nameEN: 'Transport', nameTE: 'రవాణా' },
  ];

  const toggleCategory = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCategoryOpen(!isCategoryOpen);
  };

  const handleSelectCategory = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedCategory(id);
    setIsCategoryOpen(false);
  };

  const onSubmit = () => {
    if (selectedCategory && rating > 0 && comments) {
      setShowSuccessModal(true);
    } else {
      // Show success modal anyway for mockup purposes
      setShowSuccessModal(true);
    }
  };

  const onSuccessOk = () => {
    setShowSuccessModal(false);
    navigation.navigate('StudentHome');
  };

  const getCategoryName = () => {
    if (!selectedCategory) return isTelugu ? 'వర్గాన్ని ఎంచుకోండి' : 'Select Category';
    const cat = categories.find(c => c.id === selectedCategory);
    return isTelugu ? cat?.nameTE : cat?.nameEN;
  };

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
           <Text style={styles.pageTitle}>{isTelugu ? 'అభిప్రాయం' : 'Feedback'}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Category Dropdown */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{isTelugu ? 'అభిప్రాయ వర్గం' : 'Feedback Category'}</Text>
            <View style={styles.dropdownContainer}>
              <TouchableOpacity style={styles.inputBox} activeOpacity={0.7} onPress={toggleCategory}>
                <Text style={[styles.placeholderText, selectedCategory && styles.selectedText]}>
                  {getCategoryName()}
                </Text>
                <MaterialCommunityIcons name={isCategoryOpen ? "chevron-up" : "chevron-down"} size={24} color="#9CA3AF" />
              </TouchableOpacity>
              {isCategoryOpen && (
                <View style={styles.dropdownMenu}>
                  {categories.map((cat, index) => (
                    <TouchableOpacity 
                      key={cat.id} 
                      style={[styles.dropdownItem, index !== categories.length - 1 && styles.dropdownItemBorder]}
                      onPress={() => handleSelectCategory(cat.id)}
                    >
                      <Text style={styles.dropdownItemText}>{isTelugu ? cat.nameTE : cat.nameEN}</Text>
                      {selectedCategory === cat.id && (
                         <MaterialCommunityIcons name="check" size={20} color="#C4B5FD" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Star Rating */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{isTelugu ? 'రేటింగ్' : 'Rating'}</Text>
            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity 
                  key={star} 
                  activeOpacity={0.7} 
                  onPress={() => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setRating(star);
                  }}
                  style={styles.starTouch}
                >
                  <MaterialCommunityIcons 
                    name={star <= rating ? "star" : "star-outline"} 
                    size={40} 
                    color={star <= rating ? "#FCD34D" : "#334155"} 
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Comments */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{isTelugu ? 'వ్యాఖ్యలు' : 'Comments'}</Text>
            <View style={[styles.inputBox, styles.textAreaBox]}>
              <TextInput
                style={styles.textArea}
                placeholder={isTelugu ? 'మీ అభిప్రాయాన్ని ఇక్కడ రాయండి...' : 'Write your feedback here...'}
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={5}
                value={comments}
                onChangeText={setComments}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.8} onPress={onSubmit}>
            <Text style={styles.submitButtonText}>{isTelugu ? 'అభిప్రాయాన్ని సమర్పించండి' : 'Submit Feedback'}</Text>
          </TouchableOpacity>

          <View style={{ height: 120 }} />
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

        {/* Success Modal */}
        <Modal visible={showSuccessModal} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
            <View style={styles.modalContent}>
              <View style={styles.successIconContainer}>
                 <MaterialCommunityIcons name="check-circle" size={64} color="#10B981" />
              </View>
              <Text style={styles.modalTitle}>{isTelugu ? 'విజయం!' : 'Success!'}</Text>
              <Text style={styles.modalMessage}>
                {isTelugu ? 'అభిప్రాయం విజయవంతంగా సమర్పించబడింది.' : 'Feedback submitted successfully.'}
              </Text>
              <TouchableOpacity style={styles.modalButton} onPress={onSuccessOk}>
                <Text style={styles.modalButtonText}>{isTelugu ? 'సరే' : 'OK'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#F1F5F9' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CBD5E1',
    marginBottom: 8,
  },
  dropdownContainer: {
    backgroundColor: 'rgba(15,23,42,0.9)',
    borderWidth: 1,
    borderColor: '#8B5CF6',
    borderRadius: 12,
    overflow: 'hidden',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    borderColor: '#8B5CF6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  placeholderText: {
    fontSize: 15,
    color: '#94A3B8',
  },
  selectedText: {
    color: '#F1F5F9',
  },
  dropdownMenu: {
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  dropdownItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#CBD5E1',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  starTouch: {
    padding: 4,
  },
  textAreaBox: {
    alignItems: 'flex-start',
    paddingVertical: 12,
    height: 140,
  },
  textArea: {
    flex: 1,
    width: '100%',
    fontSize: 15,
    color: '#F1F5F9',
  },

  submitButton: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderWidth: 1,
    borderColor: '#8B5CF6',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: 'bold',
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

  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  successIconContainer: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F1F5F9',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    borderWidth: 1,
    borderColor: '#8B5CF6',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
