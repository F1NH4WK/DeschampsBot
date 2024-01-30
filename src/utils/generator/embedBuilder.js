import { EmbedBuilder, Colors } from "discord.js";
import json from '../email/news.json' assert {type: 'json'};

const news = json.data

const embed = new EmbedBuilder()
    .setColor(Colors.Yellow)
    .setAuthor({name: 'Deschamps'})
    .setDescription('Hello, World!')
    .setFooter({text: 'AYAYAYAYAY'})


for (const notice of news){

    console.log(notice)
    embed.addFields({
        name: 'Título',
        value: notice
    })
}

export default embed