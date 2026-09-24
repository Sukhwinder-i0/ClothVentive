import React from 'react';
import { Hero } from '@/components/home/Hero';
import { Marquee } from '@/components/home/Marquee';
import { FeaturedEdit } from '@/components/home/FeaturedEdit';
import { CategorySection } from '@/components/home/CategorySection';
import { EditorialStory } from '@/components/home/EditorialStory';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { products } from '@/data/products';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero with scale and staggered reveal */}
      <Hero />

      {/* 2. Brand Marquee */}
      <Marquee />

      {/* 3. The Latest Edit (Featured Products) */}
      <FeaturedEdit products={products} />

      {/* 4. Large Visual Category Blocks */}
      <CategorySection />

      {/* 5. Editorial Brand Story & Philosophy */}
      <EditorialStory />

      {/* 6. Newsletter Subscription */}
      <NewsletterSection />
    </div>
  );
}
