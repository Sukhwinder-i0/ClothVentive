'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Heart, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Toast() {
  const { toast, setIsCartOpen } = useStore();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-6 right-6 z-[100] max-w-sm w-full bg-[#111111] text-[#F8F6F0] p-4 border border-[#2A2A2A]"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-[#242424] text-[#F8F6F0] shrink-0">
              {toast.type === 'wishlist' ? (
                <Heart size={12} className="fill-current text-[#F8F6F0]" />
              ) : (
                <Check size={12} strokeWidth={2.5} />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-[0.18em] font-medium text-[#F8F6F0]">
                {toast.message}
              </p>
              {toast.subtext && (
                <p className="text-xs text-[#A09D96] mt-0.5 truncate">
                  {toast.subtext}
                </p>
              )}

              {toast.type === 'cart' && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#F8F6F0] underline underline-offset-4 hover:text-[#D1CBC1] flex items-center gap-1.5 transition-colors"
                >
                  View Bag
                  <ArrowRight size={11} />
                </button>
              )}

              {toast.type === 'wishlist' && (
                <Link
                  href="/wishlist"
                  className="mt-2 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#F8F6F0] underline underline-offset-4 hover:text-[#D1CBC1] transition-colors"
                >
                  View Wishlist
                  <ArrowRight size={11} />
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
