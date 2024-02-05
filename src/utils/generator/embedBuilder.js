import { EmbedBuilder, Colors } from "discord.js";
import logger from "../../log/logger.js";
import { PythonShell } from 'python-shell'

export default async function getEmbed(){

    const json = await PythonShell.run("src/utils/email/get_news.py")
    const news = JSON.parse(json[0])

    if (news == {}) return null
    // Avoinding empty embed message
    
    const embed = new EmbedBuilder()

    .setColor(Colors.Yellow)
    .setAuthor({
        name: 'Curso.dev',
        url: 'https://curso.dev/'
    })
    .setFooter({
        iconURL: 'https://yt3.googleusercontent.com/ytc/AIf8zZQqWLIMgm0a79oUAVIz3mRxAkdH-0F_1oMqhDEI=s900-c-k-c0x00ffffff-no-rj',
        text: 'Filipe Deschamps Newsletter'
    })
    .setTimestamp(new Date().getTime())
    .setURL('https://filipedeschamps.com.br/newsletter')
    .setTitle('Inscreva-se na Newsletter!')

    for (const notice of news){

        let error_news = 0

        try{
            embed.addFields({
                name: notice.title,
                value: notice.content,
            })
        }

        catch(err){
            error_news++
            logger.info(`There's ${error_news} notice(s) exceding discord's characters limits`)
            

            embed
                .setFooter({text: `${error_news} notícia${error_news > 1? 's' : ''} não ${error_news > 1? 'puderam': 'pode'} ser ${error_news > 1? 'enviadas': 'enviada'}...`})
        }
    }
    logger.info('Noticias armazenadas no embed!')

    return embed
}