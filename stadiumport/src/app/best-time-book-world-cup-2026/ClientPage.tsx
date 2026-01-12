'use client';

import React, { useState, useRef } from 'react';
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
  Bookmark, X, ChevronRight, Facebook, Twitter, Linkedin, Copy,
  Bell, Search, Mail, TrendingUp, CreditCard
} from 'lucide-react';



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
  const title = "Best Time to Book World Cup 2026: The Ultimate Timeline";

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
      <h3 className="font-bold text-xl mb-4 flex items-center gap-3">
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
  <div className="overflow-x-auto my-12 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 shadow-sm">
    <table className="w-full text-left text-sm md:text-base">
      <thead className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white font-bold uppercase tracking-wider">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="p-6 whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className="p-6 text-slate-600 dark:text-slate-300">{cell}</td>
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


  // Sticky Nav Links
  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'tickets', label: 'Tickets' },
    { id: 'flights', label: 'Flights' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'surge', label: 'Price Surge' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'mistakes', label: 'Mistakes' },
    { id: 'faq', label: 'FAQ' }
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
            src="/images/travel-tips/Best Time to Book World Cup 2026 Guide Illustration.webp" 
            alt="Best Time to Book World Cup 2026" 
            fill 
            className="object-cover object-center"
            priority quality={60} 
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
                  { label: 'Best Time to Book', href: '/best-time-book-world-cup-2026' }
                ]} 
              />
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Last Updated: January 4, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Travel Tips
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
                  Verified Data
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                Best Time to Book for World Cup 2026
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                The difference between booking now and waiting? <span className="text-slate-900 dark:text-white font-medium">Potentially $2,000+ per person.</span> The definitive guide.
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
          
          {/* Disclosure */}
          <div className="mb-12 p-6 rounded-2xl text-sm text-slate-500 dark:text-slate-400 flex gap-4 items-start">
            <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Transparency:</strong> This guide contains affiliate links. We may earn a commission if you book through them, which helps fund our independent journalism.
            </p>
          </div>

          <Section id="overview" title="Strategic Overview">
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
                Right now, you have a massive advantage: <strong>time</strong>. But that window is closing faster than you think. 
                For World Cup 2026, the "wait and see" approach is a financial death sentence. 
                With 48 teams and three host countries, the logistical pressure on flights and hotels will be unlike anything we've seen before.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 mt-6">
                We've analyzed pricing data from Russia 2018 and Qatar 2022, combined with North American travel trends, to build this timeline. 
                Reading this today could literally save you thousands of dollars.
              </p>
            </div>

            <div className="my-12 p-10 bg-slate-900 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Track Prices Automatically</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-0 text-lg">Don't check every day. Let the deals come to you.</p>
                </div>
                <AffiliateButton 
                  href="https://www.google.com/travel/flights" 
                  text="Set Up Flight Alerts" 
                  subtext="via Google Flights"
                  icon={Bell}
                  variant="primary"
                />
              </div>
              <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            </div>
          </Section>

          <Section id="timeline" title="The Booking Timeline">
            <div className="space-y-6">
              {[
                { status: "past", time: "18-24 Months Out", phase: "Initial Planning Phase", desc: "Research cities, set budget, and start saving. If you haven't started this, do it today." },
                { status: "current", time: "12-18 Months Out", phase: "Ticket Lottery & Registration", desc: "FIFA typically opens the first random selection draw. This is your best chance for face-value tickets." },
                { status: "future", time: "11 Months Out", phase: "Flight Booking Sweet Spot", desc: "Airlines release schedules. Book immediately for the best availability and 'base' pricing." },
                { status: "future", time: "8-12 Months Out", phase: "Hotel Booking Window", desc: "Major hotel chains open reservations. Lock in refundable rates now." },
                { status: "future", time: "3-6 Months Out", phase: "The Price Surge", desc: "Inventory tightens. Prices for remaining flights and hotels jump 30-50%." },
                { status: "future", time: "0-3 Months Out", phase: "Last Minute / Resale", desc: "High-stress zone. Relying on resale tickets and last-minute cancellations." }
              ].map((item, i) => (
                <div key={i} className={`flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center border ${
                  item.status === 'current' ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10' : 'border-slate-200 dark:border-slate-200 dark:border-slate-800'
                }`}>
                  <div className={`shrink-0 w-48 font-black text-2xl ${
                    item.status === 'current' ? 'text-emerald-500' : 'text-slate-400'
                  }`}>
                    {item.time}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">{item.phase}</h4>
                    <p className="text-lg text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="tickets" title="Ticket Booking">
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
              Getting tickets is the most stressful part of the process. FIFA uses a phased approach. Understanding this system is crucial to avoiding the 500% markup on the secondary market.
            </p>

            <Callout title="Insider Secret: The 'Ghost' Phase" type="warning">
              <p>
                Between the Lottery Phase and the First Come First Served (FCFS) phase, there is often a quiet period where unconfirmed payments from the lottery release tickets back into the system. Keep checking your account even if you "lost" the lottery.
              </p>
            </Callout>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div>
                <h3 className="font-bold text-2xl mb-6 text-slate-900 dark:text-white">Official Phases</h3>
                <div className="space-y-4">
                  {[
                    { phase: "Phase 1: Lottery", title: "Random Selection Draw", desc: "Apply for tickets. It doesn't matter when you apply during this window.", color: "emerald" },
                    { phase: "Phase 2: FCFS", title: "First Come First Served", desc: "The digital queue. Tickets sell out in minutes. Be online 30 mins prior.", color: "blue" },
                    { phase: "Phase 3: Last Minute", title: "Last Minute Sales", desc: "Remaining inventory and official resale platform tickets appear here.", color: "purple" }
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[1.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800">
                      <span className={`block text-xs font-bold uppercase tracking-wider mb-2 text-${item.color}-600`}>{item.phase}</span>
                      <span className="block font-bold text-lg mb-2 text-slate-900 dark:text-white">{item.title}</span>
                      <span className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col justify-center space-y-6">
                <div className="bg-emerald-50 dark:bg-emerald-900/10 p-8 rounded-[2rem] border border-emerald-100 dark:border-emerald-800">
                  <h3 className="font-bold text-xl text-emerald-800 dark:text-emerald-200 mb-3">Register Now</h3>
                  <p className="text-emerald-700 dark:text-emerald-300 mb-6 leading-relaxed">
                    Don't wait for the window to open. Ensure your FIFA.com account is active and verified today.
                  </p>
                  <AffiliateButton 
                    href="https://www.fifa.com/tickets" 
                    text="FIFA Ticketing Portal" 
                    subtext="Official Source"
                    icon={Ticket}
                    variant="primary"
                  />
                </div>

                <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700">
                  <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">Secondary Market</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Missed the official drop? Verified resale sites are your safety net, but expect to pay a premium.
                  </p>
                  <AffiliateButton 
                    href="https://www.viagogo.com" 
                    text="Check Resale Prices" 
                    subtext="Viagogo / StubHub"
                    icon={Search}
                    variant="secondary"
                  />
                </div>
              </div>
            </div>
          </Section>

          <Section id="flights" title="Flight Booking Strategy">
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              This is the most critical rule in travel hacking: <strong>Book flights when the calendar opens.</strong> 
              Most major airlines release inventory 330-337 days in advance.
            </p>

            <Table 
              headers={["Departure Region", "Optimal Window", "Why?", "Risk Level"]}
              rows={[
                ["North America (Domestic)", "3-5 Months Out", "Domestic competition keeps prices stable longer.", "Low"],
                ["Europe to USA", "10-11 Months Out", "Transatlantic routes fill fast for summer travel.", "High"],
                ["Asia to USA", "11 Months Out", "Limited direct routes mean seats vanish quickly.", "High"],
                ["South America to USA", "9-11 Months Out", "High demand from competing fans.", "Medium"]
              ]}
            />

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">Why 11 Months?</h3>
                <ul className="space-y-4">
                  {[
                    { title: "Base Inventory", desc: "You are seeing the 'original' price buckets before dynamic pricing algorithms kick in." },
                    { title: "Availability", desc: "You have your pick of direct flights and preferred times." },
                    { title: "Award Seats", desc: "If you are using points, this is often the ONLY time to find saver availability." }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>{item.title}:</strong> {item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                 <h3 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">The "Dead Zone"</h3>
                 <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                   Avoid booking 6-8 weeks out. This is when algorithms detect "urgency" and business travelers start booking, driving prices up by 40% or more.
                 </p>
                 <Link href="/world-cup-2026-budget-guide" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline decoration-2 underline-offset-2 flex items-center gap-2">
                   See our Budget Guide for cost estimates <ArrowRight className="w-4 h-4" />
                 </Link>
              </div>
            </div>

            <div className="p-10 bg-blue-50 dark:bg-blue-900/10 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 text-center">
              <h3 className="font-bold text-2xl mb-8 text-blue-900 dark:text-blue-100">Tools to Use Right Now</h3>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <AffiliateButton 
                  href="https://www.skyscanner.com" 
                  text="Compare on Skyscanner" 
                  subtext="Best for International"
                  icon={Plane}
                  variant="secondary"
                />
                <AffiliateButton 
                  href="https://www.expedia.com" 
                  text="Track on Expedia" 
                  subtext="Bundle Deals"
                  icon={Search}
                  variant="outline"
                />
              </div>
            </div>
          </Section>

          <Section id="hotels" title="Hotel Booking Windows">
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
              Hotels operate differently than airlines. They know the World Cup is coming, and many will block dates or set astronomical rates early. However, waiting is dangerous.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                { priority: "Urgent Priority", cities: "New York, LA, Miami", desc: "Global tourist hubs. Book 12 months out. These cities will sell out of standard rooms instantly.", color: "red" },
                { priority: "High Priority", cities: "Kansas City, Seattle", desc: "Smaller hotel inventories relative to stadium size. Book 10-12 months out.", color: "amber" },
                { priority: "Medium Priority", cities: "Houston, Dallas, Atlanta", desc: "Large convention cities with massive inventory. Don't push past 8 months out.", color: "blue" }
              ].map((card, i) => (
                <div key={i} className={`p-8 rounded-[2rem] bg-${card.color}-50 dark:bg-${card.color}-900/10 border border-${card.color}-100 dark:border-${card.color}-800`}>
                  <h4 className={`font-bold text-${card.color}-700 dark:text-${card.color}-300 mb-3 uppercase text-xs tracking-wider`}>{card.priority}</h4>
                  <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{card.cities}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>

            <Callout title="The 'Refundable Rate' Strategy" type="success">
              <p>
                <strong>Do not book non-refundable rates this far out.</strong> Plans change. Your team might not qualify for that specific city. 
                Book a refundable rate now to lock in inventory. If prices drop (unlikely) or plans change, you can cancel without penalty.
              </p>
            </Callout>

            <div className="flex flex-col md:flex-row gap-4 mt-12 justify-center">
              <AffiliateButton 
                href="https://www.booking.com" 
                text="Search Booking.com" 
                subtext="Free Cancellation Options"
                icon={Hotel}
                variant="primary"
              />
              <AffiliateButton 
                href="https://www.trivago.com" 
                text="Compare on Trivago" 
                subtext="Price Comparison"
                icon={Search}
                variant="outline"
              />
            </div>
          </Section>

          <Section id="surge" title="The Price Surge">
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
              Here is the historical data on how prices escalate as the tournament approaches.
            </p>
            
            <div className="relative h-80 w-full bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 p-8 flex items-end justify-between gap-2 md:gap-4 overflow-hidden">
                {[
                    { label: "12 Mo", height: "20%", price: "Base" },
                    { label: "9 Mo", height: "25%", price: "+5%" },
                    { label: "6 Mo", height: "40%", price: "+30%" },
                    { label: "3 Mo", height: "65%", price: "+60%" },
                    { label: "1 Mo", height: "90%", price: "+150%" },
                ].map((bar, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 w-full group">
                        <span className="text-xs font-bold text-slate-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">{bar.price}</span>
                        <div 
                            className="w-full bg-emerald-500/20 dark:bg-emerald-500/30 rounded-t-2xl transition-all duration-500 hover:bg-emerald-500 dark:hover:bg-emerald-500 relative group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]" 
                            style={{ height: bar.height }} 
                        />
                        <span className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300">{bar.label}</span>
                    </div>
                ))}
            </div>
            <p className="text-sm text-center mt-6 text-slate-500 italic">
                Estimated price increase relative to base fare (Source: Historical World Cup Travel Data)
            </p>
          </Section>

          <Section id="calendar" title="Action Plan Calendar">
            <div className="space-y-8">
                <div className="border-l-4 border-slate-200 dark:border-slate-700 pl-8 py-2">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">NOW (Dec 2024 - Mar 2025)</h3>
                    <ul className="space-y-3 text-lg text-slate-600 dark:text-slate-400">
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Set your total budget.</li>
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Decide on your "must-visit" cities.</li>
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Start saving (aim for $500/month).</li>
                    </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-8 bg-blue-50/50 dark:bg-blue-900/5 py-8 -ml-8 pr-8 rounded-r-[2rem]">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">April - June 2025</h3>
                      <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">Critical Window</span>
                    </div>
                    <ul className="space-y-3 text-lg text-slate-700 dark:text-slate-300">
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> Register for FIFA Ticket Lottery.</li>
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> Check passport expiration dates.</li>
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> Set up flight price alerts.</li>
                    </ul>
                </div>

                <div className="border-l-4 border-emerald-500 pl-8 bg-emerald-50/50 dark:bg-emerald-900/5 py-8 -ml-8 pr-8 rounded-r-[2rem]">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">July - September 2025</h3>
                      <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">Booking Open</span>
                    </div>
                    <ul className="space-y-3 text-lg text-slate-700 dark:text-slate-300">
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Book international flights (11 months out).</li>
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Book refundable accommodation.</li>
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Apply for US/Canada visas if required.</li>
                    </ul>
                    <div className="mt-8 flex gap-4">
                        <AffiliateButton href="https://www.skyscanner.com" text="Book Flights" variant="primary" icon={Plane} />
                        <AffiliateButton href="https://www.booking.com" text="Reserve Hotels" variant="outline" icon={Hotel} />
                    </div>
                </div>

                 <div className="border-l-4 border-slate-200 dark:border-slate-700 pl-8 py-2">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Oct 2025 - Jan 2026</h3>
                    <ul className="space-y-3 text-lg text-slate-600 dark:text-slate-400">
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Finalize inter-city travel (trains/domestic flights).</li>
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Buy travel insurance.</li>
                        <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Confirm ticket allocations from lottery.</li>
                    </ul>
                </div>
            </div>
          </Section>

          <Section id="mistakes" title="Red Flags">
            <div className="grid md:grid-cols-2 gap-6">
                {[
                    { title: "Waiting for 'Deals'", desc: "They don't exist for the World Cup. Airlines know demand is inelastic. Prices only go up." },
                    { title: "Booking Non-Refundable", desc: "Buying the cheapest 'Saver Fare' 18 months out is risky. If your team doesn't qualify, you lose that money." },
                    { title: "Ignoring Visas", desc: "US Visa wait times can be 600+ days in some countries. Check this immediately." },
                    { title: "Trusting Scalpers", desc: "Facebook Marketplace and Craigslist are rife with scams. Only use official FIFA resale or guaranteed platforms." }
                ].map((item, i) => (
                    <div key={i} className="p-8 rounded-[2rem] bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800">
                        <h3 className="font-bold text-xl text-red-800 dark:text-red-200 mb-3 flex items-center gap-3">
                            <AlertTriangle className="w-6 h-6" /> {item.title}
                        </h3>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
          </Section>

          <Section id="faq" title="FAQ">
            <div className="space-y-4">
                {[
                    { q: "When does the FIFA ticket lottery open?", a: "Based on previous cycles, registration typically begins 12-14 months before the tournament (around Spring 2025)." },
                    { q: "Can I cancel my hotel if I don't get tickets?", a: "Only if you book a 'Refundable' or 'Free Cancellation' rate. These usually cost 10-15% more but are absolutely worth it for World Cup travel." },
                    { q: "Should I book flights before I have tickets?", a: "Yes. Flight prices rise predictably. Tickets can often be secured later via resale, but a $2,000 flight is a sunk cost. Book flights to major hubs (NYC, LA) that are good to visit regardless." },
                    { q: "Do travel packages include flights?", a: "Usually no. Most 'Official Hospitality' packages include hotels, match tickets, and transport to the stadium, but NOT international airfare." }
                ].map((item, i) => (
                    <FAQItem key={i} question={item.q} answer={item.a} />
                ))}
            </div>
          </Section>

          <section className="py-20 mt-20 bg-slate-900 rounded-[3rem] text-slate-900 dark:text-white text-center relative overflow-hidden mx-4 md:mx-0">
            <div className="relative z-10 container mx-auto px-4 max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight">Every Day You Wait Costs Money.</h2>
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed">
                    The best time to start planning was yesterday. The second best time is right now. 
                    Set your alerts, check your passport, and get in the game.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <AffiliateButton 
                        href="https://www.skyscanner.com" 
                        text="Start Tracking Flights" 
                        variant="primary" 
                        icon={Plane}
                    />
                     <AffiliateButton 
                        href="https://www.booking.com" 
                        text="Check Hotel Availability" 
                        variant="secondary" 
                        icon={Hotel}
                    />
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-blue-900/20" />
          </section>

        </main>
      </div>
      
      
    </div>
  );
}



