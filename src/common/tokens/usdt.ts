import { ChainId } from '../../enums/chain-id';

/**
 * USDT token context
 */
export class USDT {
  /**
   * Get USDT token info
   */
  public static token() {
    return {
      chainId: ChainId.BSC,
      contractAddress: '0x86A57d99bbebdD1199B62888869835f63ff903d4',
      decimals: 18,
      symbol: 'USDT',
      name: 'Tether USD',
    };
  }
}
