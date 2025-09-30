import React from 'react';

export const IdCardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <circle cx="8" cy="10" r="2" />
    <path d="M12 14h6" />
    <path d="M12 10h6" />
    <path d="M6 14a2 2 0 0 0 4 0" />
  </svg>
);
