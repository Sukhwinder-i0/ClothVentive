'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Mail, Clock, MapPin, ArrowRight, Check } from 'lucide-react';

export default function ContactPage() {
  const { showToast } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiries',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
    showToast('Inquiry Transmitted', 'Our client concierge will respond within 24 hours.', 'info');
  };

  return (
    <div className="pt-24 sm:pt-28 pb-28 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#E8E3DA] pb-8 mb-12">
        <span className="text-xs uppercase tracking-[0.24em] text-[#6B6862] mb-2 block font-mono">
          Client Concierge & Atelier
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light uppercase tracking-tight text-[#111111]">
          Contact Us
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6862] max-w-xl mt-3 font-light leading-relaxed">
          For garment inquiries, private showroom consultations, bespoke sizing assistance, or order updates, our concierge is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Contact Information & Studios (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-6">
            <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-[#111111] pb-2 border-b border-[#E8E3DA]">
              Direct Inquiries
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-[#111111] mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#8C867B] block font-mono">
                    General & Orders
                  </span>
                  <a href="mailto:concierge@clothventive.com" className="text-sm text-[#111111] hover:underline font-medium">
                    concierge@clothventive.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={16} className="text-[#111111] mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#8C867B] block font-mono">
                    Operating Hours
                  </span>
                  <p className="text-[#55524B]">
                    Monday – Saturday: 10:00 – 19:00 IST<br />
                    Response time within 24 business hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#111111] mt-0.5 shrink-0">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#8C867B] block font-mono">
                    Editorial Channel
                  </span>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[#111111] hover:underline font-medium"
                  >
                    @clothventive
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Studios */}
          <div className="space-y-4 pt-4 border-t border-[#E8E3DA]">
            <h2 className="text-sm font-medium uppercase tracking-[0.16em] text-[#111111] pb-2 border-b border-[#E8E3DA]">
              Atelier Locations
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#55524B]">
              <div className="p-4 border border-[#E8E3DA] bg-[#F0ECE4]/30 space-y-1">
                <div className="flex items-center gap-1.5 font-medium text-[#111111] uppercase tracking-wider">
                  <MapPin size={13} />
                  <span>Mumbai Studio</span>
                </div>
                <p>Signature Atrium, Bandra West</p>
                <p className="text-[11px] text-[#8C867B]">Appointments upon request</p>
              </div>

              <div className="p-4 border border-[#E8E3DA] bg-[#F0ECE4]/30 space-y-1">
                <div className="flex items-center gap-1.5 font-medium text-[#111111] uppercase tracking-wider">
                  <MapPin size={13} />
                  <span>New Delhi Atelier</span>
                </div>
                <p>Level 3, Okhla Phase III</p>
                <p className="text-[11px] text-[#8C867B]">Archive & textile library</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Minimal Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-[#F0ECE4]/50 border border-[#E8E3DA] p-6 sm:p-10">
          <h2 className="text-lg font-light uppercase tracking-wider text-[#111111] mb-2">
            Send an Inquiry
          </h2>
          <p className="text-xs text-[#6B6862] mb-6 font-light">
            Fill in the details below and a concierge associate will attend to your request.
          </p>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 mx-auto flex items-center justify-center border border-[#111111] text-[#111111]">
                <Check size={20} />
              </div>
              <h3 className="text-sm uppercase tracking-[0.18em] font-medium text-[#111111]">
                Message Received
              </h3>
              <p className="text-xs text-[#6B6862] max-w-sm mx-auto">
                Thank you for contacting ClothVentive. We have queued your inquiry for our client concierge.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'General Inquiries', message: '' });
                }}
                className="mt-4 px-6 py-2.5 border border-[#111111] text-xs uppercase tracking-[0.16em]"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-[0.14em] text-[#6B6862] block mb-1.5 font-mono">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alwyn Dev"
                    className="w-full bg-[#F8F6F0] border border-[#DDD7CB] focus:border-[#111111] px-3.5 py-2.5 text-xs text-[#111111] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.14em] text-[#6B6862] block mb-1.5 font-mono">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-[#F8F6F0] border border-[#DDD7CB] focus:border-[#111111] px-3.5 py-2.5 text-xs text-[#111111] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.14em] text-[#6B6862] block mb-1.5 font-mono">
                  Inquiry Topic
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#F8F6F0] border border-[#DDD7CB] focus:border-[#111111] px-3.5 py-2.5 text-xs text-[#111111] outline-none uppercase tracking-wider transition-colors"
                >
                  <option value="General Inquiries">General Inquiries</option>
                  <option value="Order & Shipping Status">Order & Shipping Status</option>
                  <option value="Sizing & Garment Fit">Sizing & Garment Fit</option>
                  <option value="Returns & Exchanges">Returns & Exchanges</option>
                  <option value="Private Showroom Consultation">Private Showroom Consultation</option>
                  <option value="Press & Wholesale">Press & Wholesale</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-[0.14em] text-[#6B6862] block mb-1.5 font-mono">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Provide details regarding your request or specific garment reference..."
                  className="w-full bg-[#F8F6F0] border border-[#DDD7CB] focus:border-[#111111] px-3.5 py-2.5 text-xs text-[#111111] outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#111111] text-[#F8F6F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#2A2A2A] transition-colors flex items-center justify-center gap-2"
              >
                <span>Transmit Note to Concierge</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
