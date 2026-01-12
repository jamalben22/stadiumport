'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Calendar, Trophy, ArrowRight, ExternalLink, ChevronRight, Clock, Sparkles, FileText, Hash, TrendingUp, AlertCircle, ShoppingBag, Tag, ChevronDown, CornerDownRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { SEARCH_DATA, SearchResultItem, SearchCategory } from '@/lib/search-data';

// --- Configuration ---

const TYPE_PRIORITY: Record<string, number> = {
  'City': 1,
  'Stadium': 2,
  'Product': 3,
  'Group': 4,
  'Guide': 5,
  'Blog': 6,
  'Page': 7,
  'Category': 8
};

// --- Icons Helper ---

const getIconForType = (type: SearchCategory) => {
  switch (type) {
    case 'City': return MapPin;
    case 'Stadium': return Trophy;
    case 'Group': return Hash;
    case 'Guide': return FileText;
    case 'Page': return Sparkles;
    case 'Product': return ShoppingBag;
    case 'Category': return Tag;
    default: return Search;
  }
};

const getColorForType = (type: SearchCategory) => {
  switch (type) {
    case 'City': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
    case 'Stadium': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400';
    case 'Group': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
    case 'Guide': return 'bg-orange-500/10 text-orange-600 dark:text-orange-400';
    case 'Page': return 'bg-slate-500/10 text-slate-600 dark:text-slate-400';
    case 'Product': return 'bg-pink-500/10 text-pink-600 dark:text-pink-400';
    default: return 'bg-slate-100 text-slate-500';
  }
};

// --- Highlight Helper ---

const HighlightedText = ({ text, matches, field }: { text: string, matches?: readonly any[], field: string }) => {
  if (!matches) return <span className="truncate">{text}</span>;
  const match = matches.find((m: any) => m.key === field);
  if (!match || !match.indices) return <span className="truncate">{text}</span>;

  const indices = match.indices;
  let lastIndex = 0;
  const parts = [];

  indices.forEach(([start, end]: [number, number], i: number) => {
    if (start > lastIndex) {
      parts.push(<span key={`text-${i}`}>{text.substring(lastIndex, start)}</span>);
    }
    parts.push(
      <span key={`match-${i}`} className="font-bold text-black dark:text-white bg-yellow-200/50 dark:bg-yellow-500/30 rounded-[1px] px-0.5">
        {text.substring(start, end + 1)}
      </span>
    );
    lastIndex = end + 1;
  });

  if (lastIndex < text.length) {
    parts.push(<span key="text-end">{text.substring(lastIndex)}</span>);
  }

  return <span className="truncate">{parts}</span>;
};

// --- Image Component ---

