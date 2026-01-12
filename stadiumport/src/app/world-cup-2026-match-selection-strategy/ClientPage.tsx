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
  Bookmark, X, ChevronRight, Facebook, Twitter, Linkedin, Copy, XCircle
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
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
      >
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-12 tracking-tight">
          <span className="text-emerald-500 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">Strategy Guide</span>
          {title}
        </h2>
        {children}
      </motion.div>
    </section>
  );
};

// 5. Premium Affiliate Button
const AffiliateButton = ({ href, text, icon: Icon = ArrowRight, variant = 'primary', subtext }: { href: string, text: string, icon?: any, variant?: 'primary' | 'secondary' | 'outline' | 'alert' | 'gold', subtext?: string }) => {
  const baseClasses = "group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden";
  const variants = {
    primary: "bg-emerald-500 text-slate-900 dark:text-white hover:bg-emerald-400 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.6)]",
    secondary: "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xl",
    outline: "border-2 border-slate-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-900 dark:text-white bg-transparent",
    alert: "bg-amber-600 hover:bg-amber-700 text-slate-900 dark:text-white shadow-amber-900/20",
    gold: "bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-amber-500/20"
  };

  return (
    <Link href={href} target="_blank" className={`${baseClasses} ${variants[variant]}`}>
      <span className="relative z-10 flex flex-col items-center">
        <span className="flex items-center gap-2">
            {text}
            <Icon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
        {subtext && (
            <span className="text-xs font-normal opacity-90 mt-1 uppercase tracking-wider">{subtext}</span>
        )}
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
    </Link>
  );
};

