"use strict";
exports.__esModule = true;
exports.ContractContext = void 0;
var ContractContext = /** @class */ (function () {
    function ContractContext() {
    }
    /**
     * The pancakeswap router address
     */
    ContractContext.routerAddress = '0x64beBB09b958e79f94376010F6144bCaF7873295';
    /**
     * The pancakeswap factory address
     */
    ContractContext.factoryAddress = '0x740b259807b71c427B3d051C86420E08995EBAdc';
    /**
     * The pancakeswap pair address
     */
    ContractContext.pairAddress = '0x740b259807b71c427B3d051C86420E08995EBAdc';
    /**
     * PancakeSwap v2 router
     */
    ContractContext.routerAbi = require('../ABI/pancakeswap-router-v2.json');
    /**
     * PancakeSwap v2 factory
     */
    ContractContext.factoryAbi = require('../ABI/pancakeswap-factory-v2.json');
    /**
     * PancakeSwap v2 pair
     */
    ContractContext.pairAbi = require('../ABI/pancakeswap-pair-v2.json');
    /**
     * ERC20 abi
     */
    ContractContext.erc20Abi = require('../ABI/erc-20-abi.json');
    return ContractContext;
}());
exports.ContractContext = ContractContext;
