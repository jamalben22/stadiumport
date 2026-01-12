'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { 
  Shield, CheckCircle2, AlertTriangle, 
  MapPin, Users, Info, ChevronRight, 
  HeartPulse, Lock, Facebook, Twitter, Linkedin, 
  Copy, ShieldAlert, ShieldCheck, Bus, Ban, Ticket, ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';



const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// 1. Floating Social Share
const SocialShare = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Fan Zone & Crowd Safety: Enjoying the Atmosphere at World Cup 2026";
    
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
          <span className="text-emerald-600 dark:text-emerald-500 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">Crowd Safety</span>
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

export default function FanZoneSafetyClientPage() {
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
    { id: 'pre-event', label: 'Preparation' },
    { id: 'zone-security', label: 'Zone Security' },
    { id: 'crowd-safety', label: 'Crowd Safety' },
    { id: 'emergency', label: 'Emergency' },
    { id: 'personal-safety', label: 'Belongings' },
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
            src="/images/safety-guide/Fan Zone & Crowd Safety Enjoying the Atmosphere.webp" 
            alt="World Cup 2026 Fan Zone Crowd Safety" 
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
                  { label: 'Fan Zones Safety', href: '/world-cup-2026-fan-zones-safety' }
                ]} 
              />

              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                    Last Updated: January 4, 2026
                  </span>
                <span className="px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Crowd Control
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
                  Fan Experience
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                World Cup 2026 Fan Zone Safety
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                The definitive guide to navigating crowds and enjoying the atmosphere safely during World Cup 2026. From entry checkpoints to emergency protocols.
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
               <strong>The Goal:</strong> With the right awareness, the fan zone can be exactly what it should be—a celebration of football and community.
             </div>
             <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
               Imagine standing shoulder-to-shoulder with thousands of fans, celebrating a last-minute goal. The energy is electric. But in large crowds, excitement can quickly turn into chaos if you aren&apos;t prepared.
             </p>
             <p className="text-lg text-slate-600 dark:text-slate-400">
               With World Cup 2026 hosting millions of fans across three countries, fan zones and public viewing areas will be packed. Understanding crowd dynamics and personal safety strategies is essential for a stress-free experience.
             </p>
          </div>

          <Section id="risks" title="UNDERSTANDING RISKS">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard icon={Users} label="Crowd Density" value="High" />
              <StatCard icon={HeartPulse} label="Atmosphere" value="Electric" />
              <StatCard icon={MapPin} label="Official Venues" value="Secure" />
              <StatCard icon={Shield} label="Security Level" value="Managed" />
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Historical Context</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-lg">
                Past major sporting events have shown that crowd surges and bottlenecks are real risks. However, FIFA and host cities have implemented rigorous crowd management protocols for 2026 to prevent such incidents.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                For 2026, the primary challenges will be the intense summer heat in Mexico and parts of the USA, and the sheer volume of fans in dense urban centers like New York and Toronto.
              </p>
            </div>

            <RedFlagBox 
              title="The 'Overcrowding' Trap"
              items={[
                "If you feel the crowd becoming too dense, do not push forward.",
                "Avoid 'choke points' like narrow exits or areas near barricades.",
                "If you drop something, do not stop to pick it up—keep moving with the flow."
              ]}
            />
          </Section>

          <Section id="pre-event" title="PRE-EVENT PREPARATION">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              Safety starts before you even leave for the stadium or fan fest. The most critical decision you make is <em>when</em> you arrive and <em>where</em> you go.
            </p>

            <GreenShieldBox 
              title="The Venue Matters"
              items={[
                "Official FIFA Fan Festivals: Highest security, metal detectors, medical teams on site.",
                "Public Viewing Areas: Managed by cities, moderate security, police presence.",
                "Unofficial Street Parties: Variable security, higher risk of theft or disorder."
              ]}
            />

            <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 mb-12">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Arrival Strategy</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">
                Don&apos;t just rely on GPS. Study the venue map beforehand. Identify your gate and multiple potential routes.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Timing:</strong> Arrive early to avoid the last-minute rush before kickoff.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Hydration:</strong> Drink water before you enter, especially in hot climates.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Meeting Point:</strong> Establish a meeting point <em>outside</em> the venue in case of separation.</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4">
               <AffiliateButton href="/world-cup-2026-transportation" text="Plan Your Transport" icon={Bus} variant="primary" />
               <AffiliateButton href="https://worldnomads.com" text="Get Travel Insurance" icon={ShieldCheck} variant="secondary" />
            </div>
          </Section>

          <Section id="zone-security" title="ZONE SECURITY & ENTRY">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              Getting in is the first hurdle. Security checks are strict for your safety, similar to airport protocols.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-6 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-8 h-8" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Essential Checks</h3>
                </div>
                <ul className="space-y-4">
                  {['Bag Checks (Clear bags recommended)', 'Metal Detectors (Magnetometers)', 'Ticket Verification (Digital)', 'ID Checks (For alcohol access)'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-6 text-red-600 dark:text-red-400">
                  <Ban className="w-8 h-8" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Prohibited Items</h3>
                </div>
                <ul className="space-y-4">
                  {['Flares & Fireworks', 'Weapons of any kind', 'Large Umbrellas', 'Professional Cameras (No accreditation)'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <GreenShieldBox 
              title="ProTip: The 'Light' Entry"
              items={[
                "Bring minimal items to speed up your entry process.",
                "Use the 'No Bag' express lanes if they are available.",
                "Empty your pockets of metal items before you reach the scanner.",
                "It is the fastest way to get to the fun."
              ]}
            />
          </Section>

          <Section id="crowd-safety" title="NAVIGATING THE CROWD">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              Once inside, the energy is infectious. But situational awareness is key. Crowds can shift and densify rapidly.
            </p>

            <GreenShieldBox 
              title="Movement Checklist"
              items={[
                "Go with the flow: Do not try to move against a large crowd.",
                "Arms up: Keep your arms at chest level ('boxer stance') to protect your breathing space.",
                "Look for exits: Always know where the nearest emergency exit is, not just where you entered.",
                "Stay vertical: If you fall, get up immediately. If you can't, curl into a ball and protect your head."
              ]}
            />

            <RedFlagBox 
              title="The 'Panic' Trigger"
              items={[
                "Loud noises or sudden movements can trigger panic in a crowd.",
                "Stay calm. Look for solid structures (walls, fences) to stand near if things get chaotic.",
                "Do not run unless necessary. Walk briskly and purposefully."
              ]}
            />
          </Section>

          <Section id="emergency" title="EMERGENCY PROTOCOLS">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              Have a plan for when things don't go as expected. Preparedness prevents panic.
            </p>

            <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">The Group Safety Plan</h3>
              <div className="space-y-6">
                {[
                  { title: "Set a Meeting Point", desc: "Choose a distinct landmark OUTSIDE the zone as your reunion spot." },
                  { title: "Share Locations", desc: "Enable WhatsApp live location or use AirTags for friends and family." },
                  { title: "Hydrate", desc: "Heat stroke is a real risk. Drink water regularly, even if you are drinking alcohol." },
                  { title: "Identify Medics", desc: "Spot the medical tents or personnel in high-visibility vests early." },
                  { title: "Charge Up", desc: "Bring a power bank. Cell service may drop in dense crowds." }
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

          <Section id="personal-safety" title="PERSONAL BELONGINGS & HEALTH">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-light">
              Protect your valuables and your well-being. Pickpockets thrive in distracted crowds.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Anti-Theft Tactics</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Don&apos;t be an easy target. Secure your phone and wallet. We recommend <strong>Zippered Pockets</strong> or a <strong>Money Belt</strong>.
                </p>
                <div className="flex flex-col gap-3">
                  <AffiliateButton href="#" text="Shop Anti-Theft Bags" icon={Lock} variant="outline" />
                  <AffiliateButton href="#" text="Shop Money Belts" icon={Shield} variant="outline" />
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Health Defense</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Protect yourself from the elements and the noise. Sunscreen and earplugs are your best friends in a fan zone.
                </p>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                  <p className="text-emerald-800 dark:text-emerald-300 text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Simple gear, huge comfort upgrade.
                  </p>
                </div>
              </div>
            </div>

            <GreenShieldBox 
              title="The 'Buddy System'"
              items={[
                "Never go to the bathroom or food stands alone if the crowd is dense.",
                "Keep an eye on each other's drinks to prevent spiking.",
                "Check in with each other regularly."
              ]}
            />
          </Section>

          <Section id="scams" title="SCAM PREVENTION">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              Scammers are creative and target distracted fans. Be aware of these common frauds.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 rounded-[2rem] border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10">
                <h4 className="font-bold text-xl text-red-700 dark:text-red-400 mb-4 flex items-center gap-3">
                  <Ticket className="w-6 h-6"/> The Ticket Tout
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  <strong>The Scam:</strong> Someone selling "spare tickets" outside the gate for cash. They are often fake or already used.
                </p>
                <p className="text-slate-700 dark:text-slate-300 font-bold">
                  The Fix: Only buy tickets through the official FIFA resale platform.
                </p>
              </div>

              <div className="p-8 rounded-[2rem] border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10">
                <h4 className="font-bold text-xl text-red-700 dark:text-red-400 mb-4 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6"/> The Fake Merch
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  <strong>The Scam:</strong> Street vendors selling "official" jerseys at a discount. They are poor quality and funds may support criminal groups.
                </p>
                <p className="text-slate-700 dark:text-slate-300 font-bold">
                  The Fix: Buy merchandise inside the official venue or official stores.
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
    question: "Are World Cup 2026 fan zones safe?",
    answer: "Yes, official FIFA Fan Festivals and host city fan zones are designed with high security standards, including bag checks, capacity limits, and medical presence. However, crowds can be dense, so personal awareness is essential."
  },
  {
    question: "What items are prohibited in World Cup fan zones?",
    answer: "Common prohibited items include large bags, weapons, fireworks, alcohol (brought from outside), professional cameras without accreditation, and glass containers. Always check specific venue rules before attending."
  },
  {
    question: "How early should I arrive at a fan zone?",
    answer: "For popular matches, arrive at least 2-3 hours before kickoff to ensure entry, as capacity limits are strictly enforced. Early arrival also allows you to find a safe and comfortable viewing spot."
  },
  {
    question: "Is alcohol served in World Cup 2026 fan zones?",
    answer: "Yes, alcohol sales are generally permitted in fan zones in the USA, Canada, and Mexico, subject to local laws and drinking ages (21 in USA, 18/19 in Canada, 18 in Mexico)."
  },
  {
    question: "What should I do if I get separated from my group?",
    answer: "Establish a specific meeting point outside the crowd density before entering. If separated, move to that point. Use timestamped text messages as cell service may be unreliable in large crowds."
  },
  {
    question: "Are fan zones accessible for people with disabilities?",
    answer: "Official fan zones are required to be accessible, offering designated viewing areas, accessible restrooms, and entrances. However, navigating dense crowds to reach these areas can still be challenging."
  },
  {
    question: "Can I bring children to World Cup fan zones?",
    answer: "Yes, fan zones are generally family-friendly, especially during the day. However, evening matches and high-stakes games can become rowdy. We recommend ear protection for children and using ID wristbands."
  },
  {
    question: "What is the difference between official and unofficial fan zones?",
    answer: "Official fan zones are FIFA-sanctioned with high-level security and amenities. Unofficial zones are bars, parks, or street parties which may vary significantly in security, crowd control, and medical support."
  }
];

