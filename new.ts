import {PancakeswapPair } from './src/factories/pair/pancakeswap-pair'
import {PancakeswapPairSettings} from './src/factories/pair/models/pancakeswap-pair-settings';

const main = async ()=>{
    const pcsPair = new PancakeswapPair({
        fromTokenContractAddress: '0x101d82428437127bf1608f699cd651e6abf9766e',
        toTokenContractAddress: '0x86A57d99bbebdD1199B62888869835f63ff903d4',
        ethereumAddress: '0x7368ea4b5A7204CFe592d096D4CdC8832f754027',
        settings: new PancakeswapPairSettings({
          slippage: 0.005,
          deadlineMinutes: 20,
          disableMultihops: false,
        }),
      });
}

main()