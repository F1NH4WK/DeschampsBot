import { Events } from "discord.js"

const interactionCreate = {
    name: Events.InteractionCreate,
    execute: async (interaction) => {
        if (!interaction.isChatInputCommand()) return
        // avoiding recursive response
        
        const commandName = interaction.commandName
        const executeCommand = interaction.client.commands.get(commandName).execute
        await executeCommand(interaction)
    }
}

export default interactionCreate