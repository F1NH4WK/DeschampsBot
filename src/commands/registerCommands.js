import { REST, Routes } from "discord.js";
import { config } from 'dotenv'
import { selectChannel } from "./selectChannel.js";

config()

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN)

export default async function registerCommands(){
    try {
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: [selectChannel] }
        )

        console.log('All slash commands updated!')
    }
    
    catch(ex){
        console.log('There was a problem updating slash commands: ', ex)
    }
}