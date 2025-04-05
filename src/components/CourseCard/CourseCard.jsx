import { useState } from 'react';
import NFTPurchase from '../NFTPurchase/NFTPurchase';
import './CourseCard.css';

const CourseCard = ({ 
  id,
  title, 
  description, 
  price, 
  image, 
  onEnroll, 
  enrolled = false,
  progress = 0,
  duration = '3h 45m',
  lessons = 12,
  level = 'Beginner'
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);
  
  const handlePurchaseClick = (e) => {
    e.stopPropagation();
    setShowPurchase(!showPurchase);
  };
  
  const handleCardClick = () => {
    setExpanded(!expanded);
  };
  
  const handlePurchaseComplete = (courseId) => {
    setShowPurchase(false);
    if (onEnroll) {
      onEnroll(courseId);
    }
  };
  
  return (
    <div className={`course-card ${expanded ? 'expanded' : ''}`}>
      <div className="card-clickable" onClick={handleCardClick}>
        {image && (
          <div className="course-image-container">
            <img src={image} alt={title} className="course-image" />
            <div className="course-level">
              <span className={`level-badge level-${level.toLowerCase()}`}>
                {level}
              </span>
            </div>
          </div>
        )}
        
        <div className="course-content">
          <h3 className="course-title">{title}</h3>
          
          <div className="course-meta">
            <div className="course-meta-item">
              <svg className="course-meta-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              </svg>
              {duration}
            </div>
            <div className="course-meta-item">
              <svg className="course-meta-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {lessons} lessons
            </div>
          </div>
          
          <p className={`course-description ${expanded ? 'expanded' : ''}`}>{description}</p>
          
          {enrolled && (
            <div className="progress-container">
              <div className="progress-text">
                <span>{progress}% completed</span>
                {progress === 100 && (
                  <span className="certificate-earned">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Certificate Earned
                  </span>
                )}
              </div>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="course-footer">
        <div className="price-container">
          <span className="course-price">
            <svg className="lrn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1v7.5M12 22v-7.5M3.75 6.5l6.5 3.75M20.25 17.5l-6.5-3.75M3.75 17.5l6.5-3.75M20.25 6.5l-6.5 3.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {price} LRN
          </span>
        </div>
        
        {!enrolled ? (
          <button 
            className="enroll-button" 
            onClick={handlePurchaseClick}
          >
            {showPurchase ? 'Hide Details' : 'Enroll Now'}
          </button>
        ) : (
          <button className="continue-button">
            <svg className="continue-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3L19 12L5 21V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Continue Learning
          </button>
        )}
      </div>
      
      {showPurchase && !enrolled && (
        <div className="purchase-section">
          <NFTPurchase 
            courseId={id} 
            courseTitle={title} 
            price={price} 
            onPurchaseComplete={handlePurchaseComplete}
          />
        </div>
      )}
    </div>
  );
};

export default CourseCard; 