import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BoxStore } from '../../store/box.store';
import { Salto } from '../../models/box.selector';

@Component({
  selector: 'app-option-selector',
  imports: [],
  templateUrl: './option-selector.html',
  styleUrl: './option-selector.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionSelector {
  readonly store = inject(BoxStore);

  selectSalto(salto: Salto): void {
    this.store.selectSalto(salto);
  }
}
