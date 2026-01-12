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
 X, ChevronRight, Facebook, Twitter, Linkedin, Copy,
 Ship
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
 <MapPin className="w-4 h-4 text-emerald-500" /> {distance}
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
 src="/images/cities/seattle-world-cup-2026-1600.webp" 
 alt="Seattle Skyline and Lumen Field" 
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
              { label: 'Seattle', href: '/world-cup-2026-seattle-guide' }
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
                Group Stage & Knockout
              </span>
 </div>
 
 <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
 Seattle <span className="block">World Cup 2026 Guide</span>
 </h1>
 <p className="text-base md:text-lg lg:text-xl text-white/90 font-light max-w-3xl leading-relaxed">
 A local’s playbook for Lumen Field match days, where to stay, how to move, what to eat, and what to skip so your trip feels effortless.
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
 I’ve watched this city change for two decades: cranes, coffee, and a whole lot more soccer than anyone predicted. But one thing hasn’t changed—when Seattle gets a big match, we show up early, we walk a lot, and we let the stadium do the shouting.
 </p>
 <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
 If you’re short on time, here are the answers people actually Google (and the answers locals actually use):
 </p>
 </div>
 <div className="grid md:grid-cols-3 gap-6 mb-12">
 {[
 { q: "Best place to stay?", a: "Pioneer Square for walking; Belltown for variety; Capitol Hill for nightlife." },
 { q: "Best airport transfer?", a: "Link light rail. Cheap, reliable, and it doesn’t care about traffic." },
 { q: "Car or no car?", a: "No car if you’re based Downtown. Use rail + ferries + your feet." }
 ].map((item, i) => (
 <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <p className="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-3">{item.q}</p>
 <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.a}</p>
 </div>
 ))}
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: MapPin, title: "The Stadium Is Downtown-Adjacent", text: "Lumen Field sits in SoDo, right on the edge of Pioneer Square. Pick a hotel where you can walk or take one quick rail hop—your future self will thank you." },
 { icon: Train, title: "The Link Light Rail Trick", text: "Seattle’s secret isn’t secret: Link from SEA airport straight into the core, then one more stop to the stadium. It’s the least-stress commute you’ll have all week." },
 { icon: DollarSign, title: "Seattle Pricing Reality", text: "This is not a bargain city. The smartest move is booking early with free cancellation, then watching for price drops later." }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] transition-colors">
 <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
 <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/sea" text="Compare Flights to SEA" variant="secondary" icon={Plane} />
 <AffiliateButton href="https://www.booking.com/city/us/seattle.html" text="Find Seattle Hotels (Refundable)" variant="primary" icon={Hotel} />
 <AffiliateButton href="/lumen-field-world-cup-2026" text="Read the Lumen Field Guide" variant="outline" icon={ArrowRight} />
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
 {['Use SEA Airport automated control', 'Proof of onward travel required', 'Carry digital copies of tickets'].map((item, i) => (
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
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
 <p className="text-slate-600 dark:text-slate-300">
 Seattle’s World Cup weeks will be a squeeze: limited hotel inventory in the core, a lot of fans trying to do “downtown + stadium + waterfront” in the same 6-hour window, and a transit system that’s great when you use it like a local (and frustrating when you try to outsmart it).
 </p>
 </div>
 <div className="space-y-6 mb-12">
 {[
 { time: "9–6 months out", desc: "Book flights into SEA and lock a refundable hotel in Downtown, Belltown, or Pioneer Square. Re-check pricing every few weeks; Seattle rates swing hard." },
 { time: "6–3 months out", desc: "Decide your “base neighborhood” and stick to it. The best trips here feel compact: walk + one train + one ferry. Anything else becomes a logistics hobby." },
 { time: "90–30 days out", desc: "Buy travel insurance, confirm your transit plan (Link + ORCA), and map your matchday food stops so you’re not wandering hungry around 3rd Ave at midnight." }
 ].map((item, i) => (
 <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-start md:items-center border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
 <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
 </div>
 ))}
 </div>

 <div className="grid md:grid-cols-3 gap-8">
 <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-2xl mb-4">48 Hours (One Match)</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
 Day 1: Pike Place → Waterfront stroll → sunset drinks in Belltown. Day 2: matchday walk through Pioneer Square → Lumen Field → late-night noodles in the ID.
 </p>
 <AffiliateButton href="https://www.getyourguide.com/seattle-l198/" text="Book Seattle Experiences" variant="outline" />
 </div>
 <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-2xl mb-4">4 Days (Seattle + Water)</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
 Slot in a ferry day: walk-on to Bainbridge for coffee + bookstores, back for the stadium. It’s the easiest “I was in the Pacific Northwest” flex that doesn’t require a car.
 </p>
 <AffiliateButton href="https://wsdot.wa.gov/ferries" text="Check Ferry Schedules" variant="secondary" />
 </div>
 <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-2xl mb-4">6–7 Days (PNW Week)</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
 Add one big nature day (Mt. Rainier or Olympic Peninsula) and one neighborhood day (Ballard + Fremont). This is how locals do “summer Seattle.”
 </p>
 <AffiliateButton href="https://www.viator.com/Seattle/d704-ttd" text="Browse Day Trips" variant="primary" />
 </div>
 </div>

 <div className="mt-10 flex flex-wrap gap-4">
 <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/sea" text="Set Flight Alerts" variant="primary" icon={Plane} />
 <AffiliateButton href="https://www.worldnomads.com/" text="Protect Your Trip" variant="secondary" icon={Shield} />
 </div>
 </Section>

 <Section id="budget" title="Budget Tiers">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
 <p className="text-slate-600 dark:text-slate-300">
 Here’s the honest version: Seattle can be an expensive city, but you can still travel smart if you keep your “big three” under control—hotel, match tickets, and getting around. The best savings come from staying near Link light rail and eating like a local (coffee + markets + casual seafood) instead of trying to turn every meal into a reservation.
 </p>
 </div>

 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Budget", headline: "$220–$380/day", items: ["Hostel or simple hotel in Belltown/Queen Anne", "Link + walking (no rideshares)", "Market meals + cheap teriyaki + happy hour"], cta: { href: "https://www.booking.com/city/us/seattle.html", text: "Find Budget Stays" } },
 { title: "Mid-Range", headline: "$380–$650/day", items: ["Downtown/Belltown 3–4 star hotel", "One paid attraction + one ferry day", "Restaurants mixed with market snacks"], cta: { href: "https://www.booking.com/city/us/seattle.html", text: "Compare Mid-Range Hotels" } },
 { title: "Luxury", headline: "$650–$1,200+/day", items: ["Waterfront luxury or top suites near downtown", "Premium dining + cocktails + Uber comfort", "Private experiences (boats, chefs, VIP)"], cta: { href: "https://www.booking.com/city/us/seattle.html", text: "Browse Luxury Options" } }
 ].map((tier, i) => (
 <div key={i} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-2xl transition-all duration-300">
 <div className="flex items-baseline justify-between gap-4 mb-6">
 <h4 className="font-black text-2xl text-slate-900 dark:text-white">{tier.title}</h4>
 <span className="text-emerald-600 dark:text-emerald-400 font-bold">{tier.headline}</span>
 </div>
 <ul className="space-y-4 mb-8">
 {tier.items.map((item, j) => (
 <li key={j} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2" />
 {item}
 </li>
 ))}
 </ul>
 <AffiliateButton href={tier.cta.href} text={tier.cta.text} variant={i === 1 ? "primary" : "outline"} icon={Hotel} />
 </div>
 ))}
 </div>

 <div className="mt-10 flex flex-wrap gap-4">
 <AffiliateButton href="https://www.expedia.com/Seattle.d178307.Destination-Travel-Guides" text="Bundle Flight + Hotel" variant="secondary" icon={Briefcase} />
 <AffiliateButton href="/world-cup-2026-flight-booking-guide" text="Read Flight Booking Strategy" variant="outline" icon={Plane} />
 </div>
 </Section>

 <Section id="stadium" title="Lumen Field">
 <LightboxImage 
 src="/images/stadiums/lumen-field-seattle-world-cup-2026-1600.webp" 
 alt="Lumen Field Aerial View" 
 caption="Lumen Field: Built for noise, nestled between the skyline and the sound."
 />

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 Lumen Field is built for noise. The rooflines trap sound, the stands sit close, and Seattle crowds don’t really do “quiet appreciation”—they do full-throated commitment. You’re also not trekking to a suburban complex: the stadium sits in SoDo, a short walk from Pioneer Square and a straight shot on Link light rail.
 </p>
 <p>
 The most important stadium rule to remember is the bag rule. Lumen Field enforces a clear bag policy, so plan around it and you’ll glide through security instead of doing the “what do I do with my backpack?” panic outside the gate.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Key Features</h4>
 <ul className="space-y-4">
 {[
 { label: "Capacity", val: "68,740" },
 { label: "Surface", val: "Tournament-ready pitch setup" },
 { label: "Roof", val: "Partial roof (windy ends)" },
 { label: "Built", val: "2002" }
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
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Pre-match flow: start in Pioneer Square, then walk south with the crowd. It’s the best “Seattle soccer” atmosphere you’ll get outside the stadium.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Bag rule: clear bags only (up to 12″ x 6″ x 12″) plus a small clutch (up to 4.5″ x 6.5″).</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Wind matters: even in summer, the open ends can feel chilly once the sun drops—bring one thin layer.</li>
 </ul>
 </div>
 </div>
 
 <div className="p-8 rounded-[2rem] border border-emerald-500/20">
 <p className="text-lg text-center font-medium text-emerald-800 dark:text-emerald-200">
 <strong>Getting There:</strong> Use Link light rail to Stadium Station or International District/Chinatown Station, then follow the crowd. If you must drive, pre-book parking and expect slow exits after full-capacity matches.
 </p>
 </div>
 <div className="mt-10 flex flex-wrap gap-4">
 <AffiliateButton href="/lumen-field-world-cup-2026" text="Stadium Seating & Entry Guide" variant="primary" icon={ArrowRight} />
 <AffiliateButton href="https://www.getyourguide.com/seattle-l198/" text="Book a Stadium-Area Tour" variant="outline" />
 </div>
 </Section>

 <Section id="tips" title="Match Day Gameplan">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
 <p className="text-slate-600 dark:text-slate-300">
 Here’s the rhythm that works in Seattle. Don’t fight it. Lean into it. The whole area south of downtown becomes a moving river of jerseys, flags, and very opinionated people telling you which gate is “way faster” (sometimes they’re right).
 </p>
 </div>
 <div className="grid md:grid-cols-3 gap-6 mb-10">
 {[
 { title: "T–4 to T–2 hours", text: "Start in Pioneer Square. Get one proper meal now, not “later.” Later becomes a $18 hot dog line." },
 { title: "T–90 minutes", text: "Walk south to the stadium with the crowd. Bring only what fits the clear bag rule—security moves fast when people don’t improvise." },
 { title: "Post-match", text: "Don’t sprint to Link unless you have to. Grab a drink or dessert in Pioneer Square and let the first wave clear." }
 ].map((item, i) => (
 <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="grid md:grid-cols-2 gap-8 mb-10">
 <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-2xl mb-4">Local Pre-Match Shortlist</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>• Pioneer Square for pre-match bars and the walk-in atmosphere.</li>
 <li>• International District for fast, satisfying food right after the match.</li>
 <li>• Waterfront for a calmer reset if you’re traveling with family.</li>
 </ul>
 </div>
 <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-2xl mb-4">Bring These, Skip Those</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>• Portable charger and a thin layer for the ride home.</li>
 <li>• Earplugs if you’re sensitive to noise (Lumen is loud on purpose).</li>
 <li>• Skip big umbrellas—bring a packable shell instead.</li>
 </ul>
 </div>
 </div>
 <div className="flex flex-wrap gap-4">
 <AffiliateButton href="https://www.amazon.com/s?k=clear+stadium+bag" text="Buy Clear Stadium Bag" variant="primary" />
 <AffiliateButton href="https://www.amazon.com/s?k=collapsible+water+bottle" text="Add Refillable Bottle" variant="outline" />
 <AffiliateButton href="https://www.airalo.com/" text="Get an eSIM (Arrive Connected)" variant="secondary" icon={Globe} />
 </div>
 </Section>

 <Section id="tickets" title="Schedule & Tickets">
 <div className="bg-emerald-900 dark:bg-emerald-950 text-slate-900 dark:text-white rounded-[2.5rem] p-8 md:p-12 mb-12 relative overflow-hidden shadow-2xl">
 <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[150px] opacity-20"></div>
 <div className="relative z-10">
 <div className="flex items-center gap-4 mb-8">
 <Ticket className="w-8 h-8 text-emerald-400" />
 <h3 className="text-3xl font-black">Seattle Match Slate</h3>
 </div>
 <div className="space-y-6">
 {[
 { stage: "Group Stage", count: "June 15", color: "text-emerald-300" },
 { stage: "Group Stage", count: "June 19", color: "text-emerald-300" },
 { stage: "Group Stage", count: "June 24", color: "text-emerald-300" },
 { stage: "Group Stage", count: "June 26", color: "text-emerald-300" },
 { stage: "Round of 32", count: "July 1", color: "text-emerald-300" },
 { stage: "Round of 16", count: "July 6", color: "text-emerald-300" }
 ].map((match, i) => (
 <div key={i} className="flex items-center justify-between border-b border-white/10 pb-4">
 <span className={`font-mono text-lg ${match.color}`}>{match.stage}</span>
 <span className="font-bold text-xl">{match.count}</span>
 </div>
 ))}
 </div>
 <div className="mt-10 flex flex-wrap gap-4">
 <AffiliateButton href="/world-cup-2026-schedule" text="See Full Tournament Schedule" variant="outline" icon={Calendar} />
 <AffiliateButton href="/world-cup-2026-match-selection-strategy" text="Match Selection Strategy" variant="secondary" icon={Trophy} />
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
 Missed a sales phase? Use reputable ticket marketplaces with buyer guarantees and clear refund policies. Avoid random DMs and “PDF ticket” scams.
 </p>
 <AffiliateButton href="https://www.stubhub.com/fifa-world-cup-tickets/" text="Check StubHub Availability" variant="primary" />
 </div>
 </div>
 </Section>

 <Section id="hotels" title="Where to Stay">
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl leading-relaxed">
 Stay in <strong>Pioneer Square</strong> or <strong>SoDo</strong> for walking distance to the stadium. <strong>Downtown/Belltown</strong> offers more options and is just a short rail ride away.
 </p>
 
 <div className="space-y-8">
 <HotelCard 
 name="Silver Cloud Hotel Seattle - Stadium"
 rating={4.7}
 price="$$$$"
 distance="0.1 miles"
 features={["Rooftop Pool", "Stadium Views", "Modern"]}
 image="/images/cities/seattle-world-cup-2026-1600.webp" 
 link="https://www.booking.com/hotel/us/silver-cloud-stadium.html"
 />
 <HotelCard 
 name="Embassy Suites by Hilton Seattle Downtown"
 rating={4.5}
 price="$$$"
 distance="0.3 miles"
 features={["Free Breakfast", "Indoor Pool", "Suites"]}
 image="/images/cities/seattle-world-cup-2026-1600.webp" 
 link="https://www.booking.com/hotel/us/embassy-suites-seattle-downtown-pioneer-square.html"
 />
 <HotelCard 
 name="Best Western Plus Pioneer Square"
 rating={4.2}
 price="$$"
 distance="0.4 miles"
 features={["Historic District", "Free Breakfast", "Value"]}
 image="/images/cities/seattle-world-cup-2026-1600.webp" 
 link="https://www.booking.com/hotel/us/best-western-plus-pioneer-square-hotel.html"
 />
 </div>
 
 <div className="mt-12 text-center">
 <AffiliateButton href="#" text="Search All Seattle Hotels" variant="outline" />
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
 <h4 className="font-bold text-xl mb-2">Link Light Rail</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 The spine of Seattle transit. Connects SEA-TAC Airport, Downtown, and Stadiums. Cheap, reliable, and beats traffic.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
 <Ship className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Ferries</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Iconic to Seattle. Take a ferry to Bainbridge or West Seattle for views and exploration. The terminal is downtown.
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
 Parking is expensive ($40-60/night). Skip the rental car if staying downtown. Rideshares are plentiful but pricey.
 </p>
 </div>
 </div>
 </div>
 
 <div className=" rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 h-fit">
 <h4 className="font-bold text-2xl mb-6">Distance to Stadium</h4>
 <ul className="space-y-6">
 {[
 { label: "Pioneer Square", time: "5-10 min walk" },
 { label: "Downtown", time: "10 min rail" },
 { label: "Capitol Hill", time: "15 min rail" },
 { label: "Airport (SEA)", time: "35 min rail" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
 <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
 </li>
 ))}
 </ul>
 <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <AffiliateButton href="#" text="Get ORCA Card Info" variant="secondary" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="dining" title="Food & Drink">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Seafood & Oysters", desc: "Fresh from the Pacific. Try oysters in Ballard or tossed salmon at Pike Place Market." },
 { title: "Coffee Culture", desc: "The home of Starbucks, but try the independents like Espresso Vivace for the real experience." },
 { title: "International District", desc: "Incredible Dim Sum, Pho, and Sushi just steps from the stadium. A foodie paradise." }
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
 Seattle's icons are world-famous. From the Space Needle to the Pike Place Market, there's plenty to see.
 </p>
 <div className="space-y-6">
 {[
 { title: "Space Needle & Chihuly", desc: "The city's icon. Combine with Chihuly Garden and Glass right next door.", color: "text-blue-500" },
 { title: "Pike Place Market", desc: "Watch fish fly, see the first Starbucks, and eat your way through the stalls.", color: "text-red-500" },
 { title: "MoPOP", desc: "Museum of Pop Culture. Nirvana, Hendrix, Sci-Fi. The building itself is art.", color: "text-emerald-500" }
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
 <AffiliateButton href="#" text="Get Seattle CityPASS (Save 44%)" variant="primary" />
 </div>
 </Section>

 <Section id="safety" title="Safety & Security">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> Event Patterns</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Pioneer Square is very safe on game days due to crowds. Exercise caution late at night when crowds disperse.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Practical Tips</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>• Avoid 3rd Avenue between Pike and Pine at night.</li>
 <li>• Leave nothing visible in your car (property crime).</li>
 <li>• Save local emergency contacts offline.</li>
 </ul>
 <div className="mt-6">
 <AffiliateButton href="#" text="Get Travel Insurance" variant="secondary" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="culture" title="Cultural Intelligence">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">Seattle is laid-back but tech-savvy. Rain gear is fashion. Tipping is standard 18-20%.</p>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { title: "Fan Zones", desc: "Seattle Center (Space Needle) and the Waterfront are key fan festival sites." },
 { title: "Nightlife", desc: "Capitol Hill is the hub for bars, clubs, and LGBTQ+ culture. Pioneer Square for pre-match." },
 { title: "The 'Freeze'", desc: "Locals are polite but reserved. Don't take it personally; it's just the Seattle Freeze." }
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
 <p className="text-4xl font-black text-slate-900 dark:text-white mb-2">75°F <span className="text-lg text-slate-500 font-medium">(24°C)</span></p>
 <p className="text-slate-600 dark:text-slate-400">Avg High. Sunny days, cool evenings. Very low humidity.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Briefcase className="w-6 h-6 text-emerald-500"/> Essentials Checklist</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400">
 <li>• Light layers / Rain shell</li>
 <li>• Comfortable walking shoes (hilly)</li>
 <li>• Sunglasses</li>
 <li>• Portable Charger</li>
 </ul>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><X className="w-6 h-6 text-rose-500"/> What to Leave</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400">
 <li>• Umbrella (locals don't use them)</li>
 <li>• Heavy winter gear</li>
 <li>• Car keys (use Light Rail)</li>
 </ul>
 </div>
 </div>
 </Section>

 <Section id="faq" title="FAQ">
 <div className="space-y-2">
 <FAQItem 
 question="Where is the stadium located?"
 answer="Lumen Field is in the SoDo district, just south of downtown and Pioneer Square. It's easily walkable from many hotels."
 />
 <FAQItem 
 question="How do I get from the airport?"
 answer="Take the Link Light Rail directly from SEA-TAC to downtown (Westlake/Pioneer Sq). It takes about 35-40 minutes and costs ~$3."
 />
 <FAQItem 
 question="Do I need a car in Seattle?"
 answer="No. Parking is expensive and traffic is bad. The Link Light Rail and walking are your best options."
 />
 <FAQItem 
 question="Is it always raining?"
 answer="Not in summer! June and July are typically beautiful, sunny, and mild. But bringing a light layer is always smart."
 />
 </div>
 </Section>

 </main>
    </div>
  </div>
);
}















