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
 Bookmark, X, ChevronRight, Facebook, Twitter, Linkedin, Copy,
 Navigation, Mountain
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
 { id: 'packing', label: 'Packing' },
 { id: 'essential', label: 'Essentials' },
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
 <div className="relative h-[65vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
 <div className="absolute inset-0 z-0">
 <Image 
 src="/images/cities/vancouver-world-cup-2026-1600.webp" 
 alt="Vancouver Skyline" 
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
              { label: 'Vancouver', href: '/world-cup-2026-vancouver-guide' }
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
 Team Canada Host
 </span>
 </div>
 
 <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
 Vancouver <span className="block">World Cup 2026 Guide</span>
 </h1>
 <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
 A local-first playbook for BC Place: neighborhoods, SkyTrain hacks, matchday rhythm, and what’s actually worth your time between fixtures.
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
 Vancouver has a funny superpower: you can eat world-class sushi, walk to a World Cup match, and still be back on the seawall in time for a sunset that looks like someone spilled apricot paint over the mountains.
 </p>
 <p>
 This <strong>Vancouver World Cup 2026 guide</strong> is built for fans who want the good stuff—<strong>BC Place</strong> logistics, where to stay, how to move fast when transit is jammed, and which neighborhoods feel right for your trip—without wasting money on the wrong side of a bridge or the wrong end of a nightlife street.
 </p>
 <p>
 The headline strategy is simple: stay on (or near) the downtown peninsula if you can, use <strong>SkyTrain</strong> like locals do, and treat matchday like a city-wide street party that happens to have a world-class stadium in the middle of it.
 </p>
 </div>

 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: MapPin, title: "Where to Base", text: "Downtown, Yaletown, or the West End if you want a walkable matchday. Richmond works if you value YVR access and late-night eats." },
 { icon: Train, title: "Transport Strategy", text: "SkyTrain + walking. Downtown stations put you in BC Place’s orbit fast; avoid rideshare surge right after the whistle." },
 { icon: DollarSign, title: "Budget Reality", text: "Hotels are the big spend. Save money by choosing a slightly smaller room in a better location—you’ll spend your days outside anyway." }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] transition-colors">
 <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
 </div>
 ))}
 </div>

 <div className="mt-12 p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Quick Answers (Read This First)</h3>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-lg">
 <li><strong>Best area to stay for BC Place:</strong> Yaletown or Downtown (walkable, easy transit).</li>
 <li><strong>Fastest way from YVR:</strong> Canada Line SkyTrain into Downtown, then walk or connect.</li>
 <li><strong>Best pre-match vibe:</strong> Yaletown patios for relaxed, Gastown for louder energy.</li>
 <li><strong>Car or no car:</strong> No car if you’re downtown. You’ll pay more to park than to ride.</li>
 </ul>
 </div>

 <div className="mt-12 flex flex-wrap gap-4">
 <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/yvr" text="Compare Flights to YVR" variant="secondary" icon={Plane} />
 <AffiliateButton href="https://www.booking.com/city/ca/vancouver.html" text="Find Hotels Near BC Place" variant="primary" icon={Hotel} />
 <AffiliateButton href="https://www.worldnomads.com/" text="Get Travel Insurance" variant="outline" icon={Shield} />
 </div>
 </Section>

 <Section id="visa" title="Visa & Entry (Canada)">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Who Needs a Visa?</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">Most international visitors (excluding US citizens) need an Electronic Travel Authorization (eTA) or a visitor visa. It costs $7 CAD and is usually approved quickly.</p>
 <AffiliateButton href="https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html" text="Check eTA Requirements" variant="outline" />
 </div>
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Arrival Tips</h4>
 <ul className="space-y-4 mb-8">
 {['Use YVR’s automated kiosks', 'US Citizens: Passport needed', 'Declare food/plants strictly'].map((item, i) => (
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
 { time: "9–12 Months Out", desc: "Make sure your passport expiry is safe, check Canada entry rules (eTA/visa), and set flight alerts for YVR. If you want hospitality, start there—inventory moves fast." },
 { time: "6–9 Months Out", desc: "Book accommodation. If Downtown and Yaletown look wild, use Richmond (Canada Line) or Burnaby (Expo Line) as your pressure valve." },
 { time: "3–6 Months Out", desc: "Lock in your match plan and your between-match plan. Whistler day trips, seaplanes, and peak-season dinners don’t like last-minute people." },
 { time: "1–3 Months Out", desc: "Reserve restaurants, map your walking routes (seawall is your friend), and download offline maps. Build one ‘rainy day’ plan for each match week." }
 ].map((item, i) => (
 <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center">
 <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
 <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
 </div>
 ))}
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
 <AffiliateButton href="https://www.skyscanner.com/transport/flights/to/yvr" text="Set Flight Alerts" variant="primary" icon={Plane} />
 <AffiliateButton href="https://www.fifa.com/en/tickets" text="Register for FIFA Ticket Updates" variant="secondary" icon={Ticket} />
 <AffiliateButton href="https://fifaworldcup26.hospitality.fifa.com/us/en" text="Explore Official Hospitality" variant="outline" icon={Star} />
 <AffiliateButton href="https://www.bcferries.com/" text="Reserve BC Ferries" variant="outline" />
 </div>
 </Section>

 <Section id="budget" title="Budget Tiers">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p className="text-xl text-slate-600 dark:text-slate-300">
 Vancouver can feel expensive until you realize where the money actually goes: <strong>rooms</strong>, not <strong>getting around</strong>. Transit is straightforward, walking is easy, and you can eat incredibly well without turning every meal into a white-tablecloth event.
 </p>
 <p>
 A useful mental model for match weeks: budget in <strong>CAD</strong>, expect downtown prices, and decide in advance whether you’re a “views person” (splurge on a waterfront base) or a “sleep-and-go person” (mid-range hotel, more experiences).
 </p>
 </div>

 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Smart Saver", items: ["Stay on a SkyTrain line (Richmond/Burnaby)", "Groceries + food courts + dumpling runs", "Big nature days (free): Stanley Park, beaches, hikes"] },
 { title: "Comfort Upgrades", items: ["Downtown or Yaletown hotel for walkability", "Two ‘nice’ meals + one casual daily", "Paid highlights: Capilano, Grouse, or a harbor cruise"] },
 { title: "Premium", items: ["Waterfront luxury or Parq-connected convenience", "Seaplane/heli views or private day tours", "Hospitality seating or premium match bundles"] }
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
      <div className="mt-8 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
        <h4 className="font-bold text-2xl mb-4 text-slate-900 dark:text-white">Fast Cost Benchmarks (CAD)</h4>
        <ul className="space-y-3 text-slate-600 dark:text-slate-400">
          <li>• <strong>Transit (adult cash/contactless):</strong> 1-Zone $3.35, 2-Zone $4.85, 3-Zone $6.60 (SkyTrain zones; buses are always 1-Zone). <a href="https://www.translink.ca/transit-fares/pricing-and-fare-zones" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-500 font-bold">Source <ExternalLink className="w-4 h-4" /></a></li>
          <li>• <strong>Hotels:</strong> match weeks are the swing factor—book early and prioritize location over room size.</li>
          <li>• <strong>Food:</strong> you can do cheap and excellent (food courts, ramen, dumplings) or go all-in (tasting menus, omakase).</li>
        </ul>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <AffiliateButton href="https://www.expedia.com/Vancouver.d178315.Destination-Travel-Guides" text="Bundle Flights + Hotels" variant="secondary" icon={Briefcase} />
          <AffiliateButton href="https://www.booking.com/city/ca/vancouver.html" text="Compare Hotel Deals" variant="primary" icon={Hotel} />
        </div>
      </div>
    </Section>

    <Section id="neighborhoods" title="Neighborhood-by-Neighborhood Gameplan">
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <p className="text-xl text-slate-600 dark:text-slate-300">
          Vancouver trips go sideways when you pick the wrong base. Not “bad neighborhood” wrong—more like “why am I crossing a bridge twice a day” wrong. Below is how locals think about the city when we’re choosing where to sleep, eat, and celebrate.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {[
          {
            title: 'Downtown (CBD / Coal Harbour / Waterfront)',
            vibe: 'Easiest logistics. Polished, walkable, expensive.',
            stay: 'Best if you want zero friction on matchday.',
            eat: 'Seafood, steakhouses, quick ramen, coffee everywhere.',
            drink: 'Hotel bars, waterfront patios, early nights.',
            explore: 'Seawall, Canada Place, Stanley Park access.',
          },
          {
            title: 'Yaletown',
            vibe: 'The “we’re celebrating tonight” neighborhood.',
            stay: 'Best balance: walkable to BC Place + great dining.',
            eat: 'Patios, sushi, modern Canadian, late reservations.',
            drink: 'Cocktail bars and lively patios; match nights pop off.',
            explore: 'False Creek, seawall loops, quick hop to Granville Island.',
          },
          {
            title: 'West End',
            vibe: 'Local, leafy, beachy. Quiet in the best way.',
            stay: 'Great for families and long-stay apartments.',
            eat: 'Casual gems, ramen, brunch, Denman/Robson runs.',
            drink: 'Low-key pubs; strollable evenings.',
            explore: 'English Bay, Sunset Beach, Stanley Park on your doorstep.',
          },
          {
            title: 'Gastown (and edges of Chinatown)',
            vibe: 'Historic streets, louder nights, strong character.',
            stay: 'Good if you like boutique vibes and don’t mind noise.',
            eat: 'Small plates, great cocktails, late-night bites.',
            drink: 'Some of the city’s best bars—pace yourself.',
            explore: 'Cobblestones, design shops, quick walk to Waterfront Station.',
          },
          {
            title: 'Mount Pleasant / Main Street',
            vibe: 'Creative, brewery-friendly, very Vancouver.',
            stay: 'Often better value than downtown; easy transit in.',
            eat: 'Coffee culture, bakeries, casual standouts.',
            drink: 'Breweries + natural wine bars; friendly crowds.',
            explore: 'Murals, small shops, a “real city” feel.',
          },
          {
            title: 'Kitsilano',
            vibe: 'Beaches, yoga mats, and sunset energy.',
            stay: 'Perfect for a family + beach trip hybrid.',
            eat: 'Brunch, healthy-ish, ocean-view snacks.',
            drink: 'Chill patios; not the loudest post-match zone.',
            explore: 'Kits Beach, Jericho/Spanish Banks, seawall access.',
          },
          {
            title: 'Richmond (Canada Line)',
            vibe: 'Practical, food-obsessed, airport-adjacent.',
            stay: 'Best if you value YVR access and price control.',
            eat: 'Some of the best Chinese food in North America—seriously.',
            drink: 'Quieter evenings; you’ll head downtown to party.',
            explore: 'Food courts, night markets (seasonal), river walks.',
          },
          {
            title: 'Burnaby (Metrotown / Brentwood)',
            vibe: 'Easy SkyTrain access, shopping, good value.',
            stay: 'A smart base if downtown is sold out.',
            eat: 'Malls + local pockets; quick access to downtown dining.',
            drink: 'Low-key; focus on logistics.',
            explore: 'Metrotown, quick hops to downtown.',
          },
        ].map((n, i) => (
          <div key={i} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
            <h4 className="font-bold text-2xl mb-4 text-slate-900 dark:text-white">{n.title}</h4>
            <p className="text-slate-600 dark:text-slate-400 mb-6">{n.vibe}</p>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>• <strong>Stay:</strong> {n.stay}</li>
              <li>• <strong>Eat:</strong> {n.eat}</li>
              <li>• <strong>Drink:</strong> {n.drink}</li>
              <li>• <strong>Explore:</strong> {n.explore}</li>
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <AffiliateButton href="https://www.booking.com/city/ca/vancouver.html" text="Search Neighborhood Hotels" variant="primary" icon={Hotel} />
        <AffiliateButton href="https://www.airbnb.com/s/Vancouver--BC--Canada/homes" text="Check Apartments for Groups" variant="outline" icon={Users} />
      </div>
    </Section>

 <Section id="stadium" title="BC Place Stadium">
<LightboxImage 
src="/images/stadiums/bc-place-vancouver-world-cup-2026-1600.webp" 
alt="BC Place Interior" 
caption="BC Place is downtown, walkable, and built for big-event nights."
/>

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 <strong>BC Place</strong> sits right on the edge of False Creek—close enough that you can smell the water on breezy evenings. On World Cup nights, the whole Entertainment District tightens up around it: pre-game patios fill, streets turn into a river of jerseys, and SkyTrain platforms become a moving crowd soundtrack.
 </p>
 <p>
 Vancouver hosts <strong>seven</strong> World Cup matches here (five group games plus a Round of 32 and Round of 16). FIFA’s Vancouver host-city breakdown is worth bookmarking if you want the official framing. <a href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/vancouver-host-seven-matches-canada-stadium-bc-place" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-500 font-bold">FIFA overview <ExternalLink className="w-4 h-4" /></a>
 </p>
 <p>
 Want the deep dive on entrances, seating feel, and the “where do I actually stand” details? Use the dedicated stadium guide: <Link href="/bc-place-world-cup-2026" className="text-emerald-600 hover:text-emerald-500 font-bold">BC Place World Cup 2026 guide</Link>.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Key Features</h4>
 <ul className="space-y-4">
 {[
 { label: "Capacity", val: "54,000 (FIFA listing)" },
 { label: "Opened", val: "1983" },
 { label: "Roof", val: "Retractable (downtown weather insurance)" },
 { label: "Transit", val: "Stadium-Chinatown (Expo Line) + Downtown walks" }
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
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Costco move: there’s a Costco right by the stadium—cheap pre-match fuel if you time it.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Arrive on foot: the last 10 minutes walking from Downtown is often faster than “just one more” rideshare loop.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Screenshot your ticket and save key addresses offline—cell networks get cranky near kickoff.</li>
 </ul>
 <div className="mt-8">
   <AffiliateButton href="https://www.bcplace.com/visiting/guest-policies" text="BC Place Guest Policies" variant="outline" />
 </div>
 </div>
 </div>
 
 <div className="p-8 rounded-[2rem] border border-emerald-500/20">
 <p className="text-lg text-center font-medium text-emerald-800 dark:text-emerald-200">
 <strong>Getting There:</strong> BC Place is in the city center. It is easily accessible by the <strong>Stadium-Chinatown SkyTrain station</strong> (Expo Line), just a short walk away.
 </p>
 </div>
 </Section>

 <Section id="tips" title="Match Day Gameplan">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p className="text-xl text-slate-600 dark:text-slate-300">
 Matchday in Vancouver is less “tailgate parking lot” and more “city festival that just happens to end at a stadium.” The key is timing: build in buffer, pick a pre-game neighborhood, and assume the first 20 minutes after full-time are pure crowd physics.
 </p>
 </div>

 <div className="grid md:grid-cols-3 gap-6 mb-8">
 {[
 { title: "3–4 Hours Before Kickoff", text: "Pick your lane: Yaletown patios for easy walkability, Gastown for louder energy, or the seawall if you need fresh air before the noise. Eat early—lines spike fast." },
 { title: "90 Minutes Before Kickoff", text: "Get into the BC Place orbit. SkyTrain to Stadium-Chinatown works, but walking from Downtown can be faster than waiting for the perfect train." },
 { title: "After the Whistle", text: "If the platforms look like a concert exit, don’t fight it. Walk 15 minutes, grab a snack, then ride. Yaletown and the waterfront absorb crowds better than squeezing onto the first train." }
 ].map((item, i) => (
 <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
 </div>
 ))}
 </div>

 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Fan Festival & Watch Parties</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
 Vancouver’s official FIFA Fan Festival™ programming is planned around the PNE Amphitheatre area, with broadcast matches, entertainment, and family-friendly activations. <a href="https://vancouverfwc26.ca/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-500 font-bold">Updates here <ExternalLink className="w-4 h-4" /></a>
 </p>
 <AffiliateButton href="https://www.getyourguide.com/vancouver-l189/" text="Book Vancouver Experiences" variant="secondary" />
 </div>
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Parking Reality Check</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
 Downtown parking fills and prices spike on big-event nights. If you must drive, park outside the downtown core near a SkyTrain station and ride in. Otherwise: walk + train beats stress.
 </p>
 <AffiliateButton href="https://www.discovercars.com/" text="Compare Rental Cars" variant="outline" icon={Car} />
 </div>
 </div>

 <div className="flex flex-wrap gap-4">
 <AffiliateButton href="https://www.amazon.com/s?k=clear+stadium+bag" text="Buy Clear Stadium Bag" variant="primary" />
 <AffiliateButton href="https://www.bcplace.com/visiting/guest-policies" text="Check Prohibited Items" variant="outline" />
 <AffiliateButton href="https://www.opentable.ca/s?metroId=73" text="Reserve Restaurants (OpenTable)" variant="secondary" icon={Utensils} />
 </div>
 </Section>

 <Section id="tickets" title="Schedule & Tickets">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p className="text-xl text-slate-600 dark:text-slate-300">
 Vancouver’s match schedule is published. For the authoritative version, keep FIFA’s schedule bookmarked and cross-check with BC Place updates. <a href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/match-schedule-fixtures-results-teams-stadiums" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-500 font-bold">FIFA schedule <ExternalLink className="w-4 h-4" /></a>
 </p>
 </div>
 <div className="bg-emerald-900 dark:bg-emerald-950 text-slate-900 dark:text-white rounded-[2.5rem] p-8 md:p-12 mb-12 relative overflow-hidden shadow-2xl">
 <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[150px] opacity-20"></div>
 <div className="relative z-10">
 <div className="flex items-center gap-4 mb-8">
 <Ticket className="w-8 h-8 text-emerald-400" />
 <h3 className="text-3xl font-black">Confirmed Matches</h3>
 </div>
 <div className="space-y-6">
 {[
 { stage: "Match 6 (Group D)", count: "Sat, Jun 13, 2026 — 21:00 PT — Australia vs UEFA Playoff Winner C", color: "text-emerald-300" },
 { stage: "Match 27 (Group B)", count: "Thu, Jun 18, 2026 — 15:00 PT — Canada vs Qatar", color: "text-emerald-300" },
 { stage: "Match 40 (Group G)", count: "Sun, Jun 21, 2026 — 18:00 PT — New Zealand vs Egypt", color: "text-emerald-300" },
 { stage: "Match 51 (Group B)", count: "Wed, Jun 24, 2026 — 12:00 PT — Switzerland vs Canada", color: "text-emerald-300" },
 { stage: "Match 64 (Group G)", count: "Fri, Jun 26, 2026 — 20:00 PT — New Zealand vs Belgium", color: "text-emerald-300" },
 { stage: "Match 85 (Round of 32)", count: "Thu, Jul 2, 2026 — 20:00 PT — 1B vs 3 E/F/G/I/J", color: "text-amber-400" },
 { stage: "Match 96 (Round of 16)", count: "Tue, Jul 7, 2026 — 13:00 PT — Winner 85 vs Winner 87", color: "text-amber-400" }
 ].map((match, i) => (
 <div key={i} className="flex items-center justify-between border-b border-white/10 pb-4">
 <span className={`font-mono text-lg ${match.color}`}>{match.stage}</span>
 <span className="font-bold text-xl">{match.count}</span>
 </div>
 ))}
 </div>
 <div className="mt-8">
   <a href="https://www.bcplace.com/?news=vancouver-final-match-schedule-for-the-fifa-world-cup-2026-now-available" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 font-bold">
     BC Place schedule announcement <ExternalLink className="w-4 h-4" />
   </a>
 </div>
 </div>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Official Tickets</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8">
 Canada's matches will be the hottest tickets in town. Use FIFA’s official channels, create your FIFA ID early, and register for ticket updates so you don’t miss sales windows.
 </p>
 <AffiliateButton href="https://www.fifa.com/en/tickets" text="FIFA Ticketing Hub" variant="secondary" />
 </div>
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Resale Market</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8">
 Expect premiums for Canada matches. If you missed the initial phases, stick to platforms with buyer protections and clear ticket transfer policies.
 </p>
 <div className="flex flex-wrap gap-4">
 <AffiliateButton href="https://www.stubhub.com/bc-place-stadium-tickets/venue/294/" text="Check StubHub" variant="primary" />
 <AffiliateButton href="https://www.amazon.com/s?k=collapsible+water+bottle&tag=stadiumport-20" text="Pack a Collapsible Bottle" variant="outline" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="hotels" title="Where to Stay">
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl leading-relaxed">
 Vancouver has a real hotel squeeze, and match weeks tighten it further. If you can, stay <strong>Downtown</strong>, <strong>Yaletown</strong>, or the <strong>West End</strong> so you can walk to BC Place and back without your night being held hostage by traffic. If prices get spicy, use <strong>Richmond</strong> (Canada Line) or <strong>Burnaby</strong> (Expo Line) as a transit-friendly alternative.
 </p>
 
 <div className="space-y-8">
 <HotelCard 
 name="Parq Vancouver (The Douglas)"
 rating={5.0}
 price="$600 - $900"
 distance="Attached to Stadium"
 features={['Luxury', 'Casino', 'Rooftop Park']}
 image="/images/cities/vancouver-world-cup-2026-1024.webp" 
 link="https://www.booking.com/hotel/ca/the-douglas-autograph-collection.html"
 />
 <HotelCard 
 name="L'Hermitage Hotel"
 rating={4.7}
 price="$350 - $650"
 distance="0.7 miles"
 features={['Boutique', 'Quiet Rooms', 'Downtown Base']}
 image="/images/cities/vancouver-world-cup-2026-640.webp" 
 link="https://www.booking.com/hotel/ca/l-hermitage.html"
 />
 <HotelCard 
 name="Fairmont Waterfront"
 rating={4.8}
 price="$500 - $800"
 distance="1.2 miles"
 features={['Harbour Views', 'Connected to Transit', 'Classic Luxury']}
 image="/images/cities/vancouver-world-cup-2026-640.webp" 
 link="https://www.booking.com/hotel/ca/fairmont-waterfront.html"
 />
 <HotelCard 
 name="Sandman Hotel Vancouver City Centre"
 rating={4.0}
 price="$300 - $500"
 distance="5 min walk"
 features={['Budget Friendly', 'Sports Bar On-site', 'Central']}
 image="/images/cities/vancouver-world-cup-2026-1024.webp" 
 link="https://www.booking.com/hotel/ca/sandman-vancouver-city-centre.html"
 />
 <HotelCard 
 name="Samesun Vancouver (Hostel)"
 rating={4.3}
 price="$60 - $180"
 distance="1.6 miles"
 features={['Budget', 'Social', 'Good Transit']}
 image="/images/cities/vancouver-world-cup-2026-640.webp" 
 link="https://www.booking.com/hotel/ca/samesun-vancouver.html"
 />
 </div>
 
 <div className="mt-12 text-center">
 <AffiliateButton href="https://www.booking.com/city/ca/vancouver.html" text="Search All Vancouver Hotels" variant="outline" />
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
 The automated rapid transit system. The <strong>Expo Line</strong> goes to the stadium. The <strong>Canada Line</strong> goes to the airport (YVR). Tap your credit card to ride.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
 <Navigation className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">SeaBus & Aquabus</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 The SeaBus connects Downtown to North Vancouver (mountains). Tiny Aquabus ferries take you across False Creek to Granville Island.
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
 Avoid driving downtown. Parking is expensive and traffic is heavy. The city is designed for walking and transit.
 </p>
 </div>
 </div>
 </div>
 
 <div className=" rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 h-fit">
 <h4 className="font-bold text-2xl mb-6">Travel Times</h4>
 <ul className="space-y-6">
 {[
 { label: "YVR Airport to Downtown", time: "25 min (Train)" },
 { label: "Downtown to Stadium", time: "5-15 min (Walk)" },
 { label: "North Vancouver", time: "15 min (SeaBus)" },
 { label: "Whistler", time: "2 hours (Bus/Car)" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
 <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
 </li>
 ))}
 </ul>
 <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <AffiliateButton href="https://www.viator.com/Vancouver-tours/Transfers-and-Ground-Transport/d616-g15" text="Book Whistler Shuttle" variant="secondary" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="dining" title="Food & Drink">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Sushi", desc: "Vancouver is famous for high-quality, affordable sushi. Try Miku for high-end aburi or local spots for great value." },
 { title: "Seafood", desc: "Fresh Pacific seafood is a must. Oysters, salmon, and spot prawns are local delicacies found in Yaletown." },
 { title: "Asian Cuisine", desc: "From dim sum in Richmond to ramen in the West End, the Asian food scene here is world-class." }
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
 Vancouver blends urban life with nature. You can cycle the seawall in the morning and dine in a skyscraper at night.
 </p>
 <div className="space-y-6">
 {[
 { title: "Stanley Park", desc: "Larger than Central Park. Rent a bike and ride the Seawall for stunning ocean and mountain views.", color: "text-green-500" },
 { title: "Granville Island", desc: "A hub of food, art, and culture. Take the Aquabus and explore the famous Public Market.", color: "text-amber-500" },
 { title: "Capilano Suspension Bridge", desc: "Walk across a suspension bridge high above a canyon in the rainforest. A true PNW experience.", color: "text-emerald-500" }
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
 <AffiliateButton href="https://www.viator.com/Vancouver/d616-ttd" text="Get Vancouver City Attractions Pass" variant="primary" />
 </div>
 </Section>

 <Section id="safety" title="Safety & Security">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> General Safety</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Vancouver is generally very safe. However, be cautious in the Downtown Eastside (Hastings & Main area), which faces social challenges.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Emergency</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li>• <strong>911:</strong> For all emergencies.</li>
 <li>• <strong>Consulates:</strong> Many are located downtown.</li>
 <li>• <strong>Healthcare:</strong> Excellent standard, travel insurance recommended.</li>
 </ul>
 <div className="mt-6">
 <AffiliateButton href="#" text="Get Travel Insurance" variant="secondary" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="culture" title="Cultural Intelligence">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">Vancouver is a major film production hub. You might see film sets around town. The city is also deeply connected to its Indigenous roots, with beautiful Coast Salish art visible throughout the city and airport.</p>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { title: "Hollywood North", desc: "Vancouver doubles for many cities in movies. Keep an eye out for pink production signs." },
 { title: "Indigenous Art", desc: "Look for totem poles and public art honoring the Musqueam, Squamish, and Tsleil-Waututh nations." },
 { title: "West Coast Casual", desc: "The vibe is laid back. Yoga pants and hiking boots are standard attire, even in nice restaurants." }
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
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Sun className="w-6 h-6 text-amber-500"/> June Weather</h4>
 <p className="text-slate-600 dark:text-slate-400">Mild and pleasant (15–22°C / 60–72°F). Rain is possible, so bring a light jacket.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Essentials</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400">
 <li>• Rain jacket (Gore-Tex)</li>
 <li>• Layers (fleece/hoodie)</li>
 <li>• Comfortable walking shoes</li>
 </ul>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Tech</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-6">
 <li>• US/Canada plugs (Type A/B)</li>
 <li>• Offline maps (data can be pricey)</li>
 <li>• eSIM recommended</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com/canada-esim" text="Get an eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <Section id="faq" title="Frequently Asked Questions">
 <div className="space-y-2">
 {[
 { q: "Is Vancouver expensive?", a: "Yes, it is comparable to major US cities like New York or San Francisco. Accommodation is the biggest cost." },
 { q: "Do I need a car?", a: "No. In fact, we recommend against it. Parking is expensive and the transit system is excellent." },
 { q: "What is the weather like in June?", a: "Usually mild and pleasant (15–22°C / 60–72°F). Rain is less common in summer but still possible." },
 { q: "Can I use US Dollars?", a: "Some tourist spots accept them at poor rates. It is much better to use credit cards or withdraw Canadian Dollars (CAD)." },
 { q: "Where is the stadium?", a: "BC Place is located in downtown Vancouver, at the edge of Yaletown and False Creek." },
 { q: "Is it safe?", a: "Yes, generally very safe. Use standard caution in the Downtown Eastside area at night." },
 { q: "How do I get from the airport?", a: "The Canada Line SkyTrain takes you from YVR to Downtown in 25 minutes." },
 { q: "What is the best area to stay?", a: "Downtown or Yaletown for proximity to the stadium. Richmond for airport convenience and Asian food." }
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
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>Non-Emergency Police</strong> <span>604-717-3321</span></li>
 <li className="flex justify-between"><strong>Hospital</strong> <span>St. Paul's Hospital (Downtown)</span></li>
 </ul>
 </div>
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-emerald-500"/> Connectivity</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6">
 <li>• <strong>WiFi:</strong> Free at YVR & Stadium.</li>
 <li>• <strong>Power:</strong> 120V, Type A/B plugs.</li>
 <li>• <strong>Sim Cards:</strong> Kiosks at YVR Arrivals.</li>
 </ul>
 <AffiliateButton href="https://www.airalo.com/canada-esim" text="Get an Airalo eSIM" variant="secondary" />
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
















