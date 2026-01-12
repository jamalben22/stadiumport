'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { 
  ChevronDown, ArrowRight, ShieldCheck, ShieldAlert, HeartPulse, Bus, Phone, 
  User, Users, Lock, FileText, Globe, CreditCard, Wifi, Sun, Moon, Home, 
  Utensils, AlertTriangle, CheckCircle, Info, MapPin, Smartphone, Cloud, Scale, Heart
} from 'lucide-react';

const safetyGuides = [
  // Before You Travel
  {
    title: "World Cup 2026 Scams: How to Avoid Ticket & Travel Fraud",
    teaser: "Identify the red flags before you book. Essential protection against counterfeit tickets and phishing.",
    link: "/world-cup-2026-scams-avoid-fraud",
    image: "/images/safety-guide/A_realistic_photo-style_image_showing_a_worried_football_fan_reviewing_suspiciou.webp",
    icon: ShieldAlert,
    category: "Before You Travel Safety"
  },
  {
    title: "World Cup 2026 Travel Insurance: Complete Protection Guide",
    teaser: "Why standard policies might not be enough. Coverage for tickets, medical, and trip interruption.",
    link: "/world-cup-2026-travel-insurance-guide",
    image: "/images/safety-guide/A_realistic_high-detail_photo_of_travel_insurance_essentials_for_World_Cup_2026.webp",
    icon: FileText,
    category: "Before You Travel Safety"
  },
  {
    title: "Passport & Document Security: Protecting Your Identity",
    teaser: "Essential strategies for safeguarding passports and visas. Digital backups, safe storage, and what to do if lost.",
    link: "/world-cup-2026-passport-document-security",
    image: "/images/safety-guide/Passport & Document Security Protecting Your Identity.webp",
    icon: FileText,
    category: "Before You Travel Safety"
  },
  {
    title: "Money & Financial Safety: Cash, Cards & Currencies",
    teaser: "Best payment methods for each country. Avoiding ATM skimmers, currency exchange tips, and tipping culture.",
    link: "/world-cup-2026-money-financial-safety",
    image: "/images/safety-guide/Money & Financial Safety Cash Cards & Currencies.webp",
    icon: CreditCard,
    category: "Before You Travel Safety"
  },

  // During Your Trip
  {
    title: "Stadium Safety at World Cup 2026: Security Rules & What to Expect",
    teaser: "From bag policies to prohibited items. Navigate venue security smoothly and quickly.",
    link: "/world-cup-2026-stadium-safety",
    image: "/images/safety-guide/A_realistic_high-detail_photo_of_a_modern_football_stadium_entrance_during_World_cup_2026.webp",
    icon: Lock,
    category: "During Your Trip Safety"
  },
  {
    title: "Transportation Safety: Getting Around World Cup 2026 Host Cities",
    teaser: "Safe transit options, rideshare tips, and navigating public transport systems late at night.",
    link: "/world-cup-2026-transportation-safety",
    image: "/images/safety-guide/A_realistic_high-detail_photo_depicting_safe_transportation_in_a_World_Cup_2026.webp",
    icon: Bus,
    category: "During Your Trip Safety"
  },
  {
    title: "Accommodation Security: Safe Stays",
    teaser: "Choosing safe neighborhoods and secure lodgings. Hotel safety checks and rental property red flags.",
    link: "/world-cup-2026-accommodation-security",
    image: "/images/safety-guide/Accommodation Security_Safe Stays.webp",
    icon: Home,
    category: "During Your Trip Safety"
  },
  {
    title: "Fan Zone & Crowd Safety: Enjoying the Atmosphere",
    teaser: "Staying safe in large crowds and official Fan Fests. Exit strategies, meeting points, and situational awareness.",
    link: "/world-cup-2026-fan-zones-safety",
    image: "/images/safety-guide/Fan Zone & Crowd Safety Enjoying the Atmosphere.webp",
    icon: Users,
    category: "During Your Trip Safety"
  },
  {
    title: "Nightlife & After-Hours Safety",
    teaser: "Enjoying the nightlife safely. Transport after dark, alcohol laws, and staying safe in entertainment districts.",
    link: "/world-cup-2026-nightlife-safety",
    image: "/images/safety-guide/Nightlife & After-Hours Safety.webp",
    icon: Moon,
    category: "During Your Trip Safety"
  },
  {
    title: "Food & Water Safety: Dining Without Distress",
    teaser: "Where to drink tap water (and where not to). Street food safety tips and handling dietary restrictions abroad.",
    link: "/world-cup-2026-food-dining-safety",
    image: "/images/safety-guide/Food & Water Safety Dining Without Distress.webp",
    icon: Utensils,
    category: "During Your Trip Safety"
  },

  // Emergency Preparedness
  {
    title: "World Cup 2026 Emergency Contacts & Resources Guide",
    teaser: "One list, three countries. The essential emergency numbers and embassy contacts you need offline.",
    link: "/world-cup-2026-emergency-contacts-resources",
    image: "/images/safety-guide/A_realistic_high-detail_photo_of_essential_emergency_resources_for_World_Cup_2026.webp",
    icon: Phone,
    category: "Emergency Preparedness"
  },
  {
    title: "World Cup 2026 Health & Medical Preparedness: Stay Safe & Healthy",
    teaser: "Travel insurance, vaccinations, prescriptions, and emergency contacts. Stay healthy across USA, Canada, & Mexico.",
    link: "/world-cup-2026-health-medical-preparedness",
    image: "/images/safety-guide/A_realistic_high-detail_photo_showing_a_travel_medical_essentials_layout_for_World_cup_2026.webp",
    icon: HeartPulse,
    category: "Emergency Preparedness"
  },
  {
    title: "Staying Connected: SIM Cards & Emergency Comms",
    teaser: "Reliable mobile networks and emergency communication apps. Keeping in touch with your group across borders.",
    link: "/world-cup-2026-connectivity-sim-cards-emergency-communications",
    image: "/images/safety-guide/Staying Connected SIM Cards & Emergency Comms.webp",
    icon: Smartphone,
    category: "Emergency Preparedness"
  },

  // Location-Specific Safety
  {
    title: "Border Crossing Guide: USA, Canada & Mexico",
    teaser: "Navigating land and air borders smoothly. Visa requirements, customs rules, and transit protocols between host nations.",
    link: "/world-cup-2026-border-crossing-guide",
    image: "/images/safety-guide/Border Crossing Guide USA, Canada & Mexico.webp",
    icon: MapPin,
    category: "Location-Specific Safety"
  },
  {
    title: "Local Laws & Cultural Etiquette",
    teaser: "Respecting local customs and avoiding legal trouble. Alcohol laws, smoking bans, and cultural do's and don'ts.",
    link: "/world-cup-2026-local-laws-etiquette",
    image: "/images/safety-guide/Local Laws & Cultural Etiquette.webp",
    icon: Scale,
    category: "Location-Specific Safety"
  },
  {
    title: "Weather & Climate Safety: Heat, Cold & Storms",
    teaser: "Preparing for Miami heat, Toronto rain, or Mexico City altitude. Staying safe in extreme weather conditions.",
    link: "/world-cup-2026-weather-climate-safety",
    image: "/images/safety-guide/Weather & Climate Safety Heat, Cold & Storms.webp",
    icon: Cloud,
    category: "Location-Specific Safety"
  },

  // Special Considerations
  {
    title: "Solo Travel Safety Guide: Attending World Cup 2026 Alone",
    teaser: "Confidence for the solo fan. Meeting others, staying connected, and safe accommodation choices.",
    link: "/world-cup-2026-solo-travel-safety-guide",
    image: "/images/safety-guide/A_realistic_high-detail_photo_of_a_solo_traveler_at_a_World_Cup_2026_host_city.webp",
    icon: User,
    category: "Special Considerations"
  },
  {
    title: "Family Safety Guide: Taking Kids to World Cup 2026",
    teaser: "Crowd management, lost child protocols, and family-friendly zones in every host city.",
    link: "/world-cup-2026-family-safety-guide",
    image: "/images/safety-guide/A_realistic_high-detail_photo_of_a_family_with_children_entering_or_walking_near.webp",
    icon: Users,
    category: "Special Considerations"
  }
];

