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
 X, ChevronRight, Facebook, Twitter, Linkedin, Copy,
  HeartPulse, ShieldCheck, Thermometer, Pill, Stethoscope, 
  Droplets, Activity, ListChecks, Mountain
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
    const text = "Check out this Health & Medical Preparedness Guide for World Cup 2026!";
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
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
      <div className=" backdrop-blur-md p-2 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col gap-3">
        <button 
          onClick={() => handleShare('twitter')}
          className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-5 h-5" />
        </button>
        <button 
          onClick={() => handleShare('facebook')}
          className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-5 h-5" />
        </button>
        <button 
          onClick={() => handleShare('linkedin')}
          className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </button>
        <button 
          onClick={handleCopy}
          className="p-3 dark:hover:bg-emerald-900/30 rounded-xl text-slate-500 hover:text-emerald-600 transition-colors relative"
          aria-label="Copy link"
        >
          {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
          {copied && (
            <span className="absolute left-full ml-2 px-2 py-1 bg-emerald-500 text-slate-900 dark:text-white text-xs rounded whitespace-nowrap">
              Copied!
            </span>
          )}
        </button>
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
    { id: 'prep', label: 'Preparation' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'meds', label: 'Medications' },
    { id: 'countries', label: 'Countries' },
    { id: 'issues', label: 'Health Issues' },
    { id: 'chronic', label: 'Chronic' },
    { id: 'emergency', label: 'Emergency' },
    { id: 'checklist', label: 'Checklist' },
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
            src="/images/safety-guide/A_realistic_high-detail_photo_showing_a_travel_medical_essentials_layout_for_World_cup_2026.webp" 
            alt="World Cup 2026 Health Preparedness" 
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
                    { label: 'Health & Medical', href: '/world-cup-2026-health-medical-preparedness' }
                  ]} 
                />

              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Last Updated: January 4, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Health Guide
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                World Cup 2026 Health & Medical Guide
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                Stay Safe & Healthy. <span className="text-slate-900 dark:text-white font-medium">World Cup 2026</span> definitive preparedness guide.
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

          <Section id="overview" title="Why Health Prep Matters">
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
                Nothing ruins a World Cup faster than a severe case of "Montezuma's Revenge," heat exhaustion in a packed stadium, or realizing you left critical medication at home.
              </p>
              <p>
                I have seen it happen too many times: fans spend thousands on tickets and flights, only to spend the semi-final in a hotel bathroom or, worse, an emergency room. <strong>Medical emergencies abroad are expensive, stressful, and dangerous without preparation.</strong>
              </p>
              <p>
                This guide is your insurance policy. We will cover everything from the vaccinations you need 8 weeks out to the exact contents of the first aid kit you should carry on match day. The good news? <strong>Simple preparation prevents 90% of travel health issues.</strong>
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: ShieldCheck, title: "Prevention", text: "Simple preparation prevents 90% of travel health issues." },
                { icon: DollarSign, title: "Cost Savings", text: "Avoid expensive ER visits and emergency evacuations with proper insurance." },
                { icon: HeartPulse, title: "Peace of Mind", text: "Enjoy the matches knowing you are prepared for any medical situation." }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[2rem] transition-colors bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10">
                  <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
                  <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="prep" title="Pre-Departure Preparation">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                <h4 className="font-bold text-2xl mb-4 flex items-center gap-3">
                  <Stethoscope className="w-6 h-6 text-emerald-500" /> Doctor Visit
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
                  Schedule an appointment with your GP or a travel medicine specialist 4-8 weeks before you fly.
                </p>
                <ul className="space-y-4 mb-8">
                  {['Current prescription refills', 'Travel vaccinations', 'Managing chronic conditions', 'Doctor\'s note for meds'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                <h4 className="font-bold text-2xl mb-4 flex items-center gap-3">
                  <ListChecks className="w-6 h-6 text-emerald-500" /> Vaccinations
                </h4>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
                  Strongly recommended by the CDC:
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                    <div>
                      <strong className="text-slate-900 dark:text-white block">Routine Vaccines</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm">MMR, Tdap (tetanus), Flu, COVID-19.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                    <div>
                      <strong className="text-slate-900 dark:text-white block">Hepatitis A</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm">Essential for Mexico.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                    <div>
                      <strong className="text-slate-900 dark:text-white block">Typhoid</strong>
                      <span className="text-slate-600 dark:text-slate-400 text-sm">Recommended for Mexico street food safety.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="p-8 bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2rem]">
              <h4 className="font-bold text-2xl mb-6 text-slate-900 dark:text-white">Medical Documentation</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                   { title: "Medication List", desc: "Generic names + dosages" },
                   { title: "Allergy List", desc: "Translated to Spanish/French" },
                   { title: "Insurance Card", desc: "Copy front/back + policy #" },
                   { title: "Blood Type", desc: "For severe emergencies" }
                 ].map((doc, i) => (
                   <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm">
                     <span className="font-bold text-slate-900 dark:text-white block mb-2">{doc.title}</span>
                     <span className="text-sm text-slate-500 dark:text-slate-400">{doc.desc}</span>
                   </div>
                 ))}
              </div>
            </div>
          </Section>

          <Section id="insurance" title="Travel Insurance (CRITICAL)">
            <div className="mb-12 p-8 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-[2rem]">
               <div className="flex items-center gap-4 mb-4">
                 <AlertTriangle className="w-8 h-8 text-amber-500" />
                 <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-400">Healthcare Cost Warning</h3>
               </div>
               <p className="text-lg text-slate-700 dark:text-slate-300 mb-4 font-medium">
                 The USA has the most expensive healthcare in the world. Your domestic insurance likely provides zero coverage abroad.
               </p>
               <div className="grid sm:grid-cols-2 gap-4 text-slate-600 dark:text-slate-400">
                 <div className="flex justify-between border-b border-amber-200 dark:border-amber-800/30 py-2"><span>ER Visit</span> <span className="font-bold">$1,000 - $3,000+</span></div>
                 <div className="flex justify-between border-b border-amber-200 dark:border-amber-800/30 py-2"><span>Ambulance</span> <span className="font-bold">$500 - $2,000+</span></div>
                 <div className="flex justify-between border-b border-amber-200 dark:border-amber-800/30 py-2"><span>Hospital Night</span> <span className="font-bold">$5,000 - $50,000+</span></div>
                 <div className="flex justify-between border-b border-amber-200 dark:border-amber-800/30 py-2"><span>Evacuation</span> <span className="font-bold">$50,000+</span></div>
               </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div>
                 <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">What to Look For</h3>
                 <ul className="space-y-4">
                   {[
                     "Medical Expenses: $50,000 USD minimum",
                     "Emergency Evacuation: $100,000 USD minimum",
                     "Repatriation Coverage",
                     "COVID-19 Coverage"
                   ].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 text-lg text-slate-700 dark:text-slate-300">
                       <CheckCircle2 className="w-6 h-6 text-emerald-500" /> {item}
                     </li>
                   ))}
                 </ul>
                 <div className="mt-8 flex flex-wrap gap-4">
                   <AffiliateButton href="https://www.allianztravelinsurance.com/" text="Get Allianz Quote" variant="primary" icon={ShieldCheck} />
                  <AffiliateButton href="https://www.worldnomads.com/" text="Check World Nomads" variant="secondary" />
                 </div>
               </div>
               <div className="relative h-64 md:h-full min-h-[300px] rounded-[2rem] overflow-hidden">
                  <Image 
                    src="/images/safety-guide/A_realistic_high-detail_photo_depicting_safe_transportation_in_a_World_Cup_2026-640.webp" 
                    alt="Travel Insurance" 
                    fill 
                    className="object-cover" />
                  <div className="absolute inset-0 bg-emerald-900/20" />
               </div>
            </div>
          </Section>

          <Section id="meds" title="Medications & Prescriptions">
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-xl">
                <strong>Rule #1:</strong> Bring enough for your entire trip PLUS an extra 7-10 days. Delays happen.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { title: "Original Bottles", text: "Pills must be in original pharmacy containers with your name." },
                { title: "Carry-On Only", text: "NEVER check essential medication. Lost bags happen." },
                { title: "Doctor's Letter", text: "Carry a signed letter, especially for controlled substances." }
              ].map((item, i) => (
                <div key={i} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-xl transition-all">
                   <Pill className="w-10 h-10 text-emerald-500 mb-6" />
                   <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
                   <p className="text-slate-600 dark:text-slate-400">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 text-slate-900 dark:text-white p-8 rounded-[2rem] relative overflow-hidden">
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><HeartPulse className="w-6 h-6 text-emerald-400"/> Travel Medical Kit Essentials</h3>
                 <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-emerald-400 mb-3 uppercase tracking-wider text-sm">Pain & Fever</h4>
                      <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                        <li>• Ibuprofen (Advil)</li>
                        <li>• Acetaminophen (Tylenol)</li>
                        <li>• Aspirin</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-400 mb-3 uppercase tracking-wider text-sm">Digestive</h4>
                      <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                        <li>• Imodium (ESSENTIAL for Mexico)</li>
                        <li>• Pepto-Bismol / Tums</li>
                        <li>• Probiotics</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-400 mb-3 uppercase tracking-wider text-sm">First Aid</h4>
                      <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                        <li>• Band-aids & Neosporin</li>
                        <li>• Moleskin (for blisters)</li>
                        <li>• Tweezers & Thermometer</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-400 mb-3 uppercase tracking-wider text-sm">Must-Haves</h4>
                      <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                        <li>• Electrolyte packets (Liquid IV)</li>
                        <li>• Sunscreen SPF 50+</li>
                        <li>• Insect Repellent (DEET)</li>
                      </ul>
                    </div>
                 </div>
                 <div className="mt-8">
                   <AffiliateButton href="https://www.amazon.com/s?k=travel+first+aid+kit" text="Buy Complete First Aid Kit" variant="primary" icon={HeartPulse} />
                 </div>
               </div>
            </div>
          </Section>

          <Section id="countries" title="Country-Specific Health">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  country: "USA", 
                  flag: "🇺🇸", 
                  quality: "World-class but expensive", 
                  access: "Urgent Care ($100-200)", 
                  emergency: "Dial 911" 
                },
                { 
                  country: "Mexico", 
                  flag: "🇲🇽", 
                  quality: "Excellent private care; cheap", 
                  access: "Private hospitals (Angeles/ABC)", 
                  emergency: "Dial 911" 
                },
                { 
                  country: "Canada", 
                  flag: "🇨🇦", 
                  quality: "Excellent public system", 
                  access: "Walk-in clinics ($100-300)", 
                  emergency: "Dial 911" 
                }
              ].map((item, i) => (
                <div key={i} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500 transition-colors group">
                  <div className="text-4xl mb-4">{item.flag}</div>
                  <h4 className="font-bold text-2xl mb-6 text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">{item.country}</h4>
                  <ul className="space-y-4 text-slate-600 dark:text-slate-400">
                    <li className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider font-bold text-slate-400">Quality</span>
                      <span className="font-medium text-slate-900 dark:text-white">{item.quality}</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider font-bold text-slate-400">Access</span>
                      <span className="font-medium text-slate-900 dark:text-white">{item.access}</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider font-bold text-slate-400">Emergency</span>
                      <span className="font-medium text-slate-900 dark:text-white">{item.emergency}</span>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="mt-12 grid md:grid-cols-2 gap-8">
               <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem]">
                 <h4 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">Montezuma's Revenge</h4>
                 <p className="text-slate-600 dark:text-slate-400 mb-4">Very common in Mexico. Caused by bacteria in water/food.</p>
                 <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                   <li className="flex gap-2"><X className="w-5 h-5 text-red-500"/> No tap water (even brushing teeth).</li>
                   <li className="flex gap-2"><X className="w-5 h-5 text-red-500"/> No ice or raw salads.</li>
                   <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Hydrate & Imodium.</li>
                 </ul>
               </div>
               <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem]">
                 <h4 className="font-bold text-xl mb-4 text-slate-900 dark:text-white">Altitude Sickness (CDMX)</h4>
                 <p className="text-slate-600 dark:text-slate-400 mb-4">Mexico City is at 7,350 ft. The air is thinner.</p>
                 <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                   <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Drink 3-4L water daily.</li>
                   <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Avoid alcohol on Day 1.</li>
                   <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Eat light carbs & rest.</li>
                 </ul>
               </div>
            </div>
          </Section>

          <Section id="issues" title="Common Health Issues">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Dehydration & Heat Illness</h3>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                Major risk in Dallas, Miami, Monterrey. Temps can reach 105°F.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800 rounded-[2rem]">
                <h4 className="font-bold text-2xl text-amber-800 dark:text-amber-400 mb-4">Heat Exhaustion</h4>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300 mb-6">
                  <li>• Heavy sweating</li>
                  <li>• Weakness / Dizziness</li>
                  <li>• Nausea / Cool, clammy skin</li>
                </ul>
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500"/> Move to AC. Drink electrolytes.
                </div>
              </div>
              <div className="p-8 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800 rounded-[2rem]">
                <h4 className="font-bold text-2xl text-red-800 dark:text-red-400 mb-4">Heat Stroke (EMERGENCY)</h4>
                <ul className="space-y-2 text-slate-700 dark:text-slate-300 mb-6">
                  <li>• Body temp 104°F+</li>
                  <li>• Hot, DRY skin (no sweat)</li>
                  <li>• Confusion / Unconsciousness</li>
                </ul>
                <div className="font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5"/> Call 911 IMMEDIATELY. Fatal.
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                 <h4 className="font-bold text-xl mb-4">Blisters & Feet</h4>
                 <p className="text-slate-600 dark:text-slate-400 mb-4">You will walk 5-10 miles on match day.</p>
                 <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                   <li>• Break in shoes 1-2 months before.</li>
                   <li>• Wear Merino wool socks (not cotton).</li>
                   <li>• Apply moleskin to hotspots immediately.</li>
                 </ul>
               </div>
               <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                 <h4 className="font-bold text-xl mb-4">Sunburn</h4>
                 <p className="text-slate-600 dark:text-slate-400 mb-4">Sun intensity is high in host cities.</p>
                 <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                   <li>• SPF 50+ broad spectrum.</li>
                   <li>• Apply 30 mins before sun.</li>
                   <li>• Reapply every 2 hours.</li>
                 </ul>
               </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <AffiliateButton href="https://www.amazon.com/s?k=cooling+towel" text="Shop Cooling Towels" variant="secondary" icon={Sun} />
              <AffiliateButton href="https://www.amazon.com/s?k=electrolyte+powder+packets" text="Buy Electrolytes" variant="primary" icon={Droplets} />
            </div>
          </Section>

          <Section id="chronic" title="Chronic Conditions">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Diabetes", items: ["Bring extra insulin/strips", "Use cooling case", "Medical alert bracelet"] },
                { title: "Asthma", items: ["Air quality can trigger", "Bring extra inhalers", "Know your triggers"] },
                { title: "Allergies", items: ["Translation cards", "Bring 2+ EpiPens", "Research local cuisine"] }
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
          </Section>

          <Section id="emergency" title="Emergency Situations">
             <div className="grid md:grid-cols-2 gap-8 mb-12">
               <div className="p-8 border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 rounded-[2rem]">
                 <h4 className="font-bold text-2xl text-red-700 dark:text-red-400 mb-6">Go to ER / Call 911</h4>
                 <ul className="space-y-3">
                   {["Chest pain / Breathing trouble", "Severe allergic reaction", "Head injury with confusion", "Heat stroke signs", "Severe bleeding"].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                       <AlertTriangle className="w-5 h-5 text-red-500" /> {item}
                     </li>
                   ))}
                 </ul>
               </div>
               <div className="p-8 border border-blue-200 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/10 rounded-[2rem]">
                 <h4 className="font-bold text-2xl text-blue-700 dark:text-blue-400 mb-6">Go to Urgent Care</h4>
                 <ul className="space-y-3">
                   {["Minor cuts / Stitches", "Sprains / Strains", "Moderate flu/illness", "Prescription refills", "UTI / Ear infection"].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                       <Activity className="w-5 h-5 text-blue-500" /> {item}
                     </li>
                   ))}
                 </ul>
               </div>
             </div>
             <div className="p-8 bg-slate-900 rounded-[2rem] text-slate-900 dark:text-white">
                <h4 className="font-bold text-2xl mb-6">Finding Help Abroad</h4>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <strong className="block text-emerald-400 mb-2">USA</strong>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">Google "Urgent care near me".</p>
                  </div>
                  <div>
                    <strong className="block text-emerald-400 mb-2">Canada</strong>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">Look for "Walk-in clinic".</p>
                  </div>
                  <div>
                    <strong className="block text-emerald-400 mb-2">Mexico</strong>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">Ask concierge for private doctor. Use insurance assistance.</p>
                  </div>
                </div>
             </div>
          </Section>

          <Section id="checklist" title="Pre-Departure Checklist">
            <div className="space-y-6">
              {[
                { time: "8–12 Weeks Out", title: "Doctor & Dentist", desc: "Book appointments. Discuss vaccines and prescriptions. Buy travel insurance." },
                { time: "4–6 Weeks Out", title: "Meds & Docs", desc: "Get 2nd vaccine doses. Fill extra prescriptions. Get doctor's letters." },
                { time: "2–3 Weeks Out", title: "Supplies", desc: "Build first aid kit. Buy OTC meds. Copy medical docs." },
                { time: "1 Week Out", title: "Pack & Prep", desc: "Pack meds in carry-on. Test translation apps. Break in shoes." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                  <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
                  <div>
                    <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="faq" title="FAQ">
            <div className="space-y-2">
              <FAQItem 
                question="Do I really need travel insurance?" 
                answer="Yes. It is non-negotiable. One accident in the USA can cost you $50,000+. Your home insurance likely does not cover you abroad." 
              />
              <FAQItem 
                question="Is tap water safe in Mexico?" 
                answer="No. Never drink tap water in Mexico. Use sealed bottled water for drinking and brushing teeth to avoid parasites and bacteria." 
              />
              <FAQItem 
                question="Can I refill prescriptions abroad?" 
                answer="It is extremely difficult. You often need a local doctor to write a new prescription. Bring enough supply for your whole trip plus extras." 
              />
              <FAQItem 
                question="How do I prevent altitude sickness in Mexico City?" 
                answer="Hydrate heavily (3-4L/day), avoid alcohol for the first 24 hours, eat light meals, and take it easy. If symptoms are severe, seek medical help." 
              />
              <FAQItem 
                question="What if I have a food allergy and don't speak Spanish?" 
                answer="Carry a printed 'chef card' in Spanish listing your allergies. Use a translation app. When in doubt, stick to simple, whole foods you can identify." 
              />
            </div>
          </Section>

          {/* Conclusion */}
          <div className="bg-slate-900 text-slate-900 dark:text-white rounded-[2rem] p-8 md:p-12 text-center mt-12">
            <h2 className="text-3xl font-bold mb-6">Preparedness is Peace of Mind</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Your health is the foundation of your World Cup experience. Proper preparation ensures you'll remember the goals, not the stomach cramps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <AffiliateButton href="https://www.worldnomads.com/" text="Get Travel Insurance" variant="primary" icon={ShieldCheck} />
               <AffiliateButton href="/world-cup-2026-packing-guide" text="More Packing Tips" variant="outline" />
            </div>
          </div>

        </main>
      </div>
      
    </div>
  );
}



