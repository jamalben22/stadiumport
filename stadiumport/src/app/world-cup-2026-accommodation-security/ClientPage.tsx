'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import {
  MapPin, Calendar, Users, ArrowRight, Info, CheckCircle2,
  Trophy, Plane, Hotel, Ticket, Share2, MessageSquare,
  ThumbsUp, Send, HelpCircle, Utensils, Camera, Sun,
  DollarSign, Shield, Clock, Globe, Star, ExternalLink,
  Train, Bus, Car, Bike, AlertTriangle, Briefcase,
  X, ChevronRight, Facebook, Twitter, Linkedin, Copy,
  ShieldAlert, Lock, XCircle, Search, CreditCard, Smartphone, User, Flag, Wifi, FileText, Eye, ShieldCheck, Ban, Home, AlertOctagon, Key, DoorClosed,
  Building2
} from 'lucide-react';



// --- Design System & Components (Mirrored from Scams Guide) ---

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

// 1. Floating Social Share
const SocialShare = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Check out this World Cup 2026 Accommodation Security Guide!";
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
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
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed left-4 top-1/3 z-40 hidden xl:flex flex-col gap-3"
    >
      <div className="backdrop-blur-md p-2 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col gap-3">
        <button 
          onClick={() => handleShare('twitter')}
          className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </button>
        <button 
          onClick={() => handleShare('facebook')}
          className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </button>
        <button 
          onClick={() => handleShare('linkedin')}
          className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </button>
        <button 
          onClick={handleCopy}
          className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors relative"
          aria-label="Copy Link"
        >
          {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
        </button>
      </div>
    </motion.div>
  );
};

// 2. Section Component
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
          <span className="text-emerald-600 dark:text-emerald-500 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">Accommodation Safety</span>
          {title}
        </h2>
        {children}
      </motion.div>
    </section>
  );
};

// 3. Affiliate Button
const AffiliateButton = ({ href, text, icon: Icon = ArrowRight, variant = 'primary', subtext }: { href: string, text: string, icon?: any, variant?: 'primary' | 'secondary' | 'outline', subtext?: string }) => {
  const baseClasses = "group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden";
  const variants = {
    primary: "bg-emerald-500 text-slate-900 dark:text-white hover:bg-emerald-400 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.6)]",
    secondary: "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xl",
    outline: "border-2 border-slate-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-900 dark:text-white bg-transparent"
  };

  const isExternal = href.startsWith('http');

  return (
    <Link 
      href={href} 
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`${baseClasses} ${variants[variant]} flex-col md:flex-row`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />}
        {text}
      </span>
      {subtext && <span className="relative z-10 text-xs font-normal opacity-80 md:ml-2">({subtext})</span>}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
    </Link>
  );
};

// 4. FAQ Item
const FAQItem = ({ question, answer }: { question: string, answer: string }) => (
  <details className="group border-b border-slate-200 dark:border-white/10">
    <summary className="flex items-center justify-between py-6 cursor-pointer list-none">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors pr-8">
        {question}
      </h3>
      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-slate-300 dark:border-white/10 group-open:bg-emerald-500 group-open:border-emerald-500 group-open:text-slate-900 dark:text-white transition-all duration-300">
        <ChevronRight className="w-4 h-4 transition-transform duration-300 group-open:rotate-90" />
      </span>
    </summary>
    <div className="pb-8 text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
      {answer}
    </div>
  </details>
);

