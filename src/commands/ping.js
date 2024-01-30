import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import embed from "../utils/generator/embedBuilder.js";
import {PythonShell} from 'python-shell';

const embedtest = {
    data: new SlashCommandBuilder()
        .setName('embedtest')
        .setDescription('A')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    execute: async (interaction) => {

        const getNews = async () => {
            PythonShell.run("src/utils/email/get_news.py").then(messages=>{
                console.log(messages);
            });
        }

        await getNews();

        await interaction.reply({
            content: 'testing out',
        })
    }
}

export default embedtest