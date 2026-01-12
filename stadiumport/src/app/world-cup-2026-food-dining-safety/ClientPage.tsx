'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { 
  Shield, CheckCircle2, AlertTriangle, 
  MapPin, Users, Info, ChevronRight, 
  HeartPulse, Lock, Facebook, Twitter, Linkedin, 
  Copy, ShieldAlert, ShieldCheck, Bus, Ban, Ticket, ArrowRight,
  Utensils, Droplets, Thermometer, Pill
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';



const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// 1. Floating Social Share
const SocialShare = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Food & Water Safety: Dining Without Distress - World Cup 2026 Guide";
    
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
      >
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-12 tracking-tight">
          <span className="text-emerald-600 dark:text-emerald-500 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">Dining Safety</span>
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
      className={`${baseClasses} ${variants[variant]} flex-col md:flex-row`}
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

// 6. Comparison Table
const ComparisonTable = ({ headers, rows }: { headers: string[], rows: (string | React.ReactNode)[][] }) => (
  <div className="overflow-x-auto my-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
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

export default function FoodSafetyClientPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSection, setActiveSection] = useState('hero');

  // Navigation Links
  const navLinks = [
    { id: 'risks', label: 'Risks' },
    { id: 'pre-trip', label: 'Prevention First' },
    { id: 'water-safety', label: 'Water Safety' },
    { id: 'food-hygiene', label: 'Food Hygiene' },
    { id: 'illness', label: 'Illness Mgmt' },
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
      <div className="relative h-[65vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/safety-guide/Food & Water Safety Dining Without Distress.webp" 
            alt="World Cup 2026 Food & Water Safety" 
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
                  { label: 'Food & Dining Safety', href: '/world-cup-2026-food-dining-safety' }
                ]} 
              />

              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                    Last Updated: January 4, 2026
                  </span>
                <span className="px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Health & Safety
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                World Cup 2026 Food & Dining Safety
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                Dining without distress. Your complete guide to safe eating, water potability, and staying healthy across USA, Canada, and Mexico.
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
          <div className="mb-12 p-6 rounded-2xl text-sm text-slate-500 dark:text-slate-400 flex gap-4 items-start bg-slate-100 dark:bg-slate-50 dark:bg-slate-900/50">
            <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Medical Disclaimer:</strong> This guide provides general travel advice, not medical diagnosis or treatment. Always consult a healthcare professional for vaccinations and medical concerns.
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
             <div className="pl-6 border-l-4 border-emerald-500 my-12 italic text-slate-800 dark:text-slate-200 font-medium text-xl">
               <strong>The Goal:</strong> To enjoy the diverse culinary delights of North America without missing a single match due to preventable illness.
             </div>
             <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
               Nothing ruins a World Cup trip faster than a bout of food poisoning. While hygiene standards in the USA and Canada are generally world-class, travelers' stomachs can still be sensitive to new bacteria.
             </p>
             <p className="text-lg text-slate-600 dark:text-slate-400">
               In Mexico, the risk is higher, and specific precautions regarding water and street food are essential. This guide breaks down exactly how to eat like a local while keeping your gut game-ready.
             </p>
          </div>

          <Section id="risks" title="UNDERSTANDING RISKS">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <StatCard icon={Thermometer} label="Food Poisoning" value="Medium" />
              <StatCard icon={Droplets} label="Mexico Tap Water" value="Unsafe" />
              <StatCard icon={Utensils} label="Street Food" value="Cautious" />
              <StatCard icon={Shield} label="Hygiene Standards" value="Variable" />
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The "Montezuma's Revenge" Reality</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-lg">
                Traveler's diarrhea affects up to 50% of international travelers to developing regions. In Mexico, the bacteria in water and food can be different from what your body is used to.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                Even in the USA and Canada, overindulgence in rich, spicy, or fried stadium foods combined with alcohol can cause distress. Pacing yourself is just as important as hygiene.
              </p>
            </div>

            <RedFlagBox 
              title="The Ice Cube Trap"
              items={[
                "In Mexico, ice cubes in budget establishments may be made from tap water.",
                "Always ask 'Is the ice made with purified water?' (¿Es hielo de agua purificada?)",
                "If in doubt, drink beverages without ice (sin hielo) or stick to sealed bottles/cans."
              ]}
            />
          </Section>

          <Section id="pre-trip" title="PREVENTION FIRST">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              Your defense against stomach bugs starts before you board the plane. Packing a simple medical kit can save your trip.
            </p>

            <GreenShieldBox 
              title="The 'Tummy Kit' Checklist"
              items={[
                "Anti-diarrheal medication (e.g., Imodium/Loperamide) for emergency travel days.",
                "Stomach relief tablets (e.g., Pepto-Bismol) for minor upset.",
                "Oral Rehydration Salts (ORS) or electrolyte powder packets.",
                "Hand sanitizer (alcohol-based) for use before every meal."
              ]}
            />

            <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 mb-12">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Vaccination Research</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-lg">
                Consult your doctor 4-6 weeks before travel. Depending on your origin and destination (especially Mexico), vaccines for Hepatitis A and Typhoid might be recommended.
              </p>
              <div className="flex items-center gap-4">
                <AffiliateButton 
                  href="https://wwwnc.cdc.gov/travel" 
                  text="Check CDC Travel Advice" 
                  variant="outline"
                  icon={ArrowRight}
                />
              </div>
            </div>
          </Section>

          <Section id="water-safety" title="WATER SAFETY RULES">
            <ComparisonTable 
              headers={["Country", "Tap Water Safety", "Action Required"]}
              rows={[
                ["USA", <span key="usa" className="text-emerald-600 font-bold flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Safe (99%)</span>, "Drink freely (unless local advisory)"],
                ["Canada", <span key="canada" className="text-emerald-600 font-bold flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Safe (99%)</span>, "Drink freely"],
                ["Mexico", <span key="mexico" className="text-red-600 font-bold flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Unsafe</span>, "BOTTLED WATER ONLY"],
              ]}
            />

            <RedFlagBox 
              title="Brushing Your Teeth in Mexico"
              items={[
                "Do NOT use tap water to brush your teeth in Mexico if you have a sensitive stomach.",
                "Use bottled water to rinse your toothbrush and mouth.",
                "Keep a bottle of water next to the sink as a reminder."
              ]}
            />

             <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
               <strong>Environmental Note:</strong> While bottled water is necessary in Mexico, try to buy large multi-liter jugs (garrafons) to refill a reusable bottle, reducing plastic waste.
             </p>
          </Section>

          <Section id="food-hygiene" title="FOOD HYGIENE">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12 font-light">
              Part of the World Cup experience is trying local food. You don't have to avoid street food entirely, but you must choose wisely.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white dark:bg-white/5 p-8 rounded-[2rem] border border-slate-200 dark:border-white/10">
                <h4 className="font-bold text-2xl mb-4 text-emerald-600 dark:text-emerald-400">Green Flags (Safe)</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1" />
                    <span>Food cooked fresh in front of you (piping hot).</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1" />
                    <span>Long lines of locals (high turnover = fresh food).</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1" />
                    <span>Clean workspace and staff wearing gloves/hairnets.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-white/5 p-8 rounded-[2rem] border border-slate-200 dark:border-white/10">
                <h4 className="font-bold text-2xl mb-4 text-red-600 dark:text-red-400">Red Flags (Avoid)</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                    <ShieldAlert className="w-5 h-5 text-red-500 mt-1" />
                    <span>Food sitting in lukewarm buffets or under heat lamps.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                    <ShieldAlert className="w-5 h-5 text-red-500 mt-1" />
                    <span>Raw unpeeled fruit/vegetables (risk of tap water washing).</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                    <ShieldAlert className="w-5 h-5 text-red-500 mt-1" />
                    <span>Empty restaurants during peak hours.</span>
                  </li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="illness" title="ILLNESS MANAGEMENT">
             <div className="bg-slate-50 dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">If You Get Sick</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-lg">
                Most traveler's diarrhea resolves on its own within 24-48 hours. The most dangerous side effect is dehydration.
              </p>
              <ol className="space-y-4 list-decimal list-inside text-lg text-slate-700 dark:text-slate-300">
                <li><strong>Hydrate:</strong> Sip clear fluids or electrolyte drinks constantly.</li>
                <li><strong>Rest:</strong> Skip the sightseeing for a day. Your body needs energy to fight the bug.</li>
                <li><strong>Diet:</strong> Stick to the BRAT diet (Bananas, Rice, Applesauce, Toast) until you feel better.</li>
              </ol>
            </div>

            <RedFlagBox 
              title="When to See a Doctor"
              items={[
                "You have a high fever (>102°F / 39°C).",
                "You see blood in your stool.",
                "Symptoms persist for more than 48 hours.",
                "You cannot keep fluids down and are showing signs of severe dehydration."
              ]}
            />
          </Section>

          <Section id="faq" title="FREQUENTLY ASKED QUESTIONS">
            <div className="space-y-4">
              <FAQItem 
                question="Is it safe to eat salads in Mexico?"
                answer="It is risky in street stalls or budget eateries because raw vegetables may be washed with tap water. In high-end resorts and reputable restaurants, they typically use purified water, but if you want to be 100% safe, stick to cooked vegetables."
              />
              <FAQItem 
                question="Can I bring my own food into the stadium?"
                answer="Generally, no. FIFA stadiums have strict policies prohibiting outside food and drink. You will have to purchase food inside the venue, which is hygienic but expensive."
              />
              <FAQItem 
                question="Are probiotics helpful?"
                answer="Some travelers find that taking probiotics a week before and during their trip helps digestion, but they are not a substitute for safe eating habits."
              />
              <FAQItem 
                question="What is the emergency number for an ambulance?"
                answer="In USA, Canada, and Mexico, the emergency number is 911."
              />
            </div>
          </Section>

          <div className="mt-24 p-8 rounded-[2rem] bg-gradient-to-br from-emerald-900 to-slate-900 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 mix-blend-overlay" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Stay Healthy, Enjoy the Match</h2>
              <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                Don't let a preventable illness sideline you. Follow these simple rules and focus on the football.
              </p>
              <AffiliateButton 
                href="/world-cup-2026-health-medical-preparedness"
                text="View Full Medical Guide"
                variant="primary"
              />
            </div>
          </div>

        </main>
      </div>
      
    </div>
  );
}

