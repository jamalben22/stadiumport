'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb } from "@/components/ui/Breadcrumb";
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

// 2. Floating Social Share
const SocialShare = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Check out this guide to World Cup 2026 in Boston!";
    
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }

    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="fixed left-4 top-1/3 z-40 hidden xl:flex flex-col gap-3"
      >
        <div className="backdrop-blur-md p-2 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col gap-3">
          <button onClick={() => handleShare('twitter')} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors" aria-label="Share on Twitter">
            <Twitter className="w-5 h-5" />
          </button>
          <button onClick={() => handleShare('facebook')} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors" aria-label="Share on Facebook">
            <Facebook className="w-5 h-5" />
          </button>
          <button onClick={() => handleShare('linkedin')} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors" aria-label="Share on LinkedIn">
            <Linkedin className="w-5 h-5" />
          </button>
          <button onClick={() => handleShare('copy')} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors relative" aria-label="Copy Link">
            {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-slate-900 dark:text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="font-medium">Link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
    { id: 'neighborhoods', label: 'Neighborhoods' },
    { id: 'itinerary', label: 'Itineraries' },
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
    { id: 'essential', label: 'Essentials' },
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
            src="/images/cities/boston-world-cup-2026-1600.webp" 
            alt="Boston Skyline" 
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
                { label: 'Boston', href: '/world-cup-2026-boston-guide' }
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
                  Quarter-Final Host
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9] md:leading-[0.95]">
                Boston World Cup 2026 Guide
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-white/90 font-light max-w-3xl leading-relaxed">
                I’ve lived here long enough to remember when the Big Dig was still a punchline. Use this Boston World Cup 2026 guide to eat well, move fast, and actually enjoy match day.
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
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
                Boston is a small city with big sports energy, and that’s exactly why it works for a World Cup trip. You can spend the morning on cobblestones and the evening in a stadium parking lot that feels like a traveling festival. Here’s the twist: your match is not downtown. It’s at <strong>Gillette Stadium</strong> in Foxborough, <strong>29 miles (47 km) southwest of downtown Boston</strong>.
              </p>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                If you only remember one thing, make it this: <strong>Boston is your base camp; Foxborough is your match site</strong>. Build your trip like a two-city itinerary and you’ll have a stress-free tournament week. Pretend it’s “one place,” and you’ll spend half your vacation in traffic.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              {[
                { icon: MapPin, title: "Best Base Camp", text: "Back Bay, Downtown/Waterfront, Seaport, or Fenway. Easy transit, plenty of food, and late-night options (Boston-late, anyway)." },
                { icon: Train, title: "Matchday Move", text: "Commuter Rail to Foxboro Station when available. It’s the cleanest way to dodge Route 1 chaos and post-match gridlock." },
                { icon: DollarSign, title: "Money Reality Check", text: "Boston is expensive. The hack is to pick one splurge neighborhood and pair it with smart transit, not more Ubers." }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[2rem] transition-colors border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                  <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
                  <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Quick Answers (Featured Snippet)</h3>
                <ul className="space-y-4 text-slate-600 dark:text-slate-400 text-lg">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /><span><strong>Where are the games?</strong> Foxborough (Gillette Stadium), not downtown Boston.</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /><span><strong>Best place to stay?</strong> Back Bay if you want “easy mode.” Seaport if you want modern + waterfront.</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /><span><strong>Best way to the stadium?</strong> Commuter Rail to Foxboro when special event trains run.</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /><span><strong>Biggest mistake?</strong> Driving last-minute and assuming parking will be simple.</span></li>
                </ul>
              </div>
              <div className="p-8 rounded-[2rem] border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">My Local Rule</h3>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                  If your hotel doesn’t give you a clean transit path to <strong>South Station</strong>, you’re making match day harder than it needs to be.
                  South Station is your hinge point: airport → city, city → commuter rail, commuter rail → Foxborough.
                </p>
                <div className="flex flex-wrap gap-4">
                  <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/bos" text="Compare Flights to BOS" variant="secondary" icon={Plane} />
                  <AffiliateButton href="https://www.booking.com/city/us/boston.html" text="Check Boston Hotels" variant="primary" icon={Hotel} />
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Users, title: "Best for First-Timers", text: "Back Bay + South End edge. Walkable, safe, and you can reach everywhere without thinking." },
                { icon: Sun, title: "Best Summer Vibe", text: "Seaport + Waterfront. Sunsets, patios, and an easy hop to the airport." },
                { icon: ThumbsUp, title: "Best Value Base", text: "Quincy/Braintree on the Red Line. Less glamorous, more money left for match nights." }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[2rem] transition-colors border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                  <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
                  <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="neighborhoods" title="Neighborhood-by-Neighborhood">
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl leading-relaxed">
              Boston is a patchwork of neighborhoods that feel like mini-cities. Choose your base by vibe and transit, not by whatever hotel looks prettiest on a map. Here’s the local read, including who each area is best for during World Cup 2026.
            </p>

            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  title: "Back Bay (Best All-Around Base)",
                  vibe: "Classic Boston, brownstones, shopping, easy transit.",
                  bestFor: "First-time visitors, couples, anyone who hates friction.",
                  stay: "Near Copley or Prudential for walkability.",
                  eat: "Newbury Street for people-watching; Boylston for pre-game energy.",
                  note: "If you’re only choosing one neighborhood, choose this."
                },
                {
                  title: "South End (Restaurants + Walkable Nights)",
                  vibe: "Tree-lined streets, brownstones, patios, and a deep restaurant bench.",
                  bestFor: "Food-first travelers, couples, groups who want nights out without clubs.",
                  stay: "South End edge near Back Bay for simple transit options.",
                  eat: "Small plates, cocktail bars, and the kind of dinners that turn into long nights.",
                  note: "Don’t confuse this with South Boston (“Southie”). Totally different vibe."
                },
                {
                  title: "Seaport / South Boston Waterfront (Modern + Match-Week Energy)",
                  vibe: "New-build Boston: wide sidewalks, harbor views, rooftop bars.",
                  bestFor: "Nightlife, groups, easy Logan access.",
                  stay: "Seaport for modern hotels; Fort Point for quieter nights.",
                  eat: "Seafood, patios, ‘start early’ nights.",
                  note: "Great for summer. Less “historic Boston,” more “global city.”"
                },
                {
                  title: "Downtown / Waterfront (History on Foot)",
                  vibe: "Freedom Trail access, government buildings, classic hotels.",
                  bestFor: "History-heavy itineraries, short stays, families who walk.",
                  stay: "Close to Boston Common or the Harbor for easy routes.",
                  eat: "Quincy Market for convenience (touristy), Chinatown for real meals.",
                  note: "Weeknights can feel quiet once office workers disappear."
                },
                {
                  title: "North End (Food-First, Crowded, Worth It)",
                  vibe: "Boston’s Little Italy: tight streets, strong opinions, better espresso.",
                  bestFor: "Food lovers, late-night dessert runs.",
                  stay: "Boutique stays exist, but space is tight and prices jump.",
                  eat: "Italian classics; cannoli debates you did not ask for.",
                  note: "Go early for dinner. Go late for dessert. Lines shrink."
                },
                {
                  title: "Fenway / Kenmore (Sports District)",
                  vibe: "Fenway Park energy spills into everything nearby.",
                  bestFor: "Fans who want bars, crowds, and a loud walk home.",
                  stay: "Great for quick access to the Green Line and Back Bay edge.",
                  eat: "Casual, pub-style, and ‘before/after’ places.",
                  note: "If you want a quiet morning, this isn’t your pick."
                },
                {
                  title: "Charlestown / Navy Yard (Quiet Historic + Views)",
                  vibe: "Cobblestones, harbor views, and a calmer pace than downtown.",
                  bestFor: "Families, early risers, travelers who want a quieter base.",
                  stay: "Navy Yard for water views; be mindful of limited late-night transit.",
                  eat: "Neighborhood pubs and waterfront spots, plus easy access to North End dinners.",
                  note: "Great for walking. Less great if you’re trying to be spontaneous at 1:30 AM."
                },
                {
                  title: "Cambridge (Harvard/MIT) + Somerville (Local Cool)",
                  vibe: "Bookstores, cafes, smart-people conversations you can eavesdrop on.",
                  bestFor: "Explorers, repeat visitors, and anyone who prefers neighborhoods to downtown.",
                  stay: "Harvard/Kendall for transit; Davis for a local scene.",
                  eat: "Global food, bakeries, and a deeper bench than you expect.",
                  note: "Getting to South Station can be a little indirect—plan it."
                },
                {
                  title: "Quincy / Braintree (Red Line Value Base)",
                  vibe: "Practical, less glamorous, and genuinely useful for saving money.",
                  bestFor: "Budget travelers, longer stays, anyone who wants space and a calmer sleep.",
                  stay: "Near Quincy Center or Braintree for easy Red Line access.",
                  eat: "Solid casual spots, plus quick access to Chinatown and downtown food.",
                  note: "Red Line goes to South Station, which makes match-day logistics simpler than it looks."
                },
              ].map((n, i) => (
                <div key={i} className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">{n.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">{n.vibe}</p>
                  <div className="space-y-3 text-slate-600 dark:text-slate-400">
                    <p><strong className="text-slate-900 dark:text-white">Best for:</strong> {n.bestFor}</p>
                    <p><strong className="text-slate-900 dark:text-white">Where to stay:</strong> {n.stay}</p>
                    <p><strong className="text-slate-900 dark:text-white">Where to eat/drink:</strong> {n.eat}</p>
                    <p><strong className="text-slate-900 dark:text-white">Local note:</strong> {n.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Family-Friendly Bases</h3>
                <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-lg">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /><span><strong>Back Bay</strong> (easy sidewalks, central, calm hotels)</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /><span><strong>Downtown/Waterfront</strong> (history walks, aquarium area)</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /><span><strong>Charlestown</strong> (quiet streets + easy daytime walks)</span></li>
                </ul>
              </div>
              <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Nightlife-First Bases</h3>
                <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-lg">
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /><span><strong>Seaport</strong> (late patios, modern bars, easy airport)</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /><span><strong>Fenway/Kenmore</strong> (sports bars, loud crowds)</span></li>
                  <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /><span><strong>South End edge</strong> (cocktail bars + restaurants)</span></li>
                </ul>
              </div>
            </div>

            <div className="mt-10 p-8 rounded-[2rem] border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Neighborhood Shortcut (Match-Week Logic)</h3>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                Build your trip around two anchors: <strong>where you’ll walk</strong> (the fun part) and <strong>how you’ll reach South Station</strong> (the practical part). If you can reach South Station without transfers you hate, match day becomes easy mode.
              </p>
              <div className="grid md:grid-cols-2 gap-6 text-slate-600 dark:text-slate-400 text-lg">
                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-white/5">
                  <h4 className="font-black text-slate-900 dark:text-white mb-3">Closest “No-Brainer” Picks</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" /><span><strong>Downtown/Waterfront:</strong> short hops to South Station</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" /><span><strong>Seaport:</strong> quick access + easy airport moves</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" /><span><strong>Quincy/Braintree:</strong> Red Line to South Station</span></li>
                  </ul>
                </div>
                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-white/5">
                  <h4 className="font-black text-slate-900 dark:text-white mb-3">Great, With One Extra Thought</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" /><span><strong>Cambridge/Somerville:</strong> plan your exact route to South Station</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" /><span><strong>North End:</strong> amazing nights, but transit is less direct</span></li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" /><span><strong>Charlestown:</strong> quieter base, fewer late-night options</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>

          <Section id="itinerary" title="Day-by-Day Itineraries">
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-4xl leading-relaxed">
              The best Boston World Cup itinerary is built around two rhythms: <strong>walk the city early</strong>, then <strong>commit to match day logistics</strong> like it’s a mini road trip. Here are the itineraries I’d give a friend flying in for a single match, and the one I’d do myself if I had 5 days.
            </p>

            <div className="space-y-8">
              <div className="p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6">3-Day Plan (One Match)</h3>
                <div className="grid lg:grid-cols-3 gap-6">
                  {[
                    {
                      day: "Day 1 (Arrival + Harbor Night)",
                      bullets: [
                        "Land at BOS, take SL1 to South Station (easy win).",
                        "Check in and walk the Harborwalk until you’re hungry.",
                        "Dinner in the North End, then a late cannoli run."
                      ]
                    },
                    {
                      day: "Day 2 (Match Day: Boston → Foxborough)",
                      bullets: [
                        "Big breakfast. You’ll be on your feet for hours.",
                        "Head to South Station with time to spare; activate your commuter rail ticket right before boarding.",
                        "Arrive 2–3 hours early, soak up Patriot Place, then get inside early for security."
                      ]
                    },
                    {
                      day: "Day 3 (History + Victory Lap)",
                      bullets: [
                        "Freedom Trail in the morning before it gets hot.",
                        "Fenway area walk or museum pick (ICA in Seaport is an easy add).",
                        "Fly out or stay one more night if you can swing it."
                      ]
                    }
                  ].map((d, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                      <h4 className="font-black text-xl text-slate-900 dark:text-white mb-4">{d.day}</h4>
                      <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                        {d.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2.5" />
                            <span className="leading-relaxed">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Match Day Template (Train Day)</h3>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white">The Whole Point</h4>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                      Your goal is not to “make kickoff.” Your goal is to arrive calm, hydrated, and fed. Treat it like an event day with buffers, not like a normal commute.
                    </p>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-lg">
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /><span><strong>Morning:</strong> early breakfast + fill a water bottle</span></li>
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /><span><strong>Midday:</strong> get to South Station with a cushion</span></li>
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /><span><strong>Arrival:</strong> Patriot Place lap + gates early</span></li>
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /><span><strong>Post-match:</strong> commit to your return plan immediately</span></li>
                    </ul>
                  </div>
                  <div className="p-8 rounded-[2rem] bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Quick Checklist</h4>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-lg">
                      {[
                        "Stadium-compliant clear bag or no bag at all",
                        "Portable charger (screenshots + maps + tickets drain batteries)",
                        "Light rain shell (open-air stadium weather swings)",
                        "Sunscreen + sunglasses for afternoon kickoffs",
                        "A planned meet-up point in case your group splits",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2.5" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6">5-Day Plan (Two Matches + Real Boston)</h3>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white">The Shape of the Week</h4>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                      Use Boston as your base, then treat each match as its own “event day.” On the non-match days, you’ll see the city at its best: early mornings, long walks, short transit hops, and meals you’ll talk about for years.
                    </p>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-lg">
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /><span><strong>Day 1:</strong> Back Bay + Common + Beacon Hill</span></li>
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /><span><strong>Day 2:</strong> Match Day #1 (Foxborough)</span></li>
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /><span><strong>Day 3:</strong> Cambridge day + brewery or live music night</span></li>
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /><span><strong>Day 4:</strong> Match Day #2 (or day trip: Salem / Cape Ann)</span></li>
                      <li className="flex items-start gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" /><span><strong>Day 5:</strong> Seaport + harbor sunset + fly out</span></li>
                    </ul>
                  </div>
                  <div className="p-8 rounded-[2rem] bg-emerald-50/50 dark:bg-emerald-500/10 border border-emerald-500/20">
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-4">StadiumPort “Time Budget” (Original)</h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                      This is the schedule buffer I use for any Gillette event when I care about being calm, not frantic.
                    </p>
                    <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                      {[
                        "T-90 min: be at South Station (minimum).",
                        "T-75 min: board / settle in.",
                        "T-0: arrive Foxboro Station (typical event timing varies).",
                        "T+20 min: food/water + gate approach.",
                        "T+60 min: in your seat, relaxed.",
                      ].map((t, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <AffiliateButton href="/world-cup-2026-itinerary-planning" text="See WC26 Itinerary Planning" variant="outline" />
                      <AffiliateButton href="/world-cup-2026-flight-booking-guide" text="Flight Booking Strategy" variant="secondary" icon={Plane} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Between Matches: Best Day Trips</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { title: "Salem (Half-Day History)", desc: "Easy train access, walkable center, and a lot of atmosphere. Go early and you’ll beat the crowds." },
                    { title: "Cape Ann (Gloucester/Rockport)", desc: "Ocean air, seafood, and a break from the city. Feels like New England on purpose." },
                    { title: "Concord + Lexington (Revolutionary Day)", desc: "If you want the origin-story version of the U.S., this is the cleanest day trip." },
                  ].map((item, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                      <h4 className="font-black text-xl text-slate-900 dark:text-white mb-3">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          <Section id="visa" title="Visa & Entry (USA)">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                <h4 className="font-bold text-2xl mb-4">Who Needs a Visa?</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
                  Many travelers can enter the U.S. on ESTA via the Visa Waiver Program; others need a B-2 tourist visa. The paperwork is the boring part, but it’s the part that can break your trip if you ignore it. Apply early.
                </p>
                <AffiliateButton href="https://esta.cbp.dhs.gov/" text="Check ESTA Eligibility" variant="outline" />
              </div>
              <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                <h4 className="font-bold text-2xl mb-4">Arrival Tips</h4>
                <ul className="space-y-4 mb-8">
                  {[
                    'Fly into Boston Logan (BOS) for the fastest downtown access',
                    'Use the SL1 bus from Logan to South Station as a simple low-cost transfer',
                    'Carry digital copies of tickets and hotel confirmations'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
                    </li>
                  ))}
                </ul>
                <AffiliateButton href="https://www.worldnomads.com/" text="Buy Travel Insurance" variant="secondary" />
              </div>
            </div>
            <div className="mt-10 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Official Sources (Worth Bookmarking)</h3>
              <div className="grid md:grid-cols-2 gap-4 text-slate-600 dark:text-slate-400">
                <Link href="https://www.mbta.com/destinations/logan-airport" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">MBTA: Logan Airport connections (SL1)</Link>
                <Link href="https://www.mbta.com/destinations/gillette-stadium" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">MBTA: Gillette Stadium trains and fares</Link>
                <Link href="https://www.gillettestadium.com/directions/" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">Gillette Stadium directions (distance + routes)</Link>
                <Link href="https://www.gillettestadium.com/bag-policy/" target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">Gillette Stadium bag policy (sizes)</Link>
              </div>
            </div>
          </Section>

          <Section id="planning" title="Planning Timeline">
            <div className="space-y-6">
              {[
                { time: "9–12 Months Out", desc: "Pick your base (Back Bay / Seaport / Downtown). Start hotel tracking immediately—Boston is a premium-rate city in summer." },
                { time: "6–9 Months Out", desc: "Lock flights into BOS and decide if you’re doing multiple host cities (NYC and Philly pair perfectly with Boston).", },
                { time: "3–6 Months Out", desc: "Sort tickets and build a matchday plan that does not rely on last-minute rideshares." },
                { time: "2–6 Weeks Out", desc: "Reserve your ‘must-eat’ spots (North End, seafood, and one splurge meal). Buy a stadium-compliant clear bag now, not at the gate." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center">
                  <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
                  <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/bos" text="Set Flight Alerts" variant="primary" icon={Plane} />
              <AffiliateButton href="https://www.opentable.com/boston-restaurants" text="Reserve Restaurant Tables" variant="outline" />
            </div>
          </Section>

          <Section id="budget" title="Budget Tiers">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Budget (Smart Saver)", items: ["Stay in Quincy/Braintree (Red Line)", "Use SL1 + MBTA + walking", "Food halls + quick counter spots", "One paid museum, not three"] },
                { title: "Mid-Range (Comfort)", items: ["Back Bay / Fenway / Downtown hotels", "Mix transit with selective rideshares", "A proper North End dinner", "One day tour or boat outing"] },
                { title: "Luxury (Premium)", items: ["Seaport or waterfront luxury", "Private transfers on match days", "Chef-driven restaurants + cocktails", "VIP hospitality or premium seats"] }
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
            <div className="mt-10 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Typical Daily Spend (StadiumPort Estimates)</h3>
              <div className="grid md:grid-cols-3 gap-6 text-slate-600 dark:text-slate-400">
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                  <h4 className="font-black text-lg text-slate-900 dark:text-white mb-2">Budget</h4>
                  <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-2">$150–$250</p>
                  <p className="leading-relaxed">Transit + casual food + one paid activity. Works best outside match days.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                  <h4 className="font-black text-lg text-slate-900 dark:text-white mb-2">Mid-Range</h4>
                  <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-2">$250–$450</p>
                  <p className="leading-relaxed">A nicer hotel zone, one sit-down dinner, and room for drinks.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                  <h4 className="font-black text-lg text-slate-900 dark:text-white mb-2">Luxury</h4>
                  <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-2">$500+</p>
                  <p className="leading-relaxed">Seaport luxury, driver service, and premium dining stack quickly.</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <AffiliateButton href="https://www.kayak.com/packages/Boston-c25588" text="Search Boston Packages" variant="secondary" icon={Briefcase} />
                <AffiliateButton href="/world-cup-2026-budget-guide" text="See Our WC26 Budget Guide" variant="outline" icon={DollarSign} />
              </div>
            </div>
            <div className="mt-8 text-center">
              <AffiliateButton href="https://www.expedia.com" text="Check Bundles on Expedia" variant="outline" icon={Globe} />
            </div>
          </Section>

          <Section id="stadium" title="Gillette Stadium">
            <LightboxImage 
              src="/images/stadiums/gillette-stadium-foxborough-world-cup-2026.webp" 
              alt="Gillette Stadium" 
              caption="Gillette Stadium, home of the New England Revolution and Patriots."
            />

            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p>
                Located in Foxborough, <strong>Gillette Stadium</strong> is a modern, open-air venue surrounded by <strong>Patriot Place</strong>, an entertainment district that makes match days feel bigger than just 90 minutes of football. The catch is geography: it’s <strong>29 miles (47 km) southwest of downtown Boston</strong>. That distance is fine when you plan it—and a nightmare when you don’t.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className=" p-8 rounded-[2rem]">
                <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Key Features</h4>
                <ul className="space-y-4">
                  {[
                    { label: "Distance from Boston", val: "29 miles / 47 km" },
                    { label: "Transit (Event Days)", val: "Commuter Rail to Foxboro Station" },
                    { label: "Parking Options", val: "General + prepaid (event dependent)" },
                    { label: "Bag Policy", val: "Clear bag rules apply" },
                    { label: "Roof", val: "Open Air" },
                    { label: "Opened", val: "2002" },
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
                <ul className="space-y-4 text-slate-600 dark:text-slate-400 font-medium">
                  <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> If an event train is offered, take it. Post-match road traffic is the Boston vacation killer.</li>
                  <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> This is an open-air stadium. Pack for sun, humidity, and sudden rain.</li>
                  <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Tailgating is part of the culture. Even if you don’t drink, it’s worth walking through.</li>
                  <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Screenshot your ticket and your return plan. Cell service can get patchy in crowds.</li>
                </ul>
              </div>
            </div>
            
            <div className="p-8 rounded-[2rem] border border-emerald-500/20">
              <p className="text-lg text-center font-medium text-emerald-800 dark:text-emerald-200">
                <strong>Getting There:</strong> Check MBTA’s Gillette Stadium page for <strong>special event trains</strong> and fares, and Gillette’s own transportation pages for the latest parking and rideshare pickup rules.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <AffiliateButton href="https://www.mbta.com/destinations/gillette-stadium" text="MBTA Event Train Info" variant="secondary" icon={Train} />
                <AffiliateButton href="/gillette-stadium-world-cup-2026" text="Read Our Gillette Stadium Guide" variant="outline" icon={MapPin} />
              </div>
            </div>
          </Section>

          <Section id="tips" title="Match Day Gameplan">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                { title: "Departure", text: "Make South Station your anchor. Buy Commuter Rail tickets in advance and activate right before boarding. Assume you’ll want a buffer." },
                { title: "Clear Bag", text: "Gillette enforces a strict clear bag policy. If your bag is too big, you’ll lose time (and patience) at entry." },
                { title: "Post-Match", text: "Decide your post-match plan before kickoff. If you’re on a train, be ready to move when the crowd moves." }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold mb-3">{item.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <AffiliateButton href="https://www.gillettestadium.com/bag-policy/" text="Official Bag Policy" variant="outline" icon={Shield} />
              <AffiliateButton href="https://www.amazon.com/s?k=clear+stadium+bag&tag=stadiumport-20" text="Stadium-Approved Clear Bags" variant="primary" icon={Briefcase} />
              <AffiliateButton href="https://www.mbta.com/mbta-endorsed-apps" text="Get MBTA Apps (mTicket)" variant="secondary" icon={Train} />
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
                    { stage: "Round of 32", count: "1 Match", color: "text-emerald-300" },
                    { stage: "Quarter-Final", count: "1 Match", color: "text-amber-400" }
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
                  Missed the draw? Trusted resale platforms offer verified tickets, though prices can rise sharply for knockout matches. Use buyer protection and avoid off-platform payment requests.
                </p>
                <AffiliateButton href="https://www.stubhub.com/" text="Check StubHub" variant="primary" />
              </div>
            </div>
          </Section>

          <Section id="hotels" title="Where to Stay">
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl leading-relaxed">
              Boston hotels are among the most expensive in the U.S., and match-week demand will push rates higher. The winning move is to pick a neighborhood you’ll actually enjoy <em>between</em> matches, then build a reliable route to South Station for stadium days. Foxborough hotels are convenient for the stadium, but you’ll sacrifice the city.
            </p>
            
            <div className="space-y-8">
              <HotelCard 
                name="HI Boston Hostel (Downtown)"
                rating={4.3}
                price="$"
                distance="Walk to South Station"
                features={['Budget-friendly', 'Social vibe', 'Modern & Clean']}
                image="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80" 
                link="https://www.booking.com/hotel/us/hi-boston.html"
              />
              <HotelCard 
                name="The Revolution Hotel (South End)"
                rating={4.2}
                price="$$"
                distance="Back Bay / South End"
                features={['Boutique style', 'Trendy', 'Great value']}
                image="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80" 
                link="https://www.booking.com/hotel/us/the-revolution.html"
              />
              <HotelCard 
                name="Fairmont Copley Plaza (Back Bay)"
                rating={4.4}
                price="$$$$"
                distance="Copley Sq / Back Bay"
                features={['Historic Luxury', 'Gold Lounge', 'Grand Ballroom']}
                image="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80" 
                link="https://www.booking.com/hotel/us/fairmont-copley-plaza.html"
              />
            </div>
            
            <div className="mt-12 text-center">
              <AffiliateButton href="https://www.booking.com/city/us/boston.html" text="Search All Boston Hotels" variant="outline" />
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
                    <h4 className="font-bold text-xl mb-2">The T (MBTA)</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Boston’s subway is old, imperfect, and still the fastest way to get across the core when traffic is ugly. The Red, Green, Orange, and Blue lines do the heavy lifting.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                    <Plane className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Logan Airport (BOS)</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      BOS is extremely close to downtown for a major U.S. airport. The SL1 bus from Logan to South Station is one of Boston’s best value moves, and it sets you up perfectly for commuter rail connections.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                    <Car className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Driving</h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Driving in Boston is an art form and most visitors don’t have the brush. Parking is expensive, streets are oddly shaped, and you’ll lose time. Consider a rental car only if you’re doing day trips or you want full control for Foxborough.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className=" rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 h-fit">
                <h4 className="font-bold text-2xl mb-6">Distance to Stadium</h4>
                <ul className="space-y-6">
                  {[
                    { label: "South Station (Boston)", time: "Event train when offered" },
                    { label: "Downtown Boston (general)", time: "Plan for a long matchday window" },
                    { label: "Providence (RI)", time: "Event train for select dates" },
                    { label: "Driving", time: "Variable + traffic dependent" }
                  ].map((item, i) => (
                    <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
                      <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
                      <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
                  <AffiliateButton href="https://www.discovercars.com/" text="Compare Rental Cars" variant="secondary" icon={Car} />
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Cheapest Airport → Hotel Hack</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-6">
                  If you land at Logan and your hotel is anywhere near Downtown, Back Bay, Seaport, or the subway lines, start with the SL1 to South Station. It’s simple, luggage-friendly, and doesn’t require a “Boston driving” personality.
                </p>
                <div className="flex flex-wrap gap-4">
                  <AffiliateButton href="https://www.mbta.com/destinations/logan-airport" text="MBTA Logan Transit Guide" variant="outline" icon={Bus} />
                  <AffiliateButton href="https://www.booking.com/city/us/boston.html" text="Pick a Transit-Friendly Hotel" variant="primary" icon={Hotel} />
                </div>
              </div>
              <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Fastest “I’m Late” Option</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-6">
                  When time is tight, don’t do cute detours. Get to South Station, get on the right train, and save your wandering for the next morning.
                </p>
                <div className="flex flex-wrap gap-4">
                  <AffiliateButton href="https://www.google.com/maps" text="Navigate in Google Maps" variant="outline" icon={MapPin} />
                  <AffiliateButton href="https://www.mbta.com/destinations/gillette-stadium" text="Check Gillette Train Options" variant="secondary" icon={Train} />
                </div>
              </div>
            </div>
          </Section>

          <Section id="dining" title="Food & Drink">
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-4xl leading-relaxed">
              Boston eats better than people expect, and it’s not just lobster rolls. The best food plan is simple: one classic seafood moment, one North End night, one “this is why I love living here” neighborhood meal that isn’t aimed at tourists.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-10">
              {[
                { title: "Seafood Classics", desc: "Yes, you should try chowder and a lobster roll. The local move is to do it once, do it properly, then move on to everything else Boston does well." },
                { title: "North End Night", desc: "Dinner in the North End is a ritual. If you hate lines, eat early and walk late. And yes, people really argue about cannoli." },
                { title: "Beer + Pre-Match Energy", desc: "New England IPAs are the home soundtrack. Trillium and Harpoon are the easy answers; smaller spots fill in the gaps." }
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
            <div className="flex flex-wrap gap-4">
              <AffiliateButton href="https://www.opentable.com/boston-restaurants" text="Book Boston Restaurants" variant="primary" icon={Utensils} />
              <AffiliateButton href="https://resy.com/cities/boston-ma" text="Find Hot Tables on Resy" variant="outline" icon={Star} />
            </div>
          </Section>

          <Section id="attractions" title="Top Attractions">
            <p className="mb-8 text-xl text-slate-600 dark:text-slate-300">
              Boston is a walking city. You can cover 400 years of history in a single afternoon, then still have energy for a sunset by the harbor. My advice: pick two anchor attractions per day and let the rest happen naturally.
            </p>
            <div className="space-y-6">
              {[
                { title: "Freedom Trail", desc: "A 2.5-mile red-lined route leading to 16 historically significant sites. Start at Boston Common.", color: "text-red-600" },
                { title: "Fenway Park", desc: "The oldest ballpark in MLB. Even if there's no game, the tour is a pilgrimage for sports fans.", color: "text-green-600" },
                { title: "Seaport District", desc: "The modern face of Boston. Rooftop bars, ICA museum, and harbor views.", color: "text-blue-500" }
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
              <AffiliateButton href="https://www.citypass.com/boston" text="Get Boston CityPASS" variant="primary" />
              <AffiliateButton href="https://www.viator.com/Boston/d678-ttd" text="Browse Boston Tours" variant="secondary" />
            </div>
          </Section>

          <Section id="safety" title="Safety & Security">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-[2rem]">
                <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> Event Patterns</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Boston is generally safe for visitors, especially in the central neighborhoods you’ll likely stay in. Your most common “danger” is honestly the street layout and impatient drivers. Cross like a local: alert, quick, and not glued to your phone.
                </p>
              </div>
              <div className="p-8 rounded-[2rem]">
                <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Practical Tips</h4>
                <ul className="space-y-4 text-slate-600 dark:text-slate-300">
                  <li>• Late night T service is limited (ends ~12:30 AM).</li>
                  <li>• Downtown Crossing can be sketchy very late at night.</li>
                  <li>• The Mass & Cass area can be rough; don’t wander there as a visitor.</li>
                </ul>
                <div className="mt-6">
                  <AffiliateButton href="https://www.worldnomads.com/" text="Get Travel Insurance" variant="secondary" />
                </div>
              </div>
            </div>
          </Section>

          <Section id="culture" title="Cultural Intelligence">
            <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">
              Bostonians are direct. Not rude, not warm-and-fuzzy—just direct. If someone sounds sharp, it’s often efficiency, not hostility. Sports loyalty is real. And yes, “wicked” means “very,” as in “that goal was wicked good.”
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Local Phrases", desc: "Wicked = very. Packie = liquor store. Rotary = roundabout. If you nail ‘packie,’ you’ll sound like you live here." },
                { title: "Walking City", desc: "Boston rewards walking. The fastest route is often the one you can do on foot." },
                { title: "Early Nights", desc: "Bars close at 2 AM. Transit winds down earlier. Start your night earlier than you’re used to." }
              ].map((item, i) => (
                <div key={i} className="p-6 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-2xl">
                  <h4 className="font-bold mb-3">{item.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">What Most Boston Guides Miss</h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-lg">
                {[
                  "Gillette is a full match-day commitment. Treat it like a planned excursion, not a casual subway stop.",
                  "South Station is the key node for airport + commuter rail + day trips—pick lodging that respects that.",
                  "Boston’s nightlife is real, but it starts earlier and ends earlier than many visitors expect.",
                  "The city is compact: don’t waste money on rideshares for distances you can walk in 15 minutes."
                ].map((t, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          <Section id="packing" title="Climate & Packing">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-8 rounded-[2rem]">
                <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Sun className="w-6 h-6 text-amber-500"/> June–July Weather</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Expect warm, sometimes humid days and cooler nights near the water. The sneaky factor is rain: it can flip quickly, and Gillette is exposed.
                </p>
              </div>
              <div className="p-8 rounded-[2rem]">
                <h4 className="font-bold text-xl mb-4">Essentials</h4>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li>• Sturdy walking shoes (cobblestones!)</li>
                  <li>• Light jacket for evenings</li>
                  <li>• Sunglasses + sunscreen</li>
                  <li>• Light rain shell (not a heavy coat)</li>
                </ul>
              </div>
              <div className="p-8 rounded-[2rem]">
                <h4 className="font-bold text-xl mb-4">Tech</h4>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-6">
                  <li>• US plug adapters (Type A/B)</li>
                  <li>• MBTA mTicket (for commuter rail)</li>
                  <li>• Uber/Lyft App</li>
                  <li>• Offline maps + battery pack</li>
                </ul>
                <AffiliateButton href="https://airalo.tp.st/yF9Qk3Ol" text="Get US eSIM" variant="secondary" />
              </div>
            </div>
          </Section>

          <Section id="faq" title="Frequently Asked Questions">
            <div className="space-y-2">
              {[
                { q: "Is Gillette Stadium actually in Boston?", a: "No. Gillette is in Foxborough, 29 miles (47 km) southwest of downtown Boston. Treat it as a matchday excursion." },
                { q: "What’s the best way to get to Gillette Stadium?", a: "The MBTA Commuter Rail to Foxboro Station is the easiest option when special event trains run. Check MBTA’s Gillette Stadium destination page for what’s offered on your date." },
                { q: "Where should I stay for World Cup 2026 in Boston?", a: "Back Bay is the easiest base for most visitors. Seaport is great for a modern waterfront vibe. Downtown/Waterfront is best for history-on-foot. Foxborough is only for stadium-first convenience." },
                { q: "How do I get from Logan Airport (BOS) to downtown?", a: "For most travelers, the Silver Line SL1 bus to South Station is the cleanest budget move. From there you can connect to the subway, commuter rail, or walk into Seaport." },
                { q: "Should I rent a car in Boston?", a: "Usually no. The city is compact and transit-friendly, while parking is expensive. Consider a car only if you’re doing day trips or you want total control for Foxborough." },
                { q: "How early should I leave for the stadium?", a: "Aim to arrive at Foxborough 2–3 hours before kickoff. That buffer covers security, food, and the inevitable little delays." },
                { q: "Is Boston expensive during summer?", a: "Yes. Summer is peak season, and World Cup demand will amplify it. Book lodging early and choose a neighborhood you’ll enjoy between matches." },
                { q: "Do Boston bars really close at 2 AM?", a: "Yes. 2 AM is the hard stop. Also, the MBTA stops earlier than many visitors expect, so plan your ride home." },
                { q: "What should I eat in Boston at least once?", a: "Do one seafood moment (chowder or lobster roll), one North End dinner, and one local bakery/coffee stop. Then chase whatever your taste buds want." },
                { q: "Is Gillette Stadium covered?", a: "No. It’s open-air. Pack for sun and possible rain—especially if you’re sitting high up where wind hits." },
                { q: "Is Boston safe for tourists?", a: "Generally, yes—especially in the neighborhoods most visitors stay in. Use standard city awareness late at night and keep your belongings secure in crowds." },
                { q: "What’s the easiest way to sound local?", a: "Drop ‘wicked’ naturally, and call the liquor store a ‘packie.’ Don’t overdo it, though—we can tell." }
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
                  <li className="flex justify-between"><strong>Hospital</strong> <span>Mass General / Brigham & Women's</span></li>
                </ul>
              </div>
              <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-emerald-500"/> Connectivity</h4>
                <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6">
                  <li>• <strong>WiFi:</strong> Free in Logan Airport and many public spaces.</li>
                  <li>• <strong>Power:</strong> 120V, Type A/B plugs.</li>
                  <li>• <strong>Sim Cards:</strong> Available at Logan Airport kiosks.</li>
                </ul>
                <AffiliateButton href="https://airalo.tp.st/yF9Qk3Ol" text="Get an Airalo eSIM" variant="secondary" />
              </div>
            </div>
          </Section>

          <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Explore Other Host Cities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'New York / New Jersey', href: '/world-cup-2026-new-york-new-jersey-guide' },
                { name: 'Los Angeles', href: '/world-cup-2026-los-angeles-guide' },
                { name: 'Mexico City', href: '/world-cup-2026-mexico-city-guide' },
                { name: 'Toronto', href: '/world-cup-2026-toronto-guide' },
                { name: 'Dallas', href: '/world-cup-2026-dallas-guide' },
                { name: 'Miami', href: '/world-cup-2026-miami-guide' },
                { name: 'Seattle', href: '/world-cup-2026-seattle-guide' },
                { name: 'Atlanta', href: '/world-cup-2026-atlanta-guide' },
              ].map((city) => (
                <Link key={city.href} href={city.href} className="block p-4 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center font-bold text-slate-700 dark:text-slate-200">
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
