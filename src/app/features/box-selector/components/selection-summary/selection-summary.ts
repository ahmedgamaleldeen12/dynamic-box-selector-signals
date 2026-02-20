import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BoxStore } from '../../store/box.store';

@Component({
  selector: 'app-selection-summary',
  imports: [DecimalPipe],
  templateUrl: './selection-summary.html',
  styleUrl: './selection-summary.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionSummary {
  readonly store = inject(BoxStore);

  clearAll(): void {
    this.store.clearSelections();
  }
}
