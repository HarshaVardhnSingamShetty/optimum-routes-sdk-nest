// const { PancakeswapPair, PancakeswapPairSettings } = require('simple-pancakeswap-sdk');
// const { PancakeswapPair } = require('./src/factories/router/pancakeswap-router.factory.ts')
import { PancakeswapPair } from './src/factories/pair/pancakeswap-pair'
1
// import {PancakeswapFactory} from './src/factories/router/pancakeswap-router.factory';
const main = async ()=>{
const pancakeswapPair = new PancakeswapPair({
    // the contract address of the token you want to convert FROM
    fromTokenContractAddress: '0x101d82428437127bf1608f699cd651e6abf9766e',
    // the contract address of the token you want to convert TO
    toTokenContractAddress: '0x86A57d99bbebdD1199B62888869835f63ff903d4',
    // the ethereum address of the user using this part of the dApp
    ethereumAddress: '0x7368ea4b5A7204CFe592d096D4CdC8832f754027',
    // you can pass in the provider url as well if you want
    // providerUrl: YOUR_PROVIDER_URL,
    // // settings: new PancakeswapPairSettings({
    //   // if not supplied it will use `0.005` which is 0.5%
    //   // please pass it in as a full number decimal so 0.7%
    //   // would be 0.007
    //   slippage: 0.005,
    //   // if not supplied it will use 20 a deadline minutes
    //   deadlineMinutes: 20,
    //   // if not supplied it will try to use multihops
    //   // if this is true it will require swaps to direct
    //   // pairs
    //   disableMultihops: false,
    // }),
  });

// now to create the factory you just do
const pancakeswapPairFactory = await pancakeswapPair.createFactory()

// const toToken = pancakeswapPairFactory.toToken;
// console.log(toToken);
// let allRoutes = await pancakeswapPairFactory.findAllPossibleRoutesWithQuote(1e18)//
// allRoutes = pancakeswapPairFactory.findAllPossibleRoutes()
// console.log(allRoutes);
}
main()