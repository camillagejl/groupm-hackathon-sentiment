// API key and end point.
const api = "647db05f05694c04a9e0677ec1ea1c3c"
const endpoint = "https://groupm-cognitive-services-2.cognitiveservices.azure.com/"

// Import our TextAnalyticsService that talks to our API.
import TextAnalyticsService from "./TextAnalyticsService";

// Creates new instance of our Service with our API key and end point.
const textAnalysis = new TextAnalyticsService( api, endpoint )

// Texts to me analyzed - to be replaced with search results from Bing Search.
const texts: string[] = [
    "I am so happy to be here",
    "This all sucks and you all suck and I cry",
    "My dinner table is made from wood"
    ]

// Calls the analyzing functions.
// textAnalysis.analyzeTextSentiments(texts);
textAnalysis.analyzeTextKeyEntities(texts);