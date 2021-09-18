//@ts-ignore
import Azure from "@azure/cognitiveservices-textanalytics/dist/cognitiveservices-textanalytics.js";

const sentence: string = "This sucks."

import TextAnalyticsService from "./TextAnalyticsService";

const api = "6b7b6fb79fc04af690a3eb603d1362f5"
const endpoint = "https://groupm-cognitive-service.cognitiveservices.azure.com/"

const textAnalysis = new TextAnalyticsService( api, endpoint )

const options: string[] = [sentence]

textAnalysis.analyzeText(options);