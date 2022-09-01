"use strict";
exports.__esModule = true;
exports.isAddress = void 0;
var ethers_1 = require("ethers");
function isAddress(address) {
    return ethers_1.ethers.utils.isAddress(address);
}
exports.isAddress = isAddress;
