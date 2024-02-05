from imaplib import IMAP4_SSL
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
            typ, msgID = M.search(None, 'FROM', "'newsletter"', (UNSEEN)')

            typ, data = M.fetch(msgID[0], '(BODY.PEEK[TEXT])')
            # Returns a tuple, the [0] is the body we're lf.

           # print(data[0][1])
        return data[0][1]

    except:
        raise IndexError

try:
    encodedEmail = getEmailStream()
    formatedNews = formatNews(encodedEmail)

    print(json.dumps(formatedNews, ensure_ascii = False))
    # Sending json to javascript!

except IndexError:
    print(json.dumps({[]}))
    # Sending an empty json to recognize there's no news