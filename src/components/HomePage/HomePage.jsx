import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import CourseCard from '../CourseCard/CourseCard';
import './HomePage.css';
import './HomePageResponsive.css';

// Blockchain particle component
const BlockchainParticle = ({ size, top, left, delay }) => {
  return (
    <motion.div
      className="hero-particle"
      style={{
        width: size,
        height: size,
        top: `${top}%`,
        left: `${left}%`,
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3],
        y: [0, -15, 0],
        x: [0, 10, 0]
      }}
      transition={{
        duration: 5 + Math.random() * 3,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      whileHover={{ 
        scale: 1.5, 
        opacity: 0.8,
        boxShadow: "0 0 20px rgba(61, 90, 241, 0.5), inset 0 0 10px rgba(9, 46, 196, 0.5)",
        transition: { duration: 0.3 }
      }}
    />
  );
};

// Animated text component with letter-by-letter animation
const AnimatedText = ({ text, className }) => {
  // Split text into an array of letters
  const letters = Array.from(text);
  
  // Reference for the text container for mouse parallax effect
  const textRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Mouse move handler for 3D hover effect
  const handleMouseMove = (e) => {
    if (!textRef.current) return;
    
    const rect = textRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center as percentage
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    setMousePosition({ x, y });
  };
  
  // Reset mouse position when mouse leaves
  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // Container variants for the whole text
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.03,
        delayChildren: 0.1,
        duration: 0.5
      }
    }
  };

  // Child variants for each letter
  const letterVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      rotateX: 40,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 150,
        duration: 0.4
      }
    }
  };
  
  // Floating animation for letters - simplified for better performance
  const floatingVariants = {
    animate: (i) => ({
      y: [0, -5, 0],
      rotateZ: [0, i % 2 === 0 ? 2 : -2, 0],
      scale: [1, 1.08, 1],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: i * 0.03
      }
    })
  };

  return (
    <motion.div
      ref={textRef}
      className="text-3d-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        display: 'inline-block',
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${-mousePosition.x * 5}deg)`
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <motion.h1
        className={className}
        variants={textContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={{
              ...letterVariants,
              animate: floatingVariants.animate(index)
            }}
            custom={index}
            animate="animate"
            style={{ 
              display: 'inline-block', 
              marginRight: letter === " " ? "0.5em" : "0",
              perspective: "1000px",
              transformStyle: "preserve-3d",
              willChange: "transform"
            }}
            whileHover={{
              scale: 1.3,
              rotateY: 15,
              z: 30,
              filter: "drop-shadow(0 0 8px rgba(61, 90, 241, 0.6))",
              transition: { type: "spring", damping: 8, duration: 0.3 }
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>
  );
};

const HomePage = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    coursesCompleted: 2,
    hoursLearned: 12.5,
    certificatesEarned: 1,
    streak: 7
  });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random blockchain particles
    const particlesArray = [];
    for (let i = 0; i < 10; i++) {
      particlesArray.push({
        id: i,
        size: 10 + Math.random() * 40,
        top: Math.random() * 90,
        left: Math.random() * 90,
        delay: Math.random() * 2
      });
    }
    setParticles(particlesArray);

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const ctaVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 120,
        delay: 0.8
      }
    },
    hover: { 
      scale: 1.03,
      boxShadow: "0 15px 25px rgba(9, 46, 196, 0.4)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 8 
      }
    },
    tap: { 
      scale: 0.97,
      boxShadow: "0 5px 10px rgba(9, 46, 196, 0.3)" 
    }
  };

  const floatingIconVariants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section - Centered text with Motion animations */}
      <motion.section 
        className="hero-text-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Animated blockchain particles */}
        {particles.map(particle => (
          <BlockchainParticle
            key={particle.id}
            size={particle.size}
            top={particle.top}
            left={particle.left}
            delay={particle.delay}
          />
        ))}
        
        <div className="hero-text-content">
          <AnimatedText
            text="Blockchain Learning"
            className="hero-text-title"
          />
          <p className="hero-text-subtitle">
            Master blockchain development through interactive courses and hands-on projects.
            Start your journey into Web3 and decentralized technologies today.
          </p>
          <div style={{ display: 'inline-block' }}>
            <Link to="/explore" className="hero-cta">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 6V18M12 18L18 12M12 18L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              EXPLORE COURSES
            </Link>
          </div>
        </div>
      </motion.section>

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

      {/* Courses Section */}
      <section>
        <div className="section-header">
          <Link to="/explore" className="view-all-courses">
            View All Courses
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
    </div>
  );
};

export default HomePage;