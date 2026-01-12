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
    X, ChevronRight, Facebook, Twitter, Linkedin, Copy
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

// 2. Floating Social Share
const SocialShare = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
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
          className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 hover:text-[#1DA1F2] transition-colors" 
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </button>
        <button 
          onClick={() => handleShare('facebook')} 
          className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 hover:text-[#4267B2] transition-colors" 
          aria-label="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </button>
        <button 
          onClick={() => handleShare('linkedin')} 
          className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 hover:text-[#0077b5] transition-colors" 
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </button>
        <button 
          onClick={handleCopy} 
          className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 hover:text-emerald-500 transition-colors relative" 
          aria-label="Copy Link"
        >
          {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
        </button>
      </div>
    </motion.div>
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
    <Link href={href} target="_blank" className={`${baseClasses} ${variants[variant]}`}>
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

const HotelCard = ({ name, rating, price, distance, features, image, link }: { name: string, rating: number, price: string, distance: string, features: string[], image: string, link: string }) => (
 <div className="group rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
 <div className="flex flex-col md:flex-row h-full">
 <div className="relative w-full md:w-2/5 min-h-[250px] overflow-hidden">
 <Image src={image} alt={name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
 <div className="absolute top-4 left-4 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-slate-900 flex items-center gap-1 shadow-lg">
 <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {rating}
 </div>
 </div>
 <div className="p-8 md:w-3/5 flex flex-col justify-between">
 <div>
 <div className="flex justify-between items-start mb-4">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">{name}</h3>
 <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg dark:bg-emerald-900/30 px-3 py-1 rounded-lg">{price}</span>
 </div>
 <p className="text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2 font-medium">
 <MapPin className="w-4 h-4 text-emerald-500" /> {distance} to Stadium
 </p>
 <div className="flex flex-wrap gap-2 mb-8">
 {features.map((f, i) => (
 <span key={i} className="text-xs font-semibold text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-full uppercase tracking-wide">
 {f}
 </span>
 ))}
 </div>
 </div>
 <div className="flex gap-4">
 <AffiliateButton href={link} text="Check Rates" variant="primary" />
 </div>
 </div>
 </div>
 </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => (
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
 { id: 'overview', label: 'Overview' },
 { id: 'visa', label: 'Visa & Entry' },
 { id: 'planning', label: 'Planning' },
 { id: 'budget', label: 'Budget' },
 { id: 'stadium', label: 'Stadium' },
 { id: 'tickets', label: 'Tickets' },
 { id: 'hotels', label: 'Hotels' },
 { id: 'transport', label: 'Transport' },
 { id: 'dining', label: 'Dining' },
 { id: 'attractions', label: 'Attractions' },
 { id: 'tips', label: 'Match Day' },
 { id: 'safety', label: 'Safety' },
 { id: 'culture', label: 'Culture' },
 { id: 'packing', label: 'Packing' },
 { id: 'faq', label: 'FAQ' },
 ];

 return (
 <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0A0A0A] font-sans selection:bg-emerald-500/30">
 
 {/* SaveGuideButton removed */}
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
            src="/images/stadiums/sofi-stadium-los-angeles-world-cup-2026-1600.webp" 
            alt="SoFi Stadium Interior" 
            fill 
            className="object-cover"
            priority quality={60} sizes="100vw" />
 <div className="absolute inset-0 bg-gradient-to-b from-slate-200/40 via-slate-200/60 to-[#F5F5F7] dark:from-[#0A0A0A]/40 dark:via-[#0A0A0A]/60 dark:to-[#0A0A0A]" />
 </div>

 <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-end md:items-center justify-between gap-12 pt-20">
 <div className="max-w-4xl">
 <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Breadcrumb 
            items={[{ label: "Stadiums", href: "/world-cup-2026-stadiums" }, { label: "SoFi Stadium", href: "/sofi-stadium-world-cup-2026" }]} 
          />
          <div className="flex items-center gap-4 mb-6">
 <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
 Last Updated: January 4, 2026
 </span>
 <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
 Host City Venue
 </span>
 <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
 USMNT Opener Host
 </span>
 </div>
 
 <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-[0.9]">
 SOFI STADIUM
 </h1>
 <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light max-w-xl leading-relaxed">
 The Global Stage. <span className="text-slate-900 dark:text-white font-medium">World Cup 2026</span> definitive guide to Los Angeles' architectural marvel.
          </p>
        </motion.div>
      </div>
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
 Approaching SoFi Stadium feels less like arriving at a sports venue and more like encountering a spaceship that decided to park in Inglewood. For World Cup 2026, this 100-foot-deep architectural marvel will host the USMNT opening match, demanding a smart strategy for transport and entry.
 </p>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: MapPin, title: "Where to Base", text: "Santa Monica for beach vibes and Metro E Line access. Inglewood/LAX for pure convenience." },
 { icon: Train, title: "Transport Strategy", text: "Avoid the 'Century Crush' traffic. Use the Metro C or K Line shuttles directly to the stadium." },
 { icon: DollarSign, title: "Budget Signals", text: "Hotel rates will be premium. Book refundable rates 9 months out. Rideshare surge will be high." }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] transition-colors">
 <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
 <AffiliateButton href="https://www.skyscanner.com/flights-to/lax/cheap-flights-to-los-angeles-international-airport.html" text="Search LAX Flights" variant="secondary" icon={Plane} />
<AffiliateButton href="https://www.booking.com/city/us/santa-monica.html" text="Check Santa Monica Hotels" variant="primary" icon={Hotel} />
 </div>
 </Section>

 <Section id="visa" title="Visa & Entry (USA)">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Who Needs a Visa?</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">Citizens of Visa Waiver Program countries can use ESTA for short stays. Others require a B-2 tourist visa. Check status as of Dec 2025 and apply early.</p>
 <AffiliateButton href="https://esta.cbp.dhs.gov/" text="Check ESTA Eligibility" variant="outline" />
</div>
<div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
<h4 className="font-bold text-2xl mb-4">Arrival Tips</h4>
<ul className="space-y-4 mb-8">
{['Use LAX Mobile Passport Control', 'Proof of onward travel required', 'Carry digital copies of tickets'].map((item, i) => (
<li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
<CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
</li>
))}
</ul>
<AffiliateButton href="https://www.worldnomads.com/travel-insurance" text="Buy Travel Insurance" variant="secondary" />
 </div>
 </div>
 </Section>

 <Section id="planning" title="Planning Timeline">
 <div className="space-y-6">
 {[
 { time: "6–9 Months Out", desc: "Book flights to LAX. Secure hotels in Santa Monica or West Hollywood. Prices will surge closer to the event." },
 { time: "3–6 Months Out", desc: "Confirm match tickets. Reserve rental cars if you plan to explore California (Big Sur, Joshua Tree)." },
 { time: "1–3 Months Out", desc: "Lock in theme park tickets (Disneyland/Universal) if visiting. Plan your matchday Metro route." }
 ].map((item, i) => (
 <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center">
 <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
 <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
 </div>
 ))}
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
 <AffiliateButton href="https://www.skyscanner.com/flights-to/lax/cheap-flights-to-los-angeles-international-airport.html" text="Set Flight Alerts" variant="primary" icon={Plane} />
 <AffiliateButton href="https://www.opentable.com/los-angeles-restaurants" text="Reserve Restaurant Tables" variant="outline" />
 </div>
 </Section>

 <Section id="budget" title="Budget Tiers">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Smart Saver", items: ["Inglewood/Airport Hotels", "Metro C/K Line", "Tacos & Street Food"] },
 { title: "Comfort Upgrades", items: ["Santa Monica/Culver City", "Rideshare to Forum Lot", "Santa Monica Pier Dining"] },
 { title: "Premium", items: ["Beverly Hills/West Hollywood", "Private Driver Service", "VIP Club Access"] }
 ].map((tier, i) => (
 <div key={i} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-2xl transition-all duration-300">
 <h4 className="font-bold text-xl mb-6">{tier.title}</h4>
 <ul className="space-y-4">
 {tier.items.map((item, j) => (
 <li key={j} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2" />
 {item}
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>
 <div className="mt-8 text-center">
 <AffiliateButton href="https://www.kayak.com/vacation-packages/Los-Angeles-c16078" text="Search Los Angeles Packages" variant="secondary" icon={Briefcase} />
 </div>
 </Section>

 <Section id="stadium" title="SoFi Stadium">
        <LightboxImage 
          src="/images/stadiums/sofi-stadium-los-angeles-world-cup-2026-1600.webp" 
          alt="SoFi Stadium Interior" 
          caption="The 'Infinity Screen' at SoFi Stadium creates an immersive experience from every seat."
        />

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 Funded entirely by Rams owner Stan Kroenke (to the tune of over $5.5 billion), <strong>SoFi Stadium</strong> isn't just "big"—it's a complete reimagining of what a stadium can be. The field sits 100 feet below ground level, and the "indoor-outdoor" roof harnesses ocean breezes to keep the bowl comfortable.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Key Features</h4>
 <ul className="space-y-4">
 {[
 { label: "Capacity", val: "~70,240 (Expandable)" },
 { label: "Surface", val: "Matrix Turf (Grass for WC)" },
 { label: "Roof", val: "Fixed ETFE (Translucent)" },
 { label: "Built", val: "2020 ($5.5 Billion)" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-slate-700 dark:text-slate-300">
 <span className="font-medium text-slate-500">{item.label}</span>
 <span className="font-bold">{item.val}</span>
 </li>
 ))}
 </ul>
 </div>
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Pro Tips</h4>
 <ul className="space-y-4 text-slate-700 dark:text-slate-300">
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Sun Factor: East side (Sec 200-320) gets glare.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Connectivity: Free Wi-Fi 6 is incredibly fast.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Arrival: Gates open 3 hours before kickoff.</li>
 </ul>
 </div>
 </div>
 
 <div className="p-8 rounded-[2rem] border border-emerald-500/20">
 <p className="text-lg text-center font-medium text-emerald-800 dark:text-emerald-200">
 <strong>Getting There:</strong> The "Century Blvd" exit is notorious for gridlock. <strong>We strongly recommend using the Metro Shuttle</strong> from Hawthorne/Lennox (C Line) or Downtown Inglewood (K Line).
 </p>
 </div>
 </Section>

 <Section id="tips" title="Match Day Gameplan">
 <div className="grid md:grid-cols-3 gap-6 mb-8">
 {[
 { title: "Arrival", text: "Be at the gates 3 hours before kickoff. The 'hard perimeter' for FIFA is further out than NFL games." },
 { title: "Clear Bag", text: "Strictly enforced. 12x6x12 clear plastic bags only. No backpacks. No exceptions." },
 { title: "Exit Plan", text: "Wait 20–30 minutes inside after the whistle to bypass the crush, or walk to the Rideshare lot (Kia Forum)." }
 ].map((item, i) => (
 <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="flex flex-wrap gap-4">
 <AffiliateButton href="https://www.amazon.com/s?k=clear+stadium+bag&tag=stadiumport-20" text="Buy Clear Stadium Bag" variant="primary" />
<AffiliateButton href="https://www.amazon.com/s?k=collapsible+water+bottle&tag=stadiumport-20" text="Add Refillable Bottle" variant="outline" />
 </div>
 </Section>

 <Section id="tickets" title="Schedule & Tickets">
 <div className="bg-emerald-900 dark:bg-emerald-950 text-slate-900 dark:text-white rounded-[2.5rem] p-8 md:p-12 mb-12 relative overflow-hidden shadow-2xl">
 
 <div className="relative z-10">
 <div className="flex items-center gap-4 mb-8">
 <Ticket className="w-8 h-8 text-emerald-400" />
 <h3 className="text-3xl font-black">Confirmed Matches</h3>
 </div>
 <div className="space-y-6">
 {[
 { stage: "USMNT Opener", count: "JUN 12", color: "text-amber-400" },
 { stage: "Group Stage", count: "4 Matches", color: "text-emerald-300" },
 { stage: "Round of 32", count: "2 Matches", color: "text-emerald-300" },
 { stage: "Quarterfinal", count: "JUL 10", color: "text-emerald-300" }
 ].map((match, i) => (
 <div key={i} className="flex items-center justify-between border-b border-white/10 pb-4">
 <span className={`font-mono text-lg ${match.color}`}>{match.stage}</span>
 <span className="font-bold text-xl">{match.count}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Official Tickets</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8">
 The safest way to buy tickets is through the official FIFA portal. Registration typically opens 12-18 months before the tournament.
 </p>
 <AffiliateButton href="https://www.fifa.com" text="FIFA Official Site" variant="secondary" />
 </div>
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Resale Market</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8">
 Missed the draw? Trusted resale platforms offer verified tickets, though prices will be higher for high-demand matches like the Opener.
 </p>
 <AffiliateButton href="https://stubhub.prf.hn/l/7ORdd1d" text="Check StubHub" variant="primary" />
 </div>
 </div>
 </Section>

 <Section id="hotels" title="Where to Stay">
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl leading-relaxed">
 Los Angeles is massive. Staying in <strong>Santa Monica</strong> gives you the beach and Metro access. <strong>Inglewood</strong> offers proximity but less nightlife. <strong>Downtown LA</strong> is a central hub for transit.
 </p>
 
 <div className="space-y-8">
 <HotelCard 
  name="Sonder L'Avenida"
  rating={4.4}
  price="$250 - $400"
  distance="15 min drive"
  features={['Modern', 'Kitchenette', 'Walkable Area']}
  image="/images/cities/los-angeles-world-cup-2026-640.webp" 
  link="https://www.booking.com/searchresults.html?ss=Sonder+L%27Avenida+Los+Angeles"
/>
<HotelCard 
  name="Hilton Los Angeles Airport"
  rating={4.2}
  price="$200 - $350"
  distance="10 min drive"
  features={['Shuttle to LAX', 'Pool', 'Convenient']}
  image="/images/cities/los-angeles-world-cup-2026-640.webp" 
  link="https://www.booking.com/hotel/us/hilton-los-angeles-airport.html"
/>
<HotelCard 
  name="Fairmont Miramar Santa Monica"
  rating={4.7}
  price="$500 - $900"
  distance="40 min Metro"
  features={['Luxury', 'Ocean View', 'Beach Access']}
  image="/images/cities/los-angeles-world-cup-2026-640.webp" 
  link="https://www.booking.com/hotel/us/fairmont-miramar-hotel-bungalows.html"
/>
 </div>
 
 <div className="mt-12 text-center">
 <AffiliateButton href="https://www.booking.com/city/us/los-angeles.html" text="Search All LA Hotels" variant="outline" />
 </div>
 </Section>

 <Section id="transport" title="Getting Around">
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className="space-y-8">
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
 <Train className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Metro (Train)</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Use the C Line (Green) to Hawthorne/Lennox or K Line to Downtown Inglewood. Free shuttles connect both stations to SoFi.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
 <Plane className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">LAX Airport</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 SoFi is just 4 miles from LAX. A taxi/rideshare is quick (unless traffic hits). The Metro connector is also an option.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
 <Car className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Rideshare & Driving</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Traffic is brutal. Drive-up parking is rarely available. Pre-book parking in specific color zones (Orange, Brown, Blue).
 </p>
 </div>
 </div>
 </div>
 
 <div className=" rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 h-fit">
 <h4 className="font-bold text-2xl mb-6">Distance to Stadium</h4>
 <ul className="space-y-6">
 {[
 { label: "LAX Airport", time: "15 min drive" },
 { label: "Santa Monica", time: "45 min Metro" },
 { label: "Downtown LA", time: "40 min Metro" },
 { label: "Hollywood", time: "50 min drive" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
 <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
    </li>
  ))}
</ul>
<div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
  <AffiliateButton href="https://www.viator.com/Los-Angeles-tours/Transfers-and-Ground-Transport/d645-g15" text="Book Airport Transfer" variant="secondary" />
</div>
</div>
</div>
</Section>

 <Section id="dining" title="Food & Drink">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Olvera St", desc: "Mexican favorites inside the stadium. Try the Al Pastor Torta – marinated pork with fresh salsa." },
 { title: "Sawtelle", desc: "Asian fusion neighborhood. Inside SoFi, look for 'Tsunami Tots' with eel sauce and spicy mayo." },
 { title: "Three Weavers", desc: "A top local brewery in Inglewood. Perfect for a pre-match IPA before heading to the stadium." }
 ].map((item, i) => (
 <div key={i} className=" p-8 rounded-[2rem] shadow-lg border border-slate-200 dark:border-slate-200 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300">
 <div className="w-12 h-12 rounded-full flex items-center justify-center text-emerald-600 mb-6">
 <Utensils className="w-6 h-6" />
 </div>
 <h4 className="font-bold text-xl mb-3">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
 </div>
 ))}
 </div>
 </Section>

 <Section id="attractions" title="Top Attractions">
 <p className="mb-8 text-xl text-slate-600 dark:text-slate-300">
 SoFi is part of the massive Hollywood Park development, but Los Angeles offers endless entertainment just a short drive away.
 </p>
 <div className="space-y-6">
 {[
 { title: "Santa Monica Pier", desc: "The end of Route 66. Iconic ferris wheel, beach, and boardwalk atmosphere.", color: "text-blue-500" },
 { title: "Hollywood Walk of Fame", desc: "See the stars on the sidewalk. Touristy but essential for first-timers.", color: "text-red-500" },
 { title: "Griffith Observatory", desc: "Stunning views of the LA basin and the Hollywood Sign. Great for sunset.", color: "text-emerald-500" }
 ].map((item, i) => (
 <div key={i} className="flex gap-6 items-center p-6 rounded-3xl transition-colors shadow-sm hover:shadow-md">
 <div className=" p-4 rounded-2xl shadow-sm shrink-0">
 <Camera className={`w-8 h-8 ${item.color}`} />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-1">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
 </div>
 </div>
 ))}
 </div>
 <div className="mt-8">
 <AffiliateButton href="https://gocity.com/en/los-angeles" text="Get Go City Pass (Save 50%)" variant="primary" />
 </div>
 </Section>

 <Section id="safety" title="Safety & Security">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> Event Patterns</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Inglewood has improved, but stick to the main event areas around Hollywood Park. Tourist zones like Santa Monica are safe but watch for pickpockets.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Practical Tips</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>• Stay in well-lit areas at night.</li>
 <li>• Use official rideshare pickup zones.</li>
 <li>• Keep valuables secure in crowded Metro trains.</li>
 </ul>
 <div className="mt-6">
 <AffiliateButton href="https://www.worldnomads.com/travel-insurance" text="Get Travel Insurance" variant="secondary" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="culture" title="Cultural Intelligence">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">Los Angeles is the entertainment capital. Casual chic is the dress code. Tipping is standard (18–22%).</p>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { title: "Fan Zones", desc: "Hollywood Park will likely host mini-fan fests. Arrive early for music and food trucks." },
 { title: "Dining Etiquette", desc: "Reservations are essential for popular spots. Valet parking is common and often mandatory." },
 { title: "Traffic Reality", desc: "Distance is measured in minutes, not miles. '20 minutes' can mean 1 hour. Plan accordingly." }
 ].map((item, i) => (
 <div key={i} className="p-6 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-2xl">
 <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
 </div>
 ))}
 </div>
 </Section>

 <Section id="packing" title="Climate & Packing">
 <div className="grid md:grid-cols-3 gap-6">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Sun className="w-6 h-6 text-amber-500"/> June–July Weather</h4>
 <p className="text-slate-600 dark:text-slate-400">Warm days (75-85°F), but cooler evenings. The ocean breeze can be chilly.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Essentials</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400">
 <li>• Light jacket for evenings</li>
 <li>• Clear stadium bag</li>
 <li>• Sunglasses & Sunscreen</li>
 </ul>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Tech</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-6">
 <li>• US plug adapters (Type A/B)</li>
 <li>• Offline maps (Google Maps)</li>
 <li>• eSIM with hotspot</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com/united-states-esim" text="Get an eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <Section id="faq" title="Frequently Asked Questions">
 <div className="space-y-2">
 {[
 { q: "Where is SoFi Stadium located?", a: "SoFi Stadium is in Inglewood, about 4 miles from LAX and 12 miles southwest of Downtown Los Angeles." },
 { q: "Is it safe to walk to the stadium?", a: "From nearby designated lots, yes. But walking from distant neighborhoods at night is not recommended. Stick to the shuttle routes." },
 { q: "Do I need a car in Los Angeles?", a: "Generally yes for exploring the city, but NOT for the match itself. Use the Metro/Shuttle to avoid parking nightmares." },
 { q: "What is the weather like in June/July?", a: "Sunny and pleasant. Highs around 80°F (27°C). It rarely rains in summer." },
 { q: "How far is LAX airport from the stadium?", a: "Very close (4 miles). A short taxi ride, but allow time for traffic loops at the airport." },
 { q: "Which area should I stay in?", a: "Santa Monica for beach/vacation vibes; Inglewood for stadium proximity; Downtown for central transit access." },
 { q: "Can I bring a bag to the stadium?", a: "Only clear plastic bags (12x6x12) or small clutches. Strict enforcement. No backpacks." },
 { q: "How early should I arrive for matches?", a: "At least 3 hours. FIFA security perimeters are wide, and you'll want to enjoy the Hollywood Park plaza." },
 { q: "Is the stadium air-conditioned?", a: "It is 'indoor-outdoor'. It has a roof but open sides. The ocean breeze keeps it cool, but it's not sealed AC." },
 { q: "What’s the best way to get from the airport?", a: "Taxi or Rideshare is fastest to nearby hotels. For the stadium, drop bags first, then take Metro." },
 { q: "Where can I watch matches if I don’t have tickets?", a: "Fan fests will likely be at Santa Monica Pier or LA Live (Downtown). Check local listings." },
 { q: "Are restaurants close to the stadium?", a: "Yes, Hollywood Park has options, and Inglewood has great local spots like Three Weavers." },
 { q: "Do I need travel insurance?", a: "Yes, US healthcare is expensive. Trip protection is recommended for big events." },
 { q: "What mobile connectivity works best?", a: "5G is widespread. SoFi has excellent free Wi-Fi 6 inside the venue." },
 { q: "How do I avoid rideshare surge pricing?", a: "Walk to a local hotel bar, wait 45 mins, then call a car. Or take the shuttle away from the zone." },
 { q: "Where can I buy souvenirs?", a: "The Team Store at SoFi is massive. Also, pop-up shops will be all over LA." }
 ].map((item, i) => (
 <FAQItem key={i} question={item.q} answer={item.a} />
 ))}
 </div>
 </Section>

 <Section id="essential" title="Essential Information">
 <div className="grid md:grid-cols-2 gap-8">
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Shield className="w-6 h-6 text-emerald-500"/> Emergency Numbers</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>Emergency</strong> <span>911</span></li>
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>Non-Emergency Police</strong> <span>877-ASK-LAPD</span></li>
 <li className="flex justify-between"><strong>Hospital</strong> <span>Centinela Hospital</span></li>
 </ul>
 </div>
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-emerald-500"/> Connectivity</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6">
 <li>• <strong>WiFi:</strong> Free at LAX & SoFi Stadium.</li>
 <li>• <strong>Power:</strong> 120V, Type A/B plugs.</li>
 <li>• <strong>Sim Cards:</strong> Best to buy eSIM online.</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com/united-states-esim" text="Get an Airalo eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Explore Other Host Cities</h3>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {[
      { name: 'New York/New Jersey', slug: 'world-cup-2026-new-york-new-jersey-guide' },
      { name: 'Atlanta', slug: 'world-cup-2026-atlanta-guide' },
      { name: 'Mexico City', slug: 'world-cup-2026-mexico-city-guide' },
      { name: 'Toronto', slug: 'world-cup-2026-toronto-guide' },
      { name: 'Dallas', slug: 'world-cup-2026-dallas-guide' },
      { name: 'Miami', slug: 'world-cup-2026-miami-guide' },
      { name: 'Seattle', slug: 'world-cup-2026-seattle-guide' },
      { name: 'Boston', slug: 'world-cup-2026-boston-guide' }
    ].map((city) => (
      <Link key={city.name} href={`/${city.slug}`} className="block p-4 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center font-bold text-slate-700 dark:text-slate-200">
        {city.name}
      </Link>
    ))}
  </div>
 <div className="text-center mt-12">
 <Link href="/world-cup-2026-host-cities" className="text-emerald-500 hover:text-emerald-600 font-bold text-lg inline-flex items-center gap-2 hover:gap-4 transition-all">
 View All 16 Host Cities <ArrowRight className="w-5 h-5"/>
 </Link>
 </div>
 </div>
 </main>
 </div>
 </div>
 );
}















