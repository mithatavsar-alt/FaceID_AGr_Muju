'use client';

import { PhotoAngle } from '@/store/useAnalysisStore';

interface FaceSilhouetteProps {
  angle: PhotoAngle;
  width: number;
  height: number;
}

export default function FaceSilhouette({ angle, width, height }: FaceSilhouetteProps) {
  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      {angle === 'frontal' && <FrontalFace />}
      {angle === 'left_45' && <Left45Face />}
      {angle === 'right_45' && <Right45Face />}
    </svg>
  );
}

function FrontalFace() {
  return (
    <g>
      {/* Yüz oval */}
      <path
        d="M250,72 C330,72 405,150 405,280 C405,420 340,535 250,545 C160,535 95,420 95,280 C95,150 170,72 250,72 Z"
        fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4"
      />
      {/* Saç */}
      <path
        d="M120,180 C120,90 170,45 250,42 C330,45 380,90 380,180 L375,140 C370,80 320,40 250,38 C180,40 130,80 125,140 Z"
        fill="#e2e8f0" opacity="0.4"
      />
      {/* Sol göz */}
      <ellipse cx="190" cy="260" rx="30" ry="15" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      <ellipse cx="190" cy="260" rx="12" ry="12" fill="#94a3b8" opacity="0.15" />
      <circle cx="190" cy="258" r="6" fill="#64748b" opacity="0.3" />
      <circle cx="192" cy="256" r="2" fill="white" opacity="0.5" />
      {/* Sağ göz */}
      <ellipse cx="310" cy="260" rx="30" ry="15" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      <ellipse cx="310" cy="260" rx="12" ry="12" fill="#94a3b8" opacity="0.15" />
      <circle cx="310" cy="258" r="6" fill="#64748b" opacity="0.3" />
      <circle cx="312" cy="256" r="2" fill="white" opacity="0.5" />
      {/* Kaşlar */}
      <path d="M148,220 Q180,200 228,212" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      <path d="M272,212 Q320,200 352,220" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
      {/* Burun */}
      <path d="M250,270 L250,330" fill="none" stroke="#94a3b8" strokeWidth="1" />
      <path d="M235,340 Q240,348 250,352 Q260,348 265,340" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      <path d="M240,338 L235,340" fill="none" stroke="#94a3b8" strokeWidth="0.8" />
      <path d="M260,338 L265,340" fill="none" stroke="#94a3b8" strokeWidth="0.8" />
      {/* Ağız */}
      <path d="M205,400 Q228,390 250,392 Q272,390 295,400" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      <path d="M205,400 Q230,418 250,420 Q270,418 295,400" fill="#f1a3a3" opacity="0.15" stroke="#94a3b8" strokeWidth="0.8" />
      {/* Alt dudak gölge */}
      <path d="M215,425 Q250,432 285,425" fill="none" stroke="#94a3b8" strokeWidth="0.5" opacity="0.5" />
      {/* Kulaklar */}
      <path d="M95,240 Q80,240 78,270 Q80,310 95,310" fill="none" stroke="#94a3b8" strokeWidth="1" />
      <path d="M405,240 Q420,240 422,270 Q420,310 405,310" fill="none" stroke="#94a3b8" strokeWidth="1" />
      {/* Boyun */}
      <path d="M200,535 L200,600 Q250,610 300,600 L300,535" fill="none" stroke="#cbd5e1" strokeWidth="1" opacity="0.5" />
    </g>
  );
}

function Left45Face() {
  return (
    <g>
      {/* Yüz kontur - 45° sola dönük */}
      <path
        d="M300,72 C370,85 420,160 418,280 C416,400 365,520 290,540 C240,548 190,510 165,460 C130,390 120,310 128,240 C138,150 200,72 300,72 Z"
        fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4"
      />
      {/* Saç */}
      <path
        d="M170,190 C175,100 230,50 310,48 C370,52 410,100 415,170 L410,140 C400,80 360,45 300,42 C230,48 185,100 175,160 Z"
        fill="#e2e8f0" opacity="0.4"
      />
      {/* Sol göz (uzak, küçük) */}
      <ellipse cx="210" cy="262" rx="22" ry="13" fill="none" stroke="#94a3b8" strokeWidth="1" />
      <ellipse cx="210" cy="262" rx="9" ry="9" fill="#94a3b8" opacity="0.15" />
      <circle cx="212" cy="260" r="5" fill="#64748b" opacity="0.3" />
      <circle cx="214" cy="258" r="1.5" fill="white" opacity="0.5" />
      {/* Sağ göz (yakın, büyük) */}
      <ellipse cx="330" cy="258" rx="32" ry="16" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      <ellipse cx="330" cy="258" rx="13" ry="13" fill="#94a3b8" opacity="0.15" />
      <circle cx="328" cy="256" r="7" fill="#64748b" opacity="0.3" />
      <circle cx="330" cy="254" r="2" fill="white" opacity="0.5" />
      {/* Kaşlar */}
      <path d="M178,225 Q200,210 235,218" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M298,215 Q340,202 375,218" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
      {/* Burun - 45° profil */}
      <path d="M265,275 L255,330" fill="none" stroke="#94a3b8" strokeWidth="1" />
      <path d="M240,345 Q248,352 258,354" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      <path d="M258,354 Q265,348 270,340" fill="none" stroke="#94a3b8" strokeWidth="1" />
      {/* Burun köprüsü - profil çıkıntı */}
      <path d="M268,240 Q262,260 265,275" fill="none" stroke="#94a3b8" strokeWidth="1" />
      {/* Ağız */}
      <path d="M220,398 Q248,388 268,390 Q300,392 325,402" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      <path d="M220,398 Q250,416 268,418 Q295,416 325,402" fill="#f1a3a3" opacity="0.12" stroke="#94a3b8" strokeWidth="0.8" />
      {/* Sağ kulak (görünür) */}
      <path d="M415,238 Q435,240 438,275 Q435,315 415,318" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      <path d="M418,255 Q428,260 428,275 Q428,290 418,298" fill="none" stroke="#94a3b8" strokeWidth="0.6" />
      {/* Çene hattı */}
      <path d="M165,460 Q200,510 270,530" fill="none" stroke="#94a3b8" strokeWidth="0.8" opacity="0.4" />
      {/* Boyun */}
      <path d="M220,535 L215,600 Q270,612 325,600 L320,530" fill="none" stroke="#cbd5e1" strokeWidth="1" opacity="0.5" />
      {/* Açı göstergesi */}
      <text x="250" y="590" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="500">45° Sol</text>
    </g>
  );
}

function Right45Face() {
  return (
    <g>
      {/* Yüz kontur - 45° sağa dönük (sol taraf görünür) */}
      <path
        d="M200,72 C130,85 80,160 82,280 C84,400 135,520 210,540 C260,548 310,510 335,460 C370,390 380,310 372,240 C362,150 300,72 200,72 Z"
        fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4"
      />
      {/* Saç */}
      <path
        d="M330,190 C325,100 270,50 190,48 C130,52 90,100 85,170 L90,140 C100,80 140,45 200,42 C270,48 315,100 325,160 Z"
        fill="#e2e8f0" opacity="0.4"
      />
      {/* Sol göz (yakın, büyük) */}
      <ellipse cx="170" cy="258" rx="32" ry="16" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      <ellipse cx="170" cy="258" rx="13" ry="13" fill="#94a3b8" opacity="0.15" />
      <circle cx="172" cy="256" r="7" fill="#64748b" opacity="0.3" />
      <circle cx="170" cy="254" r="2" fill="white" opacity="0.5" />
      {/* Sağ göz (uzak, küçük) */}
      <ellipse cx="290" cy="262" rx="22" ry="13" fill="none" stroke="#94a3b8" strokeWidth="1" />
      <ellipse cx="290" cy="262" rx="9" ry="9" fill="#94a3b8" opacity="0.15" />
      <circle cx="288" cy="260" r="5" fill="#64748b" opacity="0.3" />
      <circle cx="286" cy="258" r="1.5" fill="white" opacity="0.5" />
      {/* Kaşlar */}
      <path d="M125,218 Q160,202 202,215" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M265,218 Q300,210 322,225" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
      {/* Burun - 45° profil (sağa) */}
      <path d="M235,275 L245,330" fill="none" stroke="#94a3b8" strokeWidth="1" />
      <path d="M230,340 Q238,348 245,354" fill="none" stroke="#94a3b8" strokeWidth="1" />
      <path d="M245,354 Q252,352 260,345" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      {/* Burun köprüsü */}
      <path d="M232,240 Q238,260 235,275" fill="none" stroke="#94a3b8" strokeWidth="1" />
      {/* Ağız */}
      <path d="M175,402 Q200,392 232,390 Q252,388 280,398" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      <path d="M175,402 Q205,416 232,418 Q250,416 280,398" fill="#f1a3a3" opacity="0.12" stroke="#94a3b8" strokeWidth="0.8" />
      {/* Sol kulak (görünür) */}
      <path d="M85,238 Q65,240 62,275 Q65,315 85,318" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      <path d="M82,255 Q72,260 72,275 Q72,290 82,298" fill="none" stroke="#94a3b8" strokeWidth="0.6" />
      {/* Çene hattı */}
      <path d="M335,460 Q300,510 230,530" fill="none" stroke="#94a3b8" strokeWidth="0.8" opacity="0.4" />
      {/* Boyun */}
      <path d="M180,530 L175,600 Q230,612 285,600 L280,535" fill="none" stroke="#cbd5e1" strokeWidth="1" opacity="0.5" />
      {/* Açı göstergesi */}
      <text x="250" y="590" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="500">45° Sağ</text>
    </g>
  );
}
