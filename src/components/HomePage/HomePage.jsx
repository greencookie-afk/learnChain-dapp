import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../CourseCard/CourseCard';
import './HomePage.css';
import './HomePageResponsive.css';

const HomePage = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    coursesCompleted: 2,
    hoursLearned: 12.5,
    certificatesEarned: 1,
    streak: 7
  });

  useEffect(() => {
    // Simulate fetching data from API
    const fetchData = async () => {
      setIsLoading(true);
      
      // Mock featured courses data
      const mockFeaturedCourses = [
        {
          id: 1,
          title: "Blockchain Fundamentals",
          description: "Learn the basics of blockchain technology and cryptocurrency, including consensus mechanisms, cryptography, and decentralized applications.",
          price: 0.1,
          image: "https://placehold.co/600x400/5e35b1/ffffff?text=Blockchain+101",
          level: "Beginner",
          duration: "4h 30m",
          lessons: 12,
          featured: true
        },
        {
          id: 3,
          title: "Web3 Frontend Integration",
          description: "Connect your web applications to blockchain networks using libraries like ethers.js and web3.js. Build decentralized UIs for your dApps.",
          price: 0.12,
          image: "https://placehold.co/600x400/673ab7/ffffff?text=Web3+Frontend",
          level: "Intermediate",
          duration: "5h 45m",
          lessons: 15,
          featured: true
        },
        {
          id: 4,
          title: "DeFi Protocols & Applications",
          description: "Explore decentralized finance protocols, including lending platforms, decentralized exchanges, and yield farming strategies.",
          price: 0.2,
          image: "https://placehold.co/600x400/5e35b1/ffffff?text=DeFi+Protocols",
          level: "Advanced",
          duration: "8h 20m",
          lessons: 22,
          featured: true
        }
      ];
      
      setTimeout(() => {
        setFeaturedCourses(mockFeaturedCourses);
        setIsLoading(false);
      }, 800);
    };
    
    fetchData();
  }, []);

  const handleEnroll = (courseId) => {
    console.log(`Enrolling in course ${courseId}`);
    // In a real app, this would connect to the blockchain
  };

  // Learning path steps
  const learningPathSteps = [
    {
      number: 1,
      title: "Blockchain Fundamentals",
      description: "Understand the basics of blockchain technology and cryptocurrencies",
      completed: true,
      date: "March 15, 2023"
    },
    {
      number: 2,
      title: "Smart Contract Development",
      description: "Learn Solidity and develop your first smart contracts",
      completed: true,
      date: "April 3, 2023"
    },
    {
      number: 3,
      title: "Web3 Integration",
      description: "Connect frontends to the blockchain using Web3 libraries",
      completed: false
    },
    {
      number: 4,
      title: "Build a Complete DApp",
      description: "Create a full decentralized application from scratch",
      completed: false
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to LearnChain</h1>
          <p className="hero-subtitle">
            Master blockchain development through interactive courses and hands-on projects. 
            Start your journey into Web3 and decentralized technologies today.
          </p>
          <Link to="/explore" className="hero-cta">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6V18M12 18L18 12M12 18L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Explore Courses
          </Link>
        </div>
        <img 
          src="https://placehold.co/800x600/252525/5e35b1?text=Blockchain+Learning" 
          alt="Blockchain learning illustration" 
          className="hero-image"
        />
      </section>

      {/* Stats Section */}
      <section>
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">Courses Completed</span>
              <svg className="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 7h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 11h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 15h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-value">{stats.coursesCompleted}</div>
            <div className="stat-subtitle">Keep up the good work!</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">Hours Learned</span>
              <svg className="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-value">{stats.hoursLearned}</div>
            <div className="stat-subtitle">Total learning time</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">Certificates Earned</span>
              <svg className="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-value">{stats.certificatesEarned}</div>
            <div className="stat-subtitle">NFT certificates on chain</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-title">Learning Streak</span>
              <svg className="stat-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-value">{stats.streak}</div>
            <div className="stat-subtitle">Days in a row</div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section>
        <div className="section-header">
          <h2 className="section-title">Featured Courses</h2>
          <Link to="/explore" className="view-all">
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        
        {isLoading ? (
          <p className="text-center">Loading featured courses...</p>
        ) : (
          <div className="featured-courses">
            {featuredCourses.map(course => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                price={course.price}
                image={course.image}
                duration={course.duration}
                lessons={course.lessons}
                level={course.level}
                onEnroll={() => handleEnroll(course.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Learning Path Section */}
      <section className="learning-path-container">
        <div className="learning-path-header">
          <h2 className="learning-path-title">Your Learning Path</h2>
        </div>
        
        <div className="learning-path-steps">
          {learningPathSteps.map((step, index) => (
            <div className="learning-path-step" key={index}>
              <div className="step-timeline">
                <div className="step-icon" style={{ 
                  backgroundColor: step.completed ? 'var(--success-color)' : 'var(--bg-tertiary)',
                  color: step.completed ? 'white' : 'var(--text-secondary)'
                }}>
                  {step.completed ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : step.number}
                </div>
                {index < learningPathSteps.length - 1 && <div className="step-line"></div>}
              </div>
              
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                {step.completed && (
                  <div className="step-completed">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Completed on {step.date}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage; 