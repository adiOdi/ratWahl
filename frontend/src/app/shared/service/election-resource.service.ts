import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Candidate, Elective} from '../model/candidate';
import {Election, ElectionMetadata, ElectionResult} from '../model/election';
import {group, Group} from '../model/group';
import {localGroup, LocalGroup} from '../model/local-group';

@Injectable({ providedIn: 'root' })
export class ElectionResourceService {

  private readonly _localGroups: LocalGroup[] = [
    localGroup('00ee335d-e89a-4314-a2af-4cdb158a5e48', 'Wien'),
    localGroup('65be83a9-f824-4b11-a3d4-898c752aed09', 'Graz'),
    localGroup('448a9a7f-3ed4-4615-913b-28f85dbbf6b0', 'Linz'),
    localGroup('a9d9ed0b-5b07-488b-a9e4-2e4b92578f21', 'Innsbruck'),
  ];

  private readonly _groups: Group[] = [
    group('65f38969-873a-48ce-a6c1-4d8b97762a2a','Landbewohner*in'),
    group('f9e2af7f-c697-4d4c-b469-1ff23a43559a', 'Landwirtschaft','Landwirt*in bzw. in der Landwirtschaft tätig'),
    group('a4f3ce56-ef7e-4941-9f99-b704e7f77d65', 'Arbeiterschaft'),
    group('c4940c4e-f9f2-44ed-87a5-fd68fe1ff6c3', 'Gesundheitliche Besonderheiten', 'Erkrankung, sichtbare und nicht sichtbare Behinderungen'),
    group('8b8d10c6-bb43-457b-94e2-da8a98e5f8c3', 'unter 30 Jahre'),
    group('f37d7362-ba8a-4c93-858a-75908e3f7490', '30-65 Jahre'),
    group('95387036-b7f3-47b6-9209-b133445e5527', 'über 65 Jahre'),
    group('4f0e7294-f4ae-42e1-a70a-f48b4d8d6a20', 'FLINTA*', 'Frauen, Lesben, intergeschlechtliche, nicht-binäre, transgeschlechtliche und agender Person'),
    group('63844cd6-9a41-46da-a4d6-3349407661fb', 'BIPoC', 'Black, Indigenous and other People of Color'),
    group('0e7cd2c0-189d-442f-a5c3-06dd1e0a6b53', 'Ausländer', 'Keine österreichische Staatsbürgerschaft und/oder Migrationshintergrund (Name muss evtl. noch bearbeitet werden)'),
    group('e8b41d8d-bf6d-4ce4-b968-100d0732ce99', 'Arm', 'Armutsgefährdet oder Armutsbetroffen'),
    group('00ee335d-e89a-4314-a2af-4cdb158a5e48', 'Betreuungs-, Pflegeverpflichtungen', 'Z.B. Kinder, alte Menschen, Menschen mit Behinderung'),
  ];
  private readonly _candidates: Candidate[] = [
    {
      uuid: 'a54b75e9-1135-46a8-a615-fbfa4f4ac785',
      name: 'Chris Hofmann',
      desc: 'I am #1',
      localGroup: this._localGroups.find(g => g.name === 'Graz')!,
    },
    {
      uuid: 'c5c50c06-2537-4788-a77a-06205f445ad2',
      name: 'Hanna Auer',
      desc: 'Twice as good',
      localGroup: this._localGroups.find(g => g.name === 'Linz')!,
    },
    {
      uuid: 'e3fcaeef-cf79-4623-9bb6-e4da4c115720',
      name: 'Daniela Swoboda',
      desc: 'Three\'s a charm',
      localGroup: this._localGroups.find(g => g.name === 'Innsbruck')!,
    },
    {
      uuid: '318951f4-1f29-476a-9b49-a7d0dc52783f',
      name: 'Bernhard Masburger',
      desc: 'Last but not least',
      localGroup: this._localGroups.find(g => g.name === 'Wien')!,
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
  ];

  localGroups(): Observable<LocalGroup[]> {
    return of(this._localGroups);
  }

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
