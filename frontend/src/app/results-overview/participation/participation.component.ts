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
import {sum} from '../../shared/util/reducers';
import {Group} from '../../shared/model/group';
import {LocalGroup} from '../../shared/model/local-group';

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

  localGroups = input.required<LocalGroup[]>();
  dataSource = computed(() =>
    this.localGroups().map(g => ({ ...g, participation: g.voted / g.tokenCreated * 100 }))
  );
  footer = computed(() => {
    const tokenCreated = this.localGroups().map(g => g.tokenCreated).reduce(sum);
    const members = this.localGroups().map(g => g.voted).reduce(sum);
    return { label: 'Gesamt', tokenCreated, members, participation: members / tokenCreated * 100 };
  });

  displayedColumns = ['localGroup', 'tokenCreated', 'votes', 'participation'];
}
