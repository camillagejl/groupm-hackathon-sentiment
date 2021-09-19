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
    "Jeg er en papegøje fra Amerika. Min far var papegøjefiskepakker.",
    "Daniel Gerhard Brown (born June 22, 1964) is an American author best known for his thriller novels, including the Robert Langdon novels Angels & Demons (2000), The Da Vinci Code (2003), The Lost Symbol (2009), Inferno (2013) and Origin (2017). His novels are treasure hunts which usually take place over a period of 24 hours.[3] They feature recurring themes of cryptography, art, and conspiracy theories. His books have been translated into 57 languages and, as of 2012, have sold over 200 million copies. Three of them, Angels & Demons, The Da Vinci Code, and Inferno, have been adapted into films.\n" +
        "\n" +
        "The Robert Langdon novels are deeply engaged with Christian themes and historical fiction, and have generated controversy as a result. Brown states on his website that his books are not anti-Christian and he is on a \"constant spiritual journey\" himself.[4] He claims that his book The Da Vinci Code is simply \"an entertaining story that promotes spiritual discussion and debate\" and suggests that the book may be used \"as a positive catalyst for introspection and exploration of our faith.\"[5]"
];
// Calls the analyzing functions.
var getEntities = textAnalysis.analyzeTextKeyEntities(texts);
var getSentiments = textAnalysis.analyzeTextSentiments(texts);
var getKeyPhrases = textAnalysis.analyzeTextKeyPhrases(texts);
var getLanguages = textAnalysis.analyzeTextLanguage(texts);
var data = [];
var dataId = 0;
var entityId = 0;
Promise.all([getSentiments, getEntities, getKeyPhrases, getLanguages]).then(function (values) {
    var sentiments = values[0];
    var entities = values[1];
    var keyPhrases = values[2];
    var languages = values[3];
    // console.log(sentiments);
    // console.log(entities);
    // console.log(keyPhrases);
    // console.log(languages);
    texts.forEach(function (text) {
        var dataBlock = {
            id: dataId,
            sentiment_positive: 0,
            sentiment_neutral: 0,
            sentiment_negative: 0,
            sentiment_score: "",
            language_name: "",
            iso6391Name: "",
            language_confidence: 0,
            entities: [],
            key_phrases: []
        };
        // Increments id for the next dataBlock.
        dataId++;
        sentiments.forEach(function (sentiment) {
            if (sentiment.id == dataBlock.id) {
                dataBlock.sentiment_positive = sentiment.confidenceScores.positive;
                dataBlock.sentiment_neutral = sentiment.confidenceScores.neutral;
                dataBlock.sentiment_negative = sentiment.confidenceScores.negative;
                dataBlock.sentiment_score = sentiment.confidenceScores.sentiment;
            }
        });
        entities.forEach(function (entity) {
            if (entity.id === dataBlock.id) {
                var entities_1 = [];
                entity.entities.forEach(function (entity) {
                    var entityBlock = {
                        entity_id: entityId,
                        entity_text: entity.text,
                        entity_category: entity.category,
                        entity_sub_category: entity.subCategory,
                        entity_confidence_score: entity.confidenceScore
                    };
                    entityId++;
                    entities_1.push(entityBlock);
                });
                dataBlock.entities = (entities_1);
            }
        });
        console.log(dataBlock);
        //
        // this.keyPhrases.forEach((phrase: any) => {
        //     if (phrase.id === dataBlock.id) {
        //         dataBlock.key_phrases = phrase.keyPhrases;
        //     }
        // })
        //
        // this.languages.forEach((language: any) => {
        //     if (language.id === dataBlock.id) {
        //         dataBlock.language_name = language.primaryLanguage.name;
        //         dataBlock.iso6391Name = language.primaryLanguage.iso6391Name;
        //         dataBlock.language_confidence = language.primaryLanguage.confidenceScore;
        //     }
        // })
    });
});
