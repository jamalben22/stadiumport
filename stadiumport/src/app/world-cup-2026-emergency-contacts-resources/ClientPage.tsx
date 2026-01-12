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
  Phone, Stethoscope, FileText, Menu, ChevronDown,
  ShieldCheck, HeartPulse, Building2
} from 'lucide-react';



// --- Design System & Components ---

const getCitySlug = (city: string) => {
  const cityMap: { [key: string]: string } = {
    'New York/NJ': 'new-york-new-jersey',
    'San Francisco': 'san-francisco-bay-area',
    'Kansas City': 'kansas-city',
    'Los Angeles': 'los-angeles',
    'Mexico City': 'mexico-city'
  };
  
  if (cityMap[city]) return cityMap[city];
  return city.toLowerCase().replace(/ /g, '-');
};

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

// 2. Floating Social Share
const SocialShare = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Check out this World Cup 2026 Emergency Contacts & Resources Guide!";
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }

    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
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
          <button onClick={() => handleShare('copy')} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors relative" aria-label="Copy Link">
            {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-slate-900 dark:text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-medium">Link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// 3. Lightbox Image
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

// 4. Section Component with Nike-bold Typography
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

// 5. Premium Affiliate Button
const AffiliateButton = ({ href, text, icon: Icon = ArrowRight, variant = 'primary' }: { href: string, text: string, icon?: any, variant?: 'primary' | 'secondary' | 'outline' }) => {
  const baseClasses = "group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden";
  const variants = {
    primary: "bg-emerald-500 text-slate-900 dark:text-white hover:bg-emerald-400 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.6)]",
    secondary: "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xl",
    outline: "border-2 border-slate-200 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-900 dark:text-white bg-transparent"
  };

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={`${baseClasses} ${variants[variant]}`}>
      <span className="relative z-10 flex items-center gap-2">
        {text}
        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
    </Link>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => (
  <details className="group border-b border-slate-200 dark:border-slate-200 dark:border-slate-800">
    <summary className="flex items-center justify-between py-6 cursor-pointer list-none">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors pr-8">
        {question}
      </h3>
      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 group-open:bg-emerald-500 group-open:border-emerald-500 group-open:text-slate-900 dark:text-white transition-all duration-300">
        <ChevronRight className="w-4 h-4 transition-transform duration-300 group-open:rotate-90" />
      </span>
    </summary>
    <div className="pb-8 text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
      {answer}
    </div>
  </details>
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
    { id: 'universal-numbers', label: 'Universal Numbers' },
    { id: 'country-specifics', label: 'Country Details' },
    { id: 'host-cities', label: 'Host City Resources' },
    { id: 'medical', label: 'Medical' },
    { id: 'embassies', label: 'Embassies' },
    { id: 'safety-tips', label: 'Safety & Scams' },
    { id: 'faq', label: 'FAQ' },
  ];

  const hostCities = [
    { city: "Atlanta", country: "USA", police: "911", hospital: "Grady Memorial Hospital" },
    { city: "Boston", country: "USA", police: "911", hospital: "Massachusetts General Hospital" },
    { city: "Dallas", country: "USA", police: "911", hospital: "Baylor University Medical Center" },
    { city: "Houston", country: "USA", police: "911", hospital: "Houston Methodist Hospital" },
    { city: "Kansas City", country: "USA", police: "911", hospital: "The University of Kansas Hospital" },
    { city: "Los Angeles", country: "USA", police: "911", hospital: "Cedars-Sinai Medical Center" },
    { city: "Miami", country: "USA", police: "911", hospital: "Jackson Memorial Hospital" },
    { city: "New York/NJ", country: "USA", police: "911", hospital: "Hackensack University Medical Center" },
    { city: "Philadelphia", country: "USA", police: "911", hospital: "Penn Presbyterian Medical Center" },
    { city: "San Francisco", country: "USA", police: "911", hospital: "UCSF Medical Center" },
    { city: "Seattle", country: "USA", police: "911", hospital: "Harborview Medical Center" },
    { city: "Toronto", country: "Canada", police: "911", hospital: "Toronto General Hospital" },
    { city: "Vancouver", country: "Canada", police: "911", hospital: "Vancouver General Hospital" },
    { city: "Guadalajara", country: "Mexico", police: "911", hospital: "Hospital San Javier" },
    { city: "Mexico City", country: "Mexico", police: "911", hospital: "Hospital ABC Santa Fe" },
    { city: "Monterrey", country: "Mexico", police: "911", hospital: "Hospital Zambrano Hellion" }
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-emerald-500/30 bg-[#F5F5F7] dark:bg-[#0A0A0A]">
      
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
            src="/images/safety-guide/A_realistic_high-detail_photo_of_essential_emergency_resources_for_World_Cup_2026.webp" 
            alt="Emergency Resources" 
            fill 
            className="object-cover opacity-80"
            priority sizes="100vw" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Breadcrumb 
            variant="white"
            items={[
              { label: 'Safety Guide', href: '/world-cup-2026-safety-guide' },
              { label: 'Emergency Contacts', href: '/world-cup-2026-emergency-contacts-resources' }
            ]} 
          />

          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                    Last Updated: January 4, 2026
                  </span>
                <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Safety Guide
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
                  Verified Resources
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                World Cup 2026 Emergency Resources
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                The essential safety companion for fans. <span className="text-slate-900 dark:text-white font-medium">World Cup 2026</span> verified listings.
              </p>
            </motion.div>
          </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto px-6 gap-20 relative pt-16">
        
        {/* 2. Apple-style Sticky Table of Contents */}
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
            
            {/* Affiliate Box moved to sidebar bottom like original logic if needed, but keeping clean for now */}
          </div>
        </aside>

        {/* Main Content Column */}
        <main className="flex-1 min-w-0 pb-24">
          
          {/* Disclosure */}
          <div className="mb-12 p-6 rounded-2xl text-sm text-slate-500 dark:text-slate-400 flex gap-4 items-start">
            <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Transparency:</strong> This guide contains affiliate links. We may earn a commission if you book through them, which helps fund our independent journalism.
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
              Attending the biggest sporting event in history across three vast nations requires preparation. Whether you're in New York, Toronto, or Mexico City, knowing who to call in an emergency is vital. This guide provides verified contact information for police, ambulance, fire, and consular services for all 16 host cities of the 2026 FIFA World Cup.
            </p>
          </div>

          <Section id="universal-numbers" title="Universal Emergency Numbers">
             <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="p-12 text-center">
                  <span className="block text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">USA • CANADA • MEXICO</span>
                  <div className="text-9xl font-black text-red-600 tracking-tighter mb-6">911</div>
                  <p className="text-2xl font-medium text-slate-700 dark:text-slate-300">
                    One number for Police, Fire, and Ambulance across all three host nations.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
                  <div className="flex items-start gap-6">
                    <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">Important Usage Note</h4>
                      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        Only dial 911 for life-threatening emergencies. For non-emergencies (lost property, minor reporting), use the local non-emergency numbers listed below to keep lines open for critical situations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
          </Section>

          <Section id="country-specifics" title="Country-Specific Details">
            <div className="grid md:grid-cols-3 gap-8">
                {/* USA */}
                <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-8 bg-slate-200 rounded overflow-hidden relative shadow-sm flex items-center justify-center">
                        <span className="text-xs font-bold text-slate-500">USA</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">United States</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex justify-between border-b border-slate-100 dark:border-slate-200 dark:border-slate-800 pb-2">
                      <span className="font-medium text-slate-600 dark:text-slate-400">Emergency</span>
                      <span className="font-bold text-red-500">911</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-100 dark:border-slate-200 dark:border-slate-800 pb-2">
                      <span className="font-medium text-slate-600 dark:text-slate-400">Non-Emergency</span>
                      <span className="font-bold text-slate-900 dark:text-white">311</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium text-slate-600 dark:text-slate-400">Poison Control</span>
                      <span className="font-bold text-slate-900 dark:text-white">1-800-222-1222</span>
                    </li>
                  </ul>
                  <div className="mt-6 text-sm text-slate-500 leading-relaxed">
                    *Healthcare costs are extremely high. Insurance is mandatory for peace of mind.
                  </div>
                </div>

                {/* Canada */}
                <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-8 bg-slate-200 rounded overflow-hidden relative shadow-sm flex items-center justify-center">
                         <span className="text-xs font-bold text-slate-500">CAN</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Canada</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex justify-between border-b border-slate-100 dark:border-slate-200 dark:border-slate-800 pb-2">
                      <span className="font-medium text-slate-600 dark:text-slate-400">Emergency</span>
                      <span className="font-bold text-red-500">911</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-100 dark:border-slate-200 dark:border-slate-800 pb-2">
                      <span className="font-medium text-slate-600 dark:text-slate-400">Non-Emergency</span>
                      <span className="font-bold text-slate-900 dark:text-white">Local #</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium text-slate-600 dark:text-slate-400">Health Info</span>
                      <span className="font-bold text-slate-900 dark:text-white">811</span>
                    </li>
                  </ul>
                  <div className="mt-6 text-sm text-slate-500 leading-relaxed">
                    *Visitors are charged for hospital visits. Ensure coverage.
                  </div>
                </div>

                {/* Mexico */}
                <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-8 bg-slate-200 rounded overflow-hidden relative shadow-sm flex items-center justify-center">
                        <span className="text-xs font-bold text-slate-500">MEX</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Mexico</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex justify-between border-b border-slate-100 dark:border-slate-200 dark:border-slate-800 pb-2">
                      <span className="font-medium text-slate-600 dark:text-slate-400">Emergency</span>
                      <span className="font-bold text-red-500">911</span>
                    </li>
                    <li className="flex justify-between border-b border-slate-100 dark:border-slate-200 dark:border-slate-800 pb-2">
                      <span className="font-medium text-slate-600 dark:text-slate-400">Tourist Police</span>
                      <span className="font-bold text-slate-900 dark:text-white">078</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium text-slate-600 dark:text-slate-400">Red Cross</span>
                      <span className="font-bold text-slate-900 dark:text-white">065</span>
                    </li>
                  </ul>
                  <div className="mt-6 text-sm text-slate-500 leading-relaxed">
                    *English-speaking operators available on 078 (Green Angels).
                  </div>
                </div>
            </div>
          </Section>

          <Section id="host-cities" title="Host City Resources">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostCities.map((city, index) => (
                <div key={index} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-xl text-slate-900 dark:text-white">{city.city}</h4>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg uppercase">{city.country}</span>
                  </div>
                  <div className="space-y-3">
                     <div className="flex items-start gap-3">
                        <Shield className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-500 uppercase font-bold">Police</p>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{city.police}</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-3">
                        <Stethoscope className="w-4 h-4 text-blue-500 mt-1 shrink-0" />
                        <div>
                          <p className="text-xs text-slate-500 uppercase font-bold">Hospital</p>
                          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{city.hospital}</p>
                        </div>
                     </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-200 dark:border-slate-800">
                    <Link href={`/world-cup-2026-${getCitySlug(city.city)}-guide`} className="text-sm font-bold text-emerald-600 hover:text-emerald-500 flex items-center gap-1">
                      View Local Guide <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="medical" title="Medical & Hospital Resources">
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  Medical care standards are high in all three host nations, but costs and access vary significantly. In the USA, healthcare is private and notoriously expensive. An ambulance ride alone can cost over $1,000 USD.
                </p>
            </div>
            <div className="p-8 bg-blue-50 dark:bg-blue-900/10 rounded-[2rem] border border-blue-100 dark:border-blue-800/30">
                <h4 className="font-bold text-2xl text-blue-900 dark:text-blue-300 mb-6 flex items-center gap-3">
                  <Stethoscope className="w-6 h-6" /> Pharmacy Tips
                </h4>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">USA</span>
                        <p className="font-bold text-slate-900 dark:text-white">CVS, Walgreens, Rite Aid</p>
                        <p className="text-sm text-slate-500 mt-1">Often open 24/7</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Canada</span>
                        <p className="font-bold text-slate-900 dark:text-white">Shoppers Drug Mart, Rexall</p>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Mexico</span>
                        <p className="font-bold text-slate-900 dark:text-white">Farmacias del Ahorro</p>
                        <p className="text-sm text-slate-500 mt-1">Look for "Consultorio" for quick doctor visits</p>
                    </div>
                </div>
            </div>
          </Section>

          <Section id="embassies" title="Embassy & Consulate Support">
             <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                    If you lose your passport or encounter serious legal trouble, contact your country's embassy immediately. While main embassies are in capital cities, many countries have consulates in major hubs like New York, Los Angeles, and Toronto.
                  </p>
                  <div className="space-y-6">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white">When to contact an embassy:</h4>
                    <ul className="space-y-4">
                        {[
                            "Lost or stolen passport",
                            "Arrest or detention",
                            "Serious medical emergency or death"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm text-slate-500 mt-4 italic">
                        *Not for: Flight changes, hotel bookings, or ticket issues.
                    </p>
                  </div>
                </div>
                <div className="p-8 bg-slate-100 dark:bg-slate-800 rounded-[2rem]">
                  <h4 className="font-bold text-2xl mb-6">Quick Links</h4>
                  <ul className="space-y-4">
                    <li>
                      <Link href="https://www.usembassy.gov/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white dark:bg-slate-700 rounded-xl hover:shadow-md transition-all group">
                        <span className="font-bold text-slate-700 dark:text-slate-200">US Department of State (Visas)</span>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white dark:bg-slate-700 rounded-xl hover:shadow-md transition-all group">
                        <span className="font-bold text-slate-700 dark:text-slate-200">Canada Immigration (IRCC)</span>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                      </Link>
                    </li>
                    <li>
                      <Link href="https://www.gob.mx/sre" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white dark:bg-slate-700 rounded-xl hover:shadow-md transition-all group">
                        <span className="font-bold text-slate-700 dark:text-slate-200">Mexico Foreign Affairs (SRE)</span>
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                      </Link>
                    </li>
                  </ul>
                </div>
             </div>
          </Section>

          <Section id="safety-tips" title="Safety Tips & Scams">
            <div className="grid md:grid-cols-1 max-w-2xl mx-auto mb-12">
                <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                    <Globe className="w-10 h-10 text-emerald-500 mb-6" />
                    <h3 className="font-bold text-2xl mb-4 text-slate-900 dark:text-white">Connectivity</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
                        Don't rely on finding local SIM cards. Download an eSIM before you fly to stay connected for maps and emergency calls.
                    </p>
                    <AffiliateButton href="#" text="Get an eSIM from Airalo" variant="outline" />
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="font-bold text-2xl mb-6">Common Scams to Avoid</h3>
                {[
                    { title: "Fake Tickets", desc: "Only buy from FIFA.com or official resale platforms. Paper tickets are largely obsolete; everything is mobile." },
                    { title: "\"Free\" Bracelets/Gifts", desc: "Common in tourist hubs. Someone forces a bracelet on you and demands payment. Firmly refuse and walk away." }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-6 p-8 bg-white dark:bg-slate-800 rounded-[2rem] items-center border border-slate-100 dark:border-slate-700">
                        <div className="shrink-0 w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center font-black text-2xl text-red-500">{i + 1}</div>
                        <div>
                            <h4 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">{item.title}</h4>
                            <p className="text-lg text-slate-600 dark:text-slate-400">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
          </Section>

          <Section id="faq" title="FAQ">
            <div className="space-y-4">
                <FAQItem 
                    question="What happens if I get arrested?"
                    answer="Do not resist. Ask for a lawyer and for your embassy to be notified immediately. This is your right under the Vienna Convention."
                />
                <FAQItem 
                    question="Is tap water safe to drink?"
                    answer={
                        <>
                            <div className="mb-2"><strong>USA & Canada:</strong> Yes, tap water is generally high quality and safe.</div>
                            <div><strong>Mexico:</strong> No. Stick to bottled or filtered water to avoid illness.</div>
                        </>
                    }
                />
                <FAQItem 
                    question="Can I use Uber in all host cities?"
                    answer="Yes, Uber and Lyft are widely available in US and Canadian cities. In Mexico, Uber is safe and recommended over hailing street taxis, especially at night."
                />
            </div>
          </Section>

        </main>
      </div>
      
    </div>
  );
}



