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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.PancakeswapRouterFactory = void 0;
var bignumber_js_1 = require("bignumber.js");
var ethereum_multicall_1 = require("ethereum-multicall");
var contract_context_1 = require("../../common/contract-context");
var error_codes_1 = require("../../common/errors/error-codes");
var pancakeswap_error_1 = require("../../common/errors/pancakeswap-error");
var bnb_1 = require("../../common/tokens/bnb");
var comp_1 = require("../../common/tokens/comp");
var dai_1 = require("../../common/tokens/dai");
var usdc_1 = require("../../common/tokens/usdc");
var usdt_1 = require("../../common/tokens/usdt");
var format_ether_1 = require("../../common/utils/format-ether");
var hexlify_1 = require("../../common/utils/hexlify");
var only_unique_1 = require("../../common/utils/only-unique");
var parse_ether_1 = require("../../common/utils/parse-ether");
var trade_path_1 = require("../../common/utils/trade-path");
var chain_id_1 = require("../../enums/chain-id");
var trade_path_2 = require("../../enums/trade-path");
var router_direction_1 = require("./enums/router-direction");
var PancakeswapRouterFactory = /** @class */ (function () {
    function PancakeswapRouterFactory(_fromToken, _toToken, _disableMultihops, _ethersProvider) {
        this._fromToken = _fromToken;
        this._toToken = _toToken;
        this._disableMultihops = _disableMultihops;
        this._ethersProvider = _ethersProvider;
        this._multicall = new ethereum_multicall_1.Multicall({
            ethersProvider: this._ethersProvider.provider
        });
    }
    /**
     * Get all possible routes will only go up to 4 due to gas increase the more routes
     * you go.
     */
    PancakeswapRouterFactory.prototype.getAllPossibleRoutes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var findPairs, contractCallContext, pairs, tokenPairs, fromToken, toToken, contractCallResults, results, availablePairs, fromTokenRoutes, toTokenRoutes, allMainRoutes, i, fromTokenPairs, toTokenPairs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        findPairs = [];
                        if (!this._disableMultihops) {
                            findPairs = [
                                this.mainCurrenciesPairsForFromToken,
                                this.mainCurrenciesPairsForToToken,
                                this.mainCurrenciesPairsForUSDT,
                                this.mainCurrenciesPairsForCOMP,
                                this.mainCurrenciesPairsForDAI,
                                this.mainCurrenciesPairsForUSDC,
                                this.mainCurrenciesPairsForWETH,
                                [[this._fromToken, this._toToken]],
                            ];
                        }
                        else {
                            // multihops turned off so only go direct
                            findPairs = [[[this._fromToken, this._toToken]]];
                        }
                        contractCallContext = {
                            reference: 'pancakeswap-pairs',
                            contractAddress: contract_context_1.ContractContext.pairAddress,
                            abi: contract_context_1.ContractContext.pairAbi,
                            calls: []
                        };
                        for (pairs = 0; pairs < findPairs.length; pairs++) {
                            for (tokenPairs = 0; tokenPairs < findPairs[pairs].length; tokenPairs++) {
                                fromToken = findPairs[pairs][tokenPairs][0];
                                toToken = findPairs[pairs][tokenPairs][1];
                                contractCallContext.calls.push({
                                    reference: "".concat(fromToken.contractAddress, "-").concat(toToken.contractAddress, "-").concat(fromToken.symbol, "/").concat(toToken.symbol),
                                    methodName: 'getPair',
                                    methodParameters: [
                                        fromToken.contractAddress,
                                        toToken.contractAddress,
                                    ]
                                });
                            }
                        }
                        return [4 /*yield*/, this._multicall.call(contractCallContext)];
                    case 1:
                        contractCallResults = _a.sent();
                        results = contractCallResults.results[contractCallContext.reference];
                        availablePairs = results.callsReturnContext.filter(function (c) { return c.returnValues[0] !== '0x0000000000000000000000000000000000000000'; });
                        fromTokenRoutes = {
                            token: this._fromToken,
                            pairs: {
                                fromTokenPairs: this.getTokenAvailablePairs(this._fromToken, availablePairs, router_direction_1.RouterDirection.from)
                            }
                        };
                        toTokenRoutes = {
                            token: this._toToken,
                            pairs: {
                                toTokenPairs: this.getTokenAvailablePairs(this._toToken, availablePairs, router_direction_1.RouterDirection.to)
                            }
                        };
                        allMainRoutes = [];
                        for (i = 0; i < this.allMainTokens.length; i++) {
                            fromTokenPairs = this.getTokenAvailablePairs(this.allMainTokens[i], availablePairs, router_direction_1.RouterDirection.from);
                            toTokenPairs = this.getTokenAvailablePairs(this.allMainTokens[i], availablePairs, router_direction_1.RouterDirection.to);
                            allMainRoutes.push({
                                token: this.allMainTokens[i],
                                pairs: { fromTokenPairs: fromTokenPairs, toTokenPairs: toTokenPairs }
                            });
                        }
                        return [2 /*return*/, this.workOutAllPossibleRoutes(fromTokenRoutes, toTokenRoutes, allMainRoutes)];
                }
            });
        });
    };
    PancakeswapRouterFactory.prototype.getAllPossibleRoutesWithQuotes = function (amountToTrade) {
        return __awaiter(this, void 0, void 0, function () {
            var tradeAmount, routes, contractCallContext, i, routeCombo, contractCallResults, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tradeAmount = this.formatAmountToTrade(amountToTrade);
                        return [4 /*yield*/, this.getAllPossibleRoutes()];
                    case 1:
                        routes = _a.sent();
                        contractCallContext = {
                            reference: 'pancakeswap-route-quotes',
                            contractAddress: contract_context_1.ContractContext.routerAddress,
                            abi: contract_context_1.ContractContext.routerAbi,
                            calls: [],
                            context: routes
                        };
                        for (i = 0; i < routes.length; i++) {
                            routeCombo = routes[i];
                            contractCallContext.calls.push({
                                reference: "route".concat(i),
                                methodName: 'getAmountsOut',
                                methodParameters: [
                                    tradeAmount,
                                    routeCombo.map(function (c) {
                                        return c.contractAddress;
                                    }),
                                ]
                            });
                        }
                        return [4 /*yield*/, this._multicall.call(contractCallContext)];
                    case 2:
                        contractCallResults = _a.sent();
                        results = contractCallResults.results[contractCallContext.reference];
                        return [2 /*return*/, this.buildRouteQuotesFromResults(results)];
                }
            });
        });
    };
    /**
     * Finds the best route
     * @param amountToTrade The amount they want to trade
     */
    PancakeswapRouterFactory.prototype.findBestRoute = function (amountToTrade) {
        return __awaiter(this, void 0, void 0, function () {
            var allRoutes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllPossibleRoutesWithQuotes(amountToTrade)];
                    case 1:
                        allRoutes = _a.sent();
                        if (allRoutes.length === 0) {
                            throw new pancakeswap_error_1.PancakeswapError("No routes found for ".concat(this._fromToken.contractAddress, " > ").concat(this._toToken.contractAddress), error_codes_1.ErrorCodes.noRoutesFound);
                        }
                        return [2 /*return*/, {
                                bestRouteQuote: allRoutes[0],
                                triedRoutesQuote: allRoutes.map(function (route) {
                                    return {
                                        expectedConvertQuote: route.expectedConvertQuote,
                                        routePathArrayTokenMap: route.routePathArrayTokenMap,
                                        routeText: route.routeText,
                                        routePathArray: route.routePathArray
                                    };
                                })
                            }];
                }
            });
        });
    };
    /**
     * Works out every possible route it can take
     * @param fromTokenRoutes The from token routes
     * @param toTokenRoutes The to token routes
     * @param allMainRoutes All the main routes
     */
    PancakeswapRouterFactory.prototype.workOutAllPossibleRoutes = function (fromTokenRoutes, toTokenRoutes, allMainRoutes) {
        var jointCompatibleRoutes = toTokenRoutes.pairs.toTokenPairs.filter(function (t) {
            return fromTokenRoutes.pairs.fromTokenPairs.find(function (f) { return f.contractAddress === t.contractAddress; });
        });
        var routes = [];
        if (fromTokenRoutes.pairs.fromTokenPairs.find(function (t) { return t.contractAddress === toTokenRoutes.token.contractAddress; })) {
            routes.push([fromTokenRoutes.token, toTokenRoutes.token]);
        }
        var _loop_1 = function (i) {
            var tokenRoute = allMainRoutes[i];
            if (jointCompatibleRoutes.find(function (c) { return c.contractAddress === tokenRoute.token.contractAddress; })) {
                routes.push([
                    fromTokenRoutes.token,
                    tokenRoute.token,
                    toTokenRoutes.token,
                ]);
                var _loop_2 = function (f) {
                    var fromSupportedToken = fromTokenRoutes.pairs.fromTokenPairs[f];
                    if (tokenRoute.pairs.toTokenPairs.find(function (pair) {
                        return pair.contractAddress === fromSupportedToken.contractAddress;
                    })) {
                        var workedOutFromRoute = [
                            fromTokenRoutes.token,
                            fromSupportedToken,
                            tokenRoute.token,
                            toTokenRoutes.token,
                        ];
                        if (workedOutFromRoute.filter(only_unique_1.onlyUnique).length ===
                            workedOutFromRoute.length) {
                            routes.push(workedOutFromRoute);
                        }
                    }
                };
                for (var f = 0; f < fromTokenRoutes.pairs.fromTokenPairs.length; f++) {
                    _loop_2(f);
                }
                var _loop_3 = function (f) {
                    var toSupportedToken = toTokenRoutes.pairs.toTokenPairs[f];
                    if (tokenRoute.pairs.fromTokenPairs.find(function (pair) {
                        return pair.contractAddress === toSupportedToken.contractAddress;
                    })) {
                        var workedOutToRoute = [
                            fromTokenRoutes.token,
                            tokenRoute.token,
                            toSupportedToken,
                            toTokenRoutes.token,
                        ];
                        if (workedOutToRoute.filter(only_unique_1.onlyUnique).length ===
                            workedOutToRoute.length) {
                            routes.push(workedOutToRoute);
                        }
                    }
                };
                for (var f = 0; f < toTokenRoutes.pairs.toTokenPairs.length; f++) {
                    _loop_3(f);
                }
            }
        };
        for (var i = 0; i < allMainRoutes.length; i++) {
            _loop_1(i);
        }
        return routes;
    };
    PancakeswapRouterFactory.prototype.getTokenAvailablePairs = function (token, allAvailablePairs, direction) {
        switch (direction) {
            case router_direction_1.RouterDirection.from:
                return this.getFromRouterDirectionAvailablePairs(token, allAvailablePairs);
            case router_direction_1.RouterDirection.to:
                return this.getToRouterDirectionAvailablePairs(token, allAvailablePairs);
        }
    };
    PancakeswapRouterFactory.prototype.getFromRouterDirectionAvailablePairs = function (token, allAvailablePairs) {
        var fromRouterDirection = allAvailablePairs.filter(function (c) { return c.reference.split('-')[0] === token.contractAddress; });
        var tokens = [];
        var _loop_4 = function (index) {
            var context = fromRouterDirection[index];
            tokens.push(this_1.allTokens.find(function (t) { return t.contractAddress === context.reference.split('-')[1]; }));
        };
        var this_1 = this;
        for (var index = 0; index < fromRouterDirection.length; index++) {
            _loop_4(index);
        }
        return tokens;
    };
    PancakeswapRouterFactory.prototype.getToRouterDirectionAvailablePairs = function (token, allAvailablePairs) {
        var toRouterDirection = allAvailablePairs.filter(function (c) { return c.reference.split('-')[1] === token.contractAddress; });
        var tokens = [];
        var _loop_5 = function (index) {
            var context = toRouterDirection[index];
            tokens.push(this_2.allTokens.find(function (t) { return t.contractAddress === context.reference.split('-')[0]; }));
        };
        var this_2 = this;
        for (var index = 0; index < toRouterDirection.length; index++) {
            _loop_5(index);
        }
        return tokens;
    };
    /**
     * Build up route quotes from results
     * @param pancakeswapFactoryContext The pancakeswap factory context
     * @param contractCallReturnContext The contract call return context
     */
    PancakeswapRouterFactory.prototype.buildRouteQuotesFromResults = function (contractCallReturnContext) {
        var tradePath = this.tradePath();
        var result = [];
        if (contractCallReturnContext) {
            for (var i = 0; i < contractCallReturnContext.callsReturnContext.length; i++) {
                var callReturnContext = contractCallReturnContext.callsReturnContext[i];
                switch (tradePath) {
                    case trade_path_2.TradePath.ethToErc20:
                        result.push(this.buildRouteQuoteForEthToErc20(callReturnContext));
                        break;
                    case trade_path_2.TradePath.erc20ToEth:
                        result.push(this.buildRouteQuoteForErc20ToEth(callReturnContext));
                        break;
                    case trade_path_2.TradePath.erc20ToErc20:
                        result.push(this.buildRouteQuoteForErc20ToErc20(callReturnContext));
                        break;
                    default:
                        throw new pancakeswap_error_1.PancakeswapError("".concat(tradePath, " not found"), error_codes_1.ErrorCodes.tradePathIsNotSupported);
                }
            }
            return result.sort(function (a, b) {
                if (new bignumber_js_1["default"](a.expectedConvertQuote).isGreaterThan(b.expectedConvertQuote)) {
                    return -1;
                }
                return new bignumber_js_1["default"](a.expectedConvertQuote).isLessThan(b.expectedConvertQuote)
                    ? 1
                    : 0;
            });
        }
        return result;
    };
    /**
     * Build up the route quote for erc20 > erc20
     * @param callReturnContext The call return context
     */
    PancakeswapRouterFactory.prototype.buildRouteQuoteForErc20ToErc20 = function (callReturnContext) {
        return this.buildRouteQuoteForEthToErc20(callReturnContext);
    };
    /**
     * Build up route quote for eth > erc20
     * @param callReturnContext The call return context
     */
    PancakeswapRouterFactory.prototype.buildRouteQuoteForEthToErc20 = function (callReturnContext) {
        var _this = this;
        var convertQuoteUnformatted = new bignumber_js_1["default"](callReturnContext.returnValues[callReturnContext.returnValues.length - 1].hex);
        return {
            expectedConvertQuote: convertQuoteUnformatted
                .shiftedBy(this._toToken.decimals * -1)
                .toFixed(this._toToken.decimals),
            routePathArrayTokenMap: callReturnContext.methodParameters[1].map(function (c) {
                return _this.allTokens.find(function (t) { return t.contractAddress === c; });
            }),
            routeText: callReturnContext.methodParameters[1]
                .map(function (c) {
                return _this.allTokens.find(function (t) { return t.contractAddress === c; }).symbol;
            })
                .join(' > '),
            // route array is always in the 1 index of the method parameters
            routePathArray: callReturnContext.methodParameters[1]
        };
    };
    /**
     * Build up the route quote for erc20 > eth
     * @param callReturnContext The call return context
     */
    PancakeswapRouterFactory.prototype.buildRouteQuoteForErc20ToEth = function (callReturnContext) {
        var _this = this;
        var convertQuoteUnformatted = new bignumber_js_1["default"](callReturnContext.returnValues[callReturnContext.returnValues.length - 1].hex);
        return {
            expectedConvertQuote: new bignumber_js_1["default"]((0, format_ether_1.formatEther)(convertQuoteUnformatted)).toFixed(this._toToken.decimals),
            routePathArrayTokenMap: callReturnContext.methodParameters[1].map(function (c) {
                return _this.allTokens.find(function (t) { return t.contractAddress === c; });
            }),
            routeText: callReturnContext.methodParameters[1]
                .map(function (c) {
                return _this.allTokens.find(function (t) { return t.contractAddress === c; }).symbol;
            })
                .join(' > '),
            // route array is always in the 1 index of the method parameters
            routePathArray: callReturnContext.methodParameters[1]
        };
    };
    /**
     * Format amount to trade into callable formats
     * @param amountToTrade The amount to trade
     * @param pancakeswapFactoryContext The pancakeswap factory context
     */
    PancakeswapRouterFactory.prototype.formatAmountToTrade = function (amountToTrade) {
        switch (this.tradePath()) {
            case trade_path_2.TradePath.ethToErc20:
                var amountToTradeWei = (0, parse_ether_1.parseEther)(amountToTrade);
                return (0, hexlify_1.hexlify)(amountToTradeWei);
            case trade_path_2.TradePath.erc20ToEth:
            case trade_path_2.TradePath.erc20ToErc20:
                return (0, hexlify_1.hexlify)(amountToTrade.shiftedBy(this._fromToken.decimals));
            default:
                throw new pancakeswap_error_1.PancakeswapError("Internal trade path ".concat(this.tradePath(), " is not supported"), error_codes_1.ErrorCodes.tradePathIsNotSupported);
        }
    };
    /**
     * Get the trade path
     */
    PancakeswapRouterFactory.prototype.tradePath = function () {
        return (0, trade_path_1.getTradePath)(this._fromToken, this._toToken);
    };
    Object.defineProperty(PancakeswapRouterFactory.prototype, "allTokens", {
        get: function () {
            return __spreadArray([this._fromToken, this._toToken], this.allMainTokens, true);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PancakeswapRouterFactory.prototype, "allMainTokens", {
        get: function () {
            if (this._ethersProvider.provider.network.chainId === chain_id_1.ChainId.BSC) {
                return [
                    this.USDTTokenForConnectedNetwork,
                    this.COMPTokenForConnectedNetwork,
                    this.USDCTokenForConnectedNetwork,
                    this.DAITokenForConnectedNetwork,
                    this.WETHTokenForConnectedNetwork,
                ];
            }
            return [this.WETHTokenForConnectedNetwork];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PancakeswapRouterFactory.prototype, "mainCurrenciesPairsForFromToken", {
        get: function () {
            var pairs = [
                [this._fromToken, this.USDTTokenForConnectedNetwork],
                [this._fromToken, this.COMPTokenForConnectedNetwork],
                [this._fromToken, this.USDCTokenForConnectedNetwork],
                [this._fromToken, this.DAITokenForConnectedNetwork],
                [this._fromToken, this.WETHTokenForConnectedNetwork],
            ];
            return pairs.filter(function (t) { return t[0].contractAddress !== t[1].contractAddress; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PancakeswapRouterFactory.prototype, "mainCurrenciesPairsForToToken", {
        get: function () {
            var pairs = [
                [this.USDTTokenForConnectedNetwork, this._toToken],
                [this.COMPTokenForConnectedNetwork, this._toToken],
                [this.USDCTokenForConnectedNetwork, this._toToken],
                [this.DAITokenForConnectedNetwork, this._toToken],
                [this.WETHTokenForConnectedNetwork, this._toToken],
            ];
            return pairs.filter(function (t) { return t[0].contractAddress !== t[1].contractAddress; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PancakeswapRouterFactory.prototype, "mainCurrenciesPairsForUSDT", {
        get: function () {
            return [
                [this.USDTTokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
                [this.USDTTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
                [this.USDTTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
                [this.USDTTokenForConnectedNetwork, this.WETHTokenForConnectedNetwork],
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PancakeswapRouterFactory.prototype, "mainCurrenciesPairsForCOMP", {
        get: function () {
            return [
                [this.COMPTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
                [this.COMPTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
                [this.COMPTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
                [this.COMPTokenForConnectedNetwork, this.WETHTokenForConnectedNetwork],
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PancakeswapRouterFactory.prototype, "mainCurrenciesPairsForDAI", {
        get: function () {
            return [
                [this.DAITokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
                [this.DAITokenForConnectedNetwork, this.WETHTokenForConnectedNetwork],
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PancakeswapRouterFactory.prototype, "mainCurrenciesPairsForUSDC", {
        get: function () {
            return [
                [this.USDCTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
                [this.USDCTokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
                [this.USDCTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
                [this.USDCTokenForConnectedNetwork, this.WETHTokenForConnectedNetwork],
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PancakeswapRouterFactory.prototype, "mainCurrenciesPairsForWETH", {
        get: function () {
            return [
                [this.WETHTokenForConnectedNetwork, this.USDTTokenForConnectedNetwork],
                [this.WETHTokenForConnectedNetwork, this.COMPTokenForConnectedNetwork],
                [this.WETHTokenForConnectedNetwork, this.DAITokenForConnectedNetwork],
                [this.WETHTokenForConnectedNetwork, this.USDCTokenForConnectedNetwork],
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PancakeswapRouterFactory.prototype, "USDTTokenForConnectedNetwork", {
        get: function () {
            return usdt_1.USDT.token();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PancakeswapRouterFactory.prototype, "COMPTokenForConnectedNetwork", {
        get: function () {
            return comp_1.COMP.token();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PancakeswapRouterFactory.prototype, "DAITokenForConnectedNetwork", {
        get: function () {
            return dai_1.DAI.token();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PancakeswapRouterFactory.prototype, "USDCTokenForConnectedNetwork", {
        get: function () {
            return usdc_1.USDC.token();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PancakeswapRouterFactory.prototype, "WETHTokenForConnectedNetwork", {
        get: function () {
            return bnb_1.BNB.token();
        },
        enumerable: false,
        configurable: true
    });
    return PancakeswapRouterFactory;
}());
exports.PancakeswapRouterFactory = PancakeswapRouterFactory;
