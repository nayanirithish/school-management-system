import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import StudentHomeScreen from './src/screens/StudentHomeScreen';
import FacultyHomeScreen from './src/screens/FacultyHomeScreen';
import AdminHomeScreen from './src/screens/AdminHomeScreen';
import FeeSectionScreen from './src/screens/FeeSectionScreen';
import ExamNotificationsScreen from './src/screens/ExamNotificationsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AttendanceScreen from './src/screens/AttendanceScreen';
import BusTrackerScreen from './src/screens/BusTrackerScreen';
import DiaryScreen from './src/screens/DiaryScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import TimeTableScreen from './src/screens/TimeTableScreen';
import LeaveApplicationScreen from './src/screens/LeaveApplicationScreen';
import StudyMaterialsScreen from './src/screens/StudyMaterialsScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import FacultyTimeTableScreen from './src/screens/FacultyTimeTableScreen';
import FacultyNoticesScreen from './src/screens/FacultyNoticesScreen';
import FacultyMaterialUploadScreen from './src/screens/FacultyMaterialUploadScreen';
import FacultyAssignmentsScreen from './src/screens/FacultyAssignmentsScreen';
import FacultyAttendanceScreen from './src/screens/FacultyAttendanceScreen';
import FacultyPeriodSwappingScreen from './src/screens/FacultyPeriodSwappingScreen';
import FacultySyllabusCoveredScreen from './src/screens/FacultySyllabusCoveredScreen';
import FacultyComplaintsScreen from './src/screens/FacultyComplaintsScreen';
import AdminFeeManagementScreen from './src/screens/AdminFeeManagementScreen';
import AdminUpdateFeeDetailsScreen from './src/screens/AdminUpdateFeeDetailsScreen';
import AdminCollectFeeScreen from './src/screens/AdminCollectFeeScreen';
import AdminStudentManagementScreen from './src/screens/AdminStudentManagementScreen';
import AdminAddUpdateStudentScreen from './src/screens/AdminAddUpdateStudentScreen';
import AdminFacultyManagementScreen from './src/screens/AdminFacultyManagementScreen';
import AdminAddUpdateFacultyScreen from './src/screens/AdminAddUpdateFacultyScreen';
import AdminAddNoticeScreen from './src/screens/AdminAddNoticeScreen';
import AdminNoticesScreen from './src/screens/AdminNoticesScreen';
import AdminProfileScreen from './src/screens/AdminProfileScreen';
import AdminClassesScreen from './src/screens/AdminClassesScreen';
import AdminSubjectsScreen from './src/screens/AdminSubjectsScreen';
import AdminReportsScreen from './src/screens/AdminReportsScreen';
import { StatusBar } from 'expo-status-bar';
import { AdminProvider } from './src/context/AdminContext';
import { ThemeProvider } from './src/context/ThemeContext';
import MobileAppWrapper from './src/components/MobileAppWrapper';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  StudentHome: undefined;
  FacultyHome: undefined;
  AdminHome: undefined;
  FeeSection: undefined;
  ExamNotifications: undefined;
  Profile: undefined;
  Attendance: undefined;
  BusTracker: undefined;
  Diary: undefined;
  Results: undefined;
  TimeTable: undefined;
  LeaveApplication: undefined;
  StudyMaterials: undefined;
  Feedback: undefined;
  Settings: undefined;
  FacultyTimeTable: undefined;
  FacultyNotices: undefined;
  FacultyMaterialUpload: undefined;
  FacultyAssignments: undefined;
  FacultyAttendance: undefined;
  FacultyPeriodSwapping: undefined;
  FacultySyllabusCovered: undefined;
  FacultyComplaints: undefined;
  AdminFeeManagement: undefined;
  AdminUpdateFeeDetails: undefined;
  AdminCollectFee: undefined;
  AdminStudentManagement: undefined;
  AdminAddUpdateStudent: undefined;
  AdminFacultyManagement: undefined;
  AdminAddUpdateFaculty: undefined;
  AdminAddNotice: undefined;
  AdminNotices: undefined;
  AdminProfile: undefined;
  AdminClasses: undefined;
  AdminSubjects: undefined;
  AdminReports: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ThemeProvider>
      <AdminProvider>
        <MobileAppWrapper>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="StudentHome" component={StudentHomeScreen} />
              <Stack.Screen name="FacultyHome" component={FacultyHomeScreen} />
              <Stack.Screen name="AdminHome" component={AdminHomeScreen} />
              <Stack.Screen name="FeeSection" component={FeeSectionScreen} />
              <Stack.Screen name="ExamNotifications" component={ExamNotificationsScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Attendance" component={AttendanceScreen} />
              <Stack.Screen name="BusTracker" component={BusTrackerScreen} />
              <Stack.Screen name="Diary" component={DiaryScreen} />
              <Stack.Screen name="Results" component={ResultsScreen} />
              <Stack.Screen name="TimeTable" component={TimeTableScreen} />
              <Stack.Screen name="LeaveApplication" component={LeaveApplicationScreen} />
              <Stack.Screen name="StudyMaterials" component={StudyMaterialsScreen} />
              <Stack.Screen name="Feedback" component={FeedbackScreen} />
              <Stack.Screen name="Settings" component={SettingsScreen} />
              <Stack.Screen name="FacultyTimeTable" component={FacultyTimeTableScreen} />
              <Stack.Screen name="FacultyNotices" component={FacultyNoticesScreen} />
              <Stack.Screen name="FacultyMaterialUpload" component={FacultyMaterialUploadScreen} />
              <Stack.Screen name="FacultyAssignments" component={FacultyAssignmentsScreen} />
              <Stack.Screen name="FacultyAttendance" component={FacultyAttendanceScreen} />
              <Stack.Screen name="FacultyPeriodSwapping" component={FacultyPeriodSwappingScreen} />
              <Stack.Screen name="FacultySyllabusCovered" component={FacultySyllabusCoveredScreen} />
              <Stack.Screen name="FacultyComplaints" component={FacultyComplaintsScreen} />
              <Stack.Screen name="AdminFeeManagement" component={AdminFeeManagementScreen} />
              <Stack.Screen name="AdminUpdateFeeDetails" component={AdminUpdateFeeDetailsScreen} />
              <Stack.Screen name="AdminCollectFee" component={AdminCollectFeeScreen} />
              <Stack.Screen name="AdminStudentManagement" component={AdminStudentManagementScreen} />
              <Stack.Screen name="AdminAddUpdateStudent" component={AdminAddUpdateStudentScreen} />
              <Stack.Screen name="AdminFacultyManagement" component={AdminFacultyManagementScreen} />
              <Stack.Screen name="AdminAddUpdateFaculty" component={AdminAddUpdateFacultyScreen} />
              <Stack.Screen name="AdminAddNotice" component={AdminAddNoticeScreen} />
              <Stack.Screen name="AdminNotices" component={AdminNoticesScreen} />
              <Stack.Screen name="AdminProfile" component={AdminProfileScreen} />
              <Stack.Screen name="AdminClasses" component={AdminClassesScreen} />
              <Stack.Screen name="AdminSubjects" component={AdminSubjectsScreen} />
              <Stack.Screen name="AdminReports" component={AdminReportsScreen} />
            </Stack.Navigator>
            <StatusBar style="auto" />
          </NavigationContainer>
        </MobileAppWrapper>
      </AdminProvider>
    </ThemeProvider>
  );
}
