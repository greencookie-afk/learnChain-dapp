import { Link } from 'react-router-dom';
import WalletConnect from '../WalletConnect/WalletConnect';
import './Navbar.css';

const Navbar = () => {
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
      <nav className="navbar-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/explore" className="nav-link">Explore</Link>
        <Link to="/my-courses" className="nav-link">My Courses</Link>
        <WalletConnect />
      </nav>
    </header>
  );
};

export default Navbar; 