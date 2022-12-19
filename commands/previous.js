const { stringEmail } = require("@sapphire/shapeshift")

module.exports = {
  name: 'previous',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (string) {
      return message.channel.send(`${client.emotes.error} | Heretic! You speak too much. Just say !previous`)
    }
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Heretic! The queue is empty!`)
    const song = queue.previous()
    message.channel.send(`${client.emotes.success} | I will now play:\n${song.name}`)
  }
}