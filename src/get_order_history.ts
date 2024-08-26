import { IndexerGrpcDerivativesApi } from '@injectivelabs/sdk-ts'
import {config} from 'dotenv'
import { getNetworkEndpoints } from '@injectivelabs/networks';
import { Network } from '@injectivelabs/networks'

config();

(async () => {
    try {
        const endpoints = getNetworkEndpoints(Network.TestnetSentry)
          const indexerDerivativesApi = new IndexerGrpcDerivativesApi(endpoints.indexer);
          const markets = await indexerDerivativesApi.fetchMarkets()
          const marketIds = markets.map(ele => ele.marketId);
          console.log('marketIds: ',marketIds)
          const subaccountId = "0x0381dfeb28f9475a4e6fac622d1a1d169eda6e8c000000000000000000000000"; // 0x16a18c10301132505b2a7469b8857b97b155c86a000000000000000000000000
          const orders = await indexerDerivativesApi.fetchOrderHistory({
            marketIds,
            subaccountId
          })
          console.log('orders: ', orders);
    } catch (error) {
        console.log("🚀 ~ error:", error)
        
    }
})()
