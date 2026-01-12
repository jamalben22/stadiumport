'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, ArrowRight, Info, CheckCircle2, Trophy, Plane, Hotel, Ticket, Globe, Flag } from 'lucide-react';

import { InteractiveMap } from '@/components/feature/InteractiveMap';


// City Data
const cities = [
 // USA
 { name: 'Atlanta', country: 'USA', flag: '🇺🇸', stadium: 'Mercedes-Benz Stadium', image: '/images/cities/atlanta-world-cup-2026-1024.webp', highlights: ['Modern retractable roof stadium', 'Civil rights history', 'Busy international airport'], link: '/world-cup-2026-atlanta-guide', region: 'East' },
 { name: 'Boston', country: 'USA', flag: '🇺🇸', stadium: 'Gillette Stadium', image: '/images/cities/boston-world-cup-2026-1024.webp', highlights: ['Historic American city', 'Passionate sports culture', 'Seafood and harbor'], link: '/world-cup-2026-boston-guide', region: 'East' },
 { name: 'Dallas', country: 'USA', flag: '🇺🇸', stadium: 'AT&T Stadium', image: '/images/cities/dallas-world-cup-2026-1024.webp', highlights: ['Massive stadium capacity', 'Central location', 'Texas BBQ'], link: '/world-cup-2026-dallas-guide', region: 'Central' },
 { name: 'Houston', country: 'USA', flag: '🇺🇸', stadium: 'NRG Stadium', image: '/images/cities/houston-world-cup-2026-1024.webp', highlights: ['Space City attractions', 'Diverse culinary scene', 'Climate-controlled stadium'], link: '/world-cup-2026-houston-guide', region: 'Central' },
 { name: 'Kansas City', country: 'USA', flag: '🇺🇸', stadium: 'Arrowhead Stadium', image: '/images/cities/kansas-city-world-cup-2026-1024.webp', highlights: ['Loudest stadium in the world', 'Famous BBQ', 'Heart of America'], link: '/world-cup-2026-kansas-city-guide', region: 'Central' },
 { name: 'Los Angeles', country: 'USA', flag: '🇺🇸', stadium: 'SoFi Stadium', image: '/images/cities/los-angeles-world-cup-2026-1024.webp', highlights: ['Entertainment capital', 'State-of-the-art stadium', 'Beaches and glamour'], link: '/world-cup-2026-los-angeles-guide', region: 'West' },
 { name: 'Miami', country: 'USA', flag: '🇺🇸', stadium: 'Hard Rock Stadium', image: '/images/cities/miami-world-cup-2026-1024.webp', highlights: ['Vibrant nightlife', 'Latin American influence', 'Art Deco district'], link: '/world-cup-2026-miami-guide', region: 'East' },
 { name: 'New York/New Jersey', country: 'USA', flag: '🇺🇸', stadium: 'MetLife Stadium', image: '/images/cities/new-york-new-jersey-world-cup-2026-1024.webp', highlights: ['Hosting the Final', 'Global cultural hub', 'Iconic skyline'], link: '/world-cup-2026-new-york-new-jersey-guide', region: 'East' },
 { name: 'Philadelphia', country: 'USA', flag: '🇺🇸', stadium: 'Lincoln Financial Field', image: '/images/cities/philadelphia-world-cup-2026-1024.webp', highlights: ['Birthplace of America', 'Passionate fans', 'Historic landmarks'], link: '/world-cup-2026-philadelphia-guide', region: 'East' },
 { name: 'San Francisco Bay Area', country: 'USA', flag: '🇺🇸', stadium: "Levi's Stadium", image: '/images/cities/san-francisco-world-cup-2026-1024.webp', highlights: ['Tech hub proximity', 'Golden Gate Bridge', 'Wine country nearby'], link: '/world-cup-2026-san-francisco-bay-area-guide', region: 'West' },
 { name: 'Seattle', country: 'USA', flag: '🇺🇸', stadium: 'Lumen Field', image: '/images/cities/seattle-world-cup-2026-1024.webp', highlights: ['Scenic waterfront', 'Coffee culture', 'Loud stadium atmosphere'], link: '/world-cup-2026-seattle-guide', region: 'West' },
 // Canada
 { name: 'Toronto', country: 'Canada', flag: '🇨🇦', stadium: 'BMO Field', image: '/images/cities/toronto-world-cup-2026-1024.webp', highlights: ['BMO Field', 'CN Tower', 'Multicultural Food'], link: '/world-cup-2026-toronto-guide', region: 'East' },
 { name: 'Vancouver', country: 'Canada', flag: '🇨🇦', stadium: 'BC Place', image: '/images/cities/vancouver-world-cup-2026-1024.webp', highlights: ['BC Place', 'Stanley Park', 'Mountains & Ocean'], link: '/world-cup-2026-vancouver-guide', region: 'West' },
 // Mexico
 { name: 'Mexico City', country: 'Mexico', flag: '🇲🇽', stadium: 'Estadio Azteca', image: '/images/cities/mexico-city-world-cup-2026-1024.webp', highlights: ['Estadio Azteca', 'Tacos', 'Aztec History'], link: '/world-cup-2026-mexico-city-guide', region: 'Central' },
 { name: 'Guadalajara', country: 'Mexico', flag: '🇲🇽', stadium: 'Estadio Akron', image: '/images/cities/guadalajara-world-cup-2026-1024.webp', highlights: ['Home of Mariachi', 'Historic architecture', 'Passionate soccer culture'], link: '/world-cup-2026-guadalajara-guide', region: 'Central' },
 { name: 'Monterrey', country: 'Mexico', flag: '🇲🇽', stadium: 'Estadio BBVA', image: '/images/cities/monterrey-world-cup-2026-1024.webp', highlights: ['Modern industrial city', 'Stunning mountain views', 'Modern stadium'], link: '/world-cup-2026-monterrey-guide', region: 'Central' },
];

