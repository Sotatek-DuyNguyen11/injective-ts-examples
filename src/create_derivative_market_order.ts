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

        const msg = MsgExecuteContract.fromJSON({
            contractAddress: 'inj185r4jp5k8peg0kma3ln9j77hmqpn4dqjf5a05g',
            sender,
            msg: {
                create_derivative_market_order:
                {
                    market_id: '0x17ef48032cb24375ba7c2e39f384e56433bcab20cbee9a7357e4cba2eb00abe6',
                    order_type: '2',
                    trigger_price: '0',
                    worst_price: '17520000',
                    quantity: '0.01',
                    margin: '175200',
                }
            },
            // funds: {
            //     denom: 'inj',
            //     amount: '1000000000000000000'
            // }
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