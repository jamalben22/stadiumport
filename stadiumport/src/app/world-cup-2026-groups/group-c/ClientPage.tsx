'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { 
 ChevronDown, 
 Calendar, 
 MapPin, 
 ArrowRight, 
 Plane, 
 Train, 
 CreditCard, 
 ExternalLink
} from 'lucide-react';
import { GROUPS, TEAM_MAP, type Team } from '@/data/teams';

function AccordionItem({ question, answer, isOpen, onClick }: { question: string, answer: React.ReactNode, isOpen: boolean, onClick: () => void }) {
 return (
 <div className="border-b border-slate-200 dark:border-slate-800 last:border-0">
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

export default function GroupCClientPage() {
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

  const groupTeams = (GROUPS.C ?? []).map((teamId) => TEAM_MAP.get(teamId)).filter((team): team is Team => Boolean(team));

  const teamSpotlight: Record<string, { headline: string; blurb: string; travelAngle: string }> = {
    bra: {
      headline: 'The Favorite',
      blurb: 'High expectation, big crowds, and premium ticket demand.',
      travelAngle: 'International arrival: Miami is the easiest gateway; use the Northeast Corridor for match-to-match efficiency.'
    },
    mar: {
      headline: 'The Dark Horse',
      blurb: 'Elite structure and a passionate traveling support.',
      travelAngle: 'Lock Boston/NYC early; Morocco fans reliably spike hotel prices near city centers.'
    },
    hai: {
      headline: 'The Underdog',
      blurb: 'Chaotic energy and a fanbase that shows up when it matters.',
      travelAngle: 'Value-play base: Philadelphia for cheaper rooms, quick trains, and a direct subway to the stadium.'
    },
    sco: {
      headline: 'The Noise Makers',
      blurb: 'If Scotland qualify, expect the loudest pubs on the East Coast.',
      travelAngle: 'Stay rail-first: Boston → NYC → Philly without airports, then fly south only if your match forces it.'
    }
  };

  const schedule = [
    { matchday: 1, date: 'June 12, 2026', time: '8:00 PM ET', city: 'Miami Gardens', stadium: 'Hard Rock Stadium', fixture: 'Brazil vs Haiti' },
    { matchday: 1, date: 'June 13, 2026', time: '3:00 PM ET', city: 'Foxborough (Boston)', stadium: 'Gillette Stadium', fixture: 'Morocco vs Scotland' },
    { matchday: 2, date: 'June 18, 2026', time: '6:00 PM ET', city: 'East Rutherford', stadium: 'MetLife Stadium', fixture: 'Brazil vs Scotland' },
    { matchday: 2, date: 'June 18, 2026', time: '9:00 PM ET', city: 'Philadelphia', stadium: 'Lincoln Financial Field', fixture: 'Morocco vs Haiti' },
    { matchday: 3, date: 'June 24, 2026', time: '3:00 PM ET', city: 'East Rutherford', stadium: 'MetLife Stadium', fixture: 'Scotland vs Haiti' },
    { matchday: 3, date: 'June 24, 2026', time: '8:00 PM ET', city: 'Atlanta', stadium: 'Mercedes-Benz Stadium', fixture: 'Brazil vs Morocco' }
  ];

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
 const sections = ['intro', 'teams', 'schedule', 'strategy', 'cities', 'accommodation', 'budget', 'visas', 'insider', 'packing', 'faq'];
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
            <Breadcrumb items={[{ label: 'Groups', href: '/world-cup-2026-groups' }, { label: 'Group C', href: '/world-cup-2026-groups/group-c' }]} />

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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">Group C Strategy</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal mb-10 animate-fade-up delay-100">
                Five cities. One coast. From the high-speed rails of the Northeast to the sunny shores of Miami, Group C offers the tournament's most efficient travel routes.
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
 { id: 'teams', label: 'Teams' },
 { id: 'schedule', label: 'Match Schedule' },
 { id: 'strategy', label: 'Travel Strategy' },
 { id: 'cities', label: 'Cities & Stadiums' },
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
 Group C offers the highest density of world-class stadiums and the easiest regional travel in the tournament—if you stay North.
 </p>
 <p className="text-lg leading-loose text-slate-600 dark:text-slate-300 mb-10">
 The group is split into two distinct zones: the <strong className="text-slate-900 dark:text-white">"Northeast Corridor"</strong> (Boston, NY/NJ, Philadelphia) and the <strong className="text-slate-900 dark:text-white">"Southern Heat"</strong> (Atlanta, Miami).
 </p>
 </div>
 
 <div className=" p-10 rounded-[2rem] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-200 dark:border-slate-800 mt-12">
 <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-6 flex items-center gap-3 tracking-tight uppercase">
 <Train className="w-5 h-5" />
 The Group C "Power Route"
 </h3>
 <p className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
 Boston 🚄 NYC 🚄 Philadelphia ✈️ Atlanta ✈️ Miami
 </p>
 <p className="text-base text-slate-500 dark:text-slate-400">
 Use the Amtrak Acela for the first three cities. It's faster than flying. Then, fly from Philly to Atlanta to switch climates.
 </p>
 </div>
 </section>

 <section id="teams" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">01</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Teams & Storylines</h2>
 </div>
 
 <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-12 max-w-3xl">
 Group C blends a global giant with two high-energy disruptors and one pure underdog journey. Expect big traveling sections, expensive tickets for Brazil matches, and a Northeast corridor that lets you follow the group without airports.
 </p>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {groupTeams.map((team) => {
 const spotlight = teamSpotlight[team.id] || { headline: 'Team', blurb: '', travelAngle: '' };
 return (
 <div key={team.id} className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="flex items-center gap-4 mb-6">
 <OptimizedImage
 src={team.flagUrl}
 width={48}
 height={32}
 alt={team.name}
 imgClassName="w-12 h-auto object-cover rounded shadow-sm"
 />
 <div className="flex-1">
 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{spotlight.headline}</div>
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{team.name}</h3>
 <div className="text-xs text-slate-500 dark:text-slate-400">{team.fifaCode} • {team.region}</div>
 </div>
 </div>
 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{spotlight.blurb}</p>
 <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
 <strong className="text-slate-900 dark:text-white">Travel angle:</strong> {spotlight.travelAngle}
 </div>
 </div>
 );
 })}
 </div>
 
 <div className="mt-12 flex flex-wrap gap-4">
 <AffiliateButton href="https://www.fanatics.com/soccer" text="Shop Jerseys & Gear" variant="secondary" />
 <AffiliateButton href="/world-cup-2026-flight-booking-guide" text="Flight Booking Strategy" variant="outline" icon={Plane} />
 </div>
 </section>

 <section id="schedule" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">02</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Group C Match Schedule</h2>
 </div>
 
 <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-10 max-w-3xl">
 Your itinerary lives and dies by two things: the Northeast rail spine (Boston–NYC–Philly) and the one-time southern jump. Use this schedule view to plan bases first, then flights second.
 </p>
 
 <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="border-b border-slate-100 dark:border-slate-800">
 <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Matchday</th>
 <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Fixture</th>
 <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">City</th>
 <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Stadium</th>
 <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Kickoff</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
 {schedule.map((m, idx) => (
 <tr key={`${m.fixture}-${idx}`}>
 <td className="p-6 text-slate-500 text-sm font-semibold">{m.matchday}</td>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">{m.fixture}</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">{m.city}</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">{m.stadium}</td>
 <td className="p-6 text-slate-500 text-sm">
 <div className="flex flex-col">
 <span className="font-semibold text-slate-900 dark:text-white">{m.time}</span>
 <span className="text-xs text-slate-400">{m.date}</span>
 </div>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 
 <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
 <AffiliateButton href="/world-cup-2026-itinerary-planning" text="Build a 10–14 Day Itinerary" variant="secondary" icon={Calendar} />
 <AffiliateButton href="/world-cup-2026-travel-insurance-guide" text="Travel Insurance Checklist" variant="outline" icon={ExternalLink} />
 </div>
 </section>

 {/* Section 1: Multi-City Travel Strategy */}
 <section id="strategy" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">03</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Multi-City Travel Strategy</h2>
 </div>
 
 <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-12 max-w-3xl">
 Group C has the best public transit infrastructure in the US (Northeast) mixed with cities where a car is almost mandatory (Atlanta, Miami).
 </p>
 
 <div className="mb-16">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">The "Northeast Corridor" (Train Supremacy)</h3>
 <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-3xl">
 Do not fly between Boston, NYC, and Philadelphia. The airports (Logan, JFK/LGA, PHL) are congested and far from the stadiums.
 </p>
 
 <div className="grid md:grid-cols-3 gap-6">
 <div className=" p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
 <Train className="w-8 h-8 text-emerald-500 mb-6" />
 <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Amtrak Acela</h4>
 <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">High-speed business class. Boston to NYC in 3h 45m.</p>
 <span className="inline-block px-3 py-1 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">$100-200 USD</span>
 </div>
 <div className=" p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
 <Train className="w-8 h-8 text-emerald-500 mb-6" />
 <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Northeast Regional</h4>
 <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Slightly slower, much cheaper. Book 3 weeks ahead.</p>
 <span className="inline-block px-3 py-1 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">$30-80 USD</span>
 </div>
 <div className=" p-8 rounded-3xl border border-transparent dark:border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100 transition-opacity duration-300">
 <div className="w-8 h-8 text-slate-400 mb-6 flex items-center justify-center font-bold border-2 border-slate-300 rounded-full text-[10px]">BUS</div>
 <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Bus (Megabus)</h4>
 <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Extremely cheap but stuck in I-95 traffic. Only for tight budgets.</p>
 <span className="inline-block px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full">$15-30 USD</span>
 </div>
 </div>
 </div>

 <div className="mb-16">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">The "Southern Jump" (Atlanta & Miami)</h3>
 <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-3xl">
 Once you leave Philly, distances explode. You must fly. Driving from Philadelphia to Miami takes 18+ hours.
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
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Philadelphia (PHL) → Atlanta (ATL)</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">2h 15m</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">3 Months Out</td>
 <td className="p-6 font-bold text-emerald-600 dark:text-emerald-400 text-base">$120 - $250</td>
 </tr>
 <tr>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Atlanta (ATL) → Miami (MIA)</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">1h 55m</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">2 Months Out</td>
 <td className="p-6 font-bold text-emerald-600 dark:text-emerald-400 text-base">$100 - $180</td>
 </tr>
 <tr>
 <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">NYC (JFK) → Miami (MIA)</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">3h 10m</td>
 <td className="p-6 text-slate-500 hidden md:table-cell text-sm">3 Months Out</td>
 <td className="p-6 font-bold text-emerald-600 dark:text-emerald-400 text-base">$150 - $300</td>
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
 Secure Your East Coast Flights
 </h4>
 <p className="text-slate-500 dark:text-slate-400 text-sm">Flight prices for June 2026 are expected to surge by 40%.</p>
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

 <section id="cities" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">04</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Cities & Stadiums (Quick Hits)</h2>
 </div>
 
 <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-loose max-w-3xl">
 Group C is a rare blend: three cities where you can live on trains and subways, plus two where heat and distance punish bad planning. Use these quick hits to choose your bases and match-day transport.
 </p>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {[
 { city: 'Boston', cityHref: '/world-cup-2026-boston-guide', stadium: 'Gillette Stadium', stadiumHref: '/gillette-stadium-world-cup-2026', note: 'Plan it like a day trip: Foxborough is not downtown Boston.' },
 { city: 'New York / New Jersey', cityHref: '/world-cup-2026-new-york-new-jersey-guide', stadium: 'MetLife Stadium', stadiumHref: '/metlife-stadium-world-cup-2026', note: 'Match day is a commuter mission. Stay central, then ride NJ Transit.' },
 { city: 'Philadelphia', cityHref: '/world-cup-2026-philadelphia-guide', stadium: 'Lincoln Financial Field', stadiumHref: '/lincoln-financial-field-world-cup-2026', note: 'The subway is the cheat code: Broad Street Line to NRG Station.' },
 { city: 'Atlanta', cityHref: '/world-cup-2026-atlanta-guide', stadium: 'Mercedes-Benz Stadium', stadiumHref: '/mercedes-benz-stadium-world-cup-2026', note: 'One of the best setups in the US: airport train → downtown → stadium.' },
 { city: 'Miami', cityHref: '/world-cup-2026-miami-guide', stadium: 'Hard Rock Stadium', stadiumHref: '/hard-rock-stadium-world-cup-2026', note: 'Humidity + traffic. Base north (Fort Lauderdale/Hollywood) for sanity.' }
 ].map((item) => (
 <div key={item.city} className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
 <div className="flex items-center gap-3 mb-4">
 <MapPin className="w-5 h-5 text-emerald-500" />
 <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{item.city}</h3>
 </div>
 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{item.note}</p>
 <div className="flex flex-wrap gap-3">
 <AffiliateButton href={item.cityHref} text="City Guide" variant="secondary" />
 <AffiliateButton href={item.stadiumHref} text="Stadium Guide" variant="outline" icon={MapPin} />
 </div>
 </div>
 ))}
 </div>
 </section>

 {/* Section 2: Accommodation Strategy */}
 <section id="accommodation" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">05</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Accommodation Strategy</h2>
 </div>
 
 <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-loose max-w-3xl">
 NYC is the budget killer. Boston is historic and pricey. Miami requires strategic positioning to avoid traffic. Here is where to stay.
 </p>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {/* NYC */}
 <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="flex justify-between items-start mb-6">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">New York / NJ</h3>
 <span className="px-3 py-1 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Extreme Cost</span>
 </div>
 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Book 10 Months Out</p>
 <ul className="space-y-4 mb-8">
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
 <span><strong>Best Area:</strong> Midtown Manhattan (For tourism/train access)</span>
 </li>
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
 <span><strong>Stadium Access:</strong> Secaucus, NJ (Train to MetLife is 10 mins)</span>
 </li>
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
 <span><strong>Warning:</strong> Staying in Manhattan means a 45-60 min commute to the stadium.</span>
 </li>
 </ul>
              <AffiliateButton 
                href="https://www.booking.com/searchresults.html?ss=New+York" 
                text="Search NYC Hotels" 
                variant="outline"
              />
            </div>

            {/* Boston */}
            <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Boston</h3>
                <span className="px-3 py-1 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">High Demand</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Book 8 Months Out</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                  <span><strong>Best Area:</strong> Back Bay / Copley (Central, safe, upscale)</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                  <span><strong>Budget Alt:</strong> Cambridge (Red Line subway access)</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                  <span><strong>Note:</strong> Stadium is in Foxborough (30 miles out). Take the event train from South Station.</span>
                </li>
              </ul>
              <AffiliateButton 
                href="https://www.booking.com/searchresults.html?ss=Boston" 
                text="Search Boston Hotels" 
                variant="outline"
              />
            </div>

 {/* Philadelphia */}
 <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="flex justify-between items-start mb-6">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Philadelphia</h3>
 <span className="px-3 py-1 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Good Value</span>
 </div>
 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Book 6 Months Out</p>
 <ul className="space-y-4 mb-8">
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
 <span><strong>Best Area:</strong> Center City (Walkable, historic, food scene)</span>
 </li>
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
 <span><strong>Stadium Access:</strong> Broad Street Line (Subway) goes direct to stadium complex.</span>
 </li>
 </ul>
 <AffiliateButton 
 href="https://www.booking.com/searchresults.html?ss=Philadelphia" 
 text="Search Philly Hotels" 
 variant="outline"
 />
 </div>

 {/* Miami */}
 <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="flex justify-between items-start mb-6">
 <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Miami</h3>
 <span className="px-3 py-1 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Logistics Trap</span>
 </div>
 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Strategy Required</p>
 <ul className="space-y-4 mb-8">
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
 <span><strong>The Dilemma:</strong> Hard Rock Stadium is in Miami Gardens (far north). South Beach is far south.</span>
 </li>
 <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
 <span><strong>Recommendation:</strong> Stay in Fort Lauderdale or Hollywood for easier stadium access.</span>
 </li>
 </ul>
 <AffiliateButton 
 href="https://www.booking.com/searchresults.html?ss=Miami" 
 text="Search Miami Hotels" 
 variant="outline"
 />
 </div>
 </div>
 </section>

 {/* Section 3: Budget Breakdown */}
 <section id="budget" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">06</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Group C Budget Breakdown</h2>
 </div>
 
 <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-loose">
 Estimates are per person for a 12-day trip covering 3 group matches. Does not include international arrival flights.
 </p>
 
 <div className="grid md:grid-cols-3 gap-6 mb-16">
 {/* Economy */}
 <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:scale-[1.02] transition-transform duration-300">
 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Economy Strategy</div>
 <div className="text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">$3,200</div>
 <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Hostels, buses between cities, grocery meals, cheapest match tickets.</p>
 </div>
 
 {/* Mid-Range */}
 <div className="p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900 dark:bg-emerald-900/10 relative overflow-hidden transform md:-translate-y-4 shadow-xl shadow-emerald-900/5">
 <div className="absolute top-0 right-0 bg-emerald-500 text-slate-900 dark:text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl uppercase tracking-widest">Recommended</div>
 <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-4">Mid-Range Strategy</div>
 <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 tracking-tighter">$5,500</div>
 <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">3-star hotels (or shared Airbnbs), Amtrak Regional, casual dining, Cat 2 tickets.</p>
 </div>
 
 {/* Premium */}
 <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:scale-[1.02] transition-transform duration-300">
 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Premium Experience</div>
 <div className="text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">$9,500+</div>
 <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Manhattan/South Beach hotels, Acela First Class, Cat 1 tickets, fine dining.</p>
 </div>
 </div>

 <div className=" rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 tracking-tight">
 <CreditCard className="w-6 h-6 text-emerald-500" />
 Money-Saving Hacks for Group C
 </h3>
 <ul className="space-y-6">
 <li className="flex items-start gap-4">
 <div className="w-8 h-8 rounded-full dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs flex-shrink-0">1</div>
 <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
 <strong className="text-slate-900 dark:text-white font-bold">Stay in Jersey, Party in NYC:</strong> Hotels in Secaucus or Weehawken are 40% cheaper than Manhattan and offer quick train/ferry access.
 </p>
 </li>
 <li className="flex items-start gap-4">
 <div className="w-8 h-8 rounded-full dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs flex-shrink-0">2</div>
 <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
 <strong className="text-slate-900 dark:text-white font-bold">Amtrak Early Bird:</strong> Amtrak prices work like airline tickets. Book 3+ weeks out for "Saver" fares ($30 vs $150 walk-up).
 </p>
 </li>
 <li className="flex items-start gap-4">
 <div className="w-8 h-8 rounded-full dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs flex-shrink-0">3</div>
 <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
 <strong className="text-slate-900 dark:text-white font-bold">Philly Food:</strong> Philadelphia has one of the best food scenes in America at half the price of NYC. Save your appetite for Reading Terminal Market.
 </p>
 </li>
 </ul>
 
 {/* eSIM Affiliate */}
 <div className="mt-10 flex items-center gap-6 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
 <div className="w-12 h-12 rounded-xl dark:bg-slate-700 flex items-center justify-center text-2xl shadow-sm">📱</div>
 <div className="flex-1">
 <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">Stay Connected</h4>
 <p className="text-xs text-slate-500 dark:text-slate-400">Get an Airalo eSIM for instant data across the USA.</p>
 </div>
 <a href="https://airalo.tp.st/yF9Qk3Ol" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-emerald-600 font-bold text-xs hover:text-emerald-500 transition-colors uppercase tracking-widest">View Plans &rarr;</a>
 </div>
 </div>
 </section>

 {/* Section 4: Visa & Entry Requirements */}
 <section id="visas" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">07</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Visa & Entry Requirements</h2>
 </div>
 
 <div className="grid md:grid-cols-1 gap-8">
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
 Required for Visa Waiver Program countries (UK, EU, Australia, etc.). Cost: $21 USD. Approval: Up to 72 hours. Valid for 2 years.
 </li>
 <li className="text-sm text-slate-600 dark:text-slate-300">
 <strong className="block text-slate-900 dark:text-white mb-1 font-bold">B1/B2 Visa</strong>
 Required if not ESTA eligible. Wait times for interviews can be 6+ months in some countries. Apply immediately if you need one.
 </li>
 <li className="text-sm text-slate-600 dark:text-slate-300">
 <strong className="block text-red-600 dark:text-red-400 mb-1 font-bold">Important</strong>
 Even if you are just visiting, ensure your passport is valid for at least 6 months beyond your planned departure date.
 </li>
 </ul>
 </div>
 </div>
 </section>

 {/* Section 5: Insider Tips */}
 <section id="insider" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">08</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Insider Knowledge</h2>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
 <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-xl mb-6">⚠️</div>
 <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">MetLife is in a Swamp</h3>
 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
 The "New York" stadium is actually in East Rutherford, NJ. There is nothing to do there. Do not book a hotel "near the stadium" unless you plan to stare at highways. Stay in Manhattan.
 </p>
 </div>
 
 <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
 <div className="w-10 h-10 rounded-xl dark:bg-blue-500/10 flex items-center justify-center text-xl mb-6">❄️</div>
 <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">The AC Factor</h3>
 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
 It will be 35°C (95°F) outside in Miami and Atlanta, but 18°C (65°F) inside buildings. Americans love aggressive air conditioning. Bring a light sweater even in summer.
 </p>
 </div>
 
 <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
 <div className="w-10 h-10 rounded-xl dark:bg-emerald-500/10 flex items-center justify-center text-xl mb-6">🚆</div>
 <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">MARTA Smarts</h3>
 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
 In Atlanta, the MARTA train goes directly from the Airport (ATL) to downtown and Mercedes-Benz Stadium. It's faster and cheaper than Uber.
 </p>
 </div>
 
 <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
 <div className="w-10 h-10 rounded-xl dark:bg-amber-500/10 flex items-center justify-center text-xl mb-6">🥯</div>
 <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">Bagel & Pizza Rules</h3>
 <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
 In NYC/NJ, bagels are for breakfast, pizza is by the slice. Do not eat chain pizza here. Ask a local for their "spot."
 </p>
 </div>
 </div>
 </section>

 {/* Section 6: Essential Gear */}
 <section id="packing" className="scroll-mt-32">
 <div className="flex items-baseline gap-4 mb-12">
 <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">09</span>
 <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Group C Packing Essentials</h2>
 </div>
 
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">👟</div>
 <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Walking Shoes</h4>
 <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">NYC/Boston = 20k steps/day.</p>
 <Link href="/world-cup-2026-packing-guide" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">See Picks</Link>
 </div>
 <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">☂️</div>
 <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Compact Umbrella</h4>
 <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Summer storms are sudden.</p>
 <Link href="/world-cup-2026-packing-guide" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">See Picks</Link>
 </div>
 <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">👕</div>
 <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Linen/Light Fabrics</h4>
 <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">For the Miami humidity.</p>
 <Link href="/world-cup-2026-packing-guide" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">See Picks</Link>
 </div>
 <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
 <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🔋</div>
 <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Power Bank</h4>
 <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Long travel days.</p>
 <Link href="/world-cup-2026-packing-guide" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">See Picks</Link>
 </div>
 </div>
 </section>

 {/* Section 7: FAQ */}
 <section id="faq" className="scroll-mt-32">
 <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 tracking-tight">Frequently Asked Questions</h2>
 <div className="space-y-2">
 <AccordionItem 
 question="Should I rent a car for Group C?"
 answer={<>For the Northeast (Boston, NYC, Philly), <strong>absolutely not</strong>. Parking is expensive and traffic is a nightmare. Use trains. For Atlanta and Miami, a car is helpful, but Uber/Lyft is often less stressful if you are just going to stadiums and tourist spots.</>}
 isOpen={openFaqIndex === 0}
 onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
 />
 <AccordionItem 
 question="Which city has the best stadium atmosphere?"
 answer={<><strong>Philadelphia</strong> fans are legendary for their intensity. <strong>Atlanta's</strong> Mercedes-Benz Stadium is an architectural marvel with incredible acoustics. Both will be electric.</>}
 isOpen={openFaqIndex === 1}
 onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
 />
 <AccordionItem 
 question="How far apart are the cities?"
 answer={<>Boston to NYC is 4 hours by train. NYC to Philly is 1.5 hours. But Philly to Atlanta is a 2-hour flight, and Atlanta to Miami is another 2-hour flight. Plan accordingly.</>}
 isOpen={openFaqIndex === 2}
 onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
 />
 <AccordionItem 
 question="Is Miami safe for tourists?"
 answer={<>South Beach and major tourist areas are generally safe. However, exercise caution in some mainland neighborhoods. Stick to well-lit areas and use rideshare apps at night.</>}
 isOpen={openFaqIndex === 3}
 onClick={() => setOpenFaqIndex(openFaqIndex === 3 ? null : 3)}
 />
 </div>
 </section>

 {/* Final CTA */}
 <div className="relative overflow-hidden rounded-[3rem] text-slate-900 dark:text-white p-12 md:p-20 text-center shadow-2xl shadow-slate-900/20">
 <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-slate-900 to-slate-900"></div>
 <div className="relative z-10 max-w-3xl mx-auto">
 <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to Tackle the East Coast?</h2>
 <p className="text-slate-600 dark:text-slate-300 mb-12 text-lg leading-relaxed font-light">
 From the historic north to the tropical south, Group C is a journey of contrasts. Start planning your logistics now.
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







