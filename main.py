from imaplib import IMAP4_SSL
from bs4 import BeautifulSoup
import quopri
from credentials import credentials
import json

email, password = credentials()[0:2]

def getEmailStream():
    with IMAP4_SSL('imap.gmail.com', 993) as M:
        M = IMAP4_SSL(host='imap.gmail.com', port=993)
        M.login(email, password)
        M.select(mailbox = 'INBOX')
        typ, data = M.search(None, '(UNSEEN)')
    
    for num in data[0].split():
        typ, stream = M.fetch(num, '(RFC822)')
    return stream[0][1]

email_stream = getEmailStream()

def getDecodedArray(email_stream):
    news_array = []
    soup = BeautifulSoup(email_stream, 'lxml')
    for bstring in soup.find_all('p')[1:]:
        bstring_encoded = quopri.decodestring(bstring.getText())
        news_array.append(bstring_encoded.decode('utf-8'))
    return news_array

news_array = getDecodedArray(email_stream)

def arrayToJsonFormat(news_array: list):
    news_object = {}
    for index, news in enumerate(news_array):
        news_object.update({index: news})
    return news_object

news_json = arrayToJsonFormat(news_array)

def writeToJsonFile(news_json: dict):
    with open ('news.json', 'w') as file:
        json.dump(news_json, file)
    return

writeToJsonFile(news_json);