"use strict";
exports.__esModule = true;
exports.COMP = void 0;
var chain_id_1 = require("../../enums/chain-id");
/**
 * COMP token context
 */
var COMP = /** @class */ (function () {
    function COMP() {
    }
    /**
     * Get COMP token info
     */
    COMP.token = function () {
        return {
            chainId: chain_id_1.ChainId.BSC,
            contractAddress: '0xa4274347ad6985D524A7cF6B8Eb6F878A210d05d',
            decimals: 18,
            symbol: 'COMP',
            name: 'Compound'
        };
    };
    return COMP;
}());
exports.COMP = COMP;
