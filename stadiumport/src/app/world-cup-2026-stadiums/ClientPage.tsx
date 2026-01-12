'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { motion } from "framer-motion"
import { MapPin, Calendar, Users, ArrowRight, Info, CheckCircle2, Trophy, Plane, Hotel, Ticket, Globe, Flag } from 'lucide-react';
import dynamic from 'next/dynamic';

const StadiumMap = dynamic(() => import('@/components/feature/StadiumMap').then(mod => mod.StadiumMap), {
  loading: () => <div className="w-full h-[600px] bg-slate-100 dark:bg-slate-900 animate-pulse rounded-3xl" />,
  ssr: false
});

// Stadium Data
const stadiums = [
  // USA
  { 
    name: 'Mercedes-Benz Stadium', 
    city: 'Atlanta', 
    country: 'USA', 
    flag: '🇺🇸', 
    capacity: '71,000', 
    built: '2017', 
    roof: 'Retractable',
    surface: 'Artificial Turf',
    image: '/images/stadiums/mercedes-benz-stadium-atlanta-world-cup-2026-1024.webp', 
    highlights: ['Unique camera-shutter roof', '360-degree Halo video board', 'Cheap concessions'], 
    link: '/mercedes-benz-stadium-world-cup-2026',
    region: 'East'
  },
  { 
    name: 'Gillette Stadium', 
    city: 'Boston', 
    country: 'USA', 
    flag: '🇺🇸', 
    capacity: '65,878', 
    built: '2002', 
    roof: 'Open',
    surface: 'FieldTurf',
    image: '/images/stadiums/gillette-stadium-foxborough-world-cup-2026-1024.webp', 
    highlights: ['New lighthouse renovation', 'Open corners design', 'Patriot Place entertainment'], 
    link: '/gillette-stadium-world-cup-2026',
    region: 'East'
  },
  { 
    name: 'AT&T Stadium', 
    city: 'Dallas', 
    country: 'USA', 
    flag: '🇺🇸', 
    capacity: '80,000+', 
    built: '2009', 
    roof: 'Retractable',
    surface: 'Matrix Turf',
    image: '/images/stadiums/att-stadium-arlington-texas-world-cup-2026-1024.webp', 
    highlights: ['Massive center-hung video board', 'Largest retractable roof dome', 'Capacity expandable to 100k'], 
    link: '/att-stadium-world-cup-2026',
    region: 'Central'
  },
  { 
    name: 'NRG Stadium', 
    city: 'Houston', 
    country: 'USA', 
    flag: '🇺🇸', 
    capacity: '72,220', 
    built: '2002', 
    roof: 'Retractable',
    surface: 'Artificial Turf',
    image: '/images/stadiums/nrg-stadium-houston-texas-world-cup-2026-1024.webp', 
    highlights: ['First NFL retractable roof', 'Air-conditioned comfort', 'Compact seating bowl'], 
    link: '/nrg-stadium-world-cup-2026',
    region: 'Central'
  },
  { 
    name: 'Arrowhead Stadium', 
    city: 'Kansas City', 
    country: 'USA', 
    flag: '🇺🇸', 
    capacity: '76,416', 
    built: '1972', 
    roof: 'Open',
    surface: 'Grass',
    image: '/images/stadiums/arrowhead-stadium-kansas-city-world-cup-2026-1024.webp', 
    highlights: ['Loudest stadium in the world', 'Historic bowl design', 'Tailgating culture'], 
    link: '/arrowhead-stadium-world-cup-2026',
    region: 'Central'
  },
  { 
    name: 'SoFi Stadium', 
    city: 'Los Angeles', 
    country: 'USA', 
    flag: '🇺🇸', 
    capacity: '70,240', 
    built: '2020', 
    roof: 'Fixed Roof (Open Ends)',
    surface: 'Matrix Turf',
    image: '/images/stadiums/sofi-stadium-los-angeles-world-cup-2026-1024.webp', 
    highlights: ['Most expensive stadium ever', 'Infinity Screen (4K)', 'Indoor-outdoor design'], 
    link: '/sofi-stadium-world-cup-2026',
    region: 'West'
  },
  { 
    name: 'Hard Rock Stadium', 
    city: 'Miami', 
    country: 'USA', 
    flag: '🇺🇸', 
    capacity: '64,767', 
    built: '1987 (Renovated 2016)', 
    roof: 'Canopy (Open Pitch)',
    surface: 'Grass',
    image: '/images/stadiums/hard-rock-stadium-miami-world-cup-2026-1024.webp', 
    highlights: ['European soccer atmosphere', 'Modern canopy roof', 'Premium club seating'], 
    link: '/hard-rock-stadium-world-cup-2026',
    region: 'East'
  },
  { 
    name: 'MetLife Stadium', 
    city: 'New York/NJ', 
    country: 'USA', 
    flag: '🇺🇸', 
    capacity: '82,500', 
    built: '2010', 
    roof: 'Open',
    surface: 'FieldTurf',
    image: '/images/stadiums/metlife-stadium-east-rutherford-world-cup-2026-1024.webp', 
    highlights: ['Host of the 2026 Final', 'Largest NFL stadium by capacity', '360-degree lighting'], 
    link: '/metlife-stadium-world-cup-2026',
    region: 'East'
  },
  { 
    name: 'Lincoln Financial Field', 
    city: 'Philadelphia', 
    country: 'USA', 
    flag: '🇺🇸', 
    capacity: '69,796', 
    built: '2003', 
    roof: 'Open',
    surface: 'Grass',
    image: '/images/stadiums/lincoln-financial-field-philadelphia-world-cup-2026-1024.webp', 
    highlights: ['Intimidating acoustics', 'Green energy powered', 'Views of Philly skyline'], 
    link: '/lincoln-financial-field-world-cup-2026',
    region: 'East'
  },
  { 
    name: "Levi's Stadium", 
    city: 'San Francisco', 
    country: 'USA', 
    flag: '🇺🇸', 
    capacity: '68,500', 
    built: '2014', 
    roof: 'Open',
    surface: 'Grass',
    image: '/images/stadiums/levis-stadium-santa-clara-world-cup-2026-1024.webp', 
    highlights: ['High-tech connectivity', 'Open concourses', 'Sustainable design'], 
    link: '/levis-stadium-world-cup-2026',
    region: 'West'
  },
  { 
    name: 'Lumen Field', 
    city: 'Seattle', 
    country: 'USA', 
    flag: '🇺🇸', 
    capacity: '69,000', 
    built: '2002', 
    roof: 'Partial Roof',
    surface: 'FieldTurf',
    image: '/images/stadiums/lumen-field-seattle-world-cup-2026-1024.webp', 
    highlights: ['Designed for noise', 'Downtown location', 'Iconic partial roof arches'], 
    link: '/lumen-field-world-cup-2026',
    region: 'West'
  },
  // Canada
  { 
    name: 'BMO Field', 
    city: 'Toronto', 
    country: 'Canada', 
    flag: '🇨🇦', 
    capacity: '45,736 (Expanded)', 
    built: '2007', 
    roof: 'Partial Roof',
    surface: 'Hybrid Grass',
    image: '/images/stadiums/bmo-field-toronto-world-cup-2026-1024.webp', 
    highlights: ['Specific soccer design', 'Lakeshore location', 'Temporary expansion for WC'], 
    link: '/bmo-field-world-cup-2026',
    region: 'East'
  },
  { 
    name: 'BC Place', 
    city: 'Vancouver', 
    country: 'Canada', 
    flag: '🇨🇦', 
    capacity: '54,500', 
    built: '1983 (Renovated 2011)', 
    roof: 'Retractable',
    surface: 'Polytan LigaTurf',
    image: '/images/stadiums/bc-place-vancouver-world-cup-2026-1024.webp', 
    highlights: ['Largest cable-supported roof', 'Stunning mountain views', 'Downtown location'], 
    link: '/bc-place-world-cup-2026',
    region: 'West'
  },
  // Mexico
  { 
    name: 'Estadio Azteca', 
    city: 'Mexico City', 
    country: 'Mexico', 
    flag: '🇲🇽', 
    capacity: '83,264', 
    built: '1966', 
    roof: 'Partial Roof',
    surface: 'Grass',
    image: '/images/stadiums/estadio-azteca-mexico-city-world-cup-2026-1024.webp', 
    highlights: ['Host of the 1970 & 1986 Finals', 'Iconic high-altitude venue', 'Opening match stadium'], 
    link: '/estadio-azteca-world-cup-2026',
    region: 'Central'
  },
  { 
    name: 'Estadio BBVA', 
    city: 'Monterrey', 
    country: 'Mexico', 
    flag: '🇲🇽', 
    capacity: '51,000', 
    built: '2015', 
    roof: 'Partial Roof',
    surface: 'Grass',
    image: '/images/stadiums/estadio-bbva-monterrey-world-cup-2026-1024.webp', 
    highlights: ['View of Cerro de la Silla', 'Modern "Steel Giant" design', 'Close-to-pitch seating'], 
    link: '/estadio-bbva-world-cup-2026',
    region: 'Central'
  },
  { 
    name: 'Estadio Akron', 
    city: 'Guadalajara', 
    country: 'Mexico', 
    flag: '🇲🇽', 
    capacity: '48,071', 
    built: '2010', 
    roof: 'Partial Roof',
    surface: 'Grass',
    image: '/images/stadiums/estadio-akron-guadalajara-world-cup-2026-1024.webp', 
    highlights: ['"Volcano" exterior design', 'Cloud-like roof structure', 'High-tech facilities'], 
    link: '/estadio-akron-world-cup-2026',
    region: 'Central'
  },
];

