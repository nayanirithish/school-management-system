import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';

// General Screens
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

// Student Screens
import StudentHomeScreen from './src/screens/student/StudentHomeScreen';
import FeeSectionScreen from './src/screens/student/FeeSectionScreen';
import ExamNotificationsScreen from './src/screens/student/ExamNotificationsScreen';
import StudentProfileScreen from './src/screens/student/StudentProfileScreen';
import AttendanceScreen from './src/screens/student/AttendanceScreen';
import BusTrackerScreen from './src/screens/student/BusTrackerScreen';
import DiaryScreen from './src/screens/student/DiaryScreen';
import ResultsScreen from './src/screens/student/ResultsScreen';
import TimeTableScreen from './src/screens/student/TimeTableScreen';
import LeaveApplicationScreen from './src/screens/student/LeaveApplicationScreen';
import StudyMaterialsScreen from './src/screens/student/StudyMaterialsScreen';
import FeedbackScreen from './src/screens/student/FeedbackScreen';
import StudentSettingsScreen from './src/screens/student/StudentSettingsScreen';
import AchievementWalletScreen from './src/screens/student/AchievementWalletScreen';
import StudentAssignmentsScreen from './src/screens/student/StudentAssignmentsScreen';
import StudentSportsAchievementsScreen from './src/screens/student/StudentSportsAchievementsScreen';
import StudentNoticesScreen from './src/screens/student/StudentNoticesScreen';

// Faculty Screens
import FacultyHomeScreen from './src/screens/faculty/FacultyHomeScreen';
import FacultyTimeTableScreen from './src/screens/faculty/FacultyTimeTableScreen';
import FacultyNoticesScreen from './src/screens/faculty/FacultyNoticesScreen';
import FacultySettingsScreen from './src/screens/faculty/FacultySettingsScreen';
import FacultyProfileScreen from './src/screens/faculty/FacultyProfileScreen';
import FacultyMaterialUploadScreen from './src/screens/faculty/FacultyMaterialUploadScreen';
import FacultyAssignmentsScreen from './src/screens/faculty/FacultyAssignmentsScreen';
import FacultyAttendanceScreen from './src/screens/faculty/FacultyAttendanceScreen';
import FacultyPeriodSwappingScreen from './src/screens/faculty/FacultyPeriodSwappingScreen';
import FacultySyllabusCoveredScreen from './src/screens/faculty/FacultySyllabusCoveredScreen';
import FacultyComplaintsScreen from './src/screens/faculty/FacultyComplaintsScreen';
import FacultyLeaveApplyScreen from './src/screens/faculty/FacultyLeaveApplyScreen';
import FacultyAddNoticeScreen from './src/screens/faculty/FacultyAddNoticeScreen';

