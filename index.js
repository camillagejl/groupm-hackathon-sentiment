"use strict";
exports.__esModule = true;
var sentence = "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after" +
    "Jupiter. It is a gas giant with an average radius about nine times that of Earth.r";
var TextAnalyticsService_1 = require("./TextAnalyticsService");
var api = "6b7b6fb79fc04af690a3eb603d1362f5";
var endpoint = "https://groupm-cognitive-service.cognitiveservices.azure.com/";
var textAnalysis = new TextAnalyticsService_1["default"](api, endpoint);
var options = [sentence];
textAnalysis.analyzeText(options);
