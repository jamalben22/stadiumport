'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { 
  MapPin, Calendar, Users, ArrowRight, Info, CheckCircle2, 
  Trophy, Plane, Hotel, Ticket, Share2, MessageSquare, 
  ThumbsUp, Send, HelpCircle, Utensils, Camera, Sun, 
  DollarSign, Shield, Clock, Globe, Star, ExternalLink,
  Train, Bus, Car, Bike, AlertTriangle, Briefcase,
  Bookmark, X, ChevronRight, Facebook, Twitter, Linkedin, Copy,
  ShieldAlert, Lock, XCircle, Search, CreditCard, Smartphone, User, Flag, Wifi, FileText, Eye, ShieldCheck, Ban,
  Siren, CloudLightning, Accessibility, LogOut, ListChecks, Home, UserCheck
} from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

// --- Design System & Components (Mirrored from Atlanta City Guide) ---

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
    const text = "Check out this Stadium Safety Guide for World Cup 2026!";
    
    let shareUrl = '';
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
          aria-label="Copy link"
        >
          {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
          {copied && (
            <span className="absolute left-full ml-2 px-2 py-1 bg-emerald-500 text-slate-900 dark:text-white text-xs rounded whitespace-nowrap">
              Copied!
            </span>
          )}
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
          <span className="text-emerald-600 dark:text-emerald-500 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">Security Guide</span>
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

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={`${baseClasses} ${variants[variant]} flex-col md:flex-row w-full md:w-auto`}>
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

// 5. Custom Content Boxes (Adapted to Atlanta Design)
const RedFlagBox = ({ title, items }: { title: string, items: string[] }) => (
  <div className="p-8 rounded-[2rem] border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 mb-8 hover:shadow-2xl transition-all duration-300">
    <h4 className="font-bold text-2xl mb-6 text-red-700 dark:text-red-400 flex items-center gap-3">
      <Ban className="w-8 h-8"/>
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
      <CheckCircle2 className="w-8 h-8"/>
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
    { id: 'environment', label: 'Security Environment' },
    { id: 'preparation', label: 'Before You Arrive' },
    { id: 'bag-policy', label: 'Clear Bag Policy' },
    { id: 'wear', label: 'What to Wear' },
    { id: 'prohibited', label: 'Prohibited Items' },
    { id: 'arrival', label: 'Arrival Timeline' },
    { id: 'emergency', label: 'Emergency Info' },
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
            src="/images/safety-guide/A_realistic_high-detail_photo_of_a_modern_football_stadium_entrance_during_World_cup_2026.webp" 
            alt="World Cup 2026 Stadium Safety" 
            fill 
            className="object-cover object-center"
            priority 
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
                { label: 'Stadium Safety', href: '/world-cup-2026-stadium-safety' }
              ]} 
            />

              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Last Updated: January 4, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-blue-500/30 text-blue-400 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Venue Security
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                World Cup 2026 Stadium Safety Guide
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                Security Rules & What to Expect at World Cup 2026. <span className="text-slate-900 dark:text-white font-medium">Know Before You Go</span>.
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
          
          {/* Intro Text */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
             <div className="pl-6 border-l-4 border-emerald-500 my-12 italic text-slate-800 dark:text-slate-200 font-medium text-xl">
               <strong>The Reality:</strong> World Cup 2026 will be the most secure sporting event in history. Security will be intense, but it is there for your protection.
             </div>
             <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
               If you haven&apos;t attended a major global sporting event since the mid-2010s, you need to reset your expectations. Post-9/11 and following the 2015 Paris attacks, stadium security has evolved from a simple ticket tear to a sophisticated, multi-layered operation that rivals international airport screening.
             </p>
             <p className="text-lg text-slate-600 dark:text-slate-400">
                With 104 matches across 16 stadiums in three countries, security forces—including the FBI, DHS, RCMP, and Mexican Federal Police—are coordinating an unprecedented safety net.
             </p>
             <p className="text-lg text-slate-600 dark:text-slate-400">
                Knowing exactly what to expect—from the clear bag policy to the body scanners—turns a potentially stressful 45-minute wait into a smooth, confident entry so you can focus on what matters: the beautiful game.
             </p>
          </div>

          <Section id="environment" title="The Security Environment">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
               <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all">
                  <Smartphone className="w-10 h-10 text-emerald-500 mb-6" />
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Digital Verification</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">100% mobile ticketing with dynamic barcodes to prevent fraud.</p>
               </div>
               <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all">
                  <UserCheck className="w-10 h-10 text-emerald-500 mb-6" />
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Advanced Screening</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Evolv technology and AI threat detection systems.</p>
               </div>
               <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all">
                  <Search className="w-10 h-10 text-emerald-500 mb-6" />
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">K-9 Units</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Explosive and narcotic detection dogs patrolling perimeters.</p>
               </div>
               <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all">
                  <MapPin className="w-10 h-10 text-emerald-500 mb-6" />
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Perimeter Zones</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Security checks starting 1-2 miles from the stadium.</p>
               </div>
            </div>

            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">What &quot;Stadium Security&quot; Means for You</h3>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-light">
              It means you cannot just &quot;walk up&quot; to the gate 10 minutes before kickoff. The process involves multiple checkpoints:
            </p>
            <div className="space-y-4 mb-12">
               {[
                  { title: "Outer Perimeter", desc: "Visual checks and vehicle screening." },
                  { title: "Bag Inspection", desc: "Strict adherence to size and type rules." },
                  { title: "Mag & Bag", desc: "Metal detectors and body scanners." },
                  { title: "Ticket Scan", desc: "Digital validation." }
               ].map((step, i) => (
                 <div key={i} className="flex items-start gap-6 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-200 dark:border-slate-800">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-lg font-bold text-emerald-600 dark:text-emerald-400">{i + 1}</span>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{step.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400">{step.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-[2rem] border border-blue-100 dark:border-blue-900/30">
              <p className="font-bold text-blue-800 dark:text-blue-200 flex items-center gap-3 mb-4 text-xl">
                <Info className="w-6 h-6" />
                Golden Rule
              </p>
              <p className="text-blue-900/80 dark:text-blue-200/80 leading-relaxed text-lg">
                Treat stadium entry like an international flight. Arrive early, pack light, and have your documents ready.
              </p>
            </div>
          </Section>

          <Section id="preparation" title="Before You Arrive: Preparation is Key">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Required Items Checklist</h3>
            <GreenShieldBox 
              title="Must Have Items"
              items={[
                "Match Ticket (Digital + Printed Backup)",
                "Government Photo ID (Passport/License)",
                "Credit Card (Venues are Cashless)",
                "Fully Charged Phone (Power Bank recommended)"
              ]}
            />
          </Section>

          <Section id="bag-policy" title="The Clear Bag Policy (CRITICAL)">
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed font-light">
              Most World Cup 2026 stadiums enforce a strict <strong>Clear Bag Policy</strong>. This is non-negotiable. If your bag does not meet these specs, you will be forced to return it to your car (miles away) or throw it away.
            </p>

            <GreenShieldBox 
               title="Allowed Bags" 
               items={[
                  "Clear plastic, vinyl, or PVC bags (max 12\" x 6\" x 12\")",
                  "One-gallon clear resealable plastic storage bag (Ziploc type)",
                  "Small clutch bags (max 4.5\" x 6.5\") - does NOT need to be clear",
                  "Diaper bags (must be accompanied by a child)"
               ]}
            />

            <RedFlagBox 
               title="NOT Allowed" 
               items={[
                  "Backpacks (solid or clear)",
                  "Purses larger than a clutch",
                  "Camera bags or binocular cases",
                  "Fanny packs (unless clear 12x6x12)",
                  "Mesh bags or tinted plastic bags"
               ]}
            />

            <div className="flex flex-col sm:flex-row gap-6 mb-12 mt-8">
               <AffiliateButton href="https://www.amazon.com/s?k=clear+stadium+bags" text="Get Approved Clear Stadium Bags" icon={ShieldCheck} variant="primary" />
               <AffiliateButton href="/world-cup-2026-travel-tips" text="See Complete Packing List" icon={ListChecks} variant="outline" />
            </div>
          </Section>

          <Section id="wear" title="What to Wear: Strategy for Speed">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
               <div className="bg-emerald-50 dark:bg-emerald-900/10 p-8 rounded-[2rem] border border-emerald-100 dark:border-emerald-900/30">
                  <h4 className="font-bold text-xl text-emerald-900 dark:text-emerald-200 mb-6 flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5" />
                    Recommended
                  </h4>
                  <ul className="space-y-3 text-slate-700 dark:text-slate-300 text-lg">
                    <li>• Team Jersey/Colors</li>
                    <li>• Comfortable Walking Shoes</li>
                    <li>• Light layers (weather varies)</li>
                    <li>• Hat/Cap (for sun)</li>
                  </ul>
               </div>
               <div className="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-[2rem] border border-amber-100 dark:border-amber-900/30">
                  <h4 className="font-bold text-xl text-amber-900 dark:text-amber-200 mb-6 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Avoid (Slows Security)
                  </h4>
                  <ul className="space-y-3 text-slate-700 dark:text-slate-300 text-lg">
                    <li>• Excessive Jewelry</li>
                    <li>• Heavy Belts with large buckles</li>
                    <li>• Steel-toed boots</li>
                    <li>• Complicated layered clothing</li>
                  </ul>
               </div>
               <div className="bg-red-50 dark:bg-red-900/10 p-8 rounded-[2rem] border border-red-100 dark:border-red-900/30">
                  <h4 className="font-bold text-xl text-red-900 dark:text-red-200 mb-6 flex items-center gap-2">
                    <Ban className="w-5 h-5" />
                    Prohibited Clothing
                  </h4>
                  <ul className="space-y-3 text-slate-700 dark:text-slate-300 text-lg">
                    <li>• Offensive slogans/images</li>
                    <li>• Political statements</li>
                    <li>• Masks covering the face</li>
                    <li>• Commercial branding (ambush marketing)</li>
                  </ul>
               </div>
            </div>
          </Section>

          <Section id="prohibited" title="Strictly Prohibited Items">
             <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
               Security will confiscate these items. There is usually no &quot;check-in&quot; desk. If you bring them, you lose them.
             </p>
             <RedFlagBox 
               title="Confiscated Items"
               items={[
                 "Weapons of any kind (guns, knives, pepper spray)",
                 "Fireworks, flares, or smoke bombs",
                 "Glass bottles or cans (even empty)",
                 "Alcohol or illegal drugs",
                 "Professional cameras (lenses over 6 inches)",
                 "Tripods, monopods, or selfie sticks",
                 "Drones",
                 "Noisemakers (air horns, vuvuzelas - rules vary)",
                 "Laser pointers",
                 "Umbrellas (small collapsible ones *might* be allowed, check venue)"
               ]}
             />
          </Section>

          <Section id="arrival" title="The Arrival Timeline">
            <div className="relative border-l-2 border-slate-200 dark:border-slate-200 dark:border-slate-800 ml-4 space-y-12 my-12">
               {[
                 { time: "T-Minus 4 Hours", title: "Departure", desc: "Leave your hotel/accommodation. Expect heavy traffic and full public transport." },
                 { time: "T-Minus 3 Hours", title: "Arrival at Zone", desc: "Arrive at the stadium perimeter. Ticket check #1 usually happens here." },
                 { time: "T-Minus 2 Hours", title: "Security Screening", desc: "Enter the queue for mag & bag. This is the bottleneck." },
                 { time: "T-Minus 1 Hour", title: "Inside the Concourse", desc: "Find your seat section, get food/water, use the restroom." },
                 { time: "Kickoff", title: "Match Starts", desc: "Be in your seat for the anthems." }
               ].map((item, i) => (
                 <div key={i} className="relative pl-8">
                   <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-950" />
                   <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1 block">{item.time}</span>
                   <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                   <p className="text-slate-600 dark:text-slate-400 text-lg">{item.desc}</p>
                 </div>
               ))}
            </div>
          </Section>

          <Section id="emergency" title="Emergency Procedures">
             <div className="bg-white dark:bg-slate-900 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 shadow-xl">
               <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                 <Siren className="w-8 h-8 text-red-500" />
                 In Case of Emergency
               </h3>
               <div className="grid md:grid-cols-2 gap-8">
                 <div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-slate-400" />
                      Lost Child / Group Member
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      Agree on a meeting point <em>outside</em> the stadium before you enter. Inside, go immediately to the nearest Guest Services booth.
                    </p>
                 </div>
                 <div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <CloudLightning className="w-5 h-5 text-slate-400" />
                      Severe Weather
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      Follow PA announcements and screen instructions. &quot;Shelter in Place&quot; usually means moving to the covered concourse areas, away from the open bowl.
                    </p>
                 </div>
                 <div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <Accessibility className="w-5 h-5 text-slate-400" />
                      Medical Issue
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      Alert the nearest usher or security guard immediately. Text the stadium assistance number (displayed on screens) with your location.
                    </p>
                 </div>
                 <div>
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <LogOut className="w-5 h-5 text-slate-400" />
                      Evacuation
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      Do not run. Follow usher instructions. Know your nearest <em>two</em> exits (they might be behind you).
                    </p>
                 </div>
               </div>
             </div>
          </Section>

          <Section id="faq" title="Frequently Asked Questions">
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {[
                {
                  q: "What size bag can I bring to World Cup 2026 stadiums?",
                  a: "You can bring a clear plastic, vinyl, or PVC bag no larger than 12\" x 6\" x 12\", or a one-gallon clear resealable plastic storage bag. Small clutch bags no larger than 4.5\" x 6.5\" are also permitted."
                },
                {
                  q: "How early should I arrive for a World Cup match?",
                  a: "For standard matches, arrive 2-3 hours before kickoff. For high-profile matches like semi-finals or the final, arrive 3-4 hours early to clear security and find your seat."
                },
                {
                  q: "Are water bottles allowed in World Cup stadiums?",
                  a: "Generally, factory-sealed water bottles are permitted, but policies vary by stadium. Reusable bottles must be empty upon entry. Check the specific stadium guide 24 hours before the match."
                },
                {
                  q: "Can I bring a portable charger?",
                  a: "Yes, small portable power banks are allowed and recommended. They must be small enough to fit in your pocket or approved bag."
                },
                {
                  q: "Is re-entry allowed?",
                  a: "No. Once your ticket is scanned and you enter the stadium, you cannot leave and come back in."
                }
              ].map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </Section>

          {/* Conclusion */}
          <div className="mt-24 p-12 md:p-20 bg-slate-900 dark:bg-slate-950 rounded-[3rem] text-center shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500" />
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Stay Safe. Enjoy the Match.</h3>
            <p className="text-slate-600 dark:text-slate-300 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Security is there to ensure the only drama happens on the pitch. Plan ahead, follow the rules, and you&apos;ll be in your seat well before the first whistle.
            </p>
            <div className="max-w-md mx-auto">
              <AffiliateButton 
                href="/world-cup-2026-host-cities" 
                text="Explore Host City Guides" 
                icon={Globe} 
                variant="secondary" 
              />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}



