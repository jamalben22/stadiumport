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
  X, ChevronRight, Facebook, Twitter, Linkedin, Copy, Heart, Search
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
    const text = "Check out this Family Safety Guide for World Cup 2026!";
    
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
          <span className="text-emerald-500 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">Safety Guide</span>
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
    { id: 'visa', label: 'Child Documents' },
    { id: 'planning', label: 'Planning' },
    { id: 'budget', label: 'Budget' },
    { id: 'stadium', label: 'Stadium Safety' },
    { id: 'tickets', label: 'Tickets' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'transport', label: 'Transport' },
    { id: 'dining', label: 'Food & Drink' },
    { id: 'attractions', label: 'Activities' },
    { id: 'tips', label: 'Match Day' },
    { id: 'safety', label: 'Protocols' },
    { id: 'culture', label: 'Fan Culture' },
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
            src="/images/safety-guide/A_realistic_high-detail_photo_of_a_family_with_children_entering_or_walking_near-1600.webp" 
            alt="Family attending World Cup" 
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
                { label: 'Family Safety', href: '/world-cup-2026-family-safety-guide' }
              ]} 
            />

              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                    Last Updated: January 4, 2026
                  </span>
                <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Safety First
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
                  Parents Guide
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
                FAMILY <span className="block text-4xl md:text-6xl lg:text-7xl mt-2 text-slate-400">SAFETY GUIDE</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-900 dark:text-white/90 font-light max-w-xl leading-relaxed">
                Protecting your team. <span className="text-slate-900 dark:text-white font-medium">World Cup 2026</span> strategies for parents & kids.
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
              <strong>Transparency:</strong> This guide contains affiliate links. We may earn a commission if you book through them, which helps fund our independent safety research.
            </p>
          </div>

          <Section id="overview" title="Strategic Overview">
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
                Taking children to the World Cup is a core memory in the making, but the logistics can be daunting. From massive crowds to heat management, your "team manager" role just got real. This guide focuses on <strong>prevention, preparation, and protocols</strong> to ensure your family trip is safe and stress-free.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: "Identity", text: "Wristbands or GPS trackers for kids are non-negotiable in crowds of 80,000+." },
                { icon: Users, title: "Buddy System", text: "Assign one adult per child under 10. Zone defense fails in big crowds; play man-to-man." },
                { icon: AlertTriangle, title: "Emergency Plan", text: "Have a designated meeting spot OUTSIDE the stadium gates. Inside is too chaotic." }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[2rem] transition-colors">
                  <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
                  <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="visa" title="Child Documents">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                <h4 className="font-bold text-2xl mb-4">International Travel</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">Every child, including infants, needs their own passport. If only one parent is traveling, you often need a <strong>notarized consent letter</strong> from the other parent to cross borders.</p>
                <AffiliateButton href="https://travel.state.gov/content/travel/en/International-Parental-Child-Abduction/prevention/common-questions.html" text="Consent Letter Info" variant="outline" />
              </div>
              <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                <h4 className="font-bold text-2xl mb-4">Digital Backups</h4>
                <ul className="space-y-4 mb-8">
                  {['Photos of child\'s passport', 'Recent photo of child (for ID)', 'Medical insurance cards'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
                    </li>
                  ))}
                </ul>
                <AffiliateButton href="https://www.worldnomads.com/" text="Family Travel Insurance" variant="secondary" />
              </div>
            </div>
          </Section>

          <Section id="planning" title="Planning Timeline">
            <div className="space-y-6">
              {[
                { time: "12 Months Out", desc: "Check passport expiration dates. Child passports often expire in 5 years, not 10. Renew if expiring within 6 months of travel." },
                { time: "6 Months Out", desc: "Book family suites or apartments. Adjoining rooms in hotels sell out fast." },
                { time: "1 Month Out", desc: "Test ear protection muffs on kids. Break in walking shoes. Practice your 'lost child' drill." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] items-center">
                  <div className="shrink-0 w-48 font-black text-2xl text-emerald-500">{item.time}</div>
                  <p className="text-lg text-slate-700 dark:text-slate-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="budget" title="Family Budget Tiers">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Smart Saver", items: ["Suburban Airbnbs with kitchen", "Public transport passes", "Picnic lunches"] },
                { title: "Comfort Family", items: ["Hotel with pool (essential for downtime)", "Uber/Lyft for late nights", "One sit-down meal per day"] },
                { title: "Premium", items: ["Stadium suite (private space)", "Chauffeur service", "Fast-track attraction passes"] }
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

          <Section id="stadium" title="Stadium Safety">
            <LightboxImage 
              src="/images/safety-guide/A_realistic_high-detail_photo_of_a_modern_football_stadium_entrance_during_World_cup_2026-1600.webp" 
              alt="Stadium Entrance Safety" 
              caption="Navigate stadium entrances early to avoid the crush."
            />
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p>
                Stadiums are awe-inspiring but can be overwhelming for small children. The sheer scale, noise (100db+), and density of people require active management. <strong>Never let go of your child's hand</strong> at the gates.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm">
                 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Shield className="text-emerald-500"/> The "Tag" System</h4>
                 <p className="text-slate-600 dark:text-slate-400">
                   Write your phone number on a wristband or your child's arm in sharpie (covered by liquid bandage). Teach them to find a uniformed police officer or steward if lost, not a stranger.
                 </p>
               </div>
               <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm">
                 <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><AlertTriangle className="text-emerald-500"/> Sensory Safety</h4>
                 <p className="text-slate-600 dark:text-slate-400">
                   World Cup crowds are LOUD. Bring noise-canceling earmuffs for kids under 10. Overstimulation leads to meltdowns; have a quiet zone plan (concourse corners).
                 </p>
               </div>
            </div>
          </Section>

          <Section id="tickets" title="Tickets for Kids">
             <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                <h4 className="font-bold text-2xl mb-4">Do babies need tickets?</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
                  <strong>Assume YES.</strong> FIFA policy usually requires a ticket for every human entering the stadium, regardless of age. Lap infants are rarely an exception in World Cup matches due to capacity controls. Check specific stadium guides, but budget for a full-price ticket.
                </p>
                <div className="flex gap-4">
                  <AffiliateButton href="#" text="Check Ticket Policies" variant="primary" icon={Ticket} />
                </div>
              </div>
          </Section>

          <Section id="transport" title="Transport with Kids">
             <LightboxImage 
              src="/images/safety-guide/A_realistic_high-detail_photo_depicting_safe_transportation_in_a_World_Cup_2026-1600.webp" 
              alt="Safe Transport" 
              caption="Use designated family lanes where available and prioritize safety over speed."
            />
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              {[
                { icon: Train, title: "Public Transit", text: "Crowded post-match trains are dangerous for small kids. Wait 45 mins after the whistle for crowds to thin." },
                { icon: Car, title: "Car Seats", text: "Ubers/Taxis rarely have car seats. Bring a portable travel booster (e.g., mifold or BubbleBum)." },
                { icon: Bike, title: "Strollers", text: "Strollers are generally banned in stadium bowls. Use a baby carrier/sling for match day." }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                  <item.icon className="w-10 h-10 text-emerald-500 mb-6" />
                  <h4 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="hotels" title="Where to Stay">
             <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                <h4 className="font-bold text-2xl mb-4">Family vs. Party Zones</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg">
                  Avoid staying right next to Fan Fests if you have light sleepers. Look for hotels with:
                </p>
                <ul className="grid md:grid-cols-2 gap-4 mb-8">
                  {['Soundproof windows', 'Swimming pool (burn off energy)', 'Breakfast included', 'Refrigerator in room'].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
                    </li>
                  ))}
                </ul>
                <AffiliateButton href="https://www.booking.com/index.html" text="Find Family Hotels" variant="primary" icon={Hotel} />
              </div>
          </Section>

          <Section id="faq" title="Parent FAQ">
            <div className="space-y-4">
              <FAQItem 
                question="Can I bring food/milk for my baby?" 
                answer="Exceptions are usually made for formula and baby food. You must declare them at security. Glass containers are banned; use plastic pouches." 
              />
              <FAQItem 
                question="Are there family bathrooms?" 
                answer="Newer stadiums (Atlanta, Dallas, LA) have excellent family facilities. Older venues may be more limited. Check stadium maps in advance." 
              />
              <FAQItem 
                question="What if we get separated?" 
                answer="Teach your child to freeze and stay put (if safe) or find a 'safe stranger' (mom with kids) or police. Immediately alert stadium staff with your child's description and seat location." 
              />
              <FAQItem 
                question="Is it safe for teenagers to roam?" 
                answer="In groups, generally yes, but set strict check-in times and boundaries. Data service often fails in packed stadiums; have a physical meeting spot." 
              />
            </div>
          </Section>

        </main>
      </div>
      
    </div>
  );
}



