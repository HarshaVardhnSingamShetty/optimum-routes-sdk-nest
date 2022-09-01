import { JsonFragment } from '@ethersproject/abi';

export class ContractContext {
  /**
   * The pancakeswap router address
   */
  public static routerAddress = '0x64beBB09b958e79f94376010F6144bCaF7873295';

  /**
   * The pancakeswap factory address
   */
  public static factoryAddress = '0x740b259807b71c427B3d051C86420E08995EBAdc';

  /**
   * The pancakeswap pair address
   */
  public static pairAddress = '0x740b259807b71c427B3d051C86420E08995EBAdc';

  /**
   * PancakeSwap v2 router
   */
  public static routerAbi: JsonFragment[] = require('../ABI/pancakeswap-router-v2.json');

  /**
   * PancakeSwap v2 factory
   */
  public static factoryAbi: JsonFragment[] = require('../ABI/pancakeswap-factory-v2.json');

  /**
   * PancakeSwap v2 pair
   */
  public static pairAbi: JsonFragment[] = require('../ABI/pancakeswap-pair-v2.json');

  /**
   * ERC20 abi
   */
  public static erc20Abi: JsonFragment[] = require('../ABI/erc-20-abi.json');
}
