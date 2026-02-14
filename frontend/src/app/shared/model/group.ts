export interface Group {
  uuid: string;
  name: string;
  description: string;
  members: number; // equals people who registered at part of this group
}

export function group(uuid: string, name: string, description: string = ''): Group {
  return { uuid, name, description, members: Math.floor(Math.random() * 24) + 1 };
}
