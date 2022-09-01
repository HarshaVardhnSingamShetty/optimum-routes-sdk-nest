import { ChainId } from '../../enums/chain-id';

/**
 * USDC token context
 */
export class USDC {
  /**
   * Get USDC token info
   */
  public static token() {
    return {
      chainId: ChainId.BSC,
      contractAddress: '0x12E840d8fE5D75D7B52A37c7fe34287FFc29F28C',
      decimals: 18,
      symbol: 'USDC',
      name: 'USD Coin',
    };
  }
}
