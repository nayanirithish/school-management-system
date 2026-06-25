import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Modal, LayoutAnimation, Platform, UIManager } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

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
  const [isTelugu, setIsTelugu] = useState(false);
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
    <LinearGradient colors={['#E0F2FE', '#F3E8FF', '#F9FAFB']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top App Bar */}
        <View style={styles.appBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
             <MaterialCommunityIcons name="menu" size={28} color="#1F2937" />
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
              <MaterialCommunityIcons name="cog-outline" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sub Header */}
        <View style={styles.subHeader}>
           <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight: 16}}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#111827" />
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
                         <MaterialCommunityIcons name="check" size={20} color="#5B4BCA" />
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
                    color={star <= rating ? "#F59E0B" : "#D1D5DB"} 
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
        <BlurView intensity={90} tint="light" style={styles.bottomTabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('StudentHome')}>
            <MaterialCommunityIcons name="home-outline" size={28} color="#6B7280" />
            <Text style={styles.tabLabel}>{isTelugu ? 'హోమ్' : 'Home'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FeeSection')}>
            <MaterialCommunityIcons name="credit-card-outline" size={28} color="#6B7280" />
            <Text style={styles.tabLabel}>{isTelugu ? 'ఫీజు చెల్లింపు' : 'Fee Payment'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('ExamNotifications')}>
            <MaterialCommunityIcons name="bell-outline" size={28} color="#6B7280" />
            <Text style={styles.tabLabel}>{isTelugu ? 'నోటిఫికేషన్' : 'Notification'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
            <MaterialCommunityIcons name="account-outline" size={28} color="#6B7280" />
            <Text style={styles.tabLabel}>{isTelugu ? 'ప్రొఫైల్' : 'Profile'}</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  brandTitle: { fontSize: 20, fontWeight: '800', color: '#5B4BCA', letterSpacing: 1 },
  appBarRight: { flexDirection: 'row', alignItems: 'center' },
  languageToggle: {
    flexDirection: 'row',
    backgroundColor: '#E0E7FF',
    borderRadius: 16,
    padding: 2,
    alignItems: 'center',
  },
  languagePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  languageActive: { backgroundColor: '#5B4BCA' },
  languageInactive: { backgroundColor: 'transparent' },
  languageText: { fontSize: 11, fontWeight: 'bold', color: '#6B7280' },
  languageTextActive: { color: '#FFFFFF' },

  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  pageTitle: { fontSize: 22, fontWeight: 'bold', color: '#111827' },

  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  dropdownContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    overflow: 'hidden',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  placeholderText: {
    fontSize: 15,
    color: '#9CA3AF',
  },
  selectedText: {
    color: '#111827',
  },
  dropdownMenu: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
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
    borderBottomColor: '#F3F4F6',
  },
  dropdownItemText: {
    fontSize: 15,
    color: '#4B5563',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
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
    color: '#111827',
  },

  submitButton: {
    backgroundColor: '#5B4BCA',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#5B4BCA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
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
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255,255,255,0.7)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 11, color: '#6B7280', marginTop: 4, fontWeight: '500' },

  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  successIconContainer: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: '#5B4BCA',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
