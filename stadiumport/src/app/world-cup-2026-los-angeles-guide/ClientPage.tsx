'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { 
 MapPin, Calendar, Users, ArrowRight, Info, CheckCircle2, 
 Trophy, Plane, Hotel, Ticket, Share2, MessageSquare, 
 ThumbsUp, Send, HelpCircle, Utensils, Camera, Sun, 
 DollarSign, Shield, Clock, Globe, Star, ExternalLink,
 Train, Bus, Car, Bike, AlertTriangle, Briefcase,
 Bookmark, X, ChevronRight, Facebook, Twitter, Linkedin, Copy
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

// 1. Sticky Save Guide Button - REMOVED (Integrated into Hero)

// 2. Floating Social Share
const SocialShare = () => {
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Check out this guide to World Cup 2026 in Los Angeles!";
    
    let shareUrl = '';
    switch(platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
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
        <button onClick={() => handleShare('twitter')} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors">
          <Twitter className="w-5 h-5" />
        </button>
        <button onClick={() => handleShare('facebook')} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors">
          <Facebook className="w-5 h-5" />
        </button>
        <button onClick={() => handleShare('linkedin')} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors">
          <Linkedin className="w-5 h-5" />
        </button>
        <button onClick={() => handleShare('copy')} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors">
          <Copy className="w-5 h-5" />
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
    outline: "border-2 border-slate-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-900 dark:text-white bg-transparent"
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

const HotelCard = ({ name, rating, price, distance, features, image, link }: { name: string, rating: number, price: string, distance: string, features: string[], image: string, link: string }) => (
 <div className="group rounded-[2rem] overflow-hidden bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
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
    <div className="min-h-screen font-sans selection:bg-emerald-500/30 bg-[#F5F5F7] dark:bg-[#0A0A0A]">
      
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
 src="/images/cities/los-angeles-world-cup-2026-1600.webp" 
 alt="Los Angeles Skyline" 
 fill 
 className="object-cover"
 priority sizes="100vw" />
 <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-[#0A0A0A]/60 to-[#F5F5F7] dark:to-[#0A0A0A]" />
</div>

<div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-end md:items-center justify-between gap-12 pt-20">
<div className="max-w-4xl">
{/* Breadcrumbs */}
         <Breadcrumb 
           variant="white"
           items={[
             { label: 'Host Cities', href: '/world-cup-2026-host-cities' },
             { label: 'Los Angeles', href: '/world-cup-2026-los-angeles-guide' }
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
           <span className="px-3 py-1 rounded-full border border-white/30 text-white text-xs font-medium tracking-widest uppercase backdrop-blur-md">
             Host City
           </span>
<span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
SoFi Stadium (Inglewood)
</span>
</div>

<h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
Los Angeles World Cup 2026 Guide
</h1>
<p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
I’ve lived in L.A. long enough to remember when “getting to Inglewood” was a whole plan. For World Cup 2026, this is the reality: SoFi Stadium is spectacular, but the city is a patchwork of neighborhoods and traffic patterns. Nail your base, time your moves, and you’ll have the trip of your life.
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
 Los Angeles balances high-energy entertainment with logistical challenges. SoFi Stadium is a marvel, but navigating the sprawl requires a strategy. Whether you choose the beach vibes of Santa Monica or the convenience of Downtown, planning your transport is key.
 </p>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: MapPin, title: "Where to Base", text: "Santa Monica for the beach. West Hollywood for nightlife. Downtown or Inglewood for match-day focus." },
 { icon: Train, title: "Transport Strategy", text: "The new Metro K Line connects closer to the stadium, but rideshare is often necessary. Plan for traffic." },
 { icon: DollarSign, title: "Budget Signals", text: "Expect premium pricing across the board. Book flexible options early." }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 transition-colors">
 <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
<AffiliateButton href="https://www.skyscanner.com/transport/flights/to/lax" text="Search LA Flights" variant="secondary" icon={Plane} />
<AffiliateButton href="https://www.booking.com/searchresults.html?ss=Santa+Monica" text="Check Santa Monica Hotels" variant="primary" icon={Hotel} />
</div>
 </Section>

 <Section id="visa" title="Visa & Entry (USA)">
 <div className="grid md:grid-cols-2 gap-8">
  <div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Who Needs a Visa?</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">Citizens of Visa Waiver Program countries can use ESTA for short stays. Others require a B-2 tourist visa. Check status as of Dec 2025 and apply early.</p>
 <AffiliateButton href="https://esta.cbp.dhs.gov/" text="Check ESTA Eligibility" variant="outline" />
 </div>
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Arrival Tips</h4>
 <ul className="space-y-4 mb-8">
 {["Use LAX’s automated passport control", 'Proof of onward travel required', 'Carry digital copies of tickets'].map((item, i) => (
  <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
   <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
  </li>
 ))}
 </ul>
 <AffiliateButton href="https://www.worldnomads.com/" text="Buy Travel Insurance" variant="secondary" />
 </div>
 </div>
 </Section>

 <Section id="planning" title="Planning Timeline">
 <div className="space-y-6">
 {[
 { time: "6–9 Months Out", desc: "Book flights and refundable hotels in Santa Monica or Downtown. Set price alerts." },
 { time: "3–6 Months Out", desc: "Confirm match tickets. Reserve airport transfers and key restaurants like Nobu or Bestia." },
 { time: "1–3 Months Out", desc: "Lock in eSIMs, clear stadium bags, and day trips to Universal Studios." }
 ].map((item, i) => (
  <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center">
   <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
   <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
  </div>
 ))}
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
<AffiliateButton href="https://www.skyscanner.com" text="Set Flight Alerts" variant="primary" icon={Plane} />
<AffiliateButton href="https://www.opentable.com/los-angeles-restaurants" text="Reserve Restaurant Tables" variant="outline" />
</div>
 </Section>

 <Section id="budget" title="Budget Tiers">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Smart Saver", items: ["Hostels in Hollywood", "Metro passes", "Taco truck dining"] },
 { title: "Comfort Upgrades", items: ["Santa Monica 4-star hotels", "Uber/Lyft rides", "Casual sit-down dining"] },
 { title: "Premium", items: ["Luxury suites in Beverly Hills", "Private chauffeur", "Michelin-star dining"] }
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
<AffiliateButton href="https://www.kayak.com/packages/Los-Angeles-c16078" text="Search LA Packages" variant="secondary" icon={Briefcase} />
</div>
 </Section>

 <Section id="stadium" title="SoFi Stadium">
 <LightboxImage 
            src="/images/stadiums/sofi-stadium-los-angeles-world-cup-2026-1600.webp" 
            alt="SoFi Stadium Interior" 
            caption="The stunning Infinity Screen at SoFi Stadium."
          />

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 Widely considered the most advanced stadium in the world, <strong>SoFi Stadium</strong> is a masterpiece of engineering. With its translucent roof, open-air sides, and the massive double-sided "Infinity Screen" video board, it offers a futuristic fan experience in Inglewood.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Key Features</h4>
 <ul className="space-y-4">
 {[
 { label: "Capacity", val: "~70,240 (Expandable)" },
 { label: "Surface", val: "Artificial Turf (Likely Grass for WC)" },
 { label: "Roof", val: "Translucent Fixed Roof" },
 { label: "Built", val: "2020 ($5 Billion)" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-slate-700 dark:text-slate-300">
 <span className="font-medium text-slate-500">{item.label}</span>
 <span className="font-bold">{item.val}</span>
 </li>
 ))}
 </ul>
 </div>
  <div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Pro Tips</h4>
 <ul className="space-y-4 text-slate-700 dark:text-slate-300">
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Traffic: Leave early. Seriously.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Cashless: The entire venue is card/mobile only.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Bag Policy: Strict clear bag policy enforced.</li>
 </ul>
 </div>
 </div>
 
 <div className="p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/20">
  <p className="text-lg text-center font-medium text-emerald-800 dark:text-emerald-200">
 <strong>Getting There:</strong> Use the <strong>Metro K Line</strong> to Downtown Inglewood Station and take the free shuttle. Rideshare drop-off zones are available but can be congested.
 </p>
 </div>
 </Section>

 <Section id="tips" title="Match Day Gameplan">
 <div className="grid md:grid-cols-3 gap-6 mb-8">
 {[
 { title: "Arrival", text: "Aim to arrive 2+ hours early. The 'Lake Park' area offers pre-match entertainment." },
 { title: "Clear Bag", text: "Bring a stadium-approved clear bag. Security is tight and efficient." },
 { title: "Exit Plan", text: "Consider hanging out at Hollywood Park post-match to let traffic subside." }
 ].map((item, i) => (
  <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
   <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="flex flex-wrap gap-4">
<AffiliateButton href="https://www.amazon.com/s?k=clear+stadium+bag" text="Buy Clear Stadium Bag" variant="primary" />
<AffiliateButton href="https://www.amazon.com/s?k=collapsible+water+bottle" text="Add Refillable Bottle" variant="outline" />
</div>
 </Section>

 <Section id="tickets" title="Schedule & Tickets">
 <div className="bg-emerald-900 dark:bg-emerald-950 text-slate-900 dark:text-white rounded-[2.5rem] p-8 md:p-12 mb-12 relative overflow-hidden shadow-2xl">
 <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[150px] opacity-20"></div>
 <div className="relative z-10">
 <div className="flex items-center gap-4 mb-8">
 <Ticket className="w-8 h-8 text-emerald-400" />
 <h3 className="text-3xl font-black">Confirmed Matches</h3>
 </div>
 <div className="space-y-6">
 {[
 { stage: "Group Stage", count: "5 Matches", color: "text-emerald-300" },
 { stage: "Round of 32", count: "2 Matches", color: "text-emerald-300" },
 { stage: "Quarter-Final", count: "1 Match", color: "text-emerald-300" },
 { stage: "US Opening", count: "?? HOST MATCH", color: "text-amber-400" }
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
 Missed the draw? Trusted resale platforms offer verified tickets, though prices will be higher for high-demand matches.
 </p>
 <AffiliateButton href="https://www.stubhub.com/sofi-stadium-tickets/venue/432371/" text="Check StubHub" variant="primary" />
 </div>
 </div>
 </Section>

 <Section id="hotels" title="Where to Stay">
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl leading-relaxed">
 L.A. offers diverse neighborhoods. Stay in <strong>Santa Monica</strong> for the ocean breeze, <strong>West Hollywood</strong> for nightlife, or near <strong>LAX/Inglewood</strong> for pure convenience.
 </p>
 
 <div className="space-y-8">
 <HotelCard 
 name="Santa Monica Proper Hotel"
 rating={4.8}
 price="$500 - $900"
 distance="30 min drive"
 features={['Luxury Design', 'Rooftop Pool', 'Beach Access']}
 image="/images/cities/los-angeles-world-cup-2026.webp" 
 link="https://www.booking.com/hotel/us/santa-monica-proper.html"
 />
 <HotelCard 
 name="The Hollywood Roosevelt"
 rating={4.5}
 price="$350 - $600"
 distance="40 min drive"
 features={['Historic', 'Pool Parties', 'Nightlife']}
 image="/images/cities/los-angeles-world-cup-2026.webp" 
 link="https://www.booking.com/hotel/us/the-hollywood-roosevelt.html"
 />
 <HotelCard 
 name="JW Marriott Los Angeles L.A. LIVE"
 rating={4.6}
 price="$400 - $700"
 distance="20 min drive"
 features={['Downtown', 'Luxury', 'Convenient']}
 image="/images/cities/los-angeles-world-cup-2026.webp" 
 link="https://www.booking.com/hotel/us/jw-marriott-los-angeles-l-a-live.html"
 />
 </div>
 
 <div className="mt-12 text-center">
<AffiliateButton href="https://www.booking.com/searchresults.html?ss=Los+Angeles" text="Search All LA Hotels" variant="outline" />
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
 The K Line serves Inglewood. Connects to E Line (Expo) for Downtown and Santa Monica. Metro uses fare-capping (TAP required): $1.75 base fare, $5 daily cap, and $18 weekly cap.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
 <Plane className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Airport Transfer</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 LAX is the main hub. FlyAway to Union Station is $12.75 one-way (2025). The new Automated People Mover (expected) will connect terminals to the Metro and rental car center.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
 <Bus className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">SoFi Shuttle (Match Day)</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 For Metro C Line (Hawthorne/Lennox) access, the game-day shuttle now picks up at the LAX/Metro Transit Center (Bus Bay 8). It’s free, runs every 3–5 minutes starting 3 hours before kickoff, and returns for 90 minutes after the game.
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
 Uber/Lyft are ubiquitous but can be pricey. If you rent a car, ensure your hotel has parking. Traffic is a real factor in planning.
 </p>
 </div>
 </div>
 </div>
 
 <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/10 h-fit">
  <h4 className="font-bold text-2xl mb-6">Distance to Stadium</h4>
  <ul className="space-y-6">
   {[
    { label: "LAX Airport", time: "15 min drive" },
    { label: "Downtown LA", time: "25 min drive" },
    { label: "Santa Monica", time: "30 min drive" },
    { label: "Hollywood", time: "40 min drive" }
   ].map((item, i) => (
    <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-white/10 pb-4 last:border-0 last:pb-0">
     <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
     <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
    </li>
   ))}
  </ul>
  <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10">
<AffiliateButton href="https://www.uber.com/global/en/airports/lax/" text="Book Airport Transfer" variant="secondary" />
</div>
 </div>
 </div>
 </Section>

 <Section id="dining" title="Food & Drink">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Taco Trucks", desc: "A way of life in LA. Try Leo's Taco Truck for authentic al pastor or Mariscos Jalisco for shrimp tacos." },
 { title: "In-N-Out Burger", desc: "The iconic California burger chain. Order a Double-Double Animal Style. A must-do for visitors." },
 { title: "Grand Central Market", desc: "Downtown's historic food hall offering everything from egg sandwiches to pupusas." }
 ].map((item, i) => (
  <div key={i} className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 shadow-lg hover:-translate-y-2 transition-transform duration-300">
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
 L.A. is vast, so pick your battles. Group your sightseeing by neighborhood to avoid spending your whole trip on the 405 freeway.
 </p>
 <div className="space-y-6">
 {[
 { title: "Santa Monica Pier", desc: "The end of Route 66. Classic amusement park rides over the Pacific Ocean.", color: "text-blue-500" },
 { title: "Hollywood Sign & Griffith Observatory", desc: "Hike up for the best views of the city and the famous sign.", color: "text-emerald-500" },
 { title: "Universal Studios Hollywood", desc: "Theme park and working movie studio. The Wizarding World of Harry Potter is a highlight.", color: "text-red-500" }
 ].map((item, i) => (
  <div key={i} className="flex gap-6 items-center p-6 rounded-3xl bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 transition-colors shadow-sm hover:shadow-md">
   <div className="p-4 rounded-2xl shadow-sm shrink-0">
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
<AffiliateButton href="https://gocity.com/en/los-angeles" text="Get Go City Pass" variant="primary" />
</div>
 </Section>

 <Section id="safety" title="Safety & Security">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> Event Patterns</h4>
   <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Crowds will be heavy around SoFi and Fan Fests. Stay aware of your surroundings, especially in Hollywood and Downtown at night.</p>
  </div>
  <div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Practical Tips</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>• Use rideshare at night instead of walking long distances.</li>
 <li>• Avoid leaving valuables in rental cars.</li>
 <li>• Stick to well-lit, populated areas.</li>
 </ul>
 <div className="mt-6">
<AffiliateButton href="https://www.worldnomads.com/" text="Get Travel Insurance" variant="secondary" />
</div>
 </div>
 </div>
 </Section>

 <Section id="culture" title="Cultural Intelligence">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">L.A. is diverse and laid-back. "Dressy casual" is the standard. Tipping is expected (18-22%). People drive everywhere, but walking neighborhoods is rewarding.</p>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { title: "Fan Zones", desc: "Expect major activations at L.A. Live and Santa Monica Beach. Arrive early for capacity." },
 { title: "Dining Etiquette", desc: "Reservations are crucial for popular spots. Casual dining is very common and high quality." },
 { title: "Nightlife Rhythm", desc: "West Hollywood and Downtown are the hubs. Last call is 2 AM." }
 ].map((item, i) => (
  <div key={i} className="p-6 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl">
   <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
 </div>
 ))}
 </div>
 </Section>

 <Section id="packing" title="Climate & Packing">
 <div className="grid md:grid-cols-3 gap-6">
  <div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Sun className="w-6 h-6 text-amber-500"/> Summer Days</h4>
 <p className="text-slate-600 dark:text-slate-400">June/July is warm and sunny (75°F - 85°F). Perfect beach weather. Dry heat means it feels comfortable.</p>
 </div>
  <div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Clock className="w-6 h-6 text-blue-500"/> Cool Nights</h4>
 <p className="text-slate-600 dark:text-slate-400">Temps drop significantly at night (60°F), especially near the coast. Bring a light jacket or hoodie.</p>
 </div>
  <div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Essentials</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400">
 <li>• Water-resistant RFID wallet</li>
 <li>• Clear stadium bag</li>
 <li>• Portable power bank</li>
 </ul>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Tech</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-6">
 <li>• US plug adapters (Type A/B)</li>
 <li>• Offline maps</li>
 <li>• eSIM with hotspot</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com/united-states-esim" text="Get an eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <Section id="faq" title="Frequently Asked Questions">
 <div className="space-y-2">
 {[
 { q: "Where is the stadium located?", a: "SoFi Stadium is in Inglewood, about 3 miles from LAX and 12 miles southwest of Downtown Los Angeles." },
 { q: "Is Los Angeles safe for tourists?", a: "Generally yes. Tourist zones like Santa Monica and West Hollywood are safe. Stay aware in Downtown and avoid unlit areas at night." },
 { q: "Do I need a car in LA?", a: "Traditionally yes, but for the World Cup, traffic will be brutal. Use the Metro K Line and specialized shuttles for match days." },
 { q: "What is the weather like in June/July?", a: "Perfect. Expect sunny days with highs of 75–85°F (24–29°C). Evenings can be cool, so bring layers." },
 { q: "How far is the airport from the stadium?", a: "Very close—about 3-4 miles. However, with traffic, this short distance can take 20-30 minutes." },
 { q: "Which area should I stay in?", a: "Santa Monica for beach vibes; West Hollywood for nightlife; Downtown/Inglewood for match proximity." },
 { q: "Can I bring a bag to the stadium?", a: "Yes, clear stadium-approved bags only. Strict policy enforced. Small clutches are allowed but discouraged." },
 { q: "How early should I arrive for matches?", a: "At least 2 hours early. The 'Lake Park' area at SoFi offers entertainment, and entry lines can be long." },
 { q: "Is the stadium air-conditioned?", a: "SoFi has a translucent roof and is open-air on the sides, using passive cooling. It stays comfortable but is not fully AC'd like indoor arenas." },
 { q: "What’s the best way to get from the airport?", a: "Rideshare or the LAX FlyAway bus to Union Station. The Metro C Line also connects near the airport." },
 { q: "Where can I watch matches if I don’t have tickets?", a: "Major Fan Fests will likely be at L.A. Live (Downtown) and Santa Monica Pier/Beach." },
 { q: "Are restaurants close to the stadium?", a: "Inglewood offers great local food. For more variety, head to Culver City or Manhattan Beach nearby." },
 { q: "Do I need travel insurance?", a: "Yes. US healthcare is expensive. Insurance is highly recommended for all international visitors." },
 { q: "What mobile connectivity works best?", a: "Get an eSIM before arrival. Coverage is excellent in LA, though stadium signals can get congested." },
 { q: "How do I avoid rideshare surge pricing?", a: "Walk 15 minutes away from the immediate stadium perimeter to a local hotel or shopping area." },
 { q: "Where can I buy souvenirs?", a: "The Equipment Room at SoFi Stadium is the flagship store. Pop-ups will be everywhere during the tournament." }
 ].map((item, i) => (
 <FAQItem key={i} question={item.q} answer={item.a} />
 ))}
 </div>
 </Section>

 <Section id="essential" title="Essential Information">
 <div className="grid md:grid-cols-2 gap-8">
  <div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
   <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Shield className="w-6 h-6 text-emerald-500"/> Emergency Numbers</h4>
   <ul className="space-y-3 text-slate-600 dark:text-slate-400">
    <li className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-2"><strong>Emergency</strong> <span>911</span></li>
    <li className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-2"><strong>Non-Emergency</strong> <span>311</span></li>
 <li className="flex justify-between"><strong>Hospital</strong> <span>Cedars-Sinai Medical Center</span></li>
 </ul>
 </div>
   <div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-emerald-500"/> Connectivity</h4>
<ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6">
 <li>• <strong>WiFi:</strong> Free at LAX & SoFi Stadium.</li>
 <li>• <strong>Power:</strong> 120V, Type A/B plugs.</li>
 <li>• <strong>Sim Cards:</strong> Kiosks at LAX Arrivals.</li>
</ul>
<AffiliateButton href="https://www.airalo.com/united-states-esim" text="Get an Airalo eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <div className="mt-24 pt-12 border-t border-slate-200 dark:border-white/10">
        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Explore Other Host Cities</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'New York/New Jersey', slug: 'new-york-city-guide' },
            { name: 'Atlanta', slug: 'atlanta-city-guide' },
            { name: 'Mexico City', slug: 'mexico-city-city-guide' },
            { name: 'Toronto', slug: 'toronto-city-guide' },
            { name: 'Dallas', slug: 'dallas-city-guide' },
            { name: 'Miami', slug: 'miami-city-guide' },
            { name: 'Seattle', slug: 'seattle-city-guide' },
            { name: 'Boston', slug: 'boston-city-guide' }
          ].map((city) => (
            <Link 
              key={city.name}
              href={`/world-cup-2026-${city.slug}`}
              className="block p-4 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center font-bold text-slate-700 dark:text-slate-200"
            >
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















