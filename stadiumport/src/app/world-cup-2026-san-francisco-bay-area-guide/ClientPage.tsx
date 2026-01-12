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
      <div className="relative h-[75vh] md:h-[85vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/cities/san-francisco-world-cup-2026-1600.webp" 
            alt="San Francisco Skyline" 
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
                { label: 'San Francisco Bay Area', href: '/world-cup-2026-san-francisco-bay-area-guide' }
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
                  Last Updated: January 4, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-medium tracking-widest uppercase backdrop-blur-md">
                  Host City
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
                  Quarterfinal Host
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9] md:leading-[0.95]">
                San Francisco Bay Area World Cup 2026 Guide
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-white/90 font-light max-w-3xl leading-relaxed">
                Levi&apos;s Stadium match-day logistics, neighborhood-by-neighborhood bases, local food shortcuts, and the stuff most guides skip.
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
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
   <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
     Welcome to the <strong>San Francisco Bay Area World Cup 2026 guide</strong> that actually respects geography.
     The matches are at <strong>Levi&apos;s Stadium in Santa Clara</strong> (FIFA calls it <em>San Francisco Bay Area Stadium</em>), not in San Francisco.
     That one detail changes everything: where you sleep, how you move, what time you eat, and whether match day feels like a smooth victory lap or a logistics fight.
   </p>
   <p>
     My Bay Area rule for visiting friends is simple: <strong>tour like you&apos;re in SF</strong>, but <strong>sleep like you&apos;re going to Santa Clara</strong> (at least on match nights).
     If you want the postcard trip, base in the city and accept a longer commute. If you want calm match days, base in the South Bay or on the Caltrain corridor.
   </p>
 </div>

 <div className="grid md:grid-cols-3 gap-8 mb-12">
   {[
     { icon: MapPin, title: "Where To Base", text: "SF for iconic sights and nightlife. South Bay (Santa Clara/San Jose) for stress-free match days. Peninsula (Palo Alto/Mountain View) is the compromise." },
     { icon: Train, title: "Match-Day Transit", text: "Best no-car plan: Caltrain to Mountain View + VTA Light Rail (Orange Line) to Great America Station. Build buffer time for queues after the whistle." },
     { icon: Sun, title: "Microclimates Are Real", text: "Foggy 60s in SF can coexist with sunny 80s in Santa Clara. Pack layers and bring sun protection specifically for daytime matches." }
   ].map((item, i) => (
     <div key={i} className="p-8 rounded-[2rem] transition-colors">
       <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
       <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
       <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
     </div>
   ))}
 </div>

 <div className="grid md:grid-cols-2 gap-8 mb-12">
   <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
     <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Quick Answers (Featured Snippet Mode)</h3>
     <div className="space-y-5 text-slate-700 dark:text-slate-300">
       <p><strong>Closest base to the stadium:</strong> Santa Clara / North San Jose (walk or short light rail).</p>
       <p><strong>Best base for first-time visitors:</strong> SF (Union Square, SoMa, North Beach) + one overnight near Santa Clara on match night.</p>
       <p><strong>Fastest transit combo from SF:</strong> Caltrain → Mountain View → VTA (Orange Line) → Great America.</p>
       <p><strong>One mistake to avoid:</strong> Driving into SF and leaving bags in the car. Don&apos;t do it.</p>
     </div>
   </div>
   <div className="p-8 rounded-[2rem] border border-emerald-500/20">
     <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">What Most Guides Get Wrong</h3>
     <ul className="space-y-3 text-slate-700 dark:text-slate-300">
       <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> They treat “San Francisco” and “Levi&apos;s Stadium” like neighbors.</li>
       <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> They skip the last-train reality and post-match queue math.</li>
       <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> They recommend rental cars in SF without warning you about break-ins.</li>
       <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> They ignore microclimates—so people dress wrong and feel miserable.</li>
     </ul>
     <div className="mt-8 flex flex-wrap gap-4">
       <AffiliateButton href="/levis-stadium-world-cup-2026" text="Read the Levi’s Stadium Guide" variant="outline" icon={ArrowRight} />
       <AffiliateButton href="https://www.fifa.com" text="FIFA Schedule & Tickets" variant="secondary" icon={Ticket} />
     </div>
   </div>
 </div>

 <div className="flex flex-wrap gap-4">
   <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/sfo" text="Compare Bay Area Flights" variant="secondary" icon={Plane} />
   <AffiliateButton href="https://www.booking.com/searchresults.html?ss=San+Francisco" text="Find SF Hotels (Refundable)" variant="primary" icon={Hotel} />
   <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Santa+Clara" text="Find Santa Clara Hotels" variant="outline" icon={Hotel} />
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
              {['SFO is the main international gateway', 'SJC is closer to the stadium', 'OAK is a budget alternative'].map((item, i) => (
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
 { time: "12 Months Out", desc: "Apply for US Visa / ESTA if required. Research neighborhoods in SF vs Santa Clara." },
 { time: "6–9 Months Out", desc: "Book hotels. SF prices soar during tech conferences and events. Look for refundable rates." },
 { time: "1–3 Months Out", desc: "Book Caltrain tickets and plan regional trips (Napa/Yosemite). Register for ticket lotteries." }
 ].map((item, i) => (
 <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center">
 <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
 <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
 </div>
 ))}
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
          <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/sfo" text="Set Flight Alerts" variant="primary" icon={Plane} />
          <AffiliateButton href="https://www.opentable.com/san-francisco-restaurants" text="Reserve Restaurant Tables" variant="outline" />
        </div>
 </Section>

 <Section id="budget" title="Budget Tiers">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Smart Saver", items: ["Hostels in SF", "Public Transit (Muni/BART)", "Mission Burritos"] },
 { title: "Comfort Upgrades", items: ["3-Star Hotels", "Occasional Rideshare", "Mix of Dining"] },
 { title: "Premium", items: ["Stadium-side Hotels", "VIP Seats", "Napa Wine Tours"] }
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
 <AffiliateButton href="https://www.viator.com/San-Francisco/d651-ttd" text="Search SF Packages" variant="secondary" icon={Briefcase} />
 </div>
 </Section>

 <Section id="stadium" title="Levi's Stadium">
<LightboxImage 
src="/images/stadiums/levis-stadium-santa-clara-world-cup-2026-1600.webp" 
alt="Levi's Stadium Interior" 
caption="Levi's Stadium in Santa Clara - Home of the San Francisco 49ers"
/>

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 Levi&apos;s Stadium is a high-tech marvel known for its connectivity and open design. Located in <strong>Santa Clara</strong>, it features excellent sightlines but can get very warm during day games due to lack of shade on the east side.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Key Features</h4>
 <ul className="space-y-4">
 {[
 { label: "Capacity", val: "68,500" },
 { label: "Surface", val: "Natural Grass" },
 { label: "Roof", val: "Open Air" },
 { label: "Built", val: "2014 ($1.3 Billion)" }
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
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Sun Warning: The East side gets direct sun. Bring a hat.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Tech: Use the app for in-seat food ordering.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Transport: VTA Light Rail stops beside the stadium at Great America Station.</li>
 </ul>
 </div>
 </div>
 
 <div className="p-8 rounded-[2rem] border border-emerald-500/20">
 <p className="text-lg text-center font-medium text-emerald-800 dark:text-emerald-200">
 <strong>Getting There:</strong> The <strong>VTA Light Rail</strong> (Orange Line) is the most efficient way to reach the stadium gates. It connects with Caltrain at Mountain View station for fans coming from San Francisco.
 </p>
 </div>
 </Section>

 <Section id="tips" title="Match Day Gameplan">
 <div className="grid md:grid-cols-3 gap-6 mb-8">
 {[
 { title: "Arrival", text: "Arrive at least 2 hours early. Security lines can be long, and the stadium plaza has fan activities." },
 { title: "Clear Bag", text: "Strict clear bag policy enforced. 12x6x12 inches maximum. No backpacks or large purses." },
 { title: "Exit Plan", text: "VTA/Caltrain lines post-match are long. Consider waiting in the stadium club or nearby Fan Zone for 30 mins." }
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
 { stage: "Round of 32", count: "1 Match", color: "text-emerald-300" }
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
          Missed the draw? Trusted resale platforms offer verified tickets, though prices will be higher for high-demand match days.
        </p>
        <AffiliateButton href="https://www.stubhub.com/" text="Check StubHub" variant="primary" />
      </div>
 </div>
 </Section>

 <Section id="hotels" title="Where to Stay">
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl leading-relaxed">
 Choosing where to stay is critical. Stay in <strong>San Francisco (Union Square/Fisherman&apos;s Wharf)</strong> for tourism and nightlife, or <strong>Santa Clara/San Jose</strong> for convenience to the stadium.
 </p>
 
 <div className="space-y-8">
 <HotelCard 
 name="Hyatt Regency Santa Clara"
 rating={4.5}
 price="$450 - $700"
 distance="5 min walk"
 features={['Stadium Adjacent', 'Pool', 'Luxury']}
 image="/images/cities/san-francisco-world-cup-2026.webp" 
 link="https://www.booking.com/hotel/us/hyatt-regency-santa-clara.html"
 />
 <HotelCard 
 name="Hilton San Francisco Union Square"
 rating={4.0}
 price="$300 - $500"
 distance="45 miles (Transit required)"
 features={['City Center', 'Rooftop Bar', 'Near Cable Cars']}
 image="/images/cities/san-francisco-world-cup-2026.webp" 
 link="https://www.booking.com/hotel/us/hilton-san-francisco-union-square.html"
 />
 <HotelCard 
 name="Hotel Valencia Santana Row"
 rating={4.6}
 price="$350 - $600"
 distance="5 miles"
 features={['Luxury Shopping', 'Dining Hub', 'Boutique Style']}
 image="/images/cities/san-francisco-world-cup-2026.webp" 
 link="https://www.booking.com/hotel/us/hotel-valencia-santana-row.html"
 />
 </div>
 
 <div className="mt-12 text-center">
 <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Bay+Area" text="Search All Bay Area Hotels" variant="outline" />
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
 <h4 className="font-bold text-xl mb-2">Caltrain & VTA</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 From SF, take Caltrain to Mountain View, then transfer to VTA Light Rail (Orange Line) to the stadium. Total time: ~2 hours.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
 <Plane className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Airport Options</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 SFO is the main hub (BART connected). SJC is closest to the stadium (10 mins). OAK is a budget alternative across the bay.
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
 Traffic is heavy. Parking at the stadium is $50+. Avoid driving from SF if possible; public transit is more reliable on match days.
 </p>
 </div>
 </div>
 </div>
 
 <div className=" rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 h-fit">
 <h4 className="font-bold text-2xl mb-6">Distance to Stadium</h4>
 <ul className="space-y-6">
 {[
 { label: "Santa Clara Hotels", time: "5-15 min walk" },
 { label: "San Jose (Downtown)", time: "20 min tram" },
 { label: "San Francisco", time: "1.5 - 2 hrs transit" },
 { label: "SJC Airport", time: "10 min drive" }
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

 <Section id="dining" title="Food & Drink">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Mission Burrito", desc: "A SF icon. Massive, foil-wrapped burritos. Try La Taqueria or El Farolito in the Mission District." },
 { title: "Fisherman's Wharf", desc: "Clam chowder in a sourdough bread bowl. It's touristy, but delicious and essential SF experience." },
 { title: "Dim Sum", desc: "San Francisco has the best Chinese food outside Asia. Visit Chinatown or the Richmond District for authentic dim sum." }
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
 From the iconic Golden Gate to the tech giants of Silicon Valley, the Bay Area has it all.
 </p>
 <div className="space-y-6">
 {[
 { title: "Golden Gate Bridge", desc: "Walk or bike across the world's most famous bridge. Bring a jacket - it's windy!", color: "text-red-500" },
 { title: "Alcatraz Island", desc: "Tour the infamous former federal prison. Book tickets months in advance - they sell out.", color: "text-slate-500" },
 { title: "Silicon Valley", desc: "Visit the Apple Park Visitor Center in Cupertino or the Googleplex in Mountain View.", color: "text-emerald-500" }
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
 <AffiliateButton href="https://www.citypass.com/san-francisco" text="Get SF CityPASS (Save 45%)" variant="primary" />
 </div>
 </Section>

 <Section id="safety" title="Safety & Security">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> Car Break-ins</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 "Bipping" (smash-and-grab) is common in SF. NEVER leave anything visible in your car, not even a charging cable or loose change.
 </p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Neighborhoods</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>• Avoid the Tenderloin district (SF).</li>
 <li>• Stick to well-lit main streets in SoMa.</li>
 <li>• Santa Clara areas are generally very safe.</li>
 </ul>
 <div className="mt-6">
              <AffiliateButton href="https://www.worldnomads.com/" text="Get Travel Insurance" variant="secondary" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="culture" title="Cultural Intelligence">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">The Bay Area is diverse, progressive, and tech-focused. Casual dress (jeans/hoodies) is the norm, even in nice restaurants.</p>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { title: "Fan Zones", desc: "Look for official fan zones and city activations closer to the tournament—plans can change year to year." },
 { title: "Tipping", desc: "Standard is 18-22%. Living costs are high, and service workers rely on tips." },
 { title: "Sustainability", desc: "Bring a reusable bag. Plastic bags are banned or cost extra everywhere." }
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
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Sun className="w-6 h-6 text-amber-500"/> Microclimates</h4>
 <p className="text-slate-600 dark:text-slate-400">SF can be cool and breezy even in summer, while Santa Clara is usually warmer and sunnier. Plan for a 10–25°F swing and pack layers.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Essentials</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400">
 <li>• Layers (Light jacket/hoodie)</li>
 <li>• Sunscreen (for Stadium)</li>
 <li>• Comfortable walking shoes</li>
 </ul>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Tech</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-6">
 <li>• Power bank (Long transit days)</li>
 <li>• Clipper Card (on Phone)</li>
 <li>• US plug adapters</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com/" text="Get an eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <Section id="faq" title="Frequently Asked Questions">
 <div className="space-y-2">
 {[
 { q: "How far is the stadium from San Francisco?", a: "About 45 miles (72km). Plan for 1.5 - 2 hours of travel time via public transit or car." },
 { q: "Is it better to stay in SF or Santa Clara?", a: "Stay in SF for sightseeing and nightlife. Stay in Santa Clara for match convenience and lower travel stress." },
 { q: "Do I need a car?", a: "No. In fact, a car is a liability in SF due to parking costs and break-ins. Use Caltrain, VTA, and rideshare." },
 { q: "What is the weather like in June/July?", a: "SF: Cool (55-65°F) and foggy. Santa Clara: Warm (75-85°F) and sunny. Dress in layers." },
 { q: "Is public transport safe?", a: "Caltrain and VTA are generally safe and clean. BART is safe but can be gritty in downtown SF stations. Stay alert." },
 { q: "Can I take Uber/Lyft to the game?", a: "Yes, but it will be expensive ($100+) and slow due to traffic. Designated drop-off zones are a walk from the gates." },
 { q: "Is the stadium air-conditioned?", a: "No, Levi's Stadium is an open-air venue. Club seats have AC, but general seating does not." },
 { q: "How early should I arrive?", a: "At least 90 minutes before kickoff. Security lines can be long, and there is plenty to see in the plaza." },
 { q: "Are there good restaurants near the stadium?", a: "Not many within walking distance. It's best to eat in San Jose, Mountain View, or SF before heading to the match." },
 { q: "What is 'Karl the Fog'?", a: "The local name for the fog that rolls into San Francisco in the summer. It drops temperatures quickly - bring a jacket!" }
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
 <li className="flex justify-between"><strong>Hospital</strong> <span>Zuckerberg SF General</span></li>
 </ul>
 </div>
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-emerald-500"/> Connectivity</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6">
 <li>• <strong>WiFi:</strong> Free at SFO & Levi's Stadium.</li>
 <li>• <strong>Power:</strong> 120V, Type A/B plugs.</li>
 <li>• <strong>Sim Cards:</strong> Kiosks at SFO Arrivals.</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com/" text="Get an Airalo eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Explore Other Host Cities</h3>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'New York/New Jersey', slug: 'world-cup-2026-new-york-new-jersey-guide' },
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













