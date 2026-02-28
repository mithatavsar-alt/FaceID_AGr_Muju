'use client';

import { useCompareStore } from '@/store/useCompareStore';
import { useNotesStore } from '@/store/useNotesStore';
import { useAnalysisStore } from '@/store/useAnalysisStore';

export default function Toolbar() {
  const { compareMode, toggleCompareMode } = useCompareStore();
  const { showNotesPanel, toggleNotesPanel } = useNotesStore();
  const { selectedRegion } = useAnalysisStore();

  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
      {/* Karşılaştırma Modu */}
      <button
        onClick={toggleCompareMode}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
          compareMode
            ? 'bg-blue-500 text-white shadow-sm'
            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
          <path
            d="M3 2h3v10H3V2zm5 0h3v10H8V2z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
        Karşılaştır
      </button>

      {/* Not Paneli */}
      <button
        onClick={toggleNotesPanel}
        disabled={!selectedRegion}
        className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
          showNotesPanel
            ? 'bg-blue-500 text-white shadow-sm'
            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
        } disabled:cursor-not-allowed disabled:opacity-40`}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
          <path
            d="M2 3h10M2 6h7M2 9h5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
        Notlar
      </button>

      {/* Ayırıcı */}
      <div className="mx-1 h-5 w-px bg-slate-200" />

      {/* Medikal uyarı kısayol */}
      <div className="flex items-center gap-1 text-[10px] text-slate-400">
        <span>⚕️</span>
        <span>Klinik karar destek aracı</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Logo */}
      <div className="flex items-center gap-1.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-indigo-600">
          <span className="text-[10px] font-bold text-white">AG</span>
        </div>
        <span className="text-xs font-semibold text-slate-500">Antigravity</span>
      </div>
    </div>
  );
}
