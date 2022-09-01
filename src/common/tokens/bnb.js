"use strict";
exports.__esModule = true;
exports.BNB = void 0;
var chain_id_1 = require("../../enums/chain-id");
/**
 * BNB token context
 */
var BNB = /** @class */ (function () {
    function BNB() {
    }
    /**
     * Get BNB token info
     */
    BNB.token = function () {
        return {
            chainId: chain_id_1.ChainId.BSC,
            contractAddress: '0x4E72F0A03585E0D80f71622d7821147Dd5461bB8',
            decimals: 18,
            symbol: 'WBNB',
            name: 'Wrapped Binance token'
        };
    };
    return BNB;
}());
exports.BNB = BNB;
