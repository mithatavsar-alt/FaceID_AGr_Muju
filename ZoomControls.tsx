'use client';

import { useAnalysisStore, MIN_ZOOM, MAX_ZOOM } from '@/store/useAnalysisStore';

export default function ZoomControls() {
    const { zoomLevel, zoomIn, zoomOut, resetZoom } = useAnalysisStore();

    const zoomPercent = Math.round(zoomLevel * 100);
    const isMinZoom = zoomLevel <= MIN_ZOOM;
    const isMaxZoom = zoomLevel >= MAX_ZOOM;

    return (
        <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
            {/* Zoom Out */}
            <button
                onClick={zoomOut}
                disabled={isMinZoom}
                className="flex h-7 w-7 items-center justify-center rounded-md text-slate-600 transition-all duration-150 hover:bg-slate-100 active:scale-90 disabled:cursor-not-allowed disabled:opacity-30"
                title="Uzaklaştır"
                id="zoom-out-button"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
            </button>

            {/* Zoom indicator */}
            <button
                onClick={resetZoom}
                className="flex h-7 min-w-[52px] items-center justify-center rounded-md px-1.5 text-[11px] font-semibold text-slate-700 transition-all duration-150 hover:bg-slate-50 active:scale-95"
                title="Sıfırla (100%)"
                id="zoom-reset-button"
            >
                {zoomPercent}%
            </button>

            {/* Zoom In */}
            <button
                onClick={zoomIn}
                disabled={isMaxZoom}
                className="flex h-7 w-7 items-center justify-center rounded-md text-slate-600 transition-all duration-150 hover:bg-slate-100 active:scale-90 disabled:cursor-not-allowed disabled:opacity-30"
                title="Yakınlaştır"
                id="zoom-in-button"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
            </button>
        </div>
    );
}
