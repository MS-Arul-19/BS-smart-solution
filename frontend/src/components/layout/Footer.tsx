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
              Providing quality bulk products, local professional services and social impact drives. Reliable. Professional. On Time.
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
                href="https://wa.me/919345838895"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-[#25D366] hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-base text-white tracking-wide">Navigation</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link to="/" className="hover:text-brand-secondary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-secondary transition-colors">About Us</Link></li>
              <li><Link to="/products" className="hover:text-brand-secondary transition-colors">Wholesale Products</Link></li>
              <li><Link to="/services" className="hover:text-brand-secondary transition-colors">Local Services</Link></li>
              <li><Link to="/social-service" className="hover:text-brand-secondary transition-colors">Social Impact</Link></li>
              <li><Link to="/enquiry" className="hover:text-brand-secondary transition-colors">Request a Quote</Link></li>
            </ul>
          </div>

          {/* Column 3: Popular Solutions */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-base text-white tracking-wide">Popular Solutions</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link to="/products?category=packaging-materials" className="hover:text-brand-secondary transition-colors">Packaging Materials</Link></li>
              <li><Link to="/products?category=safety-products" className="hover:text-brand-secondary transition-colors">Safety Products</Link></li>
              <li><Link to="/services?category=construction-interior" className="hover:text-brand-secondary transition-colors">Construction & Interior</Link></li>
              <li><Link to="/services?category=it-digital-services" className="hover:text-brand-secondary transition-colors">IT & Digital Services</Link></li>
              <li><Link to="/social-service" className="hover:text-brand-secondary transition-colors">NGO & Community Support</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-base text-white tracking-wide">Contact Us</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5" />
                <a href="tel:+919345838895" className="hover:text-brand-secondary transition-colors">+91 93458 38895</a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5" />
                <a href="mailto:keerthanabagath27@gmail.com" className="hover:text-brand-secondary transition-colors">keerthanabagath27@gmail.com</a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5" />
                <span>102b Venus Nagar, 2nd Main Road, Kolathur, Chennai, Tamil Nadu - 600099</span>
              </li>
              <li className="text-xs text-slate-400 pt-1">
                <span className="text-emerald-400 font-semibold">Working Hours:</span> Monday to Saturday (9:00 AM – 6:00 PM)
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
            <span>IndiaMART + Urban Company B2B Model</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
