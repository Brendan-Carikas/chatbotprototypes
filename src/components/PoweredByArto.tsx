import React from 'react';
import { getAssetPath } from '../utils/assetPath';

interface PoweredByArtoProps {
  className?: string;
}

const PoweredByArto: React.FC<PoweredByArtoProps> = ({ className = '' }) => {
  return (
    <div className={`text-xs text-center mt-2 pb-4 font-regular rounded-b-lg ${className}`}>
      <a 
        href="https://invotra.com/arto-ai-chatbot/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-flex items-center hover:opacity-80"
        tabIndex={0}
        aria-label="Visit Arto AI Chatbot website"
      >
        <span className="text-[#656565] pt-2mb-2">Powered by</span>
        <img 
          src={getAssetPath('arto-site-logo-grey.svg')} 
          alt="Arto" 
          className="inline-block h-4 mb-1 ml-0.5" 
        />
      </a>
    </div>
  );
};

export default PoweredByArto;
