'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { 
  Map, Calendar, Clock, DollarSign, Globe, Train, Plane, 
  Hotel, ArrowRight, Shield, CheckCircle2, AlertTriangle, 
  Briefcase, Flag, Bookmark, X, ChevronRight, Facebook, 
  Twitter, Linkedin, Copy, Info, Star, Car
} from 'lucide-react';



// --- Design System & Components ---

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Floating Social Share
const SocialShare = () => {
    const [copied, setCopied] = useState(false);

    const handleShare = (platform: string) => {
      const url = window.location.href;
      const text = "Check out this World Cup 2026 Itinerary Planning Guide!";
      
      let shareUrl = "";
      switch (platform) {
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
          break;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      }
    };

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    };

    return (
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-slate-200/50">
        <button 
          onClick={() => handleShare('twitter')}
          className="p-3 text-slate-400 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 rounded-xl transition-all duration-300"
          aria-label="Share on Twitter"
        >
          <Twitter size={20} />
        </button>
        <button 
          onClick={() => handleShare('facebook')}
          className="p-3 text-slate-400 hover:text-[#4267B2] hover:bg-[#4267B2]/10 rounded-xl transition-all duration-300"
          aria-label="Share on Facebook"
        >
          <Facebook size={20} />
        </button>
        <button 
          onClick={() => handleShare('linkedin')}
          className="p-3 text-slate-400 hover:text-[#0077b5] hover:bg-[#0077b5]/10 rounded-xl transition-all duration-300"
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={20} />
        </button>
        <div className="w-8 h-[1px] bg-slate-200 mx-auto" />
        <button 
          onClick={handleCopy}
          className="p-3 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all duration-300 relative group"
          aria-label="Copy Link"
        >
          {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
          <span className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-slate-900 dark:text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {copied ? 'Copied!' : 'Copy Link'}
          </span>
        </button>
      </div>
    );
  };

