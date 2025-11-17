import {Candidate, Elective} from './candidate';
import {Group} from './group';

export interface Election extends ElectionMetadata {
  candidates: Candidate[];
  groups: Group[];
  result?: ElectionResult;
}

export interface ElectionMetadata {
  uuid: string;
  name: string;
}

export interface ElectionResult {
  electives: Elective[];
  overallRepresentation: Map<Group, number>;
}
