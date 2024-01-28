export const data = {
    name: 'ping',
    description: 'Pong'
}

export function run({ interaction, client, handler }){
    interaction.reply(`${client.user.tag}`);
}

export const options = {
    userPermissions: ['Administrator'],
    botPermissions: ['Administrator']
}