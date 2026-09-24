'use client';

import React, { useState, useMemo } from 'react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { SlidersHorizontal, X, RotateCcw, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['All', 'T-Shirts', 'Shirts', 'Trousers', 'Outerwear', 'Knitwear', 'Dresses', 'Tops', 'Sets'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹3,000', min: 0, max: 2999 },
  { label: '₹3,000 – ₹5,000', min: 3000, max: 5000 },
  { label: 'Over ₹5,000', min: 5001, max: Infinity },
];

export default function NewArrivalsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedPriceIdx, setSelectedPriceIdx] = useState(0);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc'>('newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Active filters count
  const activeFiltersCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedSize ? 1 : 0) +
    (selectedPriceIdx !== 0 ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedSize(null);
    setSelectedPriceIdx(0);
    setSortBy('newest');
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Size filter
        if (selectedSize && !p.sizes.includes(selectedSize)) {
          return false;
        }
        // Price filter
        const priceRange = PRICE_RANGES[selectedPriceIdx];
        if (p.price < priceRange.min || p.price > priceRange.max) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [selectedCategory, selectedSize, selectedPriceIdx, sortBy]);

  return (
    <div className="pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Editorial Page Header */}
      <div className="border-b border-[#E8E3DA] pb-8 mb-8 sm:mb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#6B6862] mb-2 font-mono">
          <span>ClothVentive</span>
          <span>/</span>
          <span>Catalog</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light uppercase tracking-tight text-[#111111]">
          New Arrivals
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6862] max-w-xl mt-3 font-light leading-relaxed">
          The definitive Spring / Summer 2026 delivery. Heavyweight organic cottons, French flax linens, and fluid tailoring crafted for effortless everyday wear.
        </p>
      </div>

      {/* Top Filter & Sort Bar (Desktop) */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E8E3DA]">
        {/* Category Pills (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#111111] text-[#F8F6F0]'
                  : 'bg-transparent text-[#6B6862] hover:text-[#111111] hover:bg-[#EBE5DB]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile Filter Button */}
        <div className="flex items-center justify-between lg:hidden w-full">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-[#111111] text-xs uppercase tracking-[0.16em] text-[#111111]"
          >
            <SlidersHorizontal size={14} />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-transparent border border-[#DDD7CB] px-3 py-2 pr-8 text-xs uppercase tracking-[0.1em] text-[#111111] outline-none"
            >
              <option value="newest">Sort: Newest</option>
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-3 pointer-events-none text-[#6B6862]" />
          </div>
        </div>

        {/* Desktop Secondary Filters (Size, Price, Sort) */}
        <div className="hidden lg:flex items-center gap-4 ml-auto">
          {/* Size Filter Dropdown */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#8C867B] uppercase tracking-[0.16em] mr-1">Size:</span>
            {SIZES.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                className={`w-7 h-7 flex items-center justify-center border text-[11px] uppercase transition-colors ${
                  selectedSize === sz
                    ? 'border-[#111111] bg-[#111111] text-[#F8F6F0]'
                    : 'border-[#DDD7CB] text-[#111111] hover:border-[#111111]'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Price Range */}
          <div className="relative">
            <select
              value={selectedPriceIdx}
              onChange={(e) => setSelectedPriceIdx(Number(e.target.value))}
              className="appearance-none bg-transparent border border-[#DDD7CB] px-3 py-1.5 pr-7 text-xs uppercase tracking-[0.1em] text-[#111111] outline-none hover:border-[#111111] transition-colors"
            >
              {PRICE_RANGES.map((p, idx) => (
                <option key={p.label} value={idx}>
                  {p.label}
                </option>
              ))}
            </select>
            <ChevronDown size={13} className="absolute right-2 top-2.5 pointer-events-none text-[#6B6862]" />
          </div>

          {/* Sort By */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-transparent border border-[#DDD7CB] px-3 py-1.5 pr-7 text-xs uppercase tracking-[0.1em] text-[#111111] outline-none hover:border-[#111111] transition-colors font-medium"
            >
              <option value="newest">Sort: Newest</option>
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown size={13} className="absolute right-2 top-2.5 pointer-events-none text-[#6B6862]" />
          </div>

          {/* Reset button if active */}
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-[#6B6862] hover:text-[#111111] ml-2"
              title="Reset all filters"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-[11px] uppercase tracking-[0.18em] text-[#8C867B]">
            Applied:
          </span>
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#EBE5DB] text-xs text-[#111111]">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('All')}>
                <X size={12} />
              </button>
            </span>
          )}
          {selectedSize && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#EBE5DB] text-xs text-[#111111]">
              Size: {selectedSize}
              <button onClick={() => setSelectedSize(null)}>
                <X size={12} />
              </button>
            </span>
          )}
          {selectedPriceIdx !== 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#EBE5DB] text-xs text-[#111111]">
              Price: {PRICE_RANGES[selectedPriceIdx].label}
              <button onClick={() => setSelectedPriceIdx(0)}>
                <X size={12} />
              </button>
            </span>
          )}
          <button
            onClick={resetFilters}
            className="text-[11px] uppercase tracking-[0.14em] text-[#111111] underline underline-offset-2 ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Product count header */}
      <div className="flex items-center justify-between text-xs text-[#6B6862] mb-6">
        <span>
          Showing {filteredProducts.length} of {products.length} pieces
        </span>
      </div>

      {/* Product Grid: Desktop 4 cols, Tablet 3 cols, Mobile 2 cols */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center border border-[#E8E3DA] bg-[#F3EFE7]/50 my-8">
          <p className="text-base uppercase tracking-[0.12em] font-medium text-[#111111]">
            No pieces match your selected criteria
          </p>
          <p className="text-xs text-[#6B6862] max-w-sm mx-auto mt-2 mb-6">
            Try adjusting your category, sizing, or price boundaries to view available wardrobe pieces.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-3 bg-[#111111] text-[#F8F6F0] text-xs uppercase tracking-[0.18em]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              aspectRatio="portrait"
              priority={idx < 4}
            />
          ))}
        </div>
      )}

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-[#111111]/40 z-50 backdrop-blur-[2px]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-[#F8F6F0] z-50 p-6 flex flex-col justify-between border-l border-[#E8E3DA] overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E8E3DA] mb-6">
                  <h3 className="text-sm uppercase tracking-[0.18em] font-medium text-[#111111]">
                    Refine Catalog
                  </h3>
                  <button onClick={() => setIsMobileFilterOpen(false)}>
                    <X size={20} />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-[0.16em] text-[#6B6862] block mb-3 font-medium">
                    Category
                  </span>
                  <div className="space-y-1.5">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 text-xs uppercase tracking-wider ${
                          selectedCategory === cat
                            ? 'bg-[#111111] text-[#F8F6F0]'
                            : 'text-[#111111] hover:bg-[#EBE5DB]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-[0.16em] text-[#6B6862] block mb-3 font-medium">
                    Size
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {SIZES.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(selectedSize === sz ? null : sz)}
                        className={`py-2 text-xs uppercase border text-center ${
                          selectedSize === sz
                            ? 'border-[#111111] bg-[#111111] text-[#F8F6F0]'
                            : 'border-[#DDD7CB] text-[#111111]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-[0.16em] text-[#6B6862] block mb-3 font-medium">
                    Price Range
                  </span>
                  <div className="space-y-1.5">
                    {PRICE_RANGES.map((p, idx) => (
                      <button
                        key={p.label}
                        onClick={() => setSelectedPriceIdx(idx)}
                        className={`w-full text-left px-3 py-2 text-xs uppercase tracking-wider ${
                          selectedPriceIdx === idx
                            ? 'bg-[#111111] text-[#F8F6F0]'
                            : 'text-[#111111] hover:bg-[#EBE5DB]'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-6 border-t border-[#E8E3DA] space-y-2">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 bg-[#111111] text-[#F8F6F0] text-xs uppercase tracking-[0.18em]"
                >
                  Show {filteredProducts.length} Results
                </button>
                <button
                  onClick={resetFilters}
                  className="w-full py-2 text-xs uppercase tracking-[0.14em] text-[#6B6862] hover:text-[#111111]"
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
