"use client";

import { motion } from 'framer-motion';
import { HeroAffiliateSection } from './HeroAffiliateSection';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] lg:h-[100vh] w-full overflow-hidden flex items-center justify-center bg-[#F5F5F7] dark:bg-[#0A0A0A] transition-colors duration-500">
       
       {/* Cinematic Background Image */}
       <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-40 dark:opacity-60 grayscale-[0.5] dark:grayscale-0 transition-all duration-700" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F7] via-[#F5F5F7]/50 to-transparent dark:from-[#0A0A0A] dark:via-[#0A0A0A]/50" />
         <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F7]/80 via-[#F5F5F7]/40 to-transparent dark:from-[#0A0A0A]/80 dark:via-[#0A0A0A]/40" />
       </div>

       {/* Main Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-20">
           
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
             
             {/* Left: Typography (Apple/Nike Style) */}
             <div className="lg:col-span-7 flex flex-col items-start text-left">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 mb-6"
               >
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-xs font-bold text-foreground tracking-widest uppercase">#1 World Cup 2026 Travel Guide</span>
               </motion.div>
               
               <motion.h1 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.3 }}
                 className="font-inter font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-foreground mb-6 leading-[0.95]"
               >
                 World Cup 2026 <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Travel Guide</span>
               </motion.h1>

               <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.4 }}
                 className="font-inter text-lg md:text-xl text-muted-foreground font-medium max-w-xl leading-relaxed mb-10"
               >
                 Plan your trip to USA, Mexico & Canada. The ultimate resource for 16 host cities, 48 teams, and 104 matches.
               </motion.p>
               
               
             </div>

             {/* Right: The Premium Widget Card */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 40 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
               className="lg:col-span-5 w-full max-w-md mx-auto lg:mr-0"
             >
                <HeroAffiliateSection />
             </motion.div>
             
           </div>
        </div>
    </section>
  );
};
