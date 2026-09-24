'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const { setIsSizeGuideOpen } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-[#F8F6F0] pt-20 pb-12 border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top Big Branding Header */}
        <div className="border-b border-[#242424] pb-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.28em] text-[#736E66] block mb-2 font-mono">
              Contemporary Fashion Label
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-[0.16em] uppercase text-[#F8F6F0]">
              ClothVentive
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#A09D96] max-w-xs font-light tracking-wide">
            Modern clothing. Considered design. Engineered for the rhythm of contemporary everyday life.
          </p>
        </div>

        {/* 4 Main Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-16 border-b border-[#242424]">
          {/* Col 1: Shop */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] text-[#736E66] mb-5 font-mono">
              Shop
            </h3>
            <ul className="space-y-3 text-xs uppercase tracking-[0.12em]">
              <li>
                <Link href="/new-arrivals" className="text-[#D4CDC1] hover:text-[#FFFFFF] transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/men" className="text-[#D4CDC1] hover:text-[#FFFFFF] transition-colors">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/women" className="text-[#D4CDC1] hover:text-[#FFFFFF] transition-colors">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-[#D4CDC1] hover:text-[#FFFFFF] transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-[#D4CDC1] hover:text-[#FFFFFF] transition-colors">
                  Archival Essentials
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: About */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] text-[#736E66] mb-5 font-mono">
              About
            </h3>
            <ul className="space-y-3 text-xs uppercase tracking-[0.12em]">
              <li>
                <Link href="/about" className="text-[#D4CDC1] hover:text-[#FFFFFF] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="text-[#D4CDC1] hover:text-[#FFFFFF] transition-colors">
                  Lookbook SS26
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#D4CDC1] hover:text-[#FFFFFF] transition-colors">
                  Textile Philosophy
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#D4CDC1] hover:text-[#FFFFFF] transition-colors">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Concierge / Help */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] text-[#736E66] mb-5 font-mono">
              Client Concierge
            </h3>
            <ul className="space-y-3 text-xs uppercase tracking-[0.12em]">
              <li>
                <Link href="/contact" className="text-[#D4CDC1] hover:text-[#FFFFFF] transition-colors">
                  Contact Studio
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[#D4CDC1] hover:text-[#FFFFFF] transition-colors text-left uppercase tracking-[0.12em]"
                >
                  Size Guide
                </button>
              </li>
              <li>
                <Link href="/contact" className="text-[#D4CDC1] hover:text-[#FFFFFF] transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#D4CDC1] hover:text-[#FFFFFF] transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Follow */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.22em] text-[#736E66] mb-5 font-mono">
              Social & Studio
            </h3>
            <ul className="space-y-3 text-xs uppercase tracking-[0.12em]">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#D4CDC1] hover:text-[#FFFFFF] transition-colors"
                >
                  Instagram @clothventive
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#D4CDC1] hover:text-[#FFFFFF] transition-colors"
                >
                  Pinterest
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#D4CDC1] hover:text-[#FFFFFF] transition-colors"
                >
                  TikTok
                </a>
              </li>
              <li>
                <span className="text-[#736E66] block pt-2 text-[10px]">
                  Studio: New Delhi / Mumbai / Paris
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#736E66] uppercase tracking-[0.18em]">
          <div>
            © 2026 ClothVentive Ltd. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[#F8F6F0] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-[#F8F6F0] transition-colors">
              Terms of Service
            </Link>
            <span className="text-[#999999]">India (INR ₹)</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#F8F6F0] transition-colors ml-auto sm:ml-0"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
