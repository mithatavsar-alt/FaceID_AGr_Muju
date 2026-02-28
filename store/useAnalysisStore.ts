'use client';

import { create } from 'zustand';
import { AnatomicalRegion, Point, QualityAssessment } from '@/types';
import { mockRegions } from '@/data/mock-regions';
import { mockQualityAssessment } from '@/data/mock-analysis';

export type PhotoAngle = 'frontal' | 'left_45' | 'right_45';

export const MIN_ZOOM = 0.5;
export const MAX_ZOOM = 3.0;
export const ZOOM_STEP = 0.25;

interface AnalysisState {
  regions: AnatomicalRegion[];
  selectedRegion: AnatomicalRegion | null;
  hoveredRegion: AnatomicalRegion | null;
  markerPosition: Point | null;
  qualityAssessment: QualityAssessment;
  showToast: { message: string; type: 'error' | 'success' | 'info' } | null;
  activeAngle: PhotoAngle;

  // Custom image & zoom
  customImage: string | null;
  zoomLevel: number;
  panOffset: Point;

  setSelectedRegion: (region: AnatomicalRegion | null) => void;
  setHoveredRegion: (region: AnatomicalRegion | null) => void;
  setMarkerPosition: (position: Point | null) => void;
  showToastMessage: (message: string, type: 'error' | 'success' | 'info') => void;
  clearToast: () => void;
  setActiveAngle: (angle: PhotoAngle) => void;
  setCustomImage: (dataUrl: string | null) => void;
  setZoomLevel: (level: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  setPanOffset: (offset: Point) => void;
}

export const useAnalysisStore = create<AnalysisState>((set, get) => ({
  regions: mockRegions,
  selectedRegion: null,
  hoveredRegion: null,
  markerPosition: null,
  qualityAssessment: mockQualityAssessment,
  showToast: null,
  activeAngle: 'frontal',

  customImage: null,
  zoomLevel: 1,
  panOffset: { x: 0, y: 0 },

  setSelectedRegion: (region) => set({ selectedRegion: region }),
  setHoveredRegion: (region) => set({ hoveredRegion: region }),
  setMarkerPosition: (position) => set({ markerPosition: position }),
  showToastMessage: (message, type) => {
    set({ showToast: { message, type } });
    setTimeout(() => set({ showToast: null }), 3000);
  },
  clearToast: () => set({ showToast: null }),
  setActiveAngle: (angle) =>
    set({
      activeAngle: angle,
      selectedRegion: null,
      hoveredRegion: null,
      markerPosition: null,
    }),
  setCustomImage: (dataUrl) =>
    set({
      customImage: dataUrl,
      zoomLevel: 1,
      panOffset: { x: 0, y: 0 },
      selectedRegion: null,
      hoveredRegion: null,
      markerPosition: null,
    }),
  setZoomLevel: (level) =>
    set({ zoomLevel: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, level)) }),
  zoomIn: () => {
    const { zoomLevel } = get();
    set({ zoomLevel: Math.min(MAX_ZOOM, zoomLevel + ZOOM_STEP) });
  },
  zoomOut: () => {
    const { zoomLevel } = get();
    set({ zoomLevel: Math.max(MIN_ZOOM, zoomLevel - ZOOM_STEP) });
  },
  resetZoom: () => set({ zoomLevel: 1, panOffset: { x: 0, y: 0 } }),
  setPanOffset: (offset) => set({ panOffset: offset }),
}));
