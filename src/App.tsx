import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/principal/Dashboard";
import Layout from "./components/Layout";
import Hostel from "./pages/principal/Hostel";
import Library from "./pages/principal/Library";
import Transport from "./pages/principal/Transport";
import StudentList from "./pages/principal/students/List";
import List from "./pages/principal/teachers/List";
import Records from "./pages/principal/students/Records";
import StudentRegister from "./pages/principal/students/Register";
import Register from "./pages/principal/teachers/Register";
import Attendance from "./pages/principal/students/attendance/Attendance";
import MarkAttendance from "./pages/principal/students/attendance/Mark-attendance";
import { Exam } from "./pages/principal/Exam";
import { TimeTable } from "./pages/principal/classes/Time-table";
import { Subjects } from "./pages/principal/classes/Subjects";
import Roles from "./pages/principal/settings/Roles";
import { SchoolInfo } from "./pages/principal/settings/School-info";
import { UserManagement } from "./pages/principal/settings/User-management";
import ClassList from "./pages/principal/classes/List";
import AssignSubject from "./pages/principal/teachers/Assign-subject";
import StudentReports from "./pages/principal/reports/Students";
import FeeReports from "./pages/principal/reports/Fees";
import AttendanceReport from "./pages/principal/reports/Attendance";
import ExamReport from "./pages/principal/reports/Exams";
import Dashboard from "./pages/teacher/Dashboard";
import MyClasses from "./pages/teacher/My-classes";
import TeacherProfile from "./pages/teacher/My-profile";
import TeacherReports from "./pages/teacher/Reports";
import TeacherAssignments from "./pages/teacher/Assignments";
import TeacherCommunication from "./pages/teacher/Communication";
import MarkEntry from "./pages/teacher/Exam/Marks-entry";
import ExamSchedule from "./pages/teacher/Exam/Schedule";
import AdminDashboard from "./pages/principal/Dashboard";
import StudentDashboard from "./pages/student/Student-dashboard";
import StudentAttendance from "./pages/student/Attendance";
import StudentMessages from "./pages/student/Messages";
import StudentLibrary from "./pages/student/Library";
import StudentExams from "./pages/student/Exams/Result";
import StudentProfile from "./pages/student/My-profile";
import ReportCard from "./pages/student/Exams/Reports-cards";
import StudentFeesDue from "./pages/student/Fees/Dues";
import StudentPaymentHistory from "./pages/student/Fees/Payments-history";
import ParentDashboard from "./pages/parent/Dashboard";
import ParentNotices from "./pages/parent/Notices";
import ParentFeesDue from "./pages/parent/Fees/Dues";
import ParentPaymentReceipts from "./pages/parent/Fees/Payments-receipts";
import StudentAcademic from "./pages/parent/student-profile/Academic";
import StudentPersonal from "./pages/parent/student-profile/Personal-info";
import { Communication } from "./pages/principal/Communication";
import AccountantDashboard from "./pages/accountant/Dashboard";
import AccountantFees from "./pages/accountant/Fees";
import AccountantPayments from "./pages/accountant/Payments";
import AccountantDues from "./pages/accountant/reports/Dues-pending";
import Transactions from "./pages/accountant/reports/Transactions";
import AccountantFeeReports from "./pages/accountant/reports/Fee-reports";
import AccountantExtraServices from "./pages/accountant/Extra-services";
import AccountantMonthlyDue from "./pages/accountant/Monthly-dues";
import AccountantFeeStructure from "./pages/accountant/FeesStructure";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import { PrivateRoute } from "./components/routes/PrivateRoute";
import { PublicRoute } from "./components/routes/PublicRoute";
import RequestOtpPage from "./pages/auth/RequestOtpPage";
import UserRegister from "./pages/principal/users/Register";
import UserList from "./pages/principal/users/List";
import SubjectList from "./pages/principal/classes/SubjectList";
import Details from "./pages/principal/teachers/Details";
import NotFound from "./components/common/NotFound";
import Landing from "./pages/landing/Landing";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="*" element={<NotFound />} />

        {/* <Route path="/signup" element={<SignupPage/>}/> */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* admin panel */}
        <Route element={<PrivateRoute allowedRoles={['principal']} />}>
          <Route path="/principal" element={<Layout />}>
            <Route path="dashboard" element={<AdminDashboard />} />

            <Route path="hostel" element={<Hostel />} />
            <Route path="library" element={<Library />} />
            <Route path="transport" element={<Transport />} />
            <Route path="exam" element={<Exam />} />
            <Route path="students/attendance" element={<Attendance />} />
            <Route path="classes/subjects" element={<Subjects />} />
            <Route path="classes/subjectlist" element={<SubjectList />} />
            <Route path="classes/timetable" element={<TimeTable />} />
            <Route path="classes/list" element={<ClassList />} />
            <Route path="settings/roles" element={<Roles />} />
            <Route path="settings/school-info" element={<SchoolInfo />} />
            <Route path="settings/user-management" element={<UserManagement />} />
            <Route path="communication" element={<Communication />} />
            <Route path="teachers/list" element={<List />} />
            <Route path="teachers/register" element={<Register />} />
            {/* <Route path="teachers/subject" element={<AssignSubject />} /> */}
            <Route path="teachers/details" element={<Details />} />
            <Route path="reports/student" element={<StudentReports />} />
            <Route path="reports/fee" element={<FeeReports />} />
            <Route path="reports/attendance" element={<AttendanceReport />} />
            <Route path="reports/exams" element={<ExamReport />} />

            <Route
              path="students/attendance"
              element={<Attendance />}
            />

            <Route
              path="students/attendance/mark-attendance"
              element={<MarkAttendance />}
            />

            <Route path="students/">
              <Route path="list" element={<StudentList />} />
              <Route path="records" element={<Records />} />
              <Route path="records/:id" element={<Records />} />
              <Route path="register" element={<StudentRegister />} />
            </Route>

            <Route path="users/">
              <Route path="register" element={<UserRegister />} />
              <Route path="list" element={<UserList />} />
            </Route>
          </Route>
        </Route>

        {/* teacher panel */}
        <Route element={<PrivateRoute allowedRoles={['teacher']} />}>
          <Route path="/teacher" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="my-classes" element={<MyClasses />} />
            <Route path="my-profile" element={<TeacherProfile />} />
            <Route path="reports" element={<TeacherReports />} />
            <Route path="assignments" element={<TeacherAssignments />} />
            <Route path="communication" element={<TeacherCommunication />} />
            <Route path="exam/marks-entry" element={<MarkEntry />} />
            <Route path="exam/schedule" element={<ExamSchedule />} />
            <Route path="student-attendance" element={<Attendance />} />
          </Route>
        </Route>

        {/* student panel */}
        <Route element={<PrivateRoute allowedRoles={['student']} />}>
          <Route path="/student" element={<Layout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="messages" element={<StudentMessages />} />
            <Route path="library" element={<StudentLibrary />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="exams/result" element={<StudentExams />} />
            <Route path="exams/reports-cards" element={<ReportCard />} />
            <Route path="fees/due" element={<StudentFeesDue />} />
            <Route
              path="fees/payments-history"
              element={<StudentPaymentHistory />}
            />
          </Route>
        </Route>

        {/* parent panel  */}
        <Route element={<PrivateRoute allowedRoles={['parent']} />}>
          <Route path="/parent" element={<Layout />}>
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="dashboard" element={<ParentDashboard />} />
            <Route path="notices" element={<ParentNotices />} />
            <Route path="exams/results" element={<StudentExams />} />
            <Route path="exams/reports-cards" element={<ReportCard />} />
            <Route path="fees/dues" element={<ParentFeesDue />} />
            <Route
              path="fees/payments-receipts"
              element={<ParentPaymentReceipts />}
            />
            <Route path="children/academic" element={<StudentAcademic />} />
            <Route path="children-personal-info" element={<StudentPersonal />} />
          </Route>
        </Route>

        {/* accountant panel */}
        <Route element={<PrivateRoute allowedRoles={['accountant']} />}>
          <Route path="/accountant" element={<Layout />}>
            <Route path="dashboard" element={<AccountantDashboard />} />
            <Route path="fees" element={<AccountantFees />} />
            <Route path="payments" element={<AccountantPayments />} />
            <Route path="extra-services" element={<AccountantExtraServices />} />
            <Route path="monthly-dues" element={<AccountantMonthlyDue />} />
            <Route path="fees-structure" element={<AccountantFeeStructure />} />
            <Route path="report/dues-pending" element={<AccountantDues />} />
            <Route path="report/transactions" element={<Transactions />} />
            <Route path="report/fee" element={<AccountantFeeReports />} />

          </Route>
        </Route>
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
