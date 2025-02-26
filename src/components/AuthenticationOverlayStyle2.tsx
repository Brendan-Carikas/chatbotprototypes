import React from 'react';
import { getAssetPath } from '../utils/assetPath';

interface AuthenticationOverlayProps {
  onAuthenticate: (email: string) => void;
  onClose: () => void;
}

const AuthenticationOverlayStyle2: React.FC<AuthenticationOverlayProps> = ({ onAuthenticate }) => {
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
    <div className="absolute inset-0 bg-white flex flex-col items-center justify-center px-6 py-8 rounded-lg">
      <div className="w-full max-w-[calc(100%-48px)]">
        <div className="flex justify-center mb-8">
          <img src={getAssetPath('arto-site-logo.png')} alt="Arto" className="h-12" />
        </div>

        <h2 className="mb-6 text-gray-700 text-xl font-semibold">
          Welcome, I'm Arto!
        </h2>
        
        <div className="mb-6 text-gray-700">
          I'm here to provide helpful assistance. Please enter your email to start using Arto AI Chat.
        </div>
        
        <div className="space-y-8">
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
  );
};

export default AuthenticationOverlayStyle2;
