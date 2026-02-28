'use client';

import { useCallback, useRef, useState } from 'react';
import { Point } from '@/types';
import { useAnalysisStore } from '@/store/useAnalysisStore';
import { useCompareStore } from '@/store/useCompareStore';
import { snapToRegion } from '@/lib/snap-engine';
import { findHoveredRegion } from '@/lib/snap-engine';

export function useDragAnalyze() {
  const {
    regions,
    setSelectedRegion,
    setHoveredRegion,
    setMarkerPosition,
    showToastMessage,
  } = useAnalysisStore();

  const { compareMode, setCompareRegions, leftRegion } = useCompareStore();

  const [isDragging, setIsDragging] = useState(false);
  const [glowRegionId, setGlowRegionId] = useState<string | null>(null);
  const [shakeMarker, setShakeMarker] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getCanvasPoint = useCallback(
    (clientX: number, clientY: number): Point | null => {
      if (!containerRef.current) return null;
      const rect = containerRef.current.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    },
    [],
  );

  const handlePointerDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handlePointerMove = useCallback(
    (clientX: number, clientY: number) => {
      const point = getCanvasPoint(clientX, clientY);
      if (!point) return;

      if (isDragging) {
        setMarkerPosition(point);
      }

      const hovered = findHoveredRegion(point, regions);
      setHoveredRegion(hovered);
    },
    [isDragging, getCanvasPoint, regions, setHoveredRegion, setMarkerPosition],
  );

  const handlePointerUp = useCallback(
    (clientX: number, clientY: number) => {
      setIsDragging(false);

      const point = getCanvasPoint(clientX, clientY);
      if (!point) return;

      const result = snapToRegion(point, regions);

      if (result.isOutsideFace || !result.matchedRegion) {
        setShakeMarker(true);
        setTimeout(() => setShakeMarker(false), 300);
        showToastMessage(
          result.isOutsideFace
            ? 'Yüz dışı alan – lütfen yüz bölgesine sürükleyin'
            : 'Bölge eşleştirilemedi',
          'error',
        );
        return;
      }

      const region = result.matchedRegion;

      // Glow animasyonu tetikle
      setGlowRegionId(region.id);
      setTimeout(() => setGlowRegionId(null), 200);

      // Marker'ı bölge centroid'ine snap et
      setMarkerPosition(region.centroid);

      if (compareMode && leftRegion) {
        // Karşılaştırma modunda ikinci bölge seçimi
        if (region.homolog_id === leftRegion.id) {
          setCompareRegions(leftRegion, region);
        } else {
          showToastMessage('Lütfen homolog bölgeyi seçin (sağ/sol eşleniği)', 'info');
        }
      } else if (compareMode && !leftRegion) {
        // Karşılaştırma modunda ilk bölge
        if (region.homolog_id) {
          setSelectedRegion(region);
          showToastMessage('Şimdi karşı taraftaki bölgeyi seçin', 'info');
          useCompareStore.setState({ leftRegion: region });
        } else {
          showToastMessage('Bu bölgenin sağ/sol eşleniği bulunmuyor', 'info');
        }
      } else {
        setSelectedRegion(region);
      }
    },
    [
      getCanvasPoint,
      regions,
      compareMode,
      leftRegion,
      setSelectedRegion,
      setMarkerPosition,
      setCompareRegions,
      showToastMessage,
    ],
  );

  return {
    isDragging,
    glowRegionId,
    shakeMarker,
    containerRef,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}
