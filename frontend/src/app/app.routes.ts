import { Routes } from '@angular/router';
import {ElectionComponent} from './election/election.component';
import {ResultsOverviewComponent} from './results-overview/results-overview.component';
import {authGuard} from './auth-guard';
import {UnauthorizedComponent} from './unauthorized.component';

export const PATH_ELECTION = 'wahl';
export const NAV_ELECTION = `/${PATH_ELECTION}`;
export const PATH_RESULTS = 'ergebnisse';
export const NAV_RESULTS = `/${PATH_RESULTS}`;
export const PATH_UNAUTHORIZED = 'unberechtigt';
export const NAV_UNAUTHORIZED = `/${PATH_UNAUTHORIZED}`;

export const routes: Routes = [
  { path: PATH_ELECTION, component: ElectionComponent, canActivate: [authGuard] },
  { path: PATH_RESULTS, component: ResultsOverviewComponent },
  { path: PATH_UNAUTHORIZED, component: UnauthorizedComponent }
];
