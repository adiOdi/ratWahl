import { Routes } from '@angular/router';
import {ElectionComponent} from './election/election.component';

export const routes: Routes = [
  { path: 'wahl', component: ElectionComponent }, // TODO restrict access to users with valid token
];
