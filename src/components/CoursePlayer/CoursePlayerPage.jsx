import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CoursePlayer from './CoursePlayer';
import './CoursePlayer.css';

const CoursePlayerPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock course data - in a real app, this would be fetched from API/blockchain
  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data with different videos based on course ID
        let mockCourse;
        const id = parseInt(courseId);
        
        switch (id) {
          case 1:
            mockCourse = {
              id,
              title: "Blockchain Fundamentals",
              description: "Learn the foundational concepts of blockchain technology including distributed ledgers, consensus mechanisms, and cryptography.",
              videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              currentLessonId: 1
            };
            break;
          case 3:
            mockCourse = {
              id,
              title: "Web3 Frontend Integration",
              description: "Connect your web applications to blockchain networks using libraries like ethers.js and web3.js. Build decentralized UIs for your dApps.",
              videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
              currentLessonId: 1
            };
            break;
          case 5:
            mockCourse = {
              id,
              title: "NFT Creation & Marketplaces",
              description: "Create your own NFT collection and learn how to list and sell them on various marketplaces. Understand NFT standards and metadata.",
              videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
              currentLessonId: 1
            };
            break;
          default:
            mockCourse = {
              id,
              title: "Course Content",
              description: "Learn new skills with our interactive course content.",
              videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
              currentLessonId: 1
            };
        }
        
        setCourse(mockCourse);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const handleLessonComplete = (courseId, lessonId) => {
    console.log(`Lesson ${lessonId} completed for course ${courseId}`);
    // In a real app, you would update blockchain state here
  };

  const handleBackClick = () => {
    navigate('/my-courses');
  };

  if (loading) {
    return (
      <div className="course-loading">
        <div className="loading-spinner"></div>
        <p>Loading course content...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="course-error">
        <h2>Course Not Found</h2>
        <p>The course you're looking for doesn't exist or you don't have access to it.</p>
        <button className="back-button" onClick={handleBackClick}>
          Back to My Courses
        </button>
      </div>
    );
  }

  return (
    <div className="course-player-page">
      <div className="course-player-header">
        <button className="back-button" onClick={handleBackClick}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to My Courses
        </button>
      </div>
      
      <CoursePlayer 
        courseId={course.id}
        lessonId={course.currentLessonId}
        videoUrl={course.videoUrl}
        title={course.title}
        description={course.description}
        onComplete={handleLessonComplete}
      />
    </div>
  );
};

export default CoursePlayerPage; 