import { useState, useEffect } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import './CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    // Simulate fetching courses from API
    const fetchCourses = async () => {
      setIsLoading(true);
      // In a real app, this would be an API call
      const mockCourses = [
        {
          id: 1,
          title: "Blockchain Fundamentals",
          description: "Learn the basics of blockchain technology and cryptocurrency, including consensus mechanisms, cryptography, and decentralized applications.",
          price: 0.1,
          image: "https://placehold.co/600x400/5e35b1/ffffff?text=Blockchain+101",
          level: "Beginner",
          duration: "4h 30m",
          lessons: 12,
          category: "blockchain"
        },
        {
          id: 2,
          title: "Smart Contract Development",
          description: "Build smart contracts using Solidity and deploy them to the Ethereum blockchain. Learn about security best practices and gas optimization.",
          price: 0.15,
          image: "https://placehold.co/600x400/7e57c2/ffffff?text=Smart+Contracts",
          level: "Intermediate",
          duration: "6h 15m",
          lessons: 18,
          category: "development"
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
          category: "development"
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
          category: "defi"
        },
        {
          id: 5,
          title: "NFT Creation & Marketplaces",
          description: "Create your own NFT collection and learn how to list and sell them on various marketplaces. Understand NFT standards and metadata.",
          price: 0.18,
          image: "https://placehold.co/600x400/7e57c2/ffffff?text=NFT+Creation",
          level: "Intermediate",
          duration: "6h 30m",
          lessons: 16,
          category: "nft"
        },
        {
          id: 6,
          title: "Crypto Trading Strategies",
          description: "Learn fundamental and technical analysis for cryptocurrency trading. Develop risk management strategies and portfolio allocation.",
          price: 0.16,
          image: "https://placehold.co/600x400/673ab7/ffffff?text=Crypto+Trading",
          level: "Beginner",
          duration: "7h 15m",
          lessons: 20,
          category: "trading"
        },
        {
          id: 7,
          title: "Zero-Knowledge Proofs",
          description: "Understand the theory and application of zero-knowledge proofs in blockchain. Implement privacy-preserving transactions.",
          price: 0.25,
          image: "https://placehold.co/600x400/5e35b1/ffffff?text=ZK+Proofs",
          level: "Advanced",
          duration: "9h 45m",
          lessons: 24,
          category: "blockchain"
        },
        {
          id: 8,
          title: "DAO Governance Models",
          description: "Explore different governance models for Decentralized Autonomous Organizations. Learn how to create and participate in DAOs.",
          price: 0.14,
          image: "https://placehold.co/600x400/7e57c2/ffffff?text=DAO+Governance",
          level: "Intermediate",
          duration: "5h 30m",
          lessons: 14,
          category: "governance"
        }
      ];

      setTimeout(() => {
        setCourses(mockCourses);
        setFilteredCourses(mockCourses);
        setIsLoading(false);
      }, 1000); // Simulate network delay
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [activeFilter, searchQuery, courses]);

  const filterCourses = () => {
    let filtered = [...courses];

    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(course => course.category === activeFilter);
    }

    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query)
      );
    }

    setFilteredCourses(filtered);
  };

  const handleEnroll = (courseId) => {
    console.log(`Enrolling in course ${courseId}`);
    // In a real app, this would connect to the blockchain
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleViewMore = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'blockchain', name: 'Blockchain' },
    { id: 'development', name: 'Development' },
    { id: 'defi', name: 'DeFi' },
    { id: 'nft', name: 'NFTs' },
    { id: 'trading', name: 'Trading' },
    { id: 'governance', name: 'Governance' }
  ];

  return (
    <div className="course-list-container">
      <div className="course-list-header">
        <h2 className="course-list-title">Explore Courses</h2>
      </div>

      <div className="search-bar">
        <div className="search-icon-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search for courses..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="filter-bar">
        {categories.map(category => (
          <div
            key={category.id}
            className={`filter-item ${activeFilter === category.id ? 'active' : ''}`}
            onClick={() => handleFilterChange(category.id)}
          >
            {category.name}
          </div>
        ))}
      </div>

      {isLoading ? (
        <p className="no-courses-message">Loading courses...</p>
      ) : filteredCourses.length > 0 ? (
        <>
          <div className="courses-grid">
            {filteredCourses.slice(0, visibleCount).map(course => (
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
          {visibleCount < filteredCourses.length && (
            <button className="view-more-btn" onClick={handleViewMore}>
              <span>View More Courses</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </>
      ) : (
        <p className="no-courses-message">No courses match your search criteria. Try different filters!</p>
      )}
    </div>
  );
};

export default CourseList;