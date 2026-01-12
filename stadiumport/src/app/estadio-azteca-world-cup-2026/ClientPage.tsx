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
 Bookmark, X, ChevronRight, Facebook, Twitter, Linkedin, Copy,
 CloudSun, Smartphone, Accessibility, Menu
} from 'lucide-react';


import { Breadcrumb } from '@/components/ui/Breadcrumb';

// --- Design System & Components (Mirrored from Atlanta Guide) ---

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

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = document.title;
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'noopener,noreferrer');
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
        <button onClick={() => handleShare('twitter')} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors">
          <Twitter className="w-5 h-5" />
        </button>
        <button onClick={() => handleShare('facebook')} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors">
          <Facebook className="w-5 h-5" />
        </button>
        <button onClick={() => handleShare('linkedin')} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors">
          <Linkedin className="w-5 h-5" />
        </button>
        <button onClick={handleCopy} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors relative">
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
 <AffiliateButton href={link} text="Check Availability" variant="primary" />
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

export default function EstadioAztecaClientPage() {
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
 { id: 'stadium', label: 'The Stadium' },
 { id: 'schedule', label: 'WC Schedule' },
 { id: 'tickets', label: 'Seating & Tickets' },
 { id: 'transport', label: 'Getting There' },
 { id: 'neighborhood', label: 'Neighborhood' },
 { id: 'food', label: 'Food' },
 { id: 'policies', label: 'Policies' },
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
       src="/images/stadiums/estadio-azteca-mexico-city-world-cup-2026-1600.webp" 
       alt="Estadio Azteca Interior" 
       fill 
       className="object-cover"
        priority sizes="100vw" />
 <div className="absolute inset-0 bg-gradient-to-b from-slate-200/40 via-slate-200/60 to-[#F5F5F7] dark:from-[#0A0A0A]/40 dark:via-[#0A0A0A]/60 dark:to-[#0A0A0A]" />
 </div>

 <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-end md:items-center justify-between gap-12 pt-20">
 <div className="max-w-4xl">
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
 >
 {/* Breadcrumb */}
          <Breadcrumb 
            items={[
              { label: 'Stadiums', href: '/world-cup-2026-stadiums' },
              { label: 'Estadio Azteca', href: '/estadio-azteca-world-cup-2026' }
            ]} 
          />

 <div className="flex items-center gap-4 mb-6">
 <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
 Last Updated: January 4, 2026
 </span>
 <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
 Opening Match Venue
 </span>
 <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
 Mexico City
 </span>
 </div>
 
 <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-[0.9]">
 AZTECA
 </h1>
 <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light max-w-xl leading-relaxed">
 The Colossus of Saint Ursula. <span className="text-slate-900 dark:text-white font-medium">World Cup 2026</span> definitive guide.
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
 Walking up the spiral ramps of Estadio Azteca isn't just entering a stadium; it's an ascent into the rarefied air of football mythology. At 7,200 feet above sea level, the air is thin, but the atmosphere is thick enough to cut with a knife.
 </p>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: MapPin, title: "Location", text: "Santa Úrsula, Coyoacán. Far south of the city center. Plan for 60-90 mins travel time." },
 { icon: Train, title: "Transit", text: "Take Metro Line 2 to Tasqueña, then Light Rail to Estadio Azteca. Crowded but reliable." },
 { icon: Users, title: "Capacity", text: "~90,000 seats. The largest stadium in the tournament and host of the Opening Match." }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] transition-colors">
 <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
            <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/mex" text="Search Mexico City Flights" variant="secondary" icon={Plane} />
            <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Mexico+City" text="Check Hotels" variant="primary" icon={Hotel} />
          </div>
        </Section>

 <Section id="stadium" title="The Colossus Reborn">
 <LightboxImage 
   src="/images/stadiums/estadio-azteca-mexico-city-world-cup-2026-1600.webp" 
   alt="Estadio Azteca Interior" 
   caption="The legendary Estadio Azteca will feature modern amenities for the 2026 World Cup."
 />

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 Built in 1966 to showcase Mexico to the world, Estadio Azteca was designed to be a "temple of football." For 2026, a massive, multi-million dollar renovation has polished this gem, adding modern comforts without stripping its soul. Whether you're here for the history, the passion, or just to say you survived the "Colossus," this is the ultimate pilgrimage.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Renovation Updates</h4>
 <ul className="space-y-4">
 {[
 { label: "New Roof", val: "Full canopy coverage & LED skin" },
 { label: "Concourses", val: "Expanded food courts & lighting" },
 { label: "Connectivity", val: "High-speed Wi-Fi 6 throughout" },
 { label: "Locker Rooms", val: "World-class facilities" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-slate-700 dark:text-slate-300">
 <span className="font-medium text-slate-500">{item.label}</span>
 <span className="font-bold text-right">{item.val}</span>
 </li>
 ))}
 </ul>
 </div>
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Pro Tips</h4>
 <ul className="space-y-4 text-slate-700 dark:text-slate-300">
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Altitude: 7,200ft up. Hydrate double.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Arrival: Arrive 4 hours early for big matches.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Cash: Bring Pesos for street vendors outside.</li>
 </ul>
 </div>
 </div>
 
 <div className="p-8 rounded-[2rem] border border-emerald-500/20">
 <p className="text-lg text-center font-medium text-emerald-800 dark:text-emerald-200">
 <strong>Insider Note:</strong> For the Opening Match on June 11, expect security to be airport-level. The Fan Fest at the Zócalo will be massive, but getting from there to the stadium takes 90 minutes. Plan accordingly.
 </p>
 </div>
 </Section>

 <Section id="schedule" title="WC 2026 Schedule">
