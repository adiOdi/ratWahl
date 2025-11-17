import {Component, computed, input, Signal} from '@angular/core';
import {ElectionResult} from '../../shared/model/election';
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
import {BaseChartDirective} from 'ng2-charts';
import {ChartData} from 'chart.js';

@Component({
  selector: 'app-results',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    DecimalPipe,
    MatFooterCell,
    MatFooterCellDef,
    MatFooterRow,
    MatFooterRowDef,
    BaseChartDirective
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent {

  electionResult = input.required<ElectionResult>();
  groups = computed(() => [ ...this.electionResult().overallRepresentation.keys() ]);
  columnNames = computed(() => [ 'elective', ...this.groups().map(g => g.name) ])

  // barChart: Signal<ChartData<'bar', { key: string, value: number }[]>> = computed(() => {
  //
  // })
}
