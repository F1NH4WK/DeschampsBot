import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from 'dotenv'
import registerCommands from "./commands/registerCommands.js";
import { runSelectChannel } from "./commands/selectChannel.js";

config()

const client = new Client({intents: [GatewayIntentBits.GuildMessages]})

client.on(Events.InteractionCreate , async (event) => {
	if (!event.isChatInputCommand()) return

	if (event.commandName == 'escolhercanal'){
		console.log('Foi')
		await runSelectChannel(event)
	}
});


client.once(Events.ClientReady, async () => await registerCommands())
client.login(process.env.DISCORD_TOKEN)