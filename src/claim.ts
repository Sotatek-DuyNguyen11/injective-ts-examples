import { BigNumberInBase } from '@injectivelabs/utils';
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
      
        const stakingContract = process.env.STAKING_CONTRACT!;

        const amount = new BigNumberInBase(0.00001).toWei(6).toFixed();

        console.log('amount: ', amount);

        const msg = MsgExecuteContract.fromJSON({
            contractAddress: stakingContract,
            sender,
            msg: {
                claim_reward: {
                    amount,
                    signature: '6defec08614924d1e603ee528f1d20e637894d9d73c0e5a9b1aed713733ecba959b31a4967cd012f92e1968ee8db7c1943999b825009ac3e9456ff196838d4b2'
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