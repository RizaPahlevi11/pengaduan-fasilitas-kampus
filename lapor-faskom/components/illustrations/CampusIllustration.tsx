
import React from 'react';

export const CampusIllustration: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" {...props}>
        <g fill="none" strokeWidth="2">
            {/* Background shapes */}
            <circle cx="40" cy="60" r="30" fill="#FFFBEB"/>
            <rect x="120" y="30" width="60" height="60" rx="10" fill="#FFFBEB"/>

            {/* Main Building */}
            <path d="M 60 100 L 60 50 L 140 50 L 140 100" fill="#FFC72C" stroke="#422006" strokeLinejoin="round" strokeLinecap="round"/>
            <path d="M 50 100 L 150 100" stroke="#422006" strokeLinecap="round"/>
            <path d="M 90 50 L 110 30 L 130 50" fill="#EAB308" stroke="#422006" strokeLinejoin="round" strokeLinecap="round"/>

            {/* Windows */}
            <rect x="75" y="60" width="15" height="15" rx="2" fill="#FFFBEB" stroke="#EAB308"/>
            <rect x="110" y="60" width="15" height="15" rx="2" fill="#FFFBEB" stroke="#EAB308"/>
            
            {/* Door */}
            <rect x="92" y="80" width="16" height="20" rx="2" fill="#422006"/>
            
            {/* Tree */}
            <line x1="35" y1="100" x2="35" y2="80" stroke="#422006" strokeLinecap="round"/>
            <circle cx="35" cy="70" r="15" fill="#10B981" stroke="#059669"/>

            {/* Path */}
            <path d="M 20 115 C 50 100, 150 105, 180 115" stroke="#EAB308" strokeDasharray="4 2" fill="none" strokeLinecap="round"/>
        </g>
    </svg>
);
