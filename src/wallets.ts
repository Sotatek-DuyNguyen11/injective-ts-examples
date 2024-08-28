import { PrivateKey, getDefaultSubaccountId } from '@injectivelabs/sdk-ts'
import {config} from 'dotenv'

config();

(async () => {
    try {
        const mnemonic = process.env.MNEMONIC!;
        // const privateKey = "afdfd9c3d2095ef696594f6cedcae59e72dcd697e2a7521b1578140422a4f890"
        const privateKeyFromMnemonic = PrivateKey.fromMnemonic(mnemonic)
        // const privateKeyFromHex = PrivateKey.fromPrivateKey(privateKey)
        // console.log("🚀 ~ privateKeyFromHex:", privateKeyFromHex)

        const address = privateKeyFromMnemonic.toAddress() /* or privateKeyFromHex.toAddress() */
     
        const subaccountId = getDefaultSubaccountId(address.toBech32());

        console.log({ injectiveAddress: address.toBech32(), ethereumAddress: address.toHex(), subaccountId })

    } catch (error) {
        console.log("🚀 ~ error:", error)
        
    }
})()
