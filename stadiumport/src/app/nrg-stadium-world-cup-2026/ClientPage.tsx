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
          src="/images/cities/houston-world-cup-2026-1600.webp" 
          alt="NRG Stadium Exterior" 
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
              { label: "NRG Stadium", href: "/nrg-stadium-world-cup-2026" }
            ]} 
          />
          <div className="flex items-center gap-4 mb-6">
 <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
 Last Updated: January 4, 2026
 </span>
 <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
 Host Venue
 </span>
 <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
 7 Matches
 </span>
 </div>
 
 <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-[0.9]">
 NRG STADIUM
 </h1>
 <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light max-w-xl leading-relaxed">
              The Energy Capital's Fortress. <span className="text-slate-900 dark:text-white font-medium">World Cup 2026</span> definitive guide.
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

 <Section id="overview" title="The Venue">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
 NRG Stadium isn't just a building; it's a testament to Houston's "bigger is better" philosophy. As the first NFL stadium with a retractable roof, it set the blueprint for modern mega-venues. For World Cup 2026, it offers a distinct duality: the heat of Texas outside versus the crisp, air-conditioned sanctuary inside.
 </p>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: MapPin, title: "Where to Base", text: "Downtown or Medical Center for proximity. Midtown for nightlife. Avoid far suburbs to skip traffic." },
 { icon: Train, title: "Transport Strategy", text: "Use the METRORail Red Line. It stops right at the stadium (Stadium Park/Astrodome) and bypasses gridlock." },
 { icon: DollarSign, title: "Budget Signals", text: "Houston is generally more affordable than NYC or LA, but AC is non-negotiable in summer." }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] transition-colors">
 <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
    <AffiliateButton href="https://www.skyscanner.com/transport/flights-to/hou" text="Search Houston Flights" variant="secondary" icon={Plane} />
    <AffiliateButton href="https://www.booking.com/city/us/houston.html" text="Check Downtown Hotels" variant="primary" icon={Hotel} />
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
        {['Use IAH or HOU airports', 'Proof of onward travel required', 'Carry digital copies of tickets'].map((item, i) => (
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
 { time: "6–9 Months Out", desc: "Book flights and refundable hotels in Downtown/Medical Center. Set price alerts. If traveling multi-city, plan open-jaw tickets." },
 { time: "3–6 Months Out", desc: "Confirm match tickets. Reserve airport transfers and key BBQ restaurants." },
 { time: "1–3 Months Out", desc: "Lock in eSIMs, clear stadium bags, and day trips (NASA). Re-price hotels weekly." }
 ].map((item, i) => (
 <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center">
 <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
 <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
 </div>
 ))}
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
    <AffiliateButton href="https://www.skyscanner.com" text="Set Flight Alerts" variant="primary" icon={Plane} />
    <AffiliateButton href="https://www.opentable.com/houston-restaurants" text="Reserve Restaurant Tables" variant="outline" />
  </div>
</Section>

<Section id="budget" title="Budget Tiers">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Smart Saver", items: ["Suburban hotels near Metro", "CityPASS for attractions", "Tex-Mex dining"] },
 { title: "Comfort Upgrades", items: ["Downtown 4-star hotels", "Uber/Lyft usage", "Premium BBQ spots"] },
 { title: "Premium", items: ["Luxury suites in Galleria", "Private black car service", "Chef-led experiences"] }
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
      <AffiliateButton href="https://www.viator.com/Houston/d5186-ttd" text="Search Houston Packages" variant="secondary" icon={Briefcase} />
    </div>
  </Section>

 <Section id="stadium" title="NRG Stadium">
        <LightboxImage 
          src="/images/cities/houston-world-cup-2026-1600.webp" 
          alt="NRG Stadium Interior" 
          caption="The massive scale of NRG Stadium, ready for the World Cup."
        />

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 Sitting in the shadow of the now-dormant Astrodome, <strong>NRG Stadium</strong> carries the torch of architectural innovation. While it hosts the Houston Texans and the massive Rodeo, its design—intimate for its size with steep vertical seating—makes it an incredible venue for soccer. The noise stays trapped under the roof, creating a deafening atmosphere.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Key Features</h4>
 <ul className="space-y-4">
 {[
 { label: "Capacity", val: "72,220 (Expandable)" },
 { label: "Surface", val: "Natural Grass (for WC)" },
 { label: "Roof", val: "Retractable Fabric" },
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
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> A/C: Kept at a comfortable 72°F inside.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Tailgating: Allowed and legendary in all lots.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Transit: Use METRORail to skip traffic.</li>
 </ul>
 </div>
 </div>
 
 <div className="p-8 rounded-[2rem] border border-emerald-500/20">
 <p className="text-lg text-center font-medium text-emerald-800 dark:text-emerald-200">
 <strong>Getting There:</strong> Houston traffic is legendary. The <strong>METRORail Red Line</strong> stops directly at the stadium (Stadium Park/Astrodome station), connecting it to Downtown and the Medical Center.
 </p>
 </div>
 </Section>

 <Section id="tips" title="Match Day Gameplan">
 <div className="grid md:grid-cols-3 gap-6 mb-8">
 {[
 { title: "Arrival", text: "Be at the gates 90 minutes before kickoff. Security lines can be long due to the large capacity." },
 { title: "Clear Bag", text: "Strict clear bag policy. Bring a stadium-approved bag and sealed water." },
 { title: "Exit Plan", text: "Wait 15-20 mins inside to let the initial rush clear, then head to the METRORail station." }
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
 
 <div className="relative z-10">
 <div className="flex items-center gap-4 mb-8">
 <Ticket className="w-8 h-8 text-emerald-400" />
 <h3 className="text-3xl font-black">Confirmed Matches</h3>
 </div>
 <div className="space-y-6">
 {[
 { stage: "Group Stage", count: "5 Matches", color: "text-emerald-300" },
 { stage: "Round of 32", count: "1 Match", color: "text-emerald-300" },
 { stage: "Round of 16", count: "1 Match", color: "text-emerald-300" },
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
      Missed the draw? Trusted resale platforms offer verified tickets, though prices will be higher for high-demand matches.
    </p>
    <AffiliateButton href="https://www.stubhub.com" text="Check StubHub" variant="primary" />
  </div>
</div>
</Section>

 <Section id="hotels" title="Where to Stay">
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl leading-relaxed">
 For NRG Stadium, location is key. The <strong>Medical Center</strong> area is closest, while <strong>Downtown</strong> offers better nightlife and direct rail access. Avoid staying too far out to skip the traffic.
 </p>
 
      <div className="space-y-8">
        <HotelCard 
          name="Hotel Ylem" 
          rating={8.4} 
          price="$" 
          distance="1.6 mi"
          features={['Boutique', 'Free Breakfast', 'Shuttle to NRG', 'Art Gallery']}
          image="/images/hotels/houston/hotel-ylem.jpg"
          link="https://www.booking.com/hotel/us/houston-medical-center.html"
        />
        <HotelCard 
          name="Blossom Hotel Houston" 
          rating={8.8} 
          price="$$" 
          distance="1.2 mi"
          features={['Rooftop Pool', 'Luxury Spa', 'Walking Distance', 'Fitness Center']}
          image="/images/hotels/houston/blossom-hotel.jpg"
          link="https://www.booking.com/hotel/us/blossom-houston-medical-center.html"
        />
        <HotelCard 
          name="The Post Oak Hotel at Uptown" 
          rating={9.6} 
          price="$$$$" 
          distance="15 min drive"
          features={['Forbes 5-Star', 'Rooftop Helipad', 'Rolls-Royce Service', 'Elite Spa']}
          image="/images/hotels/houston/post-oak-hotel.jpg"
          link="https://www.booking.com/hotel/us/the-post-oak.html"
        />
        <HotelCard 
          name="Marriott Marquis Houston" 
          rating={8.2} 
          price="$$$" 
          distance="Rail access via Downtown"
          features={['Downtown', 'Texas-Shaped Pool', 'Direct METRORail Access', 'Convention Center']}
          image="/images/hotels/houston/marriott-marquis.jpg"
          link="https://www.booking.com/hotel/us/marriott-marquis-houston.html"
        />
      </div>

<div className="mt-12 text-center">
  <AffiliateButton href="https://www.booking.com/city/us/houston.html" text="Search All Houston Hotels" variant="outline" />
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
 <h4 className="font-bold text-xl mb-2">METRORail</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 The Red Line is your lifeline. It connects Downtown, Midtown, and the Medical Center to NRG Park. Cost: $1.25 per ride.
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
 Houston has two airports: IAH (Bush) and HOU (Hobby). Rideshare or shuttles are best to reach the city center.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
 <Car className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Driving & Parking</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 NRG has massive lots (Blue, Orange, Red), but traffic is heavy. Pre-purchase parking passes if you must drive.
 </p>
 </div>
 </div>
 </div>
 
 <div className=" rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 h-fit">
 <h4 className="font-bold text-2xl mb-6">Distance to Stadium</h4>
 <ul className="space-y-6">
 {[
 { label: "Medical Center Hotels", time: "10 min rail" },
 { label: "Downtown Hotels", time: "25 min rail" },
 { label: "Galleria", time: "20 min drive" },
 { label: "IAH Airport", time: "45 min drive" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
 <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
 </li>
 ))}
 </ul>
  <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
    <AffiliateButton href="https://www.skyscanner.com" text="Book Airport Transfer" variant="secondary" />
  </div>
</div>
 </div>
 </Section>

 <Section id="dining" title="Food & Drink">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Viet-Cajun", desc: "Houston's signature cuisine. Try Crawfish & Noodles for spicy, garlic-butter crawfish." },
 { title: "Texas BBQ", desc: "Legendary smoked meats. The Pit Room and Truth BBQ are top-tier spots near the center." },
 { title: "Tex-Mex", desc: "The Original Ninfa's on Navigation is a historic landmark for fajitas and margaritas." }
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
 Houston is huge, but the best spots are worth the trip. Space Center Houston is a must-visit for any traveler.
 </p>
 <div className="space-y-6">
 {[
 { title: "Space Center Houston", desc: "The official visitor center for NASA Johnson Space Center. See real spacecraft and moon rocks.", color: "text-blue-500" },
 { title: "Museum District", desc: "19 museums in one area, including the massive Museum of Natural Science.", color: "text-red-500" },
 { title: "The Galleria", desc: "Texas' largest shopping mall with an indoor ice rink and high-end dining.", color: "text-emerald-500" }
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
  <AffiliateButton href="https://www.citypass.com/houston" text="Get Houston CityPASS" variant="primary" />
</div>
</Section>

 <Section id="safety" title="Safety & Security">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> Event Patterns</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">NRG Park is safe, but be cautious in surrounding areas at night. Stick to the Metro lines and official lots.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Practical Tips</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>• Stay hydrated; the heat is real.</li>
 <li>• Use rideshare pickup zones designated at the stadium.</li>
 <li>• Keep valuables secure in crowded transit.</li>
  </ul>
  <div className="mt-6">
    <AffiliateButton href="https://www.worldnomads.com/" text="Get Travel Insurance" variant="secondary" />
  </div>
</div>
 </div>
 </Section>

 <Section id="culture" title="Cultural Intelligence">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">Houston is the most diverse city in the US. You'll hear dozens of languages and find incredible food from every corner of the globe.</p>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { title: "Heat Management", desc: "Locals move from AC to AC. Don't plan long walks in the midday sun during summer." },
 { title: "Southern Hospitality", desc: "People are generally very friendly and helpful. 'Y'all' is the standard plural pronoun." },
 { title: "Car Culture", desc: "Houston is a driving city. Distances are vast, so plan travel times accordingly." }
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
 <p className="text-slate-600 dark:text-slate-400">Extremely hot and humid. Highs often exceed 95°F (35°C). The stadium is AC-cooled.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Essentials</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400">
 <li>• Light, breathable clothing</li>
 <li>• Sunscreen and sunglasses</li>
 <li>• Clear stadium bag</li>
 </ul>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Tech</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-6">
 <li>• US plug adapters (Type A/B)</li>
 <li>• Offline maps (areas with spotty signal)</li>
 <li>• Portable fan (optional but helpful outside)</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com" text="Get an eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <Section id="faq" title="Frequently Asked Questions">
 <div className="space-y-2">
 {[
 { q: "Is NRG Stadium air-conditioned?", a: "Yes, absolutely. NRG Stadium has a powerful air-conditioning system and a retractable roof, ensuring a comfortable 72°F (22°C) environment regardless of the heat outside." },
 { q: "Is there public transportation to NRG Stadium?", a: "Yes, the METRORail Red Line stops directly at the stadium (Stadium Park/Astrodome station), connecting it to Downtown Houston and the Medical Center." },
 { q: "Can I tailgate at NRG Stadium?", a: "Yes, tailgating is a massive tradition at NRG Stadium. It is allowed in all surface lots, but you must have a valid parking pass for the specific lot." },
 { q: "What is the bag policy?", a: "NRG Stadium enforces a clear bag policy. Bags must be clear plastic, vinyl, or PVC and not exceed 12\" x 6\" x 12\"." },
 { q: "Where should I stay for the World Cup?", a: "The Medical Center area is closest to the stadium. Downtown offers more hotels and nightlife and is connected by the Red Line." },
 { q: "How do I get from the airport?", a: "Rideshare is the easiest option from IAH or HOU. There is no direct train from the airports to the stadium, but shuttles are available to Downtown." },
 { q: "Is Houston safe?", a: "Like any major city, stay aware of your surroundings. The areas around NRG Park, Medical Center, and Downtown are heavily patrolled during events." },
 { q: "What is the weather like in June?", a: "Hot and humid. Expect temperatures in the 90s (32°C+). Stay hydrated and limit time outdoors during midday." },
 { q: "Are there good restaurants near the stadium?", a: "There are some chains nearby, but for the best food, take the train to Midtown or Downtown, or drive to Chinatown/Bellaire." },
 { q: "Can I use cash at the stadium?", a: "NRG Stadium is a cashless venue. All major credit cards and mobile payments (Apple Pay, Google Pay) are accepted." }
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
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>Non-Emergency Police</strong> <span>713-884-3131</span></li>
 <li className="flex justify-between"><strong>Hospital</strong> <span>Texas Medical Center (Nearby)</span></li>
 </ul>
 </div>
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-emerald-500"/> Connectivity</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6">
 <li>• <strong>WiFi:</strong> Free at NRG Stadium.</li>
 <li>• <strong>Power:</strong> 120V, Type A/B plugs.</li>
 <li>• <strong>Sim Cards:</strong> Best purchased at IAH/HOU.</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com" text="Get an Airalo eSIM" variant="secondary" />
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















