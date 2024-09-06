import { MsgExecuteContract, MsgBroadcasterWithPk } from '@injectivelabs/sdk-ts'
import { Network } from '@injectivelabs/networks'
import { PrivateKey } from '@injectivelabs/sdk-ts'
import { config } from "dotenv";
config();

(async () => {
  try {
    // inj1qwqal6egl9r45nn0433z6xsaz60d5m5v6tjhug MENEMONIC_3
    // inj1z6sccypszye9qke2w35m3ptmj7c4tjr2amedyf
    const mnemonic = process.env.MNEMONIC
    const privateKey = PrivateKey.fromMnemonic(mnemonic!)

    const sender = privateKey.toAddress().toBech32();
    console.log('sender: ', sender);
    
    // const fundFactoryContract = process.env.FUND_FACTORY!
    
    const msg = MsgExecuteContract.fromJSON({
      contractAddress: 'inj1ygcvq2vzldwq0vr7mr0ha3cgjkhe5q8ahfckhw',
      sender,
      msg: {
        change_vault_manager: {
            new_vault_manager: "inj1qwqal6egl9r45nn0433z6xsaz60d5m5v6tjhug",
        },
      },
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