const faqs = [
 { question: "When is the 2026 World Cup?", answer: "The 2026 FIFA World Cup is scheduled to take place from June 11 to July 19, 2026." },
 { question: "How many cities are hosting?", answer: "16 cities across three countries will host matches: 11 in the USA, 3 in Mexico, and 2 in Canada." },
 { question: "Which city hosts the final?", answer: "The 2026 World Cup Final will be hosted by New York/New Jersey at MetLife Stadium on July 19, 2026." },
 { question: "How to get tickets?", answer: "Tickets are expected to go on sale in 2025 via the official FIFA website. We recommend signing up for official alerts and following our ticket guide." },
 { question: "Best cities to visit for tourists?", answer: "New York, Los Angeles, Mexico City, Toronto, and Miami are top choices for general tourism, offering world-class attractions beyond football." },
 { question: "Travel between host cities tips?", answer: "Distances are vast. Plan to fly between regions (e.g., East Coast to West Coast). Within regions (like the Northeast), trains are a viable option." },
 { question: "Accommodation recommendations?", answer: "Book early! Hotels will fill up fast. Consider staying in suburbs connected by public transit if city centers are sold out." },
 { question: "Visa requirements for international visitors?", answer: "You may need separate visas for USA, Canada, and Mexico depending on your nationality. Check with each country's consulate well in advance." },
 { question: "Is it safe to travel to Mexico for the World Cup?", answer: "The host cities in Mexico are generally safe for tourists, especially in designated zones. Always follow standard travel safety advice." },
 { question: "What is the opening match location?", answer: "The opening match will be held at Estadio Azteca in Mexico City on June 11, 2026." },
 { question: "Will there be fan zones?", answer: "Yes, every host city will have official FIFA Fan Festivals with large screens, food, and entertainment." },
 { question: "How many matches will be played?", answer: "A record-breaking 104 matches will be played in total across the tournament." },
 { question: "Are stadiums air-conditioned?", answer: "Yes, many stadiums in hot climates like Dallas, Houston, and Atlanta have retractable roofs and climate control to ensure player and fan comfort." },
 { question: "What is the average ticket price?", answer: "Official pricing hasn't been released, but expect group stage tickets to start around $70-$100 USD, with prices increasing significantly for knockout rounds and the final." },
 { question: "Is public transport free during the World Cup?", answer: "Many host cities are planning to offer free or discounted public transit for ticket holders on match days to ease traffic congestion." },
 { question: "Can I travel between USA, Canada, and Mexico easily?", answer: "While flights are frequent, you will still need to clear customs and immigration for each country. Ensure your visa allows multiple entries if you plan to cross borders." },
 { question: "What currency should I use?", answer: "USA uses US Dollars (USD), Canada uses Canadian Dollars (CAD), and Mexico uses Mexican Pesos (MXN). Credit cards are widely accepted in all host cities." },
 { question: "What languages are spoken in host cities?", answer: "English is primary in the USA and English-speaking Canada. French is also spoken in Canada (though less in Toronto/Vancouver than Montreal). Spanish is primary in Mexico and widely spoken in many US host cities." },
 { question: "Are there volunteer opportunities?", answer: "Yes! FIFA will launch a volunteer program closer to the event. It's a great way to be part of the tournament behind the scenes." }
];

