import { BigNumberInBase } from '@injectivelabs/utils';
import { MsgExecuteContract, MsgBroadcasterWithPk } from '@injectivelabs/sdk-ts'
import { Network } from '@injectivelabs/networks'
import { config } from "dotenv";
import { PrivateKey } from '@injectivelabs/sdk-ts'
import { getAddressFromMnemomic } from './get_address';

config();
(async () => {
  const mnemonic = process.env.MNEMONIC
  console.log("🚀 ~ mnemonic:", mnemonic)
  const privateKey = PrivateKey.fromMnemonic(mnemonic!)

  const injectiveAddress = 'inj1z6sccypszye9qke2w35m3ptmj7c4tjr2amedyf'
  // const recipientAddress = 'inj1kcfx3fpqj5j9v8s2jeg7qdpjc43487pqecegan'
  const recipientAddress = getAddressFromMnemomic(process.env.MNEMONIC_DUYNT_3!);
  const contractAddress = process.env.CW_20_CONTRACT!
  const amount = new BigNumberInBase(10).toWei(18).toFixed();
  
  const msg = MsgExecuteContract.fromJSON({
    contractAddress,
    sender: injectiveAddress,
    msg: {
      transfer: {
        recipient: recipientAddress,
        amount
      }
    },
  })
  console.log("🚀 ~ msg:", msg)

  try {
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