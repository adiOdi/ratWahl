import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Candidate, Elective} from '../model/candidate';
import {Election, ElectionMetadata, ElectionResult} from '../model/election';
import {group, Group, LocalGroup} from '../model/group';

@Injectable({ providedIn: 'root' })
export class ElectionResourceService {

  private readonly _groups: (Group | LocalGroup)[] = [
    group('65f38969-873a-48ce-a6c1-4d8b97762a2a','Wien', true),
    group('f9e2af7f-c697-4d4c-b469-1ff23a43559a','Graz', true),
    group('a4f3ce56-ef7e-4941-9f99-b704e7f77d65', 'Linz', true),
    group('c4940c4e-f9f2-44ed-87a5-fd68fe1ff6c3', 'Queer'),
    group('8b8d10c6-bb43-457b-94e2-da8a98e5f8c3', 'Städtisch'),
    group('f37d7362-ba8a-4c93-858a-75908e3f7490', 'Ländlich'),
  ];
  private readonly _candidates: Candidate[] = [
    {
      uuid: 'a54b75e9-1135-46a8-a615-fbfa4f4ac785',
      name: 'Chris Hofmann',
      desc: 'I am #1',
      localGroup: this._groups.find(g => g.name === 'Graz') as LocalGroup,
    },
    {
      uuid: 'c5c50c06-2537-4788-a77a-06205f445ad2',
      name: 'Hanna Auer',
      desc: 'Twice as good',
      localGroup: this._groups.find(g => g.name === 'Wien') as LocalGroup,
    },
    {
      uuid: 'e3fcaeef-cf79-4623-9bb6-e4da4c115720',
      name: 'Daniela Swoboda',
      desc: 'Three\'s a charm',
      localGroup: this._groups.find(g => g.name === 'Linz') as LocalGroup,
    },
    {
      uuid: '318951f4-1f29-476a-9b49-a7d0dc52783f',
      name: 'Bernhard Masburger',
      desc: 'Last but not least',
      localGroup: this._groups.find(g => g.name === 'Graz') as LocalGroup,
    },
  ];
  private readonly _elections: Election[] = [
    {
      uuid: 'b9bd82b4-a1e5-4563-9554-f85b9d0c3d6e',
      name: 'Beispiel Wahl 1',
      candidates: this._candidates,
      groups: this._groups,
    },
    {
      uuid: '52346fcc-e741-4fd2-8988-9f581c23a731',
      name: 'Beispiel Wahl 2',
      candidates: this._candidates,
      groups: this._groups,
    },
  ]

  /**
   * GET list of elections
   */
  elections(): Observable<ElectionMetadata[]> {
    return of(this._elections.map(e => ({ uuid: e.uuid, name: e.name })));
  }

  /**
   * GET election data
   */
  election(uuid: string): Observable<Election> {
    const e = this._elections.find(e => e.uuid === uuid);
    if(!e) {
      throw new Error('unknown uuid: ' + uuid);
    }
    if(e.uuid === '52346fcc-e741-4fd2-8988-9f581c23a731') {
      e.result = createResult(e);
    }
    return of(e);
  }

  /**
   * GET if user is allowed to vote (i.e. hasn't already voted, token was revoked, etc)
   */
  isAllowed(): Observable<boolean> {
    return of(true);
  }
}

function createResult(election: Election): ElectionResult {
  const candidates = [...election.candidates];
  for(let i=0; i < election.candidates.length * .33 - 1; i++) {
    candidates.splice(Math.floor(Math.random() * candidates.length), 1);
  }
  const electives = candidates.map(e => {
    const representedGroups = new Map<Group, number>();
    election.groups.forEach(g => representedGroups.set(g, Math.floor(Math.random() * 101)));
    return { ...e, representedGroups } as unknown as Elective;
  });
  const overallRepresentation = new Map<Group, number>();
  electives.forEach(e => e.representedGroups.forEach((val, key) => {
    const cur = overallRepresentation.get(key);
    overallRepresentation.set(key, cur ? Math.max(cur, val) : val);
  }));
  return { electives, overallRepresentation };
}
