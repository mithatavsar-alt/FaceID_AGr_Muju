'use client';

import { useState } from 'react';
import { DoseRange as DoseRangeType, DoseTier } from '@/types';

interface DoseRangeProps {
  doseRange: DoseRangeType;
}

const tierLabels: Record<DoseTier, string> = {
  conservative: 'Konservatif',
  standard: 'Standart',
  advanced: 'İleri',
};

const tierDots: Record<DoseTier, number> = {
  conservative: 1,
  standard: 2,
  advanced: 3,
};

export default function DoseRange({ doseRange }: DoseRangeProps) {
  const [selectedTier, setSelectedTier] = useState<DoseTier>('standard');

  const tiers: DoseTier[] = ['conservative', 'standard', 'advanced'];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-1 flex items-center gap-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Doz / CC Öneri Aralığı
        </h4>
      </div>

      {/* Medikal uyarı */}
      <p className="mb-3 text-[10px] text-slate-400">
        ⚕️ Hekim değerlendirmesi – Nihai karar hekimindir.
      </p>

      {/* Kademe seçimi */}
      <div className="mb-3 grid grid-cols-3 gap-2">
        {tiers.map((tier) => {
          const range = doseRange[tier];
          const isSelected = selectedTier === tier;

          return (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`rounded-lg border p-2.5 text-center transition-all duration-200 ${
                isSelected
                  ? 'border-blue-300 bg-blue-50 shadow-sm'
                  : 'border-slate-100 bg-slate-50 hover:border-slate-200'
              }`}
            >
              <p
                className={`text-[10px] font-semibold ${
                  isSelected ? 'text-blue-600' : 'text-slate-500'
                }`}
              >
                {tierLabels[tier]}
              </p>
              <p
                className={`mt-0.5 text-sm font-bold ${
                  isSelected ? 'text-blue-800' : 'text-slate-700'
                }`}
              >
                {range.min}–{range.max}
              </p>
              <p className="text-[10px] text-slate-400">{range.unit}</p>
              {/* Dots */}
              <div className="mt-1 flex justify-center gap-0.5">
                {[1, 2, 3].map((dot) => (
                  <div
                    key={dot}
                    className={`h-1.5 w-1.5 rounded-full ${
                      dot <= tierDots[tier]
                        ? isSelected
                          ? 'bg-blue-500'
                          : 'bg-slate-400'
                        : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Seçili kademe bilgisi */}
      <div className="rounded-lg bg-slate-50 p-2 text-xs text-slate-500">
        Seçili kademe: <span className="font-medium text-slate-700">{tierLabels[selectedTier]}</span>
        {selectedTier === 'conservative' && (
          <span className="ml-1">· İlk seans hastalarda tercih edilebilir.</span>
        )}
      </div>

      {/* Alt uyarı */}
      <p className="mt-2 text-[10px] leading-relaxed text-slate-400">
        Bu değerler genel literatür aralıklarıdır, bireysel değerlendirme gerektirir.
      </p>
    </div>
  );
}
