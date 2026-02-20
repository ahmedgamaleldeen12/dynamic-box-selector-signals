import { computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { backSaltos, boxes, frontSaltos, Salto } from '../models/box.selector';

// ------------------------------------
// State shape
// ------------------------------------
interface BoxSelectorState {
  activeBoxId: string | null;
  selections: Record<string, Salto>;
}

// ------------------------------------
// LocalStorage helpers
// ------------------------------------
const STORAGE_KEY = 'box-selections';

function loadSelections(): Record<string, Salto> {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load selections', e);
  }
  return {};
}

function saveSelections(selections: Record<string, Salto>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
  } catch (e) {
    console.error('Failed to save selections', e);
  }
}


export const BoxStore = signalStore(
  { providedIn: 'root' },

 
  withState<BoxSelectorState>({
    activeBoxId: null,
    selections: loadSelections(),
  }),

 
  withComputed((store) => ({
    /** Static list of box IDs */
    boxes: computed(() => boxes),

    /** Static front saltos */
    frontSaltos: computed(() => frontSaltos),

    /** Static back saltos */
    backSaltos: computed(() => backSaltos),

    /** The Salto selected for the currently active box, or null */
    selectedForActiveBox: computed(() => {
      const id = store.activeBoxId();
      if (!id) return null;
      return store.selections()[id] ?? null;
    }),

    /** Sum of all selected salto values */
    total: computed(() =>
      Object.values(store.selections()).reduce((sum, s) => sum + s.value, 0)
    ),
  })),


  withMethods((store) => ({
    /** Return the Salto selected for a given box, as a computed Signal */
    getSelectionForBox(boxId: string) {
      return computed(() => store.selections()[boxId] ?? null);
    },

    /** Activate a box (ignored if already active) */
    setActiveBox(id: string | null): void {
      if (store.activeBoxId() === id) return;
      patchState(store, { activeBoxId: id });
    },

    /** Assign a salto to a box, persist, then advance to the next box */
    selectSalto(salto: Salto): void {
      const id = store.activeBoxId();
      if (!id) return;

      const updated = { ...store.selections(), [id]: salto };
      patchState(store, { selections: updated });
      saveSelections(updated);

      // Advance to next box
      if (id !== boxes[boxes.length - 1]) {
        const next = (parseInt(id, 10) + 1).toString();
        patchState(store, { activeBoxId: next });
      }
    },

    /** Clear all selections and deactivate */
    clearSelections(): void {
      patchState(store, { selections: {}, activeBoxId: null });
      localStorage.removeItem(STORAGE_KEY);
    },
  }))
);
