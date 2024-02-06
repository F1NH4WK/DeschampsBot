
<h1 align="center">
  DeschampBot
  <br>
</h1>

<h4 align="center">Um bot open-source desenvolvido para compartilhar a newsletter do Filipe Deschamps no Discord</h4>

<p align="center">
  <a href="https://www.javascript.com/" title="Go to JavaScript homepage"><img src="https://img.shields.io/badge/Made_with-JavaScript-yellow?logo=javascript&logoColor=white" alt="Made with JavaScript"></a>
  <a href="https://nodejs.org" title="Go to Node.js homepage"><img src="https://img.shields.io/badge/Node.js-%3E=18-green?logo=node.js&logoColor=white" alt="Made with Node.js"></a>
  <a href="https://www.mongodb.com/" title="Go to MongoDB homepage"><img src="https://img.shields.io/badge/MongoDB-green?logo=mongodb&logoColor=white" alt="Made with MongoDB"></a>
</p>

![Exemplo](https://i.imgur.com/I19iY4E.gif)

<h2>Processo de Criação</h2>

1. <a href = "#ob-not">Obtenção das notícias</a>
    - <a href = "#form-not">Formatando as notícias</a>
    - <a href = "#env-not">Enviando as notícias para o terminal</a>
2. <a href = "#cri-bot">Criando o Bot Discord</a>
    - <a href = "#cons-emb" >Construindo o Embed</a>
    - <a href = "#env-noti">Enviando as notícias</a>


<h2 id = "ob-not">Obtenção de notícias</h2>
<p>As notícias são obtidas dentro do diretório <code>src/utils/email</code>. Nele há as funções que permitem acessar a conta <strong>GMAIL</strong>, realizar uma conexão <strong>IMAP</strong> e em seguida dar fetch para a conexão client-server ser realizada e os emails serem obtidos:<p/>

> src/utils/email/get_news.py
```py
  def getEmailStream():
    with IMAP4_SSL('imap.gmail.com', 993) as M:
    M = IMAP4_SSL(host='imap.gmail.com', port=993)
    M.login(email, password)
    M.select(mailbox = 'INBOX')
    typ, msgID = M.search(None, 'FROM', "'newsletter"', (UNSEEN)')

    typ, data = M.fetch(msgID[0], '(BODY.PEEK[TEXT])')

    M.store(msgID[0].replace(b' ', b','), '+FLAGS', '\Seen')

    return data[0][1]
```

A função conecta com o uso do `with` para permitir que após o algoritmo ser finalizado a conexão se encerra, desta forma não precisamos usar o `IMAP4.close && IMAP4.logout()`. Seguindo, utilizamos o `IMAP4_SSL`pois a conexão com o gmail é por meio do SSL/TLS, assim como a porta, *993*, que também é pré-estabelecida pelo gmail. [Saiba Mais](https://www.getmailspring.com/setup/access-gmail-com-via-imap-smtp)

Em seguida, realizamos uma busca pelos **IDS** dos emails dentra da **INBOX**, cujo critério é o remetente ser *newsletter* e possuir a flag *não visto*. Após encontrado(s), basta usarmos `M.fetch(IdDoEmail, EstruturaDesejada)`, desta formas temos a byte-string com todos os dados que precisamos, agora, processar.

> Curiosidade: Por não estar utilizando o protoclo **RFC822**, tenho que manualmente adicionar a flag de visto. A propósito, *flags* nada mais são que propriedades que cada email carrega consigo, semelhante as tags html.

Por fim, é retornada uma tupla que possui a quantidade de bytes e a raw do email, onde estão todas as informações, no entanto em *byte* e codificadas *quoted-printable*.

<h3 id = "form-not">Formatando as notícias</h3>

É necessário tornar todo aquele html codificado em algo visual e legível, certo? Por isso, no arquivo a seguir nós processamos a *byte-string* obtida anteriormente por meio do parser *lxml*, uma ótima biblioteca, assim como o *BeautifulSoup e html5lib*. No entanto, acabei preferindo o lxml por conta do *xpath*, que facilita muito o *web scraping*.

> src/utils/email/format_news.py
```py
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
```

Primeiramente, decodificamos a byte-string recebida com o uso do quopri. O quopri é um decodificador nativo do python utilizado para decodificar formatos *quoted-printable*. O porquê dessas codificações está relacionado com os protoclos RFC e IMAP, além de muitos sites utilizarem codificações *ASCII*. Após decodificado, apenas passamos este, agora html, para o **lxml**, que cria uma *etree* onde podemos fazer diversas buscas. O padrão dos emails da newsletter é bem simples, todas as notícias estão inseridas em uma tabela, e toda notícia corresponde a uma tag `<p>`.

<img src = "https://i.imgur.com/UJnUwPf.jpeg" width = 800 heigth = 400></img>

Portanto, utilizando-se um pouco de lógica podemos obter todas essas notícias. No entanto, ainda temos de obter os links, que podem ser facilmente obtidos utilizando o método do lxml `lxml.html.innerlinks()`, mas que preferi realizar manualmente para evitar possiveis erros.

```py
  for index, link in enumerate(reversed(newsLinks)):
      content = news[-index - 1]['content']
      linkText = content.rsplit(':')[-1]
      new_content = content.replace(linkText, f' [{linkText.strip().capitalize()}]({link.get("href")})')
      news[-index - 1]['content'] = new_content
```

Talvez tenham se perguntado, por que utilzou reversed? Bom, o lxml providencia os links debaixo pra cima, louco, não? Por isso eu precisei fazer um **loop reverso**, adicionando os **hyperlinks** para cada notícia que possuise uma tag `<a>` dentro da tag `<p>`.

<h3 id = "env-not">Enviando as notícias para o terminal</h3>

Com isso, retomamos nosso processo no `src/utils/email/get_news.py`, prosseguindo para o seguinte comando:

> src/utils/email/get_news.py
```py
print(json.dumps(formatedNews, ensure_ascii = False))
```
Utilizamos a biblioteca json para transformar a string em json, por meio do comando **dump**. Além disso, garantimos que o *ASCII* não será aplicado ao json, *ninguém merece utf-8 em ascii, seŕio*. Por que o **print()**? Anteriormente, havia optado por criar um arquivo json, o qual seria utilizado pelo javascript para ler as notícias e manda-las, no entanto houve diversos problemas com essa funcionalidade, ainda não compreendidas por mim, então utilzei este método mais prático, que usa a biblioteca **PythonShell** pra executar este aquivo Python e receber todos os seus prompts.

<h2 id = "cri-bot">Criando o Bot Discord</h2>

A criação de um bot no discord é bem complexa no começo, mas conforme você se familiariza, tudo se torna mais fácil. Nosso bot começa em `src/index.js`:

> src/index.js

```js
const client = new Client({
	intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds], 
	presence: { 
		status:PresenceUpdateStatus.Online,
		activities: [{
			name: 'Filipe Deschamps', 
			type: ActivityType.Watching
		}]
	}
})

client.commands = new Collection([
	['selecionarcanal', selectChanel]
])

client.on(Events.InteractionCreate, interactionCreate.execute)
client.once(Events.ClientReady, ready.execute)

client.login(process.env.TOKEN)
```

Importamos algumas funcionalidades do discord para personalizar as permissões do bot e seu status na rede. Em seguida, criamos um **coleção** de comandos, os quais passamos o nome e a função a ser executada quando este comando for chamado. Esta é uma ótima prática, visto que podemos acessar nosso cliente nas interações por meio do `interaction.client`. Por fim, apenas aplicamos **listeners** no nosso client: um para quando um comando for executado e outro para quando ligar, respectivamente.

> Não irei explicar como funciona o processo de criação de comandos neste README, mas vocês podem conferir tudo o que estou dizendo na [documentação do discordJs.](https://discordjs.guide/)

<h3 id = "cons-emb">Construindo o embed</h3>

Com as configurações necessárias para o bot responder aos comandos, só nos resta construir o embed e mandar as notícias. Para a construção do embed, utilizamos o constructor **EmbedBuilder()**, adicionando todas as informações. Referenciado no supracitado, o **PythonShell** executa o código python e manda no prompt o json, no presente arquivo apenas recebemos ele. Apenas realizamos um verificação inicial com o âmbito de evitar um embed sem notícias.

> src/utils/generator/embedBuilder.js

```js
export default async function getEmbed(){

    const json = await PythonShell.run("src/utils/email/get_news.py")
    const news = JSON.parse(json[0])

    if (news.length == undefined) return null
    // Avoinding empty embed message
    
    const embed = new EmbedBuilder()

    .setColor(Colors.Yellow)
    .setAuthor({
        name: 'Curso.dev',
        url: 'https://curso.dev/'
    })
    ...

    for (const notice of news){

        let error_news = 0
          embed.addFields({
              name: notice.title,
              value: notice.content,
          })
      }
```

Realizamos um loop para ir pegando cada título e contéudo de cada notícia e adicionando ele aos campos do embed. Note que há uma variável chamada `error_news`, pois existem algumas notícias da newsletter que ultrapassam o limite de caracteres do discord, **1024**. 

<h3 id = "env-noti">Enviando as notícias aos servidores</h3>

> src/events/send_news.js
```js
export default async function sendNews(clientCache){
    const embed = await getEmbed()
    if (embed == null) return null

    const servers = await getAllChannels()

    try{
        for (const server of servers){
            const channel = clientCache.get(server[0])
            if (channel == undefined) {
                console.log(server[1])
                removeFromDB(server[1])
                continue
            } 
            await channel.sendTyping();
            await channel.send({embeds: [embed]})   

            logger.info(`Newsletter enviada no canal: ${server}`)
        }

        return true
    }
    catch(err){
        console.log(err)
    }
}
```

Esta é a parte que ainda busco otimizar, pois existe a possibilidade do bot estar em diversos servidores, o que acarretaria em respostas mais demoradas e possiveis erros devido ao fluxo de informação. No entanto, este arquivo conecta-se com o **mongodb**, que possui o **id de cada canal** onde a notícia será enviada. Com o embed criado, canais preparados, basta apenas mandar as notícias!