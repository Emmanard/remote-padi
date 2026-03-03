import { create } from 'zustand';
import type { InvoiceDraft } from '@/types/invoice';
import * as storage from '@/services/storage';

const DRAFTS_KEY = 'invoice_drafts';

export interface InvoiceState {
  drafts: InvoiceDraft[];
  currentDraft: InvoiceDraft | null;
  isLoading: boolean;
  loadDrafts: () => void;
  setCurrentDraft: (draft: InvoiceDraft | null) => void;
  saveDraft: (draft: InvoiceDraft) => void;
  removeDraft: (id: string) => void;
}

function loadDraftsFromStorage(): InvoiceDraft[] {
  const raw = storage.getItem<InvoiceDraft[]>(DRAFTS_KEY);
  return Array.isArray(raw) ? raw : [];
}

export const useInvoiceStore = create<InvoiceState>((set, get) => ({
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
