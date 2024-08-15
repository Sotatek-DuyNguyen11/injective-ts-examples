import { BigNumberInBase } from '@injectivelabs/utils';
import { Secp256k1, Secp256k1Signature, sha256,  } from "@cosmjs/crypto";
import { toHex, fromHex } from "@cosmjs/encoding";
import { PrivateKey } from '@injectivelabs/sdk-ts';
import { config } from "dotenv";
config();
function toUint8Array(str: string): Uint8Array {
  return Uint8Array.from(Buffer.from(str, "utf-8"));
}

async function main() {
  const mnemonic = process.env.MNEMONIC
  const privateKey = PrivateKey.fromMnemonic(mnemonic!)

  const sender = privateKey.toAddress().toBech32();

  const privkey = fromHex("e3a1f7b0c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0");
  
  const keypair = await Secp256k1.makeKeypair(privkey);
  
  const staked_id = 'e28b01b52ba04b36076be0602aebdc25';
  const amount = new BigNumberInBase(0.002345).toWei().toFixed();

  
  const msg = `execute_unstake: staked_id = ${staked_id} / amount = ${amount} / user = ${sender}`;
  console.log('msg', msg);
  
  const messageBytes = toUint8Array(msg);
  const messageHash = sha256(messageBytes);
  console.log('messageHash: ', messageHash);


  
  const signature = await Secp256k1.createSignature(messageHash, keypair.privkey);
  console.log('signature: ', signature);
  
  // valid
  const ok = await Secp256k1.verifySignature(signature, messageHash, keypair.pubkey);
  console.log("🚀 ~ main ~ signature:", toHex(Secp256k1Signature.fromDer(signature.toDer()).toFixedLength()))
  console.log("\x1b[36m%s\x1b[0m", "keypair.pubkey", toHex(keypair.pubkey));
  console.log("🚀 ~ main ~ ok:", ok)
}

main().catch(console.error);