// Admin Screens
import AdminHomeScreen from './src/screens/admin/AdminHomeScreen';
import AdminFeeManagementScreen from './src/screens/admin/AdminFeeManagementScreen';
import AdminUpdateFeeDetailsScreen from './src/screens/admin/AdminUpdateFeeDetailsScreen';
import AdminCollectFeeScreen from './src/screens/admin/AdminCollectFeeScreen';
import AdminStudentManagementScreen from './src/screens/admin/AdminStudentManagementScreen';
import AdminAddUpdateStudentScreen from './src/screens/admin/AdminAddUpdateStudentScreen';
import AdminFacultyManagementScreen from './src/screens/admin/AdminFacultyManagementScreen';
import AdminAddUpdateFacultyScreen from './src/screens/admin/AdminAddUpdateFacultyScreen';
import AdminClassTeachersScreen from './src/screens/admin/AdminClassTeachersScreen';
import AdminUploadResultsScreen from './src/screens/admin/AdminUploadResultsScreen';
import AdminAddNoticeScreen from './src/screens/admin/AdminAddNoticeScreen';
import AdminNoticesScreen from './src/screens/admin/AdminNoticesScreen';
import AdminProfileScreen from './src/screens/admin/AdminProfileScreen';
import AdminClassesScreen from './src/screens/admin/AdminClassesScreen';
import AdminSubjectsScreen from './src/screens/admin/AdminSubjectsScreen';
import AdminReportsScreen from './src/screens/admin/AdminReportsScreen';
import AdminComplaintManagementScreen from './src/screens/admin/AdminComplaintManagementScreen';
import AdminSettingsScreen from './src/screens/admin/AdminSettingsScreen';
import AdminResultsScreen from './src/screens/admin/AdminResultsScreen';
import { StatusBar } from 'expo-status-bar';
import { AdminProvider } from './src/context/AdminContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { FacultyPreferencesProvider } from './src/context/FacultyPreferencesContext';
import MobileAppWrapper from './src/components/MobileAppWrapper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  StudentHome: undefined;
  FacultyHome: undefined;
  AdminHome: undefined;
  FeeSection: undefined;
  ExamNotifications: undefined;
  StudentProfile: undefined;
  Attendance: undefined;
  BusTracker: undefined;
  Diary: undefined;
  Results: undefined;
  TimeTable: undefined;
  LeaveApplication: undefined;
  StudyMaterials: undefined;
  Feedback: undefined;
  StudentSettings: undefined;
  StudentNotices: undefined;
  FacultyTimeTable: undefined;
  FacultyNotices: undefined;
  FacultyMaterialUpload: undefined;
  FacultyAssignments: undefined;
  FacultyAttendance: undefined;
  FacultyPeriodSwapping: undefined;
  FacultySyllabusCovered: undefined;
  FacultyProfile: undefined;
  FacultyComplaints: undefined;
  AdminFeeManagement: undefined;
  AdminUpdateFeeDetails: undefined;
  AdminCollectFee: undefined;
  AdminStudentManagement: undefined;
  AdminAddUpdateStudent: { studentId?: number } | undefined;
  AdminFacultyManagement: undefined;
  AdminAddUpdateFaculty: { facultyId?: number } | undefined;
  AdminClassTeachers: undefined;
  AdminUploadResults: undefined;
  AdminAddNotice: undefined;
  AdminNotices: undefined;
  AdminProfile: undefined;
  AdminClasses: undefined;
  AdminSubjects: undefined;
  AdminReports: undefined;
  AdminComplaintManagement: undefined;
  AdminSettings: undefined;
  AdminResults: undefined;
  AchievementWallet: undefined;
  StudentAssignments: undefined;
  StudentSportsAchievements: undefined;
  FacultySettings: undefined;
  FacultyLeaveApply: undefined;
  FacultyAddNotice: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const prefix = Linking.createURL('/');

