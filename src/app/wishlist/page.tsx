'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { Heart, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  const handleMoveToBag = (item: any) => {
    // Find full product details
    const fullProduct = products.find((p) => p.id === item.productId);
    const availableSize =
      fullProduct?.sizes.find((s) => !fullProduct.unavailableSizes?.includes(s)) ||
      fullProduct?.sizes[0] ||
      'M';
    const color = fullProduct?.colors[0]?.name || 'Standard';

    addToCart({
      productId: item.productId,
      slug: item.slug,
      name: item.name,
      price: item.price,
      image: item.image,
      color,
      size: availableSize,
      quantity: 1,
    });
    removeFromWishlist(item.productId);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="border-b border-[#E8E3DA] pb-8 mb-12">
        <span className="text-xs uppercase tracking-[0.24em] text-[#6B6862] mb-2 block font-mono">
          Private Wardrobe
        </span>
        <h1 className="text-3xl sm:text-5xl font-light uppercase tracking-tight text-[#111111]">
          Saved Pieces ({wishlist.length})
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6862] max-w-md mt-2 font-light">
          Your personal curation of considered garments reserved for future acquisition.
        </p>
      </div>

      {wishlist.length === 0 ? (
        /* Empty State */
        <div className="py-24 text-center border border-[#E8E3DA] bg-[#F0ECE4]/30 max-w-xl mx-auto my-8 p-8 sm:p-12">
          <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center border border-[#E8E3DA] text-[#6B6862]">
            <Heart size={24} strokeWidth={1.2} />
          </div>
          <h2 className="text-xl font-light uppercase tracking-wider text-[#111111] mb-2">
            Nothing Saved Yet
          </h2>
          <p className="text-xs text-[#6B6862] max-w-xs mx-auto mb-8 font-light leading-relaxed">
            Discover pieces worth keeping. Click the heart icon on any garment to preserve it here.
          </p>
          <Link
            href="/new-arrivals"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] text-[#F8F6F0] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#2A2A2A] transition-colors"
          >
            <span>Explore New Arrivals</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        /* Wishlist Grid */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {wishlist.map((item) => (
            <div key={item.productId} className="group flex flex-col border border-[#E8E3DA] bg-[#F8F6F0] p-3">
              <Link
                href={`/product/${item.slug}`}
                className="relative aspect-[3/4] bg-[#EBE5DB] overflow-hidden mb-3 block"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover object-top group-hover:scale-104 transition-transform duration-500"
                />
              </Link>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C867B] block mb-1">
                    {item.category}
                  </span>
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="text-xs uppercase tracking-[0.08em] font-medium text-[#111111] hover:underline truncate">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-xs font-semibold text-[#111111] mt-1">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E8E3DA] space-y-2">
                  <button
                    onClick={() => handleMoveToBag(item)}
                    className="w-full py-2.5 bg-[#111111] text-[#F8F6F0] text-[11px] uppercase tracking-[0.16em] hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag size={12} />
                    <span>Move to Bag</span>
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item.productId)}
                    className="w-full py-1.5 text-center text-[11px] uppercase tracking-[0.14em] text-[#8C867B] hover:text-[#111111] transition-colors flex items-center justify-center gap-1"
                  >
                    <Trash2 size={11} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
