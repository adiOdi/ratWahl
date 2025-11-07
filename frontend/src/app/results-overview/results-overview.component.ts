import {Component, ViewChild} from '@angular/core';
import {ResultsResourceService} from './results-resource.service';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {ParticipationComponent} from './participation/participation.component';
import {ResultsComponent} from './results/results.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {AboutComponent} from './about/about.component';
import {MatToolbar} from '@angular/material/toolbar';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';

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
  providers: [ResultsResourceService],
  templateUrl: './results-overview.component.html',
  styleUrl: './results-overview.component.scss'
})
export class ResultsOverviewComponent {
  elections = ['Beispiel-Wahl 1', 'Beispiel-Wahl 2'];
  election: string = this.elections[0];

  view: View = 'participation';

  menuButtonIcon = 'arrow_drop_down';
}
