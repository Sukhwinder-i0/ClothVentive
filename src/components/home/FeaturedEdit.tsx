'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { ArrowRight } from 'lucide-react';

interface FeaturedEditProps {
  products: Product[];
}

export function FeaturedEdit({ products }: FeaturedEditProps) {
  const heroProduct = products.find((p) => p.slug === 'wide-leg-trousers') || products[0];
  const sideProduct1 = products.find((p) => p.slug === 'structured-overshirt') || products[1];
  const sideProduct2 = products.find((p) => p.slug === 'relaxed-blazer') || products[2];
  const gridProducts = products.filter((p) => p.featured && p.id !== heroProduct?.id).slice(0, 4);

  return (
    <section id="latest-edit" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 border-b border-[#E8E3DA] pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.24em] text-[#6B6862] block mb-2 font-mono">
            Selected Curation
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight text-[#111111]">
            The Latest Edit
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6862] max-w-lg mt-3 font-light leading-relaxed">
            A considered selection of pieces designed to move effortlessly between everyday and occasion.
          </p>
        </div>

        <Link
          href="/new-arrivals"
          className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-[#111111] hover:text-[#6B6862] transition-colors group"
        >
          <span>View All New Arrivals</span>
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Asymmetric Editorial Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-16 items-start">
        {/* Large Featured Product (7 cols) */}
        {heroProduct && (
          <div className="lg:col-span-7">
            <div className="mb-3">
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C867B]">
                Editorial Showcase
              </span>
            </div>
            <ProductCard product={heroProduct} aspectRatio="portrait" priority />
          </div>
        )}

        {/* Side Stack (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {sideProduct1 && (
            <div>
              <div className="mb-3">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C867B]">
                  Tailoring & Form
                </span>
              </div>
              <ProductCard product={sideProduct1} aspectRatio="portrait" />
            </div>
          )}

          {sideProduct2 && (
            <div>
              <div className="mb-3">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C867B]">
                  Evening Silhouette
                </span>
              </div>
              <ProductCard product={sideProduct2} aspectRatio="portrait" />
            </div>
          )}
        </div>
      </div>

      {/* Balanced 4-column sub-grid */}
      <div className="border-t border-[#E8E3DA] pt-12">
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-[#6B6862]">
            Daily Essentials in Rotation
          </span>
          <span className="text-xs text-[#8C867B] font-mono">04 / 18</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {gridProducts.map((product) => (
            <ProductCard key={product.id} product={product} aspectRatio="portrait" />
          ))}
        </div>
      </div>
    </section>
  );
}
