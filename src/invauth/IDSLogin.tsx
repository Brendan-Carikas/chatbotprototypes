import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";

import { useAuth } from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// Use a dynamic path that works in both local and GitHub Pages environments
const basePath = import.meta.env.BASE_URL || '/';
const InvotraLogo = `${basePath}InvotraLogo.png`;

// Define interfaces for form data and auth result
interface FormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface AuthResult {
  success: boolean;
  user?: any; // Replace with your user type if available
  error?: string;
  message?: string;
}

interface LocationState {
  from?: {
    pathname: string;
  };
}

const IDSLogin: React.FC = () => {
  // Create a theme with Libre Franklin font and custom primary color
  const theme = createTheme({
    typography: {
      fontFamily: '"Libre Franklin", sans-serif',
    },
    palette: {
      primary: {
        main: '#1C1362', // Updated to the requested color
        dark: '#150f4d', // Darker shade for hover states
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @import url('https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;400;500;600;700&display=swap');
        `,
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '25px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
    },
  });
  const { loginWithIDS, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  
  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      const redirectPath = state?.from?.pathname || '/welcome';
      navigate(redirectPath);
    }
  }, [user, navigate, state]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, checked, type } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Helper function to get user-friendly error messages
  const getAuthErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
        return 'No account found with this email.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      default:
        return 'An error occurred during sign in. Please try again.';
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setSuccess(false);
    
    try {
      // Set persistence based on rememberMe option
      // Sign in with Firebase Authentication using the AuthContext
      const result: AuthResult = await loginWithIDS(formData.username, formData.password, formData.rememberMe);
      
      if (result.success) {
        // Successful login
        setSuccess(true);
        console.log('User logged in:', result.user);
        // Redirect to the page the user was trying to access or to welcome page
        const redirectPath = state?.from?.pathname || '/welcome';
        setTimeout(() => {
          navigate(redirectPath);
        }, 1000); // Small delay to show success state
      } else {
        // Handle authentication errors
        setError(getAuthErrorMessage(result.error || 'unknown-error'));
      }
    } catch (error: any) {
      // Handle unexpected errors
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
    <Box 
      sx={{
        bgcolor: '#0E092E',
        minHeight: '100vh',
        width: '100vw',
        maxWidth: '100%',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: {
            xs: '100%',
            sm: '400px'
          },
          width: '100%',
          p: {
            xs: 3,
            sm: 4
          },
          bgcolor: 'background.paper',
          borderRadius: '24px',
          boxShadow: 1,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Box
            component="img"
            src={InvotraLogo}
            alt="Invotra Logo"
            sx={{
              maxWidth: '120px',
              width: '100%',
              height: 'auto',
              mb: 2
            }}
          />
          <Typography variant="h5" component="h2" align="center" fontWeight={500} mt={2} sx={{ fontFamily: '"Libre Franklin", sans-serif', fontSize: '20px' }}>
            Sign into IDS
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Stack spacing={3}>
            {error && (
              <Alert severity="error" sx={{ width: '100%', '& .MuiAlert-message': { fontFamily: '"Libre Franklin", sans-serif' } }}>
                {error}
              </Alert>
            )}
            
            <TextField
              label="Username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              required
              size="small"
              placeholder="Enter your username"
              disabled={loading}
              inputProps={{
                style: { fontSize: '16px', fontFamily: '"Libre Franklin", sans-serif' }
              }}
              InputLabelProps={{
                style: { fontSize: '16px', fontFamily: '"Libre Franklin", sans-serif' }
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              size="small"
              placeholder="Enter your password"
              disabled={loading}
              inputProps={{
                style: { fontSize: '16px', fontFamily: '"Libre Franklin", sans-serif' }
              }}
              InputLabelProps={{
                style: { fontSize: '16px', fontFamily: '"Libre Franklin", sans-serif' }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      disabled={loading}
                      sx={{ color: 'text.secondary' }}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  color="primary"
                  disabled={loading}
                />
              }
              label="Remember me"
              sx={{ mb: 2, '& .MuiFormControlLabel-label': { fontFamily: '"Libre Franklin", sans-serif' } }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="small"
              disabled={loading}
              sx={{
                mt: 2,
                py: 1,
                fontWeight: 600,
                fontSize: '14px',
                textTransform: 'none',
                borderRadius: '25px',
                position: 'relative',
                fontFamily: '"Libre Franklin", sans-serif',
                bgcolor: theme.palette.primary.main,
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                  boxShadow: 'none',
                }
              }}
            >
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    marginLeft: '-12px'
                  }}
                />
              )}
              {success ? 'Signed in successfully!' : loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
    </ThemeProvider>
  );
};

export default IDSLogin;
