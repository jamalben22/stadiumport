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
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Check out this Monterrey City Guide for World Cup 2026!";
    
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
    <section id={id} ref={ref} className={`py-12 md:py-20 scroll-mt-24 ${className}`}>
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-10 tracking-tight">
          <span className="text-emerald-500 text-sm md:text-base font-bold uppercase tracking-[0.2em] block mb-3">Guide Section</span>
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
 <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> StadiumPort Score: {rating.toFixed(1)}/5
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
 { id: 'essential', label: 'Essentials' },
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
<div className="relative h-[75vh] md:h-[85vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
  <div className="absolute inset-0 z-0">
    <Image 
      src="/images/cities/monterrey-world-cup-2026-1600.webp" 
      alt="Monterrey Skyline" 
      fill 
      className="object-cover"
      priority quality={60} 
      sizes="100vw" 
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#F5F5F7] dark:to-[#0A0A0A]" />
  </div>

  <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col items-start justify-center pt-20">
    <div className="max-w-5xl">
      {/* Breadcrumbs */}
      <Breadcrumb 
        variant="white"
        items={[
          { label: 'Host Cities', href: '/world-cup-2026-host-cities' },
          { label: 'Monterrey', href: '/world-cup-2026-monterrey-guide' }
        ]} 
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8"
      >
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
            Last Updated: January 7, 2026
          </span>
          <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-medium tracking-widest uppercase backdrop-blur-md">
            Host City
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
            Round of 32 Host
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9] md:leading-[0.95]">
          Monterrey World Cup 2026 Guide
        </h1>
        
        <p className="text-base md:text-lg lg:text-xl text-white/90 font-light max-w-3xl leading-relaxed">
          If you want the “local” version of Monterrey—fast, proud, a little blunt, and wildly underrated—this is it. Let’s get you to <span className="text-white font-medium">Estadio BBVA</span> without losing an hour to traffic.
        </p>
      </motion.div>
    </div>
  </div>
</div>

