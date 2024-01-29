import { SlashCommandBuilder, ActionRowBuilder, ChannelSelectMenuBuilder, ChannelType } from "discord.js"

const selectChanel = {
    data: new SlashCommandBuilder()
        .setName('selecionarcanal')
        .setDescription('Selecione um canal para as newsletter ser enviada!'),

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
            ephemeral: true
        })



        try {
            const confirmation = await response.awaitMessageComponent({
                time: 60_000
            })

            
            const channel_id = confirmation.values.join('')
            await confirmation.reply({ content: `Beleza! As noticias serão enviadas no canal <#${channel_id}>`, ephemeral: true})
            await response.delete(delay = 10)

        }   
        catch(ex){
            await response.editReply({content: 'Parece que você não escolheu um canal :('});
            await response.delete(delay = 5)
        }
    }
}

export default selectChanel