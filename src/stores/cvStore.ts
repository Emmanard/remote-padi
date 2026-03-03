import { create } from 'zustand';
import type { CvDraft } from '@/types/cv';
import * as storage from '@/services/storage';

const DRAFTS_KEY = 'cv_drafts';

export interface CvState {
  drafts: CvDraft[];
  currentDraft: CvDraft | null;
  isLoading: boolean;
  loadDrafts: () => void;
  setCurrentDraft: (draft: CvDraft | null) => void;
  saveDraft: (draft: CvDraft) => void;
  removeDraft: (id: string) => void;
}

function loadDraftsFromStorage(): CvDraft[] {
  const raw = storage.getItem<CvDraft[]>(DRAFTS_KEY);
  return Array.isArray(raw) ? raw : [];
}

export const useCvStore = create<CvState>((set) => ({
  drafts: [],
  currentDraft: null,
  isLoading: false,

  loadDrafts: () => {
    const drafts = loadDraftsFromStorage();
    set({ drafts });
  },

  setCurrentDraft: (currentDraft) => {
    set({ currentDraft });
  },

  saveDraft: (draft) => {
    const drafts = loadDraftsFromStorage();
    const index = drafts.findIndex((d) => d.id === draft.id);
    const next = index >= 0 ? drafts.toSpliced(index, 1, draft) : [...drafts, draft];
    storage.setItem(DRAFTS_KEY, next);
    set({ drafts: next, currentDraft: draft });
  },

  removeDraft: (id) => {
    const drafts = loadDraftsFromStorage().filter((d) => d.id !== id);
    storage.setItem(DRAFTS_KEY, drafts);
    set((s) => ({
      drafts,
      currentDraft: s.currentDraft?.id === id ? null : s.currentDraft
    }));
  }
}));
