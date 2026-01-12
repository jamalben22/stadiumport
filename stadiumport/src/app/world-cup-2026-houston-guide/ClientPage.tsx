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
 X, ChevronRight, Facebook, Twitter, Linkedin, Copy,
 Thermometer, Droplets, Wind, Music, ShoppingBag
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
 { id: 'weather', label: 'Weather' },
 { id: 'neighborhoods', label: 'Neighborhoods' },
 { id: 'itineraries', label: 'Itineraries' },
 { id: 'visa', label: 'Visa & Entry' },
 { id: 'planning', label: 'Planning' },
 { id: 'budget', label: 'Budget' },
 { id: 'stadium', label: 'Stadium' },
 { id: 'tickets', label: 'Tickets' },
 { id: 'matches', label: 'Matches' },
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
            src="/images/cities/houston-world-cup-2026-1600.webp" 
            alt="Houston Skyline" 
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
                { label: 'Houston', href: '/world-cup-2026-houston-guide' }
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
                  7 Matches in 2026
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9] md:leading-[0.95]">
                Houston World Cup 2026 Guide
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-white/90 font-light max-w-3xl leading-relaxed">
                A practical, local-feeling playbook for <span className="text-white font-medium">NRG Stadium</span>, the Red Line, and the neighborhoods you’ll actually enjoy.
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
 Houston doesn’t behave like a postcard city. It’s big. It’s humid. It’s famously car-forward. And yet, for World Cup 2026, it becomes surprisingly simple if you base yourself on one spine: METRORail’s Red Line, which runs through Downtown, Midtown, the Museum District, the Texas Medical Center, and down to NRG Park.
 </p>
 <p className="text-lg text-slate-600 dark:text-slate-300">
 The win condition for this Houston World Cup 2026 guide is not “see everything.” It’s “move smart, stay cool, eat outrageously well, and never waste match day in traffic.”
 </p>
 </div>
 <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 mb-12">
   <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Quick Answers (Featured Snippet Friendly)</h3>
   <div className="grid md:grid-cols-2 gap-6 text-slate-700 dark:text-slate-300">
     <div className="space-y-3">
       <p><span className="font-bold">Best area to stay:</span> Downtown, Midtown, Museum District, or the Medical Center (Red Line access).</p>
       <p><span className="font-bold">Best way to reach NRG Stadium:</span> METRORail Red Line to Stadium Park / Astrodome station.</p>
       <p><span className="font-bold">Do you need a car?</span> Not if you stay on the rail corridor; yes if you want day trips and suburbs.</p>
     </div>
     <div className="space-y-3">
       <p><span className="font-bold">Houston summer reality:</span> Hot + humid with pop-up storms; plan for AC-to-AC travel.</p>
       <p><span className="font-bold">Biggest rookie mistake:</span> Driving to NRG Park close to kickoff.</p>
       <p><span className="font-bold">Food you can’t skip:</span> Tex-Mex, Vietnamese, Viet-Cajun, and proper Texas BBQ.</p>
     </div>
   </div>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: MapPin, title: "Where to Base", text: "Pick a neighborhood that touches the Red Line. Downtown and the Medical Center are the easiest match-day bases." },
 { icon: Train, title: "Transport Strategy", text: "Rail for match day, rideshare for late nights, and plan your meals around where you already are." },
 { icon: DollarSign, title: "Budget Signals", text: "Houston can be excellent value compared with coastal host cities, but big events spike prices fast." }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] transition-colors">
 <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
            <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/iah" text="Search Houston Flights" variant="secondary" icon={Plane} />
            <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Downtown+Houston" text="Check Downtown Hotels" variant="primary" icon={Hotel} />
          </div>
 </Section>

 <Section id="weather" title="Weather (June–July) + Heat Survival">
   <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
     <p>
       Houston in June and July is the kind of weather that makes you respect shade. Expect heat, humidity, and the occasional dramatic thunderstorm that rolls in like it has a personal grudge. The good news: the city is built for air conditioning, and NRG Stadium is a retractable-roof venue.
     </p>
     <p>
       Pack for “outside feels like a sauna, inside feels like a freezer.” A light jacket for indoor AC is not a joke. It’s Houston common sense.
     </p>
   </div>
   <div className="grid md:grid-cols-3 gap-8 mb-10">
     {[
       { icon: Thermometer, title: "Heat", text: "Plan early mornings and late evenings outdoors; midday is indoor time." },
       { icon: Droplets, title: "Humidity", text: "Moisture-wicking shirts beat cotton. Your future self will thank you." },
       { icon: Wind, title: "Storms", text: "Expect pop-up rain. Keep a tiny umbrella or packable rain shell." }
     ].map((item, i) => (
       <div key={i} className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
         <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
         <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
         <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
       </div>
     ))}
   </div>
   <div className="p-8 rounded-[2rem] border border-emerald-500/20">
     <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Heat Index Checklist</h3>
     <ul className="grid md:grid-cols-2 gap-3 text-slate-700 dark:text-slate-300">
       {[
         "Hydrate before you leave the hotel, not when you arrive.",
         "Electrolytes matter more than you think.",
         "Use sunscreen even on cloudy days.",
         "Schedule museum time as your midday reset."
       ].map((t) => (
         <li key={t} className="flex items-start gap-3">
           <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
           <span>{t}</span>
         </li>
       ))}
     </ul>
   </div>
 </Section>

 <Section id="neighborhoods" title="Neighborhood-by-Neighborhood (Where to Sleep, Eat, Play)">
   <LightboxImage
     src="/images/images articles/houston guide/Interactive Neighborhood Map.webp"
     alt="Houston neighborhood map for World Cup 2026: rail corridor, nightlife, family zones"
     caption="Neighborhood strategy: pick a base near the Red Line, then branch out by rideshare."
   />
   <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
     <p>
       Houston isn’t “Downtown or nothing.” It’s a patchwork of neighborhoods with totally different personalities. The trick is to choose a base that matches your travel style, then treat everything else like a short hop.
     </p>
     <p>
       If you’re here for matches first, stay on the Red Line corridor. If you’re here for food and nightlife, you can bend the rules a bit—just budget for rideshare.
     </p>
   </div>
   <div className="grid md:grid-cols-2 gap-8">
     {[
       {
         title: "Downtown",
         icon: MapPin,
         text:
           "Best for: first-timers, easy logistics, sports nights. You’re close to arenas, parks, and the rail spine. Use the Downtown tunnel system on weekdays for an air-conditioned lunch mission.",
       },
       {
         title: "Midtown",
         icon: Music,
         text:
           "Best for: bars, late dinners, and a younger vibe. It’s between Downtown and the Museum District, with plenty of Red Line access. Great compromise base if your group splits between match day discipline and nightlife chaos.",
       },
       {
         title: "Museum District + Hermann Park",
         icon: Camera,
         text:
           "Best for: families, culture, and daytime exploring. You’re near major museums and green space, with quick rail access to NRG Park. This is the calm, classy Houston you’ll want after a loud match night.",
       },
       {
         title: "Texas Medical Center (TMC)",
         icon: Briefcase,
         text:
           "Best for: match-day convenience. Hotel stock is large, rail access is excellent, and it’s relatively straightforward to get in/out. It’s not the most charming at night, but it’s efficient—like choosing the aisle seat.",
       },
       {
         title: "Montrose",
         icon: Star,
         text:
           "Best for: independent shops, coffee, art, and nightlife that’s more vibe than volume. Not directly on the rail, but rideshare times to Downtown and the Museum District are usually manageable.",
       },
       {
         title: "EaDo (East Downtown)",
         icon: Trophy,
         text:
           "Best for: breweries, soccer energy, and pregame culture. It’s near stadiums/venues and has a gritty-cool feel. If your group wants to watch matches in bars with actual noise, this is a strong candidate.",
       },
       {
         title: "The Heights",
         icon: ShoppingBag,
         text:
           "Best for: boutiques, brunch, and a slightly more local residential feel. Not on rail, but an easy rideshare to Downtown. Great if you’re extending your trip beyond match days.",
       },
       {
         title: "Uptown / Galleria",
         icon: Hotel,
         text:
           "Best for: shopping and corporate-style hotels. Transit to NRG can be slower by car in peak traffic; you’re trading match-day simplicity for hotel availability and big-brand comfort.",
       },
     ].map((n) => (
       <div key={n.title} className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
         <div className="flex items-center gap-3 mb-4">
           <n.icon className="w-6 h-6 text-emerald-500" />
           <h3 className="text-2xl font-black text-slate-900 dark:text-white">{n.title}</h3>
         </div>
         <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">{n.text}</p>
       </div>
     ))}
   </div>
   <div className="mt-12 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
     <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Affiliate Placement Suggestions</h3>
     <div className="grid md:grid-cols-2 gap-4 text-slate-700 dark:text-slate-300">
       <p>[Affiliate: Booking.com — Downtown Houston hotels (Red Line access)]</p>
       <p>[Affiliate: Booking.com — Texas Medical Center hotels (match-day efficiency)]</p>
       <p>[Affiliate: Hotel deals platform — flexible/refundable rates for World Cup weeks]</p>
       <p>[Affiliate: Airport transfer — prebooked pickup for late arrivals]</p>
     </div>
   </div>
 </Section>

 <Section id="itineraries" title="Itineraries (Pre-Match, Match Day, Post-Match)">
   <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
     <p>
       Below are three ready-to-run itineraries. They’re designed around Houston’s reality: heat, distance, and the fact that your best nights are usually the ones where you didn’t spend an hour searching for parking.
     </p>
   </div>
   <div className="space-y-8">
     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">3-Day “Matches First” (Efficient)</h3>
       <div className="grid md:grid-cols-3 gap-6 text-slate-700 dark:text-slate-300">
         <div>
           <h4 className="font-bold mb-2">Day 1 (Arrival)</h4>
           <p>Check in near the Red Line, grab an early dinner, and take a short rail ride to get your bearings.</p>
         </div>
         <div>
           <h4 className="font-bold mb-2">Day 2 (Match Day)</h4>
           <p>Late brunch, museum time indoors, rail to NRG Park with time to spare, then post-match drinks back in Midtown or EaDo.</p>
         </div>
         <div>
           <h4 className="font-bold mb-2">Day 3 (Recovery)</h4>
           <p>Breakfast tacos, a slow walk in a shaded park, and one “big meal” before you fly out.</p>
         </div>
       </div>
     </div>

     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">4-Day “Food City” (Eat Like You Mean It)</h3>
       <p className="text-slate-600 dark:text-slate-400 text-lg mb-6">
         Houston’s dining scene is not a side quest. It’s a main storyline. Mix cuisines the way locals do: tacos one meal, Vietnamese the next, BBQ the next, and somehow you’re still hungry.
       </p>
       <div className="grid md:grid-cols-2 gap-6 text-slate-700 dark:text-slate-300">
         <p><span className="font-bold">Night 1:</span> Tex-Mex + margaritas (start here; it calibrates your trip).</p>
         <p><span className="font-bold">Day 2:</span> Vietnamese lunch, then a brewery crawl where you don’t have to shout to talk.</p>
         <p><span className="font-bold">Day 3 (Match Day):</span> Light meal pre-match, big meal post-match.</p>
         <p><span className="font-bold">Day 4:</span> BBQ early (popular spots sell out) then dessert and a walk.</p>
       </div>
       <div className="mt-8">
         <p className="text-slate-700 dark:text-slate-300">[Affiliate: Restaurant reservations platform — book World Cup week tables in advance]</p>
       </div>
     </div>

     <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
       <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">5-Day “Families + First-Timers”</h3>
       <p className="text-slate-600 dark:text-slate-400 text-lg mb-6">
         Keep it simple: museums, parks, the zoo area, and one “wow” day that feels like Space City.
       </p>
       <div className="grid md:grid-cols-3 gap-6 text-slate-700 dark:text-slate-300">
         <div>
           <h4 className="font-bold mb-2">Day 1</h4>
           <p>Settle in, early night, and lock down your match-day plan.</p>
         </div>
         <div>
           <h4 className="font-bold mb-2">Day 2</h4>
           <p>Museum District + shaded park time, then dinner near your hotel.</p>
         </div>
         <div>
           <h4 className="font-bold mb-2">Day 3</h4>
           <p>Match day with a long buffer and a calm post-match meal.</p>
         </div>
       </div>
       <div className="mt-8">
         <p className="text-slate-700 dark:text-slate-300">[Affiliate: Tours/experiences platform — family-friendly Houston highlights and day trips]</p>
       </div>
     </div>
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
              {['Use automated passport control at IAH', 'Proof of onward travel required', 'Carry digital copies of tickets'].map((item, i) => (
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
 { time: "6–9 Months Out", desc: "Book flights and refundable hotels in Downtown/Medical Center. Set price alerts." },
 { time: "3–6 Months Out", desc: "Confirm match tickets. Reserve airport transfers and key restaurants (BBQ spots fill up)." },
 { time: "1–3 Months Out", desc: "Lock in eSIMs, clear stadium bags, and Space Center tours. Re-price hotels weekly." }
 ].map((item, i) => (
  <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center">
   <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
   <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
  </div>
 ))}
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
          <AffiliateButton href="https://www.google.com/travel/flights" text="Set Flight Alerts" variant="primary" icon={Plane} />
        </div>
 </Section>

 <Section id="budget" title="Budgeting">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
   <p>
     Houston can be a strong value play compared with coastal host cities, but World Cup weeks compress supply. The biggest lever is your hotel location: stay on the rail corridor and you’ll spend less time (and money) fixing transportation mistakes.
   </p>
 </div>

 <div className="grid md:grid-cols-3 gap-8 mb-10">
   <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
     <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Budget</h3>
     <ul className="space-y-3 text-slate-700 dark:text-slate-300">
       <li className="flex justify-between gap-6"><span>Hotels</span><span className="font-bold">$100–$170/night (typical)</span></li>
       <li className="flex justify-between gap-6"><span>Local meal</span><span className="font-bold">$12–$20</span></li>
       <li className="flex justify-between gap-6"><span>METRO rail fare</span><span className="font-bold">$1.25 (3-hour pass)</span></li>
     </ul>
     <div className="mt-6">
       <p className="text-slate-600 dark:text-slate-400">[Affiliate: Budget-friendly hotels near METRORail Red Line]</p>
     </div>
   </div>
   <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
     <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Mid-Range</h3>
     <ul className="space-y-3 text-slate-700 dark:text-slate-300">
       <li className="flex justify-between gap-6"><span>Hotels</span><span className="font-bold">$180–$320/night (typical)</span></li>
       <li className="flex justify-between gap-6"><span>Dinner + drinks</span><span className="font-bold">$35–$70</span></li>
       <li className="flex justify-between gap-6"><span>Rideshare (short hop)</span><span className="font-bold">$10–$25</span></li>
     </ul>
     <div className="mt-6">
       <p className="text-slate-600 dark:text-slate-400">[Affiliate: Hotel deals with free cancellation + price alerts]</p>
     </div>
   </div>
   <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
     <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Luxury</h3>
     <ul className="space-y-3 text-slate-700 dark:text-slate-300">
       <li className="flex justify-between gap-6"><span>Hotels</span><span className="font-bold">$350+/night (typical)</span></li>
       <li className="flex justify-between gap-6"><span>Chef-driven dinner</span><span className="font-bold">$80–$200+</span></li>
       <li className="flex justify-between gap-6"><span>Hospitality packages</span><span className="font-bold">Varies</span></li>
     </ul>
     <div className="mt-6">
       <p className="text-slate-600 dark:text-slate-400">[Affiliate: VIP hospitality packages (official)]</p>
     </div>
   </div>
 </div>

 <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
   <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Money-Saving Moves</h3>
   <ul className="grid md:grid-cols-2 gap-3 text-slate-700 dark:text-slate-300">
     {[
       "Choose a hotel you can reach by rail on match days.",
       "Book refundable rooms early, then re-check prices monthly.",
       "Plan one big BBQ meal, not three; you’ll want variety.",
       "Buy eSIM data before arrival so maps work instantly."
     ].map((t) => (
       <li key={t} className="flex items-start gap-3">
         <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
         <span>{t}</span>
       </li>
     ))}
   </ul>
   <div className="mt-6 grid md:grid-cols-2 gap-3 text-slate-700 dark:text-slate-300">
     <p>[Affiliate: eSIM provider — activate before landing at IAH/HOU]</p>
     <p>[Affiliate: Travel insurance — trip delay + event coverage]</p>
   </div>
 </div>
 </Section>

 <Section id="stadium" title="NRG Stadium">
 <LightboxImage 
 src="/images/stadiums/nrg-stadium-houston-texas-world-cup-2026-1600.webp" 
 alt="NRG Stadium Interior" 
 caption="NRG Stadium (NRG Park): a retractable-roof venue built for Houston summers."
 />
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 <strong>NRG Stadium</strong> is Houston’s World Cup stage, inside the larger NRG Park complex. For FIFA events, naming rules may change how it’s branded publicly, but locals will still call it “NRG.”
 </p>
 <p>
 If you want the simplest possible match day: stay near the Red Line, ride southbound, and get off at <strong>Stadium Park / Astrodome</strong>. Everything else is optional.
 </p>
 <p>
 Read the venue deep-dive: <Link href="/nrg-stadium-world-cup-2026" className="text-emerald-600 dark:text-emerald-400 font-bold">NRG Stadium World Cup 2026 guide</Link>.
 </p>
 </div>
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Key Features</h4>
 <ul className="space-y-4">
 {[
 { label: "Capacity", val: "72,220" },
 { label: "Roof", val: "Retractable" },
 { label: "Complex", val: "NRG Park" },
 { label: "Opened", val: "2002" }
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
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Arrive early: security lines + heat slow everything down.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Expect bag restrictions: plan for a small, clear bag and verify event rules close to your match.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Rail beats parking: driving can work, but it’s the hardest mode on big-event days.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Post-match: don’t fight the first train; let the surge pass with a snack and photos.</li>
 </ul>
 </div>
 </div>
 <div className="p-8 rounded-[2rem] border border-emerald-500/20">
 <p className="text-lg text-center font-medium text-emerald-800 dark:text-emerald-200">
 <strong>Getting There:</strong> METRORail Red Line serves NRG Park via Stadium Park / Astrodome station, connecting Downtown, Midtown, the Museum District, and the Texas Medical Center.
 </p>
 </div>
 <div className="mt-10 grid md:grid-cols-2 gap-4">
   <p className="text-slate-700 dark:text-slate-300">[Affiliate: Stadium tours/experiences — NRG Stadium tours (when available)]</p>
   <p className="text-slate-700 dark:text-slate-300">[Affiliate: Official merchandise — jerseys, scarves, match-day essentials]</p>
 </div>
 </Section>

 <Section id="tickets" title="Tickets">
 <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-[2.5rem] p-8 md:p-12 text-slate-900 dark:text-white overflow-hidden relative">
 <div className="relative z-10">
 <h3 className="text-3xl font-black mb-6">Official Sales Phase</h3>
 <p className="text-emerald-100 text-lg mb-8 max-w-2xl">
 Tickets will be sold exclusively through FIFA's official portal. Sign up for the lottery now to secure your chance.
 </p>
 <div className="flex flex-wrap gap-4">
            <AffiliateButton href="https://www.fifa.com/tickets" text="FIFA Portal" variant="secondary" />
            <AffiliateButton href="https://www.fifa.com/worldcup/tickets" text="Set Alert" variant="outline" />
          </div>
 </div>
 <Ticket className="absolute -bottom-12 -right-12 w-96 h-96 text-emerald-400/20 rotate-12" />
 </div>
 </Section>

 <Section id="matches" title="Match Schedule">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
   <p>
     Houston is scheduled to host <strong>seven</strong> World Cup matches at NRG Stadium. Matchups and kickoff times are controlled by FIFA and depend on the draw and the official tournament schedule.
   </p>
   <p>
     This page is built to stay useful even before the final match list drops: hotels, transport, and match-day strategy are the parts you can lock in early.
   </p>
 </div>

 <div className="grid md:grid-cols-3 gap-8 mb-10">
   {[
     { title: "What’s Confirmed", text: "Houston is a Host City and will stage multiple matches at NRG Stadium." },
     { title: "What Changes", text: "Teams, dates, and kickoff times (FIFA controls the schedule)." },
     { title: "What You Can Do Now", text: "Book refundable hotels, learn the rail corridor, and pre-plan match day." }
   ].map((item) => (
     <div key={item.title} className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
       <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">{item.title}</h3>
       <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
     </div>
   ))}
 </div>

 <div className="flex flex-wrap gap-4">
   <AffiliateButton href="https://www.fifa.com/tickets" text="Track FIFA Ticket Phases" variant="secondary" icon={Ticket} />
   <AffiliateButton href="https://www.fifa.com/" text="Check Official Schedule" variant="outline" icon={Calendar} />
 </div>
 </Section>

 <Section id="hotels" title="Where to Stay">
 <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
 The best match-day bases are <strong>Downtown</strong>, <strong>Midtown</strong>, the <strong>Museum District</strong>, and the <strong>Texas Medical Center</strong>—because they plug into the METRORail Red Line. If you can step out of your hotel, ride one line, and step off near NRG Park, you’ve solved Houston.
 </p>
 <div className="grid md:grid-cols-2 gap-8 mb-12">
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

 <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
   <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Booking Strategy</h3>
   <ul className="grid md:grid-cols-2 gap-3 text-slate-700 dark:text-slate-300">
     {[
       "Prioritize Red Line access over “closest hotel by car.”",
       "Book refundable first, then optimize price later.",
       "Avoid “too good to be true” third-party ticket bundles.",
       "If you’re driving, confirm parking and daily fees in writing."
     ].map((t) => (
       <li key={t} className="flex items-start gap-3">
         <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
         <span>{t}</span>
       </li>
     ))}
   </ul>
   <div className="mt-6 grid md:grid-cols-2 gap-3 text-slate-700 dark:text-slate-300">
     <p>[Affiliate: Booking.com — filter for “free cancellation” + “near public transport”]</p>
     <p>[Affiliate: Hotel booking platform — price alerts for World Cup weeks]</p>
   </div>
 </div>
 </Section>

 <Section id="transport" title="Getting Around">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
   <p>
     Houston transportation is a personality test. If you like flexibility, you’ll rent a car. If you like sanity on match day, you’ll ride METRORail. Most visitors end up with a hybrid plan: rail for NRG Park, rideshare for late nights, and a car only if you’re doing day trips.
   </p>
 </div>

 <div className="grid md:grid-cols-2 gap-8 mb-10">
   <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
     <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Train className="w-6 h-6 text-emerald-500"/> METRORail (Red Line) = Match-Day Cheat Code</h4>
     <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
       The Red Line runs north–south through central Houston and provides access to NRG Park via <strong>Stadium Park / Astrodome</strong> station. It’s the cleanest “avoid traffic” move you can make.
     </p>
     <ul className="space-y-3 text-slate-700 dark:text-slate-300">
       {[
         "Regular fare: $1.25 (3-hour pass).",
         "Day Pass: $3 (great for bouncing between neighborhoods on rail).",
         "Transfer tip: if you pay with the same method, transfers can apply within a window."
       ].map((t) => (
         <li key={t} className="flex items-start gap-3">
           <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
           <span>{t}</span>
         </li>
       ))}
     </ul>
     <div className="mt-6 grid gap-3 text-slate-700 dark:text-slate-300">
       <p>[Affiliate: eSIM provider — keep maps working underground/in transit]</p>
       <p>[Affiliate: Airport transfer — prebook a late-night pickup]</p>
     </div>
   </div>

   <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
     <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Plane className="w-6 h-6 text-emerald-500"/> Airport Options (IAH + HOU)</h4>
     <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
       Bush Intercontinental (IAH) is the main international gateway. Hobby (HOU) is smaller and usually simpler. Your best “cheap + reliable” move from IAH is often a METRO bus into Downtown, then rail.
     </p>
     <div className="space-y-4 text-slate-700 dark:text-slate-300">
       <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
         <p className="font-bold">METRO 500 IAH Downtown Direct</p>
         <p className="text-slate-600 dark:text-slate-400">Nonstop to the George R. Brown Convention Center for $4.50.</p>
       </div>
       <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
         <p className="font-bold">METRO 102 Bush IAH</p>
         <p className="text-slate-600 dark:text-slate-400">Local route to Downtown for $1.25.</p>
       </div>
     </div>
     <div className="mt-8 flex flex-wrap gap-4">
       <AffiliateButton href="https://www.uber.com/" text="Rideshare Pickup" variant="secondary" icon={Car} />
       <AffiliateButton href="https://www.ridemetro.org/" text="METRO Trip Planner" variant="outline" icon={Bus} />
     </div>
   </div>
 </div>

 <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 mb-10">
   <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">StadiumPort Straight-Line Distance Index</h3>
   <p className="text-slate-600 dark:text-slate-400 mb-6">
     These are straight-line distances (not driving distances). They’re useful for sanity-checking how “close” something really is in a city where a short distance can still mean a long trip.
   </p>
   <div className="grid md:grid-cols-2 gap-4 text-slate-700 dark:text-slate-300">
     {[
       { a: "NRG Stadium → Downtown", v: "9.3 km / 5.8 mi" },
       { a: "NRG Stadium → IAH", v: "34.7 km / 21.6 mi" },
       { a: "NRG Stadium → HOU", v: "13.5 km / 8.4 mi" },
       { a: "Downtown → IAH", v: "25.7 km / 16.0 mi" },
       { a: "Downtown → HOU", v: "15.5 km / 9.6 mi" },
     ].map((row) => (
       <div key={row.a} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800">
         <span className="font-bold">{row.a}</span>
         <span>{row.v}</span>
       </div>
     ))}
   </div>
 </div>

 <div className="p-8 rounded-[2rem] border border-amber-100 dark:border-amber-800">
   <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Local Transportation Language (So You Don’t Get Lost)</h3>
   <div className="grid md:grid-cols-2 gap-4 text-slate-700 dark:text-slate-300">
     <p><span className="font-bold">“Feeder” / “service road”</span>: the road running alongside a freeway.</p>
     <p><span className="font-bold">“The Loop”</span>: I-610 around central Houston.</p>
     <p><span className="font-bold">“The Beltway”</span>: Beltway 8 (Sam Houston Tollway).</p>
     <p><span className="font-bold">“It’s 20 minutes away”</span>: translate as “unless it’s rush hour.”</p>
   </div>
 </div>
 </Section>

 <Section id="dining" title="Local Cuisine">
 <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
 Houston has one of the best food scenes in the US. Do not leave without trying <strong>Viet-Cajun Crawfish</strong>, authentic <strong>Tex-Mex</strong>, and slow-smoked <strong>BBQ</strong>.
 </p>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { name: "Viet-Cajun Crawfish", desc: "Spicy, garlic-buttery shellfish.", icon: Utensils },
 { name: "Texas BBQ", desc: "Brisket and ribs. Slow smoked.", icon: Utensils },
 { name: "Tex-Mex", desc: "Fajitas and margaritas.", icon: Utensils }
 ].map((food, i) => (
 <div key={i} className=" p-8 rounded-[2rem] transition-colors">
 <div className="w-12 h-12 rounded-full flex items-center justify-center text-emerald-600 mb-6">
 <food.icon className="w-6 h-6" />
 </div>
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{food.name}</h4>
 <p className="text-slate-600 dark:text-slate-400">{food.desc}</p>
 </div>
 ))}
 </div>
 </Section>

 <Section id="attractions" title="Things to Do">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="group relative overflow-hidden rounded-[2rem] h-80">
 <Image src="/images/attractions/space-center.webp" alt="Space Center Houston" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
 <div className="absolute inset-0 flex flex-col justify-end p-8">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Space Center Houston</h3>
 <p className="text-slate-200">Home of NASA Mission Control and Saturn V rocket.</p>
 </div>
 </div>
 <div className="group relative overflow-hidden rounded-[2rem] h-80">
 <Image src="/images/attractions/museum-district.webp" alt="Museum District" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
 <div className="absolute inset-0 flex flex-col justify-end p-8">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Museum District</h3>
 <p className="text-slate-200">19 museums in a beautiful walkable park setting.</p>
 </div>
 </div>
 </div>
 </Section>

 <Section id="tips" title="Local Tips">
 <div className=" p-8 rounded-[2rem] border border-amber-100 dark:border-amber-800">
 <ul className="space-y-6">
 {[
 { title: "Underground Tunnels", desc: "Downtown has 6 miles of AC tunnels connecting buildings. Use them to escape the heat." },
 { title: "Alcohol + Liquor Stores", desc: "Beer and wine are sold in grocery stores. Liquor is sold in dedicated liquor stores (“package stores”), typically Mon–Sat 10am–9pm and closed Sundays." },
 { title: "Tipping", desc: "20% is standard in restaurants and bars." },
 { title: "Dress Code", desc: "Casual is fine almost everywhere. Shorts are acceptable due to heat." }
 ].map((tip, i) => (
 <li key={i} className="flex gap-4">
 <div className="w-8 h-8 dark:bg-amber-900/40 rounded-full flex items-center justify-center text-amber-600 shrink-0 font-bold">
 {i + 1}
 </div>
 <div>
 <h4 className="font-bold text-amber-900 dark:text-amber-100 mb-1">{tip.title}</h4>
 <p className="text-amber-800 dark:text-amber-200">{tip.desc}</p>
 </div>
 </li>
 ))}
 </ul>
 </div>
 </Section>

 <Section id="safety" title="Safety">
 <div className="grid md:grid-cols-2 gap-8">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-emerald-500"/> Safe Zones</h4>
 <p className="text-slate-600 dark:text-slate-400">
 Downtown, Midtown, Montrose, and the Medical Center are generally safe and well-patrolled.
 </p>
 </div>
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500"/> Caution Areas</h4>
 <p className="text-slate-600 dark:text-slate-400">
 Avoid walking alone late at night in unlit areas. Be aware of your surroundings near transit stations.
 </p>
 </div>
 </div>
 </Section>

 <Section id="culture" title="Culture & Vibe">
 <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
 Houston is a melting pot. It's Southern, it's Texan, but it's also incredibly international. You'll hear dozens of languages spoken and find pockets of culture from all over the world.
 </p>
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Did You Know?</h4>
 <p className="text-slate-600 dark:text-slate-400">
 Houston is the most diverse city in the United States, surpassing even New York and Los Angeles. This diversity is best experienced through its food and festivals.
 </p>
 </div>
 </Section>

 <Section id="packing" title="What to Pack">
 <div className=" p-8 rounded-[2rem]">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {[
 "Lightweight Clothing", "Sunscreen (SPF 50+)", "Sunglasses", "Hat",
 "Comfortable Shoes", "Power Adapter (US)", "Refillable Bottle", "Light Jacket (for AC)"
 ].map((item, i) => (
 <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
 <CheckCircle2 className="w-4 h-4 text-emerald-500" />
 <span className="text-sm font-medium">{item}</span>
 </div>
 ))}
 </div>
 </div>
 </Section>

 <Section id="faq" title="FAQ">
 <div className="space-y-4">
 <FAQItem 
 question="Is public transport good?"
 answer="The METRORail Red Line is excellent for the World Cup as it connects the stadium to downtown. Buses exist but can be slow. For other areas, you might need rideshare."
 />
 <FAQItem 
 question="How hot will it be?"
 answer="Very hot. Highs of 95°F (35°C) are common. However, the stadium has a roof and AC, and most indoor places are heavily air-conditioned."
 />
 <FAQItem 
 question="Where can I buy alcohol in Houston?"
 answer="Beer and wine are sold in grocery stores. Liquor is sold in dedicated liquor stores (“package stores”), typically Mon–Sat 10am–9pm and closed Sundays."
 />
 <FAQItem 
 question="Can I visit NASA?"
 answer="Yes! Space Center Houston is a must-visit. It's about a 30-45 minute drive from downtown. Tours of the Johnson Space Center are available."
 />
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
            { name: 'Atlanta', slug: 'world-cup-2026-atlanta-guide' },
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
















