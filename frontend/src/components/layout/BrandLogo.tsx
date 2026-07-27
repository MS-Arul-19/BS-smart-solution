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
    <Link to="/" className={`group inline-flex items-center gap-3.5 ${className}`}>
      {/* 3D Vector Emblem (No White Square Background Artifacts) */}
      <div className="relative flex items-center justify-center flex-shrink-0">
        <svg viewBox="0 0 100 100" className="h-11 w-11 transform group-hover:scale-105 transition-transform duration-300 filter drop-shadow-md">
          <defs>
            <linearGradient id="bsBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0D2F63" />
              <stop offset="50%" stopColor="#0A2550" />
              <stop offset="100%" stopColor="#061836" />
            </linearGradient>
            <linearGradient id="bsGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F68B00" />
              <stop offset="50%" stopColor="#FFA024" />
              <stop offset="100%" stopColor="#E07900" />
            </linearGradient>
            <linearGradient id="bsGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F68B00" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#25D366" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Outer Badge Container with Rounded Corners */}
          <rect x="4" y="4" width="92" height="92" rx="24" fill="url(#bsBgGradient)" />
          <rect x="4" y="4" width="92" height="92" rx="24" fill="none" stroke="url(#bsGlowGrad)" strokeWidth="3" />

          {/* Letter B (White Bold Geometric) */}
          <path 
            d="M 24 24 L 46 24 C 58 24, 58 41, 46 41 C 60 41, 60 60, 46 60 L 24 60 Z M 34 32 L 34 38 L 44 38 C 48 38, 48 32, 44 32 Z M 34 46 L 34 52 L 46 52 C 50 52, 50 46, 46 46 Z" 
            fill="#FFFFFF" 
          />

          {/* Letter S (Vibrant Gold Overlay Curve) */}
          <path 
            d="M 72 30 C 66 22, 52 24, 52 34 C 52 48, 76 42, 76 56 C 76 68, 58 68, 48 60" 
            fill="none" 
            stroke="url(#bsGoldGradient)" 
            strokeWidth="8" 
            strokeLinecap="round" 
          />

          {/* Sparkle Accent Dot */}
          <circle cx="76" cy="24" r="4" fill="#F68B00" />
        </svg>
      </div>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col">
        <div className="flex items-center text-xl font-extrabold font-heading tracking-tight leading-none">
          <span className="text-brand-secondary font-black tracking-wider mr-1">BS</span>
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
