'use client';

import { PRIORITY_COLORS, PRIORITY_LABELS } from '@/lib/constants';

interface PriorityBadgeProps {
  priority: 'low' | 'medium' | 'high';
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const color = PRIORITY_COLORS[priority];
  const label = PRIORITY_LABELS[priority].tr;

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
      style={{ backgroundColor: color }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-white/40"
      />
      {label}
    </span>
  );
}
