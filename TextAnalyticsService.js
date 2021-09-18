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
var ai_text_analytics_1 = require("@azure/ai-text-analytics");
var TextAnalyticsService = /** @class */ (function () {
    function TextAnalyticsService(textAnalyticsKey, textAnalyticsEndPoint) {
        this.textAnalyticsKey = textAnalyticsKey;
        this.textAnalyticsEndPoint = textAnalyticsEndPoint;
        this.cognitiveServiceCredentials = new ai_text_analytics_1.AzureKeyCredential(textAnalyticsKey);
        this.client = new ai_text_analytics_1.TextAnalyticsClient(this.textAnalyticsEndPoint, new ai_text_analytics_1.AzureKeyCredential(this.textAnalyticsKey));
    }
    TextAnalyticsService.prototype.analyzeTextSentiments = function (texts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.client
                    .analyzeSentiment(texts)
                    .then(function (result) {
                    console.log("The result is:");
                    console.log(result);
                    // result.documents!.forEach(document => {
                    //     console.log(`Id: ${document.id}`);
                    //     console.log("Detected Languages:");
                    //     document.detectedLanguages!.forEach(dl => {
                    //         console.log(dl.name);
                    //     });
                    //     console.log(
                    //         `Characters Count: ${document.statistics!.charactersCount}`
                    //     );
                    //     console.log(
                    //         `Transactions Count: ${document.statistics!.transactionsCount}`
                    //     );
                    // });
                })["catch"](function (err) {
                    console.log("An error occurred:");
                    console.error(err);
                });
                return [2 /*return*/];
            });
        });
    };
    TextAnalyticsService.prototype.analyzeTextKeyEntities = function (texts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.client
                    .recognizeEntities(texts, "en")
                    .then(function (result) {
                    console.log("The result is:");
                    console.log(result);
                    result.forEach(function (result) {
                        console.log(result);
                        // console.log(`Id: ${result.id}`);
                        // console.log("Entities:");
                    });
                })["catch"](function (err) {
                    console.log("An error occurred:");
                    console.error(err);
                });
                return [2 /*return*/];
            });
        });
    };
    return TextAnalyticsService;
}());
exports["default"] = TextAnalyticsService;
