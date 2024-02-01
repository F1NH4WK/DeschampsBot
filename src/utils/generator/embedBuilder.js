import { EmbedBuilder, Colors } from "discord.js";
import logger from "../../log/logger.js";
import { PythonShell } from 'python-shell'

const json = await PythonShell.run("src/utils/email/get_news.py")
const news = JSON.parse(json[0]).data

const embed = new EmbedBuilder()
    .setColor(Colors.Yellow)
    .setFooter({
        text: 'Filipe Deschamps Newsletter',
        iconURL: 'https://cdn.discordapp.com/avatars/852604893718118461/90c0563d288758efdd661e40b13a65b5.webp'
    })
    .setTimestamp(new Date().getTime())
    .setURL('https://filipedeschamps.com.br/newsletter')
    .setTitle('Inscreva-se na Newsletter!')

for (const notice of news){
    try{
        embed.addFields({
            name: notice.title,
            value: notice.value,
        })
    }

    catch(err){

        logger.error(`There's one or more news exceeding discord characters limit, ignoring them... 
        Check out the file: ${news}`)

    }
}

logger.info('Noticias armazenadas no embed!')

export default embed