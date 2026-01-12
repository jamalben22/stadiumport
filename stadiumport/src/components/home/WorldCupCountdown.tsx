"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const WorldCupCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date('2026-06-11T00:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="
          relative flex items-center gap-6 md:gap-12 px-8 md:px-14 py-4 md:py-6
          bg-white/70 dark:bg-white/[0.03] backdrop-blur-2xl
          border border-black/[0.05] dark:border-white/[0.08]
          rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-none
          group cursor-default overflow-hidden
        "
      >
        {/* Subtle Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

        {/* Status Indicator */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 leading-none">
                Road to 2026
              </span>
            </div>
            <span className="text-base md:text-xl font-bold text-slate-900 dark:text-white leading-none whitespace-nowrap tracking-tight">
              FIFA World Cup
            </span>
          </div>
        </div>

        {/* Minimalist Divider */}
        <div className="h-10 w-px bg-black/[0.08] dark:bg-white/[0.1] relative z-10" />

        {/* Timer Grid */}
        <div className="flex items-center gap-6 md:gap-10 relative z-10">
          <TimeUnit value={timeLeft.days} label="days" />
          <TimeUnit value={timeLeft.hours} label="hrs" />
          <TimeUnit value={timeLeft.minutes} label="min" />
          <TimeUnit value={timeLeft.seconds} label="sec" />
        </div>

        {/* Apple-style Shine */}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-20 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:animate-shine" />
      </motion.div>
      
      <style jsx>{`
        @keyframes shine {
          0% { left: -100%; opacity: 0; }
          10% { opacity: 1; }
          100% { left: 200%; opacity: 0; }
        }
        .animate-shine {
          animation: shine 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: number, label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white tabular-nums tracking-tight leading-none mb-1">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="text-[10px] md:text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider leading-none">
      {label}
    </span>
  </div>
);
