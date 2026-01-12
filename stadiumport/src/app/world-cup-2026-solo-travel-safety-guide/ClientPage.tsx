'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { 
 MapPin, Calendar, Users, ArrowRight, Info, CheckCircle2, 
 Trophy, Plane, Hotel, Ticket, Share2, MessageSquare, 
 ThumbsUp, Send, HelpCircle, Utensils, Camera, Sun, 
 DollarSign, Shield, Clock, Globe, Star, ExternalLink,
 Train, Bus, Car, Bike, AlertTriangle, Briefcase,
  X, ChevronRight, Facebook, Twitter, Linkedin, Copy, Heart, User, Lock
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
    const text = "Check out this Solo Travel Safety Guide for World Cup 2026!";
    
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
 <div className="group rounded-[2rem] overflow-hidden border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
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
 <MapPin className="w-4 h-4 text-emerald-500" /> {distance}
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
 <details className="group border-b border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800">
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
 { id: 'visa', label: 'Documents' },
 { id: 'planning', label: 'Preparation' },
 { id: 'budget', label: 'Budget' },
 { id: 'stadium', label: 'Stadium Safety' },
 { id: 'tickets', label: 'Tickets' },
 { id: 'hotels', label: 'Accommodation' },
 { id: 'transport', label: 'Transport' },
 { id: 'dining', label: 'Dining Solo' },
 { id: 'attractions', label: 'Solo Activities' },
 { id: 'tips', label: 'Match Day' },
 { id: 'safety', label: 'Safety' },
 { id: 'culture', label: 'Social' },
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
 <div className="relative h-[65vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
 <div className="absolute inset-0 z-0">
 <Image 
