'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collections } from '@/data/collections';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { CollectionSlug } from '@/types';

export default function CollectionsPage() {
  const [activeCollectionSlug, setActiveCollectionSlug] = useState<CollectionSlug | null>(null);

  const activeCollection = collections.find((c) => c.slug === activeCollectionSlug);
  const activeProducts = activeCollectionSlug
    ? products.filter((p) => p.collection === activeCollectionSlug)
    : [];

  return (
    <div className="pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="border-b border-[#E8E3DA] pb-8 mb-12">
        <span className="text-xs uppercase tracking-[0.24em] text-[#6B6862] mb-2 block font-mono">
          Thematic Archives
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light uppercase tracking-tight text-[#111111]">
          Collections
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6862] max-w-xl mt-3 font-light leading-relaxed">
          Four distinct wardrobe chapters exploring tactile materiality, utilitarian ergonomics, nocturnal tailoring, and warm-climate breathability.
        </p>
      </div>

      {/* 4 Large Editorial Collection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20">
        {collections.map((col) => {
          const colProducts = products.filter((p) => p.collection === col.slug);
          const isSelected = activeCollectionSlug === col.slug;

          return (
            <div
              key={col.id}
              className={`border transition-all duration-500 bg-[#F0ECE4]/40 flex flex-col justify-between ${
                isSelected ? 'border-[#111111] ring-1 ring-[#111111]' : 'border-[#E8E3DA] hover:border-[#BBB5AA]'
              }`}
            >
              {/* Image banner */}
              <div className="relative h-[340px] sm:h-[420px] bg-[#EBE5DB] overflow-hidden group">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] bg-[#111111] text-[#F8F6F0]">
                    {col.season}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-[#F8F6F0]">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#D1CBC1] mb-1 font-mono">
                    {col.tagline}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-wider text-[#F8F6F0]">
                    {col.title}
                  </h3>
                </div>
              </div>

              {/* Text Info & Action */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="text-sm font-medium uppercase tracking-[0.14em] text-[#111111] mb-2">
                    {col.subtitle}
                  </h4>
                  <p className="text-xs text-[#5A5750] leading-relaxed font-light mb-6">
                    {col.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.14em] text-[#8C867B]">
                    {colProducts.length} Dedicated Pieces
                  </span>

                  <button
                    onClick={() => setActiveCollectionSlug(isSelected ? null : col.slug)}
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-medium text-[#111111] hover:text-[#6B6862] transition-colors"
                  >
                    <span>{isSelected ? 'Hide Capsule' : 'View Capsule'}</span>
                    <ArrowRight
                      size={14}
                      className={`transition-transform duration-300 ${isSelected ? 'rotate-90' : ''}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Collection Details & Products */}
      {activeCollection && (
        <div id="capsule-view" className="pt-12 border-t-2 border-[#111111] animate-fadeIn">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E8E3DA]">
            <div>
              <span className="text-xs uppercase tracking-[0.24em] text-[#8C867B] font-mono">
                Active View
              </span>
              <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-[#111111] mt-1">
                {activeCollection.title} — Capsule Pieces
              </h2>
            </div>
            <button
              onClick={() => setActiveCollectionSlug(null)}
              className="mt-4 md:mt-0 text-xs uppercase tracking-[0.16em] text-[#6B6862] hover:text-[#111111] underline underline-offset-4"
            >
              Close Capsule View
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {activeProducts.map((p) => (
              <ProductCard key={p.id} product={p} aspectRatio="portrait" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
