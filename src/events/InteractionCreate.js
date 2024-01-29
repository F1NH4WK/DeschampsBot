import { Events } from "discord.js"

const interactionCreate = {
    name: Events.InteractionCreate,
    execute: async (interaction) => {
        const commandName = interaction.commandName
        const executeCommand = interaction.client.commands.get(commandName).execute
        executeCommand(interaction)
    }
}

export default interactionCreate