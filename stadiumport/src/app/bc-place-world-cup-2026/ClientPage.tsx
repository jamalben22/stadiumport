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
    X, ChevronRight, Facebook, Twitter, Linkedin, Copy, CloudRain
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
src="/images/stadiums/bc-place-vancouver-world-cup-2026-1600.webp" 
alt="BC Place Stadium" 
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
                  { label: "BC Place", href: "/bc-place-world-cup-2026" }
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
 Round of 16 Host
 </span>
 </div>
 
 <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white tracking-tighter mb-6 leading-[0.9]">
 BC PLACE
 </h1>
 <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light max-w-xl leading-relaxed">
 The Crown Jewel of Vancouver. <span className="text-slate-900 dark:text-white font-medium">World Cup 2026</span> definitive guide.
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
 BC Place sits at the intersection of Yaletown, Chinatown, and the Entertainment District, defining the Vancouver skyline with its "Northern Lights" display. For World Cup 2026, the stadium is transforming from a CFL icon into a world-class soccer cathedral with a temporary natural grass pitch.
 </p>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: MapPin, title: "Where to Base", text: "Yaletown or Downtown for walk-to-stadium convenience. Parq Vancouver is literally next door." },
 { icon: Train, title: "Transport Strategy", text: "SkyTrain is king. Expo Line to Stadium-Chinatown or Canada Line to Yaletown-Roundhouse." },
 { icon: DollarSign, title: "Budget Signals", text: "Vancouver is premium. Book accommodations early or look to Burnaby/Richmond along SkyTrain lines." }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] transition-colors">
 <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
        <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/yvr" text="Search Vancouver Flights" variant="secondary" icon={Plane} />
        <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Vancouver" text="Check Yaletown Hotels" variant="primary" icon={Hotel} />
      </div>
    </Section>

 <Section id="visa" title="Visa & Entry (Canada)">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Who Needs a Visa?</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">Most travelers need an eTA (Electronic Travel Authorization) or a Visitor Visa. US citizens just need a valid passport. Check requirements early.</p>
 <AffiliateButton href="https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/apply.html" text="Check eTA Eligibility" variant="outline" />
        </div>
        <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
          <h4 className="font-bold text-2xl mb-4">Arrival Tips</h4>
          <ul className="space-y-4 mb-8">
            {['YVR uses automated kiosks', 'Declare goods in ArriveCAN app', 'SkyTrain Canada Line connects airport to city'].map((item, i) => (
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
 { time: "6–9 Months Out", desc: "Book hotels in Downtown/Yaletown. Prices will be high. If on a budget, look near Metrotown or Richmond SkyTrain stations." },
 { time: "3–6 Months Out", desc: "Confirm match tickets. Reserve tables at popular spots like Miku or The Victor." },
 { time: "1–3 Months Out", desc: "Apply for eTA if needed. Ensure you have a stadium-approved clear bag." }
 ].map((item, i) => (
 <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center">
 <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
 <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
 </div>
 ))}
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
            <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/yvr" text="Set Flight Alerts" variant="primary" icon={Plane} />
            <AffiliateButton href="https://www.opentable.ca/vancouver-restaurants" text="Reserve Restaurant Tables" variant="outline" />
          </div>
 </Section>

 <Section id="budget" title="Budget Tiers">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Smart Saver", items: ["Stay in Burnaby/Surrey", "SkyTrain to Stadium", "Costco Hot Dog pre-game"] },
 { title: "Comfort Upgrades", items: ["Yaletown boutique hotels", "Compass Card for transit", "Dining in Gastown"] },
 { title: "Premium", items: ["Parq Vancouver Casino Resort", "Private Seaplane arrival", "Club Seats"] }
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
        <AffiliateButton href="https://www.viator.com/Vancouver-tourism/d616-r58660086872-s194458348" text="Search Vancouver Packages" variant="secondary" icon={Briefcase} />
      </div>
    </Section>

 <Section id="stadium" title="BC Place Stadium">
<LightboxImage 
    src="/images/stadiums/bc-place-vancouver-world-cup-2026-1600.webp" 
    alt="BC Place Stadium Interior" 
    caption="The iconic retractable roof of BC Place, the largest of its kind in the world."
  />

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 Originally built for Expo 86 and the 2010 Winter Olympics, <strong>BC Place</strong> is a Vancouver icon. Its retractable roof ensures match comfort regardless of the famous Pacific Northwest rain. For the World Cup, the artificial turf is being swapped for a <strong>temporary natural grass system</strong> to meet FIFA standards.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Key Features</h4>
 <ul className="space-y-4">
 {[
 { label: "Capacity", val: "54,500" },
 { label: "Surface", val: "Temporary Natural Grass" },
 { label: "Roof", val: "Retractable (Cable-Supported)" },
 { label: "Renovated", val: "2011 ($514 Million)" }
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
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Costco Hack: $1.50 Hot Dog across the street on Expo Blvd.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Weather Proof: Roof covers all seats even when "open".</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Gates: A & H are busiest. Try Gate C.</li>
 </ul>
 </div>
 </div>
 
 <div className="p-8 rounded-[2rem] border border-emerald-500/20">
 <p className="text-lg text-center font-medium text-emerald-800 dark:text-emerald-200">
 <strong>Getting There:</strong> BC Place is in the city center. It is easily accessible by the <strong>Stadium-Chinatown SkyTrain station</strong> (Expo Line), just a short walk away.
 </p>
 </div>
 </Section>

 <Section id="tips" title="Match Day Gameplan">
 <div className="grid md:grid-cols-3 gap-6 mb-8">
 {[
 { title: "Arrival", text: "Arrive early. The stadium is downtown, so pubs and streets will be packed with fans." },
 { title: "Weather", text: "The roof is retractable, but it might be closed if it rains. The stadium is comfortable regardless." },
 { title: "Post-Match", text: "Walk to Yaletown or Gastown for celebrations. The SkyTrain will be busy immediately after the whistle." }
 ].map((item, i) => (
 <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="flex flex-wrap gap-4">
            <AffiliateButton href="https://www.amazon.com/s?k=clear+stadium+bag&tag=stadiumport-20" text="Buy Clear Stadium Bag" variant="primary" />
            <AffiliateButton href="https://www.bcplace.com/visiting/guest-policies" text="Check prohibited items" variant="outline" />
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
 { stage: "Total", count: "7 MATCHES", color: "text-amber-400" }
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
 Missed the draw? Trusted resale platforms offer verified tickets. Prices for Canada home matches will be high.
 </p>
 <AffiliateButton href="https://www.stubhub.com/" text="Check StubHub" variant="primary" />
 </div>
 </div>
 </Section>

 <Section id="hotels" title="Where to Stay">
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl leading-relaxed">
 Vancouver offers incredible proximity. <strong>Parq Vancouver</strong> is adjacent to the stadium. <strong>Yaletown</strong> offers boutique options, while <strong>Richmond</strong> is a great budget-friendly alternative on the SkyTrain.
 </p>
 
 <div className="space-y-8">
 <HotelCard 
        name="Parq Vancouver" 
        rating={4.7}
        price="$$$$"
        distance="0.1 miles"
        features={["Next to Stadium", "Casino", "Luxury"]}
        image="/images/cities/vancouver-world-cup-2026-640.webp" 
       link="https://www.booking.com/searchresults.html?ss=Parq+Vancouver"
     />
     <HotelCard 
       name="JW Marriott Parq" 
       rating={4.8}
       price="$$$$"
       distance="0.1 miles"
       features={["Luxury", "Spa", "Views"]}
       image="/images/cities/vancouver-world-cup-2026-640.webp" 
       link="https://www.booking.com/searchresults.html?ss=JW+Marriott+Parq+Vancouver"
     />
     <HotelCard 
       name="Sandman Hotel City Centre" 
       rating={4.1}
       price="$$"
       distance="0.3 miles"
       features={["Value", "Pool", "Central"]}
       image="/images/cities/vancouver-world-cup-2026-640.webp" 
       link="https://www.booking.com/searchresults.html?ss=Sandman+Hotel+Vancouver+City+Centre"
     />
 </div>
 
 <div className="mt-12 text-center">
 <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Vancouver" text="Search All Vancouver Hotels" variant="outline" />
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
 <h4 className="font-bold text-xl mb-2">SkyTrain</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Fast and reliable. Expo Line to Stadium-Chinatown or Canada Line to Yaletown-Roundhouse. Use the Compass Card or tap your credit card.
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
 YVR Airport is connected by the Canada Line. It takes ~25 mins to reach downtown. No traffic stress.
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
 Parking is expensive ($30-50+). Uber/Lyft available but surge after matches. SkyTrain is usually faster.
 </p>
 </div>
 </div>
 </div>
 
 <div className=" rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 h-fit">
 <h4 className="font-bold text-2xl mb-6">Distance to Stadium</h4>
 <ul className="space-y-6">
 {[
 { label: "Yaletown Hotels", time: "5-10 min walk" },
 { label: "Gastown", time: "15 min walk" },
 { label: "Richmond", time: "25 min SkyTrain" },
 { label: "Airport (YVR)", time: "30 min SkyTrain" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
 <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
 </li>
 ))}
 </ul>
 <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
<AffiliateButton href="https://www.booking.com/airport-taxis/" text="Book Airport Transfer" variant="secondary" />
</div>
 </div>
 </div>
 </Section>

 <Section id="dining" title="Food & Drink">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "The Pint", desc: "Classic pre-game sports bar near the stadium. Wings are solid, atmosphere is rowdy." },
 { title: "Costco", desc: "The legendary $1.50 hot dog. Located right across Expo Blvd. The ultimate budget pre-game meal." },
 { title: "Chinatown BBQ", desc: "Authentic BBQ pork and duck. A Vancouver staple just a short walk away." }
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
 Vancouver is walkable and scenic. BC Place is close to the seawall and major sights.
 </p>
 <div className="space-y-6">
 {[
 { title: "Science World", desc: "The iconic geodesic dome at the end of False Creek. Great for families.", color: "text-blue-500" },
 { title: "Gastown Steam Clock", desc: "Historic district with cobblestone streets and the famous whistling steam clock.", color: "text-red-500" },
 { title: "Granville Island", desc: "Public market with food, art, and views. Accessible by Aquabus ferry.", color: "text-emerald-500" }
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
 <div className="mt-8 text-center">
 <AffiliateButton href="https://www.viator.com/Vancouver/d616" text="Get Vancouver Attractions Pass" variant="primary" />
 </div>
 </Section>

 <Section id="safety" title="Safety & Security">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> Event Patterns</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Granville Street and the Entertainment District can get rowdy late at night. Stick to main streets. The stadium area is generally very safe.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Practical Tips</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>• Bike theft is common; use secure lockers if cycling.</li>
 <li>• Be aware of East Hastings area if walking from Gastown.</li>
 <li>• Save local emergency contacts offline.</li>
 </ul>
 <div className="mt-6">
<AffiliateButton href="https://www.worldnomads.com/travel-insurance" text="Get Travel Insurance" variant="secondary" />
</div>
 </div>
 </div>
 </Section>

 <Section id="culture" title="Cultural Intelligence">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">Vancouverites are polite and laid-back. Tipping is expected (18-20%). The city is very multicultural with a strong Asian influence, reflected in the food scene.</p>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { title: "Fan Zones", desc: "Expect activations at Concord Pacific Place or Robson Square." },
 { title: "Dining Etiquette", desc: "Casual dress is the norm everywhere. Reservations essential for popular spots." },
 { title: "Nightlife", desc: "Granville Street is the club hub. Yaletown is for cocktails. Gastown for pubs." }
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
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><CloudRain className="w-6 h-6 text-blue-500"/> Rain Gear</h4>
 <p className="text-slate-600 dark:text-slate-400">Even in June/July, rain is possible. A light waterproof jacket is essential.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Sun className="w-6 h-6 text-amber-500"/> Layers</h4>
 <p className="text-slate-600 dark:text-slate-400">Days are mild (20-25°C), but evenings can cool down near the water.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Briefcase className="w-6 h-6 text-emerald-500"/> Comfort</h4>
 <p className="text-slate-600 dark:text-slate-400">Comfortable walking shoes are a must for the seawall and downtown.</p>
 </div>
 </div>
 </Section>

 <Section id="faq" title="Frequently Asked Questions">
 <div className="space-y-4">
 {[
 { q: "What is the bag policy?", a: "Strict clear bag policy. Max 12x12x6 inches. No backpacks allowed." },
 { q: "Is the roof open?", a: "The roof is retractable and will likely be open for World Cup matches, weather permitting." },
 { q: "Can I use US Dollars?", a: "Some places accept USD, but the exchange rate is poor. Use credit cards or get Canadian cash." },
 { q: "Is there re-entry?", a: "No. Once you scan your ticket, you cannot leave and re-enter." },
 { q: "Is cannabis legal?", a: "Yes, but smoking in the stadium or public parks/patios is prohibited." }
 ].map((item, i) => (
 <FAQItem key={i} question={item.q} answer={item.a} />
 ))}
 </div>
 </Section>

 <Section id="essential" title="Essential Information">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Shield className="w-6 h-6 text-emerald-500"/> Emergency Numbers</h4>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>Emergency</strong> <span>911</span></li>
              <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>Vancouver Police</strong> <span>(604) 717-3321</span></li>
              <li className="flex justify-between"><strong>Hospital</strong> <span>St. Paul's Hospital</span></li>
            </ul>
          </div>
          <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-emerald-500"/> Connectivity</h4>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6">
              <li>• <strong>WiFi:</strong> Free at BC Place.</li>
              <li>• <strong>Power:</strong> 120V, Type A/B plugs.</li>
              <li>• <strong>Sim Cards:</strong> Available at YVR Airport.</li>
            </ul>
            <AffiliateButton href="https://www.airalo.com/canada-esim" text="Get an eSIM" variant="secondary" />
          </div>
        </div>
      </Section>

      <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Explore Other Stadiums</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Mercedes-Benz Stadium', slug: 'mercedes-benz-stadium-world-cup-2026' },
            { name: 'MetLife Stadium', slug: 'metlife-stadium-world-cup-2026' },
            { name: 'SoFi Stadium', slug: 'sofi-stadium-world-cup-2026' },
            { name: 'AT&T Stadium', slug: 'att-stadium-world-cup-2026' },
            { name: 'Hard Rock Stadium', slug: 'hard-rock-stadium-world-cup-2026' },
            { name: 'Lumen Field', slug: 'lumen-field-world-cup-2026' },
            { name: 'Arrowhead Stadium', slug: 'arrowhead-stadium-world-cup-2026' },
            { name: 'Levi\'s Stadium', slug: 'levis-stadium-world-cup-2026' }
          ].map((stadium) => (
            <Link key={stadium.slug} href={`/${stadium.slug}`} className="block p-4 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center font-bold text-slate-700 dark:text-slate-200 text-sm">
              {stadium.name}
            </Link>
          ))}
        </div>
      </div>

      </main>
 </div>
 
 </div>
 );
}















