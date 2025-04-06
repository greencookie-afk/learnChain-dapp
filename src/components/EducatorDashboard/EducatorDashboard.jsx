import { useState, useEffect } from 'react';
import { useWallet } from '../../context/WalletContext';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import courseService from '../../services/courseService';
import './EducatorDashboard.css';

// Mock educator data
const mockEducatorData = {
  id: '0x123',
  name: 'Alex Smith',
  title: 'Blockchain Education Expert',
  bio: 'Teaching blockchain and Web3 development for 5+ years. Certified Ethereum developer with experience in DeFi and NFT projects.',
  courses: [
    {
      id: 101,
      title: 'Smart Contract Development',
      students: 124,
      revenue: 12.4,
      rating: 4.8,
      status: 'published',
      lastUpdated: '2023-04-01'
    },
    {
      id: 102,
      title: 'Web3 Authentication',
      students: 87,
      revenue: 8.7,
      rating: 4.6,
      status: 'published',
      lastUpdated: '2023-03-15'
    },
    {
      id: 103,
      title: 'NFT Marketplace Development',
      students: 0,
      revenue: 0,
      rating: 0,
      status: 'draft',
      lastUpdated: '2023-04-10'
    }
  ],
  analytics: {
    totalStudents: 211,
    totalRevenue: 21.1,
    averageRating: 4.7,
    completionRate: 68
  }
};

