'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { 
  Smartphone, Wifi, Radio, AlertTriangle, CheckCircle2, Info, MapPin, 
  Globe, ShieldCheck, Battery, Phone, Lock, Signal, XCircle, 
  ChevronRight, MessageSquare, Zap, Server, ShieldAlert, Copy,
  Twitter, Facebook, Linkedin, ArrowRight, ExternalLink
} from 'lucide-react';



// --- Design System & Components (Mirrored from Accommodation Security) ---

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// 1. Floating Social Share
const SocialShare = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Check out this World Cup 2026 Connectivity Guide!";
    
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
          <span className="text-emerald-600 dark:text-emerald-500 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">Staying Connected</span>
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

const ComparisonTable = ({ headers, rows }: { headers: string[], rows: (string | React.ReactNode)[][] }) => (
  <div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900/50">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-slate-50 dark:bg-slate-800">
          {headers.map((header, i) => (
            <th key={i} className="p-4 font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 min-w-[150px]">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className="p-4 text-slate-600 dark:text-slate-300">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
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
    { id: 'options', label: 'Connectivity Options' },
    { id: 'roaming', label: 'Roaming & Sims' },
    { id: 'wifi', label: 'Public WiFi' },
    { id: 'emergency', label: 'Emergency Comms' },
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
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="/images/safety-guide/Staying Connected SIM Cards & Emergency Comms.webp" 
            alt="World Cup 2026 Connectivity Guide" 
            fill 
            className="object-cover object-center"
            priority quality={60} 
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-[#0A0A0A]/60 to-[#F5F5F7] dark:to-[#0A0A0A]" />
        </motion.div>
        
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
                    { label: 'Staying Connected', href: '/world-cup-2026-connectivity-sim-cards-emergency-communications' }
                  ]} 
                />

              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Last Updated: January 4, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Digital Security
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
                  Stay Online
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                STAYING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">CONNECTED</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                The ultimate guide to SIM cards, eSIMs, and emergency communications across the USA, Canada, and Mexico for World Cup 2026.
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
            <div className="space-y-1 relative border-l-2 border-slate-200 dark:border-slate-800 ml-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.id} 
                  href={`#${link.id}`}
                  className={`block px-6 py-3 text-sm font-bold transition-all duration-300 relative ${
                    activeSection === link.id 
                    ? 'text-emerald-600 dark:text-emerald-400 translate-x-1' 
                    : 'text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
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
          <div className="mb-12 p-6 rounded-2xl text-sm text-slate-500 dark:text-slate-400 flex gap-4 items-start bg-slate-100 dark:bg-slate-900/50">
            <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Transparency:</strong> This guide contains affiliate links. We may earn a commission if you book through them, which helps fund our independent journalism.
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
             <div className="pl-6 border-l-4 border-emerald-500 my-12 italic text-slate-800 dark:text-slate-200 font-medium text-xl">
               <strong>The Goal:</strong> In the modern World Cup experience, connectivity isn&apos;t a luxury—it&apos;s a utility as vital as your passport.
             </div>
             <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
               Imagine landing in Mexico City for the opening match. Your group is meeting at the Angel of Independence, your digital tickets are in your app, and you need to call an Uber. But when you look at your phone, you see &quot;No Service.&quot;
             </p>
             <p className="text-lg text-slate-600 dark:text-slate-400">
               With the tournament spanning 16 cities and three countries, reliable data is your lifeline. Whether navigating a new subway system, coordinating with friends in a crowded fan zone, or needing emergency assistance, you need a plan that works everywhere.
             </p>
          </div>

          <Section id="risks" title="UNDERSTANDING RISKS">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard icon={Server} label="Data Demand" value="High" />
              <StatCard icon={Globe} label="Host Countries" value="3" />
              <StatCard icon={Signal} label="Coverage" value="99%" />
              <StatCard icon={Zap} label="Risk Level" value="Medium" />
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-800 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The Connectivity Landscape</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-lg">
                North America has excellent 5G coverage in all host cities. However, crossing borders can trigger massive roaming charges, and stadium congestion can slow even the fastest networks to a crawl.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                The biggest mistake fans make is assuming their home plan covers all three countries automatically. It often doesn&apos;t, leading to the dreaded &quot;bill shock&quot; upon return.
              </p>
            </div>

            <RedFlagBox 
              title="The 'Bill Shock' Trap"
              items={[
                "International roaming fees can exceed $10/day or $2/MB without a pass.",
                "Background app refreshes consume data even when you aren't using your phone.",
                "Crossing from the USA to Canada/Mexico often triggers a new billing zone instantly."
              ]}
            />
          </Section>

          <Section id="options" title="CONNECTIVITY OPTIONS">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              You have four main plays to choose from. Each has pros and cons depending on your itinerary and budget.
            </p>

            <ComparisonTable 
              headers={["Option", "Pros", "Cons", "Best For"]}
              rows={[
                ["International Roaming", "Easiest, keep your number", "Expensive, data caps", "Short trips, business travelers"],
                ["Local SIM Card", "Cheapest local rates, best signal", "Physical swap, new number", "Single-country stays (>1 week)"],
                ["eSIM (Digital)", "Instant setup, keep home SIM", "Requires unlocked phone", "Multi-country travelers"],
                ["Portable WiFi", "Connects multiple devices", "Another device to charge", "Groups, families"]
              ]}
            />

            <GreenShieldBox 
              title="The 'Unlock' Protocol"
              items={[
                "Call your carrier 2 weeks before travel to request a 'Carrier Unlock'.",
                "If your phone is locked, you CANNOT use a local SIM or eSIM.",
                "Test it: Insert a friend's SIM card from a different carrier. If it works, you're unlocked."
              ]}
            />
          </Section>

          <Section id="roaming" title="ROAMING & SIMS">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">The eSIM Revolution</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              For World Cup 2026, the eSIM is the MVP. It allows you to download a digital data plan for the USA, Canada, and Mexico without ever visiting a store or losing your tiny physical SIM card.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-lg">
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Airalo (Recommended)</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Offers specific "North America" regional plans covering all 3 host countries. Data-only, affordable, and instant activation.
                </p>
                <AffiliateButton href="https://www.airalo.com" text="Get Airalo eSIM" variant="primary" />
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-lg">
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Holafly</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Best for heavy data users. Offers unlimited data plans in many regions, though usually doesn't allow hotspot tethering.
                </p>
                <AffiliateButton href="https://holafly.com" text="Get Holafly eSIM" variant="secondary" />
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-800 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Local SIM Strategy</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">
                If you prefer a physical SIM or need a local phone number for calls, here are the top carriers by country:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="text-2xl">🇺🇸</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white block">United States</strong>
                    <span className="text-slate-600 dark:text-slate-400">T-Mobile (best tourist plans), AT&T, Verizon.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-2xl">🇨🇦</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Canada</strong>
                    <span className="text-slate-600 dark:text-slate-400">Rogers, Bell, Telus. Data is expensive here.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-2xl">🇲🇽</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Mexico</strong>
                    <span className="text-slate-600 dark:text-slate-400">Telcel (best coverage), AT&T Mexico. Very affordable.</span>
                  </div>
                </li>
              </ul>
            </div>
          </Section>

          <Section id="wifi" title="PUBLIC WIFI DANGERS">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              Free WiFi is everywhere in host cities—stadiums, cafes, metros. It is also the easiest vector for cybercriminals to steal your data.
            </p>

            <RedFlagBox 
              title="The 'Evil Twin' Attack"
              items={[
                "Hackers create fake WiFi networks named 'Stadium_Free_WiFi' or 'Hotel_Guest'.",
                "Once you connect, they intercept everything: passwords, credit cards, emails.",
                "Never access banking apps on public WiFi without a VPN."
              ]}
            />

            <GreenShieldBox 
              title="Digital Defense Checklist"
              items={[
                "Install a VPN (Virtual Private Network) before you travel.",
                "Turn off 'Auto-Join WiFi' in your phone settings.",
                "Use 5G/4G data for sensitive transactions instead of public WiFi."
              ]}
            />
          </Section>

          <Section id="emergency" title="EMERGENCY COMMS">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-800 mb-12">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Essential Numbers</h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                  <div className="text-4xl font-black text-emerald-500 mb-2">911</div>
                  <div className="font-bold text-slate-900 dark:text-white">USA & Canada</div>
                  <div className="text-sm text-slate-500">Police, Fire, Ambulance</div>
                </div>
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                  <div className="text-4xl font-black text-emerald-500 mb-2">911</div>
                  <div className="font-bold text-slate-900 dark:text-white">Mexico</div>
                  <div className="text-sm text-slate-500">All Emergencies</div>
                </div>
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                  <div className="text-4xl font-black text-emerald-500 mb-2">089</div>
                  <div className="font-bold text-slate-900 dark:text-white">Mexico (Anonymous)</div>
                  <div className="text-sm text-slate-500">Report Cartel/Crime</div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Offline Backup Apps</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              When the networks are overloaded at halftime, these apps work without signal:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <MapPin className="w-8 h-8 text-emerald-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white">Google Maps (Offline)</h4>
                  <p className="text-slate-600 dark:text-slate-400">Download the map of each host city before you leave your hotel WiFi.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <MessageSquare className="w-8 h-8 text-emerald-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white">Google Translate</h4>
                  <p className="text-slate-600 dark:text-slate-400">Download Spanish and French languages for offline translation.</p>
                </div>
              </div>
            </div>
          </Section>

          <Section id="faq" title="FREQUENTLY ASKED QUESTIONS">
            <div className="space-y-4">
              <FAQItem 
                question="Do I need a new SIM for each country?" 
                answer="Not if you get a 'North America' regional plan (eSIM) or have a roaming plan like T-Mobile (USA) that includes Canada/Mexico. If buying local prepaid SIMs, yes, you typically need a new one for each country."
              />
              <FAQItem 
                question="Is WhatsApp free to use?" 
                answer="WhatsApp is free to download and use over WiFi. If you use it over cellular data, it consumes your data allowance, but doesn't charge per-message fees."
              />
              <FAQItem 
                question="Will my phone work in North America?" 
                answer="Most modern smartphones (iPhone 8+, Samsung S10+) are compatible with North American frequency bands. The main barrier is carrier locking—ensure your phone is unlocked."
              />
              <FAQItem 
                question="How much data do I need?" 
                answer="For a 2-week trip using maps and social media, aim for 10GB-20GB. Video calls and streaming consume the most data."
              />
            </div>
          </Section>

          {/* Bottom CTA */}
          <div className="mt-24 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-3xl md:text-4xl font-black mb-6">Stay Connected, Stay Safe</h3>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                A connected fan is a safe fan. Don&apos;t wait until you land to figure this out. Secure your eSIM or roaming plan today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="https://www.airalo.com" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 text-slate-900 font-bold rounded-full hover:bg-emerald-400 transition-all hover:scale-105"
                >
                  Get Your eSIM
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
               <Globe className="w-full h-full text-white" />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

