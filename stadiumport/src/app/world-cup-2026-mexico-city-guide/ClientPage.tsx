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
    const text = "Check out this guide to World Cup 2026 in Mexico City!";
    
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
    primary: "bg-emerald-600 text-slate-900 dark:text-white hover:bg-emerald-700 shadow-[0_10px_40px_-10px_rgba(5,150,105,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(5,150,105,0.6)]",
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
 <details className="group border-b border-slate-200 dark:border-white/10">
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
 { id: 'neighborhoods', label: 'Neighborhoods' },
 { id: 'stadium', label: 'Stadium' },
 { id: 'tickets', label: 'Tickets' },
 { id: 'hotels', label: 'Hotels' },
 { id: 'transport', label: 'Transport' },
 { id: 'dining', label: 'Dining' },
 { id: 'attractions', label: 'Attractions' },
 { id: 'itinerary', label: 'Itinerary' },
 { id: 'tips', label: 'Match Day' },
 { id: 'safety', label: 'Safety' },
 { id: 'culture', label: 'Culture' },
 { id: 'packing', label: 'Packing' },
 { id: 'essential', label: 'Essential' },
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
   src="/images/cities/mexico-city-world-cup-2026-1600.webp" 
   alt="Mexico City Skyline and Estadio Azteca" 
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
             { label: 'Mexico City', href: '/world-cup-2026-mexico-city-guide' }
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
Opening Match Host
</span>
</div>

