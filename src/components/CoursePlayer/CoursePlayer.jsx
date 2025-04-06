import { useState, useRef, useEffect } from 'react';
import './CoursePlayer.css';

const CoursePlayer = ({ courseId, lessonId, videoUrl, title, description, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [activeLessonId, setActiveLessonId] = useState(lessonId || 1);
  const [activeVideoUrl, setActiveVideoUrl] = useState(videoUrl);
  
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Mock lesson data with real videos for each lesson
  const [lessons] = useState([
    { 
      id: 1, 
      title: "Introduction to Blockchain", 
      duration: "10:15", 
      complete: true,
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    { 
      id: 2, 
      title: "Cryptographic Fundamentals", 
      duration: "15:30", 
      complete: false,
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    { 
      id: 3, 
      title: "Consensus Mechanisms", 
      duration: "12:45", 
      complete: false,
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    { 
      id: 4, 
      title: "Smart Contracts Overview", 
      duration: "18:20", 
      complete: false,
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
    },
  ]);

  // Change lesson when selected
  const handleLessonSelect = (lesson) => {
    setActiveLessonId(lesson.id);
    setActiveVideoUrl(lesson.videoUrl);
    
    // Reset video state
    setCurrentTime(0);
    setProgress(0);
    setIsPlaying(false);
    
    // If video ref exists, reset its state
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  };

  // Format time for display (MM:SS)
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle play/pause toggle
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle video progress updates
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / duration) * 100);
      
      // Auto-mark as complete when reaching 90% of the video
      if (current / duration >= 0.9 && onComplete) {
        onComplete(courseId, activeLessonId);
        
        // Update lesson complete status in lessons array
        const updatedLessons = lessons.map(lesson => 
          lesson.id === activeLessonId 
            ? { ...lesson, complete: true } 
            : lesson
        );
        // This won't persist due to useState, but in a real app it would update
      }
    }
  };

  // Handle seeking in the progress bar
  const handleSeek = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    
    if (videoRef.current && !isNaN(videoRef.current.duration)) {
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Set up video event listeners
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      videoElement.addEventListener('play', () => setIsPlaying(true));
      videoElement.addEventListener('pause', () => setIsPlaying(false));
      videoElement.addEventListener('loadedmetadata', () => {
        setDuration(videoElement.duration);
      });
      
      // Handle fullscreen change
      const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
      };
      
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      
      // Auto-hide controls after inactivity
      const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
          if (isPlaying) {
            setShowControls(false);
          }
        }, 3000);
      };
      
      playerRef.current.addEventListener('mousemove', handleMouseMove);
      playerRef.current.addEventListener('mouseleave', () => {
        if (isPlaying) {
          setShowControls(false);
        }
      });
      
      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
        videoElement.removeEventListener('play', () => setIsPlaying(true));
        videoElement.removeEventListener('pause', () => setIsPlaying(false));
        videoElement.removeEventListener('loadedmetadata', () => {
          setDuration(videoElement.duration);
        });
        document.removeEventListener('fullscreenchange', handleFullscreenChange);
        
        if (playerRef.current) {
          playerRef.current.removeEventListener('mousemove', handleMouseMove);
          playerRef.current.removeEventListener('mouseleave', () => {
            if (isPlaying) {
              setShowControls(false);
            }
          });
        }
        
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
      };
    }
  }, [isPlaying, courseId, activeLessonId, onComplete]);

  // Set the active lesson when lessonId prop changes
  useEffect(() => {
    if (lessonId) {
      setActiveLessonId(lessonId);
    }
  }, [lessonId]);

  // Update video source when activeVideoUrl changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [activeVideoUrl]);

  return (
    <div className="course-player-container">
      <div className="course-content">
        <div className={`video-player ${isFullscreen ? 'fullscreen' : ''}`} ref={playerRef}>
          <video
            ref={videoRef}
            src={activeVideoUrl || videoUrl}
            className="video-element"
            onClick={togglePlay}
          />
          
          <div className={`video-controls ${showControls ? 'visible' : ''}`}>
            <div className="progress-container" onClick={handleSeek}>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="time-display">
                <span>{formatTime(currentTime)}</span>
                <span> / </span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            
            <div className="controls-bottom">
              <button className="control-button" onClick={togglePlay}>
                {isPlaying ? (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4H6V20H10V4Z" fill="currentColor" />
                    <path d="M18 4H14V20H18V4Z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4L20 12L6 20V4Z" fill="currentColor" />
                  </svg>
                )}
              </button>
              
              <div className="volume-control">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="currentColor" />
                  {volume > 0 && (
                    <>
                      <path d="M15.54 8.46C16.15 9.07 16.5 9.89 16.5 10.75C16.5 11.61 16.16 12.43 15.55 13.04" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      {volume > 0.5 && (
                        <path d="M18.07 5.93C19.29 7.15 20 8.83 20 10.75C20 12.67 19.29 14.35 18.07 15.57" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      )}
                    </>
                  )}
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              </div>
              
              <button className="control-button" onClick={toggleFullscreen}>
                {isFullscreen ? (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 14H8V18H4V14Z" fill="currentColor" />
                    <path d="M16 14H20V18H16V14Z" fill="currentColor" />
                    <path d="M4 6H8V10H4V6Z" fill="currentColor" />
                    <path d="M16 6H20V10H16V6Z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 4H4V8M4 16V20H8M16 4H20V8M20 16V20H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="course-info">
          <h2 className="course-title">{title || "Blockchain Fundamentals"}</h2>
          <p className="course-description">
            {description || "Learn the foundational concepts of blockchain technology including distributed ledgers, consensus mechanisms, and cryptography."}
          </p>
        </div>
      </div>
      
      <div className="course-lessons">
        <h3 className="lessons-title">Course Content</h3>
        <ul className="lessons-list">
          {lessons.map((lesson) => (
            <li 
              key={lesson.id} 
              className={`lesson-item ${lesson.id === activeLessonId ? 'active' : ''} ${lesson.complete ? 'completed' : ''}`}
              onClick={() => handleLessonSelect(lesson)}
            >
              <div className="lesson-info">
                <div className="lesson-title-row">
                  {lesson.complete ? (
                    <svg className="lesson-status-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <div className="lesson-number">{lesson.id}</div>
                  )}
                  <span className="lesson-title-text">{lesson.title}</span>
                </div>
                <span className="lesson-duration">{lesson.duration}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoursePlayer; 