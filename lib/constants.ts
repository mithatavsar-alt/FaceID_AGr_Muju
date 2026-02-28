export const SNAP_THRESHOLD_PX = 40;
export const FACE_BOUNDARY_MARGIN = 10;
export const HOVER_PREVIEW_DELAY = 150;
export const GLOW_DURATION = 200;

export const CANVAS_WIDTH = 500;
export const CANVAS_HEIGHT = 650;

export const PRIORITY_COLORS = {
  low: '#22C55E',
  medium: '#F59E0B',
  high: '#EF4444',
} as const;

export const ACTIVE_COLOR = '#3B82F6';

export const PRIORITY_LABELS = {
  low: { tr: 'Düşük', en: 'Low' },
  medium: { tr: 'Orta', en: 'Medium' },
  high: { tr: 'Yüksek', en: 'High' },
} as const;

export const ASYMMETRY_THRESHOLDS = {
  minimal: 5,
  notable: 15,
} as const;

export const QUALITY_THRESHOLDS = {
  reliable: 80,
  caution: 60,
} as const;

export const QUALITY_FLAG_LABELS: Record<string, string> = {
  low_light: 'Düşük ışık koşulları',
  shadow_left: 'Sol taraflı gölge',
  shadow_right: 'Sağ taraflı gölge',
  high_yaw: 'Yaw açısı > 15°',
  high_pitch: 'Pitch açısı > 10°',
  blur_detected: 'Bulanıklık tespit edildi',
  occlusion: 'Kısmi kapanma (saç, aksesuar)',
  resolution_low: 'Düşük çözünürlük',
};

export const NOTE_TEMPLATES = [
  'Klinik muayene ile birlikte değerlendir',
  'Takipte tekrar görüntüleme öner',
  'Hasta beklentisi ile birlikte ele al',
  'Alerji/kontrendikasyon kontrolü gerekli',
];
