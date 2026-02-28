import { AnatomicalRegion } from '@/types';
import { faceRegions } from './face-landmarks';

const regionAnalysisData: Record<string, {
  score: number;
  priority: 'low' | 'medium' | 'high';
  confidence: number;
  condition: string;
  decision_support_note: string;
  dose_range: { conservative: { min: number; max: number }; standard: { min: number; max: number }; advanced: { min: number; max: number } };
}> = {
  left_undereye: {
    score: 72,
    priority: 'medium',
    confidence: 88,
    condition: 'Orta düzeyde hacim kaybı ve hafif renk değişimi gözlemlenmektedir.',
    decision_support_note: 'Göz altı bölgesinde dolgu uygulaması değerlendirilebilir. Damarsal yapılar göz önünde bulundurulmalıdır.',
    dose_range: { conservative: { min: 0.3, max: 0.5 }, standard: { min: 0.5, max: 0.8 }, advanced: { min: 0.8, max: 1.2 } },
  },
  right_undereye: {
    score: 58,
    priority: 'high',
    confidence: 91,
    condition: 'Belirgin hacim kaybı ve göz altı çukurluğu tespit edilmiştir.',
    decision_support_note: 'Sağ göz altında sol tarafa kıyasla daha belirgin hacim kaybı mevcuttur. Asimetri düzeltmesi değerlendirilebilir.',
    dose_range: { conservative: { min: 0.4, max: 0.6 }, standard: { min: 0.6, max: 1.0 }, advanced: { min: 1.0, max: 1.4 } },
  },
  left_cheek: {
    score: 65,
    priority: 'medium',
    confidence: 85,
    condition: 'Elmacık bölgesinde hafif düzleşme gözlemlenmektedir.',
    decision_support_note: 'Midface hacim desteği ile yüz kontürü güçlendirilebilir.',
    dose_range: { conservative: { min: 0.5, max: 0.8 }, standard: { min: 0.8, max: 1.5 }, advanced: { min: 1.5, max: 2.0 } },
  },
  right_cheek: {
    score: 68,
    priority: 'medium',
    confidence: 87,
    condition: 'Elmacık bölgesinde hafif hacim kaybı mevcuttur.',
    decision_support_note: 'Sol elmacık ile uyumlu şekilde hacim desteği planlanabilir.',
    dose_range: { conservative: { min: 0.5, max: 0.8 }, standard: { min: 0.8, max: 1.5 }, advanced: { min: 1.5, max: 2.0 } },
  },
  left_nasolabial: {
    score: 55,
    priority: 'high',
    confidence: 92,
    condition: 'Belirgin nazolabial kıvrım derinliği tespit edilmiştir.',
    decision_support_note: 'Nazolabial dolgu ile kıvrım derinliği azaltılabilir. Doğal görünüm korunmalıdır.',
    dose_range: { conservative: { min: 0.3, max: 0.5 }, standard: { min: 0.5, max: 0.8 }, advanced: { min: 0.8, max: 1.2 } },
  },
  right_nasolabial: {
    score: 60,
    priority: 'high',
    confidence: 90,
    condition: 'Nazolabial kıvrım derinliği orta-yüksek düzeyde gözlemlenmektedir.',
    decision_support_note: 'Sol taraf ile birlikte değerlendirilmesi önerilir. Simetri gözetilmelidir.',
    dose_range: { conservative: { min: 0.3, max: 0.5 }, standard: { min: 0.5, max: 0.8 }, advanced: { min: 0.8, max: 1.2 } },
  },
  left_jawline: {
    score: 78,
    priority: 'low',
    confidence: 83,
    condition: 'Çene hattı genel olarak korunmuş, hafif gevşeklik mevcut.',
    decision_support_note: 'İsteğe bağlı çene hattı belirginleştirme değerlendirilebilir.',
    dose_range: { conservative: { min: 0.5, max: 1.0 }, standard: { min: 1.0, max: 1.5 }, advanced: { min: 1.5, max: 2.5 } },
  },
  right_jawline: {
    score: 75,
    priority: 'low',
    confidence: 82,
    condition: 'Çene hattında hafif asimetri ve gevşeklik gözlemlenmektedir.',
    decision_support_note: 'Sol çene hattı ile birlikte değerlendirilmesi önerilir.',
    dose_range: { conservative: { min: 0.5, max: 1.0 }, standard: { min: 1.0, max: 1.5 }, advanced: { min: 1.5, max: 2.5 } },
  },
  left_temple: {
    score: 70,
    priority: 'medium',
    confidence: 86,
    condition: 'Şakak bölgesinde hafif çöküntü tespit edilmiştir.',
    decision_support_note: 'Temporal dolgu ile yüz çerçevesi güçlendirilebilir.',
    dose_range: { conservative: { min: 0.5, max: 0.8 }, standard: { min: 0.8, max: 1.2 }, advanced: { min: 1.2, max: 1.8 } },
  },
  right_temple: {
    score: 73,
    priority: 'medium',
    confidence: 84,
    condition: 'Şakak bölgesinde hafif hacim kaybı mevcuttur.',
    decision_support_note: 'Sol şakak ile simetrik şekilde değerlendirilmesi önerilir.',
    dose_range: { conservative: { min: 0.5, max: 0.8 }, standard: { min: 0.8, max: 1.2 }, advanced: { min: 1.2, max: 1.8 } },
  },
  left_brow: {
    score: 82,
    priority: 'low',
    confidence: 89,
    condition: 'Kaş pozisyonu ve hacmi genel olarak iyi durumda.',
    decision_support_note: 'Minimal müdahale yeterli olabilir. Kaş kaldırma ihtiyacı değerlendirilmelidir.',
    dose_range: { conservative: { min: 0.2, max: 0.3 }, standard: { min: 0.3, max: 0.5 }, advanced: { min: 0.5, max: 0.8 } },
  },
  right_brow: {
    score: 80,
    priority: 'low',
    confidence: 88,
    condition: 'Kaş pozisyonu korunmuş, hafif asimetri mevcut.',
    decision_support_note: 'Sol kaş ile simetri değerlendirmesi yapılmalıdır.',
    dose_range: { conservative: { min: 0.2, max: 0.3 }, standard: { min: 0.3, max: 0.5 }, advanced: { min: 0.5, max: 0.8 } },
  },
  forehead: {
    score: 62,
    priority: 'medium',
    confidence: 90,
    condition: 'Alın bölgesinde orta düzeyde kırışıklık ve hacim kaybı gözlemlenmektedir.',
    decision_support_note: 'Botulinum toksin ve/veya dolgu kombinasyonu değerlendirilebilir.',
    dose_range: { conservative: { min: 0.5, max: 1.0 }, standard: { min: 1.0, max: 2.0 }, advanced: { min: 2.0, max: 3.0 } },
  },
  nose: {
    score: 85,
    priority: 'low',
    confidence: 93,
    condition: 'Burun yapısı genel olarak dengeli. Minimal asimetri mevcut.',
    decision_support_note: 'Non-cerrahi rinoplasti ihtiyacı düşük görünmektedir.',
    dose_range: { conservative: { min: 0.1, max: 0.3 }, standard: { min: 0.3, max: 0.5 }, advanced: { min: 0.5, max: 0.8 } },
  },
  chin: {
    score: 68,
    priority: 'medium',
    confidence: 86,
    condition: 'Çene projeksiyonunda hafif yetersizlik tespit edilmiştir.',
    decision_support_note: 'Çene ucu dolgu ile projeksiyon artırılabilir. Profil dengesi göz önünde bulundurulmalıdır.',
    dose_range: { conservative: { min: 0.5, max: 0.8 }, standard: { min: 0.8, max: 1.2 }, advanced: { min: 1.2, max: 2.0 } },
  },
  lips: {
    score: 58,
    priority: 'high',
    confidence: 91,
    condition: 'Dudak hacminde azalma ve üst-alt dudak oranında dengesizlik gözlemlenmektedir. Dudak kenarlarında (vermillion border) belirginlik kaybı mevcuttur.',
    decision_support_note: 'Hyalüronik asit bazlı dudak dolgusu ile hacim artırımı ve dudak şekillendirme önerilmektedir. Üst dudak/alt dudak oranı (ideal 1:1.6) göz önünde bulundurulmalıdır. Dudak kenar hatları (border) ve cupid yayı belirginleştirilebilir.',
    dose_range: { conservative: { min: 0.5, max: 0.8 }, standard: { min: 0.8, max: 1.2 }, advanced: { min: 1.2, max: 2.0 } },
  },
};

export const mockRegions: AnatomicalRegion[] = faceRegions.map((region) => {
  const data = regionAnalysisData[region.id];
  return {
    id: region.id,
    name_tr: region.name_tr,
    name_en: region.name_en,
    polygon: region.polygon,
    centroid: region.centroid,
    homolog_id: region.homolog_id,
    score: data.score,
    priority: data.priority,
    confidence: data.confidence,
    condition: data.condition,
    decision_support_note: data.decision_support_note,
    dose_range: {
      conservative: { ...data.dose_range.conservative, unit: 'cc' },
      standard: { ...data.dose_range.standard, unit: 'cc' },
      advanced: { ...data.dose_range.advanced, unit: 'cc' },
    },
  };
});
