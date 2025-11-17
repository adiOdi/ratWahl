import {Component, computed, input} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatFooterCell,
  MatFooterCellDef,
  MatFooterRow,
  MatFooterRowDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {DecimalPipe} from '@angular/common';
import {LocalGroup} from '../../shared/model/group';
import {sum} from '../../shared/util/reducers';

@Component({
  selector: 'app-participation',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatFooterRow,
    MatFooterRowDef,
    MatFooterCell,
    MatFooterCellDef,
    DecimalPipe
  ],
  templateUrl: './participation.component.html',
  styleUrl: './participation.component.scss',
})
export class ParticipationComponent {

  groups = input.required<LocalGroup[]>();
  dataSource = computed(() =>
    this.groups().map(g => ({ ...g, participation: g.members / g.tokenCreated * 100 }))
  );
  footer = computed(() => {
    const tokenCreated = this.groups().map(g => g.tokenCreated).reduce(sum);
    const members = this.groups().map(g => g.members).reduce(sum);
    return { label: 'Gesamt', tokenCreated, members, participation: members / tokenCreated * 100 };
  });

  displayedColumns = ['localGroup', 'tokenCreated', 'votes', 'participation'];
}
