'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useStore } from '@/context/StoreContext';
import { Heart, Eye, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  aspectRatio?: 'portrait' | 'square' | 'tall';
  priority?: boolean;
}

export function ProductCard({
  product,
  aspectRatio = 'portrait',
  priority = false,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist, openQuickView, addToCart } = useStore();

  const isSaved = isInWishlist(product.id);
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const aspectClass =
    aspectRatio === 'tall'
      ? 'aspect-[2/3]'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : 'aspect-[3/4]';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick add default size (first available)
    const availableSize =
      product.sizes.find((s) => !product.unavailableSizes?.includes(s)) || product.sizes[0];
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: primaryImage,
      color: product.colors[0]?.name || 'Standard',
      size: availableSize,
      quantity: 1,
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className={`relative w-full ${aspectClass} bg-[#EBE5DB] overflow-hidden border border-[#E8E3DA]`}>
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          {/* Primary Image */}
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className={`object-cover object-top transition-all duration-700 ease-out ${
              isHovered && secondaryImage !== primaryImage
                ? 'opacity-0 scale-102'
                : 'opacity-100 scale-100'
            }`}
          />

          {/* Secondary Hover Image */}
          {secondaryImage && secondaryImage !== primaryImage && (
            <Image
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover object-top transition-all duration-700 ease-out absolute inset-0 ${
                isHovered ? 'opacity-100 scale-102' : 'opacity-0 scale-100'
              }`}
            />
          )}
        </Link>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] font-semibold bg-[#111111] text-[#F8F6F0]">
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-[#F8F6F0]/90 backdrop-blur-[2px] text-[#111111] hover:bg-[#111111] hover:text-[#F8F6F0] transition-colors"
          aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={14}
            className={isSaved ? 'fill-current text-[#111111] group-hover/btn:text-white' : ''}
          />
        </button>

        {/* Hover Action Bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 z-10 p-2 sm:p-2.5 bg-[#F8F6F0]/95 backdrop-blur-sm border-t border-[#E8E3DA] transition-all duration-300 grid grid-cols-2 gap-1.5 ${
            isHovered
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={handleQuickView}
            className="py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-medium border border-[#DDD7CB] text-[#111111] hover:bg-[#111111] hover:text-[#F8F6F0] hover:border-[#111111] transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye size={12} />
            <span className="hidden xs:inline">Quick View</span>
          </button>
          <button
            onClick={handleQuickAdd}
            className="py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-medium bg-[#111111] text-[#F8F6F0] hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-1.5"
          >
            <span>+ Quick Add</span>
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="pt-3 pb-1 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#8C867B] mb-1">
            <span>{product.category}</span>
            <span className="flex items-center gap-1">
              {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
            </span>
          </div>

          <Link href={`/product/${product.slug}`} className="group/title block">
            <h3 className="text-xs uppercase tracking-[0.08em] font-medium text-[#111111] group-hover/title:underline truncate">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-1.5 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-semibold text-[#111111]">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-[11px] text-[#8C867B] line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Color preview dots */}
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 3).map((col) => (
              <span
                key={col.name}
                className="w-2 h-2 rounded-full border border-black/20"
                style={{ backgroundColor: col.hex }}
                title={col.name}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[9px] text-[#8C867B]">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
