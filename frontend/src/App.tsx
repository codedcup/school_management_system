import './App.css'
import Layout from './components/Layout.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute, RedirectIfAuthenticated } from './RouteGuards';

import Overview from "./pages/admin/Overview.tsx"
import Classes from "./pages/admin/master/Classes.tsx"
import Sections from "./pages/admin/master/Sections.tsx"
import Streams from "./pages/admin/master/Streams.tsx"
import Subjects from "./pages/admin/master/Subjects.tsx"
import Designations from "./pages/admin/master/Designations.tsx"
import ClassSubjectAssignment from "./pages/admin/academicSetup/ClassSubjectAssignment.tsx"
import ClassTeacherAssignment from "./pages/admin/academicSetup/ClassTeacherAssignment.tsx"
import StudentRegistration from "./pages/admin/studentManagement/StudentRegistration.tsx"
import StudentDirectory from "./pages/admin/studentManagement/StudentDirectory.tsx"
import StudentFeeManagement from "./pages/admin/studentManagement/StudentFeeManagement.tsx"
import TeacherRegistration from "./pages/admin/teacherManagement/TeacherRegistration.tsx"
import TeacherDirectory from "./pages/admin/teacherManagement/TeacherDirectory.tsx"
import TeacherSalaryManagement from "./pages/admin/teacherManagement/TeacherSalaryManagement.tsx"
import FeeSetup from "./pages/admin/finance/FeeSetup.tsx"
import SalarySetup from "./pages/admin/finance/SalarySetup.tsx"
import Settings from "./pages/admin/Settings.tsx"
import AdminLogin from './pages/admin/adminLogin.tsx';
import NotFound from './pages/404.tsx';
import TeacherLogin from './pages/teacher/teacherLogin.tsx';
import StudentLogin from './pages/student/studentLogin.tsx';
import LoginHome from './pages/LoginHome.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home / Landing Route - Public */}
        <Route
          path="/"
          element={
            <RedirectIfAuthenticated>
              <LoginHome />
            </RedirectIfAuthenticated>
          }
        />

        {/* Individual Login Routes - Public */}
        <Route
          path="/admin-login"
          element={
            <RedirectIfAuthenticated>
              <AdminLogin />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/teacher-login"
          element={
            <RedirectIfAuthenticated>
              <TeacherLogin />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/student-login"
          element={
            <RedirectIfAuthenticated>
              <StudentLogin />
            </RedirectIfAuthenticated>
          }
        />

        {/* Protected Routes under /dashboard */}
        <Route
          path="/acc"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />

          {/* Master Data */}
          <Route path="master/classes" element={<Classes />} />
          <Route path="master/sections" element={<Sections />} />
          <Route path="master/streams" element={<Streams />} />
          <Route path="master/subjects" element={<Subjects />} />
          <Route path="master/designations" element={<Designations />} />

          {/* Academic Setup */}
          <Route path="academic/class-subject-assignment" element={<ClassSubjectAssignment />} />
          <Route path="academic/class-teacher-assignment" element={<ClassTeacherAssignment />} />

          {/* Student Management */}
          <Route path="student/registration" element={<StudentRegistration />} />
          <Route path="student/directory" element={<StudentDirectory />} />
          <Route path="student/fee-management" element={<StudentFeeManagement />} />

          {/* Teacher Management */}
          <Route path="teacher/registration" element={<TeacherRegistration />} />
          <Route path="teacher/directory" element={<TeacherDirectory />} />
          <Route path="teacher/salary-management" element={<TeacherSalaryManagement />} />

          {/* Finance */}
          <Route path="finance/fee-setup" element={<FeeSetup />} />
          <Route path="finance/salary-setup" element={<SalarySetup />} />

          {/* Settings */}
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Fallback for undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;