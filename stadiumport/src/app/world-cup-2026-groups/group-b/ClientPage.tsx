'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { 
 ChevronDown, 
 Clock, 
 Calendar, 
 MapPin, 
 ArrowRight, 
 Plane, 
 Train, 
 Ticket,
 Users,
 CreditCard, 
 ExternalLink,
 Car
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

export default function GroupBClientPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState('intro');

  const AffiliateButton = ({ href, text, icon: Icon = ArrowRight, variant = 'primary' }: { href: string, text: string, icon?: any, variant?: 'primary' | 'secondary' | 'outline' }) => {
    const baseClasses = "group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden";
    const variants = {
      primary: "bg-emerald-600 text-slate-900 dark:text-white hover:bg-emerald-500 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.6)]",
      secondary: "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xl",
      outline: "border-2 border-slate-200 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500 text-slate-900 dark:text-white bg-transparent"
    };

    const isExternal = href.startsWith('http');

    return (
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={`${baseClasses} ${variants[variant]}`}
      >
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
 const sections = ['intro', 'schedule', 'teams', 'strategy', 'itineraries', 'accommodation', 'tickets', 'budget', 'visas', 'insider', 'packing', 'faq'];
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
            <Breadcrumb items={[{ label: 'Groups', href: '/world-cup-2026-groups' }, { label: 'Group B', href: '/world-cup-2026-groups/group-b' }]} />

            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6 animate-fade-up">
                <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Last Updated: January 2, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Group Strategy
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1] text-slate-900 dark:text-white animate-fade-up">
World Cup 2026 <br />
<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">Group B Strategy</span>
</h1>

 <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal mb-10 animate-fade-up delay-100">
 Five cities. Two countries. One coast. From the mountains of Vancouver to the lights of Los Angeles, Group B is the tournament’s most cinematic itinerary.
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
 { id: 'teams', label: 'Teams Overview' },
 { id: 'strategy', label: 'Travel Strategy' },
 { id: 'itineraries', label: 'Sample Itineraries' },
 { id: 'accommodation', label: 'Accommodation' },
 { id: 'tickets', label: 'Tickets & Entry' },
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
 Group B offers the most breathtaking landscapes and the most tech-forward cities in the tournament—if you master the distances.
 </p>
 <p className="text-lg leading-loose text-slate-600 dark:text-slate-300 mb-10">
 The group is split into two zones: the <strong className="text-slate-900 dark:text-white">Cascadia Core</strong> (Toronto kickoff, Vancouver, Seattle) and the <strong className="text-slate-900 dark:text-white">California Gold</strong> (SF Bay Area, Los Angeles).
 </p>
 </div>
 
 <div className=" p-10 rounded-[2rem] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-200 dark:border-slate-800 mt-12">
 <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-6 flex items-center gap-3 tracking-tight uppercase">
 <Train className="w-5 h-5" />
 The Group B "Pacific Route"
 </h3>
 <p className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
 Vancouver 🚄 Seattle ✈️ San Francisco 🚗 Los Angeles
 </p>
 <p className="text-base text-slate-500 dark:text-slate-400">
 Use the Amtrak Cascades for the border crossing. It's beautiful and efficient. Then, fly to California to cover the massive West Coast gap.
 </p>
 </div>
 </section>

 <section id="schedule" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">01</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Official Match Schedule</h2>
 </div>
 
 <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-12 max-w-3xl">
 Group B stretches along the Pacific coast with one Toronto kickoff. Times below are shown in the match city’s local time.
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
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Fri, 12 Jun 2026</td>
 <td className="p-6 text-slate-700 dark:text-slate-300 text-base">Canada vs UEFA Play-off A Winner</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">15:00</td>
 <td className="p-6 text-slate-500 hidden lg:table-cell text-sm">Toronto Stadium (Toronto)</td>
 </tr>
 <tr>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Sat, 13 Jun 2026</td>
 <td className="p-6 text-slate-700 dark:text-slate-300 text-base">Qatar vs Switzerland</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">12:00</td>
 <td className="p-6 text-slate-500 hidden lg:table-cell text-sm">San Francisco Bay Area Stadium (Santa Clara)</td>
 </tr>
 <tr>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Thu, 18 Jun 2026</td>
 <td className="p-6 text-slate-700 dark:text-slate-300 text-base">Switzerland vs UEFA Play-off A Winner</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">12:00</td>
 <td className="p-6 text-slate-500 hidden lg:table-cell text-sm">Los Angeles Stadium (Inglewood)</td>
 </tr>
 <tr>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Thu, 18 Jun 2026</td>
 <td className="p-6 text-slate-700 dark:text-slate-300 text-base">Canada vs Qatar</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">15:00</td>
 <td className="p-6 text-slate-500 hidden lg:table-cell text-sm">BC Place (Vancouver)</td>
 </tr>
 <tr>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Wed, 24 Jun 2026</td>
 <td className="p-6 text-slate-700 dark:text-slate-300 text-base">Switzerland vs Canada</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">12:00</td>
 <td className="p-6 text-slate-500 hidden lg:table-cell text-sm">BC Place (Vancouver)</td>
 </tr>
 <tr>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Wed, 24 Jun 2026</td>
 <td className="p-6 text-slate-700 dark:text-slate-300 text-base">UEFA Play-off A Winner vs Qatar</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">12:00</td>
 <td className="p-6 text-slate-500 hidden lg:table-cell text-sm">Seattle Stadium (Seattle)</td>
 </tr>
 </tbody>
 </table>
 </div>

 <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="p-8 rounded-[2rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
 <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3 flex items-center gap-3"><Ticket className="w-5 h-5 text-emerald-500" /> Ticket Priority Tip</h3>
 <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
 If you want to build your trip around one base, Vancouver is the power play: two Group B matches in the same stadium. That gives you the best chance to lock hotel nights early without guessing which team advances.
 </p>
 </div>
 <div className="p-8 rounded-[2rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
 <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-3 flex items-center gap-3"><Plane className="w-5 h-5 text-emerald-500" /> Logistics Reality Check</h3>
 <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
 Toronto is a one-off opener. The rest is a coast-hugging sequence: SF Bay Area → LA → Vancouver/Seattle. Plan to fly at least once, and treat the Vancouver–Seattle leg as rail/road, not air.
 </p>
 </div>
 </div>
 </section>

 <section id="teams" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">02</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Teams To Plan Around</h2>
 </div>

 <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-12 max-w-3xl">
 Group B features Canada, Qatar, Switzerland, and a UEFA Play-off A winner (TBD). The football is only half the plan: each fanbase travels differently, and that changes hotel demand, stadium atmosphere, and where the best pre-match energy lives.
 </p>

 <div className="grid md:grid-cols-2 gap-6">
 <div className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">Canada</h3>
 <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
 The hosts get the best kind of travel advantage: familiar airports, high domestic demand, and an easy Vancouver base for two matches. Expect fast sellouts in Vancouver and a massive weekend wave into Toronto for the opener.
 </p>
 <div className="flex flex-wrap gap-3">
 <AffiliateButton href="/world-cup-2026-vancouver-guide" text="Vancouver Match-Day Guide" variant="outline" />
 <AffiliateButton href="/world-cup-2026-toronto-guide" text="Toronto Match-Day Guide" variant="outline" />
 </div>
 </div>

 <div className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">Switzerland</h3>
 <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
 A veteran tournament team with a reliable traveling support. Switzerland’s games hit the three biggest demand magnets in Group B: Santa Clara, Los Angeles, and Vancouver. That’s why booking windows matter more here than almost any other group.
 </p>
 <div className="flex flex-wrap gap-3">
 <AffiliateButton href="/world-cup-2026-san-francisco-bay-area-guide" text="SF Bay Area Guide" variant="outline" />
 <AffiliateButton href="/world-cup-2026-los-angeles-guide" text="Los Angeles Guide" variant="outline" />
 </div>
 </div>

 <div className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">Qatar</h3>
 <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
 Qatar’s travel pattern is often family-heavy and hotel-driven, which can spike demand in central areas with easy transit. If you’re chasing multiple matches, Qatar is also the “two-country” trigger: Vancouver (Canada) plus Seattle and the Bay Area (USA).
 </p>
 <div className="flex flex-wrap gap-3">
 <AffiliateButton href="/world-cup-2026-seattle-guide" text="Seattle Guide" variant="outline" />
 <AffiliateButton href="/world-cup-2026-border-crossing-guide" text="USA–Canada Border Guide" variant="secondary" />
 </div>
 </div>

 <div className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">UEFA Play-off A Winner (TBD)</h3>
 <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
 This is the volatility slot. Once the play-off is decided, expect a sudden surge in hotels near Toronto and Seattle (their two match cities). If you want to stay flexible, book refundable rooms early and re-price after the draw.
 </p>
 <div className="flex flex-wrap gap-3">
 <AffiliateButton href="https://www.fifa.com" text="Follow Official Updates" variant="secondary" icon={ExternalLink} />
 <AffiliateButton href="/world-cup-2026-accommodation-guide" text="Hotel Booking Strategy" variant="outline" />
 </div>
 </div>
 </div>
 </section>

 {/* Section 1: Multi-City Travel Strategy */}
 <section id="strategy" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">03</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Multi-City Travel Strategy</h2>
 </div>
 
 <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-12 max-w-3xl">
 Group B features the tournament's most scenic rail route (Cascadia) alongside cities where the car remains king (Los Angeles, Bay Area).
 </p>
 
 <div className="mb-16">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">The "Cascadia Core" (Rail & Road)</h3>
 <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-3xl">
 Do not fly between Vancouver and Seattle. The flight is short, but airport security and border checks take longer than the journey itself.
 </p>
 
 <div className="grid md:grid-cols-3 gap-6">
 <div className=" p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
 <Train className="w-8 h-8 text-emerald-500 mb-6" />
 <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Amtrak Cascades</h4>
 <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Scenic coastal rail. Vancouver to Seattle in 4h 30m.</p>
 <span className="inline-block px-3 py-1 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">$45-90 USD</span>
 </div>
 <div className=" p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
 <Car className="w-8 h-8 text-emerald-500 mb-6" />
 <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Rental Car</h4>
 <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Great for border flexibility. 3h drive via I-5.</p>
 <span className="inline-block px-3 py-1 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">$60-120/day</span>
 </div>
 <div className=" p-8 rounded-3xl border border-transparent dark:border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100 transition-opacity duration-300">
 <div className="w-8 h-8 text-slate-400 mb-6 flex items-center justify-center font-bold border-2 border-slate-300 rounded-full text-[10px]">BUS</div>
 <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Quick Shuttle</h4>
 <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Dedicated airport-to-city bus. Reliable border processing.</p>
 <span className="inline-block px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full">$40-60 USD</span>
 </div>
 </div>
 </div>

 <div className="mb-16">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">The "California Jump" (SF & LA)</h3>
 <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-3xl">
 The gap between Seattle and San Francisco is 800 miles. You must fly. Once in California, a car becomes your primary tool for stadium access.
 </p>
 
 <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-200 dark:border-slate-800 shadow-sm ">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="border-b border-slate-100 dark:border-slate-200 dark:border-slate-800">
 <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Route</th>
 <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Flight/Drive Time</th>
 <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Booking Window</th>
 <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Est. Price</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
 <tr>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Seattle (SEA) → San Francisco (SFO)</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">2h 10m</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">4 Months Out</td>
 <td className="p-6 font-bold text-emerald-600 dark:text-emerald-400 text-base">$140 - $280</td>
 </tr>
 <tr>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">San Francisco (SJC) → Los Angeles (LAX)</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">1h 15m</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">2 Months Out</td>
 <td className="p-6 font-bold text-emerald-600 dark:text-emerald-400 text-base">$90 - $160</td>
 </tr>
 <tr>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">San Francisco (SJC) 🚗 Los Angeles (LA)</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">5h 45m</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">N/A</td>
 <td className="p-6 font-bold text-emerald-600 dark:text-emerald-400 text-base">$50 (Gas)</td>
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
 Secure Your West Coast Flights
 </h4>
 <p className="text-slate-500 dark:text-slate-400 text-sm">West Coast hubs will see record traffic during the group stages.</p>
 </div>
 </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AffiliateButton 
                  href="https://www.skyscanner.com" 
                  text="Check Skyscanner Deals" 
                  icon={ArrowRight}
                  variant="primary"
                />
                <AffiliateButton 
                  href="https://www.expedia.com" 
                  text="Compare on Expedia" 
                  icon={ExternalLink}
                  variant="outline"
                />
              </div>
 <p className="text-[10px] text-slate-400 mt-4 text-center uppercase tracking-widest font-medium">We may earn a commission on bookings made through these links.</p>
 </div>
 </div>
 </section>

 <section id="itineraries" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">04</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Sample Itineraries</h2>
 </div>
 
 <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-12 max-w-3xl">
 These itineraries are built for real travel: minimal backtracking, airport choices that save time, and match-day pacing that keeps you functional for the next kickoff.
 </p>

 <div className="grid md:grid-cols-3 gap-6">
 <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800">
 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">7 Days</div>
 <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">Vancouver Base (2 Matches)</h3>
 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
 Fly into YVR, stay downtown (Yaletown/Gastown), and build the trip around both BC Place matches. Add a Seattle day trip by train for fan culture.
 </p>
 <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
 <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Vancouver match 1 + match 2</li>
 <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Optional Seattle day trip (Amtrak)</li>
 <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> No rental car required</li>
 </ul>
 </div>

 <div className="p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900 dark:bg-emerald-900/10 shadow-xl shadow-emerald-900/5">
 <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-4">10 Days</div>
 <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">Cascadia + Seattle Finish</h3>
 <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
 Start in Vancouver, hit BC Place, take rail/road to Seattle, then end with the Seattle fixture. This is the best “two-city, no chaos” plan.
 </p>
 <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
 <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Vancouver match + Seattle match</li>
 <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Border crossing once</li>
 <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Transit-friendly cities</li>
 </ul>
 </div>

 <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800">
 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">14 Days</div>
 <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">Full Coast (SF → LA → Vancouver)</h3>
 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
 Chase the California matches first, then jump north to Vancouver for the late group crescendo. It’s the highest-cost plan, but it’s the iconic one.
 </p>
 <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
 <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> SF Bay Area match + LA match + Vancouver match</li>
 <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Rental car recommended in California</li>
 <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Book hotels earliest</li>
 </ul>
 </div>
 </div>

 <div className="mt-10 flex flex-wrap gap-4">
 <AffiliateButton href="/world-cup-2026-itinerary-planning" text="Full Itinerary Planning Guide" variant="secondary" />
 <AffiliateButton href="/world-cup-2026-flight-booking-guide" text="Flight Booking Strategy" variant="outline" icon={Plane} />
 </div>
 </section>

 {/* Section 2: Accommodation Strategy */}
 <section id="accommodation" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">05</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Accommodation Strategy</h2>
 </div>
 
 <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-loose max-w-3xl">
 San Francisco is the price leader. Vancouver is constrained by water. Los Angeles requires hyper-local planning to avoid the 405 freeway.
 </p>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* SF/Bay Area */}
 <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="flex justify-between items-start mb-6">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">SF / Bay Area</h3>
 <span className="px-3 py-1 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Tech Premium</span>
 </div>
 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Book 12 Months Out</p>
 <ul className="space-y-4 mb-8">
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
 <span><strong>Best Area:</strong> Palo Alto or San Jose (Closest to Levi's Stadium)</span>
 </li>
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
 <span><strong>Stadium Access:</strong> VTA Light Rail (Direct to Levi's in Santa Clara)</span>
 </li>
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
 <span><strong>Warning:</strong> San Francisco proper is 45 miles north of the stadium.</span>
 </li>
 </ul>
              <AffiliateButton 
                href="https://www.booking.com" 
                text="Search Bay Area Hotels" 
                variant="outline"
              />
            </div>

            {/* Vancouver */}
            <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Vancouver</h3>
                <span className="px-3 py-1 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Limited Inventory</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Book 9 Months Out</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                  <span><strong>Best Area:</strong> Yaletown / Gastown (Walk to BC Place)</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                  <span><strong>Budget Alt:</strong> Richmond (SkyTrain access to downtown)</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                  <span><strong>Note:</strong> Downtown is extremely walkable. No car needed for match days.</span>
                </li>
              </ul>
              <AffiliateButton 
                href="https://www.booking.com" 
                text="Search Vancouver Hotels" 
                variant="outline"
              />
            </div>

 {/* Los Angeles */}
 <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="flex justify-between items-start mb-6">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Los Angeles</h3>
 <span className="px-3 py-1 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Freeway Logic</span>
 </div>
 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Book 7 Months Out</p>
 <ul className="space-y-4 mb-8">
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
 <span><strong>Best Area:</strong> Inglewood or Culver City (Near SoFi Stadium)</span>
 </li>
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
 <span><strong>Stadium Access:</strong> K Line Light Rail (Metro) or Shuttle from LAX.</span>
 </li>
 </ul>
 <AffiliateButton href="https://www.booking.com" text="Search LA Hotels" variant="outline" />
 </div>

 {/* Seattle */}
 <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="flex justify-between items-start mb-6">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Seattle</h3>
 <span className="px-3 py-1 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Compact Center</span>
 </div>
 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Vibrant Atmosphere</p>
 <ul className="space-y-4 mb-8">
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
 <span><strong>Best Area:</strong> Pioneer Square or SODO (Walking distance to Lumen Field)</span>
 </li>
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
 <span><strong>Tip:</strong> Link Light Rail connects the airport directly to the stadium area.</span>
 </li>
 </ul>
 <AffiliateButton href="https://www.booking.com" text="Search Seattle Hotels" variant="outline" />
 </div>
 </div>
 </section>

 <section id="tickets" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">06</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Tickets & Stadium Entry</h2>
 </div>

 <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-12 max-w-3xl">
 Treat tickets like travel documents. For Group B, a single wrong assumption (like “I’ll just find something later”) can force you into overpriced hotels, awkward commute bases, or same-day flights.
 </p>

 <div className="grid md:grid-cols-2 gap-8 mb-12">
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h3 className="font-bold text-2xl mb-4 flex items-center gap-3"><Ticket className="w-6 h-6 text-emerald-500" /> Official Tickets</h3>
 <p className="text-slate-600 dark:text-slate-400 mb-8">
 Use FIFA’s official portal for sales phases and match-day ticketing rules. Create your account early so you’re ready when queues open.
 </p>
 <AffiliateButton href="https://www.fifa.com/tickets" text="FIFA Ticket Portal" variant="secondary" icon={ExternalLink} />
 </div>
 <div className="p-8 border border-slate-200 dark:border-slate-200 dark:border-slate-800 rounded-[2rem]">
 <h3 className="font-bold text-2xl mb-4">Verified Secondary Options</h3>
 <p className="text-slate-600 dark:text-slate-400 mb-8">
 If you miss a sales phase, only use platforms with buyer protection and transparent refunds. Avoid social media “PDF tickets” and last-minute meetups.
 </p>
 <AffiliateButton href="https://www.stubhub.com/fifa-world-cup-tickets/" text="Check StubHub Inventory" variant="primary" />
 </div>
 </div>

 <div className="rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
 <Users className="w-6 h-6 text-emerald-500" />
 Match-Day Entry Checklist
 </h3>
 <ul className="space-y-4">
 {[
 'Arrive 90–120 minutes early (security + crowd waves).',
 'Keep your ticket QR + passport backup offline (screenshot + wallet card).',
 'Use stadium-adjacent transit when available (Vancouver/Seattle are best).',
 'Plan a post-match “cooldown” spot to avoid surge pricing.',
 ].map((item, i) => (
 <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {item}
 </li>
 ))}
 </ul>
 </div>
 </section>

 {/* Section 3: Budget Breakdown */}
 <section id="budget" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">07</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Group B Budget Breakdown</h2>
 </div>
 
 <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-loose">
 Estimates are per person for a 12-day trip covering 3 group matches. Higher costs reflect West Coast tech hub inflation.
 </p>
 
 <div className="grid md:grid-cols-3 gap-6 mb-16">
 {/* Economy */}
 <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:scale-[1.02] transition-transform duration-300">
 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Economy Strategy</div>
 <div className="text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">$3,500</div>
 <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Shared rentals, Cascadia rail, food truck dining, cheapest match tickets.</p>
 </div>
 
 {/* Mid-Range */}
 <div className="p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900 dark:bg-emerald-900/10 relative overflow-hidden transform md:-translate-y-4 shadow-xl shadow-emerald-900/5">
 <div className="absolute top-0 right-0 bg-emerald-500 text-slate-900 dark:text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl uppercase tracking-widest">Recommended</div>
 <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-4">Mid-Range Strategy</div>
 <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 tracking-tighter">$6,200</div>
 <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Boutique hotels, domestic flights, casual sit-down dining, Cat 2 tickets.</p>
 </div>
 
 {/* Premium */}
 <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:scale-[1.02] transition-transform duration-300">
 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Premium Experience</div>
 <div className="text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">$11,000+</div>
 <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Luxury Bay Area/LA hotels, Business Class flights, Cat 1 tickets, fine dining.</p>
 </div>
 </div>

 <div className=" rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 tracking-tight">
 <CreditCard className="w-6 h-6 text-emerald-500" />
 Money-Saving Hacks for Group B
 </h3>
 <ul className="space-y-6">
 <li className="flex items-start gap-4">
 <div className="w-8 h-8 rounded-full dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs flex-shrink-0">1</div>
 <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
 <strong className="text-slate-900 dark:text-white font-bold">Use SJC for the Bay Area:</strong> San Jose International (SJC) is 15 minutes from the stadium, whereas SFO is an hour away and much more expensive to reach.
 </p>
 </li>
 <li className="flex items-start gap-4">
 <div className="w-8 h-8 rounded-full dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs flex-shrink-0">2</div>
 <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
 <strong className="text-slate-900 dark:text-white font-bold">The CAD Exchange Rate:</strong> If your budget is tight, maximize your stay in Vancouver. The US Dollar is currently strong against the Canadian Dollar, giving you ~30% more value.
 </p>
 </li>
 <li className="flex items-start gap-4">
 <div className="w-8 h-8 rounded-full dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs flex-shrink-0">3</div>
 <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
 <strong className="text-slate-900 dark:text-white font-bold">Metro Over Uber in LA:</strong> Traffic in LA can triple Uber prices during peak hours. The Metro E and K lines are significantly faster for reaching Inglewood/SoFi.
 </p>
 </li>
 </ul>
 
 {/* eSIM Affiliate */}
 <div className="mt-10 flex items-center gap-6 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
 <div className="w-12 h-12 rounded-xl dark:bg-slate-700 flex items-center justify-center text-2xl shadow-sm">📱</div>
 <div className="flex-1">
 <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">Stay Connected</h4>
 <p className="text-xs text-slate-500 dark:text-slate-400">Get an Airalo eSIM for instant data across USA & Canada.</p>
 </div>
 <a href="https://www.airalo.com" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-emerald-600 font-bold text-xs hover:text-emerald-500 transition-colors uppercase tracking-widest">View Plans &rarr;</a>
 </div>
 </div>
 </section>

 {/* Section 4: Visa & Entry Requirements */}
 <section id="visas" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">08</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Visa & Entry Requirements</h2>
 </div>
 
 <div className="grid md:grid-cols-2 gap-8">
 <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
 <h3 className="flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-200 dark:border-slate-800">
 <OptimizedImage 
 src="https://flagcdn.com/us.svg" 
 width={32} 
 height={24} 
 alt="USA" 
 imgClassName="w-8 h-auto object-cover rounded shadow-sm"
 />
 Entering USA
 </h3>
 <ul className="space-y-6">
 <li className="text-sm text-slate-600 dark:text-slate-300">
 <strong className="block text-slate-900 dark:text-white mb-1 font-bold">ESTA</strong>
 Required for Visa Waiver Program countries. Cost: $21 USD. Apply at least 72 hours before crossing from Vancouver.
 </li>
 <li className="text-sm text-slate-600 dark:text-slate-300">
 <strong className="block text-slate-900 dark:text-white mb-1 font-bold">Land Crossing</strong>
 Even at Peace Arch (Road/Rail), you must have your ESTA or Visa ready. The border can be busy on match days.
 </li>
 </ul>
 </div>

 <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
 <h3 className="flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-200 dark:border-slate-800">
 <OptimizedImage 
 src="https://flagcdn.com/ca.svg" 
 width={32} 
 height={24} 
 alt="Canada" 
 imgClassName="w-8 h-auto object-cover rounded shadow-sm"
 />
 Entering Canada
 </h3>
 <ul className="space-y-6">
 <li className="text-sm text-slate-600 dark:text-slate-300">
 <strong className="block text-slate-900 dark:text-white mb-1 font-bold">eTA</strong>
 Electronic Travel Authorization required for most visa-exempt travelers flying to Vancouver. Cost: $7 CAD.
 </li>
 <li className="text-sm text-slate-600 dark:text-slate-300">
 <strong className="block text-slate-900 dark:text-white mb-1 font-bold">Visitor Visa</strong>
 Required for non-eTA countries. Processing times vary; apply months in advance.
 </li>
 </ul>
 </div>
 </div>
 </section>

 {/* Section 5: Insider Tips */}
 <section id="insider" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">09</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Insider Knowledge</h2>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
 <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-xl mb-6">🌉</div>
 <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">Levi's is in Santa Clara</h3>
 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
 The "San Francisco" stadium is actually 45 miles south. Do not stay in Fisherman's Wharf if you want an easy match day. Stay in San Jose or Santa Clara.
 </p>
 </div>
 
 <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
 <div className="w-10 h-10 rounded-xl dark:bg-emerald-500/10 flex items-center justify-center text-xl mb-6">🌲</div>
 <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">The Cascadia Vibe</h3>
 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
 Seattle and Vancouver are soccer-mad cities. Expect "March to the Match" traditions. Wear comfortable shoes and prepare for "Cascadia Mist" (light rain).
 </p>
 </div>
 
 <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
 <div className="w-10 h-10 rounded-xl dark:bg-purple-500/10 flex items-center justify-center text-xl mb-6">🎬</div>
 <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">LA Traffic is Real</h3>
 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
 A 10-mile drive in LA can take 90 minutes. Always add a "traffic tax" to your travel time. SoFi Stadium is in Inglewood—plan your stay accordingly.
 </p>
 </div>
 
 <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
 <div className="w-10 h-10 rounded-xl dark:bg-amber-500/10 flex items-center justify-center text-xl mb-6">☕</div>
 <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">Coffee & Sushi Culture</h3>
 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
 Vancouver has some of the best sushi in the world. Seattle is the coffee capital. Skip the chains; look for local spots in Kitsilano (Vancouver) or Capitol Hill (Seattle).
 </p>
 </div>
 </div>
 </section>

 {/* Section 6: Essential Gear */}
 <section id="packing" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">10</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Group B Packing Essentials</h2>
 </div>
 
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🧥</div>
 <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Light Rain Shell</h4>
 <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Essential for PNW mist.</p>
 <a href="https://www.rei.com/c/rain-jackets" target="_blank" rel="noopener noreferrer" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">Shop Now</a>
 </div>
 <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🕶️</div>
 <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Polarized Shades</h4>
 <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">For the California sun.</p>
 <a href="https://www.rei.com/c/sunglasses" target="_blank" rel="noopener noreferrer" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">Shop Now</a>
 </div>
 <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🛂</div>
 <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Passport Holder</h4>
 <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Frequent border checks.</p>
 <a href="https://www.amazon.com/s?k=passport+holder" target="_blank" rel="noopener noreferrer" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">Shop Now</a>
 </div>
 <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🔋</div>
 <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Power Bank</h4>
 <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Crucial for long jumps.</p>
 <a href="https://www.amazon.com/s?k=power+bank+20000mah" target="_blank" rel="noopener noreferrer" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">Shop Now</a>
 </div>
 </div>
 </section>

 {/* Section 7: FAQ */}
 <section id="faq" className="scroll-mt-32">
 <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 tracking-tight">Frequently Asked Questions</h2>
 <div className="space-y-2">
 <AccordionItem 
 question="Is the border crossing difficult?"
 answer={<>Generally no, but it is <strong>mandatory</strong>. Whether you take the Amtrak Cascades or drive the I-5, you will pass through customs. Ensure your ESTA/Visa is printed or ready on your phone. Expect 30-60 min delays on match days.</>}
 isOpen={openFaqIndex === 0}
 onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
 />
 <AccordionItem 
 question="What’s the smartest ‘one base’ plan for Group B?"
 answer={<>Base in <strong>Vancouver</strong>. It hosts two Group B matches at BC Place, is extremely walkable, and has the cleanest stadium transit in the group. Add Seattle as a train trip if you have an extra day.</>}
 isOpen={openFaqIndex === 1}
 onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
 />
 <AccordionItem 
 question="Which Group B city has the best nightlife?"
 answer={<><strong>Los Angeles</strong> is the undisputed champion for nightlife variety. However, <strong>Vancouver's</strong> Granville Street and <strong>Seattle's</strong> Capitol Hill offer incredible local vibes and a safer, more walkable experience.</>}
 isOpen={openFaqIndex === 2}
 onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
 />
 <AccordionItem 
 question="Can I do this trip without a car?"
 answer={<>In <strong>Vancouver and Seattle</strong>, yes—public transit is excellent. In <strong>San Francisco and LA</strong>, it's much harder. While possible with Uber/Lyft, the costs add up quickly. A rental car for the California leg is highly recommended.</>}
 isOpen={openFaqIndex === 3}
 onClick={() => setOpenFaqIndex(openFaqIndex === 3 ? null : 3)}
 />
 <AccordionItem 
 question="What is the weather like in June?"
 answer={<>A study in contrasts. <strong>Vancouver/Seattle</strong> will be mild and pleasant (18-22°C / 65-72°F) with occasional mist. <strong>California</strong> will be dry and warm to hot (25-32°C / 77-90°F). Pack layers.</>}
 isOpen={openFaqIndex === 4}
 onClick={() => setOpenFaqIndex(openFaqIndex === 4 ? null : 4)}
 />
 </div>
 </section>

 {/* Final CTA */}
 <div className="relative overflow-hidden rounded-[3rem] text-slate-900 dark:text-white p-12 md:p-20 text-center shadow-2xl shadow-slate-900/20">
 <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-slate-900 to-slate-900"></div>
 <div className="relative z-10 max-w-3xl mx-auto">
 <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready for the West Coast Swing?</h2>
 <p className="text-slate-600 dark:text-slate-300 mb-12 text-lg leading-relaxed font-light">
 From the Cascadia forests to the California coastline, Group B is a cinematic journey. Start planning your Pacific strategy today.
 </p>
 <div className="flex flex-wrap justify-center gap-4">
 <AffiliateButton href="/world-cup-2026-match-selection-strategy" text="Match Selection Strategy" variant="secondary" />
 <AffiliateButton href="/world-cup-2026-accommodation-guide" text="Accommodation Guide" variant="outline" />
 </div>
 </div>
 </div>

 </div>
 </div>
 </div>
 </main>
 </div>
 );
}

