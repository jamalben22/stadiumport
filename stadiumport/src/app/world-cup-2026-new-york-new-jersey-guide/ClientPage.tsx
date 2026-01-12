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
  X, ChevronRight, Facebook, Twitter, Linkedin, Copy
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

// 1. Sticky Save Guide Button - REMOVED (Integrated into Hero)

// 2. Floating Social Share
const SocialShare = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Check out this guide to World Cup 2026 in New York/New Jersey!";
    
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
 { id: 'stadium', label: 'MetLife' },
 { id: 'matchday', label: 'Match Day' },
 { id: 'tickets', label: 'Tickets' },
 { id: 'neighborhoods', label: 'Neighborhoods' },
 { id: 'hotels', label: 'Where to Stay' },
 { id: 'transport', label: 'Transport' },
 { id: 'dining', label: 'Food & Drink' },
 { id: 'hidden-gems', label: 'Hidden Gems' },
 { id: 'itineraries', label: 'Itineraries' },
 { id: 'attractions', label: 'Must-Do' },
 { id: 'tips', label: 'Local Hacks' },
 { id: 'safety', label: 'Safety' },
 { id: 'culture', label: 'Local Rules' },
 { id: 'packing', label: 'Weather & Packing' },
 { id: 'faq', label: 'FAQ' },
 { id: 'essential', label: 'Essential Info' },
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
 src="/images/cities/new-york-new-jersey-world-cup-2026-1600.webp" 
 alt="New York Skyline" 
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
             { label: 'New York New Jersey', href: '/world-cup-2026-new-york-new-jersey-guide' }
           ]} 
         />

<motion.div
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
>
<div className="flex items-center gap-4 mb-6">
           <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
             Last Updated: January 7, 2026
           </span>
           <span className="px-3 py-1 rounded-full border border-white/30 text-white text-xs font-medium tracking-widest uppercase backdrop-blur-md">
             Host City
           </span>
<span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
Final Host
</span>
</div>

