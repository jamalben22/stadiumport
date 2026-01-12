import React from 'react';
import { Metadata } from 'next';
import { HeroSection } from '../components/home/HeroSection';
import { WorldCupCountdown } from '../components/home/WorldCupCountdown';
import { TournamentOverview } from '../components/home/TournamentOverview';
import { HostCitiesSection } from '../components/home/HostCitiesSection';
import { PlanningHub } from '../components/home/PlanningHub';
import { LatestUpdates } from '../components/home/LatestUpdates';
import { TrustSection } from '../components/home/TrustSection';
import { FAQSection } from '../components/home/FAQSection';
import { CTASection } from '../components/home/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';
import { 
  generateSportsEventSchema, 
  generateFAQSchema, 
  generateWebsiteSchema,
  generateBreadcrumbSchema
} from '@/lib/schema';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'World Cup 2026 Travel Guide: USA, Canada & Mexico',
  description: 'The #1 World Cup 2026 travel guide. Expert planning resources for all 16 host cities, stadiums, tickets & match schedules. Plan your 2026 trip now!',
  keywords: [
    'World Cup 2026',
    'World Cup 2026 Travel Guide',
    'FIFA World Cup 2026',
    'World Cup Host Cities',
    'World Cup 2026 Stadiums',
    'World Cup 2026 Tickets',
    'USA Mexico Canada World Cup',
    'stadiumport',
    'World Cup 2026 Hotels',
    'World Cup 2026 Flights'
  ],
  image: '/images/cities/new-york-new-jersey-world-cup-2026-1600.webp',
  path: '/',
});

// Add hreflang for homepage specifically
metadata.alternates = {
  ...metadata.alternates,
  languages: {
    'en': 'https://stadiumport.com',
    'x-default': 'https://stadiumport.com',
  },
};

const faqSchema = generateFAQSchema([
  {
    question: "When is the World Cup 2026?",
    answer: "The 2026 FIFA World Cup will take place from June 11 to July 19, 2026."
  },
  {
    question: "Where is the World Cup 2026 being held?",
    answer: "It is being jointly hosted by 16 cities across the United States, Mexico, and Canada."
  },
  {
    question: "How many teams are in the 2026 World Cup?",
    answer: "The tournament will feature 48 teams, expanded from the previous 32-team format."
  },
  {
    question: "What are the World Cup 2026 host cities?",
    answer: "The 16 host cities are: Atlanta, Boston, Dallas, Houston, Kansas City, Los Angeles, Miami, New York/New Jersey, Philadelphia, San Francisco Bay Area, Seattle (USA); Guadalajara, Mexico City, Monterrey (Mexico); Toronto, Vancouver (Canada)."
  }
]);

const eventSchema = generateSportsEventSchema({
  name: "FIFA World Cup 2026",
  startDate: "2026-06-11",
  endDate: "2026-07-19",
  location: [
    { name: "United States", address: "United States", country: "US" },
    { name: "Mexico", address: "Mexico", country: "MX" },
    { name: "Canada", address: "Canada", country: "CA" }
  ],
  image: "/images/cities/new-york-new-jersey-world-cup-2026-1600.webp",
  description: "The 2026 FIFA World Cup will be the 23rd FIFA World Cup, jointly hosted by 16 cities across the United States, Mexico, and Canada.",
  offers: {
    "@type": "AggregateOffer",
    "url": "https://www.fifa.com/tickets",
    "priceCurrency": "USD",
    "availability": "https://schema.org/PreOrder"
  }
});
const websiteSchema = generateWebsiteSchema();
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', item: '/' }
]);

export default function HomePage() {
  return (
    <>
      <JsonLd schema={websiteSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={faqSchema} />
      <JsonLd schema={eventSchema} />
      <HeroSection />
      
      {/* Countdown Section between Hero and Overview */}
      <div className="bg-[#F5F5F7] dark:bg-[#0A0A0A] py-16 flex justify-center">
        <WorldCupCountdown />
      </div>

      <TournamentOverview />
      <HostCitiesSection />
      <PlanningHub />
      <LatestUpdates />
      <TrustSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
