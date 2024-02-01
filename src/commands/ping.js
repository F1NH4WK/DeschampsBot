import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import sendNews from "../events/sendNews.js";
import logger from "../log/logger.js";

const embedtest = {
    data: new SlashCommandBuilder()
        .setName('embedtest')
        .setDescription('A')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    execute: async (interaction) => {
        await interaction.reply({content: 'As noticias serão enviadas...'})
        sendNews(interaction.client.channels.cache)
    }
}

export default embedtest