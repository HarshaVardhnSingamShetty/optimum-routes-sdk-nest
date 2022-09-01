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
exports.PancakeswapPairFactory = void 0;
var bignumber_js_1 = require("bignumber.js");
var rxjs_1 = require("rxjs");
var __1 = require("../..");
var constants_1 = require("../../common/constants");
var contract_context_1 = require("../../common/contract-context");
var error_codes_1 = require("../../common/errors/error-codes");
var hexlify_1 = require("../../common/utils/hexlify");
var parse_ether_1 = require("../../common/utils/parse-ether");
var to_ethers_big_number_1 = require("../../common/utils/to-ethers-big-number");
var trade_path_1 = require("../../common/utils/trade-path");
var trade_path_2 = require("../../enums/trade-path");
var pancakeswap_router_contract_factory_1 = require("../router/pancakeswap-router-contract.factory");
var pancakeswap_router_factory_1 = require("../router/pancakeswap-router.factory");
var token_factory_1 = require("../token/token.factory");
var pancakeswap_pair_contract_factory_1 = require("./pancakeswap-pair-contract.factory");
var PancakeswapPairFactory = /** @class */ (function () {
    function PancakeswapPairFactory(_pancakeswapPairFactoryContext) {
        this._pancakeswapPairFactoryContext = _pancakeswapPairFactoryContext;
        this.LIQUIDITY_PROVIDER_FEE = 0.003;
        this._fromTokenFactory = new token_factory_1.TokenFactory(this._pancakeswapPairFactoryContext.fromToken.contractAddress, this._pancakeswapPairFactoryContext.ethersProvider);
        this._pancakeswapRouterContractFactory = new pancakeswap_router_contract_factory_1.PancakeswapRouterContractFactory(this._pancakeswapPairFactoryContext.ethersProvider);
        this._pancakeswapPairFactory = new pancakeswap_pair_contract_factory_1.PancakeswapPairContractFactory(this._pancakeswapPairFactoryContext.ethersProvider);
        this._pancakeswapRouterFactory = new pancakeswap_router_factory_1.PancakeswapRouterFactory(this._pancakeswapPairFactoryContext.fromToken, this._pancakeswapPairFactoryContext.toToken, this._pancakeswapPairFactoryContext.settings.disableMultihops, this._pancakeswapPairFactoryContext.ethersProvider);
        this._quoteChanged$ = new rxjs_1.Subject();
    }
    Object.defineProperty(PancakeswapPairFactory.prototype, "toToken", {
        /**
         * The to token
         */
        get: function () {
            return this._pancakeswapPairFactoryContext.toToken;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PancakeswapPairFactory.prototype, "fromToken", {
        /**
         * The from token
         */
        get: function () {
            return this._pancakeswapPairFactoryContext.fromToken;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PancakeswapPairFactory.prototype, "contractCalls", {
        /**
         * Get the contract calls
         */
        get: function () {
            return this._pancakeswapPairFactory;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Execute the trade path
     * @param amount The amount
     */
    PancakeswapPairFactory.prototype.executeTradePath = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.tradePath();
                        switch (_a) {
                            case trade_path_2.TradePath.erc20ToEth: return [3 /*break*/, 1];
                            case trade_path_2.TradePath.ethToErc20: return [3 /*break*/, 3];
                            case trade_path_2.TradePath.erc20ToErc20: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, this.getTokenTradeAmountErc20ToEth(amount)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, this.getTokenTradeAmountEthToErc20(amount)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: return [4 /*yield*/, this.getTokenTradeAmountErc20ToErc20(amount)];
                    case 6: return [2 /*return*/, _b.sent()];
                    case 7: throw new __1.PancakeswapError("".concat(this.tradePath(), " is not defined"), error_codes_1.ErrorCodes.tradePathIsNotSupported);
                }
            });
        });
    };
    /**
     * Destroy the trade instance watchers + subscriptions
     */
    PancakeswapPairFactory.prototype.destroy = function () {
        for (var i = 0; i < this._quoteChanged$.observers.length; i++) {
            this._quoteChanged$.observers[i].complete();
        }
        if (this._quoteChangeTimeout) {
            clearTimeout(this._quoteChangeTimeout);
        }
    };
    /**
     * Generate trade - this will return amount but you still need to send the transaction
     * if you want it to be executed on the blockchain
     * @amount The amount you want to swap, this is the FROM token amount.
     */
    PancakeswapPairFactory.prototype.trade = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var tradeContext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.destroy();
                        return [4 /*yield*/, this.executeTradePath(new bignumber_js_1["default"](amount))];
                    case 1:
                        tradeContext = _a.sent();
                        this.watchTradePrice(tradeContext);
                        return [2 /*return*/, tradeContext];
                }
            });
        });
    };
    Object.defineProperty(PancakeswapPairFactory.prototype, "_routes", {
        /**
         * Route getter
         */
        get: function () {
            return this._pancakeswapRouterFactory;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Find the best route rate out of all the route quotes
     * @param amountToTrade The amount to trade
     */
    PancakeswapPairFactory.prototype.findBestRoute = function (amountToTrade) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._routes.findBestRoute(new bignumber_js_1["default"](amountToTrade))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Find the best route rate out of all the route quotes
     * @param amountToTrade The amount to trade
     */
    PancakeswapPairFactory.prototype.findAllPossibleRoutesWithQuote = function (amountToTrade) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._routes.getAllPossibleRoutesWithQuotes(new bignumber_js_1["default"](amountToTrade))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Find all possible routes
     */
    PancakeswapPairFactory.prototype.findAllPossibleRoutes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._routes.getAllPossibleRoutes()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Has got enough allowance to do the trade
     * @param amount The amount you want to swap
     */
    PancakeswapPairFactory.prototype.hasGotEnoughAllowance = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var allowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.tradePath() === trade_path_2.TradePath.ethToErc20) {
                            return [2 /*return*/, true];
                        }
                        return [4 /*yield*/, this.allowance()];
                    case 1:
                        allowance = _a.sent();
                        return [2 /*return*/, this._hasGotEnoughAllowance(amount, allowance)];
                }
            });
        });
    };
    /**
     * Has got enough allowance to do the trade
     * @param amount The amount you want to swap
     */
    PancakeswapPairFactory.prototype._hasGotEnoughAllowance = function (amount, allowance) {
        if (this.tradePath() === trade_path_2.TradePath.ethToErc20) {
            return true;
        }
        var bigNumberAllowance = new bignumber_js_1["default"](allowance).shiftedBy(this.fromToken.decimals * -1);
        if (new bignumber_js_1["default"](amount).isGreaterThan(bigNumberAllowance)) {
            return false;
        }
        return true;
    };
    /**
     * Has got enough balance to do the trade (erc20 check only)
     * @param amount The amount you want to swap
     */
    PancakeswapPairFactory.prototype.hasGotEnoughBalanceErc20 = function (amount, balance) {
        var bigNumberBalance = new bignumber_js_1["default"](balance).shiftedBy(this.fromToken.decimals * -1);
        if (new bignumber_js_1["default"](amount).isGreaterThan(bigNumberBalance)) {
            return {
                hasEnough: false,
                balance: bigNumberBalance.toFixed()
            };
        }
        return {
            hasEnough: true,
            balance: bigNumberBalance.toFixed()
        };
    };
    /**
     * Has got enough balance to do the trade (eth check only)
     * @param amount The amount you want to swap
     */
    PancakeswapPairFactory.prototype.hasGotEnoughBalanceEth = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var balance, bigNumberBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._pancakeswapPairFactoryContext.ethersProvider.balanceOf(this._pancakeswapPairFactoryContext.ethereumAddress)];
                    case 1:
                        balance = _a.sent();
                        bigNumberBalance = new bignumber_js_1["default"](balance).shiftedBy(constants_1.Constants.ETH_MAX_DECIMALS * -1);
                        if (new bignumber_js_1["default"](amount).isGreaterThan(bigNumberBalance)) {
                            return [2 /*return*/, {
                                    hasEnough: false,
                                    balance: bigNumberBalance.toFixed()
                                }];
                        }
                        return [2 /*return*/, {
                                hasEnough: true,
                                balance: bigNumberBalance.toFixed()
                            }];
                }
            });
        });
    };
    /**
     * Get the allowance and balance for the from token (erc20 > blah) only
     */
    PancakeswapPairFactory.prototype.getAllowanceAndBalanceOfForFromToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._fromTokenFactory.getAllowanceAndBalanceOf(this._pancakeswapPairFactoryContext.ethereumAddress)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get the allowance for the amount which can be moved from the `fromToken`
     * on the users behalf. Only valid when the `fromToken` is a ERC20 token.
     */
    PancakeswapPairFactory.prototype.allowance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allowance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.tradePath() === trade_path_2.TradePath.ethToErc20) {
                            return [2 /*return*/, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'];
                        }
                        return [4 /*yield*/, this._fromTokenFactory.allowance(this._pancakeswapPairFactoryContext.ethereumAddress)];
                    case 1:
                        allowance = _a.sent();
                        return [2 /*return*/, allowance];
                }
            });
        });
    };
    /**
     * Generate the from token approve data max allowance to move the tokens.
     * This will return the data for you to send as a transaction
     */
    PancakeswapPairFactory.prototype.generateApproveMaxAllowanceData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                if (this.tradePath() === trade_path_2.TradePath.ethToErc20) {
                    throw new __1.PancakeswapError('You do not need to generate approve pancakeswap allowance when doing eth > erc20', error_codes_1.ErrorCodes.generateApproveMaxAllowanceDataNotAllowed);
                }
                data = this._fromTokenFactory.generateApproveAllowanceData(contract_context_1.ContractContext.routerAddress, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
                return [2 /*return*/, {
                        to: this.fromToken.contractAddress,
                        from: this._pancakeswapPairFactoryContext.ethereumAddress,
                        data: data,
                        value: constants_1.Constants.EMPTY_HEX_STRING
                    }];
            });
        });
    };
    /**
     * Get the token trade amount for erc20 > eth
     * @param amount The amount
     */
    PancakeswapPairFactory.prototype.getTokenTradeAmountErc20ToEth = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findBestPriceAndPathErc20ToEth(amount)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Gets how much token they will get for their trade minus all fees
     * @param ethAmount The eth amount
     */
    PancakeswapPairFactory.prototype.getTokenTradeAmountEthToErc20 = function (ethAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findBestPriceAndPathEthToErc20(ethAmount)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Get the token trade amount for erc20 > erc20
     * @param amount The amount
     */
    PancakeswapPairFactory.prototype.getTokenTradeAmountErc20ToErc20 = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findBestPriceAndPathErc20ToErc20(amount)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * finds the best price and path for Erc20ToEth
     * @param amount the erc20Token amount being sent
     */
    PancakeswapPairFactory.prototype.findBestPriceAndPathErc20ToEth = function (erc20Amount) {
        return __awaiter(this, void 0, void 0, function () {
            var bestRouteQuotes, bestRouteQuote, convertQuoteWithSlippage, tradeExpires, data, allowanceAndBalanceOf, hasEnoughAllowance, tradeContext, _a;
            var _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._routes.findBestRoute(erc20Amount)];
                    case 1:
                        bestRouteQuotes = _c.sent();
                        bestRouteQuote = bestRouteQuotes.bestRouteQuote;
                        convertQuoteWithSlippage = new bignumber_js_1["default"](bestRouteQuote.expectedConvertQuote).minus(new bignumber_js_1["default"](bestRouteQuote.expectedConvertQuote)
                            .times(this._pancakeswapPairFactoryContext.settings.slippage)
                            .toFixed(this.fromToken.decimals));
                        tradeExpires = this.generateTradeDeadlineUnixTime();
                        data = this.generateTradeDataErc20ToEth(erc20Amount, convertQuoteWithSlippage, bestRouteQuote.routePathArray, tradeExpires.toString());
                        return [4 /*yield*/, this.getAllowanceAndBalanceOfForFromToken()];
                    case 2:
                        allowanceAndBalanceOf = _c.sent();
                        hasEnoughAllowance = this._hasGotEnoughAllowance(erc20Amount.toFixed(), allowanceAndBalanceOf.allowance);
                        _b = {
                            baseConvertRequest: erc20Amount.toFixed(),
                            minAmountConvertQuote: convertQuoteWithSlippage.toFixed(this.toToken.decimals),
                            expectedConvertQuote: bestRouteQuote.expectedConvertQuote,
                            liquidityProviderFee: erc20Amount
                                .times(this.LIQUIDITY_PROVIDER_FEE)
                                .toFixed(this.fromToken.decimals),
                            tradeExpires: tradeExpires,
                            routePathTokenMap: bestRouteQuote.routePathArrayTokenMap,
                            routeText: bestRouteQuote.routeText,
                            routePath: bestRouteQuote.routePathArray,
                            hasEnoughAllowance: hasEnoughAllowance
                        };
                        if (!!hasEnoughAllowance) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.generateApproveMaxAllowanceData()];
                    case 3:
                        _a = _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _a = undefined;
                        _c.label = 5;
                    case 5:
                        tradeContext = (_b.approvalTransaction = _a,
                            _b.toToken = this.toToken,
                            _b.fromToken = this.fromToken,
                            _b.fromBalance = this.hasGotEnoughBalanceErc20(erc20Amount.toFixed(), allowanceAndBalanceOf.balanceOf),
                            _b.transaction = this.buildUpTransactionErc20(data),
                            _b.allTriedRoutesQuotes = bestRouteQuotes.triedRoutesQuote,
                            _b.quoteChanged$ = this._quoteChanged$,
                            _b.destroy = function () { return _this.destroy(); },
                            _b);
                        return [2 /*return*/, tradeContext];
                }
            });
        });
    };
    /**
     * finds the best price and path for Erc20ToErc20
     * @param amount the erc20Token amount being sent
     */
    PancakeswapPairFactory.prototype.findBestPriceAndPathErc20ToErc20 = function (erc20Amount) {
        return __awaiter(this, void 0, void 0, function () {
            var bestRouteQuotes, bestRouteQuote, convertQuoteWithSlippage, tradeExpires, data, allowanceAndBalanceOf, hasEnoughAllowance, tradeContext, _a;
            var _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._routes.findBestRoute(erc20Amount)];
                    case 1:
                        bestRouteQuotes = _c.sent();
                        bestRouteQuote = bestRouteQuotes.bestRouteQuote;
                        convertQuoteWithSlippage = new bignumber_js_1["default"](bestRouteQuote.expectedConvertQuote).minus(new bignumber_js_1["default"](bestRouteQuote.expectedConvertQuote)
                            .times(this._pancakeswapPairFactoryContext.settings.slippage)
                            .toFixed(this.fromToken.decimals));
                        tradeExpires = this.generateTradeDeadlineUnixTime();
                        data = this.generateTradeDataErc20ToErc20(erc20Amount, convertQuoteWithSlippage, bestRouteQuote.routePathArray, tradeExpires.toString());
                        return [4 /*yield*/, this.getAllowanceAndBalanceOfForFromToken()];
                    case 2:
                        allowanceAndBalanceOf = _c.sent();
                        hasEnoughAllowance = this._hasGotEnoughAllowance(erc20Amount.toFixed(), allowanceAndBalanceOf.allowance);
                        _b = {
                            baseConvertRequest: erc20Amount.toFixed(),
                            minAmountConvertQuote: convertQuoteWithSlippage.toFixed(this.toToken.decimals),
                            expectedConvertQuote: bestRouteQuote.expectedConvertQuote,
                            liquidityProviderFee: erc20Amount
                                .times(this.LIQUIDITY_PROVIDER_FEE)
                                .toFixed(this.fromToken.decimals),
                            tradeExpires: tradeExpires,
                            routePathTokenMap: bestRouteQuote.routePathArrayTokenMap,
                            routeText: bestRouteQuote.routeText,
                            routePath: bestRouteQuote.routePathArray,
                            hasEnoughAllowance: hasEnoughAllowance
                        };
                        if (!!hasEnoughAllowance) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.generateApproveMaxAllowanceData()];
                    case 3:
                        _a = _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _a = undefined;
                        _c.label = 5;
                    case 5:
                        tradeContext = (_b.approvalTransaction = _a,
                            _b.toToken = this.toToken,
                            _b.fromToken = this.fromToken,
                            _b.fromBalance = this.hasGotEnoughBalanceErc20(erc20Amount.toFixed(), allowanceAndBalanceOf.balanceOf),
                            _b.transaction = this.buildUpTransactionErc20(data),
                            _b.allTriedRoutesQuotes = bestRouteQuotes.triedRoutesQuote,
                            _b.quoteChanged$ = this._quoteChanged$,
                            _b.destroy = function () { return _this.destroy(); },
                            _b);
                        return [2 /*return*/, tradeContext];
                }
            });
        });
    };
    /**
     * Find the best price and route path to take (will round down the slippage)
     * @param ethAmount The eth amount
     */
    PancakeswapPairFactory.prototype.findBestPriceAndPathEthToErc20 = function (ethAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var bestRouteQuotes, bestRouteQuote, convertQuoteWithSlippage, tradeExpires, data, tradeContext;
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this._routes.findBestRoute(ethAmount)];
                    case 1:
                        bestRouteQuotes = _b.sent();
                        bestRouteQuote = bestRouteQuotes.bestRouteQuote;
                        convertQuoteWithSlippage = new bignumber_js_1["default"](bestRouteQuote.expectedConvertQuote).minus(new bignumber_js_1["default"](bestRouteQuote.expectedConvertQuote)
                            .times(this._pancakeswapPairFactoryContext.settings.slippage)
                            .toFixed(this.toToken.decimals));
                        tradeExpires = this.generateTradeDeadlineUnixTime();
                        data = this.generateTradeDataEthToErc20(convertQuoteWithSlippage, bestRouteQuote.routePathArray, tradeExpires.toString());
                        _a = {
                            baseConvertRequest: ethAmount.toFixed(),
                            minAmountConvertQuote: convertQuoteWithSlippage.toFixed(this.toToken.decimals),
                            expectedConvertQuote: bestRouteQuote.expectedConvertQuote,
                            liquidityProviderFee: ethAmount
                                .times(this.LIQUIDITY_PROVIDER_FEE)
                                .toFixed(this.fromToken.decimals),
                            tradeExpires: tradeExpires,
                            routePathTokenMap: bestRouteQuote.routePathArrayTokenMap,
                            routeText: bestRouteQuote.routeText,
                            routePath: bestRouteQuote.routePathArray,
                            hasEnoughAllowance: true,
                            toToken: this.toToken,
                            fromToken: this.fromToken
                        };
                        return [4 /*yield*/, this.hasGotEnoughBalanceEth(ethAmount.toFixed())];
                    case 2:
                        tradeContext = (_a.fromBalance = _b.sent(),
                            _a.transaction = this.buildUpTransactionEth(ethAmount, data),
                            _a.allTriedRoutesQuotes = bestRouteQuotes.triedRoutesQuote,
                            _a.quoteChanged$ = this._quoteChanged$,
                            _a.destroy = function () { return _this.destroy(); },
                            _a);
                        return [2 /*return*/, tradeContext];
                }
            });
        });
    };
    /**
     * Generate trade data eth > erc20
     * @param tokenAmount The token amount
     * @param routePath The route path
     * @param deadline The deadline it expiries unix time
     */
    PancakeswapPairFactory.prototype.generateTradeDataEthToErc20 = function (tokenAmount, routePathArray, deadline) {
        // pancakeswap adds extra digits on even if the token is say 8 digits long
        var convertedMinTokens = tokenAmount
            .shiftedBy(this.toToken.decimals)
            .decimalPlaces(0);
        var hex = (0, hexlify_1.hexlify)(convertedMinTokens);
        return this._pancakeswapRouterContractFactory.swapExactETHForTokens(hex, routePathArray, this._pancakeswapPairFactoryContext.ethereumAddress, deadline);
    };
    /**
     * Generate trade amount erc20 > eth
     * @param tokenAmount The token amount
     * @param ethAmountOutMin The min eth in eth not wei this converts it
     * @param routePathArray The route path array
     * @param deadline The deadline it expiries unix time
     */
    PancakeswapPairFactory.prototype.generateTradeDataErc20ToEth = function (tokenAmount, ethAmountOutMin, routePathArray, deadline) {
        // pancakeswap adds extra digits on even if the token is say 8 digits long
        var amountIn = tokenAmount
            .shiftedBy(this.fromToken.decimals)
            .decimalPlaces(0);
        var ethAmountOutWei = (0, hexlify_1.hexlify)((0, parse_ether_1.parseEther)(ethAmountOutMin));
        return this._pancakeswapRouterContractFactory.swapExactTokensForETH((0, hexlify_1.hexlify)(amountIn), ethAmountOutWei, routePathArray, this._pancakeswapPairFactoryContext.ethereumAddress, deadline);
    };
    /**
     * Generate trade amount erc20 > erc20
     * @param tokenAmount The token amount
     * @param tokenAmountOut The min token amount out
     * @param routePathArray The route path array
     * @param deadline The deadline it expiries unix time
     */
    PancakeswapPairFactory.prototype.generateTradeDataErc20ToErc20 = function (tokenAmount, tokenAmountMin, routePathArray, deadline) {
        // pancakeswap adds extra digits on even if the token is say 8 digits long
        var amountIn = tokenAmount
            .shiftedBy(this.fromToken.decimals)
            .decimalPlaces(0);
        var amountMin = tokenAmountMin
            .shiftedBy(this.toToken.decimals)
            .decimalPlaces(0);
        return this._pancakeswapRouterContractFactory.swapExactTokensForTokens((0, hexlify_1.hexlify)(amountIn), (0, hexlify_1.hexlify)(amountMin), routePathArray, this._pancakeswapPairFactoryContext.ethereumAddress, deadline);
    };
    /**
     * Build up a transaction for erc20 from
     * @param data The data
     */
    PancakeswapPairFactory.prototype.buildUpTransactionErc20 = function (data) {
        return {
            to: contract_context_1.ContractContext.routerAddress,
            from: this._pancakeswapPairFactoryContext.ethereumAddress,
            data: data,
            value: constants_1.Constants.EMPTY_HEX_STRING
        };
    };
    /**
     * Build up a transaction for eth from
     * @param ethValue The eth value
     * @param data The data
     */
    PancakeswapPairFactory.prototype.buildUpTransactionEth = function (ethValue, data) {
        return {
            to: contract_context_1.ContractContext.routerAddress,
            from: this._pancakeswapPairFactoryContext.ethereumAddress,
            data: data,
            value: (0, to_ethers_big_number_1.toEthersBigNumber)((0, parse_ether_1.parseEther)(ethValue)).toHexString()
        };
    };
    /**
     * Get the trade path
     */
    PancakeswapPairFactory.prototype.tradePath = function () {
        return (0, trade_path_1.getTradePath)(this.fromToken, this.toToken);
    };
    /**
     * Generates the trade datetime unix time
     */
    PancakeswapPairFactory.prototype.generateTradeDeadlineUnixTime = function () {
        var now = new Date();
        var expiryDate = new Date(now.getTime() +
            this._pancakeswapPairFactoryContext.settings.deadlineMinutes * 60000);
        return (expiryDate.getTime() / 1e3) | 0;
    };
    /**
     * Watch trade price move automatically emitting the stream if it changes
     * @param tradeContext The old trade context aka the current one
     */
    PancakeswapPairFactory.prototype.watchTradePrice = function (tradeContext) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this._quoteChangeTimeout = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var trade;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(this._quoteChanged$.observers.length > 0)) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.executeTradePath(new bignumber_js_1["default"](tradeContext.baseConvertRequest))];
                            case 1:
                                trade = _a.sent();
                                if (!new bignumber_js_1["default"](trade.expectedConvertQuote).eq(tradeContext.expectedConvertQuote) ||
                                    trade.routeText !== tradeContext.routeText) {
                                    this._quoteChanged$.next(trade);
                                    this.watchTradePrice(trade);
                                    return [2 /*return*/];
                                }
                                // it has expired send another one to them
                                if (tradeContext.tradeExpires > this.generateTradeDeadlineUnixTime()) {
                                    this._quoteChanged$.next(trade);
                                    this.watchTradePrice(trade);
                                    return [2 /*return*/];
                                }
                                this.watchTradePrice(tradeContext);
                                return [3 /*break*/, 3];
                            case 2:
                                this.watchTradePrice(tradeContext);
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); }, 10000);
                return [2 /*return*/];
            });
        });
    };
    return PancakeswapPairFactory;
}());
exports.PancakeswapPairFactory = PancakeswapPairFactory;
