import { privateEncrypt, publicDecrypt } from 'node:crypto';
import { createClient } from 'redis';
const client = createClient();
await client.connect();

async function add_token(election_id: string, token: string, private_key: string, signer_id: string): Promise<boolean> {
  if (await client.hGet(election_id, token)) {
    return false;
  }
  // TODO: only do that if the private key is valid
  await client.hSet(election_id, token, sign_token(token, private_key, signer_id));
  return true;
}

interface Signature {
  signer_id: string,
  signature: string
}

interface TokenData {
  used: boolean,
  signature: Signature,
  vote_string: string
}

async function use_token(election_id: string, token: string, vote_data: string): Promise<boolean> {
  const token_value = await client.hGet(election_id, token);
  if (token_value) {
    const token_data = JSON.parse(token_value) as TokenData;
    if (!token_data.used) {
      if (await verify_token_signature(token, token_data.signature)) {
        token_data.used = true; // mark as used
        token_data.vote_string = vote_data; // update vote data
        client.hSet(election_id, token, JSON.stringify(token_data));
        return true
      }
    }
  }
  return false
}
interface PublicKey {
  signed_by: string,
  signature: string,
  public_key: string
}

async function verify_key(key: PublicKey): Promise<boolean> {
  if (key.signed_by === "root") {
    return true;
  }
  const key_data_string = await client.hGet("public_keys", key.signed_by);
  if (key_data_string) {
    const key_data = JSON.parse(key_data_string) as PublicKey;
    if (await verify_key(key_data)) {
      return key.signature === key_data.public_key + key.public_key; // TODO: real verification
    }
  }
  return false;
}

async function add_public_key(new_pub_key: string, new_id: string, signer_private_key: string, signed_by: string) {
  if (signed_by === "root") {
    return false;
  }
  const pub_key: PublicKey = {
    signed_by: signed_by,
    signature: signer_private_key + new_pub_key, // TODO: real signing
    public_key: new_pub_key
  };
  client.hSet("public_keys", new_id, JSON.stringify(pub_key));
}

add_public_key("adri's_password", "adri", "root_password", "root");

const election_id = "e1"
await client.hGet(election_id, "token").then(console.log);
await add_token(election_id, "token", "adri's_password", "adri").then(console.log);
await client.hGet(election_id, "token").then(console.log);
await use_token(election_id, "token", "vote_data").then(console.log);
await client.hGet(election_id, "token").then(console.log);

async function verify_token_signature(token: string, signature: Signature): Promise<boolean> {
  const pub_key_string = await client.hGet("public_keys", signature.signer_id);
  if (!pub_key_string)
    return false;
  const pub_key = JSON.parse(pub_key_string) as PublicKey;
  if (await verify_key(pub_key)) {
    return signature.signature == pub_key.public_key + token; // TODO: replace with actual verification logic
  }
  return false;
}

function sign_token(token: string, private_key: string, signer_id: string): string {
  const signature: Signature = {
    signer_id: signer_id,
    signature: private_key + token // TODO: replace with actual signing logic
  };
  const token_data: TokenData = {
    used: false,
    signature: signature,
    vote_string: ""
  };
  return JSON.stringify(token_data);
}

await client.quit();
export { add_token, use_token };