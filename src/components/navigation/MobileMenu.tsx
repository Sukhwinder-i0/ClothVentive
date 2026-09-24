'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Heart, User, Search } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { href: '/new-arrivals', label: 'New Arrivals', tag: 'Spring 2026' },
  { href: '/men', label: 'Men', tag: 'Essentials' },
  { href: '/women', label: 'Women', tag: 'Silhouettes' },
  { href: '/collections', label: 'Collections', tag: 'Curated' },
  { href: '/lookbook', label: 'Lookbook', tag: 'Editorial' },
  { href: '/about', label: 'Our Story', tag: 'Philosophy' },
  { href: '/contact', label: 'Concierge', tag: 'Assistance' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { setIsSearchOpen, wishlistCount } = useStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSearchClick = () => {
    onClose();
    setIsSearchOpen(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#F8F6F0] flex flex-col justify-between p-6 sm:p-10 overflow-y-auto"
        >
          {/* Top header */}
          <div className="flex items-center justify-between border-b border-[#E8E3DA] pb-6">
            <Link
              href="/"
              onClick={onClose}
              className="text-lg font-semibold tracking-[0.25em] text-[#111111] uppercase"
            >
              ClothVentive
            </Link>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-[#111111] hover:text-[#6B6862] transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Quick Search Trigger */}
          <div className="my-6">
            <button
              onClick={handleSearchClick}
              className="w-full flex items-center justify-between px-4 py-3 border border-[#E8E3DA] bg-[#F1EDE5] text-[#6B6862] text-xs uppercase tracking-[0.16em]"
            >
              <div className="flex items-center gap-2.5">
                <Search size={14} className="text-[#111111]" />
                <span>Search catalog...</span>
              </div>
              <ArrowRight size={13} className="text-[#111111]" />
            </button>
          </div>

          {/* Primary Nav Links */}
          <nav className="flex-1 flex flex-col justify-center space-y-4 my-6">
            {NAV_LINKS.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * idx, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-baseline justify-between py-1 border-b border-[#E8E3DA]/50"
                  >
                    <span
                      className={`text-2xl sm:text-3xl font-light uppercase tracking-[0.06em] transition-colors ${
                        isActive ? 'text-[#111111] font-normal underline underline-offset-8' : 'text-[#2C2A29] group-hover:text-[#111111]'
                      }`}
                    >
                      {link.label}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C867B] group-hover:text-[#111111] transition-colors">
                      {link.tag}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Secondary Footer in Menu */}
          <div className="pt-6 border-t border-[#E8E3DA] space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/wishlist"
                onClick={onClose}
                className="flex items-center gap-2 p-3 border border-[#E8E3DA] text-xs uppercase tracking-[0.14em] text-[#111111] hover:bg-[#EBE5DB] transition-colors"
              >
                <Heart size={14} />
                <span>Wishlist ({wishlistCount})</span>
              </Link>
              <Link
                href="/account"
                onClick={onClose}
                className="flex items-center gap-2 p-3 border border-[#E8E3DA] text-xs uppercase tracking-[0.14em] text-[#111111] hover:bg-[#EBE5DB] transition-colors"
              >
                <User size={14} />
                <span>Account</span>
              </Link>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#8C867B] tracking-wider uppercase pt-2">
              <span>IN / INR (₹)</span>
              <span>© 2026 ClothVentive</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
