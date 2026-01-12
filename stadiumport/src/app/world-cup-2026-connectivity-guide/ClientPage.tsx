'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { 
  Wifi, Smartphone, Globe, Shield, Battery, 
  CheckCircle2, AlertTriangle, ArrowRight, 
  MapPin, Phone, Download, Zap, HelpCircle,
  Search, Info,
  CreditCard, Signal, Settings, ChevronRight,
  Share2, MessageSquare, ThumbsUp, Send, 
  Utensils, Camera, Sun, DollarSign, Clock, Star,
  ExternalLink, Train, Bus, Car, Bike, Briefcase,
 X, Facebook, Twitter, Linkedin, Copy, Hotel, Trophy
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
    const text = "Check out this Connectivity Guide for World Cup 2026!";
    
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

  const [activeSection, setActiveSection] = useState('hero');


  // Sticky Nav Links
  const navLinks = [
    { id: 'intro', label: 'Overview' },
    { id: 'decision-tree', label: 'Decision Tree' },
    { id: 'phone-check', label: 'Phone Check' },
    { id: 'esim', label: 'eSIM Options' },
    { id: 'roaming', label: 'Roaming' },
    { id: 'local-sim', label: 'Local SIMs' },
    { id: 'portable-wifi', label: 'Portable WiFi' },
    { id: 'wifi-guide', label: 'WiFi Guide' },
    { id: 'data-usage', label: 'Data Usage' },
    { id: 'apps', label: 'Essential Apps' },
    { id: 'troubleshooting', label: 'Troubleshooting' },
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
            src="/images/travel-tips/World Cup 2026 Connectivity Guide Illustration.webp" 
            alt="World Cup 2026 Connectivity Guide" 
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
                  { label: 'Connectivity', href: '/world-cup-2026-connectivity-guide' }
                ]} 
              />
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Last Updated: January 4, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Travel Guide
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
                  Essential
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                World Cup 2026 Connectivity Guide
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                Phone Plans, SIM Cards & WiFi. <span className="text-slate-900 dark:text-white font-medium">World Cup 2026</span> definitive guide to staying online.
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
            <HelpCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Transparency:</strong> This guide contains affiliate links. We may earn a commission if you book through them, which helps fund our independent journalism.
            </p>
          </div>

          <Section id="intro" title="Stay Connected, Stay Safe">
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
                Picture this: You've just walked out of the stadium after an incredible match. The crowd is roaring, 80,000 people are flooding the streets, and you need an Uber back to your hotel. You pull out your phone... and see "No Service." The nightmare begins.
              </p>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                Losing connection isn't just about not being able to post that goal on Instagram. It means missing your ride, getting lost in a foreign city, and being unable to contact your friends. In a tournament spread across three vast countries—USA, Canada, and Mexico—reliable connectivity isn't a luxury; it's a safety essential.
              </p>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 mt-4">
                But navigating the maze of international roaming fees, carrier locks, and SIM card options can be overwhelming. I've learned the hard way that "roaming" can mean a $500 bill waiting for you at home. That's why I've compiled this comprehensive guide to help you choose the perfect connectivity solution for your budget and needs.
              </p>
            </div>
          </Section>

          <Section id="decision-tree" title="Quick Decision Tree">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Zap, title: "Option 1: eSIM (Recommended)", text: "Best for 90% of travelers with modern phones (iPhone XS+, newer Androids). Instant setup, no physical swapping. Cost: $20-$60." },
                { icon: Globe, title: "Option 2: Roaming", text: "Best for short trips and non-tech-savvy users. Easiest option but often the most expensive ($50-$150+)." },
                { icon: Smartphone, title: "Option 3: Local SIM", text: "Best for budget travelers on long trips (2+ weeks) with unlocked phones. Cheapest rates for unlimited data." },
                { icon: Wifi, title: "Option 4: Portable WiFi", text: "Best for families and groups (4-5 people). Connect multiple devices at once and split the cost." }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[2rem] transition-colors bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-emerald-500/50 hover:shadow-lg">
                  <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
                  <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
              <AffiliateButton href="/world-cup-2026-budget-guide" text="See Budget Guide" variant="secondary" icon={CreditCard} />
            </div>
          </Section>

          <Section id="phone-check" title="Understanding Your Phone">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                <h4 className="font-bold text-2xl mb-4">Is Your Phone Unlocked?</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">This is critical. If your phone is "locked" to your home carrier, it will NOT work with other SIM cards. Check Settings {'>'} General {'>'} About {'>'} Carrier Lock (iPhone) or call your carrier.</p>
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                  <p className="text-amber-800 dark:text-amber-200 text-sm font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4"/> Unlock Early! Process takes 1-5 days.
                  </p>
                </div>
              </div>
              <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                <h4 className="font-bold text-2xl mb-4">eSIM Compatibility</h4>
                <ul className="space-y-4 mb-8">
                  {[
                    { label: 'iPhone', val: 'XR, XS, 11, 12, 13, 14, 15+' },
                    { label: 'Samsung', val: 'S20, S21, S22, S23, S24+' },
                    { label: 'Google', val: 'Pixel 3, 4, 5, 6, 7, 8+' }
                  ].map((item, i) => (
                    <li key={i} className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                      <span className="font-bold text-slate-900 dark:text-white">{item.label}</span>
                      <span>{item.val}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-slate-500">The "Dual SIM" feature lets you keep your home number active for calls while using eSIM for data.</p>
              </div>
            </div>
          </Section>

          <Section id="esim" title="OPTION 1: eSIM Solutions">
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
                For 90% of World Cup travelers, eSIM is the champion. No tiny plastic cards to lose, no store visits, and instant connectivity.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {[
                { name: "Airalo", desc: "Most Popular. Best for budget & short trips. Plans from 1GB to 20GB. Starts ~$4.50.", link: "https://www.airalo.com/" },
                { name: "Holafly", desc: "Heavy Users. Best for unlimited data. Plans for 5-90 days. Starts ~$19.", link: "https://esim.holafly.com/" },
                { name: "Nomad", desc: "Flexible. Best for multi-country trips. Regional & Global plans. Competitive rates.", link: "https://www.getnomad.app/" },
                { name: "Ubigi", desc: "High Quality. Best for reliable speeds and 5G access. Premium networks.", link: "https://cellulardata.ubigi.com/" }
              ].map((brand, i) => (
                <div key={i} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-2xl mb-4 text-slate-900 dark:text-white">{brand.name}</h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">{brand.desc}</p>
                  </div>
                  <AffiliateButton href={brand.link} text={`Get ${brand.name}`} variant="primary" />
                </div>
              ))}
            </div>

            <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-white/5">
              <h3 className="text-2xl font-bold mb-6">How to Set Up Your eSIM</h3>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h4 className="font-bold mb-4 flex items-center gap-2 text-emerald-500"><Smartphone className="w-5 h-5" /> For iPhone</h4>
                  <ol className="space-y-3 list-decimal pl-5 text-slate-700 dark:text-slate-300">
                    <li>Download the provider app (e.g., Airalo).</li>
                    <li>Purchase your desired plan.</li>
                    <li>Tap "Install eSIM" - choose "Direct".</li>
                    <li>Go to Settings {'>'} Cellular.</li>
                    <li>Set "Cellular Data" to your new eSIM.</li>
                    <li><strong>Crucial:</strong> Turn OFF "Data Roaming" for your Primary line.</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-bold mb-4 flex items-center gap-2 text-emerald-500"><Smartphone className="w-5 h-5" /> For Android</h4>
                  <ol className="space-y-3 list-decimal pl-5 text-slate-700 dark:text-slate-300">
                    <li>Download the app and buy a plan.</li>
                    <li>Go to Settings {'>'} Network & Internet.</li>
                    <li>Tap "+" next to SIMs.</li>
                    <li>Select "Download a SIM instead".</li>
                    <li>Scan the QR code provided.</li>
                    <li>Enable eSIM and turn ON "Roaming" for <em>this</em> eSIM only.</li>
                  </ol>
                </div>
              </div>
            </div>
          </Section>

          <Section id="roaming" title="OPTION 2: International Roaming">
            <div className="grid md:grid-cols-2 gap-8">
              {[
                 { carrier: "Verizon", plan: "TravelPass", price: "$10-12 / day", detail: "Use your home data/talk/text. Adds up fast ($300+/month)." },
                 { carrier: "AT&T", plan: "Intl Day Pass", price: "$10-12 / day", detail: "Unlimited data/talk/text. Capped at $100/bill cycle (good value for long trips)." },
                 { carrier: "T-Mobile", plan: "Magenta / MAX", price: "Free / Included", detail: "5GB high-speed in Can/Mex, then slow (256kbps). Too slow for heavy use." },
                 { carrier: "Canada (Rogers/Bell)", plan: "Roam Like Home", price: "$12-16 CAD / day", detail: "Extremely expensive for long trips. Maximize your data cap." }
              ].map((item, i) => (
                <div key={i} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-xl text-slate-900 dark:text-white">{item.carrier}</h4>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-lg text-sm">{item.price}</span>
                  </div>
                  <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-2">{item.plan}</h5>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl flex gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
              <p className="text-amber-900 dark:text-amber-100 font-medium">
                The Cost Trap: Paying $12/day sounds okay for a weekend. But for a 3-week World Cup trip, that's over <strong>$250 USD</strong>. An eSIM for the same period would cost around $30-$50.
              </p>
            </div>
          </Section>

          <Section id="local-sim" title="OPTION 3: Local SIM Cards">
             <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "🇺🇸 USA", items: ["T-Mobile Prepaid (~$50/mo)", "AT&T Prepaid (~$40/mo)", "Mint Mobile (Cheap 3-mo)"] },
                { title: "🇨🇦 Canada", items: ["Fido / Koodo (~$35-50 CAD)", "PhoneBox (Airport Kiosks)", "Virgin Plus"] },
                { title: "🇲🇽 Mexico", items: ["Telcel Amigo (Best Coverage)", "AT&T Mexico", "Buy at OXXO Stores"] }
              ].map((country, i) => (
                <div key={i} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-2xl transition-all duration-300">
                  <h4 className="font-bold text-xl mb-6">{country.title}</h4>
                  <ul className="space-y-4">
                    {country.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">How to Buy & Activate</h3>
              <div className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50">
                 <ul className="space-y-3 w-full">
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Bring Passport (often required).</li>
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Go to official carrier stores (not airport kiosks if possible).</li>
                  <li className="flex items-center gap-3 text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Test it BEFORE leaving the store (load a webpage).</li>
                 </ul>
              </div>
            </div>
          </Section>

          <Section id="portable-wifi" title="OPTION 4: Portable WiFi">
             <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    Traveling with a group of 4-5 friends? A portable WiFi hotspot (or "pocket WiFi") can save you a fortune. It's a small device that creates a WiFi network for everyone to connect to.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50">
                      <Wifi className="w-6 h-6 text-emerald-500 mt-1" />
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">Skyroam (Solis)</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">One of the best. Rent or buy. Day passes ~$9 for unlimited global data.</p>
                      </div>
                    </div>
                     <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50">
                      <Globe className="w-6 h-6 text-emerald-500 mt-1" />
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">TravelWifi</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Rentals pickup at airports or shipped. Rates around $8-12/day.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 w-full">
                   <div className="grid gap-4">
                      <div className="p-6 rounded-2xl border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10">
                        <h4 className="font-bold text-emerald-800 dark:text-emerald-200 mb-2">Pros</h4>
                        <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
                          <li>• Connect 5-10 devices</li>
                          <li>• Very cheap per person (split cost)</li>
                          <li>• Works for laptops/tablets</li>
                        </ul>
                      </div>
                       <div className="p-6 rounded-2xl border-l-4 border-red-500 bg-red-50 dark:bg-red-900/10">
                        <h4 className="font-bold text-red-800 dark:text-red-200 mb-2">Cons</h4>
                        <ul className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
                          <li>• One more device to charge</li>
                          <li>• Must stay close together</li>
                          <li>• If battery dies, everyone offline</li>
                        </ul>
                      </div>
                   </div>
                </div>
             </div>
          </Section>

          <Section id="wifi-guide" title="WiFi Availability Guide">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Hotel className="w-6 h-6 text-emerald-500"/> Hotels</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Free WiFi is standard in 99% of hotels. Speeds vary. Luxury hotels sometimes charge extra for "premium" speeds.</p>
                <Link href="/world-cup-2026-accommodation-guide" className="text-emerald-600 font-bold text-sm hover:underline">Check Accommodation Guide →</Link>
              </div>
              <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Trophy className="w-6 h-6 text-emerald-500"/> Stadiums</h3>
                 <p className="text-slate-600 dark:text-slate-400 mb-4">Technically available, but <strong>do not rely on it</strong>. Networks often crash with 70k people. Download tickets to Wallet apps beforehand.</p>
              </div>
            </div>
            
            <div className="bg-slate-900 text-slate-900 dark:text-white p-8 rounded-[2rem] relative overflow-hidden">
               <div className="relative z-10">
                 <h4 className="font-bold text-2xl mb-4 flex items-center gap-3"><Shield className="w-6 h-6 text-emerald-400" /> Public WiFi Safety</h4>
                 <p className="mb-8 text-slate-600 dark:text-slate-300 text-lg max-w-2xl">
                    Never access your bank account or enter passwords on public WiFi (Starbucks, Airports) without a VPN. It's a hacker's playground.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <AffiliateButton href="https://nordvpn.com/" text="Get NordVPN" variant="primary" />
                    <AffiliateButton href="https://www.expressvpn.com/" text="Get ExpressVPN" variant="secondary" />
                  </div>
               </div>
               <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-emerald-900/30 to-transparent hidden md:block" />
            </div>
          </Section>

          <Section id="data-usage" title="Data Usage Estimates">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { type: "Light", amount: "1-2 GB/week", use: "Maps, WhatsApp text, Email. No streaming." },
                { type: "Medium", amount: "3-5 GB/week", use: "Daily nav, Social media, Photos, Music." },
                { type: "Heavy", amount: "8-10 GB+/week", use: "Stories/Reels, TikTok, Video calls, YouTube." }
              ].map((tier, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 text-center">
                  <h4 className="font-bold text-lg mb-2">{tier.type}</h4>
                  <div className="text-3xl font-black text-emerald-500 mb-3">{tier.amount}</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{tier.use}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
               <p className="text-slate-500 italic">Tip: Download Offline Maps in Google Maps to save huge amounts of data.</p>
            </div>
          </Section>

          <Section id="apps" title="Essential Apps">
             <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-emerald-500"/> Navigation</h4>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li><strong>Google Maps:</strong> Gold standard. Download offline areas.</li>
                    <li><strong>Citymapper:</strong> Superior for public transit in NYC, Toronto.</li>
                    <li><strong>Waze:</strong> Best for driving (traffic/police alerts).</li>
                  </ul>
                </div>
                 <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-emerald-500"/> Communication</h4>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li><strong>WhatsApp:</strong> Essential for contacting hosts/drivers.</li>
                    <li><strong>Google Translate:</strong> Download Spanish/French offline.</li>
                  </ul>
                </div>
                 <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><Car className="w-5 h-5 text-emerald-500"/> Transport</h4>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li><strong>Uber / Lyft:</strong> Works in USA & Canada.</li>
                    <li><strong>Uber / DiDi:</strong> Main apps in Mexico.</li>
                  </ul>
                </div>
                 <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><Briefcase className="w-5 h-5 text-emerald-500"/> Utilities</h4>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li><strong>XE Currency:</strong> For quick exchange rates.</li>
                    <li><strong>Mobile Passport (MPC):</strong> Speed up USA entry.</li>
                  </ul>
                </div>
             </div>
          </Section>

          <Section id="troubleshooting" title="Troubleshooting">
             <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800">
                   <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">"No Service" Upon Arrival?</h4>
                   <ol className="list-decimal pl-5 text-slate-700 dark:text-slate-300 text-sm space-y-1">
                      <li>Toggle Airplane Mode ON/OFF.</li>
                      <li>Check Settings {'>'} Cellular {'>'} Data Roaming is ON for your travel SIM.</li>
                      <li>Restart your phone.</li>
                   </ol>
                </div>
                <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800">
                   <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">eSIM Not Activating?</h4>
                   <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 text-sm space-y-1">
                      <li>You usually need WiFi to activate initially. Use airport WiFi.</li>
                      <li>Ensure APN settings are correct (check provider email).</li>
                   </ul>
                </div>
                 <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                   <h4 className="font-bold mb-2">Emergency Calls (911)</h4>
                   <p className="text-sm text-slate-600 dark:text-slate-400">
                      <strong>911</strong> works in USA, Canada, AND Mexico. You do NOT need a data plan or even a valid SIM to call 911. Your phone will connect to any available tower.
                   </p>
                </div>
             </div>
          </Section>

          <Section id="faq" title="FAQ">
            <div className="space-y-2">
              {[
                { q: "Do I need a different SIM for each country?", a: "Not necessarily. Regional eSIMs (North America) cover USA, Canada, and Mexico in one plan. If you buy local SIMs, yes, you'd need a new one for each border crossing." },
                { q: "Is WhatsApp free to use internationally?", a: "Yes, WhatsApp uses your data plan or WiFi. It doesn't use 'minutes' or SMS fees. It's the best way to call home for free." },
                { q: "Can I keep my WhatsApp number with a new SIM?", a: "Yes! When you put in a new SIM, WhatsApp will ask if you want to keep your existing number. Say YES. All your chats remain." },
                { q: "Will 5G work everywhere?", a: "Major cities (NY, LA, Toronto, Mexico City) have excellent 5G. Rural areas may drop to 4G/LTE. Coverage is generally very good in all host cities." },
                { q: "How do I avoid roaming charges on my home SIM?", a: "Turn off 'Data Roaming' for your primary line in settings. Even better, ask your carrier to disable international roaming on their end before you leave." },
                { q: "Can I share my eSIM data via Hotspot?", a: "Most providers (Airalo, Holafly, Nomad) allow hotspotting, but check the specific plan details. Unlimited plans sometimes restrict hotspot speeds." }
              ].map((item, i) => (
                <FAQItem key={i} question={item.q} answer={item.a} />
              ))}
            </div>
          </Section>

          {/* Pre-Departure Checklist */}
          <Section id="checklist" title="Pre-Departure Checklist">
             <div className="p-8 rounded-[2rem] bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800">
               <ul className="space-y-4">
                 {[
                    "Check if phone is unlocked (2 weeks before)",
                    "Download offline maps for all host cities",
                    "Install VPN app and log in",
                    "Purchase and install eSIM (1-2 days before)",
                    "Download entertainment (Netflix/Spotify) for flight",
                    "Pack a portable power bank (Anker is reliable)",
                    "Write down hotel addresses and emergency numbers"
                 ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-900 dark:text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {i + 1}
                       </div>
                       <span className="font-medium text-slate-800 dark:text-slate-200">{item}</span>
                    </li>
                 ))}
               </ul>
               <div className="mt-8 pt-8 border-t border-emerald-200 dark:border-emerald-700 flex flex-wrap gap-4">
                  <AffiliateButton href="https://www.amazon.com/s?k=power+bank" text="Shop Power Banks" variant="primary" icon={Battery} />
                  <AffiliateButton href="/world-cup-2026-packing-guide" text="View Full Packing List" variant="outline" />
               </div>
             </div>
          </Section>

        </main>
      </div>
      
    </div>
  );
}



