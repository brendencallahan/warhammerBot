# This example requires the 'message_content' intent.

import os
import random
import discord
import youtube_dl

from dotenv import load_dotenv
from discord.ext import commands, tasks

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')

intents = discord.Intents.default()
intents.message_content = True

client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('$bakka'):
        await message.channel.send('Bakka bakka!')

    if message.content.startswith('$nona'):
        await message.channel.send('all hail the mighty one')

client.run(TOKEN)
