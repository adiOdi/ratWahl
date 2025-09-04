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
function find_key(key_id: string) {
  const key = keys.find((key: Key) => key.key_id == key_id);
  if (!key) {
    throw "key not found!";
  }
  return key;
}

function sign_token(key_id: string, token: string): SignedToken {
  return {
    key_id: key_id,
    hash: hash(find_key(key_id).key + token),
    token: token,
  };
}

function sign_key(
  key_id: string,
  key: string,
  new_key_id: string,
  new_key: string
) {
  if (find_key(key_id).key != key) {
    throw "wrong key for signing";
  }
  if (new_key_id == "root") {
    throw "you try to add a root key, this is not possible";
  }
  keys.push({
    key_id: new_key_id,
    key: new_key,
    signed_by: key_id,
    hash: hash(key + new_key_id),
  });
}

function check_token(signed_token: SignedToken) {
  return (
    signed_token.hash == hash(keys[signed_token.key_id] + signed_token.token)
  );
}

function check_key(key_id: string): boolean {
  if (key_id == "root") {
    return true;
  }
  const key = find_key(key_id);
  check_key(key.signed_by);
  return key.hash == hash(find_key(key.signed_by).key + key_id);
}
