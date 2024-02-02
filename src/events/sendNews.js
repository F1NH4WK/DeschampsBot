import { getAllChannels, removeFromDB } from "../database/database.js";
import getEmbed from "../utils/generator/embedBuilder.js";
import logger from "../log/logger.js";

export default async function sendNews(clientCache){
    const embed = await getEmbed()
    if (embed == null) return null

    const servers = await getAllChannels()

    try{
        for (const server of servers){
            const channel = clientCache.get(server[0])
            if (channel == undefined) {
                console.log(server[1])
                removeFromDB(server[1])
                continue
            } 
            await channel.sendTyping();
            await channel.send({embeds: [embed]})   

            logger.info(`Newsletter enviada no canal: ${server}`)
        }

        return true
    }
    catch(err){
        console.log(err)
    }
}