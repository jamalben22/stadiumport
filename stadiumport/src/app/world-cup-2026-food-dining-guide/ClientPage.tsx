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
  Bookmark, X, ChevronRight, Facebook, Twitter, Linkedin, Copy,
  Beer, ShoppingBag, Smartphone, Pizza, Flame, Coffee, CreditCard
} from 'lucide-react';



// --- Design System & Components ---

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
    const text = "Check out this World Cup 2026 Food & Dining Guide!";
    
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
          aria-label="Copy Link"
        >
          {copied ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
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
          <span className="text-emerald-500 text-lg md:text-xl font-bold uppercase tracking-widest block mb-2">Dining Guide</span>
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
    <Link href={href} target="_blank" rel="noopener noreferrer" className={`${baseClasses} ${variants[variant]}`}>
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
    { id: 'budget-tiers', label: 'Budget Tiers' },
    { id: 'money-saving', label: 'Saving Strategies' },
    { id: 'usa-cities', label: 'USA Cities' },
    { id: 'mexico-cities', label: 'Mexico Cities' },
    { id: 'canada-cities', label: 'Canada Cities' },
    { id: 'stadium-food', label: 'Stadium Food' },
    { id: 'dietary', label: 'Dietary Info' },
    { id: 'etiquette', label: 'Etiquette' },
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
            src="/images/travel-tips/World Cup 2026 Food & Dining Guide Illustration.webp" 
            alt="World Cup 2026 Food & Dining Guide" 
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
                  { label: 'Food & Dining', href: '/world-cup-2026-food-dining-guide' }
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
                World Cup 2026 Food & Dining Guide
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-slate-900 dark:text-white/90 font-light max-w-3xl leading-relaxed">
                Eating Well on Any Budget. <span className="text-slate-900 dark:text-white font-medium">From street tacos to Michelin stars.</span> Your definitive culinary guide to 16 host cities.
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
            
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-900 dark:text-white">
              <h3 className="font-bold text-xl mb-2">Book Dining Early</h3>
              <p className="text-emerald-100 text-sm mb-6">Top restaurants will book out months in advance.</p>
              <AffiliateButton href="https://www.opentable.com/" text="Reserve on OpenTable" variant="secondary" icon={Clock} />
            </div>
          </div>
        </aside>

        {/* Main Content Column */}
        <main className="flex-1 min-w-0 pb-24">
          
          {/* Disclosure */}
          <div className="mb-12 p-6 rounded-2xl text-sm text-slate-500 dark:text-slate-400 flex gap-4 items-start bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Expert Insight:</strong> This guide is based on real-world experience. We may earn a commission from partners, but our dining recommendations are unbiased.
            </p>
          </div>

          <Section id="overview" title="Introduction">
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-2xl leading-relaxed font-light text-slate-600 dark:text-slate-300">
                Between matches, you'll spend more time eating than sleeping—make every meal count. From $1 tacos in Mexico City to Michelin-starred dining in New York, here is your definitive guide to navigating the culinary landscape of 16 host cities.
              </p>
              <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-300 mt-6">
                Let's be real: for many of us, the food is 40% of the reason we travel. But when you're juggling match tickets, flights, and 16 different cities across three countries, figuring out where to eat can feel overwhelming.
              </p>
              <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-300 mt-6">
                The challenge isn't just finding good food; it's finding it without blowing your entire budget or getting stuck in a tourist trap. Whether you're craving smoky brisket in Houston, crispy tacos in Guadalajara, or just a cheap slice of pizza in New York at 2 AM, this guide covers it all. Strategic eating can save you hundreds of dollars—money better spent on another match ticket.
              </p>
            </div>
          </Section>

          <Section id="budget-tiers" title="Daily Food Budget by Tier">
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-12">
              Knowing what to expect will help you plan your cash flow. Prices vary significantly between Mexico (cheaper) and major US cities like NYC/SF (expensive). Here is a realistic breakdown.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                  {
                      title: "Ultra-Budget",
                      price: "$15-30/day",
                      colorClass: "hover:border-emerald-500",
                      textClass: "text-emerald-500",
                      items: [
                          { l: "Breakfast", v: "Grocery store ($5)" },
                          { l: "Lunch", v: "Street food/Trucks ($10-12)" },
                          { l: "Dinner", v: "Grocery prepared/Slice ($10-15)" }
                      ],
                      note: "Strategy: Cook breakfast, one hot meal, tap water only."
                  },
                  {
                      title: "Budget",
                      price: "$30-50/day",
                      colorClass: "hover:border-blue-500",
                      textClass: "text-blue-500",
                      items: [
                          { l: "Breakfast", v: "Coffee shop ($8-12)" },
                          { l: "Lunch", v: "Casual sit-down ($15-20)" },
                          { l: "Dinner", v: "Mid-range ethnic ($20-30)" }
                      ],
                      note: "Realistic for most travelers. Includes one drink."
                  },
                  {
                      title: "Mid-Range",
                      price: "$50-80/day",
                      colorClass: "hover:border-purple-500",
                      textClass: "text-purple-500",
                      items: [
                          { l: "Breakfast", v: "Nice cafe ($15-20)" },
                          { l: "Lunch", v: "Restaurant + Drink ($25-35)" },
                          { l: "Dinner", v: "Upscale casual ($35-50)" }
                      ],
                      note: "Comfortable dining, table service for all meals."
                  },
                  {
                      title: "Premium",
                      price: "$80-150+/day",
                      colorClass: "hover:border-amber-500",
                      textClass: "text-amber-500",
                      items: [
                          { l: "Breakfast", v: "Upscale brunch ($25-40)" },
                          { l: "Lunch", v: "Fine dining ($50-80)" },
                          { l: "Dinner", v: "Michelin/Steak ($100-150+)" }
                      ],
                      note: "The full culinary experience with cocktails."
                  }
              ].map((tier, i) => (
                <div key={i} className={`p-8 rounded-[2rem] bg-white dark:bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-200 dark:border-slate-800 ${tier.colorClass} transition-all duration-300 hover:shadow-2xl`}>
                    <h3 className={`text-2xl font-bold ${tier.textClass} mb-2`}>{tier.title}</h3>
                    <div className="text-3xl font-black text-slate-900 dark:text-white mb-6">{tier.price}</div>
                    <ul className="space-y-4 mb-8">
                        {tier.items.map((item, j) => (
                            <li key={j} className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-200 dark:border-slate-800 pb-2 last:border-0">
                                <span className="text-slate-500">{item.l}</span>
                                <span className="font-bold text-slate-900 dark:text-white">{item.v}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{tier.note}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
              <InternalLink href="/world-cup-2026-budget-guide" text="See Full Budget Breakdown" icon={ArrowRight} />
            </div>
          </Section>

          <Section id="money-saving" title="Money-Saving Strategies">
            <div className="space-y-8">
                {[
                    {
                        title: "Grocery Store Mastery",
                        icon: ShoppingBag,
                        text: "Buying breakfast supplies and snacks can save you $15-20 daily. That's $300 over a two-week trip. Look for major chains like Whole Foods or Kroger in the US, Loblaws in Canada, and Chedraui in Mexico.",
                        tip: "Whole Foods and high-end grocers have 'hot bars' where you can get a high-quality, healthy meal for $10-14/lb. It's often better than a $25 restaurant meal."
                    },
                    {
                        title: "Happy Hour Strategy",
                        icon: Clock,
                        text: "In the US and Canada, 'Happy Hour' is a religion. Usually 3 PM to 6 PM (and sometimes late night 9 PM to close), you can get 50% off appetizers and drinks. In cities like Seattle and NYC, a $20 burger might be $10.",
                        tip: "Best cities for this: Seattle, New York, San Francisco."
                    },
                    {
                        title: "Food Halls & Markets",
                        icon: Utensils,
                        text: "Forget the mall food court. Modern food halls offer chef-driven concepts at lower prices ($12-18) because there's no table service. It's perfect for groups because everyone gets what they want.",
                        tip: "NYC: Chelsea Market. LA: Grand Central Market. Philly: Reading Terminal Market. CDMX: Mercado Roma."
                    },
                    {
                        title: "Water Bottle Strategy",
                        icon: CheckCircle2,
                        text: "In the USA and Canada, tap water is safe and free. Restaurants will give you unlimited ice water. In Mexico, you MUST buy bottled water. Bring a reusable bottle with a filter to save $3-5 daily and reduce plastic waste.",
                        tip: null
                    },
                    {
                        title: "Lunch vs. Dinner Pricing",
                        icon: DollarSign,
                        text: "Many high-end restaurants serve the same menu at lunch for 30-50% less. If you want to try a famous steakhouse or seafood spot, go at 1 PM instead of 8 PM.",
                        tip: null
                    }
                ].map((strategy, i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-6 p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-lg transition-all duration-300">
                        <div className="shrink-0">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <strategy.icon className="w-8 h-8" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{strategy.title}</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">{strategy.text}</p>
                            {strategy.tip && (
                                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 flex gap-2">
                                    <span className="text-emerald-500 font-bold">PRO TIP:</span> {strategy.tip}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 text-center">
                 <AffiliateButton href="https://www.instacart.com/" text="Get Grocery Delivery via Instacart" variant="outline" icon={ShoppingBag} />
            </div>
          </Section>

          <Section id="usa-cities" title="USA Cities: Regional Specialties">
            <p className="mb-12 text-lg text-slate-600 dark:text-slate-300">The US is massive, and regional cuisines are distinct. Do not ask for a bagel in Dallas or BBQ in Boston.</p>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                  {
                      city: "New York / New Jersey",
                      desc: "The food capital. You can eat the world here.",
                      items: [
                          "Pizza: Grab a slice ($3-5) at Joe's Pizza or Lucali.",
                          "Bagels: Russ & Daughters or Ess-a-Bagel ($12-16).",
                          "Halal Carts: The Halal Guys (53rd & 6th).",
                          "Splurge: Peter Luger Steak House or Le Bernardin."
                      ],
                      link: "/world-cup-2026-new-york-new-jersey-guide"
                  },
                  {
                      city: "Philadelphia",
                      desc: "Sandwich city. It's hearty, messy, and delicious.",
                      items: [
                          "Cheesesteak: Dalessandro's or Jim's. Avoid Pat's/Geno's.",
                          "Reading Terminal Market: Roast pork at DiNic's.",
                          "Soft Pretzels: Everywhere. $1-2 snack."
                      ]
                  },
                  {
                      city: "Kansas City",
                      desc: "The BBQ Capital of the World. Period.",
                      items: [
                          "Burnt Ends: The holy grail. Try Joe's Kansas City Bar-B-Que or Q39.",
                          "Cost: A full platter is $18-25 but serves two."
                      ]
                  },
                  {
                      city: "Houston & Dallas",
                      desc: "Texas is about two things: Beef and Tex-Mex.",
                      items: [
                          "Brisket: Truth BBQ (Houston) or Pecan Lodge (Dallas).",
                          "Tex-Mex: Ninfa's (Houston) or Mi Cocina (Dallas).",
                          "Viet-Cajun: Unique to Houston. Crawfish & Noodles."
                      ]
                  },
                  {
                      city: "Los Angeles",
                      desc: "The best tacos outside Mexico, plus incredible Korean food.",
                      items: [
                          "Street Tacos: Leo's Tacos Truck ($2-3/taco).",
                          "Korean BBQ: Quarters or Kang Ho Dong Baekjeong.",
                          "In-N-Out Burger: The California icon ($5-6)."
                      ]
                  }
              ].map((region, i) => (
                  <div key={i} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-colors">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{region.city}</h3>
                      <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-6">{region.desc}</p>
                      <ul className="space-y-3 mb-6">
                          {region.items.map((item, j) => (
                              <li key={j} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm">
                                  <div className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full mt-2 shrink-0" />
                                  {item}
                              </li>
                          ))}
                      </ul>
                      {region.link && (
                          <InternalLink href={region.link} text="View City Guide" icon={ArrowRight} />
                      )}
                  </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <AffiliateButton href="https://www.yelp.com/" text="Find Top Rated Restaurants on Yelp" variant="primary" icon={Utensils} />
            </div>
          </Section>

          <Section id="mexico-cities" title="Mexico Cities: The Real Deal">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl mb-12 border border-amber-100 dark:border-amber-800 flex gap-4">
               <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0" />
               <div>
                 <h4 className="font-bold text-amber-800 dark:text-amber-300 text-lg">Food Safety Alert</h4>
                 <p className="text-amber-700 dark:text-amber-200 mt-1">
                   Avoid tap water and ice cubes unless you are at a high-end hotel/restaurant. Eat street food only if the stall is busy and you see the food being cooked hot.
                 </p>
               </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                  {
                      city: "Mexico City (CDMX)",
                      desc: "Arguably the best food city in the world. From $1 tacos to Top 50 World Restaurants.",
                      items: [
                          "Tacos: Tacos El Califa or Los Cocuyos.",
                          "Fine Dining: Pujol or Quintonil ($150+).",
                          "Churros: El Moro ($4-5)."
                      ]
                  },
                  {
                      city: "Guadalajara",
                      desc: "The home of Tequila and Birria.",
                      items: [
                          "Birria: Goat stew, spicy and rich. Birrieria Las 9 Esquinas.",
                          "Tortas Ahogadas: 'Drowned sandwiches' in spicy salsa."
                      ]
                  },
                  {
                      city: "Monterrey",
                      desc: "Meat lover's paradise.",
                      items: [
                          "Cabrito: Roast kid goat. El Rey del Cabrito.",
                          "Carne Asada: Grilled beef is a religion here."
                      ]
                  }
              ].map((city, i) => (
                  <div key={i} className="p-8 bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-200 dark:border-slate-800">
                      <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-3">{city.city}</h3>
                      <p className="text-sm text-slate-500 mb-6">{city.desc}</p>
                      <ul className="space-y-3">
                          {city.items.map((item, j) => (
                              <li key={j} className="text-sm text-slate-700 dark:text-slate-300 font-medium pb-2 border-b border-slate-100 dark:border-slate-200 dark:border-slate-800 last:border-0">
                                  {item}
                              </li>
                          ))}
                      </ul>
                  </div>
              ))}
            </div>
            <div className="mt-8 text-center">
                <AffiliateButton href="https://www.viator.com/Mexico-City-tours/Food-Wine-and-Nightlife/d628-g6" text="Book a CDMX Street Food Tour" variant="secondary" icon={MapPin} />
            </div>
          </Section>

          <Section id="canada-cities" title="Canada Cities">
            <div className="grid md:grid-cols-2 gap-8">
                {[
                    {
                        city: "Toronto",
                        desc: "The most multicultural city in the world.",
                        items: [
                            "Peameal Bacon Sandwich: St. Lawrence Market ($8).",
                            "Asian Food: Chinatown & Kensington Market dumplings.",
                            "Caribbean: Roti and jerk chicken are staples."
                        ],
                        link: "/world-cup-2026-toronto-guide"
                    },
                    {
                        city: "Vancouver",
                        desc: "Pacific Northwest freshness meets intense Asian influence.",
                        items: [
                            "Sushi: Incredibly fresh and cheap. Try Miku or local joints.",
                            "Japadog: Japanese-style hot dogs ($8-10).",
                            "Granville Island Market: Smoked salmon & donuts."
                        ]
                    }
                ].map((city, i) => (
                    <div key={i} className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
                        <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3">{city.city}</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">{city.desc}</p>
                        <ul className="space-y-4 mb-6">
                            {city.items.map((item, j) => (
                                <li key={j} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        {city.link && (
                            <InternalLink href={city.link} text="Toronto City Guide" icon={ArrowRight} />
                        )}
                    </div>
                ))}
            </div>
          </Section>

          <Section id="stadium-food" title="Stadium Food Strategy">
            <p className="mb-12 text-xl text-slate-600 dark:text-slate-300">
              Stadium food prices are aggressive. Expect to pay $12-15 for a beer and $10-15 for a hot dog. Here is how to survive without going broke.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50">
                 <h4 className="font-bold text-2xl mb-4 text-emerald-600">The Pre-Match Meal</h4>
                 <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">Eat a heavy meal 2-3 hours before kickoff. You'll skip the stadium markup and the halftime lines. Find a pub or taco stand near the stadium.</p>
              </div>
              <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50">
                 <h4 className="font-bold text-2xl mb-4 text-emerald-600">Stadium Policies</h4>
                 <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">Most stadiums allow you to bring a clear, empty plastic water bottle to refill inside. Some allow sealed snacks (check specific stadium guides). They are all cashless.</p>
              </div>
            </div>
            
            <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
               <h4 className="font-bold text-xl mb-6 flex items-center gap-3"><Trophy className="w-6 h-6 text-amber-500"/> Regional Stadium Specialties</h4>
               <ul className="grid md:grid-cols-2 gap-6">
                 {[
                     "Seattle (Lumen Field): Garlic Fries & Din Tai Fung",
                     "Atlanta (Mercedes-Benz): Fan-friendly pricing ($2 hot dogs!)",
                     "Toronto (BMO Field): Poutine",
                     "Mexico City (Azteca): Beer & Sopas (instant noodles)"
                 ].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 font-medium text-slate-700 dark:text-slate-300">
                         <span className="text-2xl">🏟️</span> {item}
                     </li>
                 ))}
               </ul>
            </div>
            <div className="mt-8 flex justify-center">
              <InternalLink href="/world-cup-2026-stadiums" text="View All Stadium Guides" icon={ArrowRight} />
            </div>
          </Section>

          <Section id="dietary" title="Dietary Restrictions">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-200 dark:border-slate-800 shadow-xl">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900/80 text-slate-900 dark:text-white">
                    <tr>
                      <th className="p-6 font-bold uppercase tracking-wider text-sm">Restriction</th>
                      <th className="p-6 font-bold uppercase tracking-wider text-sm">USA/Canada</th>
                      <th className="p-6 font-bold uppercase tracking-wider text-sm">Mexico</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    {[
                      { r: "Vegetarian/Vegan", us: "Excellent. Every restaurant has options. Look for 'V' or 'VG'.", mx: "Good. Corn, beans, avocados are staples. Watch for lard." },
                      { r: "Gluten-Free", us: "Widely understood. Most menus label GF options.", mx: "Excellent naturally. Corn tortillas are GF." },
                      { r: "Halal/Kosher", us: "Easy in major cities (NYC, Toronto, LA). Use Zabihah app.", mx: "More challenging. Requires specific research." },
                      { r: "Allergies", us: "Strict protocols. Servers are trained. Always mention it.", mx: "Be very careful. Carry a translated card." }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-6 font-bold text-emerald-600 dark:text-emerald-400">{row.r}</td>
                        <td className="p-6 text-slate-600 dark:text-slate-300 text-sm">{row.us}</td>
                        <td className="p-6 text-slate-600 dark:text-slate-300 text-sm">{row.mx}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
            <div className="mt-8 text-center">
                <AffiliateButton href="https://www.google.com/search?q=best+allergy+translation+app+travel" text="Download Allergy Translation App" variant="outline" icon={Smartphone} />
            </div>
          </Section>

          <Section id="etiquette" title="Cultural Dining Etiquette">
             <div className="grid md:grid-cols-3 gap-8">
               <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-xl transition-all">
                 <h3 className="font-bold text-2xl mb-6 text-emerald-600 flex items-center gap-3">🇺🇸 USA</h3>
                 <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                   <li className="flex justify-between border-b border-slate-100 pb-2"><span>Tipping</span> <span className="font-bold">18-22% (Mandatory)</span></li>
                   <li className="flex justify-between border-b border-slate-100 pb-2"><span>Service</span> <span className="font-bold">Fast & Attentive</span></li>
                   <li className="flex justify-between border-b border-slate-100 pb-2"><span>Water</span> <span className="font-bold">Free Tap Water</span></li>
                   <li className="flex justify-between border-b border-slate-100 pb-2"><span>Portions</span> <span className="font-bold">Huge (Split it)</span></li>
                 </ul>
               </div>
               <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-xl transition-all">
                 <h3 className="font-bold text-2xl mb-6 text-red-600 flex items-center gap-3">🇨🇦 Canada</h3>
                 <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                   <li className="flex justify-between border-b border-slate-100 pb-2"><span>Tipping</span> <span className="font-bold">15-18% Standard</span></li>
                   <li className="flex justify-between border-b border-slate-100 pb-2"><span>Service</span> <span className="font-bold">Friendly & Polite</span></li>
                   <li className="flex justify-between border-b border-slate-100 pb-2"><span>Bill</span> <span className="font-bold">Tax Added at End</span></li>
                   <li className="flex justify-between border-b border-slate-100 pb-2"><span>Alcohol</span> <span className="font-bold">Strict Laws</span></li>
                 </ul>
               </div>
               <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:shadow-xl transition-all">
                 <h3 className="font-bold text-2xl mb-6 text-green-600 flex items-center gap-3">🇲🇽 Mexico</h3>
                 <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                   <li className="flex justify-between border-b border-slate-100 pb-2"><span>Tipping</span> <span className="font-bold">10-15% (Propina)</span></li>
                   <li className="flex justify-between border-b border-slate-100 pb-2"><span>Service</span> <span className="font-bold">Leisurely</span></li>
                   <li className="flex justify-between border-b border-slate-100 pb-2"><span>Street Food</span> <span className="font-bold">No Tip Needed</span></li>
                   <li className="flex justify-between border-b border-slate-100 pb-2"><span>Lunch</span> <span className="font-bold">Main Meal 2-4 PM</span></li>
                 </ul>
               </div>
             </div>
             <div className="mt-8 flex justify-center">
                <InternalLink href="/world-cup-2026-budget-guide" text="Tipping Guide Details" icon={Info} />
             </div>
          </Section>

          <Section id="faq" title="Frequently Asked Questions">
            <div className="space-y-4">
              {[
                { q: "How much should I budget for food daily?", a: "For a comfortable trip, budget $50-60 USD per day. This allows for coffee, a casual lunch, and a decent dinner. In Mexico, you can do it for $30. In NYC/SF, budget $80." },
                { q: "Is street food safe in Mexico?", a: "Generally, yes. Follow the crowds. If a stand is packed with locals and the food is cooked hot in front of you (tacos, quesadillas), it's safe. Avoid pre-cut fruit or salads washed in tap water." },
                { q: "Do I need reservations?", a: "For popular sit-down restaurants in host cities during the World Cup? Absolutely. Book 1-3 months in advance via OpenTable or Resy." },
                { q: "Are US portions really that big?", a: "Yes. They are often double a European portion. It is perfectly normal to ask for a 'to-go box' or split an entrée between two people." },
                { q: "Can I bring food into the stadiums?", a: "Usually no, other than medically necessary items. Some stadiums allow small snacks in clear bags, but check the specific stadium guide closer to match day." },
                { q: "What is the tipping culture?", a: "USA: 20% standard. Canada: 15-18%. Mexico: 10-15%. In the US, tipping is not optional; it is the server's wage." }
              ].map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </Section>

          <div className="mt-20 p-12 bg-emerald-900 rounded-[3rem] text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
            <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6">Ready to Eat Your Way Through 2026?</h3>
                <p className="text-emerald-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                  Don't just eat to survive—make meals part of your World Cup story. Book your food tours and reservations early to secure your spot at the table.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <AffiliateButton href="https://www.viator.com/" text="Explore Food Tours on Viator" variant="primary" icon={Globe} />
                  <AffiliateButton href="https://www.tripadvisor.com/Restaurants" text="Find Restaurants on TripAdvisor" variant="secondary" icon={Utensils} />
                </div>
            </div>
          </div>
        </main>
      </div>
      
    </div>
  );
}



