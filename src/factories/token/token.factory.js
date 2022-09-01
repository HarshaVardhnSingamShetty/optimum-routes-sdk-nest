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
exports.TokenFactory = void 0;
var ethereum_multicall_1 = require("ethereum-multicall");
var ethers_1 = require("ethers");
var contract_context_1 = require("../../common/contract-context");
var TokenFactory = /** @class */ (function () {
    function TokenFactory(_tokenContractAddress, _ethersProvider) {
        this._tokenContractAddress = _tokenContractAddress;
        this._ethersProvider = _ethersProvider;
        this._multicall = new ethereum_multicall_1.Multicall({
            ethersProvider: this._ethersProvider.provider
        });
        this._erc20TokenContracy = this._ethersProvider.getContract(JSON.stringify(contract_context_1.ContractContext.erc20Abi), this._tokenContractAddress);
    }
    /**
     * Get the token details
     */
    TokenFactory.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var SYMBOL, DECIMALS, NAME, contractCallContext, contractCallResults, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        SYMBOL = 0;
                        DECIMALS = 1;
                        NAME = 2;
                        contractCallContext = {
                            reference: 'token',
                            contractAddress: this._tokenContractAddress,
                            abi: contract_context_1.ContractContext.erc20Abi,
                            calls: [
                                {
                                    reference: "symbol",
                                    methodName: 'symbol',
                                    methodParameters: []
                                },
                                {
                                    reference: "decimals",
                                    methodName: 'decimals',
                                    methodParameters: []
                                },
                                {
                                    reference: "name",
                                    methodName: 'name',
                                    methodParameters: []
                                },
                            ]
                        };
                        return [4 /*yield*/, this._multicall.call(contractCallContext)];
                    case 1:
                        contractCallResults = _a.sent();
                        results = contractCallResults.results[contractCallContext.reference];
                        return [2 /*return*/, {
                                chainId: this._ethersProvider.network().chainId,
                                contractAddress: this._tokenContractAddress,
                                symbol: results.callsReturnContext[SYMBOL].returnValues[0],
                                decimals: results.callsReturnContext[DECIMALS].returnValues[0],
                                name: results.callsReturnContext[NAME].returnValues[0]
                            }];
                }
            });
        });
    };
    /**
     * Get the allowance for the amount which can be moved from the contract
     * for a user
     * @ethereumAddress The users ethereum address
     */
    TokenFactory.prototype.allowance = function (ethereumAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var allowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._erc20TokenContracy.allowance(ethereumAddress, contract_context_1.ContractContext.routerAddress)];
                    case 1:
                        allowance = _a.sent();
                        return [2 /*return*/, allowance.toHexString()];
                }
            });
        });
    };
    /**
     * Generate the token approve data allowance to move the tokens.
     * This will return the data for you to send as a transaction
     * @spender The contract address for which you are allowing to move tokens on your behalf
     * @value The amount you want to allow them to do
     */
    TokenFactory.prototype.generateApproveAllowanceData = function (spender, value) {
        return this._erc20TokenContracy.interface.encodeFunctionData('approve', [
            spender,
            value,
        ]);
    };
    /**
     * Get the balance the user has of this token
     * @ethereumAddress The users ethereum address
     */
    TokenFactory.prototype.balanceOf = function (ethereumAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._erc20TokenContracy.balanceOf(ethereumAddress)];
                    case 1:
                        balance = _a.sent();
                        return [2 /*return*/, balance.toHexString()];
                }
            });
        });
    };
    /**
     * Get the total supply of tokens which exist
     */
    TokenFactory.prototype.totalSupply = function () {
        return __awaiter(this, void 0, void 0, function () {
            var totalSupply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._erc20TokenContracy.totalSupply()];
                    case 1:
                        totalSupply = _a.sent();
                        return [2 /*return*/, totalSupply.toHexString()];
                }
            });
        });
    };
    /**
     * Get allowance and balance
     * @param ethereumAddress
     */
    TokenFactory.prototype.getAllowanceAndBalanceOf = function (ethereumAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var ALLOWANCE, BALANCEOF, contractCallContext, contractCallResults, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ALLOWANCE = 0;
                        BALANCEOF = 1;
                        contractCallContext = {
                            reference: 'allowance-and-balance-of',
                            contractAddress: this._tokenContractAddress,
                            abi: contract_context_1.ContractContext.erc20Abi,
                            calls: [
                                {
                                    reference: 'allowance',
                                    methodName: 'allowance',
                                    methodParameters: [ethereumAddress, contract_context_1.ContractContext.routerAddress]
                                },
                                {
                                    reference: 'balanceOf',
                                    methodName: 'balanceOf',
                                    methodParameters: [ethereumAddress]
                                },
                            ]
                        };
                        return [4 /*yield*/, this._multicall.call(contractCallContext)];
                    case 1:
                        contractCallResults = _a.sent();
                        results = contractCallResults.results[contractCallContext.reference];
                        return [2 /*return*/, {
                                allowance: ethers_1.BigNumber.from(results.callsReturnContext[ALLOWANCE].returnValues[0]).toHexString(),
                                balanceOf: ethers_1.BigNumber.from(results.callsReturnContext[BALANCEOF].returnValues[0]).toHexString()
                            }];
                }
            });
        });
    };
    return TokenFactory;
}());
exports.TokenFactory = TokenFactory;
