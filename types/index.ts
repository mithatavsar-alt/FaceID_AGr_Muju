export interface Point {
  x: number;
  y: number;
}

export interface DoseRange {
  conservative: { min: number; max: number; unit: string };
  standard: { min: number; max: number; unit: string };
  advanced: { min: number; max: number; unit: string };
}

export interface AnatomicalRegion {
  id: string;
  name_tr: string;
  name_en: string;
  polygon: Point[];
  centroid: Point;
  homolog_id: string | null;
  score: number;
  priority: 'low' | 'medium' | 'high';
  confidence: number;
  condition: string;
  decision_support_note: string;
  dose_range: DoseRange;
}

export interface DragAnalyzeEvent {
  dropPoint: Point;
  matchedRegion: AnatomicalRegion | null;
  snapDistance: number;
  isInsidePolygon: boolean;
  isOutsideFace: boolean;
}

export type QualityFlag =
  | 'low_light'
  | 'shadow_left'
  | 'shadow_right'
  | 'high_yaw'
  | 'high_pitch'
  | 'blur_detected'
  | 'occlusion'
  | 'resolution_low';

export interface QualityAssessment {
  quality_score: number;
  confidence: number;
  flags: QualityFlag[];
  pose: {
    yaw: number;
    pitch: number;
    roll: number;
  };
  status: 'reliable' | 'caution' | 'retake';
}

export interface DoctorNote {
  id: string;
  region_id: string;
  patient_id: string;
  session_id: string;
  type: 'template' | 'freetext';
  content: string;
  created_at: string;
  include_in_pdf: boolean;
  created_by: string;
}

export interface ComparisonResult {
  left_region: AnatomicalRegion;
  right_region: AnatomicalRegion;
  delta_score: number;
  delta_confidence: number;
  asymmetry_level: 'minimal' | 'notable' | 'attention';
}

export type DoseTier = 'conservative' | 'standard' | 'advanced';
