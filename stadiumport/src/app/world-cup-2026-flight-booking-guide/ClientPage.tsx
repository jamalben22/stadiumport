'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { 
  Plane, Globe, Clock, AlertTriangle, 
  CheckCircle2, ArrowRight, MapPin, 
  Info, Search, Briefcase, 
  Map, Tag, X,
  Facebook, Twitter, Linkedin, Copy
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
      <div className="backdrop-blur-md p-2 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col gap-3">
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

// Premium Affiliate Button
const AffiliateButton = ({ href, text, icon: Icon = ArrowRight, variant = 'primary', subtext }: { href: string, text: string, icon?: any, variant?: 'primary' | 'secondary' | 'outline' | 'alert', subtext?: string }) => {
  const baseClasses = "group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden";
  const variants = {
    primary: "bg-emerald-500 text-slate-900 dark:text-white hover:bg-emerald-400 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.6)]",
    secondary: "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xl",
    outline: "border-2 border-slate-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-900 dark:text-white bg-transparent",
    alert: "bg-amber-500 text-slate-900 dark:text-white hover:bg-amber-600 shadow-[0_10px_40px_-10px_rgba(245,158,11,0.5)]"
  };

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={`${baseClasses} ${variants[variant]}`}>
      <div className="relative z-10 flex flex-col items-center">
        <span className="flex items-center gap-2">
          {text}
          <Icon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
        {subtext && <span className="text-[10px] uppercase tracking-wider opacity-80 mt-1">{subtext}</span>}
      </div>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
    </Link>
  );
};

