'use client';

import PhotoCanvas from '@/components/canvas/PhotoCanvas';
import PhotoAngleSelector from '@/components/canvas/PhotoAngleSelector';
import PhotoUpload from '@/components/canvas/PhotoUpload';
import ZoomControls from '@/components/canvas/ZoomControls';
import FaceSchema from '@/components/face-schema/FaceSchema';
import RightPanel from '@/components/panels/RightPanel';
import Toolbar from '@/components/toolbar/Toolbar';
import Toast from '@/components/ui/Toast';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
              <span className="text-sm font-bold text-white">AG</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-slate-800">
                Antigravity Dynamic Face AI
              </h1>
              <p className="text-[10px] text-slate-400">
                Premium Klinik Karar Destek Platformu
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>Dr. Demo Kullanıcı</span>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">
              V2
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sol: Canvas + Face Schema */}
          <div className="flex flex-col gap-4">
            {/* Upload + Angle Selector row */}
            <div className="flex items-center gap-3">
              <PhotoUpload />
              <div className="flex-1">
                <PhotoAngleSelector />
              </div>
            </div>
            <PhotoCanvas />
            {/* Zoom Controls */}
            <div className="flex items-center justify-between">
              <ZoomControls />
              <div className="text-[10px] text-slate-400">
                Scroll ile zoom • Alt+sürükle ile kaydırma
              </div>
            </div>
            <FaceSchema />
          </div>

          {/* Sağ: Panel */}
          <div className="min-w-0 flex-1 lg:max-w-sm">
            <RightPanel />
          </div>
        </div>

        {/* Toolbar */}
        <div className="mt-6">
          <Toolbar />
        </div>
      </main>

      {/* Toast */}
      <Toast />
    </div>
  );
}

