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
  X, ChevronRight, Facebook, Twitter, Linkedin, Copy, Home
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
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Check out this Atlanta World Cup 2026 Guide!";
    
    let shareUrl = "";
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
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
      <div className=" backdrop-blur-md p-2 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col gap-3">
        <button onClick={() => handleShare('twitter')} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors" title="Share on Twitter">
          <Twitter className="w-5 h-5" />
        </button>
        <button onClick={() => handleShare('facebook')} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors" title="Share on Facebook">
          <Facebook className="w-5 h-5" />
        </button>
        <button onClick={() => handleShare('linkedin')} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors" title="Share on LinkedIn">
          <Linkedin className="w-5 h-5" />
        </button>
        <button onClick={handleCopy} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors" title="Copy Link">
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
    outline: "border-2 border-slate-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-900 dark:text-white bg-transparent"
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

const HotelCard = ({ name, rating, price, distance, description, features, image, link }: { name: string, rating: number, price: string, distance: string, description?: string, features: string[], image: string, link: string }) => (
 <div className="group rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-white dark:bg-slate-50 dark:bg-slate-900/50">
 <div className="flex flex-col md:flex-row h-full">
 <div className="relative w-full md:w-2/5 min-h-[250px] overflow-hidden">
 <Image src={image} alt={name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
 <div className="absolute top-4 left-4 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 px-3 py-1.5 rounded-full text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1 shadow-lg">
 <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {rating}
 </div>
 </div>
 <div className="p-8 md:w-3/5 flex flex-col justify-between">
 <div>
 <div className="flex justify-between items-start mb-4">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">{name}</h3>
 <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-lg">{price}</span>
 </div>
 <p className="text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2 font-medium">
 <MapPin className="w-4 h-4 text-emerald-500" /> {distance} to Stadium
 </p>
 {description && (
 <p className="text-slate-600 dark:text-slate-300 mb-6 text-sm leading-relaxed">
 {description}
 </p>
 )}
 <div className="flex flex-wrap gap-2 mb-8">
 {features.map((f, i) => (
 <span key={i} className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-full uppercase tracking-wide">
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

const NAV_LINKS = [
 { id: 'overview', label: 'Overview' },
 { id: 'visa', label: 'Visa & Entry' },
 { id: 'planning', label: 'Planning' },
 { id: 'itinerary', label: 'Itineraries' },
 { id: 'neighborhoods', label: 'Neighborhoods' },
 { id: 'budget', label: 'Budget' },
 { id: 'stadium', label: 'Stadium' },
 { id: 'tips', label: 'Match Day' },
 { id: 'tickets', label: 'Tickets' },
 { id: 'hotels', label: 'Hotels' },
 { id: 'transport', label: 'Transport' },
 { id: 'transport-hacks', label: 'Transport Hacks' },
 { id: 'dining', label: 'Dining' },
 { id: 'attractions', label: 'Attractions' },
 { id: 'hidden-gems', label: 'Hidden Gems' },
 { id: 'safety', label: 'Safety' },
 { id: 'culture', label: 'Culture' },
 { id: 'language', label: 'Local Phrases' },
 { id: 'packing', label: 'Packing' },
 { id: 'faq', label: 'FAQ' },
 { id: 'essential', label: 'Essential' },
];

// --- Main Page Component ---

export default function ClientPage() {
 const { scrollYProgress } = useScroll();
 const scaleX = useSpring(scrollYProgress, {
 stiffness: 100,
 damping: 30,
 restDelta: 0.001
 });

 const [activeSection, setActiveSection] = useState('hero');
 
 useEffect(() => {
  const ids = NAV_LINKS.map((l) => l.id);
  const sections = ids
   .map((id) => document.getElementById(id))
   .filter((el): el is HTMLElement => Boolean(el));

  if (sections.length === 0) return;

  const observer = new IntersectionObserver(
   (entries) => {
    const visible = entries
     .filter((e) => e.isIntersecting)
     .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));

    const next = visible[0]?.target?.id;
    if (next) setActiveSection(next);
   },
   { root: null, rootMargin: '-20% 0px -70% 0px', threshold: [0, 0.1, 0.25, 0.5, 1] }
  );

  sections.forEach((section) => observer.observe(section));
  return () => observer.disconnect();
 }, []);

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
          src="/images/cities/atlanta-world-cup-2026-1600.webp" 
          alt="Mercedes-Benz Stadium Atlanta World Cup 2026" 
          fill 
          className="object-cover object-center"
          priority quality={60} 
          sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-[#0A0A0A]/60 to-[#F5F5F7] dark:to-[#0A0A0A]" />
      </div>
      
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-end md:items-center justify-between gap-12 pt-20">
        <div className="max-w-4xl">
               {/* Breadcrumbs */}
               <Breadcrumb 
                 variant="white"
                 items={[
                   { label: 'Host Cities', href: '/world-cup-2026-host-cities' },
                   { label: 'Atlanta', href: '/world-cup-2026-atlanta-guide' }
                 ]} 
               />

               <motion.div
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
               >
                 <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
              Last Updated: January 6, 2026
            </span>
            <span className="px-3 py-1 rounded-full border border-white/30 text-white text-xs font-medium tracking-widest uppercase backdrop-blur-md">
              Host City
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
              Semi-Final Host
            </span>
          </div>
          
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
Atlanta World Cup 2026 Guide
</h1>
<p className="text-base md:text-lg lg:text-xl text-white/90 font-light max-w-3xl leading-relaxed">
                Matchday logistics, neighborhood intel, and the little Atlanta tricks you only learn by living here.
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
 {NAV_LINKS.map((link) => (
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
 I’ve lived in Atlanta long enough to remember when people still called it “Phillips Arena” and the BeltLine was more rumor than reality. Here’s the truth: Atlanta can feel like a city designed by cars… until you plan the World Cup the Atlanta way. Stay where the sidewalks actually connect, ride MARTA when it makes sense, and keep your nights anchored in neighborhoods that don’t require a 45-minute “quick Uber.”
 </p>
 <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
 This <strong>Atlanta World Cup 2026 guide</strong> is written for fans who want the matchday buzz at Mercedes-Benz Stadium <em>and</em> the version of Atlanta locals love—food that doesn’t apologize, museums that hit you in the chest, and small pockets of calm just outside the Downtown swirl.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
   <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
     <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Quick Answers (Featured Snippet Ready)</h3>
     <ul className="space-y-3 text-slate-600 dark:text-slate-400">
       <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Best base:</strong> Downtown for walkability; Midtown for restaurants + MARTA access.</span></li>
       <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Airport to stadium:</strong> MARTA from ATL → Five Points → Blue/Green line.</span></li>
       <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Car needed?</strong> Not if you’re Downtown/Midtown. Parking and traffic are the real opponent.</span></li>
       <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Weather:</strong> Hot, humid, and thunderstormy outside; the stadium is climate-controlled.</span></li>
     </ul>
     <div className="mt-6 flex flex-wrap gap-3">
       <Link href="/mercedes-benz-stadium-world-cup-2026" className="inline-flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
         <Trophy className="w-5 h-5" />
         Mercedes-Benz Stadium Guide
       </Link>
       <Link href="/world-cup-2026-flight-booking-guide" className="inline-flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
         <Plane className="w-5 h-5" />
         Flight Strategy Guide
       </Link>
     </div>
   </div>
 
   <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
     <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">The “Atlanta Works” Rule</h3>
     <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
       Atlanta is a city of “pockets.” If your hotel is in the right pocket, your trip feels effortless. If it’s in the wrong pocket, you’ll spend the tournament staring at taillights on I-75/85 (locals call it <em>the Connector</em> for a reason).
     </p>
     <div className="grid grid-cols-2 gap-4">
       {[
         { label: "Walkable Matchday", val: "Downtown / Centennial Park" },
         { label: "Food + Nightlife", val: "Midtown / BeltLine Eastside" },
         { label: "Upscale Comfort", val: "Buckhead (MARTA-accessible)" },
         { label: "Family Base", val: "Decatur / VaHi" }
       ].map((row, i) => (
         <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-200 dark:border-slate-800">
           <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400">{row.label}</div>
           <div className="font-bold text-slate-900 dark:text-white mt-1">{row.val}</div>
         </div>
       ))}
     </div>
     <div className="mt-6">
       <Link href="/world-cup-2026-accommodation-guide" className="inline-flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
         <Hotel className="w-5 h-5" />
         How to Book World Cup Hotels (Safely)
       </Link>
     </div>
   </div>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: MapPin, title: "Where to Base", text: "Downtown is the easiest matchday—walk, grab a drink, done. Midtown is the better ‘real Atlanta’ base with quick MARTA access." },
 { icon: Train, title: "Transport Strategy", text: "Use MARTA for airport + matchdays. Save rideshare for late nights or neighborhood jumps you can’t rail." },
 { icon: DollarSign, title: "Budget Signals", text: "Atlanta is mid-range by US host city standards, but semi-final demand will bend prices upward. Book refundable early, then re-shop." }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] transition-colors">
 <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
 <AffiliateButton href="https://www.skyscanner.com/flights-to/atl/cheap-flights-to-hartsfield-jackson-atlanta-international-airport.html" text="Compare Flights to ATL" variant="secondary" icon={Plane} />
 <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Downtown+Atlanta&nflt=di%3D953&aid=8063172" text="Check Downtown Hotels" variant="primary" icon={Hotel} />
 <AffiliateButton href="/world-cup-2026-travel-insurance-guide" text="Travel Insurance Checklist" variant="outline" icon={Shield} />
 </div>
 </Section>

 <Section id="visa" title="Visa & Entry (USA)">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Who Needs a Visa?</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
 Many travelers can enter the US under the Visa Waiver Program with an approved <strong>ESTA</strong>. If you’re not eligible, you’ll need a <strong>B-2 tourist visa</strong>. Don’t guess based on a friend’s passport—check the official rules and apply early. In tournament years, appointment calendars fill fast.
 </p>
 <AffiliateButton href="https://esta.cbp.dhs.gov/" text="Official ESTA Site" variant="outline" />
 </div>
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Arrival Tips</h4>
 <ul className="space-y-4 mb-8">
 {[
   'Keep your match tickets + hotel confirmations easily accessible (digital + screenshot).',
   'Carry an address for your first night (hotel or host) for arrival questions.',
   'If you have connections, leave yourself real buffer time—ATL can be smooth or chaotic.'
 ].map((item, i) => (
 <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
 <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
 </li>
 ))}
 </ul>
 <div className="space-y-3">
   <AffiliateButton href="/world-cup-2026-travel-insurance-guide" text="Travel Insurance: What to Cover" variant="secondary" />
   <p className="text-xs text-slate-500 dark:text-slate-400">
     For the World Cup, prioritize medical coverage, trip delay, and event-related disruptions.
   </p>
 </div>
 </div>
 </div>
 </Section>

 <Section id="planning" title="Planning Timeline">
 <div className="space-y-6">
 {[
 { time: "6–9 Months Out", desc: "Book flights and refundable hotels in Downtown/Midtown. Set price alerts. If traveling multi-city, plan open-jaw tickets." },
 { time: "3–6 Months Out", desc: "Confirm match tickets. Reserve airport transfers and key restaurants near the stadium and Ponce City Market." },
 { time: "1–3 Months Out", desc: "Lock in eSIMs, clear stadium bags, and day trips. Re-price hotels weekly; big events often trigger cancellations." }
 ].map((item, i) => (
 <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center">
 <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
 <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
 </div>
 ))}
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
 <AffiliateButton href="https://www.google.com/travel/flights" text="Set Flight Alerts" variant="primary" icon={Plane} />
 <AffiliateButton href="https://www.opentable.com/atlanta-restaurants" text="Reserve Restaurant Tables" variant="outline" />
 </div>
 </Section>

 <Section id="itinerary" title="Day-by-Day Itineraries (Built Around Kickoff)">
   <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
     <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
       You don’t need a 12-stop checklist to “do Atlanta.” You need a plan that respects heat, distances, and that magical moment when MARTA becomes the most beautiful thing you’ve ever seen. Here are three itineraries I’d genuinely recommend to a friend flying in for a match.
     </p>
   </div>

   <div className="grid lg:grid-cols-3 gap-8">
     {[
       {
         title: "2-Day Sprint (Match-Centric)",
         badge: "Best for: quick trips",
         days: [
           { day: "Day 1 (Arrive)", plan: "Check in Downtown, sunset walk at Centennial Olympic Park, dinner at Ponce City Market (Uber there, MARTA back if you’re feeling brave), early night." },
           { day: "Day 2 (Match Day)", plan: "Brunch in Downtown/Midtown, hydrate, pre-game at a sports bar near the stadium, match, then post-match drinks in Midtown (avoid getting stranded Downtown late)." }
         ]
       },
       {
         title: "4-Day Sweet Spot (Atlanta Done Right)",
         badge: "Best for: first-timers",
         days: [
           { day: "Day 1", plan: "Midtown base, Piedmont Park + Atlanta Botanical Garden, dinner on the BeltLine Eastside Trail." },
           { day: "Day 2", plan: "Civil rights morning (MLK National Historical Park area), Sweet Auburn lunch, evening at Krog Street Market." },
           { day: "Day 3 (Match Day)", plan: "Light museum or coffee run, early stadium arrival, match, then celebratory night in Midtown or East Atlanta Village." },
           { day: "Day 4", plan: "Buford Highway food crawl (no, seriously) + a low-key afternoon at Oakland Cemetery or the High Museum." }
         ]
       },
       {
         title: "7-Day Deep Cut (City + Day Trips)",
         badge: "Best for: families & groups",
         days: [
           { day: "Day 1–2", plan: "Settle in, Downtown attractions (Aquarium / World of Coca-Cola), keep your walking days early before the heat spikes." },
           { day: "Day 3", plan: "BeltLine day: Ponce City Market → Krog Street Market, with ice cream breaks and people-watching." },
           { day: "Day 4 (Match Day)", plan: "Match-focused schedule with a long, slow pre-game meal and a clean exit plan." },
           { day: "Day 5", plan: "Day trip options: Stone Mountain (sunrise is worth it) or Decatur for an easier-paced family day." },
           { day: "Day 6", plan: "Museum pick: High Museum or the National Center for Civil and Human Rights. Dinner in Inman Park." },
           { day: "Day 7", plan: "Brunch, souvenirs, and fly out with your legs still intact." }
         ]
       }
     ].map((it, i) => (
       <div key={i} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-2xl transition-all duration-300">
         <div className="flex items-start justify-between gap-6 mb-6">
           <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{it.title}</h3>
         </div>
         <p className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-6">{it.badge}</p>
         <div className="space-y-5">
           {it.days.map((d, j) => (
             <div key={j} className="border-l-2 border-emerald-500/40 pl-4">
               <div className="font-bold text-slate-900 dark:text-white">{d.day}</div>
               <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{d.plan}</div>
             </div>
           ))}
         </div>
       </div>
     ))}
   </div>

   <div className="mt-10 flex flex-wrap gap-4">
   <AffiliateButton href="https://www.opentable.com/atlanta-restaurants" text="Reserve Dinner (Opentable)" variant="primary" icon={Utensils} />
   <AffiliateButton href="https://www.getyourguide.com/atlanta-l503/" text="Browse Atlanta Experiences" variant="outline" icon={Camera} />
  </div>
 </Section>

 <Section id="neighborhoods" title="Neighborhood-by-Neighborhood: Where to Stay, Eat, Drink">
   <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
     <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
       If you only read one thing: Atlanta is not a “pick any hotel and wing it” city. Neighborhood choice decides your entire trip—matchday stress, late-night safety, and whether you’ll actually see Atlanta beyond the stadium perimeter.
     </p>
   </div>

   <div className="grid md:grid-cols-2 gap-8">
     {[
       {
         name: "Downtown / Centennial Park",
         bestFor: "Walk-to-stadium convenience",
         transit: "Walk + MARTA (Blue/Green nearby)",
         vibe: "Event energy, big hotels, tourist attractions",
         localMove: "Eat Downtown early, then hop to Midtown/BeltLine for your ‘real’ Atlanta nights."
       },
       {
         name: "Midtown",
         bestFor: "Restaurants + nightlife with structure",
         transit: "MARTA Red/Gold + quick transfers",
         vibe: "Polished, busy, safe-feeling streets near Piedmont Park",
         localMove: "Post-match, Midtown is the easiest place to keep the night going without chaos."
       },
       {
         name: "Old Fourth Ward + BeltLine Eastside",
         bestFor: "Food halls, bars, and walking paths",
         transit: "Rideshare / scooters; MARTA is doable but indirect",
         vibe: "Modern Atlanta: patios, murals, people everywhere",
         localMove: "Plan a late afternoon BeltLine stroll—Atlanta’s best ‘free attraction.’"
       },
       {
         name: "Inman Park / Krog District",
         bestFor: "Couples, food lovers, chill-but-fun nights",
         transit: "Short rideshare to Downtown; walkable pockets",
         vibe: "Historic streets + modern dining",
         localMove: "Perfect pre-match base for a long meal that doesn’t feel rushed."
       },
       {
         name: "Buckhead",
         bestFor: "Luxury stays + shopping",
         transit: "MARTA Red/Gold straight shot to Downtown",
         vibe: "Upscale, spread out, comfortable",
         localMove: "Great if you’re mixing World Cup with business or want a quieter sleep."
       },
       {
         name: "Decatur",
         bestFor: "Families + relaxed evenings",
         transit: "MARTA (Blue line corridor) + easy walks",
         vibe: "Small-city feel inside a big city trip",
         localMove: "If you’re traveling with kids, Decatur keeps the trip calm without feeling boring."
       }
     ].map((n, i) => (
       <div key={i} className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
         <div className="flex items-start justify-between gap-6 mb-4">
           <h3 className="text-2xl font-black text-slate-900 dark:text-white">{n.name}</h3>
         </div>
         <div className="flex flex-wrap gap-2 mb-6">
           <span className="text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">{n.bestFor}</span>
           <span className="text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300">{n.vibe}</span>
         </div>
         <div className="space-y-3 text-slate-600 dark:text-slate-400">
           <div className="flex items-start gap-3"><Train className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Transit:</strong> {n.transit}</span></div>
           <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Local move:</strong> {n.localMove}</span></div>
         </div>
       </div>
     ))}
   </div>

   <div className="mt-10 flex flex-wrap gap-4">
   <AffiliateButton href="https://www.booking.com/city/us/atlanta.html?aid=8063172" text="Search Neighborhood Hotels" variant="primary" icon={Hotel} />
   <AffiliateButton href="https://www.vrbo.com/" text="Browse Apartments & Group Stays" variant="outline" icon={Home} />
  </div>
 </Section>

 <Section id="budget" title="Budget Tiers">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Budget", items: ["$80–$180 food + transit per day (smart choices)", "MARTA rides ($2.50 each) instead of constant Ubers", "Free wins: BeltLine, Piedmont Park, street art"], note: "Best move: stay Midtown/Decatur and use MARTA + rideshare sparingly." },
 { title: "Mid-Range", items: ["$200–$350/night hotel on non-peak dates (can spike)", "One paid attraction/day (Aquarium, museums)", "Restaurants + a proper cocktail bar"], note: "Best move: Downtown for match convenience, Midtown for nights." },
 { title: "Luxury", items: ["$400–$800+/night in Buckhead or premium Downtown suites", "Private transfers for airport + late nights", "VIP hospitality and curated dining"], note: "Best move: pay for time, not distance—choose proximity and flexibility." }
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
 <p className="mt-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{tier.note}</p>
 </div>
 ))}
 </div>
 <div className="mt-8 text-center">
  <AffiliateButton href="https://www.expedia.com/Atlanta-Vacation-Packages.d178232.Travel-Assets-Vacation-Packages" text="Search Atlanta Packages" variant="secondary" icon={Briefcase} />
 </div>
 </Section>

 <Section id="stadium" title="Mercedes-Benz Stadium">
 <LightboxImage 
          src="/images/stadiums/mercedes-benz-stadium-atlanta-world-cup-2026-1600.webp" 
          alt="Mercedes-Benz Stadium Interior" 
          caption="The stunning 'Halo' board at Mercedes-Benz Stadium."
        />

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 Widely considered one of the most technologically advanced stadiums in the world, <strong>Mercedes-Benz Stadium</strong> is the crown jewel of Atlanta’s sports scene. The camera-shutter roof, the 360-degree “Halo” board, and the overall layout make it feel more like a futuristic arena than a typical US football stadium.
 </p>
 <p>
 For World Cup travel planning, the most important detail is simple: the stadium is in the city core, at <strong>1 AMB Dr NW, Atlanta, GA 30313</strong>. That puts you within a short walk of Centennial Olympic Park, major hotels, and MARTA rail stations—rare in America, and a massive win for visitors.
 </p>
 <p>
 A few matchday realities: the stadium is <strong>cashless</strong>, entry is faster if you don’t bring a bag, and if you must bring one, stick to the clear-bag dimensions published by the stadium. The air inside will feel dramatically cooler than outside in June/July, so don’t be surprised if you’re sweating on the plaza and reaching for a light layer in your seat.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Key Features</h4>
 <ul className="space-y-4">
 {[
  { label: "Capacity", val: "~71,000 (Expandable)" },
  { label: "Surface", val: "Artificial Turf (Likely Grass for WC)" },
  { label: "Roof", val: "Retractable 'Camera Shutter'" },
  { label: "Built", val: "2017 ($1.6 Billion)" }
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
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Concessions: “Fan Friendly Pricing” is famous here, but World Cup pricing can differ.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Comfort: Climate-controlled interior, which is non-negotiable in an Atlanta summer.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Arrival: Treat 90–120 minutes before kickoff as normal, not “early.”</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Bag policy: Clear bags up to 12” x 6” x 12”; small clutch up to 4.5” x 6.5”.</li>
 </ul>
 </div>
 </div>
 
 <div className="p-8 rounded-[2rem] border border-emerald-500/20">
 <p className="text-lg text-center font-medium text-emerald-800 dark:text-emerald-200">
  <strong>Getting There:</strong> Unlike many US stadiums, Mercedes-Benz Stadium is located directly in the city center. The <strong>MARTA train</strong> stops right at the venue (Dome/GWCC/Philips Arena/CNN Center Station).
 </p>
 </div>
 
 <div className="mt-10 flex flex-wrap gap-4">
   <AffiliateButton href="https://www.mercedesbenzstadium.com/guidelines" text="Read Official Stadium Rules" variant="outline" icon={Info} />
   <AffiliateButton href="https://parking.mercedesbenzstadium.com/" text="Book Official Parking" variant="secondary" icon={Car} />
   <AffiliateButton href="https://spothero.com/destination/atlanta/mercedes-benz-stadium-parking" text="Compare Parking Deals" variant="primary" icon={Car} />
 </div>
 </Section>

 <Section id="tips" title="Match Day Gameplan">
 <div className="grid md:grid-cols-3 gap-6 mb-8">
 {[
 { title: "Arrival", text: "Aim to be on the plaza 90–120 minutes early. For MARTA, GWCC/CNN Center is the cleanest drop; Vine City can be faster but gets packed." },
 { title: "Clear Bag", text: "If you bring a bag, keep it simple: clear bag up to 12” x 6” x 12”, or a small clutch up to 4.5” x 6.5”. The less you carry, the faster you’re inside." },
 { title: "Exit Plan", text: "Let the first wave go. Linger 10–15 minutes, then move with purpose. If rideshare is your plan, walk a few blocks first to beat surge + gridlock." }
 ].map((item, i) => (
 <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="flex flex-wrap gap-4">
 <AffiliateButton href="https://www.amazon.com/s?k=clear+stadium+bag" text="Buy Clear Stadium Bag" variant="primary" />
 <AffiliateButton href="https://www.amazon.com/s?k=collapsible+water+bottle" text="Add Refillable Bottle" variant="outline" />
 </div>
 
 <div className="mt-12 grid md:grid-cols-2 gap-8">
   <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
     <h4 className="font-bold text-2xl mb-6 flex items-center gap-3"><Clock className="w-6 h-6 text-emerald-500" /> Matchday Timeline (My No-Stress Version)</h4>
     <ul className="space-y-4 text-slate-600 dark:text-slate-400">
       <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" /><span><strong>T-4 hours:</strong> Big lunch + water. Atlanta heat turns “one drink” into “why am I dizzy?” fast.</span></li>
       <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" /><span><strong>T-2 hours:</strong> MARTA/walk to the stadium district. Take photos outside before you’re herded into lines.</span></li>
       <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" /><span><strong>T-90 mins:</strong> Security + scan. Don’t fight it—this is when the energy is best anyway.</span></li>
       <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" /><span><strong>Final whistle:</strong> Decide: MARTA now, or celebrate first and leave later. Both can be correct.</span></li>
     </ul>
   </div>
 
   <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
     <h4 className="font-bold text-2xl mb-6 flex items-center gap-3"><Users className="w-6 h-6 text-emerald-500" /> Fan Zones & Watch Parties</h4>
     <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
       Big tournaments turn Centennial Olympic Park into an unofficial living room—expect screens, sponsor pop-ups, and crowds that swell around transit nodes. If you’re watching without tickets, pick one “home base” bar and arrive early.
     </p>
     <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
       <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Downtown:</strong> easiest for big crowds and post-game walking.</span></div>
       <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Midtown:</strong> better for a cleaner “night out” after the match.</span></div>
       <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>BeltLine:</strong> fun but logistically trickier—plan your return.</span></div>
     </div>
   </div>
 </div>
 
 </Section>

 <Section id="tickets" title="Schedule & Tickets">
 <div className="bg-emerald-900 dark:bg-emerald-950 text-slate-900 dark:text-white rounded-[2.5rem] p-8 md:p-12 mb-12 relative overflow-hidden shadow-2xl">
 <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[150px] opacity-20"></div>
 <div className="relative z-10">
 <div className="flex items-center gap-4 mb-8">
 <Ticket className="w-8 h-8 text-emerald-400" />
 <h3 className="text-3xl font-black">Match Allocation (Atlanta)</h3>
 </div>
 <div className="space-y-6">
 {[
 { stage: "Group Stage", count: "5 Matches", color: "text-emerald-300" },
 { stage: "Round of 32", count: "1 Match", color: "text-emerald-300" },
 { stage: "Round of 16", count: "1 Match", color: "text-emerald-300" },
 { stage: "Semi-Final", count: "1 Match", color: "text-amber-400" }
 ].map((match, i) => (
  <div key={i} className="flex items-center justify-between border-b border-white/10 pb-4">
   <span className={`font-mono text-lg ${match.color}`}>{match.stage}</span>
   <span className="font-bold text-xl">{match.count}</span>
  </div>
 ))}
 </div>
 <p className="mt-8 text-sm text-emerald-100/90 leading-relaxed">
   Exact dates and kickoffs are published by FIFA closer to the tournament. Plan your trip around the neighborhood strategy first (Downtown/Midtown), then lock the calendar once the official schedule drops.
 </p>
 </div>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8">
  <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
   <h4 className="font-bold text-2xl mb-4">Official Tickets</h4>
   <p className="text-slate-600 dark:text-slate-400 mb-8">
    The safest way to buy tickets is through the official FIFA portal. Registration typically opens 12-18 months before the tournament.
   </p>
   <AffiliateButton href="https://www.fifa.com/tickets" text="FIFA Ticketing Portal" variant="secondary" />
   <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">Always verify the URL is exactly fifa.com.</p>
  </div>
  <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
   <h4 className="font-bold text-2xl mb-4">Resale Market</h4>
   <p className="text-slate-600 dark:text-slate-400 mb-8">
    Missed the draw? Trusted resale platforms offer verified tickets, though prices will be higher for high-demand matches like the Semi-Final.
   </p>
   <AffiliateButton href="https://www.stubhub.com/atlanta-tickets/geography/180/" text="Check StubHub" variant="primary" />
  </div>
 </div>
 </Section>

 <Section id="hotels" title="Where to Stay">
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl leading-relaxed">
 Atlanta is one of the rare US host-city setups where you can genuinely do a “wake up, coffee, walk to a World Cup match” day without planning your life around parking. The cheat code is staying <strong>Downtown</strong> (Centennial Park area) or <strong>Midtown</strong> (better for restaurants and nightlife, still easy on MARTA).
 </p>

 <div className="grid md:grid-cols-2 gap-8 mb-12">
   <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
     <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Pick Your Base</h3>
     <ul className="space-y-4 text-slate-600 dark:text-slate-400">
       <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Downtown:</strong> easiest matchday logistics and early mornings at the Aquarium/park.</span></li>
       <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Midtown:</strong> best overall “Atlanta trip” feel; MARTA access + late-night options.</span></li>
       <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Buckhead:</strong> upscale and comfortable; still workable via MARTA, just less walkable.</span></li>
       <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Decatur:</strong> family-friendly and calmer nights; you trade a little convenience for sanity.</span></li>
     </ul>
   </div>
   <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
     <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Hotel Booking Rule (Tournament Edition)</h3>
     <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
       Atlanta rates can swing hard around major event weekends. My approach: lock a refundable booking early, then keep re-checking prices as your trip firms up. If you see a good deal, rebook and cancel the old one.
     </p>
     <Link href="/world-cup-2026-accommodation-security" className="inline-flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
       <Shield className="w-5 h-5" />
       Avoid Cancellations & Accommodation Scams
     </Link>
   </div>
 </div>
 
 <div className="space-y-8">
  <HotelCard 
            name="Hyatt Place Atlanta Downtown"
            rating={8.4}
            price="~$99/night"
            distance="0.7 miles"
            description="Top-value pick with free breakfast and spacious rooms near the Aquarium."
            features={["Free Breakfast", "Free WiFi", "Pet Friendly"]}
            image="/images/hotels/atlanta/hyatt-place-v3.jpg" 
            link="https://www.booking.com/hotel/us/hyatt-place-atlanta-downtown.html?aid=8063172"
          />
          <HotelCard 
            name="SpringHill Suites by Marriott Atlanta Downtown"
            rating={8.8}
            price="~$106/night"
            distance="0.8 miles"
            description="Highly rated all-suite hotel with modern amenities and great city views."
            features={["All-Suite", "Fitness Center", "Free Breakfast"]}
            image="/images/hotels/atlanta/springhill-suites.jpg"
            link="https://www.booking.com/hotel/us/springhill-suites-by-marriott-atlanta-downtown.html?aid=8063172"
          />
          <HotelCard 
            name="Reverb by Hard Rock Atlanta Downtown"
            rating={8.7}
            price="~$129/night"
            distance="0.4 miles"
            description="Stylish, music-themed hotel steps from the stadium with a rooftop bar."
            features={["Rooftop Bar", "Stadium Views", "Pet Friendly"]}
            image="/images/hotels/atlanta/reverb-hard-rock.jpg"
            link="https://www.booking.com/hotel/us/reverb-by-hard-rock-atlanta-downtown.html?aid=8063172"
          />
 </div>
 
 <div className="mt-12 text-center">
 <AffiliateButton href="https://www.booking.com/city/us/atlanta.html?aid=8063172" text="Search All Atlanta Hotels" variant="outline" />
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
 <h4 className="font-bold text-xl mb-2">MARTA (Train)</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 MARTA is your best friend on matchdays. The Gold and Red lines run directly from the Airport to Downtown (Five Points). From there, connect to Blue/Green for the stadium-area stations. Standard fare is $2.50 for a one-way trip.
 </p>
 <div className="mt-4">
   <AffiliateButton href="https://itsmarta.com/fare-programs.aspx" text="Check MARTA Fares (Official)" variant="outline" icon={ExternalLink} />
 </div>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
 <Plane className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Airport Transfer</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 ATL is huge, but the good news is the MARTA station is connected to the airport. If you’re staying Downtown/Midtown for the World Cup, MARTA is usually faster than a car once you factor in traffic and surge pricing.
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
 Traffic in Atlanta is notorious. Avoid renting a car if you’re staying Downtown or Midtown. Uber/Lyft work well for neighborhood hops, but prices surge hard around kickoff and the final whistle.
 </p>
 </div>
 </div>
 </div>
 
 <div className=" rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 h-fit">
 <h4 className="font-bold text-2xl mb-6">Distance to Stadium</h4>
 <ul className="space-y-6">
 {[
 { label: "Downtown Hotels", time: "5-15 min walk" },
 { label: "Midtown", time: "10 min train" },
 { label: "Buckhead", time: "20 min train" },
 { label: "Airport (ATL)", time: "20 min train" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
 <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
 </li>
 ))}
 </ul>
 <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <AffiliateButton href="https://www.uber.com/" text="Book Airport Transfer" variant="secondary" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="transport-hacks" title="Transportation Hacks Locals Actually Use">
   <div className="grid md:grid-cols-2 gap-8">
     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">MARTA Strategy (Airport → Match → Night Out)</h3>
       <ul className="space-y-4 text-slate-600 dark:text-slate-400">
         <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>ATL to city:</strong> ride MARTA out of the airport, then decide Downtown vs Midtown based on your hotel.</span></li>
         <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Matchday station choice:</strong> GWCC/CNN Center is straightforward; Vine City can be faster but gets crushed after matches.</span></li>
         <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Post-match move:</strong> don’t be a hero—if trains are packed, hang back 10–15 minutes and let the first rush pass.</span></li>
       </ul>
       <div className="mt-6">
         <Link href="/world-cup-2026-transportation-safety" className="inline-flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
           <Shield className="w-5 h-5" />
           Transport Safety Guide (World Cup)
         </Link>
       </div>
     </div>

     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Rideshare Tricks</h3>
       <ul className="space-y-4 text-slate-600 dark:text-slate-400">
         <li className="flex items-start gap-3"><DollarSign className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Beat surge:</strong> walk 10–15 minutes away from the stadium district before requesting.</span></li>
         <li className="flex items-start gap-3"><Clock className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Time your ride:</strong> leaving 20 minutes after the final whistle often costs less than leaving at minute 90.</span></li>
         <li className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Don’t take “discount rides”:</strong> only use in-app pickups and official zones.</span></li>
       </ul>
       <div className="mt-8 flex flex-wrap gap-4">
         <AffiliateButton href="https://www.uber.com/" text="Open Uber" variant="secondary" icon={Car} />
         <AffiliateButton href="https://www.rentalcars.com/" text="Compare Rental Cars" variant="outline" icon={Car} />
       </div>
     </div>
   </div>
 </Section>

 <Section id="dining" title="Food & Drink">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
   <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
     Atlanta eats like a city that’s had the world passing through it for decades. Southern classics are here (and yes, they’re worth it), but the real flex is how quickly you can pivot from soul food to Korean barbecue to tacos that’ll make you question your life choices.
   </p>
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
   {[
     { title: "Southern Staples", desc: "If you want ‘Atlanta on a plate,’ start with Mary Mac’s Tea Room. It’s old-school, unapologetic, and exactly the kind of place locals bring relatives to." },
     { title: "Classic Atlanta Chaos", desc: "The Varsity is loud, fast, and slightly ridiculous—in a good way. Go once. Order something you’ll regret later. That’s the point." },
     { title: "Food Hall for Groups", desc: "Ponce City Market is the easiest win for groups with mixed tastes. Start on the BeltLine, end with something sweet, and call it a perfect Atlanta evening." },
     { title: "BeltLine Bar Hopping", desc: "The BeltLine Eastside Trail is a choose-your-own-adventure: patios, cocktails, and people-watching. It’s a whole vibe, especially after a match." },
     { title: "Buford Highway Food Crawl", desc: "If you’re hunting the best ‘only in Atlanta’ meal, go to Buford Highway. It’s international Atlanta, and it’s unbeatable." },
     { title: "Late-Night Bite Strategy", desc: "After a match, Downtown options thin out fast. Midtown and the BeltLine neighborhoods keep feeding you later into the night." }
   ].map((item, i) => (
     <div key={i} className="p-8 rounded-[2rem] shadow-lg border border-slate-200 dark:border-slate-200 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300">
       <div className="w-12 h-12 rounded-full flex items-center justify-center text-emerald-600 mb-6">
         <Utensils className="w-6 h-6" />
       </div>
       <h4 className="font-bold text-xl mb-3">{item.title}</h4>
       <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
     </div>
   ))}
 </div>

 <div className="mt-10 flex flex-wrap gap-4">
   <AffiliateButton href="https://www.opentable.com/atlanta-restaurants" text="Book Restaurants (OpenTable)" variant="primary" icon={Utensils} />
   <AffiliateButton href="/world-cup-2026-food-dining-guide" text="World Cup Food & Dining Guide" variant="outline" icon={ArrowRight} />
 </div>
 </Section>

 <Section id="attractions" title="Top Attractions">
 <p className="mb-8 text-xl text-slate-600 dark:text-slate-300">
 Most of Atlanta’s “first-timer” attractions cluster around Centennial Olympic Park—easy wins before a match. But the best Atlanta memories usually happen a little farther out: the BeltLine, the neighborhoods, and the museums that tell the city’s real story.
 </p>
 <div className="space-y-6">
 {[
 { title: "Georgia Aquarium", desc: "One of the largest aquariums in the world. See whale sharks and beluga whales.", color: "text-blue-500" },
 { title: "World of Coca-Cola", desc: "Taste over 100 beverages from around the world and learn the history of the iconic brand.", color: "text-red-500" },
 { title: "National Center for Civil and Human Rights", desc: "A powerful museum dedicated to the civil rights movement and modern human rights struggles.", color: "text-emerald-500" }
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
 <AffiliateButton href="https://www.citypass.com/atlanta" text="Get Atlanta CityPASS (Save 40%)" variant="primary" />
 </div>
 </Section>

 <Section id="hidden-gems" title="Hidden Gems (Local Favorites)">
   <div className="grid md:grid-cols-2 gap-8">
     {[
       {
         title: "Oakland Cemetery",
         desc: "A quiet, beautiful pocket that feels miles away from the stadium crowds. Great for a calm morning walk and skyline views."
       },
       {
         title: "BeltLine Eastside Trail at Golden Hour",
         desc: "If you want one ‘Atlanta’ photo that doesn’t look like every other travel guide, this is it. Start near Ponce City Market and wander."
       },
       {
         title: "Sweet Auburn / MLK Historic Area",
         desc: "Atlanta’s heartbeat. Give it time, don’t rush it, and go with a respectful mindset. It’s not a box to tick."
       },
       {
         title: "Buford Highway",
         desc: "The most ‘Atlanta’ food corridor there is. Bring friends, split plates, and don’t overthink it."
       }
     ].map((g, i) => (
       <div key={i} className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
         <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{g.title}</h3>
         <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{g.desc}</p>
       </div>
     ))}
   </div>
  <div className="mt-10 flex flex-wrap gap-4">
    <AffiliateButton href="https://www.getyourguide.com/atlanta-l503/" text="Book Atlanta Tours" variant="primary" icon={Camera} />
    <AffiliateButton href="/world-cup-2026-itinerary-planning" text="Build Your Multi-City Itinerary" variant="outline" icon={ArrowRight} />
  </div>
 </Section>

 <Section id="safety" title="Safety & Security">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> Event Patterns</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Matchdays concentrate crowds around the park and MARTA stations. Stick to lit routes, travel in small groups, and use official platforms.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Practical Tips</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>• Keep valuables front-facing on trains.</li>
 <li>• Use rideshare pickup zones; avoid unofficial touts.</li>
 <li>• Save local emergency contacts offline.</li>
 <li>• If you feel the street emptying out, follow the crowd back toward lit main roads.</li>
 <li>• Avoid wandering into unfamiliar blocks late at night just because they look “close” on a map.</li>
 </ul>
 <div className="mt-6">
 <AffiliateButton href="https://www.worldnomads.com/" text="Get Travel Insurance" variant="secondary" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="culture" title="Cultural Intelligence">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">
   Atlanta blends Southern hospitality with global influence—and it’s more “neighborhood city” than visitors expect. Tipping norms: 18–22% in restaurants and bars. Casual dress works almost everywhere, but you’ll see people turn it up at night in Midtown and Buckhead.
 </p>
 <div className="grid md:grid-cols-3 gap-6">
 {[
  { title: "Fan Zones", desc: "Expect pop-up screens and sponsor activations near the park; early arrival secures better sightlines." },
  { title: "Dining Etiquette", desc: "Reservations recommended weekends. Share plates common in market halls. Bar tips per drink appreciated." },
  { title: "Nightlife Rhythm", desc: "Midtown and BeltLine bars fill up post-match. Last calls vary; plan transport before midnight." }
 ].map((item, i) => (
 <div key={i} className="p-6 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-2xl">
 <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
 </div>
 ))}
 </div>
 </Section>

 <Section id="language" title="Local Phrases & Atlanta-isms">
   <div className="grid md:grid-cols-2 gap-8">
     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Things You’ll Hear</h3>
       <ul className="space-y-4 text-slate-600 dark:text-slate-400">
         <li className="flex items-start gap-3"><MessageSquare className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>“Y’all”</strong> is plural and useful. Use it. You’re allowed.</span></li>
         <li className="flex items-start gap-3"><MessageSquare className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>“The Connector”</strong> is I-75/85 through Downtown. If it’s red on maps, believe it.</span></li>
         <li className="flex items-start gap-3"><MessageSquare className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>“OTP”</strong> means “outside the perimeter” (outside I-285). It can feel like another planet.</span></li>
         <li className="flex items-start gap-3"><MessageSquare className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>“Peachtree”</strong> is… everything. Streets, buildings, neighborhoods. Double-check addresses.</span></li>
       </ul>
     </div>
     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Small Cultural Notes</h3>
       <ul className="space-y-4 text-slate-600 dark:text-slate-400">
         <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span>People will talk to you in lines. It’s normal. You don’t have to be suspicious.</span></li>
         <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span>“Bless your heart” can be kind… or it can be a soft knockout punch. Context matters.</span></li>
         <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span>Atlanta loves brunch like it’s a sport. Book ahead on weekends.</span></li>
       </ul>
     </div>
   </div>
 </Section>

 <Section id="packing" title="Climate & Packing">
 <div className="grid md:grid-cols-3 gap-6">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Sun className="w-6 h-6 text-amber-500"/> June–July Weather</h4>
 <p className="text-slate-600 dark:text-slate-400">
   Hot, humid, and stormy at random times. The stadium is climate-controlled, and indoor A/C in Atlanta is aggressive. Dress for summer outside and “mild fall” inside.
 </p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Essentials</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400">
 <li>• Water-resistant RFID wallet</li>
 <li>• Clear stadium bag</li>
 <li>• Portable power bank</li>
 <li>• A light layer for indoor A/C</li>
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
  { q: "Where is the stadium located?", a: "Mercedes-Benz Stadium is in downtown Atlanta, next to the Georgia World Congress Center and Centennial Olympic Park." },
  { q: "Is Atlanta safe for tourists?", a: "Downtown and Midtown are generally safe, especially during major events. As in any big city, stay aware of your surroundings." },
  { q: "Do I need a car in Atlanta?", a: "If you are staying Downtown or Midtown for the World Cup, NO. MARTA covers key routes efficiently and parking is expensive." },
  { q: "What is the weather like in June/July?", a: "Hot and humid. Expect highs of 88–95°F (31–35°C). The stadium is enclosed and air-conditioned." },
  { q: "How do I get from ATL airport to Mercedes-Benz Stadium?", a: "Take MARTA from the airport to Five Points, then connect to the Blue/Green line for the stadium-area stations." },
  { q: "Which area should I stay in for World Cup 2026?", a: "Downtown for pure match convenience; Midtown for dining and nightlife with MARTA access; Buckhead for upscale comfort; Decatur for a calmer family base." },
  { q: "Can I bring a bag to Mercedes-Benz Stadium?", a: "Yes, but follow the clear bag policy: clear bags up to 12” x 6” x 12”, or a small clutch up to 4.5” x 6.5”. Policies can vary by event." },
  { q: "How early should I arrive for matches?", a: "Aim for 90 minutes before kickoff to enjoy pre-game atmosphere and avoid peak security queues." },
  { q: "Is the stadium air-conditioned?", a: "Yes. Mercedes-Benz Stadium is climate-controlled and uses a retractable roof for ventilation when conditions allow." },
  { q: "What’s the best way to avoid rideshare surge pricing?", a: "Walk 10–15 minutes away from the stadium district before requesting, or use MARTA to get out of the immediate surge zone." },
  { q: "Where can I watch matches if I don’t have tickets?", a: "Fan zones and bars around Centennial Olympic Park and Midtown will host screenings. Arrive early for good spots." },
  { q: "Are restaurants close to the stadium?", a: "Yes. Ponce City Market and Centennial Park-area spots are walkable or a short train ride away." },
  { q: "Is MARTA safe during the World Cup?", a: "It’s the best option for matchdays. Use the same city habits you’d use anywhere: keep valuables close, stay aware, and travel with people when possible." },
  { q: "Is Downtown or Midtown better for nightlife?", a: "Midtown is the cleaner, easier nightlife base. Downtown can be fun around big events, but it quiets down fast after." },
  { q: "What’s the best district for families?", a: "Downtown for Aquarium/park convenience, or Decatur for quieter evenings with easy access back into the city." },
  { q: "Do I need travel insurance for World Cup 2026?", a: "Strongly recommended for medical coverage and trip delays. Tournament trips are expensive; insurance is the cheap part." },
  { q: "What mobile connectivity works best?", a: "A US eSIM with plenty of data and hotspot support is ideal for maps, tickets, and rideshares." }
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
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>ATL311 (Non-Emergency)</strong> <span>311 / 404-546-0311</span></li>
 <li className="flex justify-between"><strong>Hospital</strong> <span>Emory University Hospital</span></li>
 </ul>
 </div>
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-emerald-500"/> Connectivity</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6">
 <li>• <strong>WiFi:</strong> Free at ATL Airport & Stadium.</li>
 <li>• <strong>Power:</strong> 120V, Type A/B plugs.</li>
 <li>• <strong>Sim Cards:</strong> Kiosks at ATL Arrivals.</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com/united-states-esim" text="Get an Airalo eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Explore Other Host Cities</h3>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {[
 { name: 'New York/New Jersey', slug: 'new-york-city-guide' },
 { name: 'Los Angeles', slug: 'los-angeles-city-guide' },
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
