import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Candidate} from '../model/candidate';
import {Election, ElectionMetadata, localGroups} from '../model/election';
import {Group} from '../model/group';
import {LocalGroupParticipation} from '../../results-overview/participation/participation.component';

@Injectable({ providedIn: 'root' })
export class ElectionResourceService {

  private readonly _groups: Group[] = [
    { uuid: '65f38969-873a-48ce-a6c1-4d8b97762a2a', name: 'Wien', isLocalGroup: true },
    { uuid: 'f9e2af7f-c697-4d4c-b469-1ff23a43559a', name: 'Graz', isLocalGroup: true },
    { uuid: 'a4f3ce56-ef7e-4941-9f99-b704e7f77d65', name: 'Linz', isLocalGroup: true },
    { uuid: 'c4940c4e-f9f2-44ed-87a5-fd68fe1ff6c3', name: 'Queer', isLocalGroup: false },
    { uuid: '8b8d10c6-bb43-457b-94e2-da8a98e5f8c3', name: 'Städtisch', isLocalGroup: false },
    { uuid: 'f37d7362-ba8a-4c93-858a-75908e3f7490', name: 'Ländlich', isLocalGroup: false },
  ];
  private readonly _candidates: Candidate[] = [
    {
      uuid: 'a54b75e9-1135-46a8-a615-fbfa4f4ac785',
      name: 'Chris Hofmann',
      desc: 'I am #1',
      localGroup: { uuid: 'f9e2af7f-c697-4d4c-b469-1ff23a43559a', name: 'Graz', isLocalGroup: true },
    },
    {
      uuid: 'c5c50c06-2537-4788-a77a-06205f445ad2',
      name: 'Hanna Auer',
      desc: 'Twice as good',
      localGroup: { uuid: '65f38969-873a-48ce-a6c1-4d8b97762a2a', name: 'Wien', isLocalGroup: true }
    },
    {
      uuid: 'e3fcaeef-cf79-4623-9bb6-e4da4c115720',
      name: 'Daniela Swoboda',
      desc: 'Three\'s a charm',
      localGroup: { uuid: 'a4f3ce56-ef7e-4941-9f99-b704e7f77d65', name: 'Linz', isLocalGroup: true }
    },
    {
      uuid: '318951f4-1f29-476a-9b49-a7d0dc52783f',
      name: 'Bernhard Masburger',
      desc: 'Last but not least',
      localGroup: { uuid: 'f9e2af7f-c697-4d4c-b469-1ff23a43559a', name: 'Graz', isLocalGroup: true }
    },
  ];
  private readonly _elections: Election[] = [
    {
      uuid: 'b9bd82b4-a1e5-4563-9554-f85b9d0c3d6e',
      name: 'Beispiel Wahl 1',
      groups: this._groups,
      candidates: this._candidates,
      tokenByLocalGroup: localGroups(this._groups).map(g => {
        const tokenCreated = Math.floor(Math.random() * 24) + 1;
        const votes = Math.floor(Math.random() * tokenCreated);
        return { localGroup: g.name, tokenCreated, votes };
      }),
    },
    {
      uuid: '52346fcc-e741-4fd2-8988-9f581c23a731',
      name: 'Beispiel Wahl 2',
      groups: this._groups,
      candidates: this._candidates,
      tokenByLocalGroup: localGroups(this._groups).map(g => {
        const tokenCreated = Math.floor(Math.random() * 24) + 1;
        const votes = Math.floor(Math.random() * tokenCreated);
        return { localGroup: g.name, tokenCreated, votes };
      }),
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
  election(uuid: string): Observable<Election | undefined> {
    return of(this._elections.find(e => e.uuid === uuid));
  }

  /**
   * GET if user is allowed to vote (i.e. hasn't already voted, token was revoked, etc)
   */
  isAllowed(): Observable<boolean> {
    return of(true);
  }
}
