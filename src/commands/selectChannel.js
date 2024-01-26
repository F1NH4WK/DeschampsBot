import { 
    ChannelSelectMenuBuilder, ChannelType,
    ActionRowBuilder, ComponentType
    
} from "discord.js";
import { insertIntoDB } from "../database/database.js";

export const selectChannel = {
    name: 'escolhercanal',
    description: 'Escolha um canal para as noticias serem enviadas. Recomenda-se um canal dedicado.',
    type: 1
} // The selection channel slash command name and description

export async function runSelectChannel(event){

    if (!event.isChatInputCommand()) return // Doing it to being able do reply
    
    try{

        const selectMenu = 
        new ChannelSelectMenuBuilder({
            custom_id: event.id,
            channel_types: [ChannelType.GuildText],
            max_values: 1,
            minValues: 0,
            placeholder: 'Selecione um canal...',
            type: ComponentType.ChannelSelect,
        }) // Select Channel Menu
        
        const actionsRow = new ActionRowBuilder().setComponents(selectMenu)
        
        const reply = await event.reply({components: [actionsRow]})

        const answer = reply.createMessageComponentCollector({
            componentType: ComponentType.ChannelSelect,
            filter: (i) => i.user.id === event.user.id && i.customId === event.id,
            time: 30_000,
        }) // Handling the user's selected channel

        answer.on('collect', async (interaction) => {
            const CHANNEL_ID = interaction.values.join('')
            const GUILD_ID = event.guild.id

            insertIntoDB(GUILD_ID, CHANNEL_ID)
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