const comparisonData = [
 { city: 'Mexico City', capacity: '87,523', climate: 'Warm/Rainy', cost: '$$', attractions: 'Teotihuacan, Historic Center' },
 { city: 'New York/NJ', capacity: '82,500', climate: 'Hot/Humid', cost: '$$$$', attractions: 'Times Square, Statue of Liberty' },
 { city: 'Dallas', capacity: '80,000+', climate: 'Hot (AC Stadium)', cost: '$$$', attractions: 'Deep Ellum, JFK Museum' },
 { city: 'Kansas City', capacity: '76,416', climate: 'Hot', cost: '$$', attractions: 'BBQ, Jazz District' },
 { city: 'Houston', capacity: '72,220', climate: 'Hot (AC Stadium)', cost: '$$', attractions: 'Space Center, Museum District' },
 { city: 'Atlanta', capacity: '71,000', climate: 'Hot (AC Stadium)', cost: '$$$', attractions: 'Aquarium, World of Coke' },
 { city: 'Los Angeles', capacity: '70,240', climate: 'Warm/Sunny', cost: '$$$$', attractions: 'Hollywood, Santa Monica Pier' },
 { city: 'Philadelphia', capacity: '69,796', climate: 'Hot/Humid', cost: '$$$', attractions: 'Liberty Bell, Art Museum' },
 { city: 'Seattle', capacity: '69,000', climate: 'Mild', cost: '$$$', attractions: 'Space Needle, Pike Place Market' },
 { city: 'San Francisco', capacity: '68,500', climate: 'Mild/Cool', cost: '$$$$', attractions: 'Golden Gate, Alcatraz' },
 { city: 'Boston', capacity: '65,878', climate: 'Warm', cost: '$$$$', attractions: 'Freedom Trail, Fenway Park' },
 { city: 'Miami', capacity: '64,767', climate: 'Hot/Humid', cost: '$$$$', attractions: 'South Beach, Wynwood Walls' },
 { city: 'Vancouver', capacity: '54,500', climate: 'Mild', cost: '$$$', attractions: 'Stanley Park, Granville Island' },
 { city: 'Monterrey', capacity: '53,500', climate: 'Hot', cost: '$$', attractions: 'Macroplaza, Parque Fundidora' },
 { city: 'Guadalajara', capacity: '49,850', climate: 'Warm', cost: '$$', attractions: 'Catedral, Tequila Tours' },
 { city: 'Toronto', capacity: '45,736', climate: 'Warm', cost: '$$$', attractions: 'CN Tower, Distillery District' },
];

