'use client';

import { create } from 'zustand';
import { AnatomicalRegion, ComparisonResult } from '@/types';
import { ASYMMETRY_THRESHOLDS } from '@/lib/constants';

interface CompareState {
  compareMode: boolean;
  leftRegion: AnatomicalRegion | null;
  rightRegion: AnatomicalRegion | null;
  comparisonResult: ComparisonResult | null;

  toggleCompareMode: () => void;
  setCompareRegions: (left: AnatomicalRegion, right: AnatomicalRegion) => void;
  clearCompare: () => void;
}

function calculateComparison(
  left: AnatomicalRegion,
  right: AnatomicalRegion,
): ComparisonResult {
  const delta_score = Math.abs(left.score - right.score);
  const delta_confidence = Math.abs(left.confidence - right.confidence);

  let asymmetry_level: ComparisonResult['asymmetry_level'] = 'minimal';
  if (delta_score > ASYMMETRY_THRESHOLDS.notable) {
    asymmetry_level = 'attention';
  } else if (delta_score > ASYMMETRY_THRESHOLDS.minimal) {
    asymmetry_level = 'notable';
  }

  return {
    left_region: left,
    right_region: right,
    delta_score,
    delta_confidence,
    asymmetry_level,
  };
}

export const useCompareStore = create<CompareState>((set) => ({
  compareMode: false,
  leftRegion: null,
  rightRegion: null,
  comparisonResult: null,

  toggleCompareMode: () =>
    set((state) => ({
      compareMode: !state.compareMode,
      leftRegion: state.compareMode ? null : state.leftRegion,
      rightRegion: state.compareMode ? null : state.rightRegion,
      comparisonResult: state.compareMode ? null : state.comparisonResult,
    })),

  setCompareRegions: (left, right) =>
    set({
      leftRegion: left,
      rightRegion: right,
      comparisonResult: calculateComparison(left, right),
    }),

  clearCompare: () =>
    set({
      leftRegion: null,
      rightRegion: null,
      comparisonResult: null,
    }),
}));
