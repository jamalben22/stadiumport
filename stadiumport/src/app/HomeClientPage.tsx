'use client';

import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { HostCitiesSection } from '@/components/home/HostCitiesSection';
import { PlanningHub } from '@/components/home/PlanningHub';
import { TrustSection } from '@/components/home/TrustSection';
import { CTASection } from '@/components/home/CTASection';

export default function HomeClientPage() {
  return (
    <div className="min-h-screen font-sans selection:bg-emerald-500/30 bg-[#F5F5F7] dark:bg-[#0A0A0A]">
      <main>
        {/* New Apple/Nike Style Hero Section */}
        <HeroSection />

        {/* Replaced Original City Grid with New HostCitiesSection Component */}
        <HostCitiesSection />

        {/* New Apple-style Planning Hub replacing original widgets section */}
        <PlanningHub />

        <TrustSection />

        <CTASection />
      </main>
    </div>
  );
}

