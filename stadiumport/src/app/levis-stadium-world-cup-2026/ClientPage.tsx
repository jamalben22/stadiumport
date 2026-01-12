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
 X, ChevronRight, Facebook, Twitter, Linkedin, Copy,
 Thermometer, Navigation, Smartphone, Shirt, User
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
        <button onClick={handleCopy} className="p-3 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors relative" aria-label="Copy Link">
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
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
 <MapPin className="w-4 h-4 text-red-500" /> {distance} to Stadium
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
 <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-red-500 transition-colors pr-8">
 {question}
 </h3>
 <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 group-open:bg-red-500 group-open:border-red-500 group-open:text-slate-900 dark:text-white transition-all duration-300">
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
 <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0A0A0A] font-sans selection:bg-red-500/30">
 
 {/* SaveGuideButton removed */}
 <SocialShare />

 {/* Progress Bar */}
 <motion.div
 className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-400 to-red-600 origin-left z-[100]"
 style={{ scaleX }}
 />

 {/* 1. Hero Section - Refined & Minimal */}
 <div className="relative h-[65vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
 <div className="absolute inset-0 z-0">
<Image 
src="/images/stadiums/levis-stadium-santa-clara-world-cup-2026-1600.webp" 
alt="Levi's Stadium Aerial" 
fill 
className="object-cover opacity-60"
 priority
 sizes="100vw" />
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
              { label: "Levi's Stadium", href: '/levis-stadium-world-cup-2026' }
            ]} 
          />
          <div className="flex items-center gap-4 mb-6">
 <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
 Last Updated: January 4, 2026
 </span>
 <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
 Host Stadium
 </span>
 <span className="px-3 py-1 rounded-full bg-red-600/90 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-red-600/20">
 Round of 32 Host
 </span>
 </div>
 
 <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-[0.9]">
 LEVI'S STADIUM
 </h1>
 <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light max-w-xl leading-relaxed">
 The High-Tech Giant. <span className="text-slate-900 dark:text-white font-medium">World Cup 2026</span> definitive guide.
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
 <Info className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
 <p className="leading-relaxed">
 <strong>Transparency:</strong> This guide contains affiliate links. We may earn a commission if you book through them, which helps fund our independent journalism.
 </p>
 </div>

 <Section id="overview" title="Strategic Overview">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
 Let's get the biggest misconception out of the way immediately: <strong className="text-red-600">Levi's Stadium is not in San Francisco.</strong> It is in Santa Clara, 40 miles south. This geographic reality defines your entire World Cup strategy, from where you sleep to how you travel.
 </p>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: MapPin, title: "Where to Base", text: "Santa Clara/San Jose for match days. San Francisco for sightseeing. Do not commute on match day if you can avoid it." },
 { icon: Train, title: "Transport Strategy", text: "Caltrain from SF takes 2 hours. VTA Light Rail is the final leg. Driving is better here than other cities, but traffic is heavy." },
 { icon: Sun, title: "Sun Warning", text: "The East side (Sections 101-129) is a solar oven. Book West side (130-146) for shade. This is critical." }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] transition-colors">
 <item.icon className="w-10 h-10 text-red-600 mb-6" />
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
 <AffiliateButton href="https://www.skyscanner.com/transport/flights-to/sfo" text="Search Bay Area Flights" variant="secondary" icon={Plane} />
 <AffiliateButton href="https://www.booking.com/city/us/santa-clara.html" text="Check Santa Clara Hotels" variant="primary" icon={Hotel} />
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
 {['SFO is the main international hub', 'SJC is closer to stadium', 'OAK is a budget alternative'].map((item, i) => (
 <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
 <CheckCircle2 className="w-5 h-5 text-red-600" /> {item}
            </li>
          ))}
        </ul>
        <AffiliateButton href="https://www.worldnomads.com/usa/travel-insurance" text="Buy Travel Insurance" variant="secondary" />
      </div>
    </div>
  </Section>

 <Section id="planning" title="Planning Timeline">
 <div className="space-y-6">
 {[
 { time: "6–9 Months Out", desc: "Decide: City vibe (SF) or Stadium convenience (Santa Clara). Book hotels accordingly. Prices will surge." },
 { time: "3–6 Months Out", desc: "Confirm match tickets. If staying in SF, research the Caltrain 'World Cup Special' schedule." },
 { time: "1–3 Months Out", desc: "Buy high-SPF sunscreen and a hat. Reserve parking if driving. Download Clipper card app for transit." }
 ].map((item, i) => (
 <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center">
 <div className="shrink-0 w-48 font-black text-2xl text-red-600">{item.time}</div>
 <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
 </div>
 ))}
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
 <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/sjc" text="Set Flight Alerts" variant="primary" icon={Plane} />
 </div>
 </Section>

 <Section id="budget" title="Budget Strategy">
 <div className="grid md:grid-cols-2 gap-12">
 <div>
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
 The Bay Area is expensive. Expect to pay a premium for everything. However, staying in San Jose or Campbell can save you 30% compared to San Francisco, and puts you closer to the match.
 </p>
 <div className="space-y-6">
 {[
 { label: "Daily Budget (Backpacker)", val: "$150 - $200" },
 { label: "Daily Budget (Mid-Range)", val: "$350 - $500" },
 { label: "Beer at Stadium", val: "$18 - $22" },
 { label: "Uber (SF to Stadium)", val: "$100 - $250+" }
 ].map((item, i) => (
 <div key={i} className="flex justify-between items-center border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 pb-3">
 <span className="font-medium text-slate-500 dark:text-slate-400">{item.label}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.val}</span>
 </div>
 ))}
 </div>
 </div>
 <div className="bg-red-600 rounded-[2rem] p-8 text-slate-900 dark:text-white relative overflow-hidden">
 <div className="relative z-10">
 <h4 className="font-bold text-2xl mb-4 flex items-center gap-3">
 <Trophy className="w-6 h-6" /> Pro Tip: Fly to SJC
 </h4>
 <p className="text-red-100 mb-8 leading-relaxed">
 San Jose Mineta International Airport (SJC) is only 6 miles from Levi's Stadium. SFO is 30 miles away. Flying into SJC saves you an hour of traffic and expensive Uber rides.
 </p>
 <Link href="https://www.skyscanner.com/flights-to/sjc/cheap-flights-to-norman-y-mineta-san-jose-international-airport.html" target="_blank" rel="noopener noreferrer" className="block w-full text-center py-4 text-red-700 font-bold rounded-xl bg-white hover:bg-red-50 transition-colors">
            Check SJC Flight Deals
          </Link>
 </div>
 <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-32 -mt-32" />
 </div>
 </div>
 </Section>

 <Section id="stadium" title="The Venue">
