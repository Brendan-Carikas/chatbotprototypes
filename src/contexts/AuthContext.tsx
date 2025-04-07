import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  UserCredential,
  AuthError,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { auth } from '../firebase';

// Define interfaces for our context types
interface AuthContextType {
  user: User | DemoUser | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<AuthResult>;
  loginWithIDS: (username: string, password: string, rememberMe?: boolean) => Promise<AuthResult>;
  logout: () => Promise<boolean>;
  signup: (email: string, password: string, rememberMe?: boolean) => Promise<AuthResult>;
  loading: boolean;
  isDemoMode: boolean;
}

// Interface for our demo user
interface DemoUser {
  email: string;
  uid: string;
}

// Interface for authentication results
interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
  message?: string;
}

// Props interface for the AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | DemoUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const navigate = useNavigate();
  
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<AuthResult> => {
    try {
      // Demo mode login
      if (email === 'Demo' && password === 'Demo') {
        const demoUser: DemoUser = { email: 'Demo', uid: 'demo-user-id' };
        setUser(demoUser);
        setIsDemoMode(true);
        navigate('/app/dashboards/dashboard2');
        return { success: true };
      }
      
      // Set persistence based on rememberMe
      const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistenceType);
      
      // Firebase Auth login
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      setIsDemoMode(false);
      navigate('/app/dashboards/dashboard2');
      return { success: true, user: userCredential.user };
    } catch (error) {
      const authError = error as AuthError;
      console.error('Error logging in:', authError.message);
      return { success: false, error: authError.code, message: authError.message };
    }
  };

  // Specific login method for IDS login page
  const loginWithIDS = async (username: string, password: string, rememberMe: boolean = false): Promise<AuthResult> => {
    try {
      // Set persistence based on rememberMe
      const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistenceType);
      
      // Firebase Auth login
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, username, password);
      setIsDemoMode(false);
      // We don't navigate here anymore - the IDSLogin component handles navigation
      return { success: true, user: userCredential.user };
    } catch (error) {
      const authError = error as AuthError;
      console.error('Error logging in with IDS:', authError.message);
      return { 
        success: false, 
        error: authError.code, 
        message: authError.message 
      };
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      if (isDemoMode) {
        setUser(null);
        setIsDemoMode(false);
      } else {
        await signOut(auth);
      }
      // Redirect to IDS login page instead of the standard login
      navigate('/ids-login');
      return true;
    } catch (error) {
      const authError = error as AuthError;
      console.error('Error logging out:', authError.message);
      return false;
    }
  };

  const signup = async (email: string, password: string, rememberMe: boolean = false): Promise<AuthResult> => {
    try {
      // Demo mode signup
      if (email === 'Demo' && password === 'Demo') {
        const demoUser: DemoUser = { email: 'Demo', uid: 'demo-user-id' };
        setUser(demoUser);
        setIsDemoMode(true);
        navigate('/app/dashboards/dashboard2');
        return { success: true };
      }
      
      // Set persistence based on rememberMe
      const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistenceType);
      
      // Firebase Auth signup
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      setIsDemoMode(false);
      navigate('/app/dashboards/dashboard2');
      return { success: true, user: userCredential.user };
    } catch (error) {
      const authError = error as AuthError;
      console.error('Error signing up:', authError.message);
      return { success: false, error: authError.code, message: authError.message };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      loginWithIDS, 
      logout, 
      signup, 
      loading,
      isDemoMode
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
