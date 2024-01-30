import { SlashCommandBuilder, ActionRowBuilder, ChannelSelectMenuBuilder, ChannelType, PermissionFlagsBits } from "discord.js"
import { insertIntoDB } from "../database/database.js"
import logger from "../log/logger.js"
import embed from "../utils/generator/embedBuilder.js"

const selectChanel = {
    data: new SlashCommandBuilder()
        .setName('selecionarcanal')
        .setDescription('Selecione um canal para a newsletter ser enviada!')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    execute: async (interaction) => {
        const select = new ChannelSelectMenuBuilder()
            .setCustomId(interaction.id)
            .setChannelTypes([ChannelType.GuildText])
            .setPlaceholder('Selecione um canal...')
            .setMaxValues(1)
            .setMinValues(0)

        const row = new ActionRowBuilder()
            .setComponents(select)
        
        const response = await interaction.reply({
            content: 'Aqui estão os canais disponíveis:',
            components: [row],
        })

        const collectorFilter = i => i.user.id === interaction.user.id;

        try {
            const confirmation = await response.awaitMessageComponent({
                filter: collectorFilter,
                time: 30_000
            })

            const channel_id = confirmation.values.join('')
            const guild_id = interaction.guild.id

            const insertdb = await insertIntoDB(guild_id, channel_id)
            
            if (insertdb != true){
                await confirmation.reply({ content: `Estamos com problemas em nosso servidor, tente novamente mais tarde...`})
                logger.error(new Error(insertdb))
                await interaction.deleteReply()
            }
            else {
                await interaction.deleteReply()
                await confirmation.reply({ content: `Beleza! As noticias serão enviadas no canal <#${channel_id}>!`})
            }
        }   
        catch(ex){
            await interaction.followUp({content: 'Parece que você não escolheu um canal :('})
            await interaction.deleteReply()
            logger.error(ex)
        }
    }
}

export default selectChanel