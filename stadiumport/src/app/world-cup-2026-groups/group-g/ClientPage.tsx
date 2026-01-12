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
  CreditCard, 
  ExternalLink,
  Smartphone
} from 'lucide-react';

const groupGMatches = [
  { date: 'Mon, Jun 15, 2026', time: '12:00 PM PT', city: 'Seattle', stadium: 'Seattle Stadium', fixture: 'Belgium vs Egypt' },
  { date: 'Mon, Jun 15, 2026', time: '6:00 PM PT', city: 'Los Angeles', stadium: 'Los Angeles Stadium', fixture: 'IR Iran vs New Zealand' },
  { date: 'Sun, Jun 21, 2026', time: '12:00 PM PT', city: 'Los Angeles', stadium: 'Los Angeles Stadium', fixture: 'Belgium vs IR Iran' },
  { date: 'Sun, Jun 21, 2026', time: '6:00 PM PT', city: 'Vancouver', stadium: 'BC Place Vancouver', fixture: 'New Zealand vs Egypt' },
  { date: 'Fri, Jun 26, 2026', time: '8:00 PM PT', city: 'Seattle', stadium: 'Seattle Stadium', fixture: 'Egypt vs IR Iran' },
  { date: 'Fri, Jun 26, 2026', time: '8:00 PM PT', city: 'Vancouver', stadium: 'BC Place Vancouver', fixture: 'New Zealand vs Belgium' },
];

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