<LightboxImage 
           src="/images/stadiums/levis-stadium-santa-clara-world-cup-2026-1600.webp" 
           alt="Levi's Stadium Interior" 
           caption="Levi's Stadium features an open-air design with a massive suite tower on the west side."
         />

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 Levi's Stadium is a high-tech marvel known for its connectivity and open design. However, it is infamous for its lack of shade. The sun beats down relentlessly on the East side.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Stadium Facts</h4>
 <ul className="space-y-4">
 {[
 { label: "Capacity", val: "68,500" },
 { label: "Surface", val: "Bermuda Grass" },
 { label: "Opened", val: "2014" },
 { label: "Roof", val: "Open Air (No Roof)" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-slate-700 dark:text-slate-300">
 <span className="font-medium text-slate-500">{item.label}</span>
 <span className="font-bold">{item.val}</span>
 </li>
 ))}
 </ul>
 </div>

 <div className=" p-8 rounded-[2rem] border border-amber-200 dark:border-amber-800">
 <h4 className="font-bold text-xl mb-4 text-amber-800 dark:text-amber-400 flex items-center gap-3">
 <Thermometer className="w-6 h-6" /> The Heat Warning
 </h4>
 <p className="text-amber-900/80 dark:text-amber-200/80 mb-4 text-sm leading-relaxed">
 <strong>Avoid Sections 101-129 if possible.</strong> These seats face the sun directly. For shade, choose the <strong>West Side (Sections 130-146)</strong> or club seats under the suite tower.
        </p>
        <Link href="https://www.levisstadium.com/plan-your-visit/seating-map/" target="_blank" rel="noopener noreferrer" className="text-amber-700 dark:text-amber-400 font-bold text-sm hover:underline">
          View Detailed Shade Map →
        </Link>
      </div>
    </div>
  </Section>

 <Section id="tickets" title="Tickets & Hospitality">
 <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
 <div className="flex-1">
 <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
 Tickets will be digital-only via the FIFA app. Levi's Stadium has the best Wi-Fi in the NFL, so accessing tickets at the gate is usually smooth. Hospitality packages include access to the air-conditioned club levels, which is a huge perk here.
 </p>
 <div className="flex gap-4">
 <AffiliateButton href="https://www.stubhub.com/levis-stadium-tickets/venue/216052/" text="Check Ticket Availability" variant="primary" icon={Ticket} />
 </div>
 </div>
 <div className="w-full md:w-1/3 p-6 rounded-2xl text-center">
 <div className="text-4xl font-black text-slate-900 dark:text-white mb-2">$350+</div>
 <div className="text-slate-500 text-sm">Expected Starting Price (Group Stage)</div>
 </div>
 </div>
 </Section>

 <Section id="hotels" title="Where to Stay">
 <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-3xl">
 You have two choices: Stay near the stadium in <strong>Santa Clara/San Jose</strong> for convenience, or stay in <strong>San Francisco</strong> for the city experience (but accept a long commute).
 </p>
 
 <div className="space-y-8">
 <HotelCard 
 name="Hyatt Regency Santa Clara" 
 rating={4.7}
 price="$$$$"
 distance="0.2 miles"
 features={["Closest to Stadium", "Luxury", "Pool"]}
 image="/images/cities/san-francisco-world-cup-2026-640.webp" 
 link="https://www.booking.com/hotel/us/hyatt-regency-santa-clara.html"
 />
 <HotelCard 
 name="Hilton Santa Clara" 
 rating={4.5}
 price="$$$"
 distance="0.3 miles"
 features={["Walking Distance", "Comfort", "Dining"]}
 image="/images/cities/san-francisco-world-cup-2026-640.webp" 
 link="https://www.booking.com/hotel/us/hilton-santa-clara.html"
 />
 <HotelCard 
        name="Santa Clara Marriott" 
        rating={4.3}
        price="$$$"
        distance="1 mile"
        features={["Resort Style", "Spacious", "Amenities"]}
        image="/images/cities/san-francisco-world-cup-2026-640.webp" 
        link="https://www.booking.com/hotel/us/santa-clara-marriott.html"
      />
    </div>

    <div className="mt-12 text-center">
      <AffiliateButton href="https://www.booking.com/city/us/santa-clara.html" text="Search All Santa Clara Hotels" variant="outline" />
    </div>
  </Section>

 <Section id="transport" title="Getting Around">
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className="space-y-8">
 <div className="flex gap-4">
 <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
 <Train className="w-6 h-6 text-blue-600 dark:text-blue-400" />
 </div>
 <div>
 <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Caltrain (From SF)</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
 Take Caltrain from SF (4th & King) to Mountain View. Transfer to VTA Light Rail (Orange Line) to Great America station. Total time: ~2 hours.
 </p>
 </div>
 </div>
 <div className="flex gap-4">
 <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
 <Bus className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
 </div>
 <div>
 <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">VTA Light Rail</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
 The Orange and Green lines drop you right at the stadium gates. This is the best way to arrive from San Jose or Mountain View.
 </p>
 </div>
 </div>
 </div>
 <div className=" p-6 rounded-2xl">
          <h4 className="font-bold text-slate-900 dark:text-white mb-4">Transit Map</h4>
          <div className="aspect-video rounded-xl overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700 relative">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.548777085758!2d-121.97209768469246!3d37.40316497982859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fc9c827c5f0df%3A0x10319765275037e9!2sLevi's%20Stadium!5e0!3m2!1sen!2sus!4v1675123456789!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              ></iframe>
          </div>
        </div>
      </div>
      <AffiliateButton href="https://www.clippercard.com/ClipperWeb/pay-with-phone" text="Get Clipper Card App" variant="secondary" icon={ExternalLink} />
    </Section>

 <Section id="dining" title="Food & Drink">
 <div className="grid md:grid-cols-3 gap-6 mb-12">
 {[
 { title: "Curry Roots", desc: "Chicken Tikka Masala and naan. A nod to the local demographic." },
 { title: "Super Duper Burgers", desc: "Local Bay Area chain known for garlic fries and shakes." },
 { title: "Puesto", desc: "Award-winning tacos and margaritas (Club Level)." }
 ].map((item, i) => (
 <div key={i} className="p-6 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-2xl hover:border-red-500 transition-colors">
 <Utensils className="w-8 h-8 text-slate-600 dark:text-slate-300 mb-4" />
 <h4 className="font-bold text-lg mb-2">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
 </div>
 ))}
 </div>
 <p className="text-center text-slate-500 italic">
 Note: Levi's Stadium is 100% cashless. Bring credit cards or Apple Pay.
 </p>
 </Section>

  <Section id="attractions" title="Nearby Attractions">
    <div className="grid md:grid-cols-2 gap-8">
      <div className="relative h-64 rounded-3xl overflow-hidden group">
        <Image src="/images/cities/san-francisco-world-cup-2026-640.webp" alt="Great America" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h4 className="text-slate-900 dark:text-white font-bold text-xl">California's Great America</h4>
          <p className="text-white/80 text-sm">Amusement park located directly next to the stadium.</p>
        </div>
      </div>
      <div className="relative h-64 rounded-3xl overflow-hidden group">
        <Image src="/images/cities/san-francisco-world-cup-2026-640.webp" alt="Tech Museum" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h4 className="text-slate-900 dark:text-white font-bold text-xl">The Tech Interactive</h4>
          <p className="text-white/80 text-sm">Interactive science and tech museum in downtown San Jose.</p>
        </div>
      </div>
    </div>

    <div className="mt-8 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Tours & Activities</h3>
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        Explore San Francisco, Wine Country, and more.
      </p>
      <AffiliateButton href="https://www.viator.com/San-Francisco/d651-ttd" text="View Local Tours" variant="secondary" />
    </div>
  </Section>

 <Section id="tips" title="Match Day Essentials">
 <div className="grid md:grid-cols-2 gap-8 mb-8">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl text-red-800 dark:text-red-400 mb-4">Bag Policy</h4>
 <p className="text-red-900/80 dark:text-red-200/80 mb-4">
 Strict NFL-style clear bag policy. Bags must be clear plastic, vinyl, or PVC and not exceed 12" x 6" x 12". No backpacks allowed.
 </p>
 </div>
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-4">Gate Entry</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-4">
 Gates usually open 2-3 hours before kickoff. Arrive early to clear security. Use the Intel Gate or Toyota Gate for faster entry.
 </p>
 </div>
 </div>
 </Section>

 <Section id="safety" title="Safety & Health">
 <div className="flex gap-6 items-start p-6 rounded-2xl mb-6">
 <Shield className="w-8 h-8 text-emerald-500 shrink-0" />
 <div>
 <h4 className="font-bold text-lg mb-2">Santa Clara Safety</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 The stadium area is very safe (mostly office parks). However, be cautious if taking late-night transit back to SF. Stay in groups and watch belongings on BART/Caltrain.
 </p>
 </div>
 </div>
 <div className="flex gap-6 items-start p-6 rounded-2xl">
 <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0" />
 <div>
 <h4 className="font-bold text-lg mb-2">Heat Safety</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Heat exhaustion is real here. Drink water before you feel thirsty. There are hydration stations throughout the concourse.
 </p>
 </div>
 </div>
 </Section>

 <Section id="culture" title="Local Vibe">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">
 You are in the heart of Silicon Valley. Expect a tech-forward crowd, diverse food options, and a generally laid-back but expensive atmosphere.
 </p>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { title: "Tech Influence", desc: "App-based ordering and high-speed Wi-Fi are standard." },
 { title: "Diversity", desc: "Huge Asian and Hispanic influence in local cuisine." },
 { title: "Fan Zones", desc: "San Pedro Square Market in San Jose is a major hub." },
 ].map((item, i) => (
 <div key={i} className="p-6 rounded-2xl">
 <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
 </div>
 ))}
 </div>
 </Section>

 <Section id="packing" title="Packing List">
 <div className=" rounded-[2rem] p-8">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
 {[
 { icon: Sun, label: "Sunscreen" },
 { icon: User, label: "Hat/Sunglasses" },
 { icon: Smartphone, label: "Power Bank" },
 { icon: Shirt, label: "Layers" }
 ].map((item, i) => (
 <div key={i} className="flex flex-col items-center text-center gap-3">
 <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-sm text-red-500">
 <item.icon className="w-8 h-8" />
 </div>
 <span className="font-bold text-slate-700 dark:text-slate-300">{item.label}</span>
 </div>
 ))}
 </div>
 </div>
 </Section>

 <Section id="faq" title="Frequently Asked Questions">
 <div className="space-y-4">
 <FAQItem 
 question="How far is Levi's Stadium from San Francisco?" 
 answer="It is about 45 miles south. With traffic, it can take 1.5 to 2 hours driving. Public transit takes about 2 hours." 
 />
 <FAQItem 
 question="Is there shade at Levi's Stadium?" 
 answer="Only on the West side (Suite Tower side). The East side is fully exposed to the sun. We highly recommend booking seats on the West side for day games." 
 />
 <FAQItem 
 question="Can I take Uber/Lyft to the game?" 
 answer="Yes, but the pickup/drop-off zones are a bit of a walk from the stadium, and surge pricing will be extreme. Public transit is often better." 
 />
 <FAQItem 
    question="Is tailgating allowed?" 
    answer="Yes, tailgating is allowed in specified parking lots (e.g., Blue Lot 1). It typically opens 3.5 to 4 hours before kickoff. Open-flame cooking may be restricted during high fire danger periods. Glass containers are prohibited." 
  />
 </div>
 </Section>

 </main>
 </div>
 
 </div>
 );
}















