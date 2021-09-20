import amqp from 'amqplib/callback_api';
import { IArticle, IDatablock, IEntity } from './interfaces';
// API key and end point.
const API = "647db05f05694c04a9e0677ec1ea1c3c"
const ENDPOINT = "https://groupm-cognitive-services-2.cognitiveservices.azure.com/"

// Import our TextAnalyticsService that talks to our API.
import TextAnalyticsService from "./TextAnalyticsService";

// Creates new instance of our Service with our API key and end point.
const textAnalysis = new TextAnalyticsService(API, ENDPOINT)



const texts: string[] = [
    "I am so happy to be here",
    "This all sucks and you all suck and I cry",
    "Jeg er en papegøje fra Amerika. Min far var papegøjefiskepakker.",
    "Daniel Gerhard Brown (born June 22, 1964) is an American author best known for his thriller novels, including the Robert Langdon novels Angels & Demons (2000), The Da Vinci Code (2003), The Lost Symbol (2009), Inferno (2013) and Origin (2017). His novels are treasure hunts which usually take place over a period of 24 hours.[3] They feature recurring themes of cryptography, art, and conspiracy theories. His books have been translated into 57 languages and, as of 2012, have sold over 200 million copies. Three of them, Angels & Demons, The Da Vinci Code, and Inferno, have been adapted into films.\n" +
    "\n" +
    "The Robert Langdon novels are deeply engaged with Christian themes and historical fiction, and have generated controversy as a result. Brown states on his website that his books are not anti-Christian and he is on a \"constant spiritual journey\" himself.[4] He claims that his book The Da Vinci Code is simply \"an entertaining story that promotes spiritual discussion and debate\" and suggests that the book may be used \"as a positive catalyst for introspection and exploration of our faith.\"[5]"
]
const SENTIMENT_SERVICE_RESPONSE = 'sentiment-service-response'
const SENTIMENT_SERVICE_REQUEST = 'sentiment-service-request'

const sendToQueue = (channel: amqp.Channel, queue = SENTIMENT_SERVICE_RESPONSE)=>
{           
    return (msg:string)=>{
        console.log(queue)
        channel.sendToQueue(queue, Buffer.from(msg));
    }
}

amqp.connect('amqp://localhost', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    channel.assertQueue(SENTIMENT_SERVICE_REQUEST, {
        durable: false
    });
    channel.assertQueue(SENTIMENT_SERVICE_RESPONSE, {
    durable: false
    });
    channel.consume(SENTIMENT_SERVICE_REQUEST, function(msg) {
        console.log(" [x] Received %s", msg?.content.toString());
        let messages:string[] = msg?.content.toString()?[msg?.content.toString()]:[]
        doMagic(messages,sendToQueue(channel))
      }, {
          noAck: true
    });
  });
});

function doMagic(texts:string[], sendToQueue:(arg0:string)=>void){
    if(texts.length === 0)
        return
    // Calls the analyzing functions.
    const getEntities: Promise<any> = textAnalysis.analyzeTextKeyEntities(texts);
    const getSentiments: Promise<any> = textAnalysis.analyzeTextSentiments(texts);
    const getKeyPhrases: Promise<any> = textAnalysis.analyzeTextKeyPhrases(texts);
    const getLanguages: Promise<any> = textAnalysis.analyzeTextLanguage(texts);

    const data:IArticle[] = [];

    let dataId = 0;
    let entityId = 0;



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
            let dataBlock: IDatablock = {
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

            sendToQueue(JSON.stringify(dataBlock))
        });
    })
}

/**
textAnalysis.analyzeTextSentiments(texts);
// textAnalysis.analyzeTextKeyEntities(texts);

// Texts to me analyzed - to be replaced with search results from Bing Search.
amqp.connect('amqp://localhost', function(error0:Error, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'hello';

    channel.assertQueue(queue, {
      durable: false
    });
    channel.consume(queue, function(msg) {
        console.log(" [x] Received %s", msg?.content.toString());
        textAnalysis.analyzeTextSentiments(texts);
    }, {
          noAck: true
    });
  });
});
 */
