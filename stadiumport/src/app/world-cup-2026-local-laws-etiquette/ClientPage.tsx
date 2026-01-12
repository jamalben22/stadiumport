'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { 
  Scale, Gavel, Wine, Cigarette, DollarSign, Handshake, 
  MapPin, Info, ChevronRight, ArrowRight, ShieldAlert, CheckCircle2, ShieldCheck,
  AlertTriangle, XCircle, FileText, Globe, Users, Siren, Flag,
  Twitter, Facebook, Linkedin, Copy, Check, MessageSquare
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
    const text = "Local Laws & Cultural Etiquette: World Cup 2026 Guide";
    
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
          <span className="text-emerald-600 dark:text-emerald-500 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">Know Before You Go</span>
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
    { id: 'alcohol', label: 'Alcohol & Drugs' },
    { id: 'tipping', label: 'Tipping Culture' },
    { id: 'police', label: 'Police Interaction' },
    { id: 'etiquette', label: 'Social Etiquette' },
    { id: 'stadium', label: 'Stadium Rules' },
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
            src="/images/safety-guide/Local Laws & Cultural Etiquette.webp" 
            alt="World Cup 2026 Local Laws & Etiquette" 
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
                  { label: 'Local Laws & Etiquette', href: '/world-cup-2026-local-laws-etiquette' }
                ]} 
              />

              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                    Last Updated: January 4, 2026
                  </span>
                <span className="px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Legal Guide
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
                  Must Read
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                World Cup 2026 Local Laws & Etiquette
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                Respect the rules, enjoy the culture. Essential legal advice and social norms for USA, Canada, and Mexico.
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
              <strong>Disclaimer:</strong> This guide provides general information, not legal advice. Laws can change. Always follow instructions from local authorities.
            </p>
          </div>

          <Section id="alcohol" title="ALCOHOL & DRUG LAWS">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-light">
               Three countries, three very different sets of rules. What is legal in Vancouver might get you arrested in Houston or Mexico City.
            </p>

            <ComparisonTable 
              headers={["Feature", "🇺🇸 USA", "🇨🇦 Canada", "🇲🇽 Mexico"]}
              rows={[
                ["Drinking Age", "21 (Strictly Enforced)", "18 or 19 (Province dependent)", "18"],
                ["Public Drinking", "Illegal (Open Container Laws)", "Illegal (Mostly)", "Illegal (Fines/Arrest)"],
                ["Cannabis", "State dependent (Federally Illegal)", "Legal Nationwide", "Decriminalized (Complex)"],
                ["Last Call", "2 AM (Commonly)", "2 AM - 3 AM", "3 AM - 5 AM (Varies)"]
              ]}
            />

            <div className="grid md:grid-cols-2 gap-8 mb-12">
               <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                   <Cigarette className="w-6 h-6 text-slate-400" /> Marijuana Warning
                 </h3>
                 <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                   <strong>Do NOT cross borders with cannabis.</strong> Even if you are traveling from Washington (Legal) to British Columbia (Legal), crossing the federal border with any amount is a serious crime.
                 </p>
               </div>
               <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                 <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                   <Wine className="w-6 h-6 text-purple-500" /> ID Requirements
                 </h3>
                 <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                   In the USA, you will be carded almost everywhere if you look under 40. International travelers should always carry their <strong>Passport</strong> as ID; foreign driver's licenses are often rejected at bars.
                 </p>
               </div>
            </div>
          </Section>

          <Section id="tipping" title="TIPPING CULTURE">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-light">
               For visitors from Europe, Asia, or South America, North American tipping culture can be a shock. In the US, it is not optional—it is how staff are paid.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
               <StatCard icon={DollarSign} label="USA Standard" value="20%" />
               <StatCard icon={DollarSign} label="Canada Standard" value="15-18%" />
               <StatCard icon={DollarSign} label="Mexico Standard" value="10-15%" />
            </div>

            <GreenShieldBox 
              title="When to Tip (USA & Canada)"
              items={[
                "Sit-down Restaurants: 18-22% of the pre-tax bill.",
                "Bartenders: $1-2 per drink.",
                "Uber/Lyft/Taxi: 10-15%.",
                "Hotel Porters: $1-2 per bag.",
                "Valet Parking: $2-5 upon retrieval."
              ]}
            />
            
            <p className="text-slate-600 dark:text-slate-400 italic mb-8">
              <strong>Note:</strong> Check your bill for "Gratuity Included" or "Service Charge" (common for parties of 6+). If added, you do not need to tip extra.
            </p>
          </Section>

          <Section id="police" title="POLICE INTERACTION">
            <RedFlagBox 
              title="Zero Tolerance for Bribery"
              items={[
                "USA & Canada: NEVER attempt to bribe a police officer. It is a serious felony and you will be arrested immediately.",
                "Mexico: Corruption exists, but attempting to bribe a federal officer (Guardia Nacional) is dangerous. If asked for a 'mordida' (bribe) by local police for a traffic stop, ask for a written citation to pay at the station instead."
              ]}
            />

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 mt-12">If You Are Stopped</h3>
            <ul className="space-y-4 mb-8 text-slate-600 dark:text-slate-400 text-lg">
               <li className="flex gap-3"><Check className="w-6 h-6 text-emerald-500 shrink-0" /> Stay calm and keep your hands visible (on the steering wheel if driving).</li>
               <li className="flex gap-3"><Check className="w-6 h-6 text-emerald-500 shrink-0" /> Do not exit the vehicle unless instructed.</li>
               <li className="flex gap-3"><Check className="w-6 h-6 text-emerald-500 shrink-0" /> Provide your passport and visa/entry document when asked.</li>
               <li className="flex gap-3"><Check className="w-6 h-6 text-emerald-500 shrink-0" /> You have the right to remain silent and ask for a lawyer / consular assistance.</li>
            </ul>
          </Section>

          <Section id="etiquette" title="SOCIAL ETIQUETTE">
            <div className="space-y-8">
               <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                   <Flag className="w-6 h-6 text-blue-600" /> United States
                 </h3>
                 <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                   <strong>Personal Space:</strong> Americans value personal space (arm's length). <br/>
                   <strong>Small Talk:</strong> Very common. Strangers will smile and ask "How are you?". It's polite to reply briefly.<br/>
                   <strong>Punctuality:</strong> Being on time is expected.
                 </p>
               </div>

               <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                   <Flag className="w-6 h-6 text-red-600" /> Canada
                 </h3>
                 <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                   <strong>Politeness:</strong> "Sorry" and "Please" are used constantly. Be polite in queues.<br/>
                   <strong>Queuing:</strong> Never cut in line. It is considered extremely rude.<br/>
                   <strong>Diversity:</strong> Very multicultural society; comments on race/accent can be sensitive.
                 </p>
               </div>

               <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                   <Flag className="w-6 h-6 text-green-600" /> Mexico
                 </h3>
                 <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                   <strong>Greetings:</strong> A handshake or light hug/cheek kiss (one cheek) is common.<br/>
                   <strong>Time:</strong> "Ahorita" can mean "now," "in a bit," or "never." Flexibility is key.<br/>
                   <strong>Respect:</strong> Be respectful of national symbols and avoid loud, drunken behavior in family areas.
                 </p>
               </div>
            </div>
          </Section>

          <Section id="stadium" title="STADIUM RULES">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-light">
               FIFA World Cup stadiums have stricter rules than domestic league matches.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
               <GreenShieldBox 
                  title="Allowed Behavior"
                  items={[
                    "Cheering, chanting, and singing.",
                    "Standing (in designated areas).",
                    "Bringing small flags (check size limits).",
                    "Wearing team jerseys."
                  ]}
               />
               <RedFlagBox 
                  title="Strictly Prohibited"
                  items={[
                    "Pitch invasion (Immediate arrest & deportation).",
                    "Discriminatory chants (Match can be suspended).",
                    "Pyrotechnics / Flares (Zero tolerance).",
                    "Throwing objects onto the field."
                  ]}
               />
            </div>
          </Section>

          <Section id="faq" title="FREQUENTLY ASKED QUESTIONS">
            <div className="space-y-4">
              <FAQItem 
                question="What happens if I get arrested?"
                answer="Do not resist. Ask for your consulate immediately. The US, Canada, and Mexico are obligated to notify your embassy if you request it."
              />
              <FAQItem 
                question="Can I smoke in the stadium?"
                answer="No. FIFA World Cup stadiums are smoke-free environments. This includes e-cigarettes and vapes. Smoking is often restricted to specific outdoor zones far from the gates."
              />
              <FAQItem 
                question="Is jaywalking illegal?"
                answer="Yes, in many US and Canadian cities you can be ticketed for crossing the street outside a crosswalk, though enforcement varies. It is safer to use crosswalks."
              />
              <FAQItem 
                question="Can I use my home driver's license?"
                answer="Generally yes for driving (for short visits), but an International Driving Permit (IDP) is recommended, especially if your license is not in English. For buying alcohol, use your passport."
              />
            </div>
          </Section>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-emerald-900 dark:to-slate-900 rounded-[3rem] p-12 text-center relative overflow-hidden mt-20">
            <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Travel Smart, Travel Safe
              </h2>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                Knowing the rules keeps you out of trouble and lets you focus on the beautiful game.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AffiliateButton href="/world-cup-2026-safety-guide" text="Back to Safety Hub" variant="primary" icon={ArrowRight} />
              </div>
            </div>
          </div>

        </main>
      </div>
      
    </div>
  );
}

