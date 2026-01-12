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
  X, ChevronRight, Facebook, Twitter, Linkedin, Copy,
  HeartPulse, ShieldCheck, Thermometer, Pill, Stethoscope, 
  Droplets, Activity, ListChecks, Mountain, Smartphone,
  ShieldAlert, CreditCard, Navigation, Footprints, Siren, XCircle
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

// 4. Section Component with Nike-bold Typography
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

  const [activeSection, setActiveSection] = useState('overview');


  // Sticky Nav Links
  const navLinks = [
    { id: 'overview', label: 'Overview' },
    { id: 'rideshare', label: 'Rideshare Apps' },
    { id: 'taxi', label: 'Taxi Safety' },
    { id: 'transit', label: 'Public Transit' },
    { id: 'walking', label: 'Walking & Rentals' },
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
            src="/images/safety-guide/A_realistic_high-detail_photo_depicting_safe_transportation_in_a_World_Cup_2026.webp" 
            alt="World Cup 2026 Transportation Safety" 
            fill 
            className="object-cover object-center"
            priority quality={60} 
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
                { label: 'Safety Guide', href: '/world-cup-2026-safety-guide' },
                { label: 'Transportation Safety', href: '/world-cup-2026-transportation-safety' }
              ]} 
            />

              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Last Updated: January 4, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-blue-500/30 text-blue-400 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Transit Security
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                World Cup 2026 Transportation Safety
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                Getting Around World Cup 2026. <span className="text-slate-900 dark:text-white font-medium">Navigate 16 host cities like a local.</span>
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

          <Section id="overview" title="Why Transport Safety Matters">
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
                Getting lost, scammed by a taxi driver, or missing kickoff because you underestimated traffic isn't just annoying—it's entirely preventable.
              </p>
              <p>
                The reality is that transportation varies drastically across the 16 host cities and 3 countries of World Cup 2026. What works in Toronto (safe, reliable public transit) might be a different story in Mexico City, and the car-dependent sprawl of Los Angeles presents its own unique challenges.
              </p>
              <p>
                Your safety, budget, and tournament schedule depend on making smart transportation choices. This guide covers everything from public transit nuances and rideshare best practices to specific scams you need to avoid in each region. <strong>Armed with this knowledge, you will navigate confidently.</strong>
              </p>
            </div>
            
            <div className="p-8 rounded-[2rem] bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800">
               <div className="flex gap-4">
                 <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0" />
                 <div>
                   <h4 className="font-bold text-xl mb-2 text-emerald-900 dark:text-emerald-300">Goal of this Guide</h4>
                   <p className="text-emerald-800 dark:text-emerald-400 leading-relaxed">
                     Navigate confidently, avoid common tourist traps, and ensure your World Cup memories are about the football, not the frustration of getting there.
                   </p>
                 </div>
               </div>
            </div>
          </Section>

          <Section id="rideshare" title="Rideshare Apps">
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              For most international travelers, rideshare apps like Uber and Lyft are the safest, most reliable way to get around. They offer accountability that street taxis simply cannot match: GPS tracking, driver identity verification, and cashless transactions.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Availability & Cost</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="p-8 bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-white/10">
                <strong className="block text-xl text-slate-900 dark:text-white mb-2">USA</strong>
                <span className="text-slate-600 dark:text-slate-400 leading-relaxed">Uber & Lyft available in all 11 host cities. High availability.</span>
              </div>
              <div className="p-8 bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-white/10">
                <strong className="block text-xl text-slate-900 dark:text-white mb-2">Canada</strong>
                <span className="text-slate-600 dark:text-slate-400 leading-relaxed">Uber & Lyft in Toronto & Vancouver. Very reliable.</span>
              </div>
              <div className="p-8 bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-white/10">
                <strong className="block text-xl text-slate-900 dark:text-white mb-2">Mexico</strong>
                <span className="text-slate-600 dark:text-slate-400 leading-relaxed">Uber & DiDi in CDMX, Guadalajara, Monterrey. <span className="text-emerald-500 font-bold">Safer than taxis.</span></span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">How to Ride Safely</h3>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
               <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                      <div>
                        <strong className="text-slate-900 dark:text-white block text-lg">Verify License Plate</strong>
                        <span className="text-slate-600 dark:text-slate-400">Never get in until you confirm the plate matches the app. This is the #1 rule.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                      <div>
                        <strong className="text-slate-900 dark:text-white block text-lg">Check Driver Photo</strong>
                        <span className="text-slate-600 dark:text-slate-400">Ensure the driver matches the profile picture.</span>
                      </div>
                    </li>
                  </ul>
               </div>
               <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                      <div>
                        <strong className="text-slate-900 dark:text-white block text-lg">Share Your Trip</strong>
                        <span className="text-slate-600 dark:text-slate-400">Use the "Share Status" feature in-app to send your live location to a friend.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                      <div>
                        <strong className="text-slate-900 dark:text-white block text-lg">Sit in the Back</strong>
                        <span className="text-slate-600 dark:text-slate-400">It gives you personal space and an exit option on either side.</span>
                      </div>
                    </li>
                  </ul>
               </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/10 p-8 rounded-[2rem] border border-amber-200 dark:border-amber-800 mb-8">
              <h4 className="font-bold text-xl text-amber-800 dark:text-amber-400 flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6" /> Rideshare Red Flags
              </h4>
              <ul className="grid md:grid-cols-2 gap-4">
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300"><XCircle className="w-5 h-5 text-amber-500"/> Driver asks you to cancel & pay cash.</li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300"><XCircle className="w-5 h-5 text-amber-500"/> "My app is broken, pay me directly."</li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300"><XCircle className="w-5 h-5 text-amber-500"/> Vehicle color/model differs from app.</li>
                <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300"><XCircle className="w-5 h-5 text-amber-500"/> Driver seems intoxicated or erratic.</li>
              </ul>
              <p className="mt-6 font-bold text-amber-800 dark:text-amber-400">Action: Cancel immediately, exit at a safe public spot, and report to the app.</p>
            </div>

            <AffiliateButton 
              text="Get Uber/Lyft Credits & Sign Up" 
              href="https://www.uber.com" 
              icon={Smartphone}
              variant="primary"
            />
          </Section>

          <Section id="taxi" title="Taxi Safety">
            <div className="space-y-12">
              {/* USA & Canada */}
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">USA & Canada: Regulated & Reliable</h3>
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  Taxis in US and Canadian cities are generally safe and strictly regulated. They are a good alternative if rideshare prices surge, though typically 20-50% more expensive.
                </p>
                <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-white/10">
                  <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-6">Safety Checklist:</h4>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Only use official taxi stands at airports, hotels, and stations.</li>
                    <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> <strong>Always</strong> ensure the meter is running before departure.</li>
                    <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Confirm the credit card machine is working <em>before</em> you get in.</li>
                    <li className="flex items-center gap-3 text-slate-600 dark:text-slate-400"><XCircle className="w-5 h-5 text-red-500"/> Ignore unsolicited offers from drivers approaching you inside terminals.</li>
                  </ul>
                </div>
              </div>

              {/* Mexico */}
              <div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  Mexico: <span className="text-amber-500">Caution Required</span>
                </h3>
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                  Taxis in Mexico require a specific strategy. There is a critical distinction between "Sitio" taxis and street taxis.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/10 p-8 rounded-[2rem]">
                    <h4 className="font-bold text-2xl text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-2"><CheckCircle2 className="w-6 h-6"/> Sitio Taxis (SAFE)</h4>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      These are authorized taxis found at specific stands (sitios) or called by hotels/restaurants. They are registered, tracked, and safe. Slightly more expensive but worth it.
                    </p>
                  </div>
                  <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 p-8 rounded-[2rem]">
                    <h4 className="font-bold text-2xl text-red-800 dark:text-red-400 mb-4 flex items-center gap-2"><XCircle className="w-6 h-6"/> Street Taxis (AVOID)</h4>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      Random taxis hailed on the street carry higher risks, from rigged meters to "express kidnapping" (forcing ATM withdrawals). <strong>Do not hail taxis on the street.</strong>
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800">
                  <h5 className="font-bold text-blue-800 dark:text-blue-400 flex items-center gap-2 mb-2">
                    <Info className="w-5 h-5"/> Mexico Transport Strategy
                  </h5>
                  <p className="text-slate-700 dark:text-slate-300">
                    Use Uber/DiDi whenever possible. If you need a taxi, have your hotel or restaurant call a secure radio taxi for you. Agree on the price beforehand if there is no meter (common in some zones).
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                  <AffiliateButton text="Mexico City Safety Guide" href="/world-cup-2026-mexico-city-guide" variant="outline" icon={MapPin} />
                  <AffiliateButton text="Common Taxi Scams" href="/world-cup-2026-scams-avoid-fraud" variant="outline" icon={AlertTriangle} />
                </div>
              </div>
            </div>
          </Section>

          <Section id="transit" title="Public Transportation">
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Public transit is the lifeblood of World Cup logistics. It's often faster than driving on match days. Here is the city-by-city breakdown.
            </p>

            {/* USA Transit */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">USA Highlights</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { city: "New York / NJ", desc: "Subway & NJ Transit. Generally safe. Avoid empty cars late at night. Essential for MetLife Stadium." },
                  { city: "Boston & Philly", desc: "MBTA & SEPTA. Safe and efficient. Special game-day trains often run directly to stadiums." },
                  { city: "Los Angeles", desc: "Metro Rail/Bus. Improving, but coverage is limited. Rideshare often better for SoFi Stadium." },
                  { city: "Atlanta & Seattle", desc: "MARTA & Link Light Rail. Very safe, clean, and drops you right at the stadium gates." }
                ].map((item, i) => (
                  <div key={i} className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                    <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{item.city}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 italic mt-4 pl-2">Note: Dallas, Houston, KC, and Miami are more car-dependent; transit options exist but are limited.</p>
            </div>

            {/* Canada Transit */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">Canada Highlights</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Toronto (TTC)</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Subway/Streetcar. Very safe, clean. Connects well to BMO Field via GO Train or streetcar.</p>
                </div>
                <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Vancouver (TransLink)</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">SkyTrain/Bus. Excellent system. BC Place is right downtown, easily accessible.</p>
                </div>
              </div>
            </div>

            {/* Mexico Transit */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">Mexico Highlights</h3>
              <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-sm mb-8">
                <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-2">Mexico City (Metro)</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Massive, efficient, and incredibly cheap (~$0.30 USD). <span className="text-amber-600 font-bold">High pickpocket risk.</span> Women-only cars available (pink signs).
                </p>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/10 p-8 rounded-[2rem] border border-red-200 dark:border-red-800">
                <h4 className="font-bold text-xl text-red-800 dark:text-red-400 mb-6 flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6"/> Mexico Transit Safety Rules
                </h4>
                <ul className="grid md:grid-cols-2 gap-4">
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5"/>
                    <span><strong>Front Pockets Only:</strong> Phone and wallet must never be in back pockets.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5"/>
                    <span><strong>Backpacks to Front:</strong> Wear your bag on your chest in crowded cars.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5"/>
                    <span><strong>Avoid Rush Hour:</strong> 7-9 AM and 6-8 PM are incredibly crowded.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-red-500 shrink-0 mt-0.5"/>
                    <span><strong>Stay Alert:</strong> Don't zone out on your phone near the doors (snatch risk).</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <AffiliateButton text="Shop Anti-Theft Backpacks" href="https://www.amazon.com/s?k=anti+theft+backpack" variant="secondary" icon={ShieldAlert} />
              <AffiliateButton text="See All Host City Guides" href="/world-cup-2026-host-cities" variant="primary" icon={MapPin} />
            </div>
          </Section>

          <Section id="walking" title="Walking & Rental Cars">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Walking */}
              <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                  <Footprints className="w-6 h-6 text-emerald-500"/> Walking Safety
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
                  Great for short distances in tourist zones. In USA/Canada, pedestrian areas are generally safe. In Mexico, stick to populated zones and avoid walking alone at night.
                </p>
                <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Walk purposefully; don't look lost.</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Download offline maps (Google Maps).</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Stick to well-lit main streets.</li>
                </ul>
              </div>

              {/* Rental Cars */}
              <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                  <Car className="w-6 h-6 text-emerald-500"/> Rental Cars
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
                  Good for cities like LA, Dallas, Houston. Expensive parking near stadiums ($50-$100+).
                </p>
                <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Book months in advance.</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Don't leave valuables visible in car.</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Use official lots, not random yards.</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <AffiliateButton text="Compare Rental Car Rates" href="https://www.rentalcars.com/" variant="secondary" icon={Car} />
            </div>
          </Section>

          
        </main>
      </div>
    </div>
  );
}



