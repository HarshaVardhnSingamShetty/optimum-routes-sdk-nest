import { ChainId } from '../../enums/chain-id';

/**
 * COMP token context
 */
export class COMP {
  /**
   * Get COMP token info
   */
  public static token() {
    return {
      chainId: ChainId.BSC,
      contractAddress: '0xa4274347ad6985D524A7cF6B8Eb6F878A210d05d',
      decimals: 18,
      symbol: 'COMP',
      name: 'Compound',
    };
  }
}
