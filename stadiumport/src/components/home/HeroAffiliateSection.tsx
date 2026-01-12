"use client";

import { motion } from 'framer-motion';
import { Plane, Hotel, Map, ArrowRight, ShieldCheck, Shirt } from 'lucide-react';
import Link from 'next/link';

export const HeroAffiliateSection = () => {
  const widgets = [
    {
      id: 'flights',
      icon: Plane,
      title: "Book Flights",
      subtitle: "Compare routes to all 16 host cities.",
      cta: "Find Deals",
      href: "/world-cup-2026-flight-booking-guide",
      color: "bg-blue-500",
      delay: 0.6
    },
    {
      id: 'hotels',
      icon: Hotel,
      title: "Reserve Stays",
      subtitle: "Top-rated hotels near the stadiums.",
      cta: "View Hotels",
      href: "/world-cup-2026-accommodation-guide",
      color: "bg-amber-500",
      delay: 0.7
    },
    {
      id: 'packages',
      icon: Map,
      title: "Plan Your Trip",
      subtitle: "Itineraries, bundles, and travel tips.",
      cta: "Start Planning",
      href: "/world-cup-2026-itinerary-planning",
      color: "bg-emerald-500",
      delay: 0.8
    },
    {
      id: 'gear',
      icon: Shirt,
      title: "Shop Gear",
      subtitle: "Official jerseys and fan merchandise.",
      cta: "Shop Now",
      href: "https://www.fanatics.com/soccer",
      color: "bg-rose-500",
      delay: 0.9
    }
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {widgets.map((widget) => (
        <motion.div
          key={widget.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: widget.delay, ease: [0.16, 1, 0.3, 1] }}
          className="group relative"
        >
          <Link href={widget.href} className="block">
            <div className="relative overflow-hidden rounded-2xl bg-card/50 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 p-5 hover:bg-card/80 dark:hover:bg-white/10 hover:border-black/10 dark:hover:border-white/20 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-black/10 dark:group-hover:shadow-black/50 group-hover:-translate-y-1">
              
              {/* Subtle Gradient Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-black/5 dark:via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
              
              <div className="flex items-center gap-5 relative z-10">
                {/* Icon Box */}
                <div className={`w-12 h-12 rounded-2xl ${widget.color}/20 flex items-center justify-center border border-black/5 dark:border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                  <widget.icon className={`w-6 h-6 text-foreground`} strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-foreground font-bold text-lg tracking-tight leading-tight mb-1 group-hover:text-emerald-500 transition-colors">
                    {widget.title}
                  </h3>
                  <p className="text-muted-foreground text-xs font-medium truncate">
                    {widget.subtitle}
                  </p>
                </div>

                {/* Apple-style Button (Uniform Size) */}
                <div className="h-9 w-32 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center gap-1 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-300 shadow-lg shadow-black/10 dark:shadow-black/20 whitespace-nowrap">
                  {widget.cta}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}

      {/* Trust Indicator */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1, duration: 1 }}
        className="flex justify-end pr-2"
      >
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground/40 uppercase tracking-widest">
          <ShieldCheck className="w-3 h-3" />
          <span>Official Partners</span>
        </div>
      </motion.div>
    </div>
  );
};
