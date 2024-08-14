import { MsgExecuteContract, MsgBroadcasterWithPk } from '@injectivelabs/sdk-ts'
import { Network } from '@injectivelabs/networks'
import { PrivateKey } from '@injectivelabs/sdk-ts'
import { config } from "dotenv";
config();

(async () => {
  const injectiveAddress = 'inj1z6sccypszye9qke2w35m3ptmj7c4tjr2amedyf'
  const recipientAddress = 'inj1sqrfhf9z3k2udx2lqhj8v6v0kr0dp49nfnfmhx'
  const contractAddress = 'inj1uxkmrgz9rrunxsewlzhq6dl2fkn8q8llm4q9hp'

  
  const msg = MsgExecuteContract.fromJSON({
    contractAddress,
    sender: injectiveAddress,
    msg: {
      transfer: {
        recipient: recipientAddress,
        amount: "100000"
      }
    },
  })
  console.log("🚀 ~ msg:", msg)

  const mnemonic = process.env.MNEMONIC
  const privateKey = PrivateKey.fromMnemonic(mnemonic!)

  try {
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