const faqs = [
  {
    question: "Is World Cup 2026 safe for international travelers?",
    answer: "Yes. The US, Canada, and Mexico are prioritizing visitor safety with massive security investments. While standard travel precautions apply, the host cities are major tourist hubs with robust infrastructure designed to handle millions of visitors safely."
  },
  {
    question: "What are the safety differences between US, Canada, and Mexico?",
    answer: "Canada is generally considered very low risk. The US has specific areas to avoid in major cities but is safe for tourists. Mexico requires more vigilance regarding transport and neighborhoods; stick to official zones and recommended transit options."
  },
  {
    question: "What are the stadium security rules and prohibited items?",
    answer: "Expect airport-style security. Prohibited items typically include large bags (clear bag policies often apply), professional cameras, alcohol, and potential projectiles. Check specific stadium guides 24 hours before match day."
  },
  {
    question: "What are the emergency numbers in host countries?",
    answer: "USA and Canada use 911 for all emergencies. Mexico also uses 911. It is vital to have these numbers saved, along with your country's embassy contact information, before you arrive."
  },
  {
    question: "Is travel insurance required or recommended?",
    answer: "Highly recommended. Medical costs in the US can be astronomical. Ensure your policy covers medical evacuation, trip cancellation, and ideally, specific sports tourism coverage."
  },
  {
    question: "Is World Cup 2026 safe for families and solo travelers?",
    answer: "Absolutely. The tournament atmosphere is celebratory. For families, stick to official Fan Festivals which are family-oriented. Solo travelers should stay in well-lit, central accommodations and share their itinerary with someone back home."
  }
];

const FaqItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {question}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 dark:text-slate-300 leading-relaxed pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const QuickReference = () => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-200 dark:border-slate-800 mb-12 shadow-sm">
    <div className="flex flex-col md:flex-row gap-8 justify-between">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-emerald-600" />
          Emergency Numbers
        </h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-center">
            <span className="block font-bold text-slate-900 dark:text-white">USA</span>
            <span className="text-emerald-600 font-bold text-lg">911</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-center">
            <span className="block font-bold text-slate-900 dark:text-white">Canada</span>
            <span className="text-emerald-600 font-bold text-lg">911</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-center">
            <span className="block font-bold text-slate-900 dark:text-white">Mexico</span>
            <span className="text-emerald-600 font-bold text-lg">911</span>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          Safety Checklist
        </h3>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Save offline maps & translation apps</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Register with your embassy (STEP for US citizens)</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Purchase comprehensive travel insurance</li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />Back up passport & visa documents digitally</li>
        </ul>
      </div>
    </div>
  </div>
);

export default function SafetyGuideClientPage() {
  const categories = [
    "Before You Travel Safety",
    "During Your Trip Safety",
    "Emergency Preparedness",
    "Location-Specific Safety",
    "Special Considerations"
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <Breadcrumb 
          items={[{ label: 'Safety Guide', href: '/world-cup-2026-safety-guide' }]} 
          className="justify-center mb-12"
        />
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
              Last Updated: January 4, 2026
            </span>
            <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
              Security Briefing
            </span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
          >
            World Cup 2026 Safety Guide
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium max-w-2xl leading-relaxed mb-8"
          >
            The definitive security resource for fans. From stadium safety to emergency protocols across the USA, Canada, and Mexico.
          </motion.p>
          
          <QuickReference />
        </div>
      </section>

      {/* Authority Introduction */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-16">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Your Complete Fan Security Hub
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Navigating a World Cup across three sovereign nations requires awareness. 
              Visa regulations, local laws, and emergency protocols vary significantly between Montreal, Mexico City, and Miami.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              We have compiled this intelligence to serve as your primary safety briefing. 
              Browse our detailed guides below to prepare for every aspect of your trip.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Guides by Category */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-24 space-y-24">
        {categories.map((category, catIndex) => {
          const categoryGuides = safetyGuides.filter(guide => guide.category === category);
          
          if (categoryGuides.length === 0) return null;

          return (
            <div key={category}>
              <div className="flex items-end justify-between mb-8 border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 pb-4">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {category}
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryGuides.map((guide, index) => (
                  <motion.div
                    key={guide.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col h-full"
                  >
                    {/* Featured Image */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <Image 
                        src={guide.image} 
                        alt={guide.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute bottom-4 left-4 z-20">
                        <div className="bg-white/90 dark:bg-black/80 p-2 rounded-lg backdrop-blur-sm inline-block">
                          <guide.icon className="w-5 h-5 text-slate-900 dark:text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">
                        {guide.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow leading-relaxed text-sm">
                        {guide.teaser}
                      </p>
                      <Link 
                        href={guide.link}
                        className="inline-flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors mt-auto"
                      >
                        Read Full Guide <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* FAQ Section */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-32">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
              Safety FAQ
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Clear answers to your most important security questions.
            </p>
          </div>
          <div className="md:col-span-8">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800">
              {faqs.map((faq, index) => (
                <FaqItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals / Footer Note */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto pb-24 text-center">
        <p className="text-sm font-medium text-slate-400 dark:text-slate-600 uppercase tracking-widest">
          Designed for global fans • Built with real-world scenarios in mind
        </p>
      </section>
    </div>
  );
}


