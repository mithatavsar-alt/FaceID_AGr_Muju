import { QualityAssessment } from '@/types';

export const mockQualityAssessment: QualityAssessment = {
  quality_score: 78,
  confidence: 91,
  flags: ['shadow_left'],
  pose: {
    yaw: 8,
    pitch: 2,
    roll: 1,
  },
  status: 'caution',
};
