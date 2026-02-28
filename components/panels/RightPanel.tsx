'use client';

import { useAnalysisStore } from '@/store/useAnalysisStore';
import RegionInfoCard from './RegionInfoCard';
import DoseRange from './DoseRange';
import QualityCard from './QualityCard';
import ComparePanel from './ComparePanel';
import DoctorNotes from './DoctorNotes';
import MedicalDisclaimer from '@/components/ui/MedicalDisclaimer';

export default function RightPanel() {
  const { selectedRegion, qualityAssessment } = useAnalysisStore();

  return (
    <div className="flex flex-col gap-3">
      {/* Bölge bilgi kartı */}
      <RegionInfoCard region={selectedRegion} />

      {/* Doz/cc aralığı */}
      {selectedRegion && <DoseRange doseRange={selectedRegion.dose_range} />}

      {/* Karşılaştırma paneli */}
      <ComparePanel />

      {/* Doktor notları */}
      <DoctorNotes />

      {/* Kalite kartı */}
      <QualityCard assessment={qualityAssessment} />

      {/* Medikal uyarı */}
      <MedicalDisclaimer />
    </div>
  );
}
