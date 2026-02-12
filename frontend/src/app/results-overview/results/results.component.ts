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
import {ChartData, ChartOptions} from 'chart.js';
import {sum} from '../../shared/util/reducers';

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
  columnNames = computed(() => [ 'elective', ...this.groups().map(g => g.name) ]);

  barChart: Signal<ChartData<'bar'>> = computed(() => ({
    labels: this.groups().map(g => g.name),
    datasets: [
      { label: 'foo', data: [...this.electionResult().overallRepresentation.values()] }
    ],
  }));

  polarAreaChart: Signal<ChartData<'polarArea'>> = computed(() => ({
    labels: this.groups().map(g => g.name),
    datasets: [
      { label: 'foo', data: [...this.electionResult().overallRepresentation.values()] }
    ],
  }));

  doughnutChart: Signal<ChartData<'doughnut'>> = computed(() => ({
    labels: this.groups().map(g => g.name),
    datasets: [
      {
        label: 'foo',
        data: [...this.electionResult().overallRepresentation.values()].map(rep => rep / (this.groups().length * 100)),
        circumference: [...this.electionResult().overallRepresentation.values()].reduce(sum) / (this.groups().length * 100) * 360,
      }
    ],
  }));

  readonly barChartOptions: ChartOptions = {
    indexAxis: 'y',
    scales: { x: { min: 0, max: 100 }, y: {} },
    plugins: {
      legend: {
        display: false,
      }
    }
  }
}