<div className="bg-emerald-900 dark:bg-emerald-950 text-slate-900 dark:text-white rounded-[2.5rem] p-8 md:p-12 mb-12 relative overflow-hidden shadow-2xl">
<div className="relative z-10">
 <div className="flex items-center gap-4 mb-8">
 <Calendar className="w-8 h-8 text-emerald-400" />
 <h3 className="text-3xl font-black">Confirmed Matches</h3>
 </div>
 <div className="space-y-6">
 {[
 { date: "June 11", stage: "Opening Match", teams: "Mexico vs TBD", color: "text-amber-400" },
 { date: "June 17", stage: "Group Stage", teams: "Group K Match", color: "text-emerald-300" },
 { date: "June 24", stage: "Group Stage", teams: "Mexico vs TBD", color: "text-emerald-300" },
 { date: "June 30", stage: "Round of 32", teams: "Knockout Match", color: "text-emerald-300" },
 { date: "July 5", stage: "Round of 16", teams: "Quarter-Final Qualifier", color: "text-emerald-300" }
 ].map((match, i) => (
 <div key={i} className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4">
 <div className="flex items-center gap-4">
 <span className="font-mono text-lg text-white/60 w-24">{match.date}</span>
 <span className={`font-bold text-xl ${match.color}`}>{match.stage}</span>
 </div>
 <span className="text-slate-900 dark:text-white font-medium mt-2 md:mt-0">{match.teams}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8">
      <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
        <h4 className="font-bold text-2xl mb-4">Official Tickets</h4>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          World Cup tickets will be distributed via FIFA's official lottery. Registration typically opens 12-18 months before the tournament.
        </p>
        <AffiliateButton href="https://www.fifa.com/worldcup" text="FIFA Official Site" variant="secondary" />
      </div>
      <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
        <h4 className="font-bold text-2xl mb-4">Resale Market</h4>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          For sold-out matches, verified resale markets are your only safe option. Prices will be significantly higher for the Opening Match.
        </p>
        <AffiliateButton href="https://www.viagogo.com/Sports-Tickets/International-Soccer/World-Cup-Tickets" text="Check Availability" variant="primary" />
      </div>
    </div>
 </Section>

 <Section id="tickets" title="Seating Guide">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 Azteca is massive, and verticality is its defining feature. The upper deck is incredibly steep—you feel like you're hovering directly over the pitch.
 </p>
 </div>
 
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Lower Bowl (100)", desc: "Proximity & Atmosphere. Sections 100-130 put you right on the field. The 'Cabeceras' (ends) are where the hardcore fans live.", price: "$$$$" },
 { title: "Club & Palcos (300)", desc: "Comfort & Status. The 'belt' of the stadium. Separate bathrooms, better food, and perfect elevated views.", price: "$$$" },
 { title: "Upper Deck (400-600)", desc: "Budget & Panoramas. A workout to climb, but a God-like view. Warning: Avoid 600 level if you have vertigo.", price: "$" }
 ].map((tier, i) => (
 <div key={i} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-2xl transition-all duration-300">
 <div className="flex justify-between items-center mb-6">
 <h4 className="font-bold text-xl">{tier.title}</h4>
 <span className="text-xs font-bold text-emerald-700 px-2 py-1 rounded">{tier.price}</span>
 </div>
 <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
 {tier.desc}
 </p>
 </div>
 ))}
 </div>
 </Section>

 <Section id="transport" title="Getting There">
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className="space-y-8">
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
 <Train className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Metro + Light Rail (Best)</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Take Metro Line 2 (Blue) to <strong>Tasqueña</strong>. Transfer to the Light Rail (Tren Ligero) to <strong>Estadio Azteca</strong>. It's crowded but beats the traffic.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
 <Car className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Uber / Rideshare</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Works for getting TO the stadium (leave early). Getting OUT is a nightmare. Surge pricing is 4x-5x. Walk to Santa Úrsula streets to find a driver.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
 <AlertTriangle className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Driving? Don't.</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Traffic on Tlalpan and Periférico is legendary. Unless you have a pre-paid parking pass in General Lots, do not drive.
 </p>
 </div>
 </div>
 </div>
 
 <div className=" rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 h-fit">
 <h4 className="font-bold text-2xl mb-6">Travel Times</h4>
 <ul className="space-y-6">
 {[
 { label: "From Roma/Condesa", time: "60-90 min" },
 { label: "From Centro/Zocalo", time: "60-80 min" },
 { label: "From Polanco", time: "90+ min" },
 { label: "From Coyoacán", time: "30-45 min" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
 <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
 </li>
 ))}
 </ul>
 </div>
 </div>
 </Section>

 <Section id="neighborhood" title="Neighborhood & Hotels">
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl leading-relaxed">
 Santa Úrsula is a working-class residential neighborhood, not a tourist hub. The smart move is to stay in central areas like Roma or Condesa and travel to the match.
 </p>
 
 <div className="space-y-8">
<HotelCard 
name="Grand Fiesta Americana" 
rating={4.8}
price="$$$$"
distance="7.2 miles"
features={["Luxury", "Views", "Fine Dining"]}
image="/images/cities/mexico-city-world-cup-2026-640.webp" 
      link="https://www.booking.com/searchresults.html?ss=Grand+Fiesta+Americana+Mexico+City"
    />
    <HotelCard 
      name="Hyatt Regency Mexico City" 
      rating={4.7}
      price="$$$"
      distance="8.1 miles"
      features={["Business", "Central", "Pool"]}
      image="/images/cities/mexico-city-world-cup-2026-640.webp" 
      link="https://www.booking.com/searchresults.html?ss=Hyatt+Regency+Mexico+City"
    />
    <HotelCard 
      name="JW Marriott Hotel" 
      rating={4.6}
      price="$$$$"
      distance="7.9 miles"
      features={["Upscale", "Spa", "Polanco Area"]}
      image="/images/cities/mexico-city-world-cup-2026-640.webp" 
      link="https://www.booking.com/searchresults.html?ss=JW+Marriott+Hotel+Mexico+City"
    />
</div>
 </Section>

 <Section id="food" title="Food & Amenities">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Tacos de Canasta", desc: "Steamed tacos sold from baskets on bicycles outside the stadium. Cheap, fast, delicious." },
 { title: "Gringas", desc: "Flour tortillas with al pastor meat and cheese. A lifesaver after a few beers." },
 { title: "Chicharrones", desc: "Giant sheets of fried pork skin topped with hot sauce and cream. A classic stadium snack." }
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
 <div className="mt-8 text-center">
 <p className="text-slate-500 italic">Inside the stadium: Beer (Corona/Victoria), Sopas Maruchan (Instant Noodles), and Domino's Pizza.</p>
 </div>
 </Section>

 <Section id="policies" title="Policies & Safety">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> Bag Policy & Entry</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
 Strict. Clear bags only (12"x6"x12"). Small clutches are okay. Backpacks are a hard no. There are no lockers outside.
 </p>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Tickets are 100% digital via the FIFA app. Screenshots rarely work.
 </p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Prohibited Items</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>• No belts with large buckles (they check).</li>
 <li>• No professional cameras.</li>
 <li>• No umbrellas.</li>
 <li>• No chargers/batteries (sometimes restricted).</li>
 </ul>
 </div>
 </div>
 </Section>

 <Section id="faq" title="Frequently Asked Questions">
 <div className="space-y-2">
 {[
 { q: "Is the area around Estadio Azteca safe?", a: "During match days, there is a massive security ring. Stay on the main avenues and follow the crowds. Avoid wandering into unlit side streets after dark." },
 { q: "How early should I arrive?", a: "For the World Cup, gates will open 3-4 hours prior. We recommend arriving at the stadium precinct 3 hours early to enjoy the atmosphere." },
 { q: "Can I use US Dollars?", a: "Inside, maybe. Outside, no. Always carry Mexican Pesos (MXN) in small denominations ($20, $50, $100 bills) for street food and transit cards." },
 { q: "What about the altitude?", a: "Mexico City is 7,200ft up. You will feel it climbing the ramps. Hydrate double what you normally would. One beer hits like two." },
 { q: "Is there a roof?", a: "Yes, the new renovation ensures all seats are covered by the canopy, protecting you from the intense midday sun and the frequent afternoon rainstorms." },
 { q: "How do I get there from the airport?", a: "It's far. Take a taxi/Uber from AICM, but expect 60+ minutes of traffic. Public transit with luggage is not recommended." }
 ].map((item, i) => (
 <FAQItem key={i} question={item.q} answer={item.a} />
 ))}
 </div>
 </Section>

 <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Explore Other Host Cities</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { name: 'Atlanta', href: '/world-cup-2026-atlanta-guide' },
        { name: 'New York/New Jersey', href: '/world-cup-2026-new-york-new-jersey-guide' },
        { name: 'Los Angeles', href: '/world-cup-2026-los-angeles-guide' },
        { name: 'Toronto', href: '/world-cup-2026-toronto-guide' },
        { name: 'Dallas', href: '/world-cup-2026-dallas-guide' },
        { name: 'Miami', href: '/world-cup-2026-miami-guide' },
        { name: 'Seattle', href: '/world-cup-2026-seattle-guide' },
        { name: 'Monterrey', href: '/world-cup-2026-monterrey-guide' }
      ].map((city) => (
        <Link key={city.name} href={city.href} className="block p-4 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center font-bold text-slate-700 dark:text-slate-200">
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















