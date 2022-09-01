"use strict";
exports.__esModule = true;
exports.parseEther = void 0;
var bignumber_js_1 = require("bignumber.js");
var utils_1 = require("ethers/lib/utils");
/**
 * Convert a string value to wei
 * @param value The value
 */
function parseEther(value) {
    return new bignumber_js_1["default"]((0, utils_1.parseEther)(new bignumber_js_1["default"](value).toFixed()).toHexString());
}
exports.parseEther = parseEther;
