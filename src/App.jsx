import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CoursePlayerPage from './pages/CoursePlayerPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

function Layout({ children, hideFooter = false }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout><HomePage /></Layout>} />

        <Route path="/courses" element={<Layout><CoursesPage /></Layout>} />

        <Route path="/courses/:id" element={<Layout><CourseDetailsPage /></Layout>} />

        <Route path="/courses/:id/play" element={<Layout hideFooter><CoursePlayerPage /></Layout>} />

        <Route path="/signup" element={<Layout><SignupPage /></Layout>} />

        <Route path="/login" element={<Layout><LoginPage /></Layout>} />

        <Route path="/admin" element={<Layout><AdminDashboard/></Layout>} />



      </Routes>
    </BrowserRouter>
  );
}