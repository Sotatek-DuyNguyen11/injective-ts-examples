import { MsgExecuteContract, MsgBroadcasterWithPk } from '@injectivelabs/sdk-ts'
import { Network } from '@injectivelabs/networks'
import { PrivateKey } from '@injectivelabs/sdk-ts'
import { config } from "dotenv";
config();

(async () => {
  try {
    const mnemonic = process.env.MNEMONIC
    const privateKey = PrivateKey.fromMnemonic(mnemonic!)

    const sender = privateKey.toAddress().toBech32();
    console.log('sender: ', sender);
    
    const msg = MsgExecuteContract.fromJSON({
      contractAddress: 'inj1ff9ux5kc9tx534zjzlfttwqhe0y2v97acgpj6p',
      sender,
      msg: {
        withdraw:{
            amount: '900000'
        }
      },
      funds: {
        denom: 'factory/inj1ff9ux5kc9tx534zjzlfttwqhe0y2v97acgpj6p/duynt-1',
        amount: '900000'
      }
    })
    console.log("🚀 ~ msg:", msg)

    const txHash = await new MsgBroadcasterWithPk({
      privateKey,
      network: Network.Testnet,
    }).broadcast({
      msgs: [msg],
    })

    console.log('Transaction hash:', txHash)
  } catch (error: any) {
    console.error('Transaction failed:', error.message)
  }
})();