export interface LocalGroup {
  uuid: string;
  name: string;
  tokenCreated: number;
  voted: number;
}

export function localGroup(uuid: string, name: string): LocalGroup {
  const tokenCreated = Math.floor(Math.random() * 24) + 1;
  return { uuid, name, tokenCreated, voted: Math.random() * tokenCreated };
}
