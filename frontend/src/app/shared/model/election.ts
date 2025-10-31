import {Candidate} from './candidate';
import {Group} from './group';
import {LocalGroupParticipation} from '../../results-overview/participation/participation.component';

export interface Election {
  uuid: string;
  name: string;
  groups: Group[];
  candidates: Candidate[];
  tokenByLocalGroup?: LocalGroupParticipation[];
  result?: ElectionResult;
}

export interface ElectionResult {
  electives: Candidate[];
  representation: {};
}

export interface ElectionMetadata {
  uuid: string;
  name: string;
}

export function localGroups(groups: Group[]) {
  return groups.filter(g => g.isLocalGroup);
}
