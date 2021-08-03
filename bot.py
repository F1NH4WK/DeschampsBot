import discord
from main import read
from discord.ext import commands, tasks
import informations
import datetime
<<<<<<< HEAD
from bd import bddefinir, bdreceber, bdnoticias, bdremover
=======
from bd import bddefinir, bdreceber, bdnoticias
>>>>>>> a2bab3895a9645299d42d1f2167190d29d4c8bed

#BOT
client = commands.Bot(command_prefix= 'f!', help_command=None, owner_id = 666280091713536010)

@client.event
async def on_ready():
    noticias.start()
    print('ONLINE')
    await client.change_presence(status = discord.Status.online,  activity = discord.Activity(type = discord.ActivityType.watching, name = 'Felipe Deschamps - (Prefixo: f!)'))

<<<<<<< HEAD
@client.event
async def on_command_completion(ctx):
    await ctx.message.add_reaction('<:correct:870839662963490866>')

@tasks.loop(seconds= 120)   
=======
@tasks.loop(seconds= 60)   
>>>>>>> a2bab3895a9645299d42d1f2167190d29d4c8bed
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
<<<<<<< HEAD
                    colour = 16643584
=======
                    colour = 16643584,
                    timestamp = datetime.datetime.now(datetime.timezone.utc) 
>>>>>>> a2bab3895a9645299d42d1f2167190d29d4c8bed
                    )
                embed.description = f'{b}'
                discord.Embed.set_footer(self = embed, text= 'Deschamps', icon_url= 'https://cdn.discordapp.com/avatars/852604893718118461/90c0563d288758efdd661e40b13a65b5.png?size=2048')
                await channel.send(embed = embed)

                last_ocurrence = a+1

            for a,b in enumerate(messages):
                embed = discord.Embed(
                    title = f'{titles[last_ocurrence + a]}',
                    colour = 16643584,
                    timestamp = datetime.datetime 
                )
                embed.description = f'{b}'
                discord.Embed.set_footer(self = embed, text= 'Deschamps', icon_url= 'https://cdn.discordapp.com/avatars/852604893718118461/90c0563d288758efdd661e40b13a65b5.png?size=2048')
                await channel.send(embed=embed)

    except TypeError:
        print('Não há notícias a serem enviadas')
<<<<<<< HEAD

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
=======
>>>>>>> a2bab3895a9645299d42d1f2167190d29d4c8bed

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
<<<<<<< HEAD
=======
        title = 'Comandos',
        description = 'Comandos Deschamps Bot',
        colour = 16643584
    )
    embed.add_field(name = 'f!definir (idcanal)', value= 'Define o canal para o envio das notícias.', inline=False)
    embed.add_field(name = 'f!canal', value = 'Verifica o canal em que as notícias serão postadas.', inline=False)
    embed.add_field(name = 'Notícias', value = 'São enviadas automaticamente de segunda à sexta. Em alguns casos algumas mensagens podem ser apagadas devido ao limite de caractéres do discord.', inline=False)

    await client.get_channel(ctx.channel.id).send(embed = embed)

@client.command()
async def teste(ctx):
    embed = discord.Embed(
>>>>>>> a2bab3895a9645299d42d1f2167190d29d4c8bed
                    title = ':scroll: • Lista de commandos',
                    colour = 16643584,
                    description = 'Prefixo do bot: `f!`',
                    timestamp = datetime.datetime.now(datetime.timezone.utc)
                )
<<<<<<< HEAD
    discord.Embed.set_footer(self = embed, text= ctx.author.name, icon_url= ctx.author.avatar_url)
    embed.add_field(name = '<:seta:870841486755909702> Definir canal de notícias:', value= '`f!definir idcanal`', inline=False)
    embed.add_field(name = '<:seta:870841486755909702> Ver em que canal as notícias serão enviadas:', value = '`f!canal`', inline=False)
    embed.add_field(name = '<:seta:870841486755909702> Sobre as notícias:', value = '`São enviadas de segunda à sexta, às 11h. Em alguns casos, a notícia ultrapassa o limite de caractéres do Discord, então ela não é enviada aqui.`', inline=False)    
    await ctx.send(embed = embed)
=======
    # discord.Embed.set_footer(self = embed, text= ctx.author.name, icon_url= ctx.author.avatar_url)
    # embed.add_field(name = '• Definir canal de notícias', value= '`f!definir idcanal`', inline=False)
    # embed.add_field(name = '• Ver em que canal as notícias serão enviadas', value = '`f!canal`', inline=False)
    # embed.add_field(name = '• Sobre as notícias', value = '`São enviadas de segunda à sexta, geralmente entre 11h e 12h.`', inline=False)    

>>>>>>> a2bab3895a9645299d42d1f2167190d29d4c8bed

client.run(informations.token)