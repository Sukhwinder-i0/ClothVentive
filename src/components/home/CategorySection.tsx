'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const CATEGORIES = [
  {
    title: 'MEN',
    subtitle: 'Tailored drape & utilitarian layers',
    href: '/men',
    image: '/images/categories/cat-men.jpg',
  },
  {
    title: 'WOMEN',
    subtitle: 'Fluid proportions & sculpted cuts',
    href: '/women',
    image: '/images/categories/cat-women.jpg',
  },
  {
    title: 'NEW ARRIVALS',
    subtitle: 'Spring / Summer 2026 debut releases',
    href: '/new-arrivals',
    image: '/images/categories/cat-new-arrivals.jpg',
  },
  {
    title: 'COLLECTIONS',
    subtitle: 'Curated thematic wardrobes',
    href: '/collections',
    image: '/images/categories/cat-collections.jpg',
  },
];

export function CategorySection() {
  return (
    <section className="py-16 lg:py-24 bg-[#F0ECE4] border-y border-[#E8E3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#DDD7CB]">
          <div>
            <span className="text-xs uppercase tracking-[0.24em] text-[#6B6862] font-mono">
              Directory
            </span>
            <h2 className="text-xl sm:text-2xl font-light uppercase tracking-wider text-[#111111] mt-1">
              Shop by Category
            </h2>
          </div>
          <span className="text-xs uppercase tracking-[0.18em] text-[#8C867B] hidden sm:inline">
            4 Core Divisions
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative h-[420px] sm:h-[480px] lg:h-[540px] overflow-hidden border border-[#E8E3DA] bg-[#EBE5DB] flex flex-col justify-end p-6 sm:p-8 block"
            >
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Minimal Darkening Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/85 via-[#111111]/30 to-transparent transition-opacity duration-500 group-hover:from-[#111111]/90" />

              {/* Content Block */}
              <div className="relative z-10 text-[#F8F6F0] transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.06em] text-[#F8F6F0]">
                    {cat.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full border border-[#F8F6F0]/40 flex items-center justify-center text-[#F8F6F0] transform translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <p className="text-xs text-[#D1CBC1] font-light tracking-wide mt-1">
                  {cat.subtitle}
                </p>

                <div className="mt-4 pt-3 border-t border-[#F8F6F0]/20 flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#F8F6F0] opacity-80 group-hover:opacity-100">
                  <span>Explore Catalog</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
