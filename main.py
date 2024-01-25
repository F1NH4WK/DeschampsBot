from imaplib import IMAP4_SSL
from bs4 import BeautifulSoup

def getEmailStream():
    with IMAP4_SSL('imap.gmail.com', 993) as M:
        M = IMAP4_SSL(host='imap.gmail.com', port=993)
        M.login('botdeschamps@gmail.com', 'czra qfrn ztrz hzdc')
        M.select(mailbox = 'INBOX')
        typ, data = M.search(None, 'ALL')
    
    for num in data[0].split():
        typ, stream = M.fetch(num, '(RFC822)')
        return stream[0][1]
    
def getSoup(email_stream):
    soup = BeautifulSoup(email_stream, 'html.parser')
    return soup.prettify()

stream = getEmailStream()
soup = getSoup(stream)