"use strict";
exports.__esModule = true;
exports.USDT = void 0;
var chain_id_1 = require("../../enums/chain-id");
/**
 * USDT token context
 */
var USDT = /** @class */ (function () {
    function USDT() {
    }
    /**
     * Get USDT token info
     */
    USDT.token = function () {
        return {
            chainId: chain_id_1.ChainId.BSC,
            contractAddress: '0x86A57d99bbebdD1199B62888869835f63ff903d4',
            decimals: 18,
            symbol: 'USDT',
            name: 'Tether USD'
        };
    };
    return USDT;
}());
exports.USDT = USDT;
