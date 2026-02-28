'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCompareMode } from '@/hooks/useCompareMode';
import PriorityBadge from '@/components/ui/PriorityBadge';
import ConfidenceBar from '@/components/ui/ConfidenceBar';

const asymmetryConfig = {
  minimal: { label: 'Minimal', icon: '✅', color: 'text-green-700', bg: 'bg-green-50' },
  notable: { label: 'Belirgin', icon: '⚡', color: 'text-amber-700', bg: 'bg-amber-50' },
  attention: { label: 'Dikkat', icon: '🔴', color: 'text-red-700', bg: 'bg-red-50' },
};

export default function ComparePanel() {
  const {
    compareMode,
    comparisonResult,
    homologPairs,
    selectHomologPair,
  } = useCompareMode();

  if (!compareMode) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Sağ / Sol Karşılaştırma
      </h4>

      {/* Homolog çift seçici */}
      {!comparisonResult && (
        <div className="mb-3 space-y-1.5">
          <p className="text-xs text-slate-500">Karşılaştırmak için bir bölge çifti seçin:</p>
          <div className="grid grid-cols-2 gap-1.5">
            {homologPairs.map(({ left, right }) => (
              <button
                key={left.id}
                onClick={() => selectHomologPair(left.id)}
                className="rounded-lg border border-slate-100 px-2.5 py-1.5 text-left text-xs transition-colors hover:border-blue-200 hover:bg-blue-50"
              >
                <span className="font-medium text-slate-700">
                  {left.name_tr.replace('Sol ', '')}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Karşılaştırma sonucu */}
      <AnimatePresence mode="wait">
        {comparisonResult && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {/* Sol / Sağ paneller */}
            <div className="mb-3 grid grid-cols-2 gap-3">
              {/* Sol */}
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase text-slate-400">Sol</span>
                  <PriorityBadge priority={comparisonResult.left_region.priority} />
                </div>
                <p className="mb-1 text-xs font-medium text-slate-700">
                  {comparisonResult.left_region.name_tr}
                </p>
                <p className="mb-1 text-lg font-bold text-slate-800">
                  {comparisonResult.left_region.score}
                </p>
                <ConfidenceBar
                  value={comparisonResult.left_region.confidence}
                  label="Güven"
                />
              </div>

              {/* Sağ */}
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase text-slate-400">Sağ</span>
                  <PriorityBadge priority={comparisonResult.right_region.priority} />
                </div>
                <p className="mb-1 text-xs font-medium text-slate-700">
                  {comparisonResult.right_region.name_tr}
                </p>
                <p className="mb-1 text-lg font-bold text-slate-800">
                  {comparisonResult.right_region.score}
                </p>
                <ConfidenceBar
                  value={comparisonResult.right_region.confidence}
                  label="Güven"
                />
              </div>
            </div>

            {/* Delta panel */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-[10px] text-slate-400">ΔSkor</p>
                  <p className="text-base font-bold text-slate-800">
                    {comparisonResult.delta_score}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-400">ΔGüven</p>
                  <p className="text-base font-bold text-slate-800">
                    {comparisonResult.delta_confidence}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-400">Asimetri</p>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${asymmetryConfig[comparisonResult.asymmetry_level].bg} ${asymmetryConfig[comparisonResult.asymmetry_level].color}`}
                  >
                    {asymmetryConfig[comparisonResult.asymmetry_level].icon}{' '}
                    {asymmetryConfig[comparisonResult.asymmetry_level].label}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
