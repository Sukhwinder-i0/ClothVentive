'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const EDITORIAL_SPREADS = [
  {
    type: 'full',
    image: '/images/hero.jpg',
    caption: 'PLATE 01 — SPRING EQUINOX',
    title: 'The Architecture of Drape',
    quote: 'Garments should never impose rigid geometry on the body. Instead, the cut must respond to movement, yielding when walking and resting with absolute stillness.',
    credits: 'Styling: ClothVentive Studio / Model: Anaïs / Location: High Desert Pavilion',
  },
  {
    type: 'duo',
    imageLeft: '/images/categories/cat-new-arrivals.jpg',
    imageRight: '/images/products/wide-leg-trousers.jpg',
    captionLeft: 'PLATE 02 — TAILORED FORM',
    captionRight: 'PLATE 03 — MERINO REFINEMENT',
    text: 'A tactile dialogue between raw structured outerwear and ultra-fine cashmere-merino spun yarn. Every proportion is tested in motion before cutting.',
  },
  {
    type: 'portrait-text',
    image: '/images/men-hero.jpg',
    caption: 'PLATE 04 — NOCTURNAL SHIFT',
    title: 'Unstructured Formality',
    body: 'The single-breasted blazer stripped of rigid canvassing. Shoulders are natural, chests softly sculpted, and trousers cut with deep double inverted pleats that billow subtly against the evening wind.',
  },
  {
    type: 'landscape',
    image: '/images/women-hero.jpg',
    caption: 'PLATE 05 — THE SUMMER HORIZON',
    title: 'Normandy Flax & Liquid Cupro',
    quote: 'In extreme temperatures, true luxury is weightlessness. We calibrate our summer textiles to float effortlessly above the skin.',
  },
  {
    type: 'trio',
    images: [
      {
        url: '/images/products/essential-tee.jpg',
        title: 'Heavyweight Studio Tee',
        desc: '300 GSM combed cotton',
      },
      {
        url: '/images/products/wide-leg-trousers.jpg',
        title: 'Architectural Trousers',
        desc: 'Double inverted pleat',
      },
      {
        url: '/images/categories/cat-men.jpg',
        title: 'Utility Field Jacket',
        desc: 'Japanese water-repellent twill',
      },
    ],
  },
];

