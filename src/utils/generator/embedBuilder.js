import { EmbedBuilder, Colors} from "discord.js";
import json from '../email/news.json' assert { type: 'json' };
import logger from "../../log/logger.js";
import path from 'node:path'

const news = json.data

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
        const jsonpath = path.join(process.cwd(), 'src/utils/email/news.json')
        logger.error(`There's one or more news exceeding discord characters limit, ignoring them... 
        Check out the file: ${jsonpath}`)

    }
}

export default embed