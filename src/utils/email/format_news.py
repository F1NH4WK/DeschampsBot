from lxml import html
import quopri

def formatNews(encodedEmail):
   news = []

   decodedEmail = (quopri.decodestring(encodedEmail)).decode('utf-8')
   source_email = html.fromstring(decodedEmail)

   newsTitles = source_email.xpath('//td/p[position() > 1]/strong[1]')
   newsTitles.insert(0, source_email.xpath('//td/p[1]/strong[2]')[0])
   # For some reason the first <strong> contains nothing, so we need to do this insert.

   newsContent = source_email.xpath('//td/p')
   newsLinks = source_email.xpath('//td/p/a[last()]')

   for index, title in enumerate(newsTitles):
      notice = newsContent[index].text_content()
      notice = notice.replace(title.text_content(), '')
      # Removing the title from notice, so we avoing sending it twice

      news.append({
         'title': title.text_content(),
         'content': notice.strip().capitalize()
      })

   # Adding links to the last news

   for index, link in enumerate(reversed(newsLinks)):
      content = news[-index - 1]['content']
      linkText = content.rsplit(':')[-1]
      new_content = content.replace(linkText, f' [{linkText.strip().capitalize()}]({link.get("href")})')
      news[-index - 1]['content'] = new_content

   return news