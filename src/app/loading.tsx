import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-[#F8F6F0] flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-4 max-w-xs w-full">
        <span className="text-sm sm:text-base font-bold tracking-[0.3em] uppercase text-[#111111] block">
          ClothVentive
        </span>

        {/* Minimal loading progress line */}
        <div className="w-32 h-[1.5px] bg-[#E8E3DA] mx-auto overflow-hidden relative">
          <div className="w-full h-full bg-[#111111] animate-pulse" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.22em] text-[#8C867B] font-mono block">
          Rendering Archive
        </span>
      </div>
    </div>
  );
}
