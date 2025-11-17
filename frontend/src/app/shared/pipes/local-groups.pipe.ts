import {Group, LocalGroup} from '../model/group';
import {Pipe, PipeTransform} from '@angular/core';

export function localGroups(groups: Group[]) {
  return groups.filter(isLocalGroup) as LocalGroup[];
}

export function isLocalGroup(group: Group): boolean {
  return 'tokenCreated' in group;
}

@Pipe({
  name: 'localGroups',
})
export class LocalGroupsPipe implements PipeTransform {
  transform(groups: Group[]): LocalGroup[] {
    return localGroups(groups);
  }
}
