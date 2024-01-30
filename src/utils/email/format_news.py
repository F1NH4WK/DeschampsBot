def formatNews(news):
    newsSplit = news.strip().rsplit(':', len(news))
    return {'title': newsSplit[0] + ':', 'value': newsSplit[1]}