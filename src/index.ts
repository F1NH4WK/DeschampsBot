import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from 'dotenv'
import registerCommands from "./commands/registerCommands.js";

config()

const client = new Client({intents: [GatewayIntentBits.GuildMessages]})

client.on(Events.InteractionCreate , (event) => {
	if (!event.isChatInputCommand()) return

	event.reply('Working!')
});


client.once(Events.ClientReady, async () => await registerCommands())
client.login(process.env.DISCORD_TOKEN)