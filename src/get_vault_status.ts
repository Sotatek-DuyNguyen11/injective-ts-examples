import { getNetworkEndpoints } from '@injectivelabs/networks';
import { ChainGrpcWasmApi } from '@injectivelabs/sdk-ts'
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
    
    const contractAddress = 'inj1pv08lylmeyumalmy6kejgrk8uu49w8t8lckwu6';
  const queryFromObject = { get_vault_status: {}}
  const endpoints = getNetworkEndpoints(Network.Testnet)
  const chainGrpcWasmApi = new ChainGrpcWasmApi(endpoints.grpc)

  const contractState = await chainGrpcWasmApi.fetchSmartContractState(contractAddress, queryFromObject)
  const jsonString = Buffer.from(contractState.data).toString('utf8')

  const parsedData = JSON.parse(jsonString)
  console.log(parsedData)
    
} catch (error: any) {
    console.error('Transaction failed:', error.message)
  }
})();