'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen flex items-end pb-12 sm:pb-16 lg:pb-24 pt-28 px-4 sm:px-6 lg:px-12 overflow-hidden bg-[#EBE5DB]">
      {/* Background Image with gentle scale animation */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0.85 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
          alt="ClothVentive Spring Summer 2026 Campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_25%]"
        />
        {/* Editorial gradient scrim - subtle and minimal, non-shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-[#111111]/30 to-transparent" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col justify-end text-[#F8F6F0]">
        <div className="max-w-2xl">
          {/* Micro-label 1st */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-3"
          >
            <span className="w-8 h-[1px] bg-[#F8F6F0]/60 inline-block" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.26em] text-[#E8E3DA] font-medium">
              Spring / Summer 2026 Collection
            </span>
          </motion.div>

          {/* Subheading / The New Standard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-[#D4CDC1] mb-2 font-mono">
              The New Standard
            </p>
          </motion.div>

          {/* Headline 2nd */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-3xl sm:text-5xl lg:text-7xl font-light tracking-[-0.02em] text-[#F8F6F0] leading-[1.08] mb-4"
          >
            Designed for the <br />
            <span className="font-serif italic font-normal tracking-tight text-[#FFFFFF]">
              way you move.
            </span>
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="text-xs sm:text-sm md:text-base text-[#D4CDC1] max-w-lg leading-relaxed font-light mb-8"
          >
            Modern silhouettes. Elevated essentials. Thoughtfully tailored from heavyweight natural fibers for everyday movement.
          </motion.p>

          {/* CTAs 3rd */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <Link
              href="/new-arrivals"
              className="px-8 py-3.5 bg-[#F8F6F0] text-[#111111] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#FFFFFF] transition-colors flex items-center justify-center gap-2 group text-center"
            >
              <span>Shop New Arrivals</span>
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/collections"
              className="px-8 py-3.5 bg-transparent border border-[#F8F6F0]/60 text-[#F8F6F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#F8F6F0]/15 hover:border-[#F8F6F0] transition-colors text-center"
            >
              <span>Explore Collections</span>
            </Link>
          </motion.div>
        </div>

        {/* Bottom editorial coordinates & scroll indicator */}
        <div className="mt-12 pt-6 border-t border-[#F8F6F0]/20 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#C5BEB3]">
          <div className="hidden sm:flex items-center gap-6">
            <span>Refined Silhouettes</span>
            <span className="w-1 h-1 rounded-full bg-[#C5BEB3]" />
            <span>Heavyweight Textiles</span>
            <span className="w-1 h-1 rounded-full bg-[#C5BEB3]" />
            <span>Archival Cut</span>
          </div>

          <a
            href="#latest-edit"
            className="inline-flex items-center gap-2 hover:text-[#FFFFFF] transition-colors ml-auto sm:ml-0"
          >
            <span>Scroll Down</span>
            <ArrowDown size={12} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
