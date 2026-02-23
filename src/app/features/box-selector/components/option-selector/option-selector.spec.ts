import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { OptionSelector } from './option-selector';
import { BoxStore } from '../../store/box.store';
import { Salto } from '../../models/box.selector';

describe('OptionSelector', () => {
  const frontSaltos = signal<Salto[]>([
    { id: 'f1', symbol: 'F1', value: 1 },
  ]);

  const backSaltos = signal<Salto[]>([
    { id: 'b1', symbol: 'B1', value: 2 },
  ]);

  const activeBoxId = signal<string | null>(null);
  const selectedForActiveBox = signal<Salto | null>(null);

  const mockStore = {
    frontSaltos,
    backSaltos,
    activeBoxId,
    selectedForActiveBox,
    selectSalto: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionSelector],
      providers: [{ provide: BoxStore, useValue: mockStore }],
    }).compileComponents();
  });

  function createComponent() {
    const fixture = TestBed.createComponent(OptionSelector);
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    const fixture = createComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should be hidden when no active box', () => {
    const fixture = createComponent();

    const container = fixture.nativeElement.querySelector('div');
    expect(container.style.opacity).toBe('0');
  });

  it('should be visible when active box exists', () => {
    activeBoxId.set('box-1');
    const fixture = createComponent();

    const container = fixture.nativeElement.querySelector('div');
    expect(container.style.opacity).toBe('1');
  });

  it('should render front and back saltos', () => {
    activeBoxId.set('box-1');
    const fixture = createComponent();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(2);
  });

  it('should call selectSalto when button clicked', () => {
    activeBoxId.set('box-1');
    const fixture = createComponent();

    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();

    expect(mockStore.selectSalto).toHaveBeenCalledWith(frontSaltos()[0]);
  });

  it('should apply selected class when salto is selected', () => {
    activeBoxId.set('box-1');
    selectedForActiveBox.set(frontSaltos()[0]);

    const fixture = createComponent();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.className).toContain('bg-blue-500');
  });
});