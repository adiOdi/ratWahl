function hash(input: string) {
  return input + "hash";
}

interface Key {
  key_id: string;
  key: string;
  signed_by: string;
  hash: string;
}

let keys: Key[] = [
  { key_id: "root", key: "pass1", signed_by: "root", hash: "" },
];

interface SignedToken {
  key_id: string;
  token: string;
  hash: string;
}
function find_key(key_id: string): Key | undefined {
  return keys.find((key: Key) => key.key_id === key_id);
}
function sign_token(key_id: string, token: string): SignedToken {
  const key = find_key(key_id);
  if (!key) {
    throw new Error("Key not found!");
  }
  return {
    key_id,
    hash: hash(key.key + token),
    token,
  };
}

function sign_key(
  key_id: string,
  key: string,
  new_key_id: string,
  new_key: string
): void {
  const currentKey = find_key(key_id);
  if (!currentKey) {
    throw new Error("Key not found!");
  }
  if (new_key_id === "root") {
    throw new Error("You cannot add a root key");
  }
  keys.push({
    key_id: new_key_id,
    key: new_key,
    signed_by: key_id,
    hash: hash(key + new_key_id),
  });
}

function check_token(signed_token: SignedToken): boolean {
  const token = find_key(signed_token.key_id);
  if (!token) {
    throw new Error("Key not found!");
  }
  return (
    signed_token.hash === hash(token.key + signed_token.token)
  );
}

function check_key(key_id: string): boolean {
  if (key_id === "root") {
    return true;
  }
  const key = find_key(key_id);
  if (!key) {
    throw new Error("Key not found!");
  }
  return (
    key.hash === hash(find_key(key.signed_by)?.key + key_id)
  );
}

function key_exists(key_id: string): boolean {
  return keys.some((key: Key) => key.key_id === key_id);
}
