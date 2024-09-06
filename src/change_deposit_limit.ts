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
    
    const fundIntanceContract = process.env.FUND_INSTANCE!
    
    const msg = MsgExecuteContract.fromJSON({
      contractAddress: fundIntanceContract,
      sender,
      msg: {
        change_deposit_limits: {
            new_min_deposit_amount: "100",
            new_max_deposit_amount: "100000000000000"
        },
      },
    //   funds: {
    //     denom: 'inj',
    //     amount: '1000000000000000000'
    //   }
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