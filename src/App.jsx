import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import CourseList from './components/CourseList/CourseList';
import MyCourses from './components/MyCourses/MyCourses';
import Certificates from './components/Certificates/Certificates';
import EducatorDashboard from './components/EducatorDashboard/EducatorDashboard';
import CourseCreator from './components/EducatorDashboard/CourseCreator';
import './App.css';

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<CourseList />} />
              <Route path="/my-courses" element={<MyCourses />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/educator/dashboard" element={<EducatorDashboard />} />
              <Route path="/educator/create-course" element={<CourseCreator />} />
              <Route path="/educator/edit-course/:courseId" element={<CourseCreator />} />
            </Routes>
          </main>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;
