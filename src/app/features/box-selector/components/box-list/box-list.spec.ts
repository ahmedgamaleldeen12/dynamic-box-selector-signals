import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { BoxList } from './box-list';
import { BoxStore } from '../../store/box.store';

describe('BoxList', () => {
  const mockStore = {
    boxes: signal(['box-1', 'box-2']),
    activeBoxId: signal<string | null>(null),
    getSelectionForBox: () => signal(null),
    setActiveBox: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxList],
      providers: [{ provide: BoxStore, useValue: mockStore }],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BoxList);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should inject BoxStore', () => {
    const fixture = TestBed.createComponent(BoxList);
    fixture.detectChanges();

    expect(fixture.componentInstance.store).toBe(mockStore);
  });
});