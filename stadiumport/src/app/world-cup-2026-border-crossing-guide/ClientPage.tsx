'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { 
  MapPin, Globe, ShieldCheck, AlertTriangle, CheckCircle2, Info, 
  FileText, Truck, Plane, DollarSign, Clock, Search, XCircle, 
  ChevronRight, ArrowRight, Lock, Car, Briefcase, Download,
  BookUser, CreditCard, Users, Siren, Thermometer, Flag,
  Twitter, Facebook, Linkedin, Copy, ShieldAlert,
  Smartphone, Wifi, MessageSquare, Zap, Server
} from 'lucide-react';



// --- Design System & Components (Mirrored from Accommodation Security) ---

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// 1. Floating Social Share
const SocialShare = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Border Crossing Guide: USA, Canada & Mexico - World Cup 2026";
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
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
      <div className="backdrop-blur-md p-2 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col gap-3">
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
          aria-label="Copy Link"
        >
          {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
        </button>
      </div>
    </motion.div>
  );
};

// 2. Section Component
const Section = ({ id, title, children, className = "" }: { id: string, title: string, children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id={id} ref={ref} className={`py-16 md:py-24 scroll-mt-24 ${className}`}>
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
      >
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-12 tracking-tight">
          <span className="text-emerald-600 dark:text-emerald-500 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">Border Control</span>
          {title}
        </h2>
        {children}
      </motion.div>
    </section>
  );
};

// 3. Affiliate Button
const AffiliateButton = ({ href, text, icon: Icon = ArrowRight, variant = 'primary', subtext }: { href: string, text: string, icon?: any, variant?: 'primary' | 'secondary' | 'outline', subtext?: string }) => {
  const baseClasses = "group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden";
  const variants = {
    primary: "bg-emerald-500 text-slate-900 dark:text-white hover:bg-emerald-400 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.6)]",
    secondary: "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xl",
    outline: "border-2 border-slate-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-900 dark:text-white bg-transparent"
  };

  const isExternal = href.startsWith('http');

  return (
    <Link 
      href={href} 
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`${baseClasses} ${variants[variant]} flex-col md:flex-row w-full md:w-auto`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />}
        {text}
      </span>
      {subtext && <span className="relative z-10 text-xs font-normal opacity-80 md:ml-2">({subtext})</span>}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
    </Link>
  );
};

// 4. FAQ Item
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

