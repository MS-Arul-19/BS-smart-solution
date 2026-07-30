import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Users, Clock, ThumbsUp } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-white">
      {/* Background Soft Glow Accents */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-10 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/3 right-10 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 space-y-6 text-left -mt-2 md:-mt-4"
          >
            
            {/* Main Headline */}
            <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[50px] font-extrabold font-heading text-brand-primary tracking-tight leading-[1.28]">
              <span className="block whitespace-nowrap lg:whitespace-normal mb-2 sm:mb-3">Your Trusted Partner for</span>
              <span className="block text-brand-secondary">
                Business & Local Services
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-brand-muted max-w-xl font-body leading-relaxed">
              Wholesale B2B products & local verified services connected directly to your WhatsApp for instant quotes, delivery, and social impact drives.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/products">
                <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  Wholesale Products
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="secondary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  Local Services
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators Row */}
            <motion.div variants={itemVariants} className="pt-8 border-t border-brand-border/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-brand-primary/5 text-brand-primary">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold font-heading text-brand-primary">Reliable</p>
                  <p className="text-[11px] text-brand-muted">Solutions</p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-brand-primary/5 text-brand-primary">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold font-heading text-brand-primary">Professional</p>
                  <p className="text-[11px] text-brand-muted">Team</p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-brand-primary/5 text-brand-primary">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold font-heading text-brand-primary">On Time</p>
                  <p className="text-[11px] text-brand-muted">Delivery</p>
                </div>
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-brand-primary/5 text-brand-primary">
                  <ThumbsUp className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold font-heading text-brand-primary">Customer</p>
                  <p className="text-[11px] text-brand-muted">Focused</p>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Hero Visual Illustration (Floating Animation) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative flex justify-center lg:justify-end items-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-xl lg:max-w-2xl overflow-visible"
            >
              <img
                src="/hero-illustration.png"
                alt="BS Smart Solution Industrial & Business Solutions Illustration"
                className="w-full h-auto object-contain transition-all duration-700 hover:scale-[1.02] drop-shadow-lg"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
