
import React from 'react';

export const UserProfileIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 200 200" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="currentColor">
      <circle cx="100" cy="70" r="40" />
      <path d="M100 120 C 50 120, 20 160, 20 200 L180 200 C180 160, 150 120, 100 120 Z" />
    </g>
  </svg>
);