// 5. Custom Content Boxes
const RedFlagBox = ({ title, items }: { title: string, items: string[] }) => (
  <div className="p-8 rounded-[2rem] border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 mb-8 hover:shadow-2xl transition-all duration-300">
    <h4 className="font-bold text-2xl mb-6 text-red-700 dark:text-red-400 flex items-center gap-3">
      <ShieldAlert className="w-8 h-8"/>
      {title}
    </h4>
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-lg">
          <div className="w-2 h-2 bg-red-500 rounded-full mt-2.5 shrink-0" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const GreenShieldBox = ({ title, items }: { title: string, items: string[] }) => (
  <div className="p-8 rounded-[2rem] border border-emerald-200 dark:border-emerald-900/30 bg-emerald-50/50 dark:bg-emerald-900/10 mb-8 hover:shadow-2xl transition-all duration-300">
    <h4 className="font-bold text-2xl mb-6 text-emerald-700 dark:text-emerald-400 flex items-center gap-3">
      <ShieldCheck className="w-8 h-8"/>
      {title}
    </h4>
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-lg">
          <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
          <span className="leading-relaxed font-medium">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const StatCard = ({ icon: Icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="p-8 rounded-[2rem] transition-colors bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-emerald-500/50 hover:shadow-xl">
    <Icon className="w-10 h-10 text-emerald-500 mb-6" />
    <h4 className="font-bold text-3xl mb-3 text-slate-900 dark:text-white">{value}</h4>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{label}</p>
  </div>
);

const ComparisonTable = ({ headers, rows }: { headers: string[], rows: (string | React.ReactNode)[][] }) => (
  <div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900/50">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-slate-50 dark:bg-slate-800">
          {headers.map((header, i) => (
            <th key={i} className="p-4 font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 min-w-[150px]">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className="p-4 text-slate-600 dark:text-slate-300">{cell}</td>
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

  // Navigation Links
  const navLinks = [
    { id: 'requirements', label: 'Entry Requirements' },
    { id: 'documents', label: 'Required Documents' },
    { id: 'trusted', label: 'Trusted Travelers' },
    { id: 'land', label: 'Land Borders' },
    { id: 'customs', label: 'Customs & Duty' },
    { id: 'prohibited', label: 'Prohibited Items' },
    { id: 'vehicles', label: 'Driving & Vehicles' },
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

      {/* 1. Hero Section */}
      <div className="relative h-[75vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/safety-guide/Border Crossing Guide USA, Canada & Mexico.webp" 
            alt="World Cup 2026 Border Crossing" 
            fill 
            className="object-cover object-center"
            priority quality={60} 
            sizes="100vw"
          />
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
                  { label: 'Border Crossing', href: '/world-cup-2026-border-crossing-guide' }
                ]} 
              />

              {/* Badge/Category */}
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Last Updated: January 4, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Travel Tips
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                World Cup 2026 Border Crossing Guide
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                The ultimate guide to navigating land and air borders between the USA, Canada, and Mexico for World Cup 2026.
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
            <div className="space-y-1 relative border-l-2 border-slate-200 dark:border-slate-800 ml-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.id} 
                  href={`#${link.id}`}
                  className={`block px-6 py-3 text-sm font-bold transition-all duration-300 relative ${
                    activeSection === link.id 
                    ? 'text-emerald-600 dark:text-emerald-400 translate-x-1' 
                    : 'text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
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
          <div className="mb-12 p-6 rounded-2xl text-sm text-slate-500 dark:text-slate-400 flex gap-4 items-start bg-slate-100 dark:bg-slate-900/50">
            <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Transparency:</strong> This guide contains affiliate links for services like visa assistance and travel insurance. We may earn a commission if you book through them, which helps fund our independent journalism.
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
             <div className="pl-6 border-l-4 border-emerald-500 my-12 italic text-slate-800 dark:text-slate-200 font-medium text-xl">
               <strong>The World Cup 2026 Reality:</strong> For the first time in history, the tournament is split across three massive nations. To follow your team, you will likely need to cross international borders multiple times.
             </div>
             <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
               Crossing from Seattle to Vancouver or San Diego to Tijuana isn't just "driving down the road." These are hardened international borders with strict immigration controls, customs inspections, and biosecurity laws.
             </p>
             <p className="text-lg text-slate-600 dark:text-slate-400">
               We have crossed these borders dozens of times by car, bus, and plane. We know the difference between a 10-minute breeze and a 4-hour nightmare. This guide is your tactical manual for smooth passage, ensuring you spend your time in the stadium, not in a secondary inspection room.
             </p>
          </div>

          <Section id="context" title="UNDERSTANDING THE BORDERS">
            <div className="grid md:grid-cols-2 gap-6 mb-12">
               <StatCard icon={MapPin} label="Total Land Border" value="8,891 km" />
               <StatCard icon={Users} label="Daily Crossings" value="~1 Million" />
               <StatCard icon={Clock} label="Avg Wait (Normal)" value="30-60 min" />
               <StatCard icon={Siren} label="Security Level" value="High" />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-800 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The Three-Nation Challenge</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-lg">
                The USA, Canada, and Mexico are partners, but their borders are distinct. The <strong>USA-Canada border</strong> is the longest undefended border in the world, yet strictly controlled. The <strong>USA-Mexico border</strong> is one of the busiest and most scrutinized.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                <strong>Crucial Misconception:</strong> Many fans assume a "World Cup Ticket" grants automatic entry to all three countries. <span className="text-red-500 font-bold">It does not.</span> You must meet the entry requirements for <em>each</em> country individually.
              </p>
            </div>
          </Section>

          <Section id="requirements" title="ENTRY REQUIREMENTS">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
               Your passport is just the beginning. Depending on your nationality, you will likely need electronic authorization before you fly.
            </p>

            <ComparisonTable 
              headers={["Country", "Primary Document", "Cost", "Validity", "Processing Time"]}
              rows={[
                ["🇺🇸 USA", "ESTA (Visa Waiver)", "$21 USD", "2 Years", "72 Hours"],
                ["🇨🇦 Canada", "eTA (Electronic Travel Auth)", "$7 CAD", "5 Years", "Minutes to 72 Hours"],
                ["🇲🇽 Mexico", "FMM (Tourist Card)", "Free (~$30-40 if lost)", "180 Days", "Instant at Border"]
              ]}
            />

            <div className="grid md:grid-cols-3 gap-6 my-12">
               <div className="p-6 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800">
                  <h4 className="font-bold text-xl mb-3 text-blue-800 dark:text-blue-300">USA Entry (ESTA)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Required for citizens of 41 Visa Waiver countries (UK, EU, Australia, etc.). If you are not eligible, you need a B1/B2 Visa (apply months in advance).
                  </p>
                  <AffiliateButton href="https://esta.cbp.dhs.gov/" text="Apply for ESTA" variant="outline" icon={Globe} />
               </div>
               <div className="p-6 rounded-3xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
                  <h4 className="font-bold text-xl mb-3 text-red-800 dark:text-red-300">Canada Entry (eTA)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Visa-exempt foreign nationals flying to Canada need an eTA. US citizens are exempt. Lawful permanent residents of the US need an eTA.
                  </p>
                  <AffiliateButton href="https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/apply.html" text="Apply for eTA" variant="outline" icon={Globe} />
               </div>
               <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800">
                  <h4 className="font-bold text-xl mb-3 text-emerald-800 dark:text-emerald-300">Mexico Entry (FMM)</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    The "Forma Migratoria Múltiple" is your tourist permit. US/Canadian citizens don't need a visa for &lt;180 days, just this form.
                  </p>
                  <AffiliateButton href="https://www.inm.gob.mx/fmme/publico/en/solicitud.html" text="Get FMM Online" variant="outline" icon={Globe} />
               </div>
            </div>

            <RedFlagBox 
              title="Passport Expiry Rule"
              items={[
                "Your passport must be valid for at least 6 months beyond your intended date of departure.",
                "If your passport expires in 2026, RENEW IT NOW. Processing times will skyrocket before the tournament.",
                "Check blank pages: You need at least 2-4 blank pages for stamps if crossing multiple borders."
              ]}
            />
          </Section>

          <Section id="documents" title="REQUIRED DOCUMENTS">
            <GreenShieldBox 
              title="The 'Border-Ready' Portfolio"
              items={[
                "Valid Passport (with 6+ months validity)",
                "Printed ESTA / eTA / Visa confirmations (Systems can fail)",
                "World Cup Match Tickets (Proof of purpose)",
                "Accommodation Bookings (Proof of address)",
                "Return/Onward Flight Details (Proof you will leave)",
                "Bank Statement or Credit Card (Proof of funds)",
                "Travel Insurance Policy (Physical copy)"
              ]}
            />
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              <strong>Pro Tip:</strong> Keep these documents in a specific folder in your carry-on or vehicle glove box. Do not bury them in your luggage. When you pull up to the booth, hand the agent your passport and have the rest ready <em>only if asked</em>.
            </p>
            <AffiliateButton href="#" text="Get a Waterproof Document Organizer" variant="secondary" icon={Briefcase} subtext="Essential for travel" />
          </Section>

          <Section id="trusted" title="TRUSTED TRAVELER PROGRAMS">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-light">
               Want to skip the 2-hour lines? Trusted Traveler Programs are the "Cheat Code" for North American borders.
            </p>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-white/5 p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-lg">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Global Entry</h3>
                <p className="text-emerald-500 font-bold mb-4">$100 / 5 Years</p>
                <ul className="space-y-3 mb-8 text-slate-600 dark:text-slate-400 text-sm">
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Expedited USA Entry (Air/Land)</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Includes TSA PreCheck</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> No paperwork on arrival</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-white/5 p-8 rounded-[2rem] border border-emerald-500/30 dark:border-emerald-500/30 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">BEST VALUE</div>
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">NEXUS</h3>
                <p className="text-emerald-500 font-bold mb-4">$50 / 5 Years</p>
                <ul className="space-y-3 mb-8 text-slate-600 dark:text-slate-400 text-sm">
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Expedited USA & Canada Entry</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Dedicated lanes at land borders</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Includes Global Entry & TSA PreCheck</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-white/5 p-8 rounded-[2rem] border border-slate-200 dark:border-white/10 shadow-lg">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                  <Car className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">SENTRI</h3>
                <p className="text-emerald-500 font-bold mb-4">$122.25 / 5 Years</p>
                <ul className="space-y-3 mb-8 text-slate-600 dark:text-slate-400 text-sm">
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Expedited USA Entry from Mexico</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Pedestrian & Vehicle lanes</li>
                  <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Vital for frequent southern crossers</li>
                </ul>
              </div>
            </div>
            
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-6 italic">
              *Note: Application backlogs can be 6-12 months. Apply immediately if you plan to use these for 2026.
            </p>
          </Section>

          <Section id="land" title="LAND BORDER CROSSINGS">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-light">
               Driving between host cities? You will encounter some of the busiest border crossings on Earth.
            </p>

            <div className="space-y-8">
               <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                   <Flag className="w-6 h-6 text-blue-600" /> USA ↔ Canada (Key Routes)
                 </h3>
                 <div className="grid md:grid-cols-2 gap-6">
                   <div>
                     <h4 className="font-bold text-lg mb-2">Seattle ↔ Vancouver</h4>
                     <p className="text-slate-600 dark:text-slate-400"><strong>Crossing:</strong> Peace Arch / Pacific Highway</p>
                     <p className="text-slate-600 dark:text-slate-400"><strong>Wait Time:</strong> 30 min - 3 hours</p>
                     <p className="text-sm text-slate-500 mt-2">Best for: Fans traveling between Lumen Field and BC Place.</p>
                   </div>
                   <div>
                     <h4 className="font-bold text-lg mb-2">Detroit ↔ Toronto</h4>
                     <p className="text-slate-600 dark:text-slate-400"><strong>Crossing:</strong> Ambassador Bridge / Detroit-Windsor Tunnel</p>
                     <p className="text-slate-600 dark:text-slate-400"><strong>Wait Time:</strong> 15 min - 1 hour</p>
                     <p className="text-sm text-slate-500 mt-2">Busiest commercial crossing in North America.</p>
                   </div>
                 </div>
               </div>

               <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                   <Flag className="w-6 h-6 text-emerald-600" /> USA ↔ Mexico (Key Routes)
                 </h3>
                 <div className="grid md:grid-cols-2 gap-6">
                   <div>
                     <h4 className="font-bold text-lg mb-2">San Diego ↔ Tijuana</h4>
                     <p className="text-slate-600 dark:text-slate-400"><strong>Crossing:</strong> San Ysidro / Otay Mesa</p>
                     <p className="text-slate-600 dark:text-slate-400"><strong>Wait Time:</strong> 1 - 4+ hours (Northbound)</p>
                     <p className="text-sm text-slate-500 mt-2">The busiest land border in the Western Hemisphere. Pedestrian crossing is often faster.</p>
                   </div>
                   <div>
                     <h4 className="font-bold text-lg mb-2">El Paso ↔ Juarez</h4>
                     <p className="text-slate-600 dark:text-slate-400"><strong>Crossing:</strong> Bridge of the Americas</p>
                     <p className="text-slate-600 dark:text-slate-400"><strong>Wait Time:</strong> 45 min - 2 hours</p>
                   </div>
                 </div>
               </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-4">
               <AffiliateButton href="https://bwt.cbp.gov/" text="Check CBP Wait Times" variant="primary" icon={Clock} />
               <AffiliateButton href="https://www.cbsa-asfc.gc.ca/bwt-taf/menu-eng.html" text="Check Canada Wait Times" variant="outline" icon={Clock} />
            </div>
          </Section>

          <Section id="customs" title="CUSTOMS & DUTY">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-light">
               You can bring souvenirs, but there are limits. Exceeding them isn't a crime, but failing to declare them is.
            </p>

            <ComparisonTable 
              headers={["Category", "🇺🇸 Entering USA", "🇨🇦 Entering Canada", "🇲🇽 Entering Mexico"]}
              rows={[
                ["Duty-Free Exemption", "$800 USD (after 48hrs)", "$800 CAD (after 48hrs)", "$300-500 USD"],
                ["Alcohol", "1 Liter", "1.14L Spirits / 1.5L Wine / 8.5L Beer", "3 Liters Spirits / 6 Liters Wine"],
                ["Tobacco", "200 Cigarettes", "200 Cigarettes", "10 Packs"],
                ["Currency", "Declare $10k+ USD", "Declare $10k+ CAD", "Declare $10k+ USD"]
              ]}
            />
            
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              <strong>The Golden Rule:</strong> If you are unsure, DECLARE IT. The penalty for declaring an apple is usually just losing the apple. The penalty for <em>hiding</em> an apple can be a $500 fine and loss of trusted traveler status.
            </p>
          </Section>

          <Section id="prohibited" title="PROHIBITED ITEMS">
             <RedFlagBox 
               title="Strictly Prohibited Items"
               items={[
                 "Recreational Cannabis (Even if legal in WA/BC/CA - crossing federal borders with it is a felony)",
                 "Fresh Fruits & Vegetables (Citrus, avocados, etc. often banned)",
                 "Meats (Fresh, dried, or cured meats often seized)",
                 "Firearms (Mexico has zero tolerance; Canada has strict rules. Best advice: Leave them at home)",
                 "Pepper Spray (Prohibited in Canada, allowed in USA)"
               ]}
             />
             <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
               <strong>Medicines:</strong> Always keep prescription meds in their original containers with the pharmacy label clearly visible. If carrying needles (insulin), have a doctor's note.
             </p>
          </Section>

          <Section id="vehicles" title="DRIVING & VEHICLES">
             <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-light">
               Taking a road trip? Your US or Canadian insurance likely stops working the moment you cross into Mexico.
             </p>
             
             <div className="bg-emerald-50 dark:bg-emerald-900/10 p-8 rounded-[2rem] border border-emerald-200 dark:border-emerald-800 mb-8">
                <h4 className="font-bold text-2xl mb-4 text-emerald-800 dark:text-emerald-300">Driving into Mexico</h4>
                <ul className="space-y-4 text-slate-700 dark:text-slate-300 text-lg">
                   <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Mexican Auto Insurance:</strong> Mandatory. Your US policy is not recognized. You can be jailed for an accident without it.</span>
                   </li>
                   <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>TIP (Temporary Import Permit):</strong> Required if driving beyond the "Free Zone" (approx 25km from border). Requires a deposit (~$200-400) refundable upon exit.</span>
                   </li>
                </ul>
                <div className="mt-6">
                   <AffiliateButton href="#" text="Get Mexican Auto Insurance Quote" variant="primary" icon={Car} />
                </div>
             </div>

             <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-2xl mb-4 text-slate-900 dark:text-white">Rental Cars</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                   Most US rental agencies strictly forbid taking cars into Mexico. Some allow Canada with prior authorization (and a specific insurance card). <strong>Always check before booking.</strong>
                </p>
             </div>
          </Section>

          <Section id="faq" title="FREQUENTLY ASKED QUESTIONS">
            <div className="space-y-4">
              <FAQItem 
                question="What happens if I get sent to Secondary Inspection?" 
                answer="Don't panic. It's a routine check. It means they need to verify a document or ask more questions. Park where directed, leave your phone in the car (unless asked), and answer truthfully. It usually takes 30-60 minutes."
              />
              <FAQItem 
                question="Can I use my Global Entry card to enter Canada?" 
                answer="No. Global Entry kiosks are for entering the USA. To use expedited lanes entering Canada, you need a NEXUS card."
              />
              <FAQItem 
                question="Do I need a visa for a layover in the USA?" 
                answer="Yes. The USA does not have 'transit zones' like Europe. Even for a 2-hour layover, you must clear immigration, which means you need an ESTA or Visa."
              />
              <FAQItem 
                question="I have a DUI from 5 years ago. Can I enter Canada?" 
                answer="Likely no. Canada considers DUI a 'serious criminality'. You may be deemed inadmissible. You need to apply for Criminal Rehabilitation or a Temporary Resident Permit (TRP) well in advance."
              />
              <FAQItem 
                question="Can I cross the border with a digital ID?" 
                answer="No. You must have your physical passport or trusted traveler card. Photos on your phone are not valid travel documents."
              />
            </div>
          </Section>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-emerald-900 dark:to-slate-900 rounded-[3rem] p-12 text-center relative overflow-hidden mt-20">
            <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Don't Get Stuck at the Border
              </h2>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                Preparation is the difference between a 10-minute wave-through and a missed kickoff. Download our checklist and double-check your documents today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AffiliateButton href="#" text="Download Crossing Checklist" variant="primary" icon={Download} />
                <AffiliateButton href="/world-cup-2026-safety-guide" text="Back to Safety Hub" variant="secondary" icon={ArrowRight} />
              </div>
            </div>
          </div>

        </main>
      </div>
      
    </div>
  );
}

