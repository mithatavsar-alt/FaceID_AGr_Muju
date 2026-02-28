'use client';

import { Point } from '@/types';

interface MarkerProps {
  position: Point;
  isDragging: boolean;
  shake: boolean;
  label?: string;
  color?: string;
}

export default function Marker({
  position,
  isDragging,
  shake,
  label = 'A',
  color = '#3B82F6',
}: MarkerProps) {
  return (
    <div
      className={`pointer-events-none absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center ${shake ? 'animate-shake' : ''}`}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      {/* Pin head */}
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-lg"
        style={{
          backgroundColor: color,
          cursor: isDragging ? 'grabbing' : 'grab',
          transform: isDragging ? 'scale(1.15)' : 'scale(1)',
          transition: 'transform 150ms ease',
        }}
      >
        {label}
      </div>
      {/* Pin tail */}
      <div
        className="h-3 w-0.5"
        style={{ backgroundColor: color }}
      />
      {/* Pin shadow */}
      <div
        className="h-1.5 w-3 rounded-full opacity-30"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
