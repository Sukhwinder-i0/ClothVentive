'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler } from 'lucide-react';

interface SizeData {
  size: string;
  chestCm: string;
  chestIn: string;
  waistCm: string;
  waistIn: string;
  hipsCm: string;
  hipsIn: string;
  lengthCm: string;
  lengthIn: string;
}

const SIZE_CHART: SizeData[] = [
  { size: 'XS', chestCm: '88 - 92', chestIn: '34 - 36', waistCm: '70 - 74', waistIn: '27 - 29', hipsCm: '88 - 92', hipsIn: '34 - 36', lengthCm: '68', lengthIn: '26.8' },
  { size: 'S',  chestCm: '92 - 96', chestIn: '36 - 38', waistCm: '74 - 78', waistIn: '29 - 31', hipsCm: '92 - 96', hipsIn: '36 - 38', lengthCm: '70', lengthIn: '27.5' },
  { size: 'M',  chestCm: '96 - 102', chestIn: '38 - 40', waistCm: '78 - 84', waistIn: '31 - 33', hipsCm: '96 - 102', hipsIn: '38 - 40', lengthCm: '72', lengthIn: '28.3' },
  { size: 'L',  chestCm: '102 - 108', chestIn: '40 - 42', waistCm: '84 - 90', waistIn: '33 - 35', hipsCm: '102 - 108', hipsIn: '40 - 42', lengthCm: '74', lengthIn: '29.1' },
  { size: 'XL', chestCm: '108 - 114', chestIn: '42 - 45', waistCm: '90 - 96', waistIn: '35 - 38', hipsCm: '108 - 114', hipsIn: '42 - 45', lengthCm: '76', lengthIn: '29.9' },
  { size: 'XXL', chestCm: '114 - 120', chestIn: '45 - 48', waistCm: '96 - 102', waistIn: '38 - 40', hipsCm: '114 - 120', hipsIn: '45 - 48', lengthCm: '78', lengthIn: '30.7' },
];

export function SizeGuideModal() {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  useEffect(() => {
    if (isSizeGuideOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSizeGuideOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSizeGuideOpen) {
        setIsSizeGuideOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSizeGuideOpen, setIsSizeGuideOpen]);

  return (
    <AnimatePresence>
      {isSizeGuideOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSizeGuideOpen(false)}
            className="fixed inset-0 bg-[#111111]/40 z-50 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.25 }}
              className="bg-[#F8F6F0] border border-[#E8E3DA] max-w-2xl w-full p-6 sm:p-8 overflow-hidden relative"
              role="dialog"
              aria-modal="true"
              aria-label="Garment Size Guide"
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-6 border-b border-[#E8E3DA]">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#6B6862] mb-1">
                    <Ruler size={14} />
                    <span>Reference Standard</span>
                  </div>
                  <h3 className="text-xl font-medium uppercase tracking-[0.08em] text-[#111111]">
                    Size & Measurement Guide
                  </h3>
                </div>
                <button
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="p-2 -mr-2 text-[#111111] hover:text-[#6B6862] transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Unit Toggle */}
              <div className="flex items-center justify-between my-6">
                <p className="text-xs text-[#6B6862]">
                  Measurements are taken flat across garments.
                </p>
                <div className="flex border border-[#DDD7CB]">
                  <button
                    onClick={() => setUnit('cm')}
                    className={`px-3 py-1 text-xs uppercase tracking-[0.1em] transition-colors ${
                      unit === 'cm'
                        ? 'bg-[#111111] text-[#F8F6F0]'
                        : 'bg-transparent text-[#111111] hover:bg-[#EBE5DB]'
                    }`}
                  >
                    Centimeters
                  </button>
                  <button
                    onClick={() => setUnit('in')}
                    className={`px-3 py-1 text-xs uppercase tracking-[0.1em] transition-colors ${
                      unit === 'in'
                        ? 'bg-[#111111] text-[#F8F6F0]'
                        : 'bg-transparent text-[#111111] hover:bg-[#EBE5DB]'
                    }`}
                  >
                    Inches
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E8E3DA] text-[#6B6862] uppercase tracking-[0.12em]">
                      <th className="py-3 px-3">Size</th>
                      <th className="py-3 px-3">Chest</th>
                      <th className="py-3 px-3">Waist</th>
                      <th className="py-3 px-3">Hips</th>
                      <th className="py-3 px-3">Body Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E3DA]">
                    {SIZE_CHART.map((row) => (
                      <tr key={row.size} className="hover:bg-[#F0ECE4]/60 transition-colors">
                        <td className="py-3.5 px-3 font-semibold text-[#111111]">{row.size}</td>
                        <td className="py-3.5 px-3 text-[#111111]">
                          {unit === 'cm' ? `${row.chestCm} cm` : `${row.chestIn} in`}
                        </td>
                        <td className="py-3.5 px-3 text-[#111111]">
                          {unit === 'cm' ? `${row.waistCm} cm` : `${row.waistIn} in`}
                        </td>
                        <td className="py-3.5 px-3 text-[#111111]">
                          {unit === 'cm' ? `${row.hipsCm} cm` : `${row.hipsIn} in`}
                        </td>
                        <td className="py-3.5 px-3 text-[#111111]">
                          {unit === 'cm' ? `${row.lengthCm} cm` : `${row.lengthIn} in`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Fit note */}
              <div className="mt-6 pt-4 border-t border-[#E8E3DA] flex items-center justify-between text-xs text-[#6B6862]">
                <span>Between sizes? We advise selecting your standard size for our relaxed silhouette.</span>
                <button
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="uppercase tracking-[0.14em] text-[#111111] font-medium underline underline-offset-4 hover:text-[#6B6862]"
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
