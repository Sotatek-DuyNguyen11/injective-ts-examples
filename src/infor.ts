import { ChainGrpcWasmApi } from '@injectivelabs/sdk-ts'
import { getNetworkEndpoints, Network } from '@injectivelabs/networks'


(async () => {
    const contractAddress = 'inj1jgrxnhe8fuel790mfutfkkn9kg87fk8jamux3n'
    try {
        const endpoints = getNetworkEndpoints(Network.Testnet)
        const chainGrpcWasmApi = new ChainGrpcWasmApi(endpoints.grpc)


    const contractInfo = await chainGrpcWasmApi.fetchContractInfo(contractAddress)

console.log(contractInfo)
    } catch (error) {
        console.log("🚀 ~ error:", error)
    }
})()