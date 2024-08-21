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

        const amount = new BigNumberInBase(0.002345).toWei().toFixed();

        console.log('amount: ', amount);

        const msg = MsgExecuteContract.fromJSON({
            contractAddress: stakingContract,
            sender,
            msg: {
                unstake: {
                    staked_id: '12312312',
                    amount,
                    signature: '8a21ceb8ca6b6bb586b5465298aa94c715edf8ea950931e52a230fa74c54a85278308b16c3b4f2c555b677c4ac1e37ff68825ec4bd9c76a79d757bcc7810cf2b'
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