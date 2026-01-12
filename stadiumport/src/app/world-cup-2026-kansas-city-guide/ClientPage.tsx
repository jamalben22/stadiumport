'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { motion, useScroll, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { 
 MapPin, ArrowRight, Info, CheckCircle2, 
 Plane, Hotel, Ticket, Copy,
 Utensils, Camera, Sun, 
 DollarSign, Shield, Star,
 Train, Car, Briefcase,
  X, ChevronRight, Facebook, Twitter, Linkedin, AlertTriangle
} from 'lucide-react';


// --- Design System & Components ---

const fadeIn = {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

// 2. Floating Social Share
const SocialShare = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Check out this guide to World Cup 2026 in Kansas City!";
    
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
      <div className="backdrop-blur-md p-2 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col gap-3">
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
   <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-slate-300 dark:border-white/10 group-open:bg-emerald-500 group-open:border-emerald-500 group-open:text-slate-900 dark:text-white transition-all duration-300">
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
 { id: 'neighborhoods', label: 'Neighborhoods' },
 { id: 'transport', label: 'Transport' },
 { id: 'dining', label: 'Dining' },
 { id: 'attractions', label: 'Attractions' },
 { id: 'tips', label: 'Match Day' },
 { id: 'itinerary', label: 'Itineraries' },
 { id: 'safety', label: 'Safety' },
 { id: 'culture', label: 'Culture' },
 { id: 'packing', label: 'Packing' },
 { id: 'faq', label: 'FAQ' },
 { id: 'essential', label: 'Essential' },
 ];

 return (
    <div className="min-h-screen font-sans selection:bg-emerald-500/30 bg-[#F5F5F7] dark:bg-[#0A0A0A]">
 
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
            src="/images/cities/kansas-city-world-cup-2026-1600.webp" 
            alt="Kansas City Skyline" 
            fill 
            className="object-cover"
            priority 
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
                { label: 'Kansas City', href: '/world-cup-2026-kansas-city-guide' }
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
                  Last Updated: January 6, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-medium tracking-widest uppercase backdrop-blur-md">
                  Host City
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
                  Quarterfinal Host
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9] md:leading-[0.95]">
                Kansas City World Cup 2026 Guide
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-white/90 font-light max-w-3xl leading-relaxed">
                I’ve watched this city reinvent itself for two decades—streetcar, breweries, a brand-new airport terminal, and now the biggest tournament on earth. Here’s how to do Kansas City like a local and get to <span className="text-white font-medium">GEHA Field at Arrowhead Stadium</span> without stress.
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
   <div className="space-y-1 relative border-l-2 border-slate-200 dark:border-white/10 ml-3">
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
 This Kansas City World Cup 2026 guide is written for one goal: help you spend less time stuck on I-70 and more time eating burnt ends, hearing real jazz, and actually enjoying match day. Kansas City can feel small and spread out at the same time. Downtown is walkable. The stadium area is not. Once you understand that, everything clicks.
 </p>
 </div>
 <div className="grid md:grid-cols-2 gap-8 mb-12">
  <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
   <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Quick Answers (Featured Snippet)</h3>
   <ul className="space-y-3 text-slate-700 dark:text-slate-300">
    <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span><span><strong>Best area to stay:</strong> Downtown (Power & Light / Crossroads) for fan energy + the free streetcar.</span></li>
    <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span><span><strong>How to get to Arrowhead:</strong> Drive + pre-book parking, rideshare, or an official shuttle when announced.</span></li>
    <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span><span><strong>Is the streetcar free?</strong> Yes—no fare.</span></li>
    <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span><span><strong>Where’s the stadium?</strong> Truman Sports Complex (1 Arrowhead Dr, Kansas City, MO 64129).</span></li>
   </ul>
  </div>
  <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
   <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">KC Reality Check (Local Notes)</h3>
   <ul className="space-y-3 text-slate-700 dark:text-slate-300">
    <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span><span>Locals measure distance in <strong>minutes</strong>, not miles.</span></li>
    <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span><span>Downtown is your basecamp; Arrowhead is a dedicated trip.</span></li>
    <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span><span>“Kansas City” can mean <strong>Missouri</strong> or <strong>Kansas</strong>. Double-check the address before you head out.</span></li>
    <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span><span>If someone argues BBQ sauce, they’re not mad—they’re bonding.</span></li>
   </ul>
  </div>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: MapPin, title: "Where to Base", text: "Downtown (Power & Light / Crossroads) if you want walkability, watch parties, and easy hotel logistics." },
 { icon: Car, title: "Transport Strategy", text: "Use the streetcar + zero-fare buses in the core, then treat the stadium like a road trip: pre-plan your ride in and out." },
 { icon: DollarSign, title: "Budget Signals", text: "KC is usually better value than coastal hosts. That said: July 11 (Quarterfinal) is the rate-spike day." }
 ].map((item, i) => (
  <div key={i} className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 transition-colors">
   <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
   <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
   <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
  </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
<AffiliateButton href="https://www.skyscanner.com/transport/flights/to/mci" text="Search KC Flights" variant="secondary" icon={Plane} />
<AffiliateButton href="https://www.booking.com/searchresults.html?ss=Kansas+City&nflt=district%3D2092" text="Check Downtown Hotels" variant="primary" icon={Hotel} />
</div>
 </Section>

 <Section id="visa" title="Visa & Entry (USA)">
   <div className="grid md:grid-cols-2 gap-8">
    <div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
     <h4 className="font-bold text-2xl mb-4">Who Needs a Visa?</h4>
     <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">Citizens of Visa Waiver Program countries can use ESTA for short stays. Others require a B-2 tourist visa. Check status as of Dec 2025 and apply early.</p>
     <AffiliateButton href="https://esta.cbp.dhs.gov/" text="Check ESTA Eligibility" variant="outline" />
    </div>
    <div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
     <h4 className="font-bold text-2xl mb-4">Arrival Tips</h4>
 <ul className="space-y-4 mb-8">
 {['Use MCI’s new terminal automated control', 'Proof of onward travel required', 'Carry digital copies of tickets'].map((item, i) => (
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
  { time: "6–9 Months Out", desc: "Book flights and refundable hotels in Downtown/Crossroads. Set price alerts. If traveling multi-city, plan open-jaw tickets." },
  { time: "3–6 Months Out", desc: "Confirm match tickets. Reserve airport transfers and key BBQ restaurants like Joe's KC and Q39." },
  { time: "1–3 Months Out", desc: "Lock in eSIMs, clear stadium bags, and museum tickets. Re-price hotels weekly; big events often trigger cancellations." }
 ].map((item, i) => (
 <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
  <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
  <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
 </div>
 ))}
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
<AffiliateButton href="https://www.skyscanner.com" text="Set Flight Alerts" variant="primary" icon={Plane} />
<AffiliateButton href="https://www.opentable.com/kansas-city-restaurant-listings" text="Reserve BBQ Tables" variant="outline" />
</div>
 <div className="mt-8 p-8 rounded-[2rem] bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
  <h4 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">Recommended Reading</h4>
  <ul className="space-y-3 text-slate-600 dark:text-slate-400">
   <li>
    <Link href="/world-cup-2026-flight-booking-guide" className="text-emerald-600 dark:text-emerald-400 font-bold">Flight booking guide</Link>
    <span> for multi-city routing and timing.</span>
   </li>
   <li>
    <Link href="/world-cup-2026-accommodation-guide" className="text-emerald-600 dark:text-emerald-400 font-bold">Accommodation guide</Link>
    <span> for refundable booking strategy and neighborhood selection.</span>
   </li>
   <li>
    <Link href="/world-cup-2026-travel-insurance-guide" className="text-emerald-600 dark:text-emerald-400 font-bold">Travel insurance guide</Link>
    <span> if you’re traveling internationally.</span>
   </li>
  </ul>
 </div>
 </Section>

 <Section id="budget" title="Budget Tiers">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
  <p>
   Kansas City is one of the easier U.S. host cities to do without blowing up your bank account—especially because the streetcar is free and RideKC buses are zero fare (as of late 2025). The wildcard is simple: <strong>match demand</strong>. Group stage nights are busy. July 11 is a different planet.
  </p>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Smart Saver", items: ["Hotel: $150–$260/night (outer areas)", "Transit: Streetcar $0 + buses $0", "Food: $35–$60/day (BBQ is filling)", "Matchday: split parking + bring snacks"] },
 { title: "Comfort Upgrades", items: ["Hotel: $250–$450/night (Downtown/Plaza)", "Rideshare: pre/post-match (avoid peak surges)", "Food: $70–$120/day with cocktails", "1–2 paid attractions or tours"] },
 { title: "Premium", items: ["Hotel: $450–$900+/night (best rooms sell out)", "Private car service for matchday timing", "Dining: tasting menus + steak nights", "Hospitality or VIP experiences"] }
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
 <div className="mt-10 p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/50">
  <h4 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">Matchday Cost Notes (What People Forget)</h4>
  <ul className="space-y-3 text-slate-600 dark:text-slate-400">
   <li>• Parking for Chiefs games has been advertised around <strong>$45</strong> on official city tourism materials; World Cup pricing and rules can change, so treat this as a reference point, not a guarantee.</li>
   <li>• Rideshare surge after a match can easily cost more than dinner. Waiting 30–60 minutes is often the cheapest “hack.”</li>
   <li>• Downtown watch parties can be your budget win: atmosphere without ticket prices.</li>
  </ul>
 </div>
 <div className="mt-8 text-center text-slate-600 dark:text-slate-400">
  <Link href="/world-cup-2026-budget-guide" className="text-emerald-600 dark:text-emerald-400 font-bold">World Cup 2026 budget guide</Link>
  <span> covers daily cost baselines, hidden fees, and how to avoid peak surges.</span>
 </div>
 <div className="mt-8 text-center">
<AffiliateButton href="https://www.kayak.com/packages/Kansas-City-c16136.P16136" text="Search KC Packages" variant="secondary" icon={Briefcase} />
</div>
 </Section>

 <Section id="stadium" title="Arrowhead Stadium">
 <LightboxImage 
 src="/images/stadiums/arrowhead-stadium-kansas-city-world-cup-2026-1600.webp" 
 alt="Arrowhead Stadium Interior" 
 caption="The Sea of Red at GEHA Field at Arrowhead Stadium."
 />

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 Known as the loudest stadium in the world, <strong>GEHA Field at Arrowhead Stadium</strong> is a cathedral of American sports. Famous for its incredible tailgating culture and deafening atmosphere, this open-air venue offers an authentic and intense fan experience.
 </p>
 <p>
  For parking, gate strategy, tailgating, and hotel logistics, read the venue deep-dive: <Link href="/arrowhead-stadium-world-cup-2026" className="text-emerald-600 dark:text-emerald-400 font-bold">Arrowhead Stadium World Cup 2026 guide</Link>.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
    <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
     <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Key Features</h4>
     <ul className="space-y-4">
      {[
       { label: "Capacity", val: "76,416" },
       { label: "Surface", val: "Natural Grass" },
       { label: "Roof", val: "Open Air" },
       { label: "Record", val: "Guinness record: 142.2 dB crowd roar" }
      ].map((item, i) => (
       <li key={i} className="flex justify-between items-center text-slate-700 dark:text-slate-300">
        <span className="font-medium text-slate-500">{item.label}</span>
        <span className="font-bold">{item.val}</span>
       </li>
      ))}
     </ul>
    </div>
    <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
     <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Pro Tips</h4>
 <ul className="space-y-4 text-slate-700 dark:text-slate-300">
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Tailgating is the culture. Be friendly, don’t cut through someone’s setup, and always clean up.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Open-air means sun, heat, and pop-up storms. Pack a poncho and sunscreen like they’re tickets.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Ear protection for kids is not optional if they’re sensitive—Arrowhead gets legitimately loud.</li>
 </ul>
 <div className="mt-8">
  <AffiliateButton href="https://www.gehafieldatarrowhead.com/" text="Stadium Tours & Info" variant="outline" />
 </div>
 </div>
 </div>
 
 <div className="p-8 rounded-[2rem] border border-emerald-500/20">
 <p className="text-lg text-center font-medium text-emerald-800 dark:text-emerald-200">
 <strong>Getting There:</strong> Arrowhead is about 9 miles (14 km) east of Downtown Kansas City. There is <strong>no direct rail</strong> service to the stadium. Plan on driving + official parking, rideshare, or tournament shuttles when announced.
 </p>
 </div>
 </Section>

 <Section id="tips" title="Match Day Gameplan">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
  <p>
   Arrowhead match day is part festival, part logistics puzzle. The move is to treat it like a day trip: eat early, arrive early, and don’t plan a tight reservation right after the final whistle unless you like living dangerously.
  </p>
 </div>
 <div className="grid md:grid-cols-3 gap-6 mb-8">
 {[
 { title: "Arrival", text: "If you want tailgating, arrive 3–4 hours early. If you don’t, still aim for 90 minutes pre-kick for security + walking time." },
 { title: "Parking + Access", text: "For Chiefs games, parking lots open about 4 hours before kickoff and parking has been sold in advance; World Cup procedures may differ—check official updates and buy early." },
 { title: "Exit Plan", text: "Don’t leave immediately unless you have to. Eat, meet friends, or wait out the surge—exiting the complex is the slowest part of the day." }
 ].map((item, i) => (
 <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
 <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="grid md:grid-cols-2 gap-8 mb-10">
  <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
   <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Tailgate Etiquette (KC Edition)</h3>
   <ul className="space-y-3 text-slate-700 dark:text-slate-300">
    <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span><span>Bring something if you’re invited in: a six-pack, ice, snacks—anything.</span></li>
    <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span><span>Don’t walk through a setup like it’s a shortcut. Go around.</span></li>
    <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span><span>Be curious and respectful. People love talking football here.</span></li>
   </ul>
  </div>
  <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
   <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Fan Zones + Watch Parties</h3>
   <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
    Downtown’s Power & Light District has hosted major watch parties in past tournaments and is the safest bet for a big-screen atmosphere if you don’t have tickets. Go early—capacity fills fast on marquee nights.
   </p>
   <AffiliateButton href="https://kansascityfwc26.com/" text="Official KC2026 Updates" variant="outline" />
  </div>
 </div>
 <div className="flex flex-wrap gap-4">
<AffiliateButton href="https://www.amazon.com/s?k=clear+stadium+bag" text="Buy Clear Stadium Bag" variant="primary" />
<AffiliateButton href="https://kansascityfwc26.com/" text="Check Transport Updates" variant="outline" />
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
 <div className="space-y-4">
  {[
   { date: "Tue, Jun 16, 2026", time: "8:00 PM CT", detail: "Group Stage (Match 19)" },
   { date: "Sat, Jun 20, 2026", time: "7:00 PM CT", detail: "Group Stage (Match 34)" },
   { date: "Thu, Jun 25, 2026", time: "6:00 PM CT", detail: "Group Stage (Match 58)" },
   { date: "Sat, Jun 27, 2026", time: "9:00 PM CT", detail: "Group Stage (Match 69)" },
   { date: "Fri, Jul 3, 2026", time: "8:30 PM CT", detail: "Round of 32 (Match 87)" },
   { date: "Sat, Jul 11, 2026", time: "8:00 PM CT", detail: "Quarterfinal (Match 100)" },
  ].map((m, i) => (
   <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 border-b border-white/10 pb-4">
    <div className="font-bold text-lg text-emerald-200">{m.date}</div>
    <div className="font-mono text-lg text-emerald-300">{m.time}</div>
    <div className="text-lg text-white/90">{m.detail}</div>
   </div>
  ))}
 </div>
 </div>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8">
  <div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
   <h4 className="font-bold text-2xl mb-4">Official Tickets</h4>
   <p className="text-slate-600 dark:text-slate-400 mb-8">
    The safest way to buy tickets is through the official FIFA portal. If you’re planning a Kansas City trip around a single “must-see” match (especially July 11), set reminders for every sales phase and keep your passport details consistent across accounts.
   </p>
   <AffiliateButton href="https://www.fifa.com" text="FIFA Official Site" variant="secondary" />
  </div>
  <div className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-[2rem]">
   <h4 className="font-bold text-2xl mb-4">Resale Market</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8">
 Missed the draw? Use reputable resale platforms and avoid social DMs. Kansas City’s Quarterfinal is the single biggest price driver in this city—book lodging and transport with flexible cancellation before you buy resale tickets.
 </p>
 <div className="flex flex-wrap gap-4">
  <AffiliateButton href="https://www.stubhub.com/" text="Check StubHub" variant="primary" />
  <AffiliateButton href="https://www.fifa.com/hospitality" text="Explore Hospitality" variant="outline" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="hotels" title="Where to Stay">
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl leading-relaxed">
 Most fans should stay in <strong>Downtown</strong> (Power & Light / Crossroads / River Market) or the <strong>Plaza</strong>. Arrowhead sits inside a sea of parking lots, so “near the stadium” is great for logistics and terrible for everything else. My rule: if you’re doing one match in KC, stay Downtown. If you’re doing multiple match days or traveling with kids, mix Downtown + Plaza for variety.
 </p>
 <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-3xl leading-relaxed">
  Need a broader strategy? Use the <Link href="/world-cup-2026-accommodation-guide" className="text-emerald-600 dark:text-emerald-400 font-bold">World Cup 2026 accommodation guide</Link> to choose refundable bookings and avoid getting stuck in the wrong neighborhood.
 </p>
 
 <div className="space-y-8">
 <HotelCard 
 name="Loews Kansas City Hotel"
 rating={4.7}
 price="$350 - $700"
 distance="~9 mi / 14 km"
 features={['Connected to Convention Center', 'Pool', 'Luxury']}
 image="/images/cities/kansas-city-world-cup-2026-640.webp" 
 link="https://www.booking.com/hotel/us/loews-kansas-city.html"
 />
 <HotelCard 
 name="Kansas City Marriott Downtown"
 rating={4.2}
 price="$250 - $550"
 distance="~9 mi / 14 km"
 features={['Power & Light Adjacent', 'Big Inventory', 'Convention Core']}
 image="/images/cities/kansas-city-world-cup-2026-640.webp" 
 link="https://www.booking.com/hotel/us/kansas-city-marriott-downtown.html"
 />
 <HotelCard 
 name="The Raphael Hotel, Autograph Collection"
 rating={4.8}
 price="$300 - $650"
 distance="~10 mi / 16 km"
 features={['Plaza', 'Boutique', 'Classic KC Feel']}
 image="/images/cities/kansas-city-world-cup-2026-640.webp" 
 link="https://www.booking.com/hotel/us/the-raphael-kansas-city.html"
 />
 <HotelCard 
 name="Courtyard by Marriott Kansas City Downtown/Convention Center"
 rating={4.3}
 price="$200 - $450"
 distance="~9 mi / 14 km"
 features={['Downtown', 'Reliable', 'Walk to T-Mobile Center']}
 image="/images/cities/kansas-city-world-cup-2026-640.webp" 
 link="https://www.booking.com/hotel/us/courtyard-by-marriott-kansas-city-downtown-convention-center.html"
 />
 <HotelCard 
 name="Hotel Lotus Kansas City Stadium"
 rating={4.0}
 price="$220 - $450"
 distance="~0.5 mi / 0.8 km"
 features={['Closest Hotels', 'Matchday Easy Mode', 'Free Parking']}
 image="/images/cities/kansas-city-world-cup-2026-640.webp" 
 link="https://www.booking.com/hotel/us/lotus-kansas-city-stadium.html"
 />
 <HotelCard 
 name="Best Western Plus Kansas City Sports Complex"
 rating={4.1}
 price="$180 - $400"
 distance="~0.6 mi / 1 km"
 features={['Budget', 'Breakfast', 'Walkable on Matchday']}
 image="/images/cities/kansas-city-world-cup-2026-640.webp" 
 link="https://www.booking.com/hotel/us/best-western-plus-kansas-city-sports-complex.html"
 />
 </div>
 
 <div className="mt-12 text-center">
<AffiliateButton href="https://www.booking.com/searchresults.html?ss=Kansas+City" text="Search All KC Hotels" variant="outline" />
</div>
 </Section>

 <Section id="neighborhoods" title="Neighborhood-by-Neighborhood: Where to Stay + What It Feels Like">
  <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
   <p>
    If you only remember one Kansas City travel tip, make it this: <strong>your neighborhood choice determines your whole trip</strong>. Downtown is where you’ll bump into other fans. The Plaza is where you’ll sleep like a baby. Westport is where your “one quiet drink” turns into “why is it 2 a.m.?”
   </p>
   <p>
    I’m not going to pretend KC is a transit city. It’s a <em>vibes city</em>. Pick your vibe, then plan your stadium day separately.
   </p>
  </div>

  <div className="grid md:grid-cols-2 gap-8">
   {[
    {
     title: "Downtown / Power & Light (P&L)",
     vibe: "Best for first-timers, watch parties, and late nights without a car.",
     bullets: [
      "Stay here if you want to walk to bars, arenas, and big-screen match viewing.",
      "You’ll be on the free streetcar spine, which makes River Market and Crossroads effortless.",
      "Matchday plan: pre-book ride/shuttle, then come back downtown for the afterglow."
     ]
    },
    {
     title: "Crossroads Arts District",
     vibe: "Best for breweries, galleries, and that “I found a city within a city” feeling.",
     bullets: [
      "This is where KC gets creative: murals, coffee, and small bars that turn into dance floors.",
      "Go early for cocktails; stay late for live jazz at places locals don’t broadcast to tourists.",
      "Great base for food-hopping before a match."
     ]
    },
    {
     title: "River Market / City Market",
     vibe: "Best for mornings: market strolls, quick eats, and a calmer downtown stay.",
     bullets: [
      "Perfect if you want walkability but don’t want to be in the loudest part of downtown.",
      "Streetcar access makes it easy to bounce between neighborhoods without thinking.",
      "Local move: start the day with the market + a coffee, then build from there."
     ]
    },
    {
     title: "Country Club Plaza",
     vibe: "Best for upscale, scenic, and family-friendly Kansas City.",
     bullets: [
      "Spanish-style architecture, shopping, patios, and a slower rhythm than downtown.",
      "Ideal if you’re traveling with parents, kids, or anyone who values sleep.",
      "Matchday plan: leave earlier—traffic funnels are real."
     ]
    },
    {
     title: "Westport",
     vibe: "Best for nightlife and bar-hopping (and yes, it gets rowdy).",
     bullets: [
      "If your group’s energy is “let’s meet people,” you’ll like Westport.",
      "Use rideshare after midnight; don’t wander aimlessly looking for your hotel.",
      "Great option for a post-match night when you’re still buzzing."
     ]
    },
    {
     title: "18th & Vine (Jazz District)",
     vibe: "Best for history, museums, and KC’s musical backbone.",
     bullets: [
      "Pair the Negro Leagues Baseball Museum with the American Jazz Museum for a perfect afternoon.",
      "This is a cultural stop, not the most convenient hotel base for visitors.",
      "Go with purpose; use rideshare at night."
     ]
    },
    {
     title: "Brookside / Waldo",
     vibe: "Best for neighborhood calm, parks, and local everyday life.",
     bullets: [
      "A “live like a local” area—less touristy, more coffee shops and porch energy.",
      "Great if you want a quieter home base and don’t mind driving/uber-ing.",
      "Ideal for longer stays and repeat visitors."
     ]
    },
    {
     title: "North Kansas City (NKC) + the Northland",
     vibe: "Best for value hotels and quick highway access.",
     bullets: [
      "You’re close to downtown without paying downtown prices (most of the time).",
      "Great for groups renting a car and prioritizing logistics over nightlife.",
      "Consider it your practical basecamp: easy in, easy out."
     ]
    },
    {
     title: "Overland Park (Kansas)",
     vibe: "Best for big rooms, families, and road-trip convenience.",
     bullets: [
      "Plenty of chain hotels, shopping, and easy parking—less “vacation city,” more “comfort mode.”",
      "Good option if you’re doing multiple host cities and want a consistent setup.",
      "Double-check your address: you’ll be in Kansas, not Missouri."
     ]
    },
    {
     title: "Near Arrowhead (Truman Sports Complex area)",
     vibe: "Best for matchday simplicity, worst for everything else.",
     bullets: [
      "There’s a reason locals don’t “hang out” by the stadium—there’s nothing to hang out at.",
      "Stay here only if you’re prioritizing walking to the gates over sightseeing.",
      "If you do it, plan meals and nightlife elsewhere."
     ]
    }
   ].map((n, i) => (
    <div key={i} className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
     <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{n.title}</h3>
     <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">{n.vibe}</p>
     <ul className="space-y-3 text-slate-700 dark:text-slate-300">
      {n.bullets.map((b, j) => (
       <li key={j} className="flex gap-3"><span className="text-emerald-500 font-bold">•</span><span>{b}</span></li>
      ))}
     </ul>
    </div>
   ))}
  </div>

  <div className="mt-10 flex flex-wrap gap-4">
   <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Kansas+City&nflt=district%3D2092" text="Downtown Hotel Deals" variant="primary" icon={Hotel} />
   <AffiliateButton href="https://www.opentable.com/kansas-city-restaurant-listings" text="Reserve Restaurants" variant="outline" icon={Utensils} />
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
  <h4 className="font-bold text-xl mb-2">KC Streetcar</h4>
  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 The KC Streetcar is <strong>free</strong> and runs through the heart of the city, from UMKC up through Midtown/Downtown to the River Market. It’s your best “tourist superpower” for bouncing between hotels, coffee, bars, and museums—just remember it does NOT go to Arrowhead.
  </p>
  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
   Service is frequent (often every 10–15 minutes). Late-night hours are decent on weekends, which matters when you’re coming back from a watch party.
  </p>
  </div>
 </div>
 <div className="flex gap-6">
  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
   <Train className="w-8 h-8" />
  </div>
  <div>
   <h4 className="font-bold text-xl mb-2">RideKC Buses (Zero Fare)</h4>
   <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
    Here’s a Kansas City advantage most out-of-town guides miss: RideKC bus routes are <strong>zero fare</strong> (as of late 2025). It’s not glamorous, but it can save you real money on a multi-match week.
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
 Kansas City International (MCI) has a modern single terminal. Fastest options are rideshare or a rental car, but there’s also a RideKC airport bus (Route 229) that runs between KCI and Downtown’s East Village area.
  </p>
  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
   Local hack: if you land during surge pricing, grab coffee in the terminal, let the surge cool off, then go. Your wallet will thank you.
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
 Driving is common here. If you drive to the stadium, expect a long, slow funnel and buy official parking early when it becomes available. Rideshare works, but post-match surges are real—plan a “cool-down” activity (food, a drink, a walk) before you request a car.
  </p>
  </div>
 </div>
 </div>
 
 <div className="rounded-[2.5rem] p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 h-fit">
   <h4 className="font-bold text-2xl mb-6">Distance to Stadium</h4>
   <ul className="space-y-6">
    {[
     { label: "Downtown Hotels", time: "15–25 min (non-peak)" },
     { label: "Country Club Plaza", time: "20–30 min (non-peak)" },
     { label: "Overland Park", time: "25–40 min (non-peak)" },
     { label: "Airport (MCI)", time: "30–45 min (non-peak)" }
    ].map((item, i) => (
     <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-white/10 pb-4 last:border-0 last:pb-0">
      <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
      <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
     </li>
    ))}
   </ul>
   <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10">
<AffiliateButton href="https://www.rentalcars.com/" text="Book Rental Car" variant="secondary" />
</div>
 </div>
 </div>
 <div className="mt-8 text-center text-slate-600 dark:text-slate-400">
  <Link href="/world-cup-2026-transportation-safety" className="text-emerald-600 dark:text-emerald-400 font-bold">Transport safety guide</Link>
  <span> for rideshare basics, avoiding scams, and late-night planning.</span>
 </div>
 </Section>

 <Section id="dining" title="Food & Drink">
 <div className="grid md:grid-cols-3 gap-8">
 {[
  { title: "Joe's Kansas City", desc: "World-famous BBQ in a gas station. The Z-Man sandwich is legendary. Expect a line, but it moves fast." },
  { title: "Q39", desc: "Competition-style BBQ in a rustic-chic setting. The burnt end burger and brisket are must-try items." },
  { title: "Arthur Bryant's", desc: "The 'King of Ribs'. Historic spot near the 18th & Vine Jazz District. Authentic and gritty." }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 shadow-lg border border-slate-200 dark:border-white/10 hover:-translate-y-2 transition-transform duration-300">
  <div className="w-12 h-12 rounded-full flex items-center justify-center text-emerald-600 mb-6">
  <Utensils className="w-6 h-6" />
  </div>
  <h4 className="font-bold text-xl mb-3">{item.title}</h4>
  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
 </div>
 ))}
 </div>
 <div className="mt-10 text-center text-slate-600 dark:text-slate-400">
  <Link href="/world-cup-2026-food-dining-guide" className="text-emerald-600 dark:text-emerald-400 font-bold">World Cup 2026 food guide</Link>
  <span> for restaurant strategy, timing, and what to eat in each host city.</span>
 </div>
 </Section>

 <Section id="attractions" title="Top Attractions">
 <p className="mb-8 text-xl text-slate-600 dark:text-slate-300">
 Beyond BBQ, Kansas City is known for its jazz heritage, fountains, and world-class museums.
 </p>
 <div className="space-y-6">
 {[
 { title: "National WWI Museum and Memorial", desc: "The only American museum dedicated solely to World War I. Stunning views from the tower.", color: "text-blue-500" },
 { title: "Nelson-Atkins Museum of Art", desc: "Renowned for its neoclassical architecture and extensive collection of Asian art. Free admission.", color: "text-emerald-500" },
 { title: "Negro Leagues Baseball Museum", desc: "A profound look at the history of African American baseball. Located in the historic 18th & Vine district.", color: "text-amber-500" }
 ].map((item, i) => (
 <div key={i} className="flex gap-6 items-center p-6 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-3xl transition-colors shadow-sm hover:shadow-md">
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
<AffiliateButton href="https://www.viator.com/Kansas-City/d5353-ttd" text="View All Attractions" variant="primary" />
</div>
 </Section>

 <Section id="itinerary" title="Day-by-Day Itineraries (Local-Approved)">
  <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
   <p>
    Kansas City rewards a little pacing. If you sprint from BBQ to brewery to stadium, you’ll miss the good parts—the little pocket parks, the live music drifting out of a doorway, the way people will genuinely stop and help you if you look lost.
   </p>
   <p>
    Here are two itineraries I give friends who are visiting for a big game.
   </p>
  </div>

  <div className="grid lg:grid-cols-2 gap-8">
   <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
    <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white">3-Day “Match in KC” Plan</h3>
    <div className="space-y-6 text-slate-700 dark:text-slate-300">
     <div>
      <h4 className="font-bold text-lg mb-2">Day 1: Land + Downtown Warm-Up</h4>
      <p>Check in Downtown or Crossroads. Ride the free streetcar up to River Market, grab a low-pressure meal, and end the night with jazz (you’ll sleep better than you think).</p>
     </div>
     <div>
      <h4 className="font-bold text-lg mb-2">Day 2: Museum + BBQ + Early Night</h4>
      <p>Do the National WWI Museum in the afternoon (it’s powerful). Dinner is BBQ—order burnt ends if you’ve never had them. Then: hydrate and get an early night. Yes, I’m your mom now.</p>
     </div>
     <div>
      <h4 className="font-bold text-lg mb-2">Day 3: Match Day</h4>
      <p>Leave your hotel earlier than you think you need to. Arrive 3–4 hours before kickoff if you want tailgating; if not, aim for 90 minutes pre-kick to get through security, find your seat, and breathe.</p>
     </div>
    </div>
    <div className="mt-8 flex flex-wrap gap-4">
     <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Kansas+City&nflt=district%3D2092" text="Stay Downtown" variant="primary" icon={Hotel} />
     <AffiliateButton href="https://www.viator.com/Kansas-City/d5353-ttd" text="Book Tours" variant="outline" icon={Camera} />
    </div>
   </div>

   <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
    <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white">5-Day “KC + Recovery” Plan</h3>
    <div className="space-y-6 text-slate-700 dark:text-slate-300">
     <div>
      <h4 className="font-bold text-lg mb-2">Day 1: River Market + Streetcar Orientation</h4>
      <p>Walk the City Market area, ride the streetcar end-to-end, and pick two spots you’ll return to. You’ll feel “local” faster.</p>
     </div>
     <div>
      <h4 className="font-bold text-lg mb-2">Day 2: Art + Crossroads Night</h4>
      <p>Spend the day around the Nelson-Atkins, then go back Downtown for dinner. Crossroads is your best bet for a night out that isn’t chaotic.</p>
     </div>
     <div>
      <h4 className="font-bold text-lg mb-2">Day 3: Match Day</h4>
      <p>Do the stadium, then don’t fight traffic immediately. Eat, decompress, and let the crowds drain.</p>
     </div>
     <div>
      <h4 className="font-bold text-lg mb-2">Day 4: Plaza Easy Day (Family-Friendly)</h4>
      <p>Sleep in. Wander the Plaza. If you’re traveling with kids, this is your recharge day—less walking, more shade, more predictable meals.</p>
     </div>
     <div>
      <h4 className="font-bold text-lg mb-2">Day 5: One Last KC Meal</h4>
      <p>Pick the thing you loved most and repeat it. That’s the KC trick: come back to a favorite, don’t chase a checklist.</p>
     </div>
    </div>
    <div className="mt-8 flex flex-wrap gap-4">
     <AffiliateButton href="https://www.opentable.com/kansas-city-restaurant-listings" text="Reserve Dinner" variant="primary" icon={Utensils} />
     <AffiliateButton href="https://www.worldnomads.com/" text="Travel Insurance" variant="outline" icon={Shield} />
    </div>
   </div>
  </div>
 </Section>

 <Section id="safety" title="Safety & Security">
   <div className="grid md:grid-cols-2 gap-8">
    <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
     <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> Event Patterns</h4>
     <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
      Kansas City’s main visitor zones—Downtown, Crossroads, River Market, and the Plaza—are generally comfortable for tourists, especially when areas are busy. The risk shows up when you’re <strong>alone on empty blocks late at night</strong>, or when you’re distracted in crowds (phone out, bag open, not paying attention).
     </p>
     <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
      If you’re new to KC, don’t “explore randomly” far east of Downtown at night. Plan your stops, use rideshare after midnight, and stick to well-lit corridors.
     </p>
     <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
      Use the <Link href="/world-cup-2026-safety-guide" className="text-emerald-600 dark:text-emerald-400 font-bold">World Cup 2026 safety guide</Link> for general crowd, transport, and nightlife precautions across host cities.
     </p>
    </div>
    <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
     <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Practical Tips</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>• Use official rideshare pickup zones and confirm the license plate before you get in.</li>
 <li>• Don’t leave anything visible in your car, even “just for a minute.”</li>
 <li>• In Westport and Downtown after midnight: travel in pairs and don’t argue with strangers—walk away and call a car.</li>
 <li>• Watch for unofficial parking sellers and “ticket helpers” outside the stadium. If it feels sketchy, it is.</li>
 <li>• Heat + open-air stadium: start hydrating in the morning, not at kickoff.</li>
 </ul>
 <div className="mt-6">
<AffiliateButton href="https://www.worldnomads.com/" text="Get Travel Insurance" variant="secondary" />
</div>
 </div>
 </div>
 </Section>

 <Section id="culture" title="Cultural Intelligence">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">
  Kansas City runs on friendly small talk, sports loyalty, and food opinions delivered like family advice. People will hold doors, apologize when <em>you</em> bump into <em>them</em>, and ask where you’re from—then actually listen. Tip like you mean it (18–22% at full-service spots is normal), and treat BBQ debates as a local handshake.
 </p>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { title: "Local Phrases (Quick Decode)", desc: "KCMO = Kansas City, Missouri. KCK = Kansas City, Kansas. “The Plaza” means Country Club Plaza. “Downtown” usually means the Loop + Power & Light. “Northland” is north of the river." },
 { title: "BBQ Customs", desc: "Order burnt ends at least once. Don’t drown everything in sauce on the first bite—taste the smoke, then sauce. Counter-service is normal, and messy is expected." },
 { title: "Jazz + Sports Energy", desc: "18th & Vine is the historic spine. Crossroads is the late-night groove. And yes—people talk about Arrowhead like it’s a living thing." }
 ].map((item, i) => (
 <div key={i} className="p-6 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl">
 <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
 </div>
 ))}
 </div>
 </Section>

 <Section id="packing" title="Climate & Packing">
   <div className="grid md:grid-cols-3 gap-6">
    <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
     <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Sun className="w-6 h-6 text-amber-500"/> June July Weather</h4>
     <p className="text-slate-600 dark:text-slate-400">
      Expect heat and humidity. Typical June highs are in the mid-80s°F (around 29°C) and July often reaches the upper-80s°F (around 31°C). Thunderstorms can roll in fast, and Arrowhead is open-air.
     </p>
    </div>
    <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
     <h4 className="font-bold text-xl mb-4">Essentials</h4>
     <ul className="space-y-2 text-slate-600 dark:text-slate-400">
      <li> Sunscreen + hat (Arrowhead has little shade)</li>
      <li> Light rain poncho (storms happen)</li>
      <li> Comfortable walking shoes (stadium lots are huge)</li>
      <li> Refillable water bottle for non-stadium days</li>
      <li> Ear protection for kids</li>
     </ul>
    </div>
    <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
     <h4 className="font-bold text-xl mb-4">Tech</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-6">
 <li>• US plug adapters (Type A/B)</li>
 <li>• Portable fan</li>
 <li>• eSIM with hotspot for rideshare + maps</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com/united-states-esim" text="Get an eSIM" variant="secondary" />
 </div>
 </div>
 <div className="mt-10 text-center text-slate-600 dark:text-slate-400">
  <Link href="/world-cup-2026-packing-guide" className="text-emerald-600 dark:text-emerald-400 font-bold">World Cup 2026 packing guide</Link>
  <span> covers stadium rules, weather layers, and what to bring for multi-city trips.</span>
 </div>
 </Section>

 <Section id="faq" title="Frequently Asked Questions">
 <div className="space-y-2">
 {[
 { q: "When are the World Cup matches in Kansas City?", a: "Kansas City hosts six matches: June 16, June 20, June 25, June 27 (Group Stage), July 3 (Round of 32), and July 11, 2026 (Quarterfinal). Kickoff times are in Central Time (CT)." },
 { q: "What stadium hosts World Cup 2026 in Kansas City?", a: "Matches are at GEHA Field at Arrowhead Stadium (Truman Sports Complex), 1 Arrowhead Dr, Kansas City, MO 64129. FIFA branding may refer to it as “Kansas City Stadium.”" },
 { q: "How do I get to Arrowhead without a car?", a: "There’s no rail line to the stadium. Your realistic options are rideshare, pre-booked shuttles if offered for the tournament, or joining a group transfer from Downtown." },
 { q: "Is the KC Streetcar free?", a: "Yes. The KC Streetcar is fare-free and is the easiest way to move around the Downtown core (River Market ↔ Downtown ↔ Crossroads ↔ Union Station/area)." },
 { q: "Where should I stay for the best World Cup experience?", a: "Downtown (Power & Light / Crossroads) is best for watch parties, walkability, and first-timers. The Plaza is best for a calmer, more upscale base. Stadium-area hotels are only worth it for pure matchday convenience." },
 { q: "How early should I arrive at the stadium?", a: "If you want tailgating, arrive 3–4 hours before kickoff. If you don’t, plan for 90 minutes pre-kick because the walk from lots/drop-off to gates takes time." },
 { q: "What’s the weather like during World Cup dates?", a: "Expect hot, humid days and occasional thunderstorms. Arrowhead is open-air, so plan for sun and rain on the same day." },
 { q: "Is Kansas City safe for visitors?", a: "In the main visitor areas (Downtown, Crossroads, River Market, Plaza), most travelers feel comfortable. Use rideshare late at night, avoid empty blocks, and keep valuables out of sight—especially in parked cars." },
 { q: "Where are the best fan zones and watch parties?", a: "Power & Light District is the most likely “big screen” hub. Get there early for marquee matches because capacity fills." },
 { q: "What BBQ should I prioritize if I only have one day?", a: "Go for the classics: Joe’s KC for the Z-Man, Q39 for a modern take, and Arthur Bryant’s for old-school KC history. Order burnt ends at least once." },
 { q: "What’s the easiest airport-to-downtown option?", a: "Fastest is rideshare or a rental car. Budget option: RideKC’s airport bus route connects KCI and Downtown (check the current schedule before you rely on it)." },
 { q: "Do I need travel insurance for a World Cup trip?", a: "If you’re traveling internationally, yes—medical costs in the U.S. can be brutal. Look for coverage for medical, trip delay, and interruption." },
 { q: "Kansas City, Kansas or Kansas City, Missouri—what’s the difference?", a: "They’re two different cities in two different states, connected as one metro. Most big visitor areas and the World Cup stadium are in Kansas City, Missouri (KCMO)." },
 { q: "How does tipping work in Kansas City?", a: "At full-service restaurants and bars, 18–22% is standard. For counter service, tipping is appreciated but more flexible." },
 { q: "What’s the best way to buy tickets?", a: "Start with FIFA’s official ticket platform. If you use resale, stick to reputable marketplaces and avoid social media DMs." }
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
 <li className="flex justify-between"><strong>Hospital</strong> <span>KU Medical Center</span></li>
 </ul>
 </div>
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Sun className="w-6 h-6 text-emerald-500"/> Connectivity</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6">
 <li>• <strong>WiFi:</strong> Free on Streetcar & MCI Airport.</li>
 <li>• <strong>Power:</strong> 120V, Type A/B plugs.</li>
 <li>• <strong>Sim Cards:</strong> Best to buy eSIM online.</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com/united-states-esim" text="Get an Airalo eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
        <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Explore Other Host Cities</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/world-cup-2026-new-york-new-jersey-guide" className="block p-4 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center font-bold text-slate-700 dark:text-slate-200">
            New York/New Jersey
          </Link>
          <Link href="/world-cup-2026-los-angeles-guide" className="block p-4 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center font-bold text-slate-700 dark:text-slate-200">
            Los Angeles
          </Link>
          <Link href="/world-cup-2026-mexico-city-guide" className="block p-4 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center font-bold text-slate-700 dark:text-slate-200">
            Mexico City
          </Link>
          <Link href="/world-cup-2026-toronto-guide" className="block p-4 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center font-bold text-slate-700 dark:text-slate-200">
            Toronto
          </Link>
          <Link href="/world-cup-2026-dallas-guide" className="block p-4 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center font-bold text-slate-700 dark:text-slate-200">
            Dallas
          </Link>
          <Link href="/world-cup-2026-miami-guide" className="block p-4 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center font-bold text-slate-700 dark:text-slate-200">
            Miami
          </Link>
          <Link href="/world-cup-2026-seattle-guide" className="block p-4 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center font-bold text-slate-700 dark:text-slate-200">
            Seattle
          </Link>
          <Link href="/world-cup-2026-boston-guide" className="block p-4 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center font-bold text-slate-700 dark:text-slate-200">
            Boston
          </Link>
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
