import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { WalletContext } from '../../context/WalletContext';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const [role, setRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { connectWallet, account, isConnecting } = useContext(WalletContext);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Effect to handle successful wallet connection
  useEffect(() => {
    // If wallet is connected and we're in loading state, proceed with login
    if (account && isLoading && !isConnecting) {
      console.log('Wallet connected, proceeding with login');
      // In a real app, we would verify the user's role on the blockchain
      // For now, we'll just use the selected role
      login(role);
      console.log('Login successful with role:', role);
      setIsLoading(false);
    }
  }, [account, isLoading, isConnecting, login, role]);

  // Effect to handle authentication state changes
  useEffect(() => {
    if (isAuthenticated) {
      // If already authenticated, redirect based on role
      const userRole = localStorage.getItem('userRole');
      if (userRole === 'educator') {
        navigate('/educator/dashboard');
      } else if (userRole === 'student') {
        navigate('/explore');
      }
    }
  }, [isAuthenticated, navigate]);

  // Function to handle role selection
  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  // Function to handle login
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // If already connected, proceed with login
      if (account) {
        login(role);
        console.log('Already connected, login successful with role:', role);
        setIsLoading(false);
        return;
      }

      // Connect wallet - the useEffect will handle the login after connection
      await connectWallet();

      // If connection failed immediately
      if (!account && !isConnecting) {
        setError('Failed to connect wallet. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome to LearnChain</h2>
          <p>Connect your wallet to access the platform</p>
        </div>

        <div className="role-selector">
          <h3>I am a:</h3>
          <div className="role-options">
            <div
              className={`role-option ${role === 'student' ? 'active' : ''}`}
              onClick={() => handleRoleChange('student')}
            >
              <div className="role-icon student-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 15V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Student</span>
              <p>Access courses and earn certificates</p>
            </div>

            <div
              className={`role-option ${role === 'educator' ? 'active' : ''}`}
              onClick={() => handleRoleChange('educator')}
            >
              <div className="role-icon educator-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Educator</span>
              <p>Create and manage courses</p>
            </div>
          </div>
        </div>

        <div className="wallet-connect">
          {account ? (
            <div className="wallet-connected">
              <div className="wallet-status connected">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Wallet Connected</span>
              </div>
              <div className="wallet-address">
                {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
              </div>
              <button
                className="continue-button"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : `Continue as ${role === 'educator' ? 'Educator' : 'Student'}`}
              </button>
            </div>
          ) : (
            <button
              className="connect-wallet-button"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12V7H5C3.89543 7 3 6.10457 3 5V19C3 20.1046 3.89543 21 5 21H21V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 12H9M9 12L12 9M9 12L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Connect Wallet
                </>
              )}
            </button>
          )}

          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="login-footer">
          <p>By connecting your wallet, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></p>
        </div>
      </div>

      <div className="login-features">
        <div className="feature">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>Decentralized Learning</h3>
          <p>Access courses stored on a decentralized network, ensuring censorship resistance and permanent availability.</p>
        </div>

        <div className="feature">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h3>Verified Credentials</h3>
          <p>Earn blockchain-verified certificates as NFTs that can be easily shared and verified by employers.</p>
        </div>

        <div className="feature">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>Token Economy</h3>
          <p>Use LRN tokens for course purchases, educator payments, and governance voting.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
