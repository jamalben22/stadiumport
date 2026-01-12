'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { 
  ChevronDown, 
  ArrowRight, 
  Plane, 
  CreditCard, 
  ExternalLink,
  ShieldCheck,
  Ticket,
  Hotel,
  MapPin,
  Calendar,
  Users,
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

export default function GroupHClientPage() {
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

  const navItems = [
    { id: 'intro', label: 'Overview' },
    { id: 'teams', label: 'Teams' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'strategy', label: 'Travel Strategy' },
    { id: 'cities', label: 'Host Cities' },
    { id: 'tickets', label: 'Tickets & Logistics' },
    { id: 'accommodation', label: 'Where to Stay' },
    { id: 'timeline', label: 'Planning Timeline' },
    { id: 'fan', label: 'Fan Experience' },
    { id: 'budget', label: 'Budget' },
    { id: 'visas', label: 'Entry Rules' },
    { id: 'insider', label: 'Insider Tips' },
    { id: 'packing', label: 'Packing' },
    { id: 'faq', label: 'FAQ' },
  ];

  const fixtures = [
    { date: 'Mon, Jun 15', time: '12:00 PM ET', match: 'Spain vs Cabo Verde', city: 'Atlanta', stadium: 'Atlanta Stadium', link: '/mercedes-benz-stadium-world-cup-2026' },
    { date: 'Mon, Jun 15', time: '6:00 PM ET', match: 'Saudi Arabia vs Uruguay', city: 'Miami', stadium: 'Miami Stadium', link: '/hard-rock-stadium-world-cup-2026' },
    { date: 'Sun, Jun 21', time: '12:00 PM ET', match: 'Spain vs Saudi Arabia', city: 'Atlanta', stadium: 'Atlanta Stadium', link: '/mercedes-benz-stadium-world-cup-2026' },
    { date: 'Sun, Jun 21', time: '6:00 PM ET', match: 'Uruguay vs Cabo Verde', city: 'Miami', stadium: 'Miami Stadium', link: '/hard-rock-stadium-world-cup-2026' },
    { date: 'Fri, Jun 26', time: '7:00 PM CT', match: 'Cabo Verde vs Saudi Arabia', city: 'Houston', stadium: 'Houston Stadium', link: '/nrg-stadium-world-cup-2026' },
    { date: 'Fri, Jun 26', time: '7:00 PM CT', match: 'Uruguay vs Spain', city: 'Guadalajara', stadium: 'Guadalajara Stadium', link: '/estadio-akron-world-cup-2026' },
  ];

  const groupTeams = [
    {
      name: 'Spain',
      vibe: 'Precision football, huge global fan footprint, and high-demand tickets.',
      travelTakeaways: [
        'Atlanta is the anchor: Spain plays there twice on Matchday 1 and 2.',
        'Expect strong neutral interest. Buy earlier for Atlanta lower bowls.',
        'Plan a separate Guadalajara leg if you want the “finale” match.',
      ],
      bestBases: ['Atlanta (Midtown/Downtown)', 'Guadalajara (Colonia Americana/Zapopan)'],
    },
    {
      name: 'Uruguay',
      vibe: 'A compact, intense fan culture that turns pregame into a parade.',
      travelTakeaways: [
        'Miami is the home base: Uruguay plays there twice.',
        'If you’re choosing one US city, Miami is the easiest Uruguay-first plan.',
        'Guadalajara is the high-stakes pivot for Uruguay vs Spain.',
      ],
      bestBases: ['Miami (Brickell/Downtown)', 'Miami (Hollywood/Fort Lauderdale value play)'],
    },
    {
      name: 'Saudi Arabia',
      vibe: 'Massive global attention, plenty of traveling fans, and late-night energy.',
      travelTakeaways: [
        'Miami opener is the hotspot: humidity + evening kickoff = long day.',
        'Houston is the budget-friendly match city for Matchday 3.',
        'Book flights early; Gulf carriers and US hubs fill up fast.',
      ],
      bestBases: ['Miami (Aventura/near stadium)', 'Houston (Museum District/Medical Center)'],
    },
    {
      name: 'Cabo Verde',
      vibe: 'A proud underdog story with diaspora support and a joyful matchday.',
      travelTakeaways: [
        'Atlanta opener is a great “neutral ticket” choice with high upside.',
        'Miami Matchday 2 can be the loudest surprise atmosphere of the group.',
        'Houston Matchday 3 is the value play for seats + hotels.',
      ],
      bestBases: ['Atlanta (Downtown for stadium walkability)', 'Miami (Downtown for transit flexibility)'],
    },
  ];

  const faqs = [
    {
      question: 'Can I attend both matches on the same matchday in Group H?',
      answer: (
        <>
          No. Group H plays two matches on <strong>June 15</strong> and two matches on <strong>June 21</strong> in different cities at the same kickoff window. Choose the match that matches your base city, then plan the other matchday around a different city.
        </>
      ),
    },
    {
      question: 'What is the easiest “Spain fan” itinerary?',
      answer: (
        <>
          Make <strong>Atlanta</strong> your anchor (Spain plays there twice), then add a <strong>Guadalajara</strong> leg for the final match. Treat ATL → GDL like a full international travel day and build buffer time for immigration and connection risk.
        </>
      ),
    },
    {
      question: 'What is the easiest “Uruguay fan” itinerary?',
      answer: (
        <>
          Base in <strong>Miami</strong> (Uruguay plays there twice), then fly to <strong>Guadalajara</strong> for Uruguay vs Spain. Miami is the best rest-and-recovery city between matchdays because you can stay put and focus on logistics.
        </>
      ),
    },
    {
      question: 'Which Group H stadium is most comfortable in summer?',
      answer: (
        <>
          <strong>Atlanta</strong> and <strong>Houston</strong> are the comfort plays: both stadiums are climate-controlled. <strong>Miami</strong> is open-air with significant shade coverage but still humid, so plan hydration and sun protection even if you feel fine indoors elsewhere.
        </>
      ),
    },
    {
      question: 'Do I need different entry rules for the USA and Mexico?',
      answer: (
        <>
          Yes. The <strong>USA</strong> and <strong>Mexico</strong> have separate entry requirements. Confirm your US ESTA/visa status and your Mexico entry rules (including tourist card requirements) early, especially if you’re planning tight same-day connections.
        </>
      ),
    },
    {
      question: 'What’s the biggest rookie mistake for Group H?',
      answer: (
        <>
          Treating Group H like a road trip. Distances are too large, matchdays are time-sensitive, and flight pricing surges fast. Lock flights first, then hotels.
        </>
      ),
    },
    {
      question: 'Is Atlanta or Miami the better base if I’m neutral?',
      answer: (
        <>
          Atlanta is the cleanest logistics base (ATL is the biggest hub in the region), while Miami is the best “vacation base.” Choose Atlanta for efficiency and flight flexibility; choose Miami for beach energy between matchdays.
        </>
      ),
    },
    {
      question: 'Should I buy travel insurance for Group H?',
      answer: (
        <>
          Yes, especially if you’re mixing US and Mexico legs. One cancellation, missed connection, or injury can wipe out your budget. Look for medical coverage plus trip interruption and flight disruption protection.
        </>
      ),
    },
    {
      question: 'How do I handle the June 26 double-header in two countries?',
      answer: (
        <>
          Choose your priority match. You cannot physically attend both. If you pick <strong>Guadalajara</strong>, arrive the day before and keep your schedule loose. If you pick <strong>Houston</strong>, stay in the US and avoid cross-border stress on the same matchday.
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#0A0A0A] font-sans text-slate-900 dark:text-slate-100 selection:bg-emerald-500/30">
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center pt-32 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-[#F5F5F7] to-[#F5F5F7] dark:from-emerald-900/20 dark:via-[#0A0A0A] dark:to-[#0A0A0A]" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F5F7] dark:from-[#0A0A0A] to-transparent" />

          <div className="container mx-auto max-w-7xl relative z-10">
          <Breadcrumb items={[{ label: 'Groups', href: '/world-cup-2026-groups' }, { label: 'Group H', href: '/world-cup-2026-groups/group-h' }]} />

          <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6 animate-fade-up">
                <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Last Updated: January 8, 2026
                </span>
                <span className="px-3 py-1 rounded-full border border-white/30 text-white/90 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
                  Group Strategy
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1] text-slate-900 dark:text-white animate-fade-up">
                World Cup 2026 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">Group H Strategy</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal mb-10 animate-fade-up delay-100">
                Four cities, two countries, and three matchdays that force hard choices: Atlanta, Miami, Houston, and a final pivot to Guadalajara.
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
                  {navItems.map((item) => (
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
                    This <strong>FIFA World Cup 2026 Group H guide</strong> is built for one goal: help you travel smarter than everyone else in a group that punishes hesitation.
                  </p>
                  <p className="text-lg leading-loose text-slate-600 dark:text-slate-300 mb-10">
                    Group H lives on the <strong className="text-slate-900 dark:text-white">Southern Triangle</strong> — <strong>Atlanta</strong>, <strong>Miami</strong>, and <strong>Houston</strong> — then finishes with a sharp turn into <strong>Guadalajara</strong>. You will feel the climate shift between cities. You will feel the price spikes. And you will feel the difference between a fan who booked early and a fan who is still “waiting to see.”
                  </p>
                  <p className="text-lg leading-loose text-slate-600 dark:text-slate-300 mb-10">
                    The rule of this group is simple: <strong className="text-slate-900 dark:text-white">you fly</strong>. Distances are too large to “just drive,” and matchdays are too time-sensitive to gamble on long ground travel. If you plan the flights, bases, and matchday transport first, Group H becomes one of the cleanest groups to follow.
                  </p>
                </div>

                <div className=" p-10 rounded-[2rem] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-200 dark:border-slate-800 mt-12">
                  <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-6 flex items-center gap-3 tracking-tight uppercase">
                    <Plane className="w-5 h-5" />
                    The Group H "Southern Triangle"
                  </h3>
                  <p className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
                    Miami ✈️ Houston ✈️ Atlanta
                  </p>
                  <p className="text-base text-slate-500 dark:text-slate-400">
                    You are essentially flying between the hubs of American (MIA), United (IAH), and Delta (ATL). Book early or prepare for massive surges.
                  </p>
                </div>
              </section>

              <section id="teams" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">01</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Teams To Plan Around</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-12 max-w-3xl">
                  Group H combines a European heavyweight, a South American tournament specialist, a high-visibility Asian power, and an underdog story that neutrals love. The football matters, but the travel behavior matters more: each fanbase changes hotel demand, ticket pricing, and where the loudest pregame energy shows up.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {groupTeams.map((team) => (
                    <div
                      key={team.name}
                      className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">{team.name}</h3>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{team.vibe}</p>
                      <div className="space-y-2 mb-6">
                        {team.travelTakeaways.map((t) => (
                          <div key={t} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {team.bestBases.slice(0, 2).map((b) => (
                          <span key={b} className="px-3 py-1 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="schedule" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">02</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Group H Match Schedule</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-10 max-w-3xl">
                  Use this schedule to choose your base city first, then lock flights second. Kickoff times are shown in the match city’s local time format as listed on this page.
                </p>

                <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Fixture</th>
                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">City</th>
                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest hidden md:table-cell">Stadium</th>
                        <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Kickoff</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {fixtures.map((m) => (
                        <tr key={`${m.date}-${m.match}`}>
                          <td className="p-6 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">{m.date}</td>
                          <td className="p-6 font-semibold text-slate-900 dark:text-white">{m.match}</td>
                          <td className="p-6 text-sm text-slate-600 dark:text-slate-300 hidden md:table-cell">{m.city}</td>
                          <td className="p-6 text-sm hidden md:table-cell">
                            <Link href={m.link} className="inline-flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors">
                              {m.stadium} <ArrowRight className="w-4 h-4" />
                            </Link>
                          </td>
                          <td className="p-6 text-sm font-bold text-slate-900 dark:text-white whitespace-nowrap">{m.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <AffiliateButton href="/world-cup-2026-atlanta-guide" text="Atlanta Guide" variant="outline" icon={MapPin} />
                  <AffiliateButton href="/world-cup-2026-miami-guide" text="Miami Guide" variant="outline" icon={MapPin} />
                  <AffiliateButton href="/world-cup-2026-houston-guide" text="Houston Guide" variant="outline" icon={MapPin} />
                  <AffiliateButton href="/world-cup-2026-guadalajara-guide" text="Guadalajara Guide" variant="outline" icon={MapPin} />
                </div>
              </section>

              {/* Section 1: Multi-City Travel Strategy */}
              <section id="strategy" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">03</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Multi-City Travel Strategy</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 leading-loose mb-12 max-w-3xl">
                  Group H logistics are simple but expensive: you must fly. There is no viable train or bus alternative for these distances.
                </p>

                <div className="mb-16">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">The Air Bridge (Hub-to-Hub)</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-3xl">
                    Because these cities are major airline hubs, you have infinite options, but prices will spike the moment the draw is announced.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className=" p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
                      <Plane className="w-8 h-8 text-emerald-500 mb-6" />
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">MIA to ATL</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">The busiest route in the South. 1h 55m flight time.</p>
                      <span className="inline-block px-3 py-1 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">$120-250 USD</span>
                    </div>
                    <div className=" p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
                      <Plane className="w-8 h-8 text-emerald-500 mb-6" />
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">IAH to ATL</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Connecting the Gulf to the South. 2h flight time.</p>
                      <span className="inline-block px-3 py-1 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full">$150-300 USD</span>
                    </div>
                    <div className=" p-8 rounded-3xl border border-transparent dark:border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 text-slate-400 mb-6 flex items-center justify-center font-bold border-2 border-slate-300 rounded-full text-[10px]">DRIVE</div>
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Rental Car</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Only for the brave. 10-15 hours through swamp and forest.</p>
                      <span className="inline-block px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-full">$80/day + Gas</span>
                    </div>
                  </div>
                </div>

                <div className="mb-16">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">The Southern Schedule</h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-3xl">
                    The Southern Triangle cities are year-round destinations. Summer is "low season" for Miami but "peak season" for World Cup travel.
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
                          <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Miami (MIA) → Houston (IAH)</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">2h 35m</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">4 Months Out</td>
                          <td className="p-6 font-bold text-emerald-600 dark:text-emerald-400 text-base">$180 - $350</td>
                        </tr>
                        <tr>
                          <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Atlanta (ATL) → Miami (MIA)</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">1h 55m</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">3 Months Out</td>
                          <td className="p-6 font-bold text-emerald-600 dark:text-emerald-400 text-base">$130 - $280</td>
                        </tr>
                        <tr>
                          <td className="p-6 font-semibold text-slate-900 dark:text-white text-base">Houston (IAH) → Atlanta (ATL)</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">2h 05m</td>
                          <td className="p-6 text-slate-500 hidden md:table-cell text-sm">3 Months Out</td>
                          <td className="p-6 font-bold text-emerald-600 dark:text-emerald-400 text-base">$160 - $320</td>
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
                          Secure Your Southern Flights
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
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Host Cities (How They Actually Work)</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-loose max-w-3xl">
                  Group H looks like four dots on a map. In real life it’s four different operating systems: Atlanta runs on airport efficiency and transit into Downtown; Miami runs on traffic timing and humidity; Houston runs on air-conditioning and distance; Guadalajara runs on neighborhood choice and matchday patience.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      city: 'Atlanta',
                      airport: 'ATL',
                      stadium: 'Mercedes-Benz Stadium',
                      stadiumLink: '/mercedes-benz-stadium-world-cup-2026',
                      guide: '/world-cup-2026-atlanta-guide',
                      bullets: [
                        'Best base: Midtown for food/nightlife, Downtown for walkability.',
                        'Matchday move: MARTA to Five Points, then walk.',
                        'Pre-game energy: Centennial Olympic Park area fills early.',
                      ],
                    },
                    {
                      city: 'Miami',
                      airport: 'MIA',
                      stadium: 'Hard Rock Stadium',
                      stadiumLink: '/hard-rock-stadium-world-cup-2026',
                      guide: '/world-cup-2026-miami-guide',
                      bullets: [
                        'Best base: Brickell/Downtown for balance; Hollywood/FLL for value.',
                        'Matchday move: plan your ride window like a flight; traffic is the opponent.',
                        'Pre-game energy: Wynwood/Brickell for bars, stadium lots for tailgate culture.',
                      ],
                    },
                    {
                      city: 'Houston',
                      airport: 'IAH / HOU',
                      stadium: 'NRG Stadium',
                      stadiumLink: '/nrg-stadium-world-cup-2026',
                      guide: '/world-cup-2026-houston-guide',
                      bullets: [
                        'Best base: Museum District or Medical Center for METRORail access.',
                        'Matchday move: METRORail Red Line is the cheat code.',
                        'Pre-game energy: Midtown for nightlife, Montrose for a local feel.',
                      ],
                    },
                    {
                      city: 'Guadalajara',
                      airport: 'GDL',
                      stadium: 'Estadio Akron',
                      stadiumLink: '/estadio-akron-world-cup-2026',
                      guide: '/world-cup-2026-guadalajara-guide',
                      bullets: [
                        'Best base: Colonia Americana for vibe; Zapopan for matchday convenience.',
                        'Matchday move: arrive early and leave late to let traffic burn off.',
                        'Pre-game energy: Chapultepec corridor and Andares depending on your style.',
                      ],
                    },
                  ].map((c) => (
                    <div key={c.city} className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex items-start justify-between gap-6 mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{c.city}</h3>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                            Airport: <strong className="text-slate-900 dark:text-white">{c.airport}</strong>
                          </p>
                        </div>
                        <MapPin className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div className="space-y-3 mb-8">
                        {c.bullets.map((b) => (
                          <div key={b} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <AffiliateButton href={c.guide} text={`${c.city} Guide`} variant="outline" icon={ArrowRight} />
                        <AffiliateButton href={c.stadiumLink} text={c.stadium} variant="outline" icon={Ticket} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                        <Car className="w-5 h-5 text-emerald-500" />
                        Book Tours, Day Trips, and Airport Transfers Early
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">June weekends sell out fast in Miami and Guadalajara. Lock the “small logistics” now and keep matchweek flexible.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AffiliateButton href="https://www.getyourguide.com" text="Browse GetYourGuide Experiences" icon={ExternalLink} variant="primary" />
                    <AffiliateButton href="https://www.viator.com" text="Compare Tours on Viator" icon={ExternalLink} variant="outline" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-4 text-center uppercase tracking-widest font-medium">We may earn a commission on bookings made through these links.</p>
                </div>
              </section>

              <section id="tickets" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">05</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Tickets & Matchday Logistics</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-loose max-w-3xl">
                  Your matchday goes well when three things are true: you buy through official channels, you arrive earlier than you think you need to, and you treat stadium entry like airport security. In Group H, heat and traffic add extra friction, especially in Miami.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                      <Ticket className="w-6 h-6 text-emerald-500" />
                      Ticket Strategy That Works
                    </h3>
                    <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <p><strong className="text-slate-900 dark:text-white">Pick your June 15 match first.</strong> That choice decides your base (Atlanta or Miami) and saves you a second expensive flight.</p>
                      <p><strong className="text-slate-900 dark:text-white">Buy for comfort in Miami.</strong> Shaded seats matter more than you think in humidity.</p>
                      <p><strong className="text-slate-900 dark:text-white">Treat June 26 like a fork in the road.</strong> Houston is the US convenience play; Guadalajara is the cross-border story play.</p>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <AffiliateButton href="https://www.fifa.com/tickets" text="Official FIFA Ticket Portal" variant="secondary" icon={ExternalLink} />
                      <AffiliateButton href="/world-cup-2026-match-selection-strategy" text="Match Selection Strategy" variant="outline" icon={ArrowRight} />
                    </div>
                  </div>

                  <div className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                      <ShieldCheck className="w-6 h-6 text-emerald-500" />
                      Matchday Logistics Checklist
                    </h3>
                    <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      <p><strong className="text-slate-900 dark:text-white">Arrive 2–3 hours early.</strong> Security lines and traffic surges are predictable in Miami and Guadalajara.</p>
                      <p><strong className="text-slate-900 dark:text-white">Bring a stadium hoodie.</strong> Atlanta and Houston can be cold inside even when it’s brutal outside.</p>
                      <p><strong className="text-slate-900 dark:text-white">Keep mobile battery margin.</strong> Screens brighten in sun and drain faster; mobile tickets demand power.</p>
                      <p><strong className="text-slate-900 dark:text-white">Hydrate like it’s training.</strong> If you wait until you’re thirsty, you’re already behind.</p>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <AffiliateButton href="/world-cup-2026-safety-guide" text="Safety Guide" variant="outline" icon={ArrowRight} />
                      <AffiliateButton href="/world-cup-2026-transportation-safety" text="Transport Safety" variant="outline" icon={ArrowRight} />
                    </div>
                  </div>
                </div>

                <div className="p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-500" />
                        Protect the Trip (Insurance + Disruptions)
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Group H is flight-heavy and cross-border. Coverage matters more here than in most groups.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AffiliateButton href="https://www.worldnomads.com" text="Compare Travel Insurance (World Nomads)" icon={ExternalLink} variant="primary" />
                    <AffiliateButton href="https://safetywing.com" text="Check Coverage (SafetyWing)" icon={ExternalLink} variant="outline" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-4 text-center uppercase tracking-widest font-medium">We may earn a commission on purchases made through these links.</p>
                </div>
              </section>

              {/* Section 2: Accommodation Strategy */}
              <section id="accommodation" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">06</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Accommodation Strategy</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-loose max-w-3xl">
                  In the South, proximity to the stadium isn't always proximity to the fun. Here is where to base yourself in each city.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Miami */}
                  <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Miami</h3>
                      <span className="px-3 py-1 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">High Cost</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Strategy: The Hollywood Bypass</p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                        <span><strong>Stay:</strong> Hollywood or Fort Lauderdale for better value and easier stadium access via I-95.</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                        <span><strong>Avoid:</strong> South Beach if you have a morning match. Traffic is brutal.</span>
                      </li>
                    </ul>
                    <AffiliateButton 
                      href="https://booking.com" 
                      text="Search Miami Hotels" 
                      variant="outline"
                    />
                  </div>

                  {/* Houston */}
                  <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Houston</h3>
                      <span className="px-3 py-1 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Good Value</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Strategy: The Rail Line</p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                        <span><strong>Stay:</strong> Near the METRORail Red Line (Medical Center or Museum District) for direct stadium access.</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                        <span><strong>Pro Tip:</strong> Downtown hotels are plentiful but quiet on weekends.</span>
                      </li>
                    </ul>
                    <AffiliateButton 
                      href="https://booking.com" 
                      text="Search Houston Hotels" 
                      variant="outline"
                    />
                  </div>

                  {/* Atlanta */}
                  <div className="group p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Atlanta</h3>
                      <span className="px-3 py-1 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-lg">Mid-Range</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Strategy: Midtown Pulse</p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                        <span><strong>Stay:</strong> Midtown for the best food and nightlife, connected via MARTA.</span>
                      </li>
                      <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                        <span><strong>Stadium:</strong> Mercedes-Benz is walkable from Downtown hotels.</span>
                      </li>
                    </ul>
                    <AffiliateButton 
                      href="https://booking.com" 
                      text="Search Atlanta Hotels" 
                      variant="outline"
                    />
                  </div>
                </div>

                <div className="mt-12 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                        <Hotel className="w-5 h-5 text-emerald-500" />
                        Compare Hotels Across Cities
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">For multi-city groups, refundable bookings are your leverage. Book early, then refine.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AffiliateButton href="https://booking.com" text="Search on Booking.com" icon={ExternalLink} variant="primary" />
                    <AffiliateButton href="https://expedia.com" text="Compare on Expedia" icon={ExternalLink} variant="outline" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-4 text-center uppercase tracking-widest font-medium">We may earn a commission on bookings made through these links.</p>
                </div>
              </section>

              <section id="timeline" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">07</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Planning Timeline (The Order That Saves Money)</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-loose max-w-3xl">
                  Group H is a pricing game. If you book in the wrong order, you pay twice: once in higher prices, and again in stress. Use this timeline as a default plan, then adjust once you know which two matchdays you’re prioritizing.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { when: 'Right After the Draw', title: 'Lock your base city', text: 'Choose Atlanta or Miami for June 15. Book refundable hotels immediately in that city and in your June 26 city (Houston or Guadalajara).' },
                    { when: 'Within 2 Weeks', title: 'Buy the flight skeleton', text: 'Book your key flight legs between ATL/MIA/IAH and any international arrival. The “flight skeleton” drives everything else.' },
                    { when: '3–4 Months Out', title: 'Finalize neighborhoods', text: 'Switch from “any hotel” to the right neighborhood: Midtown Atlanta, Brickell Miami, Museum District Houston, or Colonia Americana Guadalajara.' },
                    { when: '6–8 Weeks Out', title: 'Add experiences and transfers', text: 'Grab day trips, tours, and airport transfers. This keeps matchweek free for football decisions and rest.' },
                    { when: '2 Weeks Out', title: 'Build matchday buffers', text: 'Pre-book transport where needed, plan early arrivals, and set a hydration plan for Miami and Guadalajara.' },
                    { when: 'Matchweek', title: 'Stay flexible', text: 'Keep one “float day” between cities where possible. A single delay is normal in tournament travel.' },
                  ].map((step) => (
                    <div key={step.title} className="p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center justify-between gap-6 mb-4">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{step.when}</div>
                        <Calendar className="w-5 h-5 text-emerald-500" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{step.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{step.text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <AffiliateButton href="/best-time-book-world-cup-2026" text="Best Booking Timeline" variant="outline" icon={ArrowRight} />
                  <AffiliateButton href="/world-cup-2026-flight-booking-guide" text="Flight Booking Guide" variant="outline" icon={ArrowRight} />
                  <AffiliateButton href="/world-cup-2026-accommodation-guide" text="Accommodation Guide" variant="outline" icon={ArrowRight} />
                </div>
              </section>

              <section id="fan" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">08</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Fan Experience (Where the Atmosphere Will Be)</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-loose max-w-3xl">
                  Group H’s atmosphere is shaped by contrast: European neutrals in Atlanta, South American intensity in Miami, value-hunters in Houston, and a Mexico matchday that feels like a festival with football attached. If you want peak energy, follow the fanbases — not the map.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Atlanta: Efficiency + Neutrals',
                      icon: '🏟️',
                      text: 'Atlanta draws neutrals because it’s easy to fly into and easy to move around Downtown. Expect a mixed crowd with spikes of Spain support on both Atlanta matchdays.',
                    },
                    {
                      title: 'Miami: The Loudest Pregame',
                      icon: '🌴',
                      text: 'Miami turns matchday into an all-day event. The Uruguay crowd can tilt the stadium emotionally, and humidity makes everything feel more intense. Hydrate early, not late.',
                    },
                    {
                      title: 'Houston: Best Value, Big Crowds',
                      icon: '🔥',
                      text: 'Houston is where you find the best seat-to-cost ratio in the group. The city is built for events, and the stadium comfort level is elite. Plan your METRORail route and you’re set.',
                    },
                    {
                      title: 'Guadalajara: The Story Play',
                      icon: '🎺',
                      text: 'Guadalajara adds the cross-border layer and the Mexico stadium culture. The June 26 match is the headline for neutrals who want one unforgettable day — but only if you arrive early and stay patient.',
                    },
                  ].map((card) => (
                    <div key={card.title} className="p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-start justify-between gap-8 mb-6">
                        <div className="text-3xl">{card.icon}</div>
                        <Users className="w-6 h-6 text-emerald-500" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{card.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{card.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 3: Budget Breakdown */}
              <section id="budget" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">09</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Group H Budget Breakdown</h2>
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 leading-loose">
                  Estimates are per person for a 12-day trip covering 3 group matches. The South is cheaper than the Northeast, but flight costs are mandatory.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-16">
                  {/* Economy */}
                  <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:scale-[1.02] transition-transform duration-300">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Economy Strategy</div>
                    <div className="text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">$3,200</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Suburban hotels, low-cost carriers (Spirit/Frontier), grocery meals, Cat 3 tickets.</p>
                  </div>

                  {/* Mid-Range */}
                  <div className="p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900 dark:bg-emerald-900/10 relative overflow-hidden transform md:-translate-y-4 shadow-xl shadow-emerald-900/5">
                    <div className="absolute top-0 right-0 bg-emerald-500 text-slate-900 dark:text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl uppercase tracking-widest">Recommended</div>
                    <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-4">Mid-Range Strategy</div>
                    <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-4 tracking-tighter">$5,500</div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">Downtown/Midtown hotels, major airlines (Delta/United), BBQ & Tacos, Cat 2 tickets.</p>
                  </div>

                  {/* Premium */}
                  <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:scale-[1.02] transition-transform duration-300">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Premium Experience</div>
                    <div className="text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tighter">$9,500+</div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Luxury suites in Brickell & Buckhead, First Class flights, private transport, Cat 1 hospitality.</p>
                  </div>
                </div>

                <div className=" rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 tracking-tight">
                    <CreditCard className="w-6 h-6 text-emerald-500" />
                    Money-Saving Hacks for Group H
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs flex-shrink-0">1</div>
                      <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        <strong className="text-slate-900 dark:text-white font-bold">MARTA is your Friend:</strong> In Atlanta, the train from the airport to downtown is $2.50. An Uber will be $50+ and take twice as long.
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs flex-shrink-0">2</div>
                      <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        <strong className="text-slate-900 dark:text-white font-bold">Houston Tunnel System:</strong> Use the 6-mile underground tunnel system in Downtown Houston to move between hotels and food without hitting the 100°F heat.
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs flex-shrink-0">3</div>
                      <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        <strong className="text-slate-900 dark:text-white font-bold">Tri-Rail / Brightline:</strong> In Miami, don't Uber from the airport to the stadium area. Use the Tri-Rail or Brightline trains to save $60+.
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
                    <a href="https://www.airalo.com/united-states-esim" target="_blank" rel="noopener noreferrer" className="flex-shrink-0 text-emerald-600 font-bold text-xs hover:text-emerald-500 transition-colors uppercase tracking-widest">View Plans &rarr;</a>
                  </div>
                </div>
              </section>

              {/* Section 4: Visa & Entry Requirements */}
              <section id="visas" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">10</span>
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
                        Required for all Group H cities. Cost: $21 USD. Apply at least 72 hours before your first flight to Miami, Houston, or Atlanta.
                      </li>
                      <li className="text-sm text-slate-600 dark:text-slate-300">
                        <strong className="block text-slate-900 dark:text-white mb-1 font-bold">B1/B2 Visa</strong>
                        Required if not ESTA eligible. Apply immediately as interview wait times in South America and Europe can be extensive.
                      </li>
                      <li className="text-sm text-slate-600 dark:text-slate-300">
                        <strong className="block text-red-600 dark:text-red-400 mb-1 font-bold">Important</strong>
                        MIA and ATL have some of the longest customs wait times in the US. Allow at least 3 hours for any international-to-domestic connections.
                      </li>
                    </ul>
                  </div>

                  <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
                    <h3 className="flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-slate-200 dark:border-slate-800">
                      <OptimizedImage 
                        src="https://flagcdn.com/mx.svg" 
                        width={32} 
                        height={24} 
                        alt="Mexico" 
                        imgClassName="w-8 h-auto object-cover rounded shadow-sm"
                      />
                      Entering Mexico (Guadalajara)
                    </h3>
                    <ul className="space-y-6">
                      <li className="text-sm text-slate-600 dark:text-slate-300">
                        <strong className="block text-slate-900 dark:text-white mb-1 font-bold">Passport</strong>
                        Treat the Guadalajara leg like a full international trip. Make sure your passport validity is solid and your return routing is realistic.
                      </li>
                      <li className="text-sm text-slate-600 dark:text-slate-300">
                        <strong className="block text-slate-900 dark:text-white mb-1 font-bold">Tourist Entry / FMM</strong>
                        Many travelers will need a tourist entry form depending on entry method. Confirm requirements for your nationality early and avoid last-minute surprises during matchweek.
                      </li>
                      <li className="text-sm text-slate-600 dark:text-slate-300">
                        <strong className="block text-red-600 dark:text-red-400 mb-1 font-bold">Important</strong>
                        Do not plan a same-day US → Mexico arrival and match kickoff unless you have to. Immigration lines and delays are normal during major events.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 5: Insider Tips */}
              <section id="insider" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">11</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Insider Knowledge</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-xl mb-6">❄️</div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">The AC Paradox</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      While it's 100°F outside, US stadiums (especially NRG and Mercedes-Benz) are kept at a frigid 68°F. You will actually need a light hoodie for the stadium, even if you're sweating in the parking lot.
                    </p>
                  </div>

                  <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-xl mb-6">🚗</div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">The "Spaghetti Junction"</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Atlanta's traffic is legendary. If you are staying in Buckhead and the match is at 7 PM, leave by 3:30 PM. The I-75/85 connector can come to a full stop for no reason at any time.
                    </p>
                  </div>

                  <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-xl mb-6">🍖</div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">The Culinary Divide</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      Miami = Cuban/Caribbean. Houston = Tex-Mex & BBQ. Atlanta = Southern/Trap. Eat like a local to save money and enjoy the culture.
                    </p>
                  </div>

                  <div className=" p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 hover:shadow-xl transition-shadow duration-300">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center text-xl mb-6">⚡</div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">Afternoon Storms</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      In Miami and Houston, a massive thunderstorm occurs almost every afternoon at 4 PM for exactly 30 minutes. Do not panic; it will pass, but it will make the humidity even worse.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6: Essential Gear */}
              <section id="packing" className="scroll-mt-32">
                <div className="flex items-baseline gap-4 mb-12">
                  <span className="text-emerald-500 font-mono text-sm font-bold tracking-widest uppercase">12</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tighter">Group H Packing Essentials</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">👕</div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Linen Everything</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Cotton will soak through in minutes.</p>
                    <a href="https://www.amazon.com/s?k=linen+shirt" target="_blank" rel="noopener noreferrer" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">Shop Now</a>
                  </div>
                  <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🧴</div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">SPF 50+</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">The Southern sun is direct and brutal.</p>
                    <a href="https://www.amazon.com/s?k=spf+50+sunscreen" target="_blank" rel="noopener noreferrer" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">Shop Now</a>
                  </div>
                  <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🔋</div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Power Bank</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">High heat drains batteries faster.</p>
                    <a href="https://www.amazon.com/s?k=portable+power+bank" target="_blank" rel="noopener noreferrer" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">Shop Now</a>
                  </div>
                  <div className="group text-center p-6 border border-slate-100 dark:border-slate-200 dark:border-slate-800 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-900/5">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🥤</div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Hydration Tabs</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Electrolytes are mandatory in the humidity.</p>
                    <a href="https://www.amazon.com/s?k=electrolyte+tablets" target="_blank" rel="noopener noreferrer" className="text-emerald-600 text-[10px] font-bold uppercase tracking-widest hover:text-emerald-500 transition-colors">Shop Now</a>
                  </div>
                </div>

                <div className="mt-12 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                        <Users className="w-5 h-5 text-emerald-500" />
                        Fan Gear & Travel Essentials
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">June weather swings from outdoor heat to stadium air-conditioning. Pack for both.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AffiliateButton href="https://www.fanatics.com/soccer" text="Shop Fan Gear (Fanatics)" icon={ExternalLink} variant="primary" />
                    <AffiliateButton href="https://www.awaytravel.com" text="Upgrade Your Luggage (Away)" icon={ExternalLink} variant="outline" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-4 text-center uppercase tracking-widest font-medium">We may earn a commission on purchases made through these links.</p>
                </div>
              </section>

              {/* Section 7: FAQ */}
              <section id="faq" className="scroll-mt-32">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12 tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-2">
                  {[
                    ...faqs,
                    {
                      question: 'Which Group H stadium is the best overall experience?',
                      answer: (
                        <>
                          <strong>Mercedes-Benz Stadium in Atlanta</strong> is the group’s crown jewel: modern design, climate control, and a matchday setup that’s unusually fan-friendly for the US.
                        </>
                      ),
                    },
                    {
                      question: 'Can I drive between Miami and Atlanta (or Houston)?',
                      answer: (
                        <>
                          You can, but it’s rarely the smart move. Miami ↔ Atlanta is roughly a full day of driving, and one-way rental drop fees can be brutal. In most cases, a flight is cheaper once you factor in time and fatigue.
                        </>
                      ),
                    },
                    {
                      question: 'Is it safe to walk in Houston and Atlanta at night?',
                      answer: (
                        <>
                          Stick to the busy, well-lit areas near major hotel districts. Both cities are car-centric, so use MARTA in Atlanta and rideshare in Houston when you’re moving between neighborhoods late.
                        </>
                      ),
                    },
                    {
                      question: 'What should I wear to Group H matches?',
                      answer: (
                        <>
                          Wear light, moisture-wicking clothing for Miami and Guadalajara. Bring a light layer for Atlanta and Houston because indoor stadium air-conditioning can feel cold after you’ve been outside in heat.
                        </>
                      ),
                    },
                  ].map((f, index) => (
                    <AccordionItem
                      key={f.question}
                      question={f.question}
                      answer={f.answer}
                      isOpen={openFaqIndex === index}
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    />
                  ))}
                </div>
              </section>

              {/* Final CTA */}
              <div className="relative overflow-hidden rounded-[3rem] text-slate-900 dark:text-white p-12 md:p-20 text-center shadow-2xl shadow-slate-900/20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/20 via-slate-900 to-slate-900"></div>
                <div className="relative z-10 max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to Master the South?</h2>
                  <p className="text-slate-600 dark:text-slate-300 mb-12 text-lg leading-relaxed font-light">
                    From the neon pulse of Miami to the Texan scale of Houston, Group H is a test of endurance. Start planning your logistics now.
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
