"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.PancakeswapPair = void 0;
var error_codes_1 = require("../../common/errors/error-codes");
var pancakeswap_error_1 = require("../../common/errors/pancakeswap-error");
var is_address_1 = require("../../common/utils/is-address");
var ethers_provider_1 = require("../../ethers-provider");
var tokens_factory_1 = require("../token/tokens.factory");
var pancakeswap_pair_settings_1 = require("./models/pancakeswap-pair-settings");
var pancakeswap_pair_factory_1 = require("./pancakeswap-pair.factory");
var PancakeswapPair = /** @class */ (function () {
    function PancakeswapPair(_pancakeswapPairContext) {
        this._pancakeswapPairContext = _pancakeswapPairContext;
        if (!this._pancakeswapPairContext.fromTokenContractAddress) {
            throw new pancakeswap_error_1.PancakeswapError('Must have a `fromTokenContractAddress` on the context', error_codes_1.ErrorCodes.fromTokenContractAddressRequired);
        }
        if (!(0, is_address_1.isAddress)(this._pancakeswapPairContext.fromTokenContractAddress)) {
            throw new pancakeswap_error_1.PancakeswapError('`fromTokenContractAddress` is not a valid contract address', error_codes_1.ErrorCodes.fromTokenContractAddressNotValid);
        }
        if (!this._pancakeswapPairContext.toTokenContractAddress) {
            throw new pancakeswap_error_1.PancakeswapError('Must have a `toTokenContractAddress` on the context', error_codes_1.ErrorCodes.toTokenContractAddressRequired);
        }
        if (!(0, is_address_1.isAddress)(this._pancakeswapPairContext.toTokenContractAddress)) {
            throw new pancakeswap_error_1.PancakeswapError('`toTokenContractAddress` is not a valid contract address', error_codes_1.ErrorCodes.toTokenContractAddressNotValid);
        }
        if (!this._pancakeswapPairContext.ethereumAddress) {
            throw new pancakeswap_error_1.PancakeswapError('Must have a `ethereumAddress` on the context', error_codes_1.ErrorCodes.ethereumAddressRequired);
        }
        if (!(0, is_address_1.isAddress)(this._pancakeswapPairContext.ethereumAddress)) {
            throw new pancakeswap_error_1.PancakeswapError('`ethereumAddress` is not a valid address', error_codes_1.ErrorCodes.ethereumAddressNotValid);
        }
        if (this._pancakeswapPairContext.providerUrl) {
            this._ethersProvider = new ethers_provider_1.EthersProvider(this._pancakeswapPairContext.providerUrl);
            return;
        }
        this._ethersProvider = new ethers_provider_1.EthersProvider();
    }
    /**
     * Create factory to be able to call methods on the 2 tokens
     */
    PancakeswapPair.prototype.createFactory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tokensFactory, tokens, pancakeswapFactoryContext;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokensFactory = new tokens_factory_1.TokensFactory(this._ethersProvider);
                        return [4 /*yield*/, tokensFactory.getTokens([
                                this._pancakeswapPairContext.fromTokenContractAddress,
                                this._pancakeswapPairContext.toTokenContractAddress,
                            ])];
                    case 1:
                        tokens = _a.sent();
                        pancakeswapFactoryContext = {
                            fromToken: tokens.find(function (t) {
                                return t.contractAddress ===
                                    _this._pancakeswapPairContext.fromTokenContractAddress;
                            }),
                            toToken: tokens.find(function (t) {
                                return t.contractAddress ===
                                    _this._pancakeswapPairContext.toTokenContractAddress;
                            }),
                            ethereumAddress: this._pancakeswapPairContext.ethereumAddress,
                            settings: this._pancakeswapPairContext.settings || new pancakeswap_pair_settings_1.PancakeswapPairSettings(),
                            ethersProvider: this._ethersProvider
                        };
                        return [2 /*return*/, new pancakeswap_pair_factory_1.PancakeswapPairFactory(pancakeswapFactoryContext)];
                }
            });
        });
    };
    return PancakeswapPair;
}());
exports.PancakeswapPair = PancakeswapPair;
