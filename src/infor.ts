import { ChainGrpcWasmApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'


(async () => {
    const contractAddress = 'inj1sqrfhf9z3k2udx2lqhj8v6v0kr0dp49nfnfmhx'
    try {
        const endpoints = getNetworkEndpoints(Network.Testnet)
        const chainGrpcWasmApi = new ChainGrpcWasmApi(endpoints.grpc)


    const contractInfo = await chainGrpcWasmApi.fetchContractInfo(contractAddress)

console.log(contractInfo)
    } catch (error) {
        console.log("🚀 ~ error:", error)
    }
})()