'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { motion, useScroll, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { 
  MapPin, Calendar, Users, ArrowRight, Info, CheckCircle2, 
  Trophy, Plane, Hotel, Ticket, Share2, MessageSquare, 
  ThumbsUp, Send, HelpCircle, Utensils, Camera, Sun, 
  DollarSign, Shield, Clock, Globe, Star, ExternalLink,
  Train, Bus, Car, Bike, AlertTriangle, Briefcase,
  X, ChevronRight, Facebook, Twitter, Linkedin, Copy,
  ShieldAlert, Lock, XCircle, Search, CreditCard, Smartphone, User, Flag, Wifi, FileText, Eye, ShieldCheck, Ban, Save
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
    const text = "Essential World Cup 2026 Passport & Document Security Guide";
    
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
          <span className="text-emerald-600 dark:text-emerald-500 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">Identity Protection</span>
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
    { id: 'essentials', label: 'Essentials' },
    { id: 'storage', label: 'Storage' },
    { id: 'physical', label: 'Physical Security' },
    { id: 'digital', label: 'Digital Backup' },
    { id: 'recovery', label: 'Recovery' },
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
            src="/images/safety-guide/Passport & Document Security Protecting Your Identity.webp" 
            alt="World Cup 2026 Passport & Document Security" 
            fill 
            className="object-cover object-center"
            priority 
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
                { label: 'Passport & Document Security', href: '/world-cup-2026-passport-document-security' }
              ]} 
            />

              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Last Updated: January 4, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Essential Guide
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
                  Identity Protection
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                World Cup 2026 Passport & Document Security
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                Protecting Your Identity Abroad. <span className="text-slate-900 dark:text-white font-medium">Definitive Guide</span>.
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
             <div className="pl-6 border-l-4 border-emerald-500 my-12 italic text-slate-800 dark:text-slate-200 font-medium text-xl">
               <strong>The Rule:</strong> Treat your passport like it is worth $1 million cash. Because if you lose it abroad, the cost to your trip and sanity will feel even higher.
             </div>
             <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
               Your passport is your most valuable possession abroad. A lost or stolen passport ruins your trip; a stolen identity destroys your life.
             </p>
             <p className="text-lg text-slate-600 dark:text-slate-400">
               One moment of carelessness can lead to months of bureaucratic nightmare. This guide covers complete document security: protection, storage, backup, and recovery strategies used by travel professionals.
             </p>
          </div>

          <Section id="essentials" title="ESSENTIAL DOCUMENTS">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard icon={AlertTriangle} label="Lost Passports/Yr" value="400k+" />
              <StatCard icon={DollarSign} label="Replacement Cost" value="$150+" />
              <StatCard icon={Clock} label="Recovery Time" value="3-6 Wks" />
              <StatCard icon={ShieldAlert} label="Identity Risk" value="High" />
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 mb-12">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The Paper Trail</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-lg">
                Before you even pack your bags, ensure you have the correct documentation. Missing a single form can result in denied boarding or entry.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Travel Documents</h3>
                  <GreenShieldBox 
                    title="Must-Have Items"
                    items={[
                      "Passport (valid 6+ months beyond return date)",
                      "Visa / ESTA / eTA (Printed confirmation)",
                      "Return Ticket Proof (Required by customs)",
                      "Accommodation Booking Confirmations",
                      "Passport Photos (2 extra for emergencies)"
                    ]}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Financial & Medical</h3>
                  <GreenShieldBox 
                    title="Critical Backups"
                    items={[
                      "Travel Insurance Policy Number & Contact",
                      "Credit Cards (2-3 from different banks)",
                      "Emergency Cash ($200-500 USD equivalent)",
                      "Prescriptions (in original bottles)",
                      "Emergency Contact List (Physical paper copy)"
                    ]}
                  />
                </div>
            </div>
          </Section>

          <Section id="storage" title="STORAGE STRATEGY">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              <span className="font-bold text-slate-900 dark:text-white">Never keep all documents in one place.</span> If you lose your bag, you lose everything. Instead, split your assets across three locations to ensure redundancy.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="p-8 rounded-[2rem] bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-800 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400 font-bold text-xl">1</div>
                <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">On Your Person</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">Daily carry essentials only.</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> One credit card
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Small cash
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Phone
                  </li>
                  <li className="flex items-center gap-2 text-red-500 font-bold">
                    <X className="w-4 h-4" /> NO Passport
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-[2rem] bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 font-bold text-xl">2</div>
                <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">Hotel Safe</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">Primary secure storage.</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" /> Original Passport
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" /> Backup cards
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" /> Bulk cash
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" /> Document copies
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-[2rem] bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/30">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 font-bold text-xl">3</div>
                <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">Hidden Backup</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">Ultimate fail-safe.</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" /> Money belt
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" /> Secret pocket
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" /> Emergency $100
                  </li>
                  <li className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-500" /> Cloud access
                  </li>
                </ul>
              </div>
            </div>

            <AffiliateButton href="https://www.amazon.com/s?k=money+belt+travel" text="Shop Money Belts & Hidden Wallets" variant="secondary" icon={Briefcase} />
          </Section>

          <Section id="physical" title="PHYSICAL PROTECTION">
             <div className="mb-12">
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">RFID & Theft Prevention</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  Thieves can scan RFID chips in passports and credit cards from 10 feet away. Physical theft is even more common.
                </p>
                <RedFlagBox 
                  title="High Risk Areas"
                  items={[
                    "Public Transport (Metro, Buses) during rush hour",
                    "Crowded Stadium Entrances and Fan Zones",
                    "Tourist Landmarks with high foot traffic",
                    "Outdoor cafes where bags are left on chairs",
                    "Airport Arrivals halls (distracted travelers)"
                  ]}
                />
                
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                   <h4 className="font-bold text-xl mb-6 flex items-center gap-3">
                     <ShieldCheck className="w-6 h-6 text-emerald-500" />
                     Recommended Gear
                   </h4>
                   <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                        <Lock className="w-8 h-8 text-emerald-500" />
                        <div>
                          <span className="font-bold block">RFID Wallet</span>
                          <span className="text-sm text-slate-500">Blocks digital skimming</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                        <Briefcase className="w-8 h-8 text-emerald-500" />
                        <div>
                          <span className="font-bold block">Slash-Proof Bag</span>
                          <span className="text-sm text-slate-500">Prevents cut-and-run theft</span>
                        </div>
                      </div>
                   </div>
                   <div className="mt-8">
                     <AffiliateButton href="https://www.amazon.com/s?k=rfid+passport+holder" text="View Top Rated Security Gear" variant="primary" icon={Shield} />
                   </div>
                </div>
             </div>
          </Section>

          <Section id="digital" title="DIGITAL BACKUP">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
               If your physical documents are stolen, digital copies are your lifeline. They speed up the replacement process at embassies by days.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
               <div>
                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What to Scan</h3>
                 <ul className="space-y-4">
                    {["Passport Information Page", "Visa / Entry Stamps", "Driver's License (Front/Back)", "Credit Cards (Front/Back)", "Travel Insurance Policy"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-lg text-slate-700 dark:text-slate-300">
                        <Camera className="w-5 h-5 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                 </ul>
               </div>
               <div>
                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Where to Store</h3>
                 <ul className="space-y-4">
                    {["Secure Cloud (Google Drive, Dropbox, iCloud)", "Encrypted Email to yourself", "Offline on Phone (Secure Folder)", "USB Drive (Encrypted) kept separate"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-lg text-slate-700 dark:text-slate-300">
                        <Save className="w-5 h-5 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                 </ul>
               </div>
            </div>
          </Section>

          <Section id="recovery" title="EMERGENCY RECOVERY">
            <div className="bg-slate-900 text-slate-900 dark:text-white p-10 rounded-[2rem] relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
               
               <h3 className="text-3xl font-bold mb-6 relative z-10">Lost Your Passport?</h3>
               <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 relative z-10">Don't panic. Follow these exact steps immediately.</p>
               
               <div className="space-y-6 relative z-10">
                 <div className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900 dark:text-white shrink-0">1</div>
                   <div>
                     <h4 className="font-bold text-xl">File a Police Report</h4>
                     <p className="text-slate-400 mt-1">Go to the nearest station. You need the report number for insurance and embassy replacement.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900 dark:text-white shrink-0">2</div>
                   <div>
                     <h4 className="font-bold text-xl">Contact Your Embassy</h4>
                     <p className="text-slate-400 mt-1">Schedule an emergency appointment. Bring your digital copies and police report.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-slate-900 dark:text-white shrink-0">3</div>
                   <div>
                     <h4 className="font-bold text-xl">Contact Your Bank</h4>
                     <p className="text-slate-400 mt-1">Freeze any cards that were with your passport to prevent financial theft.</p>
                   </div>
                 </div>
               </div>

               <div className="mt-10 pt-8 border-t border-white/10">
                 <AffiliateButton href="/world-cup-2026-emergency-contacts" text="Find Embassy Contacts" variant="primary" icon={Globe} />
               </div>
            </div>
          </Section>

          <Section id="faq" title="Frequently Asked Questions">
            <div className="space-y-2">
              <FAQItem 
                question="Should I carry my passport with me at all times?"
                answer="Generally, no. Unless you are crossing a border, checking into a hotel, or buying a SIM card, it is safer in the hotel safe. Carry a color photocopy or a digital version on your phone for daily identification."
              />
              <FAQItem 
                question="What if I lose my passport right before my flight?"
                answer="Go immediately to your embassy. Most can issue an emergency travel document (limited validity) within 24 hours for verified citizens to return home."
              />
              <FAQItem 
                question="Are hotel safes actually secure?"
                answer="They are safer than your pocket, but not invincible. For maximum security, use a secondary lock or a portable travel safe. Never leave the master code (0000) or key in the room."
              />
              <FAQItem 
                question="Do I need a visa for USA, Canada, and Mexico?"
                answer="It depends on your citizenship. Many travelers need an ESTA for the USA and an eTA for Canada. Check the official government websites for each country well in advance."
              />
            </div>
          </Section>

        </main>
      </div>
      
    </div>
  );
}



