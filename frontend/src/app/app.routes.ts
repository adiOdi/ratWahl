import { Routes } from '@angular/router';
import {ElectionComponent} from './election/election.component';
import {ResultsOverviewComponent} from './results-overview/results-overview.component';

export const routes: Routes = [
  { path: 'wahl', component: ElectionComponent }, // TODO restrict access to users with valid token
  { path: 'ergebnisse', component: ResultsOverviewComponent },
];
