import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { Box } from './box';
import { BoxStore } from '../../store/box.store';

describe('Box', () => {
  let activeBoxId = signal<string | null>(null);
  let selectionSignal = signal<string | null>(null);

  const mockStore = {
    activeBoxId,
    getSelectionForBox: () => selectionSignal,
    setActiveBox: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Box],
      providers: [{ provide: BoxStore, useValue: mockStore }],
    }).compileComponents();
  });

  function createComponent(id: string) {
    const fixture = TestBed.createComponent(Box);
    fixture.componentRef.setInput('id', id); // ✅ required signal input
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    const fixture = createComponent('box-1');
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should compute isActive correctly', () => {
    const fixture = createComponent('box-1');

    activeBoxId.set('box-1');
    expect(fixture.componentInstance.isActive()).toBe(true);

    activeBoxId.set('box-2');
    expect(fixture.componentInstance.isActive()).toBe(false);
  });

  it('should expose selected option from store', () => {
    const fixture = createComponent('box-1');

    selectionSignal.set('option-A');
    expect(fixture.componentInstance.selectedOption()).toBe('option-A');
  });

  it('should call store.setActiveBox when activateBox is called', () => {
    const fixture = createComponent('box-1');

    fixture.componentInstance.activateBox();

    expect(mockStore.setActiveBox).toHaveBeenCalledWith('box-1');
  });
});