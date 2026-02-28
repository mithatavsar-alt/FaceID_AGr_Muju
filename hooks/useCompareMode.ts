'use client';

import { useCallback } from 'react';
import { useAnalysisStore } from '@/store/useAnalysisStore';
import { useCompareStore } from '@/store/useCompareStore';

export function useCompareMode() {
  const { regions } = useAnalysisStore();
  const {
    compareMode,
    leftRegion,
    rightRegion,
    comparisonResult,
    toggleCompareMode,
    setCompareRegions,
    clearCompare,
  } = useCompareStore();

  const selectHomologPair = useCallback(
    (regionId: string) => {
      const region = regions.find((r) => r.id === regionId);
      if (!region || !region.homolog_id) return;

      const homolog = regions.find((r) => r.id === region.homolog_id);
      if (!homolog) return;

      // Sol tarafı left, sağ tarafı right olarak ata
      const isLeft = region.id.startsWith('left_');
      if (isLeft) {
        setCompareRegions(region, homolog);
      } else {
        setCompareRegions(homolog, region);
      }
    },
    [regions, setCompareRegions],
  );

  const homologPairs = regions
    .filter((r) => r.homolog_id && r.id.startsWith('left_'))
    .map((left) => {
      const right = regions.find((r) => r.id === left.homolog_id);
      return right ? { left, right } : null;
    })
    .filter(Boolean) as { left: typeof regions[0]; right: typeof regions[0] }[];

  return {
    compareMode,
    leftRegion,
    rightRegion,
    comparisonResult,
    homologPairs,
    toggleCompareMode,
    selectHomologPair,
    clearCompare,
  };
}
