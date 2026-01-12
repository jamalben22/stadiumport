'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  Car,
  Globe,
  Ticket,
  Users,
  Shield
} from 'lucide-react';
import { GROUPS, TEAM_MAP, type Team } from '@/data/teams';

function AccordionItem({ question, answer, isOpen, onClick }: { question: string, answer: React.ReactNode, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-200 dark:border-slate-800 last:border-0">
      <button 
        onClick={onClick} 
        className="w-full py-6 flex items-center justify-between text-left group focus:outline-none"
      >
        <span className="text-lg md:text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors pr-8 tracking-tight">
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isOpen ? 'bg-indigo-500 text-slate-900 dark:text-white rotate-180' : ' text-slate-500 group-hover:bg-indigo-500/10 group-hover:text-indigo-600'}`}>
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

export default function GroupKClientPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState('intro');

  const AffiliateButton = ({ href, text, icon: Icon = ArrowRight, variant = 'primary' }: { href: string, text: string, icon?: any, variant?: 'primary' | 'secondary' | 'outline' }) => {
    const baseClasses = "group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden";
    const variants = {
      primary: "bg-indigo-600 text-slate-900 dark:text-white hover:bg-indigo-500 shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(79,70,229,0.6)]",
      secondary: "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xl",
      outline: "border-2 border-slate-200 dark:border-white/10 hover:border-indigo-500 dark:hover:border-indigo-500 text-slate-900 dark:text-white bg-transparent"
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

  const groupTeams = (GROUPS.K ?? []).map((teamId) => TEAM_MAP.get(teamId)).filter((team): team is Team => Boolean(team));

  const teamSpotlight: Record<string, { headline: string; blurb: string; history: string; style: string; stars: string; travelAngle: string; fanAngle: string }> = {
    por: {
      headline: 'The Global Draw',
      blurb: 'Portugal travels with expectation, star power, and a fanbase that fills airports early.',
      history: 'A modern heavyweight with deep tournament experience and a global following that turns neutral cities into “home-ish” nights.',
      style: 'Technical, possession-capable, and ruthless when transitions open. They tend to control rhythm and punish mistakes.',
      stars: 'Bruno Fernandes, Bernardo Silva, Rafael Leão (watch for the final squad list as the tournament approaches).',
      travelAngle: 'If you can only lock one city early, lock Mexico City (for the altitude + opener energy) and Atlanta (for the best airport hub).',
      fanAngle: 'Look for Portuguese community pockets and Champions League-style pub culture near the urban core.'
    },
    col: {
      headline: 'The Party Engine',
      blurb: 'Colombia brings drums, color, and a very real “we travel” culture. Hotels spike when they arrive.',
      history: 'Colombia’s World Cup peaks are legendary and their traveling support is among the most vibrant you’ll encounter in the tournament.',
      style: 'Rhythm + intensity: quick combinations, wide attacks, and moments of individual flair that can flip a match instantly.',
      stars: 'Luis Díaz, James Rodríguez (if selected), plus a deep pool of Europe-based talent.',
      travelAngle: 'Miami is the cleanest gateway from South America. Price your trip as two hubs: MIA + ATL.',
      fanAngle: 'Expect the loudest street energy around Latin neighborhoods and fan festivals.'
    },
    uzb: {
      headline: 'The Wild Card',
      blurb: 'Uzbekistan’s rise changes the vibe: passionate, proud, and a fanbase that treats every match like history.',
      history: 'A fast-growing football nation whose traveling fans show up for milestone moments—and treat group matches like finals.',
      style: 'Organized and direct: compact defending, quick counters, and set-piece focus when games tighten.',
      stars: 'Eldor Shomurodov and the new wave of young creative midfielders coming through.',
      travelAngle: 'Plan for longer flight legs and connections. Book the MEX ↔ US crossing first—everything else can be optimized later.',
      fanAngle: 'You’ll see more organized meetups (supporter groups) than random walk-in crowds.'
    },
    po1: {
      headline: 'The Unknown Variable',
      blurb: 'Play-off 1 is the scheduling grenade. You won’t know the fan demand curve until late.',
      history: 'A play-off slot can be anything from a massive traveling nation to a first-timer. Plan for demand swings either way.',
      style: 'Unknown until confirmed. Expect tactical flexibility and high emotion—play-off teams arrive battle-tested.',
      stars: 'TBD. Once confirmed, prioritize this team’s diaspora and booking behavior in each city.',
      travelAngle: 'Use refundable hotels and keep your inter-city flights flexible (change-fee friendly) until the play-off resolves.',
      fanAngle: 'Wait for official supporters club posts—then pick your meetup base for each city.'
    }
  };

  const schedule = [
    { matchday: 1, date: 'June 16, 2026', time: '8:00 PM CT', city: 'Houston', stadium: 'NRG Stadium', fixture: 'Colombia vs PO 1' },
    { matchday: 1, date: 'June 17, 2026', time: '6:00 PM CT', city: 'Mexico City', stadium: 'Estadio Azteca', fixture: 'Portugal vs Uzbekistan' },
    { matchday: 2, date: 'June 22, 2026', time: '9:00 PM ET', city: 'Atlanta', stadium: 'Mercedes-Benz Stadium', fixture: 'Portugal vs Colombia' },
    { matchday: 2, date: 'June 23, 2026', time: '3:00 PM ET', city: 'Miami Gardens', stadium: 'Hard Rock Stadium', fixture: 'Uzbekistan vs PO 1' },
    { matchday: 3, date: 'June 27, 2026', time: '6:00 PM CT', city: 'Houston', stadium: 'NRG Stadium', fixture: 'Portugal vs PO 1' },
    { matchday: 3, date: 'June 27, 2026', time: '8:00 PM CT', city: 'Mexico City', stadium: 'Estadio Azteca', fixture: 'Colombia vs Uzbekistan' }
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
      const sections = ['intro', 'teams', 'schedule', 'strategy', 'cities', 'tickets', 'accommodation', 'timeline', 'fan', 'budget', 'visas', 'insider', 'packing', 'faq'];
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
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0A0A0A] font-sans text-slate-900 dark:text-slate-100 selection:bg-indigo-500/30">
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-[#F5F5F7] to-[#F5F5F7] dark:from-indigo-900/20 dark:via-[#0A0A0A] dark:to-[#0A0A0A]" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F5F7] dark:from-[#0A0A0A] to-transparent" />

          <div className="container mx-auto max-w-7xl relative z-10">
           <Breadcrumb items={[{ label: 'Groups', href: '/world-cup-2026-groups' }, { label: 'Group K', href: '/world-cup-2026-groups/group-k' }]} />

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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300">Group K Strategy</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal mb-10 animate-fade-up delay-100">
                Four cities. Two nations. One tropical furnace. From the historic heights of Mexico City to the neon-lit humidity of Miami, Group K is the tournament's most culturally vibrant crossing.
              </p>

              <div className="flex flex-wrap items-center gap-8 text-xs font-semibold text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-8 animate-fade-up delay-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-500" /> 
                  13 min read
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-[10px] text-white dark:text-slate-900 font-bold">S</div>
                  By stadiumport Strategy Team
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:flex flex-col items-center gap-2 cursor-pointer z-20" onClick={() => scrollToSection('teams')}>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Explore</span>
            <ChevronDown className="w-5 h-5 text-indigo-500" />
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
                    { id: 'schedule', label: 'Schedule & Venues' },
                    { id: 'strategy', label: 'Travel Strategy' },
                    { id: 'cities', label: 'Host Cities' },
                    { id: 'tickets', label: 'Tickets & Travel' },
                    { id: 'accommodation', label: 'Accommodation' },
                    { id: 'timeline', label: 'Planning Timeline' },
                    { id: 'fan', label: 'Fan Experience' },
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
                          ? 'border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400' 
                          : 'border-transparent text-slate-400 hover:text-slate-900 dark:hover:white hover:border-slate-300 dark:hover:border-slate-700'
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
                    This is your <strong className="text-indigo-600 dark:text-indigo-400">FIFA World Cup 2026 Group K guide</strong>—built for fans who want the matches <em>and</em> the cities, without wasting a single travel day.
                  </p>
                  <p className="text-lg leading-loose text-slate-600 dark:text-slate-300 mb-10">
                    Group K is split between the <strong className="text-slate-900 dark:text-white">Highland History</strong> of Mexico City and the <strong className="text-slate-900 dark:text-white">Gulf Coast Hubs</strong> of Houston, Atlanta, and Miami. It’s altitude, humidity, and four airports that never sleep.
                    If you plan it right, you get cathedral football at Estadio Azteca, BBQ and tailgates in Texas, a MARTA-perfect matchday in Atlanta, and Miami’s neon energy at the finish line.
                  </p>
                </div>

                <div className=" p-10 rounded-[2rem] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-200 dark:border-slate-800 mt-12">
                  <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-6 flex items-center gap-3 tracking-tight uppercase">
                    <Plane className="w-5 h-5" />
                    The Group K "Southern Crossing"
                  </h3>
                  <p className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
                    Mexico City ✈️ Houston ✈️ Atlanta ✈️ Miami
                  </p>
                  <p className="text-base text-slate-500 dark:text-slate-400">
                    Forget driving. International borders and massive distances make flying mandatory. This group centers on four of North America's largest aviation hubs.
                  </p>
                </div>
              </section>

              <section id="teams" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-indigo-500 font-mono text-sm font-bold tracking-widest uppercase">01</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Teams To Plan Around</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-12 max-w-3xl">
                  Group K (as modeled in our 2026 projections) features Portugal, Colombia, Uzbekistan, and a Play-off 1 placeholder. The football matters, but the travel signal matters more: which fanbases move in waves, which ones book late, and which matchups turn a “normal” hotel weekend into surge pricing.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {groupTeams.map((team) => {
                    const spotlight = teamSpotlight[team.id] ?? {
                      headline: 'The Unknown',
                      blurb: 'A team that can change the demand curve depending on the draw.',
                      history: 'Travel demand depends on who qualifies and how their fans move.',
                      style: 'TBD.',
                      stars: 'TBD.',
                      travelAngle: 'Book refundable and stay flexible.',
                      fanAngle: 'Follow official supporter group channels for meetups.'
                    };

                    return (
                      <div key={team.id} className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between gap-6 mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">{team.name}</h3>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                              {spotlight.headline}
                            </div>
                          </div>
                          <div className="w-12 h-8 rounded shadow-sm overflow-hidden flex items-center justify-center relative bg-slate-100 dark:bg-slate-800">
                            {team.flagUrl ? (
                              <OptimizedImage
                                src={team.flagUrl}
                                alt={`${team.name} flag`}
                                fill
                                imgClassName="object-cover"
                              />
                            ) : (
                              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200 tracking-tighter uppercase">FIFA</span>
                            )}
                          </div>
                        </div>

                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                          {spotlight.blurb}
                        </p>

                        <div className="space-y-4">
                          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">History</div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{spotlight.history}</p>
                          </div>
                          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Playing Style</div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{spotlight.style}</p>
                          </div>
                          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Star Watch</div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{spotlight.stars}</p>
                          </div>
                          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Travel Angle</div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{spotlight.travelAngle}</p>
                          </div>
                          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Fan Culture</div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{spotlight.fanAngle}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-12 flex flex-wrap gap-4">
                  <AffiliateButton href="/world-cup-2026-mexico-city-guide" text="Mexico City Match-Day Guide" variant="outline" />
                  <AffiliateButton href="/world-cup-2026-houston-guide" text="Houston Match-Day Guide" variant="outline" />
                  <AffiliateButton href="/world-cup-2026-atlanta-guide" text="Atlanta Match-Day Guide" variant="outline" />
                  <AffiliateButton href="/world-cup-2026-miami-guide" text="Miami Match-Day Guide" variant="outline" />
                </div>
              </section>

              <section id="schedule" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-indigo-500 font-mono text-sm font-bold tracking-widest uppercase">02</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Match Schedule & Venues</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-10 max-w-3xl">
                  Group-stage travel is won on two details: kickoff time and stadium location. Use this table to decide where you sleep, when you fly, and which legs deserve refundable bookings.
                </p>

                <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Matchday</th>
                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Fixture</th>
                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Date</th>
                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Time</th>
                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Venue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {schedule.map((m, idx) => (
                        <tr key={`${m.fixture}-${idx}`}>
                          <td className="p-6 font-bold text-indigo-600 dark:text-indigo-400">{m.matchday}</td>
                          <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">{m.fixture}</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">{m.date}</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">{m.time}</td>
                          <td className="p-6 text-slate-700 dark:text-slate-300 text-sm">
                            <div className="font-bold">{m.stadium}</div>
                            <div className="text-slate-500">{m.city}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-12 grid md:grid-cols-2 gap-6">
                  <div className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-indigo-500" />
                      Stadium Reality Check
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      Mexico City is altitude + traffic. Miami is distance + congestion. Houston is car-forward but has a rail spine. Atlanta is the cheat code: airport + rail + walkable downtown core.
                    </p>
                  </div>
                  <div className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-indigo-500" />
                      Schedule Flex
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      Kickoff times drive flight choices. If you’re stitching multiple cities, avoid morning departures after late matches—fatigue is the silent budget killer.
                    </p>
                  </div>
                </div>

                <div className="mt-12 grid md:grid-cols-2 gap-6">
                  <div className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Estadio Azteca (Mexico City)</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      The legend venue. Your real opponent is traffic + altitude. Plan an early departure window, then treat the pre-game hours as part of the experience.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <AffiliateButton href="/estadio-azteca-world-cup-2026" text="Azteca Logistics" variant="outline" />
                      <AffiliateButton href="/world-cup-2026-mexico-city-guide" text="CDMX Stay Areas" variant="outline" />
                    </div>
                  </div>
                  <div className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">NRG Stadium (Houston)</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      Climate-controlled comfort, but a sprawling city. The METRORail Red Line is your friend on match days—stay near it and you’ll save money and time.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <AffiliateButton href="/nrg-stadium-world-cup-2026" text="NRG Matchday Plan" variant="outline" />
                      <AffiliateButton href="/world-cup-2026-houston-guide" text="Houston Stay Areas" variant="outline" />
                    </div>
                  </div>
                  <div className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Mercedes-Benz Stadium (Atlanta)</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      The easiest “big-city stadium” in Group K. Downtown and Midtown bases plus MARTA rail access make Atlanta the low-stress play.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <AffiliateButton href="/mercedes-benz-stadium-world-cup-2026" text="MBS Logistics" variant="outline" />
                      <AffiliateButton href="/world-cup-2026-atlanta-guide" text="Atlanta Stay Areas" variant="outline" />
                    </div>
                  </div>
                  <div className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Hard Rock Stadium (Miami)</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      Miami’s matchday trap is distance. Hard Rock is in Miami Gardens, so choose your base with commute reality in mind—or pivot to Fort Lauderdale.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <AffiliateButton href="/hard-rock-stadium-world-cup-2026" text="Hard Rock Logistics" variant="outline" />
                      <AffiliateButton href="/world-cup-2026-miami-guide" text="Miami Stay Areas" variant="outline" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 1: Multi-City Travel Strategy */}
              <section id="strategy" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-indigo-500 font-mono text-sm font-bold tracking-widest uppercase">03</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Multi-City Travel Strategy</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-12 max-w-3xl">
                  Group K has an international footprint. You will be moving between different climates, currencies, and entry requirements within 12 days.
                </p>

                <div className="mb-16">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">The "Hub to Hub" Strategy</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-3xl">
                    Do not attempt to drive between Mexico City and the US cities. Use the massive hub infrastructure of Aeromexico, United, and Delta.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className=" p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
                      <Plane className="w-8 h-8 text-indigo-500 mb-6" />
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Aviation Hubs</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">ATL and MIA are major international gateways. Book multi-city loops.</p>
                      <span className="inline-block px-3 py-1 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-full">$600-900 USD Total</span>
                    </div>
                    <div className=" p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
                      <Car className="w-8 h-8 text-indigo-500 mb-6" />
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Rental Cars</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Mandatory for Houston and Miami. Public transit is limited.</p>
                      <span className="inline-block px-3 py-1 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-full">$70-130 USD / Day</span>
                    </div>
                    <div className=" p-8 rounded-3xl border border-transparent dark:border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 text-slate-400 mb-6 flex items-center justify-center font-bold border-2 border-slate-300 rounded-full text-[10px]">RAIL</div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">MARTA (Atlanta)</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">The only city in Group K with direct rail to the stadium gates.</p>
                      <span className="inline-block px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full">$2.50 USD</span>
                    </div>
                  </div>
                </div>

                <div className="mb-16">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">The "Southern Triangle" Flights</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-3xl">
                    International flights from Mexico City (MEX) to US hubs will be in extremely high demand. Book these first.
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
                          <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Mexico City (MEX) → Houston (IAH)</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">2h 15m</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">5 Months Out</td>
                          <td className="p-6 font-bold text-indigo-600 dark:text-indigo-400 text-base">$180 - $350</td>
                        </tr>
                        <tr>
                          <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Houston (IAH) → Atlanta (ATL)</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">2h 05m</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">3 Months Out</td>
                          <td className="p-6 font-bold text-indigo-600 dark:text-indigo-400 text-base">$120 - $220</td>
                        </tr>
                        <tr>
                          <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Atlanta (ATL) → Miami (MIA)</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">1h 55m</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">2 Months Out</td>
                          <td className="p-6 font-bold text-indigo-600 dark:text-indigo-400 text-base">$100 - $180</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Affiliate Block: Flights */}
                  <div className="mt-12 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                          <Plane className="w-5 h-5 text-indigo-500" />
                          Book Your Southern Crossing
                        </h4>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Direct international flights between MEX and US hubs fill up fast.</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <AffiliateButton 
                        href="https://skyscanner.com" 
                        text="Search Flight Hubs" 
                        icon={ArrowRight}
                        variant="primary"
                      />
                      <AffiliateButton 
                        href="https://expedia.com" 
                        text="Compare Car Rentals" 
                        icon={Car}
                        variant="outline"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-4 text-center uppercase tracking-widest font-medium">We may earn a commission on bookings made through these links.</p>
                  </div>
                </div>
              </section>

              <section id="cities" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-indigo-500 font-mono text-sm font-bold tracking-widest uppercase">04</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Host Cities Deep Dive</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-12 max-w-3xl">
                  The goal isn’t “see everything.” It’s “live in the right neighborhood, reach the stadium without panic, and make the time between matches feel like the trip you dreamed about.” These are the city choices that actually move the needle for Group K.
                </p>

                <div className="grid grid-cols-1 gap-8">
                  <div className="p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                      <div>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">Mexico City (CDMX)</h3>
                        <p className="text-slate-600 dark:text-slate-300">Altitude, art, tacos at 2am, and the gravity of Estadio Azteca.</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <AffiliateButton href="/world-cup-2026-mexico-city-guide" text="Full CDMX Guide" variant="outline" />
                        <AffiliateButton href="/estadio-azteca-world-cup-2026" text="Estadio Azteca Guide" variant="outline" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-3">Best Neighborhoods To Stay</h4>
                        <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                          <li><strong>Condesa / Roma Norte:</strong> walkable, café culture, easy rideshare, nightlife without being chaotic.</li>
                          <li><strong>Polanco:</strong> premium hotels, top dining, polished vibe, higher prices.</li>
                          <li><strong>Centro Histórico:</strong> iconic sights, great value, louder at night—choose carefully.</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-3">Getting Around</h4>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          Plan matchday like a major concert: leave early, use official taxis or rideshare, and avoid flashing valuables in crowded transit. CDMX traffic can turn a 25-minute trip into 75 minutes with no warning.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 grid md:grid-cols-3 gap-6">
                      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Culture</div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          Museo Frida Kahlo, Chapultepec Park, and the museum density that makes “one more stop” accidentally become a full day.
                        </p>
                      </div>
                      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Food</div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          Street tacos are not a compromise here—they’re the point. Eat where lines exist, pay cash, and keep your stomach calm by hydrating early.
                        </p>
                      </div>
                      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Safety & Customs</div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          Be street-smart, not fearful. Use cross-body bags, split your cards, and treat late-night transit like you would in any massive global city.
                        </p>
                      </div>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-4 justify-center">
                      <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Condesa%2C%20Mexico%20City" text="Book Condesa Hotels" variant="primary" />
                      <AffiliateButton href="https://www.viator.com/Mexico-City/d628-ttd" text="Browse CDMX Tours" variant="outline" />
                    </div>
                  </div>

                  <div className="p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                      <div>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">Houston</h3>
                        <p className="text-slate-600 dark:text-slate-300">Big distances, bigger portions, and matchday that rewards planning.</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <AffiliateButton href="/world-cup-2026-houston-guide" text="Full Houston Guide" variant="outline" />
                        <AffiliateButton href="/nrg-stadium-world-cup-2026" text="NRG Stadium Guide" variant="outline" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-3">Best Neighborhoods To Stay</h4>
                        <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                          <li><strong>Downtown / Midtown:</strong> city access, bars, easiest rideshare logic.</li>
                          <li><strong>Texas Medical Center:</strong> practical, closer to NRG Park, usually good hotel inventory.</li>
                          <li><strong>Montrose:</strong> character, food, nightlife; accept a longer stadium trip.</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-3">Getting Around</h4>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          Houston is car-forward, but it has one travel spine that matters for the World Cup: METRORail’s Red Line. If you stay near it, you can skip the worst of matchday traffic and surge pricing.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 grid md:grid-cols-3 gap-6">
                      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Culture</div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          NASA is the obvious day trip. The surprise win is the museum district when you need a recovery day between flights.
                        </p>
                      </div>
                      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Food</div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          BBQ isn’t just a meal—it’s a cultural event. Go early, accept lines, and don’t schedule “quick lunch” before a match.
                        </p>
                      </div>
                      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Safety & Customs</div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          Heat is the real risk. Hydrate aggressively and treat outdoor fan zones like a workout—shade, water, and breaks.
                        </p>
                      </div>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-4 justify-center">
                      <AffiliateButton href="https://www.booking.com/city/us/houston.html" text="Search Houston Hotels" variant="primary" />
                      <AffiliateButton href="https://www.viator.com/Houston/d5186-ttd" text="Browse Houston Tours" variant="outline" />
                    </div>
                  </div>

                  <div className="p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                      <div>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">Atlanta</h3>
                        <p className="text-slate-600 dark:text-slate-300">The logistics MVP: airport hub + rail access + a stadium you can actually reach.</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <AffiliateButton href="/world-cup-2026-atlanta-guide" text="Full Atlanta Guide" variant="outline" />
                        <AffiliateButton href="/mercedes-benz-stadium-world-cup-2026" text="Mercedes-Benz Stadium Guide" variant="outline" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-3">Best Neighborhoods To Stay</h4>
                        <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                          <li><strong>Downtown:</strong> match convenience, walkable to major attractions, business-hotel heavy.</li>
                          <li><strong>Midtown:</strong> better “city feel,” dining, and easy MARTA access.</li>
                          <li><strong>Old Fourth Ward:</strong> trendier base if you want BeltLine energy between matches.</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-3">Getting Around</h4>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          MARTA is the big win: airport → downtown is clean and predictable. That matters when you’re landing, dropping bags, and trying to make a kickoff window without stress.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 grid md:grid-cols-3 gap-6">
                      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Culture</div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          Civil Rights history, big aquarium energy, and a city that feels like a hub because it literally is.
                        </p>
                      </div>
                      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Food</div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          Atlanta punches above its weight. If you like “one good meal per city,” make it here.
                        </p>
                      </div>
                      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Nightlife</div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          Midtown and the BeltLine are the most reliable “post-match” options when you want energy without chaos.
                        </p>
                      </div>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-4 justify-center">
                      <AffiliateButton href="https://www.booking.com/city/us/atlanta.html?aid=8063172" text="Search Atlanta Hotels" variant="primary" />
                      <AffiliateButton href="https://www.viator.com/Atlanta/d784-ttd" text="Browse Atlanta Tours" variant="outline" />
                    </div>
                  </div>

                  <div className="p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
                      <div>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">Miami</h3>
                        <p className="text-slate-600 dark:text-slate-300">Beach city prices with stadium logistics that punish indecision.</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <AffiliateButton href="/world-cup-2026-miami-guide" text="Full Miami Guide" variant="outline" />
                        <AffiliateButton href="/hard-rock-stadium-world-cup-2026" text="Hard Rock Stadium Guide" variant="outline" />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-3">Best Neighborhoods To Stay</h4>
                        <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                          <li><strong>Brickell / Downtown:</strong> best “base” for transit options and city access.</li>
                          <li><strong>Miami Beach:</strong> iconic, expensive, and farther from the stadium than most people expect.</li>
                          <li><strong>Fort Lauderdale / Hollywood:</strong> the pro move for Hard Rock access without South Beach pricing.</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-3">Getting Around</h4>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                          Build your plan around distance. Hard Rock Stadium is in Miami Gardens. If you’re staying “for the vibe” in South Beach, accept that matchday becomes a long, expensive commute.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 grid md:grid-cols-3 gap-6">
                      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Culture</div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          Art Deco, Wynwood murals, and Latin America’s energy concentrated into one humid coastline.
                        </p>
                      </div>
                      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Food</div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          Cuban cafés for fuel, seafood for the “we’re on vacation” nights, and endless late-night options if you plan your ride home.
                        </p>
                      </div>
                      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Safety & Customs</div>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          Miami is fun, not forgiving. Keep valuables simple, don’t leave anything visible in cars, and assume surge pricing after every match.
                        </p>
                      </div>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-4 justify-center">
                      <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Fort%20Lauderdale" text="Search Fort Lauderdale Hotels" variant="primary" />
                      <AffiliateButton href="https://www.viator.com/Miami/d662-ttd" text="Browse Miami Tours" variant="outline" />
                    </div>
                  </div>
                </div>
              </section>

              <section id="tickets" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-indigo-500 font-mono text-sm font-bold tracking-widest uppercase">05</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Ticket & Travel Logistics</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                      <Ticket className="w-6 h-6 text-indigo-500" />
                      Tickets: The Only Safe Rule
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      Buy through official FIFA channels and treat unofficial resale like a scam until proven otherwise. The World Cup is a magnet for fake PDFs, cloned QR codes, and “too good to be true” DMs.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <AffiliateButton href="https://www.fifa.com/tickets" text="FIFA Ticket Portal" variant="primary" icon={Ticket} />
                      <AffiliateButton href="/world-cup-2026-match-selection-strategy" text="Match Selection Strategy" variant="outline" />
                      <AffiliateButton href="/world-cup-2026-scams-avoid-fraud" text="Avoid Ticket Scams" variant="outline" />
                    </div>
                  </div>

                  <div className="p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                      <Plane className="w-6 h-6 text-indigo-500" />
                      Flights: Build The Loop
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      Think in loops, not one-way chaos. Your best cost control is booking an open-jaw itinerary (arrive one city, depart another) and building the middle legs as a hub-to-hub chain.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <AffiliateButton href="/world-cup-2026-flight-booking-guide" text="Flight Booking Guide" variant="outline" />
                      <AffiliateButton href="https://www.skyscanner.com" text="Set Flight Alerts" variant="primary" icon={Plane} />
                      <AffiliateButton href="https://www.worldnomads.com/" text="Protect Your Trip" variant="secondary" icon={Shield} />
                    </div>
                  </div>
                </div>

                <div className="mt-10 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                    <Globe className="w-6 h-6 text-indigo-500" />
                    Cross-Border Checklist (Mexico ↔ USA)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4 text-slate-600 dark:text-slate-300">
                      <p><strong>Buffer time:</strong> treat every Mexico ↔ USA leg like an international flight day (arrive early, expect lines).</p>
                      <p><strong>Documents:</strong> passport validity + entry requirements matter more than your seat assignment.</p>
                      <p><strong>Connectivity:</strong> roaming surprises are a real budget leak; plan your data before you land.</p>
                    </div>
                    <div className="flex flex-wrap gap-4 items-start">
                      <AffiliateButton href="/border-crossing-usa-canada-mexico-world-cup-2026" text="Border Crossing Guide" variant="outline" />
                      <AffiliateButton href="/world-cup-2026-connectivity-sim-cards-emergency-communications" text="SIM & Connectivity" variant="outline" />
                      <AffiliateButton href="https://airalo.tp.st/yF9Qk3Ol" text="Get Airalo eSIM" variant="secondary" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Accommodation Strategy */}
              <section id="accommodation" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-indigo-500 font-mono text-sm font-bold tracking-widest uppercase">06</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Accommodation Strategy</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-loose max-w-3xl">
                  Hotel strategy wins Group K. Mexico City can be excellent value. Miami can destroy your budget. Houston and Atlanta reward picking the right corridor over picking the “nicest” place. If you’re unsure, prioritize: (1) transit, (2) safety, (3) walking food options.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mexico City */}
                  <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-900/5">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Mexico City</h3>
                      <span className="px-3 py-1 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Best Value</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Book 8 Months Out</p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                        <span><strong>Best Area:</strong> Polanco or Condesa (Safe, upscale, food-focused)</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                        <span><strong>Stadium Access:</strong> Use Uber or official Taxis. Do not use the Metro to Azteca with valuables.</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                        <span><strong>Price Range:</strong> $25–$60 hostels, $110–$220 mid-range, $300+ luxury.</span>
                      </li>
                    </ul>
                    <AffiliateButton 
                      href="https://www.booking.com/searchresults.html?ss=Mexico%20City" 
                      text="Search CDMX Hotels" 
                      variant="outline"
                    />
                  </div>

                  {/* Miami */}
                  <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-900/5">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Miami</h3>
                      <span className="px-3 py-1 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">High Demand</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Book 10 Months Out</p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                        <span><strong>Best Area:</strong> Brickell (Central) or Fort Lauderdale (Easier stadium access)</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></div>
                        <span><strong>Warning:</strong> Hard Rock Stadium is 15 miles north of Downtown. Traffic is brutal.</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                        <span><strong>Price Range:</strong> $55–$90 hostels, $220–$450 mid-range, $650+ luxury (match weeks surge).</span>
                      </li>
                    </ul>
                    <AffiliateButton 
                      href="https://www.booking.com/searchresults.html?ss=Miami" 
                      text="Search Miami Hotels" 
                      variant="outline"
                    />
                  </div>

                  {/* Houston */}
                  <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-900/5">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Houston</h3>
                      <span className="px-3 py-1 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Space City</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Book 6 Months Out</p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                        <span><strong>Best Area:</strong> Downtown or Medical Center (Direct Light Rail to stadium)</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                        <span><strong>Note:</strong> Houston is massive. Stay near the METRORail to avoid $100 match-day Ubers.</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                        <span><strong>Price Range:</strong> $120–$220 mid-range, $300+ premium. Value is strongest outside the core.</span>
                      </li>
                    </ul>
                    <AffiliateButton href="https://www.booking.com/city/us/houston.html" text="Search Houston Hotels" variant="outline" />
                  </div>

                  {/* Pro Move */}
                  <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-900/5">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">The Fort Lauderdale Pivot</h3>
                      <span className="px-3 py-1 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Pro Move</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">The Miami Hack</p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                        <span><strong>Why:</strong> Fort Lauderdale is closer to Hard Rock Stadium than South Beach is.</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></div>
                        <span><strong>Access:</strong> Use the Brightline train for high-speed luxury travel between cities.</span>
                      </li>
                    </ul>
                    <AffiliateButton href="https://www.booking.com/searchresults.html?ss=Fort%20Lauderdale" text="Search Fort Lauderdale" variant="outline" />
                  </div>
                </div>
              </section>

              <section id="timeline" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-indigo-500 font-mono text-sm font-bold tracking-widest uppercase">07</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Travel Planning Timeline</h2>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      time: '9–12 Months Out',
                      desc: 'Create your city baseline (which 2–3 matches you’ll prioritize). Book refundable hotels in Miami and Mexico City first—those are your most volatile pricing markets.'
                    },
                    {
                      time: '6–9 Months Out',
                      desc: 'Lock international flights and your cross-border legs. If you only do one “serious” travel task early, do this one.'
                    },
                    {
                      time: '3–6 Months Out',
                      desc: 'Confirm tickets, tighten your stadium transport plan, and decide if you’re renting cars in Houston/Miami or using a rail/rideshare hybrid.'
                    },
                    {
                      time: '1–3 Months Out',
                      desc: 'Set your daily rhythm: recovery days, sightseeing blocks, and the “no early flight after late match” rule. Buy a clear-stadium bag and finalize travel insurance.'
                    },
                    {
                      time: '2 Weeks Out',
                      desc: 'Download offline maps, set up eSIM, scan backups of documents, and build a simple packing system that keeps passports and cards separated.'
                    }
                  ].map((item) => (
                    <div key={item.time} className="flex flex-col md:flex-row gap-6 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                      <div className="shrink-0 w-48 font-black text-2xl text-indigo-600 dark:text-indigo-400">{item.time}</div>
                      <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <AffiliateButton href="/world-cup-2026-accommodation-guide" text="Accommodation Master Plan" variant="outline" />
                  <AffiliateButton href="/world-cup-2026-stadium-safety" text="Stadium Safety Checklist" variant="outline" />
                  <AffiliateButton href="https://www.worldnomads.com/" text="Travel Insurance" variant="secondary" icon={Shield} />
                </div>
              </section>

              <section id="fan" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-indigo-500 font-mono text-sm font-bold tracking-widest uppercase">08</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Fan Experience Guide</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-10 max-w-3xl">
                  Group K’s best moments often happen away from the pitch: a packed bar when a late goal hits, a plaza that turns into a drumline, a tailgate where strangers adopt you. Here’s how to find the energy without chasing rumors.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  <div className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">How To Find Your People</h3>
                    <ul className="space-y-4 text-slate-600 dark:text-slate-300">
                      <li><strong>Start with official fan festivals:</strong> it’s the highest signal-to-noise place for real supporter groups.</li>
                      <li><strong>Use diaspora logic:</strong> Portuguese, Colombian, and broader Latin communities shape where watch parties happen.</li>
                      <li><strong>Follow matchday geography:</strong> pre-game hubs cluster near transit lines and walkable entertainment districts.</li>
                      <li><strong>Do not over-optimize:</strong> pick one meetup point, arrive early, and let the night find you.</li>
                    </ul>
                  </div>
                  <div className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">City-by-City Energy Map</h3>
                    <div className="space-y-4 text-slate-600 dark:text-slate-300">
                      <p><strong>Mexico City:</strong> Condesa/Roma for bar density; Centro for “big-city spectacle”; arrive early and keep your phone secure in crowds.</p>
                      <p><strong>Houston:</strong> tailgates near NRG Park are the culture; Midtown/Downtown for bars; use the rail spine to avoid surge traps.</p>
                      <p><strong>Atlanta:</strong> downtown sports-bar clusters + BeltLine nights; MARTA keeps you moving even when traffic collapses.</p>
                      <p><strong>Miami:</strong> Wynwood/Brickell for the “we’re on vacation” watch-party vibe; Fort Lauderdale is the matchday logistics cheat code.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <AffiliateButton href="/nightlife-after-hours-safety-world-cup-2026" text="Nightlife Safety Guide" variant="outline" />
                  <AffiliateButton href="/fan-zone-crowd-safety-world-cup-2026" text="Fan Zone Safety" variant="outline" />
                  <AffiliateButton href="https://www.viator.com" text="Browse City Experiences" variant="secondary" icon={Users} />
                  <AffiliateButton href="https://www.fanatics.com/soccer" text="Shop Jerseys & Gear" variant="secondary" />
                </div>
              </section>

              {/* Section 3: Budget Breakdown */}
              <section id="budget" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-indigo-500 font-mono text-sm font-bold tracking-widest uppercase">09</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Group K Budget Breakdown</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-loose">
                  Estimates are per person for a 12-day trip covering 3 group matches. Higher than Group C due to international flight legs and car requirements.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-16">
                  {/* Economy */}
                  <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:scale-[1.02] transition-transform duration-300">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Economy Strategy</div>
                    <div className="text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">$3,900</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">CDMX Hostels, budget airlines, street tacos/BBQ, car-pooling with other fans.</p>
                  </div>

                  {/* Mid-Range */}
                  <div className="p-8 rounded-3xl border border-indigo-100 dark:border-indigo-900 dark:bg-indigo-900/10 relative overflow-hidden transform md:-translate-y-4 shadow-xl shadow-indigo-900/5">
                    <div className="absolute top-0 right-0 bg-indigo-500 text-slate-900 dark:text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl uppercase tracking-widest">Recommended</div>
                    <div className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-widest mb-4">Mid-Range Strategy</div>
                    <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 tracking-tighter">$6,400</div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">4-star hotels in Condesa/Midtown, direct hub flights, Cat 2 tickets, rental car split.</p>
                  </div>

                  {/* Premium */}
                  <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:scale-[1.02] transition-transform duration-300">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Premium Experience</div>
                    <div className="text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">$11,500+</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Polanco/Brickell luxury suites, Business Class hub jumps, VIP Hospitality, private transport.</p>
                  </div>
                </div>

                <div className=" rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 tracking-tight">
                    <CreditCard className="w-6 h-6 text-indigo-500" />
                    Money-Saving Hacks for Group K
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs flex-shrink-0">1</div>
                      <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        <strong className="text-slate-900 dark:text-white font-bold">Eat the Street:</strong> In Mexico City, street food (tacos/tamales) is world-class and costs $1-2 per meal. This will offset the high cost of dining in Miami.
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs flex-shrink-0">2</div>
                      <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        <strong className="text-slate-900 dark:text-white font-bold">The ATL Hub Hack:</strong> Atlanta is the world's busiest airport. Use it as your base for flights to other cities to find the most competitive fares.
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs flex-shrink-0">3</div>
                      <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        <strong className="text-slate-900 dark:text-white font-bold">Brightline Savings:</strong> If traveling between Miami and other Florida cities, book Brightline in advance to avoid the extreme cost of match-day parking.
                      </p>
                    </li>
                  </ul>

                  {/* eSIM Affiliate */}
                  <div className="mt-10 flex items-center gap-6 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="w-12 h-12 rounded-xl dark:bg-slate-700 flex items-center justify-center text-2xl shadow-sm">📱</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">Stay Connected</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Get an Airalo eSIM for instant data in USA and Mexico.</p>
                    </div>
                    <a href="https://airalo.tp.st/yF9Qk3Ol" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-indigo-600 font-bold text-xs hover:text-indigo-500 transition-colors uppercase tracking-widest">View Plans &rarr;</a>
                  </div>
                </div>
              </section>

              {/* Section 4: Visa & Entry Requirements */}
              <section id="visas" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-indigo-500 font-mono text-sm font-bold tracking-widest uppercase">10</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Visa & Entry Requirements</h2>
                </div>

                <div className="grid md:grid-cols-1 gap-8">
                  <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
                    <h3 className="flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-200 dark:border-slate-800">
                      <Globe className="w-6 h-6 text-indigo-500" />
                      Cross-Border Entry
                    </h3>
                    <ul className="space-y-6">
                      <li className="text-sm text-slate-600 dark:text-slate-300">
                        <strong className="block text-slate-900 dark:text-white mb-1 font-bold">USA (ESTA/Visa)</strong>
                        Most international fans need an ESTA ($21) or a B1/B2 visa. Apply 6 months early if you need a visa interview.
                      </li>
                      <li className="text-sm text-slate-600 dark:text-slate-300">
                        <strong className="block text-slate-900 dark:text-white mb-1 font-bold">Mexico (FMM)</strong>
                        Many nationalities do not need a visa for tourism, but you must complete an FMM form upon arrival. Check current reciprocity rules.
                      </li>
                      <li className="text-sm text-slate-600 dark:text-slate-300">
                        <strong className="block text-red-600 dark:text-red-400 mb-1 font-bold">Important</strong>
                        You will be crossing an international border multiple times. Ensure your passport has at least 2 blank pages and 6 months validity.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <AffiliateButton href="https://esta.cbp.dhs.gov/" text="USA ESTA Portal" variant="outline" icon={ExternalLink} />
                  <AffiliateButton href="/border-crossing-usa-canada-mexico-world-cup-2026" text="Border Crossing Guide" variant="outline" />
                  <AffiliateButton href="https://www.worldnomads.com/" text="Travel Insurance" variant="secondary" icon={Shield} />
                </div>
              </section>

              {/* Section 5: Insider Tips */}
              <section id="insider" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-indigo-500 font-mono text-sm font-bold tracking-widest uppercase">11</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Insider Knowledge</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-xl mb-6">🏔️</div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">The Altitude Adjustment</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Mexico City is at 7,200ft (2,200m). You will get winded walking up stairs. Drink double the water and limit alcohol for the first 48 hours.
                    </p>
                  </div>

                  <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-xl mb-6">💦</div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">The Humidity Furnace</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Miami and Houston will be 90°F+ with 90% humidity. It feels like a steam room. While stadiums are AC, the fan zones are not. Dress accordingly.
                    </p>
                  </div>

                  <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-xl mb-6">🏟️</div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">Estadio Azteca Magic</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      This is the cathedral of football. Arrive 3 hours early. The traffic in CDMX is legendary—do not trust Google Maps' travel times on match day.
                    </p>
                  </div>

                  <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-xl mb-6">🍗</div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">Southern Hospitality</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Atlanta and Houston are the kings of BBQ and hospitality. Join a tailgate at NRG Stadium—it's a cultural requirement for the Texas experience.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6: Essential Gear */}
              <section id="packing" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-indigo-500 font-mono text-sm font-bold tracking-widest uppercase">12</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Group K Packing Essentials</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-indigo-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-900/5">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🥤</div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Hydration Tabs</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Essential for altitude and humidity.</p>
                    <a href="https://www.amazon.com/s?k=hydration+tablets" target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-[10px] font-bold uppercase tracking-widest hover:text-indigo-500 transition-colors">Shop Now</a>
                  </div>
                  <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-indigo-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-900/5">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🧴</div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">High-SPF Sunscreen</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">The tropical sun is intense.</p>
                    <a href="https://www.amazon.com/s?k=spf+50+sunscreen" target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-[10px] font-bold uppercase tracking-widest hover:text-indigo-500 transition-colors">Shop Now</a>
                  </div>
                  <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-indigo-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-900/5">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🌬️</div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Cooling Towels</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Survival gear for Houston fan zones.</p>
                    <a href="https://www.amazon.com/s?k=cooling+towel" target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-[10px] font-bold uppercase tracking-widest hover:text-indigo-500 transition-colors">Shop Now</a>
                  </div>
                  <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-indigo-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-900/5">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🔋</div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Power Bank</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Long international hub days.</p>
                    <a href="https://www.amazon.com/s?k=power+bank+20000mah" target="_blank" rel="noopener noreferrer" className="text-indigo-600 text-[10px] font-bold uppercase tracking-widest hover:text-indigo-500 transition-colors">Shop Now</a>
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <AffiliateButton href="/world-cup-2026-packing-guide" text="Complete Packing Guide" variant="outline" />
                  <AffiliateButton href="https://www.awaytravel.com" text="Upgrade Your Luggage" variant="outline" icon={ExternalLink} />
                </div>
              </section>

              {/* Section 7: FAQ */}
              <section id="faq" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-2">
                  <AccordionItem 
                    question="Do I need a car for Group K?"
                    answer={<>For <strong>Houston and Miami</strong>, yes. These cities are built for cars and stadiums are far from many hotel districts. For <strong>Mexico City</strong>, use Ubers or Taxis. In <strong>Atlanta</strong>, the MARTA rail is excellent for reaching the stadium from Midtown/Downtown.</>}
                    isOpen={openFaqIndex === 0}
                    onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
                  />
                  <AccordionItem 
                    question="Which city is the best base for Group K?"
                    answer={<><strong>Houston</strong> is the most central geographical point between MEX, ATL, and MIA. However, <strong>Atlanta</strong> offers the most robust flight connections to all other cities in the group, making it the most logical logistics hub.</>}
                    isOpen={openFaqIndex === 1}
                    onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
                  />
                  <AccordionItem 
                    question="How do I handle the cross-border travel?"
                    answer={<>Treat every move between Mexico City and the US as a full international flight. Arrive at the airport 3 hours early, have your visas/ESTA ready, and expect customs and immigration to take up to 60-90 minutes during the tournament.</>}
                    isOpen={openFaqIndex === 2}
                    onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
                  />
                  <AccordionItem 
                    question="Is it safe to follow the full Group K route?"
                    answer={<>Yes, it is safe, but it is <strong>physically demanding</strong>. You are dealing with altitude, extreme heat, and international borders. Plan for "recovery days" between match travel to stay healthy for the full 12-day period.</>}
                    isOpen={openFaqIndex === 3}
                    onClick={() => setOpenFaqIndex(openFaqIndex === 3 ? null : 3)}
                  />
                </div>
              </section>

              {/* Final CTA */}
              <div className="relative overflow-hidden rounded-[3rem] text-slate-900 dark:text-white p-12 md:p-20 text-center shadow-2xl shadow-slate-900/20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-slate-900 to-slate-900"></div>
                <div className="relative z-10 max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready for the Southern Crossing?</h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-12 text-lg leading-relaxed font-light">
                    From the historic peaks of Mexico City to the Gulf Coast energy, Group K is a journey across the heart of North America. Secure your logistics today.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <AffiliateButton href="/world-cup-2026-groups/group-h" text="Read Group H Guide" variant="outline" />
                    <AffiliateButton href="/world-cup-2026-groups/group-i" text="Read Group I Guide" variant="outline" />
                    <AffiliateButton href="/world-cup-2026-groups/group-j" text="Read Group J Guide" variant="outline" />
                    <AffiliateButton href="/world-cup-2026-groups/group-l" text="Read Group L Guide" variant="outline" />
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

