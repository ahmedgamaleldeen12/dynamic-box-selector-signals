import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { BoxStore } from '../../store/box.store';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [],
  templateUrl: './box.html',
  styleUrl: './box.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Box {
  /** Box identifier passed from parent */
  readonly id = input.required<string>();

  private readonly store = inject(BoxStore);

  /** Is this box currently active? */
  readonly isActive = computed(() => this.store.activeBoxId() === this.id());

  /** The salto selected for this box */
  readonly selectedOption = computed(() => this.store.getSelectionForBox(this.id())());

  activateBox(): void {
    this.store.setActiveBox(this.id());
  }
}