export default function GroupGClientPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState('intro');

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
           <Breadcrumb items={[{ label: 'Groups', href: '/world-cup-2026-groups' }, { label: 'Group G', href: '/world-cup-2026-groups/group-g' }]} />

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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">Group G Strategy</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal mb-10 animate-fade-up delay-100">
                Two countries. Three iconic cities. From the evergreen mountains of Vancouver to the Hollywood hills, Group G is the Pacific Coast's premier soccer tour.
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center gap-2 cursor-pointer z-20" onClick={() => scrollToSection('strategy')}>
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
                    Group G is the most scenic route in the tournament—a bi-national journey spanning the lush Pacific Northwest and the Southern California coast.
                  </p>
                  <p className="text-lg leading-loose text-slate-600 dark:text-slate-300 mb-10">
                    The group is defined by the <strong className="text-slate-900 dark:text-white">"Cascadia Corridor"</strong> (Vancouver and Seattle) and the <strong className="text-slate-900 dark:text-white">"Pacific Jump"</strong> to the global stage of Los Angeles.
                  </p>
                </div>

                <div className=" p-10 rounded-[2rem] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-200 dark:border-slate-800 mt-12">
                  <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-6 flex items-center gap-3 tracking-tight uppercase">
                    <Train className="w-5 h-5" />
                    The Group G "Pacific Route"
                  </h3>
                  <p className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
                    Vancouver 🚄 Seattle ✈️ Los Angeles
                  </p>
                  <p className="text-base text-slate-500 dark:text-slate-400">
                    Use the Amtrak Cascades for the cross-border journey. It's scenic and stress-free. Then, take a short flight south to the California sunshine.
                  </p>
                </div>
              </section>

              <section id="schedule" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">00</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Confirmed Group G Match Schedule</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-10 max-w-3xl">
                  Times are shown in local Pacific Time (PT).
                </p>

                <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-200 dark:border-slate-800 shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-200 dark:border-slate-800">
                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Kickoff</th>
                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest hidden lg:table-cell">City</th>
                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest hidden lg:table-cell">Stadium</th>
                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Fixture</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {groupGMatches.map((match) => (
                        <tr key={`${match.date}-${match.fixture}`}>
                          <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">{match.date}</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">{match.time}</td>
                          <td className="p-6 text-slate-500 hidden lg:table-cell text-sm">{match.city}</td>
                          <td className="p-6 text-slate-500 hidden lg:table-cell text-sm">{match.stadium}</td>
                          <td className="p-6 text-slate-700 dark:text-slate-300 text-base">{match.fixture}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 1: Multi-City Travel Strategy */}
              <section id="strategy" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">01</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Multi-City Travel Strategy</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-12 max-w-3xl">
                  Group G offers a mix of walkable city centers and the inevitable sprawling logistics of Southern California. Timing your border crossing is the key to Cascadia.
                </p>

                <div className="mb-16">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">The "Cascadia Corridor" (Train Supremacy)</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-3xl">
                    Do not drive between Vancouver and Seattle on match days. The Peace Arch border crossing can see 3+ hour delays. The train bypasses the chaos.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className=" p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
                      <Train className="w-8 h-8 text-emerald-500 mb-6" />
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Amtrak Cascades</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Stunning coastal views. Vancouver to Seattle in 4h. Reliable border processing.</p>
                      <span className="inline-block px-3 py-1 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">$40-100 USD</span>
                    </div>
                    <div className=" p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
                      <Train className="w-8 h-8 text-emerald-500 mb-6" />
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">BoltBus / FlixBus</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">The budget choice. Multiple daily departures from Pacific Central Station.</p>
                      <span className="inline-block px-3 py-1 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">$15-35 USD</span>
                    </div>
                    <div className=" p-8 rounded-3xl border border-transparent dark:border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 text-slate-400 mb-6 flex items-center justify-center font-bold border-2 border-slate-300 rounded-full text-[10px]">CAR</div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">I-5 Driving</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Flexible but risky. Only recommended if staying in suburbs or traveling mid-week.</p>
                      <span className="inline-block px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full">Variable Cost</span>
                    </div>
                  </div>
                </div>

                <div className="mb-16">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">The "Pacific Jump" (Seattle & LA)</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-3xl">
                    Once you leave the Northwest, distances become massive. You must fly to Los Angeles. Driving takes 17+ hours through mountain passes.
                  </p>

                  <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-200 dark:border-slate-800 shadow-sm ">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-200 dark:border-slate-800">
                          <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Route</th>
                          <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Flight Time</th>
                          <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Booking Window</th>
                          <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Est. Price</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        <tr>
                          <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Seattle (SEA) → Los Angeles (LAX)</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">2h 30m</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">3 Months Out</td>
                          <td className="p-6 font-bold text-emerald-600 dark:text-emerald-400 text-base">$120 - $220</td>
                        </tr>
                        <tr>
                          <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Vancouver (YVR) → Los Angeles (LAX)</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">2h 50m</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">3 Months Out</td>
                          <td className="p-6 font-bold text-emerald-600 dark:text-emerald-400 text-base">$150 - $280</td>
                        </tr>
                        <tr>
                          <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Seattle (SEA) → Burbank (BUR)</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">2h 25m</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">2 Months Out</td>
                          <td className="p-6 font-bold text-emerald-600 dark:text-emerald-400 text-base">$110 - $200</td>
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
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Flight prices between Seattle and LA will peak in June 2026.</p>
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

              {/* Section 2: Accommodation Strategy */}
              <section id="accommodation" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">02</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Accommodation Strategy</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-loose max-w-3xl">
                  Vancouver and LA are two of the most expensive markets in North America. Seattle offers a slight reprieve, but only if you book well in advance.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Vancouver */}
                  <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Vancouver</h3>
                      <span className="px-3 py-1 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Extreme Cost</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Book 10 Months Out</p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                        <span><strong>Best Area:</strong> Yaletown / Gastown (Walkable to BC Place)</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                        <span><strong>Vibe:</strong> High-end urban with mountain and ocean views.</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                        <span><strong>Warning:</strong> Hotels fill up instantly. Consider North Vancouver (SeaBus access).</span>
                      </li>
                    </ul>
                    <AffiliateButton 
                      href="https://booking.com" 
                      text="Search Vancouver Hotels" 
                      variant="outline"
                    />
                  </div>

                  {/* Seattle */}
                  <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Seattle</h3>
                      <span className="px-3 py-1 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">High Demand</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Book 8 Months Out</p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                        <span><strong>Best Area:</strong> Pioneer Square / Downtown (Lumen Field access)</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                        <span><strong>Budget Alt:</strong> Capitol Hill (Passionate vibe, short Link rail ride)</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                        <span><strong>Note:</strong> Lumen Field is one of the most accessible downtown stadiums in the US.</span>
                      </li>
                    </ul>
                    <AffiliateButton 
                      href="https://booking.com" 
                      text="Search Seattle Hotels" 
                      variant="outline"
                    />
                  </div>

                  {/* Los Angeles */}
                  <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Los Angeles</h3>
                      <span className="px-3 py-1 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Logistics Trap</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Strategy Required</p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                        <span><strong>The Dilemma:</strong> SoFi Stadium is in Inglewood. Santa Monica is where you want to be.</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                        <span><strong>Recommendation:</strong> Stay near LAX or Manhattan Beach for the best balance of stadium and sea.</span>
                      </li>
                    </ul>
                    <a href="https://booking.com" className="inline-flex items-center gap-2 text-emerald-600 font-bold text-xs hover:text-emerald-700 transition-all group-hover:translate-x-2 uppercase tracking-widest">
                      Search LA Hotels <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>

                  {/* The Coast Option */}
                  <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Santa Monica</h3>
                      <span className="px-3 py-1 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Premium Base</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">The California Dream</p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                        <span><strong>Best Area:</strong> Near the Pier for nightlife and beach access.</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                        <span><strong>Stadium Access:</strong> Expect a 45-minute Uber to SoFi on match day.</span>
                      </li>
                    </ul>
                    <a href="https://booking.com" className="inline-flex items-center gap-2 text-emerald-600 font-bold text-xs hover:text-emerald-700 transition-all group-hover:translate-x-2 uppercase tracking-widest">
                      Search Coastal Hotels <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </section>

              {/* Section 3: Budget Breakdown */}
              <section id="budget" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">03</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Group G Budget Breakdown</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-loose">
                  Estimates are per person for a 12-day trip covering 3 group matches. The Pacific Coast is significantly more expensive than the Midwest.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-16">
                  {/* Economy */}
                  <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:scale-[1.02] transition-transform duration-300">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Economy Strategy</div>
                    <div className="text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">$3,400</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Hostels, buses between cities, grocery meals, cheapest match tickets.</p>
                  </div>

                  {/* Mid-Range */}
                  <div className="p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900 dark:bg-emerald-900/10 relative overflow-hidden transform md:-translate-y-4 shadow-xl shadow-emerald-900/5">
                    <div className="absolute top-0 right-0 bg-emerald-500 text-slate-900 dark:text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl uppercase tracking-widest">Recommended</div>
                    <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-4">Mid-Range Strategy</div>
                    <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 tracking-tighter">$5,800</div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">3-star hotels, Amtrak Cascades, casual dining (sushi/tacos), Cat 2 tickets.</p>
                  </div>

                  {/* Premium */}
                  <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:scale-[1.02] transition-transform duration-300">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Premium Experience</div>
                    <div className="text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">$10,000+</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Fairmont Vancouver, Santa Monica beach hotels, Business Class flights, Cat 1 tickets.</p>
                  </div>
                </div>

                <div className=" rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 tracking-tight">
                    <CreditCard className="w-6 h-6 text-emerald-500" />
                    Money-Saving Hacks for Group G
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs flex-shrink-0">1</div>
                      <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        <strong className="text-slate-900 dark:text-white font-bold">Vancouver Transit:</strong> Skip the $50 Uber from YVR. The SkyTrain (Canada Line) is $9 and gets you to downtown in 25 minutes.
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs flex-shrink-0">2</div>
                      <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        <strong className="text-slate-900 dark:text-white font-bold">Seattle Monorail:</strong> If staying near the Space Needle, the Monorail is a quick, fun way to reach Westlake and the Link rail to the stadium.
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs flex-shrink-0">3</div>
                      <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        <strong className="text-slate-900 dark:text-white font-bold">LAX FlyAway:</strong> A $10 bus from the airport to Union Station or Van Nuys. Avoid the $80 airport Uber surge.
                      </p>
                    </li>
                  </ul>

                  {/* eSIM Affiliate */}
                  <div className="mt-10 flex items-center gap-6 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="w-12 h-12 rounded-xl dark:bg-slate-700 flex items-center justify-center text-2xl shadow-sm">📱</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">Stay Connected</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Get an Airalo eSIM for instant data across Canada and the USA.</p>
                    </div>
                    <a href="https://www.airalo.com/" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-emerald-600 font-bold text-xs hover:text-emerald-500 transition-colors uppercase tracking-widest">View Plans &rarr;</a>
                  </div>
                </div>
              </section>

              {/* Section 4: Visa & Entry Requirements */}
              <section id="visas" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">04</span>
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
                        Required for Seattle and LA matches. Cost: $21 USD. Valid for 2 years.
                      </li>
                      <li className="text-sm text-slate-600 dark:text-slate-300">
                        <strong className="block text-red-600 dark:text-red-400 mb-1 font-bold">Border Tip</strong>
                        When crossing from Vancouver to Seattle, have your match tickets and accommodation proof ready.
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
                        Required for Vancouver matches if arriving by air. Cost: $7 CAD. Approval is usually instant.
                      </li>
                      <li className="text-sm text-slate-600 dark:text-slate-300">
                        <strong className="block text-red-600 dark:text-red-400 mb-1 font-bold">Important</strong>
                        You need a separate entry authorization for Canada and the USA. Do not assume one covers both.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 5: Insider Tips */}
              <section id="insider" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">05</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Insider Knowledge</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
                    <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-xl mb-6">🚢</div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">The SeaBus Shortcut</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      In Vancouver, if downtown hotels are too expensive, stay in North Vancouver. The SeaBus ferry is cheap, runs every 15 minutes, and drops you at Waterfront Station—a short walk to the stadium.
                    </p>
                  </div>

                  <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
                    <div className="w-10 h-10 rounded-xl dark:bg-blue-500/10 flex items-center justify-center text-xl mb-6">🔊</div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">The Noise Factor</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Seattle's Lumen Field is world-famous for its acoustics. It has twice held the world record for loudest crowd noise in a sports stadium. Bring ear protection for kids.
                    </p>
                  </div>

                  <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
                    <div className="w-10 h-10 rounded-xl dark:bg-emerald-500/10 flex items-center justify-center text-xl mb-6">🚗</div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">The 405 Warning</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      In Los Angeles, a 10-mile drive can take 90 minutes. Never leave for the stadium less than 3 hours before kickoff, even if you are "close."
                    </p>
                  </div>

                  <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
                    <div className="w-10 h-10 rounded-xl dark:bg-amber-500/10 flex items-center justify-center text-xl mb-6">🌯</div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">West Coast Fuel</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Vancouver = Sushi. Seattle = Teriyaki. Los Angeles = Street Tacos. These are the unofficial "staple" foods of each city. Cheap, delicious, and authentic.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6: Essential Gear */}
              <section id="packing" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">06</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Group G Packing Essentials</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🧥</div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Light Rain Shell</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Crucial for the Cascadia mist.</p>
                    <Link href="/world-cup-2026-packing-guide" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">Packing Guide</Link>
                  </div>
                  <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🕶️</div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Polarized Sunglasses</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">The LA sun is unforgiving.</p>
                    <Link href="/world-cup-2026-packing-guide" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">Packing Guide</Link>
                  </div>
                  <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">👟</div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Walkable Sneakers</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Vancouver is best explored on foot.</p>
                    <Link href="/world-cup-2026-packing-guide" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">Packing Guide</Link>
                  </div>
                  <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🔋</div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Power Bank</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Long travel days across borders.</p>
                    <Link href="/world-cup-2026-packing-guide" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">Packing Guide</Link>
                  </div>
                </div>
              </section>

              {/* Section 7: FAQ */}
              <section id="faq" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-2">
                  <AccordionItem 
                    question="Amtrak or Driving between Vancouver and Seattle?"
                    answer={<><strong>Amtrak Cascades</strong> is highly recommended. While driving is shorter on paper, border wait times for cars are notoriously unpredictable, especially during major events. The train has dedicated customs processing that is usually faster.</>}
                    isOpen={openFaqIndex === 0}
                    onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
                  />
                  <AccordionItem 
                    question="Which city has the best stadium atmosphere?"
                    answer={<><strong>Seattle</strong>. Lumen Field is legendary for its noise and soccer-specific design. Vancouver's BC Place is also excellent and features a retractable roof, making it a "loud" indoor experience if the roof is closed.</>}
                    isOpen={openFaqIndex === 1}
                    onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
                  />
                  <AccordionItem 
                    question="How far apart are the cities?"
                    answer={<>Vancouver to Seattle is only 140 miles (about 3-4 hours by train/car). However, Seattle to Los Angeles is 1,100 miles. You must fly to LA; driving takes 17-20 hours.</>}
                    isOpen={openFaqIndex === 2}
                    onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
                  />
                  <AccordionItem 
                    question="Is Los Angeles safe for tourists?"
                    answer={<>Tourist areas like Santa Monica, Hollywood, and Downtown are generally safe, but like any major city, you should stay aware of your surroundings. Use rideshare apps at night and avoid walking in unfamiliar industrial areas near the stadium.</>}
                    isOpen={openFaqIndex === 3}
                    onClick={() => setOpenFaqIndex(openFaqIndex === 3 ? null : 3)}
                  />
                </div>
              </section>

              {/* Final CTA */}
              <div className="relative overflow-hidden rounded-[3rem] text-slate-900 dark:text-white p-12 md:p-20 text-center shadow-2xl shadow-slate-900/20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-slate-900 to-slate-900"></div>
                <div className="relative z-10 max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready for the Pacific Coast?</h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-12 text-lg leading-relaxed font-light">
                    From the mountains of Cascadia to the stars of Hollywood, Group G is a journey of pure West Coast magic. Start planning your logistics now.
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


