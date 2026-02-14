import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Candidate} from '../shared/model/candidate';

@Injectable()
export class ElectionResourceService {

  /**
   * GET groups to choose from
   */
  groups(): Observable<string[]> {
    return of(['Wien', 'Graz', 'Linz', 'Queer', 'Städtisch', 'Ländlich']);
  }

  /**
   * GET candidates
   */
  candidates(): Observable<Candidate[]> {
    return of([
      { uuid: 'a54b75e9-1135-46a8-a615-fbfa4f4ac785', name: 'Cand1', desc: 'I am #1', collective: 'Graz' },
      { uuid: 'c5c50c06-2537-4788-a77a-06205f445ad2', name: 'Cand2', desc: 'Twice as good', collective: 'Wien' },
      { uuid: 'e3fcaeef-cf79-4623-9bb6-e4da4c115720', name: 'Cand3', desc: 'Three\'s a charm', collective: 'Linz' },
      { uuid: '318951f4-1f29-476a-9b49-a7d0dc52783f', name: 'Cand4', desc: 'Last but not least', collective: 'Graz' },
    ]);
  }

  /**
   * GET if user is allowed to vote (i.e. hasn't already voted, token was revoked, etc)
   */
  isAllowed(): Observable<boolean> {
    return of(true);
  }
}
