"use strict";
exports.__esModule = true;
exports.PancakeswapPairSettings = void 0;
var PancakeswapPairSettings = /** @class */ (function () {
    function PancakeswapPairSettings(settings) {
        this.slippage = (settings === null || settings === void 0 ? void 0 : settings.slippage) || 0.005;
        this.deadlineMinutes = (settings === null || settings === void 0 ? void 0 : settings.deadlineMinutes) || 20;
        this.disableMultihops = (settings === null || settings === void 0 ? void 0 : settings.disableMultihops) || false;
    }
    return PancakeswapPairSettings;
}());
exports.PancakeswapPairSettings = PancakeswapPairSettings;
