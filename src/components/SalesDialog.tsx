import React from 'react';
import { Info, CheckCircle2 } from 'lucide-react';
import { Tooltip, TextField } from '@mui/material';
import { getAssetPath } from '../utils/assetPath';
import { artoTheme } from '../theme/arto';
import ChatHeader from './ChatHeader';

interface SalesDialogProps {
  onSubmit: (name: string, email: string, phone: string) => void;
  onClose: () => void;
}

const SalesDialog: React.FC<SalesDialogProps> = ({ onSubmit, onClose }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [phoneError, setPhoneError] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);


  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    // Allow UK formats: +44 7XXX XXX XXX, 07XXX XXX XXX, 07XXX-XXX-XXX
    const phoneRegex = /^(\+44\s?7|07)[0-9]{3}(\s|\-)?[0-9]{3}(\s|\-)?[0-9]{3}$/;
    return phoneRegex.test(phone.trim());
  };

  const validateForm = () => {
    let isValid = true;
    
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!phone.trim()) {
      setPhoneError('Phone number is required');
      isValid = false;
    } else if (!validatePhone(phone)) {
      setPhoneError('Please enter a valid UK mobile number');
      isValid = false;
    } else {
      setPhoneError('');
    }

    return isValid;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      onSubmit(name, email, phone); // Call the onSubmit prop with form data
      setIsSubmitted(true); // Show confirmation message
      
      // After 4 seconds, hide confirmation and close dialog
      setTimeout(() => {
        setIsSubmitted(false);
        onClose(); // Close SalesDialog to show ChatDialog
      }, 4000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col w-[378px] xl:w-[448px] h-[600px] overflow-hidden mx-auto">
      {/* Header */}
      <ChatHeader 
        logoSrc={getAssetPath('Arto-Logo-Reverse.svg')} 
        logoAlt="Arto"
        tooltipText="These answers are generated using artificial intelligence. This is an experimental technology, and information may occasionally be incorrect or misleading."
        onClose={onClose}
        className="bg-[#008080]"
      />

      <div className="flex-1 px-6 py-6 overflow-y-auto" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#9CA3AF #f3f4f6',
          maxHeight: 'calc(495px - 72px - 24px)' // 495px total - header height - padding
        }}>
        <div className="w-full flex flex-col">
          {isSubmitted ? (
            <div className="flex-1 flex flex-col items-center justify-center pt-16 p-8 space-y-4">
            <div className="animate-[scale-up_0.5s_ease-out,ease-in-out_0.5s]">
              <CheckCircle2 
                className="w-16 h-16 text-teal-600 animate-[draw-check_1s_ease-out_forwards]"
                strokeWidth={2.5}
                aria-label="Success check mark"
              />
            </div>
              <h6 className=" mb-4 text-gray-700 text-lg font-semibold">
                Thank you for your interest!
              </h6>
              <p className="text-gray-700">
                A representative will contact you shortly.
              </p>
            </div>
          ) : (
            <>
              
              <div className="px-4 py-4 flex flex-col justify-end">
                <h6 className="mt-2 mb-6 text-gray-700 text-lg font-semibold">
                  Talk to our sales team
                </h6>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    id="name"
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!nameError}
                    helperText={nameError}
                    placeholder="Your name"
                    size="small"
                    inputProps={{
                      'aria-label': 'Name input field',
                      'aria-required': 'true',
                      'aria-invalid': !!nameError,
                      'tabIndex': 1
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: artoTheme.colors.primary,
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: artoTheme.colors.primary,
                      },
                    }}
                  />
                </div>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    id="email"
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!emailError}
                    helperText={emailError}
                    placeholder="you@example.com"
                    size="small"
                    inputProps={{
                      'aria-label': 'Email input field',
                      'aria-required': 'true',
                      'aria-invalid': !!emailError,
                      'tabIndex': 2
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: artoTheme.colors.primary,
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: artoTheme.colors.primary,
                      },
                    }}
                  />
                </div>

                <div>
                  <TextField
                    fullWidth
                    id="phone"
                    label="Phone number"
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    error={!!phoneError}
                    helperText={phoneError}
                    placeholder="Your phone number"
                    size="small"
                    inputProps={{
                      'aria-label': 'Phone input field',
                      'aria-required': 'true',
                      'aria-invalid': !!phoneError,
                      'tabIndex': 3
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: artoTheme.colors.primary,
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: artoTheme.colors.primary,
                      },
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer with buttons */}
      {!isSubmitted && (
        <div className="mt-auto  px-6 py-6 bg-gray-0">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              tabIndex={4}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-[#006666]"
              style={{ 
                backgroundColor: artoTheme.colors.primary,
                ['--tw-outline-color' as string]: artoTheme.colors.primary
              }}
              tabIndex={5}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesDialog;