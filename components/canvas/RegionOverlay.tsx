'use client';

import { AnatomicalRegion } from '@/types';
import { PRIORITY_COLORS, ACTIVE_COLOR } from '@/lib/constants';

interface RegionOverlayProps {
  regions: AnatomicalRegion[];
  selectedRegionId: string | null;
  hoveredRegionId: string | null;
  glowRegionId: string | null;
  canvasWidth: number;
  canvasHeight: number;
}

export default function RegionOverlay({
  regions,
  selectedRegionId,
  hoveredRegionId,
  glowRegionId,
  canvasWidth,
  canvasHeight,
}: RegionOverlayProps) {
  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width={canvasWidth}
      height={canvasHeight}
      viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
    >
      {regions.map((region) => {
        const isSelected = region.id === selectedRegionId;
        const isHovered = region.id === hoveredRegionId;
        const isGlowing = region.id === glowRegionId;
        const color = isSelected ? ACTIVE_COLOR : PRIORITY_COLORS[region.priority];

        const points = region.polygon.map((p) => `${p.x},${p.y}`).join(' ');

        return (
          <g key={region.id}>
            <polygon
              points={points}
              fill={color}
              fillOpacity={isSelected ? 0.3 : isHovered ? 0.2 : 0.06}
              stroke={isSelected || isHovered ? 'white' : color}
              strokeWidth={isSelected ? 2 : isHovered ? 1.5 : 0.5}
              strokeOpacity={isSelected ? 0.9 : isHovered ? 0.7 : 0.15}
              className={`transition-all duration-200 ${isGlowing ? 'animate-svg-pulse' : ''}`}
            />
            {(isHovered || isSelected) && (
              <>
                <text
                  x={region.centroid.x}
                  y={region.centroid.y - 8}
                  textAnchor="middle"
                  fill="black"
                  fontSize="10"
                  fontWeight="700"
                  stroke="black"
                  strokeWidth="3"
                  strokeOpacity="0.5"
                  paintOrder="stroke"
                  className="select-none"
                >
                  {region.name_tr}
                </text>
                <text
                  x={region.centroid.x}
                  y={region.centroid.y - 8}
                  textAnchor="middle"
                  fill="white"
                  fontSize="10"
                  fontWeight="700"
                  className="select-none"
                >
                  {region.name_tr}
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}
