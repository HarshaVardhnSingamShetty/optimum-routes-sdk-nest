import { ChainId } from '../../enums/chain-id';

/**
 * BNB token context
 */
export class BNB {
  /**
   * Get BNB token info
   */
  public static token() {
    return {
      chainId: ChainId.BSC,
      contractAddress: '0x4E72F0A03585E0D80f71622d7821147Dd5461bB8',
      decimals: 18,
      symbol: 'WBNB',
      name: 'Wrapped Binance token',
    };
  }
}
