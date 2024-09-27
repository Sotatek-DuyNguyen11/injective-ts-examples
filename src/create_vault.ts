import { MsgExecuteContract, MsgBroadcasterWithPk } from '@injectivelabs/sdk-ts'
import { Network } from '@injectivelabs/networks'
import { PrivateKey } from '@injectivelabs/sdk-ts'
import { config } from "dotenv";
config();

(async () => {
  try {
    const mnemonic = process.env.MNEMONIC_DUYNT_3
    const privateKey = PrivateKey.fromMnemonic(mnemonic!)

    const sender = privateKey.toAddress().toBech32();
    console.log('sender: ', sender);
    
    const fundFactoryContract = process.env.FUND_FACTORY!
    
    const msg = MsgExecuteContract.fromJSON({
      contractAddress: fundFactoryContract,
      sender,
      msg: {
        create_vault: {
            name: "duynt-111111",
            symbol: "duynt-111111",
            denomination_asset: "peggy0x87aB3B4C8661e07D6372361211B96ed4Dc36B1B5",
            vault_manager: sender,
            fee_recipient: sender,
            vault_fees: {
                management_fee: {
                    share: "0.02"
                },
                perfomance_fee: {
                    share: "0.02"
                },
                volume_fee: {
                    share: "0.02"
                },
                entrance_fee: {
                    share: "0.02"
                },

                exit_fee: {
                    share: "0.02"
                }
            },
            is_enabled_whitelist: false,
            withdraw_lockup_period: "64",
            min_deposit_amount: "1000000",
            max_deposit_amount: "10000000000"
        },
      },
      funds: {
        denom: 'inj',
        amount: '1000000000000000000'
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