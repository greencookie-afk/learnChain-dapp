import './CourseCard.css';

const CourseCard = ({ 
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
  return (
    <div className="course-card">
      {image && <img src={image} alt={title} className="course-image" />}
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
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {lessons} lessons
          </div>
          <div className="course-meta-item">
            <svg className="course-meta-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 5V19L11 14L17.5 19V5H4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
            {level}
          </div>
        </div>
        
        <p className="course-description">{description}</p>
        
        {enrolled && (
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        )}
        
        <div className="course-footer">
          <span className="course-price">
            <svg className="eth-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L19 12L12 16L5 12L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 12L12 22L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {price} ETH
          </span>
          
          {!enrolled ? (
            <button className="enroll-button" onClick={onEnroll}>
              Enroll Now
            </button>
          ) : (
            <button className="enroll-button">
              Continue Learning
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard; 