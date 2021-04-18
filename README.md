# Stockity
Find Stocks that are trending on social media

# Backend

## Installation

##### Initialize a virtual environment

Windows:
```
$ python -m venv venv
$ venv\Scripts\activate.bat
```

Unix/MacOS:
```
$ python -m venv venv
$ source venv/bin/activate
```
##### Install the dependencies

```
cd Backend/TrendingStockApp
$ pip install -r requirements.txt
```

##### Running the backend server

```
$ python app.py
```


## API Endpoints

1. Get trending Reddit stocks,
`/trending/reddit` 

2. Get trending Twitter stocks,
`/trending/twitter` 

3. Ticker Data,
`/ticker/<ticker_name>` 

4. Ticker Sustainability Data,
`/ticker/<ticker_name>/sustainabilty` 

5. Ticker Recommendation Data,
`/ticker/<ticker_name>/recommendations` 

6. Ticker Sentiment Data,
`/ticker/<ticker_name>/sentiment` 

7. Ticker Chart,
`/ticker/<ticker_name>/chart` 

8. Ticker Tweets,
`/ticker/<ticker_name>/tweets` 

9. Get **Top** trending Reddit stocks,(Fetches only those stocks with score>5)
`/trending/reddit/top` 

10. Get **Top** trending Twitter stocks,(Fetches only those stocks with score>5)
`/trending/twitter/top`


# Frontend

##### Install the dependencies

```
cd Frontend/TrendingStockApp
$ npm i
```

##### Running the client

```
$ npm install -g @angular/cli
$ ng serve --open
```

#### Enviornment Variables
* Need to retrieve apiKey from https://finnhub.io/ before procedding 
1. Create an `enviornments` folder inside of `Frontend/TrendingStockApp/src/`
2. Create a file called `enviornments.ts`
3. Enter this code in that file you just made
```
export const environment = {
  production: false,
  api: < finnhub_api_key >,
  sandboxApi: < finnhub_sandbox_api_key >,
};

```

## Routes

1. Initial Home Page,
`/page1`

2. Details Page
`/stock_details/:stock_ticker`
