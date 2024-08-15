import {
    IndexerRestExplorerApi
  } from "@injectivelabs/sdk-ts";
  import { getNetworkEndpoints, Network } from "@injectivelabs/networks";
  
  const endpoints = getNetworkEndpoints(Network.Testnet);
//   const indexerGrpcExplorerApi = new IndexerGrpcExplorerApi(`${endpoints.explorer!}/api/explorer/v1`);
  const indexerRestExplorerApi = new IndexerRestExplorerApi(endpoints.explorer!);
//   const chainGrpcWasmApi = new ChainGrpcWasmApi(endpoints.grpc);
//   const contractAddress = "inj1468yhun3ta93aqyasmwp3rmgjp5z4le4vfcmrh";
  
  async function main() {
    // const txsInSC = await indexerRestExplorerApi.fetchContractTransactions({contractAddress});
    const txsHash =
      "0FCA123AAA346AAD82919A10721C0C41131732268285D3EB25990A07F43E3174";
  
    // const transaction = await indexerGrpcExplorerApi.fetchTxByHash(txsHash);
    const transaction = await indexerRestExplorerApi.fetchTransaction(txsHash);
    // console.log("🚀 ~ main ~ transaction:", transaction)
  
    console.log(transaction.logs![0].events![transaction.logs![0].events!.length - 1]);
  
    // const contractHistory = await chainGrpcWasmApi.fetchContractHistory(
    //   contractAddress,
    // )
    
    // console.log(contractHistory.entriesList![0].msg)
  }
  main();