import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useWallet } from '../../context/WalletContext';
import WalletConnect from '../WalletConnect/WalletConnect';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { account, disconnectWallet } = useWallet();

  useEffect(() => {
    // Check authentication status from localStorage
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const role = localStorage.getItem('userRole');

    console.log('Auth status:', authStatus);
    console.log('User role:', role);

    setIsAuthenticated(authStatus);
    setUserRole(role);
  }, [account]);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');

    // Disconnect wallet
    disconnectWallet();

    // Update state
    setIsAuthenticated(false);
    setUserRole(null);

    // Navigate to home
    navigate('/');
  };

  return (
    <header className="navbar">
      <h1 className="navbar-logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <Link to="/">LearnChain</Link>
      </h1>

      <button className="mobile-menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`navbar-nav ${menuOpen ? 'show' : ''}`}>
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
        <Link to="/documentation" className={`nav-link ${isActive('/documentation') ? 'active' : ''}`}>Docs</Link>

        {isAuthenticated && (
          <>
            <Link to="/explore" className={`nav-link ${isActive('/explore') ? 'active' : ''}`}>Explore</Link>

            {userRole === 'student' && (
              <>
                <Link to="/my-courses" className={`nav-link ${isActive('/my-courses') ? 'active' : ''}`}>My Courses</Link>
                <Link to="/certificates" className={`nav-link ${isActive('/certificates') ? 'active' : ''}`}>Certificates</Link>
              </>
            )}

            {userRole === 'educator' && (
              <Link to="/educator/dashboard" className={`nav-link ${isActive('/educator') ? 'active' : ''}`}>
                Educator Dashboard
              </Link>
            )}
          </>
        )}

        <div className="nav-auth">
          {isAuthenticated && (
            <div className="user-role-indicator">
              {userRole === 'student' ? '👨‍🎓 Student' : '👨‍🏫 Educator'}
            </div>
          )}

          {isAuthenticated ? (
            <button className="logout-button" onClick={handleLogout}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Logout
            </button>
          ) : (
            <Link to="/login" className="login-button">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 17L15 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Login
            </Link>
          )}

          {isAuthenticated && <WalletConnect />}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;