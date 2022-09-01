"use strict";
exports.__esModule = true;
exports.USDC = void 0;
var chain_id_1 = require("../../enums/chain-id");
/**
 * USDC token context
 */
var USDC = /** @class */ (function () {
    function USDC() {
    }
    /**
     * Get USDC token info
     */
    USDC.token = function () {
        return {
            chainId: chain_id_1.ChainId.BSC,
            contractAddress: '0x12E840d8fE5D75D7B52A37c7fe34287FFc29F28C',
            decimals: 18,
            symbol: 'USDC',
            name: 'USD Coin'
        };
    };
    return USDC;
}());
exports.USDC = USDC;
