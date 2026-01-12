'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { 
  DollarSign, 
  CreditCard, 
  Wallet, 
  ShieldAlert, 
  Smartphone, 
  Globe, 
  Info, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Landmark,
  Shield,
  Phone,
  Banknote,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Check,
  MessageSquare,
  Users,
  Hotel,
  Star,
  Coins
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
    const text = "Check out this World Cup 2026 Money & Financial Safety Guide!";
    
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
          <span className="text-emerald-600 dark:text-emerald-500 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">Financial Guide</span>
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
    { id: 'currencies', label: 'Host Currencies' },
    { id: 'preparation', label: 'Financial Prep' },
    { id: 'cards', label: 'Best Credit Cards' },
    { id: 'atms', label: 'ATM Strategies' },
    { id: 'cash', label: 'Cash Strategy' },
    { id: 'fraud', label: 'Fraud Prevention' },
    { id: 'budget', label: 'Budgeting' },
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
            src="/images/safety-guide/Money & Financial Safety Cash Cards & Currencies.webp" 
            alt="World Cup 2026 Money & Financial Safety" 
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
                  { label: 'Money & Financial Safety', href: '/world-cup-2026-money-financial-safety' }
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
                  Financial Safety
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                World Cup 2026 Money & Financial Safety
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                Cash, Cards & Currencies. <span className="text-slate-900 dark:text-white font-medium">Definitive Guide</span>.
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
            
            {/* Sidebar CTA */}
            <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 ml-3">
              <h4 className="font-bold text-emerald-900 dark:text-emerald-100 mb-2">Essential Tool</h4>
              <p className="text-sm text-emerald-800 dark:text-emerald-200 mb-4">
                Don't pay hidden fees. Get the card built for international travel.
              </p>
              <a href="https://wise.com" target="_blank" rel="noopener noreferrer" className="block w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-slate-900 dark:text-white text-center text-sm font-bold rounded-lg transition-colors">
                Get a Wise Card
              </a>
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
               <strong>The Reality:</strong> Navigating three different currencies, banking systems, and payment norms is a challenge. A bad exchange rate can cost you 20% of your budget.
             </div>
             <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
               Picture this: You&apos;ve just landed in Mexico City. You hail a taxi to Estadio Azteca, reach for your wallet, and hand the driver a crisp $20 USD bill. He shakes his head. &quot;Pesos, amigo. Only Pesos.&quot;
             </p>
             <p className="text-lg text-slate-600 dark:text-slate-400">
               Panic sets in. You rush to the nearest ATM, only to have your card rejected because you forgot to notify your bank. This isn&apos;t just a nightmare scenario—it&apos;s a reality for thousands of unprepared fans. From the cashless stadiums of the USA to the cash-is-king street taco stands of Guadalajara, your money strategy needs to be as versatile as the teams on the pitch.
             </p>
          </div>

          <Section id="currencies" title="Understanding the Three Host Currencies">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <StatCard icon={DollarSign} label="United States" value="USD" />
              <StatCard icon={Coins} label="Canada (~75% USD)" value="CAD" />
              <StatCard icon={Banknote} label="Mexico (Volatile)" value="MXN" />
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The Cross-Border Reality</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-lg">
                If you are following your team from Toronto to New York to Mexico City, you will be juggling three wallets. Do not assume you can use USD in Canada or Mexico.
              </p>
              <RedFlagBox 
                title="The Dynamic Currency Conversion Trap" 
                items={[
                  "When you use your card, the terminal might ask: 'Pay in USD or MXN?'",
                  "ALWAYS CHOOSE THE LOCAL CURRENCY (MXN/CAD).",
                  "If you choose USD, the merchant's bank sets a terrible exchange rate.",
                  "Let your own bank handle the conversion."
                ]} 
              />
            </div>
          </Section>

          <Section id="preparation" title="Before You Leave: Financial Prep">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              Your financial defense starts at home. Weeks before you board that plane, execute this strategy to ensure your access to funds is never cut off.
            </p>

            <GreenShieldBox 
              title="Pre-Trip Financial Checklist"
              items={[
                "Set Travel Notices: Use your banking app to set travel dates for USA, Canada, AND Mexico.",
                "Diversify Your Stash: 2 Credit Cards (Visa & Mastercard), 1 Debit Card, and $200 USD emergency cash.",
                "Enable Transaction Alerts: Turn on push notifications for every transaction to spot skimming instantly.",
                "Digital Backup: Store photos of your cards (front and back) in a secure cloud folder."
              ]}
            />
          </Section>

          <Section id="cards" title="Best Credit Cards for World Cup 2026">
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Foreign transaction fees (FX fees) are the silent budget killer. Most standard bank cards charge <strong>3% on every purchase</strong> outside your home country. On a $5,000 trip, that&apos;s $150 wasted.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
                <div className="bg-blue-600 p-8 text-slate-900 dark:text-white">
                  <h3 className="text-2xl font-bold mb-2">Chase Sapphire Preferred®</h3>
                  <span className="text-blue-100 font-medium">Best Overall Travel Card</span>
                </div>
                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> No foreign transaction fees
                    </li>
                    <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Primary rental car insurance
                    </li>
                    <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 2x points on travel & dining
                    </li>
                  </ul>
                  <AffiliateButton href="#" text="View Offer" variant="secondary" subtext="Chase" />
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
                <div className="bg-indigo-600 p-8 text-slate-900 dark:text-white">
                  <h3 className="text-2xl font-bold mb-2">Capital One Venture X</h3>
                  <span className="text-indigo-100 font-medium">Best for Lounge Access</span>
                </div>
                <div className="p-8">
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Unlimited lounge access
                    </li>
                    <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> $300 annual travel credit
                    </li>
                    <li className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Hertz President's Circle status
                    </li>
                  </ul>
                  <AffiliateButton href="#" text="View Offer" variant="secondary" subtext="Capital One" />
                </div>
              </div>
            </div>
          </Section>

          <Section id="atms" title="ATM Strategies: Never Pay a Fee">
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              ATM fees in North America can be brutal. You might get hit with a fee from the machine ($3-$10) AND a fee from your home bank ($5 + 3%). A single $100 withdrawal could cost you $115.
            </p>

            <RedFlagBox 
              title="ATM Safety Warnings" 
              items={[
                "DECLINE THE CONVERSION: ATMs will offer to charge in your home currency. Always decline.",
                "In Mexico: ONLY use ATMs inside bank branches or secure malls. Never street-facing ATMs at night.",
                "In USA/Canada: Avoid generic 'ATM' machines in corner stores; they have the highest fees."
              ]} 
            />
          </Section>

          <Section id="cash" title="Cash Strategy by Country">
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-48 shrink-0">
                  <span className="block text-4xl font-black text-slate-900 dark:text-white mb-2">USA</span>
                  <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">Card is King</span>
                </div>
                <div>
                  <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
                    <strong>95% Card / 5% Cash.</strong> You can go weeks in NYC or LA without touching a bill. Tipping is expected (20%) but almost always done on the card machine.
                  </p>
                  <p className="text-sm font-bold text-slate-500">Keep $50 USD in small bills ($1s and $5s) for hotel tips.</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-48 shrink-0">
                  <span className="block text-4xl font-black text-slate-900 dark:text-white mb-2">Canada</span>
                  <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">Contactless</span>
                </div>
                <div>
                  <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
                    <strong>90% Card / 10% Cash.</strong> Tap-to-pay is universal. Cash is rarely needed except for very small vendors.
                  </p>
                  <p className="text-sm font-bold text-slate-500">Keep $50 CAD for emergencies. Coins are valuable here!</p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-48 shrink-0">
                  <span className="block text-4xl font-black text-slate-900 dark:text-white mb-2">Mexico</span>
                  <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">Cash Essential</span>
                </div>
                <div>
                  <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">
                    <strong>60% Card / 40% Cash.</strong> Upscale places take cards. Tacos, street markets, and taxis often require cash.
                  </p>
                  <p className="text-sm font-bold text-slate-500">Keep 2,000-3,000 Pesos (~$100-150 USD) but split it up.</p>
                </div>
              </div>
            </div>
          </Section>

          <Section id="fraud" title="Protecting Yourself from Fraud">
             <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
               World Cup events are magnets for pickpockets and digital thieves. Here is your defense playbook:
             </p>
             <div className="grid md:grid-cols-2 gap-8 mb-12">
               <RedFlagBox 
                 title="The 'Helpful Stranger'" 
                 items={[
                   "At an ATM, someone taps your shoulder saying you dropped money.",
                   "While you turn, an accomplice swaps your card.",
                   "Ignore everyone at the ATM."
                 ]} 
               />
               <RedFlagBox 
                 title="The Fake Wi-Fi" 
                 items={[
                   "Hackers set up 'Stadium_Free_WiFi' hotspots.",
                   "You connect and log into your bank.",
                   "They steal your credentials.",
                   "Always use a VPN or mobile data."
                 ]} 
               />
             </div>
             <AffiliateButton href="#" text="Get a VPN for Safety" variant="primary" icon={Shield} subtext="NordVPN / ExpressVPN" />
          </Section>

          <Section id="budgeting" title="Budgeting for World Cup 2026">
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <StatCard icon={Users} label="Budget Backpacker" value="$80-120/day" />
              <StatCard icon={Hotel} label="Mid-Range Fan" value="$200-300/day" />
              <StatCard icon={Star} label="Luxury Experience" value="$500+/day" />
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Remember to account for <strong>&quot;The World Cup Premium.&quot;</strong> During the tournament, hotel prices often triple, and Uber surge pricing will be constant near stadiums. Pad your budget by at least 20% for unexpected costs.
            </p>
          </Section>

          <Section id="faq" title="Frequently Asked Questions">
            <div className="space-y-4">
              <FAQItem 
                question="What currency do I need for World Cup 2026?"
                answer="You will need US Dollars (USD) for the United States, Canadian Dollars (CAD) for Canada, and Mexican Pesos (MXN) for Mexico. While credit cards are widely accepted, carrying local cash in each country is essential for small purchases, especially in Mexico."
              />
              <FAQItem 
                question="Can I use US Dollars in Canada and Mexico?"
                answer="Generally, no. While some tourist areas in Canada and Mexico might accept USD, the exchange rate will be poor. It is always better to pay in the local currency (CAD or MXN) to get the best value."
              />
              <FAQItem 
                question="Do World Cup stadiums accept cash?"
                answer="Most modern stadiums in North America are now cashless venues, accepting only credit/debit cards and mobile payments (Apple Pay, Google Pay). Always bring a card, but keep some cash for transport and pre-game vendors outside."
              />
              <FAQItem 
                question="What are the best credit cards for travel?"
                answer="The best cards for World Cup travel are those with no foreign transaction fees (like Chase Sapphire Preferred or Capital One Venture). These save you the typical 3% fee charged on every international purchase."
              />
              <FAQItem 
                question="How do I avoid ATM fees abroad?"
                answer="Use a debit card that reimburses ATM fees (like Charles Schwab) or use ATMs within your bank's partner network (e.g., Bank of America partners with Scotiabank in Canada/Mexico) to minimize withdrawal costs."
              />
            </div>
          </Section>

          {/* Read Next */}
          <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Read Next</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Link href="/world-cup-2026-travel-insurance-guide" className="group block">
                <div className="relative h-64 rounded-[2rem] overflow-hidden mb-6">
                  <Image
                    src="/images/safety-guide/A_realistic_high-detail_photo_of_travel_insurance_essentials_for_World_Cup_2026.webp"
                    alt="Travel Insurance"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 block">Essential Protection</span>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-400 transition-colors">
                      Travel Insurance Guide
                    </h4>
                  </div>
                </div>
              </Link>
              <Link href="/world-cup-2026-scams-avoid-fraud" className="group block">
                <div className="relative h-64 rounded-[2rem] overflow-hidden mb-6">
                  <Image
                    src="/images/safety-guide/A_realistic_photo-style_image_showing_a_worried_football_fan_reviewing_suspiciou.webp"
                    alt="Avoid Scams"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 block">Critical Warning</span>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-red-400 transition-colors">
                      Avoid Ticket Scams
                    </h4>
                  </div>
                </div>
              </Link>
              <Link href="/world-cup-2026-passport-document-security" className="group block">
                <div className="relative h-64 rounded-[2rem] overflow-hidden mb-6">
                  <Image
                    src="/images/safety-guide/A_realistic_high-detail_photo_of_travel_insurance_essentials_for_World_Cup_2026.webp"
                    alt="Document Security"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 block">Identity Safety</span>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-400 transition-colors">
                      Passport Security
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
          </div>

        </main>
      </div>
      
    </div>
  );
}



