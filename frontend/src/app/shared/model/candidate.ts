export interface Candidate {
  uuid: string;
  name: string;
  desc: string;
  collective: Collective;
}

export type Collective = 'Graz' | 'Wien' | 'Linz';
