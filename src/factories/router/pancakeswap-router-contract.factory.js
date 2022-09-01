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
exports.PancakeswapRouterContractFactory = void 0;
var contract_context_1 = require("../../common/contract-context");
var PancakeswapRouterContractFactory = /** @class */ (function () {
    function PancakeswapRouterContractFactory(_ethersProvider) {
        this._ethersProvider = _ethersProvider;
        this._pancakeswapRouterContract = this._ethersProvider.getContract(JSON.stringify(contract_context_1.ContractContext.routerAbi), contract_context_1.ContractContext.routerAddress);
    }
    PancakeswapRouterContractFactory.prototype.addLiquidity = function (tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin, to, deadline) {
        return this._pancakeswapRouterContract.interface.encodeFunctionData('addLiquidity', [
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin,
            to,
            deadline,
        ]);
    };
    PancakeswapRouterContractFactory.prototype.addLiquidityETH = function (token, amountTokenDesired, amountTokenMin, amountETHMin, to, deadline) {
        return this._pancakeswapRouterContract.interface.encodeFunctionData('addLiquidityETH', [token, amountTokenDesired, amountTokenMin, amountETHMin, to, deadline]);
    };
    PancakeswapRouterContractFactory.prototype.factory = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._pancakeswapRouterContract.factory()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PancakeswapRouterContractFactory.prototype.getAmountsOut = function (amountIn, path) {
        return __awaiter(this, void 0, void 0, function () {
            var amounts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._pancakeswapRouterContract.getAmountsOut(amountIn, path)];
                    case 1:
                        amounts = _a.sent();
                        return [2 /*return*/, amounts.map(function (c) { return c.toHexString(); })];
                }
            });
        });
    };
    PancakeswapRouterContractFactory.prototype.quote = function (amountA, reserveA, reserveB) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._pancakeswapRouterContract.quote(amountA, reserveA, reserveB)];
                    case 1: return [2 /*return*/, (_a.sent()).toHexString()];
                }
            });
        });
    };
    PancakeswapRouterContractFactory.prototype.removeLiquidity = function (tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline) {
        return this._pancakeswapRouterContract.interface.encodeFunctionData('removeLiquidity', [tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline]);
    };
    PancakeswapRouterContractFactory.prototype.removeLiquidityETH = function (token, liquidity, amountTokenMin, amountETHMin, to, deadline) {
        return this._pancakeswapRouterContract.interface.encodeFunctionData('removeLiquidity', [token, liquidity, amountTokenMin, amountETHMin, to, deadline]);
    };
    PancakeswapRouterContractFactory.prototype.removeLiquidityETHSupportingFeeOnTransferTokens = function (token, liquidity, amountTokenMin, amountETHMin, to, deadline) {
        return this._pancakeswapRouterContract.interface.encodeFunctionData('removeLiquidityETHSupportingFeeOnTransferTokens', [token, liquidity, amountTokenMin, amountETHMin, to, deadline]);
    };
    PancakeswapRouterContractFactory.prototype.removeLiquidityETHWithPermit = function (token, liquidity, amountTokenMin, amountETHMin, to, deadline, approveMax, v, r, s) {
        return this._pancakeswapRouterContract.interface.encodeFunctionData('removeLiquidityETHWithPermit', [
            token,
            liquidity,
            amountTokenMin,
            amountETHMin,
            to,
            deadline,
            approveMax,
            v,
            r,
            s,
        ]);
    };
    PancakeswapRouterContractFactory.prototype.removeLiquidityETHWithPermitSupportingFeeOnTransferTokens = function (token, liquidity, amountTokenMin, amountETHMin, to, deadline, approveMax, v, r, s) {
        return this._pancakeswapRouterContract.interface.encodeFunctionData('removeLiquidityETHWithPermitSupportingFeeOnTransferTokens', [
            token,
            liquidity,
            amountTokenMin,
            amountETHMin,
            to,
            deadline,
            approveMax,
            v,
            r,
            s,
        ]);
    };
    PancakeswapRouterContractFactory.prototype.removeLiquidityWithPermit = function (tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline, approveMax, v, r, s) {
        return this._pancakeswapRouterContract.interface.encodeFunctionData('removeLiquidityWithPermit', [
            tokenA,
            tokenB,
            liquidity,
            amountAMin,
            amountBMin,
            to,
            deadline,
            approveMax,
            v,
            r,
            s,
        ]);
    };
    PancakeswapRouterContractFactory.prototype.swapExactETHForTokens = function (amountOutMin, path, to, deadline) {
        return this._pancakeswapRouterContract.interface.encodeFunctionData('swapExactETHForTokens', [amountOutMin, path, to, deadline]);
    };
    PancakeswapRouterContractFactory.prototype.swapETHForExactTokens = function (amountOut, path, to, deadline) {
        return this._pancakeswapRouterContract.interface.encodeFunctionData('swapETHForExactTokens', [amountOut, path, to, deadline]);
    };
    PancakeswapRouterContractFactory.prototype.swapExactETHForTokensSupportingFeeOnTransferTokens = function (amountIn, amountOutMin, path, to, deadline) {
        return this._pancakeswapRouterContract.interface.encodeFunctionData('swapExactETHForTokensSupportingFeeOnTransferTokens', [amountIn, amountOutMin, path, to, deadline]);
    };
    PancakeswapRouterContractFactory.prototype.swapExactTokensForETH = function (amountIn, amountOutMin, path, to, deadline) {
        return this._pancakeswapRouterContract.interface.encodeFunctionData('swapExactTokensForETH', [amountIn, amountOutMin, path, to, deadline]);
    };
    PancakeswapRouterContractFactory.prototype.swapTokensForExactETH = function (amountOut, amountInMax, path, to, deadline) {
        return this._pancakeswapRouterContract.interface.encodeFunctionData('swapTokensForExactETH', [amountOut, amountInMax, path, to, deadline]);
    };
    PancakeswapRouterContractFactory.prototype.swapExactTokensForETHSupportingFeeOnTransferTokens = function (amountIn, amountOutMin, path, to, deadline) {
        return this._pancakeswapRouterContract.interface.encodeFunctionData('swapExactTokensForETHSupportingFeeOnTransferTokens', [amountIn, amountOutMin, path, to, deadline]);
    };
    PancakeswapRouterContractFactory.prototype.swapExactTokensForTokens = function (amountIn, amountOutMin, path, to, deadline) {
        return this._pancakeswapRouterContract.interface.encodeFunctionData('swapExactTokensForTokens', [amountIn, amountOutMin, path, to, deadline]);
    };
    PancakeswapRouterContractFactory.prototype.swapTokensForExactTokens = function (amountOut, amountInMax, path, to, deadline) {
        return this._pancakeswapRouterContract.interface.encodeFunctionData('swapTokensForExactTokens', [amountOut, amountInMax, path, to, deadline]);
    };
    PancakeswapRouterContractFactory.prototype.swapExactTokensForTokensSupportingFeeOnTransferTokens = function (amountIn, amountOutMin, path, to, deadline) {
        return this._pancakeswapRouterContract.interface.encodeFunctionData('swapExactTokensForTokensSupportingFeeOnTransferTokens', [amountIn, amountOutMin, path, to, deadline]);
    };
    return PancakeswapRouterContractFactory;
}());
exports.PancakeswapRouterContractFactory = PancakeswapRouterContractFactory;
