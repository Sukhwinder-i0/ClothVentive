import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-12 py-24 bg-[#F8F6F0]">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left: 404 Fashion Visual (5 cols) */}
        <div className="md:col-span-5 relative aspect-[3/4] bg-[#EBE5DB] border border-[#E8E3DA] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85"
            alt="ClothVentive 404 Not Found"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover object-top filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-[#111111]/20" />
          <div className="absolute bottom-4 left-4">
            <span className="px-2.5 py-1 text-[9px] uppercase tracking-[0.24em] bg-[#111111] text-[#F8F6F0] font-mono">
              Archival Void
            </span>
          </div>
        </div>

        {/* Right: Message & Return CTA (7 cols) */}
        <div className="md:col-span-7 space-y-6">
          <span className="text-xs uppercase tracking-[0.28em] text-[#8C867B] font-mono block">
            Error 404 — Index Discontinuity
          </span>

          <h1 className="text-6xl sm:text-8xl font-extralight tracking-tight text-[#111111]">
            404
          </h1>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-light uppercase tracking-wider text-[#111111]">
              Looks like this piece is out of season.
            </h2>
            <p className="text-xs sm:text-sm text-[#6B6862] leading-relaxed font-light max-w-md">
              The requested catalog route, garment specification, or editorial page is no longer active in our digital archive.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="px-8 py-3.5 bg-[#111111] text-[#F8F6F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#2A2A2A] transition-colors inline-flex items-center justify-center gap-2 text-center"
            >
              <span>Return Home</span>
              <ArrowRight size={14} />
            </Link>

            <Link
              href="/new-arrivals"
              className="px-8 py-3.5 border border-[#111111] text-[#111111] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#111111] hover:text-[#F8F6F0] transition-colors inline-flex items-center justify-center text-center"
            >
              <span>Explore New Arrivals</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
