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
  const mnemonic = process.env.MNEMONIC_DUYNT_3
  const privateKey = PrivateKey.fromMnemonic(mnemonic!)

  const sender = privateKey.toAddress().toBech32();

  console.log('sender: ', sender);
  
  const privkey = fromHex(process.env.FROM_HEX!);
  
  const keypair = await Secp256k1.makeKeypair(privkey);
  
  const staked_id = '214531585157879364628543231';
  const amount = new BigNumberInBase(0.00001).toWei().toFixed();
  console.log('amount: ', amount);

  
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