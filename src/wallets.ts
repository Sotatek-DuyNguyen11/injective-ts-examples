import { PrivateKey, getDefaultSubaccountId } from '@injectivelabs/sdk-ts'
import {config} from 'dotenv'

config();

(async () => {
    try {
        const mnemonic = process.env.MNEMONIC_DUYNT_3!;
        // const privateKey = "afdfd9c3d2095ef696594f6cedcae59e72dcd697e2a7521b1578140422a4f890"
        const privateKeyFromMnemonic = PrivateKey.fromMnemonic(mnemonic)
        // const privateKeyFromHex = PrivateKey.fromPrivateKey(privateKey)
        // console.log("🚀 ~ privateKeyFromHex:", privateKeyFromHex)

        const address = privateKeyFromMnemonic.toAddress() /* or privateKeyFromHex.toAddress() */
     
        const subaccountId = getDefaultSubaccountId(address.toBech32());

        const privateKey  =  privateKeyFromMnemonic.toPrivateKeyHex()

        const publicKey = privateKeyFromMnemonic.toPublicKey().toBase64();

        console.log({ 
            injectiveAddress: address.toBech32(), 
            ethereumAddress: address.toHex(), 
            subaccountId, 
            address: privateKeyFromMnemonic.toPrivateKeyHex(),
            privateKey,
            publicKey
        })

        const date = new Date();
        date.setSeconds(date.getSeconds() + 2);

        const nextDate = new Date(Date.now() + 6 * 1000)

        console.log('date:',nextDate, date);
        

    } catch (error) {
        console.log("🚀 ~ error:", error)
        
    }
})()