<div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto px-6 gap-12 relative pt-16">
 
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
 I’ve called Monterrey home for more than twenty years, and I can tell you exactly how this city works: it moves fast, it eats late, it sweats proudly, and it rewards people who plan. The payoff is huge—World Cup matches at Estadio BBVA with that Cerro de la Silla backdrop that makes your camera look like it’s lying.
 </p>
 <p>
 This Monterrey World Cup 2026 guide is built for real travel decisions: which neighborhoods save you time on match day, where the nightlife actually is (and where it just pretends), how to use Metrorrey without confusion, and what locals do when visitors ask, “So… what should I eat first?”
 </p>
 <h3>Monterrey at a glance (save this)</h3>
 <ul>
   <li><strong>Best base for comfort:</strong> San Pedro Garza García (walkable pockets, best hotels, easiest “first trip to Mexico” vibe).</li>
   <li><strong>Best base for character:</strong> Centro + Barrio Antiguo (history, bars, street life—just use rideshare late).</li>
   <li><strong>Match-day reality:</strong> the stadium is in Guadalupe; traffic spikes hard; Metrorrey Line 1 helps you dodge the worst of it.</li>
   <li><strong>Don’t skip:</strong> Parque Fundidora at golden hour, a carne asada night, and one proper mountain viewpoint (Obispado or Chipinque).</li>
 </ul>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: MapPin, title: "Where to Base", text: "San Pedro for easy mode. Centro/Barrio Antiguo for culture + nightlife. Valle Oriente splits the difference." },
 { icon: Train, title: "Match-Day Transport", text: "Build your plan around Metrorrey Line 1 (Exposición) + walking routes. Use rideshare for everything else." },
 { icon: DollarSign, title: "Cost Reality", text: "Monterrey isn’t ‘cheap Mexico’—it’s a business city. You can still travel smart with tacos, metro, and the right neighborhood." }
 ].map((item, i) => (
  <div key={i} className="p-8 rounded-[2rem] transition-colors">
  <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
  <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
  </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
        <AffiliateButton href="https://www.skyscanner.com/transport/flights-to/mty" text="Search Monterrey Flights" variant="secondary" icon={Plane} />
        <AffiliateButton href="https://www.booking.com/searchresults.html?ss=San+Pedro+Garza+Garcia" text="Check San Pedro Hotels" variant="primary" icon={Hotel} />
        <AffiliateButton href="https://www.safetywing.com/" text="Compare Travel Insurance" variant="outline" icon={Shield} />
      </div>
 </Section>

 <Section id="visa" title="Visa & Entry (Mexico)">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Who Needs a Visa?</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
 Many travelers (USA, Canada, UK, EU, Australia, and more) enter Mexico visa-free for tourism, but rules depend on your passport and your itinerary. On arrival, you’ll be processed through Mexico immigration and issued your entry record (often digital; sometimes paper depending on the airport/system that day).
 </p>
 <AffiliateButton href="https://www.inm.gob.mx/" text="Mexico Immigration (INM)" variant="outline" />
 </div>
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Arrival Tips</h4>
 <ul className="space-y-4 mb-8">
 {[
  'Bring the passport you used to book flights (names must match exactly).',
  'Save a screenshot of your hotel address + match tickets (immigration may ask your plan).',
  'Use authorized airport taxis or a pre-booked transfer as your default.',
 ].map((item, i) => (
  <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
  <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
  </li>
 ))}
 </ul>
 <AffiliateButton href="https://www.worldnomads.com/" text="Travel Insurance (World Cup Trips)" variant="secondary" />
 </div>
 </div>
 </Section>

 <Section id="planning" title="Planning Timeline">
 <div className="space-y-6">
 {[
 { time: "6–9 Months Out", desc: "Book your neighborhood first, not your hotel brand. San Pedro sells out early. Lock flights once your match city is confirmed." },
 { time: "3–6 Months Out", desc: "Build two plans: a ‘heat day’ plan and a ‘storm day’ plan. Reserve any must-do restaurants (Monterrey takes dining seriously)." },
 { time: "1–3 Months Out", desc: "Install Urbani (for QR payments) and save your key addresses offline. Pre-book airport transfers for peak arrival days." }
 ].map((item, i) => (
  <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center">
  <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
  <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
  </div>
 ))}
 </div>
 <div className="prose prose-lg dark:prose-invert max-w-none mt-10">
   <h3>A simple itinerary that works (3 days)</h3>
   <p>
     Monterrey is a “pick two” city: food, mountains, museums, nightlife. You can’t do everything, but you can do the best version of the trip without feeling rushed.
   </p>
   <h4>Day 1: Arrive + get oriented</h4>
   <ul>
     <li><strong>Late afternoon:</strong> check in, then head to <strong>Parque Fundidora</strong> for an easy first walk.</li>
     <li><strong>Dinner:</strong> your first carne asada night (yes, it counts as culture here).</li>
     <li><strong>Nightcap:</strong> San Pedro wine bars for calm, Barrio Antiguo for chaos (good chaos).</li>
   </ul>
   <h4>Day 2: Match day</h4>
   <ul>
     <li><strong>Morning:</strong> shade + air conditioning (museum, mall, long brunch).</li>
     <li><strong>3–4 hours pre-kick:</strong> move toward the stadium side early; heat + traffic will not be merciful.</li>
     <li><strong>Post-match:</strong> don’t fight the crowd immediately—walk, snack, let surge pricing cool down.</li>
   </ul>
   <h4>Day 3: Mountains + goodbye</h4>
   <ul>
     <li><strong>Sunrise option:</strong> Mirador del Obispado for city views without a long hike.</li>
     <li><strong>Half-day option:</strong> Chipinque for cooler air and a proper “Monterrey is mountains” moment.</li>
     <li><strong>Eat one more thing:</strong> cabrito or machaca—whichever you didn’t do yet.</li>
   </ul>
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
        <AffiliateButton href="https://www.google.com/travel/flights" text="Set Flight Alerts" variant="primary" icon={Plane} />
        <AffiliateButton href="https://www.viator.com/Monterrey/d922-ttd" text="Reserve Experiences" variant="outline" />
      </div>
 </Section>

 <Section id="budget" title="Budget Tiers">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Smart Saver", items: ["Stay Centro (Macroplaza) or Barrio Antiguo", "Metrorrey + short rideshare hops", "Tacos, tortas, and mercados"] },
 { title: "Comfort Upgrades", items: ["San Pedro or Valle Oriente hotels", "Rideshare for cross-city moves", "Steakhouse dinners + craft beer"] },
 { title: "Premium", items: ["Top-end San Pedro properties", "Private driver on match day", "Tasting menus + VIP hospitality"] }
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
 <div className="prose prose-lg dark:prose-invert max-w-none mt-10">
   <h3>Typical costs (2025–2026 reality check)</h3>
   <p>
     Prices swing hard depending on neighborhood and match week demand. Think in ranges, not absolutes—and remember Monterrey is one of Mexico’s wealthiest metros, so “cheap” isn’t the default setting.
   </p>
   <ul>
     <li><strong>Street tacos:</strong> ~MXN 20–35 each (more in San Pedro).</li>
     <li><strong>Casual meal:</strong> ~MXN 200–450 per person.</li>
     <li><strong>Nice dinner:</strong> ~MXN 600–1,500+ per person.</li>
     <li><strong>Rideshare across town:</strong> ~MXN 120–300 off-peak; surge after matches.</li>
     <li><strong>eSIM data:</strong> often cheaper than roaming; buy before you land.</li>
   </ul>
 </div>
 <div className="mt-8 text-center">
        <AffiliateButton href="https://www.expedia.com/Monterrey-Vacation-Packages.d2524.Destination-Travel-Guides" text="Search Monterrey Packages" variant="secondary" icon={Briefcase} />
      </div>
 </Section>

 <Section id="stadium" title="Estadio BBVA">
 <LightboxImage 
 src="/images/stadiums/estadio-bbva-monterrey-world-cup-2026-1600.webp" 
 alt="Estadio BBVA Interior" 
 caption="Estadio BBVA: The most photogenic stadium in the world."
 />

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 Nicknamed <strong>“El Gigante de Acero”</strong>, Estadio BBVA is one of those venues that makes neutral fans feel something. You’re watching a match, then you look up and the mountain is sitting there like a stage prop. That’s Monterrey: steel-and-glass modernity, with raw nature pressed right against it.
 </p>
 <p>
 The stadium sits in <strong>Guadalupe</strong> at <strong>Av. Pablo Livas 2011, Col. La Pastora</strong>—that’s the official address published by the club. If you’re the type who likes receipts, here’s the source straight from Rayados: <a href="https://www.rayados.com/en/monterrey/stadium-location" target="_blank" rel="noopener noreferrer">rayados.com stadium location</a>.
 </p>
 <h3>What most guides don’t tell you</h3>
 <ul>
   <li><strong>Match-day traffic is the boss fight.</strong> Plan for the city to slow down for a few hours.</li>
   <li><strong>The stadium “side” of town matters.</strong> If you’re staying in San Pedro, you’re crossing the metro area—leave earlier than you think.</li>
   <li><strong>Photos:</strong> the mountain view is best from the northwest side of the bowl. Get one shot before kickoff and one after sunset.</li>
 </ul>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Key Features</h4>
 <ul className="space-y-4">
 {[
  { label: "Capacity", val: "53,500" },
  { label: "Surface", val: "Grass" },
  { label: "View", val: "Mountain Backdrop" },
  { label: "Opened", val: "2015" }
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
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Heat strategy: plan shade, water, and a breathable shirt—this is not a “cute outfit” city in June.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Photo strategy: grab your mountain shot early before the concourses fill.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Transport strategy: metro to Exposición helps; rideshare after the match is patience + timing.</li>
 </ul>
 </div>
 </div>
 
 <div className="p-8 rounded-[2rem] border border-emerald-500/20">
 <p className="text-lg text-center font-medium text-emerald-800 dark:text-emerald-200">
 <strong>Getting There:</strong> Take Metrorrey <strong>Line 1</strong> toward <strong>Exposición</strong> (Guadalupe), then follow match-day signage and pedestrian routes toward Estadio BBVA. Walking time varies with crowd control—assume roughly 10–25 minutes.
 </p>
 </div>
 </Section>

 <Section id="tips" title="Match Day Gameplan">
 <div className="grid md:grid-cols-3 gap-6 mb-8">
 {[
 { title: "Pre-game (precopeo)", text: "For nightlife energy, Barrio Antiguo is the classic. For a calmer start, do Fundidora + early dinner, then head out." },
 { title: "Heat & Sun", text: "June/July in Monterrey is no joke. Hydrate early, wear sunscreen, and treat shade like a strategy—not a bonus." },
 { title: "Exit Plan", text: "Don’t sprint into surge pricing. Walk a bit, grab a snack, and request rides from less congested streets." }
 ].map((item, i) => (
  <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
  <h4 className="font-bold mb-3">{item.title}</h4>
  <p className="text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
  </div>
 ))}
 </div>
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
   <h3>My “no-stress” match-day schedule</h3>
   <ul>
     <li><strong>4–5 hours before kickoff:</strong> eat a real meal (protein + salt). You’ll thank me later.</li>
     <li><strong>3 hours before:</strong> start moving toward Guadalupe. If you’re in San Pedro, assume the city is already stacking traffic.</li>
     <li><strong>2 hours before:</strong> arrive near the stadium area, scan tickets, get water, and take your photos.</li>
     <li><strong>60–75 minutes before:</strong> be inside. Security + crowd flow always takes longer during tournaments.</li>
     <li><strong>After the whistle:</strong> linger 20–40 minutes, then leave with intention (metro, a pre-set pickup point, or a short walk first).</li>
   </ul>
   <p>
     Family with kids? Your easiest win is <strong>Parque Fundidora</strong> earlier in the day, then an early move to the stadium. Nightlife crew? Do your Barrio Antiguo time on a <em>non-match</em> night too—Monterrey deserves more than one blurry memory.
   </p>
 </div>
 <div className="flex flex-wrap gap-4">
        <AffiliateButton href="https://www.amazon.com/s?k=cooling+towel" text="Buy Cooling Towel" variant="primary" />
        <AffiliateButton href="https://urbani.app/" text="Get Metro App" variant="outline" />
        <AffiliateButton href="https://www.getyourguide.com/monterrey-l921/" text="Browse Experiences" variant="secondary" />
      </div>
 </Section>

 <Section id="tickets" title="Schedule & Tickets">
 <div className="bg-emerald-900 dark:bg-emerald-950 text-slate-900 dark:text-white rounded-[2.5rem] p-8 md:p-12 mb-12 relative overflow-hidden shadow-2xl">
 <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[150px] opacity-20"></div>
 <div className="relative z-10">
 <div className="flex items-center gap-4 mb-8">
 <Ticket className="w-8 h-8 text-emerald-400" />
 <h3 className="text-3xl font-black">Matches in Monterrey (Confirmed)</h3>
 </div>
 <div className="space-y-6">
 {[
 { stage: "Group Stage", count: "3 matches", color: "text-emerald-300" },
 { stage: "Knockout", count: "1 Round of 32 match", color: "text-amber-400" }
 ].map((match, i) => (
  <div key={i} className="flex items-center justify-between border-b border-white/10 pb-4">
  <span className={`font-mono text-lg ${match.color}`}>{match.stage}</span>
  <span className="font-bold text-xl">{match.count}</span>
  </div>
 ))}
 </div>
 <p className="mt-8 text-white/80 max-w-3xl leading-relaxed">
   Kickoff dates and times are set by FIFA and can shift as the tournament planning locks in. Use this guide for logistics, then confirm match details on FIFA’s official schedule once it’s published.
 </p>
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
 Missed the draw? Trusted resale platforms offer verified tickets. Prices will be high for this venue due to its beauty and smaller capacity.
 </p>
 <AffiliateButton href="https://www.stubhub.com/" text="Check StubHub" variant="primary" />
 </div>
 </div>
 </Section>

 <Section id="hotels" title="Where to Stay">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
   <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
     Monterrey is big, spread out, and allergic to “I’ll just wing it.” Picking the wrong base can turn a simple match day into a three-ride ordeal. Pick your neighborhood like you’re picking a strategy.
   </p>
   <h3>Neighborhood-by-neighborhood: where to sleep (and why)</h3>
   <ul>
     <li><strong>San Pedro Garza García:</strong> safest-feeling, most polished, best hotel inventory, and the easiest place to be a first-time visitor.</li>
     <li><strong>Valle Oriente:</strong> modern towers, great business hotels, good restaurants; convenient if you like malls and taxis waiting outside.</li>
     <li><strong>Centro (Macroplaza):</strong> museums, walkability, and “real city” vibes. Better value, but you’ll rely more on rideshare at night.</li>
     <li><strong>Barrio Antiguo:</strong> nightlife base. Fun, loud, and not for light sleepers—perfect if you want to walk home from bars.</li>
     <li><strong>Guadalupe (near the stadium):</strong> pure match convenience, fewer “vacation” amenities. Great if you’re in and out.</li>
   </ul>
   <p>
     For stadium logistics, pair this with the stadium page: <Link href="/estadio-bbva-world-cup-2026">Estadio BBVA World Cup 2026 guide</Link>.
   </p>
 </div>
 
 <div className="space-y-8">
 <HotelCard 
  name="Live Aqua Urban Resort Monterrey"
  rating={4.8}
  price="$250 - $450"
  distance="20 min drive"
  features={['Luxury', 'San Pedro', 'Shopping', 'Spa']}
  image="/images/cities/monterrey-world-cup-2026-640.webp" 
  link="https://www.booking.com/searchresults.html?ss=Live+Aqua+Urban+Resort+Monterrey"
/>
<HotelCard 
  name="JW Marriott Hotel Monterrey"
  rating={4.7}
  price="$300 - $500"
  distance="20 min drive"
  features={['New', 'Upscale', 'Pool', 'Business']}
  image="/images/cities/monterrey-world-cup-2026-640.webp" 
  link="https://www.booking.com/searchresults.html?ss=JW+Marriott+Hotel+Monterrey"
/>
<HotelCard 
  name="Gamma Monterrey Gran Hotel"
  rating={4.3}
  price="$90 - $150"
  distance="30 min Metro"
  features={['Historic', 'Centro', 'Value', 'Culture']}
  image="/images/cities/monterrey-world-cup-2026-640.webp" 
  link="https://www.booking.com/searchresults.html?ss=Gamma+Monterrey+Gran+Hotel"
/>
<HotelCard 
  name="Safi Royal Luxury Valle"
  rating={4.6}
  price="$160 - $320"
  distance="25 min drive"
  features={['San Pedro', 'Pool', 'Walkable', 'Restaurants']}
  image="/images/cities/monterrey-world-cup-2026-640.webp" 
  link="https://www.booking.com/searchresults.html?ss=Safi+Royal+Luxury+Valle+Monterrey"
/>
<HotelCard 
  name="Fiesta Americana Monterrey Pabellón M"
  rating={4.5}
  price="$140 - $260"
  distance="30 min Metro"
  features={['Centro', 'Views', 'Walkable', 'Good value']}
  image="/images/cities/monterrey-world-cup-2026-640.webp" 
  link="https://www.booking.com/searchresults.html?ss=Fiesta+Americana+Monterrey+Pabellon+M"
/>
 </div>
 
 <div className="mt-12 text-center">
        <AffiliateButton href="https://www.booking.com/city/mx/monterrey.html" text="Search All Monterrey Hotels" variant="outline" />
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
 <h4 className="font-bold text-xl mb-2">Metrorrey</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Clean, fast, and the closest thing Monterrey has to “easy mode.” Line 1 is your match-day friend (Exposición for the stadium side). You can pay with a Me Muevo card or QR via apps like Urbani.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
 <Plane className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Airport (MTY)</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 MTY is modern but not close. Assume ~30–60 minutes to most hotels depending on traffic and where you’re staying. For peak World Cup arrival windows, a pre-booked transfer saves stress.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
 <Car className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Uber / Rideshare</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Rideshare is the default for most visitors, especially between San Pedro, Centro, Fundidora, and Valle Oriente. After matches, expect surge pricing—walk first, then request.
 </p>
 </div>
 </div>
 </div>
 
 <div className=" rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 h-fit">
 <h4 className="font-bold text-2xl mb-6">Distance to Stadium</h4>
 <ul className="space-y-6">
 {[
 { label: "San Pedro", time: "25–45 min drive (more on match day)" },
 { label: "Centro / Macroplaza", time: "Line 1 metro + walk (plan extra time)" },
 { label: "Parque Fundidora", time: "Quick rideshare or metro connection" },
 { label: "Airport (MTY)", time: "30–60 min drive" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
 <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
 </li>
 ))}
 </ul>
 <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
        <AffiliateButton href="https://www.viator.com/Monterrey-tours/Transfers-and-Ground-Transport/d922-g15" text="Book Airport Transfer" variant="secondary" />
        <AffiliateButton href="https://www.discovercars.com/" text="Compare Car Rentals" variant="outline" />
      </div>
 </div>
 </div>
 </Section>

 <Section id="dining" title="Food & Drink">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Cabrito", desc: "Yes, the legend is real. Order it with confidence. Centro has classic spots, and locals will argue about which one is “the” one." },
 { title: "Carne Asada", desc: "This is a ritual, not just dinner. If you get invited to someone’s asada, bring beer and say yes. Steakhouses in San Pedro are top tier." },
 { title: "Machaca & Chicharrón", desc: "Breakfast that fixes a late night. Machaca con huevo and pressed chicharrón are peak Monterrey comfort food." }
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
 <div className="prose prose-lg dark:prose-invert max-w-none mt-10">
   <h3>Where to eat and drink (by neighborhood)</h3>
   <ul>
     <li><strong>San Pedro:</strong> upscale dining, cocktail bars, steakhouses, and the “let’s make a reservation” spots.</li>
     <li><strong>Centro:</strong> classic cabrito, old-school cantinas, and museum-day lunches.</li>
     <li><strong>Barrio Antiguo:</strong> bars, live music, and late nights—eat before you arrive.</li>
     <li><strong>Fundidora:</strong> daytime coffee, snacks, and easy group-friendly meals nearby.</li>
   </ul>
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
   <AffiliateButton href="https://www.opentable.com/" text="Reserve Restaurants" variant="secondary" />
   <AffiliateButton href="https://www.thefork.com/" text="Find Tables (Alt)" variant="outline" />
 </div>
 </Section>

 <Section id="attractions" title="Top Attractions">
 <p className="mb-8 text-xl text-slate-600 dark:text-slate-300">
 Monterrey is the rare big city where you can do skyline photos, museums, and a mountain viewpoint in the same day without leaving the metro area. The trick is timing: do outdoors early, then hide in A/C when the heat peaks.
 </p>
 <div className="space-y-6">
 {[
 { title: "Parque Fundidora", desc: "The city’s favorite giant park: old steel-foundry bones turned into trails, museums, events, and lazy afternoon walks.", color: "text-blue-500" },
 { title: "Paseo Santa Lucía", desc: "The riverwalk link between Fundidora and Macroplaza. It’s touristy, yes—and still genuinely relaxing at sunset.", color: "text-emerald-500" },
 { title: "Mirador del Obispado", desc: "The ‘big view’ without a big hike. Go near golden hour for the skyline glow.", color: "text-amber-500" },
 { title: "Chipinque", desc: "Higher, cooler, greener. If you want the Monterrey mountains in one hit, this is the safe, scenic choice.", color: "text-green-500" },
 { title: "Day trip: Santiago", desc: "A calmer Pueblo Mágico feel south of the city. Great reset day between matches.", color: "text-slate-500" }
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
        <AffiliateButton href="https://www.viator.com/Monterrey/d922-ttd" text="Book Tours" variant="primary" />
      </div>
 </Section>

 <Section id="safety" title="Safety & Security">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> Safe Zones</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 <strong>San Pedro Garza García</strong>, Valle Oriente, Fundidora, and the main Centro/Macroplaza corridors are where most visitors spend time without issues. The “safety secret” in Monterrey is boring: stay in busy areas, use rideshare late, and don’t wander empty blocks after midnight just because your hotel looks close on the map.
 </p>
 <ul className="mt-6 space-y-3 text-slate-600 dark:text-slate-400">
   <li>• Keep your phone low-key (especially curbside while waiting for rideshare).</li>
   <li>• Avoid isolated underpasses and poorly lit streets late at night.</li>
   <li>• Use ATMs inside banks or malls, not on the street.</li>
 </ul>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Emergency</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
  <li>• <strong>911</strong> for Police/Ambulance.</li>
  <li>• Use Uber instead of hailing taxis on the street.</li>
  <li>• Heat is the #1 match-day risk: hydrate and watch for dizziness/headache.</li>
 </ul>
 <div className="mt-6">
              <AffiliateButton href="https://www.worldnomads.com/" text="Get Travel Insurance" variant="secondary" />
 </div>
 </div>
 </div>
 <div className="mt-10 text-center">
   <Link href="/world-cup-2026-emergency-contacts-resources" className="text-emerald-500 hover:text-emerald-600 font-bold text-lg inline-flex items-center gap-2 hover:gap-4 transition-all">
     World Cup Emergency Contacts & Resources <ArrowRight className="w-5 h-5"/>
   </Link>
 </div>
 </Section>

 <Section id="culture" title="Cultural Intelligence">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
   <p className="text-xl text-slate-600 dark:text-slate-300">
     Regios (people from Monterrey) are proud, hardworking, and pretty direct. It’s not rude—it’s efficient. You’ll feel it in the way people drive, order food, and talk about their city like it’s a person they’re defending.
   </p>
   <h3>Local customs that actually matter</h3>
   <ul>
     <li><strong>Food timing:</strong> lunch is big, dinner runs late, and “we’ll just grab something quick” turns into a two-hour meal if you’re having fun.</li>
     <li><strong>Carne asada culture:</strong> it’s social glue. If you get invited, show up hungry and bring something (beer, hielo/ice, or dessert).</li>
     <li><strong>Sports talk:</strong> people love fútbol here, but don’t be surprised if the conversation turns into business, mountains, then back to fútbol.</li>
     <li><strong>Tipping:</strong> 10–15% is standard; 15–20% is normal for great service.</li>
   </ul>
   <h3>Local phrases that make life easier</h3>
   <ul>
     <li><strong>¿Cuánto cuesta?</strong> How much does it cost?</li>
     <li><strong>¿Me puede ayudar?</strong> Can you help me?</li>
     <li><strong>¿Dónde queda…?</strong> Where is…?</li>
     <li><strong>Una botella de agua, por favor.</strong> A bottle of water, please.</li>
     <li><strong>¿A qué hora cierran?</strong> What time do you close?</li>
     <li><strong>Con permiso.</strong> Excuse me (polite squeeze-by).</li>
     <li><strong>Está bien / Está perfecto.</strong> That’s fine / perfect.</li>
     <li><strong>¿Me trae la cuenta?</strong> Can I get the check?</li>
   </ul>
   <p>
     And yes—people say <strong>“ahorita”</strong>. It can mean “right now,” “in a bit,” or “eventually.” Context is everything. Welcome to Mexico.
   </p>
 </div>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { title: "Family-Friendly", desc: "Parque Fundidora, Santa Lucía, museums, and early dinners in San Pedro. Build your day around shade + A/C." },
 { title: "Nightlife", desc: "Barrio Antiguo is the headline. Start late, use rideshare home, and keep your group together after midnight." },
 { title: "Fan Zones", desc: "Fundidora is the natural “big screen” magnet during major events. Expect crowds, music, and food stands." }
 ].map((item, i) => (
 <div key={i} className="p-6 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-2xl">
 <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
 </div>
 ))}
 </div>
 </Section>

 <Section id="packing" title="Climate & Packing">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
   <p className="text-xl text-slate-600 dark:text-slate-300">
     Monterrey in June and July is hot enough to change your personality. Plan for sun, sweat, and the occasional surprise storm. If you pack for “summer” but forget the sun and the concrete heat, you’ll feel it fast.
   </p>
 </div>
 <div className="grid md:grid-cols-3 gap-6">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Sun className="w-6 h-6 text-amber-500"/> June–July Weather</h4>
 <p className="text-slate-600 dark:text-slate-400">
 Hot days (often mid-30s °C / mid-90s °F), bright sun, and sticky afternoons. Evenings can cool a little, and storms can roll in fast.
 </p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Essentials</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400">
 <li>• High SPF sunscreen (reapply)</li>
 <li>• Hat & sunglasses</li>
 <li>• Breathable shirt + light shorts/pants</li>
 <li>• Cooling towel or small portable fan</li>
 <li>• Light rain layer (thin, packable)</li>
 </ul>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Tech</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-6">
 <li>• Type A/B plugs (Same as US)</li>
 <li>• Offline maps</li>
 <li>• eSIM with data</li>
 <li>• Power bank for match day</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com/mexico-esim" text="Get an eSIM" variant="secondary" />
 </div>
 </div>
 <div className="prose prose-lg dark:prose-invert max-w-none mt-10">
   <h3>Stadium comfort checklist</h3>
   <ul>
     <li><strong>Water:</strong> start hydrating hours before kickoff, not when you’re already sweating.</li>
     <li><strong>Sun:</strong> sunscreen + hat isn’t optional.</li>
     <li><strong>Bag policy:</strong> expect restrictions—pack light and keep essentials in pockets.</li>
   </ul>
 </div>
 </Section>

 <Section id="faq" title="Frequently Asked Questions">
 <div className="space-y-2">
 {[
 { q: "Where is Estadio BBVA located?", a: "Estadio BBVA is in Guadalupe (Greater Monterrey). The official address is Av. Pablo Livas 2011, Col. La Pastora, C.P. 67140." },
 { q: "How many World Cup 2026 matches are in Monterrey?", a: "Monterrey hosts 4 matches at Estadio BBVA: 3 group-stage matches and 1 Round of 32 match." },
 { q: "What’s the best way to get to Estadio BBVA on match day?", a: "Your simplest plan is Metrorrey Line 1 toward Exposición + walking routes, or a rideshare drop-off well before kickoff. If you’re staying in San Pedro, leave earlier than you think—traffic is the main risk." },
 { q: "Where should I stay for the best Monterrey World Cup experience?", a: "San Pedro Garza García is the easiest base for comfort, dining, and safety. Centro + Barrio Antiguo is best for nightlife and a more local feel—just use rideshare at night." },
 { q: "Is Monterrey safe for tourists?", a: "Most fans stick to San Pedro, Valle Oriente, Fundidora, and the main Centro corridors and have a smooth trip. Use rideshare late, avoid empty streets after midnight, and keep valuables low-key." },
 { q: "Do I need a car in Monterrey?", a: "No. Rideshare + metro covers most visitors. Rent a car only if you’re planning day trips or you want full flexibility (and you’re comfortable driving in big-city traffic)." },
 { q: "What’s the weather like in June/July?", a: "Hot and sunny—often mid-30s °C / mid-90s °F—plus the possibility of short storms. Plan shade, water, and a light rain layer." },
 { q: "How far is Monterrey Airport (MTY) from the city and stadium?", a: "Plan roughly 30–60 minutes to most hotels depending on traffic. Match day traffic adds extra time if you’re crossing the metro area." },
 { q: "Can I use US Dollars in Monterrey?", a: "Sometimes, but the exchange rate won’t be kind. Pesos (MXN) and card payments are the best value most of the time." },
 { q: "Do I need travel insurance for Mexico?", a: "If you’re traveling internationally, yes. Look for medical coverage plus trip delay and interruption—World Cup weeks are peak travel." },
 { q: "What’s the best mobile connectivity option?", a: "Telcel typically has strong coverage around the metro area. An eSIM is a clean option if your phone supports it." },
 { q: "Where can I watch matches without tickets?", a: "Fundidora is the obvious gathering spot during major events. Also check bars in San Pedro and Barrio Antiguo for big-screen atmospheres." },
 { q: "How do I avoid rideshare surge pricing after the match?", a: "Don’t request the second the whistle blows. Walk 10–20 minutes, grab a snack, and request from a less congested area." },
 { q: "What’s one ‘local’ thing I should do besides the match?", a: "Go to Fundidora around sunset, then commit to a proper carne asada night. It’s the fastest way to understand the city." }
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
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>Police</strong> <span>911</span></li>
 <li className="flex justify-between"><strong>Heat warning</strong> <span>Don’t ignore dizziness</span></li>
 </ul>
 <div className="mt-6">
   <Link href="/world-cup-2026-emergency-contacts-resources" className="text-emerald-500 hover:text-emerald-600 font-bold inline-flex items-center gap-2 hover:gap-4 transition-all">
     Emergency resources page <ArrowRight className="w-4 h-4"/>
   </Link>
 </div>
 </div>
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-emerald-500"/> Connectivity</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6">
 <li>• <strong>WiFi:</strong> Available in most cafes/hotels.</li>
 <li>• <strong>Power:</strong> 120V, Type A/B plugs (Same as US).</li>
 <li>• <strong>Sim Cards:</strong> Telcel / OXXO stores.</li>
 <li>• <strong>Offline:</strong> Save hotel + stadium address screenshots.</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com/mexico-esim" text="Get an Airalo eSIM" variant="secondary" />
 </div>
 </div>
 <div className="mt-10 flex flex-wrap gap-4">
   <AffiliateButton href="https://www.getyourguide.com/monterrey-l921/" text="Book Tours & Activities" variant="primary" />
   <AffiliateButton href="https://www.booking.com/city/mx/monterrey.html" text="Last-Minute Hotels" variant="outline" />
 </div>
 </Section>

 <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Explore Other Host Cities</h3>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['New York/New Jersey', 'Los Angeles', 'Mexico City', 'Toronto', 'Dallas', 'Miami', 'Seattle', 'Boston'].map((city) => {
          const citySlugMap: Record<string, string> = {
            'New York/New Jersey': 'world-cup-2026-new-york-new-jersey-guide',
            'Los Angeles': 'world-cup-2026-los-angeles-guide',
            'Mexico City': 'world-cup-2026-mexico-city-guide',
            'Toronto': 'world-cup-2026-toronto-guide',
            'Dallas': 'world-cup-2026-dallas-guide',
            'Miami': 'world-cup-2026-miami-guide',
            'Seattle': 'world-cup-2026-seattle-guide',
            'Boston': 'world-cup-2026-boston-guide'
          };
          return (
            <Link key={city} href={`/${citySlugMap[city]}`} className="block p-4 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center font-bold text-slate-700 dark:text-slate-200">
              {city}
            </Link>
          );
        })}
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
















