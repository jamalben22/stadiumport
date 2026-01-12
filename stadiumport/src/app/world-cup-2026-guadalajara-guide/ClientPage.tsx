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
  X, ChevronRight, Facebook, Twitter, Linkedin, Copy
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
    const text = "Check out this Guadalajara World Cup 2026 Guide!";
    
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
      <div className="bg-white/50 dark:bg-slate-50 dark:bg-slate-900/50 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col gap-3">
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
    outline: "border-2 border-slate-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-900 dark:text-white bg-transparent"
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
 { id: 'neighborhoods', label: 'Neighborhoods' },
 { id: 'stadium', label: 'Stadium' },
 { id: 'tickets', label: 'Tickets' },
 { id: 'hotels', label: 'Hotels' },
 { id: 'transport', label: 'Transport' },
 { id: 'dining', label: 'Dining' },
 { id: 'attractions', label: 'Attractions' },
 { id: 'itineraries', label: 'Itineraries' },
 { id: 'tips', label: 'Match Day' },
 { id: 'safety', label: 'Safety' },
 { id: 'culture', label: 'Culture' },
 { id: 'language', label: 'Language' },
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
        src="/images/cities/guadalajara-world-cup-2026-1600.webp" 
        alt="Guadalajara Skyline" 
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
                    { label: 'Guadalajara', href: '/world-cup-2026-guadalajara-guide' }
                  ]} 
                />

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
              Last Updated: January 7, 2026
            </span>
            <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
              Host City
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
              Group Stage Host
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
            Guadalajara <span className="block">World Cup 2026 Guide</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
            A local-first matchweek playbook for Estadio Akron: where to stay, how to move, what to eat, and how to actually enjoy Guadalajara between fixtures.
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
 You feel Guadalajara before you see it. The scent of wet earth after a summer shower. Tortillas puffing on a comal. Mariachi trumpets ricocheting off colonial stone. I’ve lived here long enough to measure time by little rituals: the first rains of June, the way the city empties during a Chivas match, the exact moment a quiet dinner on Chapultepec turns into a street-wide celebration.
 </p>
 <p>
 This <strong>Guadalajara World Cup 2026 guide</strong> is the version I’d hand my cousins from abroad: where to base yourself (and why), the fastest matchday routes to <strong>Estadio Akron</strong>, the neighborhoods that feel “right” depending on your vibe, and the small local hacks that save you time, money, and headaches.
 </p>
 <p>
 One big truth up front: Guadalajara is not a “walk from your hotel to the stadium” host city. Estadio Akron sits out west in Zapopan. That’s not a problem—it just means your trip gets better when you choose your base with stadium logistics in mind, not just pretty photos of Centro.
 </p>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: MapPin, title: "Where to Base", text: "For easiest matchday: Zapopan (Andares / Puerta de Hierro) or Vallarta Poniente. For nightlife: Colonia Americana + Chapultepec. For museums: Centro + Tlaquepaque." },
            { icon: Train, title: "Transport Strategy", text: "Use Mi Movilidad transit where it fits, then rideshare strategically. The best trick is timing: arrive early, leave late, and let traffic burn off." },
            { icon: DollarSign, title: "Budget Reality", text: "Compared to USA/Canada host cities, Guadalajara still feels like a deal. Your big swing costs are hotels on match weeks and rideshare surge after games." }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 transition-all duration-300 hover:shadow-xl">
              <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
              <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
            </div>
          ))}
 </div>
 <div className="mt-12 p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50">
 <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Quick Answers (Read This First)</h3>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-lg">
 <li><strong>Best area to stay for Estadio Akron:</strong> Zapopan (Andares/Puerta de Hierro) or Vallarta Poniente.</li>
 <li><strong>Best nightlife base:</strong> Colonia Americana + Avenida Chapultepec (walkable bars, patios, late nights).</li>
 <li><strong>Best family base:</strong> Providencia or Chapalita (calmer streets, good parks, easy taxis).</li>
 <li><strong>Public transit move for matchday:</strong> Mi Macro Periférico to the Estadio Chivas stop, then follow the crowd.</li>
 <li><strong>Weather surprise people forget:</strong> June–July storms. Pack a light rain layer and quick-dry shoes.</li>
 </ul>
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
            <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/gdl" text="Compare Flights to GDL" variant="secondary" icon={Plane} />
            <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Zapopan" text="Find Matchweek Hotels in Zapopan" variant="primary" icon={Hotel} />
            <AffiliateButton href="https://www.worldnomads.com/" text="Get Travel Insurance" variant="outline" icon={Shield} />
            <AffiliateButton href="https://fifaworldcup26.hospitality.fifa.com/us/en" text="Explore Official Hospitality" variant="outline" icon={Star} />
          </div>
          <div className="mt-10 flex flex-wrap gap-4 text-sm">
            <Link href="/world-cup-2026-mexico-city-guide" className="inline-flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors">
              Pair It With Mexico City <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/world-cup-2026-monterrey-guide" className="inline-flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors">
              Or Monterrey <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/world-cup-2026-groups/group-a" className="inline-flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors">
              Follow Group A Strategy <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Section>

 <Section id="visa" title="Visa & Entry (Mexico)">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2rem]">
              <h4 className="font-bold text-2xl mb-4">Who Needs a Visa?</h4>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
                Mexico is visa-free for many passport holders for tourism, but entry rules depend on your nationality and the length/purpose of your stay. The smartest move is to check official guidance for your passport and keep your plans simple: tourism, clear hotel/flight details, and a passport valid for your entire trip.
              </p>
              <div className="text-slate-600 dark:text-slate-400 text-lg">
                <a href="https://www.inm.gob.mx/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-emerald-600 hover:text-emerald-500">
                  INM (Mexico Immigration) <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="p-8 border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2rem]">
              <h4 className="font-bold text-2xl mb-4">Arrival Tips</h4>
              <ul className="space-y-4 mb-8">
                {[
                  'Your allowed stay length is set by immigration on arrival—check your passport stamp/receipt.',
                  'Airports use digital FMMD / e-gates in many cases—save the receipt/QR for your records.',
                  'Declare large amounts of cash when entering any country, and don’t travel with anything you can’t explain.',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <AffiliateButton href="https://www.worldnomads.com/" text="Buy Travel Insurance" variant="secondary" />
                <a href="https://travel.state.gov/content/travel/en/traveladvisories/traveladvisories/mexico-travel-advisory.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-emerald-600 hover:text-emerald-500 px-6 py-4 rounded-full border border-slate-200 dark:border-white/10">
                  Entry Details (FMMD) <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </Section>

 <Section id="planning" title="Planning Timeline">
          <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Guadalajara planning is a game of timing. The city is easy when you’re early and impossible when you’re late. Build your trip around two pressure points: <strong>hotel inventory</strong> (Zapopan fills first) and <strong>matchday transport</strong> (the stadium is outside the center).
            </p>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Also: Guadalajara is on FIFA’s calendar before the tournament starts—FIFA announced the <strong>World Cup 2026 Play-Off Tournament</strong> will be hosted in Guadalajara and Monterrey in <strong>March 2026</strong>. <a href="https://inside.fifa.com/media-releases/mexico-guadalajara-monterrey-world-cup-2026-play-off-tournament" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-500 font-bold">Source <ExternalLink className="w-4 h-4" /></a>
            </p>
          </div>

          <div className="relative border-l-2 border-emerald-500/30 pl-8 ml-4 space-y-12">
            {[
              { time: "9–12 Months Out", title: "Lock Your Base", desc: "Book refundable rooms in Zapopan (Andares/Vallarta Poniente) first, then decide how much Centro you want. Location beats room size on match weeks." },
              { time: "6–9 Months Out", title: "Tickets & Alerts", desc: "Register for FIFA ticket updates, and decide whether you want official hospitality (less stress, more cost) or standard seats." },
              { time: "3–6 Months Out", title: "Build Your Non-Match Plan", desc: "Tequila (the town), Tlaquepaque evenings, and weekend reservations fill up fast in summer." },
              { time: "1–3 Months Out", title: "Matchday Logistics Drill", desc: "Save your stadium route, choose a pickup point for rideshare, and buy a compact rain layer. If you’re in a group, pick one meetup café per neighborhood." }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-900" />
                <span className="text-emerald-600 font-bold tracking-wider text-sm uppercase">{item.time}</span>
                <h4 className="text-xl font-bold mt-1 mb-2">{item.title}</h4>
                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
            <div className="flex gap-4 pt-4">
              <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/gdl" text="Set Flight Alerts" variant="primary" icon={Plane} />
              <AffiliateButton href="https://www.fifa.com/en/tickets" text="FIFA Ticket Updates" variant="secondary" icon={Ticket} />
              <AffiliateButton href="https://www.viator.com/Guadalajara/d5366-ttd" text="Reserve Experiences" variant="outline" />
            </div>
          </div>
        </Section>

        <Section id="budget" title="Budget Tiers (Reality Check)">
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Guadalajara can be wildly affordable or quietly expensive—it depends on two choices: <strong>where you sleep</strong> (Zapopan matchweek prices climb) and <strong>how you move</strong> (rideshare at peak hours adds up fast).
            </p>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              I recommend budgeting in <strong>MXN</strong> on the ground. Your “small costs” (tacos, coffee, transit) feel light; your “big costs” (hotels, VIP packages, last-minute transport) are what bite.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Smart Saver", items: ["Hostel or simple hotel outside the hottest zones", "Street food + mercados + one sit-down meal", "Mi Movilidad transit when it fits your route"] },
              { title: "Comfort Upgrades", items: ["Mid-range hotel in Americana / Providencia", "Two great meals per day, plus coffee runs", "Uber/DiDi for evenings and time-critical moments"] },
              { title: "Premium", items: ["Luxury in Andares / Puerta de Hierro or top boutique", "Private tours (Tequila, Chapala) and reservations", "Official hospitality and private transfers"] }
            ].map((tier, i) => (
              <div key={i} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 hover:shadow-2xl transition-all duration-300">
                <h4 className="font-bold text-xl mb-6 text-slate-900 dark:text-white">{tier.title}</h4>
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

          <div className="mt-10 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-50 dark:bg-slate-900/50">
            <h4 className="font-bold text-2xl mb-4 text-slate-900 dark:text-white">Fast Cost Benchmarks (MXN)</h4>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-lg">
              <li>
                • <strong>Mi Macro Periférico fare:</strong> $9.50 MXN.{' '}
                <a href="https://mimacro.jalisco.gob.mx/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-500 font-bold">
                  Source <ExternalLink className="w-4 h-4" />
                </a>
              </li>
              <li>
                • <strong>Transfers:</strong> 50% discount applies on certain connections when paying with <strong>Tarjeta Mi Movilidad</strong>.{' '}
                <a href="https://mimacro.jalisco.gob.mx/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-500 font-bold">
                  Source <ExternalLink className="w-4 h-4" />
                </a>
              </li>
              <li>• <strong>Matchweek hotels:</strong> book early, choose location over “extras”.</li>
              <li>• <strong>After-match rideshare:</strong> surge pricing is normal—build a 30–60 minute buffer.</li>
            </ul>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <AffiliateButton href="https://www.expedia.com/Guadalajara-Vacation-Packages.d1416.Travel-Guide-Packages" text="Bundle Flights + Hotels" variant="secondary" icon={Briefcase} />
              <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Guadalajara" text="Compare Hotel Deals" variant="primary" icon={Hotel} />
            </div>
          </div>
        </Section>

 <Section id="neighborhoods" title="Neighborhood-by-Neighborhood (Local Read)">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p className="text-xl text-slate-600 dark:text-slate-300">
 Guadalajara is really a network of neighborhoods with different personalities. The mistake visitors make is picking a base that looks central on a map and then spending match week trapped in traffic. Pick your vibe first, then sanity-check stadium access.
 </p>
 <p className="text-xl text-slate-600 dark:text-slate-300">
 Below is how locals explain the city to friends: where you’ll actually sleep well, where you’ll actually find good food without a 45-minute ride, and where you’ll want to be when the streets turn into one big football conversation.
 </p>
 </div>

 <div className="grid lg:grid-cols-2 gap-8">
 {[
 {
 title: 'Zapopan: Andares / Puerta de Hierro',
 vibe: 'Upscale, modern, efficient. Best logistics for Estadio Akron.',
 stay: 'Best for: first-time visitors who hate stress and love convenience.',
 eat: 'High-end dining, malls, polished cafés.',
 drink: 'Hotel bars, cocktails, “nice night out” energy.',
 explore: 'Andares, upscale shopping, easy taxis.',
 bestFor: 'Luxury, families, “walk less, plan less.”',
 matchday: 'Closest big hotel cluster to the stadium; easiest exits.',
 },
 {
 title: 'Vallarta Poniente / Ciudad Granja',
 vibe: 'Practical and stadium-adjacent without being stuck in the middle of nowhere.',
 stay: 'Best for: match-first trips and groups who want value.',
 eat: 'Solid chains and local spots along Vallarta; easy delivery.',
 drink: 'Pre-game beers, then head to Americana if you want nightlife.',
 explore: 'Quick access to the stadium corridor.',
 bestFor: 'Budget-to-mid, matchday convenience.',
 matchday: 'Strong base if you want shorter rides and earlier arrivals.',
 },
 {
 title: 'Colonia Americana + Avenida Chapultepec',
 vibe: 'Trendy, loud, social. The city’s “we’re going out” zone.',
 stay: 'Best for: nightlife and walkability between bars/restaurants.',
 eat: 'Modern Mexican, coffee culture, late-night tacos.',
 drink: 'Patios, cocktail bars, music—this is where match nights spill out.',
 explore: 'Design shops, galleries, street life.',
 bestFor: 'Friends trips, couples, solo travelers who want energy.',
 matchday: 'Great vibe, but plan your stadium transport early.',
 },
 {
 title: 'Providencia (and nearby)',
 vibe: 'Leafy, comfortable, quietly upscale.',
 stay: 'Best for: families, long stays, people who want calmer nights.',
 eat: 'Excellent neighborhood restaurants; less “tourist theater”.',
 drink: 'Wine bars and calm spots over clubbing.',
 explore: 'Parks, shopping pockets, easy access to many parts of the city.',
 bestFor: 'Families, comfort, slower pace.',
 matchday: 'Balanced: not closest, not far—good if you’re doing more than football.',
 },
 {
 title: 'Centro Histórico',
 vibe: 'Cathedrals, plazas, murals, history. Gorgeous by day.',
 stay: 'Best for: culture-first travelers who plan early nights.',
 eat: 'Markets and classic spots; fewer “late-late” dining options.',
 drink: 'Classic cantinas, but nightlife is thinner than Americana.',
 explore: 'Hospicio Cabañas, Cathedral, plazas and museums.',
 bestFor: 'History lovers, photographers, day walkers.',
 matchday: 'Longer stadium ride; leave very early on matchday.',
 },
 {
 title: 'Tlaquepaque (San Pedro Tlaquepaque)',
 vibe: 'Artisanal, romantic, mariachi-friendly evenings.',
 stay: 'Best for: a quieter base with a strong “Mexico” feel.',
 eat: 'Great traditional dining and sweets; lively evenings.',
 drink: 'Perfect for a slow dinner that turns into a serenade.',
 explore: 'Craft shops, galleries, strolling streets.',
 bestFor: 'Couples, culture, food-focused trips.',
 matchday: 'Further from the stadium; pair it with non-match days.',
 },
 {
 title: 'Chapalita',
 vibe: 'Residential, parks, calm streets.',
 stay: 'Best for: families and travelers who want a local routine.',
 eat: 'Local cafés, bakeries, neighborhood dining.',
 drink: 'Low-key bars; less late-night chaos.',
 explore: 'Roundabouts, parks, a “living city” feel.',
 bestFor: 'Family-friendly, mid-range value.',
 matchday: 'Good access to Vallarta corridors—still plan buffers.',
 },
 {
 title: 'Zapopan Centro (Basilica area)',
 vibe: 'Historic core of Zapopan with a more local rhythm.',
 stay: 'Best for: cultural mornings and calmer evenings in Zapopan.',
 eat: 'Street snacks, plazas, local restaurants.',
 drink: 'Relaxed nights; less club energy.',
 explore: 'Basilica, plazas, weekend life.',
 bestFor: 'Culture + logistics blend.',
 matchday: 'Better stadium access than Centro Guadalajara.',
 },
 ].map((n, i) => (
 <div key={i} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50">
 <h4 className="font-bold text-2xl mb-3 text-slate-900 dark:text-white">{n.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-6">{n.vibe}</p>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400">
 <li>• <strong>Stay:</strong> {n.stay}</li>
 <li>• <strong>Eat:</strong> {n.eat}</li>
 <li>• <strong>Drink:</strong> {n.drink}</li>
 <li>• <strong>Explore:</strong> {n.explore}</li>
 <li>• <strong>Best for:</strong> {n.bestFor}</li>
 <li>• <strong>Matchday:</strong> {n.matchday}</li>
 </ul>
 </div>
 ))}
 </div>

 <div className="mt-12 flex flex-wrap gap-4">
 <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Zapopan" text="Search Zapopan Hotels" variant="primary" icon={Hotel} />
 <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Colonia%20Americana%2C%20Guadalajara" text="Search Colonia Americana Hotels" variant="outline" icon={Hotel} />
 <AffiliateButton href="https://www.airbnb.com/s/Guadalajara--Jalisco--Mexico/homes" text="Find Apartments for Groups" variant="outline" icon={Users} />
 </div>
 </Section>

 <Section id="stadium" title="Estadio Akron (Guadalajara Stadium)">
 <LightboxImage 
 src="/images/stadiums/estadio-akron-guadalajara-world-cup-2026-1600.webp" 
 alt="Estadio Akron Interior" 
 caption="The Volcano: A modern architectural marvel integrated into the landscape."
 />

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 Locals call it <strong>El Volcán</strong> for a reason. Estadio Akron is built into a grassy berm, so from the outside it looks like a landscape—like someone folded the earth and decided to host a match inside it. It’s the home of Chivas, and when the city is in football mode, you’ll hear it before you arrive.
 </p>
 <p>
 During FIFA World Cup 2026, the venue uses the neutral name <strong>Guadalajara Stadium</strong> and hosts <strong>four Group Stage matches</strong>.{' '}
 <a href="https://fifaworldcup26.suites.fifa.com/venues/guadalajara-stadium/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-500 font-bold">
 Source <ExternalLink className="w-4 h-4" />
 </a>
 </p>
 <p>
 The stadium sits in Zapopan (west metro), so matchday planning is mostly a transport problem—not a safety problem. Solve the transport, and you’re golden.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Key Facts</h4>
 <ul className="space-y-4">
 {[
 { label: "Tournament name", val: "Guadalajara Stadium" },
 { label: "Local name", val: "Estadio Akron" },
 { label: "Home club", val: "C.D. Guadalajara (Chivas)" },
 { label: "Location", val: "Zapopan (Guadalajara metro)" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-slate-700 dark:text-slate-300">
 <span className="font-medium text-slate-500">{item.label}</span>
 <span className="font-bold">{item.val}</span>
 </li>
 ))}
 </ul>
 </div>
 <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Pro Tips (Local Edition)</h4>
 <ul className="space-y-4 text-slate-700 dark:text-slate-300">
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Treat rain like part of the schedule: sunny mornings, storms later.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Arrive early, leave late. The “right” time is rarely the obvious time.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Save a pin for your pickup spot before kickoff. After the match, data congestion is normal.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Keep your plan simple: one pre-match meet point, one post-match meet point.</li>
 </ul>
 </div>
 </div>
 
        <div className="p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/20">
          <p className="text-lg text-center font-medium text-emerald-800 dark:text-emerald-200">
            <strong>Getting There:</strong> Mi Macro Periférico is $9.50 MXN and uses the <strong>Tarjeta Mi Movilidad</strong>.{' '}
            <a href="https://mimacro.jalisco.gob.mx/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300 hover:text-emerald-600 font-bold">
              Source <ExternalLink className="w-4 h-4" />
            </a>
          </p>
        </div>
 </Section>

 <Section id="tips" title="Match Day Gameplan">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
 <p className="text-xl text-slate-600 dark:text-slate-300">
 Matchday in Guadalajara is equal parts football and choreography. If you try to “wing it,” you’ll spend the best hours in traffic. If you follow a simple time budget, it feels easy—and honestly, fun.
 </p>
 </div>

 <div className="grid md:grid-cols-3 gap-6 mb-10">
 {[
 { title: "T-5h to T-3h", text: "Eat a real meal early (you don’t want to be hangry in a security line), then head west before the biggest traffic wave." },
 { title: "T-3h to Kickoff", text: "Get to the stadium zone, walk a bit, and let the crowd flow guide you. Rain usually shows up later—still bring a layer." },
 { title: "Post-Match", text: "Don’t fight the first surge. Grab a drink, take photos, and leave when the pressure drops. Your wallet will thank you." }
 ].map((item, i) => (
 <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-50 dark:bg-slate-900/50">
 <h4 className="font-bold mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
 </div>
 ))}
 </div>

 <div className="mt-6 flex flex-wrap gap-3">
 <AffiliateButton href="https://www.amazon.com/s?k=packable+rain+jacket" text="Packable Rain Jacket" variant="primary" />
 <AffiliateButton href="https://www.amazon.com/s?k=portable+power+bank" text="Bring a Power Bank" variant="outline" />
 <AffiliateButton href="https://www.airalo.com/mexico-esim" text="Grab a Mexico eSIM" variant="outline" icon={Globe} />
 </div>
 
 <div className="mt-10">
 <h3 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">Getting to Estadio Akron</h3>
 <div className="space-y-4">
 {[
 { mode: "Mi Macro Periférico", time: "Varies by base", cost: "$9.50 MXN", desc: "Use your Tarjeta Mi Movilidad; get off near the Estadio Chivas area, then walk with the crowd.", icon: Bus, accent: "text-emerald-600" },
 { mode: "Rideshare (Uber/DiDi)", time: "Varies", cost: "Varies", desc: "Most convenient door-to-zone option. Save a pickup pin before kickoff; expect surge pricing after the whistle.", icon: Car, accent: "text-blue-600" },
 { mode: "Park & Ride (Match Events)", time: "Varies", cost: "Varies", desc: "Local match events sometimes run park-and-ride style operations (example: Concentro parking area + shuttle routing). Always confirm the current plan.", icon: MapPin, accent: "text-amber-600" }
 ].map((opt, i) => (
 <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50">
 <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg">
 <opt.icon className={`w-6 h-6 ${opt.accent}`} />
 </div>
 <div className="min-w-0">
 <div className="font-bold text-slate-900 dark:text-white">{opt.mode} <span className="text-slate-400 font-normal">({opt.time})</span></div>
 <div className="text-sm text-slate-500 dark:text-slate-400">{opt.desc}</div>
 </div>
 <div className="ml-auto font-bold text-emerald-600 whitespace-nowrap">{opt.cost}</div>
 </div>
 ))}
 </div>

 <div className="mt-6 p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-50 dark:bg-slate-900/50">
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 A useful local reference point: Mi Macro Periférico matchday routing has historically used stations like <strong>Ciudad Granja</strong>, <strong>Ciudad Judicial</strong>, and <strong>Estadio Chivas</strong> as access points for event shuttles.{' '}
 <a href="https://www.informador.mx/jalisco/Chivas-vs.-Tigres-Vas-a-la-final-Estas-son-las-3-rutas-a-tomar-para-llegar-al-Estadio-Akron-20230527-0070.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-500 font-bold">
 Source <ExternalLink className="w-4 h-4" />
 </a>
 </p>
 </div>
 </div>
 </Section>

 <Section id="tickets" title="Tickets & Hospitality">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="bg-slate-900 text-slate-900 dark:text-white p-8 rounded-[2rem] relative overflow-hidden">
 <div className="relative z-10">
 <h3 className="text-2xl font-bold mb-4">Official FIFA Channels</h3>
 <p className="text-slate-600 dark:text-slate-300 mb-8">
 Sign up for the FIFA ticket lottery. Resale is strictly regulated.
 </p>
 <div className="flex flex-wrap gap-4">
 <AffiliateButton href="https://www.fifa.com/tickets" text="FIFA Portal" variant="secondary" />
 <AffiliateButton href="https://www.fifa.com/worldcup/tickets" text="Set Alert" variant="outline" />
 </div>
 </div>
 <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
 <Ticket className="w-64 h-64" />
 </div>
 </div>
 
 <div className="border border-slate-200 dark:border-white/10 p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50">
 <h3 className="text-2xl font-bold mb-4">Resale Market</h3>
 <p className="text-slate-600 dark:text-slate-400 mb-8">
 Official resale platform is the safest option. Third-party sites carry risk.
 </p>
 <AffiliateButton href="https://www.stubhub.com/world-cup-tickets/grouping/50004505/" text="Check StubHub" variant="primary" />
 </div>
 </div>
 </Section>

 <Section id="hotels" title="Where to Stay">
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl leading-relaxed">
 Guadalajara offers diverse neighborhoods. <strong>Zapopan</strong> is upscale and close to the stadium. <strong>Centro Histórico</strong> puts you in the cultural center. <strong>Colonia Americana</strong> is the trendy choice for nightlife.
 </p>
 
 <div className="space-y-8">
 <HotelCard 
 name="Hyatt Regency Andares"
 rating={4.8}
 price="$250+"
 distance="15 min drive"
 features={['Luxury', 'Mall Access', 'Pool', 'Modern']}
 image="/images/cities/guadalajara-world-cup-2026-640.webp"
 link="https://www.booking.com/hotel/mx/hyatt-regency-andares-guadalajara.html"
 />
 <HotelCard 
 name="Casa Habita"
 rating={4.7}
 price="$180+"
 distance="30 min drive"
 features={['Boutique', 'Rooftop Bar', 'Design', 'Trendy']}
 image="/images/cities/guadalajara-world-cup-2026-640.webp"
 link="https://www.booking.com/hotel/mx/casa-habita.html"
 />
 <HotelCard 
 name="Hotel Morales"
 rating={4.6}
 price="$90+"
 distance="40 min drive"
 features={['Colonial', 'Historic', 'Budget Friendly', 'Central']}
 image="/images/cities/guadalajara-world-cup-2026-640.webp"
 link="https://www.booking.com/hotel/mx/morales-historical-downtown.html"
 />
 </div>
 
 <div className="mt-12 text-center">
 <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Guadalajara" text="Search All GDL Hotels" variant="outline" />
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
<h4 className="font-bold text-xl mb-2">Mi Tren (Light Rail)</h4>
<p className="text-slate-600 dark:text-slate-400 leading-relaxed">
Clean and efficient. Line 3 connects Centro to Zapopan; use it to cut across the city, then finish with a short connector (bus / rideshare) toward Estadio Akron.
</p>
</div>
</div>
<div className="flex gap-6">
<div className="w-16 h-16 rounded-2xl flex items-center justify-center text-violet-600 shrink-0">
<Bus className="w-8 h-8" />
</div>
<div>
<h4 className="font-bold text-xl mb-2">Mi Macro Periférico (BRT Ring Line)</h4>
<p className="text-slate-600 dark:text-slate-400 leading-relaxed">
This is the matchday workhorse around the Periférico. The key stop for the stadium zone is <strong>Estadio Chivas</strong>. Standard fare is <strong>$9.50 MXN</strong>. If you use a <strong>Mi Movilidad</strong> card, transfers get a <strong>50% discount</strong>.
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
Miguel Hidalgo y Costilla (GDL) is the main airport. Authorized taxis and app-based rides are available to the city (typically 30-60 mins depending on traffic).
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
Uber & DiDi are widely available, safe, and affordable. Traffic can be intense, so allow extra time.
</p>
</div>
</div>
</div>
 
        <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/10 h-fit">
          <h4 className="font-bold text-2xl mb-6">Distance to Stadium</h4>
          <ul className="space-y-6">
            {[
              { label: "Zapopan / Andares", time: "25-45 min transit" },
              { label: "Colonia Americana", time: "45-75 min transit" },
              { label: "Centro Histórico", time: "55-90 min transit" },
              { label: "Airport (GDL)", time: "70-110 min transit" }
            ].map((item, i) => (
              <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-white/10 pb-4 last:border-0 last:pb-0">
                <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
                <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/10">
            <AffiliateButton href="https://web.didiglobal.com/mx/pasajero/" text="Use DiDi (Mexico)" variant="secondary" />
          </div>
        </div>
</div>
</Section>

 <Section id="dining" title="Food & Drink">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Torta Ahogada", desc: "Pork sandwich 'drowned' in spicy salsa. The city's icon. Try it at Tortas Toño." },
            { title: "Birria", desc: "Slow-cooked goat or beef stew. A breakfast tradition. Best enjoyed at Las 9 Esquinas." },
            { title: "Carne en su Jugo", desc: "Meat in its own juices. Savory beef soup with bacon. Karne Garibaldi holds the speed record." }
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
 </Section>

 <Section id="attractions" title="Top Attractions">
 <p className="mb-8 text-xl text-slate-600 dark:text-slate-300">
 Guadalajara's attractions range from colonial masterpieces to vibrant cultural hubs.
 </p>
        <div className="space-y-6">
          {[
            { title: "Hospicio Cabañas", desc: "UNESCO World Heritage site featuring murals by José Clemente Orozco.", color: "text-blue-500" },
            { title: "Guadalajara Cathedral", desc: "Iconic twin towers in the heart of the Centro Histórico.", color: "text-amber-500" },
            { title: "Tlaquepaque", desc: "Charming colonial town within the city, famous for pottery and mariachi.", color: "text-emerald-500" }
          ].map((item, i) => (
            <div key={i} className="flex gap-6 items-center p-6 rounded-3xl bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 transition-colors shadow-sm hover:shadow-md">
              <div className="p-4 rounded-2xl shadow-sm shrink-0">
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
 <AffiliateButton href="https://www.viator.com/Guadalajara-tours/City-Tours/d5362-g13" text="Book City Tour" variant="primary" />
 </div>
 </Section>

 <Section id="safety" title="Safety & Security">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> Event Patterns</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Crowds in Centro and Zapopan will be heavy. Stick to tourist areas, travel in groups, and avoid walking alone in unknown neighborhoods at night.</p>
 </div>
 <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Practical Tips</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>— Use Uber/DiDi instead of street taxis.</li>
 <li>— Keep valuables hidden and secure.</li>
 <li>— Drink bottled water only.</li>
 </ul>
 <div className="mt-6">
 <AffiliateButton href="https://www.worldnomads.com/" text="Get Travel Insurance" variant="secondary" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="culture" title="Cultural Intelligence">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">Guadalajara is the soul of Mexico. People are friendly and proud of their culture. Tipping is standard (10-15%).</p>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { title: "Fan Zones", desc: "Plaza de la Liberación is a likely spot. Expect giant screens and live music." },
 { title: "Dining Etiquette", desc: "Lunch (Comida) is the main meal, usually between 2-4 PM. Dinner is lighter and later." },
 { title: "Mariachi", desc: "Hire a band in Plaza de los Mariachis or enjoy the music in Tlaquepaque." }
 ].map((item, i) => (
 <div key={i} className="p-6 bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl">
 <h4 className="font-bold mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
 </div>
 ))}
 </div>
 </Section>

 <Section id="packing" title="Climate & Packing">
 <div className="grid md:grid-cols-3 gap-6">
 <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
 <Sun className="w-10 h-10 text-emerald-500 mb-4" />
 <h4 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">Warm Days</h4>
 <p className="text-slate-600 dark:text-slate-400">Highs around 30°C (86°F). Lightweight, breathable clothing is best.</p>
 </div>
 <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
 <Clock className="w-10 h-10 text-emerald-500 mb-4" />
 <h4 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">Rainy Afternoons</h4>
 <p className="text-slate-600 dark:text-slate-400">June is the start of the rainy season. Expect afternoon showers. Bring a poncho.</p>
 </div>
 <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
 <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-4" />
 <h4 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">Essentials</h4>
 <p className="text-slate-600 dark:text-slate-400">Sunscreen, hat, comfortable walking shoes, and a power bank.</p>
 </div>
 </div>
 </Section>

 <Section id="faq" title="FAQ">
 <div className="space-y-4">
 <FAQItem 
 question="Is Guadalajara safe for tourists?"
 answer="Yes, especially in tourist areas like Zapopan, Centro Histórico, and Tlaquepaque. Like any big city, stay aware of your surroundings and use official transport."
 />
 <FAQItem 
 question="How do I get to Estadio Akron?"
 answer="The stadium is in Zapopan. You can take Mi Tren Line 3 to the area and then a connector, or use rideshare (Uber/DiDi). Allow plenty of time for traffic."
 />
 <FAQItem 
 question="Can I drink the tap water?"
 answer="No, it is not recommended to drink tap water. Stick to bottled or purified water, which is readily available everywhere."
 />
 <FAQItem 
 question="Do I need to speak Spanish?"
 answer="While many people in hospitality speak English, learning basic Spanish phrases is appreciated and helpful."
 />
 </div>
 </Section>

      <div className="mt-24 p-12 rounded-[3rem] bg-slate-900 dark:bg-white/5 border border-white/10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[150px] opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600 rounded-full blur-[150px] opacity-10"></div>
        
        <div className="relative z-10">
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Ready for the Fiesta?</h3>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Join thousands of fans in the heart of Mexico for an unforgettable World Cup experience.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/gdl" text="Book Your Trip" variant="primary" icon={Plane} />
            <AffiliateButton href="https://www.reddit.com/r/Guadalajara/" text="Join Community" variant="outline" icon={Users} />
          </div>
        </div>
      </div>

      <div className="mt-24 border-t border-slate-200 dark:border-white/10 pt-12">
        <h3 className="text-2xl font-bold mb-8">Explore More Host Cities</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/world-cup-2026-mexico-city-guide" className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
            <div className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">Mexico City</div>
            <div className="text-sm text-slate-500">Azteca Stadium</div>
          </Link>
          <Link href="/world-cup-2026-monterrey-guide" className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
            <div className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">Monterrey</div>
            <div className="text-sm text-slate-500">Estadio BBVA</div>
          </Link>
          <Link href="/world-cup-2026-los-angeles-guide" className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
            <div className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">Los Angeles</div>
            <div className="text-sm text-slate-500">SoFi Stadium</div>
          </Link>
          <Link href="/world-cup-2026-houston-guide" className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
            <div className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">Houston</div>
            <div className="text-sm text-slate-500">NRG Stadium</div>
          </Link>
        </div>
      </div>

    </main>
    </div>
  </div>
);
}






