'use client';

import { QualityAssessment } from '@/types';
import ConfidenceBar from '@/components/ui/ConfidenceBar';
import { QUALITY_FLAG_LABELS } from '@/lib/constants';

interface QualityCardProps {
  assessment: QualityAssessment;
}

const statusConfig = {
  reliable: { label: 'Analiz güvenilir', icon: '✅', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-100' },
  caution: { label: 'Dikkatli değerlendir', icon: '⚠️', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-100' },
  retake: { label: 'Tekrar çekim önerilir', icon: '❌', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-100' },
};

export default function QualityCard({ assessment }: QualityCardProps) {
  const status = statusConfig[assessment.status];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Analiz Güvenilirliği
      </h4>

      {/* Progress bars */}
      <div className="mb-3 space-y-2">
        <ConfidenceBar value={assessment.quality_score} label="Quality Score" />
        <ConfidenceBar value={assessment.confidence} label="Confidence" />
      </div>

      {/* Flags */}
      {assessment.flags.length > 0 && (
        <div className="mb-3">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Uyarılar
          </p>
          <ul className="space-y-0.5">
            {assessment.flags.map((flag) => (
              <li key={flag} className="flex items-center gap-1.5 text-xs text-slate-600">
                <span className="h-1 w-1 rounded-full bg-amber-400" />
                {QUALITY_FLAG_LABELS[flag] || flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pose */}
      <div className="mb-3">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Pose
        </p>
        <div className="flex gap-3 text-xs text-slate-600">
          <span>Yaw {assessment.pose.yaw}°</span>
          <span>Pitch {assessment.pose.pitch}°</span>
          <span>Roll {assessment.pose.roll}°</span>
        </div>
      </div>

      {/* Status */}
      <div className={`rounded-lg border ${status.border} ${status.bg} px-3 py-2`}>
        <span className={`text-xs font-medium ${status.color}`}>
          {status.icon} {status.label}
        </span>
      </div>
    </div>
  );
}
