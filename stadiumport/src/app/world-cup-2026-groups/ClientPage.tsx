'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, AlertCircle, Globe, Calendar, MapPin, Info, Users, History, TrendingUp, Plane, Ticket, ChevronDown, ChevronUp, Zap, FileText, Shield } from 'lucide-react';
import { TEAMS, GROUPS, TEAM_MAP } from '@/data/teams';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import Image from 'next/image';
import { useState } from 'react';

const HOST_REGIONS = {
  WEST: { name: 'West Region', cities: ['Vancouver', 'Seattle', 'San Francisco', 'Los Angeles', 'Guadalajara'] },
  CENTRAL: { name: 'Central Region', cities: ['Kansas City', 'Dallas', 'Houston', 'Atlanta', 'Monterrey', 'Mexico City'] },
  EAST: { name: 'East Region', cities: ['Toronto', 'Boston', 'Philadelphia', 'New York/NJ', 'Miami'] }
};

const getCitySlug = (city: string) => {
  const cityMap: { [key: string]: string } = {
    'New York/NJ': 'new-york-new-jersey',
    'San Francisco': 'san-francisco-bay-area',
    'Kansas City': 'kansas-city',
    'Los Angeles': 'los-angeles',
    'Mexico City': 'mexico-city'
  };
  
  if (cityMap[city]) return cityMap[city];
  return city.toLowerCase().replace(/ /g, '-');
};

const PLAYOFF_INFO: Record<string, string> = {
    'pod': "Playoff D Winner - One of: Denmark, Ireland, Czech Republic, or North Macedonia",
    'poa': "Playoff A Winner - One of: Bosnia and Herzegovina, Italy, Wales or Northern Ireland",
    'poc': "Playoff C Winner - One of: Slovakia, Kosovo, Turkey or Romania",
    'pob': "Playoff B Winner - One of: Ukraine, Poland, Albania or Sweden",
    'po2': "Playoff 2 Winner - One of: Bolivia, Iraq or Suriname",
    'po1': "Playoff 1 Winner - One of: Jamaica, Democratic Republic of the Congo or New Caledonia"
};

