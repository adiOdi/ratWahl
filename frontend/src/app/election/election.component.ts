import {Component, inject, OnDestroy, OnInit, signal, Signal, WritableSignal} from '@angular/core';
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
import {ElectionResourceService} from '../shared/service/election-resource.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {map, Subscription} from 'rxjs';
import {Group} from '../shared/model/group';

const dummyElectionUUID = 'b9bd82b4-a1e5-4563-9554-f85b9d0c3d6e';

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
export class ElectionComponent implements OnInit, OnDestroy {
  _formBuilder = inject(FormBuilder);

  groupsFormGroup = this._formBuilder.group({
    groups: [[] as string[], CustomValidators.arrayNotEmpty]
  });
  votesFormGroup = this._formBuilder.group({
    votes: [[] as string[], CustomValidators.arrayNotEmpty]
  });

  groups: Signal<Group[]>;
  candidates: Signal<Candidate[]>;
  voteLocked: WritableSignal<boolean> = signal(true);

  showDesc: Map<string, boolean>;

  private _selectedGroups: string[] = [];
  private _votedCandidates: string[] = [];

  private electionResource = inject(ElectionResourceService);

  private subscriptions: Subscription[] = [];

  constructor() {
    this.groups = toSignal(this.electionResource.election(dummyElectionUUID).pipe(map(e => e?.groups || [])), { initialValue: [] });
    this.candidates = toSignal(this.electionResource.election(dummyElectionUUID).pipe(map(e => e?.candidates || [])), { initialValue: [] });
    this.showDesc = new Map(this.candidates().map(c => [c.uuid, false]));
  }

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

  ngOnInit() {
    this.subscriptions.push(
      this.electionResource.isAllowed().subscribe(isAllowed => this.voteLocked.set(!isAllowed)),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
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
    this.voteLocked.set(true);
    console.log('submit vote', this.selectedGroups, this.votedCandidates);
    // TODO submit
  }
}