<h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
            New York/New Jersey World Cup 2026 Guide
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/90 font-light max-w-3xl leading-relaxed">
            MetLife Stadium logistics, neighborhood picks, and the local shortcuts that save you hours.
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
 <div className="prose prose-lg dark:prose-invert max-w-none">
   <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
     I’ve lived in the New York / New Jersey orbit long enough to remember when people still carried paper MetroCards like they were precious family heirlooms. The good news? You’re coming for the <strong>World Cup 2026</strong> in the biggest media market on earth. The bad news? The stadium isn’t in New York City, and your trip can go from “cinematic” to “why am I on the wrong platform at Secaucus?” in about 90 seconds.
   </p>
   <p>
     This <strong>New York/New Jersey World Cup 2026 guide</strong> is built for one thing: helping you have the trip you pictured in your head—skyline, bagels, borough energy—while still getting you to <strong>MetLife Stadium</strong> on time, fed, hydrated, and not in a rideshare surge spiral.
   </p>
 </div>

 <div className="grid md:grid-cols-3 gap-8 mt-12">
   {[
     { icon: MapPin, title: "The Core Truth", text: "MetLife Stadium is in East Rutherford, New Jersey. NYC is the base. NJ is match day." },
     { icon: Train, title: "The Winning Route", text: "NJ Transit from New York Penn → Secaucus Junction → Meadowlands Station for major events." },
     { icon: DollarSign, title: "The Pricing Reality", text: "The Final week will be the most expensive of your life here. Book refundable, then optimize." }
   ].map((item, i) => (
     <div key={i} className="p-8 rounded-[2rem] transition-colors border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
       <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
       <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
     </div>
   ))}
 </div>

 <div className="mt-12 p-8 rounded-[2rem] border border-emerald-500/20">
   <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Quick answers (for the impatient)</h3>
   <div className="grid md:grid-cols-2 gap-6 text-slate-700 dark:text-slate-300">
     <div className="flex gap-3">
       <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
       <p><strong>Best area for first-timers:</strong> Midtown Manhattan near Penn Station.</p>
     </div>
     <div className="flex gap-3">
       <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
       <p><strong>Best value base:</strong> Jersey City waterfront (PATH + NJ Transit access).</p>
     </div>
     <div className="flex gap-3">
       <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
       <p><strong>Best airport for match logistics:</strong> Newark (EWR) in New Jersey.</p>
     </div>
     <div className="flex gap-3">
       <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
       <p><strong>One mistake to avoid:</strong> Assuming you can “just take the subway” to the stadium.</p>
     </div>
   </div>
 </div>

 <div className="mt-12 flex flex-wrap gap-4">
   <AffiliateButton href="https://www.skyscanner.com" text="Compare Flights" variant="secondary" icon={Plane} />
   <AffiliateButton href="https://www.expedia.com" text="Bundle Flight + Hotel" variant="outline" icon={Briefcase} />
   <AffiliateButton href="https://www.booking.com/searchresults.html?ss=New+York" text="Search NYC Hotels" variant="primary" icon={Hotel} />
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
 {['Use JFK/EWR automated passport control', 'Proof of onward travel required', 'Carry digital copies of tickets'].map((item, i) => (
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
 { time: "6–9 Months Out", desc: "Book flights and refundable hotels in Manhattan or NJ. Set price alerts. If traveling multi-city, plan open-jaw tickets." },
 { time: "3–6 Months Out", desc: "Confirm match tickets. Reserve airport transfers and key restaurants (e.g. Broadway area)." },
 { time: "1–3 Months Out", desc: "Lock in eSIMs, clear stadium bags, and day trips. Re-price hotels weekly; big events often trigger cancellations." }
 ].map((item, i) => (
 <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center">
 <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
 <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
 </div>
 ))}
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
              <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/nyc" text="Set Flight Alerts" variant="primary" icon={Plane} />
                  <AffiliateButton href="https://www.opentable.com/new-york-city-restaurants" text="Reserve Restaurant Tables" variant="outline" />
 </div>
 </Section>

 <Section id="budget" title="Budget Tiers">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Smart Saver", items: ["Hotels in NJ (Secaucus/Hoboken)", "Subway & NJ Transit", "NY Slice Pizza"] },
 { title: "Comfort Upgrades", items: ["Manhattan 4-star hotels", "Direct NJ Transit access", "Broadway show tickets"] },
 { title: "Premium", items: ["Luxury Central Park suite", "Private matchday transfer", "VIP hospitality"] }
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
 <AffiliateButton href="https://www.kayak.com/packages/New-York-c15830" text="Search NYC Packages" variant="secondary" icon={Briefcase} />
 </div>
 </Section>

 <Section id="stadium" title="MetLife Stadium (Know This Cold)">
 <LightboxImage 
 src="/images/stadiums/metlife-stadium-east-rutherford-world-cup-2026-1600.webp" 
 alt="MetLife Stadium" 
 caption="MetLife Stadium, host of the 2026 World Cup Final."
 />

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
   <p>
     MetLife is huge, open-air, and built for volume—volume of people, volume of security checks, volume of “where’s the exit?” questions after the whistle. It’s the home of the Giants and Jets, and it’s sitting in the Meadowlands Sports Complex in East Rutherford, NJ.
   </p>
   <p>
     If you take one thing from this section: <strong>MetLife is not “a quick hop from Manhattan” unless you plan it like a commuter.</strong> On Final day, the region’s entire transportation system is going to feel like it’s wearing cleats.
   </p>
   <p>
     Official match-day transport guidance consistently points fans to mass transit. NJ Transit runs Meadowlands rail service for major events, and the bus option from Manhattan is the Coach USA 351 from the Port Authority Bus Terminal. On big match days, rail service typically starts hours before kickoff and continues after the match; the Secaucus → stadium ride is only about 10 minutes when trains are running. For the official framework and timing windows, use the MetLife transport notes published by VisitNJ and NJ Transit. 
   </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Key Features</h4>
 <ul className="space-y-4">
 {[
 { label: "Capacity", val: "~82,500" },
 { label: "Surface", val: "Artificial (Grass for WC)" },
 { label: "Roof", val: "Open Air" },
 { label: "Built", val: "2010 ($1.6 Billion)" }
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
 <ul className="space-y-4 text-slate-600 dark:text-slate-400 font-medium">
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> It’s open-air: pack a light rain layer and sunscreen.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Train beats car: road traffic into the complex gets ugly fast.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Tailgates are real: arrive early if you want the parking-lot culture.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Buy tickets before boarding: onboard purchases can add surcharges.</li>
 </ul>
 </div>
 </div>
 
 <div className="grid md:grid-cols-3 gap-6">
   <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
     <h4 className="font-bold text-xl mb-3">Address</h4>
     <p className="text-slate-600 dark:text-slate-400">1 MetLife Stadium Dr, East Rutherford, NJ 07073</p>
   </div>
   <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
     <h4 className="font-bold text-xl mb-3">Rail Route</h4>
     <p className="text-slate-600 dark:text-slate-400">New York Penn → Secaucus Junction → Meadowlands Station (event service).</p>
   </div>
   <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
     <h4 className="font-bold text-xl mb-3">Bus Route</h4>
     <p className="text-slate-600 dark:text-slate-400">Coach USA 351 from Port Authority Bus Terminal (when operating for the event).</p>
   </div>
 </div>

 <div className="mt-10 flex flex-wrap gap-4">
   <AffiliateButton href="/metlife-stadium-world-cup-2026" text="MetLife Stadium Deep Guide" variant="secondary" icon={MapPin} />
   <AffiliateButton href="https://www.njtransit.com/meadowlands" text="NJ Transit Meadowlands Info" variant="outline" icon={Train} />
 </div>
 </Section>

 <Section id="matchday" title="Match Day Gameplan (The Local Clock)">
   <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
     <p>
       Here’s the rhythm of a big game day around here: the city wakes up early, the trains load up, and Penn Station turns into a slow-moving river of jerseys. If you plan it like a normal sightseeing day, you’ll be late. If you plan it like a commuter with somewhere important to be, you’ll be relaxed enough to actually enjoy the build-up.
     </p>
   </div>

   <div className="grid md:grid-cols-3 gap-6 mb-10">
     {[
       { title: "T-5 hours", text: "Eat a real meal (not a granola bar) and check your route. Stadium is open-air: glance at weather." },
       { title: "T-4 hours", text: "Get to New York Penn Station (or your NJ rail base). Buy round-trip tickets in the NJ Transit app." },
       { title: "T-3 hours", text: "Aim to be in the Meadowlands complex area. Security + crowd-control for knockout matches is slower." },
       { title: "T-2 hours", text: "Gates, photos, bathrooms, and the “I’m glad we came early” moment." },
       { title: "Full time", text: "Hydrate. Upper deck breeze is real. Your voice will be gone by minute 60." },
       { title: "Post-match", text: "Either queue calmly for rail, or hang back 30–45 minutes and let the first wave clear." }
     ].map((item, i) => (
       <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
         <h4 className="font-bold mb-3">{item.title}</h4>
         <p className="text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
       </div>
     ))}
   </div>

   <div className="p-8 rounded-[2rem] border border-emerald-500/20">
     <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">The standard train route (Manhattan)</h3>
     <ol className="space-y-3 text-slate-700 dark:text-slate-300 font-medium list-decimal pl-5">
       <li>Get to <strong>New York Penn Station</strong> and follow signs for <strong>NJ TRANSIT</strong>.</li>
       <li>Take a train to <strong>Secaucus Junction</strong> (departure boards commonly mark it as “SEC”).</li>
       <li>Transfer to the <strong>Meadowlands-bound</strong> shuttle (event service) for <strong>Meadowlands Station</strong>.</li>
       <li>Walk into the stadium complex and follow crowd routing to your gate.</li>
     </ol>
   </div>

   <div className="mt-10 flex flex-wrap gap-4">
     <AffiliateButton href="https://www.worldnomads.com/" text="Travel Insurance (Event Trips)" variant="secondary" icon={Shield} />
     <AffiliateButton href="https://www.amazon.com/s?k=clear+stadium+bag" text="Clear Stadium Bags" variant="outline" icon={Briefcase} />
     <AffiliateButton href="https://www.fanatics.com/soccer" text="Jerseys & Merch" variant="primary" icon={Trophy} />
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
 { stage: "Round of 32", count: "1 Match", color: "text-emerald-300" },
 { stage: "Round of 16", count: "1 Match", color: "text-emerald-300" },
 { stage: "Final", count: "?? WORLD CUP FINAL", color: "text-amber-400" }
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
 Missed the draw? Trusted resale platforms offer verified tickets, though prices will be higher for high-demand matches like the Final.
 </p>
 <AffiliateButton href="#" text="Check StubHub" variant="primary" />
 </div>
 </div>
 </Section>

 <Section id="neighborhoods" title="Neighborhood-by-Neighborhood (Where You Actually Want to Base)">
   <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
     <p>
       People love to argue “Manhattan vs New Jersey” like it’s a sports debate. Here’s the truth: you’re probably going to do both. You sleep in one place, you eat in three, you celebrate in a fourth, and you commute through a fifth. Pick a base that matches <em>your</em> vibe, then build a reliable route to a transit hub for match day.
     </p>
     <p>
       I’ve broken this down the way locals do it—by “how your day feels” and “how fast you can get to the train,” not by what a hotel brochure says.
     </p>
   </div>

   <div className="grid md:grid-cols-2 gap-8">
     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Midtown (Penn Station / Times Square edge)</h3>
       <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
         Best for first-time visitors who want the “walk outside and it’s New York” feeling. You’re also closest to NJ Transit at Penn. The tradeoff: it’s crowded, loud, and the restaurant lines can feel like theme-park rides.
       </p>
       <ul className="mt-6 space-y-2 text-slate-700 dark:text-slate-300 font-medium">
         <li>• Family-friendly: Midtown East is calmer than Times Square itself.</li>
         <li>• Nightlife: Hell’s Kitchen has the bars without the chaos.</li>
         <li>• Match-day advantage: shortest route to NJ Transit trains.</li>
       </ul>
     </div>

     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Lower Manhattan (SoHo / LES / Financial District)</h3>
       <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
         Food, neighborhoods, and late-night energy—without Midtown’s tourist crush. Great if you’re here for the city as much as the match. You’ll add commuting time to Penn, but you’ll gain a better daily rhythm.
       </p>
       <ul className="mt-6 space-y-2 text-slate-700 dark:text-slate-300 font-medium">
         <li>• Best for: repeat visitors, food people, bar people.</li>
         <li>• Transit note: plan your Penn Station run early on match day.</li>
         <li>• Local move: pre-book restaurants; walk-ins get brutal in summer.</li>
       </ul>
     </div>

     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Jersey City Waterfront (New Jersey)</h3>
       <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
         Skyline views that’ll make your group chat jealous, often better hotel value, and easy access to Manhattan via PATH. This is the “I want NYC, but I also want sleep” option.
       </p>
       <ul className="mt-6 space-y-2 text-slate-700 dark:text-slate-300 font-medium">
         <li>• Family-friendly: yes, especially around Exchange Place.</li>
         <li>• Match-day advantage: closer to the Meadowlands than Manhattan is.</li>
         <li>• Local move: pregame along the waterfront, then head to the train.</li>
       </ul>
     </div>

     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Hoboken (New Jersey)</h3>
       <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
         Brownstones, bars, and a walkable “small city” feeling. Hoboken is a classic pregame spot, and it can be a smoother launch point for NJ Transit than Midtown on very crowded days.
       </p>
       <ul className="mt-6 space-y-2 text-slate-700 dark:text-slate-300 font-medium">
         <li>• Nightlife: strong, especially on weekends.</li>
         <li>• Match-day advantage: easier station access than Penn’s crush.</li>
         <li>• Good for: groups who want bars and a simpler sleep setup.</li>
       </ul>
     </div>
   </div>

   <div className="mt-10 p-8 rounded-[2rem] border border-emerald-500/20">
     <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Where I’d base, depending on your trip</h3>
     <div className="grid md:grid-cols-2 gap-6 text-slate-700 dark:text-slate-300 font-medium">
       <p><strong>First trip, one match:</strong> Midtown (near Penn) for simplicity.</p>
       <p><strong>Two+ matches, want sanity:</strong> Jersey City waterfront for value + views.</p>
       <p><strong>Nightlife crew:</strong> Lower East Side or Hoboken.</p>
       <p><strong>Family with kids:</strong> Upper West Side or Midtown East; easy parks, easy food.</p>
     </div>
   </div>
 </Section>

 <Section id="hotels" title="Where to Stay">
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl leading-relaxed">
 New York’s inventory is massive, but match-week pricing can make it feel tiny. Start with location (Penn access vs skyline calm), then filter by cancellation flexibility. If you’re coming for the Final, book something refundable now and “shop down” later.
 </p>
 
 <div className="space-y-8">
 <HotelCard 
 name="The New Yorker, A Wyndham Hotel"
 rating={4.0}
 price="$250–$700"
 distance="Penn Station (walk)"
 features={['Penn Station access', 'Classic NYC', 'Easy match day']}
 image="/images/cities/new-york-new-jersey-world-cup-2026.webp" 
 link="https://www.booking.com/searchresults.html?ss=The+New+Yorker+Hotel%2C+New+York"
 />
 <HotelCard 
 name="Hyatt House Jersey City"
 rating={4.3}
 price="$220–$650"
 distance="PATH + NJ Transit"
 features={['Skyline views', 'Transit base', 'Great value (often)']}
 image="/images/cities/new-york-new-jersey-world-cup-2026.webp" 
 link="https://www.booking.com/searchresults.html?ss=Hyatt+House+Jersey+City"
 />
 <HotelCard 
 name="1 Hotel Brooklyn Bridge"
 rating={4.7}
 price="$600+"
 distance="60 min train"
 features={['Skyline Views', 'Luxury', 'Ferry Access']}
 image="/images/cities/new-york-new-jersey-world-cup-2026.webp" 
 link="https://www.booking.com/searchresults.html?ss=1+Hotel+Brooklyn+Bridge"
 />
 </div>
 
 <div className="mt-12 text-center">
 <AffiliateButton href="https://www.booking.com" text="Search All Hotels (NYC + NJ)" variant="outline" />
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
 <h4 className="font-bold text-xl mb-2">MTA + NJ Transit (Your two systems)</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Think of this trip as two networks: <strong>MTA</strong> (subways/buses inside NYC) and <strong>NJ Transit</strong> (getting you across to New Jersey and to Meadowlands service on event days). You’ll often connect through Penn Station or Secaucus.
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
 Newark (EWR) is typically easiest for MetLife and New Jersey bases. JFK and LaGuardia are in Queens. JFK and EWR both use an AirTrain/airport access system; LaGuardia’s Q70 bus is fare-free.
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
 Rideshare is useful for airports with luggage, but surge pricing after matches can be wild. Driving into Manhattan is a rookie mistake; driving to the stadium can work, but expect heavy exit congestion.
 </p>
 </div>
 </div>
 </div>
 
 <div className=" rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 h-fit">
 <h4 className="font-bold text-2xl mb-6">Airport Reality Check</h4>
 <ul className="space-y-6">
 {[
 { label: "JFK: AirTrain fare", time: "$8.50 (plus subway/LIRR fare)" },
 { label: "LGA: Q70 bus", time: "Fare-free; pay subway fare to continue" },
 { label: "EWR: AirTrain access fee", time: "$8.50 (included in NJT rail ticket)" },
 { label: "Best for MetLife", time: "EWR (usually) + NJ bases" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
 <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
 </li>
 ))}
 </ul>
 <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <AffiliateButton href="https://www.uber.com" text="Open Uber" variant="secondary" icon={Car} />
 </div>
 </div>
 </div>

 <div className="mt-12 p-8 rounded-[2rem] border border-emerald-500/20">
   <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Local transport hacks</h3>
   <ul className="space-y-3 text-slate-700 dark:text-slate-300 font-medium">
     <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> If Penn Station is chaos, consider basing near PATH (Jersey City/Hoboken) so you can access NJ Transit with less Midtown squeeze.</li>
     <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> For LaGuardia, the Q70 is fare-free; your cost is your subway fare once you connect.</li>
     <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> For JFK, the AirTrain fare is separate from subway/LIRR; budget it into every airport run.</li>
     <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> For EWR, the airport rail/AirTrain access fee is included when you buy a ticket to/from the airport station.</li>
   </ul>
 </div>
 </Section>

 <Section id="dining" title="Food & Drink">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
   <p>
     If you only eat in Times Square, you’ll think New York is overrated and expensive. If you eat one great slice, one great dumpling, and one ridiculous deli sandwich, you’ll understand why people never shut up about food here.
   </p>
 </div>

 <div className="grid md:grid-cols-3 gap-8">
   {[
     { title: "Slices (fast + reliable)", desc: "You want speed and consistency. Grab a classic NY slice when you’re running between sights and trains." },
     { title: "Deli culture", desc: "Order like you mean it: pastrami, mustard, pickles. Don’t overthink it—just commit." },
     { title: "Queens eats", desc: "Jackson Heights and Flushing are where locals go when they’re hungry-hungry. Plan a food crawl." }
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

 <div className="mt-10 flex flex-wrap gap-4">
   <AffiliateButton href="https://www.opentable.com/new-york-city-restaurants" text="Reserve NYC Restaurants" variant="primary" icon={Utensils} />
   <AffiliateButton href="https://www.opentable.com/new-jersey-restaurants" text="Reserve NJ Restaurants" variant="outline" icon={Utensils} />
 </div>
 </Section>

 <Section id="hidden-gems" title="Hidden Gems (Locals Actually Do These)">
   <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
     <p>
       The Statue of Liberty is iconic. Also, it can eat half a day. If you’re here for matches, you want experiences that feel like New York without turning your trip into a scheduling spreadsheet.
     </p>
   </div>
   <div className="grid md:grid-cols-2 gap-8">
     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Roosevelt Island Tram</h3>
       <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
         A quick, dramatic skyline ride that feels like a movie scene. It’s not a “tourist attraction” so much as a commuter shortcut that happens to be gorgeous.
       </p>
     </div>
     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Liberty State Park (NJ)</h3>
       <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
         The view back toward Manhattan is unreal. If you want a calmer pregame day with space to breathe, this is it.
       </p>
     </div>
     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Sunset from Hoboken waterfront</h3>
       <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
         NYC has plenty of rooftops. Hoboken gives you the same skyline for the price of… a walk.
       </p>
     </div>
     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">The “bodega breakfast”</h3>
       <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
         This is as New York as it gets: egg-and-cheese on a roll, coffee, and a quick “next!” from behind the counter.
       </p>
     </div>
   </div>
 </Section>

 <Section id="itineraries" title="Day-by-Day Itineraries (Pre, Match, Post)">
   <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
     <p>
       You can do a lot here. The trick is doing the right amount. New York will happily exhaust you. Don’t let it.
     </p>
   </div>

   <div className="grid md:grid-cols-2 gap-8">
     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">3-day “One Match” itinerary</h3>
       <ul className="space-y-3 text-slate-700 dark:text-slate-300 font-medium">
         <li><strong>Day 1:</strong> Midtown walk (Bryant Park → 5th Ave), early dinner, sleep early.</li>
         <li><strong>Day 2 (Match Day):</strong> Big breakfast, train plan, arrive early, post-match hang back then return.</li>
         <li><strong>Day 3:</strong> Lower Manhattan food + neighborhoods; pack and fly.</li>
       </ul>
     </div>
     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">5-day “Do NYC properly” itinerary</h3>
       <ul className="space-y-3 text-slate-700 dark:text-slate-300 font-medium">
         <li><strong>Day 1:</strong> Arrival + easy walk + early night.</li>
         <li><strong>Day 2:</strong> Central Park + museum block + dinner.</li>
         <li><strong>Day 3:</strong> Brooklyn views + neighborhoods + sunset.</li>
         <li><strong>Day 4 (Match Day):</strong> MetLife plan, pregame, match, celebration.</li>
         <li><strong>Day 5:</strong> Hidden gem morning + airport transfer.</li>
       </ul>
     </div>
   </div>

   <div className="mt-10 flex flex-wrap gap-4">
     <AffiliateButton href="https://www.getyourguide.com/new-york-l59/" text="Book NYC Experiences" variant="secondary" icon={Camera} />
     <AffiliateButton href="https://www.viator.com/New-York-City/d687-ttd" text="City Tours & Day Trips" variant="outline" icon={ExternalLink} />
   </div>
 </Section>

 <Section id="attractions" title="Must-Do Classics (If It’s Your First Time)">
 <p className="mb-8 text-xl text-slate-600 dark:text-slate-300">
 New York City is a global icon. While the stadium is in NJ, you'll likely spend your free time exploring Manhattan's legendary sights.
 </p>
 <div className="space-y-6">
 {[
 { title: "Statue of Liberty", desc: "The symbol of freedom. Book ferry tickets months in advance to visit the crown.", color: "text-emerald-500" },
 { title: "Times Square", desc: "The neon heart of the city. Crowded, bright, and essential for a first-time visit.", color: "text-fuchsia-500" },
 { title: "Central Park", desc: "A massive green oasis in the concrete jungle. Perfect for recovering from the city noise.", color: "text-green-600" }
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
 <AffiliateButton href="#" text="Get NYC CityPASS (Save 40%)" variant="primary" />
 </div>
 </Section>

 <Section id="tips" title="Local Hacks (Small Moves, Big Difference)">
   <div className="grid md:grid-cols-2 gap-8">
     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Clock className="w-6 h-6 text-emerald-500"/> Time Savers</h4>
       <ul className="space-y-3 text-slate-600 dark:text-slate-300 font-medium">
         <li>• Don’t stop at the top of subway stairs. People behind you are moving at full speed.</li>
         <li>• On escalators: stand right, walk left. Yes, it matters.</li>
         <li>• Eat before you travel to the stadium. Penn Station food lines can be chaotic.</li>
         <li>• After the match: wait 30–45 minutes if your group prefers calm over speed.</li>
       </ul>
     </div>
     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><DollarSign className="w-6 h-6 text-emerald-500"/> Money Savers</h4>
       <ul className="space-y-3 text-slate-600 dark:text-slate-300 font-medium">
         <li>• LaGuardia’s Q70 bus is fare-free; you only pay for the subway after you connect.</li>
         <li>• The best skyline “viewpoint” is often a waterfront walk in NJ.</li>
         <li>• Skip Midtown souvenir shops. Buy team gear from major retailers online.</li>
         <li>• Use booking platforms with free cancellation, then re-price weekly.</li>
       </ul>
     </div>
   </div>
 </Section>

 <Section id="safety" title="Safety & Security (Big City Rules)">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> Event Patterns</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
   Most visitor-heavy areas are safe, but the risk is usually petty theft in crowds. The main “danger zone” on a match week is distraction: phones out, passports loose, bags unzipped.
 </p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Practical Tips</h4>
 <ul className="space-y-4 text-slate-600 dark:text-slate-300">
 <li>• In Midtown and Penn Station, keep your phone in a front pocket when moving.</li>
 <li>• If a subway car is empty at night, don’t be the only one in it.</li>
 <li>• Don’t take “help” from random people at ticket machines—use official staff.</li>
 <li>• In the Meadowlands, follow official crowd routing; shortcuts can get blocked.</li>
 </ul>
 <div className="mt-6">
 <AffiliateButton href="https://www.worldnomads.com/" text="Get Travel Insurance" variant="secondary" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="culture" title="Local Rules (So You Don’t Look Lost)">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">
   New York moves fast, and it’s not personal. Walk with purpose, don’t block the sidewalk, and remember: the city runs on a thousand tiny courtesies that aren’t announced out loud. Also: tipping matters here (often 18–25% in restaurants).
 </p>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { title: "Language tips", desc: "Uptown/downtown is direction. A “bodega” is a corner store. “To-go” means takeout. “The City” usually means Manhattan." },
 { title: "Transit etiquette", desc: "Stand right, walk left on escalators. Let people off the train first. Move to the center of the subway car." },
 { title: "Stadium culture", desc: "Tailgating is part of the show. If you’re invited to a parking-lot grill, say yes and bring something small." }
 ].map((item, i) => (
 <div key={i} className="p-6 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-2xl">
 <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
 </div>
 ))}
 </div>
 </Section>

 <Section id="packing" title="Weather & Packing (June–July)">
 <div className="grid md:grid-cols-3 gap-6">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Sun className="w-6 h-6 text-amber-500"/> June–July Weather</h4>
 <p className="text-slate-600 dark:text-slate-400">
   Expect heat, humidity, and random storms that blow through like they’re late for a meeting. MetLife is open-air, so you’re exposed: sun, rain, wind—pick your adventure.
 </p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Essentials</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400">
 <li>• Comfortable walking shoes</li>
 <li>• Light rain layer / poncho</li>
 <li>• Portable power bank</li>
 <li>• Sunscreen + hat for open-air stadium</li>
 </ul>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Tech</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-6">
 <li>• US plug adapters (Type A/B)</li>
 <li>• Offline maps</li>
 <li>• eSIM with hotspot</li>
 </ul>
 <AffiliateButton href="https://airalo.tp.st/yF9Qk3Ol" text="Get a US eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <Section id="faq" title="Frequently Asked Questions">
 <div className="space-y-2">
 {[
 { q: "Where is the stadium located?", a: "MetLife Stadium is in East Rutherford, New Jersey (not in NYC). Plan to cross the Hudson River for match day." },
 { q: "What’s the best way to get to MetLife from Manhattan?", a: "NJ Transit from New York Penn Station to Secaucus Junction, then transfer to Meadowlands Station on event service." },
 { q: "Can I take the NYC subway to the stadium?", a: "No. The subway stays in NYC. You’ll use NJ Transit or a car service once you’re headed into New Jersey." },
 { q: "Is it better to stay in Manhattan or New Jersey?", a: "Manhattan is iconic and convenient for sightseeing; Jersey City/Hoboken can be better value with easy NYC access." },
 { q: "Which airport should I fly into?", a: "EWR is often the easiest for MetLife and NJ bases. JFK/LGA are great for NYC, but add cross-city travel." },
 { q: "How early should I arrive for the Final?", a: "Aim to be in the Meadowlands complex 2–3 hours before kickoff. Security and platform queues will be heavy." },
 { q: "What’s the weather like in June/July?", a: "Warm to hot and humid, with occasional thunderstorms. MetLife is open-air, so pack for sun and rain." },
 { q: "Is New York safe for tourists?", a: "Generally yes, but stay alert in crowded areas and keep valuables zipped—especially around Penn and Times Square." },
 { q: "Do I need a car in NYC?", a: "No. Driving is stressful and parking is expensive. Use MTA transit in NYC and NJ Transit for match day." },
 { q: "Where should families stay?", a: "Midtown East, the Upper West Side, and Jersey City waterfront are comfortable, walkable, and transit-friendly." },
 { q: "Where can I eat near the stadium?", a: "The Meadowlands complex has limited options; American Dream across the way offers more choices before/after." },
 { q: "Do I need travel insurance?", a: "If you’re traveling internationally, yes—U.S. medical costs and big-event disruptions can be expensive." }
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
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>Non-Emergency Police</strong> <span>311</span></li>
 <li className="flex justify-between"><strong>Hospital</strong> <span>NYU Langone / Mount Sinai</span></li>
 </ul>
 </div>
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-emerald-500"/> Connectivity</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6">
 <li>• <strong>WiFi:</strong> Free in many parks and subway stations.</li>
 <li>• <strong>Power:</strong> 120V, Type A/B plugs.</li>
 <li>• <strong>Sim Cards:</strong> Available at airports and city stores.</li>
 </ul>
 <AffiliateButton href="#" text="Get an Airalo eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Explore Other Host Cities</h3>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {[
   { name: 'Atlanta', slug: 'world-cup-2026-atlanta-guide' },
   { name: 'Los Angeles', slug: 'world-cup-2026-los-angeles-guide' },
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














