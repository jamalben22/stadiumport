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
    X, ChevronRight, Facebook, Twitter, Linkedin, Copy, FileCheck, Check
} from 'lucide-react';


import { Breadcrumb } from '@/components/ui/Breadcrumb';

// --- Design System & Components ---

const fadeIn = {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
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
      <div className=" backdrop-blur-md p-2 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col gap-3">
        <button onClick={() => handleShare('twitter')} className="p-3 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl text-slate-500 hover:text-red-600 transition-colors" aria-label="Share on Twitter">
          <Twitter className="w-5 h-5" />
        </button>
        <button onClick={() => handleShare('facebook')} className="p-3 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl text-slate-500 hover:text-red-600 transition-colors" aria-label="Share on Facebook">
          <Facebook className="w-5 h-5" />
        </button>
        <button onClick={() => handleShare('linkedin')} className="p-3 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl text-slate-500 hover:text-red-600 transition-colors" aria-label="Share on LinkedIn">
          <Linkedin className="w-5 h-5" />
        </button>
        <button onClick={handleCopy} className="p-3 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl text-slate-500 hover:text-red-600 transition-colors relative" aria-label="Copy Link">
          {copied ? <Check className="w-5 h-5 text-red-500" /> : <Copy className="w-5 h-5" />}
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
 <span className="text-red-600 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">Guide Section</span>
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
    primary: "bg-red-600 text-slate-900 dark:text-white hover:bg-red-500 shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(220,38,38,0.6)]",
    secondary: "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xl",
    outline: "border-2 border-slate-200 dark:border-slate-700 hover:border-red-600 dark:hover:border-red-600 text-slate-900 dark:text-white bg-transparent"
  };

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={`${baseClasses} ${variants[variant]}`}>
      <span className="relative z-10 flex items-center gap-2">
        {text} <Icon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
    </Link>
  );
};

