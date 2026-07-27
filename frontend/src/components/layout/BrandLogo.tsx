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
      {/* Official BS Emblem Icon */}
      <div className={`relative flex items-center justify-center overflow-hidden rounded-xl transition-transform group-hover:scale-105 duration-300 ${isDarkBg ? 'bg-white/10 p-1 backdrop-blur-sm' : ''}`}>
        <img
          src="/logo.jpg"
          alt="BS Smart Solution Logo Emblem"
          className="h-11 w-11 object-contain rounded-lg drop-shadow-sm"
        />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center text-xl font-extrabold font-heading tracking-tight leading-none">
          <span className={isDarkBg ? 'text-white' : 'text-brand-primary'}>Smart</span>
          <span className="text-brand-secondary ml-1.5">Solution</span>
        </div>
        {showTagline && (
          <span className={`text-[10px] font-medium tracking-wide mt-1 ${isDarkBg ? 'text-slate-300' : 'text-brand-muted'}`}>
            You Need It, We Provide It.
          </span>
        )}
      </div>
    </Link>
  );
};