const faqs = [
  { question: "Which is the largest World Cup 2026 stadium?", answer: "Estadio Azteca in Mexico City currently has the highest official capacity at 83,264, though MetLife Stadium (82,500) and AT&T Stadium (expandable to 100,000) are close contenders for match-day capacity." },
  { question: "Which stadium will host the final?", answer: "The 2026 World Cup Final will be held at MetLife Stadium in New York/New Jersey on July 19, 2026." },
  { question: "Which stadiums have retractable roofs?", answer: "Five stadiums have retractable roofs: Mercedes-Benz Stadium (Atlanta), AT&T Stadium (Dallas), NRG Stadium (Houston), BC Place (Vancouver), and the fixed-roof SoFi Stadium (LA) which has open sides." },
  { question: "Are stadiums air-conditioned?", answer: "Yes, stadiums in hot climates like Dallas, Houston, and Atlanta are fully climate-controlled. Others like SoFi Stadium use passive cooling architecture." },
  { question: "Which stadiums have hosted World Cup matches before?", answer: "Estadio Azteca is the only venue that has hosted World Cup matches before (1970 and 1986). All other 15 stadiums are hosting men's World Cup matches for the first time." },
  { question: "What is the smallest stadium at World Cup 2026?", answer: "BMO Field in Toronto is the smallest, with a planned temporary expansion to reach the FIFA minimum requirement of around 45,000 seats." },
  { question: "Which stadiums are grass vs. artificial turf?", answer: "FIFA requires all matches to be played on natural grass. Stadiums with artificial turf (like Atlanta, Seattle, Vancouver, Gillette, MetLife, etc.) will install temporary natural grass pitches for the tournament." },
  { question: "How to get tickets for specific stadiums?", answer: "Tickets are sold through FIFA's official portal, usually starting in 2025. You will be able to apply for matches by venue or team." },
  { question: "Do stadiums offer tours?", answer: "Yes, most stadiums offer guided tours year-round. These may be suspended or modified immediately before and during the tournament for security and preparation." },
  { question: "What are the best seats in each stadium?", answer: "Generally, lower midfield sections offer the best views of the action, while club levels offer the best amenities. Upper decks in massive stadiums like AT&T or MetLife still offer great panoramic views." },
  { question: "Is there accessible seating?", answer: "Yes, all 16 venues are ADA compliant (or local equivalent) and offer dedicated accessible seating, elevators, and services for fans with disabilities." },
  { question: "Which stadium has the best atmosphere?", answer: "Arrowhead Stadium (Kansas City) and Lumen Field (Seattle) are world-renowned for their noise levels. Estadio Azteca offers a historic, passionate intensity that is unmatched." },
  { question: "Are there food options at the stadiums?", answer: "Venues will feature a mix of standard stadium fare and local culinary specialties (e.g., BBQ in Kansas City/Dallas, Tacos in Mexico, Seafood in Seattle/Boston)." },
  { question: "How early should I arrive?", answer: "For World Cup matches, security is tighter than regular league games. It is recommended to arrive 3-4 hours before kickoff to enjoy the Fan Zones and enter comfortably." },
  { question: "What is the altitude of Estadio Azteca?", answer: "Estadio Azteca sits at approx. 7,200 feet (2,200 meters) above sea level, which can affect players' stamina and ball flight." },
  { question: "Will there be fan festivals near the stadiums?", answer: "Yes, every host city will have an official FIFA Fan Festival, often located in central areas or near the stadiums, featuring large screens and entertainment." },
  { question: "How is stadium security managed?", answer: "FIFA implements rigorous security protocols at all venues. Expect multiple checkpoints, bag searches, and clear bag policies similar to other major international sporting events." },
  { question: "Can I bring my own food or water?", answer: "Generally, outside food and beverages are not permitted inside World Cup stadiums. However, exceptions are often made for medical reasons or infant supplies." },
];

