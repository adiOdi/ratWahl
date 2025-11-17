import {Component, inject, OnDestroy, OnInit, signal, Signal, WritableSignal} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {ParticipationComponent} from './participation/participation.component';
import {ResultsComponent} from './results/results.component';
import {AboutComponent} from './about/about.component';
import {MatToolbar} from '@angular/material/toolbar';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {ElectionResourceService} from '../shared/service/election-resource.service';
import {Election, ElectionMetadata} from '../shared/model/election';
import {toSignal} from '@angular/core/rxjs-interop';
import {Subscription, take, tap} from 'rxjs';
import {LocalGroupsPipe} from '../shared/pipes/local-groups.pipe';
import {ActivatedRoute} from '@angular/router';
import {LOC_STORAGE_ELECTION_UUID, PARAM_ELECTION, PARAM_VIEW} from '../shared/constants';

export enum View {
  PARTICIPATION = 'PARTICIPATION',
  RESULTS = 'RESULTS',
  ABOUT = 'ABOUT'
}

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
    AboutComponent,
    MatToolbar,
    MatIconButton,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatMenuItem,
    LocalGroupsPipe,
  ],
  templateUrl: './results-overview.component.html',
  styleUrl: './results-overview.component.scss'
})
export class ResultsOverviewComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private electionResource = inject(ElectionResourceService);

  view: typeof View = View;

  elections: Signal<ElectionMetadata[]>;

  currentView = signal(View.PARTICIPATION);
  menuButtonIcon = 'arrow_drop_down';

  private _election: WritableSignal<Election | undefined> = signal(undefined);

  private subscriptions: Subscription[] = [];

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
      .subscribe(election => {
        this._election.set(election);
        if(this.currentView() === View.RESULTS && !election?.result) {
          this.currentView.set(View.PARTICIPATION);
        }
      });
  }

  ngOnInit() {
    this.subscriptions.push(
      this.route.queryParams.subscribe(params => {
        // set view
        const view = params[PARAM_VIEW];
        if(view && view in View) {
          this.currentView.set(view as View);
        }
        // set election
        const electionUuid = params[PARAM_ELECTION] as string ?? localStorage.getItem(LOC_STORAGE_ELECTION_UUID);
        if(electionUuid) {
          this.election = { uuid: electionUuid, name: '' };
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
