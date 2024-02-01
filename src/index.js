import { ActivityType, Client, Collection, Events, 
	GatewayIntentBits, PresenceUpdateStatus } from "discord.js";
import { config } from 'dotenv';
import selectChanel from './commands/selectChannel.js'
import ready from "./events/ready.js";
import interactionCreate from "./events/interactionCreate.js";

config()

const client = new Client({
	intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds], 
	presence: { 
		status:PresenceUpdateStatus.Online,
		activities: [{
			name: 'Filipe Deschamps', 
			type: ActivityType.Watching
		}]
	}
})

client.commands = new Collection([
	['selecionarcanal', selectChanel]
])

client.on(Events.InteractionCreate, interactionCreate.execute)
client.once(Events.ClientReady, ready.execute)

client.login(process.env.TOKEN)