import { TextAnalyticsClient, AzureKeyCredential} from "@azure/ai-text-analytics"

export default class TextAnalyticsService {
    textAnalyticsKey: string
    textAnalyticsEndPoint: string
    cognitiveServiceCredentials: AzureKeyCredential
    client: TextAnalyticsClient

    constructor(
        textAnalyticsKey: string,
        textAnalyticsEndPoint: string
    ) {
        this.textAnalyticsKey = textAnalyticsKey
        this.textAnalyticsEndPoint = textAnalyticsEndPoint

        this.cognitiveServiceCredentials = new AzureKeyCredential(
            textAnalyticsKey
        );

        this.client = new TextAnalyticsClient(this.textAnalyticsEndPoint, new AzureKeyCredential(this.textAnalyticsKey));
    }

    public async analyzeTextSentiments(texts: string[]): Promise<any> {
        return await this.client
            .analyzeSentiment(texts)
            .then(result => {
                // console.log("The result is:");
                // console.log(result);
                return result;
            })
            .catch(err => {
                console.log("An error occurred:");
                console.error(err);
            });
    }

    public async analyzeTextKeyEntities(texts: string[]): Promise<any> {
        return await this.client
            .recognizeEntities(texts, "en")
            .then(result => {
                // console.log("The result is:");
                // console.log(result);
                // result.forEach(result => {
                //     console.log(result);
                // });
                return result;
            })
            .catch(err => {
                console.log("An error occurred:");
                console.error(err);
            });
    }

    public async analyzeTextKeyPhrases(texts: string[]): Promise<any> {
        return await this.client
            .extractKeyPhrases(texts, "en")
            .then(result => {
                // console.log("The result is:");
                // console.log(result);
                // result.forEach(result => {
                //     console.log(result);
                // });
                return result;
            })
            .catch(err => {
                console.log("An error occurred:");
                console.error(err);
            });
    }

    public async analyzeTextLanguage(texts: string[]): Promise<any> {
        return await this.client
            .detectLanguage(texts, "none")
            .then(result => {
                // console.log("The result is:");
                // console.log(result);
                // result.forEach(result => {
                //     console.log(result);
                // });
                return result;
            })
            .catch(err => {
                console.log("An error occurred:");
                console.error(err);
            });
    }
}