'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { 
  Sun, CloudRain, Wind, Thermometer, Umbrella, Droplets, Mountain,
  MapPin, Info, ChevronRight, ArrowRight, ShieldAlert, CheckCircle2,
  AlertTriangle, XCircle, FileText, Globe, Zap, CloudFog,
  Twitter, Facebook, Linkedin, Copy, Check, CloudLightning
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
    const text = "Weather & Climate Safety: World Cup 2026 Survival Guide";
    
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
          <span className="text-emerald-600 dark:text-emerald-500 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">Climate Watch</span>
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
      <CheckCircle2 className="w-8 h-8"/>
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
    { id: 'heat', label: 'Heat & Humidity' },
    { id: 'altitude', label: 'Altitude Safety' },
    { id: 'storms', label: 'Storms & Rain' },
    { id: 'air', label: 'Air Quality' },
    { id: 'packing', label: 'Packing List' },
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
            src="/images/safety-guide/Weather & Climate Safety Heat, Cold & Storms.webp" 
            alt="World Cup 2026 Weather Safety" 
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
                  { label: 'Weather & Climate', href: '/world-cup-2026-weather-climate-safety' }
                ]} 
              />

              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Last Updated: January 4, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Survival Guide
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-slate-900 dark:text-white text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-emerald-500/20">
                  Critical Info
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
                World Cup 2026 Weather & Climate Safety
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                From scorching heat to high altitude. How to stay safe and comfortable in every host city.
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
              <strong>Note:</strong> Weather is unpredictable. Always check local forecasts daily. The following are historical averages and general risks for June/July.
            </p>
          </div>

          <Section id="heat" title="EXTREME HEAT & HUMIDITY">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-light">
               The number one health risk for World Cup 2026 fans isn't crime—it's the sun. Host cities like Dallas, Houston, and Miami will be punishingly hot.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
               <StatCard icon={Thermometer} label="Dallas Avg High" value="35°C / 95°F" />
               <StatCard icon={Droplets} label="Miami Humidity" value="85%+" />
               <StatCard icon={Sun} label="UV Index" value="10+ (Extreme)" />
            </div>

            <RedFlagBox 
              title="Signs of Heat Stroke"
              items={[
                "High body temperature (above 39°C / 103°F).",
                "Hot, red, dry or damp skin.",
                "Fast, strong pulse.",
                "Headache, dizziness, nausea, confusion.",
                "Losing consciousness (Call 911 immediately)."
              ]}
            />
            
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Survival Strategy</h3>
            <GreenShieldBox 
              title="How to Stay Cool"
              items={[
                "Hydrate before you feel thirsty. Drink water, not just beer.",
                "Wear loose, light-colored clothing.",
                "Seek shade during midday (11 AM - 3 PM).",
                "Use cooling towels (wet them and place on neck).",
                "Wear a hat and apply sunscreen (SPF 50+) every 2 hours."
              ]}
            />
          </Section>

          <Section id="altitude" title="ALTITUDE SAFETY">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 mb-8">
               <div className="flex items-start gap-6">
                 <Mountain className="w-12 h-12 text-emerald-500 shrink-0" />
                 <div>
                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Mexico City & Guadalajara</h3>
                   <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                     <strong>Mexico City (Estadio Azteca)</strong> sits at 2,240 meters (7,350 ft). <br/>
                     <strong>Guadalajara (Estadio Akron)</strong> is at 1,566 meters (5,100 ft).
                   </p>
                 </div>
               </div>
            </div>

            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              Altitude sickness is real. Symptoms include headache, nausea, and shortness of breath. Alcohol hits you harder at altitude—one beer equals two.
            </p>

            <ul className="space-y-4 mb-12">
               <li className="flex gap-3 items-center text-slate-700 dark:text-slate-300 text-lg font-bold">
                 <CheckCircle2 className="w-6 h-6 text-emerald-500" /> Arrive 2-3 days early to acclimatize.
               </li>
               <li className="flex gap-3 items-center text-slate-700 dark:text-slate-300 text-lg font-bold">
                 <CheckCircle2 className="w-6 h-6 text-emerald-500" /> Drink extra water (3-4 liters per day).
               </li>
               <li className="flex gap-3 items-center text-slate-700 dark:text-slate-300 text-lg font-bold">
                 <CheckCircle2 className="w-6 h-6 text-emerald-500" /> Avoid heavy meals and excessive alcohol on day 1.
               </li>
            </ul>
          </Section>

          <Section id="storms" title="STORMS & HURRICANES">
             <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-light">
               June marks the start of the Atlantic Hurricane Season. Cities like Miami, Houston, Philadelphia, New York, and Boston can be affected.
             </p>

             <ComparisonTable 
              headers={["Region", "Primary Risk", "Action"]}
              rows={[
                ["Southeast (Miami, Atlanta)", "Hurricanes / Tropical Storms", "Monitor NHC. Be ready to evacuate."],
                ["Northeast (NY, Philly, Boston)", "Severe Thunderstorms", "Seek shelter indoors. Avoid trees."],
                ["Midwest (KC, Dallas)", "Tornadoes / Hail", "Listen for sirens. Go to basement/interior room."],
                ["Pacific NW (Seattle, Vancouver)", "Rain", "Bring a poncho. Umbrellas often banned in stadiums."]
              ]}
            />
          </Section>

          <Section id="air" title="AIR QUALITY">
             <div className="flex gap-6 items-start p-8 rounded-[2rem] bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30">
               <CloudFog className="w-10 h-10 text-orange-500 shrink-0" />
               <div>
                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Wildfire Smoke Warning</h3>
                 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                   In recent years, wildfires in Western Canada and the US have caused poor air quality across the continent in summer. If the AQI (Air Quality Index) is over 150, sensitive groups should wear N95 masks outdoors.
                 </p>
               </div>
             </div>
          </Section>

          <Section id="packing" title="WEATHER PACKING LIST">
            <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                 <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Must-Haves</h3>
                 <ul className="space-y-3">
                   {["Refillable Water Bottle (Empty)", "Sunscreen (Travel size)", "Hat / Cap", "Sunglasses", "Lightweight Rain Poncho"].map((item, i) => (
                     <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-400">
                       <Check className="w-5 h-5 text-emerald-500 shrink-0" /> {item}
                     </li>
                   ))}
                 </ul>
               </div>
               <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                 <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Smart Extras</h3>
                 <ul className="space-y-3">
                   {["Cooling Towel", "Portable Fan", "Electrolyte Packets", "Light Jacket (For AC/Evenings)", "Moisture-wicking socks"].map((item, i) => (
                     <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-400">
                       <Check className="w-5 h-5 text-emerald-500 shrink-0" /> {item}
                     </li>
                   ))}
                 </ul>
               </div>
            </div>
          </Section>

          <Section id="faq" title="FREQUENTLY ASKED QUESTIONS">
            <div className="space-y-4">
              <FAQItem 
                question="Are umbrellas allowed in stadiums?"
                answer="Usually NO. Most World Cup stadiums ban umbrellas as they obstruct views and can be used as weapons. Bring a poncho instead."
              />
              <FAQItem 
                question="Are stadiums air-conditioned?"
                answer="Some are. AT&T Stadium (Dallas), NRG Stadium (Houston), Mercedes-Benz Stadium (Atlanta), and SoFi Stadium (LA) have roofs and AC. Outdoor stadiums (Miami, KC, NY/NJ) do not."
              />
              <FAQItem 
                question="What if a match is delayed by lightning?"
                answer="FIFA has a strict lightning protocol. If lightning is detected within a certain radius, the match is suspended. Fans may be asked to move to the concourse. Follow PA announcements immediately."
              />
            </div>
          </Section>

          {/* Final CTA */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-emerald-900 dark:to-slate-900 rounded-[3rem] p-12 text-center relative overflow-hidden mt-20">
            <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-10" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Don't Let Weather Ruin the Game
              </h2>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                Be prepared, stay hydrated, and enjoy the World Cup safely, rain or shine.
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

