import discord
from main import read
from discord.ext import commands, tasks
import informations
from bd import bddefinir, bdreceber, bdnoticias

#BOT
client = commands.Bot(command_prefix= 'f!', help_command=None)

@client.event
async def on_ready():
    # noticias.start()
    print('ONLINE')
    await client.change_presence(status = discord.Status.online,  activity = discord.Activity(type = discord.ActivityType.watching, name = 'Felipe Deschamps'))

@tasks.loop(seconds= 15)   
async def noticias():
    print('Rodou o loop')
    try:
        servers = bdnoticias()
        final, titles, messages = read()
        print('Notícias encontradas!')

        for i in servers:
            channel = client.get_channel(i[1]['canal'])
            for a,b in enumerate(final):
                embed = discord.Embed(
                    title = f'{titles[a]}',
                    colour = 16643584 
                    )
                embed.description = f'{b}'
                await channel.send(embed = embed)

                last_ocurrence = a+1

            for a,b in enumerate(messages):
                embed = discord.Embed(
                    title = f'{titles[last_ocurrence + a]}',
                    colour = 16643584
                )
                embed.description = f'{b}'
                await channel.send(embed=embed)
    except:
        print('Erro no envio de notícias')

@client.command()
@commands.has_permissions(administrator = True)
async def canal(ctx):
    canal = bdreceber(ctx.guild.name)
    canal = canal['canal']
    await client.get_channel(ctx.channel.id).send(f'O canal definido para o envio de notícias é: {client.get_channel(canal).mention}')

@canal.error
async def canal_error1(ctx, error):
    if isinstance(error, commands.MissingPermissions):
        await ctx.send(':x: Você precisa ser um administrador para usar este comando.')

@client.command()
@commands.has_permissions(administrator = True)
async def definir(ctx, idcanal:int):
    canal = {
        'canal': int(idcanal)
    }
    channel = client.get_channel(ctx.channel.id)
    bddefinir(ctx.guild.name, canal)
    receveid = bdreceber(ctx.guild.name)
    notchannel = receveid['canal']
    await channel.send(f'A partir de agora, as notícias serão enviadas no canal: {client.get_channel(notchannel).mention}')

@definir.error
async def definir_error(ctx, error):
    if isinstance(error, commands.BadArgument):
        await client.get_channel(ctx.channel.id).send(':x: Informe o **ID** do canal, sem marcá-lo.')

    if isinstance(error, commands.MissingRequiredArgument):
        await client.get_channel(ctx.channel.id).send(':x: Não esqueça de informar o **ID** do canal.')

    if isinstance(error, commands.MissingPermissions):
        await ctx.send(':x: Você precisa ser um administrador para usar este comando.')

@client.command()
async def help(ctx):
    embed = discord.Embed(
        title = 'Comandos',
        description = 'Comandos Deschamps Bot',
        colour = 16643584
    )
    embed.add_field(name = 'f!definir (idcanal)', value= 'Define o canal para o envio das notícias.', inline=False)
    embed.add_field(name = 'f!canal', value = 'Verifica o canal em que as notícias serão postadas.', inline=False)
    embed.add_field(name = 'Notícias', value = 'São enviadas automaticamente de segunda à sexta. Em alguns casos algumas mensagens podem ser apagadas devido ao limite de caractéres do discord.', inline=False)

    await client.get_channel(ctx.channel.id).send(embed = embed)
    
client.run(informations.token)