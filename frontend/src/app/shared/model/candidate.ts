import {Group} from './group';
import {LocalGroup} from './local-group';

export interface Candidate {
  uuid: string;
  name: string;
  desc: string;
  localGroup: LocalGroup;
}

export interface Elective extends Candidate {
  representedGroups: Map<Group, number>;
}
