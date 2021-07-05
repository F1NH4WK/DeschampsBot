import discord
from main import read
from discord.ext import commands, tasks
import informations
from bd import bddefinir, bdreceber, bdnoticias

#BOT
client = commands.Bot(command_prefix= 'f!', help_command=None)

@client.event
async def on_ready():
    noticias.start()
    print('ONLINE')
    await client.change_presence(status = discord.Status.online,  activity = discord.Activity(type = discord.ActivityType.watching, name = 'Felipe Deschamps'))

@tasks.loop(seconds= 15)   
async def noticias():
    print('Rodou o loop')
    try:
        servers = bdnoticias()
        x, y, z, w = read()
        print('Notícias encontradas!')
        for i in servers:
            channel = client.get_channel(i[1]['canal'])
            for a,b in enumerate(x):
                embed = discord.Embed(
                title = f'{y[a]}',
                colour = 16643584 
                )
                embed.description = f'{b}'
                await channel.send(embed = embed)

            for c, b in enumerate(z):
                embed = discord.Embed(
                title = f'{y[a+c+1]}',
                colour = 16643584
                )
                embed.description = f'{b}'
                embed.description += f' [Link Afiliado]({w[c]})'
                await channel.send(embed = embed)
    except:
        print('Nenhuma notícia')

@client.command()
async def canal(ctx):
    canal = bdreceber(ctx.guild.name)
    canal = canal['canal']
    await client.get_channel(ctx.channel.id).send(f'O canal definido para o envio de notícias é: {client.get_channel(canal).mention}')

@client.command()
async def definir(ctx, idcanal):
    canal = {
        'canal': int(idcanal)
    }
    channel = client.get_channel(ctx.channel.id)
    bddefinir(ctx.guild.name, canal)
    receveid = bdreceber(ctx.guild.name)
    notchannel = receveid['canal']
    await channel.send(f'As notícias serão enviadas no canal: {client.get_channel(notchannel).mention}')

@client.command()
async def help(ctx):
    embed = discord.Embed(
        title = 'Comandos',
        description = 'Comandos Deschamps Bot',
        colour = 16643584
    )
    embed.add_field(name = 'f!definir (idcanal)', value= 'Define o canal para o envio das notícias.', inline=False)
    embed.add_field(name = 'f!canal', value = 'Verifica o canal em que as notícias serão postadas.', inline=False)
    embed.add_field(name = 'Notícias', value = 'São enviadas automaticamente de segunda à sexta.', inline=False)

    await client.get_channel(ctx.channel.id).send(embed = embed)

client.run(informations.token)