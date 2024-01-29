import { REST, Routes } from "discord.js";
import { config } from 'dotenv'
import ping from '../../commands/ping.js'
import selectChannel from '../../commands/selectChannel.js'

config()

const rest = new REST().setToken(process.env.TOKEN)

const commands = new Array(
    ping.data.toJSON(),
    selectChannel.data.toJSON()
)

async function registerCommands (){
    try {
        console.log('Started refreshing commands!')

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID), 
            {body: commands}
        )

        for (const command of commands){
            console.log('\x1b[36m%s\x1b[0m', `✅ - [${command.name}] slash command added!`)
        }
    
    }
    catch(ex){
        console.log(ex)
    }
};

registerCommands();