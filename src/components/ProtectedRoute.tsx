import React, { useEffect, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';
import LoadingSpinner from './LoadingSpinner';

/**
 * Props interface for the ProtectedRoute component
 */
interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * ProtectedRoute component to secure routes that require authentication
 * Redirects to login page if user is not authenticated
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    // Show loading state while checking authentication
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#f5f5f5'
      }}>
        <LoadingSpinner message="Verifying authentication..." />
      </div>
    );
  }

  if (!user) {
    // Redirect to login page if not authenticated
    // Store the attempted URL for redirecting after successful login
    return <Navigate to="/ids-login" state={{ from: location }} replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
