import { MsgExecuteContract, MsgBroadcasterWithPk } from '@injectivelabs/sdk-ts'
import { Network } from '@injectivelabs/networks'
import { PrivateKey } from '@injectivelabs/sdk-ts'
import { config } from "dotenv";
config();

(async () => {
  try {
    const mnemonic = process.env.MNEMONIC_DUYNT_3
    const privateKey = PrivateKey.fromMnemonic(mnemonic!)
    console.log("🚀 ~ privateKey:", privateKey)

    const sender = privateKey.toAddress().toBech32();
    console.log("🚀 ~ sender:", sender)
    
    const FUND_FACTORY = process.env.FUND_FACTORY!

    console.log(FUND_FACTORY);

    const msg = MsgExecuteContract.fromJSON({
      contractAddress: 'inj1fqf0x9uqvjs2qy86r6dxqcgj0w660l6wfxw4p7',
      sender,
      msg: {
        update_whitelisted_addresses: {
            addresses: ['inj1fqf0x9uqvjs2qy86r6dxqcgj0w660l6wfxw4p7', 'inj1fqf0x9uqvjs2qy86r6dxqcgj0w660l6wfxw4p7'],
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