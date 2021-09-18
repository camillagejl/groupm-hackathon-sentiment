"use strict";
exports.__esModule = true;
// API key and end point.
var api = "647db05f05694c04a9e0677ec1ea1c3c";
var endpoint = "https://groupm-cognitive-services-2.cognitiveservices.azure.com/";
// Import our TextAnalyticsService that talks to our API.
var TextAnalyticsService_1 = require("./TextAnalyticsService");
// Creates new instance of our Service with our API key and end point.
var textAnalysis = new TextAnalyticsService_1["default"](api, endpoint);
// Texts to me analyzed - to be replaced with search results from Bing Search.
var texts = [
    "I am so happy to be here",
    "This all sucks and you all suck and I cry",
    "My dinner table is made from wood"
];
// Calls the analyzing functions.
// textAnalysis.analyzeTextSentiments(texts);
textAnalysis.analyzeTextKeyEntities(texts);
