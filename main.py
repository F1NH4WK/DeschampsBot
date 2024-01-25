from imaplib import IMAP4_SSL
from bs4 import BeautifulSoup
import quopri
from credentials import credentials

email, password = credentials()

def getEmailStream():
    with IMAP4_SSL('imap.gmail.com', 993) as M:
        M = IMAP4_SSL(host='imap.gmail.com', port=993)
        M.login(email, password)
        M.select(mailbox = 'INBOX')
        typ, data = M.search(None, 'ALL')
    
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
