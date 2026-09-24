'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export function ProductQuickViewModal() {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
  } = useStore();

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colors[0]?.name || '');
      setSelectedSize(quickViewProduct.sizes[0] || '');
      setActiveImageIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [quickViewProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && quickViewProduct) {
        closeQuickView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProduct, closeQuickView]);

  if (!quickViewProduct) return null;

  const isSaved = isInWishlist(quickViewProduct.id);

  const handleAdd = () => {
    if (!selectedSize) return;
    addToCart(
      {
        productId: quickViewProduct.id,
        slug: quickViewProduct.slug,
        name: quickViewProduct.name,
        price: quickViewProduct.price,
        image: quickViewProduct.images[0],
        color: selectedColor,
        size: selectedSize,
        quantity: 1,
      },
      true
    );
    closeQuickView();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-[#111111]/45 backdrop-blur-[2px]"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#F8F6F0] border border-[#E8E3DA] max-w-3xl w-full max-h-[90vh] overflow-y-auto z-10 grid grid-cols-1 md:grid-cols-2"
          role="dialog"
          aria-modal="true"
          aria-label={quickViewProduct.name}
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 bg-[#F8F6F0] border border-[#E8E3DA] text-[#111111] hover:bg-[#111111] hover:text-[#F8F6F0] transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          {/* Left: Image display */}
          <div className="relative aspect-[3/4] md:aspect-auto md:h-full bg-[#EBE5DB] overflow-hidden min-h-[360px]">
            <Image
              src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-opacity duration-300"
            />

            {/* Thumbnail switcher */}
            {quickViewProduct.images.length > 1 && (
              <div className="absolute bottom-3 left-3 right-3 flex gap-2 overflow-x-auto p-1 bg-[#111111]/30 backdrop-blur-sm">
                {quickViewProduct.images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-12 h-14 shrink-0 border ${
                      activeImageIndex === idx ? 'border-[#FFFFFF]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt="Thumbnail"
                      fill
                      sizes="48px"
                      className="object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Selectors */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#6B6862]">
                  {quickViewProduct.category}
                </span>
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className="text-[#111111] hover:text-[#8C867B] transition-colors"
                  aria-label="Toggle wishlist"
                >
                  <Heart
                    size={18}
                    className={isSaved ? 'fill-current text-[#111111]' : ''}
                  />
                </button>
              </div>

              <h3 className="text-xl font-medium uppercase tracking-[0.06em] text-[#111111]">
                {quickViewProduct.name}
              </h3>

              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-base font-medium text-[#111111]">
                  {formatPrice(quickViewProduct.price)}
                </span>
                {quickViewProduct.compareAtPrice && (
                  <span className="text-xs text-[#8C867B] line-through">
                    {formatPrice(quickViewProduct.compareAtPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#6B6862] leading-relaxed mt-4 line-clamp-3">
                {quickViewProduct.description}
              </p>

              {/* Color selection */}
              <div className="mt-6">
                <div className="flex justify-between text-xs mb-2">
                  <span className="uppercase tracking-[0.14em] text-[#6B6862]">Color</span>
                  <span className="text-[#111111] font-medium">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`group flex items-center gap-1.5 px-3 py-1.5 border text-xs transition-colors ${
                        selectedColor === c.name
                          ? 'border-[#111111] bg-[#111111] text-[#F8F6F0]'
                          : 'border-[#DDD7CB] bg-transparent text-[#111111] hover:border-[#111111]'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size selection */}
              <div className="mt-6">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="uppercase tracking-[0.14em] text-[#6B6862]">Size</span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[#6B6862] hover:text-[#111111] underline underline-offset-2"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {quickViewProduct.sizes.map((s) => {
                    const isUnavailable = quickViewProduct.unavailableSizes?.includes(s);
                    const isSelected = selectedSize === s;
                    return (
                      <button
                        key={s}
                        disabled={isUnavailable}
                        onClick={() => setSelectedSize(s)}
                        className={`py-2 text-xs uppercase tracking-wider border text-center transition-all ${
                          isUnavailable
                            ? 'border-[#E8E3DA] text-[#BBB5AA] bg-[#EFEBE3] cursor-not-allowed line-through'
                            : isSelected
                            ? 'border-[#111111] bg-[#111111] text-[#F8F6F0]'
                            : 'border-[#DDD7CB] text-[#111111] hover:border-[#111111]'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 space-y-3 pt-4 border-t border-[#E8E3DA]">
              <button
                onClick={handleAdd}
                className="w-full py-3.5 bg-[#111111] text-[#F8F6F0] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-2"
              >
                <span>Add to Bag</span>
                <ArrowRight size={13} />
              </button>

              <Link
                href={`/product/${quickViewProduct.slug}`}
                onClick={closeQuickView}
                className="w-full py-2 text-center text-xs uppercase tracking-[0.14em] text-[#6B6862] hover:text-[#111111] block transition-colors"
              >
                View Full Specifications
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