const ImageWithFallback = ({ 
  src, 
  alt, 
  type, 
  className 
}: { 
  src?: string, 
  alt: string, 
  type: SearchCategory, 
  className?: string 
}) => {
  const [error, setError] = useState(false);
  const Icon = getIconForType(type);
  const colorClass = getColorForType(type);

  if (!src || error) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${colorClass} ${className}`}>
        <Icon className="w-6 h-6" />
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={() => setError(true)}
    />
  );
};

// --- Component ---

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Fuse.FuseResult<SearchResultItem>[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Initialize Fuse instance
  const fuse = useMemo(() => new Fuse(SEARCH_DATA, {
    keys: [
      { name: 'title', weight: 0.8 }, // Title is most important
      { name: 'keywords', weight: 0.6 },
      { name: 'type', weight: 0.4 },
      { name: 'description', weight: 0.3 }
    ],
    threshold: 0.3,
    distance: 100,
    includeMatches: true,
    minMatchCharLength: 2,
    shouldSort: true,
    ignoreLocation: true // Find matches anywhere in the string
  }), []);

  // Load recent searches
  useEffect(() => {
    const saved = localStorage.getItem('stadiumport_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      } catch (e) {
        console.error('Failed to parse recent searches', e);
      }
    }
  }, []);

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const newRecent = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(newRecent);
    localStorage.setItem('stadiumport_recent_searches', JSON.stringify(newRecent));
  };

  // Search Logic (Grouped & Sorted)
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const timeoutId = setTimeout(() => {
      const fuseResults = fuse.search(query);
      
      // Sort results by Type Priority, then by Score (relevance)
      // Fuse score is 0 (perfect) to 1 (mismatch), so lower is better.
      // We want to group by type, but within groups keep relevance.
      const sortedResults = [...fuseResults].sort((a, b) => {
        const typeA = TYPE_PRIORITY[a.item.type] || 99;
        const typeB = TYPE_PRIORITY[b.item.type] || 99;
        
        if (typeA !== typeB) {
          return typeA - typeB;
        }
        return (a.score || 0) - (b.score || 0);
      });

      setResults(sortedResults.slice(0, 50)); // Show more results to populate groups
      setSelectedIndex(0);
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [query, fuse]);

  // Focus Input on Open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleSelect = useCallback((item: SearchResultItem) => {
    saveRecentSearch(item.title);
    onClose();
    router.push(item.path);
  }, [onClose, router, recentSearches]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent | KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (results.length > 0 ? results.length : 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + (results.length > 0 ? results.length : 1)) % (results.length > 0 ? results.length : 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results.length > 0 && results[selectedIndex]) {
        handleSelect(results[selectedIndex].item);
      } else if (query.trim()) {
        // Fallback to first result if available
        if (results.length > 0) handleSelect(results[0].item);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [results, selectedIndex, handleSelect, onClose, query]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Ensure selected item is in view
  useEffect(() => {
    if (listRef.current && results.length > 0) {
      // We need to find the element with data-index={selectedIndex}
      const selectedElement = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex, results]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-md z-[100]"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-2 left-0 right-0 mx-auto w-full max-w-2xl z-[101] px-4 sm:top-12"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col max-h-[80vh] sm:max-h-[85vh]">
              
              {/* Search Header */}
              <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3 bg-white dark:bg-gray-900 z-10">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search cities, gear, guides..."
                  className="flex-1 bg-transparent text-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                />
                {query && (
                  <button onClick={() => { setQuery(''); inputRef.current?.focus(); }} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-400">
                    <X className="w-4 h-4" />
                  </button>
                )}
                <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 font-medium px-2">
                  <span className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700">ESC</span>
                </div>
              </div>

              {/* Results Area */}
              <div className="overflow-y-auto custom-scrollbar bg-[#F9FAFB] dark:bg-[#000000]" ref={listRef}>
                {query.trim() === '' ? (
                  // Empty State - Recent & Popular
                  <div className="p-4 space-y-8">
                    {recentSearches.length > 0 && (
                      <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">Recent Searches</h3>
                        <div className="space-y-1">
                          {recentSearches.map((term, i) => (
                            <button
                              key={i}
                              onClick={() => { setQuery(term); inputRef.current?.focus(); }}
                              className="flex items-center gap-3 w-full p-2.5 hover:bg-white dark:hover:bg-gray-800 rounded-xl group transition-all text-left border border-transparent hover:border-gray-100 dark:hover:border-gray-700 hover:shadow-sm"
                            >
                              <Clock className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                              <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white font-medium">{term}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">Popular Suggestions</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          { term: 'New York', desc: 'Host City' },
                          { term: 'Match Tickets', desc: 'Official Sales' },
                          { term: 'Group A', desc: 'Standings & Fixtures' },
                          { term: 'Travel Insurance', desc: 'Safety Guide' },
                          { term: 'Azteca Stadium', desc: 'Mexico City' },
                          { term: 'Packing List', desc: 'Essentials' }
                        ].map((item) => (
                          <button
                            key={item.term}
                            onClick={() => { setQuery(item.term); inputRef.current?.focus(); }}
                            className="flex items-start gap-3 p-3 hover:bg-white dark:hover:bg-gray-800 rounded-xl transition-all text-left border border-transparent hover:border-gray-100 dark:hover:border-gray-700 hover:shadow-sm group"
                          >
                            <TrendingUp className="w-4 h-4 text-gray-400 mt-0.5 group-hover:text-blue-500" />
                            <div>
                              <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">{item.term}</span>
                              <span className="text-xs text-gray-400">{item.desc}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : results.length > 0 ? (
                  // Search Results
                  <div className="py-2">
                    {results.map((result, index) => {
                      const item = result.item;
                      const Icon = getIconForType(item.type);
                      const isSelected = index === selectedIndex;
                      
                      // Check if this item starts a new group
                      const prevItem = index > 0 ? results[index - 1].item : null;
                      const isNewGroup = !prevItem || prevItem.type !== item.type;

                      return (
                        <div key={item.id}>
                          {/* Group Header */}
                          {isNewGroup && (
                            <div className="px-4 py-2 mt-2 mb-1 text-xs font-bold text-gray-400 uppercase tracking-wider sticky top-0 bg-[#F9FAFB]/95 dark:bg-black/95 backdrop-blur-sm z-10 border-b border-gray-100 dark:border-gray-800/50">
                              {item.type === 'Product' ? 'Products & Gear' : 
                               item.type === 'City' ? 'Host Cities' : 
                               item.type + 's'}
                            </div>
                          )}

                          {/* Result Item */}
                          <div
                            data-index={index}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            className={`
                              mx-2 px-3 py-3 cursor-pointer flex items-start gap-4 transition-all relative rounded-xl
                              ${isSelected 
                                ? 'bg-white dark:bg-gray-800 shadow-sm scale-[1.01]' 
                                : 'hover:bg-white/50 dark:hover:bg-gray-800/30 text-gray-600 dark:text-gray-400'}
                            `}
                          >
                            {/* Icon/Image */}
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden">
                            <ImageWithFallback 
                              src={item.image} 
                              alt={item.title} 
                              type={item.type}
                              className="w-full h-full object-cover"
                            />
                          </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0 flex flex-col justify-center h-12">
                              <div className="flex items-center justify-between">
                                <h4 className={`text-sm font-semibold truncate ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'}`}>
                                  <HighlightedText text={item.title} matches={result.matches} field="title" />
                                </h4>
                                {isSelected && <CornerDownRight className="w-3 h-3 text-blue-400" />}
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-1 mt-0.5">
                                <HighlightedText text={item.description} matches={result.matches} field="description" />
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  // No Results
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No matches for "{query}"
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                      Try searching for a city, team, or category instead.
                    </p>
                    
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-8">
                      <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Explore Categories</h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {['Host Cities', 'Stadiums', 'Tickets', 'Safety', 'Travel', 'Groups'].map((tag) => (
                          <button 
                            key={tag}
                            onClick={() => { setQuery(tag); inputRef.current?.focus(); }}
                            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 rounded-full text-sm font-medium transition-colors shadow-sm"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-[10px] text-gray-400">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1"><kbd className="font-sans bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 shadow-sm">↑↓</kbd> navigate</span>
                  <span className="flex items-center gap-1"><kbd className="font-sans bg-white dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 shadow-sm">↵</kbd> select</span>
                </div>
                <div>
                  <strong>{results.length}</strong> results
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
