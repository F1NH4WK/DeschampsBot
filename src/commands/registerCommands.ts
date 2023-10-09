import { REST, Routes } from "discord.js";
import { config } from 'dotenv'

config()

const rest = new REST({ version: '10'}).setToken(process.env.DISCORD_TOKEN)

const test = [{
    'name': 'ping',
    'description': 'Test'
},
{
    'name': 'ping2',
    'description': 'Test2'
}
]

export default async function registerCommands(){
    try {
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: test }
        )

        console.log('Slash commands updated!')
    }
    
    catch(ex){
        console.log(ex)
    }
}