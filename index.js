require("dotenv").config();
const { DisTube } = require("distube");
const Discord = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent,
  ],
});
const fs = require("fs");
const config = require("./config.json");

client.config = require("./config.json");
client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  nsfw: true,
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.emotes = config.emoji;

fs.readdir("./commands/", (err, files) => {
  if (err) return console.log("Could not find any commands!");
  const jsFiles = files.filter((f) => f.split(".").pop() === "js");
  if (jsFiles.length <= 0) return console.log("Could not find any commands!");
  jsFiles.forEach((file) => {
    const cmd = require(`./commands/${file}`);
    console.log(`Loaded ${file}`);
    client.commands.set(cmd.name, cmd);
    if (cmd.aliases)
      cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
  });
});

client.on("ready", () => {
  console.log(`${client.user.tag} is ready to play music.`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  const prefix = config.prefix;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));
  if (!cmd)
    return message.channel.send(
      `${client.emotes.success} | Heretic! I know nothing of this \`${command}\`. Use \`!help\`, to see what I know.`
    );
  if (cmd.inVoiceChannel && !message.member.voice.channel) {
    return message.channel.send(
      `${client.emotes.error} | Heretic! You must be in a voice channel!`
    );
  }
  try {
    cmd.run(client, message, args);
  } catch (e) {
    console.error(e);
    message.channel.send(`${client.emotes.error} | Error: \`${e}\``);
  }
});

const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode
    ? queue.repeatMode === 2
      ? "All Queue"
      : "This Song"
    : "Off"
  }\` | Bakka: \`${true ? "On" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"
  }\``;
client.distube
  .on("playSong", (queue, song) =>
    queue.textChannel.send(
      `${client.emotes.play} | By the Emperor's grace, playing \`${song.name
      }\` - \`${song.formattedDuration}\`\n${status(queue)}`
    )
  )
  .on("addSong", (queue, song) =>
    queue.textChannel.send(
      `${client.emotes.success} | I was not made for rest. Adding ${song.name} - \`${song.formattedDuration}\` to queue`
    )
  )
  .on("addList", (queue, playlist) =>
    queue.textChannel.send(
      `${client.emotes.success} | Forging a new \`${playlist.name
      }\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    )
  )
  .on("error", (channel, e) => {
    try {
      if (channel)
        channel.send(
          `${client.emotes.error} | Heretic! An error encountered: ${e
            .toString()
            .slice(0, 1974)}`
        );
      else console.error(e);
    } catch (e) {
      console.log("Uh oh, looks like they all left.");
    }
  })
  .on("empty", (channel) => {
    try {
      channel.send(
        "The Iron Hands are stronger together. I will return, upon request."
      );
    } catch (e) {
      console.log("Uh oh, looks like they all left.");
    }
  })

  .on("searchNoResult", (message, query) =>
    message.channel.send(
      `${client.emotes.error} | This song, \`${query}\`, it appears to be lost`
    )
  )
  .on("finish", (queue) =>
    queue.textChannel.send(
      `${client.emotes.stop} | Your songs are through... but I hear the Sapphire calling...`
    )
  );

client.login(config.token);
