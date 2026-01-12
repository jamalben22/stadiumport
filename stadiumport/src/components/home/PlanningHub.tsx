"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Plane, Building2, Ticket, ShieldCheck, Wifi, Car } from 'lucide-react';
import Link from 'next/link';

// Component for individual feature cards
const FeatureCard = ({ title, subtitle, image, cta, delay, icon: Icon, link = "#" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className="group relative flex flex-col h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500"
  >
    {/* Background Image */}
    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800">
         {/* Replace with actual Next/Image in production */}
         <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
    </div>

    {/* Content */}
    <div className="relative z-10 mt-auto p-6 md:p-8 text-white">
        <div className="mb-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-2xl font-semibold tracking-tight mb-2">{title}</h3>
        <p className="text-white/80 font-medium text-sm md:text-base mb-6 max-w-[80%]">{subtitle}</p>
        
        <Link href={link} className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-white/90 transition-colors">
            {cta}
        </Link>
    </div>
  </motion.div>
);

export const PlanningHub = () => {
  return (
    <section className="py-24 md:py-32 bg-[#F5F5F7] dark:bg-[#0A0A0A] transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header - Airbnb Style */}
        <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
                Plan your experience
            </h2>
            <p className="text-lg text-muted-foreground">
                Everything you need for a seamless journey to World Cup 2026.
            </p>
        </div>

        {/* The Grid - Airbnb Experiences Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <FeatureCard 
                title="Flights"
                subtitle="Find the best routes to all 16 host cities with our flight search engine."
                cta="Search Flights"
                image="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2948&auto=format&fit=crop"
                icon={Plane}
                delay={0}
                link="/world-cup-2026-flight-booking-guide"
            />

            <FeatureCard 
                title="Stays"
                subtitle="From luxury hotels to fan-friendly apartments near the stadiums."
                cta="Find Accommodations"
                image="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2940&auto=format&fit=crop"
                icon={Building2}
                delay={0.1}
                link="/world-cup-2026-accommodation-guide"
            />

            <FeatureCard 
                title="Experiences"
                subtitle="Discover local tours, stadium visits, and fan zones."
                cta="Explore Activities"
                image="https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2940&auto=format&fit=crop"
                icon={Ticket}
                delay={0.2}
                link="/world-cup-2026-host-cities"
            />
            
            {/* Secondary Row - Smaller Cards? Or same size for consistency? Keeping grid consistent. */}
             <FeatureCard 
                title="Travel Insurance"
                subtitle="Protect your trip with comprehensive coverage for peace of mind."
                cta="Get Protected"
                image="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2940&auto=format&fit=crop"
                icon={ShieldCheck}
                delay={0.3}
                link="/world-cup-2026-travel-insurance-guide"
            />

            <FeatureCard 
                title="Connectivity"
                subtitle="Stay online with eSIMs for USA, Mexico, and Canada."
                cta="Get eSIM"
                image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2944&auto=format&fit=crop"
                icon={Wifi}
                delay={0.4}
                link="/world-cup-2026-connectivity-guide"
            />

             <FeatureCard 
                title="Transport"
                subtitle="Rent cars or book transfers between cities effortlessly."
                cta="Book Transport"
                image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2940&auto=format&fit=crop"
                icon={Car}
                delay={0.5}
                link="/world-cup-2026-transportation-safety"
            />

        </div>
      </div>
    </section>
  );
};
