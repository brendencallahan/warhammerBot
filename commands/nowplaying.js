module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  inVoiceChannel: true,
  run: async (client, message, args) => {

    const string = args.join(' ')
    if (string) {
      return message.channel.send(`${client.emotes.error} | Heretic! You speak too much. Just say !nowplaying, or !np`)
    }
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Heretic! There is nothing playing!`)
    const song = queue.songs[0]
    message.channel.send(`${client.emotes.play} | You fool, I'm playing **\`${song.name}\`**, requested by ${song.user}`)
  }
}