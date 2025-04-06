import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context
export const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      const role = localStorage.getItem('userRole');
      
      console.log('Auth Context - Initial Auth Status:', authStatus);
      console.log('Auth Context - Initial User Role:', role);
      
      setIsAuthenticated(authStatus);
      setUserRole(role);
      setIsLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  // Login function
  const login = (role) => {
    console.log('Auth Context - Logging in with role:', role);
    
    localStorage.setItem('userRole', role);
    localStorage.setItem('isAuthenticated', 'true');
    
    setIsAuthenticated(true);
    setUserRole(role);
    
    // Redirect based on role
    if (role === 'educator') {
      navigate('/educator/dashboard');
    } else {
      navigate('/explore');
    }
  };

  // Logout function
  const logout = () => {
    console.log('Auth Context - Logging out');
    
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    
    setIsAuthenticated(false);
    setUserRole(null);
    
    navigate('/');
  };

  // Provide the context value
  const contextValue = {
    isAuthenticated,
    userRole,
    isLoading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
