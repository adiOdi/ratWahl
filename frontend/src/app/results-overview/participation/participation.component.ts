import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef, MatFooterCell, MatFooterCellDef, MatFooterRow, MatFooterRowDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {DecimalPipe} from '@angular/common';

export interface LocalGroupParticipation {
  localGroup: string;
  tokenCreated: number;
  votes: number;
}

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
export class ParticipationComponent implements OnChanges {

  @Input({ required: true }) tokenByLocalGroup: LocalGroupParticipation[] = [];

  displayedColumns = ['localGroup', 'tokenCreated', 'votes', 'participation'];
  totalTokenCreated = 0;
  totalVotes = 0;
  totalParticipation = 0;

  ngOnChanges(changes: SimpleChanges) {
    this.totalTokenCreated = this.tokenByLocalGroup
      .map(data => data.tokenCreated)
      .reduce((prev, cur) => prev + cur);
    this.totalVotes = this.tokenByLocalGroup
      .map(data => data.votes)
      .reduce((prev, cur) => prev + cur);
    this.totalParticipation = this.totalVotes / this.totalTokenCreated * 100;
  }
}