// 5. Custom Content Boxes
const RedFlagBox = ({ title, items }: { title: string, items: string[] }) => (
  <div className="p-8 rounded-[2rem] border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 mb-8 hover:shadow-2xl transition-all duration-300">
    <h4 className="font-bold text-2xl mb-6 text-red-700 dark:text-red-400 flex items-center gap-3">
      <ShieldAlert className="w-8 h-8"/>
      {title}
    </h4>
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-lg">
          <div className="w-2 h-2 bg-red-500 rounded-full mt-2.5 shrink-0" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const GreenShieldBox = ({ title, items }: { title: string, items: string[] }) => (
  <div className="p-8 rounded-[2rem] border border-emerald-200 dark:border-emerald-900/30 bg-emerald-50/50 dark:bg-emerald-900/10 mb-8 hover:shadow-2xl transition-all duration-300">
    <h4 className="font-bold text-2xl mb-6 text-emerald-700 dark:text-emerald-400 flex items-center gap-3">
      <ShieldCheck className="w-8 h-8"/>
      {title}
    </h4>
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-lg">
          <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
          <span className="leading-relaxed font-medium">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const StatCard = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="p-8 rounded-[2rem] transition-colors bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 hover:shadow-xl">
    <Icon className="w-10 h-10 text-emerald-500 mb-6" />
    <h4 className="font-bold text-3xl mb-3 text-slate-900 dark:text-white">{value}</h4>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{label}</p>
  </div>
);

// --- Main Page Component ---

export default function ClientPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSection, setActiveSection] = useState('hero');

  // Navigation Links
  const navLinks = [
    { id: 'risks', label: 'Risks' },
    { id: 'pre-booking', label: 'Pre-Booking' },
    { id: 'hotel-security', label: 'Hotel Security' },
    { id: 'rentals', label: 'Airbnb & Rentals' },
    { id: 'check-in', label: 'Check-In' },
    { id: 'in-room', label: 'In-Room' },
    { id: 'scams', label: 'Scam Prevention' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0A0A0A] font-sans selection:bg-emerald-500/30">
      
      <SocialShare />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* 1. Hero Section */}
      <div className="relative h-[65vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/safety-guide/Accommodation Security_Safe Stays.webp" 
            alt="World Cup 2026 Accommodation Security" 
            fill 
            className="object-cover object-center"
            priority quality={60} 
            sizes="100vw" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-[#0A0A0A]/60 to-[#F5F5F7] dark:to-[#0A0A0A]" />
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
                  { label: 'Safety Guide', href: '/world-cup-2026-safety-guide' },
                  { label: 'Accommodation Security', href: '/world-cup-2026-accommodation-security' }
                ]} 
              />

              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                    Last Updated: January 4, 2026
                  </span>
                <span className="px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Essential Security
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
                  Safe Stays
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                World Cup 2026 Accommodation Security
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                The definitive guide to securing your sanctuary during World Cup 2026. From booking verification to in-room defense.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto px-6 gap-20 relative pt-16">
        
        {/* 2. Sticky Table of Contents */}
        <aside className="hidden lg:block w-72 shrink-0 relative">
          <div className="sticky top-40 max-h-[calc(100vh-10rem)] overflow-y-auto pr-4 scrollbar-hide">
            <h3 className="font-black text-slate-900 dark:text-white mb-6 px-3 text-lg uppercase tracking-wider">Contents</h3>
            <div className="space-y-1 relative border-l-2 border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800 ml-3">
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
          
          {/* Disclosure */}
          <div className="mb-12 p-6 rounded-2xl text-sm text-slate-500 dark:text-slate-400 flex gap-4 items-start bg-slate-100 dark:bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50">
            <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Transparency:</strong> This guide contains affiliate links. We may earn a commission if you book through them, which helps fund our independent journalism.
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
             <div className="pl-6 border-l-4 border-emerald-500 my-12 italic text-slate-800 dark:text-slate-200 font-medium text-xl">
               <strong>The Goal:</strong> With the right preparation, your accommodation can be exactly what it should be—a safe fortress where you can recharge.
             </div>
             <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
               Imagine arriving in Mexico City at midnight after a thrilling match, only to find your "luxury apartment" rental doesn&apos;t exist, or the key code you were sent is invalid. This isn&apos;t just an inconvenience—it&apos;s a critical security vulnerability.
             </p>
             <p className="text-lg text-slate-600 dark:text-slate-400">
               With World Cup 2026 spanning three countries and sixteen host cities, the accommodation landscape is vast and complex. Millions of fans will be vying for limited rooms, creating a breeding ground for scammers and opportunistic criminals.
             </p>
          </div>

          <Section id="risks" title="UNDERSTANDING RISKS">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard icon={Home} label="Fake Listings Risk" value="High" />
              <StatCard icon={Users} label="Target Audience" value="Tourists" />
              <StatCard icon={Globe} label="Host Countries" value="3" />
              <StatCard icon={Shield} label="Security Level" value="Critical" />
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Historical Context</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-lg">
                During the 2014 World Cup in Brazil, there was a spike in "express kidnappings" originating from fake accommodation listings. In Russia 2018, the threat shifted to cybercrime and Wi-Fi spoofing in hotels.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                For 2026, the risks are a hybrid: property theft and location safety in the USA, cartel-related violence in specific non-tourist zones in Mexico, and sophisticated digital rental fraud in Canada.
              </p>
            </div>

            <RedFlagBox 
              title="The 'Price Gouging' Trap"
              items={[
                "Criminals know you are desperate for affordable rooms.",
                "They create listings priced slightly below market rate—believable, but tempting.",
                "If a deal feels like a 'lucky find' in a sold-out city, it is almost certainly a scam."
              ]}
            />
          </Section>

          <Section id="pre-booking" title="PRE-BOOKING SECURITY">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              Security starts months before you pack your bags. The most critical decision you make is <em>where</em> you book and <em>who</em> you book with.
            </p>

            <GreenShieldBox 
              title="The Platform Matters"
              items={[
                "Booking.com / Expedia: Robust verification for hotels. Look for 'Genius' or 'Verified' badges.",
                "Airbnb Plus: Properties are physically inspected for quality and design, implicitly verifying their existence.",
                "Official FIFA Agency: The safest bet for guaranteed legitimacy, though often at a premium."
              ]}
            />

            <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800 mb-12">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Location Security Intelligence</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">
                Don&apos;t just look at distance to the stadium. Use Google Maps Street View to &quot;walk&quot; the neighborhood virtually.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Lighting:</strong> Are the streets well-lit?</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Condition:</strong> Are there broken windows, graffiti, or signs of neglect?</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Business Activity:</strong> Are there 24-hour businesses nearby (safer) or is it an industrial wasteland?</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4">
              <AffiliateButton href="https://booking.com" text="Search Verified Hotels" icon={Home} variant="primary" />
              <AffiliateButton href="https://worldnomads.com" text="Get Trip Protection" icon={ShieldCheck} variant="secondary" />
            </div>
          </Section>

          <Section id="hotel-security" title="HOTEL SECURITY">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              Not all hotels are created equal. A 5-star luxury resort might have lax access control, while a 3-star business hotel might be a fortress.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-6 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-8 h-8" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Essential Features</h3>
                </div>
                <ul className="space-y-4">
                  {['24/7 Front Desk (Human presence)', 'Electronic Key Card Access', 'In-Room Safe (Laptop sized)', 'Interior Corridors'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-6 text-blue-600 dark:text-blue-400">
                  <Shield className="w-8 h-8" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Advanced Security</h3>
                </div>
                <ul className="space-y-4">
                  {['Security Guards at entrances', 'CCTV in all public areas', 'Restricted floor access (Elevators)', 'Deadbolts AND safety latches'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <GreenShieldBox 
              title="ProTip: Request the Right Room"
              items={[
                "Ask for a room between the 3rd and 6th floors.",
                "Ground and 2nd floors are accessible to intruders from the street.",
                "Floors above the 6th are often beyond the reach of standard fire department ladders.",
                "It is the 'Goldilocks zone' of safety."
              ]}
            />
          </Section>

          <Section id="rentals" title="AIRBNB & RENTALS">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              Vacation rentals offer space and kitchen amenities, but they lack the institutional security of hotels. You are essentially staying in a stranger&apos;s house.
            </p>

            <GreenShieldBox 
              title="Verification Checklist"
              items={[
                "Review Count: Look for 20+ reviews. Read the worst reviews first.",
                "Host Status: Prioritize 'Superhosts' or 'Premier Hosts'. They have a track record.",
                "Photo Analysis: Perform a reverse image search to catch stolen listings.",
                "Communication: Ask specific questions (e.g., 'What type of lock is on the door?'). Vague answers are red flags."
              ]}
            />

            <RedFlagBox 
              title="The 'Hidden Camera' Concern"
              items={[
                "It's a rare but real violation. Check smoke detectors, alarm clocks, and USB chargers.",
                "Look for bathroom vents or devices positioned oddly.",
                "Use a flashlight to check for lens reflections. If found, leave immediately."
              ]}
            />
          </Section>

          <Section id="check-in" title="CHECK-IN PROTOCOLS">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              Your security routine begins the moment you step onto the property. Do not let the relief of arrival dull your senses.
            </p>

            <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">The 5-Minute Room Sweep</h3>
              <div className="space-y-6">
                {[
                  { title: "Prop the Door Open", desc: "Do not let the door close behind you until you have checked the room. Use your luggage as a stop." },
                  { title: "Check Hiding Spots", desc: "Look under the bed, in the closet, and behind the shower curtain. Ensure you are alone." },
                  { title: "Test the Locks", desc: "Verify the deadbolt works. Check that window locks function (especially on ground floors)." },
                  { title: "Sanitize & Secure", desc: "Wipe down high-touch surfaces and locate the emergency exit map." },
                  { title: "Close & Latch", desc: "Now, close the door and engage all locks, including the safety latch/chain." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xl">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-2">{step.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section id="in-room" title="IN-ROOM DEFENSE">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-light">
              Once you are settled, maintain a &quot;defensive posture&quot; for your room. It sounds intense, but it quickly becomes habit.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Door Security Upgrades</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Don&apos;t rely solely on hotel locks. Master keys are widely available. We recommend carrying a <strong>Portable Door Lock</strong> or <strong>Door Stop Alarm</strong>.
                </p>
                <div className="flex flex-col gap-3">
                  <AffiliateButton href="#" text="Shop Portable Door Locks" icon={Lock} variant="outline" />
                  <AffiliateButton href="#" text="Shop Door Stop Alarms" icon={AlertOctagon} variant="outline" />
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The TV Illusion</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  When leaving your room for the evening match, leave the TV on at a moderate volume and keep a light on. This simple trick simulates presence and deters opportunistic entry.
                </p>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                  <p className="text-emerald-800 dark:text-emerald-300 text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Simple but effective strategy.
                  </p>
                </div>
              </div>
            </div>

            <GreenShieldBox 
              title="The 'Do Not Disturb' Strategy"
              items={[
                "Keep the sign on your door at all times, even when you are out.",
                "It suggests occupancy to potential intruders.",
                "If you need housekeeping, call the front desk to request it specifically while you are present."
              ]}
            />
          </Section>

          <Section id="scams" title="SCAM PREVENTION">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              Scammers are creative. Be aware of these common accommodation-related frauds targeting World Cup fans.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 rounded-[2rem] border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10">
                <h4 className="font-bold text-xl text-red-700 dark:text-red-400 mb-4 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6"/> The &quot;Front Desk&quot; Call
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  <strong>The Scam:</strong> You get a call to your room phone late at night. &quot;This is the front desk. There was an issue with your credit card. Please verify the number.&quot;
                </p>
                <p className="text-slate-700 dark:text-slate-300 font-bold">
                  The Fix: Never give info over the phone. Hang up and go down to the desk in person.
                </p>
              </div>

              <div className="p-8 rounded-[2rem] border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10">
                <h4 className="font-bold text-xl text-red-700 dark:text-red-400 mb-4 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6"/> The Pizza Delivery Trap
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  <strong>The Scam:</strong> A flyer for pizza delivery is slid under your door. You call, order, and give your card number. The pizza never comes; the charge is fraudulent.
                </p>
                <p className="text-slate-700 dark:text-slate-300 font-bold">
                  The Fix: Only order from established chains or restaurants you find yourself.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <AffiliateButton href="/world-cup-2026-scams-avoid-fraud" text="Read Complete Scams Guide" icon={ShieldAlert} variant="secondary" />
            </div>
          </Section>

          <Section id="faq" title="FREQUENTLY ASKED QUESTIONS">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </Section>

        </main>
      </div>
      
    </div>
  );
}

const faqs = [
  {
    question: "Is Airbnb safe for World Cup 2026?",
    answer: "Yes, if you take precautions. Stick to 'Superhosts' or 'Airbnb Plus' listings, read recent reviews carefully, and never communicate or pay outside the platform. Be wary of new listings with no reviews during the tournament period."
  },
  {
    question: "What are the safest hotels for World Cup 2026?",
    answer: "International chain hotels often offer standardized security features like 24/7 reception, surveillance, and secure key card access. However, many boutique hotels also have excellent security. Always check for a 24-hour front desk."
  },
  {
    question: "How can I secure my hotel room?",
    answer: "Always use the deadbolt and safety latch when inside. Use a portable door lock for extra security. Keep valuables in the room safe or hotel front desk safe, and use the 'Do Not Disturb' sign when you leave for short periods."
  },
  {
    question: "Are hostels safe for World Cup travelers?",
    answer: "Reputable hostels can be very safe. Look for ones with lockers (bring your own padlock), 24-hour security/reception, and key card access to dorm rooms. Read reviews specifically mentioning security."
  },
  {
    question: "What should I do if I suspect a fake listing?",
    answer: "Do not book it. Perform a reverse image search of the photos. Check if the price is unrealistically low. If you've already booked, contact the platform's support immediately and do not send any more money."
  },
  {
    question: "Is it safe to stay in downtown areas of host cities?",
    answer: "Most host city downtowns are safe, especially near stadiums and tourist zones where police presence will be high. However, research specific neighborhoods in cities like Mexico City, Los Angeles, or Philadelphia to avoid high-crime zones."
  }
];




