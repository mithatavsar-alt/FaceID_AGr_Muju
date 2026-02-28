'use client';

import { create } from 'zustand';
import { DoctorNote } from '@/types';

interface NotesState {
  notes: DoctorNote[];
  showNotesPanel: boolean;

  addNote: (note: Omit<DoctorNote, 'id' | 'created_at'>) => void;
  removeNote: (id: string) => void;
  togglePdfInclude: (id: string) => void;
  toggleNotesPanel: () => void;
  getNotesForRegion: (regionId: string) => DoctorNote[];
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  showNotesPanel: false,

  addNote: (note) =>
    set((state) => ({
      notes: [
        ...state.notes,
        {
          ...note,
          id: `note_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
          created_at: new Date().toISOString(),
        },
      ],
    })),

  removeNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
    })),

  togglePdfInclude: (id) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id ? { ...n, include_in_pdf: !n.include_in_pdf } : n,
      ),
    })),

  toggleNotesPanel: () =>
    set((state) => ({ showNotesPanel: !state.showNotesPanel })),

  getNotesForRegion: (regionId) =>
    get().notes.filter((n) => n.region_id === regionId),
}));
