from lxml import html
import quopri

def newsObject(encodedEmail):
    html.document_fromstring(encodedEmail)