const EducatorDashboard = () => {
  const { account } = useWallet();
  const [educatorData, setEducatorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, courseId: null });
  const [publishConfirmation, setPublishConfirmation] = useState({ show: false, courseId: null });

  useEffect(() => {
    // Fetch educator data from the course service
    const fetchEducatorData = async () => {
      if (!account) return;

      try {
        setIsLoading(true);

        // Initialize the course service with the current signer
        if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          await courseService.initialize(signer);
        }

        // In the future, this will fetch real data from the blockchain
        // For now, we'll use the mock data from the service
        const courses = await courseService.getEducatorCourses('0x123');

        // Calculate analytics based on courses
        const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
        const totalRevenue = courses.reduce((sum, course) => sum + course.revenue, 0);
        const publishedCourses = courses.filter(course => course.status === 'published');
        const averageRating = publishedCourses.length > 0
          ? publishedCourses.reduce((sum, course) => sum + course.rating, 0) / publishedCourses.length
          : 0;

        const educatorData = {
          id: account,
          name: 'Alex Smith', // This would come from a profile service in the future
          title: 'Blockchain Education Expert',
          bio: 'Teaching blockchain and Web3 development for 5+ years. Certified Ethereum developer with experience in DeFi and NFT projects.',
          courses,
          analytics: {
            totalStudents,
            totalRevenue,
            averageRating: averageRating.toFixed(1),
            completionRate: 68 // This would be calculated from actual completion data
          }
        };

        setEducatorData(educatorData);
      } catch (error) {
        console.error('Error fetching educator data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEducatorData();
  }, [account]);

  // Handle course deletion
  const handleDeleteCourse = (courseId) => {
    // Show confirmation dialog
    setDeleteConfirmation({ show: true, courseId });
  };

  // Confirm course deletion
  const confirmDeleteCourse = async () => {
    try {
      setIsDeleting(true);
      const courseId = deleteConfirmation.courseId;

      // Call the course service to delete the course
      await courseService.deleteCourse(courseId);

      // Update the UI by removing the course from the list
      const updatedCourses = educatorData.courses.filter(course => course.id !== courseId);

      // Recalculate analytics
      const totalStudents = updatedCourses.reduce((sum, course) => sum + course.students, 0);
      const totalRevenue = updatedCourses.reduce((sum, course) => sum + course.revenue, 0);
      const publishedCourses = updatedCourses.filter(course => course.status === 'published');
      const averageRating = publishedCourses.length > 0
        ? publishedCourses.reduce((sum, course) => sum + course.rating, 0) / publishedCourses.length
        : 0;

      // Update educator data
      setEducatorData({
        ...educatorData,
        courses: updatedCourses,
        analytics: {
          ...educatorData.analytics,
          totalStudents,
          totalRevenue,
          averageRating: averageRating.toFixed(1)
        }
      });

      // Close the confirmation dialog
      setDeleteConfirmation({ show: false, courseId: null });

      // Show success message (in a real app, you would use a toast notification)
      alert('Course deleted successfully');
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Cancel course deletion
  const cancelDeleteCourse = () => {
    setDeleteConfirmation({ show: false, courseId: null });
  };

  // Handle course publishing
  const handlePublishCourse = (courseId) => {
    // Show confirmation dialog
    setPublishConfirmation({ show: true, courseId });
  };

  // Confirm course publishing
  const confirmPublishCourse = async () => {
    try {
      setIsPublishing(true);
      const courseId = publishConfirmation.courseId;

      // Call the course service to publish the course
      const updatedCourse = await courseService.publishCourse(courseId);

      // Update the UI by updating the course status
      const updatedCourses = educatorData.courses.map(course =>
        course.id === courseId ? { ...course, status: 'published' } : course
      );

      // Update educator data
      setEducatorData({
        ...educatorData,
        courses: updatedCourses
      });

      // Close the confirmation dialog
      setPublishConfirmation({ show: false, courseId: null });

      // Show success message (in a real app, you would use a toast notification)
      alert('Course published successfully');
    } catch (error) {
      console.error('Error publishing course:', error);
      alert('Failed to publish course. Please try again.');
    } finally {
      setIsPublishing(false);
    }
  };

  // Cancel course publishing
  const cancelPublishCourse = () => {
    setPublishConfirmation({ show: false, courseId: null });
  };

  if (isLoading) {
    return (
      <div className="educator-dashboard-container">
        <div className="loading-indicator">Loading educator data...</div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="educator-dashboard-container">
        <div className="wallet-connect-prompt">
          <h2>Connect Your Wallet</h2>
          <p>Please connect your wallet to access the educator dashboard.</p>
        </div>
      </div>
    );
  }

  if (!educatorData) {
    return (
      <div className="educator-dashboard-container">
        <div className="educator-signup">
          <h2>Become an Educator</h2>
          <p>You are not registered as an educator yet. Complete your profile to start creating courses.</p>
          <Link to="/educator/signup" className="primary-button">
            Complete Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="educator-dashboard-container">
      {/* Delete Confirmation Dialog */}
      {deleteConfirmation.show && (
        <div className="modal-overlay">
          <div className="confirmation-dialog">
            <div className="dialog-header">
              <h3>Delete Course</h3>
              <button className="close-button" onClick={cancelDeleteCourse}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="dialog-content">
              <p>Are you sure you want to delete this course? This action cannot be undone.</p>
              <p className="warning-text">Note: In the future, this will trigger a blockchain transaction to remove the course from the smart contract.</p>
            </div>
            <div className="dialog-actions">
              <button
                className="secondary-button"
                onClick={cancelDeleteCourse}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className="danger-button"
                onClick={confirmDeleteCourse}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete Course'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publish Confirmation Dialog */}
      {publishConfirmation.show && (
        <div className="modal-overlay">
          <div className="confirmation-dialog">
            <div className="dialog-header">
              <h3>Publish Course</h3>
              <button className="close-button" onClick={cancelPublishCourse}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="dialog-content">
              <p>Are you sure you want to publish this course? Once published, it will be available to all students.</p>
              <p className="info-text">Note: In the future, this will trigger a blockchain transaction to publish the course on the smart contract.</p>
            </div>
            <div className="dialog-actions">
              <button
                className="secondary-button"
                onClick={cancelPublishCourse}
                disabled={isPublishing}
              >
                Cancel
              </button>
              <button
                className="primary-button"
                onClick={confirmPublishCourse}
                disabled={isPublishing}
              >
                {isPublishing ? 'Publishing...' : 'Publish Course'}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="educator-header">
        <div className="educator-profile">
          <div className="educator-avatar">
            {educatorData.name.charAt(0)}
          </div>
          <div className="educator-info">
            <h1>{educatorData.name}</h1>
            <p className="educator-title">{educatorData.title}</p>
          </div>
        </div>
        <div className="educator-actions">
          <Link to="/educator/create-course" className="primary-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Create New Course
          </Link>
        </div>
      </div>

      <div className="analytics-overview">
        <div className="analytics-card">
          <div className="analytics-value">{educatorData.analytics.totalStudents}</div>
          <div className="analytics-label">Students</div>
        </div>
        <div className="analytics-card">
          <div className="analytics-value">{educatorData.analytics.totalRevenue} LRN</div>
          <div className="analytics-label">Revenue</div>
        </div>
        <div className="analytics-card">
          <div className="analytics-value">{educatorData.analytics.averageRating}</div>
          <div className="analytics-label">Avg. Rating</div>
        </div>
        <div className="analytics-card">
          <div className="analytics-value">{educatorData.analytics.completionRate}%</div>
          <div className="analytics-label">Completion</div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          My Courses
        </button>
        <button
          className={`tab-button ${activeTab === 'earnings' ? 'active' : ''}`}
          onClick={() => setActiveTab('earnings')}
        >
          Earnings
        </button>
        <button
          className={`tab-button ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          Students
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="dashboard-content">
          <section>
            <h2 className="section-title">Your Courses</h2>
            <div className="course-grid">
              {educatorData.courses.map(course => (
                <div key={course.id} className={`course-card ${course.status === 'draft' ? 'draft' : ''}`}>
                  <div className="course-card-header">
                    <h3>{course.title}</h3>
                    <span className={`status-badge ${course.status}`}>
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </span>
                  </div>
                  <div className="course-metrics">
                    <div className="metric">
                      <span className="metric-value">{course.students}</span>
                      <span className="metric-label">Students</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">{course.revenue} LRN</span>
                      <span className="metric-label">Revenue</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">{course.rating > 0 ? course.rating : '-'}</span>
                      <span className="metric-label">Rating</span>
                    </div>
                  </div>
                  <div className="course-card-footer">
                    <span className="last-updated">Updated: {course.lastUpdated}</span>
                    <div className="course-actions">
                      <Link to={`/educator/edit-course/${course.id}`} className="action-button">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Edit
                      </Link>
                      {course.status === 'draft' ? (
                        <button
                          className="action-button publish"
                          onClick={() => handlePublishCourse(course.id)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Publish
                        </button>
                      ) : (
                        <Link to={`/educator/course-analytics/${course.id}`} className="action-button">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Analytics
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="course-card add-course">
                <Link to="/educator/create-course" className="add-course-button">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Create New Course</span>
                </Link>
              </div>
            </div>
          </section>

          <section className="recent-activity">
            <h2 className="section-title">Recent Activity</h2>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon enrollment">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="activity-content">
                  <div className="activity-title">New enrollment in <span className="highlight">Smart Contract Development</span></div>
                  <div className="activity-time">10 minutes ago</div>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon review">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="activity-content">
                  <div className="activity-title">New 5-star review on <span className="highlight">Web3 Authentication</span></div>
                  <div className="activity-time">1 hour ago</div>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon payment">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 10h20M8 15h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="activity-content">
                  <div className="activity-title">Received payment of <span className="highlight">0.5 LRN</span></div>
                  <div className="activity-time">3 hours ago</div>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon certificate">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 17l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 11l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="activity-content">
                  <div className="activity-title">Student completed <span className="highlight">Smart Contract Development</span></div>
                  <div className="activity-time">Yesterday</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'courses' && (
        <div className="dashboard-content">
          <div className="courses-filters">
            <input
              type="text"
              placeholder="Search courses..."
              className="search-input"
            />
            <select className="filter-select">
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <select className="filter-select">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="popular">Most Popular</option>
              <option value="revenue">Highest Revenue</option>
            </select>
          </div>

          <div className="courses-table">
            <table>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Status</th>
                  <th>Students</th>
                  <th>Revenue</th>
                  <th>Rating</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {educatorData.courses.map(course => (
                  <tr key={course.id} className={course.status === 'draft' ? 'draft-row' : ''}>
                    <td>
                      <Link to={`/educator/edit-course/${course.id}`} className="course-name-link">
                        {course.title}
                      </Link>
                    </td>
                    <td>
                      <span className={`status-badge ${course.status}`}>
                        {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                      </span>
                    </td>
                    <td>{course.students}</td>
                    <td>{course.revenue} LRN</td>
                    <td>{course.rating > 0 ? course.rating : '-'}</td>
                    <td>{course.lastUpdated}</td>
                    <td>
                      <div className="table-actions">
                        <Link to={`/educator/edit-course/${course.id}`} className="icon-button" title="Edit">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                        {course.status === 'draft' ? (
                          <button
                            className="icon-button"
                            title="Publish"
                            onClick={() => handlePublishCourse(course.id)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 11V17M5 17h14v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M9 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        ) : (
                          <Link to={`/educator/course-analytics/${course.id}`} className="icon-button" title="Analytics">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Link>
                        )}
                        <button
                          className="icon-button danger"
                          title="Delete"
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'earnings' && (
        <div className="dashboard-content">
          <div className="earnings-header">
            <div className="earnings-summary">
              <h2 className="section-title">Earnings Summary</h2>
              <div className="earnings-total">
                <span className="total-value">{educatorData.analytics.totalRevenue} LRN</span>
                <span className="total-label">Total Earnings</span>
              </div>
            </div>
            <div className="earnings-filters">
              <select className="filter-select">
                <option value="all">All Time</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>

          <div className="earnings-chart">
            {/* Chart would go here - using a placeholder */}
            <div className="chart-placeholder">
              <p>Earnings Chart - This would be implemented with a charting library like Chart.js or recharts</p>
            </div>
          </div>

          <h3 className="subsection-title">Transaction History</h3>
          <div className="transactions-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Course</th>
                  <th>Student</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2023-04-15</td>
                  <td>Smart Contract Development</td>
                  <td>0x7a...3f21</td>
                  <td>0.1 LRN</td>
                  <td><span className="status-badge success">Completed</span></td>
                </tr>
                <tr>
                  <td>2023-04-14</td>
                  <td>Web3 Authentication</td>
                  <td>0x3b...9e12</td>
                  <td>0.1 LRN</td>
                  <td><span className="status-badge success">Completed</span></td>
                </tr>
                <tr>
                  <td>2023-04-12</td>
                  <td>Smart Contract Development</td>
                  <td>0x5f...7d25</td>
                  <td>0.1 LRN</td>
                  <td><span className="status-badge success">Completed</span></td>
                </tr>
                <tr>
                  <td>2023-04-10</td>
                  <td>Web3 Authentication</td>
                  <td>0x2c...8a47</td>
                  <td>0.1 LRN</td>
                  <td><span className="status-badge success">Completed</span></td>
                </tr>
                <tr>
                  <td>2023-04-09</td>
                  <td>Smart Contract Development</td>
                  <td>0x9d...4e36</td>
                  <td>0.1 LRN</td>
                  <td><span className="status-badge success">Completed</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'students' && (
        <div className="dashboard-content">
          <div className="students-header">
            <h2 className="section-title">Student Management</h2>
            <div className="students-filters">
              <input
                type="text"
                placeholder="Search students..."
                className="search-input"
              />
              <select className="filter-select">
                <option value="all">All Courses</option>
                <option value="101">Smart Contract Development</option>
                <option value="102">Web3 Authentication</option>
              </select>
            </div>
          </div>

          <div className="students-table">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Enrollment Date</th>
                  <th>Progress</th>
                  <th>Last Activity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0x7a...3f21</td>
                  <td>Smart Contract Development</td>
                  <td>2023-04-15</td>
                  <td>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '75%' }}></div>
                      <span>75%</span>
                    </div>
                  </td>
                  <td>2 hours ago</td>
                  <td>
                    <div className="table-actions">
                      <button className="icon-button" title="Message">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>0x3b...9e12</td>
                  <td>Web3 Authentication</td>
                  <td>2023-04-14</td>
                  <td>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '30%' }}></div>
                      <span>30%</span>
                    </div>
                  </td>
                  <td>1 day ago</td>
                  <td>
                    <div className="table-actions">
                      <button className="icon-button" title="Message">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>0x5f...7d25</td>
                  <td>Smart Contract Development</td>
                  <td>2023-04-12</td>
                  <td>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '100%' }}></div>
                      <span>100%</span>
                    </div>
                  </td>
                  <td>3 days ago</td>
                  <td>
                    <div className="table-actions">
                      <button className="icon-button" title="Message">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducatorDashboard;