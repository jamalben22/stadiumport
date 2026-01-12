import { HOST_CITIES } from '@/data/host-cities';
import { WORLD_CUP_STADIUMS } from '@/data/stadiums';

export type SearchCategory = 'City' | 'Stadium' | 'Group' | 'Guide' | 'Page' | 'Product' | 'Blog' | 'Category';

export interface SearchResultItem {
  id: string;
  type: SearchCategory;
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  content?: string;
  relevance?: number;
}

// Helper to generate city path
const getCityPath = (cityId: string) => {
  switch (cityId) {
    case 'new-york': return '/world-cup-2026-new-york-new-jersey-guide';
    case 'san-francisco': return '/world-cup-2026-san-francisco-bay-area-guide';
    default: return `/world-cup-2026-${cityId}-guide`;
  }
};

// Helper to generate stadium path
const getStadiumPath = (stadiumId: string) => {
  return `/${stadiumId}-world-cup-2026`;
};

// --- 1. HOST CITIES ---
const cityItems: SearchResultItem[] = HOST_CITIES.map(city => ({
  id: `city-${city.id}`,
  type: 'City',
  title: city.name,
  description: city.description,
  path: getCityPath(city.id),
  image: city.image, // Verified in file list
  keywords: ['host city', 'location', city.region, city.country, ...city.highlights]
}));

// --- 2. STADIUMS ---
const stadiumItems: SearchResultItem[] = WORLD_CUP_STADIUMS.map(stadium => ({
  id: `stadium-${stadium.id}`,
  type: 'Stadium',
  title: stadium.name,
  description: `${stadium.city}, ${stadium.country} • Capacity: ${stadium.capacity}`,
  path: getStadiumPath(stadium.id),
  image: stadium.image, // Verified in file list
  keywords: ['venue', 'arena', 'field', stadium.city, ...stadium.highlights]
}));

// --- 3. GROUPS ---
const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
const groupItems: SearchResultItem[] = groups.map(group => ({
  id: `group-${group.toLowerCase()}`,
  type: 'Group',
  title: `Group ${group}`,
  description: `World Cup 2026 Group ${group} Standings & Fixtures`,
  path: `/world-cup-2026-groups/group-${group.toLowerCase()}`,
  keywords: ['standings', 'fixtures', 'teams', 'match schedule', 'bracket']
}));