const Card = ({ title, items, icon: Icon, color = "emerald" }: { title: string, items: string[], icon: any, color?: string }) => (
    <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-2xl transition-all duration-300 h-full">
        <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-xl bg-${color}-100 dark:bg-${color}-900/30 text-${color}-600 dark:text-${color}-400`}>
                <Icon className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-2xl text-slate-900 dark:text-white">{title}</h4>
        </div>
        <ul className="space-y-4">
            {items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-lg text-slate-600 dark:text-slate-400">
                    <div className={`w-1.5 h-1.5 bg-${color}-500 rounded-full mt-2.5 shrink-0`} />
                    {item}
                </li>
            ))}
        </ul>
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

const InternalLink = ({ href, text, icon: Icon }: { href: string, text: string, icon?: any }) => (
    <Link href={href} className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-bold border-b-2 border-emerald-200 dark:border-emerald-800 hover:border-emerald-500 transition-colors">
      {Icon && <Icon className="w-4 h-4" />}
      {text}
    </Link>
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
    { id: 'structure', label: 'Structure' },
    { id: 'framework', label: 'Framework' },
    { id: 'ranking', label: 'Rankings' },
    { id: 'strategies', label: 'Strategies' },
    { id: 'recommendations', label: 'Recommendations' },
    { id: 'timing', label: 'Timing' },
    { id: 'experience', label: 'Experience' },
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
            src="/images/travel-tips/World Cup 2026 Match Selection Strategy Illustration.webp" 
            alt="World Cup 2026 Match Selection Strategy" 
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
                  { label: 'Match Selection', href: '/world-cup-2026-match-selection-strategy' }
                ]} 
              />
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Last Updated: January 4, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Travel Tips
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                World Cup 2026 Match Selection Strategy
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                Which Games to Attend. <span className="text-slate-900 dark:text-white font-medium">Group stage value vs. knockout drama.</span> How to build a match schedule that delivers unforgettable moments.
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
          <div className="mb-12 p-6 rounded-2xl text-sm text-slate-500 dark:text-slate-400 flex gap-4 items-start bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Expert Insight:</strong> This guide is based on real-world experience from 4 previous World Cups. We may earn a commission from ticket partners, but our strategy is unbiased.
            </p>
          </div>

          <Section id="overview" title="Introduction">
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
                I've been to four World Cups, and if there's one thing I've learned the hard way, it's this: <strong>you can't see everything.</strong> In previous tournaments with 32 teams, the schedule was tight. In 2026, with 48 teams and 104 matches spread across an entire continent, the logistical challenge is unprecedented.
              </p>
              <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-300 mt-6">
                Choosing which matches to attend is not just about picking your favorite team. It's a strategic balancing act of budget, geography, and atmosphere. The difference between a "good" trip and a "legendary" one often comes down to match selection. Do you chase the biggest stars? The wildest underdog crowds? Or the high-stakes knockout drama?
              </p>
              <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-300 mt-6">
                This guide is your strategic framework. I'll break down the tournament structure, evaluate match types by value, and provide specific strategies for every budget. Let's make sure you're in the stands for the moments that history remembers.
              </p>
            </div>
          </Section>

          <Section id="structure" title="Tournament Structure">
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                <p>The 2026 World Cup introduces a massive expansion to 48 teams. Understanding this new format is critical to finding value in the schedule.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                <h4 className="font-bold text-2xl mb-6 flex items-center gap-3"><Users className="w-6 h-6 text-emerald-500"/> The 48-Team Format</h4>
                <ul className="space-y-4">
                  {[
                      { label: "12 Groups", val: "Groups of 4 Teams (Revised from 3)" },
                      { label: "Top 2 Advance", val: "+ 8 Best 3rd Place Teams" },
                      { label: "New Round", val: "Round of 32 added before R16" }
                  ].map((item, i) => (
                    <li key={i} className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                        <span className="font-medium text-slate-500">{item.label}</span>
                        <span className="font-bold">{item.val}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                <h4 className="font-bold text-2xl mb-6 flex items-center gap-3"><Calendar className="w-6 h-6 text-emerald-500"/> Match Timeline</h4>
                <ul className="space-y-4">
                    {[
                        { stage: "Group Stage (72 matches)", date: "June 11 - June 27" },
                        { stage: "Round of 32 (16 matches)", date: "June 28 - July 3" },
                        { stage: "Round of 16 (8 matches)", date: "July 4 - July 7" },
                        { stage: "Quarterfinals (4 matches)", date: "July 9 - July 11" },
                        { stage: "Semifinals (2 matches)", date: "July 14 - July 15" },
                        { stage: "Final (MetLife Stadium)", date: "July 19" }
                    ].map((item, i) => (
                        <li key={i} className="flex justify-between items-center text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-200 dark:border-slate-800/50 pb-2 last:border-0">
                            <span>{item.stage}</span>
                            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{item.date}</span>
                        </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800/30 flex gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
                <p className="text-amber-900 dark:text-amber-100">
                    <strong>Why Timing Matters:</strong> The Group Stage offers the widest distribution of matches (spread across 16 cities) and generally lower ticket prices. The Knockout Stages concentrate the action into fewer cities and prices skyrocket.
                </p>
            </div>
          </Section>

          <Section id="framework" title="Selection Framework">
             <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                <p>Don't just buy the first ticket you see. Use these six criteria to evaluate every potential match on your radar.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Trophy, title: "1. Significance", text: "Is it a 'Group of Death' clash or a dead rubber? Does it decide qualification? Knockout matches score 10/10 here." },
                { icon: Star, title: "2. Star Power", text: "Are you seeing Mbappé, Bellingham, or Vinícius Jr.? Teams with global superstars command higher prices but deliver 'I was there' moments." },
                { icon: Users, title: "3. Atmosphere", text: "Fan culture dictates the vibe. A Mexico game in Mexico City or an Argentina match anywhere will be electric. Corporate crowds can be dull." },
                { icon: MapPin, title: "4. Venue", text: "Some stadiums are iconic (Azteca, Rose Bowl heritage). Others are generic NFL bowls. Venue choice impacts the experience significantly." },
                { icon: DollarSign, title: "5. Ticket Value", text: "Price vs. Quality. A $100 ticket to a thriller is better than a $500 ticket to a snoozefest. Resale potential matters too." },
                { icon: Plane, title: "6. Logistics", text: "Can you actually get there? Travel time between cities in North America is significant. Don't overbook yourself." }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[2rem] transition-colors bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5">
                  <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
                  <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="ranking" title="Match Types Ranked">
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-12">
                Not all World Cup matches are created equal. Here is my honest assessment of where to put your money.
            </p>
            <div className="space-y-8">
                {/* Opening Match */}
                <div className="group rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-white dark:bg-slate-50 dark:bg-slate-900/50 p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-bold text-sm mb-2">Rating: 9/10</span>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">The Opening Match</h3>
                            <p className="text-slate-500 font-medium">June 11 • Estadio Azteca, Mexico City</p>
                        </div>
                        <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-lg mb-3">Why It's Special</h4>
                            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Global spectacle & opening ceremony</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Historical significance (Azteca's 3rd opener)</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Peak excitement—the world is watching</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-3 text-red-500">The Trade-off</h4>
                            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                                <li className="flex gap-2"><X className="w-5 h-5 text-red-500"/> Most expensive Group Stage ticket</li>
                                <li className="flex gap-2"><X className="w-5 h-5 text-red-500"/> Sells out instantly</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Round of 32/16 */}
                <div className="group rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] bg-white dark:bg-slate-50 dark:bg-slate-900/50 p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-bold text-sm mb-2">Rating: 8/10</span>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Round of 32 & 16</h3>
                            <p className="text-slate-500 font-medium">The "Sweet Spot" • Various Venues</p>
                        </div>
                        <Ticket className="w-8 h-8 text-emerald-500" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-lg mb-3">Why Attend</h4>
                            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Win or go home drama</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Quality is assured (top teams usually advance)</li>
                                <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> More affordable than Quarters/Semis</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-3 text-amber-500">Considerations</h4>
                            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                                <li className="flex gap-2"><AlertTriangle className="w-5 h-5 text-amber-500"/> You won't know the matchups until late June</li>
                                <li className="flex gap-2"><AlertTriangle className="w-5 h-5 text-amber-500"/> Requires travel flexibility</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* The Final */}
                <div className="group rounded-[2rem] overflow-hidden border border-amber-200 dark:border-amber-500/30 hover:border-amber-500 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(251,191,36,0.2)] bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-slate-900 dark:text-white relative">
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-yellow-600 text-slate-900 px-6 py-2 rounded-bl-2xl font-black uppercase tracking-wider">Rating: 11/10</div>
                    <h3 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">The Final</h3>
                    <p className="text-amber-400 font-medium mb-6">July 19 • MetLife Stadium, NY/NJ</p>
                    <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl">
                        The pinnacle of global sports. 1 billion people watching. A world champion crowned. It is astronomically expensive ($1,500 - $10,000+), but there is simply nothing else like it on Earth.
                    </p>
                    <AffiliateButton href="https://www.fifa.com/tickets" text="View Final Ticket Options" variant="gold" icon={Trophy} subtext="Official & Resale Options" />
                </div>
            </div>
          </Section>

          <Section id="strategies" title="Traveler Strategies">
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-12">
                Identify which traveler you are to determine your optimal buying strategy.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
                <Card 
                    title="The Budget Maximizer" 
                    icon={DollarSign}
                    color="emerald"
                    items={[
                        "Goal: See the most football for the least money.",
                        "Target: Mexico Home Games ($180)",
                        "Target: 'Group of Death' Matches ($220)",
                        "Target: Round of 32 (Upper) ($250)",
                        "Total Budget: ~$1,000 for tickets"
                    ]}
                />
                <Card 
                    title="The Balanced Fan" 
                    icon={CheckCircle2}
                    color="blue"
                    items={[
                        "Goal: Quality over quantity.",
                        "Target: 2 Quality Group Matches ($600)",
                        "Target: 1 Round of 16 Match ($400)",
                        "Target: 1 Quarterfinal ($800)",
                        "Total Budget: ~$1,800 for tickets"
                    ]}
                />
                <Card 
                    title="The Premium Experience" 
                    icon={Star}
                    color="purple"
                    items={[
                        "Goal: Comfort, best views, and big matches.",
                        "Target: Elite Group Match ($500)",
                        "Target: R16 Hospitality ($1,200)",
                        "Target: Semifinal ($2,500)",
                        "Total Budget: ~$5,700 for tickets"
                    ]}
                />
                <Card 
                    title="The Final Chaser" 
                    icon={Trophy}
                    color="amber"
                    items={[
                        "Goal: Witness the coronation.",
                        "Target: 1-2 Early Group Games ($400)",
                        "Target: Third Place Match ($300)",
                        "Target: THE FINAL ($3,500+)",
                        "Total Budget: ~$4,000+ for tickets"
                    ]}
                />
            </div>
          </Section>

          <Section id="recommendations" title="Recommendations">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                    <h4 className="font-bold text-2xl mb-6">Must-See Rivalries</h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                        History drives passion. If the draw produces any of these, buy tickets immediately regardless of price.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {['Brazil vs. Argentina', 'England vs. Germany', 'USA vs. Mexico', 'France vs. Italy'].map((match, i) => (
                            <span key={i} className="px-4 py-2 bg-slate-100 dark:bg-white/10 rounded-full text-sm font-bold text-slate-700 dark:text-white border border-slate-200 dark:border-white/5">
                                {match}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                    <h4 className="font-bold text-2xl mb-6">Host Nation Advantage</h4>
                    <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                        <li><strong className="text-slate-900 dark:text-white">Mexico in Mexico City:</strong> An absolute spiritual experience. The noise at Azteca is legendary.</li>
                        <li><strong className="text-slate-900 dark:text-white">USA on July 4th:</strong> If the schedule aligns, a USMNT game on Independence Day would be raucous.</li>
                    </ul>
                </div>
            </div>
            <div className="p-8 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-[2rem]">
                <h4 className="font-bold text-2xl mb-4 text-red-600 dark:text-red-400 flex items-center gap-3"><XCircle className="w-6 h-6"/> Matches to Avoid</h4>
                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <h5 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Dead Rubbers</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Third group games where both teams are already eliminated. Rare but possible.</p>
                    </div>
                    <div>
                        <h5 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Third Place Match</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Players are often disappointed/tired. Atmosphere is celebratory but lacks tension.</p>
                    </div>
                    <div>
                        <h5 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Mismatches</h5>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Top seed vs. minnow can be fun for goals, but lacks competitive drama.</p>
                    </div>
                </div>
            </div>
          </Section>

          <Section id="timing" title="Buying Strategy">
             <div className="space-y-6">
                {[
                  { phase: "FIFA Lottery", time: "12–18 Months Out", desc: "Apply for everything. Cheapest prices. Low Risk." },
                  { phase: "Official Sales", time: "9–12 Months Out", desc: "First-come, first-served. Be ready at launch. Medium Risk." },
                  { phase: "Last-Minute", time: "1–3 Months Out", desc: "Check daily for returns. Lucky dip. High Risk." },
                  { phase: "Secondary Market", time: "Any Time", desc: "Pay premium for guarantees. Use verified sites. Low Risk (if verified)." }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center border border-slate-200 dark:border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-50 dark:bg-slate-900/50">
                    <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
                    <div className="flex-1">
                        <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-1">{item.phase}</h4>
                        <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <AffiliateButton href="https://www.fifa.com/tickets" text="Official FIFA Tickets" variant="primary" icon={Ticket} subtext="[AFFILIATE: Official Source]" />
                <AffiliateButton href="https://www.stubhub.com/" text="Verified Resale" variant="secondary" icon={Shield} subtext="[AFFILIATE: StubHub/Viagogo]" />
              </div>
          </Section>

          <Section id="experience" title="Match Day Experience">
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-12">
                The match is only 90 minutes, but the experience is all day.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Clock, title: "Pre-Match", text: "Arrive 3 hours early. Fan zones are essential. The 'march to the stadium' is often the highlight." },
                { icon: Utensils, title: "In-Stadium", text: "Food lines will be long. Wifi might crash. Bring a power bank. Check bag policies!" },
                { icon: Train, title: "Post-Match", text: "Expect 1-2 hour delays leaving. Don't book a tight flight connection. Celebrate in the city." }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[2rem] transition-colors bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5">
                  <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
                  <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 p-8 rounded-[2rem] bg-slate-100 dark:bg-slate-800 flex gap-4 items-start">
                <Sun className="w-8 h-8 text-amber-500 shrink-0" />
                <div>
                    <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-2">Weather Warning</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                        Afternoon matches in Houston, Dallas, and Miami can be brutally hot (even with roofs/AC). Matches in Mexico City have altitude factors. Plan accordingly.
                    </p>
                </div>
            </div>
          </Section>

          <Section id="faq" title="FAQ">
            <div className="space-y-4">
              {[
                { q: "How many matches should I attend?", a: "For a standard 2-week trip, 3-4 matches is the sweet spot. It allows for travel days and sightseeing without burnout." },
                { q: "Which round offers the best value?", a: "The Round of 32 or Round of 16. The stakes are high (knockout), tickets are cheaper than later rounds, and the atmosphere is desperate." },
                { q: "Is the Final worth the price?", a: "If you have the budget ($1,500+), yes. It is a bucket-list event. If that money would fund an entire 2-week trip otherwise, then no." },
                { q: "What if I don't know who is playing?", a: "That is the World Cup! Buy for the venue, the date, or the round. The atmosphere makes it special regardless of the teams." },
                { q: "Can I resell tickets if plans change?", a: "Yes, via the official FIFA Resale Platform (face value) or secondary markets (market value). Always use verified platforms to avoid bans." },
                { q: "Are hospitality packages worth it?", a: "They are the only way to GUARANTEE a ticket to big matches without winning a lottery. You pay for certainty and comfort." },
                { q: "Should I follow one team or visit one city?", a: "Following a team is risky (logistics, elimination). Staying in a hub (like NY/Philly/Boston) and seeing whoever plays there is much easier logistically." }
              ].map((item, i) => (
                <FAQItem key={i} question={item.q} answer={item.a} />
              ))}
            </div>
          </Section>

          {/* Conclusion */}
          <div className="mt-20 p-12 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-[3rem] border border-emerald-100 dark:border-emerald-800 text-center relative overflow-hidden">
            <div className="relative z-10">
                <h3 className="text-4xl font-black mb-6 text-emerald-900 dark:text-emerald-100 tracking-tight">Final Whistle Wisdom</h3>
                <p className="text-xl text-emerald-800 dark:text-emerald-200 mb-10 max-w-3xl mx-auto leading-relaxed">
                    The "best" match is the one you are actually at. Don't let the pursuit of the perfect game stop you from booking a good one. Define your budget, choose your strategy, and when that whistle blows, soak it all in.
                </p>
                <AffiliateButton href="https://www.fifa.com/tickets" text="Start Your Match Selection Journey" variant="primary" icon={Ticket} subtext="Check Availability" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-grid.svg')] opacity-10" />
          </div>

        </main>
      </div>
      
    </div>
  );
}



