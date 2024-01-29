import { SlashCommandBuilder } from "discord.js";

const ping = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('pong'),

    execute: async (interaction) => {
        await interaction.reply('Pong!')
    }
}

export default ping