const HotelCard = ({ name, rating, price, distance, features, image, link }: { name: string, rating: number, price: string, distance: string, features: string[], image: string, link: string }) => (
 <div className="group rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-200 dark:border-slate-800 hover:border-red-500/50 dark:hover:border-red-500/50 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
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
 <span className="text-red-600 dark:text-red-400 font-bold text-lg bg-red-50 dark:bg-red-900/30 px-3 py-1 rounded-lg">{price}</span>
 </div>
 <p className="text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-2 font-medium">
 <MapPin className="w-4 h-4 text-red-600" /> {distance} to Stadium
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
 <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-red-600 transition-colors pr-8">
 {question}
 </h3>
 <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 group-open:bg-red-600 group-open:border-red-600 group-open:text-slate-900 dark:text-white transition-all duration-300">
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

 const [activeSection, setActiveSection] = useState('overview');
 

 // Sticky Nav Links (Matched 1:1 with Atlanta City Guide structure)
 const navLinks = [
 { id: 'overview', label: 'Overview' },
 { id: 'visa', label: 'World Cup Intel' },
 { id: 'planning', label: 'Seating' },
 { id: 'budget', label: 'Budget' },
 { id: 'stadium', label: 'Inside' },
 { id: 'tips', label: 'Match Day' },
 { id: 'tickets', label: 'Tickets' },
 { id: 'hotels', label: 'Hotels' },
 { id: 'transport', label: 'Transport' },
 { id: 'dining', label: 'Food & Drink' },
 { id: 'attractions', label: 'Neighborhood' },
 { id: 'safety', label: 'Policies' },
 { id: 'culture', label: 'Atmosphere' },
 { id: 'packing', label: 'What to Bring' },
 { id: 'faq', label: 'FAQ' },
 ];

 return (
 <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0A0A0A] font-sans selection:bg-red-500/30">
 
 <SocialShare />

 {/* Progress Bar */}
 <motion.div
 className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 to-red-700 origin-left z-[100]"
 style={{ scaleX }}
 />

 {/* 1. Hero Section - Refined & Minimal */}
 <div className="relative h-[65vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
 <div className="absolute inset-0 z-0">
 <Image 
          src="/images/cities/atlanta-world-cup-2026-1600.webp" 
          alt="Mercedes-Benz Stadium Interior" 
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
            <Breadcrumb 
              items={[
                { label: "Stadiums", href: "/world-cup-2026-stadiums" },
                { label: "Mercedes-Benz Stadium", href: "/mercedes-benz-stadium-world-cup-2026" }
              ]} 
            />
            <div className="flex items-center gap-4 mb-6">
 <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
 Last Updated: January 4, 2026
 </span>
 <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
 Stadium Guide
 </span>
 <span className="px-3 py-1 rounded-full bg-red-600/90 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-red-600/20">
 Semi-Final Host
 </span>
 </div>
 
 <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-[0.9]">
 MERCEDES<br/>BENZ
 </h1>
 <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light max-w-xl leading-relaxed">
              Soccer&apos;s southern cathedral. <span className="text-slate-900 dark:text-white font-medium">World Cup 2026</span> definitive guide.
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
 ? 'text-red-600 dark:text-red-400 translate-x-1' 
 : 'text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-600 dark:text-slate-300'
 }`}
 onClick={() => setActiveSection(link.id)}
 >
 {activeSection === link.id && (
 <motion.div 
 layoutId="activeSection"
 className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-red-600"
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
 <Info className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
 <p className="leading-relaxed">
 <strong>Transparency:</strong> This guide contains affiliate links. We may earn a commission if you book through them, which helps fund our independent journalism.
 </p>
 </div>

 <Section id="overview" title="Strategic Overview">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
 Walking into Mercedes-Benz Stadium feels less like entering a sports arena and more like stepping onto the bridge of a massive starship. Since opening in 2017, "The Benz" has reset the standard for what a major event venue can be.
 </p>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: Users, title: "Capacity", text: "71,000 standard capacity, expandable to 75,000+ for the World Cup Semi-Final." },
 { icon: Star, title: "Surface", text: "FieldTurf CORE (Will be converted to temporary natural grass for World Cup 2026)." },
 { icon: Sun, title: "Roof", text: "Retractable 'Oculus' style roof. Eight petals slide open like a camera aperture." }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] transition-colors">
 <item.icon className="w-10 h-10 text-red-600 mb-6" />
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
 <AffiliateButton href="https://www.mercedesbenzstadium.com/seating-charts" text="View Seating Chart" variant="secondary" icon={Ticket} />
          <AffiliateButton href="https://www.booking.com/landmark/us/mercedes-benz-stadium.html" text="Book Nearby Hotels" variant="primary" icon={Hotel} />
 </div>
 </Section>

 <Section id="visa" title="World Cup 2026 Intel">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Match Schedule</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">Atlanta hosts 8 matches, including a Semi-Final. This is a heavyweight venue for the tournament.</p>
 <ul className="space-y-3 mb-8">
 {[
 { stage: "Group Stage", count: "5 Matches" },
 { stage: "Round of 32", count: "1 Match" },
 { stage: "Round of 16", count: "1 Match" },
 { stage: "Semi-Final", count: "July 15, 2026" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-slate-700 dark:text-slate-300 font-medium">
 <span>{item.stage}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.count}</span>
 </li>
 ))}
 </ul>
 <AffiliateButton href="https://www.viagogo.com/Sports-Tickets/Soccer/World-Cup-Tickets" text="Check Ticket Availability" variant="outline" />
 </div>
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">The FIFA Transformation</h4>
 <ul className="space-y-4 mb-8">
 {[
 'Natural Grass Installation', 
 '300 Level Curtains Removed', 
 'Expanded Media Tribune',
 'Security Perimeter Expansion'
 ].map((item, i) => (
 <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
 <CheckCircle2 className="w-5 h-5 text-red-600" /> {item}
 </li>
 ))}
 </ul>
 <AffiliateButton href="https://www.fifa.com" text="Official FIFA Guide" variant="secondary" />
 </div>
 </div>

 <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-2xl mb-4">Visa & Entry Requirements</h4>
 <p className="text-slate-600 dark:text-slate-300 mb-8">
 International visitors to the US typically need a visa or ESTA. Check the latest requirements early.
 </p>
 <div className="flex flex-wrap gap-4">
 <AffiliateButton href="https://esta.cbp.dhs.gov/" text="Check Visa Requirements" icon={FileCheck} />
 <AffiliateButton href="https://www.worldnomads.com/" text="Travel Insurance" icon={Shield} variant="outline" />
 </div>
 </div>
 </Section>

 <Section id="planning" title="Seating & Views">
 <div className="space-y-6">
 {[
 { time: "100 Level (Lower)", desc: "Closest to action. Sections 108-112 offer the best midfield views. Supporters Section (101-102) is standing only." },
 { time: "200 Level (Club)", desc: "Best tactical view. Includes access to climate-controlled concourses, premium bars, and shorter food lines." },
 { time: "300 Level (Upper)", desc: "Steepest sightlines but excellent value. The 'Halo' board ensures you never miss a replay. Full stadium atmosphere." }
 ].map((item, i) => (
 <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center">
 <div className="shrink-0 w-48 font-black text-2xl text-red-600">{item.time}</div>
 <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
 </div>
 ))}
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
 <AffiliateButton href="https://mercedesbenzstadium.com/seating-charts/" text="View 3D Seat Map" variant="primary" icon={Plane} />
<AffiliateButton href="https://www.stubhub.com/mercedes-benz-stadium-tickets/venue/430889/" text="Compare Ticket Prices" variant="outline" />
 </div>
 </Section>

 <Section id="budget" title="Budget Strategy">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Budget Fan", items: ["300 Level Seats", "MARTA to Stadium", "Stay near Perimeter"] },
 { title: "Standard", items: ["200 Level Club", "Downtown Hotels", "Pre-game at Park"] },
 { title: "Premium", items: ["100 Level / Suites", "VIP Entry", "Exclusive Club Access"] }
 ].map((tier, i) => (
 <div key={i} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-2xl transition-all duration-300">
 <h4 className="font-bold text-xl mb-6">{tier.title}</h4>
 <ul className="space-y-4">
 {tier.items.map((item, j) => (
 <li key={j} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
 <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2" />
 {item}
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>
 <div className="mt-8 text-center">
          <AffiliateButton href="https://www.viator.com/Atlanta/d784-ttd" text="View Fan Packages" variant="secondary" icon={Briefcase} />
        </div>
 </Section>

 <Section id="stadium" title="Inside the Stadium">
        <LightboxImage 
          src="/images/cities/atlanta-world-cup-2026-1600.webp" 
          alt="Mercedes-Benz Stadium Interior" 
          caption="The stunning 'Halo' board at Mercedes-Benz Stadium."
        />

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 Widely considered one of the most technologically advanced stadiums in the world, <strong>Mercedes-Benz Stadium</strong> is the crown jewel of Atlanta's sports scene. Famous for its unique camera-shutter retractable roof and massive 360-degree "Halo" video board, this venue offers an unparalleled fan experience right in the heart of downtown.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-red-600"/> Key Features</h4>
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
 <li className="flex gap-3"><span className="text-red-600 font-bold">•</span> Fan Friendly Pricing: Concessions are famously cheap.</li>
 <li className="flex gap-3"><span className="text-red-600 font-bold">•</span> A/C: Fully climate-controlled, essential for summer.</li>
 <li className="flex gap-3"><span className="text-red-600 font-bold">•</span> Arrival: Gates open 2 hours before kickoff.</li>
 </ul>
 </div>
 </div>
 
 <div className=" p-8 rounded-[2rem] border border-red-500/20">
 <p className="text-lg text-center font-medium text-red-800 dark:text-red-200">
 <strong>Getting There:</strong> Unlike many US stadiums, Mercedes-Benz Stadium is located directly in the city center. The <strong>MARTA train</strong> stops right at the venue (Dome/GWCC/Philips Arena/CNN Center Station).
 </p>
 </div>
 </Section>

 <Section id="tips" title="Match Day Gameplan">
 <div className="grid md:grid-cols-3 gap-6 mb-8">
 {[
 { title: "Arrival", text: "Be at the gates 90 minutes before kickoff to clear security calmly and soak in the pre-game atmosphere." },
 { title: "Clear Bag", text: "Bring a stadium-approved clear bag and sealed water. Concessions are fan-friendly but lines build up." },
 { title: "Exit Plan", text: "Wait 10-15 minutes inside after the whistle to bypass the first transit crush, then head to MARTA." }
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

 <Section id="tickets" title="Tickets & Schedule">
 <div className="bg-emerald-900 dark:bg-emerald-950 text-slate-900 dark:text-white rounded-[2.5rem] p-8 md:p-12 mb-12 relative overflow-hidden shadow-2xl">
 <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-[150px] opacity-20"></div>
 <div className="relative z-10">
 <div className="flex items-center gap-4 mb-8">
 <Ticket className="w-8 h-8 text-red-400" />
 <h3 className="text-3xl font-black">Confirmed Matches</h3>
 </div>
 <div className="space-y-6">
 {[
 { stage: "Group Stage", count: "5 Matches", color: "text-red-300" },
 { stage: "Round of 32", count: "1 Match", color: "text-red-300" },
 { stage: "Round of 16", count: "1 Match", color: "text-red-300" },
 { stage: "Semi-Final", count: "?? HOST MATCH", color: "text-amber-400" }
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
 Missed the draw? Trusted resale platforms offer verified tickets, though prices will be higher for high-demand matches like the Semi-Final.
 </p>
 <AffiliateButton href="https://www.stubhub.com/mercedes-benz-stadium-tickets/venue/448258/" text="Check StubHub" variant="primary" />
 </div>
 </div>
 </Section>

 <Section id="hotels" title="Where to Stay">
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl leading-relaxed">
 Atlanta is unique because the stadium is surrounded by world-class hotels. Staying <strong>Downtown</strong> allows you to walk to the match. Alternatively, <strong>Midtown</strong> offers a trendier vibe just a short train ride away.
 </p>
 
 <div className="space-y-8">
 <HotelCard 
 name="Omni Atlanta Hotel at Centennial Park"
 rating={4.5}
 price="$350 - $600"
 distance="5 min walk"
 features={['Connected to CNN Center', 'Pool Deck', 'Luxury']}
 image="/images/cities/atlanta-world-cup-2026-1024.webp" 
        link="https://www.booking.com/searchresults.html?ss=Omni+Atlanta+Hotel+at+Centennial+Park&aid=8063172"
      />
      <HotelCard 
        name="Reverb by Hard Rock Atlanta"
        rating={4.4}
        price="$300 - $500"
        distance="Across the street"
        features={['Rooftop Bar', 'Music Themed', 'Modern']}
        image="/images/cities/atlanta-world-cup-2026-1024.webp" 
        link="https://www.booking.com/searchresults.html?ss=Reverb+by+Hard+Rock+Atlanta&aid=8063172"
      />
      <HotelCard 
        name="The Westin Peachtree Plaza"
        rating={4.3}
        price="$250 - $450"
        distance="10 min walk"
        features={['Iconic Tower', 'Rotating Restaurant', 'Central Location']}
        image="/images/cities/atlanta-world-cup-2026-1024.webp" 
        link="https://www.booking.com/searchresults.html?ss=The+Westin+Peachtree+Plaza+Atlanta&aid=8063172"
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
 MARTA is your best friend. The Gold and Red lines run directly from the Airport to Downtown (Five Points). Transfer to Blue/Green to reach the stadium. Cost: $2.50 per ride.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center text-red-600 shrink-0">
 <Plane className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Airport Transfer</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Hartsfield-Jackson (ATL) is the busiest airport in the world. The train station is inside the domestic terminal. It takes ~20 mins to reach downtown.
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
 Traffic in Atlanta is notorious. Avoid renting a car if you are staying downtown. Uber/Lyft are available but prices surge on match days.
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
 <AffiliateButton href="https://www.viator.com/Atlanta-tours/Transfers-and-Ground-Transport/d784-g15" text="Book Airport Transfer" variant="secondary" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="dining" title="Food & Drink">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Stadium Bites", desc: "Mercedes-Benz Stadium has fan-friendly pricing. $2 hot dogs, $5 beers. It's a game changer." },
 { title: "Sports Bars", desc: "Stats Brewpub and Park Bar are classic pre-game spots just a short walk from the gates." },
 { title: "Post-Game", desc: "Head to the CNN Center food court or nearby restaurants in Centennial Park for a quick bite." }
 ].map((item, i) => (
 <div key={i} className=" p-8 rounded-[2rem] shadow-lg border border-slate-200 dark:border-slate-200 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300">
 <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 mb-6">
 <Utensils className="w-6 h-6" />
 </div>
 <h4 className="font-bold text-xl mb-3">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
 </div>
 ))}
 </div>
 </Section>

 <Section id="attractions" title="Neighborhood">
 <p className="mb-8 text-xl text-slate-600 dark:text-slate-300">
 The stadium is part of a massive entertainment district. You can spend a whole day here without even entering the venue.
 </p>
 <div className="space-y-6">
 {[
 { title: "Home Depot Backyard", desc: "The 11-acre greenspace next door. The prime spot for tailgating and pre-match events.", color: "text-orange-500" },
 { title: "College Football Hall of Fame", desc: "Interactive museum celebrating the sport. A must-visit for any football fan.", color: "text-blue-500" },
 { title: "Centennial Olympic Park", desc: "The legacy of the 1996 Games. A beautiful spot to relax before the match crowds arrive.", color: "text-green-500" }
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
 <AffiliateButton href="https://www.viator.com/Atlanta-tours/d784-ttd" text="Explore Downtown Atlanta" variant="primary" />
  </div>
  </Section>

  <Section id="safety" title="Policies & Safety">
  <div className="grid md:grid-cols-2 gap-8">
  <div className="p-8 rounded-[2rem]">
  <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-red-600"/> Security Checks</h4>
  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Standard metal detectors and bag checks are in place. Prohibited items include large bags, professional cameras, and weapons.</p>
  </div>
  <div className="p-8 rounded-[2rem]">
  <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Code of Conduct</h4>
  <ul className="space-y-3 text-slate-600 dark:text-slate-400">
  <li>• Respect other fans and staff.</li>
  <li>• No standing in aisles.</li>
  <li>• Report issues to nearest usher.</li>
  </ul>
  <div className="mt-6">
  <AffiliateButton href="https://www.mercedesbenzstadium.com/guidelines" text="Read Full Policy" variant="secondary" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="culture" title="Fan Atmosphere">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">Atlanta United set the bar for MLS atmosphere, and that energy carries over to international matches. Expect loud, passionate crowds.</p>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { title: "Supporters Section", desc: "Located behind the goal (Sections 101-102 and 136). Standing only, flags, drums, and non-stop chanting." },
 { title: "The Halo Board", desc: "The massive 360-degree screen is a show in itself. Watch for replays and stats during breaks." },
 { title: "Tailgating", desc: "The Home Depot Backyard is the hub. Arrive 3-4 hours early to join the pre-match festivities." }
 ].map((item, i) => (
 <div key={i} className="p-6 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-2xl">
 <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
 </div>
 ))}
 </div>
 </Section>

 <Section id="packing" title="What to Bring">
 <div className="grid md:grid-cols-3 gap-6">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Sun className="w-6 h-6 text-amber-500"/> Climate Control</h4>
 <p className="text-slate-600 dark:text-slate-400">The stadium is fully air-conditioned (72°F/22°C). You might even want a light layer if you get cold easily.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Essentials</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400">
 <li>• Mobile ticket (charged phone!)</li>
 <li>• Clear bag (12x6x12 max)</li>
 <li>• Credit card (Cashless venue)</li>
 </ul>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Prohibited</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-6">
          <li>• Selfie sticks / Tripods</li>
          <li>• Noisemakers (Air horns)</li>
          <li>• Outside food/drink</li>
        </ul>
        <AffiliateButton href="https://mercedesbenzstadium.com/clear-bag-policy/" text="View Bag Policy" variant="secondary" />
 </div>
 </div>
 </Section>

 <Section id="faq" title="Frequently Asked Questions">
 <div className="space-y-2">
 {[
 { q: "Where is the stadium located?", a: "Mercedes-Benz Stadium is in downtown Atlanta, next to the Georgia World Congress Center and Centennial Olympic Park." },
 { q: "Is the roof open or closed?", a: "It depends on the weather. For the World Cup, FIFA will likely mandate it stays closed to ensure consistent playing conditions." },
 { q: "Is the stadium air-conditioned?", a: "Yes, fully. It is a comfortable 72 degrees inside regardless of the Atlanta heat outside." },
 { q: "Can I bring a bag?", a: "Only clear bags smaller than 12x6x12 inches, or small clutch bags (4.5x6.5 inches). No backpacks." },
 { q: "Does the stadium take cash?", a: "No. Mercedes-Benz Stadium is 100% cashless. There are reverse-ATM kiosks to convert cash to cards if needed." },
 { q: "Is there WiFi?", a: "Yes, the stadium has one of the most robust WiFi networks in sports (ATT Stadium WiFi)." },
 { q: "What is 'Fan Friendly Pricing'?", a: "The stadium is famous for affordable concessions, like $2 hot dogs and $5 beers (prices subject to change for World Cup)." },
 { q: "How do I get there?", a: "MARTA is the best option. Take the Blue/Green line to Dome/GWCC/Philips Arena/CNN Center Station." },
 { q: "Where is the best place to park?", a: "If you must drive, book parking in advance at the Red Deck or Silver Deck. But we strongly recommend MARTA." },
 { q: "Are there elevators?", a: "Yes, the stadium is fully accessible with elevators and escalators serving all levels." }
 ].map((item, i) => (
 <FAQItem key={i} question={item.q} answer={item.a} />
 ))}
 </div>
 </Section>

 <Section id="essential" title="Essential Information">
 <div className="grid md:grid-cols-2 gap-8">
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Shield className="w-6 h-6 text-red-600"/> Emergency Numbers</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>Stadium Security</strong> <span>Text "RESPECT" to 69050</span></li>
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>Guest Services</strong> <span>(470) 341-5000</span></li>
 <li className="flex justify-between"><strong>First Aid</strong> <span>Sections 105, 206, 329</span></li>
 </ul>
 </div>
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
  <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-red-600"/> Connectivity</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6">
 <li>• <strong>WiFi:</strong> Free "Stadium Wifi" network.</li>
 <li>• <strong>Power:</strong> Charging stations on concourses.</li>
 <li>• <strong>App:</strong> Download the MBS App for maps.</li>
 </ul>
 <AffiliateButton href="https://www.mercedesbenzstadium.com/mobile-apps" text="Download Stadium App" variant="secondary" />
 </div>
 </div>
 </Section>

 <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Explore Other Stadiums</h3>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {['MetLife Stadium', 'SoFi Stadium', 'Azteca Stadium', 'BMO Field', 'AT&T Stadium', 'Hard Rock Stadium', 'Lumen Field', 'Gillette Stadium'].map((stadium) => (
 <Link key={stadium} href={`/world-cup-2026-stadiums`} className="block p-4 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl hover:border-red-500 hover:shadow-lg transition-all text-center font-bold text-slate-700 dark:text-slate-200">
 {stadium}
 </Link>
 ))}
 </div>
 <div className="text-center mt-12">
 <Link href="/world-cup-2026-stadiums" className="text-red-600 hover:text-red-700 font-bold text-lg inline-flex items-center gap-2 hover:gap-4 transition-all">
 View All 16 Stadiums <ArrowRight className="w-5 h-5"/>
 </Link>
 </div>
 </div>
 </main>
 </div>
 </div>
 );
}















