import { TestBed } from '@angular/core/testing';
import { BoxStore } from './box.store';
import { Salto } from '../models/box.selector';

describe('BoxStore', () => {
  let store: InstanceType<typeof BoxStore>;

  const saltoA: Salto = { id: 's1', symbol: 'A', value: 1 };
  const saltoB: Salto = { id: 's2', symbol: 'B', value: 2 };

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({});
    store = TestBed.inject(BoxStore);
  });

  it('should create store', () => {
    expect(store).toBeTruthy();
  });

  // ---------------------------------
  // setActiveBox
  // ---------------------------------
  it('should set active box', () => {
    store.setActiveBox('1');
    expect(store.activeBoxId()).toBe('1');
  });

  it('should not change if same active box', () => {
    store.setActiveBox('1');
    store.setActiveBox('1');

    expect(store.activeBoxId()).toBe('1');
  });

  // ---------------------------------
  // selectSalto
  // ---------------------------------
  it('should assign salto to active box', () => {
    store.setActiveBox('1');

    store.selectSalto(saltoA);

    expect(store.selections()['1']).toEqual(saltoA);
  });

  it('should compute total correctly', () => {
    store.setActiveBox('1');
    store.selectSalto(saltoA);

    store.setActiveBox('2');
    store.selectSalto(saltoB);

    expect(store.total()).toBe(3);
  });

  it('should auto advance to next box', () => {
    store.setActiveBox('1');
    store.selectSalto(saltoA);

    expect(store.activeBoxId()).toBe('2');
  });

  it('should persist selections to localStorage', () => {
    store.setActiveBox('1');
    store.selectSalto(saltoA);

    const saved = JSON.parse(localStorage.getItem('box-selections')!);
    expect(saved['1']).toEqual(saltoA);
  });

  // ---------------------------------
  // getSelectionForBox
  // ---------------------------------
  it('should return computed selection for box', () => {
    store.setActiveBox('1');
    store.selectSalto(saltoA);

    const selection = store.getSelectionForBox('1');
    expect(selection()).toEqual(saltoA);
  });

  // ---------------------------------
  // clearSelections
  // ---------------------------------
  it('should clear selections and active box', () => {
    store.setActiveBox('1');
    store.selectSalto(saltoA);

    store.clearSelections();

    expect(store.selections()).toEqual({});
    expect(store.activeBoxId()).toBeNull();
  });

  it('should remove localStorage on clear', () => {
    store.setActiveBox('1');
    store.selectSalto(saltoA);

    store.clearSelections();

    expect(localStorage.getItem('box-selections')).toBeNull();
  });
});