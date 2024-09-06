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

    // const FUND_FACTORY = process.env.FUND_FACTORY!

    const msg = MsgExecuteContract.fromJSON({
      contractAddress: 'inj1ygcvq2vzldwq0vr7mr0ha3cgjkhe5q8ahfckhw',
      sender,
      msg: {
        update_vault_fee: {
          new_management_fee: {
            share: "0.04"
          },
          new_perfomance_fee: {
            share: "0.04"
          },
          new_volume_fee: {
            share: "0.04"
          },
          new_entrance_fee: {
            share: "0.04"
          },
          new_exit_fee: {
            share: "0.04"
          },
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
    console.error('Transaction failed:', error)
  }
})();