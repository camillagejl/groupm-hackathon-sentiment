// API key and end point.
const api = "647db05f05694c04a9e0677ec1ea1c3c"
const endpoint = "https://groupm-cognitive-services-2.cognitiveservices.azure.com/"

// Import our TextAnalyticsService that talks to our API.
import TextAnalyticsService from "./TextAnalyticsService";

// Creates new instance of our Service with our API key and end point.
const textAnalysis = new TextAnalyticsService(api, endpoint)

// Texts to me analyzed - to be replaced with search results from Bing Search.
const texts: string[] = [
    "I am so happy to be here",
    "This all sucks and you all suck and I cry",
    "Jeg er en papegøje fra Amerika. Min far var papegøjefiskepakker.",
    "Daniel Gerhard Brown (born June 22, 1964) is an American author best known for his thriller novels, including the Robert Langdon novels Angels & Demons (2000), The Da Vinci Code (2003), The Lost Symbol (2009), Inferno (2013) and Origin (2017). His novels are treasure hunts which usually take place over a period of 24 hours.[3] They feature recurring themes of cryptography, art, and conspiracy theories. His books have been translated into 57 languages and, as of 2012, have sold over 200 million copies. Three of them, Angels & Demons, The Da Vinci Code, and Inferno, have been adapted into films.\n" +
    "\n" +
    "The Robert Langdon novels are deeply engaged with Christian themes and historical fiction, and have generated controversy as a result. Brown states on his website that his books are not anti-Christian and he is on a \"constant spiritual journey\" himself.[4] He claims that his book The Da Vinci Code is simply \"an entertaining story that promotes spiritual discussion and debate\" and suggests that the book may be used \"as a positive catalyst for introspection and exploration of our faith.\"[5]"
]

// Calls the analyzing functions.
const getEntities: Promise<any> = textAnalysis.analyzeTextKeyEntities(texts);
const getSentiments: Promise<any> = textAnalysis.analyzeTextSentiments(texts);
const getKeyPhrases: Promise<any> = textAnalysis.analyzeTextKeyPhrases(texts);
const getLanguages: Promise<any> = textAnalysis.analyzeTextLanguage(texts);

const data = [];

let dataId = 0;
let entityId = 0;

interface IEntity {
    entity_id: number,
    entity_text: string,
    entity_category: string,
    entity_sub_category: string,
    entity_confidence_score: number
}

interface IKeyPhrase {

}

interface IDataBlock {
    id: number,
    sentiment_positive: number,
    sentiment_neutral: number,
    sentiment_negative: number,
    sentiment_score: string,
    language_name: string,
    iso6391Name: string,
    language_confidence: number,
    entities: Array<IEntity>
    key_phrases: Array<string>
}

Promise.all([getSentiments, getEntities, getKeyPhrases, getLanguages]).then((values) => {

    const sentiments = values[0];
    const entities = values[1];
    const keyPhrases = values[2];
    const languages = values[3];

    // console.log(sentiments);
    // console.log(entities);
    // console.log(keyPhrases);
    // console.log(languages);

    texts.forEach(text => {
        let dataBlock: IDataBlock = {
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

        sentiments.forEach((sentiment: any) => {
            if (sentiment.id == dataBlock.id) {
                dataBlock.sentiment_positive = sentiment.confidenceScores.positive;
                dataBlock.sentiment_neutral = sentiment.confidenceScores.neutral;
                dataBlock.sentiment_negative = sentiment.confidenceScores.negative;
                dataBlock.sentiment_score = sentiment.sentiment;
            }
        })

        entities.forEach((entity: any) => {
            if (entity.id == dataBlock.id) {
                const entities: Array<IEntity> = [];
                entity.entities.forEach((entity: any) => {

                        const entityBlock: IEntity = {
                            entity_id: entityId,
                            entity_text: entity.text,
                            entity_category: entity.category,
                            entity_sub_category: entity.subCategory,
                            entity_confidence_score: entity.confidenceScore
                        }

                        entityId++;

                        entities.push(entityBlock);
                    }
                )

                dataBlock.entities = (entities)
            }
        })

        keyPhrases.forEach((phrase: any) => {

            if (phrase.id == dataBlock.id) {
                dataBlock.key_phrases = phrase.keyPhrases;
            }
        })

        languages.forEach((language: any) => {
            if (language.id == dataBlock.id) {
                dataBlock.language_name = language.primaryLanguage.name;
                dataBlock.iso6391Name = language.primaryLanguage.iso6391Name;
                dataBlock.language_confidence = language.primaryLanguage.confidenceScore;
            }
        })

        console.log(dataBlock);

    });
})