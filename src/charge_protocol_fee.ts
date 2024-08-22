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
      contractAddress: 'inj1pv08lylmeyumalmy6kejgrk8uu49w8t8lckwu6',
      sender,
      msg: {
        charge_protocol_fee:{}
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
    console.log('atts: ',  );
    const fee = atts.attributes.find((ele: any) => {
        console.log(`Buffer.from(ele.key).toString('utf8') :::`, Buffer.from(ele.key).toString('utf8'));
        return Buffer.from(ele.key).toString('utf8') === "protocol_fee"
    });
    console.log('fee: ', Buffer.from(fee.value).toString('utf8'));

    // const request = await axios.get(`https://testnet.sentry.exchange.grpc-web.injective.network/api/explorer/v1/txs/${txHash.txHash}`);

    // console.log('request', request.data.data);
    
    // const events = request.data.data.logs[0].events;
    // console.log('events: ', events);
    
    // const atts = events.find(
    //     (ele: any) => ele.type === 'wasm' 
    //     && ele.attributes.find((element: any) => element.key ==="action" && element.value==="charge_protocol_fee"))
    // console.log('atts', atts);
    
} catch (error: any) {
    console.error('Transaction failed:', error.message)
  }
})();