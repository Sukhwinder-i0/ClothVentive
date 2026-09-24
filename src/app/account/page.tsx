'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { formatPrice } from '@/lib/utils';
import { Package, User, MapPin, Sliders, Heart, ExternalLink, CheckCircle } from 'lucide-react';

const MOCK_ORDERS = [
  {
    id: 'CV-94812',
    date: '18 September 2026',
    status: 'Delivered',
    trackingNumber: 'DEL-84920491',
    total: 8980,
    items: [
      { name: 'Structured Overshirt', color: 'Stone Taupe', size: 'M', price: 5490, quantity: 1 },
      { name: 'Essential Crewneck', color: 'Heather Stone', size: 'M', price: 3490, quantity: 1 },
    ],
  },
  {
    id: 'CV-88210',
    date: '04 August 2026',
    status: 'Delivered',
    trackingNumber: 'DEL-73819204',
    total: 4990,
    items: [
      { name: 'Wide Leg Trousers', color: 'Oatmeal', size: 'L', price: 4990, quantity: 1 },
    ],
  },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'preferences'>('orders');
  const { wishlistCount, showToast } = useStore();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile Updated', 'Your personal details have been updated.', 'info');
  };

  return (
    <div className="pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="border-b border-[#E8E3DA] pb-8 mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.24em] text-[#6B6862] mb-2 block font-mono">
            Client Portal
          </span>
          <h1 className="text-3xl sm:text-5xl font-light uppercase tracking-tight text-[#111111]">
            My Account
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6862] max-w-md mt-2 font-light">
            Welcome back, Dev Alwyn. Member of the ClothVentive Archive Patron Program.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="px-3 py-1 bg-[#111111] text-[#F8F6F0] uppercase tracking-[0.16em]">
            Archive Patron
          </span>
          <span className="text-[#8C867B] font-mono">Tier II</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Navigation Tabs (Sidebar - 3 cols) */}
        <div className="lg:col-span-3 border border-[#E8E3DA] bg-[#F0ECE4]/40 divide-y divide-[#E8E3DA]">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full p-4 flex items-center justify-between text-xs uppercase tracking-[0.16em] transition-colors text-left ${
              activeTab === 'orders'
                ? 'bg-[#111111] text-[#F8F6F0]'
                : 'text-[#111111] hover:bg-[#EBE5DB]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package size={15} />
              <span>Orders ({MOCK_ORDERS.length})</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full p-4 flex items-center justify-between text-xs uppercase tracking-[0.16em] transition-colors text-left ${
              activeTab === 'profile'
                ? 'bg-[#111111] text-[#F8F6F0]'
                : 'text-[#111111] hover:bg-[#EBE5DB]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <User size={15} />
              <span>Personal Details</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full p-4 flex items-center justify-between text-xs uppercase tracking-[0.16em] transition-colors text-left ${
              activeTab === 'addresses'
                ? 'bg-[#111111] text-[#F8F6F0]'
                : 'text-[#111111] hover:bg-[#EBE5DB]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MapPin size={15} />
              <span>Addresses (2)</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`w-full p-4 flex items-center justify-between text-xs uppercase tracking-[0.16em] transition-colors text-left ${
              activeTab === 'preferences'
                ? 'bg-[#111111] text-[#F8F6F0]'
                : 'text-[#111111] hover:bg-[#EBE5DB]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sliders size={15} />
              <span>Preferences</span>
            </div>
          </button>

          <Link
            href="/wishlist"
            className="w-full p-4 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-[#111111] hover:bg-[#EBE5DB] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Heart size={15} />
              <span>Saved Pieces</span>
            </div>
            <span className="text-[11px] text-[#8C867B] font-mono">{wishlistCount}</span>
          </Link>
        </div>

        {/* Content Pane (9 cols) */}
        <div className="lg:col-span-9 border border-[#E8E3DA] bg-[#F8F6F0] p-6 sm:p-8">
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-base uppercase tracking-[0.16em] font-medium text-[#111111]">
                  Order History & Dispatches
                </h2>
                <p className="text-xs text-[#6B6862] mt-1 font-light">
                  Track current shipments and view archival order records.
                </p>
              </div>

              <div className="space-y-6">
                {MOCK_ORDERS.map((order) => (
                  <div key={order.id} className="border border-[#E8E3DA] bg-[#F0ECE4]/30 p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E8E3DA] text-xs">
                      <div>
                        <span className="font-semibold text-[#111111] text-sm uppercase tracking-wider block">
                          Order {order.id}
                        </span>
                        <span className="text-[#8C867B]">{order.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EBE5DB] text-[#111111] text-[11px] uppercase tracking-wider">
                          <CheckCircle size={12} className="text-[#111111]" />
                          {order.status}
                        </span>
                        <span className="font-semibold text-[#111111]">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="divide-y divide-[#E8E3DA]/60">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
                          <div>
                            <p className="font-medium text-[#111111]">{item.name}</p>
                            <p className="text-[11px] text-[#6B6862]">
                              {item.color} • Size {item.size} • Qty {item.quantity}
                            </p>
                          </div>
                          <span className="text-[#111111] font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#E8E3DA] flex items-center justify-between text-[11px] text-[#8C867B]">
                      <span>Tracking: {order.trackingNumber}</span>
                      <button
                        onClick={() => showToast('Tracking Carrier', `Querying dispatch node ${order.trackingNumber}`, 'info')}
                        className="text-[#111111] hover:underline flex items-center gap-1 uppercase tracking-wider"
                      >
                        <span>Carrier Tracking</span>
                        <ExternalLink size={11} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base uppercase tracking-[0.16em] font-medium text-[#111111]">
                  Personal Dossier
                </h2>
                <p className="text-xs text-[#6B6862] mt-1 font-light">
                  Manage your personal identity credentials and contact information.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                <div>
                  <label className="text-xs uppercase tracking-[0.14em] text-[#6B6862] block mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Dev Alwyn"
                    className="w-full bg-[#F0ECE4]/40 border border-[#DDD7CB] px-3.5 py-2.5 text-xs text-[#111111] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.14em] text-[#6B6862] block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="alwyn@clothventive.internal"
                    className="w-full bg-[#F0ECE4]/40 border border-[#DDD7CB] px-3.5 py-2.5 text-xs text-[#111111] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.14em] text-[#6B6862] block mb-1.5">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="+91 98765 43210"
                    className="w-full bg-[#F0ECE4]/40 border border-[#DDD7CB] px-3.5 py-2.5 text-xs text-[#111111] outline-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#111111] text-[#F8F6F0] text-xs uppercase tracking-[0.18em] hover:bg-[#2A2A2A] transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base uppercase tracking-[0.16em] font-medium text-[#111111]">
                  Delivery Addresses
                </h2>
                <p className="text-xs text-[#6B6862] mt-1 font-light">
                  Saved domestic and international shipping destinations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-[#111111] p-5 space-y-2 relative bg-[#F0ECE4]/30">
                  <span className="text-[10px] uppercase tracking-[0.2em] bg-[#111111] text-[#F8F6F0] px-2 py-0.5 inline-block">
                    Default Shipping
                  </span>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#111111] pt-1">
                    Studio Residence
                  </h4>
                  <p className="text-xs text-[#55524B] leading-relaxed">
                    Dev Alwyn<br />
                    Flat 402, Signature Atrium<br />
                    Bandra West, Mumbai 400050<br />
                    Maharashtra, India<br />
                    +91 98765 43210
                  </p>
                </div>

                <div className="border border-[#E8E3DA] p-5 space-y-2 bg-[#F0ECE4]/10">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C867B] inline-block font-mono">
                    Alternate Address
                  </span>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#111111] pt-1">
                    Design Atelier
                  </h4>
                  <p className="text-xs text-[#55524B] leading-relaxed">
                    ClothVentive Workspace<br />
                    Level 3, Okhla Phase III<br />
                    New Delhi 110020<br />
                    Delhi, India
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PREFERENCES */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-base uppercase tracking-[0.16em] font-medium text-[#111111]">
                  Client Privileges & Preferences
                </h2>
                <p className="text-xs text-[#6B6862] mt-1 font-light">
                  Tailor your digital experience and communication channels.
                </p>
              </div>

              <div className="space-y-4 max-w-lg divide-y divide-[#E8E3DA]">
                <div className="pt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider font-medium text-[#111111]">
                      Curated Capsule Drops
                    </p>
                    <p className="text-[11px] text-[#6B6862]">
                      Receive private notices 24 hours prior to public releases.
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-[#111111] w-4 h-4" />
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider font-medium text-[#111111]">
                      Packaging Preference
                    </p>
                    <p className="text-[11px] text-[#6B6862]">
                      Minimalist FSC-certified unbranded exterior wrapping.
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="accent-[#111111] w-4 h-4" />
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider font-medium text-[#111111]">
                      Default Currency
                    </p>
                    <p className="text-[11px] text-[#6B6862]">Indian Rupee (INR ₹)</p>
                  </div>
                  <span className="text-xs font-mono text-[#111111]">INR (₹)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
