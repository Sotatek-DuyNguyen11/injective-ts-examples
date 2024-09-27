import {
  ChainRestAuthApi,
  MsgExecuteContract,
  TxClient,
  TxGrpcClient,
  createTransaction,
} from "@injectivelabs/sdk-ts";
import { Network } from "@injectivelabs/networks";
import { PrivateKey } from "@injectivelabs/sdk-ts";
import { config } from "dotenv";
import { getNetworkInfo } from "@injectivelabs/networks";
import { DEFAULT_GAS_LIMIT, DEFAULT_GAS_PRICE } from "@injectivelabs/utils";
import {BigNumber} from 'bignumber.js'

config();

(async () => {
  try {
    const mnemonic = process.env.MNEMONIC_SENDER;
    const privateKeyFromMnemonic = PrivateKey.fromMnemonic(mnemonic!);

    const sender = privateKeyFromMnemonic.toAddress().toBech32();
    console.log("sender: ", sender);

    const publicKey = privateKeyFromMnemonic.toPublicKey().toBase64();

    const msg = MsgExecuteContract.fromJSON({
      contractAddress: "inj1pqclmwep3m2x0e4asajm0t57cs9xwqnl4u7u7g",
      sender,
      msg: {
        charge_protocol_fee: {},
      },
    });
    console.log("🚀 ~ msg:", msg);

    const network = getNetworkInfo(Network.Testnet);

    const accountDetails = await new ChainRestAuthApi(
      network.rest
    ).fetchAccount(sender);

    /** Prepare the Transaction **/
    const { signBytes, txRaw } = createTransaction({
      message: msg,
      memo: "",
      fee: {
        amount: [
            {
                amount: new BigNumber(DEFAULT_GAS_LIMIT * 1.2)
                    .times(DEFAULT_GAS_PRICE)
                    .toString(),
                denom: 'inj',
            },
        ],
        gas: (DEFAULT_GAS_LIMIT * 1.2).toString(),
        payer: '',
        granter: '',

    },
      pubKey: publicKey,
      sequence: parseInt(accountDetails.account.base_account.sequence, 10),
      accountNumber: parseInt(
        accountDetails.account.base_account.account_number,
        10
      ),
      chainId: network.chainId,
    });

    /** Sign transaction */
    const signature = await privateKeyFromMnemonic.sign(Buffer.from(signBytes));

    /** Append Signatures */
    txRaw.signatures = [signature];

    /** Calculate hash of the transaction */
    console.log(`Transaction Hash: ${TxClient.hash(txRaw)}`);

    const txService = new TxGrpcClient(network.grpc);

    /** Simulate transaction */
    const simulationResponse = await txService.simulate(txRaw);
    console.log(
      `Transaction simulation response: ${JSON.stringify(
        simulationResponse.gasInfo
      )}`
    );

    /** Broadcast transaction */
    const txResponse = await txService.broadcast(txRaw);

    if (txResponse.code !== 0) {
      console.log(`Transaction failed: ${txResponse.rawLog}`);
    } else {
      console.log(
        `Broadcasted transaction hash: ${JSON.stringify(txResponse.txHash)}`
      );

      console.log(
        `res:`,  txResponse
      );
    }
  } catch (error: any) {
    console.error("Transaction failed:", error.message);
  }
})();
