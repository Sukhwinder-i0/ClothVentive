'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { ArrowRight, Check } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showToast } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitted(true);
    showToast('Subscribed Successfully', 'Welcome to the ClothVentive Archive.', 'info');
  };

  return (
    <section className="py-20 lg:py-28 bg-[#111111] text-[#F8F6F0] px-4 sm:px-6 lg:px-12 border-t border-[#242424]">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-xs uppercase tracking-[0.28em] text-[#8C867B] block mb-3 font-mono">
          Private Communiqué
        </span>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight text-[#F8F6F0] mb-4">
          Join the ClothVentive Archive
        </h2>
        <p className="text-xs sm:text-sm text-[#A09D96] max-w-lg mx-auto font-light leading-relaxed mb-8">
          Subscribers receive preview access to seasonal capsule collections, limited fabric releases, and private showroom events.
        </p>

        {isSubmitted ? (
          <div className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#333333] bg-[#1E1E1E] text-xs uppercase tracking-[0.18em] text-[#F8F6F0]">
            <Check size={14} className="text-[#A3E635]" />
            <span>You have been added to the private list.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-transparent border border-[#383838] focus:border-[#F8F6F0] px-4 py-3 text-xs text-[#F8F6F0] placeholder:text-[#666666] outline-none transition-colors uppercase tracking-[0.06em]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#F8F6F0] text-[#111111] text-xs uppercase tracking-[0.18em] font-medium hover:bg-[#FFFFFF] transition-colors flex items-center justify-center gap-2 shrink-0"
            >
              <span>Subscribe</span>
              <ArrowRight size={13} />
            </button>
          </form>
        )}

        <p className="text-[10px] uppercase tracking-[0.16em] text-[#666666] mt-6">
          Unsubscribe at any moment. We respect your attention and inbox.
        </p>
      </div>
    </section>
  );
}
