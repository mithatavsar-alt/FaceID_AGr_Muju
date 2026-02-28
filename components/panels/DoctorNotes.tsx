'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotesStore } from '@/store/useNotesStore';
import { useAnalysisStore } from '@/store/useAnalysisStore';
import { NOTE_TEMPLATES } from '@/lib/constants';

export default function DoctorNotes() {
  const { selectedRegion } = useAnalysisStore();
  const { notes, showNotesPanel, addNote, removeNote, togglePdfInclude } =
    useNotesStore();
  const [freeText, setFreeText] = useState('');

  if (!showNotesPanel || !selectedRegion) return null;

  const regionNotes = notes.filter(
    (n) => n.region_id === selectedRegion.id,
  );

  const handleAddTemplate = (content: string) => {
    addNote({
      region_id: selectedRegion.id,
      patient_id: 'demo_patient',
      session_id: 'demo_session',
      type: 'template',
      content,
      include_in_pdf: true,
      created_by: 'demo_doctor',
    });
  };

  const handleAddFreeText = () => {
    if (!freeText.trim()) return;
    addNote({
      region_id: selectedRegion.id,
      patient_id: 'demo_patient',
      session_id: 'demo_session',
      type: 'freetext',
      content: freeText.trim(),
      include_in_pdf: true,
      created_by: 'demo_doctor',
    });
    setFreeText('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Doktor Notları – {selectedRegion.name_tr}
      </h4>

      {/* Hızlı şablonlar */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {NOTE_TEMPLATES.map((template) => (
          <button
            key={template}
            onClick={() => handleAddTemplate(template)}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            + {template}
          </button>
        ))}
      </div>

      {/* Serbest metin */}
      <div className="mb-3 flex gap-2">
        <textarea
          value={freeText}
          onChange={(e) => setFreeText(e.target.value.slice(0, 280))}
          placeholder="Serbest not yazın..."
          className="flex-1 resize-none rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 placeholder:text-slate-400 focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-200"
          rows={2}
        />
        <button
          onClick={handleAddFreeText}
          disabled={!freeText.trim()}
          className="self-end rounded-lg bg-blue-500 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-600 disabled:bg-slate-200 disabled:text-slate-400"
        >
          Kaydet
        </button>
      </div>
      <p className="mb-3 text-right text-[10px] text-slate-400">
        {freeText.length}/280
      </p>

      {/* Not listesi */}
      <AnimatePresence>
        {regionNotes.length > 0 && (
          <div className="space-y-1.5">
            {regionNotes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-start gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2"
              >
                <div className="flex-1">
                  <p className="text-xs text-slate-700">{note.content}</p>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    {note.type === 'template' ? 'Şablon' : 'Serbest'} ·{' '}
                    {new Date(note.created_at).toLocaleTimeString('tr-TR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => togglePdfInclude(note.id)}
                    className={`rounded px-1.5 py-0.5 text-[10px] transition-colors ${
                      note.include_in_pdf
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                    title={note.include_in_pdf ? 'PDF\'e dahil' : 'PDF\'e dahil değil'}
                  >
                    PDF
                  </button>
                  <button
                    onClick={() => removeNote(note.id)}
                    className="rounded px-1 py-0.5 text-[10px] text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
