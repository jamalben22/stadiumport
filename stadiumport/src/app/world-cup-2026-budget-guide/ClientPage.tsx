'use client';

import React, { useState, useRef } from 'react';
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
 Bookmark, X, ChevronRight, Facebook, Twitter, Linkedin, Copy,
 CreditCard, Wallet, Smartphone, TrendingDown
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

// Floating Social Share
const SocialShare = () => {
 return (
 <motion.div 
 initial={{ opacity: 0, x: -20 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: 1 }}
 className="fixed left-4 top-1/3 z-40 hidden xl:flex flex-col gap-3"
 >
 <div className=" backdrop-blur-md p-2 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col gap-3">
 {[Twitter, Facebook, Linkedin, Copy].map((Icon, i) => (
 <button key={i} className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors">
 <Icon className="w-5 h-5" />
 </button>
 ))}
 </div>
 </motion.div>
 );
};

// Lightbox Image
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

// Section Component with Nike-bold Typography
const Section = ({ id, title, children, className = "" }: { id: string, title: string, children: React.ReactNode, className?: string }) => {
 const ref = useRef(null);
 const isInView = useInView(ref, { once: true, margin: "-100px" });

 return (
    <section id={id} ref={ref} className={`py-16 md:py-24 scroll-mt-24 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
      >
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-12 tracking-tight">
 <span className="text-emerald-500 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">Budget Guide</span>
 {title}
 </h2>
 {children}
 </motion.div>
 </section>
 );
};

// Premium Affiliate Button
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

const Table = ({ headers, rows }: { headers: string[], rows: (string | React.ReactNode)[][] }) => (
  <div className="overflow-x-auto my-8 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-sm">
    <table className="w-full text-left text-sm md:text-base">
      <thead className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white font-bold uppercase tracking-wider">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="p-6 whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className="p-6 text-slate-600 dark:text-slate-300 font-medium">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
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
 { id: 'tickets', label: 'Ticket Costs' },
 { id: 'flights', label: 'Flight Strategy' },
 { id: 'accommodation', label: 'Accommodation' },
 { id: 'daily-spend', label: 'Daily Spending' },
 { id: 'hidden-costs', label: 'Hidden Costs' },
 { id: 'strategies', label: 'Saving Tips' },
 { id: 'itineraries', label: 'Itineraries' },
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
 src="/images/travel-tips/World Cup 2026 Budget Guide Cover Illustration.webp" 
 alt="World Cup 2026 Budget Guide" 
 fill 
 className="object-cover object-center"
 priority 
 sizes="100vw" />
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
 { label: 'Travel Tips', href: '/world-cup-2026-travel-tips' },
 { label: 'Budget Guide', href: '/world-cup-2026-budget-guide' }
 ]} 
 />
 <div className="flex items-center gap-4 mb-6">
 <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
 Last Updated: January 4, 2026
 </span>
 <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
 Travel Tips
 </span>
 <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
 Budget Guide
 </span>
 </div>
 
 <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
 World Cup 2026 Budget Guide
 </h1>
 <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
 World Cup 2026. <span className="text-slate-900 dark:text-white font-medium">Complete Cost Breakdown</span> & Savings Strategies.
 </p>
 </motion.div>
 </div>


 </div>
 </div>

 <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto px-6 gap-20 relative pt-16">
 
 {/* 2. Sticky Table of Contents */}
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

 <Section id="overview" title="Quick Budget Overview">
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
 We've broken down estimated costs for a typical <strong>10-12 day trip</strong> covering 3 group stage matches. These estimates include international flights, accommodation, match tickets, food, and local transport.
 </p>
 </div>
 
 <Table 
 headers={["Expense Category", "Budget Traveler", "Mid-Range Fan", "Premium Experience"]}
 rows={[
 ["International Flights", "$800 - $1,200", "$1,200 - $2,000", "$2,500+ (Business)"],
 ["Accommodation (10 nights)", "$800 (Hostels/Shared)", "$2,500 (3-4 Star Hotels)", "$6,000+ (Luxury Hotels)"],
 ["Match Tickets (3 Games)", "$300 (Cat 3/4)", "$800 (Cat 1/2)", "$3,000+ (Hospitality)"],
 ["Food & Drink", "$400 ($40/day)", "$1,000 ($100/day)", "$2,500+ ($250/day)"],
 ["Transport (Inter-city)", "$300 (Bus/Train)", "$800 (Domestic Flights)", "$1,500+ (Flexible Flights)"],
 ["Local Transport", "$100 (Metro/Bus)", "$300 (Rideshare)", "$1,000+ (Private Car)"],
 [
   <strong key="total-label">TOTAL ESTIMATE</strong>,
   <strong key="total-budget">$2,700 - $4,000</strong>,
   <strong key="total-mid">$6,600 - $10,000</strong>,
   <strong key="total-premium">$16,500+</strong>,
 ]
]}
/>
 <div className="grid md:grid-cols-3 gap-8 mt-12">
 {[
 { icon: Wallet, title: "The Reality", text: "Attending World Cup 2026 is an investment, but early planning can save you 40-50%." },
 { icon: Calendar, title: "When to Book", text: "Flights: 11 months out. Hotels: Book refundable rates NOW. Tickets: Apply in FIFA lottery." },
 { icon: TrendingDown, title: "Biggest Saver", text: "Sharing accommodation and avoiding peak match-night hotel rates in host cities." }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] transition-colors bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
 <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
 </div>
 ))}
 </div>
 </Section>

 <Section id="tickets" title="Ticket Costs: What You'll Pay">
 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-6 text-emerald-600">Official Pricing (Est.)</h4>
 <ul className="space-y-4">
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
 <span className="text-slate-600 dark:text-slate-400">Group Stage (Cat 3)</span>
 <span className="font-bold text-slate-900 dark:text-white">$70 - $100</span>
 </li>
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
 <span className="text-slate-600 dark:text-slate-400">Group Stage (Cat 1)</span>
 <span className="font-bold text-slate-900 dark:text-white">$220 - $300</span>
 </li>
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
 <span className="text-slate-600 dark:text-slate-400">Round of 32</span>
 <span className="font-bold text-slate-900 dark:text-white">$100 - $350</span>
 </li>
 <li className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
 <span className="text-slate-600 dark:text-slate-400">Final (Cat 1)</span>
 <span className="font-bold text-slate-900 dark:text-white">$1,600+</span>
 </li>
 </ul>
 </div>

 <div className="p-8 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/50 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-6 text-amber-600 flex items-center gap-3">
 <AlertTriangle className="w-6 h-6" /> Secondary Market
 </h4>
 <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
 If you miss the official lottery, resale prices on platforms like StubHub or Viagogo can be <strong>300% to 500% higher</strong>.
 </p>
 <p className="font-black text-xl text-slate-900 dark:text-white">
 Expect to pay $400+ for the cheapest group stage resale tickets.
 </p>
 </div>
 </div>
 <div className="mt-8">
 <AffiliateButton href="https://www.fifa.com/tickets" text="Check Official Ticket Updates" icon={Ticket} variant="primary" />
 </div>
 </Section>

 <Section id="flights" title="Flight Strategy">
 <p className="mb-8 text-xl text-slate-600 dark:text-slate-300">
 Flying to North America in June/July is peak season pricing. Here's what round-trip economy flights typically cost from major regions.
 </p>

 <Table 
 headers={["Origin Region", "Average Cost (Economy)", "Best Hub to Fly Into", "Flight Time"]}
 rows={[
 ["Europe (London/Paris)", "$800 - $1,200", "NYC (JFK/EWR), Boston (BOS)", "7-9 Hours"],
 ["South America (Sao Paulo/BA)", "$1,000 - $1,500", "Miami (MIA), Houston (IAH)", "9-11 Hours"],
 ["Asia (Tokyo/Seoul)", "$1,400 - $2,000", "Los Angeles (LAX), Seattle (SEA)", "10-12 Hours"],
 ["Middle East (Dubai/Doha)", "$1,300 - $1,800", "NYC (JFK), Dallas (DFW)", "14-16 Hours"],
 ["Oceania (Sydney)", "$1,600 - $2,200", "Los Angeles (LAX), San Francisco (SFO)", "13-15 Hours"]
 ]}
 />

 <div className="p-8 rounded-[2rem] bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 mt-8">
 <h4 className="font-bold text-xl mb-4 text-blue-700 dark:text-blue-300 flex items-center gap-3">
 <Plane className="w-6 h-6" /> Pro Tip: Multi-City Routing
 </h4>
 <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
 Instead of booking a simple round-trip, use "Open-Jaw" tickets (fly into City A, fly out of City B). For example, fly into New York, travel to Philadelphia and Boston by train, and fly out of Boston. This saves time and often money on backtracking.
 </p>
 </div>
 <div className="mt-8 flex flex-wrap gap-4">
 <AffiliateButton href="https://www.skyscanner.com" text="Compare Flights on Skyscanner" variant="secondary" icon={Plane} />
 <AffiliateButton href="https://www.expedia.com" text="Check Deals on Expedia" variant="outline" icon={Globe} />
 </div>
 </Section>

 <Section id="accommodation" title="Accommodation Breakdown">
 <div className="grid md:grid-cols-3 gap-8">
 {[
 { title: "Premium Pricing", price: "$350 - $600+", cities: ["New York / NJ", "San Francisco", "Los Angeles", "Boston", "Miami"], color: "text-red-500", border: "border-red-200 dark:border-red-900" },
 { title: "Mid-Range Value", price: "$200 - $350", cities: ["Seattle", "Vancouver", "Toronto", "Philadelphia", "Dallas", "Atlanta"], color: "text-blue-500", border: "border-blue-200 dark:border-blue-900" },
 { title: "Budget Friendly", price: "$80 - $200", cities: ["Mexico City", "Guadalajara", "Monterrey", "Kansas City", "Houston"], color: "text-emerald-500", border: "border-emerald-200 dark:border-emerald-900" }
 ].map((tier, i) => (
 <div key={i} className={`p-8 rounded-[2rem] border ${tier.border} hover:shadow-2xl transition-all duration-300`}>
 <h4 className={`font-bold text-xl mb-2 ${tier.color}`}>{tier.title}</h4>
 <p className="text-2xl font-black text-slate-900 dark:text-white mb-6">{tier.price} <span className="text-sm font-normal text-slate-500">/night</span></p>
 <ul className="space-y-3">
 {tier.cities.map((city, j) => (
 <li key={j} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-medium">
 <div className={`w-1.5 h-1.5 rounded-full ${tier.color.replace('text-', 'bg-')}`} />
 {city}
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>
 <div className="mt-12 text-center">
 <AffiliateButton href="https://www.booking.com" text="Find Hotel Deals on Booking.com" variant="primary" icon={Hotel} />
 </div>
 </Section>

 <Section id="daily-spend" title="Daily Spending">
 <div className="grid md:grid-cols-2 gap-12">
 <div>
 <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
 <Utensils className="w-6 h-6 text-amber-500" /> Food & Drink
 </h3>
 <div className="space-y-4">
 {[
 { label: "Budget (Street food/Grocery)", cost: "$30 - $45 / day" },
 { label: "Mid-Range (Casual dining)", cost: "$75 - $100 / day" },
 { label: "Premium (Sit-down/Drinks)", cost: "$150+ / day" }
 ].map((item, i) => (
 <div key={i} className="flex justify-between items-center p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
 <span className="text-slate-600 dark:text-slate-400 font-medium">{item.label}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.cost}</span>
 </div>
 ))}
 </div>
 </div>
 
 <div>
 <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-slate-900 dark:text-white">
 <Train className="w-6 h-6 text-blue-500" /> Local Transport
 </h3>
 <div className="space-y-4">
 {[
 { label: "Public Transit Day Pass", cost: "$5 - $15" },
 { label: "Uber/Lyft Ride (Avg)", cost: "$25 - $40" },
 { label: "Car Rental (Per day)", cost: "$60 - $120+" }
 ].map((item, i) => (
 <div key={i} className="flex justify-between items-center p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
 <span className="text-slate-600 dark:text-slate-400 font-medium">{item.label}</span>
 <span className="font-bold text-slate-900 dark:text-white">{item.cost}</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </Section>

 <Section id="hidden-costs" title="Hidden Costs">
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 {[
 { title: "Visa & Entry Fees", desc: "ESTA for USA ($21), eTA for Canada ($7 CAD), or full visas. Don't forget these!", icon: Shield },
 { title: "Travel Insurance", desc: "Medical costs in the USA are astronomical. Insurance is non-negotiable.", icon: Shield },
 { title: "Tipping Culture", desc: "In the USA/Canada, 18-22% tips are standard for dining. Factor this into menu prices.", icon: Wallet },
 { title: "Resort/City Taxes", desc: "Hotels often add $20-$50 per night in 'resort fees' or city taxes upon check-in.", icon: Hotel },
 { title: "Data Roaming", desc: "Roaming charges can kill your budget. Get a local eSIM.", icon: Smartphone },
 { title: "Stadium Bag Policy", desc: "You might need to pay for bag storage ($15-$20) if your bag isn't clear/small enough.", icon: Info }
 ].map((item, i) => (
 <div key={i} className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-50 dark:bg-slate-900/50">
 <item.icon className="w-8 h-8 text-emerald-500 mb-6" />
 <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
 </div>
 ))}
 </div>
 <div className="mt-12 flex flex-wrap gap-4 justify-center">
 <AffiliateButton href="https://www.worldnomads.com" text="Get Travel Insurance Quote" variant="secondary" icon={Shield} />
 <AffiliateButton href="https://www.airalo.com" text="Get an eSIM with Airalo" variant="outline" icon={Smartphone} />
 </div>
 </Section>

 <Section id="strategies" title="15 Money-Saving Strategies">
 <div className="bg-emerald-50 dark:bg-emerald-900/10 p-8 md:p-12 rounded-[2.5rem] border border-emerald-100 dark:border-emerald-800 mb-12">
 <h3 className="text-3xl font-black text-emerald-800 dark:text-emerald-400 mb-12">Top 5 "Game Changer" Tactics</h3>
 <div className="space-y-12">
 {[
 { title: "Follow the 'Hub' Strategy", text: "Don't move hotels for every game. Pick a central hub (e.g., Dallas or Philadelphia) with cheap flights to other host cities. Fly out for the match morning and return that night to save on expensive peak-night hotels." },
 { title: "Book 'Fully Refundable' Now", text: "Book hotels on Booking.com that offer free cancellation. Secure the rate now; cancel later if your team doesn't play there." },
 { title: "Eat Like a Local", text: "Avoid restaurants near the stadium or major tourist sites. Walk 5 blocks away and prices drop 40%. In the US, portions are huge—share meals to cut costs." },
 { title: "Use Travel Credit Cards", text: "Sign up for a card with a big sign-up bonus (like Chase Sapphire or Amex Gold) 6 months before travel. Use points to cover at least one major flight or hotel stay." },
 { title: "Group Up", text: "A $400/night hotel room is expensive for one, but affordable for four. Split costs by traveling with friends." }
 ].map((item, i) => (
 <div key={i} className="flex gap-6 md:gap-8">
 <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-500 text-slate-900 dark:text-white flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-500/30">
 {i + 1}
 </div>
 <div>
 <h4 className="font-bold text-2xl text-slate-900 dark:text-white mb-2">{item.title}</h4>
 <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">{item.text}</p>
 </div>
 </div>
 ))}
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-8">
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h4 className="font-bold text-2xl mb-6">More Quick Wins</h4>
 <ul className="space-y-4">
 {[
 "Use public transit apps (Citymapper) to avoid Uber surges.",
 "Buy a local SIM card instead of expensive daily roaming passes.",
 "Bring an empty water bottle to the stadium (save $8/drink).",
 "Book airport transfers in advance to avoid taxi scams.",
 "Look for 'Happy Hour' deals for pre-match drinks (4-7 PM)."
 ].map((text, i) => (
 <li key={i} className="flex items-start gap-3 text-lg text-slate-600 dark:text-slate-400">
 <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
 <span>{text}</span>
 </li>
 ))}
 </ul>
 </div>
 
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50">
 <h4 className="font-bold text-2xl mb-6">Affiliate Tools We Recommend</h4>
 <div className="space-y-4">
        {[
          { name: "Skyscanner", desc: "Best for flights", href: "https://www.skyscanner.com" },
          { name: "Booking.com", desc: "Best for hotels", href: "https://www.booking.com" },
          { name: "Viator", desc: "Tours & Activities", href: "https://www.viator.com" }
        ].map((item, i) => (
          <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="block p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all flex justify-between items-center group">
            <div>
              <span className="block font-bold text-lg text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">{item.name}</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</span>
            </div>
            <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
          </a>
        ))}
      </div>
 </div>
 </div>
 </Section>

 <Section id="itineraries" title="Sample Itineraries">
 <div className="grid md:grid-cols-3 gap-8">
 <div className="border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 hover:border-emerald-500 transition-colors duration-300">
 <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">The Backpacker</div>
 <div className="text-4xl font-black text-slate-900 dark:text-white mb-8">$3,850</div>
 <ul className="space-y-4 text-slate-600 dark:text-slate-400 mb-8 font-medium">
 <li className="flex justify-between"><span>Flights</span> <span>$900</span></li>
 <li className="flex justify-between"><span>Hostels (10n)</span> <span>$600</span></li>
 <li className="flex justify-between"><span>Tickets (3x)</span> <span>$450</span></li>
 <li className="flex justify-between"><span>Food</span> <span>$400</span></li>
 <li className="flex justify-between"><span>Transport</span> <span>$500</span></li>
 <li className="flex justify-between"><span>Misc</span> <span>$1,000</span></li>
 </ul>
 <p className="text-sm text-slate-500 leading-relaxed border-t border-slate-200 dark:border-slate-200 dark:border-slate-800 pt-6">
 <strong>Strategy:</strong> Uses buses between cities, cooks breakfast/lunch, drinks cheap beer, stays in dorms.
 </p>
 </div>

 <div className="border-2 border-emerald-500 rounded-[2rem] p-8 shadow-2xl shadow-emerald-500/10 relative bg-white dark:bg-slate-900">
 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-slate-900 dark:text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">Most Popular</div>
 <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">The Fan Experience</div>
 <div className="text-4xl font-black text-slate-900 dark:text-white mb-8">$7,200</div>
 <ul className="space-y-4 text-slate-600 dark:text-slate-400 mb-8 font-medium">
 <li className="flex justify-between"><span>Flights</span> <span>$1,400</span></li>
 <li className="flex justify-between"><span>Hotels (10n)</span> <span>$2,500</span></li>
 <li className="flex justify-between"><span>Tickets (3x)</span> <span>$900</span></li>
 <li className="flex justify-between"><span>Food</span> <span>$1,000</span></li>
 <li className="flex justify-between"><span>Transport</span> <span>$900</span></li>
 <li className="flex justify-between"><span>Misc</span> <span>$500</span></li>
 </ul>
 <p className="text-sm text-slate-500 leading-relaxed border-t border-slate-200 dark:border-slate-200 dark:border-slate-800 pt-6">
 <strong>Strategy:</strong> Direct flights, 3-star hotels, mix of sit-down meals and quick bites, Cat 1 tickets.
 </p>
 </div>

 <div className="border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 hover:border-purple-500 transition-colors duration-300">
 <div className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-3">The VIP</div>
 <div className="text-4xl font-black text-slate-900 dark:text-white mb-8">$16,000+</div>
 <ul className="space-y-4 text-slate-600 dark:text-slate-400 mb-8 font-medium">
 <li className="flex justify-between"><span>Biz Class</span> <span>$4,000</span></li>
 <li className="flex justify-between"><span>Luxury Hotels</span> <span>$6,000</span></li>
 <li className="flex justify-between"><span>Hospitality</span> <span>$3,000</span></li>
 <li className="flex justify-between"><span>Fine Dining</span> <span>$2,000</span></li>
 <li className="flex justify-between"><span>Private Car</span> <span>$1,000</span></li>
 <li className="flex justify-between"><span>Tours/Misc</span> <span>$1,000</span></li>
 </ul>
 <p className="text-sm text-slate-500 leading-relaxed border-t border-slate-200 dark:border-slate-200 dark:border-slate-800 pt-6">
 <strong>Strategy:</strong> No compromises. Best seats, best hotels, private drivers, guided tours.
 </p>
 </div>
 </div>
 </Section>

 <Section id="faq" title="Frequently Asked Questions">
 <div className="space-y-2">
 {[
 { q: "Is it cheaper to stay in one city or follow my team?", a: "Staying in one hub city (like Dallas or Atlanta) is almost always cheaper. Following a team means last-minute bookings at peak prices in different cities." },
 { q: "Can I sell my tickets if I can't go?", a: "Yes, but only through the official FIFA Resale Platform to avoid scams and invalidation. You usually get face value back minus a small fee." },
 { q: "When is the best time to book flights?", a: "For international flights, 11 months out (when schedules open). For domestic US flights, 3-5 months out is often the sweet spot." },
 { q: "Are hostels safe in the US?", a: "Generally yes, but quality varies wildly. Stick to well-reviewed chains like HI USA or Generator Hostels in major cities." },
 { q: "Do I really need travel insurance?", a: "Absolutely. A broken leg in the US can cost $50,000 without insurance. Don't risk it." }
 ].map((item, i) => (
 <FAQItem key={i} question={item.q} answer={item.a} />
 ))}
 </div>
 </Section>

 <div className="mt-24 pt-12 border-t border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8 text-center">Start Planning Your Dream Trip</h3>
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto text-center leading-relaxed">
 The 2026 World Cup will be the biggest sporting event in history. With the right budget strategy, you can be part of it without emptying your bank account.
 </p>
 <div className="flex flex-col md:flex-row gap-6 justify-center">
 <AffiliateButton href="https://www.skyscanner.com" text="Start Comparing Flights" variant="primary" icon={Plane} />
 <AffiliateButton href="https://www.booking.com" text="Browse Hotel Deals" variant="secondary" icon={Hotel} />
 </div>
 </div>
 </main>
 </div>
 
 </div>
 );
}



