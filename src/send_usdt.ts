import { BigNumberInBase } from '@injectivelabs/utils';
import { MsgBroadcasterWithPk, MsgSend } from '@injectivelabs/sdk-ts'
import { Network } from '@injectivelabs/networks'
import { PrivateKey } from '@injectivelabs/sdk-ts'
import { config } from "dotenv";
config();

(async () => {
  try {
    const mnemonic = process.env.MNEMONIC
    const privateKey = PrivateKey.fromMnemonic(mnemonic!)
    console.log("🚀 ~ privateKey:", privateKey)

    const sender = privateKey.toAddress().toBech32();
    console.log("🚀 ~ sender:", sender)
    
    const recipientAddress = 'inj1zrr8d7z44vg04lxg4rkr4wyfn7mqd3sdsxrz2c' 

    const amount = {
        denom: 'peggy0x87aB3B4C8661e07D6372361211B96ed4Dc36B1B5',
        amount: new BigNumberInBase(5).toWei(6).toString()
      }
      const msg = MsgSend.fromJSON({
        amount,
        srcInjectiveAddress: sender,
        dstInjectiveAddress: recipientAddress
      });
      
      const txHash = await new MsgBroadcasterWithPk({
        privateKey,
        network: Network.Testnet
      }).broadcast({
        msgs: msg
      })
      
      console.log(txHash)
  } catch (error: any) {
    console.error('Transaction failed:', error)
  }
})();