export default function LookbookPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-28 w-full bg-[#F8F6F0]">
      {/* Editorial Title Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 border-b border-[#E8E3DA] pb-12 mb-16">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[#6B6862] mb-3 font-mono">
          <span>Lookbook Volume IV</span>
          <span>Issue No. 04 — 2026</span>
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-light uppercase tracking-tight text-[#111111]">
          The Movement Edit
        </h1>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#6B6862] max-w-lg font-light leading-relaxed">
            A photographic exploration of silhouette, physical gesture, and tactile minimalism in modern natural environments.
          </p>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[#8C867B] font-mono">
            Photography by ClothVentive Editions
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-24 sm:space-y-36">
        {/* Spread 1: Full-width Hero Visual */}
        <div className="space-y-6">
          <div className="relative w-full h-[65vh] sm:h-[80vh] min-h-[480px] bg-[#EBE5DB] border border-[#E8E3DA] overflow-hidden">
            <Image
              src={EDITORIAL_SPREADS[0].image as string}
              alt="Editorial lookbook plate 1"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[50%_25%]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline pt-2">
            <div className="md:col-span-3 text-[11px] uppercase tracking-[0.2em] text-[#8C867B] font-mono">
              {EDITORIAL_SPREADS[0].caption}
            </div>
            <div className="md:col-span-5">
              <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-tight text-[#111111]">
                {EDITORIAL_SPREADS[0].title}
              </h2>
            </div>
            <div className="md:col-span-4 text-xs text-[#55524B] leading-relaxed font-serif italic text-base">
              &ldquo;{EDITORIAL_SPREADS[0].quote}&rdquo;
            </div>
          </div>
        </div>

        {/* Spread 2: Duo Image Dialogue */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="md:col-span-6 space-y-3">
            <div className="relative aspect-[3/4] bg-[#EBE5DB] border border-[#E8E3DA] overflow-hidden">
              <Image
                src={EDITORIAL_SPREADS[1].imageLeft as string}
                alt="Lookbook Duo 1"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#8C867B] font-mono">
              {EDITORIAL_SPREADS[1].captionLeft}
            </div>
          </div>

          <div className="md:col-span-6 space-y-6">
            <div className="relative aspect-square sm:aspect-[4/3] bg-[#EBE5DB] border border-[#E8E3DA] overflow-hidden">
              <Image
                src={EDITORIAL_SPREADS[1].imageRight as string}
                alt="Lookbook Duo 2"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#8C867B] font-mono">
                {EDITORIAL_SPREADS[1].captionRight}
              </div>
              <p className="text-xs sm:text-sm text-[#55524B] leading-relaxed font-light">
                {EDITORIAL_SPREADS[1].text}
              </p>
            </div>
          </div>
        </div>

        {/* Spread 3: Portrait & Text Editorial Column */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="md:col-span-5 order-2 md:order-1 space-y-6">
            <span className="text-xs uppercase tracking-[0.22em] text-[#8C867B] font-mono">
              {EDITORIAL_SPREADS[2].caption}
            </span>
            <h2 className="text-3xl sm:text-4xl font-light uppercase tracking-tight text-[#111111]">
              {EDITORIAL_SPREADS[2].title}
            </h2>
            <p className="text-xs sm:text-sm text-[#55524B] leading-relaxed font-light">
              {EDITORIAL_SPREADS[2].body}
            </p>
            <div className="pt-4 border-t border-[#E8E3DA]">
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-medium text-[#111111] hover:text-[#6B6862]"
              >
                <span>Discover After Dark Collection</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          <div className="md:col-span-7 order-1 md:order-2">
            <div className="relative aspect-[4/5] bg-[#EBE5DB] border border-[#E8E3DA] overflow-hidden">
              <Image
                src={EDITORIAL_SPREADS[2].image as string}
                alt="Portrait lookbook spread"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover object-[50%_25%]"
              />
            </div>
          </div>
        </div>

        {/* Spread 4: Wide Landscape Horizon */}
        <div className="space-y-4">
          <div className="relative w-full h-[50vh] sm:h-[65vh] bg-[#EBE5DB] border border-[#E8E3DA] overflow-hidden">
            <Image
              src={EDITORIAL_SPREADS[3].image as string}
              alt="Summer Horizon"
              fill
              sizes="100vw"
              className="object-cover object-[50%_35%]"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pt-2 border-b border-[#E8E3DA] pb-6">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C867B] font-mono">
              {EDITORIAL_SPREADS[3].caption}
            </span>
            <span className="text-base sm:text-lg font-serif italic text-[#111111]">
              &ldquo;{EDITORIAL_SPREADS[3].quote}&rdquo;
            </span>
          </div>
        </div>

        {/* Spread 5: Trio Focus Grid */}
        <div className="border-t border-[#E8E3DA] pt-16">
          <div className="text-center max-w-md mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.22em] text-[#8C867B] font-mono">
              Silhouettes in Close Examination
            </span>
            <h3 className="text-2xl font-light uppercase tracking-tight text-[#111111] mt-1">
              Garment Studies
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {EDITORIAL_SPREADS[4].images?.map((item, idx) => (
              <div key={idx} className="space-y-3">
                <div className="relative aspect-[3/4] bg-[#EBE5DB] border border-[#E8E3DA] overflow-hidden">
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover object-top hover:scale-104 transition-transform duration-700"
                  />
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <h4 className="text-xs uppercase tracking-[0.1em] font-medium text-[#111111]">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-[#8C867B] font-mono">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Shop The Lookbook */}
        <div className="pt-16 border-t border-[#E8E3DA] text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[#6B6862] font-mono">
            Directly from the Runway
          </p>
          <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-[#111111]">
            Acquire Pieces from the Lookbook
          </h2>
          <div className="flex justify-center gap-4">
            <Link
              href="/new-arrivals"
              className="px-8 py-3.5 bg-[#111111] text-[#F8F6F0] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#2A2A2A] transition-colors inline-flex items-center gap-2"
            >
              <span>Shop All Pieces</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
