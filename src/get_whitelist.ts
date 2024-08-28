import { getNetworkEndpoints } from '@injectivelabs/networks';
import { ChainGrpcWasmApi } from '@injectivelabs/sdk-ts'
import { Network } from '@injectivelabs/networks'
import { config } from "dotenv";

config();

(async () => {
  try {
    
    const contractAddress = process.env.FUND_FACTORY!;
  const queryFromObject = { get_whitelist: {}}
  const endpoints = getNetworkEndpoints(Network.Testnet)
  const chainGrpcWasmApi = new ChainGrpcWasmApi(endpoints.grpc)

  const contractState = await chainGrpcWasmApi.fetchSmartContractState(contractAddress, queryFromObject)
  const jsonString = Buffer.from(contractState.data).toString('utf8')

  const parsedData = JSON.parse(jsonString)
  console.log(parsedData?.response)
    
} catch (error: any) {
    console.error('Transaction failed:', error.message)
  }
})();