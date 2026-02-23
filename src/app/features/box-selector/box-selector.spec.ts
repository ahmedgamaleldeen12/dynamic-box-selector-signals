import { TestBed } from '@angular/core/testing';
import { BoxSelector } from './box-selector';

describe('BoxSelector', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxSelector],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(BoxSelector);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render child components', () => {
    const fixture = TestBed.createComponent(BoxSelector);
    fixture.detectChanges();

    const native = fixture.nativeElement;
    expect(native.querySelector('app-selection-summary')).toBeTruthy();
    expect(native.querySelector('app-box-list')).toBeTruthy();
    expect(native.querySelector('app-option-selector')).toBeTruthy();
  });
});