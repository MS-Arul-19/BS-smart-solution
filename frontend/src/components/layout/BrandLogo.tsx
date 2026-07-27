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
      {/* Official BS Smart Solution Emblem Badge Container */}
      <div className={`relative flex items-center justify-center p-1 rounded-xl transition-all duration-300 group-hover:scale-105 ${
        isDarkBg 
          ? 'bg-white border border-white/20 shadow-md ring-2 ring-white/10' 
          : 'bg-white border border-brand-border/80 shadow-soft'
      }`}>
        <img
          src="/logo.jpg"
          alt="BS Smart Solution Official Logo"
          className="h-10 w-10 object-contain rounded-lg"
        />
      </div>

      {/* Brand Text & Official Tagline */}
      <div className="flex flex-col">
        <div className="flex items-center text-xl font-extrabold font-heading tracking-tight leading-none">
          <span className={isDarkBg ? 'text-white' : 'text-brand-primary'}>BS Smart</span>
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
