import { PermissionFlagsBits } from "discord.js"

export default function ({ interaction, commandObj, handler }){
    const is_member_admin = interaction.memberPermissions.has(PermissionFlagsBits.Administrator)
    if (!is_member_admin){
        interaction.reply('Cade as permissão paizao')
        return true
    }
}