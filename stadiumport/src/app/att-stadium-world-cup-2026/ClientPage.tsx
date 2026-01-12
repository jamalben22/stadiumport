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

// 1. Sticky Save Guide Button - REMOVED (Integrated into Hero)

// 2. Floating Social Share
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
 src="/images/stadiums/att-stadium-arlington-texas-world-cup-2026-1600.webp" 
 alt="AT&T Stadium" 
 fill 
 className="object-cover"
 priority sizes="100vw" />
 <div className="absolute inset-0 bg-gradient-to-b from-slate-200/40 via-slate-200/60 to-[#F5F5F7] dark:from-[#0A0A0A]/40 dark:via-[#0A0A0A]/60 dark:to-[#0A0A0A]" />
 </div>

 <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-end md:items-center justify-between gap-12 pt-20">
 <div className="max-w-4xl">
 {/* Breadcrumb */}
 <Breadcrumb 
 items={[
 { label: "Stadiums", href: "/world-cup-2026-stadiums" },
 { label: "AT&T Stadium", href: "/att-stadium-world-cup-2026" }
 ]} 
 />

 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
 >
 <div className="flex items-center gap-4 mb-6">
 <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
 Last Updated: January 4, 2026
 </span>
 <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
 Host City Venue
 </span>
 <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
 Semi-Final Host
 </span>
 </div>
 
 <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-[0.9]">
 AT&T<br />STADIUM
 </h1>
 <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light max-w-xl leading-relaxed">
              Welcome to "Jerry World." The definitive guide to the 2026 World Cup's most spectacular venue.
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
 AT&T Stadium is an architectural marvel and a beast of a venue. Located in Arlington, between Dallas and Fort Worth, it requires a completely different strategy than urban stadiums. There is <strong>no public train</strong> to the stadium. Your logistics game needs to be on point.
 </p>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: MapPin, title: "Where to Base", text: "Arlington for proximity (expensive). Dallas (Uptown/Deep Ellum) for nightlife. Fort Worth for culture." },
 { icon: Car, title: "Transport Strategy", text: "NO TRAINS. You must drive or rideshare. Pre-book parking months in advance or use the J. Gilligan's shuttle." },
 { icon: DollarSign, title: "Budget Signals", text: "Accommodations near the stadium will be astronomical. Look for hotels along I-30 for better value." }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] transition-colors">
 <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
        <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/dfw" text="Search Dallas Flights" variant="secondary" icon={Plane} />
        <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Arlington+Texas" text="Check Stadium Area Hotels" variant="primary" icon={Hotel} />
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
          {['Use DFW or Love Field (DAL) automated control', 'Proof of onward travel required', 'Carry digital copies of tickets'].map((item, i) => (
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
 { time: "6–9 Months Out", desc: "Book flights and refundable hotels. Decide if you want to be near the stadium (Arlington) or the action (Dallas/Fort Worth)." },
 { time: "3–6 Months Out", desc: "Secure match tickets. MANDATORY: Pre-book stadium parking if you plan to drive. It will sell out." },
 { time: "1–3 Months Out", desc: "Lock in eSIMs, clear stadium bags, and day trips. Reserve tables at Texas Live! for pre-game." }
 ].map((item, i) => (
 <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center">
 <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
 <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
 </div>
 ))}
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
        <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/dfw" text="Set Flight Alerts" variant="primary" icon={Plane} />
        <AffiliateButton href="https://www.opentable.com/dallas-restaurants" text="Reserve Restaurant Tables" variant="outline" />
      </div>
    </Section>

 <Section id="budget" title="Budget Tiers">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Smart Saver", items: ["Stay in Irving or Grand Prairie", "Eat local Tex-Mex", "J. Gilligan's Shuttle"] },
 { title: "Comfort Upgrades", items: ["Downtown Dallas hotels", "Uber to stadium", "Texas Live! dining"] },
 { title: "Premium", items: ["Live! by Loews Hotel (On-site)", "Stadium Club access", "VIP Parking"] }
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
        <AffiliateButton href="https://www.viator.com/Dallas-tourism/d918-r58660086872-s194458348" text="Search Dallas Packages" variant="secondary" icon={Briefcase} />
      </div>
    </Section>

 <Section id="stadium" title="AT&T Stadium">
 <LightboxImage 
          src="/images/stadiums/att-stadium-arlington-texas-world-cup-2026-1600.webp" 
          alt="AT&T Stadium World Cup 2026 Seating" 
          caption="AT&T Stadium is ready for World Cup 2026 with its massive HD screen and retractable roof."
        />

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 Known as "The Death Star," <strong>AT&T Stadium</strong> is the world's largest column-free room. It features a retractable roof, glass doors at the end zones, and a video board that stretches from 20-yard line to 20-yard line. It is loud, opulent, and an essential pilgrimage for any sports fan.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Key Features</h4>
 <ul className="space-y-4">
 {[
 { label: "Capacity", val: "80,000+ (Expandable)" },
 { label: "Surface", val: "Matrix Turf (Grass for WC)" },
 { label: "Roof", val: "Retractable" },
 { label: "Built", val: "2009 ($1.3 Billion)" }
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
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Standing Room: 'Party Pass' decks are fun but crowded.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Screen: You will watch the screen more than the field.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> AC: It is always 72°F inside, regardless of Texas heat.</li>
 </ul>
 </div>
 </div>
 
 <div className="p-8 rounded-[2rem] border border-emerald-500/20">
 <p className="text-lg text-center font-medium text-emerald-800 dark:text-emerald-200">
 <strong>Getting There:</strong> This is a car-dependent venue. There is no train. You must arrange parking or rideshare drop-off (Lot 15) in advance.
 </p>
 </div>
 </Section>

 <Section id="tips" title="Match Day Gameplan">
 <div className="grid md:grid-cols-3 gap-6 mb-8">
 {[
 { title: "Arrival", text: "Traffic on I-30 is heavy. Arrive 3-4 hours early. Head to Texas Live! for pre-game entertainment." },
 { title: "Bag Policy", text: "Strict clear bag policy. 12x6x12 inches maximum. No purses or backpacks allowed." },
 { title: "Exit Plan", text: "Rideshare lines will be hours long. Consider walking to a nearby hotel bar to wait it out." }
 ].map((item, i) => (
 <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="flex flex-wrap gap-4">
 <AffiliateButton href="https://www.amazon.com/s?k=clear+stadium+bag&tag=stadiumport-20" text="Buy Clear Stadium Bag" variant="primary" />
        <AffiliateButton href="https://attstadium.com/parking/" text="Pre-Book Parking" variant="outline" />
 </div>
 </Section>

 <Section id="tickets" title="Schedule & Tickets">
        <div className="bg-emerald-900 dark:bg-emerald-950 text-slate-900 dark:text-white rounded-[2.5rem] p-8 md:p-12 mb-12 relative overflow-hidden shadow-2xl">
 
 <div className="relative z-10">
 <div className="flex items-center gap-4 mb-8">
 <Ticket className="w-8 h-8 text-emerald-400" />
 <h3 className="text-3xl font-black">Confirmed Matches (9)</h3>
 </div>
 <div className="space-y-6">
 {[
 { stage: "Group Stage", count: "5 Matches", color: "text-emerald-300" },
 { stage: "Round of 32", count: "2 Matches", color: "text-emerald-300" },
 { stage: "Round of 16", count: "1 Match", color: "text-emerald-300" },
 { stage: "Semi-Final", count: "🏆 HOST MATCH", color: "text-amber-400" }
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
 <AffiliateButton href="https://www.stubhub.com/" text="Check StubHub" variant="primary" />
 </div>
 </div>
 </Section>

 <Section id="hotels" title="Where to Stay">
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl leading-relaxed">
 You have three choices: <strong>Arlington</strong> (Walk to stadium, expensive), <strong>Dallas</strong> (Urban vibes, drive to game), or <strong>Fort Worth</strong> (Cowboy culture, drive to game).
 </p>
 
 <div className="space-y-8">
      <HotelCard 
          name="Live! by Loews - Arlington, TX"
          rating={9.3}
          price="$400+"
          distance="0.2 miles"
          features={["Luxury", "Walk to Stadium", "Infinity Pool"]}
          image="/images/hotels/dallas/live-by-loews.jpg" 
          link="https://www.booking.com/hotel/us/live-by-loews-arlington-tx.html"
        />
        <HotelCard 
          name="Drury Plaza Hotel Dallas Arlington"
          rating={9.6}
          price="$200-300"
          distance="1.1 miles"
          features={["Mid-Range", "Free Breakfast", "Free Dinner/Drinks"]}
          image="/images/hotels/dallas/drury-plaza.jpg"
          link="https://www.booking.com/hotel/us/drury-plaza-dallas-arlington.html"
        />
        <HotelCard 
          name="Howard Johnson by Wyndham Arlington"
          rating={8.0}
          price="Under $150"
          distance="1.8 miles"
          features={['Budget', 'Pool', 'Free WiFi']}
          image="/images/hotels/dallas/howard-johnson.jpg" 
          link="https://www.booking.com/hotel/us/howard-johnson-arlington.html"
        />
    </div>
 
 <div className="mt-12 text-center">
        <AffiliateButton href="https://www.booking.com/city/us/arlington-texas.html" text="Search All Dallas/Arlington Hotels" variant="outline" />
      </div>
 </Section>

 <Section id="transport" title="Getting Around">
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className="space-y-8">
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
 <Car className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Driving & Parking</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 This is the primary way to get to the stadium. Parking passes are essential. Blue & Silver lots are closest. Lots 10-12 are cheaper but a longer walk.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
 <Plane className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Airports</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 DFW International is a major global hub. Dallas Love Field (DAL) is closer to downtown Dallas. Both require a car/Uber to reach Arlington.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
 <Bus className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Shuttles</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 J. Gilligan's Bar & Grill offers a famous shuttle service from their location in Arlington. It's often easier than fighting stadium traffic.
 </p>
 </div>
 </div>
 </div>
 
 <div className=" rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 h-fit">
 <h4 className="font-bold text-2xl mb-6">Drive Times (No Traffic)</h4>
 <ul className="space-y-6">
 {[
 { label: "DFW Airport", time: "20 mins" },
 { label: "Downtown Dallas", time: "25 mins" },
 { label: "Fort Worth", time: "20 mins" },
 { label: "Love Field (DAL)", time: "30 mins" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
 <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
 </li>
 ))}
 </ul>
 <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
        <AffiliateButton href="https://www.booking.com/cars/" text="Rent a Car at DFW" variant="secondary" />
      </div>
 </div>
 </div>
 </Section>

 <Section id="dining" title="Food & Drink">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Texas BBQ", desc: "You're in Texas. Brisket is mandatory. Try Hurtado Barbecue in Arlington or Pecan Lodge in Dallas." },
 { title: "Texas Live!", desc: "A massive entertainment district right next to the stadium. Huge screens, multiple bars, and great atmosphere." },
 { title: "Tex-Mex", desc: "Fajitas and margaritas are a staple. Mariano's Hacienda is a local favorite for frozen margs." }
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
 Arlington is the "Entertainment Capital of Texas." Beyond the stadium, there is plenty to do within a 5-mile radius.
 </p>
 <div className="space-y-6">
 {[
 { title: "Six Flags Over Texas", desc: "The original Six Flags theme park. massive roller coasters and thrills just down the street.", color: "text-blue-500" },
 { title: "Globe Life Field", desc: "Home of the Texas Rangers. Often hosts events and tours. Features a retractable roof.", color: "text-red-500" },
 { title: "Fort Worth Stockyards", desc: "See the daily cattle drive, rodeos, and authentic cowboy culture. About 25 mins away.", color: "text-emerald-500" }
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
      <AffiliateButton href="https://www.citypass.com/dallas" text="Get CityPASS" variant="primary" />
    </div>
  </Section>

 <Section id="safety" title="Safety & Security">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> Event Patterns</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">The stadium area (Entertainment District) is heavily patrolled and very safe. Be careful when walking long distances to remote parking lots at night.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Practical Tips</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>• Hydrate. The Texas sun is intense.</li>
 <li>• Lock car doors. Parking lots are huge.</li>
 <li>• Use the 'Live!' district for safe meetups.</li>
 </ul>
 <div className="mt-6">
        <AffiliateButton href="https://www.worldnomads.com/" text="Get Travel Insurance" variant="secondary" />
      </div>
 </div>
 </div>
 </Section>

 <Section id="culture" title="Cultural Intelligence">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">Texas is known for its friendliness ("Southern Hospitality"). People will talk to you. Say "Y'all."</p>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { title: "Tailgating", desc: "It's a religion here. Grass lots around the stadium will be full of BBQs and fans hours before kickoff." },
 { title: "Dress Code", desc: "Casual. Jerseys and jeans. Cowboy boots are common but not required. Dress for heat outside." },
 { title: "Tipping", desc: "Standard US rules apply. 20% for service. Bartenders expect $1-2 per drink." }
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
 <p className="text-slate-600 dark:text-slate-400">Brutal heat. 95°F+ (35°C+). High humidity. But the stadium is 72°F. Bring sunglasses and sunscreen.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Essentials</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400">
 <li>• Clear bag (Strictly enforced)</li>
 <li>• Hat / Sunglasses</li>
 <li>• Light jacket for inside AC</li>
 </ul>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Tech</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-6">
 <li>• US plug adapters (Type A/B)</li>
 <li>• Uber/Lyft Apps installed</li>
 <li>• Mobile tickets downloaded</li>
 </ul>
 <AffiliateButton href="https://airalo.tp.st/yF9Qk3Ol" text="Get an eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <Section id="faq" title="Frequently Asked Questions">
 <div className="space-y-2">
 {[
 { q: "Where is the stadium located?", a: "In Arlington, TX. It is roughly halfway between Dallas (20 miles) and Fort Worth (15 miles)." },
 { q: "Is there public transport to the stadium?", a: "NO. There is no train or bus system that connects directly to the stadium for events. You must drive or rideshare." },
 { q: "Is the stadium air-conditioned?", a: "Yes, very well. Even if it is 100°F outside, it will be comfortable inside." },
 { q: "Can I walk from my hotel?", a: "Only if you stay at the few hotels in the Entertainment District (Live! by Loews, Sheraton Arlington). Others are too far/not walkable." },
 { q: "What is the bag policy?", a: "Strict NFL style. Clear plastic bags only, max 12x6x12 inches. Small clutches 4.5x6.5 inches allowed." },
 { q: "Where is the best place to park?", a: "Blue and Silver lots are closest but expensive. Pre-booking is mandatory for all lots." },
 { q: "What airport should I fly into?", a: "DFW International is the main hub with most flights. Dallas Love Field (DAL) is good for domestic Southwest flights." },
 { q: "Is tailgating allowed?", a: "Yes, in designated grassy areas on the perimeter of parking lots. It is a huge part of the culture here." },
 { q: "Can I bring a camera?", a: "Compact cameras are usually allowed. Professional cameras with detachable lenses are typically prohibited." },
 { q: "Is there WiFi?", a: "Yes, AT&T Stadium has excellent high-density WiFi throughout the venue." },
 { q: "Where are the Uber/Lyft zones?", a: "Typically in Lot 15, which is a bit of a walk from the stadium entrances. Follow signage." },
 { q: "Is it safe to walk around at night?", a: "The immediate stadium area is safe during events. However, Arlington is a driving city, and walking along major roads can be difficult due to lack of sidewalks." }
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
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>Non-Emergency</strong> <span>311</span></li>
 <li className="flex justify-between"><strong>Hospital</strong> <span>Texas Health Arlington Memorial</span></li>
 </ul>
 </div>
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-emerald-500"/> Connectivity</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6">
 <li>• <strong>WiFi:</strong> Free at Stadium (AT&T 5G).</li>
 <li>• <strong>Power:</strong> 120V, Type A/B plugs.</li>
 <li>• <strong>Sim Cards:</strong> Best to buy eSim or at DFW.</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com/" text="Get an Airalo eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Explore Other Host Cities</h3>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {['New York/New Jersey', 'Los Angeles', 'Mexico City', 'Toronto', 'Atlanta', 'Miami', 'Seattle', 'Boston'].map((city) => (
 <Link key={city} href={`/world-cup-2026-host-cities`} className="block p-4 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center font-bold text-slate-700 dark:text-slate-200">
 {city}
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















