'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@/context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';

const SUGGESTED_QUERIES = [
  'Heavyweight Tee',
  'Wide Leg Trousers',
  'Linen Shirt',
  'Blazer',
  'Knitwear',
  'Outerwear',
  'After Dark',
  'Dresses',
];

export function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const filteredProducts = query.trim() === ''
    ? []
    : products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.gender.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q)
        );
      });

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-[#F8F6F0] overflow-y-auto flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Search Catalog"
        >
          {/* Top Bar */}
          <div className="border-b border-[#E8E3DA] px-6 lg:px-12 py-6 flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.22em] text-[#6B6862]">
              ClothVentive Index
            </span>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#111111] hover:text-[#6B6862] transition-colors p-2"
              aria-label="Close search"
            >
              <span>Close</span>
              <X size={16} />
            </button>
          </div>

          <div className="max-w-4xl w-full mx-auto px-6 py-12 lg:py-16 flex-1 flex flex-col">
            {/* Search Input */}
            <div className="relative border-b-2 border-[#111111] pb-4">
              <div className="flex items-center gap-4">
                <Search size={24} className="text-[#111111] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search clothing, collections, styles..."
                  className="w-full bg-transparent text-xl md:text-3xl text-[#111111] placeholder:text-[#A8A399] outline-none font-light tracking-wide"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="p-1 text-[#6B6862] hover:text-[#111111] text-xs uppercase tracking-wider"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Quick Filter Queries */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#6B6862] mr-2">
                Popular:
              </span>
              {SUGGESTED_QUERIES.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setQuery(suggestion)}
                  className="px-3 py-1.5 text-xs bg-[#EBE5DB] text-[#111111] hover:bg-[#111111] hover:text-[#F8F6F0] transition-colors uppercase tracking-[0.08em]"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Results Area */}
            <div className="mt-12 flex-1">
              {query.trim() === '' ? (
                <div>
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#E8E3DA]">
                    <span className="text-xs uppercase tracking-[0.18em] text-[#6B6862]">
                      Curated Essentials
                    </span>
                    <span className="text-xs text-[#8C867B]">Selected for you</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {products.slice(0, 4).map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="group block"
                      >
                        <div className="relative aspect-[3/4] bg-[#EBE5DB] overflow-hidden mb-2">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <p className="text-xs uppercase tracking-[0.08em] font-medium text-[#111111] group-hover:underline truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-[#6B6862] mt-0.5">{formatPrice(product.price)}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-base text-[#111111] font-medium">
                    No pieces matched &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs text-[#6B6862] mt-1.5">
                    Try searching for tees, trousers, linen, blazer, or collections.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#E8E3DA]">
                    <span className="text-xs uppercase tracking-[0.18em] text-[#6B6862]">
                      Found {filteredProducts.length} {filteredProducts.length === 1 ? 'Piece' : 'Pieces'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="group flex gap-4 p-2 border border-transparent hover:border-[#E8E3DA] transition-colors"
                      >
                        <div className="relative w-20 h-26 bg-[#EBE5DB] overflow-hidden shrink-0">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="80px"
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                          <div>
                            <span className="text-[10px] uppercase tracking-[0.16em] text-[#8C867B]">
                              {product.category}
                            </span>
                            <h4 className="text-xs uppercase tracking-[0.08em] font-medium text-[#111111] group-hover:underline truncate mt-0.5">
                              {product.name}
                            </h4>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs font-medium text-[#111111]">
                              {formatPrice(product.price)}
                            </span>
                            <ArrowUpRight size={14} className="text-[#8C867B] group-hover:text-[#111111] transition-colors" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
