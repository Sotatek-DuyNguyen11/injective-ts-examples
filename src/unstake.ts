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

        // const recipientAddress = process.env.STAKING_CONTRACT // staking_contract is recipient
        const stakingContract = process.env.STAKING_CONTRACT!;
        // const cw20 = process.env.CW_20_CONTRACT!

        const amount = new BigNumberInBase(0.002345).toWei().toFixed();

        console.log('amount: ', amount);

        const msg = MsgExecuteContract.fromJSON({
            contractAddress: stakingContract,
            sender,
            msg: {
                unstake: {
                    staked_id: '123123123',
                    amount,
                    signature: ''
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