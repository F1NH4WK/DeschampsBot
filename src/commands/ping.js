import { SlashCommandBuilder } from "discord.js";
import embed from "../utils/generator/embedBuilder.js";

const embedtest = {
    data: new SlashCommandBuilder()
        .setName('embedtest')
        .setDescription('A'),

    execute: async (interaction) => {
        await interaction.reply({
            content: '',
            embeds: [embed]
        })
    }
}

export default embedtest