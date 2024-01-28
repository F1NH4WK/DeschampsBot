import { ActivityType, Client, Events, GatewayIntentBits, PresenceUpdateStatus } from "discord.js";
import { config } from 'dotenv'
import { CommandKit } from "commandkit";
import path from 'path'

config()

const client = new Client({
	intents: [GatewayIntentBits.GuildMessages], 
	presence: { 
		status:PresenceUpdateStatus.Online,
		activities: [{
		name: 'Filipe Deschamps', 
		type: ActivityType.Watching, 
		}]
	},
})


new CommandKit({
	client,
	commandsPath: path.join(process.cwd(), 'src/commands'),
	validationsPath: path.join(process.cwd(), 'src/validations')
})

client.once(Events.ClientReady, (client) => console.log(`${client.user.tag} is online!`))
client.login(process.env.TOKEN)