// --- 4. GUIDES & PAGES (Verified Paths) ---
const contentItems: SearchResultItem[] = [
  {
    id: 'guide-safety',
    type: 'Guide',
    title: 'Safety Guide',
    description: 'Comprehensive safety tips for World Cup 2026 travelers',
    path: '/world-cup-2026-safety-guide',
    image: '/images/safety-guide/A_realistic_high-detail_photo_representing_overall_fan_safety_for_World_Cup_2026.webp',
    keywords: ['security', 'emergency', 'help', 'safe']
  },
  {
    id: 'guide-accommodation',
    type: 'Guide',
    title: 'Accommodation Guide',
    description: 'Where to stay: Hotels, hostels, and booking tips',
    path: '/world-cup-2026-accommodation-guide',
    keywords: ['hotels', 'stay', 'booking', 'lodging']
  },
  {
    id: 'guide-transportation',
    type: 'Guide',
    title: 'Transportation Safety',
    description: 'Getting around safely: Public transit, taxis, and rideshare',
    path: '/world-cup-2026-transportation-safety',
    image: '/images/safety-guide/A_realistic_high-detail_photo_depicting_safe_transportation_in_a_World_Cup_2026.webp',
    keywords: ['travel', 'transit', 'bus', 'train', 'uber']
  },
  {
    id: 'guide-solo-travel',
    type: 'Guide',
    title: 'Solo Travel Guide',
    description: 'Safety tips and advice for solo travelers',
    path: '/world-cup-2026-solo-travel-safety-guide',
    image: '/images/safety-guide/A_realistic_high-detail_photo_of_a_solo_traveler_at_a_World_Cup_2026_host_city.webp',
    keywords: ['alone', 'single', 'backpacking']
  },
  {
    id: 'guide-family',
    type: 'Guide',
    title: 'Family Safety Guide',
    description: 'Traveling with children: Safety and activities',
    path: '/world-cup-2026-family-safety-guide',
    image: '/images/safety-guide/A_realistic_high-detail_photo_of_a_family_with_children_entering_or_walking_near.webp',
    keywords: ['kids', 'children', 'family friendly']
  },
  {
    id: 'guide-medical',
    type: 'Guide',
    title: 'Medical Preparedness',
    description: 'Health safety, hospitals, and pharmacies',
    path: '/world-cup-2026-health-medical-preparedness',
    image: '/images/safety-guide/A_realistic_high-detail_photo_showing_a_travel_medical_essentials_layout_for_World_cup_2026.webp',
    keywords: ['health', 'hospital', 'doctor', 'emergency', 'insurance']
  },
  {
    id: 'guide-insurance',
    type: 'Guide',
    title: 'Travel Insurance Guide',
    description: 'Why you need it and what to cover',
    path: '/world-cup-2026-travel-insurance-guide',
    image: '/images/safety-guide/A_realistic_high-detail_photo_of_travel_insurance_essentials_for_World_Cup_2026.webp',
    keywords: ['coverage', 'protection', 'medical insurance']
  },
  {
    id: 'guide-emergency',
    type: 'Guide',
    title: 'Emergency Contacts',
    description: 'Essential numbers and resources for all host countries',
    path: '/world-cup-2026-emergency-contacts-resources',
    image: '/images/safety-guide/A_realistic_high-detail_photo_of_essential_emergency_resources_for_World_Cup_2026.webp',
    keywords: ['911', 'police', 'ambulance', 'embassy']
  },
  {
    id: 'guide-scams',
    type: 'Guide',
    title: 'Avoid Scams & Fraud',
    description: 'Common tourist scams and how to avoid them',
    path: '/world-cup-2026-scams-avoid-fraud',
    image: '/images/safety-guide/A_realistic_photo-style_image_showing_a_worried_football_fan_reviewing_suspiciou.webp',
    keywords: ['fraud', 'fake tickets', 'theft', 'pickpocket']
  },
  {
    id: 'guide-laws',
    type: 'Guide',
    title: 'Local Laws & Etiquette',
    description: 'Cultural norms and laws in USA, Canada, and Mexico',
    path: '/world-cup-2026-local-laws-etiquette',
    keywords: ['rules', 'culture', 'legal', 'drinking']
  },
  {
    id: 'guide-flights',
    type: 'Guide',
    title: 'Flight Booking Guide',
    description: 'Tips for booking flights to World Cup host cities',
    path: '/world-cup-2026-flight-booking-guide',
    keywords: ['air travel', 'plane', 'tickets', 'airport']
  },
  {
    id: 'guide-packing',
    type: 'Guide',
    title: 'Packing Guide',
    description: 'Essential items to pack for the tournament',
    path: '/world-cup-2026-packing-guide',
    keywords: ['luggage', 'clothes', 'weather', 'checklist']
  },
  {
    id: 'guide-connectivity',
    type: 'Guide',
    title: 'Connectivity & SIM Cards',
    description: 'Staying connected: eSIMs, Wi-Fi, and roaming',
    path: '/world-cup-2026-connectivity-sim-cards-emergency-communications',
    keywords: ['internet', 'phone', 'data', 'wifi', 'mobile']
  },
   {
    id: 'guide-dining',
    type: 'Guide',
    title: 'Food & Dining Guide',
    description: 'Best places to eat in host cities',
    path: '/world-cup-2026-food-dining-guide',
    keywords: ['restaurants', 'eat', 'cuisine', 'local food']
  },
  {
    id: 'page-prediction',
    type: 'Page',
    title: 'Prediction Game',
    description: 'Predict match results and compete with friends',
    path: '/world-cup-2026-prediction-game',
    keywords: ['contest', 'game', 'play', 'bracket']
  },
  {
    id: 'page-draw',
    type: 'Page',
    title: 'Draw Travel Hub',
    description: 'Plan your travel based on the official draw',
    path: '/world-cup-2026-draw-travel-hub',
    keywords: ['schedule', 'planning', 'itinerary']
  }
];

// --- 5. PRODUCTS (Mapped to relevant guides/pages) ---
const productItems: SearchResultItem[] = [
  {
    id: 'prod-esim',
    type: 'Product',
    title: 'Travel eSIM',
    description: 'Stay connected in USA, Canada & Mexico. Instant activation.',
    path: '/world-cup-2026-connectivity-sim-cards-emergency-communications', // Mapped to connectivity guide
    keywords: ['data', 'internet', 'phone', 'roaming']
  },
  {
    id: 'prod-tickets',
    type: 'Product',
    title: 'Match Tickets Info',
    description: 'Strategy and tips for securing World Cup tickets',
    path: '/world-cup-2026-match-selection-strategy',
    keywords: ['buy', 'seats', 'prices', 'fifa']
  },
  {
    id: 'prod-hotels',
    type: 'Product',
    title: 'Hotel Booking',
    description: 'Find the best rates for your stay',
    path: '/world-cup-2026-accommodation-guide',
    keywords: ['room', 'stay', 'reservation']
  },
  {
    id: 'prod-flights',
    type: 'Product',
    title: 'Flight Deals',
    description: 'Find the best flight options',
    path: '/world-cup-2026-flight-booking-guide',
    keywords: ['air', 'plane', 'travel']
  }
];

// --- 6. CATEGORIES ---
const categoryItems: SearchResultItem[] = [
  {
    id: 'cat-host-cities',
    type: 'Category',
    title: 'Host Cities',
    description: 'Explore all 16 host cities',
    path: '/world-cup-2026-host-cities',
    keywords: ['locations', 'venues', 'map']
  },
  {
    id: 'cat-stadiums',
    type: 'Category',
    title: 'Stadiums',
    description: 'View all World Cup stadiums',
    path: '/world-cup-2026-stadiums',
    keywords: ['arenas', 'fields']
  },
  {
    id: 'cat-groups',
    type: 'Category',
    title: 'Groups',
    description: 'View all groups and teams',
    path: '/world-cup-2026-groups',
    keywords: ['teams', 'countries', 'bracket']
  }
];

// Combine all items
export const SEARCH_DATA: SearchResultItem[] = [
  ...cityItems,
  ...stadiumItems,
  ...groupItems,
  ...contentItems,
  ...productItems,
  ...categoryItems
];
