import React from 'react';
import { getAssetPath } from '../utils/assetPath';
import { 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Box, 
  Container
} from '@mui/material';

interface AuthenticationOverlayProps {
  onAuthenticate: (email: string) => void;
  onClose: () => void;
}

const AuthenticationOverlayStyle2: React.FC<AuthenticationOverlayProps> = ({ onAuthenticate, onClose }) => {
  const [email, setEmail] = React.useState('');
  const [acceptedPrivacy] = React.useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleAuthenticate = () => {
    if (!validateEmail(email)) {
      return;
    }
    
    if (!acceptedPrivacy) {
      return;
    }
    
    onAuthenticate(email);
  };

  return (
    <Paper 
      elevation={0} 
      className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 rounded-lg"
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        borderRadius: 2
      }}
    >
      <Container maxWidth="sm" sx={{ width: '100%', maxWidth: 'calc(100% - 48px)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Box 
            component="img" 
            src={getAssetPath('arto-site-logo.png')} 
            alt="Arto" 
            sx={{ height: 48 }} 
          />
        </Box>

        <Typography variant="h5" component="h2" align="center" gutterBottom sx={{ color: 'text.primary', fontWeight: 600 }}>
          Welcome, I'm Arto!
        </Typography>
        
        <Typography variant="body1" align="center" gutterBottom sx={{ color: 'text.secondary', mb: 4 }}>
          I'm here to provide helpful assistance. Please enter your email to start using Arto AI Chat.
        </Typography>
        
        <Box component="form" noValidate sx={{ mt: 2 }}>
          <TextField
            fullWidth
            id="email"
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAuthenticate()}
            error={email !== '' && !validateEmail(email)}
            helperText={email !== '' && !validateEmail(email) ? 'Please enter a valid email address' : ''}
            variant="outlined"
            margin="normal"
            size="small"
            inputProps={{
              'aria-label': 'Email address input field',
              'aria-required': 'true',
              'aria-invalid': email !== '' && !validateEmail(email)
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#008080',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#008080',
              },
            }}
          />
          
          <Button
            fullWidth
            variant="contained"
            onClick={handleAuthenticate}
            disabled={!validateEmail(email) || !acceptedPrivacy}
            sx={{
              mt: 3,
              bgcolor: '#008080',
              '&:hover': {
                bgcolor: '#006666',
              },
              '&:disabled': {
                bgcolor: '#E5E7EB',
              },
            }}
          >
            Continue
          </Button>
        </Box>
      </Container>
    </Paper>
  );
};

export default AuthenticationOverlayStyle2;
