import { Events } from "discord.js";

const ready = {
    name: Events.ClientReady,
    execute: (client) => {
        console.log(`${client.user.tag} is ready!`)
    }
}

export default ready