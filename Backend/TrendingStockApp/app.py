import flask
from lxml import html 
from flask import request, jsonify, Response, render_template
import pandas as pd
import json
import yfinance as yf
from nltk.sentiment.vader import SentimentIntensityAnalyzer as SIA
from textblob import TextBlob
import nltk
import requests
import tweepy as tw
from flask_cors import CORS 

nltk.download('vader_lexicon')

app = flask.Flask(__name__)
app.config["DEBUG"] = True

CORS(app)

@app.route('/trending/reddit', methods=['GET'])
def trending_reddit():
    table = pd.read_html('https://unbiastock.com/TableReddit.php?compare2=all&compare_sector=6&mailnews=')
    reddit_df = table[0]
    reddit_df = reddit_df[['Ticker','Reddit Score 1','Previous Score','Score Change %','Stock Price $']]
    reddit_df = reddit_df.rename(columns={"Reddit Score 1": "Reddit Score", "Score Change %": "Score Change", "Stock Price $": "Stock Price" })
    return Response(reddit_df.to_json(orient="records"), mimetype='application/json')

@app.route('/trending/reddit/top', methods=['GET'])
def trending_reddit_top():
    table = pd.read_html('https://unbiastock.com/TableReddit.php?compare2=all&compare_sector=6&mailnews=')
    reddit_df = table[0]
    reddit_df = reddit_df[['Ticker','Reddit Score 1','Previous Score','Score Change %','Stock Price $']]
    reddit_df = reddit_df.rename(columns={"Reddit Score 1": "Reddit Score", "Score Change %": "Score Change", "Stock Price $": "Stock Price" })
    reddit_df.loc[reddit_df['Reddit Score'] >5]
    return Response(reddit_df.to_json(orient="records"), mimetype='application/json')

@app.route('/trending/twitter', methods=['GET'])
def trending_twitter():
    table = pd.read_html('https://unbiastock.com/twitter.php')
    twitter_df = table[0]
    twitter_df = twitter_df[['Ticker','Twitter Score','Previous Score','Score Change %','Stock Price $','Twitter Likes Score','Twitter Retweets Score','Industry']]
    twitter_df = twitter_df.rename(columns={"Score Change %": "Score Change", "Stock Price $": "Stock Price" })
    return Response(twitter_df.to_json(orient="records"), mimetype='application/json')

@app.route('/trending/twitter/top', methods=['GET'])
def trending_twitter_top():
    table = pd.read_html('https://unbiastock.com/twitter.php')
    twitter_df = table[0]
    twitter_df = twitter_df[['Ticker','Twitter Score','Previous Score','Score Change %','Stock Price $','Twitter Likes Score','Twitter Retweets Score','Industry']]
    twitter_df = twitter_df.rename(columns={"Score Change %": "Score Change", "Stock Price $": "Stock Price" })
    twitter_df = twitter_df.loc[twitter_df['Twitter Score'] >5]
    return Response(twitter_df.to_json(orient="records"), mimetype='application/json')

@app.route('/ticker/<string:ticker_name>', methods=['GET'])
def ticker_info(ticker_name):
    ticker = yf.Ticker(ticker_name)
    return jsonify(ticker.info)

@app.route('/ticker/<string:ticker_name>/sustainabilty', methods=['GET'])
def ticker_sustainability(ticker_name):
    ticker = yf.Ticker(ticker_name)
    sus_df = ticker.sustainability
    return jsonify(sus_df.to_dict()['Value'])

@app.route('/ticker/<string:ticker_name>/chart', methods=['GET'])
def ticker_chart(ticker_name):
    return render_template('chart.html', ticker_name=ticker_name)

@app.route('/ticker/<string:ticker_name>/recommendations', methods=['GET'])
def ticker_recommendations(ticker_name):
    ticker = yf.Ticker(ticker_name)
    rec_df = ticker.recommendations
    rec_df = rec_df[-20:]
    rec_df['Date'] = rec_df.index
    rec_df = rec_df[['Firm','To Grade','Date']]
    rec_df['Date'] = rec_df['Date'].dt.strftime('%Y-%m-%d')
    return Response(rec_df.to_json(orient="records"), mimetype='application/json')

@app.route('/ticker/<string:ticker_name>/tweets', methods=['GET'])
def ticker_tweets(ticker_name):
    auth = tw.OAuthHandler("aA9ZxW6NJzq8Q62sfrYhkUNt6", "xoVKPOpTTXczrml4BCdghhpUfrqdlmReQSXkiRaPNvg8pJG1rA")
    api = tw.API(auth)

    search_words = "$" + ticker_name
    
    tweets = tw.Cursor(api.search,
              q=search_words,
              result_type='popular',
              lang="en",).items(10)

    tweets_list = []

    for tweet in tweets:
        tweets_list.append(api.get_oembed("https://twitter.com/"+ str(tweet.user.screen_name) + "/status/" + str(tweet.id)))
    
    return jsonify(tweets_list)

@app.route('/ticker/<string:ticker_name>/sentiment', methods=['GET'])
def ticker_sentiment(ticker_name):
    sent_dic = {}
    sia = SIA()
    results = []

    ticker = yf.Ticker(ticker_name)
    tickername = ticker.info['longName']

    page = requests.get('https://news.google.com/rss/search?q=' + tickername)
    tree = html.fromstring(page.content) 

    date = tree.xpath('//pubdate/text()') 
    title = tree.xpath('//title/text()') 

    for line in title:
        pol_score = sia.polarity_scores(line)
        pol_score['headline'] = line
        results.append(pol_score)

    sent_df = pd.DataFrame.from_records(results)
    sent_df['polarity_score'] = sent_df['headline'].apply(lambda tweet: TextBlob(tweet).sentiment)
    sent_dic['Negative Score'] = sent_df.sum(axis = 0, skipna = True)['neg']
    sent_dic['Positive Score'] = sent_df.sum(axis = 0, skipna = True)['pos']

    return jsonify(sent_dic)

    
app.run()