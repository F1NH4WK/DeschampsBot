from imaplib import IMAP4_SSL
import quopri
import json
from dotenv import load_dotenv
import os
from format_news import newsObject
import quopri

load_dotenv()
email = os.getenv('EMAIL')
password = os.getenv('PASSWORD')

def getEmailStream():
    try:
        with IMAP4_SSL('imap.gmail.com', 993) as M:
            M = IMAP4_SSL(host='imap.gmail.com', port=993)
            M.login(email, password)
            M.select(mailbox = 'INBOX')
            typ, msgID = M.search(None, 'FROM', "'newsletter"', (UNSEEN)')

            typ, data = M.fetch(msgID[0], '(BODY.PEEK[TEXT])')
            # Returns a tuple, the [0] is the body we're lf.

           # print(data[0][1])
        return data[0][1]

    except:
        raise IndexError

def arrayToJsonFormat(news_array: list):
    news_formated_array = []
    for index, news in enumerate(news_array):
        news_formated = formatNews(news)
        news_formated_array.append(news_formated)
    return {
        'data': news_formated_array
    }

try:
    encodedEmail = getEmailStream()
    newsObject(encodedEmail)
    #news_json = arrayToJsonFormat(news_array)
    #print(json.dumps(news_json, ensure_ascii = False))
    # Sending json to javascript!

except IndexError:
    print(json.dumps({'data': []}))
    # Sending an empty json to recognize no news