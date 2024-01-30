def formatNews(news):
    newsSplit = news.strip().split(':', 1)
    return {'title': newsSplit[0] + ':', 'value': newsSplit[1].strip().capitalize()}

# Handle possible erros!