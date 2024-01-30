import re

def formatNews(news):
    newsSplit = news.strip().split(':', 1)
    return {'title': newsSplit[0] + ':', 'value': newsSplit[1].strip().capitalize()}

def getLinks(soup):
    regex = r"(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'\".,<>?«»“”‘’]))"
    urls = re.findall(regex, str(soup))
    print(urls)