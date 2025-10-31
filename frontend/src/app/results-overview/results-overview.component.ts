import {Component, inject, signal, Signal, WritableSignal} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {LocalGroupParticipation, ParticipationComponent} from './participation/participation.component';
import {ResultsComponent} from './results/results.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {AboutComponent} from './about/about.component';
import {MatToolbar} from '@angular/material/toolbar';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {ElectionResourceService} from '../shared/service/election-resource.service';
import {Election, ElectionMetadata} from '../shared/model/election';
import {toSignal} from '@angular/core/rxjs-interop';
import {take, tap} from 'rxjs';

type View = 'participation' | 'results' | 'statistics' | 'about';

@Component({
  selector: 'app-results-overview',
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatButton,
    MatDivider,
    ParticipationComponent,
    ResultsComponent,
    StatisticsComponent,
    AboutComponent,
    MatToolbar,
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatMenuItem,
  ],
  templateUrl: './results-overview.component.html',
  styleUrl: './results-overview.component.scss'
})
export class ResultsOverviewComponent {
  elections: Signal<ElectionMetadata[]>;

  view: View = 'participation';
  menuButtonIcon = 'arrow_drop_down';

  private _election: WritableSignal<Election | undefined> = signal(undefined);

  private electionResource = inject(ElectionResourceService);

  constructor() {
    this.elections = toSignal(
      this.electionResource.elections().pipe(
        tap(e => this.election = e[0]),
      ), { initialValue: [] }
    );
  }

  get election(): Signal<Election | undefined> {
    return this._election;
  }

  set election(e: ElectionMetadata) {
    this.electionResource.election(e.uuid)
      .pipe(take(1))
      .subscribe(this._election.set);
  }
}
