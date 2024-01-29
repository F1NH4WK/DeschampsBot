import { Events } from "discord.js";
import logger from "../log/logger.js";

const ready = {
    name: Events.ClientReady,
    execute: (client) => {
        logger.info(`${client.user.tag} is ready!`)
    }
}

export default ready