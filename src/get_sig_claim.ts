import { Secp256k1, Secp256k1Signature, sha256 } from "@cosmjs/crypto";
import { toHex, fromHex } from "@cosmjs/encoding";

function toUint8Array(str: string): Uint8Array {
  return Uint8Array.from(Buffer.from(str, "utf-8"));
}

async function main() {
  const privkey = fromHex("32662cd1962a95331050f45cfa39243c2675abecc8b8ea65a54ca9f9400e71d5");
  const keypair = await Secp256k1.makeKeypair(privkey);
  const msg = "execute_claim_reward: amount = 10000000000000 / user = inj1z6sccypszye9qke2w35m3ptmj7c4tjr2amedyf";
  // const msg = 'Test'
  const messageBytes = toUint8Array(msg);
  const messageHash = sha256(messageBytes);
  
  const signature = await Secp256k1.createSignature(messageHash, keypair.privkey);

  // valid
  const ok = await Secp256k1.verifySignature(signature, messageHash, keypair.pubkey);
  console.log("🚀 ~ main ~ signature:", toHex(Secp256k1Signature.fromDer(signature.toDer()).toFixedLength()))
  console.log("\x1b[36m%s\x1b[0m", "keypair.pubkey", toHex(keypair.pubkey));
  console.log("🚀 ~ main ~ ok:", ok)
}

main().catch(console.error);