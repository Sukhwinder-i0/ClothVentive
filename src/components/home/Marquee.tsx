'use client';

import React from 'react';

const MARQUEE_ITEMS = [
  'CLOTHVENTIVE',
  'MODERN ESSENTIALS',
  'REFINED SILHOUETTES',
  'EVERYDAY LUXURY',
  'THOUGHTFULLY DESIGNED',
  'SPRING / SUMMER 2026',
  'MADE FOR MOVEMENT',
  'ARCHIVAL QUALITY',
];

export function Marquee() {
  return (
    <div className="w-full bg-[#111111] text-[#F8F6F0] py-3.5 border-y border-[#292929] overflow-hidden whitespace-nowrap select-none">
      <div className="inline-flex animate-marquee">
        {MARQUEE_ITEMS.concat(MARQUEE_ITEMS).map((item, idx) => (
          <span
            key={idx}
            className="inline-flex items-center text-[11px] sm:text-xs uppercase tracking-[0.28em] font-medium px-4 text-[#F8F6F0]/90"
          >
            <span>{item}</span>
            <span className="ml-8 text-[#6B6862]">—</span>
          </span>
        ))}
      </div>
    </div>
  );
}
