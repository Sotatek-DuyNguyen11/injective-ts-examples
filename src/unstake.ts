import { BigNumberInBase } from '@injectivelabs/utils';
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
      
        const stakingContract = process.env.STAKING_CONTRACT!;

        const amount = new BigNumberInBase(8).toWei().toFixed();

        console.log('amount: ', amount);

        const msg = MsgExecuteContract.fromJSON({
            contractAddress: stakingContract,
            sender,
            msg: {
                unstake: {
                    staked_id: '214531585157879364628543231',
                    amount: '10000000000000',
                    signature: '3704471aba2d3422767412e184f101bf04242f584a863eef82afe532f590c36c4898516824af11cc25a46ef0f71996334c1deb0e8162f586139ff877e9422960'
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