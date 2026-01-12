'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { motion } from 'framer-motion';
import { 
  ChevronDown, 
 Clock, 
 Calendar, 
 MapPin, 
 ArrowRight, 
 Plane, 
 Train, 
 CreditCard, 
 ExternalLink
} from 'lucide-react';

function AccordionItem({ question, answer, isOpen, onClick }: { question: string, answer: React.ReactNode, isOpen: boolean, onClick: () => void }) {
 return (
 <div className="border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 last:border-0">
 <button 
 onClick={onClick} 
 className="w-full py-6 flex items-center justify-between text-left group focus:outline-none"
 >
 <span className="text-lg md:text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors pr-8 tracking-tight">
 {question}
 </span>
 <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-emerald-500 text-slate-900 dark:text-white rotate-180' : ' text-slate-500 group-hover:bg-emerald-500/10 group-hover:text-emerald-600'}`}>
 <ChevronDown className="w-4 h-4" />
 </div>
 </button>
 <div 
 className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
 >
 <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg max-w-3xl">
 {answer}
 </div>
 </div>
 </div>
 );
}

export default function GroupAClientPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState('intro');

  const AffiliateButton = ({ href, text, icon: Icon = ArrowRight, variant = 'primary' }: { href: string, text: string, icon?: any, variant?: 'primary' | 'secondary' | 'outline' }) => {
    const baseClasses = "group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden";
    const variants = {
      primary: "bg-emerald-600 text-slate-900 dark:text-white hover:bg-emerald-500 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.6)]",
      secondary: "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xl",
      outline: "border-2 border-slate-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-900 dark:text-white bg-transparent"
    };

    return (
      <Link href={href} target="_blank" className={`${baseClasses} ${variants[variant]}`}>
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

 const scrollToSection = (id: string) => {
 const element = document.getElementById(id);
 if (element) {
 const offset = 120;
 const elementPosition = element.getBoundingClientRect().top;
 const offsetPosition = elementPosition + window.pageYOffset - offset;
 window.scrollTo({
 top: offsetPosition,
 behavior: 'smooth'
 });
 }
 };

 useEffect(() => {
 const handleScroll = () => {
 const sections = ['intro', 'schedule', 'strategy', 'accommodation', 'budget', 'visas', 'insider', 'packing', 'faq'];
 const scrollPosition = window.scrollY + 300;

 for (const section of sections) {
 const element = document.getElementById(section);
 if (element && element.offsetTop <= scrollPosition) {
 setActiveSection(section);
 }
 }
 };

 window.addEventListener('scroll', handleScroll);
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0A0A0A] font-sans text-slate-900 dark:text-slate-100 selection:bg-emerald-500/30">
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-[#F5F5F7] to-[#F5F5F7] dark:from-emerald-900/20 dark:via-[#0A0A0A] dark:to-[#0A0A0A]" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F5F7] dark:from-[#0A0A0A] to-transparent" />
 
          <div className="container mx-auto max-w-7xl relative z-10">
            <Breadcrumb items={[{ label: 'Groups', href: '/world-cup-2026-groups' }, { label: 'Group A', href: '/world-cup-2026-groups/group-a' }]} />

            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6 animate-fade-up">
                <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Last Updated: January 2, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-xs font-medium tracking-widest uppercase backdrop-blur-md">
                  Group Strategy
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1] text-slate-900 dark:text-white animate-fade-up">
World Cup 2026 <br />
<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">Group A Strategy</span>
</h1>

<p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal mb-10 animate-fade-up delay-100">
The tournament's spiritual home. From the high-altitude intensity of Estadio Azteca to the modern marvels of Monterrey and Guadalajara.
</p>
 </div>
 </div>
 
 {/* Scroll Indicator */}
 <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center gap-2 cursor-pointer z-20" onClick={() => scrollToSection('schedule')}>
 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Explore</span>
 <ChevronDown className="w-5 h-5 text-emerald-500" />
 </div>
 </section>

 <div className="container mx-auto max-w-7xl px-6 pb-32">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
 
 {/* Minimalist Sticky Sidebar */}
 <aside className="hidden lg:block lg:col-span-3 relative">
 <div className="sticky top-32">
 <nav className="space-y-1 border-l border-slate-200 dark:border-slate-200 dark:border-slate-800 ml-2">
 {[
 { id: 'intro', label: 'Introduction' },
 { id: 'schedule', label: 'Match Schedule' },
 { id: 'strategy', label: 'Travel Strategy' },
 { id: 'accommodation', label: 'Accommodation' },
 { id: 'budget', label: 'Budget Breakdown' },
 { id: 'visas', label: 'Visa Requirements' },
 { id: 'insider', label: 'Insider Tips' },
 { id: 'packing', label: 'Packing Essentials' },
 { id: 'faq', label: 'FAQ' }
 ].map((item) => (
 <button
 key={item.id}
 onClick={() => scrollToSection(item.id)}
 className={`group flex items-center w-full pl-6 py-2.5 text-sm font-medium transition-all duration-300 border-l-2 -ml-[2px] ${
 activeSection === item.id 
 ? 'border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400' 
 : 'border-transparent text-slate-400 hover:text-slate-900 dark:hover:text-slate-900 dark:text-white hover:border-slate-300 dark:hover:border-slate-700'
 }`}
 >
 {item.label}
 </button>
 ))}
            </nav>
          </div>
        </aside>

 {/* Main Content */}
 <div className="lg:col-span-9 space-y-24">
 
 {/* Introduction */}
 <section id="intro" className="max-w-3xl">
 <div className="prose prose-xl dark:prose-invert max-w-none">
 <p className="text-2xl md:text-3xl leading-relaxed font-light text-slate-900 dark:text-white mb-10">
 Group A offers the highest density of football passion and the best cultural value in the tournament—if you manage the altitude.
 </p>
 <p className="text-lg leading-loose text-slate-600 dark:text-slate-300 mb-10">
 The group is split into two distinct zones: the <strong className="text-slate-900 dark:text-white">"Central Highlands"</strong> (Mexico City, Guadalajara) and the <strong className="text-slate-900 dark:text-white">"Northern Frontier"</strong> (Monterrey).
 </p>
 </div>
 
 <div className=" p-10 rounded-[2rem] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-200 dark:border-slate-800 mt-12">
 <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-6 flex items-center gap-3 tracking-tight uppercase">
 <Plane className="w-5 h-5" />
 The Group A "Aztec Route"
 </h3>
 <p className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
 Mexico City 🚄 Guadalajara ✈️ Monterrey
 </p>
 <p className="text-base text-slate-500 dark:text-slate-400">
 Use luxury executive buses between CDMX and Guadalajara. It's more comfortable than flying. Then, fly to Monterrey to avoid the long desert drive.
 </p>
 </div>
 </section>

 <section id="schedule" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">01</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Official Match Schedule</h2>
 </div>
 
 <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-12 max-w-3xl">
 Group A is spread across Mexico City, Guadalajara, Monterrey, and one Atlanta fixture. Times below are local to the match city.
 </p>
 
 <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-200 dark:border-slate-800 shadow-sm">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="border-b border-slate-100 dark:border-slate-200 dark:border-slate-800">
 <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
 <span className="inline-flex items-center gap-2">
 <Calendar className="w-4 h-4" />
 Date
 </span>
 </th>
 <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Fixture</th>
 <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">
 <span className="inline-flex items-center gap-2">
 <Clock className="w-4 h-4" />
 Kickoff
 </span>
 </th>
 <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest hidden lg:table-cell">
 <span className="inline-flex items-center gap-2">
 <MapPin className="w-4 h-4" />
 Venue
 </span>
 </th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
 <tr>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Thu, 11 Jun 2026</td>
 <td className="p-6 text-slate-700 dark:text-slate-300 text-base">Mexico vs South Africa</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">13:00</td>
 <td className="p-6 text-slate-500 hidden lg:table-cell text-sm">Mexico City Stadium (Mexico City)</td>
 </tr>
 <tr>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Thu, 11 Jun 2026</td>
 <td className="p-6 text-slate-700 dark:text-slate-300 text-base">Korea Republic vs UEFA Play-off D</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">20:00</td>
 <td className="p-6 text-slate-500 hidden lg:table-cell text-sm">Estadio Guadalajara (Guadalajara)</td>
 </tr>
 <tr>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Thu, 18 Jun 2026</td>
 <td className="p-6 text-slate-700 dark:text-slate-300 text-base">UEFA Play-off D vs South Africa</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">12:00</td>
 <td className="p-6 text-slate-500 hidden lg:table-cell text-sm">Atlanta Stadium (Atlanta)</td>
 </tr>
 <tr>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Thu, 18 Jun 2026</td>
 <td className="p-6 text-slate-700 dark:text-slate-300 text-base">Mexico vs Korea Republic</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">19:00</td>
 <td className="p-6 text-slate-500 hidden lg:table-cell text-sm">Estadio Guadalajara (Guadalajara)</td>
 </tr>
 <tr>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Wed, 24 Jun 2026</td>
 <td className="p-6 text-slate-700 dark:text-slate-300 text-base">UEFA Play-off D vs Mexico</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">19:00</td>
 <td className="p-6 text-slate-500 hidden lg:table-cell text-sm">Mexico City Stadium (Mexico City)</td>
 </tr>
 <tr>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Wed, 24 Jun 2026</td>
 <td className="p-6 text-slate-700 dark:text-slate-300 text-base">South Africa vs Korea Republic</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">19:00</td>
 <td className="p-6 text-slate-500 hidden lg:table-cell text-sm">Estadio Monterrey (Monterrey)</td>
 </tr>
 </tbody>
 </table>
 </div>
 </section>

 {/* Section 1: Multi-City Travel Strategy */}
 <section id="strategy" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">02</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Multi-City Travel Strategy</h2>
 </div>
 
 <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-12 max-w-3xl">
 Group A is uniquely served by Mexico's world-class luxury bus network, which rival's Europe's best trains, and a competitive domestic flight market.
 </p>
 
 <div className="mb-16">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">The "Central Heart" (Bus Supremacy)</h3>
 <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-3xl">
 Do not fly between Mexico City and Guadalajara. The luxury bus terminals are easier to navigate than airports and the seats are fully flat.
 </p>
 
 <div className="grid md:grid-cols-3 gap-6">
 <div className=" p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
 <Train className="w-8 h-8 text-emerald-500 mb-6" />
 <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">ETN / Primera Plus</h4>
 <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Luxury executive class. Fully reclining seats, personal screens, and snacks.</p>
 <span className="inline-block px-3 py-1 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">$40-60 USD</span>
 </div>
 <div className=" p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
 <Plane className="w-8 h-8 text-emerald-500 mb-6" />
 <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">AeroMexico</h4>
 <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Full-service carrier. Best for CDMX to Monterrey connections.</p>
 <span className="inline-block px-3 py-1 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">$80-150 USD</span>
 </div>
 <div className=" p-8 rounded-3xl border border-transparent dark:border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100 transition-opacity duration-300">
 <div className="w-8 h-8 text-slate-400 mb-6 flex items-center justify-center font-bold border-2 border-slate-300 rounded-full text-[10px]">LCC</div>
 <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">VivaAerobus</h4>
 <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Low-cost carrier. Great for budget hops if you travel light.</p>
 <span className="inline-block px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full">$30-70 USD</span>
 </div>
 </div>
 </div>

 <div className="mb-16">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">The "Northern Frontier" (Monterrey)</h3>
 <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-3xl">
 Monterrey is a long haul from the central cities. Driving takes 10+ hours through desert regions. Flying is the only viable strategy for fans.
 </p>
 
 <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-200 dark:border-slate-800 shadow-sm ">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="border-b border-slate-100 dark:border-slate-200 dark:border-slate-800">
 <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Route</th>
 <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Mode</th>
 <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Time</th>
 <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Est. Price</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
 <tr>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Mexico City (MEX) → Monterrey (MTY)</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">Flight</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">1h 40m</td>
 <td className="p-6 font-bold text-emerald-600 dark:text-emerald-400 text-base">$80 - $160</td>
 </tr>
 <tr>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Mexico City (MEX) → Guadalajara (GDL)</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">Luxury Bus</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">6h 30m</td>
 <td className="p-6 font-bold text-emerald-600 dark:text-emerald-400 text-base">$45 - $65</td>
 </tr>
 <tr>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Guadalajara (GDL) → Monterrey (MTY)</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">Flight</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">1h 25m</td>
 <td className="p-6 font-bold text-emerald-600 dark:text-emerald-400 text-base">$70 - $130</td>
 </tr>
 </tbody>
 </table>
 </div>

 {/* Affiliate Block: Flights */}
 <div className="mt-12 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
 <div>
 <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
 <Plane className="w-5 h-5 text-emerald-500" />
 Secure Your Mexico Domestic Flights
 </h4>
 <p className="text-slate-500 dark:text-slate-400 text-sm">Flight availability between major hubs will be extremely tight during the group stage.</p>
 </div>
 </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AffiliateButton 
                  href="https://skyscanner.com" 
                  text="Check Skyscanner Deals" 
                  icon={ArrowRight}
                  variant="primary"
                />
                <AffiliateButton 
                  href="https://expedia.com" 
                  text="Compare on Expedia" 
                  icon={ExternalLink}
                  variant="outline"
                />
              </div>
 <p className="text-[10px] text-slate-400 mt-4 text-center uppercase tracking-widest font-medium">We may earn a commission on bookings made through these links.</p>
 </div>
 </div>
 </section>

 {/* Section 3: Accommodation Strategy */}
 <section id="accommodation" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">03</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Accommodation Strategy</h2>
 </div>
 
 <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-loose max-w-3xl">
 CDMX is huge. Guadalajara is traditional. Monterrey is modern and spread out. Location choice is the difference between a 20-minute Uber and 2 hours in traffic.
 </p>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* CDMX */}
 <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="flex justify-between items-start mb-6">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Mexico City (CDMX)</h3>
 <span className="px-3 py-1 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Cultural Heart</span>
 </div>
 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Book 10 Months Out</p>
 <ul className="space-y-4 mb-8">
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
 <span><strong>Best Area:</strong> Roma Norte or Condesa (Walkable, safe, amazing food).</span>
 </li>
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
 <span><strong>Stadium Access:</strong> Use Uber/Didi. The Light Rail (Tren Ligero) to Azteca will be beyond capacity.</span>
 </li>
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
 <span><strong>Warning:</strong> Avoid staying near the stadium (Santa Ursula). It's far from everything else.</span>
 </li>
 </ul>
              <AffiliateButton 
                href="https://booking.com" 
                text="Search CDMX Hotels" 
                variant="outline"
              />
            </div>

            {/* Guadalajara */}
            <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Guadalajara</h3>
                <span className="px-3 py-1 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Pure Tradition</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Book 8 Months Out</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                  <span><strong>Best Area:</strong> Colonia Americana (Voted coolest neighborhood in the world).</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                  <span><strong>Budget Alt:</strong> Zapopan (Closer to Estadio Akron).</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                  <span><strong>Note:</strong> Akron is a modern stadium on the edge of the city. Plan for heavy traffic on matchdays.</span>
                </li>
              </ul>
              <AffiliateButton 
                href="https://booking.com" 
                text="Search GDL Hotels" 
                variant="outline"
              />
            </div>

 {/* Monterrey */}
 <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="flex justify-between items-start mb-6">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Monterrey</h3>
 <span className="px-3 py-1 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Modern Luxury</span>
 </div>
 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Book 6 Months Out</p>
 <ul className="space-y-4 mb-8">
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
 <span><strong>Best Area:</strong> San Pedro Garza García (The safest and most upscale area in Latin America).</span>
 </li>
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
 <span><strong>Stadium Access:</strong> Estadio BBVA is in Guadalupe. San Pedro is a 25-30 min drive.</span>
 </li>
 </ul>
 <a href="https://booking.com" className="inline-flex items-center gap-2 text-emerald-600 font-bold text-xs hover:text-emerald-700 transition-all group-hover:translate-x-2 uppercase tracking-widest">
 Search Monterrey Hotels <ArrowRight className="w-3 h-3" />
 </a>
 </div>

 {/* Safety Factor */}
 <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="flex justify-between items-start mb-6">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Safety Strategy</h3>
 <span className="px-3 py-1 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Essential</span>
 </div>
 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Non-Negotiable</p>
 <ul className="space-y-4 mb-8">
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
 <span><strong>The Rule:</strong> Stick to the recommended neighborhoods. Mexico is safe for tourists if you don't wander into unknown suburbs.</span>
 </li>
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
 <span><strong>Recommendation:</strong> Use Uber "Comfort" or "Black" for added security and better-maintained vehicles.</span>
 </li>
 </ul>
 <Link href="/world-cup-2026-safety-guide" className="inline-flex items-center gap-2 text-emerald-600 font-bold text-xs hover:text-emerald-700 transition-all group-hover:translate-x-2 uppercase tracking-widest">
   Safety Guide
   <ArrowRight className="w-4 h-4" />
 </Link>
 </div>
 </div>
 </section>

 {/* Section 4: Budget Breakdown */}
 <section id="budget" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">04</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Group A Budget Breakdown</h2>
 </div>
 
 <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-loose">
 Mexico offers incredible value compared to US/Canada. Estimates are per person for a 12-day trip covering 3 group matches.
 </p>
 
 <div className="grid md:grid-cols-3 gap-6 mb-16">
 {/* Economy */}
 <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:scale-[1.02] transition-transform duration-300">
 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Economy Strategy</div>
 <div className="text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">$2,200</div>
 <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Hostels, street tacos, Metro/Bus transit, grocery shopping, Cat 3 tickets.</p>
 </div>
 
 {/* Mid-Range */}
 <div className="p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900 dark:bg-emerald-900/10 relative overflow-hidden transform md:-translate-y-4 shadow-xl shadow-emerald-900/5">
 <div className="absolute top-0 right-0 bg-emerald-500 text-slate-900 dark:text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl uppercase tracking-widest">Recommended</div>
 <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-4">Mid-Range Strategy</div>
 <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 tracking-tighter">$4,000</div>
 <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Boutique hotels, Uber Comfort, casual dining, luxury buses, Cat 2 tickets.</p>
 </div>
 
 {/* Premium */}
 <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:scale-[1.02] transition-transform duration-300">
 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Premium Experience</div>
 <div className="text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">$7,500+</div>
 <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">5-star hotels (Polanco/San Pedro), private drivers, fine dining (Pujol), Cat 1 tickets.</p>
 </div>
 </div>

 <div className=" rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 tracking-tight">
 <CreditCard className="w-6 h-6 text-emerald-500" />
 Money-Saving Hacks for Group A
 </h3>
 <ul className="space-y-6">
 <li className="flex items-start gap-4">
 <div className="w-8 h-8 rounded-full dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs flex-shrink-0">1</div>
 <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
 <strong className="text-slate-900 dark:text-white font-bold">Eat Street Food:</strong> Mexico has a world-class street food culture. A $5 lunch at a busy taco stand is often better than a $50 restaurant meal.
 </p>
 </li>
 <li className="flex items-start gap-4">
 <div className="w-8 h-8 rounded-full dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs flex-shrink-0">2</div>
 <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
 <strong className="text-slate-900 dark:text-white font-bold">Luxury Buses:</strong> Avoid the stress of airports for CDMX-GDL. ETN buses are cheaper than flights and include meals and luxury seating.
 </p>
 </li>
 <li className="flex items-start gap-4">
 <div className="w-8 h-8 rounded-full dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs flex-shrink-0">3</div>
 <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
 <strong className="text-slate-900 dark:text-white font-bold">Didi vs Uber:</strong> Didi is often 20% cheaper than Uber in Mexico and has similar safety features. Download both to compare prices.
 </p>
 </li>
 </ul>
 
 {/* eSIM Affiliate */}
 <div className="mt-10 flex items-center gap-6 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
 <div className="w-12 h-12 rounded-xl dark:bg-slate-700 flex items-center justify-center text-2xl shadow-sm">📱</div>
 <div className="flex-1">
 <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">Stay Connected</h4>
 <p className="text-xs text-slate-500 dark:text-slate-400">Get an Airalo eSIM for instant data across Mexico.</p>
 </div>
 <a href="#" className="flex-shrink-0 text-emerald-600 font-bold text-xs hover:text-emerald-500 transition-colors uppercase tracking-widest">View Plans &rarr;</a>
 </div>
 </div>
 </section>

 {/* Section 5: Visa & Entry Requirements */}
 <section id="visas" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">05</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Visa & Entry Requirements</h2>
 </div>
 
 <div className="grid md:grid-cols-1 gap-8">
 <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
 <h3 className="flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-200 dark:border-slate-800">
 <OptimizedImage 
 src="https://flagcdn.com/mx.svg" 
 width={32} 
 height={24} 
 alt="Mexico" 
 imgClassName="w-8 h-auto object-cover rounded shadow-sm"
 />
 Entering Mexico
 </h3>
 <ul className="space-y-6">
 <li className="text-sm text-slate-600 dark:text-slate-300">
 <strong className="block text-slate-900 dark:text-white mb-1 font-bold">FMM (Tourist Card)</strong>
 Most tourists (USA, Canada, UK, EU) do not need a visa but must complete an FMM form upon arrival. Usually free if staying under 180 days.
 </li>
 <li className="text-sm text-slate-600 dark:text-slate-300">
 <strong className="block text-slate-900 dark:text-white mb-1 font-bold">Visa Waiver</strong>
 If you hold a valid USA, Canada, Japan, UK or Schengen visa, you can enter Mexico for tourism without a separate Mexican visa.
 </li>
 <li className="text-sm text-slate-600 dark:text-slate-300">
 <strong className="block text-red-600 dark:text-red-400 mb-1 font-bold">Important</strong>
 Keep your FMM (if paper-based) safe. You must present it to leave the country or pay a fine at the airport.
 </li>
 </ul>
 </div>
 </div>
 </section>

 {/* Section 6: Insider Tips */}
 <section id="insider" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">06</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Insider Knowledge</h2>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
 <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-xl mb-6">⚠️</div>
 <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">Altitude Warning</h3>
 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
 Mexico City is at 2,240m (7,350ft). You will get tired faster. Drink twice as much water as usual and avoid heavy alcohol for the first 48 hours.
 </p>
 </div>
 
 <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
 <div className="w-10 h-10 rounded-xl dark:bg-blue-500/10 flex items-center justify-center text-xl mb-6">🌮</div>
 <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">The "Salsa" Rule</h3>
 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
 If a local says a salsa is "no pica" (not spicy), it is likely still spicy for you. Green is usually milder than red, but not always. Test a drop first.
 </p>
 </div>
 
 <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
 <div className="w-10 h-10 rounded-xl dark:bg-emerald-500/10 flex items-center justify-center text-xl mb-6">🚕</div>
 <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">Uber is King</h3>
 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
 Never hail a taxi on the street in Mexico City. Use Uber or Didi. It's safer, tracked via GPS, and prevents price haggling.
 </p>
 </div>
 
 <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
 <div className="w-10 h-10 rounded-xl dark:bg-amber-500/10 flex items-center justify-center text-xl mb-6">🏟️</div>
 <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">Azteca Bag Policy</h3>
 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
 Estadio Azteca has strict bag rules. Often, no bags at all are allowed, including small purses. Check the latest FIFA regulations before heading to the match.
 </p>
 </div>
 </div>
 </section>

 {/* Section 7: Essential Gear */}
 <section id="packing" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">07</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Group A Packing Essentials</h2>
 </div>
 
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🧴</div>
 <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">High-SPF Sunscreen</h4>
 <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Altitude means the sun is much stronger.</p>
 <a href="#" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">Shop Now</a>
 </div>
 <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🧥</div>
 <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Light Jacket</h4>
 <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">CDMX gets surprisingly cool at night.</p>
 <a href="#" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">Shop Now</a>
 </div>
 <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">👟</div>
 <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Comfortable Sneakers</h4>
 <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">For the endless CDMX museums.</p>
 <a href="#" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">Shop Now</a>
 </div>
 <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🔋</div>
 <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Power Bank</h4>
 <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Ubers and Google Maps drain batteries fast.</p>
 <a href="#" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">Shop Now</a>
 </div>
 </div>
 </section>

 {/* Section 7: FAQ */}
 <section id="faq" className="scroll-mt-32">
 <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 tracking-tight">Frequently Asked Questions</h2>
 <div className="space-y-2">
 <AccordionItem 
 question="Should I rent a car for Group A?"
 answer={<><strong>Absolutely not</strong>. Traffic in Mexico City and Guadalajara is legendary. Parking is a nightmare. Use Uber/Didi or luxury buses for inter-city travel. A car is more of a liability than an asset here.</>}
 isOpen={openFaqIndex === 0}
 onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
 />
 <AccordionItem 
 question="Is it safe for solo travelers?"
 answer={<>Yes, Mexico's host cities are very accustomed to tourists. Stick to recommended neighborhoods (Roma, Condesa, Zapopan, San Pedro) and use common sense at night. Thousands of fans will be making the same journey.</>}
 isOpen={openFaqIndex === 1}
 onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
 />
 <AccordionItem 
 question="How do I handle the altitude in Mexico City?"
 answer={<>Hydration is key. Start drinking electrolytes 24 hours before arrival. Avoid heavy physical exertion on Day 1. Most people adjust within 48 hours, but you will feel "out of breath" faster than usual.</>}
 isOpen={openFaqIndex === 2}
 onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
 />
 <AccordionItem 
 question="Which stadium has the best vibe?"
 answer={<><strong>Estadio Azteca</strong> is hallowed ground—it's the only stadium to host two World Cup finals. The atmosphere there is unmatched in world football. However, <strong>Estadio BBVA</strong> in Monterrey offers stunning mountain views from the stands.</>}
 isOpen={openFaqIndex === 3}
 onClick={() => setOpenFaqIndex(openFaqIndex === 3 ? null : 3)}
 />
 </div>
 </section>

 {/* Final CTA */}
 <div className="relative overflow-hidden rounded-[3rem] text-slate-900 dark:text-white p-12 md:p-20 text-center shadow-2xl shadow-slate-900/20">
 <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-slate-900 to-slate-900"></div>
 <div className="relative z-10 max-w-3xl mx-auto">
 <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready for the Aztec Experience?</h2>
 <p className="text-slate-600 dark:text-slate-300 mb-12 text-lg leading-relaxed font-light">
            From the historic heart of CDMX to the modern peaks of Monterrey, Group A is the tournament's soul. Start planning your logistics now.
          </p>
        </div>
      </div>

 </div>
 </div>
 </div>
 </main>
 </div>
 );
}