const EXPANDED_FAQS = [
  {
    question: "How many groups are in the World Cup 2026?",
    answer: "There are 12 groups in total, labeled A through L. This is the first tournament to feature 48 teams, expanded from the previous 32-team format."
  },
  {
    question: "How many teams advance from each group?",
    answer: "The top two teams from each group (24 teams) plus the 8 best third-place teams will advance to the Round of 32 knockout stage."
  },
  {
    question: "What are the tiebreaker rules for the group stage?",
    answer: "If teams are tied on points, the ranking is determined by: 1) Goal difference in all group matches, 2) Number of goals scored in all group matches, 3) Head-to-head points, 4) Head-to-head goal difference, 5) Head-to-head goals scored, 6) Fair play points (yellow/red cards), 7) Drawing of lots."
  },
  {
    question: "When does the group stage start and end?",
    answer: "The World Cup 2026 group stage kicks off on June 11, 2026, at Estadio Azteca in Mexico City. The group stage matches will conclude in late June 2026, followed immediately by the Round of 32."
  },
  {
    question: "How is the third-place ranking determined?",
    answer: "The 8 best third-place teams are ranked based on: 1) Points, 2) Goal difference, 3) Goals scored, 4) Fair play points, 5) Drawing of lots."
  },
  {
    question: "What is the 'Group of Death'?",
    answer: "The 'Group of Death' is a popular term for a group that contains more strong competitors than the number of qualifying places available. In 2026, with 3 teams potentially advancing, the definition may shift, but it still refers to the toughest group by average world ranking."
  },
  {
    question: "How were teams seeded?",
    answer: "Teams are seeded based on the FIFA World Ranking. The hosts (USA, Mexico, Canada) automatically take top seeds in Groups A, B, and C (or similar designated groups), while other top-ranked nations head the remaining groups."
  },
  {
    question: "Where are group stage matches played?",
    answer: "Matches are played across 16 host cities in three zones: West (Vancouver, Seattle, SF, LA, Guadalajara), Central (KC, Dallas, Houston, Atlanta, Monterrey, Mexico City), and East (Toronto, Boston, Philadelphia, NY/NJ, Miami)."
  },
  {
    question: "How can I watch group stage matches?",
    answer: "Matches will be broadcast globally. In the US, FOX Sports and Telemundo hold rights. In Canada, TSN and RDS. In Mexico, Televisa and TV Azteca. Check your local listings for specific channels and streaming services."
  },
  {
    question: "What happens if teams tie on points?",
    answer: "As mentioned in the tiebreaker rules, Goal Difference is the first criteria used to separate teams tied on points, followed by Goals Scored."
  },
  {
    question: "How do the Round of 32 matchups work?",
    answer: "The Round of 32 pairs group winners against runners-up and third-place teams. The specific matchups are predetermined by the tournament bracket, ensuring teams from the same group do not meet again until later stages."
  },
  {
    question: "Will there be penalty shootouts in the group stage?",
    answer: "No, there are no penalty shootouts in the group stage. Matches can end in a draw, with each team earning 1 point."
  },
  {
    question: "Which teams automatically qualified?",
    answer: "The three host nations—United States, Mexico, and Canada—qualified automatically. All other 45 teams must qualify through their respective continental confederation tournaments."
  },
  {
    question: "What is the maximum number of points a team can get?",
    answer: "A team plays 3 group matches. With 3 points for a win, the maximum score is 9 points. The minimum to advance is mathematically variable but typically 4 points is safe."
  },
  {
    question: "Can host nations play each other in the group stage?",
    answer: "No. As top seeds in separate groups (A, B, C or similar), USA, Mexico, and Canada will not face each other in the group stage. They could potentially meet in the knockout rounds."
  },
  {
    question: "How many matches are played per day?",
    answer: "During the group stage, there will be up to 4 matches played per day to accommodate the expanded schedule of 72 group stage games."
  },
  {
    question: "Are the stadiums air-conditioned?",
    answer: "Some stadiums, like AT&T Stadium (Dallas), NRG Stadium (Houston), and Mercedes-Benz Stadium (Atlanta), have retractable roofs and climate control. Open-air stadiums in hot climates may have specific cooling protocols."
  },
  {
    question: "When will the full match schedule with times be released?",
    answer: "The specific kickoff times for all group matches will be confirmed after the Final Draw, optimizing for television audiences in the participating countries."
  },
  {
    question: "Can I buy tickets for a specific team?",
    answer: "Yes, FIFA typically offers 'Team Specific Series' tickets that follow your chosen team through the group stage and potentially knockout rounds."
  },
  {
    question: "What is the travel distance between host cities?",
    answer: "Distances can be significant. To minimize travel fatigue, FIFA has organized the group stage into regional clusters (West, Central, East), so teams won't have to fly cross-continent between group matches."
  }
];

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

