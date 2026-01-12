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
 Bookmark, X, ChevronRight, Facebook, Twitter, Linkedin, Copy
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
 src="/images/cities/toronto-world-cup-2026-1600.webp" 
 alt="Toronto Skyline" 
 fill 
 className="object-cover"
 priority quality={60} sizes="100vw" />
 <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-[#0A0A0A]/60 to-[#F5F5F7] dark:to-[#0A0A0A]" />
 </div>

 <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-end md:items-center justify-between gap-12 pt-20">
 <div className="max-w-4xl">
 {/* Breadcrumbs */}
<Breadcrumb 
            variant="white"
            items={[
              { label: 'Host Cities', href: '/world-cup-2026-host-cities' },
              { label: 'Toronto', href: '/world-cup-2026-toronto-guide' }
            ]} 
          />

 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
 >
 <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
              Last Updated: January 4, 2026
            </span>
            <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
              Host City
            </span>
 <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
 Canada's Football Capital
 </span>
 </div>
 
 <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
 Toronto World Cup 2026 Guide
 </h1>
 <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
 Built by someone who’s lived here long enough to remember when Liberty Village was mostly warehouses. Match-day logistics, neighborhood picks, hidden gems, and the little Toronto habits visitors miss.
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
 You’re coming to a city that does two things at once: moves fast like a North American financial hub, and then immediately slows down on the lake like it’s on vacation. That’s Toronto in June and July. It’s patios, festivals, streetcars, and the kind of “quick walk” that turns into a two-hour detour because someone said, “Have you tried this bakery?”
 </p>
 <p>
 Here’s the big strategic truth for the <strong>World Cup 2026 in Toronto</strong>: the stadium (BMO Field, “Toronto Stadium” during FIFA) sits at <strong>Exhibition Place</strong>—close enough to downtown to feel easy, but far enough that you can still mess it up if you treat it like a simple subway ride. Do it right and you’ll be at the gates with a coffee and zero stress. Do it wrong and you’ll be stuck in a rideshare that hasn’t moved since the last Leafs rebuild.
 </p>
 <p>
 This <strong>Toronto World Cup 2026 guide</strong> is built for three kinds of travelers: the planner, the “we’ll wing it” optimist, and the parent who is quietly trying to keep everyone fed and emotionally stable. You’ll get a match-day plan, neighborhood-by-neighborhood recommendations, safety and transit shortcuts, and a few local-only moves that I’d normally save for friends I actually like.
 </p>
 <p className="text-slate-600 dark:text-slate-300">
 <strong>Quick win:</strong> if you do nothing else, pick a home base that makes <strong>Union Station</strong> or a direct route to <strong>Exhibition GO Station</strong> easy. That’s your cheat code.
 </p>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: MapPin, title: "Where to Base", text: "Downtown (Union) for pure convenience. Liberty Village for walk-to-stadium energy. Queen/Ossington for local nightlife." },
 { icon: Train, title: "Transport Strategy", text: "Treat Union Station like mission control. GO to Exhibition is the cleanest match-day move; 509/511 streetcars are solid backups." },
 { icon: DollarSign, title: "Budget Signals", text: "Toronto isn’t cheap, especially in peak summer. Lock refundable rooms early, then keep watching rates like it’s a transfer window." }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] transition-colors">
 <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
   <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/yyz" text="Compare Flights to Toronto (YYZ)" variant="secondary" icon={Plane} />
   <AffiliateButton href="https://www.booking.com/city/ca/toronto.html" text="Find Toronto Hotels (Best Areas)" variant="primary" icon={Hotel} />
   <AffiliateButton href="https://www.airalo.com/canada-esim" text="Get a Canada eSIM" variant="outline" icon={Globe} />
 </div>
 </Section>

 <Section id="visa" title="Visa & Entry (Canada)">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Who Needs a Visa?</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
 Most visitors who are <strong>visa-exempt</strong> still need an <strong>eTA</strong> to <strong>fly</strong> into Canada. It costs <strong>$7 CAD</strong> and approvals are often fast, but don’t be the person applying at the airport Wi‑Fi sign. US citizens don’t need an eTA—just a valid passport.
 </p>
 <AffiliateButton href="https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html" text="Apply for eTA" variant="outline" />
 </div>
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Arrival Tips</h4>
 <ul className="space-y-4 mb-8">
 {[
   'UP Express is 28 minutes from Pearson (YYZ) to Union Station',
   'Adult one-way is $12.35 (or $9.25 with PRESTO)',
   'If you land late, plan your last-train timing in advance',
   'Taxis/ride-share can be slow in rush hour—especially downtown'
 ].map((item, i) => (
 <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
 <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
 </li>
 ))}
 </ul>
 <AffiliateButton href="https://www.worldnomads.com/" text="Travel Insurance for Match Trips" variant="secondary" />
 </div>
 </div>
 </Section>

 <Section id="planning" title="Planning Timeline">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
   <p className="text-slate-600 dark:text-slate-300">
     Toronto in peak summer is already busy. Add the World Cup and you’re dealing with a city that sells out in layers: first the best-located hotels, then anything near transit, then suddenly you’re looking at a place in Mississauga wondering if your “quick trip” is now a commuter lifestyle.
   </p>
   <p className="text-slate-600 dark:text-slate-300">
     My local rule: <strong>book early, book refundable, and treat your booking like a placeholder</strong>. You can always upgrade later when prices wobble—what you can’t do is invent hotel inventory in June.
   </p>
 </div>
 <div className="space-y-6">
 {[
 { time: "9–12 Months Out", desc: "Lock refundable lodging in Downtown (Union/Financial) or Liberty Village. If you’re doing multiple host cities, sketch an open‑jaw flight plan early." },
 { time: "6–9 Months Out", desc: "Start tracking flight prices and set alerts. Decide whether you want to be in a family-friendly area (Harbourfront/Distillery) or nightlife (King West/Ossington)." },
 { time: "3–6 Months Out", desc: "Confirm match tickets. Reserve a couple of ‘anchor’ meals (steakhouse, tasting menu, big group spot). If you hate crowds, book a stadium-adjacent hotel now." },
 { time: "1–3 Months Out", desc: "Handle entry requirements (eTA/visa), double-check match-day bag rules, and build your in-city transit plan (Union ↔ Exhibition is your main corridor)." }
 ].map((item, i) => (
 <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center">
 <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
 <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
 </div>
 ))}
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
  <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/yyz" text="Set Flight Alerts" variant="primary" icon={Plane} />
  <AffiliateButton href="https://www.opentable.ca/toronto-restaurants" text="Reserve Restaurant Tables" variant="outline" />
  <AffiliateButton href="https://www.viator.com/Toronto/d623-ttd" text="Browse Toronto Experiences" variant="secondary" icon={Camera} />
 </div>

 <div className="mt-10 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
   <h4 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">Recommended Reading</h4>
   <ul className="space-y-3 text-slate-600 dark:text-slate-400">
     <li>
       <Link href="/world-cup-2026-flight-booking-guide" className="text-emerald-600 dark:text-emerald-400 font-bold">Flight booking guide</Link>
       <span> for multi-city routing and timing.</span>
     </li>
     <li>
       <Link href="/world-cup-2026-accommodation-guide" className="text-emerald-600 dark:text-emerald-400 font-bold">Accommodation guide</Link>
       <span> for refundable strategy and neighborhood selection.</span>
     </li>
     <li>
       <Link href="/world-cup-2026-travel-insurance-guide" className="text-emerald-600 dark:text-emerald-400 font-bold">Travel insurance guide</Link>
       <span> for tournament-specific coverage and cancellations.</span>
     </li>
     <li>
       <Link href="/world-cup-2026-budget-guide" className="text-emerald-600 dark:text-emerald-400 font-bold">Budget guide</Link>
       <span> to sanity-check your Toronto costs.</span>
     </li>
   </ul>
 </div>
 </Section>

 <Section id="budget" title="Budget Tiers">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
   <p className="text-slate-600 dark:text-slate-300">
     Toronto pricing has two modes: “normal big city” and “big event summer.” During the World Cup, assume you’re living in mode two. The way you win is by controlling the expensive line items (hotel location and match-day transport) and letting yourself spend on the fun stuff (food, a patio, one big attraction).
   </p>
   <p className="text-slate-600 dark:text-slate-300">
     <strong>Verified transit baselines:</strong> TTC adult single fare is <strong>$3.35</strong> (or <strong>$3.30</strong> with PRESTO), and the TTC day pass (PRESTO ticket) is <strong>$13.50</strong>. Transfers are valid for <strong>two hours</strong> when you pay by PRESTO or contactless. UP Express is <strong>28 minutes</strong> Pearson ↔ Union with an adult one-way of <strong>$12.35</strong> (or <strong>$9.25</strong> with PRESTO). These numbers matter because they let you plan without guesswork.
   </p>
   <p className="text-slate-600 dark:text-slate-300">
     One more local “gotcha”: prices here are usually shown <strong>before tax</strong>. Ontario HST is <strong>13%</strong>, and tipping in restaurants/bars is typically <strong>15–20%</strong>. Build that into your mental math.
   </p>
 </div>

 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Smart Saver", items: ["Stay near Line 1 (or a GO station)", "TTC day pass ($13.50) on big exploring days", "Markets + casual eats (Kensington, St. Lawrence)"] },
 { title: "Comfort Upgrades", items: ["Downtown/King West hotel close to Union", "UP Express for airport reliability", "Book 1–2 restaurants and a couple of attractions"] },
 { title: "Premium", items: ["Yorkville luxury + spa recovery", "Private car only when it truly helps (late nights)", "VIP hospitality or a skyline dinner"] }
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
        <AffiliateButton href="https://www.expedia.com/Toronto.d178314.Destination-Travel-Guides" text="Search Toronto Packages" variant="secondary" icon={Briefcase} />
      </div>

      <div className="mt-10 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
        <h4 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">What I Tell Friends to Budget (Per Person)</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="py-3 pr-6 font-bold text-slate-900 dark:text-white">Category</th>
                <th className="py-3 pr-6 font-bold text-slate-900 dark:text-white">Budget</th>
                <th className="py-3 pr-6 font-bold text-slate-900 dark:text-white">Mid</th>
                <th className="py-3 font-bold text-slate-900 dark:text-white">Premium</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 dark:text-slate-400">
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <td className="py-3 pr-6 font-semibold">Food (non-match day)</td>
                <td className="py-3 pr-6">$35–$60</td>
                <td className="py-3 pr-6">$70–$120</td>
                <td className="py-3">$150+</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <td className="py-3 pr-6 font-semibold">Local transit</td>
                <td className="py-3 pr-6">$3.30–$13.50</td>
                <td className="py-3 pr-6">$13.50+</td>
                <td className="py-3">$40+ (rideshare-heavy)</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <td className="py-3 pr-6 font-semibold">Attractions</td>
                <td className="py-3 pr-6">$0–$30</td>
                <td className="py-3 pr-6">$40–$90</td>
                <td className="py-3">$120+</td>
              </tr>
              <tr>
                <td className="py-3 pr-6 font-semibold">Airport transfer (one-way)</td>
                <td className="py-3 pr-6">$9.25–$12.35</td>
                <td className="py-3 pr-6">$12.35–$60</td>
                <td className="py-3">$120+</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
          Numbers shown are practical ranges for planning. Taxes and tips apply to most dining.
        </p>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          [Affiliate placement suggestion: hotel comparison widget directly under this table.]
        </p>
      </div>
 </Section>

 <Section id="stadium" title="BMO Field">
