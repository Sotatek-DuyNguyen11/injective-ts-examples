import { ChainGrpcWasmApi, PrivateKey } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'

import { config } from "dotenv";
config();

(async () => {
  const contractAddress = process.env.CW_20_CONTRACT!
  try {
      const endpoints = getNetworkEndpoints(Network.Testnet)
      const chainGrpcWasmApi = new ChainGrpcWasmApi(endpoints.grpc)

      const mnemonic = process.env.MNEMONIC_SENDER
      const privateKey = PrivateKey.fromMnemonic(mnemonic!)
      console.log("🚀 ~ privateKey:", privateKey)
  
      const sender = privateKey.toAddress().toBech32();
      console.log("🚀 ~ sender:", sender)

  // const contractAddress = 'inj...'

  const queryFromObject = { balance: {
    address: sender
  }}

  const contractState = await chainGrpcWasmApi.fetchSmartContractState(contractAddress, queryFromObject)
  const jsonString = Buffer.from(contractState.data).toString('utf8')

  const parsedData = JSON.parse(jsonString)
  console.log(parsedData)
  } catch (error) {
      console.log("🚀 ~ error:", error)
  }
})()