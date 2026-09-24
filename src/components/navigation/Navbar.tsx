'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { Search, ShoppingBag, Heart, User, Menu } from 'lucide-react';
import { MobileMenu } from './MobileMenu';

const NAV_ITEMS = [
  { href: '/new-arrivals', label: 'New Arrivals' },
  { href: '/men', label: 'Men' },
  { href: '/women', label: 'Women' },
  { href: '/collections', label: 'Collections' },
  { href: '/lookbook', label: 'Lookbook' },
];

export function Navbar() {
  const pathname = usePathname();
  const { cartCount, wishlistCount, setIsCartOpen, setIsSearchOpen } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F8F6F0]/92 backdrop-blur-md border-b border-[#E8E3DA] py-3.5'
            : 'bg-[#F8F6F0]/70 backdrop-blur-[2px] border-b border-[#E8E3DA]/40 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LEFT: Wordmark */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="group flex items-baseline gap-1.5 focus:outline-none"
              >
                <span className="text-base sm:text-lg font-bold tracking-[0.24em] uppercase text-[#111111] transition-opacity group-hover:opacity-80">
                  ClothVentive
                </span>
                <span className="w-1 h-1 rounded-full bg-[#111111] inline-block" />
              </Link>
            </div>

            {/* CENTER: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative text-xs uppercase tracking-[0.16em] transition-colors py-1 ${
                      isActive ? 'text-[#111111] font-semibold' : 'text-[#5A564F] hover:text-[#111111]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#111111]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT: Actions */}
            <div className="flex items-center space-x-4 sm:space-x-5">
              {/* Search button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 text-[#111111] hover:text-[#6B6862] transition-colors flex items-center gap-1.5 focus:outline-none"
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.8} />
                <span className="hidden xl:inline text-[11px] uppercase tracking-[0.18em] text-[#6B6862]">
                  Search
                </span>
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-1.5 text-[#111111] hover:text-[#6B6862] transition-colors hidden sm:block focus:outline-none"
                aria-label="Wishlist"
              >
                <Heart size={18} strokeWidth={1.8} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[15px] h-[15px] px-1 bg-[#111111] text-[#F8F6F0] text-[9px] font-medium flex items-center justify-center rounded-full leading-none">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="p-1.5 text-[#111111] hover:text-[#6B6862] transition-colors hidden sm:block focus:outline-none"
                aria-label="Account"
              >
                <User size={18} strokeWidth={1.8} />
              </Link>

              {/* Shopping Bag Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-1.5 text-[#111111] hover:text-[#6B6862] transition-colors flex items-center gap-1.5 focus:outline-none"
                aria-label={`Shopping bag with ${cartCount} items`}
              >
                <ShoppingBag size={18} strokeWidth={1.8} />
                {cartCount > 0 ? (
                  <span className="min-w-[16px] h-[16px] px-1 bg-[#111111] text-[#F8F6F0] text-[10px] font-semibold flex items-center justify-center rounded-full leading-none">
                    {cartCount}
                  </span>
                ) : (
                  <span className="hidden xl:inline text-[11px] uppercase tracking-[0.18em] text-[#6B6862]">
                    Bag
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-1.5 text-[#111111] hover:text-[#6B6862] transition-colors"
                aria-label="Open menu"
              >
                <Menu size={22} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
