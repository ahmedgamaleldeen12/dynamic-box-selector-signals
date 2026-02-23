import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SelectionSummary } from './selection-summary';
import { BoxStore } from '../../store/box.store';

describe('SelectionSummary', () => {
  let totalSignal = signal(0);

  const mockStore = {
    total: totalSignal,
    clearSelections: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionSummary],
      providers: [{ provide: BoxStore, useValue: mockStore }],
    }).compileComponents();
  });

  function createComponent() {
    const fixture = TestBed.createComponent(SelectionSummary);
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    const fixture = createComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display formatted total from store', () => {
    const fixture = createComponent();

    totalSignal.set(12.5);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('12.50'); // DecimalPipe formatting
  });

  it('should call clearSelections when clear button clicked', () => {
    const fixture = createComponent();

    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();

    expect(mockStore.clearSelections).toHaveBeenCalled();
  });
});