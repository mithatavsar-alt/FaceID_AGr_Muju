'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { useAnalysisStore, PhotoAngle, MIN_ZOOM, MAX_ZOOM, ZOOM_STEP } from '@/store/useAnalysisStore';
import { useDragAnalyze } from '@/hooks/useDragAnalyze';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from '@/lib/constants';
import RegionOverlay from './RegionOverlay';
import Marker from './Marker';

const photoMap: Record<PhotoAngle, { src: string; alt: string }> = {
  frontal: { src: '/patient/front.jpg', alt: 'Hasta Frontal Görünüm' },
  left_45: { src: '/patient/left45.jpg', alt: 'Hasta 45° Sol Profil' },
  right_45: { src: '/patient/right45.jpg', alt: 'Hasta 45° Sağ Profil' },
};

const angleLabels: Record<PhotoAngle, string> = {
  frontal: 'Frontal Görünüm',
  left_45: '45° Sol Profil',
  right_45: '45° Sağ Profil',
};

export default function PhotoCanvas() {
  const {
    regions,
    selectedRegion,
    hoveredRegion,
    markerPosition,
    activeAngle,
    customImage,
    zoomLevel,
    panOffset,
    setPanOffset,
    setZoomLevel,
  } = useAnalysisStore();

  const {
    isDragging,
    glowRegionId,
    shakeMarker,
    containerRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useDragAnalyze();

  // Pan state
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isPanning && panStartRef.current) {
        const dx = e.clientX - panStartRef.current.x;
        const dy = e.clientY - panStartRef.current.y;
        setPanOffset({
          x: panStartRef.current.ox + dx,
          y: panStartRef.current.oy + dy,
        });
        return;
      }
      handlePointerMove(e.clientX, e.clientY);
    },
    [handlePointerMove, isPanning, setPanOffset],
  );

  const onMouseUp = useCallback(
    (e: React.MouseEvent) => {
      if (isPanning) {
        setIsPanning(false);
        panStartRef.current = null;
        return;
      }
      handlePointerUp(e.clientX, e.clientY);
    },
    [handlePointerUp, isPanning],
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      // Middle mouse button or Alt+click to pan
      if (e.button === 1 || e.altKey) {
        e.preventDefault();
        setIsPanning(true);
        panStartRef.current = {
          x: e.clientX,
          y: e.clientY,
          ox: panOffset.x,
          oy: panOffset.y,
        };
        return;
      }
      handlePointerDown();
    },
    [handlePointerDown, panOffset],
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      handlePointerMove(touch.clientX, touch.clientY);
    },
    [handlePointerMove],
  );
  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.changedTouches[0];
      handlePointerUp(touch.clientX, touch.clientY);
    },
    [handlePointerUp],
  );

  // Mouse wheel zoom
  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoomLevel + delta));
      setZoomLevel(newZoom);
    },
    [zoomLevel, setZoomLevel],
  );

  const isFrontal = activeAngle === 'frontal';
  const photo = photoMap[activeAngle];
  const hasCustomImage = !!customImage;
  const isZoomed = zoomLevel !== 1;

  const getCursor = () => {
    if (isPanning) return 'grabbing';
    if (isZoomed && !isDragging) return 'grab';
    if (isFrontal) return isDragging ? 'grabbing' : 'crosshair';
    return 'default';
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-xl border border-slate-200 bg-neutral-800 shadow-sm"
      style={{
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        cursor: getCursor(),
        touchAction: 'none',
      }}
      onMouseDown={isFrontal ? onMouseDown : undefined}
      onMouseMove={isFrontal ? onMouseMove : undefined}
      onMouseUp={isFrontal ? onMouseUp : undefined}
      onMouseLeave={isFrontal ? onMouseUp : undefined}
      onTouchStart={isFrontal ? handlePointerDown : undefined}
      onTouchMove={isFrontal ? onTouchMove : undefined}
      onTouchEnd={isFrontal ? onTouchEnd : undefined}
      onWheel={onWheel}
    >
      {/* Transformable image layer */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
          transformOrigin: 'center center',
          transition: isPanning ? 'none' : 'transform 0.15s ease-out',
        }}
      >
        {/* Hasta fotoğrafı */}
        {hasCustomImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={customImage}
            alt="Yüklenen fotoğraf"
            className="pointer-events-none h-full w-full object-contain"
            draggable={false}
          />
        ) : (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="pointer-events-none object-contain"
            priority
            sizes={`${CANVAS_WIDTH}px`}
          />
        )}
      </div>

      {/* Fotoğraf çerçevesi göstergesi */}
      <div className="absolute left-3 top-3 z-30 flex items-center gap-1.5 rounded-md bg-black/40 px-2 py-1 backdrop-blur-sm">
        <div className={`h-1.5 w-1.5 rounded-full ${hasCustomImage ? 'bg-purple-400' : isFrontal ? 'bg-green-400' : 'bg-blue-400'}`} />
        <span className="text-[10px] font-medium text-white/90">
          {hasCustomImage ? 'Yüklenen Fotoğraf' : angleLabels[activeAngle]}
        </span>
      </div>

      {/* Zoom indicator badge */}
      {isZoomed && (
        <div className="absolute right-3 top-3 z-30 rounded-md bg-black/40 px-2 py-1 backdrop-blur-sm">
          <span className="text-[10px] font-medium text-white/90">
            {Math.round(zoomLevel * 100)}%
          </span>
        </div>
      )}

      {/* Bölge overlay'leri - sadece frontal görünümde interaktif */}
      {isFrontal && (
        <RegionOverlay
          regions={regions}
          selectedRegionId={selectedRegion?.id ?? null}
          hoveredRegionId={hoveredRegion?.id ?? null}
          glowRegionId={glowRegionId}
          canvasWidth={CANVAS_WIDTH}
          canvasHeight={CANVAS_HEIGHT}
        />
      )}

      {/* Marker - sadece frontal */}
      {isFrontal && markerPosition && (
        <Marker
          position={markerPosition}
          isDragging={isDragging}
          shake={shakeMarker}
        />
      )}

      {/* Talimat */}
      {isFrontal && !markerPosition && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="rounded-lg bg-black/50 px-4 py-2 text-center text-sm text-white shadow-lg backdrop-blur-sm">
            <p className="font-medium">Analiz etmek için tıklayın veya sürükleyin</p>
            <p className="mt-0.5 text-xs text-white/70">
              Bir bölgeye dokunduğunuzda detaylar sağ panelde görünecektir
            </p>
            <p className="mt-1 text-[10px] text-white/50">
              Scroll ile zoom • Alt+sürükle ile kaydırma
            </p>
          </div>
        </div>
      )}

      {/* Profil görünümlerde bilgi notu */}
      {!isFrontal && (
        <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
          <div className="rounded-lg bg-black/50 px-4 py-2 text-center text-xs text-white shadow-lg backdrop-blur-sm">
            <p className="font-medium">Referans Görünüm</p>
            <p className="mt-0.5 text-[10px] text-white/70">
              Bölge analizi frontal görünümde yapılır
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

