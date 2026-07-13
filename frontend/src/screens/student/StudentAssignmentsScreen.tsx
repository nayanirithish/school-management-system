import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type StudentAssignmentsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'StudentAssignments'>;
interface Props {
  navigation: StudentAssignmentsScreenNavigationProp;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'Pending' | 'Submitted' | 'Graded';
  description: string;
  submissionLink?: string;
  feedback?: string;
}

export default function StudentAssignmentsScreen({ navigation }: Props) {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Science Fair Project Proposal',
      subject: 'Science',
      dueDate: '28 May 2024',
      status: 'Pending',
      description: 'Submit your topic and a brief 2-page proposal for the upcoming science fair.',
      submissionLink: '',
    },
    {
      id: '2',
      title: 'Math Algebra Worksheet',
      subject: 'Mathematics',
      dueDate: '25 May 2024',
      status: 'Submitted',
      description: 'Complete the algebra equations on page 42-45 and upload the scanned copy.',
      submissionLink: 'https://drive.google.com/file/math_worksheet.pdf',
    },
    {
      id: '3',
      title: 'History Essay: World War II',
      subject: 'History',
      dueDate: '20 May 2024',
      status: 'Graded',
      description: 'Write a 1000-word essay on the impact of WWII on global economics.',
      submissionLink: 'https://docs.google.com/document/history_essay',
      feedback: 'Excellent research! A-',
    },
  ]);

  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionInput, setSubmissionInput] = useState('');

  const handleOpenAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setSubmissionInput(assignment.submissionLink || '');
  };

  const handleCloseModal = () => {
    setSelectedAssignment(null);
    setSubmissionInput('');
  };

  const handleSubmit = () => {
    if (selectedAssignment) {
      setAssignments((prev) => 
        prev.map((a) => {
          if (a.id === selectedAssignment.id) {
            return { ...a, submissionLink: submissionInput, status: 'Submitted' };
          }
          return a;
        })
      );
      handleCloseModal();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return '#FBBF24'; // Neon Amber
      case 'Submitted': return '#60A5FA'; // Neon Blue
      case 'Graded': return '#34D399'; // Neon Green
      default: return '#94A3B8';
    }
  };

  return (
    <LinearGradient colors={['#0F172A', '#1E293B', '#0F172A']} style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#E0E7FF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Project Work</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {assignments.map((assignment) => (
            <TouchableOpacity 
              key={assignment.id} 
              activeOpacity={0.7} 
              onPress={() => handleOpenAssignment(assignment)}
            >
              <BlurView intensity={20} tint="dark" style={styles.assignmentCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.subjectBadge}>
                    <Text style={styles.subjectText}>{assignment.subject}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(assignment.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(assignment.status) }]}>
                      {assignment.status}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                
                <View style={styles.cardFooter}>
                  <View style={styles.dateRow}>
                    <MaterialCommunityIcons name="calendar-clock" size={16} color="#94A3B8" />
                    <Text style={styles.dateText}>Due: {assignment.dueDate}</Text>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={20} color="#A78BFA" />
                </View>
              </BlurView>
            </TouchableOpacity>
          ))}
          <View style={{ height: 100 }} />
        </ScrollView>

      </SafeAreaView>

      {/* Assignment Detail Modal */}
      <Modal visible={!!selectedAssignment} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={handleCloseModal}>
            <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
          </TouchableOpacity>
          
          <View style={styles.modalContainer}>
            <BlurView intensity={40} tint="dark" style={styles.modalContent}>
              {selectedAssignment && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalSubject}>{selectedAssignment.subject}</Text>
                    <TouchableOpacity onPress={handleCloseModal}>
                      <MaterialCommunityIcons name="close-circle-outline" size={28} color="#A78BFA" />
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.modalTitle}>{selectedAssignment.title}</Text>
                  
                  <View style={styles.modalStatusRow}>
                    <View style={styles.dateRow}>
                      <MaterialCommunityIcons name="calendar-alert" size={18} color="#EF4444" />
                      <Text style={styles.modalDateText}>Due: {selectedAssignment.dueDate}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(selectedAssignment.status) + '20' }]}>
                      <Text style={[styles.statusText, { color: getStatusColor(selectedAssignment.status) }]}>
                        {selectedAssignment.status}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.modalSectionTitle}>Description</Text>
                  <Text style={styles.modalDescription}>{selectedAssignment.description}</Text>

                  {selectedAssignment.feedback && (
                    <View style={styles.feedbackContainer}>
                      <Text style={styles.feedbackTitle}>Teacher's Feedback:</Text>
                      <Text style={styles.feedbackText}>{selectedAssignment.feedback}</Text>
                    </View>
                  )}

                  <Text style={styles.modalSectionTitle}>Your Work</Text>
                  {selectedAssignment.status === 'Graded' ? (
                    <View style={styles.readOnlyInput}>
                      <Text style={styles.readOnlyText}>{selectedAssignment.submissionLink || 'No link provided'}</Text>
                    </View>
                  ) : (
                    <TextInput
                      style={styles.inputField}
                      placeholder="Paste your project drive link or text here..."
                      placeholderTextColor="#9CA3AF"
                      value={submissionInput}
                      onChangeText={setSubmissionInput}
                      multiline
                    />
                  )}

                  {selectedAssignment.status !== 'Graded' && (
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                      <LinearGradient colors={['#4F46E5', '#8B5CF6']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.submitGradient}>
                        <Text style={styles.submitButtonText}>
                          {selectedAssignment.status === 'Submitted' ? 'Update Submission' : 'Submit Work'}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </BlurView>
          </View>
        </View>
      </Modal>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  safeArea: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center' },
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  backButton: { marginRight: 16 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#F1F5F9' },
  
  scrollContent: { paddingHorizontal: 20, paddingTop: 16 },

  assignmentCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1,
    borderColor: '#8B5CF6',
    overflow: 'hidden',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  subjectBadge: { backgroundColor: 'rgba(139, 92, 246, 0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  subjectText: { color: '#6D28D9', fontSize: 12, fontWeight: '600' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 11, fontWeight: 'bold' },
  
  assignmentTitle: { fontSize: 17, fontWeight: '700', color: '#F8FAFC', marginBottom: 16 },
  
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#334155' },
  dateRow: { flexDirection: 'row', alignItems: 'center' },
  dateText: { fontSize: 13, color: '#94A3B8', marginLeft: 6 },

  modalOverlay: { flex: 1, justifyContent: 'flex-end', width: '100%', maxWidth: 480, alignSelf: 'center' },
  modalContainer: { width: '100%', borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: 'hidden' },
  modalContent: { padding: 24, paddingBottom: 40, backgroundColor: 'rgba(255, 255, 255, 0.95)', borderWidth: 1, borderColor: '#8B5CF6' },
  
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  modalSubject: { fontSize: 14, fontWeight: '600', color: '#6D28D9', textTransform: 'uppercase', letterSpacing: 1 },
  
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#F1F5F9', marginBottom: 16 },
  
  modalStatusRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#334155' },
  modalDateText: { fontSize: 14, color: '#F87171', marginLeft: 6, fontWeight: '500' },

  modalSectionTitle: { fontSize: 16, fontWeight: '700', color: '#F8FAFC', marginBottom: 8 },
  modalDescription: { fontSize: 14, color: '#94A3B8', lineHeight: 22, marginBottom: 20 },
  
  feedbackContainer: { backgroundColor: 'rgba(52, 211, 153, 0.1)', padding: 12, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: '#34D399' },
  feedbackTitle: { fontSize: 13, fontWeight: '700', color: '#34D399', marginBottom: 4 },
  feedbackText: { fontSize: 14, color: '#6EE7B7' },

  inputField: { 
    backgroundColor: 'rgba(15, 23, 42, 0.7)', 
    borderWidth: 1, 
    borderColor: '#8B5CF6', 
    borderRadius: 12, 
    padding: 16, 
    fontSize: 15,
    color: '#F1F5F9',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 24,
  },
  readOnlyInput: {
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderWidth: 1, 
    borderColor: '#334155',
    borderRadius: 12, 
    padding: 16,
    minHeight: 60,
    marginBottom: 24,
  },
  readOnlyText: { fontSize: 15, color: '#94A3B8' },

  submitButton: { borderRadius: 12, overflow: 'hidden' },
  submitGradient: { paddingVertical: 16, alignItems: 'center' },
  submitButtonText: { color: '#F8FAFC', fontSize: 16, fontWeight: 'bold' },
});
