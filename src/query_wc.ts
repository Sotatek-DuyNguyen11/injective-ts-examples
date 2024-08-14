import { Secp256k1, Secp256k1Signature, sha256 } from "@cosmjs/crypto";
import { DirectSecp256k1Wallet } from "@cosmjs/proto-signing";
import { encodeSecp256k1Pubkey } from "@cosmjs/amino";
import { toHex, fromHex, fromBase64 } from "@cosmjs/encoding";

function toUint8Array(str: string): Uint8Array {
  return Uint8Array.from(Buffer.from(str, "utf-8"));
}

async function main() {
  const privkey = fromHex("");
  const keypair = await Secp256k1.makeKeypair(privkey);
  const msg = "Test";
  const messageHash = toUint8Array(msg);
  const signature = await Secp256k1.createSignature(messageHash, keypair.privkey);

  // valid
  const ok = await Secp256k1.verifySignature(signature, messageHash, keypair.pubkey);
  console.log("🚀 ~ main ~ signature:", toHex(Secp256k1Signature.fromDer(signature.toDer()).toFixedLength()))
  console.log("\x1b[36m%s\x1b[0m", "keypair.pubkey", toHex(keypair.pubkey));
  console.log("🚀 ~ main ~ ok:", ok)
}

main().catch(console.error);