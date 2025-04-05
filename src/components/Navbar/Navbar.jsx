import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../../context/WalletContext';
import WalletConnect from '../WalletConnect/WalletConnect';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { account } = useWallet();
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
        <Link to="/explore" className={`nav-link ${isActive('/explore') ? 'active' : ''}`}>Explore</Link>
        <Link to="/my-courses" className={`nav-link ${isActive('/my-courses') ? 'active' : ''}`}>My Courses</Link>
        <Link to="/certificates" className={`nav-link ${isActive('/certificates') ? 'active' : ''}`}>Certificates</Link>
        {account && (
          <Link to="/educator/dashboard" className={`nav-link ${isActive('/educator') ? 'active' : ''}`}>
            Educator
          </Link>
        )}
        <WalletConnect />
      </nav>
    </header>
  );
};

export default Navbar; 