<h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
Mexico City World Cup 2026 Guide
</h1>
<p className="text-base md:text-lg lg:text-xl text-white/90 font-light max-w-3xl leading-relaxed">
Match-day logistics for Estadio Azteca, neighborhood picks, safety, budgets, and the little local moves that make CDMX feel easy.
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
  I’ve lived in Mexico City long enough to remember when “meet me at El Ángel” didn’t automatically mean “and bring patience for traffic.” For World Cup 2026, the city is going to be loud, proud, and wonderfully overwhelming—especially around the opening match at Estadio Azteca. The good news: if you plan like a local (transit first, neighborhood second, timing always), CDMX is one of the easiest host cities to enjoy.
  </p>
 </div>

 <div className="mb-12 p-8 rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5">
  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Fast Answers (Featured Snippet Edition)</h3>
  <ul className="space-y-3 text-lg text-slate-700 dark:text-slate-300">
   <li>• <strong>Best base for most fans:</strong> Roma Norte or Condesa (walkable, food, nightlife, safe vibes).</li>
   <li>• <strong>Best match-day route to Azteca:</strong> Metro Line 2 to Tasqueña, then Tren Ligero to Estadio Azteca.</li>
   <li>• <strong>How early to leave:</strong> plan to be in the stadium zone <strong>3+ hours</strong> before kickoff.</li>
   <li>• <strong>Money move:</strong> use the Tarjeta de Movilidad Integrada and carry small pesos for stadium-day street food.</li>
  </ul>
 </div>

 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: MapPin, title: "Pick Your Neighborhood, Not Just a Hotel", text: "Roma/Condesa for first-timers, Polanco for luxury, Juárez/Reforma for central convenience, Coyoacán for a calmer, historic vibe." },
 { icon: Train, title: "Traffic Is the Villain (Transit Is the Plot Twist)", text: "On big nights, the fastest way to Azteca often looks “old school”: Metro + Tren Ligero beats a car stuck on Tlalpan." },
 { icon: DollarSign, title: "Value Is Real (But Book Early)", text: "CDMX can be a bargain or a splurge. Match weeks will spike prices, so lock hotels and flights early—then eat like a king for 30 pesos." }
 ].map((item, i) => (
  <div key={i} className="p-8 rounded-[2rem] transition-colors">
   <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
   <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
   <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
  </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
<AffiliateButton href="https://www.skyscanner.com/transport/flights/to/mex" text="Search CDMX Flights" variant="secondary" icon={Plane} />
<AffiliateButton href="https://www.booking.com/searchresults.html?ss=Polanco%2C+Mexico+City" text="Check Hotels in Polanco" variant="primary" icon={Hotel} />
</div>
 </Section>

 <Section id="visa" title="Visa & Entry (Mexico)">
  <div className="grid md:grid-cols-2 gap-8">
   <div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
    <h4 className="font-bold text-2xl mb-4">Who Needs a Visa?</h4>
    <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
      Mexico’s entry rules depend on your passport. Many travelers can enter as tourists without a visa, but the details (length of stay, any online forms, and airline checks) vary. For World Cup planning, treat this as step zero: confirm requirements before you book non-refundable flights.
    </p>
    <AffiliateButton href="https://www.inm.gob.mx/" text="Verify Entry Rules (INM)" variant="outline" />
   </div>
   <div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
    <h4 className="font-bold text-2xl mb-4">Arrival Tips</h4>
     <ul className="space-y-4 mb-8">
 {['Screenshot your hotel address + keep it offline', 'Use authorized airport taxis, ride-share, or a pre-booked transfer', 'Withdraw pesos at a bank ATM once you’re in the city (better rates)'].map((item, i) => (
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
 { time: "9–12 Months Out", desc: "Book flights. CDMX is a major hub, but prices will rise for the Opener. Secure accommodation in Roma or Condesa early." },
 { time: "4–6 Months Out", desc: "Book reservations for top restaurants like Pujol or Quintonil. They book out months in advance." },
 { time: "1–2 Months Out", desc: "Download offline maps. Check vaccine requirements. Learn basic Spanish phrases." }
 ].map((item, i) => (
  <div key={i} className="flex flex-col md:flex-row gap-6 p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem] items-center">
   <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
 <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
 </div>
 ))}
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
<AffiliateButton href="https://www.skyscanner.com" text="Set Flight Alerts" variant="primary" icon={Plane} />
<AffiliateButton href="https://www.opentable.com/r/pujol-ciudad-de-mexico" text="Reserve Pujol (OpenTable)" variant="outline" />
</div>
 </Section>

 <Section id="budget" title="Peso Power Tiers">
  <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Peso Saver", items: ["Hostels + simple hotels (book early for match weeks)", "Street food breakfasts + mercados + one “nice” meal", "Metro/Metrobús for daylight, ride-share at night"] },
 { title: "Smart Comfort", items: ["Roma/Condesa boutique hotel or apartment base", "Mix transit + ride-share to control time", "A couple of museum days + one big day trip"] },
 { title: "Polanco Prestige", items: ["Luxury stays + concierge help for bookings", "Private transfers for airports and late nights", "Fine dining reservations + premium match add-ons"] }
 ].map((tier, i) => (
  <div key={i} className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem] hover:shadow-2xl transition-all duration-300">
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
 <div className="mt-8 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
  <h4 className="font-bold text-2xl mb-4 text-slate-900 dark:text-white">Fast Cost Benchmarks (MXN)</h4>
  <ul className="space-y-3 text-slate-600 dark:text-slate-400">
   <li>• <strong>Street tacos:</strong> often 20–35 each depending on neighborhood and hype.</li>
   <li>• <strong>Full sit-down meal:</strong> roughly 200–500 per person in most tourist zones.</li>
   <li>• <strong>Ride-share across town:</strong> cheap by global standards, but traffic can make it feel “expensive in time.”</li>
   <li>• <strong>Transit:</strong> the city’s public transport stays among the best bargains in North America. <a href="https://www.semovi.cdmx.gob.mx/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-500 font-bold">SEMOVI <ExternalLink className="w-4 h-4" /></a></li>
  </ul>
  <div className="mt-8 flex flex-wrap gap-4 justify-center">
   <AffiliateButton href="https://www.kayak.com/packages/Mexico-City-c30242" text="Compare Flight + Hotel Bundles" variant="secondary" icon={Briefcase} />
   <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Mexico+City" text="Track Hotel Prices" variant="primary" icon={Hotel} />
  </div>
 </div>
 </Section>

 <Section id="neighborhoods" title="Neighborhood-by-Neighborhood Gameplan">
  <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
   <p className="text-xl text-slate-600 dark:text-slate-300">
    In CDMX, your neighborhood is your trip. Pick the wrong base and you’ll spend half your World Cup in traffic. Pick the right one and the city opens up: morning coffee on a leafy street, tacos at midnight, and a match-day plan that actually works.
   </p>
  </div>

  <div className="grid md:grid-cols-2 gap-8">
   {[
    {
     title: 'Roma Norte + La Condesa',
     vibe: 'Walkable, stylish, and the easiest “first CDMX” experience.',
     stay: 'Best all-around base for fans who want food + nightlife + safety.',
     eat: 'Bakeries, tacos, casual gems, and the occasional “we should dress up” dinner.',
     drink: 'Cocktail bars, mezcal spots, and patios that fill up fast on match nights.',
     explore: 'Parque México, street art walks, design shops, Sunday Reforma rides nearby.',
     match: 'To Azteca: aim for Metro Line 2 (via a transfer) + Tren Ligero. Leave early.',
     tag: 'Nightlife + Walkability',
    },
    {
     title: 'Polanco',
     vibe: 'Upscale, polished, and very comfortable—especially for families.',
     stay: 'Luxury hotels, great service, and some of the city’s safest streets.',
     eat: 'World-class dining, steakhouses, sushi, and high-end Mexican.',
     drink: 'Hotel bars, rooftop cocktails, and a calmer late-night scene.',
     explore: 'Chapultepec Park, Museo Nacional de Antropología, shopping, galleries.',
     match: 'Match-day reality: it’s far from Azteca—plan transit or a pre-booked driver.',
     tag: 'Family-Friendly + Luxury',
    },
    {
     title: 'Juárez + Reforma (El Ángel Zone)',
     vibe: 'Central, convenient, and hotel-heavy in a good way.',
     stay: 'Great if you want walkable big-city energy and easy airport logistics.',
     eat: 'Reliable options everywhere—cafés, taquerías, and modern Mexican.',
     drink: 'Busy bars and late nights near Zona Rosa; choose streets carefully.',
     explore: 'Paseo de la Reforma, Chapultepec access, easy day trips to Centro.',
     match: 'Good launch point for getting onto Metro lines before they get packed.',
     tag: 'Convenience + Hotels',
    },
    {
     title: 'Centro Histórico',
     vibe: 'Jaw-dropping history by day, complicated edges by night.',
     stay: 'Beautiful boutique hotels—just prioritize well-reviewed blocks.',
     eat: 'Cantinas, classic diners, and quick market meals.',
     drink: 'Old-school cantina culture; evenings can get rowdy fast.',
     explore: 'Zócalo, Templo Mayor, Palacio de Bellas Artes, mural-hunting.',
     match: 'Early transit access is easy, but late-night returns are best by ride-share.',
     tag: 'History + Daytime Energy',
    },
    {
     title: 'Coyoacán + San Ángel',
     vibe: 'Cobblestones, courtyards, and a calmer rhythm.',
     stay: 'Perfect for families and anyone who wants “Mexico City, but breathable.”',
     eat: 'Markets, chocolate, churros, and proper weekend brunch.',
     drink: 'Low-key evenings—more café than club.',
     explore: 'Frida Kahlo Museum area, plazas, artisan markets, leafy walks.',
     match: 'Closer to Azteca than most tourist zones, but still plan transit buffers.',
     tag: 'Family-Friendly + Culture',
    },
    {
     title: 'Del Valle + Nápoles',
     vibe: 'Local residential with great value and strong food pockets.',
     stay: 'Smart option if Roma/Condesa prices explode during match weeks.',
     eat: 'Neighborhood taquerías, bakeries, and underrated restaurants.',
     drink: 'Casual bars and mezcalerías—less touristy.',
     explore: 'Parks, shopping, and an everyday-city feel.',
     match: 'Good positioning for moving south toward Azteca, depending on traffic.',
     tag: 'Value + Local Feel',
    },
    {
     title: 'Near Estadio Azteca (Santa Úrsula / Coapa area)',
     vibe: 'Match-day intensity, otherwise residential.',
     stay: 'Only choose this if your #1 priority is being close to the stadium.',
     eat: 'Pre-match street food, simple local spots.',
     drink: 'Stadium-night energy, but not the best base for exploring the city.',
     explore: 'You’ll be commuting for museums and nightlife.',
     match: 'Walkable access is the perk—just keep your plans tight and simple.',
     tag: 'Match-Day Convenience',
    },
    {
     title: 'Santa Fe',
     vibe: 'Modern business district, car-first.',
     stay: 'Good for business travelers; not ideal for first-time fans.',
     eat: 'Mall dining + a few standouts.',
     drink: 'Hotel scene; you’ll travel for nightlife.',
     explore: 'Great views and parks, but you’ll feel far from the “classic” city.',
     match: 'Traffic can be brutal—build massive buffers on match days.',
     tag: 'Business + Quiet Nights',
    },
   ].map((n, i) => (
    <div key={i} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
     <div className="flex items-start justify-between gap-6 mb-4">
      <h4 className="font-bold text-2xl text-slate-900 dark:text-white">{n.title}</h4>
      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full whitespace-nowrap">
       {n.tag}
      </span>
     </div>
     <p className="text-slate-600 dark:text-slate-400 mb-6">{n.vibe}</p>
     <ul className="space-y-2 text-slate-600 dark:text-slate-400">
      <li>• <strong>Stay:</strong> {n.stay}</li>
      <li>• <strong>Eat:</strong> {n.eat}</li>
      <li>• <strong>Drink:</strong> {n.drink}</li>
      <li>• <strong>Explore:</strong> {n.explore}</li>
      <li>• <strong>Match-day:</strong> {n.match}</li>
     </ul>
    </div>
   ))}
  </div>

  <div className="mt-12 flex flex-wrap gap-4">
   <AffiliateButton href="https://www.booking.com/city/mx/mexico-city.html" text="Search Neighborhood Hotels" variant="primary" icon={Hotel} />
   <AffiliateButton href="https://www.airbnb.com/s/Mexico-City--Mexico/homes" text="Check Apartments for Groups" variant="outline" icon={Users} />
  </div>
 </Section>

 <Section id="stadium" title="Estadio Azteca">
<LightboxImage 
src="/images/stadiums/estadio-azteca-mexico-city-world-cup-2026-1600.webp" 
alt="Estadio Azteca Interior" 
caption="The legendary 'Colossus of Saint Ursula', home to two World Cup finals."
/>

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 <strong>Estadio Azteca</strong> is hallowed ground. It is the only stadium to host two FIFA World Cup Finals (Pelé in 1970, Maradona in 1986). Known as the "Colossus of Saint Ursula," it is undergoing massive renovations for 2026 to modernize its facilities while keeping its intimidating atmosphere.
 </p>
 <p>
  FIFA’s tournament materials list five World Cup 2026 matches here, including the opener on <strong>June 11, 2026</strong>. <a href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/estadio-azteca-mexico-city-host-opening-match-world-cup-2026" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-500 font-bold">FIFA fixtures <ExternalLink className="w-4 h-4" /></a>
 </p>
 <p>
  For entrances, seating feel, and the “what do I actually do when I get there” details, use the dedicated stadium deep dive: <Link href="/estadio-azteca-world-cup-2026" className="text-emerald-600 hover:text-emerald-500 font-bold">Estadio Azteca World Cup 2026 guide</Link>.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
  <div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
   <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Key Features</h4>
 <ul className="space-y-4">
 {[
 { label: "Capacity", val: "83,000 (FIFA listing)" },
 { label: "Opened", val: "1966" },
 { label: "Elevation", val: "7,350 ft (2,240m)" },
 { label: "Opened", val: "1966" }
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
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Arrive Early: Traffic to Santa Ursula is notoriously bad.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Cash: Bring pesos for vendors outside the stadium.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Rain: Ponchos are essential for afternoon matches.</li>
 </ul>
 </div>
 </div>
 
 <div className="p-8 rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5">
  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
   <div>
    <h4 className="text-2xl font-bold mb-2">Opening Match Venue</h4>
    <p className="text-slate-600 dark:text-slate-400">Be there for the historic first match of World Cup 2026 at Estadio Azteca.</p>
   </div>
   <AffiliateButton href="https://www.viagogo.com/Sports-Tickets/International-Soccer/World-Cup-Tickets" text="Search Tickets" variant="primary" icon={Ticket} />
  </div>
 </div>
 </Section>

 <Section id="tips" title="Match Day Gameplan">
 <div className="grid md:grid-cols-3 gap-6 mb-8">
 {[
 { title: "Transport", text: "Take the Metro (Line 2) to Tasqueña, then transfer to the Light Rail. Allow 90+ mins from Centro." },
 { title: "Hydration", text: "The altitude is real. Drink water constantly. Alcohol hits harder here." },
 { title: "Exit", text: "Leaving is chaotic. Walk a few blocks away from the stadium to catch an Uber, or wait out the crowd." }
 ].map((item, i) => (
 <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="flex flex-wrap gap-4">
<AffiliateButton href="https://www.amazon.com/s?k=rain+poncho" text="Buy Rain Poncho" variant="primary" />
<AffiliateButton href="https://www.metro.cdmx.gob.mx/la-red/mapa-de-la-red" text="Metro Map Download" variant="outline" />
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
 { stage: "June 11 - Group Stage", count: "OPENING MATCH", color: "text-amber-400" },
 { stage: "June 17 - Group Stage", count: "Fixture", color: "text-emerald-300" },
 { stage: "June 24 - Group Stage", count: "Mexico Likely", color: "text-emerald-300" },
 { stage: "June 30 - Round of 32", count: "Fixture", color: "text-emerald-300" },
 { stage: "July 5 - Round of 16", count: "Last Match in CDMX", color: "text-emerald-300" }
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
 Demand for the Opening Match will be unprecedented. Register on FIFA.com immediately.
 </p>
 <AffiliateButton href="https://www.fifa.com" text="FIFA Official Site" variant="secondary" />
 </div>
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Resale Market</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8">
 Verified resale is the only safe alternative. Avoid street scalpers ("revendedores") at all costs—fake tickets are common.
 </p>
 <AffiliateButton href="https://www.stubhub.com/" text="Check StubHub" variant="primary" />
 </div>
 </div>
 </Section>

 <Section id="hotels" title="Where to Stay">
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl leading-relaxed">
 CDMX is huge. Your neighborhood defines your experience. <strong>Polanco</strong> is upscale and safe. <strong>Roma/Condesa</strong> are walkable and trendy. <strong>Reforma</strong> is central. <strong>Centro</strong> is historic but crowded.
 </p>
 
 <div className="space-y-8">
 <HotelCard 
 name="Hyatt Regency Mexico City"
 rating={4.7}
 price="$250 - $400"
 distance="Polanco Area"
 features={['Luxury', 'Safe', 'Great Dining']}
 image="/images/cities/mexico-city-world-cup-2026.webp" 
 link="https://www.booking.com/hotel/mx/hyatt-regency-mexico-city.html"
 />
 <HotelCard 
 name="Condesa DF"
 rating={4.5}
 price="$200 - $350"
 distance="Condesa"
 features={['Boutique', 'Rooftop Bar', 'Trendy']}
 image="/images/cities/mexico-city-world-cup-2026.webp" 
 link="https://www.booking.com/hotel/mx/condesa-df.html"
 />
 <HotelCard 
 name="Hampton Inn & Suites Centro"
 rating={4.3}
 price="$100 - $180"
 distance="Centro Historico"
 features={['Historic Building', 'Budget Friendly', 'Busy']}
 image="/images/cities/mexico-city-world-cup-2026.webp" 
 link="https://www.booking.com/hotel/mx/hampton-inn-suites-mexico-city-centro-historico.html"
 />
 </div>
 
 <div className="mt-12 text-center">
<AffiliateButton href="https://www.booking.com/searchresults.html?ss=Mexico+City" text="Search All CDMX Hotels" variant="outline" />
</div>
 </Section>

 <Section id="transport" title="Getting Around">
 <div className="grid lg:grid-cols-2 gap-12">
 <div className="space-y-8">
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
 <Plane className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">MEX Airport</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Main international hub. Located in the city, but traffic to Roma/Polanco can take 60+ mins. Authorized taxis or Uber are best.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
 <Train className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Metro & Light Rail</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Cheap and efficient. Take Line 2 to Tasqueña, then the Light Rail to Estadio Azteca. Avoid at night.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
 <Car className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Uber</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Safe, reliable, and cheap by international standards. The best way to get around at night.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
 <AlertTriangle className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Street Taxis</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Avoid hailing pink/white taxis on the street. Use authorized "Sitio" stands or apps like Uber/Didi.
 </p>
 </div>
 </div>
 </div>
 
 <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/10 h-fit">
 <h4 className="font-bold text-2xl mb-6">Traffic Reality</h4>
 <ul className="space-y-6">
 {[
 { label: "Centro to Stadium", time: "60-90 min" },
 { label: "Polanco to Stadium", time: "60-90 min" },
 { label: "Airport to Centro", time: "30-60 min" },
 { label: "Rush Hour", time: "Avoid 7-9AM / 6-8PM" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-white/10 pb-4 last:border-0 last:pb-0">
 <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
 </li>
 ))}
 </ul>
 <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10">
<AffiliateButton href="https://www.uber.com/global/en/cities/mexico-city/" text="Book Private Driver" variant="secondary" />
</div>
 </div>
 </div>
 </Section>

 <Section id="dining" title="Food & Drink">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Tacos al Pastor", desc: "The king of CDMX street food. Try El Huequito or El Tizoncito for the authentic spit-roasted pork experience." },
 { title: "Churros", desc: "El Moro is an institution. Get them fresh with hot chocolate. Open 24/7 in some locations." },
 { title: "Fine Dining", desc: "Pujol and Quintonil are world-famous. Reservations required months in advance. Amazing mole." }
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
 Between matches, CDMX offers some of the best cultural experiences in the world.
 </p>
 <div className="space-y-6">
{[
{ title: "Teotihuacan Pyramids", desc: "Massive Aztec pyramids about an hour outside the city. Go early (8 AM) to beat the heat and crowds.", color: "text-amber-500" },
{ title: "Anthropology Museum", desc: "World-class museum in Chapultepec Park. Contains the Aztec Sun Stone. You could spend days here.", color: "text-blue-500" },
{ title: "Lucha Libre", desc: "Mexican wrestling at Arena Mexico. High energy, masks, and great fun. Tuesdays and Fridays.", color: "text-emerald-500" }
].map((item, i) => (
<div key={i} className="flex gap-6 items-center p-6 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 transition-all hover:shadow-lg">
<div className="bg-slate-100 dark:bg-white/5 p-4 rounded-2xl shrink-0">
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
<AffiliateButton href="https://www.viator.com/Mexico-City-tours/Teotihuacan-Pyramids/d628-a890" text="Book Teotihuacan Tour" variant="primary" />
</div>
 </Section>

 <Section id="safety" title="Safety & Security">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
<h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> Safe Zones</h4>
<p className="text-slate-600 dark:text-slate-400 leading-relaxed">Roma, Condesa, Polanco, and Reforma are generally safe for tourists. Centro is fine during the day but can be sketchy at night.</p>
</div>
<div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Caution Areas</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>• Avoid Tepito and Doctores neighborhoods.</li>
 <li>• Watch for pickpockets in the Metro and crowded plazas.</li>
 <li>• Do not drink tap water. Bottled water only.</li>
 </ul>
 <div className="mt-6">
<AffiliateButton href="https://www.worldnomads.com/" text="Get Travel Insurance" variant="secondary" />
</div>
 </div>
 </div>
 </Section>

 <Section id="culture" title="Cultural Intelligence">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">Mexicans are incredibly warm and hospitable. A little effort with Spanish goes a long way.</p>
 <div className="grid md:grid-cols-3 gap-6">
{[
{ title: "Propina (Tipping)", desc: "10-15% is standard in restaurants. Leave small change for street vendors." },
{ title: "Comida (Lunch)", desc: "The main meal is eaten between 2 PM and 4 PM. Restaurants will be packed." },
{ title: "Greetings", desc: "A handshake or a light hug/kiss on the cheek is common. Say 'Buenos días' or 'Buenas tardes'." }
].map((item, i) => (
<div key={i} className="p-6 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl hover:shadow-lg transition-all">
<h4 className="font-bold mb-3">{item.title}</h4>
<p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
</div>
))}
</div>
 </Section>

 <Section id="packing" title="Climate & Packing">
 <div className="grid md:grid-cols-3 gap-6">
 <div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Sun className="w-6 h-6 text-amber-500"/> June Weather</h4>
 <p className="text-slate-600 dark:text-slate-400">Rainy season. Sunny mornings, heavy rainstorms in late afternoon (5-7 PM). Mild temps (75F/24C).</p>
 </div>
 <div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Essentials</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400">
 <li>• Rain jacket / Poncho</li>
 <li>• Comfortable walking shoes</li>
 <li>• Power bank</li>
 </ul>
 </div>
 <div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Tech</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-6">
 <li>• US Plugs (Type A/B) work here</li>
 <li>• Offline translation app</li>
 <li>• WhatsApp (used by everyone)</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com/mexico-esim" text="Get an eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <Section id="faq" title="Frequently Asked Questions">
 <div className="space-y-2">
 {[
 { q: "Is Mexico City safe for tourists?", a: "Yes, in the main tourist areas (Roma, Condesa, Polanco, Centro). Use common sense, avoid bad neighborhoods, and use Uber at night." },
 { q: "Can I drink the water?", a: "No. Never drink tap water. Use bottled water for drinking and brushing teeth to avoid 'Montezuma's Revenge'." },
 { q: "Do I need to speak Spanish?", a: "It helps immensely. In tourist areas, English is common, but street vendors and taxi drivers may not speak it. Learn the basics." },
 { q: "How high is the altitude?", a: "7,350 feet (2,240m). You might feel short of breath or get a headache. Drink lots of water and take it easy the first day." },
 { q: "How do I get tickets to the Opening Match?", a: "Apply via FIFA.com lottery. Demand will be extremely high. Resale prices will be significant." },
 { q: "What currency should I use?", a: "Mexican Pesos (MXN). Credit cards work in hotels/restaurants, but you need cash for street food and small shops." },
 { q: "Is there Uber in Mexico City?", a: "Yes, it is excellent, safe, and cheap. It is highly recommended over street taxis." },
 { q: "What is the best way to the stadium?", a: "The Light Rail (Tren Ligero) to Estadio Azteca station avoids traffic. Ubers will get stuck in gridlock on match days." },
 { q: "What if I get sick?", a: "Pharmacies (Farmacias) are everywhere and have doctors attached ($3-5 USD consult). For emergencies, private hospitals are world-class." },
 { q: "Can I pay with US Dollars?", a: "Not recommended. The exchange rate will be bad. Withdraw pesos from an ATM." }
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
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>Emergency (Police/Ambulance)</strong> <span>911</span></li>
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>Tourist Assistance</strong> <span>078</span></li>
 <li className="flex justify-between"><strong>Hospital</strong> <span>Hospital Ángeles / ABC</span></li>
 </ul>
 </div>
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-emerald-500"/> Connectivity</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6">
 <li>• <strong>WiFi:</strong> Good in hotels/cafes.</li>
 <li>• <strong>Power:</strong> 120V, Type A/B (Same as US).</li>
 <li>• <strong>Sim Cards:</strong> Telcel is best. Buy at OXXO.</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com/mexico-esim" text="Get an Airalo eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <div className="mt-24 pt-12 border-t border-slate-200 dark:border-white/10">
        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Explore Other Host Cities</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'New York/New Jersey', slug: 'world-cup-2026-new-york-new-jersey-guide' },
            { name: 'Los Angeles', slug: 'world-cup-2026-los-angeles-guide' },
            { name: 'Atlanta', slug: 'world-cup-2026-atlanta-guide' },
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









