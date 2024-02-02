import { Events } from "discord.js";
import logger from "../log/logger.js";
import sendNews from "./sendNews.js";

const ready = {
    name: Events.ClientReady,
    execute: (client) => {
        logger.info(`${client.user.tag} is ready!`)

        const checkNews = async () => {
            
            const response = await sendNews(client.channels.cache)
            if (response == null) logger.warn('Sem novas noticiais')
            else logger.info('Noticias novas!')
            
            setTimeout(checkNews, 1000 * 60 * 30)
        }

        checkNews()
        // Checking for news...
    }   
}

export default ready