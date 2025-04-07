import './App.css'
import Layout from './components/Layout.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Overview from "./pages/Overview.tsx"
import Classes from "./pages/Classes.tsx"
import Sections from "./pages/Sections.tsx"
import Streams from "./pages/Streams.tsx"
import Subjects from "./pages/Subjects.tsx"
import Designations from "./pages/Designations.tsx"
import ClassSubjectAssignment from "./pages/ClassSubjectAssignment.tsx"
import ClassTeacherAssignment from "./pages/ClassTeacherAssignment.tsx"
import StudentRegistration from "./pages/StudentRegistration.tsx"
import StudentDirectory from "./pages/StudentDirectory.tsx"
import StudentFeeManagement from "./pages/StudentFeeManagement.tsx"
import TeacherRegistration from "./pages/TeacherRegistration.tsx"
import TeacherDirectory from "./pages/TeacherDirectory.tsx"
import TeacherSalaryManagement from "./pages/TeacherSalaryManagement.tsx"
import FeeSetup from "./pages/FeeSetup.tsx"
import SalarySetup from "./pages/SalarySetup.tsx"
import Settings from "./pages/Settings.tsx"

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Overview />} />

          {/* Dashboard */}
          <Route path="/dashboard/overview" element={<Overview />} />

          {/* Master Data */}
          <Route path="/master/classes" element={<Classes />} />
          <Route path="/master/sections" element={<Sections />} />
          <Route path="/master/streams" element={<Streams />} />
          <Route path="/master/subjects" element={<Subjects />} />
          <Route path="/master/designations" element={<Designations />} />

          {/* Academic Setup */}
          <Route path="/academic/class-subject-assignment" element={<ClassSubjectAssignment />} />
          <Route path="/academic/class-teacher-assignment" element={<ClassTeacherAssignment />} />

          {/* Student Management */}
          <Route path="/student/registration" element={<StudentRegistration />} />
          <Route path="/student/directory" element={<StudentDirectory />} />
          <Route path="/student/fee-management" element={<StudentFeeManagement />} />

          {/* Teacher Management */}
          <Route path="/teacher/registration" element={<TeacherRegistration />} />
          <Route path="/teacher/directory" element={<TeacherDirectory />} />
          <Route path="/teacher/salary-management" element={<TeacherSalaryManagement />} />

          {/* Finance */}
          <Route path="/finance/fee-setup" element={<FeeSetup />} />
          <Route path="/finance/salary-setup" element={<SalarySetup />} />

          {/* Settings */}
          <Route path="/settings" element={<Settings />} />

          {/* Log Out */}
          {/* Typically, Log Out is handled as an action rather than a route.
              If you want a separate route, you can create a component that performs logout logic. */}
          {/* <Route path="/logout" element={<Logout />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
