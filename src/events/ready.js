import { Events } from "discord.js";
import logger from "../log/logger.js";
import sendNews from "./sendNews.js";

const ready = {
    name: Events.ClientReady,
    execute: (client) => {
        logger.info(`${client.user.tag} is ready!`)
        // sendNews(client.channels.cache)
    }
}

export default ready