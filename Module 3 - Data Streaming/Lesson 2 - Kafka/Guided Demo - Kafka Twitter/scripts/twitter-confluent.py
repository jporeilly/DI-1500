# Import the required libraries 
# Tweepy is open-sourced, and enables Python to communicate with Twitter platform
from tweepy import StreamListener, OAuthHandler, Stream
from kafka import KafkaProducer

# You need to create a Twitter app with a DEV account
# Paste in the required keys to be authenticated
# These keys will only allow 2 streams. Code 420 - too many connections
access_token = '29487578-CRtQ0qPIoQGpskJazZy45JhnuTh2awzu2BqVBzALA'
access_token_secret =  'T5ZF7S1t2V1Yjbg6DPwncU8CUT9vwRMTaXbqN24eb7Mty'
consumer_key =  'lbMxIiQi52mKLvdQbtYoLPicn'
consumer_secret =  'zsETWLaRTCaoWtygiPJfoPLddyOgM9rDHFf9En2bUP1xvsmD61'

# define  class to Produce the Twitter stream, with the Topic twitterstream
class StdOutListener(StreamListener):
    def on_data(self, data):
        producer.send_messages('twitterstream', data.encode('utf-8'))
        print (data)
        return True
    def on_error(self, status):
        print (status)

# Authenticate the stream and stream to Kafka broker on 10.0.0.1
producer = KafkaProducer(bootstrap_servers='10.0.0.1')
l = StdOutListener()
auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
stream = Stream(auth, l)

# Track twitter terms in tweets
stream.filter(track = ['Internet of Things', 'IOT', 'internet of things', 'iot'], languages = ['en'])
