import discord
from main import read
from discord.ext import commands, tasks
import informations
import datetime
from bd import bddefinir, bdreceber, bdnoticias, bdremover

#BOT
client = commands.Bot(command_prefix= 'f!', help_command=None, owner_id = 666280091713536010)

@client.event
async def on_ready():
    noticias.start()
    print('ONLINE')
    await client.change_presence(status = discord.Status.online,  activity = discord.Activity(type = discord.ActivityType.watching, name = 'Felipe Deschamps - (Prefixo: f!)'))

@client.event
async def on_command_completion(ctx):
    await ctx.message.add_reaction('<:correct:870839662963490866>')

@tasks.loop(seconds= 120) 
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
                last_ocurrence = a+1

            for a,b in enumerate(messages):
                embed = discord.Embed(
                    title = f'{titles[last_ocurrence + a]}',
                    colour = 16643584
                )
                await channel.send(embed=embed)

    except TypeError:
        print('Não há notícias a serem enviadas')

    except AttributeError:
        guilds = client.guilds
        for b in servers:
            removed = True
            for i in guilds:
                if str(i) == b[0]:
                    removed = False
                    break
            if removed:
                bdremover(b[0])
                print(f'Servidor {b[0]} removido')

@client.command()
@commands.has_permissions(administrator = True)
async def canal(ctx):
    canal = bdreceber(ctx.guild.name)
    canal = canal['canal']
    await ctx.send(f'O canal definido para o envio das notícias é: {client.get_channel(canal).mention}')

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
    bddefinir(ctx.guild.name, canal)
    receveid = bdreceber(ctx.guild.name)
    notchannel = receveid['canal']
    await ctx.send(f'<:correct:870839662963490866> As notícias serão enviadas no canal: {client.get_channel(notchannel).mention}')

@definir.error
async def definir_error(ctx, error):
    if isinstance(error, commands.BadArgument):
        await client.get_channel(ctx.channel.id).send('<:error:870839734849646643> Informe o **ID** do canal, sem marcá-lo.')

    if isinstance(error, commands.MissingRequiredArgument):
        await client.get_channel(ctx.channel.id).send('<:error:870839734849646643> Não esqueça de informar o **ID** do canal.')

    if isinstance(error, commands.MissingPermissions):
        await ctx.send('<:error:870839734849646643> Você precisa ser um administrador para usar este comando.')

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
