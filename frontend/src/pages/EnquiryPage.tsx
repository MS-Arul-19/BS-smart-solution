import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { MessageSquare, Phone, Mail, MapPin } from 'lucide-react';
import { EnquiryForm } from '../components/forms/EnquiryForm';

export const EnquiryPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const itemName = searchParams.get('name') || '';

  return (
    <div className="pt-32 pb-24 bg-brand-light min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1280px] mx-auto space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1.5 rounded-full bg-brand-secondary/10 text-brand-secondary text-xs font-heading font-semibold uppercase tracking-wider inline-flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> Lead Enquiry Form
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-brand-primary tracking-tight">
              Get Custom Quotes & Wholesale Pricing
            </h1>
            <p className="text-base text-brand-muted">
              Submit your enquiry below. Our team will generate your reference ticket & connect with you immediately via WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Contact Details Info Panel */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-brand-dark text-white p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
                <div className="space-y-2 relative z-10">
                  <h3 className="text-2xl font-bold font-heading">BS Smart Solution</h3>
                  <p className="text-xs text-slate-300">You Need It, We Provide It. • Reliable. Professional. On Time.</p>
                </div>

                <div className="space-y-4 text-sm relative z-10 pt-4 border-t border-slate-800">
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-400">Direct Phone Hotline</p>
                      <p className="font-semibold">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-400">Official Email</p>
                      <p className="font-semibold">info@bssmartsolution.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-400">Headquarters Address</p>
                      <p className="font-semibold">123 Business Park, Guindy, Chennai, Tamil Nadu - 600032</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 text-xs text-slate-400">
                  ⚡ Average WhatsApp response time: <strong>under 15 minutes</strong> during business hours.
                </div>
              </div>

            </div>

            {/* Right Enquiry Form Component */}
            <div className="lg:col-span-7">
              <EnquiryForm itemName={itemName} />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
