import { EmbedBuilder, Colors } from "discord.js";
import logger from "../../log/logger.js";
import { PythonShell } from 'python-shell'

export default async function getEmbed(){

    const json = await PythonShell.run("src/utils/email/get_news.py")
    const news = JSON.parse(json[0]).data

    if (news.length == 0) return null
    // Avoinding empty embed message
    
    const embed = new EmbedBuilder()

    .setColor(Colors.Yellow)
    .setAuthor({
        name: 'Curso.dev',
        url: 'https://curso.dev/'
    })
    .setFooter({
        text: 'Delicinha!'
    })
    .setTimestamp(new Date().getTime())
    .setURL('https://filipedeschamps.com.br/newsletter')
    .setTitle('Inscreva-se na Newsletter!')
    .setThumbnail('https://curso.dev/default-image-share.png')

    for (const notice of news){

        let error_news = 0

        try{
            embed.addFields({
                name: notice.title,
                value: notice.value,
            })
        }

        catch(err){
            logger.error(`There's one or more news exceeding discord characters limit, ignoring them... 
            Check out the file: ${notice}`)
            error_news++

            embed
                .setFooter({text: `${error_news} notícia${error_news > 1? 's' : ''} não ${error_news > 1? 'puderam': 'pode'} ser ${error_news > 1? 'enviadas': 'enviada'}...`})
        }
    }
    logger.info('Noticias armazenadas no embed!')

    return embed
}