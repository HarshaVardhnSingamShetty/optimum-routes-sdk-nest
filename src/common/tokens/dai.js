"use strict";
exports.__esModule = true;
exports.DAI = void 0;
var chain_id_1 = require("../../enums/chain-id");
/**
 * DAI token context
 */
var DAI = /** @class */ (function () {
    function DAI() {
    }
    DAI.MAINNET = function () {
        return {
            chainId: chain_id_1.ChainId.BSC,
            contractAddress: '0x7D01cEeA33Aca79114274D077eeD4Ba3330B33F6',
            decimals: 18,
            symbol: 'DAI',
            name: 'Dai Stablecoin'
        };
    };
    /**
     * Get DAI token info
     */
    DAI.token = function () {
        return {
            chainId: chain_id_1.ChainId.BSC,
            contractAddress: '0x26a5dfab467d4f58fb266648cae769503cec9580',
            decimals: 18,
            symbol: 'DAI',
            name: 'Dai Stablecoin'
        };
    };
    return DAI;
}());
exports.DAI = DAI;