// Lightbox Image
const LightboxImage = ({ src, alt, caption }: { src: string, alt: string, caption?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className="relative group cursor-zoom-in rounded-3xl overflow-hidden mb-8"
        onClick={() => setIsOpen(true)}
      >
        <Image src={src} alt={alt} width={1200} height={800} className="object-cover w-full h-[400px] md:h-[600px] transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors duration-300" />
        {caption && (
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-slate-900 dark:text-white font-medium">{caption}</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-slate-900 dark:text-white p-2">
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative max-w-7xl w-full max-h-[90vh] rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={src} alt={alt} width={1920} height={1080} className="object-contain w-full h-full" />
              {caption && <p className="text-center text-white/80 mt-4 font-light text-lg">{caption}</p>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Section Component with Nike-bold Typography
const Section = ({ id, title, children, className = "" }: { id: string, title: string, children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id={id} ref={ref} className={`py-16 md:py-24 scroll-mt-24 ${className}`}>
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-12 tracking-tight">
          <span className="text-emerald-500 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">Guide Section</span>
          {title}
        </h2>
        {children}
      </motion.div>
    </section>
  );
};

// Premium Affiliate Button
const AffiliateButton = ({ href, text, icon: Icon = ArrowRight, variant = 'primary', subtext }: { href: string, text: string, icon?: any, variant?: 'primary' | 'secondary' | 'outline' | 'alert', subtext?: string }) => {
  const baseClasses = "group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden";
  const variants = {
    primary: "bg-emerald-500 text-slate-900 dark:text-white hover:bg-emerald-400 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.6)]",
    secondary: "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xl",
    outline: "border-2 border-slate-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-900 dark:text-white bg-transparent",
    alert: "bg-amber-500 text-slate-900 dark:text-white hover:bg-amber-600 shadow-[0_10px_40px_-10px_rgba(245,158,11,0.5)]"
  };

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={`${baseClasses} ${variants[variant]}`}>
      <div className="relative z-10 flex flex-col items-center">
        <span className="flex items-center gap-2">
          {text}
          <Icon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
        {subtext && <span className="text-[10px] uppercase tracking-wider opacity-80 mt-1">{subtext}</span>}
      </div>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
    </Link>
  );
};

// Callout Component
const Callout = ({ type = 'info', title, children }: { type?: 'info' | 'warning' | 'success', title: string, children: React.ReactNode }) => {
  const styles = {
    info: "border-blue-500/30 bg-blue-50/50 dark:bg-blue-900/10 text-blue-900 dark:text-blue-100",
    warning: "border-amber-500/30 bg-amber-50/50 dark:bg-amber-900/10 text-amber-900 dark:text-amber-100",
    success: "border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-900/10 text-emerald-900 dark:text-emerald-100"
  };
  
  const icons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle2
  };

  const Icon = icons[type];

  return (
    <div className={`p-8 rounded-[2rem] border ${styles[type]} my-8 relative overflow-hidden`}>
      <div className="absolute top-0 right-0 p-6 opacity-10">
        <Icon className="w-24 h-24" />
      </div>
      <div className="relative z-10">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-3">
          <Icon className="w-6 h-6" />
          {title}
        </h3>
        <div className="text-lg opacity-90 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

// Table Component
const Table = ({ headers, rows }: { headers: string[], rows: (string | React.ReactNode)[][] }) => (
  <div className="overflow-x-auto my-12 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-xl bg-white dark:bg-slate-50 dark:bg-slate-900/50">
    <table className="w-full text-left text-sm md:text-base">
      <thead className="bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-bold uppercase tracking-wider">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="p-6 whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-white/5">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className="p-6 text-slate-600 dark:text-slate-300 font-medium">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const InternalLink = ({ href, text }: { href: string, text: string }) => (
  <Link href={href} className="text-emerald-500 dark:text-emerald-400 font-bold hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors">
    {text}
  </Link>
);

// --- Main Page Component ---

export default function ClientPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSection, setActiveSection] = useState('choose-length');


  // Sticky Nav Links
  const navLinks = [
    { id: 'choose-length', label: 'Choose Length' },
    { id: 'fundamentals', label: 'Fundamentals' },
    { id: '1-week', label: '1 Week' },
    { id: '2-weeks', label: '2 Weeks' },
    { id: '3-weeks', label: '3 Weeks' },
    { id: 'customization', label: 'Customization' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0A0A0A] font-sans selection:bg-emerald-500/30">
      
      <SocialShare />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <div className="relative h-[65vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/travel-tips/World Cup 2026 Itinerary Planning Guide Illustration.webp" 
            alt="World Cup 2026 Itinerary Planning" 
            fill 
            className="object-cover object-center"
            priority quality={60} 
            sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-[#0A0A0A]/80 to-[#F5F5F7] dark:to-[#0A0A0A]" />
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-end md:items-center justify-between gap-12 pt-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <Breadcrumb 
                variant="white"
                items={[
                  { label: 'Travel Tips', href: '/world-cup-2026-travel-tips' },
                  { label: 'Itinerary Planning', href: '/world-cup-2026-itinerary-planning' }
                ]} 
              />
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Last Updated: January 4, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Travel Strategy
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
                  Global Guide
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                World Cup 2026 Itinerary Planning
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                104 matches. 16 cities. <span className="text-slate-900 dark:text-white font-medium">1, 2, or 3 Week</span> definitive routes.
              </p>
            </motion.div>
          </div>


        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto px-6 gap-20 relative pt-16">
        
        {/* Sticky Table of Contents */}
        <aside className="hidden lg:block w-72 shrink-0 relative">
          <div className="sticky top-40 max-h-[calc(100vh-10rem)] overflow-y-auto pr-4 scrollbar-hide">
            <h3 className="font-black text-slate-900 dark:text-white mb-6 px-3 text-lg uppercase tracking-wider">Contents</h3>
            <div className="space-y-1 relative border-l-2 border-slate-200 dark:border-slate-200 dark:border-slate-800 ml-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.id} 
                  href={`#${link.id}`}
                  className={`block px-6 py-3 text-sm font-bold transition-all duration-300 relative ${
                    activeSection === link.id 
                      ? 'text-emerald-600 dark:text-emerald-400 translate-x-1' 
                      : 'text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-600 dark:text-slate-300'
                  }`}
                  onClick={() => setActiveSection(link.id)}
                >
                  {activeSection === link.id && (
                    <motion.div 
                      layoutId="activeSection"
                      className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-emerald-500"
                    />
                  )}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Column */}
        <main className="flex-1 min-w-0 pb-24">
          
          <div className="mb-12 p-6 rounded-2xl text-sm text-slate-500 dark:text-slate-400 flex gap-4 items-start">
            <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Transparency:</strong> This guide contains affiliate links. We may earn a commission if you book through them, which helps fund our independent journalism.
            </p>
          </div>

          <Section id="choose-length" title="How to Choose Your Itinerary Length">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              The first step in planning your World Cup 2026 adventure is being realistic about your time and budget. This tournament spans an entire continent, not just a single country like Qatar 2022 or Germany 2006.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6">
                  <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">1</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">The 1-Week Sprint</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">Best for limited vacation time or specific team focus.</p>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> 2-3 Matches</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> 1-2 Cities Max</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> $3,000 - $7,000</li>
                </ul>
              </div>

              <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border-2 border-emerald-500/20 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-500 text-slate-900 dark:text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">Most Popular</div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6">
                  <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">2</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">The 2-Week Balance</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">The sweet spot. Multiple rounds and regions without burnout.</p>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> 3-5 Matches</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> 2-3 Cities</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> $6,000 - $14,000</li>
                </ul>
              </div>

              <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6">
                  <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">3</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">The 3-Week Immersion</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">Once-in-a-lifetime journey. Follow a team deep into the tournament.</p>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> 6-8+ Matches</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Multi-Country</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> $10,000 - $25,000+</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="fundamentals" title="Itinerary Planning Fundamentals">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
              Before you copy-paste an itinerary, understand the logic. We learned these lessons the hard way in Russia 2018 and Qatar 2022—mistakes here cost time and money.
            </p>

            <div className="grid gap-8">
              <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-emerald-500" />
                  Match Schedule Considerations
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  The <InternalLink href="/world-cup-2026-schedule" text="Match Schedule" /> dictates everything. In the Group Stage (June 11-27), matches happen daily. As the tournament progresses to the Round of 16 (June 30-July 3) and beyond, rest days increase. If you want volume, go early. If you want stakes, go late.
                </p>
              </div>

              <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                  <Plane className="w-6 h-6 text-emerald-500" />
                  Transportation Between Cities
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  Do not underestimate distances. A "quick hop" from New York to Dallas is a 4-hour flight plus airport time. Stick to regional clusters to save money and sanity. See our <InternalLink href="/world-cup-2026-flight-booking-guide" text="Flight Booking Guide" /> for hub strategies.
                </p>
                <AffiliateButton href="https://www.skyscanner.com" text="Check Flight Prices" icon={Plane} variant="secondary" subtext="Compare Multi-City Options" />
              </div>

              <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-emerald-500" />
                  Pacing and Rest Days
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Match days are exhilarating but exhausting—often 10+ hours of walking, standing, and cheering. Schedule a "zero day" after every 3 match days. You will need it to do laundry, sleep in, and actually see the city you are visiting.
                </p>
              </div>
            </div>

            <Callout title="Booking Timeline" type="info">
              <ul className="space-y-3 mt-2">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-slate-900 dark:text-white min-w-[140px]">11 Months Out:</span>
                  <span>Book flights immediately when schedules open (July 2025).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-slate-900 dark:text-white min-w-[140px]">8-10 Months Out:</span>
                  <span>Lock in refundable accommodation. See <InternalLink href="/world-cup-2026-accommodation-guide" text="Accommodation Guide" />.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-slate-900 dark:text-white min-w-[140px]">FIFA Ticket Lottery:</span>
                  <span>Apply whenever the window opens (likely late 2025).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-slate-900 dark:text-white min-w-[140px]">3-6 Months Out:</span>
                  <span>Book inter-city trains/buses and rental cars (Early 2026).</span>
                </li>
              </ul>
            </Callout>
          </Section>

          <Section id="1-week" title="THE 1-WEEK ITINERARIES">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
              Perfect for the "get in, soak it up, get out" strategy. We focus on single regions to minimize travel time.
            </p>

            <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-white/10 shadow-xl mb-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-slate-100 dark:border-white/5 pb-8">
                <div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-4 mb-2">
                    Option 1A: East Coast Express
                    <span className="px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest">Best Seller</span>
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">NYC, Philadelphia, Boston | 3 Matches | Budget: $3,500 - $5,500</p>
                </div>
                <div className="flex gap-2">
                   <AffiliateButton href="https://www.booking.com" text="Book Hotels" icon={Hotel} variant="outline" />
                </div>
              </div>

              <div className="space-y-10 relative before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                
                {/* Day 1 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-emerald-500 text-slate-900 dark:text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-emerald-500/30 z-10">1</div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Arrive New York / New Jersey</h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">Land at EWR (closest to stadium) or JFK. Settle into your base. We recommend staying in Manhattan for the vibe, or Jersey City for budget/proximity.</p>
                  <div className="inline-flex gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-200 dark:border-slate-800">
                    <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Daily Budget: $250</span>
                  </div>
                </div>

                {/* Day 2 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-lg shadow-xl z-10">2</div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                    MATCH DAY: MetLife Stadium
                    <Flag className="w-5 h-5 text-emerald-500" />
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    Morning sleep-in (jet lag). Head to the stadium early (3pm) for Fan Fest. <InternalLink href="/metlife-stadium-world-cup-2026" text="MetLife Guide" />. The train from Penn Station takes ~30 mins but lines will be long.
                  </p>
                  <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/20 mb-4">
                    <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Highlight: Post-match celebration in Times Square.</p>
                  </div>
                  <AffiliateButton href="https://www.viator.com" text="NYC Tours" icon={Map} variant="outline" />
                </div>

                {/* Day 3 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-emerald-500 text-slate-900 dark:text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-emerald-500/30 z-10">3</div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">NYC → Philadelphia</h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    Morning: Statue of Liberty or Central Park.<br/>
                    Afternoon: Amtrak to Philadelphia (1.5 hrs). It is faster and less stressful than driving.<br/>
                    Evening: Cheesesteaks in Old City.
                  </p>
                  <div className="flex gap-4">
                     <AffiliateButton href="https://www.amtrak.com" text="Book Amtrak" icon={Train} variant="secondary" />
                  </div>
                </div>

                 {/* Day 4 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-lg shadow-xl z-10">4</div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                    MATCH DAY: Lincoln Financial Field
                    <Flag className="w-5 h-5 text-emerald-500" />
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    Explore the Rocky Steps and Liberty Bell in the morning. Head to the Sports Complex in South Philly for the match. The atmosphere here is intense.
                  </p>
                  <InternalLink href="/lincoln-financial-field-world-cup-2026" text="Philadelphia Stadium Guide" />
                </div>

                {/* Day 5 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-emerald-500 text-slate-900 dark:text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-emerald-500/30 z-10">5</div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Philadelphia → Boston</h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    Long travel day. Amtrak Acela (5 hrs) or fly PHL-BOS (1.5 hrs). Arrive in Boston for a seafood dinner in the North End.
                  </p>
                </div>

                 {/* Day 6 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-lg shadow-xl z-10">6</div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                    MATCH DAY: Gillette Stadium
                    <Flag className="w-5 h-5 text-emerald-500" />
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    Take the MBTA Commuter Rail from South Station to Foxborough. It is a dedicated train for events. Gillette is huge and loud.
                  </p>
                   <InternalLink href="/gillette-stadium-world-cup-2026" text="Boston Stadium Guide" />
                </div>

                 {/* Day 7 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-emerald-500 text-slate-900 dark:text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-emerald-500/30 z-10">7</div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Depart Boston</h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                    Fly out of Logan (BOS). If time permits, do the Freedom Trail walk before your flight.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-white/10 shadow-xl">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Option 1B: West Coast Sun</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                <strong>Los Angeles & San Francisco</strong> | 2 Matches | Budget: $4,000 - $6,000
                <br/>Focus on California. Fly into LAX. Spend 4 days in LA (SoFi Stadium match + Hollywood/Beach). Drive or fly to San Francisco (Levi's Stadium match + Wine Country).
              </p>
              <AffiliateButton href="#" text="View West Coast Guide" variant="secondary" icon={ArrowRight} />
            </div>
          </Section>

          <Section id="2-weeks" title="THE 2-WEEK ITINERARIES">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
              With 14 days, you can comfortably cover two distinct regions or one massive loop. This allows for 3-5 matches and actual rest days.
            </p>

            <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-white/10 shadow-xl mb-12">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                Option 2A: USA Coast-to-Coast
              </h3>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-emerald-500"></span> Week 1: The East
                  </h4>
                  <ul className="space-y-6 border-l-2 border-slate-200 dark:border-slate-200 dark:border-slate-800 pl-6">
                    <li>
                      <strong className="block text-xl text-slate-900 dark:text-white mb-1">Days 1-3: New York City</strong>
                      <span className="text-slate-600 dark:text-slate-400 leading-relaxed">Sightseeing + 1 Match at MetLife. Experience the global melting pot.</span>
                    </li>
                    <li>
                      <strong className="block text-xl text-slate-900 dark:text-white mb-1">Days 4-6: Miami</strong>
                      <span className="text-slate-600 dark:text-slate-400 leading-relaxed">Fly NYC &rarr; MIA. Beach days, nightlife, and 1 Match at Hard Rock Stadium.</span>
                    </li>
                    <li>
                      <strong className="block text-xl text-slate-900 dark:text-white mb-1">Day 7: Travel Day</strong>
                      <span className="text-slate-600 dark:text-slate-400 leading-relaxed">Fly Miami &rarr; Los Angeles (5 hr flight). Gain 3 hours due to time zone!</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-6 uppercase tracking-wider text-sm flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-emerald-500"></span> Week 2: The West
                  </h4>
                  <ul className="space-y-6 border-l-2 border-slate-200 dark:border-slate-200 dark:border-slate-800 pl-6">
                    <li>
                      <strong className="block text-xl text-slate-900 dark:text-white mb-1">Days 8-11: Los Angeles</strong>
                      <span className="text-slate-600 dark:text-slate-400 leading-relaxed">Hollywood, Santa Monica, and 1 Match at SoFi Stadium.</span>
                    </li>
                    <li>
                      <strong className="block text-xl text-slate-900 dark:text-white mb-1">Days 12-14: Seattle or Vancouver</strong>
                      <span className="text-slate-600 dark:text-slate-400 leading-relaxed">Fly north. End your trip with stunning nature and 1 Match at Lumen Field or BC Place.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-white/10 shadow-xl">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Option 2B: The Texas-Mexico Loop</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                <strong>Dallas, Houston, Monterrey, Mexico City</strong> | 4 Matches | Budget: $4,500 - $7,000
                <br/>Authentic football culture. Start in Dallas (AT&T Stadium). Drive/Bus to Houston (NRG Stadium). Fly to Monterrey (Estadio BBVA). Finish in Mexico City (Azteca). The food on this trip will be legendary.
              </p>
              <div className="flex gap-4">
                <AffiliateButton href="/world-cup-2026-dallas-guide" text="View Texas Guide" variant="secondary" />
                <InternalLink href="/world-cup-2026-mexico-city-guide" text="View CDMX Guide" />
              </div>
            </div>
          </Section>

          <Section id="3-weeks" title="THE 3-WEEK GRAND TOURS">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8">
              For the superfan. This is a marathon. Pace yourself, hydrate, and get ready for 6-8 matches across 3 countries.
            </p>
            
            <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-white/10 shadow-xl">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Option 3A: The Ultimate North American Road Trip</h3>
              
              <div className="space-y-8">
                <div className="pl-6 border-l-4 border-slate-200 dark:border-slate-200 dark:border-slate-800">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Week 1: Canada & Pacific Northwest</h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
                    Start in <strong>Vancouver</strong> (Sea-to-Sky highway, 2 matches). Train/Drive to <strong>Seattle</strong> (Space Needle, 1 match).
                  </p>
                  <InternalLink href="/world-cup-2026-vancouver-guide" text="Vancouver Guide" />
                </div>

                <div className="pl-6 border-l-4 border-slate-200 dark:border-slate-200 dark:border-slate-800">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Week 2: The Northeast Corridor</h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
                    Fly Toronto &rarr; Boston. Take the train down the corridor: <strong>Boston</strong> &rarr; <strong>NYC</strong> &rarr; <strong>Philadelphia</strong>. Catch 3 matches in this dense cluster.
                  </p>
                  <InternalLink href="/world-cup-2026-boston-guide" text="Boston Guide" />
                </div>

                <div className="pl-6 border-l-4 border-emerald-500">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Week 3: Mexico (The Finale)</h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
                    Fly Philly &rarr; <strong>Mexico City</strong>. End your trip with the most passionate fans in the world. Spend 4 days here, seeing Pyramids of Teotihuacan and 2 matches at the legendary Estadio Azteca.
                  </p>
                  <InternalLink href="/world-cup-2026-mexico-city-guide" text="Mexico City Guide" />
                </div>
             </div>

             <div className="mt-12">
                <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-sm">Total Estimated Cost</h4>
                <Table 
                  headers={['Category', 'Budget Level', 'Comfort Level', 'Luxury Level']}
                  rows={[
                    ['Flights', '$1,200', '$2,500', '$5,000+'],
                    ['Accommodation', '$3,000', '$6,000', '$15,000+'],
                    ['Match Tickets', '$1,500', '$3,000', '$10,000+'],
                    ['Food & Fun', '$1,500', '$3,000', '$8,000+'],
                    [<strong key="total">TOTAL</strong>, <strong key="b" className="text-emerald-600">$7,200</strong>, <strong key="c" className="text-emerald-600">$14,500</strong>, <strong key="l" className="text-emerald-600">$38,000+</strong>]
                  ]}
                />
             </div>
            </div>
          </Section>

          <Section id="customization" title="Customizing Your Trip">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center mb-6">
                  <Flag className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Follow Your Team (The "TBA" Route)</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  If you only care about one country, you cannot plan 100% until the Final Draw (Dec 2025). However, you can book refundable hotels in likely hubs based on group seeds.
                </p>
                <Callout title="Pro Tip" type="warning">
                  Group seeds (A1, B1, etc.) play in specific cities. Check the schedule now!
                </Callout>
              </div>

              <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-900 dark:text-white flex items-center justify-center mb-6">
                  <Map className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Base Camp Strategy</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  Pick one major hub (e.g., Dallas or LA) and stay there for 2 weeks. Fly out for day trips to matches in nearby cities, then return to the same hotel bed.
                </p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Less Packing/Unpacking</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Bulk Hotel Discounts</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Feels like "Living" there</li>
                </ul>
              </div>
            </div>
          </Section>

        </main>
      </div>
      
      
    </div>
  );
}



