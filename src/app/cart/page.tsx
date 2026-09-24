'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { formatPrice } from '@/lib/utils';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Check } from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 3000;
const STANDARD_SHIPPING_FEE = 199;

export default function CartPage() {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart, showToast } = useStore();
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const isFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD || cartTotal === 0;
  const shippingFee = isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const orderTotal = Math.max(0, cartTotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'VENTIVE10' || code === 'FIRST10' || code === 'EDITORIAL') {
      setDiscountPercent(10);
      setPromoApplied(true);
      showToast('10% Promotional Privilege Applied', code, 'info');
    } else {
      showToast('Invalid Promotional Code', 'Try "VENTIVE10" for 10% privilege', 'info');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      showToast('Order Placed Successfully', 'Confirmation sent to your email. Reference #CV-8921', 'info');
    }, 1500);
  };

  const recommendedProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Title */}
      <div className="border-b border-[#E8E3DA] pb-8 mb-8 sm:mb-12">
        <span className="text-xs uppercase tracking-[0.24em] text-[#6B6862] mb-2 block font-mono">
          Order Summary
        </span>
        <h1 className="text-3xl sm:text-5xl font-light uppercase tracking-tight text-[#111111]">
          Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
        </h1>
      </div>

      {cart.length === 0 ? (
        /* Empty State */
        <div className="py-24 text-center border border-[#E8E3DA] bg-[#F0ECE4]/30 max-w-2xl mx-auto my-8 p-8 sm:p-12">
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-[#E8E3DA] text-[#6B6862]">
            <ShoppingBag size={28} strokeWidth={1.2} />
          </div>
          <h2 className="text-xl sm:text-2xl font-light uppercase tracking-wider text-[#111111] mb-2">
            Your Bag is Empty
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6862] max-w-sm mx-auto mb-8 font-light">
            Discover essential pieces crafted with architectural precision and natural fibers.
          </p>
          <Link
            href="/new-arrivals"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#111111] text-[#F8F6F0] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#2A2A2A] transition-colors"
          >
            <span>Shop New Arrivals</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        /* Full Bag Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left: Cart Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="hidden sm:grid grid-cols-12 text-[11px] uppercase tracking-[0.18em] text-[#8C867B] pb-3 border-b border-[#E8E3DA]">
              <div className="col-span-6">Garment</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Price</div>
            </div>

            <div className="divide-y divide-[#E8E3DA]">
              {cart.map((item) => (
                <div key={item.id} className="py-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center">
                  {/* Thumbnail & Info (6 cols) */}
                  <div className="w-full sm:col-span-6 flex gap-4">
                    <Link
                      href={`/product/${item.slug}`}
                      className="relative w-20 h-26 sm:w-24 sm:h-32 bg-[#EBE5DB] shrink-0 overflow-hidden border border-[#E8E3DA]"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="96px"
                        className="object-cover object-top hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <Link
                          href={`/product/${item.slug}`}
                          className="text-xs sm:text-sm uppercase tracking-[0.08em] font-medium text-[#111111] hover:underline"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-[#6B6862] mt-1">
                          Color: <span className="text-[#111111]">{item.color}</span>
                        </p>
                        <p className="text-xs text-[#6B6862]">
                          Size: <span className="text-[#111111]">{item.size}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="inline-flex items-center gap-1.5 text-[11px] text-[#8C867B] hover:text-[#111111] transition-colors mt-2"
                      >
                        <Trash2 size={12} />
                        <span>Remove piece</span>
                      </button>
                    </div>
                  </div>

                  {/* Quantity (3 cols) */}
                  <div className="w-full sm:col-span-3 flex justify-between sm:justify-center items-center">
                    <span className="sm:hidden text-xs text-[#6B6862]">Quantity:</span>
                    <div className="flex items-center border border-[#DDD7CB]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#111111] hover:bg-[#EBE5DB] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-9 text-center text-xs font-medium text-[#111111]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#111111] hover:bg-[#EBE5DB] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Price (3 cols) */}
                  <div className="w-full sm:col-span-3 flex justify-between sm:justify-end items-center">
                    <span className="sm:hidden text-xs text-[#6B6862]">Subtotal:</span>
                    <div className="text-right">
                      <p className="text-xs sm:text-sm font-semibold text-[#111111]">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-[10px] text-[#8C867B]">
                          {formatPrice(item.price)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center text-xs">
              <Link
                href="/new-arrivals"
                className="text-[#6B6862] hover:text-[#111111] underline underline-offset-4"
              >
                ← Continue Browsing
              </Link>
              <button
                onClick={clearCart}
                className="text-[#8C867B] hover:text-[#111111] uppercase tracking-[0.1em]"
              >
                Clear Entire Bag
              </button>
            </div>
          </div>

          {/* Right: Order Summary Module (5 cols) */}
          <div className="lg:col-span-5 bg-[#F0ECE4]/60 border border-[#E8E3DA] p-6 sm:p-8 space-y-6">
            <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-[#111111] pb-3 border-b border-[#E8E3DA]">
              Order Summary
            </h2>

            {/* Calculations */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-[#55524B]">
                <span>Bag Subtotal</span>
                <span className="text-[#111111] font-medium">{formatPrice(cartTotal)}</span>
              </div>

              {promoApplied && (
                <div className="flex justify-between text-[#111111]">
                  <span>Special Privilege (10%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#55524B]">
                <span>Shipping & Handling</span>
                <span>{isFreeShipping ? 'Complimentary' : formatPrice(STANDARD_SHIPPING_FEE)}</span>
              </div>

              <div className="flex justify-between text-[#8C867B] text-[11px]">
                <span>Taxes & Duties</span>
                <span>Included (GST)</span>
              </div>

              <div className="pt-4 border-t border-[#E8E3DA] flex justify-between text-base font-medium text-[#111111]">
                <span className="uppercase tracking-[0.1em]">Total Due</span>
                <span>{formatPrice(orderTotal)}</span>
              </div>
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="pt-4 border-t border-[#E8E3DA]">
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#6B6862] block mb-2 font-mono">
                Privilege / Archive Code
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Code (e.g. VENTIVE10)"
                  className="flex-1 bg-[#F8F6F0] border border-[#DDD7CB] px-3 py-2 text-xs uppercase tracking-wider outline-none text-[#111111]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#111111] text-[#F8F6F0] text-xs uppercase tracking-wider hover:bg-[#2A2A2A] transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-[11px] text-[#111111] mt-1.5 flex items-center gap-1 font-medium">
                  <Check size={12} />
                  <span>VENTIVE10 active (10% deducted)</span>
                </p>
              )}
            </form>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-4 bg-[#111111] text-[#F8F6F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-2"
            >
              {isCheckingOut ? (
                <span>Securing Transaction...</span>
              ) : (
                <>
                  <span>Checkout — {formatPrice(orderTotal)}</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>

            {/* Assurances */}
            <div className="pt-4 border-t border-[#E8E3DA] space-y-2 text-[11px] text-[#6B6862]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#111111]" />
                <span>Encrypted 256-Bit SSL Checkout</span>
              </div>
              <p>Complimentary doorstep pick-up for all returns within 30 days.</p>
            </div>
          </div>
        </div>
      )}

      {/* Recommended "You May Also Like" */}
      <div className="mt-24 pt-16 border-t border-[#E8E3DA]">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E8E3DA]">
          <div>
            <span className="text-xs uppercase tracking-[0.24em] text-[#8C867B] font-mono">
              Curated Recommendations
            </span>
            <h2 className="text-xl sm:text-2xl font-light uppercase tracking-wider text-[#111111] mt-1">
              You May Also Like
            </h2>
          </div>
          <Link
            href="/new-arrivals"
            className="text-xs uppercase tracking-[0.16em] text-[#111111] hover:text-[#6B6862]"
          >
            Explore All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {recommendedProducts.map((p) => (
            <ProductCard key={p.id} product={p} aspectRatio="portrait" />
          ))}
        </div>
      </div>
    </div>
  );
}
