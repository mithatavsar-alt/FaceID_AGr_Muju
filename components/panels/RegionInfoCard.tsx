'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AnatomicalRegion } from '@/types';
import PriorityBadge from '@/components/ui/PriorityBadge';
import ConfidenceBar from '@/components/ui/ConfidenceBar';

interface RegionInfoCardProps {
  region: AnatomicalRegion | null;
}

export default function RegionInfoCard({ region }: RegionInfoCardProps) {
  return (
    <AnimatePresence mode="wait">
      {region ? (
        <motion.div
          key={region.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          {/* Header */}
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-800">
                {region.name_tr}
              </h3>
              <p className="text-xs text-slate-400">{region.name_en}</p>
            </div>
            <PriorityBadge priority={region.priority} />
          </div>

          {/* Skor */}
          <div className="mb-3">
            <div className="mb-1 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-800">
                {region.score}
              </span>
              <span className="text-xs text-slate-400">/100</span>
            </div>
            <ConfidenceBar value={region.score} label="Bölgesel Skor" showPercentage={false} />
          </div>

          {/* Confidence */}
          <div className="mb-4">
            <ConfidenceBar
              value={region.confidence}
              label="Model Güven Değeri"
            />
          </div>

          {/* Gözlenen Durum */}
          <div className="mb-3">
            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Gözlenen Durum
            </h4>
            <p className="text-sm leading-relaxed text-slate-600">
              {region.condition}
            </p>
          </div>

          {/* Karar Destek */}
          <div className="rounded-lg border border-sky-100 bg-sky-50/50 p-3">
            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-sky-600">
              Karar Destek Notu
            </h4>
            <p className="text-sm leading-relaxed text-sky-800">
              {region.decision_support_note}
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex h-48 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white/50"
        >
          <p className="text-sm text-slate-400">
            Analiz için fotoğraf üzerinde bir bölge seçin
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
