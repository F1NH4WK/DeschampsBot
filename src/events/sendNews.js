import { getAllChannels } from "../database/database.js";
import embed from "../utils/generator/embedBuilder.js";
import logger from "../log/logger.js";

export default async function sendNews(clientCache){
    const channelsIDs = await getAllChannels()

    try{
        for (const channelID of channelsIDs){
            const channel = clientCache.get(channelID)
            await channel.send({embeds: [embed]})   

            logger.info(`Newsletter enviada no canal: ${channelID}`)
        }
    }
    catch(err){
        console.log(err)
    }
}