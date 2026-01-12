"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ChevronRight } from 'lucide-react';
import { DarkModeToggle } from '../base/DarkModeToggle';
import { SearchModal } from './SearchModal';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();
  const previousBodyOverflowRef = useRef<string | null>(null);

  const isActive = (path: string) => pathname === path;

  // Keyboard Shortcut for Search (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark Mode Detection
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when menu/search is open
  useEffect(() => {
    const shouldLock = isMenuOpen || isSearchOpen;
    if (shouldLock) {
      if (previousBodyOverflowRef.current === null) {
        previousBodyOverflowRef.current = document.body.style.overflow ?? '';
      }
      document.body.style.overflow = 'hidden';
      return;
    }

    if (previousBodyOverflowRef.current !== null) {
      document.body.style.overflow = previousBodyOverflowRef.current;
      previousBodyOverflowRef.current = null;
    }
  }, [isMenuOpen, isSearchOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (previousBodyOverflowRef.current !== null) {
        document.body.style.overflow = previousBodyOverflowRef.current;
        previousBodyOverflowRef.current = null;
      }
    };
  }, []);

  // Navigation Items
  const navItems = [
    { label: 'Groups', path: '/world-cup-2026-groups' },
    { label: 'Host Cities', path: '/world-cup-2026-host-cities' },
    { label: 'Stadiums', path: '/world-cup-2026-stadiums' },
    { label: 'Draw Hub', path: '/world-cup-2026-draw-travel-hub' },
    { label: 'Predictor', path: '/world-cup-2026-prediction-game' },
  ];

  // Hide header on prediction game pages
  if (pathname?.startsWith('/world-cup-2026-prediction-game')) {
    return null;
  }

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isScrolled 
            ? 'h-14 lg:h-16 bg-[#F5F5F7]/80 dark:bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10' 
            : 'h-16 lg:h-20 bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 h-full flex items-center justify-between">
          
          {/* Left: Logo */}
          <Link href="/" className="relative z-50 group" aria-label="stadiumport Home">
             <div className="relative">
                {/* Desktop Logo */}
                <div className="hidden lg:block relative h-8 w-40">
                  <Image 
                    src="/images/Logos/stadiumport-header-logo-light.svg"
                    alt="stadiumport"
                    fill
                    className={`object-contain transition-all duration-300 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
                  />
                  <Image 
                    src="/images/Logos/stadiumport-header-logo-dark.svg"
                    alt="stadiumport"
                    fill
                    className={`absolute top-0 left-0 object-contain transition-all duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
                  />
                </div>
                {/* Mobile Logo */}
                <div className="lg:hidden relative h-7 sm:h-8 w-32">
                   <Image 
                    src="/images/Logos/stadiumport-mobile-logo-light.svg"
                    alt="stadiumport"
                    fill
                    className={`object-contain transition-all duration-300 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
                  />
                  <Image 
                    src="/images/Logos/stadiumport-mobile-logo-dark.svg"
                    alt="stadiumport"
                    fill
                    className={`absolute top-0 left-0 object-contain transition-all duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
                  />
                </div>
             </div>
          </Link>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-[13px] font-medium tracking-wide transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-black dark:text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 lg:gap-6">
            
            {/* Search Trigger - Apple/Airbnb Style */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="
                group relative flex items-center gap-3 px-3 py-2 lg:px-4 lg:py-2.5 
                rounded-full transition-all duration-300 outline-none
                bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 
                border border-black/5 dark:border-white/10 hover:border-black/10 dark:hover:border-white/20
                shadow-sm hover:shadow-md backdrop-blur-md
              "
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
              <span className="hidden lg:block text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                Search
              </span>
              <span className="hidden lg:flex items-center gap-1 ml-1 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-[10px] font-medium text-gray-400">
                <span className="text-xs">⌘</span>K
              </span>
            </button>

            {/* Dark Mode Toggle */}
            <div className="block">
               <DarkModeToggle />
            </div>

            {/* Mobile Menu Trigger */}
            <button
              className="lg:hidden p-2 text-slate-900 dark:text-white relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-[#F5F5F7] dark:bg-[#0A0A0A] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full pt-28 px-8 pb-12 overflow-y-auto">
          <nav className="flex flex-col gap-6">
            {navItems.map((item, idx) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-medium tracking-tight text-slate-900 dark:text-white flex items-center justify-between group border-b border-black/5 dark:border-white/10 pb-4"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {item.label}
                <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

