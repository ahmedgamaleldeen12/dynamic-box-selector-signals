import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Box } from "../box/box";
import { BoxStore } from '../../store/box.store';

@Component({
  selector: 'app-box-list',
  imports: [Box],
  templateUrl: './box-list.html',
  styleUrl: './box-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxList {
  readonly store = inject(BoxStore);

}
