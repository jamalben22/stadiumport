'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { 
  Shield, CheckCircle2, AlertTriangle, 
  MapPin, Users, Info, ChevronRight, 
  HeartPulse, Lock, Facebook, Twitter, Linkedin, 
  Copy, ShieldAlert, ShieldCheck, Bus, Ban, Ticket, ArrowRight,
  Moon, Wine, Car, Phone
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';



const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// 1. Floating Social Share
const SocialShare = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Nightlife & After-Hours Safety: World Cup 2026 Guide";
    
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
          <span className="text-emerald-600 dark:text-emerald-500 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">After-Hours Safety</span>
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

export default function NightlifeSafetyClientPage() {
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
    { id: 'pre-night-out', label: 'Pre-Night Prep' },
    { id: 'venue-safety', label: 'Venue Safety' },
    { id: 'street-smarts', label: 'Street Smarts' },
    { id: 'transport', label: 'Transport' },
    { id: 'emergency', label: 'Emergency' },
    { id: 'scams', label: 'Nightlife Scams' },
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
            src="/images/safety-guide/Nightlife & After-Hours Safety.webp" 
            alt="World Cup 2026 Nightlife & After-Hours Safety" 
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
                  { label: 'Nightlife Safety', href: '/world-cup-2026-nightlife-safety' }
                ]} 
              />

              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Last Updated: January 4, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Party Smart
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
                  After Hours
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                NIGHTLIFE & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">AFTER-HOURS</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                Enjoying the celebration safely. The definitive guide to bar districts, late-night transport, and solo safety during World Cup 2026.
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
               <strong>The Goal:</strong> To experience the legendary nightlife of 2026 host cities without becoming a headline.
             </div>
             <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
               The World Cup party doesn't stop at the final whistle. From Mexico City's cantinas to New York's rooftop bars, the nightlife will be legendary. But late nights in unfamiliar cities bring unique risks.
             </p>
             <p className="text-lg text-slate-600 dark:text-slate-400">
               Alcohol lowers inhibitions, and tourists are prime targets for opportunistic crime. This guide covers everything you need to know to enjoy the after-hours atmosphere and get back to your accommodation safely.
             </p>
          </div>

          <Section id="risks" title="UNDERSTANDING RISKS">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard icon={Moon} label="Theft Risk" value="High" />
              <StatCard icon={Wine} label="Intoxication" value="Risk" />
              <StatCard icon={MapPin} label="Unfamiliar Areas" value="Avoid" />
              <StatCard icon={Shield} label="Police Presence" value="Variable" />
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The "Vacation Mode" Vulnerability</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-lg">
                Criminals know that World Cup fans are here to celebrate. They look for groups that are loud, distracted, and visibly intoxicated.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                The most common incidents aren't violent muggings, but subtle thefts: phones lifted from tables, bags swiped from chair backs, and wallets taken from back pockets on crowded dance floors.
              </p>
            </div>

            <RedFlagBox 
              title="The 'Friendly Stranger' Trap"
              items={[
                "Be wary of strangers who are overly eager to buy you drinks or invite you to a 'private' party.",
                "In some cities, this is a prelude to drink spiking or robbery.",
                "Politely decline and stay in public, well-lit venues."
              ]}
            />
          </Section>

          <Section id="pre-night-out" title="PRE-NIGHT PREPARATION">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              A safe night out starts before you leave your hotel room. A few minutes of prep can save you hours of panic later.
            </p>

            <GreenShieldBox 
              title="The Night Out Checklist"
              items={[
                "Fully charge your phone. Bring a small power bank.",
                "Share your live location (WhatsApp/Apple) with a friend who isn't out with you.",
                "Take a photo of your ID on your phone; leave your passport in the hotel safe.",
                "Carry cash (small bills) in a separate pocket from your credit cards."
              ]}
            />

            <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 mb-12">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Plan Your Exit</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">
                Know how you are getting home <em>before</em> you have your first drink. Public transport may stop running after 1 AM in some host cities.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Download Apps:</strong> Ensure you have Uber, Lyft, or local taxi apps installed and logged in.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Save Address:</strong> Save your accommodation address in your phone and write it on a physical card.</span>
                </li>
              </ul>
            </div>
          </Section>

          <Section id="venue-safety" title="VENUE SAFETY">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              Bars, clubs, and fan zones are high-energy environments. Maintain situational awareness while having fun.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-6 text-emerald-600 dark:text-emerald-400">
                  <Wine className="w-8 h-8" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Drink Safety</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Never leave your drink unattended.', 
                    'Watch your drink being poured.', 
                    'If a drink tastes salty or bitter, stop drinking immediately.', 
                    'Buy your own rounds.'
                  ].map((item, i) => (
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
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Ejection Risks</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Aggressive behavior gets you kicked out instantly.', 
                    'Do not argue with bouncers; you will lose.', 
                    'Public intoxication laws are strict in the US/Canada.', 
                    'Possession of drugs can lead to deportation.'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <GreenShieldBox 
              title="ProTip: The 'Designated Watcher'"
              items={[
                "In a group, rotate the role of the 'watcher'.",
                "This person stays relatively sober, tracks the group's location, and ensures everyone gets into the taxi at the end of the night.",
                "It is a game-changer for group safety."
              ]}
            />
          </Section>

          <Section id="street-smarts" title="STREET SMARTS">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              Moving between venues or walking to transport is when you are most vulnerable.
            </p>

            <RedFlagBox 
              title="The 'Shortcut' Trap"
              items={[
                "Google Maps might suggest a 'faster' walking route through an alley or unlit park.",
                "Ignore it at night. Stick to main roads with streetlights and other people.",
                "A 5-minute longer walk is worth the safety."
              ]}
            />

            <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Solo Safety</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">
                If you find yourself alone at night:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Walk with Purpose:</strong> Keep your head up, off your phone. Look like you know where you are going.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Fake It:</strong> If you feel unsafe, call someone (or pretend to). Loudly saying 'I'm just around the corner, see you in 1 minute' is a deterrent.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Seek Safe Havens:</strong> If followed, duck into a hotel lobby, open shop, or hospital. Do not go to your accommodation if you are being followed.</span>
                </li>
              </ul>
            </div>
          </Section>

          <Section id="transport" title="SAFE TRANSPORT">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              The ride home is the final leg of the mission. Don't let your guard down yet.
            </p>
            
            <div className="flex flex-col gap-4 mb-8">
              <div className="p-8 rounded-[2rem] bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
                 <h4 className="font-bold text-xl text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-3">
                   <Car className="w-6 h-6"/> Rideshare Safety (Uber/Lyft)
                 </h4>
                 <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                   <li>1. Match the License Plate. Never get in a car that doesn't match the app.</li>
                   <li>2. Ask "Who are you here for?" Let them say your name.</li>
                   <li>3. Share your trip status within the app.</li>
                 </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
               <AffiliateButton href="/world-cup-2026-transportation" text="Complete Transport Guide" icon={Bus} variant="primary" />
            </div>
          </Section>

          <Section id="emergency" title="EMERGENCY PROTOCOLS">
             <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              If things go wrong, quick action is key.
            </p>

            <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
              <div className="space-y-6">
                {[
                  { title: "Lost Phone/Wallet", desc: "Cancel cards immediately via banking app (use a friend's phone). Use 'Find My' features if safe to do so." },
                  { title: "Separated from Friends", desc: "Go to the pre-agreed meeting point. Do not wander aimlessly searching." },
                  { title: "Harassment", desc: "Make a scene. Loudly tell the person to leave you alone. Seek help from bouncers or police." },
                  { title: "Emergency Numbers", desc: "USA/Canada/Mexico: Dial 911 for immediate police/medical help." }
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

          <Section id="scams" title="NIGHTLIFE SCAMS">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              Scammers thrive in the dark. Be aware of these common tricks.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 rounded-[2rem] border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10">
                <h4 className="font-bold text-xl text-red-700 dark:text-red-400 mb-4 flex items-center gap-3">
                  <Ticket className="w-6 h-6"/> The "Menu" Scam
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  <strong>The Scam:</strong> You are invited to a bar. The menu has no prices. You order a few drinks and get a bill for $500+. Bouncers demand payment.
                </p>
                <p className="text-slate-700 dark:text-slate-300 font-bold">
                  The Fix: Always ask for a menu with prices before ordering. If they refuse, leave.
                </p>
              </div>

              <div className="p-8 rounded-[2rem] border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10">
                <h4 className="font-bold text-xl text-red-700 dark:text-red-400 mb-4 flex items-center gap-3">
                  <Car className="w-6 h-6"/> The Fake Taxi
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                  <strong>The Scam:</strong> Unmarked cars offering "cheaper rates" outside clubs. They may overcharge or drive you to an unsafe location.
                </p>
                <p className="text-slate-700 dark:text-slate-300 font-bold">
                  The Fix: Only use official taxi stands or ride-hailing apps.
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
    question: "Is it safe to walk at night in World Cup cities?",
    answer: "It depends heavily on the city and neighborhood. In general, stick to main, well-lit thoroughfares with other people. Avoid shortcuts through parks or empty streets. In cities like Mexico City or certain parts of US cities, rideshares are safer than walking late at night."
  },
  {
    question: "Can I drink on the street?",
    answer: "In most US and Canadian cities, NO. You will be fined. Exceptions exist (e.g., Las Vegas, New Orleans, or specific 'entertainment zones'). In Mexico, it is also technically illegal though enforcement varies; best to avoid it to prevent police interactions."
  },
  {
    question: "What is the legal drinking age?",
    answer: "USA: 21. Canada: 18 (Alberta, Manitoba, Quebec) or 19 (rest of country). Mexico: 18. IDs are checked strictly in North America."
  },
  {
    question: "Are nightclubs safe for solo women?",
    answer: "Generally yes, especially in major cities, but standard precautions apply. Watch your drink, stay in public areas, and have a safe ride home planned. Joining a group or tour is often more fun and safer."
  },
  {
    question: "Do bars accept credit cards?",
    answer: "Almost all bars in the US and Canada accept cards. In Mexico, larger venues do, but smaller cantinas may be cash-only. Always carry some cash for tips or cover charges."
  },
  {
    question: "When do bars close?",
    answer: "It varies by city. USA/Canada: typically 2 AM (some 4 AM in NYC/Miami). Mexico: often later, 3-5 AM or until the last customer leaves in tourist areas."
  }
];

