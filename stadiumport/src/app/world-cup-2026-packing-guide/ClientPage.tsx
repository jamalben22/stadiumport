'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { 
  Briefcase, Sun, CloudRain, Thermometer, Wind, CheckCircle2, 
  XCircle, AlertTriangle, Shield, Map, Plane, CreditCard, 
  Smartphone, Camera, Coffee, ShoppingBag, ArrowRight, Menu, 
  ChevronRight, Printer, Share2, Info, Clock, Facebook, Twitter, 
  Linkedin, Copy, X, Bookmark, Flag, Star, MapPin, Train, DollarSign, Hotel
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

// Floating Social Share
const SocialShare = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Check out this Ultimate Packing Guide for World Cup 2026!";
    
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

// Section Component
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

// Affiliate Button
const AffiliateButton = ({ href, text, icon: Icon = ArrowRight, variant = 'primary', subtext }: { href: string, text: string, icon?: any, variant?: 'primary' | 'secondary' | 'outline' | 'alert', subtext?: string }) => {
  const baseClasses = "group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden w-full md:w-auto";
  const variants = {
    primary: "bg-emerald-500 text-slate-900 dark:text-white hover:bg-emerald-400 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.6)]",
    secondary: "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xl",
    outline: "border-2 border-slate-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-900 dark:text-white bg-transparent",
    alert: "bg-amber-500 text-slate-900 dark:text-white hover:bg-amber-600 shadow-[0_10px_40px_-10px_rgba(245,158,11,0.5)]"
  };

  return (
    <Link href={href} target="_blank" className={`${baseClasses} ${variants[variant]}`}>
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

// Callout Component (Styled to match Atlanta's Cards)
const Callout = ({ type = 'info', title, children }: { type?: 'info' | 'warning' | 'success' | 'tip', title: string, children: React.ReactNode }) => {
  const styles = {
    info: "border-blue-500/30 bg-blue-50/50 dark:bg-blue-900/10 text-blue-900 dark:text-blue-100",
    warning: "border-amber-500/30 bg-amber-50/50 dark:bg-amber-900/10 text-amber-900 dark:text-amber-100",
    success: "border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-900/10 text-emerald-900 dark:text-emerald-100",
    tip: "border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-900/10 text-emerald-900 dark:text-emerald-100"
  };
  
  const icons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle2,
    tip: CheckCircle2
  };

  const Icon = icons[type] || Info;

  return (
    <div className={`p-8 rounded-[2rem] border ${styles[type]} my-8 relative overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]`}>
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

// Table Component (Styled to match Atlanta's Cards)
const Table = ({ headers, rows }: { headers: string[], rows: (string | React.ReactNode)[][] }) => (
  <div className="overflow-x-auto my-12 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-white dark:bg-slate-50 dark:bg-slate-900/50">
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

// FAQ Item (Matched to Atlanta)
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

const InternalLink = ({ href, text, icon: Icon = ArrowRight }: { href: string, text: string, icon?: any }) => (
  <Link href={href} className="inline-flex items-center gap-2 text-emerald-500 dark:text-emerald-400 font-bold hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors">
    <Icon className="w-5 h-5" />
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

  const [activeSection, setActiveSection] = useState('intro');


  // Sticky Nav Links
  const navLinks = [
    { id: 'intro', label: 'Intro' },
    { id: 'weather', label: 'Weather' },
    { id: 'checklist', label: 'Master List' },
    { id: 'tech', label: 'Tech' },
    { id: 'match-day', label: 'Match Day' },
    { id: 'strategies', label: 'Strategies' },
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

      {/* Hero Section */}
      <div className="relative h-[65vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/travel-tips/World Cup 2026 Packing Guide Illustration.webp" 
            alt="World Cup 2026 Packing Guide" 
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
                  { label: 'Travel Tips', href: '/world-cup-2026-travel-tips' },
                  { label: 'Packing Guide', href: '/world-cup-2026-packing-guide' }
                ]} 
              />
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Last Updated: January 4, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Travel Tips
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                World Cup 2026 Packing Guide
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                Ultimate Checklist for All Weather. <span className="text-slate-900 dark:text-white font-medium">World Cup 2026</span> definitive packing strategy.
              </p>
            </motion.div>
          </div>


        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto px-6 gap-20 relative pt-16">
        
        {/* Apple-style Sticky Table of Contents */}
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
            
            {/* Download PDF CTA - Styled to match sidebar width */}
            <div className="mt-12 p-6 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <Printer className="w-6 h-6 mb-3 text-emerald-500" />
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">Printable List</h4>
              <p className="text-xs text-slate-500 mb-4">Get the PDF version.</p>
              <button className="w-full py-2 bg-emerald-500 text-slate-900 dark:text-white text-sm font-bold rounded-lg hover:bg-emerald-400 transition-colors">
                Download
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Column */}
        <main className="flex-1 min-w-0 pb-24">
          
          {/* Disclosure */}
          <div className="mb-12 p-6 rounded-2xl text-sm text-slate-500 dark:text-slate-400 flex gap-4 items-start bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
            <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Transparency:</strong> This guide contains affiliate links. We may earn a commission if you book through them, which helps fund our independent journalism.
            </p>
          </div>

          {/* Intro */}
          <Section id="intro" title="Introduction">
            <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
              <p className="mb-8 first-letter:text-5xl first-letter:font-black first-letter:text-emerald-500 first-letter:mr-3 first-letter:float-left">
                I learned this the hard way in 2018. Rushing to a match in 95°F heat, I realized my heavy cotton jersey was a mistake. By halftime, I was drenched, uncomfortable, and regretting every packing decision I'd made. Never again.
              </p>
              <p className="mb-8">
                World Cup 2026 presents a unique challenge: you aren't just packing for one country, but potentially three. You might start your journey in the humid heat of <strong className="text-slate-900 dark:text-white">Miami</strong>, fly to the high altitude of <strong className="text-slate-900 dark:text-white">Mexico City</strong>, and end up in the cool, rainy evening of <strong className="text-slate-900 dark:text-white">Vancouver</strong>.
              </p>
              <p className="mb-8">
                The distances are vast, the climates are diverse, and the baggage fees can add up to hundreds of dollars if you aren't careful. This guide is built from years of tournament travel experience. It’s designed to help you pack smart, move fast, and stay comfortable whether you're in a stadium, on a plane, or exploring a host city.
              </p>
              <Callout type="tip" title="Money Saving Tip">
                <p>
                  Packing smart isn't just about comfort; it's about your wallet. Avoiding checked bag fees on 3-4 internal flights can save you over <strong>$200</strong>. Plus, not having to buy emergency rain gear or overpriced sunscreen at the stadium keeps your budget for what matters: tickets and experiences.
                </p>
              </Callout>
            </div>
          </Section>

          {/* Weather & Regions */}
          <Section id="weather" title="Know Before You Pack">
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
              Before you throw a single sock into your suitcase, you need to understand the battlefield. Do not assume "summer" means the same thing everywhere. North America has massive climate variations.
            </p>

            <Table 
              headers={["Region", "Cities", "Weather", "Packing Strategy"]}
              rows={[
                [
                  "USA Hot & Humid", 
                  "Atlanta, Houston, Dallas, Miami", 
                  <span key="1" className="text-amber-500 font-bold">85-95°F (30-35°C), 80% Humidity</span>, 
                  "Lightweight, moisture-wicking, breathable."
                ],
                [
                  "USA Warm & Dry", 
                  "Los Angeles, San Francisco", 
                  <span key="2" className="text-emerald-500 font-bold">70-85°F (21-29°C), Low Humidity</span>, 
                  "Layers. SF evenings are surprisingly cold."
                ],
                [
                  "USA Moderate", 
                  "NYC, Philly, Boston", 
                  <span key="3" className="text-blue-500 font-bold">75-85°F (24-29°C), Occasional Rain</span>, 
                  "Versatile layers, rain gear."
                ],
                [
                  "USA Varied", 
                  "Seattle, Kansas City", 
                  <span key="4" className="text-slate-500 font-bold">65-80°F (18-27°C), Rain likely</span>, 
                  "Waterproof jacket is essential."
                ],
                [
                  "Mexico", 
                  "Mexico City, Guadalajara, Monterrey", 
                  <span key="5" className="text-orange-500 font-bold">75-90°F (24-32°C), High Altitude</span>, 
                  "Sun protection (high UV), breathable fabrics."
                ],
                [
                  "Canada", 
                  "Toronto, Vancouver", 
                  <span key="6" className="text-cyan-500 font-bold">70-80°F (21-27°C), Mild</span>, 
                  "Light layers, light rain jacket."
                ]
              ]}
            />

            <div className="mt-12 space-y-12">
              <div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Airline Baggage Restrictions</h3>
                <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-8 border border-slate-200 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
                  <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
                    If you are flying domestic routes within the US (United, American, Delta), checked bags are <strong className="text-red-500">not free</strong> on basic economy tickets.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <Briefcase className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                      <div>
                        <strong className="block text-slate-900 dark:text-white">Carry-on</strong>
                        <span className="text-slate-500">Typically 22" x 14" x 9". Free on most standard tickets, but "Basic Economy" often excludes this.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Briefcase className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                      <div>
                        <strong className="block text-slate-900 dark:text-white">Checked Bag</strong>
                        <span className="text-slate-500">Usually $30-40 for the first bag, $45+ for the second. Max weight 50lbs (23kg).</span>
                      </div>
                    </li>
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <AffiliateButton href="https://www.amazon.com/s?k=lightweight+luggage+samsonite" text="Shop Lightweight Luggage" icon={Briefcase} variant="secondary" subtext="Samsonite / Away" />
                    <AffiliateButton href="https://www.amazon.com/s?k=digital+luggage+scale" text="Get Luggage Scale" icon={Briefcase} variant="outline" subtext="Avoid Overweight Fees" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Stadium Bag Policies (CRITICAL)</h3>
                <Callout type="warning" title="Strict Clear Bag Policy">
                  <p className="mb-4">
                    Almost every World Cup 2026 venue will enforce the NFL-style <strong>Clear Bag Policy</strong>. Security will turn you away if you don't comply, forcing you to throw away your bag or miss kickoff.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <strong>Approved:</strong> Clear plastic/vinyl/PVC bag (12" x 6" x 12").
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <strong>Approved:</strong> Small clutch bag (4.5" x 6.5") - not clear.
                    </li>
                    <li className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <strong>Prohibited:</strong> Backpacks, camera bags, binocular cases, fanny packs (unless clear).
                    </li>
                  </ul>
                </Callout>
                <div className="mt-6">
                  <AffiliateButton href="https://www.amazon.com/s?k=stadium+approved+clear+bag" text="Buy Stadium-Approved Clear Bag" icon={ShoppingBag} variant="alert" subtext="Don't Get Rejected at the Gate" />
                </div>
              </div>
            </div>
          </Section>

          {/* Master Checklist */}
          <Section id="checklist" title="The Master Packing Checklist">
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12">
              This is it. The comprehensive list. If it's not on here, you probably don't need it.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Documents Card */}
              <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.15)] transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Documents & Money</h3>
                <ul className="space-y-4">
                  {['Passport (6+ months validity)', 'Visa / ESTA / eTA documents', 'Match Tickets (Digital + Printed)', 'Flight & Hotel Confirmations', 'Travel Insurance Policy', 'Credit Cards (2-3, notify bank)', 'Debit Card (for ATMs)', 'Emergency Cash (USD/CAD/MXN)', 'Vaccination Records'].map(item => (
                    <li key={item} className="flex items-start gap-3 group cursor-pointer">
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover:border-emerald-500 transition-colors mt-0.5 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-900 dark:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
                  <AffiliateButton href="https://www.amazon.com/s?k=rfid+blocking+travel+wallet" text="RFID Blocking Wallet" icon={CreditCard} variant="outline" />
                </div>
              </div>

              {/* Clothing Card */}
              <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.15)] transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6">
                  <Sun className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Clothing Strategy</h3>
                <p className="text-sm text-slate-500 mb-6 font-medium uppercase tracking-wide">Hot & Humid Focus</p>
                <ul className="space-y-4">
                  {['3 Moisture-wicking T-shirts', '1-2 Performance Polos', 'Quick-dry shorts (2 pairs)', '1 Lightweight Long Pants', 'Wide-brim hat / Cap', 'UV-Protection Sunglasses', 'Lightweight Rain Jacket (poncho)', 'Underwear (ExOfficio/Airism)'].map(item => (
                    <li key={item} className="flex items-start gap-3 group cursor-pointer">
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600 group-hover:border-amber-500 transition-colors mt-0.5 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-900 dark:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
                  <AffiliateButton href="https://www.amazon.com/s?k=moisture+wicking+clothing" text="Shop Moisture-Wicking Gear" icon={ShoppingBag} variant="outline" subtext="Nike / Under Armour" />
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Callout type="info" title="The Golden Rule of World Cup Shoes">
                <p className="font-bold text-lg mb-4 text-slate-900 dark:text-white">DO NOT BRING NEW SHOES.</p>
                <p className="mb-4">
                  You will walk 15,000 to 20,000 steps per match day. Stadium approaches can be mile-long walks. Standing in fan zones lasts for hours.
                </p>
                <p>
                  <strong>Bring broken-in sneakers.</strong> If you buy new ones, buy them 2 months before the trip and wear them daily. Blisters will ruin your World Cup faster than a bad referee call.
                </p>
              </Callout>
            </div>
          </Section>

          {/* Tech & Electronics */}
          <Section id="tech" title="Electronics & Tech">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] mb-8 border border-slate-200 dark:border-white/5 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <ul className="space-y-4">
                  {[
                    'Smartphone (Unlocked)', 
                    'Portable Charger (20,000mAh min)', 
                    'Charging Cables (2 of each type)', 
                    'Universal Travel Adapter'
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="text-lg text-slate-700 dark:text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-4">
                  {[
                    'Noise-Canceling Headphones', 
                    'eSIM / Local SIM Plan',
                    'Apple AirTag / Tile (Luggage Tracker)',
                    'Power Strip (Optional)'
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <span className="text-lg text-slate-700 dark:text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-white/5">
                <AffiliateButton href="https://www.amazon.com/s?k=anker+power+bank+20000mah" text="Anker 20,000mAh Power Bank" icon={Smartphone} variant="primary" subtext="Essential for Match Day" />
                <AffiliateButton href="https://www.amazon.com/s?k=universal+travel+adapter" text="Universal Travel Adapter" icon={CreditCard} variant="outline" />
              </div>
            </div>
            <InternalLink href="/world-cup-2026-connectivity-guide" text="Get the Connectivity & eSIM Guide" icon={Smartphone} />
          </Section>

          {/* Match Day Essentials */}
          <Section id="match-day" title="Match Day Essentials">
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">This is what goes into your clear bag for the stadium:</p>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800/50 p-8 rounded-[2rem] shadow-xl">
               <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                 {[
                   'Match Tickets (Phone Wallet)', 
                   'Photo ID / Passport', 
                   'Credit Card + Cash', 
                   'Portable Charger + Cable', 
                   'Sunscreen Stick (non-liquid)', 
                   'Sunglasses', 
                   'Hat / Cap', 
                   'Team Scarf/Jersey'
                 ].map(item => (
                   <li key={item} className="flex items-center gap-3 p-4 bg-white/50 dark:bg-black/20 rounded-xl backdrop-blur-sm">
                     <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-900 dark:text-white flex items-center justify-center shadow-md">
                       <CheckCircle2 className="w-3.5 h-3.5" />
                     </div>
                     <span className="font-bold text-slate-800 dark:text-slate-200">{item}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </Section>

          {/* Packing Strategies */}
          <Section id="strategies" title="Strategies by Trip Length">
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* 1 Week */}
              <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-5xl font-black text-emerald-500 mb-4 opacity-50">01</div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">1 Week</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Carry-On Only</p>
                <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-8">
                  <li>• 5 Shirts</li>
                  <li>• 3 Bottoms</li>
                  <li>• 2 Shoes (1 worn)</li>
                  <li>• 1 Jacket (worn)</li>
                </ul>
                <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Pros:</p>
                  <p className="text-sm text-slate-500">No baggage fees, skip check-in lines, mobile.</p>
                </div>
              </div>

              {/* 2 Weeks */}
              <div className="p-8 rounded-[2rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-1 relative overflow-hidden transform scale-105 z-10">
                <div className="absolute top-0 right-0 bg-emerald-500 text-slate-900 dark:text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-widest">Recommended</div>
                <div className="text-5xl font-black text-slate-700 dark:text-slate-200 mb-4 opacity-50">02</div>
                <h3 className="text-2xl font-black mb-2">2 Weeks</h3>
                <p className="text-xs font-bold opacity-60 uppercase tracking-widest mb-6">One Checked Bag</p>
                <ul className="space-y-3 opacity-90 mb-8">
                  <li>• 7-9 Shirts</li>
                  <li>• 5 Bottoms</li>
                  <li>• 3 Shoes</li>
                  <li>• Room for souvenirs</li>
                </ul>
                <div className="pt-6 border-t border-white/10 dark:border-slate-900/10">
                  <p className="text-sm font-bold">Pros:</p>
                  <p className="text-sm opacity-70">Variety of outfits, easier packing.</p>
                </div>
              </div>

              {/* 3+ Weeks */}
              <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-5xl font-black text-amber-500 mb-4 opacity-50">03</div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">3+ Weeks</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Checked + Laundry</p>
                <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-8">
                  <li>• 10 Shirts</li>
                  <li>• 7 Bottoms</li>
                  <li>• Laundry Supplies</li>
                  <li>• Full Medical Kit</li>
                </ul>
                <div className="pt-6 border-t border-slate-100 dark:border-white/5">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Strategy:</p>
                  <p className="text-sm text-slate-500">Plan one laundry day per week to reuse items.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-slate-50 dark:bg-slate-800/30 p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Space-Saving Techniques</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-emerald-500 mb-2">1. The Roll Method</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Don't fold. Roll your clothes tightly. It prevents wrinkles and saves roughly 30% of space compared to flat folding.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-500 mb-2">2. Packing Cubes</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Non-negotiable. They compress clothes and keep your bag organized. Use one for shirts, one for bottoms.</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-emerald-500 mb-2">3. Wear Your Bulk</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Always wear your heaviest shoes and thickest jacket on the plane. This saves pounds of weight.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-500 mb-2">4. Stuff Shoes</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Inside your extra shoes is prime real estate. Stuff them with socks, chargers, or underwear.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mt-8">
                <AffiliateButton href="https://www.amazon.com/s?k=packing+cubes" text="Get Packing Cubes" icon={Briefcase} variant="secondary" />
                <AffiliateButton href="https://www.amazon.com/s?k=travel+vacuum+bags" text="Vacuum Bags" icon={Briefcase} variant="outline" subtext="For Dirty Laundry" />
              </div>
            </div>
          </Section>

          {/* FAQ */}
          <Section id="faq" title="FAQ">
            <div className="grid gap-4">
              {[
                {
                  q: "What size luggage should I bring for a 2-week trip?",
                  a: "We recommend one medium checked bag (25-28 inches) and a good carry-on backpack. This gives you enough space for different weather gear without being too heavy to move around transit hubs."
                },
                {
                  q: "Do I need voltage converters?",
                  a: "North America (USA, Canada, Mexico) uses Type A and B plugs (two flat pins) at 120V. If you are coming from Europe or Asia, you will need a plug adapter. Most modern chargers are dual voltage (110-240V)."
                },
                {
                  q: "Can I bring food into the US/Canada/Mexico?",
                  a: "Packaged snacks (granola bars, chips) are fine. Fresh fruit, vegetables, meats, and seeds are strictly prohibited and will be confiscated at customs with potential fines."
                },
                {
                  q: "Should I bring a raincoat or umbrella?",
                  a: "A lightweight, packable rain jacket is superior to an umbrella in crowded stadiums and fan zones. It also doubles as a windbreaker layer."
                },
                {
                  q: "Is it safe to carry cash?",
                  a: "Yes, but credit cards are widely accepted almost everywhere in the US and Canada. Mexico is more cash-friendly for street food. Carry about $100-200 USD equivalent in local currency."
                }
              ].map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </Section>

        </main>
      </div>
      
      
    </div>
  );
}



