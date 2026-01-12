'use client';

import React from 'react';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, AlertCircle, Globe, Info } from 'lucide-react';
import { TEAMS } from '@/lib/wc26-data';

const containerVariants = {
 hidden: { opacity: 0 },
 show: {
 opacity: 1,
 transition: {
 staggerChildren: 0.05
 }
 }
};

const itemVariants = {
 hidden: { opacity: 0, y: 10 },
 show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

// Full 48-team group data including placeholders
const PLAYOFF_INFO: Record<string, string> = {
    'POD': "Playoff D Winner - One of: Denmark, Ireland, Czech Republic, or North Macedonia",
    'POA': "Playoff A Winner - One of: Bosnia and Herzegovina, Italy, Wales or Northern Ireland",
    'POC': "Playoff C Winner - One of: Slovakia, Kosovo, Turkey or Romania",
    'POB': "Playoff B Winner - One of: Ukraine, Poland, Albania or Sweden",
    'PO2': "Playoff 2 Winner - One of: Bolivia, Iraq or Suriname",
    'PO1': "Playoff 1 Winner - One of: Jamaica, Democratic Republic of the Congo or New Caledonia"
};

const groupData: Record<string, { name: string; code: string; isWinner?: boolean }[]> = {
 'A': [
 { name: 'Mexico', code: 'MEX' },
 { name: 'South Africa', code: 'RSA' },
 { name: 'South Korea', code: 'KOR' },
 { name: 'PO D', code: 'POD', isWinner: true }
 ],
 'B': [
 { name: 'Canada', code: 'CAN' },
 { name: 'PO A', code: 'POA', isWinner: true },
 { name: 'Qatar', code: 'QAT' },
 { name: 'Switzerland', code: 'SUI' }
 ],
 'C': [
 { name: 'Brazil', code: 'BRA' },
 { name: 'Morocco', code: 'MAR' },
 { name: 'Haiti', code: 'HAI' },
 { name: 'Scotland', code: 'SCO' }
 ],
 'D': [
 { name: 'USA', code: 'USA' },
 { name: 'Paraguay', code: 'PAR' },
 { name: 'Australia', code: 'AUS' },
 { name: 'PO C', code: 'POC', isWinner: true }
 ],
 'E': [
 { name: 'Germany', code: 'GER' },
 { name: 'Curaçao', code: 'CUW' },
 { name: 'Ivory Coast', code: 'CIV' },
 { name: 'Ecuador', code: 'ECU' }
 ],
 'F': [
 { name: 'Netherlands', code: 'NED' },
 { name: 'Japan', code: 'JPN' },
 { name: 'PO B', code: 'POB', isWinner: true },
 { name: 'Tunisia', code: 'TUN' }
 ],
 'G': [
 { name: 'Belgium', code: 'BEL' },
 { name: 'Egypt', code: 'EGY' },
 { name: 'Iran', code: 'IRN' },
 { name: 'New Zealand', code: 'NZL' }
 ],
 'H': [
 { name: 'Spain', code: 'ESP' },
 { name: 'Cape Verde', code: 'CPV' },
 { name: 'Saudi Arabia', code: 'KSA' },
 { name: 'Uruguay', code: 'URU' }
 ],
 'I': [
 { name: 'France', code: 'FRA' },
 { name: 'Senegal', code: 'SEN' },
 { name: 'PO 2', code: 'PO2', isWinner: true },
 { name: 'Norway', code: 'NOR' }
 ],
 'J': [
 { name: 'Argentina', code: 'ARG' },
 { name: 'Algeria', code: 'ALG' },
 { name: 'Austria', code: 'AUT' },
 { name: 'Jordan', code: 'JOR' }
 ],
 'K': [
 { name: 'Portugal', code: 'POR' },
 { name: 'PO 1', code: 'PO1', isWinner: true },
 { name: 'Uzbekistan', code: 'UZB' },
 { name: 'Colombia', code: 'COL' }
 ],
 'L': [
 { name: 'England', code: 'ENG' },
 { name: 'Croatia', code: 'CRO' },
 { name: 'Ghana', code: 'GHA' },
 { name: 'Panama', code: 'PAN' }
 ]
};


const faqs = [
 {
 question: "How many groups are in the 2026 World Cup?",
 answer: "The 2026 World Cup will feature 12 groups of 4 teams each, totaling 48 participating nations. This is an expansion from the previous 32-team format."
 },
 {
 question: "Who advances from the group stage in 2026?",
 answer: "The top two teams from each of the 12 groups, plus the 8 best third-place teams, will advance to the Round of 32 knockout stage."
 },
 {
 question: "When will the 2026 World Cup group draw take place?",
 answer: "The official group draw for the FIFA World Cup 2026 is expected to take place in late 2025, once all qualifying matches have concluded."
 },
 {
 question: "Where will the 2026 World Cup group stage matches be played?",
 answer: "Group stage matches will be hosted across 16 cities in three countries: USA (11 cities), Mexico (3 cities), and Canada (2 cities)."
 }
];

export default function ClientPage() {
 return (
 <div className="min-h-screen font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-500/30">
 
 {/* Hero Section */}
 <section className="relative w-full overflow-hidden">

 <div className="relative max-w-[1440px] mx-auto pt-32 pb-24 px-6 md:px-12 text-center">
        <div className="flex justify-center mb-8">
          <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-white/30 text-slate-600 dark:text-white/90 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md">
            Last Updated: January 2, 2026
          </span>
        </div>
        
        <motion.h1 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 0.1 }}
 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-slate-900 dark:text-white leading-[1.1]"
 >
 FIFA World Cup 2026 <br />
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Groups, Teams & Match Schedule</span>
 </motion.h1>
 
 <motion.p 
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 0.2 }}
 className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-3xl mx-auto mb-12"
 >
 The definitive guide to the expanded 48-team tournament. Explore all 12 groups, follow your national team's path, and prepare for the historic event hosted by USA, Mexico, and Canada.
 </motion.p>

 <div className="flex flex-wrap justify-center gap-4">
 <Link href="/world-cup-2026-prediction-game" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-slate-900 dark:text-white rounded-full font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2">
 Predictor Game <Trophy size={18} />
 </Link>
 </div>
 </div>
 </section>

 <main className="max-w-[1440px] mx-auto px-6 md:px-12 -mt-12 relative z-10 pb-24">
 
 {/* Info Banner */}
 <motion.div 
 initial={{ opacity: 0, y: 40 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 0.3 }}
 className=" rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-blue-900/20 border border-slate-100 dark:border-slate-200 dark:border-slate-800 mb-16 relative overflow-hidden"
 >
 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
 <div className="flex flex-col md:flex-row items-start gap-6">
 <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 mt-1">
 <AlertCircle size={28} />
 </div>
 <div>
 <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
 Official Draw Updates
 </h2>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
 The groups displayed below reflect the latest projections and official slot allocations. This page updates in real-time. Bookmark this page to stay ahead of the official FIFA World Cup 2026™ Draw.
 </p>
 </div>
 </div>
 </motion.div>

 {/* Groups Grid */}
 <section id="groups-grid" className="mb-24">
 <div className="flex items-center gap-3 mb-12">
 <div className="h-10 w-2 bg-blue-600 rounded-full" />
 <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
 Tournament Groups (A-L)
 </h2>
 </div>

 <motion.div 
 variants={containerVariants}
 initial="hidden"
 animate="show"
 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
 >
 {Object.entries(groupData).map(([groupLetter, teams]) => (
 <motion.div 
 key={groupLetter}
 variants={itemVariants}
 className="group rounded-2xl border border-slate-200 dark:border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden"
 >
 <div className=" px-6 py-4 border-b border-slate-100 dark:border-slate-200 dark:border-slate-800 flex justify-between items-center">
 <h3 className="text-xl font-bold text-slate-900 dark:text-white">Group {groupLetter}</h3>
 <Link href={`/groups/group-${groupLetter.toLowerCase()}`} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 uppercase tracking-wider flex items-center gap-1">
 Analysis <ArrowRight size={12} />
 </Link>
 </div>
 <div className="p-4 space-y-3">
 {teams.map((teamInfo, idx) => {
 const teamData = TEAMS.find(t => t.fifaCode === teamInfo.code || t.name === teamInfo.name);
 
 return (
 <div key={idx} className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
 <div className="w-12 h-8 rounded shadow-sm overflow-hidden flex items-center justify-center relative bg-slate-100 dark:bg-slate-800">
 {teamInfo.isWinner ? (
 <span className="text-[10px] font-bold text-slate-900 dark:text-slate-200 tracking-tighter uppercase">FIFA</span>
 ) : teamData?.flagUrl ? (
 <OptimizedImage
 src={teamData.flagUrl} 
 alt={`${teamInfo.name} Flag`} 
 fill
 imgClassName="object-cover" // flagcdn
 />
 ) : (
 <span className="text-[10px] font-bold text-slate-400">{teamInfo.code}</span>
 )}
 </div>
 <div className="flex-1">
 <div className="flex items-center gap-2">
 <div className="font-semibold text-slate-900 dark:text-slate-200 leading-tight">
 {teamInfo.name}
 </div>
 {teamInfo.isWinner && PLAYOFF_INFO[teamInfo.code] && (
                    <div className="group/tooltip relative flex items-center">
                      <button className="inline-flex items-center justify-center p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-300 focus:outline-none">
                        <Info className="w-3.5 h-3.5 text-slate-400 group-hover/tooltip:text-blue-600 dark:group-hover/tooltip:text-blue-400 transition-colors" />
                      </button>
                      
                      {/* Apple-style Glassmorphism Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] opacity-0 scale-95 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] z-[100] min-w-[240px]">
                        <div className="relative">
                          <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                            <Globe size={10} /> Qualification Path
                          </p>
                          <p className="text-[13px] font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                            {PLAYOFF_INFO[teamInfo.code]}
                          </p>
                          {/* Tooltip Arrow */}
                          <div className="absolute -bottom-[19px] left-1/2 -translate-x-1/2 w-4 h-4 overflow-hidden">
                            <div className="w-2.5 h-2.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-b border-slate-200/50 dark:border-white/10 rotate-45 translate-y-[-50%] mx-auto"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
 </div>
 {!teamInfo.isWinner && teamData && (
 <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
 {teamData.region} • Rank {teamData.rating}
 </div>
 )}
 </div>
 </div>
 );
 })}
 </div>
 </motion.div>
 ))}
 </motion.div>
 </section>


 {/* FAQ Section */}
 <section id="faq-section" className="max-w-4xl mx-auto">
 <div className="text-center mb-12">
 <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
 Frequently Asked Questions
 </h2>
 <p className="text-slate-600 dark:text-slate-400">
 Everything you need to know about the World Cup 2026 format and groups.
 </p>
 </div>
 
 <div className="space-y-4">
 {faqs.map((faq, index) => (
 <div key={index} className=" rounded-xl p-6 border border-slate-200 dark:border-slate-200 dark:border-slate-800">
 <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{faq.question}</h3>
 <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
 </div>
 ))}
 </div>
 </section>
 </main>
 </div>
 );
}






