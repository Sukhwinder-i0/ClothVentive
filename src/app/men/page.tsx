'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

const MEN_CATEGORIES = ['All', 'T-Shirts', 'Shirts', 'Trousers', 'Outerwear', 'Knitwear'];

export default function MenPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const menProducts = useMemo(() => {
    return products
      .filter((p) => p.gender === 'men' || p.gender === 'unisex')
      .filter((p) => (selectedCategory === 'All' ? true : p.category === selectedCategory))
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [selectedCategory, sortBy]);

  return (
    <div className="w-full">
      {/* Editorial Men Hero Banner */}
      <div className="relative w-full h-[55vh] sm:h-[65vh] min-h-[420px] bg-[#EBE5DB] flex items-end pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 overflow-hidden border-b border-[#E8E3DA]">
        <Image
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=85"
          alt="ClothVentive Men Editorial"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-[#111111]/35 to-transparent" />

        <div className="relative z-10 max-w-7xl w-full mx-auto text-[#F8F6F0]">
          <span className="text-xs uppercase tracking-[0.26em] text-[#D4CDC1] mb-2 block font-mono">
            Wardrobe Division
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light uppercase tracking-tight text-[#F8F6F0]">
            MEN
          </h1>
          <p className="text-xs sm:text-sm text-[#D4CDC1] max-w-lg mt-3 font-light leading-relaxed">
            Modern essentials built around clean lines, refined textures, and effortless movement.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16">
        {/* Category Filter and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E8E3DA]">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {MEN_CATEGORIES.map((cat) => (
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

          <div className="flex items-center justify-between sm:justify-end gap-4">
            <span className="text-xs text-[#8C867B] uppercase tracking-wider">
              {menProducts.length} pieces
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border border-[#DDD7CB] px-3 py-1.5 text-xs uppercase tracking-[0.1em] text-[#111111] outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {menProducts.map((product) => (
            <ProductCard key={product.id} product={product} aspectRatio="portrait" />
          ))}
        </div>
      </div>
    </div>
  );
}
