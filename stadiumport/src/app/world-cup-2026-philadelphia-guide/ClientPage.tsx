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
 Smartphone, Bookmark, X, ChevronRight, Facebook, Twitter, Linkedin, Copy
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
   { id: 'overview', label: 'Quick Start' },
   { id: 'matchday', label: 'Match Day' },
   { id: 'neighborhoods', label: 'Neighborhoods' },
   { id: 'hotels', label: 'Hotels' },
   { id: 'transport', label: 'Transport' },
   { id: 'itineraries', label: 'Itineraries' },
   { id: 'dining', label: 'Food & Drink' },
   { id: 'attractions', label: 'Things To Do' },
   { id: 'hidden-gems', label: 'Hidden Gems' },
   { id: 'weather', label: 'Weather' },
   { id: 'safety', label: 'Safety' },
   { id: 'culture', label: 'Culture' },
   { id: 'phrases', label: 'Local Phrases' },
   { id: 'family', label: 'Family' },
   { id: 'nightlife', label: 'Nightlife' },
   { id: 'budget', label: 'Budget' },
   { id: 'tickets', label: 'Tickets' },
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
 <div className="relative h-[65vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
 <div className="absolute inset-0 z-0">
 <Image 
 src="/images/cities/philadelphia-world-cup-2026-1600.webp" 
 alt="Philadelphia Skyline" 
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
             { label: 'Philadelphia', href: '/world-cup-2026-philadelphia-guide' }
           ]} 
         />

<motion.div
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
>
<div className="flex items-center gap-4 mb-6">
           <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
             Last Updated: January 7, 2026
           </span>
           <span className="px-3 py-1 rounded-full border border-white/30 text-white text-xs font-medium tracking-widest uppercase backdrop-blur-md">
             Host City
           </span>
<span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
Round of 16 Host (July 4)
</span>
</div>
 
