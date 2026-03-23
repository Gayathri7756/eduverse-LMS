import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CourseCatalog from './pages/CourseCatalog'
import CourseDetail from './pages/CourseDetail'
import CoursePlayer from './pages/CoursePlayer'
import InstructorDashboard from './pages/InstructorDashboard'
import StudentDashboard from './pages/StudentDashboard'
import StudyPlanner from './pages/StudyPlanner'
import Playground from './pages/Playground'
import ResumeBuilder from './pages/ResumeBuilder'
import MyLearning from './pages/MyLearning'
import GenerateLearningPath from './pages/GenerateLearningPath'
import CertificatePage from './pages/CertificatePage'
import GetUserID from './pages/GetUserID'
import Books from './pages/Books'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<CourseCatalog />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/course/:courseId/player" element={<CoursePlayer />} />
          <Route path="/course/:courseId/certificate" element={<CertificatePage />} />
          <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/study-planner" element={<StudyPlanner />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/my-learning" element={<MyLearning />} />
          <Route path="/books" element={<Books />} />
          <Route path="/generate-learning-path" element={<GenerateLearningPath />} />
          <Route path="/get-user-id" element={<GetUserID />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