const CityQuiz = () => {
 const [step, setStep] = useState(0);
 const [answers, setAnswers] = useState<string[]>([]);
 const [result, setResult] = useState<string | null>(null);

 const questions = [
 {
 question: "What's your ideal match-day weather?",
 options: [
 { label: "Hot & Sunny", value: "hot" },
 { label: "Mild & Comfortable", value: "mild" },
 { label: "I don't care (Indoor Stadium)", value: "indoor" }
 ]
 },
 {
 question: "What do you want to do after the match?",
 options: [
 { label: "Party all night", value: "party" },
 { label: "Visit museums & history", value: "history" },
 { label: "Explore nature", value: "nature" }
 ]
 },
 {
 question: "What's your budget?",
 options: [
 { label: "Budget-friendly", value: "budget" },
 { label: "Mid-range", value: "mid" },
 { label: "Luxury all the way", value: "luxury" }
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
 // Simple logic for demo purposes
 if (finalAnswers.includes('nature') || finalAnswers.includes('mild')) {
 setResult('Vancouver');
 } else if (finalAnswers.includes('party') || finalAnswers.includes('luxury')) {
 setResult('Miami');
 } else if (finalAnswers.includes('history') || finalAnswers.includes('budget')) {
 setResult('Mexico City');
 } else {
 setResult('New York/New Jersey');
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
 {result ? "We found your perfect host city!" : "Which Host City Should You Visit?"}
 </h3>
 
 {!result ? (
 <div>
 <div className="mb-10">
 <div className="w-full h-1.5 rounded-full overflow-hidden">
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
 className="w-full py-5 px-8 rounded-2xl hover:bg-emerald-500 hover:text-slate-900 dark:text-white dark:hover:bg-emerald-500 transition-all duration-300 font-semibold text-slate-600 dark:text-slate-300 text-lg shadow-sm hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5"
 >
 {option.label}
 </button>
 ))}
 </div>
 </div>
 ) : (
 <div className="py-8">
 <div className="w-24 h-24 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl shadow-sm">
 🎉
 </div>
 <h4 className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 tracking-tight">{result}</h4>
 <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
 Based on your preferences, {result} offers the perfect mix of experiences for your World Cup trip!
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <button 
 onClick={resetQuiz}
 className="px-8 py-4 text-slate-700 dark:text-slate-300 font-bold rounded-2xl dark:hover:bg-white/10 transition-colors"
 >
 Retake Quiz
 </button>
 <Link 
              href={`/world-cup-2026-${result?.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-')}-guide`}
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

 const filteredCities = cities;

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0A0A0A] font-sans text-slate-900 dark:text-slate-100 selection:bg-emerald-500/30">
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-50 dark:bg-[#0A0A0A]">
          <div className="relative z-20 max-w-7xl mx-auto w-full">
            {/* Breadcrumb */}
            <Breadcrumb 
              items={[{ label: 'Host Cities', href: '/world-cup-2026-host-cities' }]} 
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
                  World Cup 2026<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-200">
                    Host Cities
                  </span>
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-200 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                  The 2026 FIFA World Cup™ expands across the USA, Canada, and Mexico. 
                  Experience the culture, stadiums, and atmosphere of the host cities defining the next era of football.
                </p>

                <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-slate-900 dark:text-slate-300">
                  <div className="flex flex-col items-center gap-2 group cursor-default">
                    <div className="p-3 rounded-2xl border border-black/10 dark:border-white/20 group-hover:border-emerald-400/50 transition-colors bg-white/5 backdrop-blur-sm">
                      <MapPin className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm font-medium uppercase tracking-widest text-slate-900 dark:text-white/90">16 Cities</span>
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

        {/* Cities Grid and other content */}
        {/* 16 Host City Cards Grid */}
 <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
 {filteredCities.map((city, index) => (
 <motion.div 
            key={city.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className="group bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[24px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:shadow-none border border-slate-200 dark:border-white/10 transition-all duration-500 ease-out"
          >
 <Link href={city.link} className="block relative aspect-[4/3] overflow-hidden ">
 <Image 
 src={city.image} 
 alt={`${city.name} - World Cup 2026 Host City`} 
 fill 
 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 6}
                    quality={60}
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
 <div className="absolute top-4 right-4 dark:bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border border-black/5 dark:border-white/10 text-slate-900 dark:text-white">
 {city.flag} {city.country}
 </div>
 </Link>
 
 <div className="p-8">
 <div className="mb-6">
 <h3 className="text-2xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-1 tracking-tight">{city.name}</h3>
 <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm font-medium">
 <MapPin className="w-3.5 h-3.5" /> {city.stadium}
 </div>
 </div>
 
 <ul className="space-y-3 mb-8">
 {city.highlights.map((highlight, i) => (
 <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
 {highlight}
 </li>
 ))}
 </ul>
 
 <Link 
 href={city.link}
 className="inline-flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors"
 >
 Explore City Guide <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
            <h2 className="text-4xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-4 tracking-tight">Interactive Host Cities Map</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-light">Explore the geography of the 2026 World Cup across North America.</p>
          </div>
          
          <div className="relative w-full aspect-[16/9] bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[32px] overflow-hidden shadow-inner border border-slate-200 dark:border-white/10">
            <InteractiveMap />
          </div>
        </div>
      </section>

 {/* City Quiz Section */}
 <section className="py-24 px-4 ">
 <div className="max-w-7xl mx-auto">
 <div className="text-center mb-16">
 <h2 className="text-4xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-4 tracking-tight">Find Your Perfect Host City</h2>
 <p className="text-xl text-slate-500 dark:text-slate-400 font-light">Take our 30-second quiz to discover which World Cup destination matches your travel style.</p>
 </div>
 <CityQuiz />
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
            <p className="text-slate-600 dark:text-slate-400 font-medium">All 16 Host Cities</p>
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
                    The 2026 FIFA World Cup will be a tournament of firsts. Not only is it the first time three nations—the United States, Canada, and Mexico—will co-host the event, but it also marks the expansion of the tournament from 32 to 48 teams. This means more matches, more excitement, and more opportunities for fans to witness history.
                </p>
 <p>
 With 104 matches scheduled across 39 days, this will be the longest and most extensive World Cup in history. The 16 host cities have been carefully selected to provide state-of-the-art facilities and unforgettable fan experiences. From the historic Estadio Azteca in Mexico City, which will become the first stadium to host three World Cup openers, to the modern marvel of SoFi Stadium in Los Angeles, every venue tells a story.
 </p>
 <p>
 The tournament structure has been designed to minimize travel for teams and fans during the group stages, with regions clustered to reduce flight times. As the tournament progresses, the excitement will build towards the grand finale in New York/New Jersey, where the next World Champion will be crowned.
 </p>
 </div>
 </div>
 </section>

      {/* Quick Comparison Table */}
      <section className="py-24 border-y border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1D1D1F] dark:text-[#F5F5F7] mb-4 tracking-tight">City Comparison Guide</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-light">Compare capacity, climate, and costs at a glance.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[32px] border border-slate-200 dark:border-white/10 overflow-hidden">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className=" border-b border-slate-200 dark:border-white/10">
                  <th className="p-6 font-semibold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">City</th>
                  <th className="p-6 font-semibold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Stadium Capacity</th>
                  <th className="p-6 font-semibold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Avg. Climate (June/July)</th>
                  <th className="p-6 font-semibold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Must-See Attraction</th>
                  <th className="p-6 font-semibold text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">Est. Hotel Cost</th>
                </tr>
              </thead>
              <tbody >
                {comparisonData.map((row, i) => (
                  <tr key={i} className="border-b border-slate-200 dark:border-white/10 hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors last:border-0">
                    <td className="p-6 font-bold text-[#1D1D1F] dark:text-[#F5F5F7]">{row.city}</td>
                    <td className="p-6 text-slate-600 dark:text-slate-400 font-medium tabular-nums">{row.capacity}</td>
                    <td className="p-6 text-slate-600 dark:text-slate-400">{row.climate}</td>
                    <td className="p-6 text-slate-600 dark:text-slate-400">{row.attractions}</td>
                    <td className="p-6 text-emerald-600 dark:text-emerald-400 font-bold">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

      {/* FAQs Section */}
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














