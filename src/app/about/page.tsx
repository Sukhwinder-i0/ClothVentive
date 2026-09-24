import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-28 w-full bg-[#F8F6F0]">
      {/* Editorial Hero Statement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 border-b border-[#E8E3DA] pb-16 mb-20">
        <span className="text-xs uppercase tracking-[0.26em] text-[#6B6862] mb-3 block font-mono">
          Manifesto & Provenance
        </span>
        <h1 className="text-3xl sm:text-6xl lg:text-7xl font-light uppercase tracking-tight text-[#111111] max-w-5xl leading-[1.08]">
          We believe clothing should feel{' '}
          <span className="font-serif italic font-normal text-[#111111]">
            effortless.
          </span>
        </h1>
        <p className="text-sm sm:text-base text-[#6B6862] max-w-2xl mt-6 font-light leading-relaxed">
          ClothVentive creates contemporary garments calibrated around refined silhouettes, premium natural materials, and unencumbered everyday movement.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-28 sm:space-y-36">
        {/* Section 1: The Philosophy & Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.22em] text-[#8C867B] font-mono">
              01 — The Philosophy
            </span>
            <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-[#111111]">
              Subtracting the Superficial
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#55524B] leading-relaxed font-light">
              <p>
                In a marketplace dominated by rapid cycles and disposable novelty, ClothVentive was created as a counterweight. We treat apparel design through the lens of industrial design: stripping away extraneous ornamentation to celebrate pure form and tactile integrity.
              </p>
              <p>
                A garment should not announce itself through loud monograms or synthetic sheen. It earns distinction through the density of its weave, the natural curvature of its collar, and the way it falls when you sit, walk, or pivot.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] bg-[#EBE5DB] border border-[#E8E3DA] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85"
                alt="ClothVentive Atelier Philosophy"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[50%_25%]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Materials & Density */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-square sm:aspect-[4/3] bg-[#EBE5DB] border border-[#E8E3DA] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1525450824786-227cbef70703?auto=format&fit=crop&w=1200&q=85"
                alt="Tactile textile closeup"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <span className="text-xs uppercase tracking-[0.22em] text-[#8C867B] font-mono">
              02 — Material Integrity
            </span>
            <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-[#111111]">
              Natural Fibers, Heavyweight Density
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#55524B] leading-relaxed font-light">
              <p>
                We develop custom-knit 300+ GSM combed organic cottons that hold their structural drape without stiff synthetic coatings. Our linens are sourced from Normandy, enzymatically washed to eliminate scratchiness while honoring flax’s inherent thermal cooling properties.
              </p>
              <p>
                From two-ply Oxford weaves to extra-fine 12-gauge Merino and Cashmere blends, our fabrics are selected for physical longevity and sensory refinement.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Design & Cut */}
        <div className="border-t border-[#E8E3DA] pt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8C867B]">
              03 — Silhouette
            </span>
            <h3 className="text-lg font-medium uppercase tracking-wider text-[#111111]">
              Engineered Proportion
            </h3>
            <p className="text-xs text-[#55524B] leading-relaxed font-light">
              Drop shoulders with calculated slope. Inverted pleats that release fullness gracefully. Wide cuffs that stack cleanly without dragging.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8C867B]">
              04 — Craft
            </span>
            <h3 className="text-lg font-medium uppercase tracking-wider text-[#111111]">
              Bespoke Durability
            </h3>
            <p className="text-xs text-[#55524B] leading-relaxed font-light">
              Reinforced twin-needle collars, French seams, natural corozo and horn buttons, and internal bar-tacking on stress points ensure generational wear.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8C867B]">
              05 — Future
            </span>
            <h3 className="text-lg font-medium uppercase tracking-wider text-[#111111]">
              Responsible Archiving
            </h3>
            <p className="text-xs text-[#55524B] leading-relaxed font-light">
              Zero seasonal clearance dumps. Limited, deliberate capsule drops designed to remain wearable for years rather than quarters.
            </p>
          </div>
        </div>

        {/* Section 4: Full-width Atelier Imagery with Quote */}
        <div className="space-y-6">
          <div className="relative w-full h-[50vh] sm:h-[65vh] bg-[#EBE5DB] border border-[#E8E3DA] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1800&q=85"
              alt="ClothVentive Atelier Workshop"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pt-2">
            <span className="text-xs uppercase tracking-[0.2em] text-[#8C867B] font-mono">
              The ClothVentive Atelier
            </span>
            <p className="text-base sm:text-lg font-serif italic text-[#111111] max-w-xl">
              &ldquo;We do not follow fashion trends. We pursue modern staples that feel inevitable from the first time you put them on.&rdquo;
            </p>
          </div>
        </div>

        {/* Call to Explore */}
        <div className="pt-16 border-t border-[#E8E3DA] text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-[#111111]">
            Experience the Collection
          </h2>
          <div className="flex justify-center gap-4">
            <Link
              href="/new-arrivals"
              className="px-8 py-3.5 bg-[#111111] text-[#F8F6F0] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#2A2A2A] transition-colors inline-flex items-center gap-2"
            >
              <span>Explore New Arrivals</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
