'use client';

import { useAnalysisStore } from '@/store/useAnalysisStore';
import { PRIORITY_COLORS, ACTIVE_COLOR } from '@/lib/constants';
import { faceSchemaData } from './face-paths';

export default function FaceSchema() {
  const { regions, selectedRegion, hoveredRegion } = useAnalysisStore();

  const getRegionData = (id: string) => regions.find((r) => r.id === id);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        AI Yüz Şeması
      </h3>
      <svg
        viewBox="0 0 200 260"
        className="w-full"
        style={{ maxHeight: 280 }}
      >
        {/* Yüz oval */}
        <ellipse
          cx="100" cy="130" rx="78" ry="100"
          fill="none" stroke="#e2e8f0" strokeWidth="1"
        />

        {/* Bölgeler */}
        {faceSchemaData.map((item) => {
          const regionData = getRegionData(item.id);
          const isSelected = selectedRegion?.id === item.id;
          const isHovered = hoveredRegion?.id === item.id;
          const priority = regionData?.priority ?? 'low';
          const color = isSelected ? ACTIVE_COLOR : PRIORITY_COLORS[priority];

          return (
            <path
              key={item.id}
              d={item.path}
              fill={color}
              fillOpacity={isSelected ? 0.35 : isHovered ? 0.2 : 0.08}
              stroke={color}
              strokeWidth={isSelected ? 1.5 : isHovered ? 1 : 0.5}
              strokeOpacity={isSelected ? 0.9 : isHovered ? 0.6 : 0.2}
              className={`transition-all duration-200 ${isSelected ? 'animate-svg-pulse' : ''}`}
            />
          );
        })}

        {/* Göz simgeleri */}
        <ellipse cx="68" cy="102" rx="10" ry="6" fill="none" stroke="#94a3b8" strokeWidth="0.7" />
        <ellipse cx="132" cy="102" rx="10" ry="6" fill="none" stroke="#94a3b8" strokeWidth="0.7" />
        <circle cx="68" cy="102" r="2.5" fill="#94a3b8" opacity="0.4" />
        <circle cx="132" cy="102" r="2.5" fill="#94a3b8" opacity="0.4" />

        {/* Burun simgesi */}
        <path d="M100,106 L96,134 Q100,140 104,134 Z" fill="none" stroke="#94a3b8" strokeWidth="0.7" />

        {/* Ağız simgesi */}
        <path d="M80,160 Q90,168 100,170 Q110,168 120,160" fill="none" stroke="#94a3b8" strokeWidth="0.7" />

        {/* Seçili bölge etiketi */}
        {selectedRegion && (
          <text
            x="100" y="246"
            textAnchor="middle"
            fill={ACTIVE_COLOR}
            fontSize="9"
            fontWeight="600"
          >
            {selectedRegion.name_tr}
          </text>
        )}
      </svg>
    </div>
  );
}
