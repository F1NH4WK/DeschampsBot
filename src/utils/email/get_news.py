from imaplib import IMAP4_SSL
from bs4 import BeautifulSoup
import quopri
import json
from dotenv import load_dotenv
import os
from format_news import formatNews

load_dotenv()
email = os.getenv('EMAIL')
password = os.getenv('PASSWORD')

def getEmailStream():
    try:
        with IMAP4_SSL('imap.gmail.com', 993) as M:
            M = IMAP4_SSL(host='imap.gmail.com', port=993)
            M.login(email, password)
            M.select(mailbox = 'INBOX')
            typ, data = M.search(None, '(UNSEEN)')
            
        for num in data[0].split():
                typ, stream = M.fetch(num, '(RFC822)')
        return stream[0][1]

    except:
        raise IndexError

def getDecodedArray(email_stream):
    news_array = []
    soup = BeautifulSoup(email_stream, 'lxml')
    for bstring in soup.find_all('p')[1:]:
        bstring_encoded = quopri.decodestring(bstring.getText())
        news_array.append(bstring_encoded.decode('utf-8'))
    return news_array

def arrayToJsonFormat(news_array: list):
    news_formated_array = []
    for index, news in enumerate(news_array):
        news_formated = formatNews(news)
        news_formated_array.append(news_formated)
    return {
        'data': news_formated_array
    }

try:
    email_stream = getEmailStream()
    news_array = getDecodedArray(email_stream)
    news_json = arrayToJsonFormat(news_array)
    print(json.dumps(news_json, ensure_ascii = False))
    # Sending json to javascript!

except IndexError:
    print(json.dumps({'data': []}))
    # Sending an empty json to recognize no news