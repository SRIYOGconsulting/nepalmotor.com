import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MAX_COMPARE } from '@/lib/compareConstants';

export type CompareInventoryKind = 'car_listing' | 'sell_car';

export type CompareAddResult = 'added' | 'already' | 'full' | 'kind_mismatch';

type CompareState = {
  kind: CompareInventoryKind | null;
  ids: string[];
  add: (kind: CompareInventoryKind, id: string) => CompareAddResult;
  remove: (id: string) => void;
  clear: () => void;
};

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      kind: null,
      ids: [],
      add: (kind, id) => {
        const trimmed = id.trim();
        if (!trimmed) return 'full';
        const { ids, kind: activeKind } = get();
        if (ids.length > 0 && activeKind !== kind) return 'kind_mismatch';
        if (ids.includes(trimmed)) return 'already';
        if (ids.length >= MAX_COMPARE) return 'full';
        set({ kind, ids: [...ids, trimmed] });
        return 'added';
      },
      remove: (id) =>
        set((s) => {
          const ids = s.ids.filter((x) => x !== id);
          return { ids, kind: ids.length === 0 ? null : s.kind };
        }),
      clear: () => set({ ids: [], kind: null }),
    }),
    { name: 'nm-compare-inventory' }
  )
);
