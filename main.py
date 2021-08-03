import imaplib as im
from bs4 import BeautifulSoup
import quopri
import informations
import re

def read():
    val = 0
    joined = im.IMAP4_SSL('imap.gmail.com')
    joined.login(informations.user,informations.password)
    joined.select('INBOX')
    status, data = joined.search(None, 'FROM', "'newsletter'", "(UNSEEN)")

    links, messages, titles, final = [], [], [], []

#   GETTING THE LINKS
    for c in data[0].split():
        status, data = joined.fetch(c, ('RFC822'))
        email_msg = data[0][1]
        soup = BeautifulSoup(email_msg, 'html5lib')
        regex = r"(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))"
#   TBH, IDK EXACTLY WHAT THIS REGEX DO, BUT IT WORKS :)
        url = re.findall(regex, str(soup))

#   ADDING LINKS TO A LIST
        for x,y in enumerate(url):
            for a,b in enumerate(y):
                if not b == '':
                    links.append(b)
                if a == 1:
                    break
            if x == 1:
                break

        soup = BeautifulSoup(markup=email_msg, features='lxml')
        for c in range(1, len(soup.find_all('p'))):
            utf = quopri.decodestring(soup.find_all('p')[c].text)
            messages.append(utf.decode('utf-8'))

#   HERE, I SEPARATE THE MESSAGES FROM TITLE       
        for c in messages:
            for x,y in enumerate(c):
                if y == ':' or y == '!' or y == '?':
                    fim = x+1
                    titles.append(c[:fim])
                    final.append(c[fim:])
                    break

        messages.clear()

        x = 'Link'

        cont = 0
        for num, i in enumerate(final):
            if x in i:
                i = i.replace('Link', f'[Link]({links[cont]})')
                cont += 1
                messages.append(i)

<<<<<<< HEAD
            elif x in i:
                i = i.replace('Link', f'[Link]({links[cont]})')
=======
            elif x2 in i:
                i = i.replace('Link Patrocinado', f'[Link Patrocinado]({links[cont]})')
>>>>>>> a2bab3895a9645299d42d1f2167190d29d4c8bed
                cont += 1
                messages.append(i)

        for b in range(cont):
            final.pop()

        return final, titles, messages