// Callout Component
const Callout = ({ type = 'info', title, children }: { type?: 'info' | 'warning' | 'success', title: string, children: React.ReactNode }) => {
  const styles = {
    info: "border-blue-500/30 bg-blue-50/50 dark:bg-blue-900/10 text-blue-900 dark:text-blue-100",
    warning: "border-amber-500/30 bg-amber-50/50 dark:bg-amber-900/10 text-amber-900 dark:text-amber-100",
    success: "border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-900/10 text-emerald-900 dark:text-emerald-100"
  };
  
  const icons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle2
  };

  const Icon = icons[type];

  return (
    <div className={`p-8 rounded-[2rem] border ${styles[type]} my-8 relative overflow-hidden`}>
      <div className="absolute top-0 right-0 p-6 opacity-10">
        <Icon className="w-24 h-24" />
      </div>
      <div className="relative z-10">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-3">
          <Icon className="w-6 h-6" />
          {title}
        </h3>
        <div className="text-lg opacity-90 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

// Table Component
const Table = ({ headers, rows }: { headers: string[], rows: (string | React.ReactNode)[][] }) => (
  <div className="overflow-x-auto my-12 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-xl bg-white dark:bg-slate-50 dark:bg-slate-900/50">
    <table className="w-full text-left text-sm md:text-base">
      <thead className="bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-bold uppercase tracking-wider">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="p-6 whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-white/5">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
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

  const [activeSection, setActiveSection] = useState('overview');


  // Sticky Nav Links
  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'airport-codes', label: 'Airport Codes' },
    { id: 'flight-networks', label: 'Flight Networks' },
    { id: 'regional-strategies', label: 'Regional Strategies' },
    { id: 'multi-city', label: 'Multi-City Strategy' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0A0A0A] font-sans selection:bg-emerald-500/30">
      
      <SocialShare />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 to-emerald-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <div className="relative h-[65vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/travel-tips/World Cup 2026 Flight Booking Guide Illustration.webp" 
            alt="World Cup 2026 Flights" 
            fill 
            className="object-cover object-center"
            priority 
            sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-[#0A0A0A]/80 to-[#F5F5F7] dark:to-[#0A0A0A]" />
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
                  { label: 'Flight Booking', href: '/world-cup-2026-flight-booking-guide' }
                ]} 
              />
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Last Updated: January 4, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Travel Logistics
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
                  Global Guide
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                World Cup 2026 Flight Booking Guide
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                Routes, Airlines & Strategies. <span className="text-slate-900 dark:text-white font-medium">World Cup 2026</span> definitive travel guide.
              </p>
            </motion.div>
          </div>


        </div>
      </div>

      <div className="flex flex-col lg:flex-row max-w-[1400px] mx-auto px-6 gap-20 relative pt-16">
        
        {/* Sticky Table of Contents */}
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
          <div className="mb-12 p-6 rounded-2xl text-sm text-slate-500 dark:text-slate-400 flex gap-4 items-start bg-slate-100 dark:bg-white/5">
            <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Transparency:</strong> This guide contains affiliate links. We may earn a commission if you book through them, which helps fund our independent journalism.
            </p>
          </div>

          <Section id="overview" title="Strategic Overview">
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300 mb-8">
                The World Cup 2026 isn't just a tournament; it's a logistical beast. Spanning <strong>16 cities across 3 massive countries</strong>, your flight strategy will make or break your experience (and your bank account).
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-loose mb-8">
                Most fans will simply punch "London to New York" into a search engine and pay whatever comes up. <strong>Do not be that fan.</strong> With the right strategy—using open-jaw tickets, positioning flights, and alliance hubs—you can save $400-$800 per person.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-loose mb-8">
                Whether you are flying business class from Tokyo or piecing together budget hops from Toronto to Guadalajara, this guide is your flight deck. We have analyzed routes, historical pricing, and airline networks to give you the upper hand.
              </p>
            </div>
            
            <Callout type="warning" title="The Golden Rule of 2026 Flights">
              <p>
                <strong>Do not book separate tickets on different airlines for connections unless you have a 24-hour buffer.</strong> 
                Summer thunderstorms in the US Northeast and heat delays in the South are real. 
                If you miss a connection on a separate ticket, you lose the value of the second flight entirely.
              </p>
            </Callout>

            <div className="my-12 p-10 bg-slate-900 text-slate-900 dark:text-white rounded-[2.5rem] relative overflow-hidden shadow-2xl">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-3xl font-bold mb-2">Start Tracking Prices Now</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-lg">Set alerts early to catch the booking window.</p>
                </div>
                <AffiliateButton 
                  href="https://www.skyscanner.com" 
                  text="Search on Skyscanner" 
                  subtext="Best for flexible dates"
                  icon={Search}
                  variant="primary"
                />
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </div>
          </Section>

          <Section id="airport-codes" title="Airport Codes & Times">
            <p className="text-xl leading-relaxed font-light text-slate-600 dark:text-slate-300 mb-8">
              Know your codes. In multi-city searches, using the wrong code (e.g., searching "NYC" instead of "EWR" specifically) can hide better options.
            </p>
            <Table 
              headers={["City", "Primary Airport", "Hub Airlines", "Distance to Center"]}
              rows={[
                ["New York/NJ", "EWR (Newark), JFK, LGA", "United (EWR), Delta (JFK), AA (JFK)", "30-60 min"],
                ["Los Angeles", "LAX", "United, Delta, AA, Southwest", "45-90 min"],
                ["Dallas", "DFW", "American Airlines (Fortress Hub)", "25-40 min"],
                ["Atlanta", "ATL", "Delta (Fortress Hub)", "20-30 min"],
                ["Miami", "MIA", "American Airlines", "20-30 min"],
                ["Toronto", "YYZ (Pearson)", "Air Canada", "30-45 min"],
                ["Vancouver", "YVR", "Air Canada, WestJet", "25-35 min"],
                ["Mexico City", "MEX (Benito Juárez)", "Aeromexico", "30-60 min"],
                ["Houston", "IAH (Intercontinental)", "United", "30-45 min"],
                ["San Francisco", "SFO", "United", "30-45 min"],
                ["Seattle", "SEA (Tacoma)", "Delta, Alaska Airlines", "30-45 min"],
                ["Boston", "BOS (Logan)", "Delta, JetBlue", "15-25 min"],
                ["Philadelphia", "PHL", "American Airlines", "20-30 min"],
                ["Kansas City", "MCI", "Southwest", "25-35 min"],
                ["Monterrey", "MTY", "Viva Aerobus", "30-45 min"],
                ["Guadalajara", "GDL", "Volaris", "30-45 min"],
              ]}
            />
            <div className="flex justify-center mt-12">
              <AffiliateButton 
                href="https://www.google.com/flights" 
                text="Explore Map View on Google Flights" 
                variant="outline"
                icon={Map}
              />
            </div>
          </Section>

          <Section id="flight-networks" title="North American Flight Networks">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
                <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">The Hub-and-Spoke System</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                  Unlike Europe's point-to-point budget carrier model, North America relies on fortress hubs. 
                  If you fly <strong>American Airlines</strong>, you will likely connect through Dallas (DFW), Miami (MIA), or Charlotte (CLT). 
                  If you fly <strong>Delta</strong>, you go through Atlanta (ATL), Detroit (DTW), or Minneapolis (MSP). 
                  <strong>United</strong> funnels through Newark (EWR), Chicago (ORD), Houston (IAH), or Denver (DEN).
                </p>
                <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl">
                  <strong className="text-emerald-600 dark:text-emerald-400 block mb-2">Strategy Tip:</strong>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    If you are visiting Dallas, flying American Airlines is often your only direct option, but it will be pricey. 
                    Check connecting flights on United or Delta to save money.
                  </p>
                </div>
              </div>
              
              <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                  <AlertTriangle className="w-8 h-8 text-amber-500" />
                  US Pre-Clearance
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg leading-relaxed">
                  Flying from Canada (Toronto/Vancouver) to the USA? You clear US Customs <strong>in Canada</strong> before you board.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 dark:text-white">Pros</strong>
                      <span className="text-sm text-slate-500 dark:text-slate-400">You land in the US as a domestic passenger. No customs line on arrival.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full text-amber-600">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-slate-900 dark:text-white">Cons</strong>
                      <span className="text-sm text-slate-500 dark:text-slate-400">You need to arrive at the Canadian airport 3-4 hours early to clear customs there.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section id="regional-strategies" title="Strategies by Departure Region">
            
            {/* Europe */}
            <div className="mb-16 p-8 border border-slate-200 dark:border-white/10 rounded-[2.5rem] bg-white dark:bg-slate-900/30 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl">
                  <Globe className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">From Europe</h3>
              </div>
              
              <p className="mb-8 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                The transatlantic corridor is the busiest in the world. Competition is fierce, which keeps prices reasonable if you book early.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-3xl">
                  <h4 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">Best Routes</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                      <ArrowRight className="w-5 h-5 text-emerald-500 mt-1 shrink-0" />
                      <span><strong>London (LHR) to NYC (JFK/EWR):</strong> The "Nylon" route. Multiple flights per hour. Best availability.</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                      <ArrowRight className="w-5 h-5 text-emerald-500 mt-1 shrink-0" />
                      <span><strong>Frankfurt (FRA) to Chicago/Houston:</strong> Lufthansa's massive network connects almost all secondary European cities.</span>
                    </li>
                    <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                      <ArrowRight className="w-5 h-5 text-emerald-500 mt-1 shrink-0" />
                      <span><strong>Dublin (DUB) to East Coast:</strong> Offers US Pre-clearance in Ireland, saving you hours upon landing.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-3xl flex flex-col justify-center">
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Estimated Roundtrip Economy Price</p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-200 dark:border-slate-800">
                      <span className="font-medium text-emerald-600">$450 - $750</span>
                      <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded">11 mo out</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-200 dark:border-slate-800">
                      <span className="font-medium text-red-600">$1,200+</span>
                      <span className="text-xs font-bold bg-red-100 text-red-800 px-2 py-1 rounded">Last minute</span>
                    </div>
                  </div>
                </div>
              </div>
              <AffiliateButton href="https://www.expedia.com" text="Check European Flights on Expedia" variant="secondary" icon={Plane} />
            </div>

            {/* Asia */}
            <div className="mb-16 p-8 border border-slate-200 dark:border-white/10 rounded-[2.5rem] bg-white dark:bg-slate-900/30 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl">
                  <Plane className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">From Asia</h3>
              </div>
              
              <p className="mb-8 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Crossing the Pacific is expensive and long. Your entry point matters significantly.
              </p>
              
              <Callout type="info" title="The Vancouver/Seattle Gateway">
                <p>
                  Flying from Tokyo, Seoul, or Singapore? Look for flights into <strong>Vancouver (YVR)</strong> or <strong>Seattle (SEA)</strong> first. 
                  These are the closest North American points to Asia, often $200-$300 cheaper than flying direct to LA or NYC. 
                  From there, grab a cheap domestic hop.
                </p>
              </Callout>

              <div className="mt-8">
                 <AffiliateButton href="https://www.trip.com" text="Search Asia Routes on Trip.com" variant="secondary" icon={Plane} />
              </div>
            </div>

            {/* South America */}
            <div className="mb-8 p-8 border border-slate-200 dark:border-white/10 rounded-[2.5rem] bg-white dark:bg-slate-900/30 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl">
                  <MapPin className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">From South America</h3>
              </div>
              
              <p className="mb-8 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Miami is the undisputed gateway. Almost all flights from Brazil, Argentina, and Colombia funnel through MIA.
              </p>
              
              <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-3xl mb-8">
                <h4 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">Strategy: The "Copa Stopover"</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Copa Airlines (Star Alliance) connects almost every South American capital through Panama City (PTY) to multiple US cities (not just Miami). 
                  This is often cheaper than direct flights on LATAM or American.
                </p>
              </div>
              
              <AffiliateButton href="https://www.kayak.com" text="Compare LATAM/Copa Prices" variant="secondary" icon={Search} />
            </div>

          </Section>

          <Section id="multi-city" title="Multi-City & Open-Jaw Strategies">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12">
              If you are following your team, you will be moving between cities. Buying a Roundtrip (London &rarr; NYC &rarr; London) and then separate internal flights is usually a mistake.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-10 bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 transition-colors">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Briefcase className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="font-bold text-2xl mb-4 text-slate-900 dark:text-white">The "Open-Jaw" Ticket</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Fly <strong>Into City A</strong> and <strong>Out of City B</strong> on one ticket.
                </p>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl text-sm font-mono border border-slate-200 dark:border-slate-200 dark:border-slate-800 mb-6">
                  Flight 1: London (LHR) → Boston (BOS)<br/>
                  <span className="text-slate-400 italic my-1 block">[...Train/Car to NYC/Philly...]</span>
                  Flight 2: Philadelphia (PHL) → London (LHR)
                </div>
                <div className="flex items-center gap-2 text-emerald-600 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Often same price as simple roundtrip</span>
                </div>
              </div>

              <div className="p-10 bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 transition-colors">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                  <Tag className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="font-bold text-2xl mb-4 text-slate-900 dark:text-white">Multi-City Ticket</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Add domestic legs into your main international booking.
                </p>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl text-sm font-mono border border-slate-200 dark:border-slate-200 dark:border-slate-800 mb-6">
                  Flight 1: Tokyo → Los Angeles<br/>
                  Flight 2: Los Angeles → Vancouver<br/>
                  Flight 3: Vancouver → Tokyo
                </div>
                <div className="flex items-center gap-2 text-emerald-600 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Protects you if connections are delayed</span>
                </div>
              </div>
            </div>
          </Section>

        </main>
      </div>
      
    </div>
  );
}