const comparisonData = [
  { stadium: 'Estadio Azteca', city: 'Mexico City', capacity: '83,264', roof: 'Partial', surface: 'Grass' },
  { stadium: 'MetLife Stadium', city: 'New York/NJ', capacity: '82,500', roof: 'Open', surface: 'Turf*' },
  { stadium: 'AT&T Stadium', city: 'Dallas', capacity: '80,000+', roof: 'Retractable', surface: 'Turf*' },
  { stadium: 'Arrowhead Stadium', city: 'Kansas City', capacity: '76,416', roof: 'Open', surface: 'Grass' },
  { stadium: 'NRG Stadium', city: 'Houston', capacity: '72,220', roof: 'Retractable', surface: 'Turf*' },
  { stadium: 'Mercedes-Benz Stadium', city: 'Atlanta', capacity: '71,000', roof: 'Retractable', surface: 'Turf*' },
  { stadium: 'SoFi Stadium', city: 'Los Angeles', capacity: '70,240', roof: 'Fixed/Open', surface: 'Turf*' },
  { stadium: 'Lincoln Financial Field', city: 'Philadelphia', capacity: '69,796', roof: 'Open', surface: 'Grass' },
  { stadium: 'Lumen Field', city: 'Seattle', capacity: '69,000', roof: 'Partial', surface: 'Turf*' },
  { stadium: "Levi's Stadium", city: 'San Francisco', capacity: '68,500', roof: 'Open', surface: 'Grass' },
  { stadium: 'Gillette Stadium', city: 'Boston', capacity: '65,878', roof: 'Open', surface: 'Turf*' },
  { stadium: 'Hard Rock Stadium', city: 'Miami', capacity: '64,767', roof: 'Canopy', surface: 'Grass' },
  { stadium: 'BC Place', city: 'Vancouver', capacity: '54,500', roof: 'Retractable', surface: 'Turf*' },
  { stadium: 'Estadio BBVA', city: 'Monterrey', capacity: '51,000', roof: 'Partial', surface: 'Grass' },
  { stadium: 'Estadio Akron', city: 'Guadalajara', capacity: '48,071', roof: 'Partial', surface: 'Grass' },
  { stadium: 'BMO Field', city: 'Toronto', capacity: '45,736', roof: 'Partial', surface: 'Hybrid' },
];

const StadiumQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const questions = [
    {
      question: "What matters most to you in a stadium?",
      options: [
        { label: "Modern Luxury & Tech", value: "tech" },
        { label: "History & Atmosphere", value: "history" },
        { label: "Massive Scale & Energy", value: "scale" }
      ]
    },
    {
      question: "Which match atmosphere do you prefer?",
      options: [
        { label: "Indoor comfort (AC)", value: "indoor" },
        { label: "Classic open-air bowl", value: "open" },
        { label: "Iconic partial roof design", value: "partial" }
      ]
    },
    {
      question: "What's your priority for the day?",
      options: [
        { label: "Perfect sightlines", value: "view" },
        { label: "Deafening crowd noise", value: "noise" },
        { label: "Premium hospitality", value: "luxury" }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: string[]) => {
    if (finalAnswers.includes('tech') || finalAnswers.includes('luxury')) {
      setResult('SoFi Stadium');
    } else if (finalAnswers.includes('history') || finalAnswers.includes('partial')) {
      setResult('Estadio Azteca');
    } else if (finalAnswers.includes('scale') || finalAnswers.includes('noise')) {
      setResult('Arrowhead Stadium');
    } else {
      setResult('MetLife Stadium');
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[32px] p-10 shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:shadow-none text-center max-w-2xl mx-auto border border-slate-200 dark:border-white/10">
      <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-8 tracking-tight">
        {result ? "We found your perfect stadium!" : "Which Stadium Should You Visit?"}
      </h3>

      {!result ? (
        <div>
          <div className="mb-10">
            <div className="w-full h-1.5 rounded-full overflow-hidden bg-slate-100 dark:bg-white/5">
              <div 
                className="bg-emerald-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-slate-400 dark:text-slate-500 mt-3 text-xs font-medium uppercase tracking-widest">Question {step + 1} / {questions.length}</p>
          </div>

          <h4 className="text-2xl font-medium text-[#1D1D1F] dark:text-[#F5F5F7] mb-8">{questions[step]?.question}</h4>

          <div className="space-y-4">
            {questions[step]?.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="w-full py-5 px-8 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-emerald-500 hover:text-slate-900 dark:text-white dark:hover:bg-emerald-500 transition-all duration-300 font-semibold text-slate-600 dark:text-slate-300 text-lg shadow-sm hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-8">
          <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl shadow-sm">
            🏟️
          </div>
          <h4 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 tracking-tight">{result}</h4>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
            Based on your preferences, {result} offers the perfect match-day experience for your World Cup trip!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={resetQuiz}
              className="px-8 py-4 text-slate-700 dark:text-slate-300 font-bold rounded-2xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              Retake Quiz
            </button>
            <Link 
              href={`/${result?.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}-world-cup-2026`}
              className="px-8 py-4 bg-emerald-500 text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
            >
              Explore {result}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default function ClientPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const nonce = useMemo(() => {
    if (typeof document === "undefined") return undefined;
    return document.querySelector('meta[name="csp-nonce"]')?.getAttribute("content") ?? undefined;
  }, []);

  const filteredStadiums = stadiums;

  // Schema.org Data
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": stadiums.map((stadium, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SportsActivityLocation",
        "name": stadium.name,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": stadium.city,
          "addressCountry": stadium.country === 'USA' ? 'US' : stadium.country === 'Canada' ? 'CA' : 'MX'
        },
        "image": `https://stadiumport.com${stadium.image}`,
        "url": `https://stadiumport.com${stadium.link}`,
        "amenityFeature": stadium.capacity ? {
          "@type": "LocationFeatureSpecification",
          "name": "Capacity",
          "value": stadium.capacity
        } : undefined
      }
    }))
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://stadiumport.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "World Cup 2026 Stadiums",
        "item": "https://stadiumport.com/world-cup-2026-stadiums"
      }
    ]
  };

  return (
    <div className="min-h-screen font-sans selection:bg-emerald-500/30 bg-[#F5F5F7] dark:bg-[#0A0A0A]">
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50 dark:bg-[#0A0A0A]">
          <div className="relative z-20 max-w-7xl mx-auto w-full">
            {/* Breadcrumbs */}
            <Breadcrumb 
              items={[{ label: "Stadiums", href: "/world-cup-2026-stadiums" }]} 
              className="mb-12 justify-center"
            />

            <div className="text-center max-w-5xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex justify-center mb-8">
                  <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                    Last Updated: January 4, 2026
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-8 tracking-tighter leading-[1.1]">
                  The 16 Host Stadiums
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-200 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                  The 2026 FIFA World Cup™ expands across the USA, Canada, and Mexico. 
                  Experience the architecture, atmosphere, and history of the venues defining the next era of football.
                </p>
                
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-slate-900 dark:text-slate-300">
                  <div className="flex flex-col items-center gap-2 group cursor-default">
                    <div className="p-3 rounded-2xl border border-black/10 dark:border-white/20 group-hover:border-emerald-400/50 transition-colors bg-white/5 backdrop-blur-sm">
                      <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm font-medium uppercase tracking-widest text-slate-900 dark:text-white/90">16 Stadiums</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group cursor-default">
                    <div className="p-3 rounded-2xl border border-black/10 dark:border-white/20 group-hover:border-emerald-400/50 transition-colors bg-white/5 backdrop-blur-sm">
                      <Globe className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm font-medium uppercase tracking-widest text-slate-900 dark:text-white/90">3 Nations</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group cursor-default">
                    <div className="p-3 rounded-2xl border border-black/10 dark:border-white/20 group-hover:border-emerald-400/50 transition-colors bg-white/5 backdrop-blur-sm">
                      <Flag className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm font-medium uppercase tracking-widest text-slate-900 dark:text-white/90">48 Teams</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 group cursor-default">
                    <div className="p-3 rounded-2xl border border-black/10 dark:border-white/20 group-hover:border-emerald-400/50 transition-colors bg-white/5 backdrop-blur-sm">
                      <Trophy className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm font-medium uppercase tracking-widest text-slate-900 dark:text-white/90">104 Matches</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 16 Stadium Cards Grid */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredStadiums.map((stadium, index) => (
              <motion.div 
                key={stadium.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="group bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[24px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:shadow-none border border-slate-200 dark:border-white/10 transition-all duration-500 ease-out"
              >
                <Link href={stadium.link} className="block relative aspect-[4/3] overflow-hidden ">
                  <Image 
                    src={stadium.image} 
                    alt={`${stadium.name} - World Cup 2026 Stadium`} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 6}
                    quality={60}
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                  <div className="absolute top-4 right-4 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border border-black/5 dark:border-white/10 text-slate-900 dark:text-white">
                    {stadium.flag} {stadium.country}
                  </div>
                </Link>
                
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-1 tracking-tight">{stadium.name}</h3>
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm font-medium">
                      <MapPin className="w-3.5 h-3.5" /> {stadium.city}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {stadium.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href={stadium.link}
                    className="inline-flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors"
                  >
                    Explore Stadium Guide <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Map Placeholder Section */}
        <section className="py-24 border-y border-slate-200 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-4 tracking-tight">Interactive Stadiums Map</h2>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-light">Explore the geography of the 16 world-class venues across North America.</p>
            </div>
            
            <div className="relative w-full aspect-[16/9] bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[32px] overflow-hidden shadow-inner border border-slate-200 dark:border-white/10">
            <StadiumMap />
          </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section className="py-24 px-4 ">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-4 tracking-tight">Find Your Perfect Stadium</h2>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-light">Take our 30-second quiz to discover which World Cup venue matches your fan style.</p>
            </div>
            <StadiumQuiz />
          </div>
        </section>

        {/* Match Schedule Overview */}
        <section className="py-24 px-4 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-16 text-center tracking-tight">Key Match Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[32px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-slate-200 dark:border-white/10 transition-all duration-500">
              <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">Opening Match</h3>
              <p className="text-emerald-600 dark:text-emerald-400 font-bold mb-1 text-lg">June 11, 2026</p>
              <p className="text-slate-600 dark:text-slate-400 font-medium">Estadio Azteca</p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Mexico City, Mexico</p>
            </div>
            
            <div className="group bg-white dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[32px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-slate-200 dark:border-white/10 transition-all duration-500">
              <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">Group Stage</h3>
              <p className="text-blue-600 dark:text-blue-400 font-bold mb-1 text-lg">June 11 - June 27</p>
              <p className="text-slate-600 dark:text-slate-400 font-medium">All 16 Venues</p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">72 Matches Total</p>
            </div>

            <div className="group bg-white dark:bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[32px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-slate-200 dark:border-white/10 transition-all duration-500">
              <div className="w-14 h-14 bg-amber-50 dark:bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">World Cup Final</h3>
              <p className="text-amber-600 dark:text-amber-400 font-bold mb-1 text-lg">July 19, 2026</p>
              <p className="text-slate-600 dark:text-slate-400 font-medium">MetLife Stadium</p>
              <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">New York / New Jersey, USA</p>
            </div>
          </div>
        </section>

        {/* Tournament Info Section */}
        <section className="py-24 px-4 ">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase text-xs mb-3 block">The Biggest World Cup Ever</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-10 tracking-tight">A Historic Expansion for 2026</h2>
            <div className="space-y-8 text-xl text-slate-500 dark:text-slate-400 leading-relaxed text-left font-light">
              <p>
                The 2026 FIFA World Cup will be a tournament of architectural wonders. Not only is it the first time three nations—the United States, Canada, and Mexico—will co-host the event, but it also marks the expansion of the tournament from 32 to 48 teams. This means 16 world-class venues will be under the global spotlight, each offering a unique stage for football history.
              </p>
              <p>
                With 104 matches scheduled across 39 days, these stadiums have been selected for their state-of-the-art facilities and massive capacities. From the historic Estadio Azteca in Mexico City, which will become the first stadium to host three World Cup openers, to the multi-billion dollar SoFi Stadium in Los Angeles, every venue tells a story of innovation. These aren't just stadiums; they are the cathedrals of modern sport.
              </p>
              <p>
                The tournament venues have been clustered into regional pods to minimize travel for teams and fans during the group stages. Each stadium will undergo rigorous FIFA standardizations, including the installation of natural grass pitches in venues that typically use turf. As the tournament builds toward the grand finale at MetLife Stadium, these 16 stages will define the legacy of the 2026 World Cup.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="py-24 border-y border-slate-200 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-4 tracking-tight">Stadium Comparison Guide</h2>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-light">Compare capacity, roof types, and surfaces at a glance.</p>
            </div>
            
            <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[32px] border border-slate-200 dark:border-white/10 overflow-hidden">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className=" border-b border-slate-200 dark:border-white/10">
                    <th className="p-6 font-semibold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Stadium</th>
                    <th className="p-6 font-semibold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Host City</th>
                    <th className="p-6 font-semibold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Capacity</th>
                    <th className="p-6 font-semibold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Roof Type</th>
                    <th className="p-6 font-semibold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Playing Surface</th>
                  </tr>
                </thead>
                <tbody >
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="border-b border-slate-200 dark:border-white/10 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors last:border-0">
                      <td className="p-6 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{row.stadium}</td>
                      <td className="p-6 text-slate-600 dark:text-slate-400 font-medium">{row.city}</td>
                      <td className="p-6 text-slate-600 dark:text-slate-400 tabular-nums">{row.capacity}</td>
                      <td className="p-6 text-slate-600 dark:text-slate-400">{row.roof}</td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          row.surface === 'Grass' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                        }`}>
                          {row.surface}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-500 italic text-center">
              * Stadiums with artificial turf will install temporary natural grass pitches for the World Cup.
            </p>
          </div>
        </section>

        {/* Recommended Guides */}
        <section className="py-24 px-4 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-12 text-center tracking-tight">Essential Planning Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "How to Plan Your 2026 World Cup Trip", icon: <Plane className="w-6 h-6" />, color: "bg-blue-500" },
              { title: "World Cup 2026 Ticket Buying Guide", icon: <Ticket className="w-6 h-6" />, color: "bg-rose-500" },
              { title: "Where to Stay During World Cup 2026", icon: <Hotel className="w-6 h-6" />, color: "bg-indigo-500" },
              { title: "Travel Guide: Getting Between Host Cities", icon: <MapPin className="w-6 h-6" />, color: "bg-emerald-500" },
              { title: "Food & Culture Guide for Each Host City", icon: <Users className="w-6 h-6" />, color: "bg-amber-500" },
              { title: "Best Stadium Experiences at World Cup 2026", icon: <Trophy className="w-6 h-6" />, color: "bg-violet-500" },
            ].map((guide, i) => (
              <Link key={i} href="#" className="group flex items-center gap-5 p-6 bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[24px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] border border-slate-200 dark:border-white/10 transition-all duration-300 hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-2xl ${guide.color}/10 flex items-center justify-center ${guide.color.replace('bg-', 'text-')} shrink-0 group-hover:scale-110 transition-transform`}>
                  {guide.icon}
                </div>
                <span className="font-bold text-[#1D1D1F] dark:text-[#F5F5F7] text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight">{guide.title}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 ">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-16 text-center tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[24px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none border border-slate-200 dark:border-white/10">
                  <button 
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-8 text-left group"
                  >
                    <span className="font-bold text-[#1D1D1F] dark:text-[#F5F5F7] text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors pr-8">{faq.question}</span>
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full dark:bg-white/10 flex items-center justify-center transform transition-all duration-300 ${openFaqIndex === index ? 'rotate-180 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'text-slate-400'}`}>
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </span>
                  </button>
                  <div className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${openFaqIndex === index ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