const linking = {
  prefixes: [prefix, 'http://localhost:8081'],
  config: {
    screens: {
      Splash: 'splash',
      Login: 'login',
      Register: 'register',
      StudentHome: 'student/home',
      FeeSection: 'student/fee',
      ExamNotifications: 'student/notifications',
      StudentProfile: 'student/profile',
      Attendance: 'student/attendance',
      BusTracker: 'student/bus',
      Diary: 'student/diary',
      Results: 'student/results',
      TimeTable: 'student/timetable',
      LeaveApplication: 'student/leave',
      StudyMaterials: 'student/materials',
      Feedback: 'student/feedback',
      StudentSettings: 'student/settings',
      AchievementWallet: 'student/achievements',
      StudentAssignments: 'student/assignments',
      StudentSportsAchievements: 'student/sports',
      
      FacultyHome: 'faculty/home',
      FacultyTimeTable: 'faculty/timetable',
      FacultyNotices: 'faculty/notices',
      FacultyMaterialUpload: 'faculty/materials',
      FacultyAssignments: 'faculty/assignments',
      FacultyAttendance: 'faculty/attendance',
      FacultyPeriodSwapping: 'faculty/swapping',
      FacultySyllabusCovered: 'faculty/syllabus',
      FacultyComplaints: 'faculty/complaints',
      FacultySettings: 'faculty/settings',
      FacultyLeaveApply: 'faculty/leave',
      FacultyAddNotice: 'faculty/add-notice',
      
      AdminHome: 'admin/home',
      AdminFeeManagement: 'admin/fee',
      AdminUpdateFeeDetails: 'admin/fee/update',
      AdminCollectFee: 'admin/fee/collect',
      AdminStudentManagement: 'admin/students',
      AdminAddUpdateStudent: 'admin/students/add',
      AdminFacultyManagement: 'admin/faculty',
      AdminAddUpdateFaculty: 'admin/faculty/add',
      AdminAddNotice: 'admin/notices/add',
      AdminNotices: 'admin/notices',
      AdminProfile: 'admin/profile',
      AdminClasses: 'admin/classes',
      AdminSubjects: 'admin/subjects',
      AdminReports: 'admin/reports',
      AdminComplaintManagement: 'admin/complaints',
      AdminSettings: 'admin/settings',
      AdminResults: 'admin/results',
    },
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AdminProvider>
          <LanguageProvider>
            <FacultyPreferencesProvider>
              <MobileAppWrapper>
              <NavigationContainer linking={linking}>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                
                {/* Student Screens */}
                <Stack.Screen name="StudentHome" component={StudentHomeScreen} />
                <Stack.Screen name="FeeSection" component={FeeSectionScreen} />
                <Stack.Screen name="ExamNotifications" component={ExamNotificationsScreen} />
                <Stack.Screen name="StudentProfile" component={StudentProfileScreen} />
                <Stack.Screen name="Attendance" component={AttendanceScreen} />
                <Stack.Screen name="BusTracker" component={BusTrackerScreen} />
                <Stack.Screen name="Diary" component={DiaryScreen} />
                <Stack.Screen name="Results" component={ResultsScreen} />
                <Stack.Screen name="TimeTable" component={TimeTableScreen} />
                <Stack.Screen name="LeaveApplication" component={LeaveApplicationScreen} />
                <Stack.Screen name="StudyMaterials" component={StudyMaterialsScreen} />
                <Stack.Screen name="Feedback" component={FeedbackScreen} />
                <Stack.Screen name="StudentSettings" component={StudentSettingsScreen} />
                <Stack.Screen name="AchievementWallet" component={AchievementWalletScreen} />
                <Stack.Screen name="StudentAssignments" component={StudentAssignmentsScreen} />
                <Stack.Screen name="StudentSportsAchievements" component={StudentSportsAchievementsScreen} />
                <Stack.Screen name="StudentNotices" component={StudentNoticesScreen} />

                {/* Faculty Screens */}
                <Stack.Screen name="FacultyHome" component={FacultyHomeScreen} />
                <Stack.Screen name="FacultyMaterialUpload" component={FacultyMaterialUploadScreen} />
                <Stack.Screen name="FacultyAssignments" component={FacultyAssignmentsScreen} />
                <Stack.Screen name="FacultyAttendance" component={FacultyAttendanceScreen} />
                <Stack.Screen name="FacultyPeriodSwapping" component={FacultyPeriodSwappingScreen} />
                <Stack.Screen name="FacultySyllabusCovered" component={FacultySyllabusCoveredScreen} />
                <Stack.Screen name="FacultyTimeTable" component={FacultyTimeTableScreen} />
                <Stack.Screen name="FacultySettings" component={FacultySettingsScreen} />
                <Stack.Screen name="FacultyProfile" component={FacultyProfileScreen} />
                <Stack.Screen name="FacultyLeaveApply" component={FacultyLeaveApplyScreen} />
                <Stack.Screen name="FacultyAddNotice" component={FacultyAddNoticeScreen} />
                <Stack.Screen name="FacultyNotices" component={FacultyNoticesScreen} />
                <Stack.Screen name="FacultyComplaints" component={FacultyComplaintsScreen} />

                {/* Admin Screens */}
                <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
                <Stack.Screen name="AdminFeeManagement" component={AdminFeeManagementScreen} />
                <Stack.Screen name="AdminUpdateFeeDetails" component={AdminUpdateFeeDetailsScreen} />
                <Stack.Screen name="AdminCollectFee" component={AdminCollectFeeScreen} />
                <Stack.Screen name="AdminStudentManagement" component={AdminStudentManagementScreen} />
                <Stack.Screen name="AdminAddUpdateStudent" component={AdminAddUpdateStudentScreen} />
                <Stack.Screen name="AdminFacultyManagement" component={AdminFacultyManagementScreen} />
                <Stack.Screen name="AdminAddUpdateFaculty" component={AdminAddUpdateFacultyScreen} />
                <Stack.Screen name="AdminClassTeachers" component={AdminClassTeachersScreen} />
                <Stack.Screen name="AdminUploadResults" component={AdminUploadResultsScreen} />
                
                {/* Faculty Routes */}
                <Stack.Screen name="AdminAddNotice" component={AdminAddNoticeScreen} />
                <Stack.Screen name="AdminNotices" component={AdminNoticesScreen} />
                <Stack.Screen name="AdminProfile" component={AdminProfileScreen} />
                <Stack.Screen name="AdminClasses" component={AdminClassesScreen} />
                <Stack.Screen name="AdminSubjects" component={AdminSubjectsScreen} />
                <Stack.Screen name="AdminReports" component={AdminReportsScreen} />
                <Stack.Screen name="AdminComplaintManagement" component={AdminComplaintManagementScreen} />
                <Stack.Screen name="AdminSettings" component={AdminSettingsScreen} />
                <Stack.Screen name="AdminResults" component={AdminResultsScreen} />
              </Stack.Navigator>
              <StatusBar style="auto" />
            </NavigationContainer>
            </MobileAppWrapper>
            </FacultyPreferencesProvider>
          </LanguageProvider>
        </AdminProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
