import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWallet } from '../../context/WalletContext';
import './CourseCreator.css';

const CourseCreator = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { account } = useWallet();
  const isEditing = !!courseId;
  
  const [isLoading, setIsLoading] = useState(isEditing);
  const [activeSection, setActiveSection] = useState('details');
  const [course, setCourse] = useState({
    title: '',
    description: '',
    price: 0.1,
    category: 'blockchain',
    level: 'beginner',
    image: '',
    estimatedDuration: '4h 30m',
    requirements: ['Basic understanding of blockchain', 'JavaScript knowledge'],
    learningOutcomes: ['Understand blockchain fundamentals', 'Create simple smart contracts'],
    sections: [
      {
        id: 1,
        title: 'Introduction',
        lessons: [
          {
            id: 1,
            title: 'What is Blockchain?',
            type: 'video',
            content: '',
            duration: '15m',
            isPreview: true
          },
          {
            id: 2,
            title: 'Key Blockchain Concepts',
            type: 'document',
            content: '',
            duration: '20m',
            isPreview: false
          }
        ]
      }
    ]
  });
  
  useEffect(() => {
    if (isEditing) {
      // Fetch course data based on courseId
      setIsLoading(true);
      
      // Simulating API/blockchain call
      setTimeout(() => {
        // Mock course data
        const mockCourse = {
          id: parseInt(courseId),
          title: 'Smart Contract Development',
          description: 'Learn how to create, test, and deploy smart contracts for Ethereum-based blockchain applications.',
          price: 0.15,
          category: 'development',
          level: 'intermediate',
          image: 'https://placehold.co/600x400/5e35b1/ffffff?text=Smart+Contracts',
          estimatedDuration: '8h 45m',
          requirements: [
            'Basic understanding of blockchain',
            'JavaScript knowledge',
            'Understanding of Web3 concepts'
          ],
          learningOutcomes: [
            'Understand the Solidity programming language',
            'Create and test smart contracts',
            'Deploy contracts to Ethereum networks',
            'Integrate contracts with frontend applications'
          ],
          sections: [
            {
              id: 1,
              title: 'Solidity Basics',
              lessons: [
                {
                  id: 1,
                  title: 'Introduction to Solidity',
                  type: 'video',
                  content: 'https://example.com/video1.mp4',
                  duration: '25m',
                  isPreview: true
                },
                {
                  id: 2,
                  title: 'Data Types and Variables',
                  type: 'document',
                  content: '# Data Types in Solidity\n\nThis lesson covers the various data types available in Solidity...',
                  duration: '30m',
                  isPreview: false
                }
              ]
            },
            {
              id: 2,
              title: 'Smart Contract Structure',
              lessons: [
                {
                  id: 3,
                  title: 'Creating a Token Contract',
                  type: 'video',
                  content: 'https://example.com/video2.mp4',
                  duration: '35m',
                  isPreview: false
                },
                {
                  id: 4,
                  title: 'Implementing ERC20 Standard',
                  type: 'interactive',
                  content: 'code-exercise-1',
                  duration: '45m',
                  isPreview: false
                }
              ]
            }
          ]
        };
        
        setCourse(mockCourse);
        setIsLoading(false);
      }, 1000);
    }
  }, [courseId, isEditing]);
  
  if (!account) {
    return (
      <div className="course-creator-container">
        <div className="wallet-connect-prompt">
          <h2>Connect Your Wallet</h2>
          <p>Please connect your wallet to access the course creator.</p>
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="course-creator-container">
        <div className="loading-indicator">Loading course data...</div>
      </div>
    );
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePriceChange = (e) => {
    let value = parseFloat(e.target.value);
    value = isNaN(value) ? 0 : value;
    setCourse(prev => ({ ...prev, price: value }));
  };
  
  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...course.requirements];
    updatedRequirements[index] = value;
    setCourse(prev => ({ ...prev, requirements: updatedRequirements }));
  };
  
  const addRequirement = () => {
    setCourse(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };
  
  const removeRequirement = (index) => {
    const updatedRequirements = [...course.requirements];
    updatedRequirements.splice(index, 1);
    setCourse(prev => ({ ...prev, requirements: updatedRequirements }));
  };
  
  const handleLearningOutcomeChange = (index, value) => {
    const updatedOutcomes = [...course.learningOutcomes];
    updatedOutcomes[index] = value;
    setCourse(prev => ({ ...prev, learningOutcomes: updatedOutcomes }));
  };
  
  const addLearningOutcome = () => {
    setCourse(prev => ({
      ...prev,
      learningOutcomes: [...prev.learningOutcomes, '']
    }));
  };
  
  const removeLearningOutcome = (index) => {
    const updatedOutcomes = [...course.learningOutcomes];
    updatedOutcomes.splice(index, 1);
    setCourse(prev => ({ ...prev, learningOutcomes: updatedOutcomes }));
  };
  
  const handleSectionTitleChange = (sectionIndex, value) => {
    const updatedSections = [...course.sections];
    updatedSections[sectionIndex].title = value;
    setCourse(prev => ({ ...prev, sections: updatedSections }));
  };
  
  const addSection = () => {
    const newSection = {
      id: course.sections.length + 1,
      title: `Section ${course.sections.length + 1}`,
      lessons: []
    };
    
    setCourse(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };
  
  const removeSection = (sectionIndex) => {
    const updatedSections = [...course.sections];
    updatedSections.splice(sectionIndex, 1);
    setCourse(prev => ({ ...prev, sections: updatedSections }));
  };
  
  const handleLessonChange = (sectionIndex, lessonIndex, field, value) => {
    const updatedSections = [...course.sections];
    updatedSections[sectionIndex].lessons[lessonIndex][field] = value;
    setCourse(prev => ({ ...prev, sections: updatedSections }));
  };
  
  const addLesson = (sectionIndex) => {
    const updatedSections = [...course.sections];
    const newLesson = {
      id: updatedSections[sectionIndex].lessons.length + 1,
      title: `New Lesson`,
      type: 'video',
      content: '',
      duration: '15m',
      isPreview: false
    };
    
    updatedSections[sectionIndex].lessons.push(newLesson);
    setCourse(prev => ({ ...prev, sections: updatedSections }));
  };
  
  const removeLesson = (sectionIndex, lessonIndex) => {
    const updatedSections = [...course.sections];
    updatedSections[sectionIndex].lessons.splice(lessonIndex, 1);
    setCourse(prev => ({ ...prev, sections: updatedSections }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate course data
    if (!course.title || !course.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    // In a real app, this would create or update a course on the blockchain
    console.log('Submitting course:', course);
    
    // Navigate back to the educator dashboard
    navigate('/educator/dashboard');
  };
  
  const handleSaveDraft = () => {
    // Save course as draft
    console.log('Saving draft:', course);
    
    // Navigate back to the educator dashboard
    navigate('/educator/dashboard');
  };
  
  const handleCancel = () => {
    // Confirm before navigating away
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate('/educator/dashboard');
    }
  };
  
  return (
    <div className="course-creator-container">
      <div className="course-creator-header">
        <h1>{isEditing ? 'Edit Course' : 'Create New Course'}</h1>
        <div className="creator-actions">
          <button className="secondary-button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="secondary-button" onClick={handleSaveDraft}>
            Save Draft
          </button>
          <button className="primary-button" onClick={handleSubmit}>
            {isEditing ? 'Update Course' : 'Create Course'}
          </button>
        </div>
      </div>
      
      <div className="creator-tabs">
        <button 
          className={`tab-button ${activeSection === 'details' ? 'active' : ''}`}
          onClick={() => setActiveSection('details')}
        >
          Course Details
        </button>
        <button 
          className={`tab-button ${activeSection === 'curriculum' ? 'active' : ''}`}
          onClick={() => setActiveSection('curriculum')}
        >
          Curriculum
        </button>
        <button 
          className={`tab-button ${activeSection === 'pricing' ? 'active' : ''}`}
          onClick={() => setActiveSection('pricing')}
        >
          Pricing & Settings
        </button>
      </div>
      
      <div className="creator-content">
        {activeSection === 'details' && (
          <div className="creator-section">
            <h2 className="section-title">Course Details</h2>
            
            <div className="form-group">
              <label htmlFor="title">Course Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={course.title}
                onChange={handleInputChange}
                placeholder="Enter a clear and concise title"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Course Description *</label>
              <textarea
                id="description"
                name="description"
                value={course.description}
                onChange={handleInputChange}
                placeholder="Describe what students will learn in this course"
                rows="5"
                required
              ></textarea>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={course.category}
                  onChange={handleInputChange}
                >
                  <option value="blockchain">Blockchain</option>
                  <option value="development">Development</option>
                  <option value="defi">DeFi</option>
                  <option value="nfts">NFTs</option>
                  <option value="trading">Trading</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="level">Level</label>
                <select
                  id="level"
                  name="level"
                  value={course.level}
                  onChange={handleInputChange}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="image">Course Image URL</label>
              <input
                type="text"
                id="image"
                name="image"
                value={course.image}
                onChange={handleInputChange}
                placeholder="Enter a URL for your course image"
              />
              {course.image && (
                <div className="image-preview">
                  <img src={course.image} alt="Course preview" />
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="estimatedDuration">Estimated Duration</label>
              <input
                type="text"
                id="estimatedDuration"
                name="estimatedDuration"
                value={course.estimatedDuration}
                onChange={handleInputChange}
                placeholder="e.g., 4h 30m"
              />
            </div>
            
            <div className="form-group">
              <label>Requirements</label>
              {course.requirements.map((requirement, index) => (
                <div key={index} className="array-item">
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    placeholder="What should students know before starting?"
                  />
                  <button 
                    type="button" 
                    className="remove-item"
                    onClick={() => removeRequirement(index)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                className="add-item"
                onClick={addRequirement}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add Requirement
              </button>
            </div>
            
            <div className="form-group">
              <label>Learning Outcomes</label>
              {course.learningOutcomes.map((outcome, index) => (
                <div key={index} className="array-item">
                  <input
                    type="text"
                    value={outcome}
                    onChange={(e) => handleLearningOutcomeChange(index, e.target.value)}
                    placeholder="What will students learn?"
                  />
                  <button 
                    type="button" 
                    className="remove-item"
                    onClick={() => removeLearningOutcome(index)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                className="add-item"
                onClick={addLearningOutcome}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add Learning Outcome
              </button>
            </div>
          </div>
        )}
        
        {activeSection === 'curriculum' && (
          <div className="creator-section">
            <h2 className="section-title">Course Curriculum</h2>
            
            <div className="curriculum-container">
              {course.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="curriculum-section">
                  <div className="section-header">
                    <div className="section-info">
                      <h3>Section {sectionIndex + 1}</h3>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => handleSectionTitleChange(sectionIndex, e.target.value)}
                        placeholder="Section Title"
                      />
                    </div>
                    <button 
                      type="button" 
                      className="remove-section"
                      onClick={() => removeSection(sectionIndex)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="lessons-container">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <div key={lessonIndex} className="lesson-item">
                        <div className="lesson-header">
                          <div className="lesson-info">
                            <input
                              type="text"
                              value={lesson.title}
                              onChange={(e) => handleLessonChange(sectionIndex, lessonIndex, 'title', e.target.value)}
                              placeholder="Lesson Title"
                            />
                          </div>
                          <div className="lesson-actions">
                            <select
                              value={lesson.type}
                              onChange={(e) => handleLessonChange(sectionIndex, lessonIndex, 'type', e.target.value)}
                            >
                              <option value="video">Video</option>
                              <option value="document">Document</option>
                              <option value="interactive">Interactive</option>
                              <option value="quiz">Quiz</option>
                            </select>
                            <input
                              type="text"
                              value={lesson.duration}
                              onChange={(e) => handleLessonChange(sectionIndex, lessonIndex, 'duration', e.target.value)}
                              placeholder="Duration"
                              className="duration-input"
                            />
                            <label className="preview-toggle">
                              <input
                                type="checkbox"
                                checked={lesson.isPreview}
                                onChange={(e) => handleLessonChange(sectionIndex, lessonIndex, 'isPreview', e.target.checked)}
                              />
                              Preview
                            </label>
                            <button 
                              type="button" 
                              className="remove-lesson"
                              onClick={() => removeLesson(sectionIndex, lessonIndex)}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <div className="lesson-content">
                          {lesson.type === 'document' ? (
                            <textarea
                              value={lesson.content}
                              onChange={(e) => handleLessonChange(sectionIndex, lessonIndex, 'content', e.target.value)}
                              placeholder="Enter content in Markdown format"
                              rows="5"
                            ></textarea>
                          ) : (
                            <input
                              type="text"
                              value={lesson.content}
                              onChange={(e) => handleLessonChange(sectionIndex, lessonIndex, 'content', e.target.value)}
                              placeholder={`Enter ${lesson.type} URL or content ID`}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                    
                    <button 
                      type="button" 
                      className="add-lesson"
                      onClick={() => addLesson(sectionIndex)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Add Lesson
                    </button>
                  </div>
                </div>
              ))}
              
              <button 
                type="button" 
                className="add-section"
                onClick={addSection}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add Section
              </button>
            </div>
          </div>
        )}
        
        {activeSection === 'pricing' && (
          <div className="creator-section">
            <h2 className="section-title">Pricing & Settings</h2>
            
            <div className="form-group">
              <label htmlFor="price">Course Price (LRN)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={course.price}
                onChange={handlePriceChange}
                min="0"
                step="0.01"
              />
              <p className="pricing-note">
                Set a competitive price for your course. The platform fee is 10%.
              </p>
            </div>
            
            <div className="pricing-estimator">
              <h3>Price Breakdown</h3>
              <div className="price-breakdown">
                <div className="breakdown-item">
                  <span>Your Price</span>
                  <span>{course.price} LRN</span>
                </div>
                <div className="breakdown-item">
                  <span>Platform Fee (10%)</span>
                  <span>{(course.price * 0.1).toFixed(3)} LRN</span>
                </div>
                <div className="breakdown-item total">
                  <span>You Receive</span>
                  <span>{(course.price * 0.9).toFixed(3)} LRN</span>
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <h3>Certificate Settings</h3>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" defaultChecked />
                  Issue NFT certificates to students who complete the course
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="course-creator-footer">
        <div className="creator-actions">
          <button className="secondary-button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="secondary-button" onClick={handleSaveDraft}>
            Save Draft
          </button>
          <button className="primary-button" onClick={handleSubmit}>
            {isEditing ? 'Update Course' : 'Create Course'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCreator; 