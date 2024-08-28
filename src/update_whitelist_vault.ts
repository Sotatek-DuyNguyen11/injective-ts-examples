import { MsgExecuteContract, MsgBroadcasterWithPk } from '@injectivelabs/sdk-ts'
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
    
    const FUND_FACTORY = process.env.FUND_FACTORY!

    console.log(FUND_FACTORY);

    const msg = MsgExecuteContract.fromJSON({
      contractAddress: 'inj1ygcvq2vzldwq0vr7mr0ha3cgjkhe5q8ahfckhw',
      sender,
      msg: {
        update_whitelisted_addresses: {
            addresses: ['inj1ewp3hlsn3ge6alv33e20um86uyqxz3h0kd779q', 'inj1qwqal6egl9r45nn0433z6xsaz60d5m5v6tjhug'],
            values: [true, true]
        }
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