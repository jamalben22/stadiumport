'use client';

import React, { useState, useRef } from 'react';
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
  Bell, Search, Mail, TrendingUp, CreditCard, Bed, Building, Home, Map
} from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';



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
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const title = "World Cup 2026 Accommodation Guide";

  const handleShare = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        break;
    }
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed left-4 top-1/3 z-40 hidden xl:flex flex-col gap-3"
    >
      <div className="backdrop-blur-md p-2 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col gap-3">
        <button onClick={() => handleShare('twitter')} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors" aria-label="Share on Twitter">
          <Twitter className="w-5 h-5" />
        </button>
        <button onClick={() => handleShare('facebook')} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors" aria-label="Share on Facebook">
          <Facebook className="w-5 h-5" />
        </button>
        <button onClick={() => handleShare('linkedin')} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors" aria-label="Share on LinkedIn">
          <Linkedin className="w-5 h-5" />
        </button>
        <button onClick={handleCopy} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors relative" aria-label="Copy Link">
          {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
        </button>
      </div>
    </motion.div>
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
const AffiliateButton = ({ href, text, icon: Icon = ArrowRight, variant = 'primary', subtext }: { href: string, text: string, icon?: any, variant?: 'primary' | 'secondary' | 'outline', subtext?: string }) => {
  const baseClasses = "group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden";
  const variants = {
    primary: "bg-emerald-500 text-slate-900 dark:text-white hover:bg-emerald-400 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.6)]",
    secondary: "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xl",
    outline: "border-2 border-slate-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-900 dark:text-white bg-transparent"
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

const Callout = ({ type = 'info', title, children }: { type?: 'info' | 'warning' | 'success', title: string, children: React.ReactNode }) => {
  const styles = {
    info: "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
    warning: "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100",
    success: "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100"
  };
  
  const icons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle2
  };

  const Icon = icons[type];

  return (
    <div className={`p-8 rounded-[2rem] border ${styles[type]} my-8`}>
      <h3 className="font-bold text-xl mb-3 flex items-center gap-3">
        <Icon className="w-6 h-6" />
        {title}
      </h3>
      <div className="text-lg opacity-90 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

const Table = ({ headers, rows }: { headers: string[], rows: (string | React.ReactNode)[][] }) => (
  <div className="overflow-x-auto my-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900/50">
    <table className="w-full text-left text-sm md:text-base">
      <thead className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white font-bold uppercase tracking-wider">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="p-6 whitespace-nowrap border-b border-slate-200 dark:border-slate-200 dark:border-slate-800">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className="p-6 text-slate-600 dark:text-slate-300 font-medium">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CitySection = ({ city, country, stadium, capacity, neighborhoods }: { 
  city: string, 
  country: string, 
  stadium: string, 
  capacity: string,
  neighborhoods: Array<{ name: string, vibe: string, price: string, transit: string, bestFor: string }>
}) => (
  <div className="mb-20 p-8 md:p-10 rounded-[2.5rem] bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
      <MapPin className="w-32 h-32 text-emerald-500" />
    </div>

    <div className="relative z-10">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">{city}</h3>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              {country}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-100 dark:border-emerald-800">
              {stadium} ({capacity})
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {neighborhoods.map((n, i) => (
          <div key={i} className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors group/card">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover/card:text-emerald-500 transition-colors">{n.name}</h4>
              <span className={`text-xs font-bold px-2 py-1 rounded border ${
                n.price.length > 3 
                  ? "bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30"
                  : n.price.length > 2
                    ? "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30"
                    : "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30"
              }`}>
                {n.price}
              </span>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">
                <strong className="text-slate-900 dark:text-slate-200">Vibe:</strong> {n.vibe}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug flex items-start gap-2">
                <Train className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <span><strong className="text-slate-900 dark:text-slate-200">Transit:</strong> {n.transit}</span>
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug flex items-start gap-2">
                <Star className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <span><strong className="text-slate-900 dark:text-slate-200">Best For:</strong> {n.bestFor}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <a href={`https://www.booking.com/searchresults.html?ss=${city}`} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-emerald-500 transition-colors">
          <Hotel className="w-4 h-4 text-emerald-500" />
          Check {city} Hotels
          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
        </a>
        <a href={`https://www.vrbo.com/search/keywords:${city}`} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white hover:text-emerald-500 transition-colors">
          <Home className="w-4 h-4 text-emerald-500" />
          Find Rentals
          <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
        </a>
      </div>
    </div>
  </div>
);

const InternalLink = ({ href, text }: { href: string, text: string }) => (
  <Link href={href} className="text-emerald-600 dark:text-emerald-400 font-bold hover:text-emerald-500 transition-colors decoration-2 underline-offset-2 hover:underline">
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

  const [activeSection, setActiveSection] = useState('hero');


  // Sticky Nav Links
  const navLinks = [
    { id: 'intro', label: 'Introduction' },
    { id: 'cost-overview', label: 'Cost Overview' },
    { id: 'accommodation-types', label: 'Where to Stay' },
    { id: 'usa-cities', label: 'USA Cities' },
    { id: 'mexico-cities', label: 'Mexico Cities' },
    { id: 'canada-cities', label: 'Canada Cities' },
    { id: 'booking-strategy', label: 'Booking Strategy' },
    { id: 'red-flags', label: 'Red Flags' },
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
            src="/images/travel-tips/World Cup 2026 Accommodation Guide Illustration.webp" 
            alt="World Cup 2026 Accommodation Guide" 
            fill 
            className="object-cover object-center"
            priority quality={60} 
            sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-[#0A0A0A]/60 to-[#F5F5F7] dark:to-[#0A0A0A]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
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
                  { label: 'Accommodation', href: '/world-cup-2026-accommodation-guide' }
                ]} 
              />
              {/* Badge/Category */}
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Last Updated: January 4, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Travel Tips
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
                  Accommodation
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                World Cup 2026 Accommodation Guide
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                 Neighborhood breakdowns, price ranges, and verified strategies for finding a bed in all 16 host cities across the USA, Canada, and Mexico.
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
          
          <div className="mb-12 p-6 rounded-2xl text-sm text-slate-500 dark:text-slate-400 flex gap-4 items-start bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
            <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Transparency:</strong> This guide contains affiliate links. We may earn a commission if you book through them, which helps fund our independent journalism.
            </p>
          </div>

          <Section id="intro" title="Strategic Overview">
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
                Finding a place to sleep during the World Cup is not just about comfort—it is a strategic decision that defines your entire tournament experience. 
                With <strong>48 teams</strong> and millions of fans descending on North America, the competition for rooms will be fierce.
              </p>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                The mistake most fans make? Assuming they need to stay right next to the stadium. 
                In North America, most stadiums are located in suburbs. Read our <InternalLink href="/world-cup-2026-host-cities" text="Host Cities Guide" /> to understand the layout of each venue.
                The pro move is to stay in vibrant downtown hubs or strategic transit corridors and commute to the match.
              </p>
            </div>
            
            <Callout type="warning" title="The Golden Rule of 2026">
              <p>
                <strong>Do not book accommodation until you have your match tickets or a confirmed itinerary.</strong> 
                However, once the schedule is out (expected late 2025), you must move fast. 
                See our <InternalLink href="/best-time-book-world-cup-2026" text="Best Time to Book Guide" /> for exact timelines.
              </p>
            </Callout>

            <div className="my-12 p-10 bg-slate-900 dark:bg-slate-800 text-slate-900 dark:text-white rounded-[2.5rem] relative overflow-hidden shadow-2xl">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Start Your Search Now</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-0">Browse availability before the rush begins.</p>
                </div>
                <AffiliateButton 
                  href="https://www.booking.com" 
                  text="Check Hotel Availability" 
                  subtext="Best for free cancellation"
                  icon={Hotel}
                  variant="primary"
                />
              </div>
            </div>
          </Section>

          <Section id="cost-overview" title="City-by-City Cost Overview">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              We have categorized the 16 host cities based on anticipated nightly rates for a standard 3-star hotel during the tournament.
            </p>
            <Table 
              headers={["Cost Tier", "Avg Nightly Rate", "Cities"]}
              rows={[
                [
                  <span key="1" className="font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full text-xs uppercase tracking-wide">Premium $$$$</span>, 
                  "$500 - $900+", 
                  "New York/NJ, San Francisco, Los Angeles, Boston, Miami"
                ],
                [
                  <span key="2" className="font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full text-xs uppercase tracking-wide">High $$$</span>, 
                  "$350 - $600", 
                  "Seattle, Vancouver, Toronto, Philadelphia"
                ],
                [
                  <span key="3" className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full text-xs uppercase tracking-wide">Moderate $$</span>, 
                  "$250 - $450", 
                  "Atlanta, Dallas, Houston, Kansas City"
                ],
                [
                  <span key="4" className="font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full text-xs uppercase tracking-wide">Value $</span>, 
                  "$100 - $300", 
                  "Mexico City, Guadalajara, Monterrey"
                ]
              ]} 
            />
            <p className="text-sm text-slate-500 italic mt-4 flex items-center gap-2">
              <Info className="w-4 h-4" />
              *Estimates based on major event pricing history (Super Bowl, F1, previous World Cups).
            </p>
          </Section>

          <Section id="accommodation-types" title="Where Should You Stay?">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6">
                  <Hotel className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Hotels</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                  Best for reliability, safety, and location. Prices will be high, but you get security and amenities.
                </p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-3">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" /> No surprise cancellations</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" /> Luggage storage included</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6">
                  <Home className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Vacation Rentals</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                  Best for groups of 4+. Cost-effective if split, but comes with high cancellation risk during mega-events.
                </p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-3">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" /> Kitchen saves money on food</li>
                  <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" /> Hosts may cancel for higher rates</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-6">
                  <Bed className="w-7 h-7 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Hostels</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                  Best for solo travelers and atmosphere. Meet other fans, save money, but book extremely early.
                </p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-3">
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" /> Incredible social vibe</li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" /> Most affordable option</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="usa-cities" title="United States Host Cities">
            <p className="mb-12 text-xl font-light text-slate-600 dark:text-slate-300 leading-relaxed">
              The US cities are spread far apart. Public transit quality varies wildly—in NYC it is essential; in Dallas, you will likely need Uber or a rental car.
            </p>
            
            <CitySection 
              city="New York / New Jersey"
              country="USA"
              stadium="MetLife Stadium (East Rutherford, NJ)"
              capacity="82,500"
              neighborhoods={[
                { name: "Manhattan (Midtown)", vibe: "The iconic NYC experience. Busy, loud, expensive.", price: "$$$$", transit: "30-45 min train from Penn Station", bestFor: "First-timers, nightlife lovers" },
                { name: "Jersey City / Hoboken", vibe: "Upscale waterfront, great skyline views, walkable.", price: "$$$", transit: "20-30 min train/Uber", bestFor: "Convenience to stadium & city" },
                { name: "Secaucus", vibe: "Suburban hotel hub. Boring but practical.", price: "$$", transit: "10-15 min bus/train", bestFor: "Budget travelers, just there for the match" }
              ]}
            />

            <CitySection 
              city="Los Angeles"
              country="USA"
              stadium="SoFi Stadium (Inglewood)"
              capacity="70,240"
              neighborhoods={[
                { name: "Santa Monica", vibe: "Beach, tourists, upscale shopping.", price: "$$$$", transit: "45-60 min Metro/Uber", bestFor: "Vacation vibes" },
                { name: "Downtown LA (DTLA)", vibe: "Urban, gritty in parts, great food.", price: "$$", transit: "40-50 min Metro/Uber", bestFor: "Urban explorers, budget" },
                { name: "South Bay (Manhattan Beach)", vibe: "Relaxed coastal luxury.", price: "$$$", transit: "15-20 min Uber", bestFor: "Families, proximity to stadium" }
              ]}
            />

            <CitySection 
              city="Dallas"
              country="USA"
              stadium="AT&T Stadium (Arlington)"
              capacity="90,000"
              neighborhoods={[
                { name: "Downtown Dallas", vibe: "Business district, museums, restaurants.", price: "$$", transit: "25-40 min Uber (No train)", bestFor: "City feel" },
                { name: "Fort Worth Stockyards", vibe: "Cowboy culture, honky-tonks, historic.", price: "$$$", transit: "25-30 min Uber", bestFor: "Texas culture experience" },
                { name: "Arlington (Stadium Area)", vibe: "Strip malls, chain hotels, parking lots.", price: "$$$ (Event Pricing)", transit: "Walkable", bestFor: "Zero commute" }
              ]}
            />

            <CitySection 
              city="Miami"
              country="USA"
              stadium="Hard Rock Stadium (Miami Gardens)"
              capacity="64,767"
              neighborhoods={[
                { name: "South Beach", vibe: "Parties, art deco, beach.", price: "$$$$", transit: "45-60 min Uber/Shuttle", bestFor: "Party animals" },
                { name: "Brickell / Downtown", vibe: "Modern skyscrapers, upscale dining.", price: "$$$", transit: "30-45 min Uber/Brightline", bestFor: "Luxury travelers" },
                { name: "Fort Lauderdale", vibe: "More relaxed beach vibe, cheaper.", price: "$$", transit: "25-35 min Uber", bestFor: "Groups, slightly lower cost" }
              ]}
            />

            <CitySection 
              city="Atlanta"
              country="USA"
              stadium="Mercedes-Benz Stadium"
              capacity="71,000"
              neighborhoods={[
                { name: "Downtown / Centennial Park", vibe: "Tourist center, walkable to stadium.", price: "$$$", transit: "Walkable", bestFor: "Convenience" },
                { name: "Midtown", vibe: "Arts, LGBTQ+ friendly, great parks.", price: "$$", transit: "10 min MARTA train", bestFor: "Culture & food" },
                { name: "Buckhead", vibe: "High-end shopping, luxury hotels.", price: "$$$", transit: "20 min MARTA train", bestFor: "Luxury shoppers" }
              ]}
            />

            <CitySection 
              city="San Francisco Bay Area"
              country="USA"
              stadium="Levi's Stadium (Santa Clara)"
              capacity="68,500"
              neighborhoods={[
                { name: "San Francisco (Union Square)", vibe: "Iconic city, cable cars, hills.", price: "$$$", transit: "60-90 min Caltrain/Light Rail", bestFor: "Tourists willing to commute" },
                { name: "San Jose", vibe: "Tech hub, sprawling, closer to stadium.", price: "$$", transit: "15-20 min Light Rail", bestFor: "Practicality" },
                { name: "Santa Clara", vibe: "Suburban office parks.", price: "$$$", transit: "Walkable", bestFor: "Walking to match" }
              ]}
            />

            <CitySection 
              city="Boston"
              country="USA"
              stadium="Gillette Stadium (Foxborough)"
              capacity="65,878"
              neighborhoods={[
                { name: "Back Bay / Downtown", vibe: "Historic, walkable, beautiful.", price: "$$$$", transit: "45-60 min Train (Patriot Train)", bestFor: "History buffs" },
                { name: "Seaport District", vibe: "Modern, waterfront dining.", price: "$$$$", transit: "45-60 min Train/Uber", bestFor: "Modern luxury" },
                { name: "Providence, RI", vibe: "Cool small city, great food.", price: "$$", transit: "30-40 min Train", bestFor: "Smart budget alternative" }
              ]}
            />

            <CitySection 
              city="Philadelphia"
              country="USA"
              stadium="Lincoln Financial Field"
              capacity="69,000"
              neighborhoods={[
                { name: "Center City", vibe: "Historic heart, walkable, food.", price: "$$$", transit: "15-20 min Subway (Broad St Line)", bestFor: "Everyone" },
                { name: "South Philly", vibe: "Local, gritty charm, cheesesteaks.", price: "$$", transit: "Walk / Short Subway", bestFor: "Authentic feel" },
                { name: "University City", vibe: "Academic, diverse, younger.", price: "$$", transit: "25 min Subway", bestFor: "Budget / Youth" }
              ]}
            />

            <CitySection 
              city="Seattle"
              country="USA"
              stadium="Lumen Field"
              capacity="69,000"
              neighborhoods={[
                { name: "Pioneer Square", vibe: "Historic, oldest neighborhood.", price: "$$$", transit: "Walkable", bestFor: "Proximity" },
                { name: "Belltown / Downtown", vibe: "High-rises, pike place market.", price: "$$$", transit: "10-15 min Light Rail", bestFor: "Tourists" },
                { name: "Capitol Hill", vibe: "Hip, LGBTQ+ hub, nightlife.", price: "$$", transit: "10 min Light Rail", bestFor: "Nightlife & Culture" }
              ]}
            />

            <CitySection 
              city="Houston"
              country="USA"
              stadium="NRG Stadium"
              capacity="72,000"
              neighborhoods={[
                { name: "Downtown", vibe: "Business, some nightlife.", price: "$$", transit: "20-30 min Light Rail", bestFor: "Transit access" },
                { name: "Galleria / Uptown", vibe: "Shopping mecca, upscale.", price: "$$$", transit: "30-40 min Uber", bestFor: "Shoppers" },
                { name: "Medical Center / Museum District", vibe: "Quieter, parks, museums.", price: "$$", transit: "10-15 min Light Rail", bestFor: "Families" }
              ]}
            />

            <CitySection 
              city="Kansas City"
              country="USA"
              stadium="Arrowhead Stadium"
              capacity="76,000"
              neighborhoods={[
                { name: "Power & Light District", vibe: "Entertainment hub, bars.", price: "$$$", transit: "20 min Uber", bestFor: "Party vibe" },
                { name: "Crossroads Arts District", vibe: "Hip, galleries, breweries.", price: "$$", transit: "20 min Uber", bestFor: "Culture" },
                { name: "Country Club Plaza", vibe: "Spanish architecture, shopping.", price: "$$$", transit: "25 min Uber", bestFor: "Upscale stay" }
              ]}
            />
          </Section>

          <Section id="mexico-cities" title="Mexico Host Cities">
            <Callout type="info" title="Mexico Travel Tip">
              <p>Mexico offers incredible value. Luxury hotels here often cost the same as a budget motel in New York. Opt for staying in established, safe neighborhoods (Polanco, Roma, Condesa in CDMX).</p>
            </Callout>

            <CitySection 
              city="Mexico City"
              country="Mexico"
              stadium="Estadio Azteca"
              capacity="87,000"
              neighborhoods={[
                { name: "Polanco", vibe: "Luxury, safe, high-end dining.", price: "$$$", transit: "45-60 min Uber/Metro", bestFor: "Luxury & Safety" },
                { name: "Roma / Condesa", vibe: "Hip, leafy streets, cafes.", price: "$$", transit: "40-50 min Uber/Metro", bestFor: "Cool vibes & Food" },
                { name: "Coyoacán", vibe: "Historic, Frida Kahlo, closer to stadium.", price: "$$", transit: "15-20 min Uber", bestFor: "History & Proximity" }
              ]}
            />

            <CitySection 
              city="Monterrey"
              country="Mexico"
              stadium="Estadio BBVA"
              capacity="53,500"
              neighborhoods={[
                { name: "San Pedro Garza García", vibe: "Wealthiest municipality in Latin America.", price: "$$$", transit: "20-30 min Uber", bestFor: "Safety & Luxury" },
                { name: "Barrio Antiguo", vibe: "Historic center, nightlife.", price: "$", transit: "15-20 min Uber", bestFor: "Nightlife" },
                { name: "Fundidora Area", vibe: "Modern park, hotels.", price: "$$", transit: "10 min Uber", bestFor: "Convenience" }
              ]}
            />

            <CitySection 
              city="Guadalajara"
              country="Mexico"
              stadium="Estadio Akron"
              capacity="49,850"
              neighborhoods={[
                { name: "Americana / Lafayette", vibe: "Trendy, mansions, cafes.", price: "$$", transit: "30-40 min Uber", bestFor: "Coolest area" },
                { name: "Centro Histórico", vibe: "Cathedrals, markets, busy.", price: "$", transit: "40-50 min Uber/Train", bestFor: "Sightseeing" },
                { name: "Zapopan (Andares)", vibe: "Modern, upscale malls.", price: "$$$", transit: "15-20 min Uber", bestFor: "Shopping & Comfort" }
              ]}
            />
          </Section>

          <Section id="canada-cities" title="Canada Host Cities">
            <CitySection 
              city="Toronto"
              country="Canada"
              stadium="BMO Field"
              capacity="45,000"
              neighborhoods={[
                { name: "Entertainment District", vibe: "CN Tower, busy, central.", price: "$$$$", transit: "10-15 min Walk/Tram", bestFor: "Action" },
                { name: "King West", vibe: "Trendy, nightlife, restaurants.", price: "$$$", transit: "10-15 min Tram", bestFor: "Young professionals" },
                { name: "Liberty Village", vibe: "Converted factories, tech vibe.", price: "$$", transit: "Walkable", bestFor: "Walking to stadium" }
              ]}
            />

            <CitySection 
              city="Vancouver"
              country="Canada"
              stadium="BC Place"
              capacity="54,000"
              neighborhoods={[
                { name: "Yaletown", vibe: "Upscale, waterfront, patios.", price: "$$$$", transit: "Walkable", bestFor: "Posh vibe" },
                { name: "Gastown", vibe: "Historic, cobblestone, touristy.", price: "$$$", transit: "10-15 min Walk", bestFor: "Character" },
                { name: "West End", vibe: "Residential, beach access, diverse.", price: "$$", transit: "20 min Walk/Bus", bestFor: "Local feel" }
              ]}
            />
          </Section>

          <Section id="booking-strategy" title="Smart Booking Strategy">
            <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 shadow-xl">
              <ol className="space-y-10">
                <li className="flex gap-6">
                  <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-xl shadow-inner">1</span>
                  <div>
                    <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-3">Book "Fully Refundable" Now</h4>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                      If you are 80% sure you are going to a specific city (e.g., following your team), book a refundable hotel room immediately. 
                      You can always cancel it later if plans change, but you lock in a rate before the surge.
                    </p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-xl shadow-inner">2</span>
                  <div>
                    <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-3">The "Home Base" Strategy</h4>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                      Instead of chasing your team to every city, pick a major hub (like NYC, LA, or Dallas) as your base. 
                      Fly in and out for matches. This saves you from constantly moving luggage and checking into new hotels.
                    </p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <span className="flex-shrink-0 w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-xl shadow-inner">3</span>
                  <div>
                    <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-3">Check University Housing</h4>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                      In summer, many universities rent out dorm rooms. 
                      Cities like Boston, Philadelphia, and Toronto have massive student populations. 
                      This is often the cheapest safe accommodation available.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="mt-16 flex flex-col md:flex-row gap-6 justify-center">
              <AffiliateButton 
                href="https://www.booking.com" 
                text="Search Booking.com" 
                icon={Hotel}
                variant="primary"
              />
              <AffiliateButton 
                href="https://www.vrbo.com" 
                text="Search VRBO" 
                icon={Home}
                variant="secondary"
              />
              <AffiliateButton 
                href="https://www.hostelworld.com" 
                text="Search Hostels" 
                icon={Bed}
                variant="outline"
              />
            </div>
          </Section>

          <Section id="red-flags" title="Red Flags & Scams">
            <div className="grid md:grid-cols-2 gap-8">
              <Callout type="warning" title="The 'Bait and Switch'">
                <p>
                  Be wary of Airbnb hosts who cancel your booking 2 weeks before the tournament, claiming a "plumbing issue," only to relist it at 3x the price. 
                  <strong>Defense:</strong> Book with Superhosts only, or stick to hotels.
                </p>
              </Callout>
              <Callout type="warning" title="Distance Deception">
                <p>
                  Listings saying "10 minutes to stadium" might mean 10 minutes by helicopter. 
                  Always check the location on Google Maps during rush hour traffic times.
                </p>
              </Callout>
            </div>
          </Section>

          <Section id="faq" title="Frequently Asked Questions">
            <div className="space-y-4">
              <FAQItem 
                question="How far in advance should I book?"
                answer="Hotels typically open reservations 365 days in advance (June 2025). We recommend booking fully refundable rates the moment they become available."
              />
              <FAQItem 
                question="Is it safe to stay in Airbnb/Vrbo?"
                answer="Generally yes, but the cancellation risk is higher during mega-events. Hotels offer more consumer protection."
              />
              <FAQItem 
                question="Can I camp or use an RV?"
                answer="This is difficult in major US cities. RV parks are often far from downtowns. It is a viable option for road-trippers, but research parking carefully."
              />
              <FAQItem 
                question="What if everything is sold out?"
                answer="Look at satellite cities (e.g., stay in Milwaukee for Chicago/Midwest games, or Tacoma for Seattle). Trains and buses can bridge the gap."
              />
            </div>
          </Section>

        </main>
      </div>

      
    </div>
  );
}



