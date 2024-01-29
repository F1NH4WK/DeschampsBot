import { REST, Routes } from "discord.js";
import { config } from 'dotenv'
import selectChannel from '../commands/selectChannel.js'
import logger from "../log/logger.js";
import ping from "../commands/ping.js";

config()

const rest = new REST().setToken(process.env.TOKEN)

const commands = new Array(
    ping.data.toJSON(),
    selectChannel.data.toJSON()
)

async function registerCommands (){
    try {
        logger.info('Started refreshing commands!')

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID), 
            {body: commands}
        )

        for (const command of commands){
            logger.info(`✅ - [${command.name}] slash command added!`)
        }
    
    }
    catch(ex){
        logger.error(ex)
    }
};

registerCommands();