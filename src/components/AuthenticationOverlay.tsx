import React from 'react';
import { getAssetPath } from '../utils/assetPath';

interface AuthenticationOverlayProps {
  onAuthenticate: (email: string) => void;
  onClose: () => void;
}

const AuthenticationOverlay: React.FC<AuthenticationOverlayProps> = ({ onAuthenticate }) => {
  const [email, setEmail] = React.useState('');
  const [acceptedPrivacy] = React.useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleAuthenticate = () => {
    if (validateEmail(email) && acceptedPrivacy) {
      onAuthenticate(email);
    }
  };

  return (
    <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col rounded-lg">
      {/* Header */}
      <div className="bg-[#008080] text-white p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={getAssetPath('Arto-Logo-Reverse.svg')} alt="Arto" className="h-14" />
          
        </div>
        
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-sm w-full flex flex-col items-left">

        

        <h2 className="mb-6 text-gray-700 text-xl font-semibold">
          Welcome, I'm Arto!
        </h2>
        
        <div className="mb-6 text-gray-700 text-">
          I'm here to provide helpful assistance. Please enter your email to continue using Arto AI Chat.
        </div>
         
        
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
              placeholder="Enter your email"
            />
          </div>
          
          <button
            onClick={handleAuthenticate}
            disabled={!validateEmail(email) || !acceptedPrivacy}
            className="w-full bg-[#008080] text-white py-2 px-4 rounded-md hover:bg-[#006666] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Continue
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationOverlay;
