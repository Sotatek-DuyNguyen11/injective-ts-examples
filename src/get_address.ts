import { PrivateKey } from "@injectivelabs/sdk-ts";

export const getAddressFromMnemomic = (mnemonic: string) => {
    const privateKey = PrivateKey.fromMnemonic(mnemonic!)

    const sender = privateKey.toAddress().toBech32();

    return sender;
}