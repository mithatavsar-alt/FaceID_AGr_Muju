// SVG path verileri - stilize yüz şeması için
// Her bölge 200x260 viewBox içinde normalize edilmiştir

export interface FaceSchemaPath {
  id: string;
  path: string;
  label: string;
}

export const faceSchemaData: FaceSchemaPath[] = [
  // Göz altı
  { id: 'left_undereye', path: 'M56,104 L72,100 L82,104 L84,112 L78,118 L62,118 L54,112 Z', label: 'Göz Altı' },
  { id: 'right_undereye', path: 'M118,104 L128,100 L144,104 L146,112 L138,118 L122,118 L118,112 Z', label: 'Göz Altı' },
  // Elmacık
  { id: 'left_cheek', path: 'M38,114 L56,108 L68,120 L64,136 L50,142 L36,132 Z', label: 'Elmacık' },
  { id: 'right_cheek', path: 'M132,120 L144,108 L162,114 L164,132 L150,142 L136,136 Z', label: 'Elmacık' },
  // Nazolabial
  { id: 'left_nasolabial', path: 'M68,134 L78,128 L86,136 L84,156 L76,164 L66,154 Z', label: 'Nazolabial' },
  { id: 'right_nasolabial', path: 'M114,136 L122,128 L132,134 L134,154 L124,164 L116,156 Z', label: 'Nazolabial' },
  // Çene hattı
  { id: 'left_jawline', path: 'M36,150 L54,146 L64,166 L66,186 L58,198 L46,194 L34,174 Z', label: 'Çene Hattı' },
  { id: 'right_jawline', path: 'M136,166 L146,146 L164,150 L166,174 L154,194 L142,198 L134,186 Z', label: 'Çene Hattı' },
  // Şakak
  { id: 'left_temple', path: 'M34,74 L50,68 L58,78 L56,94 L46,100 L32,92 Z', label: 'Şakak' },
  { id: 'right_temple', path: 'M142,78 L150,68 L166,74 L168,92 L154,100 L144,94 Z', label: 'Şakak' },
  // Kaş
  { id: 'left_brow', path: 'M52,80 L64,76 L80,78 L86,84 L80,92 L64,92 L52,88 Z', label: 'Kaş' },
  { id: 'right_brow', path: 'M114,84 L120,78 L136,76 L148,80 L148,88 L136,92 L120,92 Z', label: 'Kaş' },
  // Alın
  { id: 'forehead', path: 'M58,50 L74,44 L100,42 L126,44 L142,50 L144,68 L130,76 L100,78 L70,76 L56,68 Z', label: 'Alın' },
  // Burun
  { id: 'nose', path: 'M92,102 L100,98 L108,102 L110,122 L106,134 L100,138 L94,134 L90,122 Z', label: 'Burun' },
  // Çene
  { id: 'chin', path: 'M74,182 L86,176 L100,174 L114,176 L126,182 L124,198 L114,208 L100,212 L86,208 L76,198 Z', label: 'Çene' },
];
