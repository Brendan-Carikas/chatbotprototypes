import React from 'react';
import { getAssetPath } from '../utils/assetPath';
import { 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Box, 
  Container,
  AppBar,
  Toolbar
} from '@mui/material';

interface AuthenticationOverlayProps {
  onAuthenticate: (email: string) => void;
  onClose: () => void;
}

const AuthenticationOverlay: React.FC<AuthenticationOverlayProps> = ({ onAuthenticate, onClose }) => {
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
      className="absolute inset-0 bg-white bg-opacity-95 flex flex-col rounded-lg"
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 2
      }}
    >
      <AppBar position="static" color="primary" elevation={0} sx={{ bgcolor: '#008080', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
        <Toolbar sx={{ py: 1 }}>
          <Box component="img" src={getAssetPath('Arto-Logo-Reverse.svg')} alt="Arto" sx={{ height: 56 }} />
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ flex: 1, display: 'flex', alignItems: 'center', py: 4 }}>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'text.primary', fontWeight: 600 }}>
            Welcome, I'm Arto!
          </Typography>
          
          <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary', mb: 4 }}>
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
        </Box>
      </Container>
    </Paper>
  );
};

export default AuthenticationOverlay;
