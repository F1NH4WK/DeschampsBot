import { SlashCommandBuilder } from "discord.js";
import embed from "../utils/generator/embedBuilder.js";

const ping = {
    data: new SlashCommandBuilder()
        .setName('embedtest')
        .setDescription('pong'),

    execute: async (interaction) => {
        await interaction.reply({
            embeds: [embed]
        })
    }
}

export default ping