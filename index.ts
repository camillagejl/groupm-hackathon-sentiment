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
    "Daniel Gerhard Brown (born June 22, 1964) is an American author best known for his thriller novels, including the Robert Langdon novels Angels & Demons (2000), The Da Vinci Code (2003), The Lost Symbol (2009), Inferno (2013) and Origin (2017). His novels are treasure hunts which usually take place over a period of 24 hours.[3] They feature recurring themes of cryptography, art, and conspiracy theories. His books have been translated into 57 languages and, as of 2012, have sold over 200 million copies. Three of them, Angels & Demons, The Da Vinci Code, and Inferno, have been adapted into films.\n" +
    "\n" +
    "The Robert Langdon novels are deeply engaged with Christian themes and historical fiction, and have generated controversy as a result. Brown states on his website that his books are not anti-Christian and he is on a \"constant spiritual journey\" himself.[4] He claims that his book The Da Vinci Code is simply \"an entertaining story that promotes spiritual discussion and debate\" and suggests that the book may be used \"as a positive catalyst for introspection and exploration of our faith.\"[5]"
    ]

// Calls the analyzing functions.
textAnalysis.analyzeTextSentiments(texts);
// textAnalysis.analyzeTextKeyEntities(texts);