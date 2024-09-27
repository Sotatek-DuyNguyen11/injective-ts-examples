import { getNetworkInfo, Network } from "@injectivelabs/networks";
import {
  ChainRestAuthApi,
  createTransaction,
  PrivateKey,
  TxGrpcClient,
} from "@injectivelabs/sdk-ts";
import { DEFAULT_STD_FEE } from "@injectivelabs/utils";

/** MsgSend Example */
export const estGasFee = async (msg: any, injectiveAddress: any) => {
  const network = getNetworkInfo(Network.Testnet);
  const privateKeyHash =
    "002401a3a11944c44479e0ff22d610f5e0772aa4217cad1cf7b839f4c7e4aa44";
  const privateKey = PrivateKey.fromHex(privateKeyHash);
  const publicKey = privateKey.toPublicKey().toBase64();
  /** Account Details **/
  const accountDetails = await new ChainRestAuthApi(network.rest).fetchAccount(
    injectiveAddress
  );

  /** Prepare the Transaction **/
  const { signBytes, txRaw } = createTransaction({
    message: msg,
    memo: "",
    fee: DEFAULT_STD_FEE,
    pubKey: publicKey,
    sequence: parseInt(accountDetails.account.base_account.sequence, 10),
    accountNumber: parseInt(
      accountDetails.account.base_account.account_number,
      10
    ),
    chainId: network.chainId,
  });

  /** Sign transaction */
  const signature = await privateKey.sign(Buffer.from(signBytes));

  /** Append Signatures */
  txRaw.signatures = [signature];

  /** Calculate hash of the transaction */

  const txService = new TxGrpcClient(network.grpc);

  /** Simulate transaction */
  const simulationResponse = await txService.simulate(txRaw);
  const gasPrice = 600000000;
  const gasInfo = JSON.parse(
    JSON.stringify(simulationResponse.gasInfo)
  )?.gasUsed;
  const estGas = (gasInfo * gasPrice) / Math.pow(10, 18);
  return estGas;
};
