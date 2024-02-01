import { getAllChannels } from "../database/database.js";
import getEmbed from "../utils/generator/embedBuilder.js";
import logger from "../log/logger.js";

export default async function sendNews(clientCache){
    const embed = await getEmbed()
    if (embed == null) return null

    const channelsIDs = await getAllChannels()

    try{
        for (const channelID of channelsIDs){
            const channel = clientCache.get(channelID)
            await channel.sendTyping();
            await channel.send({embeds: [embed]})   

            logger.info(`Newsletter enviada no canal: ${channelID}`)
        }

        return true
    }
    catch(err){
        console.log(err)
    }
}