<h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
Philadelphia World Cup 2026 Guide
</h1>
<p className="text-base md:text-lg lg:text-xl text-white/90 font-light max-w-3xl leading-relaxed">
I’ve lived here long enough to remember the Vet, argue about cheesesteaks like it’s a constitutional right, and still get goosebumps walking into the Sports Complex on a big night. Let’s make your Philly trip smooth, loud, and ridiculously fun.
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

 <Section id="overview" title="Quick Start (Read This First)">
   <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
     <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
       Philly is easy to “do right” if you make one smart decision up front: <strong>sleep in Center City or Old City</strong>, then take <strong>one train</strong> to the stadium. That’s it. You’ll spend less time in traffic, eat better, and you’ll actually feel the city instead of staring at taillights on I-95.
     </p>
     <div className="mt-8 grid md:grid-cols-2 gap-6">
       <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
         <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">The “Do This, Not That” Philly Play</h3>
         <ul className="space-y-3 text-slate-700 dark:text-slate-300">
           <li className="flex gap-3"><span className="text-emerald-500 font-black">Do:</span> Stay near City Hall, Rittenhouse, Old City, or Washington Square.</li>
           <li className="flex gap-3"><span className="text-emerald-500 font-black">Do:</span> Ride SEPTA Broad Street Line to <strong>NRG Station</strong>.</li>
           <li className="flex gap-3"><span className="text-emerald-500 font-black">Not:</span> Rent a car “just in case” if you’re only here for matches.</li>
           <li className="flex gap-3"><span className="text-emerald-500 font-black">Not:</span> Rely on rideshare after the final whistle unless you enjoy surge pricing as a sport.</li>
         </ul>
       </div>
       <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
         <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">2-Minute Match-Day Answer</h3>
         <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
           <strong>From Center City:</strong> take the Broad Street Line (B) south to NRG Station, walk 5–10 minutes, and you’re at Lincoln Financial Field. SEPTA’s current Metro fare is listed as <strong>$2.90 per trip</strong> on its official fare page.
           <span className="ml-2">
             <a href="https://www.septa.org/fares/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-bold inline-flex items-center gap-1">
               SEPTA fares <ExternalLink className="w-4 h-4" />
             </a>
           </span>
         </p>
       </div>
     </div>
   </div>
   <div className="grid md:grid-cols-3 gap-8">
     {[
       { icon: MapPin, title: "Best Base (First-Timer)", text: "Center City: walkable, safest vibe for visitors, easiest one-train match plan." },
       { icon: Hotel, title: "Best Base (History)", text: "Old City / Society Hill: cobblestones, landmarks, and a quieter late-night feel." },
       { icon: Train, title: "Best Base (Transit Nerd)", text: "City Hall area: you’re on top of both major subway lines and regional rail." },
     ].map((item, i) => (
       <div key={i} className="p-8 rounded-[2rem] transition-colors">
         <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
         <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
         <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
       </div>
     ))}
   </div>
   <div className="mt-12 flex flex-wrap gap-4">
     <AffiliateButton href="https://www.skyscanner.com" text="Compare Flights to PHL" variant="secondary" icon={Plane} />
     <AffiliateButton href="https://www.booking.com" text="Lock a Center City Hotel" variant="primary" icon={Hotel} />
     <AffiliateButton href="https://www.worldnomads.com/" text="Get Trip Protection" variant="outline" icon={Shield} />
   </div>
 </Section>


 <Section id="budget" title="Budget Breakdown (Real Numbers)">
   <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
     <p className="text-xl text-slate-600 dark:text-slate-300">
       Philly can be surprisingly affordable for a major US city… until you hit a mega-event weekend. I’m going to give you realistic ranges so you can build a plan without guessing. All amounts below are <strong>per person, per day</strong> (not counting match tickets).
     </p>
     <p className="text-slate-600 dark:text-slate-300">
       Quick transit baseline: SEPTA lists Metro fares at <strong>$2.90 per trip</strong>, and a <strong>One Day Convenience Pass</strong> at <strong>$7.50</strong> on its fare page.
       <span className="ml-2">
         <a href="https://www.septa.org/fares/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-bold inline-flex items-center gap-1">
           Verify fares <ExternalLink className="w-4 h-4" />
         </a>
       </span>
     </p>
   </div>
   <div className="grid md:grid-cols-3 gap-8">
     {[
       {
         title: "Budget",
         items: [
           "Lodging: $80–$160 (hostel / basic private room, share with a friend)",
           "Food: $35–$60 (Reading Terminal + corner pizza + late-night pretzel)",
           "Local transport: $7.50 day pass or ~$12 in taps",
           "Extras: $10–$25 (museum donation, small souvenirs)",
         ],
       },
       {
         title: "Mid-Range",
         items: [
           "Lodging: $180–$320 (Center City hotel, split double room)",
           "Food: $70–$120 (one nice dinner + casual daytime)",
           "Local transport: $7.50 day pass + occasional rideshare",
           "Extras: $25–$60 (museum tickets, tours, cocktails)",
         ],
       },
       {
         title: "Luxury",
         items: [
           "Lodging: $350–$700+ (Rittenhouse / boutique, peak dates spike)",
           "Food: $150–$300 (chef-driven dining + great bars)",
           "Local transport: private transfers or rideshare comfort",
           "Extras: $75–$200 (experiences, premium tours, shopping)",
         ],
       },
     ].map((tier, i) => (
       <div key={i} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-2xl transition-all duration-300">
         <h4 className="font-black text-2xl mb-6 text-slate-900 dark:text-white">{tier.title}</h4>
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
   <div className="mt-10 flex flex-wrap gap-4">
     <AffiliateButton href="https://www.booking.com" text="Price-Check Hotels" variant="primary" icon={Hotel} />
     <AffiliateButton href="https://www.skyscanner.com" text="Price-Check Flights" variant="outline" icon={Plane} />
     <AffiliateButton href="https://www.viator.com" text="Browse Experiences" variant="secondary" icon={Briefcase} />
   </div>
 </Section>

 <Section id="matchday" title="Match Day at Lincoln Financial Field">
<LightboxImage 
src="/images/stadiums/lincoln-financial-field-philadelphia-world-cup-2026-1600.webp" 
alt="Lincoln Financial Field Interior" 
caption="Lincoln Financial Field, home of the Eagles and World Cup 2026."
/>
 
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 Philly doesn’t do “polite” sports. We do <em>full-throated</em>. Lincoln Financial Field (“The Linc”) sits in the South Philly Sports Complex with Citizens Bank Park and the Wells Fargo Center nearby, which means match day feels like a moving street party with jerseys from half the planet.
 </p>
 <p>
 Here’s the part visitors don’t believe until they see it: <strong>the subway really is the cheat code</strong>. You can be eating in Center City, hop on the Broad Street Line, and step out at NRG Station with thousands of fans doing the same happy march.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Key Features</h4>
 <ul className="space-y-4">
 {[
 { label: "Capacity", val: "69,328 (NFL configuration)" },
 { label: "Transit stop", val: "NRG Station (Broad Street Line)" },
 { label: "Setup", val: "Open-air (plan for heat/sun/rain)" },
 { label: "Local vibe", val: "Tailgates, chants, and loud pride" }
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
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Buy your return fare before the match if you’re using Quick Trip kiosks.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Arrive early: security lines get real in the last 45 minutes.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Tailgate etiquette: ask before joining a setup, bring something, and compliment the grill.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Post-match: linger 10–15 minutes, then walk to NRG for a calmer platform.</li>
 </ul>
 </div>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8">
   <div className="p-8 rounded-[2rem] border border-emerald-500/20">
     <p className="text-lg text-center font-medium text-emerald-800 dark:text-emerald-200">
       <strong>Best route:</strong> Broad Street Line (B) to <strong>NRG Station</strong>, then a short walk. SEPTA’s official fare page lists Metro at <strong>$2.90 per trip</strong>.
     </p>
     <div className="mt-6 text-center">
       <a href="https://www.septa.org/fares/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 dark:text-emerald-300 font-bold inline-flex items-center gap-2">
         Check SEPTA fares & passes <ExternalLink className="w-4 h-4" />
       </a>
     </div>
   </div>
   <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
     <h4 className="font-black text-2xl mb-4 text-slate-900 dark:text-white">Driving & Parking (Know the Rates)</h4>
     <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
       If you drive, use official parking and expect event pricing. Lincoln Financial Field’s parking page lists published rates such as <strong>$50 for regular vehicles at Eagles games</strong> (other events vary). World Cup pricing may differ, but this gives you a realistic baseline.
     </p>
     <a href="https://www.lincolnfinancialfield.com/parking/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-bold inline-flex items-center gap-2">
       Official parking page <ExternalLink className="w-4 h-4" />
     </a>
   </div>
 </div>
 
 <div className="mt-10 flex flex-wrap gap-4">
   <AffiliateButton href="https://www.amazon.com/s?k=clear+stadium+bag" text="Get a Clear Stadium Bag" variant="primary" />
   <AffiliateButton href="https://www.viator.com" text="Find Stadium & City Tours" variant="outline" icon={Camera} />
 </div>
 </Section>


 <Section id="neighborhoods" title="Neighborhoods (Where to Stay, Eat, and Live)">
   <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
     <p className="text-xl text-slate-600 dark:text-slate-300">
       Philly isn’t one “downtown.” It’s a bunch of neighborhoods with their own little rules. Pick the one that matches your energy and your sleep schedule.
     </p>
     <p className="text-slate-600 dark:text-slate-300">
       My local rule: if you’re in town for matches, choose a neighborhood that lets you get to the Broad Street Line quickly. That keeps your match day simple and your nights flexible.
     </p>
   </div>
 
   <div className="grid md:grid-cols-2 gap-8">
     {[
       {
         title: 'Center City (City Hall / Midtown Village)',
         vibe: 'Convenient, walkable, “first trip to Philly” easy.',
         stay: 'Best all-around hotel inventory and transit access.',
         eat: 'Reading Terminal Market, Chinatown, Midtown Village bars.',
         who: 'First-timers, groups, anyone doing multiple match days.',
         icon: MapPin,
       },
       {
         title: 'Old City + Society Hill',
         vibe: 'Historic, cobblestones, quieter nights (in a good way).',
         stay: 'Boutique hotels and classic Philly charm.',
         eat: 'Waterfront walks, cozy cocktails, old-school taverns.',
         who: 'History lovers, couples, early risers.',
         icon: Camera,
       },
       {
         title: 'Rittenhouse + Fitler Square',
         vibe: 'Polished, leafy, “I packed nicer shoes” Philly.',
         stay: 'Premium hotels and easy dining reservations.',
         eat: 'Great brunch, great cocktails, great people-watching.',
         who: 'Luxury travelers, food people, post-match celebrators.',
         icon: Star,
       },
       {
         title: 'Fishtown + Northern Liberties',
         vibe: 'Creative, loud (in the fun way), bar and restaurant heavy.',
         stay: 'Smaller inventory; book early if you want it.',
         eat: 'Some of the city’s best modern dining and breweries.',
         who: 'Nightlife, live music, “let’s stay out” energy.',
         icon: ThumbsUp,
       },
       {
         title: 'East Passyunk (South Philly)',
         vibe: 'Neighborhood Philly: food streets, locals, real-deal vibe.',
         stay: 'Limited hotels; excellent for apartments and food crawls.',
         eat: 'One of the best restaurant strips in the city.',
         who: 'Food-focused travelers who want authenticity over convenience.',
         icon: Utensils,
       },
       {
         title: 'University City',
         vibe: 'Museums, campuses, more space, easy day-time exploring.',
         stay: 'Solid hotels; good if you’re visiting institutions.',
         eat: 'International food, casual spots, coffee culture.',
         who: 'Families, museum lovers, folks doing a calmer pace.',
         icon: Users,
       },
     ].map((n, i) => (
       <div key={i} className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
         <div className="flex items-start justify-between gap-4 mb-6">
           <div>
             <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{n.title}</h3>
             <p className="mt-2 text-slate-600 dark:text-slate-400">{n.vibe}</p>
           </div>
           <n.icon className="w-10 h-10 text-emerald-500 shrink-0" />
         </div>
         <ul className="space-y-3 text-slate-700 dark:text-slate-300">
           <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span><strong>Stay:</strong> {n.stay}</li>
           <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span><strong>Eat/Drink:</strong> {n.eat}</li>
           <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span><strong>Best for:</strong> {n.who}</li>
         </ul>
       </div>
     ))}
   </div>
 
   <div className="mt-10 flex flex-wrap gap-4">
     <AffiliateButton href="https://www.booking.com/city/us/philadelphia.html" text="Browse Philly Hotels" variant="primary" icon={Hotel} />
     <AffiliateButton href="https://www.opentable.com" text="Reserve Popular Restaurants" variant="outline" icon={Utensils} />
   </div>
 </Section>
 
 <Section id="itineraries" title="Itineraries (Pre-Match, Match Day, Post-Match)">
   <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
     <p className="text-xl text-slate-600 dark:text-slate-300">
       I’m giving you two itineraries: one for people who want the “Philly greatest hits,” and another for people who want to eat like they live here. Both are built around the reality of match day: heat, crowds, and a subway ride that’s either your best friend or your worst enemy depending on timing.
     </p>
   </div>
 
   <div className="grid md:grid-cols-2 gap-8">
     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">3-Day “First Time in Philly”</h3>
       <div className="space-y-6 text-slate-700 dark:text-slate-300">
         <div>
           <div className="font-black text-emerald-600 dark:text-emerald-400 mb-2">Day 1 (Arrival + Warm-Up)</div>
           <div>Check in → Reading Terminal Market → sunset walk around City Hall and the Parkway → early night.</div>
         </div>
         <div>
           <div className="font-black text-emerald-600 dark:text-emerald-400 mb-2">Day 2 (Match Day)</div>
           <div>Late breakfast → hydrate + sunscreen → Broad Street Line to NRG Station → match → post-match: Center City or Xfinity Live! if you want to keep it going.</div>
         </div>
         <div>
           <div className="font-black text-emerald-600 dark:text-emerald-400 mb-2">Day 3 (History + Goodbye)</div>
           <div>Old City morning (Independence area) → coffee + souvenirs → head out via PHL Airport Line or 30th Street Station.</div>
         </div>
       </div>
     </div>
 
     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">5-Day “Eat + Explore Like a Local”</h3>
       <div className="space-y-6 text-slate-700 dark:text-slate-300">
         <div>
           <div className="font-black text-emerald-600 dark:text-emerald-400 mb-2">Day 1</div>
           <div>Fishtown dinner crawl + a brewery (sleep in, you’ll need it).</div>
         </div>
         <div>
           <div className="font-black text-emerald-600 dark:text-emerald-400 mb-2">Day 2</div>
           <div>Museum morning → Rocky Steps photo (yes, do it) → relaxed cocktails in Rittenhouse.</div>
         </div>
         <div>
           <div className="font-black text-emerald-600 dark:text-emerald-400 mb-2">Day 3 (Match Day)</div>
           <div>Easy day: shade, hydration, minimal walking → early subway → match → post-match food in South Philly if you’re not ready to sleep.</div>
         </div>
         <div>
           <div className="font-black text-emerald-600 dark:text-emerald-400 mb-2">Day 4</div>
           <div>Day trip vibe: Schuylkill River Trail + picnic, or a guided city tour if you want the stories without the planning.</div>
         </div>
         <div>
           <div className="font-black text-emerald-600 dark:text-emerald-400 mb-2">Day 5</div>
           <div>Brunch → last-minute shopping → airport/train.</div>
         </div>
       </div>
     </div>
   </div>
 
   <div className="mt-10 flex flex-wrap gap-4">
     <AffiliateButton href="https://www.viator.com" text="Book a Philly Tour" variant="secondary" icon={Briefcase} />
     <AffiliateButton href="https://www.citypass.com/philadelphia" text="Philadelphia CityPASS Deals" variant="primary" />
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
 { stage: "Round of 16", count: "1 Match (July 4th)", color: "text-amber-400" }
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
 Missed the draw? Trusted resale platforms offer verified tickets, though prices will be higher for high-demand matches like the July 4th game.
              </p>
              <AffiliateButton href="https://www.stubhub.com" text="Check StubHub" variant="primary" />
            </div>
 </div>
 </Section>

 <Section id="hotels" title="Where to Stay">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
   <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
     If you want the easiest World Cup experience in Philly, stay somewhere that makes the Broad Street Line effortless. In plain English: <strong>Center City wins</strong>. You get food, museums, bars, and a simple match plan.
   </p>
   <p className="text-slate-600 dark:text-slate-300">
     South Philly can be convenient for walking to the stadium, but hotel options are thinner. It’s great if you love the Sports Complex vibe and don’t mind being a little removed from the “classic Philly” sights.
   </p>
 </div>
 
 <div className="space-y-8">
 <HotelCard 
 name="The Logan Philadelphia"
 rating={4.4}
 price="$280 - $550"
 distance="20 min transit"
 features={['Museum District', 'Skyline Views', 'Great Base']}
 image="/images/cities/philadelphia-world-cup-2026.webp"
 link="https://www.booking.com"
 />
 <HotelCard 
 name="Loews Philadelphia Hotel"
 rating={4.4}
 price="$240 - $480"
 distance="15–20 min subway"
 features={['Center City', 'Easy Transit', 'Reliable']}
 image="/images/cities/philadelphia-world-cup-2026.webp"
 link="https://www.booking.com"
 />
 <HotelCard 
 name="Kimpton Hotel Monaco Philadelphia"
 rating={4.5}
 price="$220 - $450"
 distance="20–25 min transit"
 features={['Old City', 'Walkable History', 'Boutique']}
 image="/images/cities/philadelphia-world-cup-2026.webp"
 link="https://www.booking.com"
 />
 <HotelCard
   name="Hyatt Centric Center City Philadelphia"
   rating={4.3}
   price="$210 - $420"
   distance="15–20 min subway"
   features={['Center City', 'Modern', 'Walk Everywhere']}
   image="/images/cities/philadelphia-world-cup-2026.webp"
   link="https://www.booking.com"
 />
 <HotelCard
   name="Live! Casino & Hotel Philadelphia"
   rating={4.3}
   price="$260 - $520"
   distance="10–15 min walk"
   features={['Sports Complex', 'Late-Night Food', 'Convenient']}
   image="/images/cities/philadelphia-world-cup-2026.webp"
   link="https://www.booking.com"
 />
 </div>
 
 <div className="mt-12 text-center">
  <AffiliateButton href="https://www.booking.com/city/us/philadelphia.html" text="Search All Philadelphia Hotels" variant="outline" />
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
 <h4 className="font-bold text-xl mb-2">SEPTA (Subway)</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 SEPTA is your best friend. The Broad Street Line (B) runs directly from Center City (City Hall) to the stadium (NRG Station). SEPTA’s official fare page lists Metro fares at $2.90 per trip, with day passes available.
 <a href="https://www.septa.org/fares/" target="_blank" rel="noopener noreferrer" className="ml-2 text-emerald-600 dark:text-emerald-400 font-bold inline-flex items-center gap-1">
   Fares <ExternalLink className="w-4 h-4" />
 </a>
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
 Philadelphia International (PHL) is close to the city. The SEPTA Airport Line train brings you to Center City stations (30th Street/Suburban/Jefferson). PHL’s official public transportation page notes trains run about every 30 minutes and lists an example fare of $6.75 when purchased at the kiosk vs $8 onboard (verify before travel).
 <a href="https://www.phl.org/getting-around/public-transportation" target="_blank" rel="noopener noreferrer" className="ml-2 text-emerald-600 dark:text-emerald-400 font-bold inline-flex items-center gap-1">
   PHL transit info <ExternalLink className="w-4 h-4" />
 </a>
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
 Traffic on I-95 is notorious. Avoid renting a car if you are staying in Center City. Uber/Lyft are available but prices surge on match days.
 </p>
 </div>
 </div>
 </div>
 
 <div className=" rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 h-fit">
 <h4 className="font-bold text-2xl mb-6">Distance to Stadium</h4>
 <ul className="space-y-6">
 {[
 { label: "Center City", time: "15 min subway" },
 { label: "Old City", time: "20 min subway" },
 { label: "University City", time: "25 min transit" },
 { label: "Airport (PHL)", time: "15 min drive" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
 <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
 </li>
 ))}
 </ul>
 <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <AffiliateButton href="https://www.viator.com/Philadelphia-transfers/d906-g15" text="Book Airport Transfer" variant="secondary" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="dining" title="Food & Drink">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Cheesesteaks (Order Like You Mean It)", desc: "Tourist corners are loud and fun, but locals chase the neighborhood shops. If someone says “wit,” they mean onions. Don’t overthink it—just commit." },
 { title: "Reading Terminal Market (The Ultimate Food Shortcut)", desc: "If you only have one free hour, spend it here. Go early to dodge crowds, walk a full loop first, then decide. You’ll thank me later." },
 { title: "South Philly Sandwich Culture", desc: "Hoagies, roast pork, cutlets—this is the true local religion. Grab one before the match, split it with a friend, and suddenly you’re from here." }
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
   <AffiliateButton href="https://www.opentable.com" text="Book Dinner Reservations" variant="primary" icon={Utensils} />
   <AffiliateButton href="https://www.viator.com" text="Food Tours & Tastings" variant="outline" icon={MapPin} />
 </div>
 </Section>

 <Section id="attractions" title="Top Attractions">
 <p className="mb-8 text-xl text-slate-600 dark:text-slate-300">
 Philadelphia is the birthplace of the nation. Most historic sites are in Old City, while the Art Museum anchors the Parkway.
 </p>
 <div className="space-y-6">
 {[
 { title: "Independence Hall", desc: "Birthplace of the USA. See where the Declaration of Independence and Constitution were signed.", color: "text-emerald-500" },
 { title: "Liberty Bell", desc: "Iconic symbol of American freedom. Free to view in the pavilion near Independence Hall.", color: "text-amber-500" },
 { title: "Rocky Steps (Art Museum)", desc: "Run up the 72 stone steps and pose with the Rocky statue. A classic Philly moment.", color: "text-blue-500" }
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
 <AffiliateButton href="https://www.citypass.com/philadelphia" text="Get Philadelphia CityPASS (Save 40%)" variant="primary" />
 </div>
 </Section>

 <Section id="hidden-gems" title="Hidden Gems Locals Actually Use">
   <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
     <p className="text-xl text-slate-600 dark:text-slate-300">
       If you do the Liberty Bell and the Rocky Steps, you’re doing Philly correctly. But if you want the “I can’t believe I almost missed this” moments, this is where they live.
     </p>
   </div>
   <div className="grid md:grid-cols-3 gap-8">
     {[
       { title: 'Magic Gardens (South Street)', desc: 'A mosaic maze that feels like walking inside a folk art daydream. Go early on weekends.', icon: Star },
       { title: 'Bartram’s Garden', desc: 'Riverside green space with a calm, local feel—perfect for a decompression walk after crowds.', icon: Sun },
       { title: 'Schuylkill Banks + River Trail', desc: 'Sunset stroll, skyline views, runners and cyclists. It’s our unofficial “reset button.”', icon: Bike },
       { title: 'Italian Market Area', desc: 'Not just a market—this is a whole neighborhood that smells like coffee, bread, and grill smoke.', icon: Utensils },
       { title: 'Washington Square Park', desc: 'Quiet Old City pocket where you can sit, breathe, and listen to the city without the chaos.', icon: MapPin },
       { title: 'The Navy Yard (Daytime)', desc: 'A different side of Philly—wide streets, modern spaces, and a surprisingly peaceful waterfront.', icon: Briefcase },
     ].map((item, i) => (
       <div key={i} className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
         <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
         <h4 className="font-black text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
         <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
       </div>
     ))}
   </div>
 </Section>

 <Section id="weather" title="Weather in World Cup Season (June–July)">
   <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
     <p className="text-xl text-slate-600 dark:text-slate-300">
       Philly summers are a mood: bright, sticky, and occasionally interrupted by a thunderstorm that shows up uninvited and then disappears like nothing happened. Lincoln Financial Field is open-air, so plan for sun and heat.
     </p>
     <p className="text-slate-600 dark:text-slate-300">
       For official references, start with NOAA/NWS climate resources and current forecasts close to travel.
       <span className="ml-2">
         <a href="https://www.ncei.noaa.gov/access/us-climate-normals/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-bold inline-flex items-center gap-1">
           NOAA climate normals <ExternalLink className="w-4 h-4" />
         </a>
       </span>
     </p>
   </div>
    <div className="grid md:grid-cols-3 gap-6">
      <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
        <h4 className="font-black text-xl mb-4 flex items-center gap-2"><Sun className="w-6 h-6 text-amber-500"/> What It Feels Like</h4>
        <p className="text-slate-600 dark:text-slate-400">
        Hot and humid. NOAA 1991–2020 normals at Philadelphia International Airport put average daily max temperatures around <strong>83°F in June</strong> and <strong>88°F in July</strong>, with monthly precipitation averaging <strong>4.04 inches (June)</strong> and <strong>4.38 inches (July)</strong>. Heat waves can push afternoons into the 90s.
        </p>
      </div>
     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h4 className="font-black text-xl mb-4">Pack For Heat + Rain</h4>
       <ul className="space-y-2 text-slate-600 dark:text-slate-400">
         <li>• Sunscreen + hat (you’ll use them)</li>
         <li>• Light rain shell or poncho</li>
         <li>• Comfortable sneakers (Philly is a walking city)</li>
         <li>• Refillable bottle + electrolytes</li>
       </ul>
     </div>
     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
       <h4 className="font-black text-xl mb-4">Stay Connected</h4>
       <p className="text-slate-600 dark:text-slate-400 mb-6">
         Crowds + heat + navigation = your phone working overtime. A big data plan and a power bank make match day calmer.
       </p>
       <AffiliateButton href="https://www.airalo.com/united-states-esim" text="Grab a US eSIM" variant="secondary" icon={Smartphone} />
     </div>
   </div>
 </Section>

 <Section id="safety" title="Safety & Security">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> Event Patterns</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Center City and Old City are generally safe. The Sports Complex is very safe on game days. Stick to main streets and well-lit areas at night.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Practical Tips</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>• Be aware of your surroundings on the subway.</li>
 <li>• Use rideshare pickup zones; avoid unofficial touts.</li>
 <li>• Save local emergency contacts offline.</li>
 </ul>
 <div className="mt-6">
 <AffiliateButton href="https://www.worldnomads.com/" text="Get Travel Insurance" variant="secondary" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="culture" title="Cultural Intelligence">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">Philly is gritty, proud, and passionate. Fans are intense but welcoming if you respect the game. Tipping is standard 18–22%.</p>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { title: "Fan Zones", desc: "Expect massive activations near the Art Museum and Independence Mall." },
 { title: "Dining Etiquette", desc: "Reservations essential for weekends. 'Whiz wit' is how you order a cheesesteak with Cheez Whiz and onions." },
 { title: "Nightlife Rhythm", desc: "Old City and Fishtown bars fill up. Last calls are at 2 AM." }
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
 <p className="text-slate-600 dark:text-slate-400">Hot and humid outdoors. NOAA normals put average highs around 83°F (June) to 88°F (July), with roughly 4.0–4.4 inches of rain per month. Stadium is open-air, so dress for the heat.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Essentials</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400">
 <li>• Water-resistant RFID wallet</li>
 <li>• Clear stadium bag</li>
 <li>• Portable power bank</li>
 </ul>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Tech</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-6">
 <li>• US plug adapters (Type A/B)</li>
 <li>• Offline maps</li>
 <li>• eSIM with hotspot</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com/united-states-esim" text="Get an eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <Section id="faq" title="Frequently Asked Questions">
 <div className="space-y-2">
 {[
 { q: "Where is the stadium located?", a: "Lincoln Financial Field is located in the South Philadelphia Sports Complex, accessible via the Broad Street Line subway." },
 { q: "Is Philadelphia safe for tourists?", a: "Center City and Old City are generally safe. The Sports Complex is safe on game days. As in any big city, stay aware of your surroundings." },
 { q: "Do I need a car in Philadelphia?", a: "If you are staying in Center City, NO. SEPTA is efficient and walking distance covers most historic sites. Parking is expensive." },
 { q: "What is the weather like in June/July?", a: "Hot and humid. NOAA normals put average highs around 83°F (June) to 88°F (July), but heat waves can push afternoons into the 90s. The stadium is open-air, so prepare for sun and heat." },
 { q: "How far is the airport from the stadium?", a: "About 10-15 minutes by car. By train, take the Airport Line to Center City, then the Broad Street Line south to the stadium." },
 { q: "Which area should I stay in?", a: "Center City for history/dining; South Philly for stadium proximity; Old City for historic charm." },
 { q: "Can I bring a bag to the stadium?", a: "Yes, clear stadium-approved bags only. Small sealed water bottles typically allowed; check matchday policies." },
 { q: "How early should I arrive for matches?", a: "Aim for 90 minutes before kickoff to enjoy pre-game atmosphere and avoid peak security queues." },
 { q: "Is the stadium air-conditioned?", a: "No, Lincoln Financial Field is an open-air stadium. There are climate-controlled club areas, but most seats are exposed." },
 { q: "What’s the best way to get from the airport?", a: "Take the SEPTA Airport Line to Center City (Jefferson Station), then transfer to the Broad Street Line (Orange) to NRG Station." },
 { q: "Where can I watch matches if I don’t have tickets?", a: "Fan zones near Independence Mall and bars in Center City/South Philly will host screenings." },
 { q: "Are restaurants close to the stadium?", a: "Xfinity Live! is right next door. For more variety, head to Center City or Passyunk Avenue." },
 { q: "Do I need travel insurance?", a: "Highly recommended for medical and trip protections. It’s inexpensive peace of mind for major events." },
 { q: "What mobile connectivity works best?", a: "An eSIM with a generous data bundle and hotspot support is ideal. US plugs are Type A/B." },
 { q: "How do I avoid rideshare surge pricing?", a: "Take the subway (Broad Street Line) instead. It's faster and much cheaper on game days." },
 { q: "Where can I buy souvenirs?", a: "Team stores inside the stadium and shops in Center City carry official merchandise." }
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
 <li className="flex justify-between"><strong>Hospital</strong> <span>Jefferson University Hospital</span></li>
 </ul>
 </div>
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-emerald-500"/> Connectivity</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6">
 <li>• <strong>WiFi:</strong> Free at PHL Airport & Stadium.</li>
 <li>• <strong>Power:</strong> 120V, Type A/B plugs.</li>
 <li>• <strong>Sim Cards:</strong> Kiosks at PHL Arrivals.</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com/united-states-esim" text="Get an Airalo eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Explore Other Host Cities</h3>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {['New York/New Jersey', 'Los Angeles', 'Mexico City', 'Toronto', 'Dallas', 'Miami', 'Seattle', 'Boston'].map((city) => (
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



