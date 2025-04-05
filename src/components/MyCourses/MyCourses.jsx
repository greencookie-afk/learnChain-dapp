import { useState } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../CourseCard/CourseCard';
import './MyCourses.css';

const MyCourses = () => {
  const [activeTab, setActiveTab] = useState('in-progress');
  
  // Mock data for enrolled courses (in a real app, this would come from the blockchain)
  const [enrolledCourses, setEnrolledCourses] = useState([
    {
      id: 1,
      title: "Blockchain Fundamentals",
      description: "Learn the basics of blockchain technology and cryptocurrency, including consensus mechanisms, cryptography, and decentralized applications.",
      price: 0.1,
      image: "https://placehold.co/600x400/5e35b1/ffffff?text=Blockchain+101",
      progress: 75,
      enrolled: true,
      status: "in-progress",
      lastAccessed: "2023-04-02T15:30:00",
      duration: "4h 30m",
      lessons: 12,
      level: "Beginner"
    },
    {
      id: 3,
      title: "Web3 Frontend Integration",
      description: "Connect your web applications to blockchain networks using libraries like ethers.js and web3.js. Build decentralized UIs for your dApps.",
      price: 0.12,
      image: "https://placehold.co/600x400/673ab7/ffffff?text=Web3+Frontend",
      progress: 32,
      enrolled: true,
      status: "in-progress",
      lastAccessed: "2023-04-04T09:15:00",
      duration: "5h 45m",
      lessons: 15,
      level: "Intermediate"
    },
    {
      id: 5,
      title: "NFT Creation & Marketplaces",
      description: "Create your own NFT collection and learn how to list and sell them on various marketplaces. Understand NFT standards and metadata.",
      price: 0.18,
      image: "https://placehold.co/600x400/7e57c2/ffffff?text=NFT+Creation",
      progress: 100,
      enrolled: true,
      status: "completed",
      lastAccessed: "2023-03-28T14:20:00",
      duration: "6h 30m",
      lessons: 16,
      level: "Intermediate"
    }
  ]);

  // Filter courses based on active tab
  const filteredCourses = enrolledCourses.filter(course => {
    if (activeTab === 'all') return true;
    return course.status === activeTab;
  });

  return (
    <div className="my-courses-container">
      <div className="my-courses-header">
        <h2 className="my-courses-title">My Learning</h2>
      </div>
      
      <div className="courses-tab">
        <div 
          className={`tab-item ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Courses
        </div>
        <div 
          className={`tab-item ${activeTab === 'in-progress' ? 'active' : ''}`}
          onClick={() => setActiveTab('in-progress')}
        >
          In Progress
        </div>
        <div 
          className={`tab-item ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </div>
      </div>
      
      {filteredCourses.length > 0 ? (
        <div className="enrolled-courses-grid">
          {filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              price={course.price}
              image={course.image}
              duration={course.duration}
              lessons={course.lessons}
              level={course.level}
              enrolled={course.enrolled}
              progress={course.progress}
              onEnroll={() => {}} // No enroll button needed for already enrolled courses
            />
          ))}
        </div>
      ) : (
        <div className="no-courses-container">
          <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="no-courses-message">You don't have any {activeTab !== 'all' ? activeTab : ''} courses yet</p>
          <p className="no-courses-suggestion">Explore our catalog and start learning today!</p>
          <Link to="/">
            <button className="explore-courses-btn">Browse Courses</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyCourses; 