<LightboxImage 
src="/images/stadiums/bmo-field-toronto-world-cup-2026-1600.webp" 
alt="BMO Field Interior" 
caption="The intimate and electric atmosphere of BMO Field."
/>

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
  <p>
 <strong>BMO Field</strong> is the rare World Cup venue that still feels intimate—open air, close to the action, and sitting right on the lake at Exhibition Place. During FIFA, you’ll hear it referred to as <strong>Toronto Stadium</strong> (FIFA naming rules), but locals will still call it BMO because… of course we will.
  </p>
  <p>
    The City of Toronto and MLSE have confirmed a two‑phase upgrade plan to get the venue tournament‑ready, including a capacity increase to <strong>45,000</strong> with temporary seating (10,000 north / 7,000 south) and additional fan-experience improvements that will live on after 2026. Translation: it’ll handle World Cup crowds, but it won’t lose that “you’re basically on the pitch” feeling.
  </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Key Features</h4>
 <ul className="space-y-4">
 {[
 { label: "Capacity", val: "45,000 (temporary expansion)" },
 { label: "Roof", val: "Partial Canopy" },
 { label: "Location", val: "Exhibition Place (Lakeshore)" },
 { label: "Fastest Route", val: "GO Train to Exhibition" }
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
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> It’s open-air. The lake breeze can make a warm day feel like a surprise hoodie night.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Match-day parking exists, but it’s not the hero of this story. Transit will feel calmer.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> If you must drive: Exhibition Place parking is largely Green P (no cash), and special-event rates can run up to $45.</li>
 </ul>
 </div>
 </div>
 
 <div className="p-8 rounded-[2rem] border border-emerald-500/20">
  <p className="text-lg text-center font-medium text-emerald-800 dark:text-emerald-200">
 <strong>Getting There:</strong> The <strong>GO Train</strong> is the cleanest match-day move, with <strong>Exhibition GO Station</strong> right beside the grounds. TTC backups include <strong>509 Harbourfront</strong> (from Union) and <strong>511 Bathurst</strong> (from Bathurst Station) to the Exhibition Loop.
  </p>
 </div>
 </Section>

 <Section id="tips" title="Match Day Gameplan">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
   <p className="text-slate-600 dark:text-slate-300">
     Match day in Toronto is half football, half choreography. The win condition is simple: get to Exhibition Place early, eat before you’re starving, and have a plan for the exit so you’re not making decisions in a crowd with 3% phone battery.
   </p>
   <p className="text-slate-600 dark:text-slate-300">
     If you want the “local” version of match day, don’t overthink it: start around <strong>Liberty Village</strong>, walk with the crowd, and after the match either jump on the GO/TTC <em>or</em> do the classic move—grab one more drink and let the surge clear.
   </p>
   <p className="text-slate-600 dark:text-slate-300">
     [Affiliate placement suggestion: “Book airport transfer” card inside this section for late arrivals.]
   </p>
 </div>
 <div className="grid md:grid-cols-3 gap-6 mb-8">
 {[
 { title: "Arrival", text: "Aim to be at Exhibition Place 90–120 minutes early. GO to Exhibition is the cleanest route; 509/511 streetcars are solid backups." },
 { title: "Bag + Security", text: "Expect strict bag rules. Bring the smallest bag you can, keep it organized, and plan for security lines in peak heat." },
 { title: "Exit Plan", text: "Post-match platform crowds will be real. If you’re not in a rush, walk to Liberty Village/Queen West and let things breathe for 30–45 minutes." }
 ].map((item, i) => (
 <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="flex flex-wrap gap-4">
  <AffiliateButton href="https://www.stubhub.com/bmo-field-tickets/venue/296/" text="Check StubHub" variant="primary" />
  <AffiliateButton href="https://www.amazon.com/s?k=collapsible+water+bottle&tag=stadiumport-20" text="Add Refillable Bottle" variant="outline" />
  <AffiliateButton href="https://www.getyourguide.com/toronto-l177/" text="Book City Tours" variant="secondary" icon={Camera} />
 </div>

 <div className="mt-10 grid md:grid-cols-3 gap-6">
   <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
     <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">Day -1 (Arrival + Warm-Up)</h4>
     <p className="text-slate-600 dark:text-slate-400">
       Check in, then do an easy “Toronto starter pack”: Harbourfront walk, quick CN Tower/Ripley’s area photo stop, and dinner in King West or Ossington. Go to bed like you mean it.
     </p>
   </div>
   <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
     <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">Match Day (Low-Stress Timeline)</h4>
     <p className="text-slate-600 dark:text-slate-400">
       Late lunch near your base, then Union → Exhibition by GO. Get inside early, hydrate, and treat the first half hour as your buffer. After the match, either leave fast or linger nearby and exit like a local.
     </p>
   </div>
   <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
     <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">Day +1 (Recovery + Flex)</h4>
     <p className="text-slate-600 dark:text-slate-400">
       Sleep in. Do a museum (ROM/AGO) or a chill day on the Islands if the weather behaves. If you’re staying longer, this is your day-trip window (Niagara, depending on your energy).
     </p>
   </div>
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
 { stage: "Round of 32", count: "1 Match (July 2, 2026)", color: "text-emerald-300" },
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
 The safest way to buy tickets is through FIFA’s official portal. Create your FIFA account early so you’re ready when sales phases open, and keep an eye on official communications (not “a guy on Instagram with PDFs”).
 </p>
 <AffiliateButton href="https://www.fifa.com" text="FIFA Official Site" variant="secondary" />
 </div>
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Resale Market</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8">
 Missed the draw? Resale can work, but prices spike fast for Canada matches and knockouts. If you go resale, prioritize platforms with buyer protection and clear seat verification.
 </p>
 <AffiliateButton href="https://www.stubhub.com/bmo-field-tickets/venue/296/" text="Check StubHub" variant="primary" />
 </div>
 </div>
 </Section>

 <Section id="hotels" title="Where to Stay">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
   <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
     Toronto is a “micro-neighborhood” city. You can walk ten minutes and feel like you’ve changed countries, cuisines, and bedtime expectations. For the World Cup, your hotel decision isn’t just about comfort—it’s about whether match day feels like a smooth little adventure or a transit puzzle you solve under pressure.
   </p>
   <p className="text-slate-600 dark:text-slate-300">
     My shortcut: if you want the easiest logistics, pick somewhere that makes <strong>Union Station</strong> effortless. If you want the loudest match energy, stay in <strong>Liberty Village</strong>. If you want luxury and calm after the chaos, <strong>Yorkville</strong> is your soft landing.
   </p>
   <p className="text-slate-600 dark:text-slate-300">
     [Affiliate placement suggestion: neighborhood hotel widgets under each neighborhood card.]
   </p>
 </div>

 <div className="grid md:grid-cols-2 gap-6 mb-12">
   {[
     {
       title: "Downtown / Financial District (Union Station)",
       icon: Train,
       text:
         "Best for: first-timers and anyone optimizing logistics. You’re walking distance to Union (GO hub), the PATH (indoor walkways), and most major sights. Match day becomes almost boring—in a good way.",
     },
     {
       title: "Liberty Village",
       icon: Trophy,
       text:
         "Best for: pure match-day convenience and pregame atmosphere. It’s the closest ‘fan neighborhood’ to the stadium, packed with patios and sports bars. It’s not the quiet choice.",
     },
     {
       title: "King West / Entertainment District",
       icon: Star,
       text:
         "Best for: nightlife + quick stadium access. Great restaurants, clubs, and big-city buzz. If your group wants ‘afterparty energy’ on tap, this is it.",
     },
     {
       title: "Queen West / Ossington",
       icon: Camera,
       text:
         "Best for: local vibe and food. More indie, less corporate. You’ll be close to great cafés and bars, and still within reasonable transit distance of Exhibition Place.",
     },
     {
       title: "Yorkville",
       icon: Briefcase,
       text:
         "Best for: luxury, shopping, and a calmer sleep schedule. It’s not the closest to the stadium, but transit is straightforward and the comfort level is high.",
     },
     {
       title: "Harbourfront / St. Lawrence / Distillery",
       icon: MapPin,
       text:
         "Best for: families and daytime exploring. Waterfront walks, markets, and a more relaxed pace. Great if you want ‘Toronto postcard’ energy between matches.",
     },
   ].map((n, i) => (
     <div key={i} className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <div className="flex items-start gap-4">
         <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
           <n.icon className="w-6 h-6" />
         </div>
         <div>
           <h4 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">{n.title}</h4>
           <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{n.text}</p>
         </div>
       </div>
     </div>
   ))}
 </div>
 
 <div className="space-y-8">
 <HotelCard 
 name="Hotel X Toronto"
 rating={4.6}
 price="$400 - $700"
 distance="5 min walk"
 features={['Rooftop Pool', 'Lake Views', 'Luxury', 'On-site Parking']}
 image="/images/cities/toronto-world-cup-2026.webp" 
 link="https://www.booking.com/hotel/ca/hotel-x-toronto.html"
 />
 <HotelCard 
 name="Fairmont Royal York"
 rating={4.7}
 price="$350 - $600"
 distance="10 min train"
 features={['Historic', 'Connected to Union Station', 'Luxury']}
 image="/images/cities/toronto-world-cup-2026.webp" 
 link="https://www.booking.com/hotel/ca/fairmont-royal-york.html"
 />
 <HotelCard 
 name="1 Hotel Toronto"
 rating={4.5}
 price="$350 - $650"
 distance="15 min walk"
 features={['Eco-Friendly', 'Rooftop Bar', 'Trendy', 'King West']}
 image="/images/cities/toronto-world-cup-2026.webp" 
 link="https://www.booking.com/city/ca/toronto.html"
 />
 <HotelCard 
 name="The Drake Hotel"
 rating={4.5}
 price="$300 - $550"
 distance="20–25 min transit"
 features={['Boutique', 'Queen West', 'Nightlife', 'Local Vibe']}
 image="/images/cities/toronto-world-cup-2026.webp" 
 link="https://www.booking.com/hotel/ca/the-drake.html"
 />
 <HotelCard 
 name="Chelsea Hotel Toronto"
 rating={4.1}
 price="$220 - $450"
 distance="20–30 min transit"
 features={['Family-Friendly', 'Large Rooms', 'Central', 'Value']}
 image="/images/cities/toronto-world-cup-2026.webp" 
 link="https://www.booking.com/hotel/ca/delta-chelsea-toronto.html"
 />
 </div>
 
 <div className="mt-12 text-center">
 <AffiliateButton href="https://www.booking.com/city/ca/toronto.html" text="Search All Toronto Hotels" variant="outline" />
 </div>
 </Section>

 <Section id="transport" title="Getting Around">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
   <p className="text-slate-600 dark:text-slate-300">
     Toronto’s transit reputation is… a conversation. But for World Cup travel, you’re in luck: the routes you’ll use are the simple ones. The entire game is getting yourself into the <strong>Union Station ↔ Exhibition Place</strong> rhythm and not letting a car talk you into gridlock.
   </p>
   <p className="text-slate-600 dark:text-slate-300">
     Two local hacks: (1) tap with the <strong>same card</strong> for your whole TTC journey so your two-hour transfer works, and (2) after matches, consider walking a bit away from the stadium before you call a ride—surge pricing feeds on indecision.
   </p>
 </div>
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className="space-y-8">
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
 <Train className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">TTC & GO Transit</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 The TTC (subway/streetcar/bus) covers the city. GO Transit covers the region and is the easiest way to hit Exhibition Place from Union on match day. You can pay with PRESTO or contactless cards, and TTC transfers are valid for two hours when you pay by PRESTO/contactless.
 </p>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
   Verified TTC fares: adult single is $3.35 (or $3.30 with PRESTO). TTC day pass (PRESTO ticket) is $13.50.
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
 Pearson (YYZ) is the main hub. The <strong>UP Express</strong> is the most reliable downtown link: 28 minutes to Union, every 15 minutes. If you’re staying near Union, this is the smoothest arrival you’ll ever have in Toronto.
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
 Toronto traffic is a competitive sport. Uber/Lyft are available, but surge pricing after matches is very real, and Exhibition Place congestion can make a short trip feel long. If you drive, plan extra time and expect special-event parking rates.
 </p>
 </div>
 </div>
 </div>
 
 <div className=" rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 h-fit">
 <h4 className="font-bold text-2xl mb-6">Distance to Stadium</h4>
 <ul className="space-y-6">
 {[
 { label: "Liberty Village", time: "10 min walk" },
 { label: "Union Station", time: "7–12 min (GO + short walk)" },
 { label: "CN Tower", time: "20–30 min (walk/transit)" },
 { label: "Airport (YYZ)", time: "45–60 min (UP + GO/TTC)" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
 <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
 </li>
 ))}
 </ul>
 <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <AffiliateButton href="https://www.viator.com/Toronto-tours/Transfers-and-Ground-Transport/d623-g15" text="Book Airport Transfer" variant="secondary" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="dining" title="Food & Drink">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
   <p className="text-slate-600 dark:text-slate-300">
     Toronto’s food scene is basically the city’s personality in edible form: multicultural, opinionated, and allergic to boredom. The good news is you can eat unbelievably well without touching a fine-dining reservation. The bad news is the best spots fill up fast when a big event hits town.
   </p>
   <p className="text-slate-600 dark:text-slate-300">
     My advice: <strong>book one “anchor” dinner</strong>, keep the rest flexible, and use markets for daytime fueling. Also: Torontonians will debate the best neighborhood like it’s a playoff series. Let them. Just enjoy the food.
   </p>
   <p className="text-slate-600 dark:text-slate-300">
     [Affiliate placement suggestion: OpenTable module after this intro.]
   </p>
 </div>

 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Liberty Village (Pregame Hub)", desc: "Patios, sports bars, and easy walks to the gates. If you want the crowd energy before kickoff, start here." },
 { title: "St. Lawrence Market", desc: "Classic Toronto food stop. Peameal bacon sandwich is the famous move, but the real win is grabbing picnic fuel for the waterfront." },
 { title: "Kensington Market", desc: "Bohemian, walkable, and wildly snackable. Come hungry and treat it like a choose‑your‑own‑adventure." },
 { title: "Chinatown (Spadina)", desc: "Late-night eats and big flavors. Great for post-match meals when other neighborhoods are winding down." },
 { title: "Koreatown (Bloor)", desc: "Korean BBQ and casual comfort food. Perfect if you want a fun group dinner that doesn’t require a formal vibe." },
 { title: "Ossington Strip", desc: "One of the best restaurant/bar corridors in the city. Trendy but not sterile, with a lot of good choices packed into a few blocks." }
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
   <AffiliateButton href="https://www.opentable.ca/toronto-restaurants" text="Reserve Toronto Restaurants" variant="primary" icon={Utensils} />
   <AffiliateButton href="https://www.viator.com/Toronto-tours/Food-Tours/d623-g6-c80" text="Book Food Tours" variant="outline" icon={Utensils} />
 </div>
 </Section>

 <Section id="attractions" title="Top Attractions">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
   <p className="text-xl text-slate-600 dark:text-slate-300">
     Toronto is easy to underestimate until you realize you’ve spent a whole day doing “one quick thing” and somehow ended up on a ferry, in a museum, and then eating dumplings at 11 p.m. The city is dense in the best way.
   </p>
   <p className="text-slate-600 dark:text-slate-300">
     If you’re here for a match, plan attractions around your match time. Toronto summer traffic and crowds are real, so keep your “must-do” sights close to downtown on match day—and push day trips to your non-match days.
   </p>
   <p className="text-slate-600 dark:text-slate-300">
     [Visual assets to add: map graphic showing Downtown ↔ Exhibition Place corridor, plus a “3-day Toronto” itinerary card.]
   </p>
 </div>
 <div className="space-y-6">
 {[
 { title: "CN Tower", desc: "Skyline views, glass floor, and a very ‘Toronto postcard’ moment. Go early or late to dodge peak crowds.", color: "text-blue-500" },
 { title: "Ripley's Aquarium", desc: "Right by the Tower. Family-friendly and air-conditioned, which hits differently on a humid day.", color: "text-cyan-500" },
 { title: "Royal Ontario Museum (ROM)", desc: "Big, iconic museum day. Great rainy-day plan and an easy subway trip from downtown.", color: "text-emerald-500" },
 { title: "Distillery District", desc: "Cobblestones, patios, shops, and a quieter kind of buzz. Great for photos and a slow afternoon.", color: "text-amber-700" },
 { title: "Toronto Islands", desc: "My favorite ‘you’re still in the city?’ escape. Ferry over, rent a bike, and reset your brain.", color: "text-emerald-600" },
 { title: "Evergreen Brick Works (Local Gem)", desc: "Nature + city views + markets. It feels like Toronto’s secret backyard when you need a breather.", color: "text-emerald-500" }
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
 <AffiliateButton href="https://www.citypass.com/toronto" text="Get Toronto CityPASS" variant="primary" />
 </div>
 </Section>

 <Section id="safety" title="Safety & Security">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
   <p className="text-slate-600 dark:text-slate-300">
     Toronto is generally safe for a city this size, but “safe” doesn’t mean “switch your brain off.” Match days create predictable crowd patterns: Union Station, streetcars, the waterfront corridor, and Exhibition Place will be packed. That’s when petty theft happens—because it’s easy, not because Toronto is dangerous.
   </p>
   <p className="text-slate-600 dark:text-slate-300">
     Areas to be cautious about (especially late at night): I tell visitors to be more alert around parts of <strong>Moss Park</strong> and the immediate <strong>Sherbourne & Dundas</strong> area, particularly if you’re walking alone. You don’t need to be scared—just don’t treat every block like it’s the same.
   </p>
 </div>
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> Event Patterns</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
   Crowds cluster at Union Station, streetcar stops, and stadium gates. Keep your phone out of your back pocket, close zippers in tight spaces, and decide your meetup spot before you lose cell signal in a crowd.
 </p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Practical Tips</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>• Use licensed taxis or major rideshares late at night, especially if you’re outside downtown.</li>
 <li>• On the TTC, keep bags in front of you in crowded cars and don’t leave phones on café tables near windows.</li>
 <li>• If someone “helps” you at an ATM or ticket machine uninvited, politely decline and move.</li>
 <li>• 911 is for emergencies. For non-emergency city help, Toronto’s 311 is useful.</li>
 </ul>
 <div className="mt-6">
 <AffiliateButton href="https://www.worldnomads.com/" text="Get Travel Insurance" variant="secondary" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="culture" title="Cultural Intelligence">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">Toronto is one of the most multicultural cities in the world. You'll hear over 140 languages spoken. Tipping: 15-20% is standard.</p>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { title: "Diversity", desc: "Explore neighborhoods like Chinatown, Little Italy, and Greektown for authentic cultural experiences." },
 { title: "Politeness", desc: "Canadians are known for being polite. Queuing is respected. 'Sorry' is a common reflex." },
 { title: "Nightlife", desc: "Last call is generally 2 AM. King West and Queen West are the main hubs for bars and clubs." }
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
 <p className="text-slate-600 dark:text-slate-400">Warm and humid (20–30°C). Evenings can be pleasant. Rain showers are possible.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Essentials</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400">
 <li>• Comfortable walking shoes</li>
 <li>• Light rain jacket</li>
 <li>• Sunscreen & hat</li>
 </ul>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Tech</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-6">
 <li>• Type A/B plugs (same as US)</li>
 <li>• Offline maps</li>
 <li>• Power bank</li>
 </ul>
 <AffiliateButton href="#" text="Get an eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <Section id="faq" title="Frequently Asked Questions">
 <div className="space-y-2">
 {[
 { q: "Where is the stadium located?", a: "BMO Field is located at Exhibition Place, just west of Downtown Toronto, near the lakeshore." },
 { q: "Is Toronto safe for tourists?", a: "Yes, Toronto is considered one of the safest major cities in North America. Standard big-city precautions apply." },
 { q: "Do I need a car in Toronto?", a: "No. Driving and parking are difficult and expensive. The TTC and GO Transit are efficient and cover the city well." },
 { q: "What is the weather like in June/July?", a: "Summer in Toronto is warm and humid, with highs around 25–30°C (77–86°F). It's great for outdoor activities." },
 { q: "How far is the airport from the stadium?", a: "Pearson (YYZ) is about 25 mins by UP Express to Union, then 10 mins by GO Train to Exhibition. Allow 45-60 mins total." },
 { q: "Which area should I stay in?", a: "Downtown for central access to everything. Liberty Village or King West if you want to be close to the stadium and nightlife." },
 { q: "Can I bring a bag to the stadium?", a: "Strict bag policies apply. Check BMO Field's specific World Cup guidelines closer to the event." },
 { q: "How early should I arrive for matches?", a: "At least 90 minutes before kickoff. Exhibition Place gets very congested on game days." },
 { q: "Is the stadium air-conditioned?", a: "No, BMO Field is an open-air stadium. Dress for the weather." },
 { q: "What’s the best way to get from the airport?", a: "The UP Express train is the fastest and most reliable link from Pearson (YYZ) to Union Station downtown." },
 { q: "Where can I watch matches if I don’t have tickets?", a: "There will likely be fan zones at Nathan Phillips Square or other central locations, plus many sports bars." },
 { q: "Are restaurants close to the stadium?", a: "Liberty Village is a short walk away and has many restaurants and bars. King West is also nearby." },
 { q: "Do I need travel insurance?", a: "Yes, medical costs for visitors in Canada can be high. Insurance is highly recommended." },
 { q: "What mobile connectivity works best?", a: "Major Canadian carriers have good coverage. eSIMs are a convenient option for visitors." },
 { q: "How do I avoid rideshare surge pricing?", a: "Use the TTC or GO Transit. They are immune to traffic jams and surge pricing." },
 { q: "Where can I buy souvenirs?", a: "The Eaton Centre downtown has many shops, and there are souvenir stores along Yonge Street and near major attractions." }
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
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>Non-Emergency Police</strong> <span>416-808-2222</span></li>
 <li className="flex justify-between"><strong>Hospital</strong> <span>Toronto General / SickKids</span></li>
 </ul>
 </div>
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-emerald-500"/> Connectivity</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6">
 <li>• <strong>WiFi:</strong> Free at YYZ, Union Station, Subway.</li>
 <li>• <strong>Power:</strong> 120V, Type A/B plugs.</li>
 <li>• <strong>Currency:</strong> Canadian Dollar (CAD).</li>
 </ul>
 <AffiliateButton href="#" text="Get an Airalo eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Explore Other Host Cities</h3>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {['New York/New Jersey', 'Los Angeles', 'Mexico City', 'Atlanta', 'Dallas', 'Miami', 'Seattle', 'Boston'].map((city) => (
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
















