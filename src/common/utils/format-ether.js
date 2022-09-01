"use strict";
exports.__esModule = true;
exports.formatEther = void 0;
var bignumber_js_1 = require("bignumber.js");
var utils_1 = require("ethers/lib/utils");
/**
 * format ether from wei
 * @param wei The value
 */
function formatEther(
// tslint:disable-next-line: no-any
wei) {
    return new bignumber_js_1["default"]((0, utils_1.formatEther)(new bignumber_js_1["default"](wei).toFixed()));
}
exports.formatEther = formatEther;
