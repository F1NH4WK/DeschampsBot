import { EmbedBuilder, Colors} from "discord.js";
import json from '../email/news.json' assert { type: 'json' };

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

    embed.addFields({
        name: notice.title,
        value: notice.value,
    })
}

export default embed