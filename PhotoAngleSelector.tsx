'use client';

import { useAnalysisStore, PhotoAngle } from '@/store/useAnalysisStore';

const angles: { id: PhotoAngle; label: string; icon: string; sublabel: string }[] = [
  { id: 'left_45', label: '45° Sol', icon: '◐', sublabel: 'Sol profil' },
  { id: 'frontal', label: 'Frontal', icon: '◉', sublabel: 'Ön yüz' },
  { id: 'right_45', label: '45° Sağ', icon: '◑', sublabel: 'Sağ profil' },
];

export default function PhotoAngleSelector() {
  const { activeAngle, setActiveAngle } = useAnalysisStore();

  return (
    <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
      {angles.map((angle) => {
        const isActive = activeAngle === angle.id;
        return (
          <button
            key={angle.id}
            onClick={() => setActiveAngle(angle.id)}
            className={`relative flex flex-1 flex-col items-center gap-0.5 rounded-lg px-3 py-2 text-center transition-all duration-200 ${
              isActive
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <span className="text-lg leading-none">{angle.icon}</span>
            <span className="text-[11px] font-semibold">{angle.label}</span>
            <span className={`text-[9px] ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
              {angle.sublabel}
            </span>
            {isActive && (
              <span className="absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-blue-400" />
            )}
          </button>
        );
      })}
    </div>
  );
}