export default function ClientPage() {
  return (
    <div className="min-h-screen font-sans selection:bg-blue-500/30 bg-[#F5F5F7] dark:bg-[#0A0A0A]">
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-[#F5F5F7] dark:to-[#0A0A0A] pointer-events-none" />
        
        <div className="relative max-w-[1440px] mx-auto pt-32 pb-24 px-6 md:px-12 text-center">
          <Breadcrumb 
            items={[
              { label: 'Groups', href: '/world-cup-2026-groups' }
            ]} 
            className="justify-center mb-12"
          />

          <div className="flex items-center justify-center gap-4 mb-6">
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
       <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Groups, Teams & Match Schedule</span>
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
       <Link href="/world-cup-2026-prediction-game" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-slate-900 dark:text-white rounded-full font-bold transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2">
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
      className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-white/10 mb-16 relative overflow-hidden"
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

   {/* Tournament Format Overview */}
   <section className="mb-24">
     <div className="flex items-center gap-3 mb-8">
       <div className="h-10 w-2 bg-emerald-500 rounded-full" />
       <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
         Tournament Format & Rules
       </h2>
     </div>
     
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
         <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
           <Users size={24} />
         </div>
         <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">48 Teams</h3>
         <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
           The biggest World Cup ever. 48 nations divided into 12 groups of 4 teams each. A massive expansion from the previous 32-team era.
         </p>
       </div>
       
       <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
         <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
           <TrendingUp size={24} />
         </div>
         <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Advancement</h3>
         <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
           Top 2 teams from each group + the 8 best 3rd-place teams advance to the Round of 32. Every match counts until the final whistle.
         </p>
       </div>

       <div className="bg-white dark:bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
         <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
           <Calendar size={24} />
         </div>
         <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Schedule</h3>
         <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
           3 matches per team in the group stage. Points system: 3 for a Win, 1 for a Draw, 0 for a Loss. Tiebreakers decided by Goal Difference.
         </p>
       </div>
     </div>
   </section>

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
       whileInView="show"
       viewport={{ once: true, margin: "-50px" }}
       className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
     >
       {Object.entries(GROUPS).map(([groupLetter, teamIds]) => (
        <motion.div 
          key={groupLetter}
          variants={itemVariants}
          className="group bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-50/50 dark:bg-white/5">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Group {groupLetter}</h3>
            <Link href={`/world-cup-2026-groups/group-${groupLetter.toLowerCase()}`} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 uppercase tracking-wider flex items-center gap-1">
              Analysis <ArrowRight size={12} />
            </Link>
          </div>
          <div className="p-4 space-y-3">
            {teamIds.map((teamId, idx) => {
              const teamData = TEAM_MAP.get(teamId);
              if (!teamData) return null;
              
              const isPlaceholder = teamData.name.startsWith('PO');

              return (
                <div key={idx} className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <div className="w-12 h-8 rounded shadow-sm overflow-hidden flex items-center justify-center relative bg-slate-100 dark:bg-white/5">
                     {isPlaceholder ? (
                       <span className="text-[10px] font-bold text-slate-900 dark:text-slate-200 tracking-tighter uppercase">FIFA</span>
                     ) : teamData.flagUrl ? (
                       <Image 
                         src={teamData.flagUrl} 
                         alt={`${teamData.name} Flag`} 
                         fill
                         className="object-cover"
                       />
                     ) : (
                       <span className="text-[10px] font-bold text-slate-400">{teamData.code}</span>
                     )}
                   </div>
                   <div className="flex-1">
                     <div className="flex items-center gap-2">
                       <div className="font-semibold text-slate-900 dark:text-slate-200 leading-tight">
                         {teamData.name}
                       </div>
                       {PLAYOFF_INFO[teamId] && (
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
                                 {PLAYOFF_INFO[teamId]}
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
                     {!isPlaceholder && (
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

   {/* Host Cities Section - Apple Style Redesign */}
  <section className="mb-32">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <motion.span 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.2em] text-sm mb-4 block"
      >
        Geography of the Tournament
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight"
      >
        Host Cities by Region
      </motion.h2>
    </div>
    
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {Object.entries(HOST_REGIONS).map(([key, region]) => (
        <motion.div 
          key={key} 
          variants={itemVariants}
          className="group relative bg-white dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-200 dark:border-white/5 p-10 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-500 overflow-hidden"
        >
          {/* Decorative background element */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{region.name}</h3>
              <span className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                {region.cities.length} Cities
              </span>
            </div>
            
            <ul className="space-y-4">
              {region.cities.map((city) => (
                <li key={city}>
                  <Link 
                    href={`/world-cup-2026-${getCitySlug(city)}-guide`}
                    className="flex items-center group/link"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover/link:bg-blue-600 group-hover/link:text-white transition-all duration-300 mr-4">
                      <MapPin size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold text-slate-700 dark:text-slate-200 group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400 transition-colors">
                        {city}
                      </span>
                      <span className="text-xs text-slate-400 uppercase tracking-widest font-medium opacity-0 group-hover/link:opacity-100 transition-opacity">
                        View Guide
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </section>

   {/* Key Narratives */}
   <section className="mb-24">
     <div className="flex items-center gap-3 mb-8">
       <div className="h-10 w-2 bg-amber-500 rounded-full" />
       <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
         Key Narratives to Watch
       </h2>
     </div>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-amber-500/50 transition-colors">
         <Zap size={32} className="text-amber-500 mb-4" />
         <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">The "Group of Death"</h3>
         <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
           With the expanded field, the concentration of elite teams might dilute, but expect at least one group where three giants collide.
         </p>
       </div>
       <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-amber-500/50 transition-colors">
         <Globe size={32} className="text-amber-500 mb-4" />
         <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Host Advantage</h3>
         <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
           USA, Mexico, and Canada play all group matches on home soil. Can they leverage the home crowd to top their groups?
         </p>
       </div>
       <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-amber-500/50 transition-colors">
         <TrendingUp size={32} className="text-amber-500 mb-4" />
         <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Underdog Stories</h3>
         <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
           New slots for CAF, AFC, and CONCACAF mean debutant nations. Who will be the 2026 version of Morocco 2022?
         </p>
       </div>
     </div>
   </section>

   {/* Historical Context & Stats */}
  <section className="mb-24">
    <div className="bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-center md:text-left border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
       <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 font-bold text-sm">
              <History size={16} /> Historical Context
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
              A Tournament of Firsts
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              2026 marks the first time three nations co-host the World Cup. It's also the debut of the 48-team format, resulting in 104 total matches—40 more than previous tournaments.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">104</div>
                <div className="text-sm text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total Matches</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">16</div>
                <div className="text-sm text-slate-400 dark:text-slate-500 uppercase tracking-wider">Host Cities</div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Info size={20} className="text-blue-600 dark:text-blue-400" /> Key Dates & Timeline
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-col items-center hidden md:flex">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <div className="w-0.5 h-full bg-slate-200 dark:bg-white/10 my-1" />
                </div>
                <div>
                  <div className="text-blue-600 dark:text-blue-400 font-bold text-sm mb-1">Late 2025</div>
                  <div className="text-slate-900 dark:text-white font-semibold">Official Final Draw</div>
                  <div className="text-slate-400 text-sm">Teams assigned to groups A-L</div>
                </div>
              </div>
              <div className="flex gap-4">
                 <div className="flex-col items-center hidden md:flex">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <div className="w-0.5 h-full bg-slate-200 dark:bg-white/10 my-1" />
                </div>
                <div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-1">June 11, 2026</div>
                  <div className="text-slate-900 dark:text-white font-semibold">Opening Match</div>
                  <div className="text-slate-400 text-sm">Estadio Azteca, Mexico City</div>
                </div>
              </div>
              <div className="flex gap-4">
                 <div className="flex-col items-center hidden md:flex">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                </div>
                <div>
                  <div className="text-amber-600 dark:text-amber-400 font-bold text-sm mb-1">July 19, 2026</div>
                  <div className="text-slate-900 dark:text-white font-semibold">World Cup Final</div>
                  <div className="text-slate-400 text-sm">MetLife Stadium, New York/NJ</div>
                </div>
              </div>
            </div>
          </div>
       </div>
    </div>
  </section>

   {/* Fan Resources */}
  <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-slate-900 dark:text-white relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
        <Shield size={120} />
      </div>
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Shield size={24} /> Safety Guide
        </h3>
        <p className="text-blue-100 mb-6 leading-relaxed">
          Stay safe during your World Cup trip. Essential safety tips, emergency contacts, and local laws for all host countries.
        </p>
        <Link href="/world-cup-2026-safety-guide" className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors">
          View Safety Guide <ArrowRight size={16} />
        </Link>
      </div>
    </div>

    <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-8 text-slate-900 dark:text-white relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
        <Plane size={120} />
      </div>
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Plane size={24} /> Travel Tips
        </h3>
        <p className="text-emerald-100 mb-6 leading-relaxed">
          Essential travel advice for navigating USA, Mexico, and Canada. Flight booking, accommodation, and packing guides.
        </p>
        <Link href="/world-cup-2026-travel-tips" className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors">
          Get Travel Tips <ArrowRight size={16} />
        </Link>
      </div>
    </div>

    <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 text-slate-900 dark:text-white relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
        <MapPin size={120} />
      </div>
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <MapPin size={24} /> Stadiums
        </h3>
        <p className="text-purple-100 mb-6 leading-relaxed">
          Explore all 16 world-class venues. Seating charts, stadium amenities, and match schedules for every arena.
        </p>
        <Link href="/world-cup-2026-stadiums" className="inline-flex items-center gap-2 bg-white text-purple-700 px-6 py-3 rounded-full font-bold hover:bg-purple-50 transition-colors">
          View Stadiums <ArrowRight size={16} />
        </Link>
      </div>
    </div>
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
       {EXPANDED_FAQS.map((faq, index) => (
         <details key={index} className="group bg-white dark:bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-200 dark:border-slate-800 overflow-hidden open:ring-2 open:ring-blue-500/20">
           <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
             <h3 className="text-lg font-bold text-slate-900 dark:text-white pr-8">{faq.question}</h3>
             <span className="text-slate-400 group-open:rotate-180 transition-transform duration-300">
               <ChevronDown size={20} />
             </span>
           </summary>
           <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-4">
             {faq.answer}
           </div>
         </details>
       ))}
     </div>
   </section>

 </main>
</div>
 );
}










