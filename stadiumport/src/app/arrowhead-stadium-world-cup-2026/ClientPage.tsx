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
 Flame, Volume2
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
        <button onClick={() => handleShare('twitter')} className="p-3 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl text-slate-500 hover:text-red-600 transition-colors">
          <Twitter className="w-5 h-5" />
        </button>
        <button onClick={() => handleShare('facebook')} className="p-3 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl text-slate-500 hover:text-red-600 transition-colors">
          <Facebook className="w-5 h-5" />
        </button>
        <button onClick={() => handleShare('linkedin')} className="p-3 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl text-slate-500 hover:text-red-600 transition-colors">
          <Linkedin className="w-5 h-5" />
        </button>
        <button onClick={handleCopy} className="p-3 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl text-slate-500 hover:text-red-600 transition-colors relative">
          {copied ? <CheckCircle2 className="w-5 h-5 text-red-500" /> : <Copy className="w-5 h-5" />}
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
 <span className="text-red-500 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">Guide Section</span>
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
 <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 group-open:bg-red-600 group-open:border-red-600 group-open:text-slate-900 dark:text-white transition-all duration-300">
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
          src="/images/cities/kansas-city-world-cup-2026-1600.webp" 
          alt="Arrowhead Stadium" 
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
            { label: "Arrowhead Stadium", href: "/arrowhead-stadium-world-cup-2026" }
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
              Host City
            </span>
 <span className="px-3 py-1 rounded-full bg-red-600/90 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-red-600/20">
 Quarterfinal Host
 </span>
 </div>
 
 <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-[0.9]">
 ARROWHEAD
 </h1>
 <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light max-w-xl leading-relaxed">
 The Loudest Stadium in the World. <span className="text-slate-900 dark:text-white font-medium">World Cup 2026</span> definitive guide.
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
 Entering Arrowhead isn't just attending a match; it's walking into a cathedral of noise. This is where the American heartland meets world-class passion. For World Cup 2026, you aren't just visiting a venue; you're visiting the Guinness World Record holder for the loudest crowd roar.
 </p>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: MapPin, title: "Where to Base", text: "Downtown Kansas City for the Fan Fest and nightlife. There are very few hotels near the stadium itself." },
 { icon: Car, title: "Transport Strategy", text: "CRITICAL: There is NO train to the stadium. You must drive, take a shuttle, or use rideshare. Plan accordingly." },
 { icon: DollarSign, title: "Budget Signals", text: "Parking passes are the hidden cost here. Buy them months in advance or pay a premium." }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] transition-colors">
 <item.icon className="w-10 h-10 text-red-600 mb-6" />
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
        <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/mci" text="Search KC Flights" variant="secondary" icon={Plane} />
        <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Kansas+City" text="Check Downtown Hotels" variant="primary" icon={Hotel} />
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
          {['Use MCI (Kansas City Intl) airport', 'Proof of onward travel required', 'Carry digital copies of tickets'].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <CheckCircle2 className="w-5 h-5 text-red-500" /> {item}
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
 { time: "6–9 Months Out", desc: "Book hotels in Downtown or Westport. Crucial: If you plan to drive, look for parking passes as soon as they drop." },
 { time: "3–6 Months Out", desc: "Confirm match tickets. Reserve BBQ restaurants (places like Q39 and Jack Stack fill up fast)." },
 { time: "1–3 Months Out", desc: "Plan your transport strategy. If not driving, book a seat on a private shuttle service." }
 ].map((item, i) => (
 <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center">
 <div className="shrink-0 w-48 font-black text-2xl text-red-600">{item.time}</div>
 <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
 </div>
 ))}
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
        <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/mci" text="Set Flight Alerts" variant="primary" icon={Plane} />
        <AffiliateButton href="https://www.opentable.com/kansas-city-restaurants" text="Reserve BBQ Tables" variant="outline" />
      </div>
    </Section>

 <Section id="budget" title="Budget Tiers">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Smart Saver", items: ["Stay in Overland Park", "Rent a car", "Tailgate with groceries"] },
 { title: "Comfort Upgrades", items: ["Downtown hotels", "Official shuttles", "Pre-booked BBQ"] },
 { title: "Premium", items: ["Luxury suites", "Private car service", "VIP Parking access"] }
 ].map((tier, i) => (
 <div key={i} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-2xl transition-all duration-300">
 <h4 className="font-bold text-xl mb-6">{tier.title}</h4>
 <ul className="space-y-4">
 {tier.items.map((item, j) => (
 <li key={j} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
 <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2" />
 {item}
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>
 <div className="mt-8 text-center">
        <AffiliateButton href="https://www.viator.com/Kansas-City-tourism/d23608-r58660086872-s194458348" text="Search KC Packages" variant="secondary" icon={Briefcase} />
      </div>
    </Section>

 <Section id="stadium" title="Arrowhead Stadium">
        <LightboxImage 
          src="/images/cities/kansas-city-world-cup-2026-1600.webp" 
          alt="Arrowhead Stadium Interior" 
          caption="Arrowhead Stadium in Kansas City - One of the loudest venues in world sports."
        />

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 Built in 1972 as part of the visionary Truman Sports Complex, <strong>Arrowhead Stadium</strong> has resisted the modern trend of sterile, corporate domes. It remains proudly open-air, embracing the elements and channeling sound in a way that no architect could have fully predicted.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-red-600"/> Key Features</h4>
 <ul className="space-y-4">
 {[
 { label: "Capacity", val: "~76,000" },
 { label: "Surface", val: "Natural Grass (Special for WC)" },
 { label: "Roof", val: "Open Air (No Roof)" },
 { label: "Record", val: "Loudest Stadium (142.2 dB)" }
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
 <li className="flex gap-3"><span className="text-red-600 font-bold">•</span> Noise: It gets LOUD. Ear protection recommended.</li>
 <li className="flex gap-3"><span className="text-red-600 font-bold">•</span> Weather: No roof means you are exposed to sun/rain.</li>
 <li className="flex gap-3"><span className="text-red-600 font-bold">•</span> Arrival: Arrive 4+ hours early for tailgating.</li>
 </ul>
 </div>
 </div>
 
 <div className=" p-8 rounded-[2rem] border border-red-600/20">
 <p className="text-lg text-center font-medium text-red-800 dark:text-red-200">
 <strong>Getting There:</strong> Unlike many stadiums, Arrowhead is an island in a sea of parking. There is <strong>NO train</strong> service. You must drive or take a bus/shuttle.
 </p>
 </div>
 </Section>

 <Section id="tips" title="Match Day Gameplan">
 <div className="grid md:grid-cols-3 gap-6 mb-8">
 {[
 { title: "Arrival", text: "Arrive at least 3-4 hours before kickoff to experience the legendary tailgating scene in the parking lots." },
 { title: "Clear Bag", text: "Strict clear bag policy. Bring sealed water and sunscreen as the stadium is open-air." },
 { title: "Exit Plan", text: "Expect delays leaving the parking complex. Plan to hang out post-match or use the dedicated rideshare lot." }
 ].map((item, i) => (
 <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="flex flex-wrap gap-4">
 <AffiliateButton href="https://www.amazon.com/s?k=clear+stadium+bag&tag=stadiumport-20" text="Buy Clear Stadium Bag" variant="primary" />
        <AffiliateButton href="https://www.chiefs.com/stadium/parking/" text="Book Stadium Parking" variant="outline" />
 </div>
 </Section>

 <Section id="tickets" title="Schedule & Tickets">
 <div className="bg-emerald-900 dark:bg-emerald-950 text-slate-900 dark:text-white rounded-[2.5rem] p-8 md:p-12 mb-12 relative overflow-hidden shadow-2xl">
 <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-[150px] opacity-20"></div>
 <div className="relative z-10">
 <div className="flex items-center gap-4 mb-8">
 <Ticket className="w-8 h-8 text-red-400" />
 <h3 className="text-3xl font-black">Confirmed Matches</h3>
 </div>
 <div className="space-y-6">
 {[
 { stage: "Group Stage", count: "4 Matches", color: "text-red-300" },
 { stage: "Round of 32", count: "1 Match", color: "text-red-300" },
 { stage: "Quarterfinal", count: "🏆 HOST MATCH", color: "text-amber-400" }
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
 Missed the draw? Trusted resale platforms offer verified tickets, though prices will be higher for high-demand matches like the Quarterfinal.
 </p>
 <AffiliateButton href="https://www.stubhub.com/" text="Check StubHub" variant="primary" />
 </div>
 </div>
 </Section>

 <Section id="hotels" title="Where to Stay">
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl leading-relaxed">
 Kansas City geography is key. Stay <strong>Downtown</strong> for the Fan Fest, nightlife, and better hotels, then shuttle/drive to the stadium. Staying near the stadium is practical but lacks entertainment.
 </p>
 
 <div className="space-y-8">
 <HotelCard 
        name="Loews Kansas City Hotel"
        rating={4.8}
        price="$400 - $700"
        distance="15 min drive"
        features={['Downtown', 'Luxury', 'Connected to Convention Center']}
        image="/images/cities/kansas-city-world-cup-2026-1024.webp" 
        link="https://www.booking.com/hotel/us/loews-kansas-city.html"
      />
      <HotelCard 
        name="Hotel Lotus Kansas City Stadium"
        rating={4.0}
        price="$250+"
        distance="Across the Street"
        features={['Location', 'Renovated', 'Free Parking']}
        image="/images/cities/kansas-city-world-cup-2026-1024.webp" 
        link="https://www.booking.com/hotel/us/lotus-kansas-city-stadium.html"
      />
      <HotelCard 
        name="Best Western Plus Kansas City Sports Complex"
        rating={4.1}
        price="$220+"
        distance="Across the Street"
        features={['Walking Distance', 'Breakfast Included', 'Pool']}
        image="/images/cities/kansas-city-world-cup-2026-1024.webp" 
        link="https://www.booking.com/hotel/us/best-western-plus-kansas-city-sports-complex.html"
      />
 </div>
 
 <div className="mt-12 text-center">
        <AffiliateButton href="https://www.booking.com/city/us/kansas-city.html" text="Search All KC Hotels" variant="outline" />
      </div>
 </Section>

 <Section id="transport" title="Getting Around">
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className="space-y-8">
 <div className="flex gap-6">
 <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center text-red-600 shrink-0">
 <Car className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Driving & Parking</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 This is the primary way to get to Arrowhead. You MUST buy a parking pass in advance. Traffic is heavy, so plan to arrive 3-4 hours early.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
 <Bus className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Shuttles</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Official park-and-ride shuttles will likely run from Downtown. This is the best option if you want to avoid driving yourself.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
 <Car className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Rideshare</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 There is a dedicated rideshare zone at the Missouri Welcome Center. Surge pricing will be extreme after the match.
 </p>
 </div>
 </div>
 </div>
 
 <div className=" rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 h-fit">
 <h4 className="font-bold text-2xl mb-6">Drive Times</h4>
 <ul className="space-y-6">
 {[
 { label: "Downtown KC", time: "15-25 min" },
 { label: "Airport (MCI)", time: "35-45 min" },
 { label: "Overland Park", time: "25-30 min" },
 { label: "Westport", time: "20 min" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
 <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
 </li>
 ))}
 </ul>
 <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <AffiliateButton href="https://www.kayak.com/cars/Kansas-City,MO-c19642" text="Rent a Car in KC" variant="secondary" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="dining" title="Food & Drink (BBQ)">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Joe's Kansas City", desc: "Located in a gas station. Famous for the Z-Man sandwich. A must-visit for any BBQ pilgrim." },
 { title: "Q39", desc: "Chef-driven, competition-style BBQ. A bit more upscale but incredible brisket and burnt ends." },
 { title: "Arthur Bryant's", desc: "The legendary historic spot. Known for its distinct sauce and connection to KC history." }
 ].map((item, i) => (
 <div key={i} className=" p-8 rounded-[2rem] shadow-lg border border-slate-200 dark:border-slate-200 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300">
 <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 mb-6">
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
 Kansas City is famous for jazz, fountains, and history. Most attractions are linked by the KC Streetcar in the downtown area.
 </p>
 <div className="space-y-6">
 {[
 { title: "National WWI Museum", desc: "America's official WWI museum with a massive tower offering city views.", color: "text-red-500" },
 { title: "Union Station", desc: "Historic rail station, massive grand hall, and likely hub for World Cup fan events.", color: "text-slate-500" },
 { title: "Negro Leagues Baseball Museum", desc: "A profoundly important museum celebrating the history of African American baseball.", color: "text-blue-500" }
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
        <AffiliateButton href="https://www.visitkc.com/" text="Explore KC Attractions" variant="primary" />
      </div>
 </Section>

 <Section id="safety" title="Safety & Security">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-red-600"/> Event Patterns</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">The parking lots are generally safe but chaotic. Stay in groups during tailgating. Heat exhaustion is a real risk in July.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Practical Tips</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>• Hydrate heavily before arriving (open air stadium).</li>
 <li>• Designate a driver (strict DUI enforcement).</li>
 <li>• Note your parking lot section (it is huge).</li>
 </ul>
 <div className="mt-6">
        <AffiliateButton href="https://www.worldnomads.com/" text="Get Travel Insurance" variant="secondary" />
      </div>
 </div>
 </div>
 </Section>

 <Section id="culture" title="Cultural Intelligence">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">KC is the "Heart of America." People are incredibly friendly. Tailgating is a sacred ritual here—strangers may offer you food.</p>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { title: "Tailgating", desc: "Arrive hours early. It's a massive party. Walk around, be friendly, and experience the smell of smoke and BBQ." },
 { title: "BBQ Wars", desc: "Locals have strong opinions on 'best BBQ.' Try a few spots. Burnt ends are the local specialty." },
 { title: "Nightlife", desc: "Power & Light District downtown is the main party hub. Westport is more local/historic bars." }
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
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Sun className="w-6 h-6 text-amber-500"/> July Weather</h4>
 <p className="text-slate-600 dark:text-slate-400">Very hot and humid. Highs 90°F+. Sunscreen and hats are mandatory (no roof).</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Essentials</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400">
 <li>• Sunscreen & Hat</li>
 <li>• Clear stadium bag</li>
 <li>• Comfortable shoes</li>
 </ul>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Tech</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-6">
 <li>• US plug adapters (Type A/B)</li>
 <li>• Offline maps (signal can lag)</li>
 <li>• Power bank</li>
 </ul>
 <AffiliateButton href="https://airalo.tp.st/yF9Qk3Ol" text="Get an eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <Section id="faq" title="Frequently Asked Questions">
 <div className="space-y-2">
 {[
 { q: "Where is Arrowhead Stadium?", a: "It is located at the Truman Sports Complex, about 8 miles east of Downtown Kansas City." },
 { q: "Is there a train to the stadium?", a: "NO. There is no rail service to Arrowhead. You must drive, take a bus/shuttle, or rideshare." },
 { q: "Can I walk from Downtown?", a: "No, it is too far (8+ miles) and not pedestrian-friendly. Do not attempt this." },
 { q: "What is the weather like?", a: "July in KC is hot and humid (90°F/32°C). The stadium is open-air, so prepare for sun exposure." },
 { q: "Is tailgating allowed?", a: "Yes! It is encouraged. It is one of the best tailgating scenes in the world. Arrive 3-4 hours early." },
 { q: "Where should I stay?", a: "Downtown Kansas City for access to the Fan Fest and nightlife. There are very few hotels near the stadium." },
 { q: "How loud is it?", a: "Arrowhead holds the world record for crowd noise (142.2 dB). It gets incredibly loud." },
 { q: "Are bags allowed?", a: "Only clear plastic bags (12x6x12 inches) are allowed. Small clutch purses are also permitted." },
 { q: "How much is parking?", a: "Parking is expensive ($50-$100+). You MUST purchase a pass in advance; you cannot pay at the gate." },
 { q: "What is the best BBQ?", a: "It's subjective! Joe's Kansas City, Q39, Jack Stack, and Arthur Bryant's are the heavy hitters." },
 { q: "Is KC safe?", a: "Tourist areas like Downtown, the Plaza, and the Stadium are generally safe. Exercise normal caution." },
 { q: "What is the Fan Fest location?", a: "It is expected to be at Union Station / National WWI Museum lawn, offering great views of the city." },
 { q: "Do I need a car?", a: "It is highly recommended in KC, as things are spread out. However, you can survive with Uber/Lyft if staying Downtown." },
 { q: "What matches are in KC?", a: "Kansas City hosts 4 Group Stage matches, a Round of 32 match, and a Quarterfinal." },
 { q: "Is the stadium covered?", a: "No. It is an open-air bowl. Ponchos for rain and sunscreen for sun are essential." },
 { q: "Where is the rideshare pickup?", a: "Usually at the Missouri Welcome Center between Gates 1 and 2." }
 ].map((item, i) => (
 <FAQItem key={i} question={item.q} answer={item.a} />
 ))}
 </div>
 </Section>

 <Section id="essential" title="Essential Information">
 <div className="grid md:grid-cols-2 gap-8">
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Shield className="w-6 h-6 text-red-600"/> Emergency Numbers</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>Emergency</strong> <span>911</span></li>
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>Non-Emergency</strong> <span>311</span></li>
 <li className="flex justify-between"><strong>Hospital</strong> <span>University Health Truman</span></li>
 </ul>
 </div>
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-red-600"/> Connectivity</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6">
 <li>• <strong>WiFi:</strong> Free at MCI Airport & Stadium.</li>
 <li>• <strong>Power:</strong> 120V, Type A/B plugs.</li>
 <li>• <strong>Sim Cards:</strong> Kiosks at MCI Arrivals.</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com/" text="Get an Airalo eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Explore Other Host Cities</h3>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {['Atlanta', 'Los Angeles', 'Mexico City', 'Toronto', 'Dallas', 'Miami', 'Seattle', 'New York'].map((city) => (
 <Link key={city} href={`/world-cup-2026-host-cities`} className="block p-4 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl hover:border-red-600 hover:shadow-lg transition-all text-center font-bold text-slate-700 dark:text-slate-200">
 {city}
 </Link>
 ))}
 </div>
 <div className="text-center mt-12">
 <Link href="/world-cup-2026-host-cities" className="text-red-600 hover:text-red-700 font-bold text-lg inline-flex items-center gap-2 hover:gap-4 transition-all">
 View All 16 Host Cities <ArrowRight className="w-5 h-5"/>
 </Link>
 </div>
 </div>
 </main>
 </div>
 </div>
 );
}















