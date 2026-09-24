'use client';

import React, { useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

const FREE_SHIPPING_THRESHOLD = 3000;

export function CartDrawer() {
  const {
    cart,
    cartCount,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
  } = useStore();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Lock scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const freeShippingProgress = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-[#111111]/40 z-50 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#F8F6F0] z-50 border-l border-[#E8E3DA] flex flex-col justify-between"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Bag"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#E8E3DA] flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#6B6862]">ClothVentive</span>
                <h2 className="text-base font-medium uppercase tracking-[0.12em] text-[#111111]">
                  Shopping Bag ({cartCount})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 -mr-2 text-[#111111] hover:text-[#6B6862] transition-colors"
                aria-label="Close bag"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free shipping bar */}
            <div className="px-6 py-3.5 bg-[#F0ECE4] border-b border-[#E8E3DA]">
              <p className="text-xs text-[#111111]">
                {amountNeededForFreeShipping > 0 ? (
                  <>
                    Add <span className="font-semibold">{formatPrice(amountNeededForFreeShipping)}</span> more for complimentary express delivery
                  </>
                ) : (
                  <span className="font-medium text-[#111111]">
                    You have qualified for complimentary express shipping
                  </span>
                )}
              </p>
              <div className="w-full h-1 bg-[#DDD7CB] mt-2 overflow-hidden">
                <motion.div
                  className="h-full bg-[#111111]"
                  initial={{ width: 0 }}
                  animate={{ width: `${freeShippingProgress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-12 h-12 flex items-center justify-center border border-[#E8E3DA] mb-4 text-[#6B6862]">
                    <ShoppingBag size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm uppercase tracking-[0.16em] font-medium text-[#111111]">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-[#6B6862] max-w-xs mt-1.5 mb-6">
                    Discover essential silhouettes thoughtfully engineered for modern movement.
                  </p>
                  <Link
                    href="/new-arrivals"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] text-[#F8F6F0] text-xs uppercase tracking-[0.16em] hover:bg-[#2A2A2A] transition-colors"
                  >
                    <span>Shop New Arrivals</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-6 border-b border-[#E8E3DA] last:border-0"
                  >
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="relative w-20 h-26 bg-[#EBE5DB] shrink-0 overflow-hidden block"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover object-top hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="text-xs uppercase tracking-[0.1em] font-medium text-[#111111] hover:underline truncate block"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#8C867B] hover:text-[#111111] transition-colors p-1"
                            title="Remove"
                            aria-label="Remove item"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        <p className="text-[11px] text-[#6B6862] mt-0.5">
                          {item.color} / Size {item.size}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#DDD7CB]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#111111] hover:bg-[#EBE5DB] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-8 text-center text-xs font-medium text-[#111111]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#111111] hover:bg-[#EBE5DB] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} />
                          </button>
                        </div>

                        <span className="text-xs font-medium text-[#111111]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 bg-[#F3EFE7] border-t border-[#E8E3DA] space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-[#6B6862]">
                    <span>Subtotal</span>
                    <span className="text-[#111111] font-medium">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#6B6862]">
                    <span>Shipping</span>
                    <span>
                      {amountNeededForFreeShipping === 0 ? 'Complimentary' : 'Calculated at checkout'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E8E3DA] flex justify-between text-sm font-medium text-[#111111]">
                  <span className="uppercase tracking-[0.1em]">Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>

                <div className="space-y-2 pt-2">
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3.5 bg-[#111111] text-[#F8F6F0] text-xs uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-2 hover:bg-[#2A2A2A] transition-colors block text-center"
                  >
                    <span>Checkout ({formatPrice(cartTotal)})</span>
                    <ArrowRight size={13} />
                  </Link>

                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2 text-center text-xs uppercase tracking-[0.14em] text-[#6B6862] hover:text-[#111111] transition-colors block"
                  >
                    View Full Bag
                  </Link>
                </div>

                <p className="text-[10px] text-center text-[#8C867B] tracking-wider uppercase">
                  Complimentary 30-Day Returns & Exchanges
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
