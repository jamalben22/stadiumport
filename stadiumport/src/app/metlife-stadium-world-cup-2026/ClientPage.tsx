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
    Train, Bus, Car, Bike, AlertTriangle,
    X, ChevronRight, Facebook, Twitter, Linkedin, Copy, FileCheck
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
 { id: 'schedule', label: 'Matches' },
 { id: 'transport', label: 'Transport' },
 { id: 'parking', label: 'Parking' },
 { id: 'seating', label: 'Seating' },
 { id: 'food', label: 'Food & Drink' },
 { id: 'policies', label: 'Policies' },
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
            src="/images/stadiums/metlife-stadium-east-rutherford-world-cup-2026-1600.webp" 
            alt="MetLife Stadium" 
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
            items={[
              { label: 'Stadiums', href: '/world-cup-2026-stadiums' },
              { label: 'MetLife Stadium', href: '/metlife-stadium-world-cup-2026' }
            ]} 
          />
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
              Last Updated: January 4, 2026
            </span>
            <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
              Host City Venue
            </span>
 <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
 World Cup Final Host
 </span>
 </div>
 
 <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-[0.9]">
 METLIFE
 </h1>
 <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light max-w-xl leading-relaxed">
 New York New Jersey. <span className="text-slate-900 dark:text-white font-medium">World Cup 2026 Final</span> definitive guide.
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
 This is the big one. The venue for the <strong>2026 World Cup Final</strong>. MetLife Stadium is a concrete colossus rising from the New Jersey swamps. It lacks the futuristic roof of SoFi or the deafening acoustics of Lumen Field, but for the Final, the atmosphere will be nuclear.
 </p>
 <p className="mt-4 text-slate-600 dark:text-slate-400">
 Known officially as <strong>"New York New Jersey Stadium"</strong> for FIFA events, this venue presents unique challenges. It is <em>technically</em> in New Jersey, surrounded by highways and marshland, not skyscrapers. If you book a hotel in Times Square thinking you can walk here, you are in for a rude awakening.
 </p>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: MapPin, title: "Location Reality", text: "East Rutherford, NJ. 5 miles from Manhattan but requires crossing a river and state line." },
 { icon: Users, title: "Massive Scale", text: "Capacity: 82,500. Designed to move people efficiently. A utilitarian beast." },
 { icon: Sun, title: "Open Air", text: "No roof. In July, the sun is brutal, especially on the East Sideline. Prepare for heat." }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] transition-colors">
 <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
 <AffiliateButton href="https://www.skyscanner.com/transport/flights-to/nyc" text="Search NYC Flights" variant="secondary" icon={Plane} />
 <AffiliateButton href="https://www.booking.com/city/us/new-york.html" text="Check Secaucus Hotels" variant="primary" icon={Hotel} />
 </div>
 </Section>

 <Section id="schedule" title="Schedule & Tickets">
        <div className="bg-emerald-900 dark:bg-emerald-950 text-slate-900 dark:text-white rounded-[2.5rem] p-8 md:p-12 mb-12 relative overflow-hidden shadow-2xl">
 
 <div className="relative z-10">
 <div className="flex items-center gap-4 mb-8">
 <Ticket className="w-8 h-8 text-emerald-400" />
 <h3 className="text-3xl font-black">Confirmed Matches</h3>
 </div>
 <div className="space-y-6">
 {[
 { stage: "Group C", count: "Brazil vs Morocco (Opener)", color: "text-emerald-300" },
 { stage: "Group I", count: "France vs Senegal", color: "text-emerald-300" },
 { stage: "Group I", count: "Norway vs Senegal", color: "text-emerald-300" },
 { stage: "Group E", count: "Ecuador vs Germany", color: "text-emerald-300" },
 { stage: "Group L", count: "Panama vs England", color: "text-emerald-300" },
 { stage: "Round of 32", count: "June 30", color: "text-emerald-300" },
 { stage: "Round of 16", count: "July 5", color: "text-emerald-300" },
 { stage: "THE FINAL", count: "JULY 19, 2026", color: "text-amber-400 font-black" }
 ].map((match, i) => (
 <div key={i} className="flex items-center justify-between border-b border-white/10 pb-4">
 <span className={`font-mono text-lg ${match.color}`}>{match.stage}</span>
 <span className="font-bold text-xl text-right">{match.count}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Official Tickets</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8">
 The Final will be the most in-demand ticket in sports history. Register on the FIFA portal immediately.
 </p>
 <AffiliateButton href="https://www.fifa.com" text="FIFA Official Site" variant="secondary" />
 </div>
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Resale Market</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8">
 Expect record-breaking prices. Verified resale platforms will be your only safe alternative to the official lottery.
 </p>
 <AffiliateButton href="https://www.stubhub.com" text="Check StubHub" variant="primary" />
          </div>
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
 <h4 className="font-bold text-xl mb-2">NJ Transit (The Best Way)</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Take the train from <strong>NY Penn Station</strong> to <strong>Secaucus Junction</strong>, then transfer to the Meadowlands Rail Line. It drops you right at the front gate. Total time: ~30-40 mins.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
 <Bus className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Coach USA 351 Express</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Departs from Port Authority Bus Terminal. Non-stop to the stadium. Good backup if trains are suspended, but subject to Lincoln Tunnel traffic.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
 <Car className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Rideshare Warning</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Uber pickup is in Lot E and is a nightmare. <strong>Do not call an Uber from the stadium.</strong> Take the train to Secaucus first, then call your ride.
 </p>
 </div>
 </div>
 </div>
 
 <div className=" rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 h-fit">
 <h4 className="font-bold text-2xl mb-6">Transit Times</h4>
 <ul className="space-y-6">
 {[
 { label: "Manhattan (Penn)", time: "30-40 min train" },
 { label: "Secaucus Junction", time: "10 min train" },
 { label: "Newark Airport (EWR)", time: "40 min train" },
 { label: "JFK Airport", time: "90+ min train" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
 <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
 </li>
 ))}
 </ul>
      <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
        <AffiliateButton href="https://www.njtransit.com/meadowlands" text="View NJ Transit Map" variant="secondary" />
      </div>
    </div>
  </div>
</Section>

 <Section id="parking" title="Parking Strategy">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Prepaid Only", items: ["Must book online", "No cash at gate", "Show pass on phone"] },
 { title: "Cost Reality", items: ["$40-$60 standard", "Higher for World Cup", "Gold/Platinum lots"] },
 { title: "Tailgating", items: ["Huge culture here", "Arrive 4 hours early", "Grills allowed"] }
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
      <AffiliateButton href="https://www.metlifestadium.com/getting-here/parking" text="Pre-Book Parking" variant="secondary" icon={Car} />
    </div>
  </Section>

 <Section id="seating" title="Seating & Views">
<LightboxImage 
       src="/images/stadiums/metlife-stadium-east-rutherford-world-cup-2026-1600.webp" 
       alt="MetLife Stadium Bowl" 
       caption="The massive 82,500 seat bowl of MetLife Stadium."
     />

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 MetLife has no roof. In July, the sun is brutal. The <strong>East Sideline (Sections 109-117, 209-217, 309-317)</strong> faces the setting sun directly. You will bake. Choose the West Sideline or corners for shade.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Best Seats (Shaded)</h4>
 <ul className="space-y-4">
 {[
 { label: "West Sideline", val: "Sec 133-144" },
 { label: "Coaches Club", val: "Sec 111-115C" },
 { label: "Mezzanine Club", val: "200 Level West" },
 { label: "Corners", val: "Sec 201, 226" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-slate-700 dark:text-slate-300">
 <span className="font-medium text-slate-500">{item.label}</span>
 <span className="font-bold">{item.val}</span>
 </li>
 ))}
 </ul>
 </div>
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Value Picks</h4>
 <ul className="space-y-4 text-slate-700 dark:text-slate-300">
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Lower Endzones: Sec 101, 103, 124. Good energy.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Mezzanine Corners: Best balance of view and price.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> 200 Level: Access to better climate-controlled concourses.</li>
 </ul>
 </div>
 </div>
 </Section>

 <Section id="food" title="Food & Drink">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Nona Fusco's Kitchen", desc: "Grandma-style meatballs and meatball sliders. Legitimately good Italian comfort food. Sec 118, 338." },
 { title: "Fat Rooster", desc: "Spicy chicken sandwiches. Crispy, huge portions, and properly spicy. Sec 117, 317." },
 { title: "Global Pies", desc: "Jamaican beef patties with flaky crusts and solid spice levels. A local favorite. Sec 109, 333." }
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

 <Section id="policies" title="Essential Policies">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> Clear Bag Policy</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">Strictly enforced. Do not test them. Allowed: Clear plastic/vinyl bags (12" x 6" x 12") or small clutch purse (4.5" x 6.5").</p>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-bold">BANNED: Backpacks, camera bags, binocular cases.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Pro Tips</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>• Portable chargers are allowed and recommended.</li>
 <li>• Water bottles: One factory-sealed 20oz bottle usually allowed.</li>
 <li>• Lockers: Available outside gates but expensive ($20+) with long lines.</li>
 </ul>
 </div>
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
 <AffiliateButton href="https://www.amazon.com/s?k=clear+stadium+bag&tag=stadiumport-20" text="Buy Clear Stadium Bag" variant="primary" />
 </div>
 </Section>

 <Section id="faq" title="Frequently Asked Questions">
 <div className="space-y-2">
 {[
 { q: "Is the stadium covered?", a: "No. MetLife Stadium is open-air. There is no roof over the field or the seats. If it rains, you get wet. If it's sunny, you need sunscreen." },
 { q: "Can I take the train home after a night match?", a: "Yes, but be patient. The line for the train after a match can take 45-60 minutes to clear. Trains run until the crowds are gone." },
 { q: "What is the 'Wind Tunnel' effect?", a: "In the upper deck (300 level) corners, the wind can whip through gaps in the stadium facade. In summer it's a nice breeze, but can affect ball flight." },
 { q: "Where are the best bathrooms?", a: "The 200-level (Mezzanine) generally has better bathroom ratios than the crowded 100 or 300 levels." },
 { q: "Can I bring a portable charger?", a: "Yes, and you should. Signal can be spotty with 82,000 people, draining your battery. Small portable power banks are permitted." },
 { q: "Is tailgating allowed?", a: "Yes, tailgating is a huge part of the culture here. It is allowed in all parking lots unless otherwise posted." },
 { q: "How far is the stadium from NYC?", a: "About 5 miles west of Manhattan, but with traffic/transit it takes 30-40 minutes." },
 { q: "Can I walk from my hotel?", a: "Only if you are staying at the American Dream mall hotels. Walking from Secaucus or elsewhere is dangerous due to highways." }
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
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>NJ State Police</strong> <span>#77</span></li>
 <li className="flex justify-between"><strong>Guest Services</strong> <span>(201) 559-1515</span></li>
 </ul>
 </div>
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-emerald-500"/> Connectivity</h4>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6">
                <li>• <strong>WiFi:</strong> Free stadium-wide WiFi available.</li>
                <li>• <strong>App:</strong> Download One MetLife Stadium App.</li>
                <li>• <strong>Power:</strong> Bring a power bank.</li>
              </ul>
              <AffiliateButton href="https://airalo.tp.st/yF9Qk3Ol" text="Get US eSIM" variant="secondary" />
            </div>
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 md:col-span-2">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Plane className="w-6 h-6 text-emerald-500"/> International Travel</h4>
 <p className="text-slate-600 dark:text-slate-300 mb-8">
 International visitors to the US typically need a visa or ESTA. Check the latest requirements early.
 </p>
 <div className="flex flex-wrap gap-4">
 <AffiliateButton href="https://esta.cbp.dhs.gov/" text="Check Visa Requirements" icon={FileCheck} />
 <AffiliateButton href="https://www.worldnomads.com/" text="Travel Insurance" icon={Shield} variant="outline" />
 </div>
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















