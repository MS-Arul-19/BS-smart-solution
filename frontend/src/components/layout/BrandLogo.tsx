import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  showTagline?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'light', showTagline = true, className = '' }) => {
  const isDarkBg = variant === 'dark';

  return (
    <Link to="/" className={`group inline-flex items-center gap-3 ${className}`}>
      {/* SVG Emblem matching the exact logo structure */}
      <div className="relative w-11 h-11 flex-shrink-0">
        <svg viewBox="0 0 120 120" className="w-full h-full transform transition-transform group-hover:scale-105 duration-300">
          <defs>
            <linearGradient id="logoNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0D2F63" />
              <stop offset="100%" stopColor="#081F44" />
            </linearGradient>
            <linearGradient id="logoOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFA41C" />
              <stop offset="100%" stopColor="#F68B00" />
            </linearGradient>
          </defs>

          {/* Top Orange Swoosh Arc */}
          <path
            d="M 40 16 A 48 48 0 0 1 100 48"
            fill="none"
            stroke="url(#logoOrangeGrad)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Bottom Navy Swoosh Arc */}
          <path
            d="M 22 62 A 48 48 0 0 0 84 104"
            fill="none"
            stroke="url(#logoNavyGrad)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Capital "B" - Solid Navy */}
          <path
            d="M 28 26 H 62 C 76 26, 76 46, 62 48 C 80 50, 80 74, 62 74 H 28 Z"
            fill="url(#logoNavyGrad)"
          />
          {/* Inner cutouts for B */}
          <path d="M 38 34 H 56 C 63 34, 63 41, 56 41 H 38 Z" fill="#FFFFFF" />
          <path d="M 38 53 H 58 C 65 53, 65 66, 58 66 H 38 Z" fill="#FFFFFF" />

          {/* Intertwining "S" - Bright Orange */}
          <path
            d="M 76 34 C 60 30, 48 40, 56 50 C 64 60, 82 58, 72 74 C 62 88, 40 76, 36 72"
            fill="none"
            stroke="url(#logoOrangeGrad)"
            strokeWidth="11"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center text-xl font-extrabold font-heading tracking-tight leading-none">
          <span className={isDarkBg ? 'text-white' : 'text-brand-primary'}>Smart</span>
          <span className="text-brand-secondary ml-1">Solution</span>
        </div>
        {showTagline && (
          <span className={`text-[10px] font-medium tracking-wide mt-0.5 ${isDarkBg ? 'text-slate-300' : 'text-brand-muted'}`}>
            You Need It, We Provide It.
          </span>
        )}
      </div>
    </Link>
  );
};
