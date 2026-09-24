'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function EditorialStory() {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Editorial Quote & Manifesto */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[1.5px] bg-[#111111]" />
            <span className="text-xs uppercase tracking-[0.26em] text-[#6B6862] font-mono">
              The Philosophy
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#111111] leading-[1.15] mb-6">
            We believe clothing should feel{' '}
            <span className="font-serif italic font-normal text-[#111111]">
              effortless.
            </span>
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-[#55524B] leading-relaxed font-light">
            <p>
              ClothVentive was founded on the conviction that everyday garments should be constructed with the precision of architectural design. We remove unnecessary hardware, loud branding, and disposable trends.
            </p>
            <p>
              Every seam is considered. Every fabric is calibrated for touch, thermal comfort, and long-term durability. The result is a refined wardrobe engineered to move with you seamlessly through work, transit, and twilight.
            </p>
          </div>

          {/* Key pillars */}
          <div className="grid grid-cols-3 gap-4 pt-8 my-8 border-t border-b border-[#E8E3DA]">
            <div>
              <span className="block text-2xl font-light text-[#111111]">300+</span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#8C867B] mt-1 block">
                GSM Textiles
              </span>
            </div>
            <div>
              <span className="block text-2xl font-light text-[#111111]">100%</span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#8C867B] mt-1 block">
                Organic Fibers
              </span>
            </div>
            <div>
              <span className="block text-2xl font-light text-[#111111]">Zero</span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-[#8C867B] mt-1 block">
                Plastic Blends
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="px-6 py-3 bg-[#111111] text-[#F8F6F0] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#2A2A2A] transition-colors inline-flex items-center gap-2"
            >
              <span>Our Brand Story</span>
              <ArrowRight size={13} />
            </Link>

            <Link
              href="/lookbook"
              className="px-6 py-3 border border-[#111111] text-[#111111] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#111111] hover:text-[#F8F6F0] transition-colors inline-flex items-center gap-2"
            >
              <span>View Magazine Lookbook</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Layered Editorial Images */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] bg-[#EBE5DB] border border-[#E8E3DA] overflow-hidden ml-auto w-full max-w-md lg:max-w-none">
            <Image
              src="/images/editorial-story.jpg"
              alt="Model posing in ClothVentive tailored collection"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>

          {/* Overlapping Detail Cutout */}
          <div className="hidden sm:block absolute -bottom-8 -left-8 w-48 h-60 bg-[#DED6CA] border border-[#E8E3DA] overflow-hidden z-10">
            <Image
              src="/images/editorial-detail.jpg"
              alt="Textile close up texture"
              fill
              sizes="200px"
              className="object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-[#111111]/80 backdrop-blur-sm px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-[#F8F6F0]">
              Tactile Detail
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