src="/images/safety-guide/A_realistic_high-detail_photo_of_a_solo_traveler_at_a_World_Cup_2026_host_city.webp" 
alt="Solo Traveler at World Cup" 
 fill 
 className="object-cover"
 priority sizes="100vw" />
 <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-[#0A0A0A]/60 to-[#F5F5F7] dark:to-[#0A0A0A]" />
 </div>

 <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-end md:items-center justify-between gap-12 pt-20">
 <div className="max-w-4xl">
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
 >
 <Breadcrumb 
 variant="white"
 items={[
 { label: 'Safety Guide', href: '/world-cup-2026-safety-guide' },
 { label: 'Solo Travel Safety', href: '/world-cup-2026-solo-travel-safety-guide' }
 ]} 
 />

 <div className="flex items-center gap-4 mb-6">
 <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
 Last Updated: January 4, 2026
 </span>
 <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
 Safety Guide
 </span>
 <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
 Essential Reading
 </span>
 </div>
 
 <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
 SOLO TRAVEL <span className="block text-4xl md:text-6xl lg:text-7xl mt-2 text-slate-400">/ SAFETY GUIDE</span>
 </h1>
 <p className="text-xl md:text-2xl text-slate-900 dark:text-white/90 font-light max-w-xl leading-relaxed">
 Attending World Cup 2026 Alone. <span className="text-slate-900 dark:text-white font-medium">Your definitive strategy</span> for a safe & social trip.
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
 <div className="space-y-1 relative border-l-2 border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800 ml-3">
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
 Traveling solo to the World Cup is a rite of passage. It offers total freedom—see the matches you want, explore at your own pace, and meet fans from every corner of the globe. However, navigating 16 cities across three countries alone requires a <strong className="text-emerald-500">solid safety strategy</strong> and proactive planning.
 </p>
 </div>
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { icon: User, title: "The Solo Advantage", text: "Easier to find single tickets, flexible itinerary, and forced social immersion with other fans." },
 { icon: Shield, title: "Safety First", text: "Blend in, stay connected, and know your zones. Awareness is your best defense in big cities." },
 { icon: Users, title: "Community", text: "You are never truly alone. The World Cup is one massive party. Learn how to join it safely." }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] transition-colors">
 <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4">
 <AffiliateButton href="https://www.facebook.com/groups/worldcup2026fans" text="Join Fan Groups" variant="secondary" icon={Users} />
 <AffiliateButton href="https://www.hostelworld.com" text="Find Hostels" variant="primary" icon={Hotel} />
 </div>
 </Section>

 <Section id="visa" title="Documents & Essentials">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Digital Redundancy</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">As a solo traveler, losing your passport or phone is a crisis. Backup everything. Keep digital copies of IDs in the cloud and physical copies in your luggage.</p>
 <AffiliateButton href="#" text="Cloud Storage Tips" variant="outline" />
 </div>
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Vital Docs</h4>
 <ul className="space-y-4 mb-8">
 {['Passport (valid 6+ months)', 'Travel Insurance Policy', 'Emergency Contact List (Laminated)'].map((item, i) => (
 <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
 <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
 </li>
 ))}
 </ul>
 <AffiliateButton href="https://www.worldnomads.com/" text="Buy Travel Insurance" variant="secondary" />
 </div>
 </div>
 </Section>

 <Section id="planning" title="Preparation Timeline">
 <div className="space-y-6">
 {[
 { time: "6 Months Out", desc: "Join online forums (Reddit, TripAdvisor). Connect with other solo travelers. Book hostels early for social vibes." },
 { time: "3 Months Out", desc: "Share your itinerary with family/friends. Set up 'Check-in' protocols. Research safe neighborhoods in your host cities." },
 { time: "1 Month Out", desc: "Unlock your phone for international SIMs. Download offline maps and translation apps. Buy a portable door lock." }
 ].map((item, i) => (
 <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center">
 <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
 <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
 </div>
 ))}
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
              <AffiliateButton href="#" text="Download Safety Apps" variant="primary" icon={Shield} />
                  <AffiliateButton href="#" text="Share Itinerary" variant="outline" />
 </div>
 </Section>

 <Section id="budget" title="Solo Budgeting">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "The Backpacker", items: ["Hostel Dorms", "Street Food / Grocery", "Public Transit Only"] },
 { title: "The Flashpacker", items: ["Private Rooms / Airbnb", "Casual Dining", "Mix of Transit & Uber"] },
 { title: "The Solo Pro", items: ["Business Hotels", "Stadium Hospitality", "Direct Flights"] }
 ].map((tier, i) => (
 <div key={i} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-2xl transition-all duration-300">
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
 <AffiliateButton href="#" text="Budget Calculator" variant="secondary" icon={Briefcase} />
 </div>
 </Section>

 <Section id="stadium" title="Stadium Safety">
 <LightboxImage 
src="/images/safety-guide/A_realistic_high-detail_photo_of_a_modern_football_stadium_entrance_during_World_cup_2026.webp" 
alt="Stadium Crowd Safety" 
 caption="Navigating large crowds safely is key for solo fans."
 />

 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p>
 Stadiums will be packed with 70,000+ fans. As a solo attendee, you don't have a buddy to watch your back or hold your spot. <strong>Situational awareness</strong> is your best friend. Stay sober enough to navigate, keep valuables in front pockets, and know your exit route.
 </p>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><CheckCircle2 className="w-6 h-6 text-emerald-500"/> Solo Essentials</h4>
 <ul className="space-y-4">
 {[
 { label: "Battery", val: "Power Bank (Crucial)" },
 { label: "Hydration", val: "Sealed Water Bottle" },
 { label: "ID", val: "Physical Copy" },
 { label: "Emergency", val: "$50 Cash (Hidden)" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-slate-700 dark:text-slate-300">
 <span className="font-medium text-slate-500">{item.label}</span>
 <span className="font-bold">{item.val}</span>
 </li>
 ))}
 </ul>
 </div>
 <div className=" p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Red Flags</h4>
 <ul className="space-y-4 text-slate-600 dark:text-slate-400 font-medium">
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Scalpers: Never buy paper tickets on the street.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Isolation: Don't linger alone in parking lots post-game.</li>
 <li className="flex gap-3"><span className="text-emerald-500 font-bold">•</span> Over-drinking: Stay in control of your senses.</li>
 </ul>
 </div>
 </div>
 
 <div className="p-8 rounded-[2rem] border border-emerald-500/20">
 <p className="text-lg text-center font-medium text-emerald-800 dark:text-emerald-200">
 <strong>Pro Tip:</strong> Identify the <strong>Guest Services</strong> booth immediately upon entering. If you lose your phone or wallet, this is your safe haven.
 </p>
 </div>
 </Section>

 <Section id="tips" title="Match Day Routine">
 <div className="grid md:grid-cols-3 gap-6 mb-8">
 {[
 { title: "Pre-Game", text: "Arrive early. Crowds are safer than empty streets. Stick to official Fan Zones for pre-match atmosphere." },
 { title: "During Game", text: "Befriend your seat neighbors. A quick 'Hello' creates a micro-safety net around you in the stands." },
 { title: "Post-Game", text: "Wait for the rush to die down or leave slightly early. Avoid fighting for cabs; stick to the herd heading to transit." }
 ].map((item, i) => (
 <div key={i} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
 </div>
 ))}
 </div>
 <div className="flex flex-wrap gap-4">
 <AffiliateButton href="#" text="Anti-Theft Bag" variant="primary" />
 <AffiliateButton href="#" text="Personal Alarm" variant="outline" />
 </div>
 </Section>

 <Section id="tickets" title="Ticket Safety">
 <div className="bg-emerald-900 dark:bg-emerald-950 text-slate-900 dark:text-white rounded-[2.5rem] p-8 md:p-12 mb-12 relative overflow-hidden shadow-2xl">
 <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[150px] opacity-20"></div>
 <div className="relative z-10">
 <div className="flex items-center gap-4 mb-8">
 <Ticket className="w-8 h-8 text-emerald-400" />
 <h3 className="text-3xl font-black">Scam Avoidance</h3>
 </div>
 <div className="space-y-6">
 {[
 { stage: "Official App", count: "FIFA Mobile Tickets Only", color: "text-emerald-300" },
 { stage: "Transfer", count: "Only accept in-app transfers", color: "text-emerald-300" },
 { stage: "Screenshots", count: "Do NOT work. Dynamic QR codes.", color: "text-amber-400" },
 { stage: "Paper", count: "Always FAKE. Do not buy.", color: "text-red-400" }
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
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Buying Solo</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8">
 Solo tickets are often easier to snag in resale drops. Look for "singles" that groups leave behind. You can get premium seats this way.
 </p>
 <AffiliateButton href="https://www.fifa.com" text="FIFA Official Site" variant="secondary" />
 </div>
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-4">Verification</h4>
 <p className="text-slate-600 dark:text-slate-400 mb-8">
 Never pay via wire transfer or Zelle/Venmo to strangers. Use credit cards or official resale platforms that guarantee the ticket.
 </p>
 <AffiliateButton href="#" text="Safe Resale Sites" variant="primary" />
 </div>
 </div>
 </Section>

 <Section id="hotels" title="Safe Accommodation">
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl leading-relaxed">
 Where you sleep matters. <strong>Hostels</strong> offer instant community. <strong>Hotels</strong> offer security. <strong>Rentals</strong> can be isolating—avoid them unless you know the area.
 </p>
 
 <div className="space-y-8">
 <HotelCard 
 name="Premium Hostels"
 rating={4.5}
 price="$50 - $100"
 distance="City Center"
 features={['Social Events', 'Lockers', '24/7 Reception']}
 image="/images/safety-guide/A_realistic_high-detail_photo_of_a_solo_traveler_walking_confidently_through_a_world_cup_2026.webp" 
 link="#"
 />
 <HotelCard 
 name="Business Hotels"
 rating={4.3}
 price="$150 - $300"
 distance="Safe Zones"
 features={['Security', 'Concierge', 'Transport Links']}
 image="/images/safety-guide/A_realistic_high-detail_photo_representing_overall_fan_safety_for_World_Cup_2026.webp" 
 link="#"
 />
 <HotelCard 
 name="Pod Hotels"
 rating={4.0}
 price="$80 - $150"
 distance="Central"
 features={['Privacy', 'Modern', 'Secure Access']}
 image="/images/safety-guide/A_realistic_high-detail_photo_of_essential_emergency_resources_for_World_Cup_2026.webp" 
 link="#"
 />
 </div>
 
 <div className="mt-12 text-center">
 <AffiliateButton href="#" text="Search Safe Hostels" variant="outline" />
 </div>
 </Section>

 <Section id="transport" title="Getting Around Alone">
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className="space-y-8">
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
 <Train className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Public Transit</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 The safest option. Stations are monitored and crowded with fans. Sit in the conductor's car (usually the middle or front) late at night.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
 <Plane className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Inter-City Travel</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Flights are best for long distances. For shorter hops (e.g., DC to Philly), Amtrak or reputable bus lines are safe and social.
 </p>
 </div>
 </div>
 <div className="flex gap-6">
 <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
 <Car className="w-8 h-8" />
 </div>
 <div>
 <h4 className="font-bold text-xl mb-2">Rideshare Safety</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 Always verify license plate and driver name before entering. Share your trip status with a friend via the app.
 </p>
 </div>
 </div>
 </div>
 
 <div className=" rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800 h-fit">
 <h4 className="font-bold text-2xl mb-6">Transport Rules</h4>
 <ul className="space-y-6">
 {[
 { label: "Late Night", time: "Uber/Lyft to door" },
 { label: "Walking", time: "Stick to well-lit main roads" },
 { label: "Navigation", time: "Study map BEFORE leaving" },
 { label: "Headphones", time: "Keep one ear open" }
 ].map((item, i) => (
 <li key={i} className="flex justify-between items-center text-lg border-b border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
 <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.time}</span>
 </li>
 ))}
 </ul>
 <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <AffiliateButton href="#" text="Book Airport Transfer" variant="secondary" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="dining" title="Dining Solo">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Counter Seating", desc: "The solo diner's best friend. Sit at the bar or window counters. Great for people watching and chatting with staff." },
 { title: "Food Halls", desc: "Casual, bustling, and perfect for one. Try a variety of foods without the formality of a sit-down restaurant." },
 { title: "Communal Tables", desc: "Many modern spots have large shared tables. A natural way to meet locals or other travelers." }
 ].map((item, i) => (
 <div key={i} className=" p-8 rounded-[2rem] shadow-lg border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300">
 <div className="w-12 h-12 rounded-full flex items-center justify-center text-emerald-600 mb-6">
 <Utensils className="w-6 h-6" />
 </div>
 <h4 className="font-bold text-xl mb-3">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
 </div>
 ))}
 </div>
 </Section>

 <Section id="attractions" title="Solo Activities">
 <p className="mb-8 text-xl text-slate-600 dark:text-slate-300">
 Don't just wait for the match. Host cities are full of activities perfect for solo explorers.
 </p>
 <div className="space-y-6">
 {[
 { title: "Fan Festivals", desc: "The heart of the action. Big screens, music, and thousands of fans. Safe, controlled, and free.", color: "text-emerald-500" },
 { title: "Museums & Tours", desc: "Join a walking tour. It's safe, informative, and you're instantly part of a group.", color: "text-fuchsia-500" },
 { title: "Local Sports Bars", desc: "Find the 'home pub' for your team. You'll walk in alone but leave with new friends.", color: "text-green-600" }
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
 <AffiliateButton href="#" text="Find Group Tours" variant="primary" />
 </div>
 </Section>

 <Section id="safety" title="Core Safety Rules">
 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-500"/> The Basics</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Trust your instincts. If a situation feels off, leave immediately. Don't worry about being polite—worry about being safe.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-3"><AlertTriangle className="w-6 h-6 text-amber-500"/> Practical Tips</h4>
 <ul className="space-y-4 text-slate-600 dark:text-slate-300">
 <li>• Keep your hotel address written down.</li>
 <li>• Don't flash expensive gear or cash.</li>
 <li>• Update your location with a friend daily.</li>
 </ul>
 <div className="mt-6">
 <AffiliateButton href="#" text="Get Travel Insurance" variant="secondary" />
 </div>
 </div>
 </div>
 </Section>

 <Section id="culture" title="Social Etiquette">
 <p className="text-xl mb-8 text-slate-600 dark:text-slate-300">Meeting people is the best part of solo travel. Here is how to do it right.</p>
 <div className="grid md:grid-cols-3 gap-6">
 {[
 { title: "Open Body Language", desc: "Put the phone away. Look approachable. Wear your team's jersey—it's an instant conversation starter." },
 { title: "The 'Photo' Trick", desc: "Ask someone to take your photo, or offer to take theirs. It's the easiest icebreaker in the book." },
 { title: "Boundaries", desc: "Be friendly but firm. You don't have to tell strangers you are traveling alone or where you are staying." }
 ].map((item, i) => (
 <div key={i} className="p-6 border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-2xl">
 <h4 className="font-bold mb-3">{item.title}</h4>
 <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
 </div>
 ))}
 </div>
 </Section>

 <Section id="packing" title="Packing Safe">
 <div className="grid md:grid-cols-3 gap-6">
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Briefcase className="w-6 h-6 text-amber-500"/> The Bag</h4>
 <p className="text-slate-600 dark:text-slate-400">Anti-theft backpack with lockable zippers. Cross-body bags are better than shoulder bags.</p>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Hidden Stash</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400">
 <li>• Money belt or hidden pocket</li>
 <li>• Dummy wallet for muggers</li>
 <li>• Extra credit card separate from wallet</li>
 </ul>
 </div>
 <div className="p-8 rounded-[2rem]">
 <h4 className="font-bold text-xl mb-4">Tech</h4>
 <ul className="space-y-2 text-slate-600 dark:text-slate-400 mb-6">
 <li>• AirTags for luggage</li>
 <li>• Portable charger (Non-negotiable)</li>
 <li>• VPN for public WiFi</li>
 </ul>
 <AffiliateButton href="#" text="Get a VPN" variant="secondary" />
 </div>
 </div>
 </Section>

 <Section id="faq" title="Solo Travel FAQ">
 <div className="space-y-2">
 {[
 { q: "Is World Cup 2026 safe for solo female travelers?", a: "Yes, generally. US/Canada are very safe. Mexico requires more caution (stick to tourist zones/Uber). Stay in well-lit areas and trust your gut." },
 { q: "How do I meet people?", a: "Hostels, Fan Fests, walking tours, and pre-match bars. Wear your colors!" },
 { q: "Should I tell people I'm alone?", a: "Be vague. Say 'I'm meeting friends later' if asked by strangers. No need to broadcast your solo status." },
 { q: "Is it weird to go to a game alone?", a: "Not at all. You'll be surrounded by thousands of 'friends' supporting the same team. It's an intense experience." },
 { q: "What if I get sick?", a: "Have travel insurance. Know the emergency number (911 in US/Mexico/Canada). Pharmacies are everywhere." },
 { q: "How much extra does it cost?", a: "Accommodation is the big one since you can't split costs. Hostels offset this significantly." },
 { q: "Can I use public transport at night?", a: "In most host cities, yes, especially on match days. If empty or late, take an Uber/Lyft." },
 { q: "What about language barriers?", a: "English works in US/Canada. In Mexico, learn basic Spanish phrases or use Google Translate." }
 ].map((item, i) => (
 <FAQItem key={i} question={item.q} answer={item.a} />
 ))}
 </div>
 </Section>

 <Section id="essential" title="Emergency Contacts">
 <div className="grid md:grid-cols-2 gap-8">
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Shield className="w-6 h-6 text-emerald-500"/> Universal Numbers</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400">
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>USA / Canada / Mexico</strong> <span>911</span></li>
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2"><strong>311</strong> <span>Non-Emergency (USA)</span></li>
 </ul>
 </div>
 <div className=" p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-emerald-500"/> Stay Connected</h4>
 <ul className="space-y-3 text-slate-600 dark:text-slate-400 mb-6">
 <li>• <strong>WhatsApp:</strong> Essential for international communication.</li>
 <li>• <strong>Share Location:</strong> Use Google Maps 'Share Location' with family.</li>
 </ul>
 <AffiliateButton href="#" text="Get an Airalo eSIM" variant="secondary" />
 </div>
 </div>
 </Section>

 <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Explore Host Cities</h3>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 {['New York', 'Los Angeles', 'Mexico City', 'Toronto', 'Dallas', 'Miami', 'Seattle', 'Boston'].map((city) => (
 <Link key={city} href={`/world-cup-2026-host-cities`} className="block p-4 border border-slate-200 dark:border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 hover:shadow-lg transition-all text-center font-bold text-slate-700 dark:text-slate-200">
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




