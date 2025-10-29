import {Component, inject} from '@angular/core';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Candidate} from '../shared/model/candidate';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';
import {MatSlideToggle, MatSlideToggleChange} from '@angular/material/slide-toggle';
import {CustomValidators} from '../shared/CustomValidators';
import {NgClass} from '@angular/common';
import {MatList, MatListItem, MatListSubheaderCssMatStyler} from '@angular/material/list';

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

  ],
  templateUrl: './election.component.html',
  styleUrl: './election.component.scss',
})
export class ElectionComponent {
  _formBuilder = inject(FormBuilder);

  groupsFormGroup = this._formBuilder.group({
    groups: [[] as string[], CustomValidators.arrayNotEmpty]
  });
  votesFormGroup = this._formBuilder.group({
    votes: [[] as string[], CustomValidators.arrayNotEmpty]
  });

  // TODO get these two arrays from a service
  groups = ['Wien', 'Graz', 'Linz', 'Queer', 'Städtisch', 'Ländlich'];
  candidates: Candidate[] = [
    { uuid: 'a54b75e9-1135-46a8-a615-fbfa4f4ac785', name: 'Cand1', desc: 'I am #1', collective: 'Graz' },
    { uuid: 'c5c50c06-2537-4788-a77a-06205f445ad2', name: 'Cand2', desc: 'Twice as good', collective: 'Wien' },
    { uuid: 'e3fcaeef-cf79-4623-9bb6-e4da4c115720', name: 'Cand3', desc: 'Three\'s a charm', collective: 'Linz' },
    { uuid: '318951f4-1f29-476a-9b49-a7d0dc52783f', name: 'Cand4', desc: 'Last but not least', collective: 'Graz' },
  ];

  showDesc: Map<string, boolean> = new Map(this.candidates.map(c => [c.uuid, false]));

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
  }
}
