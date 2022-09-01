"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.PancakeswapPairContractFactoryPublic = void 0;
var ethers_provider_1 = require("../../ethers-provider");
var pancakeswap_pair_contract_factory_1 = require("./pancakeswap-pair-contract.factory");
var PancakeswapPairContractFactoryPublic = /** @class */ (function (_super) {
    __extends(PancakeswapPairContractFactoryPublic, _super);
    function PancakeswapPairContractFactoryPublic() {
        return _super.call(this, new ethers_provider_1.EthersProvider()) || this;
    }
    return PancakeswapPairContractFactoryPublic;
}(pancakeswap_pair_contract_factory_1.PancakeswapPairContractFactory));
exports.PancakeswapPairContractFactoryPublic = PancakeswapPairContractFactoryPublic;
