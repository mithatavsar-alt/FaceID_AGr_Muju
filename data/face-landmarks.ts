import { Point } from '@/types';

// Polygon koordinatları 500x650 canvas + object-contain gösterimine göre
// Fotoğraf: 900x1600 → Gösterim: 366x650, yatay offset: ~67px
// Mapping: display_x = 67 + (photo_x / 900) * 366
//          display_y = (photo_y / 1600) * 650

export interface FaceRegionPolygon {
  id: string;
  name_tr: string;
  name_en: string;
  polygon: Point[];
  centroid: Point;
  homolog_id: string | null;
  group: string;
}

export const faceRegions: FaceRegionPolygon[] = [
  // === PERIORBITAL (Göz Altı) ===
  {
    id: 'left_undereye',
    name_tr: 'Sol Göz Altı',
    name_en: 'Left Under-Eye',
    polygon: [
      { x: 168, y: 228 }, { x: 192, y: 218 }, { x: 216, y: 225 },
      { x: 220, y: 242 }, { x: 208, y: 262 }, { x: 182, y: 264 },
      { x: 165, y: 248 },
    ],
    centroid: { x: 193, y: 241 },
    homolog_id: 'right_undereye',
    group: 'Periorbital',
  },
  {
    id: 'right_undereye',
    name_tr: 'Sağ Göz Altı',
    name_en: 'Right Under-Eye',
    polygon: [
      { x: 280, y: 225 }, { x: 306, y: 218 }, { x: 332, y: 228 },
      { x: 335, y: 248 }, { x: 318, y: 264 }, { x: 292, y: 262 },
      { x: 280, y: 242 },
    ],
    centroid: { x: 306, y: 241 },
    homolog_id: 'left_undereye',
    group: 'Periorbital',
  },

  // === MIDFACE (Elmacık) ===
  {
    id: 'left_cheek',
    name_tr: 'Sol Elmacık',
    name_en: 'Left Cheekbone',
    polygon: [
      { x: 128, y: 258 }, { x: 162, y: 245 }, { x: 185, y: 270 },
      { x: 178, y: 310 }, { x: 148, y: 325 }, { x: 125, y: 300 },
    ],
    centroid: { x: 154, y: 285 },
    homolog_id: 'right_cheek',
    group: 'Midface',
  },
  {
    id: 'right_cheek',
    name_tr: 'Sağ Elmacık',
    name_en: 'Right Cheekbone',
    polygon: [
      { x: 315, y: 270 }, { x: 338, y: 245 }, { x: 372, y: 258 },
      { x: 375, y: 300 }, { x: 352, y: 325 }, { x: 322, y: 310 },
    ],
    centroid: { x: 346, y: 285 },
    homolog_id: 'left_cheek',
    group: 'Midface',
  },

  // === PERIORAL (Nazolabial) ===
  {
    id: 'left_nasolabial',
    name_tr: 'Sol Nazolabial',
    name_en: 'Left Nasolabial',
    polygon: [
      { x: 178, y: 310 }, { x: 205, y: 298 }, { x: 225, y: 315 },
      { x: 220, y: 365 }, { x: 202, y: 385 }, { x: 175, y: 358 },
    ],
    centroid: { x: 201, y: 338 },
    homolog_id: 'right_nasolabial',
    group: 'Perioral',
  },
  {
    id: 'right_nasolabial',
    name_tr: 'Sağ Nazolabial',
    name_en: 'Right Nasolabial',
    polygon: [
      { x: 275, y: 315 }, { x: 295, y: 298 }, { x: 322, y: 310 },
      { x: 325, y: 358 }, { x: 298, y: 385 }, { x: 280, y: 365 },
    ],
    centroid: { x: 299, y: 338 },
    homolog_id: 'left_nasolabial',
    group: 'Perioral',
  },

  // === LOWER FACE (Jawline) ===
  {
    id: 'left_jawline',
    name_tr: 'Sol Çene Hattı',
    name_en: 'Left Jawline',
    polygon: [
      { x: 125, y: 340 }, { x: 155, y: 330 }, { x: 178, y: 385 },
      { x: 180, y: 430 }, { x: 165, y: 460 }, { x: 140, y: 450 },
      { x: 120, y: 400 },
    ],
    centroid: { x: 152, y: 399 },
    homolog_id: 'right_jawline',
    group: 'Lower Face',
  },
  {
    id: 'right_jawline',
    name_tr: 'Sağ Çene Hattı',
    name_en: 'Right Jawline',
    polygon: [
      { x: 322, y: 385 }, { x: 345, y: 330 }, { x: 375, y: 340 },
      { x: 380, y: 400 }, { x: 360, y: 450 }, { x: 335, y: 460 },
      { x: 320, y: 430 },
    ],
    centroid: { x: 348, y: 399 },
    homolog_id: 'left_jawline',
    group: 'Lower Face',
  },

  // === TEMPORAL (Şakak) ===
  {
    id: 'left_temple',
    name_tr: 'Sol Şakak',
    name_en: 'Left Temple',
    polygon: [
      { x: 118, y: 162 }, { x: 148, y: 148 }, { x: 168, y: 172 },
      { x: 164, y: 210 }, { x: 140, y: 224 }, { x: 115, y: 205 },
    ],
    centroid: { x: 142, y: 187 },
    homolog_id: 'right_temple',
    group: 'Temporal',
  },
  {
    id: 'right_temple',
    name_tr: 'Sağ Şakak',
    name_en: 'Right Temple',
    polygon: [
      { x: 332, y: 172 }, { x: 352, y: 148 }, { x: 382, y: 162 },
      { x: 385, y: 205 }, { x: 360, y: 224 }, { x: 336, y: 210 },
    ],
    centroid: { x: 358, y: 187 },
    homolog_id: 'left_temple',
    group: 'Temporal',
  },

  // === BROW (Kaş) ===
  {
    id: 'left_brow',
    name_tr: 'Sol Kaş',
    name_en: 'Left Brow',
    polygon: [
      { x: 155, y: 182 }, { x: 178, y: 172 }, { x: 210, y: 178 },
      { x: 224, y: 190 }, { x: 215, y: 208 }, { x: 180, y: 208 },
      { x: 155, y: 198 },
    ],
    centroid: { x: 188, y: 191 },
    homolog_id: 'right_brow',
    group: 'Brow',
  },
  {
    id: 'right_brow',
    name_tr: 'Sağ Kaş',
    name_en: 'Right Brow',
    polygon: [
      { x: 276, y: 190 }, { x: 290, y: 178 }, { x: 322, y: 172 },
      { x: 345, y: 182 }, { x: 345, y: 198 }, { x: 320, y: 208 },
      { x: 285, y: 208 },
    ],
    centroid: { x: 312, y: 191 },
    homolog_id: 'left_brow',
    group: 'Brow',
  },

  // === TEK BÖLGELER ===
  {
    id: 'forehead',
    name_tr: 'Alın',
    name_en: 'Forehead',
    polygon: [
      { x: 162, y: 88 }, { x: 198, y: 72 }, { x: 250, y: 65 },
      { x: 302, y: 72 }, { x: 338, y: 88 }, { x: 342, y: 148 },
      { x: 312, y: 172 }, { x: 250, y: 178 }, { x: 188, y: 172 },
      { x: 158, y: 148 },
    ],
    centroid: { x: 250, y: 125 },
    homolog_id: null,
    group: 'Upper Face',
  },
  {
    id: 'nose',
    name_tr: 'Burun',
    name_en: 'Nose',
    polygon: [
      { x: 236, y: 228 }, { x: 250, y: 220 }, { x: 264, y: 228 },
      { x: 268, y: 286 }, { x: 262, y: 320 }, { x: 250, y: 328 },
      { x: 238, y: 320 }, { x: 232, y: 286 },
    ],
    centroid: { x: 250, y: 277 },
    homolog_id: null,
    group: 'Central',
  },
  {
    id: 'lips',
    name_tr: 'Dudak',
    name_en: 'Lips',
    polygon: [
      { x: 205, y: 390 }, { x: 220, y: 382 }, { x: 240, y: 378 },
      { x: 250, y: 376 }, { x: 260, y: 378 }, { x: 280, y: 382 },
      { x: 295, y: 390 }, { x: 290, y: 412 }, { x: 275, y: 425 },
      { x: 250, y: 428 }, { x: 225, y: 425 }, { x: 210, y: 412 },
    ],
    centroid: { x: 250, y: 405 },
    homolog_id: null,
    group: 'Perioral',
  },
  {
    id: 'chin',
    name_tr: 'Çene',
    name_en: 'Chin',
    polygon: [
      { x: 215, y: 438 }, { x: 230, y: 432 }, { x: 250, y: 430 },
      { x: 270, y: 432 }, { x: 285, y: 438 }, { x: 288, y: 475 },
      { x: 275, y: 500 }, { x: 250, y: 508 }, { x: 225, y: 500 },
      { x: 212, y: 475 },
    ],
    centroid: { x: 250, y: 470 },
    homolog_id: null,
    group: 'Lower Face',
  },
];

// Yüz dış sınır poligonu (hasta yüz şekline göre - object-contain konumunda)
export const faceBoundary: Point[] = [
  { x: 112, y: 120 }, { x: 135, y: 82 }, { x: 175, y: 55 },
  { x: 215, y: 48 }, { x: 250, y: 45 }, { x: 285, y: 48 },
  { x: 325, y: 55 }, { x: 365, y: 82 }, { x: 388, y: 120 },
  { x: 392, y: 185 }, { x: 390, y: 260 }, { x: 385, y: 335 },
  { x: 375, y: 400 }, { x: 355, y: 480 }, { x: 320, y: 545 },
  { x: 250, y: 570 }, { x: 180, y: 545 }, { x: 145, y: 480 },
  { x: 115, y: 400 }, { x: 110, y: 335 }, { x: 108, y: 260 },
  { x: 108, y: 185 },
];
