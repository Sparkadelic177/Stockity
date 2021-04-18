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
$ pip install -r requirements.txt
```

##### Running the app

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
