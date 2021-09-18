import { CognitiveServicesCredentials } from "@azure/ms-rest-azure-js";
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

    public async analyzeText(options: string[]): Promise<void> {
        this.client
            .analyzeSentiment(options)
            .then(result => {
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
            })
            .catch(err => {
                console.log("An error occurred:");
                console.error(err);
            });
    }
}