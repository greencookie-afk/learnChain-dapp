import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import CourseList from './components/CourseList/CourseList';
import MyCourses from './components/MyCourses/MyCourses';
import Certificates from './components/Certificates/Certificates';
import Documentation from './components/Documentation/Documentation';
import EducatorDashboard from './components/EducatorDashboard/EducatorDashboard';
import CourseCreator from './components/EducatorDashboard/CourseCreator';
import CoursePlayerPage from './components/CoursePlayer/CoursePlayerPage';
import Login from './components/Login/Login';
import BackgroundGrid from './components/BackgroundGrid';
import './App.css';

// Protected route component for role-based access control
const ProtectedRoute = ({ element, allowedRoles }) => {
  const location = useLocation();
  const { isAuthenticated, userRole, isLoading } = useAuth();

  console.log('Protected Route Check:');
  console.log('- Path:', location.pathname);
  console.log('- User Role:', userRole);
  console.log('- Is Authenticated:', isAuthenticated);
  console.log('- Allowed Roles:', allowedRoles);
  console.log('- Has Access:', allowedRoles ? allowedRoles.includes(userRole) : false);

  // Show loading state while auth is being checked
  if (isLoading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    console.log('-> Redirecting to login (not authenticated)');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to home if authenticated but not authorized for this role
    console.log('-> Redirecting to home (not authorized)');
    return <Navigate to="/" replace />;
  }

  console.log('-> Access granted');
  return element;
};

function App() {
  const [showNavFooter, setShowNavFooter] = useState(true);

  // Check if we're on the login page to hide navbar and footer
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname;
      setShowNavFooter(path !== '/login');
    };

    // Initial check
    handleRouteChange();

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <Router>
      <AuthProvider>
        <WalletProvider>
          <div className="app">
            <BackgroundGrid />
            {showNavFooter && <Navbar />}
          <main className={`main-content ${!showNavFooter ? 'full-height' : ''}`}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/documentation" element={<Documentation />} />

              {/* Protected student routes */}
              <Route path="/explore" element={
                <ProtectedRoute
                  element={<CourseList />}
                  allowedRoles={['student', 'educator']}
                />
              } />
              <Route path="/my-courses" element={
                <ProtectedRoute
                  element={<MyCourses />}
                  allowedRoles={['student']}
                />
              } />
              <Route path="/certificates" element={
                <ProtectedRoute
                  element={<Certificates />}
                  allowedRoles={['student']}
                />
              } />

              {/* Protected educator routes */}
              <Route path="/educator/dashboard" element={
                <ProtectedRoute
                  element={<EducatorDashboard />}
                  allowedRoles={['educator']}
                />
              } />
              <Route path="/educator/create-course" element={
                <ProtectedRoute
                  element={<CourseCreator />}
                  allowedRoles={['educator']}
                />
              } />
              <Route path="/educator/edit-course/:courseId" element={
                <ProtectedRoute
                  element={<CourseCreator />}
                  allowedRoles={['educator']}
                />
              } />

              {/* New route for viewing a course with the course player */}
              <Route path="/course-player/:courseId" element={
                <ProtectedRoute
                  element={<CoursePlayerPage />}
                  allowedRoles={['student', 'educator']}
                />
              } />
            </Routes>
          </main>
          {showNavFooter && <Footer />}
          </div>
        </WalletProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
