import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import embed from "../utils/generator/embedBuilder.js";
import {PythonShell} from 'python-shell';
import logger from "../log/logger.js";

const embedtest = {
    data: new SlashCommandBuilder()
        .setName('embedtest')
        .setDescription('A')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    execute: async (interaction) => {

        const client = interaction.client
        const channel = client.channels.cache.get('813143684136042526')
        await channel.send('A')

        const getNews = async () => {
            PythonShell.run("src/utils/email/get_news.py").then(messages=>{
    
                logger.info(messages);
            });
        }

        await interaction.reply({
            content: 'testing out',
        })

        
    }
}

export default embedtest