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
  ShieldAlert, Lock, XCircle, Search, CreditCard, Smartphone, User, Flag, Wifi, FileText, Eye, ShieldCheck, Ban,
  Stethoscope, Siren, HeartPulse
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
    const text = "Check out this World Cup 2026 Travel Insurance Guide!";
    
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
          <span className="text-emerald-600 dark:text-emerald-500 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">Complete Protection</span>
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
    { id: 'necessity', label: 'Why You Need It' },
    { id: 'coverage', label: 'What Is Covered' },
    { id: 'costs', label: 'Estimated Costs' },
    { id: 'providers', label: 'Top Providers' },
    { id: 'scenarios', label: 'Real Scenarios' },
    { id: 'tips', label: 'Money Saving Tips' },
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

      {/* 1. Hero Section - Refined & Minimal */}
      <div className="relative h-[65vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/safety-guide/A_realistic_high-detail_photo_of_travel_insurance_essentials_for_World_Cup_2026.webp" 
            alt="World Cup 2026 Travel Insurance Guide" 
            fill 
            className="object-cover object-center"
            priority quality={60} 
            sizes="100vw" />
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
                { label: 'Travel Insurance', href: '/world-cup-2026-travel-insurance-guide' }
              ]} 
            />

              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Last Updated: January 4, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Essential Protection
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
                  Financial Safety
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                World Cup 2026 Travel Insurance Guide
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                Complete Protection Guide. <span className="text-slate-900 dark:text-white font-medium">Medical, Cancellation & Evacuation Coverage</span>.
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
          
          {/* Disclosure */}
          <div className="mb-12 p-6 rounded-2xl text-sm text-slate-500 dark:text-slate-400 flex gap-4 items-start bg-slate-100 dark:bg-slate-50 dark:bg-slate-900/50">
            <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Transparency:</strong> This guide contains affiliate links. We may earn a commission if you book through them, which helps fund our independent journalism.
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
             <div className="pl-6 border-l-4 border-amber-500 my-12 italic text-slate-800 dark:text-slate-200 font-medium text-xl">
               <strong>The Reality:</strong> A single medical emergency in the USA can cost more than your entire trip. Travel insurance is not optional—it is financial survival.
             </div>
             <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
               One broken leg in New York? $30,000. An emergency evacuation from a remote stadium? $100,000+. The US healthcare system is the most expensive in the world.
             </p>
             <p className="text-lg text-slate-600 dark:text-slate-400">
               Attending the World Cup is a major investment. You are spending thousands on tickets, flights, and hotels. Protecting that investment costs a fraction of the total price. This guide explains exactly what coverage you need, what to avoid, and how to get the best protection for your specific situation.
             </p>
          </div>

          <Section id="necessity" title="Why You Need It">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard icon={Stethoscope} label="Avg ER Visit Cost" value="$3,000+" />
              <StatCard icon={Plane} label="Medical Evacuation" value="$100k+" />
              <StatCard icon={DollarSign} label="Avg Policy Cost" value="$150" />
              <StatCard icon={ShieldAlert} label="Financial Risk" value="Extreme" />
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The Healthcare Cost Trap</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-lg">
                Your domestic health insurance likely <strong>does not work</strong> internationally. Even if it does, it almost never covers medical evacuation, which is critical if you are injured in a crowded stadium zone or need transport back to your home country.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                In the USA, hospitals can charge $50 for a single aspirin. In Mexico, private hospitals often demand credit card payment upfront before treatment. In Canada, non-residents pay premium rates. You need a policy that pays these bills so you don't have to.
              </p>
            </div>
          </Section>

          <Section id="coverage" title="What Is Covered">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              Comprehensive travel insurance is a bundle of protections. Here is what matters most for a World Cup trip.
            </p>

            <div className="space-y-16">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">1. Emergency Medical & Evacuation</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  This is the core of your policy. It covers hospital stays, surgeries, doctor visits, and prescriptions.
                </p>
                <GreenShieldBox 
                  title="MUST-HAVE Medical Coverage"
                  items={[
                    "Minimum $100,000 Emergency Medical limit (USA is expensive!)",
                    "Minimum $250,000 Medical Evacuation limit (to fly you home)",
                    "Coverage for COVID-19 treatment (still required by some policies)",
                    "24/7 Emergency Assistance hotline (essential for navigation)",
                    "Direct Pay capability (so you don't pay out of pocket)"
                  ]}
                />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">2. Trip Cancellation & Interruption</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  Life happens. If you get sick before the trip, or a family member has an emergency while you are away, you shouldn't lose your entire trip investment.
                </p>
                <RedFlagBox 
                  title="What is usually NOT Covered"
                  items={[
                    "Changing your mind (unless you buy CFAR 'Cancel For Any Reason')",
                    "Fear of travel or civil unrest (unless specifically stated)",
                    "Injuries sustained while intoxicated (common exclusion!)",
                    "Pre-existing conditions (unless you buy a waiver early)",
                    "High-risk activities (check if 'sports' are covered)"
                  ]}
                />
              </div>
            </div>
          </Section>

          <Section id="costs" title="Estimated Costs">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">The 4-8% Rule</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  A good comprehensive policy typically costs between <strong>4% and 8%</strong> of your total insured trip cost.
                </p>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  If your trip (flights + hotels + tickets) costs $5,000, expect to pay <strong>$200-$400</strong> for insurance. Older travelers will pay more, while younger travelers may pay less.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 shadow-xl">
                 <h4 className="font-bold text-xl mb-6 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-200 dark:border-slate-800 pb-4">Cost Examples (35-year-old traveler)</h4>
                 <div className="space-y-4">
                   <div className="flex justify-between items-center">
                     <span className="text-slate-600 dark:text-slate-400">Total Trip Cost: $3,000</span>
                     <span className="font-bold text-emerald-600 text-lg">$120 - $180</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-slate-600 dark:text-slate-400">Total Trip Cost: $7,000</span>
                     <span className="font-bold text-emerald-600 text-lg">$250 - $350</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-slate-600 dark:text-slate-400">Total Trip Cost: $12,000</span>
                     <span className="font-bold text-emerald-600 text-lg">$450 - $600</span>
                   </div>
                 </div>
              </div>
            </div>
          </Section>

          <Section id="providers" title="Top Providers">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              We recommend reputable providers with strong financial backing and proven track records for handling international claims.
            </p>
            
            <div className="grid gap-6">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-md transition-all">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Allianz Travel Insurance</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">Best for overall coverage and reliability. Known for fast claims processing and global support network.</p>
                  <div className="flex gap-2 text-sm text-emerald-600 font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Great App
                    <CheckCircle2 className="w-4 h-4" /> "Cancel Anytime" upgrades
                  </div>
                </div>
                <AffiliateButton href="https://www.allianz-assistance.com" text="Get Quote" variant="primary" icon={ExternalLink} />
              </div>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-md transition-all">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">World Nomads</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">Best for adventurous travelers. Covers over 150 activities and sports that others exclude.</p>
                  <div className="flex gap-2 text-sm text-emerald-600 font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Adventure Sports
                    <CheckCircle2 className="w-4 h-4" /> Flexible dates
                  </div>
                </div>
                <AffiliateButton href="https://www.worldnomads.com" text="Get Quote" variant="outline" icon={ExternalLink} />
              </div>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-md transition-all">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">SafetyWing</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">Best for digital nomads and long-term travelers. Subscription-based model is very affordable.</p>
                  <div className="flex gap-2 text-sm text-emerald-600 font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Monthly subscription
                    <CheckCircle2 className="w-4 h-4" /> COVID-19 coverage
                  </div>
                </div>
                <AffiliateButton href="https://safetywing.com" text="Get Quote" variant="outline" icon={ExternalLink} />
              </div>
            </div>
          </Section>

          <Section id="scenarios" title="Real Scenarios">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { scenario: "Appendicitis in Dallas", without: "$40,000 bill", with: "$0 (after deductible)" },
                { scenario: "Flight cancelled, miss match", without: "Lose $1,500 ticket", with: "Reimbursed" },
                { scenario: "Family emergency back home", without: "$2,000 new flight", with: "Covered" },
                { scenario: "Break leg, need evacuation", without: "$100,000+", with: "Fully Covered" }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-4">{item.scenario}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-red-50 dark:bg-red-900/10 rounded-xl text-red-700 dark:text-red-400">
                      <span>Without Insurance:</span>
                      <span className="font-bold">{item.without}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl text-emerald-700 dark:text-emerald-400">
                      <span>With Insurance:</span>
                      <span className="font-bold">{item.with}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="tips" title="Money Saving Tips">
             <div className="bg-slate-900 text-slate-900 dark:text-white p-10 rounded-[2rem] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
               <div className="relative z-10">
                 <h3 className="text-3xl font-bold mb-8">How to Lower Your Premium</h3>
                 <ul className="grid md:grid-cols-2 gap-6">
                   <li className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 font-bold">1</div>
                     <div>
                       <h4 className="font-bold text-lg mb-1">Insure Non-Refundable Only</h4>
                       <p className="text-slate-400 text-sm">Don't insure refundable flight tickets. Only insure the costs you would actually lose.</p>
                     </div>
                   </li>
                   <li className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 font-bold">2</div>
                     <div>
                       <h4 className="font-bold text-lg mb-1">Buy Early</h4>
                       <p className="text-slate-400 text-sm">Buying within 14 days of your first deposit often unlocks "Pre-existing Condition" waivers at no extra cost.</p>
                     </div>
                   </li>
                   <li className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 font-bold">3</div>
                     <div>
                       <h4 className="font-bold text-lg mb-1">Compare Quotes</h4>
                       <p className="text-slate-400 text-sm">Prices vary wildly. Use a comparison site like Squaremouth or InsureMyTrip.</p>
                     </div>
                   </li>
                   <li className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 font-bold">4</div>
                     <div>
                       <h4 className="font-bold text-lg mb-1">Check Credit Cards</h4>
                       <p className="text-slate-400 text-sm">Premium cards (Amex Platinum, Chase Sapphire) offer some coverage. Check limits before buying more.</p>
                     </div>
                   </li>
                 </ul>
               </div>
             </div>
          </Section>

          <Section id="faq" title="Frequently Asked Questions">
            <div className="space-y-2">
              <FAQItem 
                question="Does my domestic health insurance cover me?"
                answer="Likely not. Most domestic plans (including Medicare in the US) provide zero coverage outside your home country. Even if they do, they rarely cover medical evacuation, which is the most expensive risk."
              />
              <FAQItem 
                question="When should I buy travel insurance?"
                answer="Ideally, immediately after making your first trip deposit (like buying a flight or paying a hotel deposit). Buying within 14-21 days of this date often qualifies you for extra benefits like 'Cancel for Any Reason' and pre-existing condition waivers."
              />
              <FAQItem 
                question="Does insurance cover World Cup tickets?"
                answer="It depends. If you buy a comprehensive policy that includes 'Event Ticket Protection', yes. However, basic medical policies do not cover ticket costs. Read the fine print carefully."
              />
              <FAQItem 
                question="What is 'Cancel For Any Reason' (CFAR)?"
                answer="Standard insurance only covers cancellations for specific reasons (illness, death, jury duty). CFAR allows you to cancel for literally any reason (even just changing your mind) and get 50-75% of your money back. It usually costs 40-50% more."
              />
            </div>
          </Section>

        </main>
      </div>
      
    </div>
  );
}



