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
src="/images/stadiums/bmo-field-toronto-world-cup-2026-1600.webp" 
alt="BMO Field Toronto" 
fill 
className="object-cover"
 priority quality={60} sizes="100vw" />
 <div className="absolute inset-0 bg-gradient-to-b from-slate-200/40 via-slate-200/60 to-[#F5F5F7] dark:from-[#0A0A0A]/40 dark:via-[#0A0A0A]/60 dark:to-[#0A0A0A]" />
 </div>

 <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-end md:items-center justify-between gap-12 pt-20">
 <div className="max-w-4xl">
 {/* Breadcrumb */}
 <Breadcrumb 
 items={[
 { label: "Stadiums", href: "/world-cup-2026-stadiums" },
 { label: "BMO Field", href: "/bmo-field-world-cup-2026" }
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
              Host Venue
            </span>
 <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
 Canada
 </span>
 </div>
 
 <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-[0.9]">
 BMO FIELD
 </h1>
 <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light max-w-xl leading-relaxed">
 The Canadian Fortress. <span className="text-slate-900 dark:text-white font-medium">World Cup 2026</span> definitive guide.
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
 BMO Field is the rare World Cup venue that still behaves like a proper soccer ground: steep sightlines, tight concourses, and the kind of noise that doesn’t need a roof to do damage. It sits on the edge of Lake Ontario inside Exhibition Place, offering a unique but logistically challenging experience.
 </p>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: MapPin, title: "Where to Base", text: "Liberty Village for walking distance. Downtown/Union Station corridor for best transit access." },
 { icon: Train, title: "Transport Strategy", text: "GO Transit to Exhibition Station is the golden rule. Avoid streetcars (509/511) if possible due to crowding." },
 { icon: DollarSign, title: "Budget Signals", text: "Toronto is pricey. Hotels near Exhibition Place are premium. Look to North York or Subway Line 1 for value." }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] transition-colors">
 <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
        <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/yyz" text="Search Toronto Flights" variant="secondary" icon={Plane} />
        <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Toronto" text="Check Downtown Hotels" variant="primary" icon={Hotel} />
      </div>
 </Section>

 <Section id="visa" title="Visa & Entry (Canada)">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Who Needs a Visa?</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">Most visitors need an eTA ($7 CAD) or a Visitor Visa. US citizens just need a valid passport. Processing times vary, so apply at least 3 months out.</p>
 <AffiliateButton href="https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html" text="Check Canada Entry" variant="outline" />
 </div>
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Arrival Tips (YYZ)</h4>
 <ul className="space-y-4 mb-8">
 {['Download ArriveCAN app (optional but helpful)', 'Use UP Express to reach Union Station', 'Have hotel address ready for customs'].map((item, i) => (
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
              { time: "6–9 Months Out", desc: "Book refundable hotels in Downtown or Liberty Village. Toronto inventory is tight. If budget is key, look near subway stations." },
              { time: "3–6 Months Out", desc: "Secure match tickets via FIFA. Plan your airport transfer (UP Express tickets). Reserve CN Tower dinner if desired." },
              { time: "1–3 Months Out", desc: "Apply for eTA/Visa. Check bag policy updates. Download PRESTO app for transit payment." }
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
          </div>
 </Section>

 <Section id="budget" title="Budget Tiers">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Smart Saver", items: ["Hostels/Hotels on Subway Line 1", "TTC Day Pass", "St. Lawrence Market meals"] },
 { title: "Comfort Upgrades", items: ["King West/Downtown hotels", "UP Express (Airport)", "Sit-down dinners in Liberty Village"] },
 { title: "Premium", items: ["Hotel X or Ritz-Carlton", "Private car service", "CN Tower 360 Dining"] }
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
        <AffiliateButton href="https://www.viator.com/Toronto/d630-ttd" text="Search Toronto Packages" variant="secondary" icon={Briefcase} />
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
 <strong>BMO Field</strong> is Canada's premier soccer-specific stadium. Located at Exhibition Place, it offers an open-air experience with stunning views of the Toronto skyline. For the World Cup, it will be expanded to host global audiences while maintaining its intimate, pitch-side feel.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Key Features</h4>
 <ul className="space-y-4">
 {[
 { label: "Capacity", val: "~45,000 (Expanded)" },
 { label: "Surface", val: "Hybrid Grass" },
 { label: "Roof", val: "Partial Canopy" },
 { label: "Location", val: "Exhibition Place" }
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
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Wind Factor: Being on the lake, it can get breezy.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Cashless: The entire venue is card/mobile payment only.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Arrival: Security perimeters are strict; arrive 2h early.</li>
 </ul>
 </div>
 </div>
 
 <div className="p-8 rounded-[2rem] border border-emerald-500/20">
 <p className="text-lg text-center font-medium text-emerald-800 dark:text-emerald-200">
 <strong>Getting There:</strong> The smartest move is <strong>GO Transit</strong> to Exhibition Station. It drops you steps from the gates and avoids the streetcar traffic jams.
 </p>
 </div>
 </Section>

 <Section id="tips" title="Match Day Gameplan">
 <div className="grid md:grid-cols-3 gap-6 mb-8">
 {[
 { title: "Arrival", text: "Target Exhibition Station 90-120 minutes before kickoff. Crowds bottleneck at the underpass." },
 { title: "Clear Bag", text: "Strict policy: Clear bags 12x6x12” or small clutch. No backpacks. Bag check is limited and expensive." },
 { title: "Exit Plan", text: "Don't rush to the train immediately. Hang back for 20 mins or walk to Liberty Village for a drink." }
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

 <Section id="tickets" title="Schedule & Tickets">
 <div className="bg-emerald-900 dark:bg-emerald-950 text-slate-900 dark:text-white rounded-[2.5rem] p-8 md:p-12 mb-12 relative overflow-hidden shadow-2xl">
 
 <div className="relative z-10">
 <div className="flex items-center gap-4 mb-8">
 <Ticket className="w-8 h-8 text-emerald-400" />
 <h3 className="text-3xl font-black">Confirmed Matches</h3>
 </div>
 <div className="space-y-6">
 {[
 { stage: "Group Stage", count: "Canada vs Playoff Winner", color: "text-emerald-300" },
 { stage: "Group Stage", count: "Ghana vs Panama", color: "text-emerald-300" },
 { stage: "Group Stage", count: "Germany vs Côte d’Ivoire", color: "text-emerald-300" },
 { stage: "Group Stage", count: "Panama vs Croatia", color: "text-emerald-300" },
 { stage: "Group Stage", count: "Senegal vs Playoff Winner", color: "text-emerald-300" },
 { stage: "Round of 32", count: "Runner-up K vs Runner-up L", color: "text-amber-400" }
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
 Missed the draw? Trusted resale platforms offer verified tickets. Prices for Canada's opening match will be high.
        </p>
        <AffiliateButton href="https://www.stubhub.com/secure/search?q=BMO+Field" text="Check StubHub" variant="primary" />
      </div>
    </div>
  </Section>

 <Section id="hotels" title="Where to Stay">
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl leading-relaxed">
 For BMO Field, <strong>Liberty Village</strong> is the closest walkable neighborhood. However, staying <strong>Downtown</strong> near Union Station gives you the best balance of city access and easy transit to the match.
 </p>
 
 <div className="space-y-8">
 <HotelCard 
 name="Hotel X Toronto"
 rating={4.6}
 price="$500 - $800"
 distance="5 min walk"
 features={['On-site', 'Rooftop Pool', 'Luxury', 'Views']}
 image="/images/cities/toronto-world-cup-2026-640.webp" 
 link="https://www.booking.com/hotel/ca/hotel-x-toronto.html"
 />
 <HotelCard 
 name="The Drake Hotel"
 rating={4.5}
 price="$300 - $500"
 distance="15 min walk"
 features={['Boutique', 'Nightlife', 'Trendy', 'Dining']}
 image="/images/cities/toronto-world-cup-2026-640.webp" 
 link="https://www.booking.com/hotel/ca/the-drake.html"
 />
 <HotelCard 
 name="Radisson Blu Toronto Downtown"
 rating={4.4}
 price="$250 - $400"
 distance="10 min drive"
 features={['Harbourfront', 'Pool', 'Modern', 'Convenient']}
 image="/images/cities/toronto-world-cup-2026-640.webp" 
 link="https://www.booking.com/hotel/ca/radisson-admiral-toronto-harbourfront.html"
 />
 </div>
 
 <div className="mt-12 text-center">
 <AffiliateButton href="https://www.booking.com/city/ca/toronto.html" text="Search All Toronto Hotels" variant="outline" />
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
 <h4 className="font-bold text-xl mb-2">GO Transit & TTC</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 GO Train to Exhibition Station is best. TTC Streetcars (509/511) are good backups but slow. Use PRESTO card or tap credit/debit.
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
 UP Express is the dedicated rail link from Pearson (YYZ) to Union Station. Fast, reliable, and comfortable. 25 mins.
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
 Driving to Exhibition Place on matchday is a nightmare. Parking is scarce and exit times are long. Stick to transit.
 </p>
 </div>
 </div>
 </div>
 
 <div className=" rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 h-fit">
 <h4 className="font-bold text-2xl mb-6">Distance to Stadium</h4>
 <ul className="space-y-6">
 {[
 { label: "Liberty Village", time: "5-10 min walk" },
 { label: "Union Station", time: "10 min train" },
 { label: "Downtown Core", time: "20-30 min transit" },
 { label: "Pearson Airport", time: "45 min train" }
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
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Peameal Bacon Sandwich", desc: "Toronto's signature dish. Try it at Carousel Bakery in St. Lawrence Market. A must-have." },
 { title: "Liberty Village", desc: "The pre-match hub. Packed with pubs, patios, and restaurants just a short walk from the stadium gates." },
 { title: "Kensington Market", desc: "Diverse, eclectic food neighborhood. Great for exploring Toronto's multicultural food scene." }
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
 Toronto's downtown core is compact and walkable. You can easily visit the CN Tower and Aquarium before heading to the match.
 </p>
 <div className="space-y-6">
 {[
 { title: "CN Tower", desc: "Iconic skyline views. Book the EdgeWalk if you're brave. Just a short train ride from BMO Field.", color: "text-blue-500" },
 { title: "Ripley's Aquarium", desc: "Located at the base of the CN Tower. impressive shark tunnels and jellyfish exhibits.", color: "text-cyan-500" },
 { title: "Distillery District", desc: "Historic pedestrian-only village with cobblestone streets, boutiques, and cafes.", color: "text-amber-700" }
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
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> Event Patterns</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Toronto is generally very safe. Matchdays concentrate crowds at Exhibition Station and Liberty Village. Watch out for pickpockets in dense crowds.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Practical Tips</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>• Keep an eye on bags on the TTC/GO Train.</li>
 <li>• Stick to well-lit areas in Liberty Village post-match.</li>
        <li>• Save offline maps; networks can jam near the stadium.</li>
      </ul>
      <div className="mt-6">
        <AffiliateButton href="https://www.worldnomads.com/travel-insurance" text="Get Travel Insurance" variant="secondary" />
      </div>
    </div>
  </div>
</Section>

 <Section id="culture" title="Cultural Intelligence">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">Toronto is one of the most multicultural cities in the world. Tipping is standard 18-20%. Politeness is currency here.</p>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { title: "Fan Zones", desc: "Expect activations at Nathan Phillips Square or near the waterfront. Great for non-ticket holders." },
 { title: "Dining Etiquette", desc: "Wait to be seated. Split bills are common. Tap water is safe and free. 18% tip is standard." },
 { title: "Nightlife Rhythm", desc: "King West is the club district. Queen West for bars. Last call is 2 AM." }
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
 <p className="text-slate-600 dark:text-slate-400">Toronto summers are hot and humid (25-30°C / 77-86°F). Thunderstorms can happen suddenly.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Briefcase className="w-6 h-6 text-emerald-500"/> Essentials</h4>
 <p className="text-slate-600 dark:text-slate-400">Light breathable clothing, comfortable walking shoes, sunglasses, and a light rain jacket.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Clock className="w-6 h-6 text-blue-500"/> Daylight</h4>
 <p className="text-slate-600 dark:text-slate-400">Long days. Sunset isn't until around 9:00 PM, giving you plenty of time to explore.</p>
 </div>
 </div>
 </Section>

 <Section id="faq" title="FAQ">
 <div className=" rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800 p-6 md:p-10">
 {[
 {
 q: "What is BMO Field called during the World Cup?",
 a: "FIFA will brand the venue as Toronto Stadium. Use that name in maps and when searching for match info.",
 },
 {
 q: "What’s the best way to get to BMO Field from Union Station?",
 a: "GO Transit to Exhibition Station is the cleanest option. TTC streetcars 509/511 also work but can bottleneck before kickoff.",
 },
 {
 q: "How much is the TTC adult fare?",
 a: "The TTC lists an adult single fare of $3.30 when you tap with PRESTO/debit/credit and it includes a two-hour transfer window.",
 },
 {
 q: "Can I bring a backpack?",
 a: "Assume no. BMO Field’s restricted bag policy favors clear bags, a 1-gallon clear freezer bag, or a small clutch. Anything else risks being turned away.",
 },
 {
 q: "Is there bag storage on site?",
 a: "BMO Field notes limited bag check availability outside Gate 3 for a fee. Space is limited—avoid needing it.",
 },
 {
 q: "Do I need a car for a match at BMO Field?",
 a: "No. Parking is cashless, can be pricey, and traffic around Exhibition Place gets heavy. Transit is the smarter move.",
 },
 {
 q: "How early should I arrive?",
 a: "Plan to reach Exhibition Place 90–120 minutes before kickoff. World Cup security and crowds run heavier than regular matchdays.",
 },
 {
 q: "What’s the closest neighborhood to stay in?",
 a: "Liberty Village is the closest walkable base. Downtown and King West give you more hotel options and fast access via Union.",
 },
 {
 q: "What’s the weather like in late June/early July?",
 a: "Toronto is typically warm and humid with a real chance of rain. Pack a light waterproof layer and something breathable.",
 },
 {
 q: "Is the stadium covered?",
 a: "Partially. Some main stands have roof coverage, but expect open-air conditions for most seats.",
 },
 {
 q: "Are there family services on site?",
 a: "Fan Services and quiet-area support are listed in BMO Field’s event-day information. Check the latest details close to your match.",
 },
 {
 q: "Where do I find official directions and parking rules?",
 a: "BMO Field’s Direction & Parking page is the most reliable source for current transit routing, lot rules, and cashless payment details.",
 },
 ].map((item) => (
 <FAQItem key={item.q} question={item.q} answer={item.a} />
 ))}
 </div>

 <div className="mt-10 flex items-center justify-between flex-wrap gap-4">
 <Link
 href="/world-cup-2026-stadiums"
 className="inline-flex items-center gap-2 font-bold text-slate-700 dark:text-slate-200 hover:underline"
 >
 Back to all stadiums
 </Link>
 <AffiliateButton href="https://www.bmofield.com/plan-your-visit" text="BMO Field visitor info" variant="outline" />
 </div>
 </Section>

 <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Explore Other Stadiums</h3>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {['MetLife Stadium', 'SoFi Stadium', 'Azteca Stadium', 'Mercedes-Benz Stadium', 'AT&T Stadium', 'Hard Rock Stadium', 'Lumen Field', 'Gillette Stadium'].map((stadium) => (
 <Link key={stadium} href={`/world-cup-2026-stadiums`} className="block p-4 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center font-bold text-slate-700 dark:text-slate-200">
 {stadium}
 </Link>
 ))}
 </div>
 <div className="text-center mt-12">
 <Link href="/world-cup-2026-stadiums" className="text-emerald-500 hover:text-emerald-600 font-bold text-lg inline-flex items-center gap-2 hover:gap-4 transition-all">
 View All 16 Stadiums <ArrowRight className="w-5 h-5"/>
 </Link>
 </div>
 </div>
 </main>
 </div>
 </div>
 );
}















