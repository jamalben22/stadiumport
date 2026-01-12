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
  ShieldAlert, Lock, XCircle, Search, CreditCard, Smartphone, User, Flag, Wifi, FileText, Eye, ShieldCheck, Ban
} from 'lucide-react';



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
    const text = "Check out this World Cup 2026 Scams & Fraud Prevention Guide!";
    
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
          <span className="text-red-600 dark:text-red-500 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">Fraud Prevention</span>
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

// 5. Custom Content Boxes (Adapted to Atlanta Design)
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
    { id: 'scale', label: 'Fraud Scale' },
    { id: 'tickets', label: 'Ticket Scams' },
    { id: 'accommodation', label: 'Accommodation' },
    { id: 'transport', label: 'Transport' },
    { id: 'financial', label: 'Financial' },
    { id: 'recovery', label: 'Recovery' },
    { id: 'prevention', label: 'Prevention' },
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
            src="/images/safety-guide/A_realistic_photo-style_image_showing_a_worried_football_fan_reviewing_suspiciou.webp" 
            alt="World Cup 2026 Scams & Fraud Prevention" 
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
                  { label: 'Scams & Fraud', href: '/world-cup-2026-scams-avoid-fraud' }
                ]} 
              />

              <div className="flex items-center gap-4 mb-6">
          <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
            Last Updated: January 4, 2026
          </span>
          <span className="px-3 py-1 rounded-full border border-red-500/30 text-red-400 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
            Critical Warning
          </span>
          <span className="px-3 py-1 rounded-full bg-red-600 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-red-500/20">
            Fraud Prevention
          </span>
        </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                WORLD CUP 2026 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">SCAMS</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                How to Avoid Ticket & Travel Fraud. <span className="text-slate-900 dark:text-white font-medium">Definitive Guide</span>.
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
             <div className="pl-6 border-l-4 border-red-500 my-12 italic text-slate-800 dark:text-slate-200 font-medium text-xl">
               <strong>The Reality:</strong> If a deal seems too good to be true, it&apos;s a scam. Every time. No exceptions.
             </div>
             <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
               World Cup 2022 saw fans lose over $10 million to ticket scams alone. 2026 will be bigger—and so will the fraud. Scammers are already active. Do not become a victim.
             </p>
             <p className="text-lg text-slate-600 dark:text-slate-400">
               This isn&apos;t just about losing $50 or $100. We&apos;re talking about losing thousands of dollars, arriving at a stadium with fake tickets, or landing in a foreign country to find your hotel doesn&apos;t exist. Knowledge is your best defense—here&apos;s exactly how to verify every purchase and stay safe.
             </p>
          </div>

          <Section id="scale" title="The Scale of World Cup Fraud">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard icon={Ban} label="Lost in Qatar 2022" value="$10M+" />
              <StatCard icon={Hotel} label="Fake Listings 2018" value="12,000+" />
              <StatCard icon={CreditCard} label="Avg Loss / Victim" value="$2k-$5k" />
              <StatCard icon={Users} label="Estimated Targets" value="3 Million" />
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why You Are a Target</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-lg">
                Scammers exploit the &quot;fear of missing out&quot; (FOMO). With 2026 being a tri-nation tournament (USA, Canada, Mexico), the logistical complexity creates confusion—and fraudsters thrive on confusion.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                They know you are emotional, likely traveling internationally, and under time pressure to secure tickets and hotels.
              </p>
            </div>
          </Section>

          <Section id="tickets" title="TICKET SCAMS - The Biggest Threat">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              Ticket fraud is the #1 danger for fans. The demand always exceeds supply, creating a desperate market that scammers exploit ruthlessly.
            </p>

            <div className="space-y-16">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Scam #1: Fake Ticket Websites</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  These are sophisticated sites designed to look <em>exactly</em> like the official FIFA ticketing portal. They use similar colors, fonts, and even stolen logos.
                </p>
                <RedFlagBox 
                  title="RED FLAGS: Fake Websites"
                  items={[
                    "URL is slightly misspelled (e.g., fifa-tickets-2026.com, fifa.org, fifa-official.net)",
                    "Claims to have 'guaranteed' tickets before official sales phases",
                    "Payment requested via Crypto, Wire Transfer, or Zelle (Instant red flag)",
                    "Pressure tactics: 'Only 2 tickets left!' or countdown timers",
                    "No physical address or working phone number listed"
                  ]}
                />
                <p className="text-slate-500 italic pl-6 border-l-2 border-slate-200 dark:border-slate-200 dark:border-slate-800 mb-8">
                  Real Example: In 2022, a site &quot;Fifa-Tickets-Qatar.com&quot; stole over $500,000 from fans before authorities shut it down.
                </p>
                <AffiliateButton href="/world-cup-2026-tickets" text="Read our Official Ticket Booking Guide" variant="secondary" icon={Ticket} />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Scam #2: Social Media &quot;Sellers&quot;</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  If you see someone on Facebook, Instagram, or X (Twitter) posting: <em>&quot;Sad news, can&apos;t make the game anymore, selling my 4 tickets at face value!&quot;</em> — <strong>RUN.</strong>
                </p>
                <RedFlagBox 
                  title="RED FLAGS: Social Media Sellers"
                  items={[
                    "Account was created recently or has very few friends/followers",
                    "Profile photos look generic or stolen (reverse image search often proves this)",
                    "Refuses to video chat to verify identity",
                    "Insists on 'Friends & Family' payment via PayPal/Venmo (No buyer protection)",
                    "Claims to have a large number of tickets (e.g., 'I have 10 tickets for the final')"
                  ]}
                />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Scam #3: &quot;Print-at-Home&quot; Duplicates</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  A scammer buys one legitimate ticket (PDF style) and sells the exact same file to 50 different people. The first person to scan it at the stadium gets in. The other 49 are denied entry and escorted away by security.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-[2rem] border border-blue-100 dark:border-blue-900/30">
                  <p className="font-bold text-blue-800 dark:text-blue-200 flex items-center gap-3 mb-4 text-xl">
                    <ShieldCheck className="w-6 h-6" />
                    Solution
                  </p>
                  <p className="text-blue-900/80 dark:text-blue-200/80 leading-relaxed text-lg">
                    Never buy PDF or screenshot tickets. Legitimate World Cup 2026 tickets will almost certainly be <strong>mobile-only dynamic tickets</strong> that change every few seconds to prevent screenshots.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-24">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-10 text-center">How to Buy Tickets Safely</h3>
              <GreenShieldBox 
                title="ONLY Buy From These Sources"
                items={[
                  "Official FIFA Ticketing Platform (FIFA.com/tickets) - The only source for face value.",
                  "FIFA-Authorized Resellers (e.g., Official Hospitality Partners like MATCH Hospitality).",
                  "Verified Secondary Markets (StubHub, Viagogo) - Use with caution, but they offer buyer guarantees and refunds if tickets fail."
                ]}
              />
              
              <div className="flex flex-wrap gap-4 mt-8">
                <AffiliateButton 
                  href="https://www.fifa.com/tickets" 
                  text="Official FIFA Ticket Info" 
                  icon={Globe} 
                  variant="secondary" 
                  subtext="Verify URL is exactly FIFA.com"
                />
                <AffiliateButton 
                  href="https://www.stubhub.com/" 
                  text="StubHub (Verified Resale)" 
                  icon={Search} 
                  variant="outline" 
                  subtext="Includes FanProtect Guarantee"
                />
              </div>
              
              <div className="mt-12 bg-slate-50 dark:bg-slate-900/30 p-10 rounded-[2rem]">
                <h4 className="font-bold text-2xl text-slate-900 dark:text-white mb-8">Verification Checklist:</h4>
                <ul className="space-y-6 text-slate-600 dark:text-slate-400">
                  {[
                    "Verify seller identity (Video call is mandatory for private sales).",
                    "Confirm website URL matches official sources exactly.",
                    "NEVER pay via Wire Transfer, Western Union, or Crypto.",
                    "Always use a Credit Card (NOT Debit) for fraud protection.",
                    "Get everything in writing (receipts, transfer confirmation)."
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start text-lg">
                      <CheckCircle2 className="w-6 h-6 text-slate-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          <Section id="accommodation" title="ACCOMMODATION SCAMS">
            <div className="space-y-16">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Scam #1: Fake Rental Listings</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  You find a stunning apartment near the stadium for an unbelievable price. You book it, pay a &quot;deposit&quot; via bank transfer to &quot;secure the dates,&quot; and the &quot;host&quot; disappears. You arrive to find the address is an empty lot or someone else&apos;s home.
                </p>
                <RedFlagBox 
                  title="RED FLAGS: Rental Scams"
                  items={[
                    "Price is significantly lower than similar properties in the area",
                    "Host asks you to communicate/pay outside the platform (e.g., WhatsApp + Wire Transfer)",
                    "Listing has zero reviews, or all reviews are from the last week",
                    "Photos look like hotel stock images (Reverse image search them!)",
                    "Host claims to be 'out of the country' and cannot show you the place"
                  ]}
                />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Scam #2: Bait-and-Switch Hotels</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                  You book a nice hotel. Upon arrival, the front desk says they are &quot;overbooked due to a system error&quot; but have arranged a room at a &quot;partner hotel.&quot; The partner hotel is a dump, miles away. You&apos;ve already paid and have no choice.
                </p>
              </div>
            </div>

            <div className="mt-16">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">How to Book Accommodation Safely</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">Stick to major platforms that hold your payment in escrow until you check in.</p>
              
              <div className="flex flex-wrap gap-4">
                <AffiliateButton 
                  href="https://www.booking.com/" 
                  text="Book via Booking.com" 
                  icon={Hotel} 
                  variant="secondary" 
                  subtext="Secure payments & verified reviews"
                />
                <AffiliateButton 
                  href="https://www.marriott.com/" 
                  text="Marriott / Hilton Direct" 
                  icon={ShieldCheck} 
                  variant="outline" 
                  subtext="Book direct for best security"
                />
              </div>
              <div className="mt-8">
                <Link href="/world-cup-2026-accommodation-guide" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
                  <Hotel className="w-5 h-5" />
                  See our complete Accommodation Guide
                </Link>
              </div>
            </div>
          </Section>

          <Section id="transport" title="TRANSPORTATION SCAMS">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-6 text-red-600 dark:text-red-400">
                  <Bus className="w-8 h-8" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Fake Taxis & Rides</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">
                  Drivers claiming to be &quot;Official World Cup Taxis&quot; but having no meter. They will drive you around in circles or demand an exorbitant &quot;flat rate&quot; (e.g., $200 for a $20 ride) once you are inside and moving.
                </p>
                <div className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 rounded-lg text-sm font-semibold">
                  Solution: Use Uber/Lyft or official airport taxi queues only.
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4 mb-6 text-red-600 dark:text-red-400">
                  <AlertTriangle className="w-8 h-8" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Mexico Specific: &quot;Broken Meter&quot;</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">
                  In Mexico City, Monterrey, or Guadalajara, drivers may claim their meter is broken.
                </p>
                <div className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 rounded-lg text-sm font-semibold">
                  Solution: Agree on a price BEFORE getting in, or stick to App-based rideshares which are tracked.
                </div>
              </div>
            </div>
            <Link href="/world-cup-2026-mexico-city-guide" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
              <MapPin className="w-5 h-5" />
              Mexico City Safety & Transport Guide
            </Link>
          </Section>

          <Section id="financial" title="PAYMENT & FINANCIAL SCAMS">
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">ATM Skimmers & Digital Theft</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                Criminals install devices on ATMs (especially in tourist areas) that read your card strip and record your PIN.
              </p>
              
              <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-2xl text-slate-900 dark:text-white mb-6">Public WiFi Danger</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-lg">
                  Hackers set up fake WiFi hotspots named &quot;Free World Cup WiFi&quot; or &quot;Stadium Guest.&quot; Once you connect, they steal your login credentials and credit card info.
                </p>
                
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                    <Wifi className="w-6 h-6 text-emerald-500" /> 
                    <span className="text-lg"><strong>Defense:</strong> NEVER access banking apps on public WiFi without a VPN.</span>
                  </div>
                  <AffiliateButton 
                    href="https://nordvpn.com/" 
                    text="Get NordVPN (60% Off)" 
                    icon={Lock} 
                    variant="primary" 
                    subtext="Encrypt your data on public WiFi"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Identity Theft Prevention</h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                If your passport is stolen, your trip is over. If your identity is stolen, your nightmare is just beginning.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                 <AffiliateButton 
                    href="https://www.amazon.com/s?k=rfid+blocking+wallet&tag=stadiumport-20" 
                    text="RFID Blocking Wallet" 
                    icon={CreditCard} 
                    variant="outline" 
                    subtext="Prevent electronic pickpocketing"
                  />
                  <AffiliateButton 
                    href="https://www.aura.com/" 
                    text="Identity Theft Protection" 
                    icon={ShieldCheck} 
                    variant="outline" 
                    subtext="Monitor your credit while traveling"
                  />
              </div>
              <div className="mt-8">
                 <Link href="/world-cup-2026-packing-guide" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
                   <Briefcase className="w-5 h-5" />
                   See Essential Security Gear for your Trip
                 </Link>
              </div>
            </div>
          </Section>

          <Section id="recovery" title="WHAT TO DO IF SCAMMED">
            <div className="bg-white dark:bg-slate-900 p-10 md:p-12 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none">
              <h3 className="text-3xl font-bold text-red-600 mb-10 flex items-center gap-4">
                <AlertTriangle className="w-10 h-10" />
                Immediate Action Plan (First 24 Hours)
              </h3>
              <ol className="space-y-8 list-decimal pl-6 text-lg text-slate-700 dark:text-slate-300">
                <li className="pl-2">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1 text-xl">Freeze Accounts</span>
                  Immediately lock your credit cards and bank accounts via your banking app.
                </li>
                <li className="pl-2">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1 text-xl">File Police Report</span>
                  Go to the nearest station. You need this report for insurance claims and contesting charges.
                </li>
                <li className="pl-2">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1 text-xl">Contact Embassy</span>
                  If your passport was stolen.
                  <div className="text-base font-medium text-slate-500 mt-2 bg-slate-100 dark:bg-slate-800 inline-block px-4 py-2 rounded-full">USA Emergency: 1-877-487-2778</div>
                </li>
                <li className="pl-2">
                  <span className="font-bold text-slate-900 dark:text-white block mb-1 text-xl">Report Online</span>
                  <ul className="flex flex-wrap gap-4 mt-3 text-base">
                    <li><a href="https://www.ic3.gov" className="text-blue-600 hover:text-blue-700 underline decoration-blue-200 underline-offset-4">USA: IC3.gov (FBI)</a></li>
                    <li><a href="https://www.antifraudcentre-centreantifraude.ca/" className="text-blue-600 hover:text-blue-700 underline decoration-blue-200 underline-offset-4">Canada: Anti-Fraud Centre</a></li>
                    <li className="text-slate-500">Mexico: Tourist Police (078)</li>
                  </ul>
                </li>
              </ol>
              
              <div className="mt-12 pt-10 border-t border-slate-100 dark:border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white mb-8 text-xl">Recovery Chances by Payment Method:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                  <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl text-emerald-800 dark:text-emerald-200 border border-emerald-100 dark:border-emerald-900/30">
                    <span className="block text-xs uppercase tracking-wider opacity-70 mb-2">High Chance</span>
                    <span className="text-lg font-bold">Credit Card</span>
                  </div>
                  <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-2xl text-yellow-800 dark:text-yellow-200 border border-yellow-100 dark:border-yellow-900/30">
                    <span className="block text-xs uppercase tracking-wider opacity-70 mb-2">Medium Chance</span>
                    <span className="text-lg font-bold">PayPal</span>
                  </div>
                  <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl text-red-800 dark:text-red-200 border border-red-100 dark:border-red-900/30">
                    <span className="block text-xs uppercase tracking-wider opacity-70 mb-2">Near Zero</span>
                    <span className="text-lg font-bold">Wire/Zelle</span>
                  </div>
                  <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl text-red-800 dark:text-red-200 border border-red-100 dark:border-red-900/30">
                    <span className="block text-xs uppercase tracking-wider opacity-70 mb-2">Zero Chance</span>
                    <span className="text-lg font-bold">Crypto</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 max-w-2xl mx-auto flex flex-col items-center">
              <AffiliateButton 
                href="https://www.worldnomads.com/" 
                text="Get Comprehensive Travel Insurance" 
                icon={FileText} 
                variant="primary" 
                subtext="Includes fraud & theft coverage"
              />
              <div className="mt-8 text-center">
                 <Link href="/world-cup-2026-safety-guide" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
                   <ShieldCheck className="w-5 h-5" />
                   Back to Safety Hub
                 </Link>
              </div>
            </div>
          </Section>

          <Section id="prevention" title="PREVENTION CHECKLIST">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all">
                 <h3 className="font-bold text-2xl text-slate-900 dark:text-white mb-8">Before Booking Anything:</h3>
                 <ul className="space-y-6">
                   {[
                     "Verify website URL exactly (letter by letter).",
                     "Check if seller is on official FIFA authorized list.",
                     "Research seller online (search 'Seller Name + scam').",
                     "NEVER pay via wire, crypto, or Venmo.",
                     "Use Credit Card (not debit) for protection."
                   ].map((item, i) => (
                     <li key={i} className="flex items-start gap-4 text-slate-600 dark:text-slate-400 text-lg">
                       <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                       {item}
                     </li>
                   ))}
                 </ul>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all">
                 <h3 className="font-bold text-2xl text-slate-900 dark:text-white mb-8">Before You Travel:</h3>
                 <ul className="space-y-6">
                   {[
                     "Notify credit card companies of travel dates.",
                     "Set up transaction alerts on your phone.",
                     "Scan/Photograph all documents (Passport, IDs) to cloud.",
                     "Install a VPN on your phone.",
                     "Share itinerary with family/friends."
                   ].map((item, i) => (
                     <li key={i} className="flex items-start gap-4 text-slate-600 dark:text-slate-400 text-lg">
                       <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                       {item}
                     </li>
                   ))}
                 </ul>
              </div>
            </div>
          </Section>

          <Section id="faq" title="Frequently Asked Questions">
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {[
                {
                  q: "How do I know if a ticket is legitimate?",
                  a: "The only 100% legitimate tickets come from FIFA.com. Any ticket sent as a PDF, screenshot, or paper printout is likely fake. Real tickets will be in the official FIFA mobile app."
                },
                {
                  q: "Can I get my money back if I get scammed?",
                  a: "It depends on how you paid. Credit cards offer the best protection (chargebacks). Bank transfers, Zelle, Venmo, and Crypto payments are virtually impossible to recover."
                },
                {
                  q: "Are secondary ticket sites safe?",
                  a: "Sites like StubHub and Viagogo have buyer guarantees, meaning if the ticket is fake, you get a refund. However, you will still be denied entry to the stadium, ruining your experience."
                },
                {
                  q: "Is it safe to use public WiFi in stadiums?",
                  a: "Generally, official stadium WiFi is monitored, but it's still safer to use a VPN. Never do banking on public WiFi."
                },
                {
                  q: "What is an RFID wallet and do I need one?",
                  a: "RFID wallets block signals that thieves use to scan your credit card chips from a distance. They are a cheap and effective precaution for crowded places like stadiums and fan fests."
                }
              ].map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </Section>

          {/* Conclusion */}
          <div className="mt-24 p-12 md:p-20 bg-slate-900 dark:bg-slate-950 rounded-[3rem] text-center shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-emerald-500 to-blue-500" />
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Don&apos;t Let Them Win.</h3>
            <p className="text-slate-600 dark:text-slate-300 text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              Scammers count on your desperation and ignorance. But now you are armed with knowledge. Verify everything. Trust your instincts. And if something feels wrong, walk away.
            </p>
            <div className="max-w-md mx-auto">
              <AffiliateButton 
                href="https://www.worldnomads.com/" 
                text="Protect Your Trip with Travel Insurance" 
                icon={ShieldCheck} 
                variant="secondary" 
              />
            </div>
          </div>

        </main>
      </div>

      
    </div>
  );
}



