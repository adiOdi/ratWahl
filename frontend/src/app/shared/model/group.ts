export interface Group {
  uuid: string;
  name: string;
  members: number; // equals people who registered at part of this group
}

export interface LocalGroup extends Group {
  tokenCreated: number;
}

export function group(uuid: string, name: string, isLocalGroup: boolean = false): Group | LocalGroup {
  const group = { uuid, name };
  if(isLocalGroup) {
    const tokenCreated = Math.floor(Math.random() * 24) + 1;
    const members = Math.floor(Math.random() * tokenCreated);
    return { ...group, members, tokenCreated };
  } else {
    return { ...group, members: Math.floor(Math.random() * 24) + 1 };
  }
}
