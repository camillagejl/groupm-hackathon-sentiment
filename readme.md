# SmartMetrics database

## Article

| text_id  | sentiment_positive  |  sentiment_neutral | setiment_negative  |  sentiment_score  |  language_name  |  iso6391Name  |  language_confidence | 
|---|---|---|---|---|---|---|---|
| int  | float  | float  | float  | string  | string | string | float |
| 1  | 0.36  | 0.13 | 0.51  | "mixed"  | "English | "en" | 0.99 |


## Entities
*Each entity should maybe have a quantity, as to how many times it's found in the analysis.*
*Otherwise, we'll just add it as new every time and see how many times it appears in the database.*
*I am also not sure if text_id is necessary or relevant*

| entity_id  |  text_id*  |  entity_text |  entity_category | entity_sub_category  | entity_confidence_score  |
|---|---|---|---|---|---|
| int  |  int  |  string  | string  | string  | float  |
| 1  |  1  | "5"  | "Quantity"  | "Number"  | 0.8  |


## Key phrases
*Same questions as to entities, regarding quantity*

| phrase_id | text_id* | phrase_text  |
|---|---|---|
| int  |  int | string  |  
| 1  |  1 | "The Da Vinci Code"  |