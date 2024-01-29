import { SlashCommandBuilder } from "discord.js"

const selectChanel = {
    data: new SlashCommandBuilder()
        .setName('selecionarcanal')
        .setDescription('Selecione um canal para as newsletter ser enviada!'),

    execute: async (interaction) => {
        await interaction.reply('Hello, World!')
    }
}

export default selectChanel