import {Component, computed, inject} from '@angular/core';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';
import {MatSlideToggle, MatSlideToggleChange} from '@angular/material/slide-toggle';
import {CustomValidators} from '../shared/CustomValidators';
import {NgClass} from '@angular/common';
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from '@angular/material/list';
import {ElectionResourceService} from '../shared/service/election-resource.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {of, switchMap} from 'rxjs';
import {LOC_STORAGE_ELECTION_UUID, LOC_STORAGE_GROUP_UUID} from '../shared/constants';
import {MatToolbar} from '@angular/material/toolbar';
import {NAV_RESULTS} from '../app.routes';
import {View} from '../results-overview/results-overview.component';

@Component({
  selector: 'app-election',
  imports: [
    MatStepper,
    MatStep,
    MatStepLabel,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButton,
    MatStepperNext,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatIconButton,
    MatIcon,
    MatDivider,
    MatSlideToggle,
    NgClass,
    MatList,
    MatListItem,
    MatListSubheaderCssMatStyler,
    MatStepperPrevious,
    MatToolbar,
  ],
  templateUrl: './election.component.html',
  styleUrl: './election.component.scss',
})
export class ElectionComponent {
  view: typeof View = View;

  private electionResource = inject(ElectionResourceService);

  _formBuilder = inject(FormBuilder);

  groupsFormGroup = this._formBuilder.group({
    groups: [[] as string[], CustomValidators.arrayNotEmpty]
  });
  votesFormGroup = this._formBuilder.group({
    votes: [[] as string[], CustomValidators.arrayNotEmpty]
  });

  election = toSignal(of(localStorage.getItem(LOC_STORAGE_ELECTION_UUID)).pipe(
    switchMap(uuid => {
      if(!uuid) {
        throw new Error('No election found');
      }
      return this.electionResource.election(uuid);
    }),
  ));
  candidates = computed(() =>
    this.election()?.candidates || []);
  showDesc = computed(() =>
    new Map(this.candidates().map(c => [c.uuid, false])));
  localGroup = computed(() =>
    this.election()?.groups.find(g => g.uuid === localStorage.getItem(LOC_STORAGE_GROUP_UUID)));
  voteLocked = computed(() => !!this.election()?.result);

  private _selectedGroups: string[] = [];
  private _votedCandidates: string[] = [];

  get selectedGroups(): string[] {
    return this._selectedGroups
  }

  get votedCandidates(): string[] {
    return this._votedCandidates;
  }

  set selectedGroups(patch: string[]) {
    this.groupsFormGroup.patchValue({ groups: [patch] });
    const val = this.groupsFormGroup.get('groups')?.value;
    this._selectedGroups = val ? val[0] as unknown as string[] : [];
  }

  set votedCandidates(patch: string[]) {
    this.votesFormGroup.patchValue({ votes: [patch] });
    const val = this.votesFormGroup.get('votes')?.value;
    this._votedCandidates = val ? val[0] as unknown as string[] : [];
  }

  groupToggled(event: MatSlideToggleChange) {
    if(!event.checked) {
      this.selectedGroups = this.selectedGroups.filter(group => group !== event.source.name);
    } else if(event.source.name && !this.selectedGroups.includes(event.source.name)) {
      this.selectedGroups = [ ...this.selectedGroups, event.source.name ];
    }
  }

  voteToggled(event: MatSlideToggleChange) {
    if(!event.checked) {
      this.votedCandidates = this.votedCandidates.filter(vote => vote !== event.source.name);
    } else if(event.source.name && !this.votedCandidates.includes(event.source.name)) {
      this.votedCandidates = [ ...this.votedCandidates, event.source.name ];
    }
  }

  submit() {
    console.log('submit vote', this.selectedGroups, this.votedCandidates);
    // TODO submit
  }

  protected readonly NAV_RESULTS = NAV_RESULTS;
}
