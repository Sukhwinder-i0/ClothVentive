'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/utils';
import { ProductCard } from '@/components/product/ProductCard';
import {
  Heart,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist, setIsSizeGuideOpen } = useStore();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.find((s) => !product.unavailableSizes?.includes(s)) || product.sizes[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Accordion state
  const [openSection, setOpenSection] = useState<'material' | 'fit' | 'care' | 'shipping' | null>(
    'material'
  );

  const toggleAccordion = (section: 'material' | 'fit' | 'care' | 'shipping') => {
    setOpenSection(openSection === section ? null : section);
  };

  const isSaved = isInWishlist(product.id);

  const handleAddToBag = () => {
    if (!selectedSize) return;
    addToCart(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0],
        color: selectedColor,
        size: selectedSize,
        quantity,
      },
      true
    );
  };

  const handleBuyNow = () => {
    if (!selectedSize) return;
    addToCart(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0],
        color: selectedColor,
        size: selectedSize,
        quantity,
      },
      false
    );
    router.push('/cart');
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C867B] mb-8 font-mono">
        <Link href="/" className="hover:text-[#111111] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href={`/${product.gender === 'women' ? 'women' : 'men'}`} className="hover:text-[#111111] transition-colors">
          {product.gender}
        </Link>
        <span>/</span>
        <span className="text-[#111111] truncate">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* LEFT: Spacious Editorial Image Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-[3/4] bg-[#EBE5DB] border border-[#E8E3DA] overflow-hidden">
            <Image
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top transition-opacity duration-300"
            />

            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 text-[10px] uppercase tracking-[0.2em] bg-[#111111] text-[#F8F6F0]">
                {product.badge}
              </span>
            )}
          </div>

          {/* Gallery Grid of other angles / thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative aspect-[3/4] bg-[#EBE5DB] border overflow-hidden transition-all ${
                    activeImageIdx === idx
                      ? 'border-[#111111] ring-1 ring-[#111111]'
                      : 'border-[#E8E3DA] opacity-75 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Secondary Editorial Spread under main image */}
          <div className="hidden lg:grid grid-cols-2 gap-4 pt-6 border-t border-[#E8E3DA]">
            <div className="p-6 bg-[#F0ECE4]/60 border border-[#E8E3DA]">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C867B] block mb-1 font-mono">
                Material Density
              </span>
              <p className="text-xs text-[#111111] font-medium">{product.material}</p>
            </div>
            <div className="p-6 bg-[#F0ECE4]/60 border border-[#E8E3DA]">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C867B] block mb-1 font-mono">
                Fit Calibration
              </span>
              <p className="text-xs text-[#111111] font-medium">{product.fit}</p>
            </div>
          </div>
        </div>

        {/* RIGHT: Sticky Product Purchase Module (5 Cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
          <div>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-[#8C867B] mb-2 font-mono">
              <span>{product.category}</span>
              <span>SS26 Capsule</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-light uppercase tracking-tight text-[#111111]">
              {product.name}
            </h1>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-xl font-medium text-[#111111]">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-[#8C867B] line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#55524B] leading-relaxed mt-4 font-light">
              {product.description}
            </p>
          </div>

          {/* Color Selector */}
          <div>
            <div className="flex justify-between items-center text-xs mb-2.5">
              <span className="uppercase tracking-[0.14em] text-[#6B6862]">
                Color: <span className="text-[#111111] font-medium">{selectedColor}</span>
              </span>
              <span className="text-[11px] text-[#8C867B]">
                {product.colors.length} Available
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`flex items-center gap-2 px-3 py-2 border text-xs uppercase tracking-wider transition-all ${
                    selectedColor === color.name
                      ? 'border-[#111111] bg-[#111111] text-[#F8F6F0]'
                      : 'border-[#DDD7CB] text-[#111111] hover:border-[#111111]'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/25 shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex justify-between items-center text-xs mb-2.5">
              <span className="uppercase tracking-[0.14em] text-[#6B6862]">
                Size: <span className="text-[#111111] font-medium">{selectedSize}</span>
              </span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs uppercase tracking-[0.12em] text-[#111111] underline underline-offset-4 hover:text-[#6B6862]"
              >
                Size Guide
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {product.sizes.map((size) => {
                const isUnavailable = product.unavailableSizes?.includes(size);
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    disabled={isUnavailable}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-xs uppercase tracking-wider border text-center transition-all ${
                      isUnavailable
                        ? 'border-[#E8E3DA] text-[#C2BCB1] bg-[#EFEBE3] cursor-not-allowed line-through'
                        : isSelected
                        ? 'border-[#111111] bg-[#111111] text-[#F8F6F0]'
                        : 'border-[#DDD7CB] text-[#111111] hover:border-[#111111]'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Controls & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#DDD7CB] bg-[#F8F6F0]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-11 flex items-center justify-center text-[#111111] hover:bg-[#EBE5DB] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="w-12 text-center text-xs font-medium text-[#111111]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-11 flex items-center justify-center text-[#111111] hover:bg-[#EBE5DB] transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Wishlist toggle */}
              <button
                onClick={() => toggleWishlist(product)}
                className="w-11 h-11 border border-[#DDD7CB] flex items-center justify-center text-[#111111] hover:border-[#111111] transition-colors shrink-0"
                aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart
                  size={16}
                  className={isSaved ? 'fill-current text-[#111111]' : ''}
                />
              </button>
            </div>

            <button
              onClick={handleAddToBag}
              className="w-full py-4 bg-[#111111] text-[#F8F6F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-2"
            >
              <span>Add to Bag — {formatPrice(product.price * quantity)}</span>
              <ArrowRight size={14} />
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 bg-transparent border border-[#111111] text-[#111111] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#111111] hover:text-[#F8F6F0] transition-colors"
            >
              Buy Now
            </button>
          </div>

          {/* Complimentary Perks Banner */}
          <div className="p-4 bg-[#F0ECE4]/70 border border-[#E8E3DA] space-y-2 text-xs text-[#55524B]">
            <div className="flex items-center gap-2.5">
              <Truck size={14} className="text-[#111111]" />
              <span>Complimentary shipping on orders over ₹3,000</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw size={14} className="text-[#111111]" />
              <span>30-day effortless doorstep returns & exchanges</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={14} className="text-[#111111]" />
              <span>Lifetime seam repair & authentic organic certification</span>
            </div>
          </div>

          {/* Product Details Accordions */}
          <div className="border-t border-[#E8E3DA] divide-y divide-[#E8E3DA]">
            {/* 1. Materials & Craft */}
            <div>
              <button
                onClick={() => toggleAccordion('material')}
                className="w-full py-4 flex items-center justify-between text-xs uppercase tracking-[0.14em] font-medium text-[#111111] text-left"
              >
                <span>Material & Details</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    openSection === 'material' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openSection === 'material' && (
                <div className="pb-4 text-xs text-[#55524B] space-y-2 font-light">
                  <p className="font-medium text-[#111111]">{product.material}</p>
                  <ul className="list-disc pl-4 space-y-1">
                    {product.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 2. Fit & Drape */}
            <div>
              <button
                onClick={() => toggleAccordion('fit')}
                className="w-full py-4 flex items-center justify-between text-xs uppercase tracking-[0.14em] font-medium text-[#111111] text-left"
              >
                <span>Silhouette & Drape</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    openSection === 'fit' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openSection === 'fit' && (
                <div className="pb-4 text-xs text-[#55524B] space-y-1 font-light">
                  <p>{product.fit}</p>
                  <p className="text-[#8C867B]">
                    Model is 6&apos;1&quot; (185cm) wearing Size M.
                  </p>
                </div>
              )}
            </div>

            {/* 3. Care Instructions */}
            <div>
              <button
                onClick={() => toggleAccordion('care')}
                className="w-full py-4 flex items-center justify-between text-xs uppercase tracking-[0.14em] font-medium text-[#111111] text-left"
              >
                <span>Garment Care</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    openSection === 'care' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openSection === 'care' && (
                <div className="pb-4 text-xs text-[#55524B] font-light">
                  <p>{product.care}</p>
                </div>
              )}
            </div>

            {/* 4. Shipping & Returns */}
            <div>
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full py-4 flex items-center justify-between text-xs uppercase tracking-[0.14em] font-medium text-[#111111] text-left"
              >
                <span>Dispatch & Delivery</span>
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${
                    openSection === 'shipping' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openSection === 'shipping' && (
                <div className="pb-4 text-xs text-[#55524B] space-y-1.5 font-light">
                  <p>Standard delivery: 2–4 business days across India.</p>
                  <p>Express metro delivery: Next business day available at checkout.</p>
                  <p>All items packaged in FSC-certified biodegradable paper wrapping.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 sm:mt-32 pt-16 border-t border-[#E8E3DA]">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E8E3DA]">
            <div>
              <span className="text-xs uppercase tracking-[0.24em] text-[#8C867B] font-mono">
                Considered Styling
              </span>
              <h2 className="text-xl sm:text-2xl font-light uppercase tracking-wider text-[#111111] mt-1">
                You May Also Like
              </h2>
            </div>
            <Link
              href="/new-arrivals"
              className="text-xs uppercase tracking-[0.16em] text-[#111111] hover:text-[#6B6862]"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {relatedProducts.slice(0, 4).map((rel) => (
              <ProductCard key={rel.id} product={rel} aspectRatio="portrait" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
