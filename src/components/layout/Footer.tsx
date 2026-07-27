import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Logo & Tagline */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-8">
            <BrandLogo variant="dark" />
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm pt-2">
              Providing quality products, professional services and social initiatives to build a better business and community. Reliable. Professional. On Time.
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-brand-secondary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-brand-secondary hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-brand-secondary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-[#25D366] hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-base text-white tracking-wide">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link to="/" className="hover:text-brand-secondary transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-brand-secondary transition-colors">Products</Link></li>
              <li><Link to="/services" className="hover:text-brand-secondary transition-colors">Services</Link></li>
              <li><Link to="/social-service" className="hover:text-brand-secondary transition-colors">Social Services</Link></li>
              <li><a href="/#about" className="hover:text-brand-secondary transition-colors">About Us</a></li>
              <li><Link to="/enquiry" className="hover:text-brand-secondary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Solutions */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-base text-white tracking-wide">Our Solutions</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link to="/products?category=packaging-materials" className="hover:text-brand-secondary transition-colors">Packaging Materials</Link></li>
              <li><Link to="/products?category=safety-equipment" className="hover:text-brand-secondary transition-colors">Safety Equipment</Link></li>
              <li><Link to="/services?category=construction-interior" className="hover:text-brand-secondary transition-colors">Construction & Interior</Link></li>
              <li><Link to="/services?category=it-digital-solutions" className="hover:text-brand-secondary transition-colors">IT & Digital Solutions</Link></li>
              <li><Link to="/social-service" className="hover:text-brand-secondary transition-colors">Social Initiatives</Link></li>
              <li><Link to="/enquiry?type=GENERAL" className="hover:text-brand-secondary transition-colors">Bulk Supply Enquiry</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-base text-white tracking-wide">Contact Us</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5" />
                <span>info@bssmartsolution.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5" />
                <span>123 Business Park, Guindy, Chennai, Tamil Nadu - 600032</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="max-w-[1280px] mx-auto pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 BS Smart Solution. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/admin/login" className="hover:text-white transition-colors">Admin Portal</Link>
            <span className="text-slate-700">|</span>
            <span>Designed with Care for Your Business</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
