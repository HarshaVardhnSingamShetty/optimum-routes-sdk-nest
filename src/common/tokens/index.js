"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.USDT = exports.USDC = exports.DAI = exports.COMP = exports.BNB = void 0;
var bnb_1 = require("./bnb");
__createBinding(exports, bnb_1, "BNB");
var comp_1 = require("./comp");
__createBinding(exports, comp_1, "COMP");
var dai_1 = require("./dai");
__createBinding(exports, dai_1, "DAI");
var usdc_1 = require("./usdc");
__createBinding(exports, usdc_1, "USDC");
var usdt_1 = require("./usdt");
__createBinding(exports, usdt_1, "USDT");
