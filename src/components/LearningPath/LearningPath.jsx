import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LearningPath.css';

const LearningPath = () => {
  const [learningPathSteps, setLearningPathSteps] = useState([
    {
      number: 1,
      title: "Blockchain Fundamentals",
      description: "Understand the basics of blockchain technology and cryptocurrencies",
      completed: true,
      date: "March 15, 2023",
      courseId: 1
    },
    {
      number: 2,
      title: "Smart Contract Development",
      description: "Learn Solidity and develop your first smart contracts",
      completed: true,
      date: "April 3, 2023",
      courseId: 2
    },
    {
      number: 3,
      title: "Web3 Integration",
      description: "Connect frontends to the blockchain using Web3 libraries",
      completed: false,
      courseId: 3
    },
    {
      number: 4,
      title: "Build a Complete DApp",
      description: "Create a full decentralized application from scratch",
      completed: false,
      courseId: 4
    }
  ]);

  // In a real app, we would fetch the learning path data from the blockchain
  useEffect(() => {
    // Simulating API call to get learning path data
    const fetchLearningPath = async () => {
      try {
        // This would be replaced with actual API call
        // const response = await api.getLearningPath(userAddress);
        // setLearningPathSteps(response.data);
        
        // For now, we're using the mock data initialized in state
      } catch (error) {
        console.error("Error fetching learning path:", error);
      }
    };

    fetchLearningPath();
  }, []);

  const handleContinueLearning = (courseId) => {
    console.log(`Continuing course ${courseId}`);
    // In a real app, this would navigate to the course content
  };

  return (
    <div className="learning-path-container">
      <div className="learning-path-header">
        <h2 className="learning-path-title">Your Learning Path</h2>
        <div className="learning-path-progress">
          <div className="progress-text">
            <span>{learningPathSteps.filter(step => step.completed).length} of {learningPathSteps.length} completed</span>
          </div>
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ 
                width: `${(learningPathSteps.filter(step => step.completed).length / learningPathSteps.length) * 100}%` 
              }}
            ></div>
          </div>
        </div>
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
              
              {step.completed ? (
                <div className="step-completed">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Completed on {step.date}
                </div>
              ) : (
                index === learningPathSteps.findIndex(s => !s.completed) && (
                  <button 
                    className="continue-learning-btn"
                    onClick={() => handleContinueLearning(step.courseId)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 3L19 12L5 21V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Continue Learning
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPath;
