import { Point, AnatomicalRegion, DragAnalyzeEvent } from '@/types';
import { isPointInPolygon, distanceToPoint } from './geometry';
import { SNAP_THRESHOLD_PX, FACE_BOUNDARY_MARGIN } from './constants';
import { faceBoundary } from '@/data/face-landmarks';

export function snapToRegion(
  dropPoint: Point,
  regions: AnatomicalRegion[],
): DragAnalyzeEvent {
  // 1. Yüz alanı içinde mi?
  const isInsideFace = isPointInPolygon(dropPoint, faceBoundary);
  if (!isInsideFace) {
    // Yüz sınırına yakın mı kontrol et (margin toleransı)
    const closestFaceDist = regions.reduce(
      (min, r) => Math.min(min, distanceToPoint(dropPoint, r.centroid)),
      Infinity,
    );
    if (closestFaceDist > SNAP_THRESHOLD_PX + FACE_BOUNDARY_MARGIN) {
      return {
        dropPoint,
        matchedRegion: null,
        snapDistance: closestFaceDist,
        isInsidePolygon: false,
        isOutsideFace: true,
      };
    }
  }

  // 2. Polygon içinde mi?
  for (const region of regions) {
    if (isPointInPolygon(dropPoint, region.polygon)) {
      return {
        dropPoint,
        matchedRegion: region,
        snapDistance: 0,
        isInsidePolygon: true,
        isOutsideFace: false,
      };
    }
  }

  // 3. En yakın bölgenin centroid'ine mesafe
  let closestRegion: AnatomicalRegion | null = null;
  let closestDistance = Infinity;

  for (const region of regions) {
    const dist = distanceToPoint(dropPoint, region.centroid);
    if (dist < closestDistance) {
      closestDistance = dist;
      closestRegion = region;
    }
  }

  if (closestDistance <= SNAP_THRESHOLD_PX && closestRegion) {
    return {
      dropPoint,
      matchedRegion: closestRegion,
      snapDistance: closestDistance,
      isInsidePolygon: false,
      isOutsideFace: false,
    };
  }

  // 4. Eşleştirilemedi
  return {
    dropPoint,
    matchedRegion: null,
    snapDistance: closestDistance,
    isInsidePolygon: false,
    isOutsideFace: !isInsideFace,
  };
}

export function findHoveredRegion(
  point: Point,
  regions: AnatomicalRegion[],
): AnatomicalRegion | null {
  // Önce polygon içinde olanı bul
  for (const region of regions) {
    if (isPointInPolygon(point, region.polygon)) {
      return region;
    }
  }

  // Snap mesafesi içindeki en yakın bölge
  let closest: AnatomicalRegion | null = null;
  let minDist = SNAP_THRESHOLD_PX;

  for (const region of regions) {
    const dist = distanceToPoint(point, region.centroid);
    if (dist < minDist) {
      minDist = dist;
      closest = region;
    }
  }

  return closest;
}
