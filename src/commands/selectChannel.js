import { insertIntoDB } from "../database/database.js"
import { 
    ChannelSelectMenuBuilder, ChannelType,
    ActionRowBuilder, ComponentType
    
} from "discord.js";

export const data = {
    name: 'selecionarcanal',
    description: 'Escolha um canal para as noticias serem enviadas. Recomenda-se um canal dedicado.'
}

export async function run ({ interaction, client, handler }){
    try{

        const selectMenu = 
        new ChannelSelectMenuBuilder({
            custom_id: interaction.id,
            channel_types: [ChannelType.GuildText],
            max_values: 1,
            minValues: 0,
            placeholder: 'Selecione um canal...',
            type: ComponentType.ChannelSelect,
        }) // Select Channel Menu
        
        const actionsRow = new ActionRowBuilder().setComponents(selectMenu)
        
        const reply = await interaction.reply({
            content: 'Aqui está a lista de canais que tenho acesso:',
            components: [actionsRow], 
            ephemeral: true
        })

        const answer = reply.createMessageComponentCollector({
            componentType: ComponentType.ChannelSelect,
            filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
            time: 30_000,
        }) // Handling the user's selected channel

        answer.on('collect', async (interaction) => {
            const CHANNEL_ID = interaction.values.join('')
            const GUILD_ID = interaction.guild.id

            await insertIntoDB(GUILD_ID, CHANNEL_ID)
            // Storing it in database

            await interaction.reply({
                content: `Delicinha! A newsletter será enviada no canal <#${CHANNEL_ID}>.`,
                ephemeral: true,
                
            })
        })
    }

    catch(ex){
        console.log(ex)
    }
}

export const options = {
    userPermissions: ['Administrator'],
    botPermissions: ['Administrator']
}