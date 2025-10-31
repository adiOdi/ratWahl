import {Group} from './group';

export interface Candidate {
  uuid: string;
  name: string;
  desc: string;
  localGroup: Group;
  representedGroups?: Map<Group, number>;
}
