import { MsgExecuteContract, MsgBroadcasterWithPk } from '@injectivelabs/sdk-ts'
import { Network } from '@injectivelabs/networks'
import { PrivateKey } from '@injectivelabs/sdk-ts'
import { config } from "dotenv";

config();

(async () => {
    try {
        const mnemonic = process.env.MNEMONIC_SENDER
        const privateKey = PrivateKey.fromMnemonic(mnemonic!)

        const sender = privateKey.toAddress().toBech32();
        console.log('sender: ', sender);

        // const fundFactoryContract = process.env.FUND_FACTORY!

        const msg = MsgExecuteContract.fromJSON({
            contractAddress: 'inj190hdezl52v7f98f3qfuq3kys5wa6lqfn3s2pek',
            sender,
            msg: {
                charge_performance_fee: {}
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
        const atts = txHash.events?.find(element => element.type === "wasm");
        // const jsonString = Buffer.from(contractState.data).toString('utf8')
        console.log('atts: ',);
        const fee = atts.attributes.find((ele: any) => {
            console.log(`Buffer.from(ele.key).toString('utf8') :::`, Buffer.from(ele.key).toString('utf8'));
            return Buffer.from(ele.key).toString('utf8') === "protocol_fee"
        });
        console.log('fee: ', Buffer.from(fee.value).toString('utf8'));

    } catch (error: any) {
        console.error('Transaction failed:', error.message)
    }
})();