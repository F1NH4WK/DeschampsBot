import { 
    ChannelSelectMenuBuilder, ChannelType,
    ActionRowBuilder, Interaction, CacheType, ComponentType
    
} from "discord.js";

export const selectChannel = {
    name: 'escolhercanal',
    description: 'Escolha um canal para as noticias serem enviadas. Recomenda-se um canal dedicado.',
    type: 1
} // The selection channel slash command name and description

export async function runSelectChannel(event : Interaction<CacheType>){

    if (!event.isChatInputCommand()) return
    
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
        
        const actionsRow: any = new ActionRowBuilder().setComponents(selectMenu)
        // I would really apreciate if someone changes this any type.

        const reply = await event.reply({components: [actionsRow]})

        const answer = reply.createMessageComponentCollector({
            componentType: ComponentType.ChannelSelect,
            filter: (i) => i.user.id === event.user.id && i.customId === event.id,
            time: 60_000
        }) // Handling the user's selected channel

        answer.on('collect', async (interaction) => {
            const channelId = interaction.values.join('')

           await interaction.reply({
            content: `Delicinha! A newsletter será enviada no canal <#${channelId}>.`,
            ephemeral: true
            })
        })
    }

    catch(ex){
        console.log(ex)
    }
}